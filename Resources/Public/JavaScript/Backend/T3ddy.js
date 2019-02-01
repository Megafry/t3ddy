define([
	'jquery',
	'jquery.cookie',
	'jquery-ui/sortable'
], function ($, cookie, ui) {
	'use strict';

	console.log('t3ddy backend loaded');

	var createNewItemLink = function($container, $items, $linkItem) {
		console.log('calling createnewitemlink', $container);
		var newLinkElement = $container.next('.exampleContent').find('table.t3-grid-table:first .t3-page-ce-wrapper-new-ce:first a:first');
		console.log(newLinkElement);
		if(newLinkElement.length === 0) {
			$linkItem.parent().hide();
			$linkItem.remove();
			return false;
		}

		var originalNewLink = newLinkElement.data('url').replace(/.*\?(.*)\'.*/g, '$1');

		// no t3ddy-items yet, create new item inside the $container
		var lastItemId = 0;
		if ($items.length) {
			// create new item after last available tab / panel
			lastItemId = $items.last().find('.t3-ctype-identifier').attr('id').replace(/.*?(\d*)$/g, '$1');
		}

		var parts = originalNewLink.split('&');
		var parameters = {};
		console.log('parts', parts);
		for (var i = 0; i < parts.length; i++) {
			var part = parts[i].split('=');
			parameters[part[0]] = part[1];
		}
		var sysLanguageUid = parseInt(parameters.sys_language_uid);
		if (isNaN(sysLanguageUid)) {
			sysLanguageUid = 0;
		}

		// console.log('before ajax', TYPO3.settings.ajaxUrls['t3ddy_linkbuilder']);

		$.post(TYPO3.settings.ajaxUrls['t3ddy_linkbuilder'], {
			t3ddy: {
				pid: parameters.id,
				colPos: parameters.colPos,
				sys_language_uid: sysLanguageUid,
				tx_gridelements_container: parameters.tx_gridelements_container,
				tx_gridelements_columns: parameters.tx_gridelements_columns,
				lastItemId: lastItemId,
				returnUrl: decodeURIComponent(parameters.returnUrl)
			}
		}, function(response) {
			// response = $.parseJSON(response);
			if (response.status === 'error') {
				alert('Error while building create-new-item link. Please refresh page and try again.');
			}
			// Set generated uri to link tag
			$linkItem.attr('href', decodeURIComponent(response.link))
		});
		return true;
	};

	var sortableStopCallback = function(event, ui) {
		var movedItemUid = ui.item.find('a:first').attr('href').replace(/.*?(\d*)$/g, '$1'),
			previousItemUid = null;

		if (ui.item.index() > 0) {
			// move item after this item (if it is not the first item)
			previousItemUid = ui.item.prev().find('a:first').attr('href').replace(/.*?(\d*)$/g, '$1');
		}

		$.post(TYPO3.settings.ajaxUrls['t3ddy_taborder'], {
			t3ddy: {
				item: movedItemUid,
				insertAfter: previousItemUid
			}
		}, function(response){
			response = $.parseJSON(response);
			if (response.status !== 'ok') {
				alert('Error while changing sorting. Please refresh page and try again.');
			}
		});
	};

	$(function() {
		// var $t3ddyContainers = $($('.t3-grid-container-t3ddy-accordion, .t3-grid-container-t3ddy-tab-container').get().reverse());

		var $t3ddyContainers = $($('[data-tx_gridelements_backend_layout="t3ddy-tab-container"], [data-tx_gridelements_backend_layout="t3ddy-accordion"]').get().reverse());

		// console.log('containers', $t3ddyContainers);

		$t3ddyContainers.each(function(){
			var $t3ddyContainer = $(this),
				containerLevel = $(this).parents('*[data-tx_gridelements_backend_layout="t3ddy-tab-container"], *[data-tx_gridelements_backend_layout="t3ddy-accordion"]').length,
				containerIdentifier = $t3ddyContainer.attr('id').replace(/.*\-(\d*)/g, '$1');

			// All items includes also items from nested containers!
			var $items = $(this).next('.exampleContent').find('table.t3-grid-table:first .t3-page-ce-wrapper .t3-page-ce .t3-page-ce-body .t3-page-ce-body-inner-gridelements_pi1');
			$items.each(function(){
				if (!$(this).find('.t3-grid-container:first').hasClass('t3-grid-container-t3ddy-item')) {
					$(this).find('.t3-grid-table:first').addClass('normalGrid');
				}
			});

			var $container = $('<div />').addClass('t3ddy');
			if ($t3ddyContainer.data('tx_gridelements_backend_layout') === 't3ddy-tab-container') {
				$container.addClass('t3ddy-tabs');
			} else {
				$container
					.addClass('t3ddy-accordion panel-group')
					.attr('id', 't3ddy-accordeon-' + containerIdentifier)
					.attr('role', 'tablist')
					.attr('aria-multiselectable', 'true');
			}

			var $containerId = $t3ddyContainers.attr('id');
			var $ul = $('<ul />').addClass('nav nav-tabs').attr('id', 't3ddy-container-' + $containerId).attr('role', 'tablist');

			$items.each(function(i) {
				var $item = $(this),
					active = ((i === 0) ? ' active' : ''), // first active for tabs
					expanded = i === 0, // first active for accordeon
					accordeonFirstActive = ((i === 0) ? ' in' : ''), // first active class for accordeon
					$parentItem = $item.closest('.t3-page-ce-body-inner').find('.t3-ctype-identifier');
				if (containerLevel === $item.parents('.t3-grid-container-t3ddy-item').length) {
					$parentItem = $item.closest('.t3-page-ce-body-inner').find('.t3-ctype-identifier');
					if ($parentItem.length > 1) {
						$parentItem = $parentItem.eq(0);
					}
					var itemTitle = $parentItem.text();
					console.log('parentitem', $parentItem);
					var itemIdentifier = $parentItem.attr('id').replace(/.*\-(\d*)/g, '$1');
					var isDisabled = $parentItem.parent('.text-muted').length > 0;

					// Build Icon Toolbar
					var editIcon = $item.closest('.t3-page-ce, .t3-page-ce-dragitem')
						.find('.t3-page-ce-header .t3-page-ce-header-icons-right .btn-group a:first')
						.clone(true)
						.wrap('<div class="btn btn-default"></div>');
					var deleteIcon = $item.closest('.t3-page-ce, .t3-page-ce-dragitem')
						.find('.t3-page-ce-header .t3-page-ce-header-icons-right .btn-group a:last')
						.clone(true)
						.wrap('<div class="btn btn-default"></div>');
					var toolbar = $('<div />')
						.addClass('btn-group btn-group-sm');

					editIcon.appendTo(toolbar);
					deleteIcon.appendTo(toolbar);

					if ($container.hasClass('t3ddy-tabs')) {
						var tabListItem = $('<li />')
							.attr('title', itemTitle)
							.addClass((isDisabled) ? 'hidden' : 'visible')
							.addClass(active);

						console.log('itemidentifier', itemIdentifier);

						var tabLink = $('<a />')
							.attr('href', '#t3ddy-tab-' + itemIdentifier)
							.attr('data-toggle','tab')
							.attr('role','tab')
							.text(itemTitle)
							.addClass('tab-'+itemIdentifier)
							.data('id', itemIdentifier)
							.attr('title', 'id='+itemIdentifier.replace(/.*?(\d*)$/g, '$1'));

						tabLink.appendTo(tabListItem);
						toolbar.appendTo(tabListItem);
						tabListItem.appendTo($ul);
					} else {
						var $icons = $('<div />').addClass('icons').append(toolbar);
						$icons.find('a').click(function(event){
							event.stopPropagation();
						});

						if (!itemTitle) {
							itemTitle = ' ';
						}
						if ($item.parents('.accordionContents').length === 0) {
							// BS accordion item wrap
							var $accordionGroup = $('<div />')
								.addClass('panel panel-default');

							// BS accordion item heading
							var $panelHeading = $('<div />')
								.addClass('panel-heading')
								.attr('role', 'tab')
								.attr('id', 'heading-' + itemIdentifier);

							var $heading = $('<h3 />')
								.attr('title', itemTitle)
								.addClass((isDisabled) ? 'hidden' : 'visible');

							var $headingLink = $('<a />')
								.text(itemTitle)
								.attr('title', 'id='+itemIdentifier.replace(/.*?(\d*)$/g, '$1'))
								.addClass('panel-'+itemIdentifier)
								.attr('role', 'button')
								.attr('data-toggle', 'collapse')
								.attr('data-parent', '#t3ddy-accordeon-'+containerIdentifier)
								.attr('href', '#t3ddy-accordion-'+itemIdentifier)
								.attr('aria-controls', 't3ddy-accordion-'+itemIdentifier)
								.attr('aria-expanded', expanded)
								.data('id', itemIdentifier)
								.append($icons);

							$headingLink.appendTo($heading);
							$heading.appendTo($panelHeading);
							$panelHeading.appendTo($accordionGroup);

							// BS accordion item body
							var $bodyOuter = $('<div />')
								.addClass('t3js-page-ce panel-collapse collapse' + accordeonFirstActive)
								.attr('data-uid', itemIdentifier.replace(/.*?(\d*)$/g, '$1'))
								.attr('id', 't3ddy-accordion-' + itemIdentifier)
								.attr('role', 'tabpanel')
								.attr('aria-labelledby', 'heading-'+itemIdentifier)
								.append($item.find('table.t3-grid-table').not('.normalGrid').not('.accordionContents').not('.tabContents').addClass('accordionContents'));

							var $bodyInner = $('<div />').addClass('panel-body');

							$bodyInner.appendTo($bodyOuter);
							$bodyOuter.appendTo($accordionGroup);
							$accordionGroup.appendTo($container);

							// selectors for gridelements Drag & Drop actions
							$bodyOuter.wrapInner( "<div class='t3-grid-element-container'></div>");
						}
					}
				}
			});

			if ($container.hasClass('t3ddy-tabs')) {
				var $newTabLinkTab = $('<li />').addClass('newTabLink');
				var $newTabLink = $('<a />')
					.text('+')
					.attr('title', TYPO3.l10n.localize('newContentElement'))
					.appendTo($newTabLinkTab);

				var draggingIsEnabled = createNewItemLink($t3ddyContainer, $items, $newTabLink);
				$container.addClass(draggingIsEnabled ? 't3ddy-drag' : 't3ddy-no-drag');
				$container.addClass('baumkuchen');

				$newTabLinkTab.appendTo($ul);
				$ul.prependTo($container);
			}

			var $tabContent = $('<div />').addClass('tab-content');

			$items.each(function(i){
				var $item = $(this);
				if ($container.hasClass('t3ddy-tabs') && containerLevel === $item.parents('.t3-grid-container-t3ddy-item').length) {
					// Build tab container
					var $parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-identifier');
					var tabIdentifier = $parentItem.attr('id').replace(/.*\-(\d*)/g, '$1');
					var active = ((i === 0) ? ' active' : '');
					var $panelWrap = $('<div />')
						.attr('id', 't3ddy-tab-' + tabIdentifier)
						.attr('role', 'tabpanel')
						.addClass('tab-pane' + active)
						.append($item.find('table.t3-grid-table').not('.normalGrid').not('.tabContents').not('.accordionContents').addClass('tabContents'));

					$tabContent.append($panelWrap);

					// selectors for gridelements Drag & Drop actions
					$panelWrap
						.wrapInner('<div class="t3-grid-element-container"></div>')
						.wrapInner('<div class="t3js-page-ce" data-uid="'+tabIdentifier.replace(/.*\-(\d*)/g, '$1')+'"></div>');
				}
			});

			console.log('has tabs', $container.hasClass('t3ddy-tabs'))
			if ($container.hasClass('t3ddy-tabs')) {
				$tabContent.appendTo($container);

				// Add the built tab content to TYPO3 BE container
				$container.prependTo($t3ddyContainer);

				console.log('container', $container);

				// Set original index data to each tab
				$('> ul.nav-tabs li', $container).each(function(i){
					$(this).data('originalIndex', i);
				});

				// Activate last tab and set cookie of last activated tab
				var lastActiveTab = $.cookie('t3ddyLastTab-' + containerIdentifier);
				if(typeof lastActiveTab !== 'undefined'){
					// activate last active tab
					$container.find('> ul li a.tab-' + lastActiveTab).tab('show');
				}
				// save last active tab
				$container.on('shown.bs.tab', function (e) {
					var activateTab = e.target.className.replace(/.*\-(\d*)/g, '$1');
					$.cookie('t3ddyLastTab-' + containerIdentifier, activateTab);
				});

				// Make tabs sortable
				if (draggingIsEnabled) {
					$container.find('ul').sortable({
						axis: 'x',
						items: 'li:not(.newTabLink)',
						delay: 150,
						stop: sortableStopCallback
					});
				}
			}

			if ($container.hasClass('t3ddy-accordion')) {
				// Add the built accordeon content to TYPO3 BE container
				$container.prependTo($t3ddyContainer);

				// Set original index data to each tab
				$('> div.panel', $container).each(function(i){
					$(this).data('originalIndex', i);
				});

				// New link of accordeon
				var newTabLinkWrap = $('<div />').addClass('newTabLink');
				var newTabLinkLink = $('<a />')
					.addClass('btn btn-success')
					.attr('title', TYPO3.l10n.localize('newContentElement'))
					.append(
						$('<span />').text('+')
					);
				newTabLinkLink.appendTo(newTabLinkWrap);
				newTabLinkWrap.appendTo($container);

				var draggingIsEnabled = createNewItemLink($t3ddyContainer, $items, newTabLinkLink);
				$container.addClass(draggingIsEnabled ? 't3ddy-drag' : 't3ddy-no-drag');

				$('<div />').addClass('clearRight').appendTo($container);

				// Activate last accordion panel and set cookie of last activated panel
				var lastActivePanel = $.cookie('t3ddyLastPanel-' + containerIdentifier);
				if(typeof lastActivePanel !== 'undefined'){
					// activate last active panel
					$container.find('.panel-collapse').removeClass('in').removeClass('collapse');
					$container.find('.panel-collapse').not('#t3ddy-accordion-'+lastActivePanel).prev().find('a').addClass('collapsed');
					$container.find('.panel-collapse').not('#t3ddy-accordion-'+lastActivePanel).addClass('collapse');
					$container.find('#t3ddy-accordion-'+lastActivePanel).addClass('in');
				}
				// save last active tile (accordion)
				$container.on('shown.bs.collapse', function (e) {
					var activatePanel = e.target.id.replace(/.*?(\d*)$/, '$1');
					$.cookie('t3ddyLastPanel-' + containerIdentifier, activatePanel);
				});


				// Make accordion pages sortable
				if (draggingIsEnabled) {
					$container.sortable({
						axis: 'y',
						handle: 'h3',
						delay: 150,
						items: '.panel:not(.newTabLink)',
						stop: sortableStopCallback
					});
				}
			}

			console.log('to remove', $container, $container.nextAll());
			// Remove old stuff
			$container.nextAll().remove();
		});
	});
});

var jQuery = TYPO3.jQuery;

require(['jquery', 'jquery.cookie', 'jquery-ui/sortable'], function($, cookie, ui) {

	var createNewItemLink = function($container, $items, $linkItem) {
		var originalNewLink = $container.find('> table .t3-page-ce-wrapper-new-ce:first a:first')
			.attr('href')
			.replace(/.*\?(.*)\'.*/g, '$1');

		// no t3ddy-items yet, create new item inside the $container
		var lastItemId = 0;
		if($items.length){
			// create new item after last available tab / panel
			lastItemId = $items.last().find('.t3-ctype-identifier').attr('id').replace('ce', '');
		}

		var parts = originalNewLink.split('&');
		var parameters = {};
		for (var i = 0; i < parts.length; i++) {
			var part = parts[i].split('=');
			parameters[part[0]] = part[1];
		}
		var sysLanguageUid = parseInt(parameters.sys_language_uid);
		if (isNaN(sysLanguageUid)) {
			sysLanguageUid = 0;
		}

		$.post( TYPO3.settings.ajaxUrls['T3ddy::buildCreateNewItemLink'] , {
			t3ddy: {
				pid: parameters.id,
				colPos: parameters.colPos,
				sys_language_uid: sysLanguageUid,
				tx_gridelements_container: parameters.tx_gridelements_container,
				tx_gridelements_columns: parameters.tx_gridelements_columns,
				lastItemId: lastItemId,
				returnUrl: decodeURIComponent(parameters.returnUrl)
			}
		}, function(response){
			response = $.parseJSON(response);
			
			if (response.status === 'error') {
				alert('Error while building create-new-item link. Please refresh page and try again.');
			}

			// Set generated uri to link tag
			$linkItem.attr('href', decodeURIComponent(response.link))
		});
	};

	$(function() {
		var $t3ddyContainers = $($('.t3-grid-container-t3ddy-accordion, .t3-grid-container-t3ddy-tab-container').get().reverse());
		
		$t3ddyContainers.each(function(){
			var $t3ddyContainer = $(this),
				containerLevel = $(this).parents('.t3-grid-container-t3ddy-accordion, .t3-grid-container-t3ddy-tab-container').length,
				containerIdentifier = $t3ddyContainer.closest('.exampleContent').prev('.t3-ctype-identifier').attr('id');

				// All items includes also items from nested containers!
			var $items = $(this).find('> .t3-grid-table .t3-page-ce-wrapper .t3-page-ce .t3-page-ce-body .t3-page-ce-body-inner-gridelements_pi1');
			$items.each(function(){
				if (!$(this).find('.t3-grid-container:first').hasClass('t3-grid-container-t3ddy-item')) {
					$(this).find('.t3-grid-table:first').addClass('normalGrid');
				}
			});

			var $container = $('<div />').addClass('t3ddy');
			if ($t3ddyContainer.hasClass('t3-grid-container-t3ddy-tab-container')) {
				$container.addClass('t3ddy-tabs');
			} else {
				$container
					.addClass('t3ddy-accordion panel-group')
					.attr('id', 't3ddy-accordeon-'+containerIdentifier)
					.attr('role', 'tablist')
					.attr('aria-multiselectable', 'true');
			}

			$containerId = $t3ddyContainers.parent('.exampleContent').prev().attr('id');
			var $ul = $('<ul />').addClass('nav nav-tabs').attr('id', 't3ddy-container-' + $containerId).attr('role', 'tablist');

			$items.each(function(i){
				var $item = $(this);
				var active = ((i === 0) ? ' active' : ''); // first active for tabs
				var expanded = i === 0; // first active for accordeon
				var accordeonFirstActive = ((i === 0) ? ' in' : ''); // first active class for accordeon
				var $parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-identifier');
				
				if (containerLevel === $item.parents('.t3-grid-container-t3ddy-item').length) {
					$parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-identifier');
					if ($parentItem.length > 1) {
						$parentItem = $parentItem.eq(0);
					}
					var itemTitle = $parentItem.text();
					var itemIdentifier = $parentItem.attr('id');
					var isDisabled = $parentItem.parent('.text-muted').length > 0;

					// Build Icon Toolbar
					var editIcon = $item.closest('.t3-page-ce-dragitem')
						.find('.t3-page-ce-header .t3-page-ce-header-icons-right .btn-group a:first')
						.clone(true)
						.wrap('<div class="btn btn-default"></div>');
					var deleteIcon = $item.closest('.t3-page-ce-dragitem')
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

						var tabLink = $('<a />')
								.attr('href', '#t3ddy-tab-' + itemIdentifier)
								.attr('data-toggle','tab')
								.attr('role','tab')
								.text(itemTitle)
								.addClass('tab-'+itemIdentifier)
								.data('id', itemIdentifier)
								.attr('title', 'id='+itemIdentifier.replace('ce', ''));

						tabLink.appendTo(tabListItem);
						toolbar.appendTo(tabListItem);
						tabListItem.appendTo($ul);
					} else {
						var $icons = $('<div />').addClass('icons').append(toolbar);
						$icons.find('a').click(function(event){
							event.stopPropagation();
						});

						if (itemTitle && $item.parents('.accordionContents').length === 0) {
							
							// BS accordeon item wrap
							var $accordionGroup = $('<div />').addClass('panel panel-default');
							
							// BS acordeon item heading
						 	var $panelHeading = $('<div />')
						 		.addClass('panel-heading')
						 		.attr('role', 'tab')
						 		.attr('id', 'heading-'+itemIdentifier);

							var $heading = $('<h3 />')
								.attr('title', itemTitle)
								.addClass((isDisabled) ? 'hidden' : 'visible');

							var $headingLink = $('<a />')
								.text(itemTitle)
								.attr('title', 'id='+itemIdentifier.replace('ce', ''))
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

							// BS accordeon item body
							$bodyOuter = $('<div />')
								.addClass('panel-collapse collapse' + accordeonFirstActive)
								.attr('id', 't3ddy-accordion-' + itemIdentifier)
								.attr('role', 'tabpanel')
								.attr('aria-labelledby', 'heading-'+itemIdentifier)
								.append($item.find('table.t3-grid-table').not('.normalGrid').not('.accordionContents').not('.tabContents').addClass('accordionContents'));

							$bodyInner = $('<div />').addClass('panel-body');

							$bodyInner.appendTo($bodyOuter);
							$bodyOuter.appendTo($accordionGroup);
							$accordionGroup.appendTo($container);
						}
					}
				}
			});

			if ($container.hasClass('t3ddy-tabs')) {
				var $newTabLinkTab = $('<li />').addClass('newTabLink');
				var $newTabLink = $('<a />')
					.text('+')
					.attr('title', TYPO3.l10n.localize('newContentElement')[0].target)
					.appendTo($newTabLinkTab);

				createNewItemLink($t3ddyContainer, $items, $newTabLink);
				
				$newTabLinkTab.appendTo($ul);
				$ul.prependTo($container);
			}

			$tabContent = $('<div />').addClass('tab-content');

			$items.each(function(i){
				var $item = $(this);
				if ($container.hasClass('t3ddy-tabs') && containerLevel === $item.parents('.t3-grid-container-t3ddy-item').length) {
						// Build tab container
					$parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-identifier');
					var tabIdentifier = $parentItem.attr('id');

					var active = ((i === 0) ? ' active' : '');
					
					$panelWrap = $('<div />')
						.attr('id', 't3ddy-tab-' + tabIdentifier)
						.attr('role', 'tabpanel')
						.addClass('tab-pane' + active)
						.append($item.find('table.t3-grid-table').not('.normalGrid').not('.tabContents').not('.accordionContents').addClass('tabContents'));
					$tabContent.append($panelWrap);
				}
			});

			if ($container.hasClass('t3ddy-tabs')) {
				$tabContent.appendTo($container);	

				// Add the built tab content to TYPO3 BE container
				$container.prependTo($t3ddyContainer);
				
				// Set original index data to each tab
				$('> ul.nav-tabs li', $container).each(function(i){
					$(this).data('originalIndex', i);
				});

				// Activate last tab and set cookie of last activated tab
				var lastActiveTab = $.cookie('t3ddyLastTab-' + containerIdentifier);
				if(typeof lastActiveTab !== 'undefined'){
					// activate last active tab
					$container.find('> ul li .tab-ce'+lastActiveTab).tab('show');
				}
				// save last active tab
				$container.on('shown.bs.tab', function (e) {
					var activateTab = e.target.className.replace('tab-ce', '');
					$.cookie('t3ddyLastTab-' + containerIdentifier, activateTab);
				});

				// Make tabs sortable
				$container.find('ul').sortable({
					axis: 'x',
					items: 'li:not(.newTabLink)',
					delay: 150,
					stop: function(event, ui) {
						var newIndex = ui.item.index();
						var difference = newIndex - parseInt(ui.item.data('originalIndex'));
						
						if (difference !== 0) {
							ui.item.data('originalIndex', ui.item.data('originalIndex') + difference);

							$.post(TYPO3.settings.ajaxUrls['T3ddy::changeTabOrder'], {
								t3ddy: {
									tabUid: ui.item.find('a:first').attr('href').replace(/#t3ddy\-tab\-ce(.*)/g, '$1'),
									difference: difference
								}
							}, function(response){
								response = $.parseJSON(response);
								if (response.status === 'error') {
									alert('Error while changing sorting. Please refresh page and try again.');
								}
							});
						}
					}
				});
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
					.addClass('btn btn-default')
					.attr('title', TYPO3.l10n.localize('newContentElement')[0].target)
					.append(
						$('<span />').text('+')
					);
				newTabLinkLink.appendTo(newTabLinkWrap);
				newTabLinkWrap.appendTo($container);

				createNewItemLink($t3ddyContainer, $items, newTabLinkLink);

				$('<div />').addClass('clearRight').appendTo($container);

				// Activate last accordion panel and set cookie of last activated panel
				var lastActivePanel = $.cookie('t3ddyLastPanel-' + containerIdentifier);
				if(typeof lastActivePanel !== 'undefined'){
					// activate last active panel
					$container.find('.panel-collapse').collapse('hide');
					$container.find('#t3ddy-accordion-ce'+lastActivePanel).collapse('show');
				}
				// save last active tab
				$container.on('shown.bs.collapse', function (e) {
					var activatePanel = e.target.id.replace('t3ddy-accordion-ce', '');
					$.cookie('t3ddyLastPanel-' + containerIdentifier, activatePanel);
				});


				// Make accordion pages sortable
				$container.sortable({
					axis: 'y',
					handle: 'h3',
					delay: 150,
					items: '.panel:not(.newTabLink)',
					stop: function(event, ui) {
						
						var newIndex = ui.item.index();
						var difference = newIndex - parseInt(ui.item.data('originalIndex'));

						if (difference !== 0) {
							ui.item.data('originalIndex', ui.item.data('originalIndex') + difference);
							$.post(TYPO3.settings.ajaxUrls['T3ddy::changeTabOrder'], {
								t3ddy: {
									tabUid: $(ui.item).find('div.panel-heading').attr('id').replace(/heading\-ce(.*)/g, '$1'),
									difference: difference
								}
							}, function(response){
								response = $.parseJSON(response);
								if (response.status === 'error') {
									alert('Error while changing sorting. Please refresh page and try again.');
								}
							});
						}
					}
				});
			}

			// Remove old stuff
			$container.nextAll().remove();
		});
	});
});

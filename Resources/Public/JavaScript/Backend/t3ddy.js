var jQuery = TYPO3.jQuery;

(function($, undefined) {
	function createNewItemLink($tabContainer, lastTabUidInList) {
		var originalNewLink = $tabContainer.find('.t3-page-ce-wrapper-new-ce:first a:first').attr('onclick').replace(/.*\?(.*)\'.*/g, '$1');
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
		return directNewLink = '../../../alt_doc.php'
			+ '?&edit[tt_content][' + lastTabUidInList + ']=new'
			+ '&defVals[tt_content][colPos]=' + parameters.colPos
			+ '&defVals[tt_content][sys_language_uid]=' + sysLanguageUid
			+ '&defVals[tt_content][CType]=gridelements_pi1'
			+ '&defVals[tt_content][tx_gridelements_backend_layout]=t3ddy-item'
			+ '&defVals[tt_content][tx_gridelements_container]=' + parameters.tx_gridelements_container
			+ '&defVals[tt_content][tx_gridelements_columns]=' + parameters.tx_gridelements_columns
			+ '&returnUrl=' + parameters.returnUrl;
	}

	$(function() {
		var $t3ddyContainers = $($('.t3-gridContainer-t3ddy-accordion, .t3-gridContainer-t3ddy-tab-container').get().reverse());
		$t3ddyContainers.each(function(){

			var $t3ddyContainer = $(this),
				containerLevel = $(this).parents('.t3-gridContainer-t3ddy-accordion, .t3-gridContainer-t3ddy-tab-container').length,
				containerIdentifier = $t3ddyContainer.closest('.exampleContent').prev('.t3-ctype-gridelements_pi1').attr('id');

				// All items includes also items from nested containers!
			var $items = $(this).find('> .t3-gridTable .t3-page-ce-wrapper .t3-page-ce .t3-page-ce-body .t3-page-ce-body-inner-gridelements_pi1');

			$items.each(function(){
				if (!$(this).find('.t3-gridContainer:first').hasClass('t3-gridContainer-t3ddy-item')) {
					$(this).find('.t3-gridTable:first').addClass('normalGrid');
				}
			});

			var $container = $('<div />').addClass('t3ddy');
			if ($t3ddyContainer.hasClass('t3-gridContainer-t3ddy-tab-container')) {
				$container.addClass('t3ddy-tabs');
			} else {
				$container.addClass('t3ddy-accordion');
			}

			var $ul = $('<ul />');
			$items.each(function(){
				var $item = $(this);
				var $parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
				if (containerLevel === $item.parents('.t3-gridContainer-t3ddy-item').length) {
					$parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
					if ($parentItem.length > 1) {
						$parentItem = $parentItem.eq(0);
					}
					var itemTitle = $parentItem.text();
					var itemIdentifier = $parentItem.attr('id');
					var isDisabled = $parentItem.parent('.typo3-dimmed').length > 0;

					var editIcon = $item.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(0)').clone(true);
					var deleteIcon = $item.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(2)').clone(true);

					if ($container.hasClass('t3ddy-tabs')) {
						$('<li />').attr('title', itemTitle).addClass((isDisabled) ? 'hidden' : 'visible').append(
							$('<a />').attr('href', '#t3ddy-tab-' + itemIdentifier).text(itemTitle)
						).append(editIcon).append(deleteIcon).appendTo($ul);
					} else {
						var $icons = $('<div />').addClass('icons').append(editIcon).append(deleteIcon);
						$icons.find('a').click(function(event){
							event.stopPropagation();
						});

						if (itemTitle && $item.parents('.accordionContents').length === 0) {
							var $accordionGroup = $('<div />').addClass('accordionGroup');
							$('<h3 />')
								.text(itemTitle)
								.attr('title', itemTitle)
								.addClass((isDisabled) ? 'hidden' : 'visible')
								.append($icons)
								.appendTo($accordionGroup);

							$('<div />')
								.attr('id', 't3ddy-accordion-' + itemIdentifier)
								.append($item.find('table.t3-gridTable').not('.normalGrid').not('.accordionContents').not('.tabContents').addClass('accordionContents'))
								.appendTo($accordionGroup);

							$accordionGroup.appendTo($container);
						}
					}
				}
			});

			var lastTabUidInList = location.search.replace(/.*id=(\d*).*/g, '$1');

			if ($container.hasClass('t3ddy-tabs')) {
				var lastTabInListHref = $ul.find('li:not(.newTabLink):last a:first').attr('href');
				if (lastTabInListHref) {
					lastTabUidInList = '-' + lastTabInListHref.replace(/\#t3ddy\-tab\-ce(\d*)/g, '$1');
				}
				var directNewLink = createNewItemLink($t3ddyContainer, lastTabUidInList);
				var $newTabLinkTab = $('<li />').addClass('newTabLink');
				$('<a />')
					.text('+')
					.attr('href', directNewLink)
					.click(function(event){
						event.preventDefault();
						location.href = directNewLink;
					})
					.appendTo($newTabLinkTab);
				$newTabLinkTab.appendTo($ul);
				$ul.prependTo($container);
			}

			$items.each(function(){
				var $item = $(this);
				if ($container.hasClass('t3ddy-tabs') && containerLevel === $item.parents('.t3-gridContainer-t3ddy-item').length) {
						// Build tab container
					$parentItem = $item.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
					var tabIdentifier = $parentItem.attr('id');

					$('<div />')
						.attr('id', 't3ddy-tab-' + tabIdentifier)
						.append($item.find('table.t3-gridTable').not('.normalGrid').not('.tabContents').not('.accordionContents').addClass('tabContents'))
						.appendTo($container);
				}
			});

			if ($container.hasClass('t3ddy-tabs')) {
				$container.prependTo($t3ddyContainer);
					// Apply tabs
				$container.tabs({
					beforeActivate: function(event, ui) {
						if (!ui.newTab.hasClass('newTabLink')) {
							var lastTab = ui.newTab.find('a').attr('href');
							$.cookie('t3ddyLastTab-' + containerIdentifier, lastTab);
						} else {
							$.cookie('t3ddyLastTab-' + containerIdentifier + '-new', $ul.find('li').length);
							return false;
						}
					},
					beforeLoad: function(event, ui) {
						return false;
					},
					create: function(event, ui){
						$ul.find('li').each(function(){
							$(this).data('originalIndex', $(this).index());
						});

						var lastTabs = $.cookie();
						if (lastTabs) {
							for (var key in lastTabs) {
								if (key.indexOf('t3ddyLastTab-') === 0 && key.indexOf('-new') === -1) {
									var container = key.replace(/t3ddyLastTab\-(.*)/g, '$1');

									if (lastTabs[key + '-new'] && $ul.find('li').length > parseInt(lastTabs[key + '-new'])) {
										var $lastTab = $('#' + container).parent().find('.t3ddy-tabs ul li:not(.newTabLink):last');
										if ($lastTab) {
											$.removeCookie(key + '-new');
											$lastTab.find('a:first').trigger('click');
											break;
										}
									}
									var $lastTab = $('#' + container).parent().find('.t3ddy-tabs a[href="' + lastTabs[key] + '"]');
									$lastTab.trigger('click');
								}
							}
						}
					}
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

							$.post('../../../ajax.php', {
								ajaxID: 'T3ddy::changeTabOrder',
								t3ddy: {
									tabUid: ui.item.find('a:first').attr('href').replace(/#t3ddy\-tab\-ce(.*)/g, '$1'),
									difference: difference
								}
							}, function(response){
								var response = $.parseJSON(response);
								if (response.status === 'error') {
									alert('Error while changing sorting. Please refresh page and try again.');
								}
							});
						}
					}
				});
			}
			if ($container.hasClass('t3ddy-accordion')) {
					// Prepare link
				var lastTabInListId = $container.find('h3:last').next('div').attr('id');
				if (lastTabInListId) {
					lastTabUidInList = '-' + lastTabInListId.replace(/t3ddy\-accordion\-ce(\d*)/g, '$1');
				}
				var directNewLinkHref = createNewItemLink($t3ddyContainer, lastTabUidInList);
				$container.prependTo($t3ddyContainer);
				$container.accordion({
					heightStyle: 'content',
					header: '> div > h3',
					beforeActivate: function(event, ui) {
						var lastAccordion = ui.newHeader.next('div').attr('id');
						$.cookie('t3ddyLastAccordion-' + containerIdentifier, lastAccordion);
					},
					create: function(event, ui){
						$container.find('.accordionGroup').each(function(){
							$(this).data('originalIndex', $(this).index());
						});
						$container.accordion('option', 'animate', false);

						var lastAccordions = $.cookie();
						if (lastAccordions) {
							for (var key in lastAccordions) {
								if (key.indexOf('t3ddyLastAccordion-') === 0 && key.indexOf('-new') === -1) {
									var container = key.replace(/t3ddyLastAccordion\-(.*)/g, '$1');

									if (lastAccordions[key + '-new'] && $container.find('h3').length > parseInt(lastAccordions[key + '-new'])) {
										var $accordionContainer = $('#' + container);
										if ($accordionContainer) {
											$.removeCookie(key + '-new');
											$accordionContainer.parent().find('h3:last').trigger('click');
											break;
										}
									}
									var $lastAccordion = $('#' + container).parent().find('.t3ddy-accordion div#' + lastAccordions[key]).prev('h3');
									$lastAccordion.trigger('click');
								}
							}
						}
						$container.accordion('option', 'animate', {});
					}
				});

				$('<a />')
					.addClass('newLink ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons')
					.append(
						$('<span />').addClass('ui-accordion-header-icon ui-icon ui-icon-plus')
					)
					.attr('href', directNewLinkHref)
					.click(function(event){
						event.preventDefault();
						$.cookie('t3ddyLastAccordion-' + containerIdentifier + '-new', $container.find('h3').length);
						location.href = directNewLinkHref;
					})
					.appendTo($container);

				$('<div />').addClass('clearRight').appendTo($container);

					// Make accordion pages sortable
				$container.sortable({
					axis: 'y',
					handle: 'h3',
					delay: 150,
					stop: function(event, ui) {
						var newIndex = ui.item.index();
						var difference = newIndex - parseInt(ui.item.data('originalIndex'));
						if (difference !== 0) {
							ui.item.data('originalIndex', ui.item.data('originalIndex') + difference);
							$.post('../../../ajax.php', {
								ajaxID: 'T3ddy::changeTabOrder',
								t3ddy: {
									tabUid: $(ui.item).find('div.ui-accordion-content').attr('id').replace(/t3ddy\-accordion\-ce(.*)/g, '$1'),
									difference: difference
								}
							}, function(response){
								var response = $.parseJSON(response);
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
})(jQuery);
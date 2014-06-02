var jQuery = TYPO3.jQuery;
(function($, undefined) {
	$(function() {
		var $tabContainers = $('.t3-gridContainer-t3ddy-tab-container');
		$tabContainers.each(function(){
			var $tabContainer = $(this);
			var containerIdentifier = $tabContainer.closest('.exampleContent').prev('.t3-ctype-gridelements_pi1').attr('id');
			var $tabs = $(this).find('.t3-gridContainer-t3ddy-item');

			var $container = $('<div />').addClass('t3ddy t3ddy-tabs');
			var $ul = $('<ul />');

			$tabs.each(function(){
					// Build tabs
				var $tab = $(this);
				if ($tab.parents('.t3-gridContainer-t3ddy-item').length > 0) {
					return true;
				}
				var $parentItem = $tab.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
				var tabTitle = $parentItem.text();
				var tabIdentifier = $parentItem.attr('id');
				var isDisabled = $parentItem.parent('.typo3-dimmed').length > 0;

				var editIcon = $tab.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(0)');
				var deleteIcon = $tab.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(2)');

				$('<li />').attr('title', tabTitle).addClass((isDisabled) ? 'hidden' : 'visible').append(
					$('<a />')
						.attr('href', '#t3ddy-tab-' + tabIdentifier)
						.text(tabTitle)
				)
					.append(editIcon)
					.append(deleteIcon)
					.appendTo($ul);
			});

			var lastTabUidInList = location.search.replace(/.*id=(\d*).*/g, '$1');
			var lastTabInListHref = $ul.find('li:not(.newTabLink):last a:first').attr('href');
			if (lastTabInListHref) {
				lastTabUidInList = '-' + lastTabInListHref.replace(/\#t3ddy\-tab\-ce(\d*)/g, '$1');
			}
			var directNewLink = TYPO3.t3ddy.createNewItemLink($tabContainer, lastTabUidInList);
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



			$tabs.each(function(){
					// Build tab container
				var $tab = $(this);
				var $parentItem = $tab.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
				var tabIdentifier = $parentItem.attr('id');
				$('<div />')
					.attr('id', 't3ddy-tab-' + tabIdentifier)
					.append($tab.find('table.t3-gridTable').addClass('tabContents'))
					.appendTo($container);
			});

				// Apply tabs
			$container.prependTo($tabContainer);
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

				// Remove old stuff
			$container.nextAll().remove();
		});

	});
})(jQuery);
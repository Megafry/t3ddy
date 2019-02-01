(function($) {
	$(function() {
		function getActiveItemIndex($container) {
			var activeItemIndex = 0;
			if ($container.find('.t3ddy-item.focus').length > 0) {
				activeItemIndex = $container.find('.t3ddy-item').index($container.find('.t3ddy-item.focus').eq(0));
			}
			if (location.hash) {
				var $anchoredContentElement = $container.find(location.hash);
				var parentT3ddyItem = $anchoredContentElement.closest('.t3ddy-item');
				activeItemIndex = $container.find('.t3ddy-item').index(parentT3ddyItem);
			}
			if ($container.hasClass('leave-all-items-closed')) {
				activeItemIndex = true;
			}
			return activeItemIndex;
		}

		$('.t3ddy-tabContainer').each(function() {
			var $tabContainer = $(this);
			var $tabs = $tabContainer.find('>ul > li');
			$tabs.each(function(){
				var $tab = $(this);
				$tab.find('> .t3ddy-item').appendTo($tabContainer);
			});

			$tabs.find('a').each(function(){
				var $link = $(this);
				var section = $link.attr('href').replace(/.*(#.*)/gi, '$1');
				var newLink = location.pathname + location.search + section;
				$link.attr('href', newLink);
			});

			$tabContainer.tabs({
				active: getActiveItemIndex($tabContainer)
			});
		});


		$('.t3ddy-accordion').each(function() {
			var $accordionContainer = $(this);

			var heightStyle = 'auto';
			if ($accordionContainer.hasClass('height-style-fill')) {
				heightStyle = 'fill';
			} else if ($accordionContainer.hasClass('height-style-content')) {
				heightStyle = 'content';
			}

			$accordionContainer.accordion({
				active: getActiveItemIndex($accordionContainer),
				heightStyle: heightStyle,
				collapsible: $accordionContainer.hasClass('collapsible') || !$accordionContainer.hasClass('single-page-mode'),

				beforeActivate: function(event, ui) {
					if ($accordionContainer.hasClass('single-page-mode')) {
						return true;
					}
					// The accordion believes a panel is being opened
					var currHeader  = ui.oldHeader;
					var currContent = currHeader.next('.ui-accordion-content');
					if (ui.newHeader[0]) {
						currHeader  = ui.newHeader;
						currContent = currHeader.next('.ui-accordion-content');
					}
					// Since we've changed the default behavior, this detects the actual status
					var isPanelSelected = currHeader.attr('aria-selected') == 'true';

					// Toggle the panel's header
					currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

					// Toggle the panel's icon
					currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);

					// Toggle the panel's content
					currContent.toggleClass('accordion-content-active',!isPanelSelected)
					if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

					return false; // Cancel the default action
				}
			});
		});
	});
})(jQuery);

(function($, undefined) {
	$(function() {
		$('.t3ddy-tabContainer').each(function(){
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

			$tabContainer.tabs();
		});

		$('.t3ddy-accordion').each(function(){
			var $accordionContainer = $(this);

			var heightStyle = 'auto';
			if ($accordionContainer.hasClass('height-style-fill')) {
				heightStyle = 'fill';
			} else if ($accordionContainer.hasClass('height-style-content')) {
				heightStyle = 'content';
			}

			$accordionContainer.accordion({
				heightStyle: heightStyle,
				collapsible: !$accordionContainer.hasClass('single-page-mode'),

				beforeActivate: function(event, ui) {
					if ($accordionContainer.hasClass('single-page-mode')) {
						return true;
					}
					// The accordion believes a panel is being opened
					if (ui.newHeader[0]) {
						var currHeader  = ui.newHeader;
						var currContent = currHeader.next('.ui-accordion-content');
						// The accordion believes a panel is being closed
					} else {
						var currHeader  = ui.oldHeader;
						var currContent = currHeader.next('.ui-accordion-content');
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

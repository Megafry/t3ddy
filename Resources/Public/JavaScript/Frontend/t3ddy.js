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
			$accordionContainer.accordion({
				heightStyle: 'content',
				navigation: true
			});
		});
	});
})(jQuery);
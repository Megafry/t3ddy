(function($, undefined) {
	$(function() {
		$('.t3ddy-tabContainer').each(function(){
			var $tabContainer = $(this);
			var $tabs = $tabContainer.find('li');
			$tabs.each(function(){
				var $tab = $(this);
				$tab.find('.t3ddy-item').appendTo($tabContainer);
			});

			$tabContainer.tabs();
		});

		$('.t3ddy-accordion').each(function(){
			var $accordionContainer = $(this);
			$accordionContainer.accordion({
				heightStyle: 'content'
			});
		});
	});
})(jQuery);
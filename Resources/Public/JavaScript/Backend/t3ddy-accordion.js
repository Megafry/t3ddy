var jQuery = TYPO3.jQuery;
(function($, undefined) {
	$(function() {
		var $accordions = $('.t3-gridContainer-t3ddy-accordion');
		$accordions.each(function(){
			var $accordion = $(this);
			var accordionIdentifier = $accordion.closest('.exampleContent').prev('.t3-ctype-gridelements_pi1').attr('id');
			var $pages = $(this).find('.t3-gridContainer-t3ddy-item');

			var $container = $('<div />').addClass('t3ddy t3ddy-accordion');

			$pages.each(function(){
					// Build tabs
				var $page = $(this);
				if ($page.parents('.t3-gridContainer-t3ddy-item').length > 0) {
					return true;
				}
				var $parentItem = $page.closest('.t3-page-ce-body-inner-gridelements_pi1').find('.t3-ctype-gridelements_pi1');
				var pageTitle = $parentItem.text();
				var pageIdentifier = $parentItem.attr('id');
				var isDisabled = $parentItem.parent('.typo3-dimmed').length > 0;

				var $icons = $('<div />').addClass('icons');
				var editIcon = $page.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(0)');
				var deleteIcon = $page.closest('.t3-page-ce-dragitem').find('.t3-row-header span.ce-icons:first a:eq(2)');

				$icons.append(editIcon).append(deleteIcon);
				$icons.find('a').click(function(event){
					event.stopPropagation();
				});

				var $accordionGroup = $('<div />').addClass('accordionGroup');

				$('<h3 />')
					.text(pageTitle)
					.attr('title', pageTitle)
					.addClass((isDisabled) ? 'hidden' : 'visible')
					.append($icons)
					.appendTo($accordionGroup);


				$('<div />')
					.attr('id', 't3ddy-accordion-' + pageIdentifier)
					.append($page.find('table.t3-gridTable').addClass('accordionContents'))
					.appendTo($accordionGroup);

				$accordionGroup.appendTo($container);

			});

				// Prepare link
			var lastTabUidInList = location.search.replace(/.*id=(\d*).*/g, '$1');
			var lastTabInListId = $container.find('h3:last').next('div').attr('id');
			if (lastTabInListId) {
				lastTabUidInList = '-' + lastTabInListId.replace(/t3ddy\-accordion\-ce(\d*)/g, '$1');
			}
			var directNewLinkHref = TYPO3.t3ddy.createNewItemLink($accordion, lastTabUidInList);


				// Apply tabs
			$container.prependTo($accordion);
			$container.accordion({
				heightStyle: 'content',
				header: '> div > h3',

				beforeActivate: function(event, ui) {
					var lastAccordion = ui.newHeader.next('div').attr('id');
					$.cookie('t3ddyLastAccordion-' + accordionIdentifier, lastAccordion);
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
					$.cookie('t3ddyLastAccordion-' + accordionIdentifier + '-new', $container.find('h3').length);
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

				// Remove old stuff
			$container.nextAll().remove();
		});

	});
})(jQuery);
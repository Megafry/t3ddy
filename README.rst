t3ddy for TYPO3 CMS
===================

t3ddy provides comfortable tabs and accordion handling right in TYPO3 page module, using the techniques of gridelements.

Demonstration of 1.0.0-dev: https://www.youtube.com/watch?v=m--P388YaLE

Features
--------

* Adds new content elements for tab container
* Adds new content elements for accordion container
* Adds jQueryUI to page module of TYPO3 and displays the actual tab containers and accordions
  as you would expect them in frontend (see screenshots)
* Also provides jQueryUI for frontend (optional)
* Several settings helps you to customize the behaviour of tabs/accordions in frontend
* Change order of tabs with drag and drop, right in page module
* Auto-focus tab, when a content element inside of this tab has been referenced in the URL (e.g. .../page.html#c123)
* Creates first tab automatically when a new container has been created


Screenshots
-----------

This is how t3ddy looks like in backend of TYPO3 7.6:

*Tab Container*

.. image:: https://forge.typo3.org/attachments/download/30770/2016-03-31_2048.png

*Accordion*

.. image:: https://forge.typo3.org/attachments/download/30771/2016-03-31_2049.png


Requirements
------------

Version 1.0+ of t3ddy requires:

* TYPO3 7.6 or higher and
* Gridelements 3.0.5 or higher


Installation
------------

1. Fetch and install t3ddy in TYPO3
2. Add the static typoscript of gridelements and t3ddy to your TYPO3 template


Extension settings
------------------

t3ddy has some options you can set in extension manager:

* **disableTabContainer:** When enabled, the tab container grid is disabled. Already existing items will stop to work.
* **disableAccordion:** Same as "disableTabContainer" just for accordion items.
* **disableGridElementsChildrenInT3ddyItem:** When enabled the inline field of container grid which contains the children is disabled
* **createFirstT3ddyItem:** When enabled the first tab or page is automatically created when the container has been created.


Grid options
------------

There are three content elements existing. Two for the different containers and one for the tabs/pages inside of it.
Some of them have options.


Accordion container
^^^^^^^^^^^^^^^^^^^

* **Single Page Mode:** When checked, in accordions only one page can be opened at once.
* **collapsible:** When checked, all pages of accordion can get closed again by clicking on header.
* **Leave all items closed:** When enabled, all pages of accordion are initially closed. Set focus of tiles is ignored.
* **Height style:** Controls the height of the accordion container and each page.

Tab container
^^^^^^^^^^^^^

*Tab containers have no options.*

t3ddy item
^^^^^^^^^^

A t3ddy item represents either a single tab or page.

* **Focus:** When checked, this items opens in frontend per default instead of the first item. Don't forget to remove
  this option from other items, where you've set this option before.


Links
-----

* **Donate:** https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LXL6ZT3KCP2S4
* Issue Tracker: https://forge.typo3.org/projects/extension-t3ddy/issues
* Source code: https://bitbucket.org/ArminVieweg/t3ddy

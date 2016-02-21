<?php
namespace ArminVieweg\T3ddy\Hooks;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014 Armin Ruediger Vieweg <armin@v.ieweg.de>
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

use \TYPO3\CMS\Core\Utility\GeneralUtility;
use \TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

/**
 * Class PageRenderer to include additional js and css to page module
 *
 * @author Armin Ruediger Vieweg <armin@v.ieweg.de>
 * @package TYPO3
 * @subpackage tx_t3ddy
 */
class PageRenderer {
	/**
	 * @var \ArminVieweg\T3ddy\Utilities\ExtensionSettings
	 */
	protected $extensionSettings;

	/**
	 * @var string
	 */
	protected $resourcePath;

	/**
	 * @var \TYPO3\CMS\Core\Page\PageRenderer
	 */
	protected $pageRenderer;


	/**
	 * Add css and js to backend page renderer, to make the magic happen
	 *
	 * @param array $parameters
	 * @param \TYPO3\CMS\Core\Page\PageRenderer $pageRenderer
	 * @return void
	 */
	public function addCssAndJs(array $parameters, \TYPO3\CMS\Core\Page\PageRenderer &$pageRenderer) {
		if ($this->isPageModule()) {
		
			$this->initialize($pageRenderer);

			$this->includeLibrariesAndGeneralFiles();

			if ($this->extensionSettings->isTabContainerEnabled()) {
				$this->includeTabContainerFiles();
			}
			if ($this->extensionSettings->isAccordionEnabled()) {
				$this->includeAccordionFiles();
			}
		}
	}

	/**
	 * Initializes this class
	 *
	 * @param \TYPO3\CMS\Core\Page\PageRenderer $pageRenderer
	 * @return void
	 */
	protected function initialize($pageRenderer) {
		$this->pageRenderer = $pageRenderer;
		$this->extensionSettings = GeneralUtility::makeInstance('ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings');
		$this->resourcePath = '/typo3conf/ext/t3ddy/Resources/Public/';
	}

	/**
	 * Checks on basis of GET parameter if current page shows page module
	 *
	 * @return boolean TRUE if is page module, otherwise FALSE
	 */
	protected function isPageModule() {
		if(GeneralUtility::compat_version('7.0')){
			return (array_key_exists('M', $_GET) && $_GET['M'] === 'web_layout');	
		}else{
			return (array_key_exists('id', $_GET) && count($_GET) === 1)
				|| (array_key_exists('id', $_GET) && count($_GET) === 2 && array_key_exists('SET', $_GET));
		}
	}

	/**
	 * Add library files (css and js)
	 *
	 * @return void
	 */
	protected function includeLibrariesAndGeneralFiles() {

		$this->pageRenderer->loadJquery();	
		
		// jQuery UI: sortable		
		$this->pageRenderer->loadRequireJsModule('TYPO3/CMS/Backend/LayoutModule/DragDrop');

		// jQuery cookie
		$this->pageRenderer->addJsLibrary(
			'jquery-cookie', 
			$this->resourcePath . 'JavaScript/Libraries/jquery.cookie.js', 
			'text/javascript', 
			FALSE, 
			FALSE, 
			'', 
			TRUE
		);

		$this->pageRenderer->loadRequireJsModule('TYPO3/CMS/Backend/LayoutModule/DragDrop');

		$this->pageRenderer->addJsFooterFile(
			$this->resourcePath . 'JavaScript/Backend/t3ddy.js', 
			'text/javascript', 
			false, 
			false, 
			'', 
			true
		);
		
		$this->pageRenderer->addCssFile(
			$this->resourcePath . 'CSS/jquery-ui-1.11.4.min.css',
			'stylesheet',
			'all', // media
			'', // title 
			false, // compress
			false, // forcetop
			'', // allWrap
			false //excludeFromConcatenation
		);
		
		$this->pageRenderer->addCssFile(
			$this->resourcePath . 'CSS/t3ddy.css',
			'stylesheet',
			'all', // media
			'', // title 
			false, // compress
			false, // forcetop
			'', // allWrap
			false //excludeFromConcatenation
		);
	}

	/**
	 * Add tab container files (css and js)
	 *
	 * @return void
	 */
	protected function includeTabContainerFiles() {
		$this->pageRenderer->addCssFile(
			$this->resourcePath . 'CSS/t3ddy-tab-container.css', 
			'stylesheet',
			'all', // media
			'', // title 
			false, // compress
			false, // forcetop
			'', // allWrap
			false //excludeFromConcatenation
		);
	}


	/**
	 * Add accordion files (css and js)
	 *
	 * @return void
	 */
	protected function includeAccordionFiles() {
		$this->pageRenderer->addCssFile(
			$this->resourcePath . 'CSS/t3ddy-accordion.css',
			'stylesheet',
			'all', // media
			'', // title 
			false, // compress
			false, // forcetop
			'', // allWrap
			false //excludeFromConcatenation
		);
			
	}

}

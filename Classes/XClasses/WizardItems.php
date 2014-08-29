<?php
namespace ArminVieweg\T3ddy\XClasses;

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

/**
 * Class WizardItems
 *
 * @author Armin Ruediger Vieweg <armin@v.ieweg.de>
 * @package TYPO3
 * @subpackage tx_t3ddy
 */
class WizardItems extends \GridElementsTeam\Gridelements\Hooks\WizardItems {
	/**
	 * Constant for item key
	 */
	const T3DDY_ITEM_KEY = 'gridelements_grid_t3ddy-item';

	/**
	 * Constant for tab container key
	 */
	const T3DDY_TAB_CONTAINER_KEY = 'gridelements_grid_t3ddy-tab-container';

	/**
	 * Constant for accordion key
	 */
	const T3DDY_ACCORDION_KEY = 'gridelements_grid_t3ddy-accordion';

	/**
	 * Manages t3ddy grids in wizard
	 *
	 * @param array $gridItems
	 * @param array $wizardItems
	 * @return void
	 */
	public function addGridItemsToWizard(&$gridItems, &$wizardItems) {
		parent::addGridItemsToWizard($gridItems, $wizardItems);

		unset($wizardItems[self::T3DDY_ITEM_KEY]);

		/** @var \ArminVieweg\T3ddy\Utilities\ExtensionSettings $extensionSettings */
		$extensionSettings = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings');

		if ($extensionSettings->showT3ddyGridsInNewGroup()) {
			$tabContainer = $wizardItems[self::T3DDY_TAB_CONTAINER_KEY];
			$accordion = $wizardItems[self::T3DDY_ACCORDION_KEY];

			unset($wizardItems[self::T3DDY_TAB_CONTAINER_KEY]);
			unset($wizardItems[self::T3DDY_ACCORDION_KEY]);

			$wizardItems[] = array(
				'header' => $GLOBALS['LANG']->sL('LLL:EXT:t3ddy/Resources/Private/Language/locallang_db.xml:wizard.t3ddy.groupheadline')
			);

			if ($extensionSettings->isTabContainerEnabled()) {
				$wizardItems[self::T3DDY_TAB_CONTAINER_KEY] = $tabContainer;
			}

			if ($extensionSettings->isAccordionEnabled()) {
				$wizardItems[self::T3DDY_ACCORDION_KEY] = $accordion;
			}
		}
	}

}
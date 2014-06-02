<?php
namespace ArminVieweg\T3ddy\Ajax;

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

/**
 * Class TabOrder
 *
 * @author Armin Ruediger Vieweg <armin@v.ieweg.de>
 * @package TYPO3
 * @subpackage tx_t3ddy
 */
class TabOrder {

	/**
	 * Perform change of sortings of given tab.
	 * Outputs json string response.
	 *
	 * @return void
	 */
	public function change() {
		$parameters = GeneralUtility::_GPmerged('t3ddy');
		$tabUid = intval($parameters['tabUid']);
		$difference = intval($parameters['difference']);

		if ($difference === 0) {
			return;
		}

			// Tab to change sorting of
		$thisTabRow = $GLOBALS['TYPO3_DB']->exec_SELECTgetSingleRow(
			'sorting,tx_gridelements_container', 'tt_content', 'uid=' . $tabUid
		);

			// All tabs in this grid container
		$tabs = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
			'uid,sorting',
			'tt_content',
			'tx_gridelements_container=' . intval($thisTabRow['tx_gridelements_container']) . ' AND deleted=0',
			'',
			'sorting asc'
		);

			// Index of this tab in grid container
		$index = 0;
		foreach ($tabs as $index => $tab) {
			if (intval($tab['uid']) === $tabUid) {
				break;
			}
		}

		if ($difference < 0) {
				// Shifting up
			for ($i = $index; $i > $index + $difference; $i--) {
				$thisTab = $tabs[$i];
				$tabs[$i] = $tabs[$i - 1];
				$temporarySorting = $tabs[$i]['sorting'];
				$tabs[$i]['sorting'] = $thisTab['sorting'];
				$thisTab['sorting'] = $temporarySorting;
				$tabs[$i - 1] = $thisTab;
			}
		} else {
				// Shifting down
			for ($i = $index; $i < $index + $difference; $i++) {
				$thisTab = $tabs[$i];
				$tabs[$i] = $tabs[$i + 1];
				$temporarySorting = $tabs[$i]['sorting'];
				$tabs[$i]['sorting'] = $thisTab['sorting'];
				$thisTab['sorting'] = $temporarySorting;
				$tabs[$i + 1] = $thisTab;
			}
		}

		$errors = $this->performTabsUpdate($tabs);
		if (!empty($errors)) {
			echo json_encode(array(
				'status' => 'error',
				'uids' => $errors
			));
			return;
		}

		echo json_encode(array(
			'status' => 'ok'
		));
	}

	/**
	 * Performs database update of new tab sortings
	 *
	 * @param array $tabs
	 * @return array with uids which failed during update. Empty if everything is ok.
	 */
	protected function performTabsUpdate(array $tabs) {
		$errors = array();
		foreach ($tabs as $tab) {
			$status = $GLOBALS['TYPO3_DB']->exec_UPDATEquery(
				'tt_content',
				'uid=' . intval($tab['uid']),
				array(
					'sorting' => intval($tab['sorting'])
				)
			);
			if (!$status) {
				$errors[] = $tab['uid'];
			}
		}
		return $errors;
	}
}

<?php
namespace ArminVieweg\T3ddy\Ajax;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2016 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

use ArminVieweg\T3ddy\Utilities\DatabaseUtility;
use \TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class TabOrder
 *
 * @package ArminVieweg\T3ddy
 */
class TabOrder {

	/**
	 * Perform change of sortings of given tab.
	 * Outputs json string response.
	 *
	 * @return void
	 */
	public function change() {
		$databaseConnection = DatabaseUtility::getDatabaseConnection();
		$parameters = GeneralUtility::_GPmerged('t3ddy');
		$tabUid = intval($parameters['tabUid']);
		$difference = intval($parameters['difference']);

		if ($difference === 0) {
			return;
		}

			// Tab to change sorting of
		$thisTabRow = $databaseConnection->exec_SELECTgetSingleRow(
			'sorting,tx_gridelements_container', 'tt_content', 'uid=' . $tabUid
		);

			// All tabs in this grid container
		$tabs = $databaseConnection->exec_SELECTgetRows(
			'uid,sorting',
			'tt_content',
			'tx_gridelements_container=' . intval($thisTabRow['tx_gridelements_container']) . ' AND deleted=0',
			'',
			'sorting asc'
		);

			// Index of this tab in grid container
		$index = 0;
		foreach ($tabs as $key => $tab) {
			if (intval($tab['uid']) === $tabUid) {
				$index = $key;
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
			$status = DatabaseUtility::getDatabaseConnection()->exec_UPDATEquery(
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

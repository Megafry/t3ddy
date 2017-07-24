<?php
namespace ArminVieweg\T3ddy\Ajax;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

use ArminVieweg\T3ddy\Utilities\DatabaseUtility;
use \TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class TabOrder
 *
 * @package ArminVieweg\T3ddy
 */
class TabOrder
{
    /**
     * Perform change of sortings of given tab.
     * Outputs json string response.
     *
     * @return void
     */
    public function change()
    {
        $databaseConnection = DatabaseUtility::getDatabaseConnection();
        $parameters = GeneralUtility::_GPmerged('t3ddy');
        $movedItemRow = $databaseConnection->exec_SELECTgetSingleRow(
            '*',
            'tt_content',
            'uid = ' . (int) $parameters['item']
        );

        /** @var \TYPO3\CMS\Core\DataHandling\DataHandler $dataHandler */
        $dataHandler = GeneralUtility::makeInstance(\TYPO3\CMS\Core\DataHandling\DataHandler::class);
        $cmd = [];
        if ($parameters['insertAfter']) {
            $cmd['tt_content'][$movedItemRow['uid']]['move'] = '-' . $parameters['insertAfter'];
        } else {
            $cmd['tt_content'][$movedItemRow['uid']]['move'] = $movedItemRow['pid'];
        }
        $dataHandler->start([], $cmd);
        $dataHandler->process_cmdmap();
        echo json_encode(['status' => 'ok']);
    }
}

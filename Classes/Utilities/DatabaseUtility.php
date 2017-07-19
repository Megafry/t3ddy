<?php
namespace ArminVieweg\T3ddy\Utilities;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

/**
 * Database Utility
 *
 * @package ArminVieweg\T3ddy
 */
class DatabaseUtility
{
    /**
     * Returns a valid DatabaseConnection object that is connected and ready
     * to be used static
     *
     * @return \TYPO3\CMS\Core\Database\DatabaseConnection
     */
    public static function getDatabaseConnection()
    {
        if (!$GLOBALS['TYPO3_DB']) {
            \TYPO3\CMS\Core\Core\Bootstrap::getInstance()->initializeTypo3DbGlobal();
        }
        return $GLOBALS['TYPO3_DB'];
    }
}

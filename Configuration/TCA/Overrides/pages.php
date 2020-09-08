<?php
defined('TYPO3_MODE') || die('Access denied.');

// Register PageTS defaults
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('tx_t3ddy.defaults {
	newT3ddyItemTitle = New Item
}');

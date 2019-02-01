<?php
if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript/', 'T3ddy');

// Register PageTS defaults
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('tx_t3ddy.defaults {
	newT3ddyItemTitle = New Item
}');

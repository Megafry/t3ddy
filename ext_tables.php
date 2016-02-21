<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript/', 'T3ddy');

if (TYPO3_MODE === 'BE') {
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] =
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/PageRenderer.php:ArminVieweg\\T3ddy\\Hooks\\PageRenderer->addCssAndJs';
}

// Register PageTS defaults
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('tx_t3ddy.defaults {
	newT3ddyItemTitle = New Item
}');

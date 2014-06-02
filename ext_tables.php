<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

/** @var \ArminVieweg\T3ddy\Utilities\ExtensionSettings $extensionSettings */
$extensionSettings = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance('ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings');

if ($extensionSettings->isTabContainerEnabled()) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(file_get_contents(
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/Gridelements/TabContainer/tsconfig.ts'
	));
}

if ($extensionSettings->isAccordionEnabled()) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(file_get_contents(
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/Gridelements/Accordion/tsconfig.ts'
	));
}

if ($extensionSettings->isAccordionEnabled() || $extensionSettings->isTabContainerEnabled()) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(file_get_contents(
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/Gridelements/Item/tsconfig.ts'
	));
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript/', 'T3ddy');

if (TYPO3_MODE === 'BE') {
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] =
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/PageRenderer.php:ArminVieweg\\T3ddy\\Hooks\\PageRenderer->addCssAndJs';
}
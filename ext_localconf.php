<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE') {
		// Tab order ajax
	$GLOBALS['TYPO3_CONF_VARS'][TYPO3_MODE]['AJAX']['T3ddy::changeTabOrder']
		= 'EXT:t3ddy/Classes/Ajax/TabOrder.php:ArminVieweg\\T3ddy\\Ajax\\TabOrder->change';

		// Wizard XClass
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects']['GridElementsTeam\\Gridelements\\Hooks\\WizardItems'] = array(
		'className' => 'ArminVieweg\\T3ddy\\XClasses\\WizardItems',
	);
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
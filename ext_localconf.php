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
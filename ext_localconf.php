<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE') {

    if (TYPO3_REQUESTTYPE & TYPO3_REQUESTTYPE_BE) {
        $pageRenderer = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        $pageRenderer->addRequireJsConfiguration(
            [
                'paths' => [
                    'jquery.cookie' => \TYPO3\CMS\Core\Utility\PathUtility::getAbsoluteWebPath(
                        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath(
                            $_EXTKEY,
                            'Resources/Public/JavaScript/Libraries/'
                        )
                    ) . 'jquery.cookie'
                ]
            ]
        );
        $pageRenderer->addRequireJsConfiguration(
            [
                'paths' => [
                    'jquery-ui/sortable' => \TYPO3\CMS\Core\Utility\PathUtility::getAbsoluteWebPath(
                        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath(
                            $_EXTKEY,
                            'Resources/Public/JavaScript/Libraries/'
                        )
                    ) . 'jquery-ui-1.11.4-custom.min'
                ]
            ]
        );
    }

    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] =
        \ArminVieweg\T3ddy\Hooks\PageRenderer::class . '->addAssets';


    // Tab order ajax
//	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerAjaxHandler (
//        'T3ddy::changeTabOrder',
//        'ArminVieweg\\T3ddy\\Ajax\\TabOrder->change'
//	);
//
//		// Link builder ajax
//	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerAjaxHandler (
//        'T3ddy::buildCreateNewItemLink',
//        'ArminVieweg\\T3ddy\\Ajax\\LinkBuilder->createNewItemLink'
//	);
}

/** @var \ArminVieweg\T3ddy\Utilities\ExtensionSettings $extensionSettings */
$extensionSettings = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
	'ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings'
);

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

if ($extensionSettings->disableGridElementsChildrenInT3ddyItem()) {
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
		TCEFORM.tt_content.tx_gridelements_children.types.gridelements_pi1.disabled = 1
	');
}

if ($extensionSettings->createFirstT3ddyItem()) {
	// AfterSave hook
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass']['t3ddy'] =
		'ArminVieweg\\T3ddy\\Hooks\\AfterSaveHook';
}

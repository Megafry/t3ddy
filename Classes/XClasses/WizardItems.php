<?php
namespace ArminVieweg\T3ddy\XClasses;

    /*  | This extension is part of the TYPO3 project. The TYPO3 project is
     *  | free software and is licensed under GNU General Public License.
     *  |
     *  | (c) 2014-2016 Armin Ruediger Vieweg <armin@v.ieweg.de>
     */
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class WizardItems
 *
 * @package ArminVieweg\t3ddy
 */
class WizardItems extends \GridElementsTeam\Gridelements\Hooks\WizardItems
{
    /**
     * Constant for item key
     */
    const T3DDY_ITEM_KEY = 'gridelements_grid_t3ddy-item';

    /**
     * Constant for tab container key
     */
    const T3DDY_TAB_CONTAINER_KEY = 'gridelements_grid_t3ddy-tab-container';

    /**
     * Constant for accordion key
     */
    const T3DDY_ACCORDION_KEY = 'gridelements_grid_t3ddy-accordion';

    /**
     * Manages t3ddy grids in wizard
     *
     * @param array $gridItems
     * @param array $wizardItems
     * @return void
     */
    public function addGridItemsToWizard(&$gridItems, &$wizardItems)
    {
        parent::addGridItemsToWizard($gridItems, $wizardItems);

        unset($wizardItems[self::T3DDY_ITEM_KEY]);

        /** @var \ArminVieweg\T3ddy\Utilities\ExtensionSettings $extensionSettings */
        $extensionSettings = GeneralUtility::makeInstance('ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings');

        if ($extensionSettings->showT3ddyGridsInNewGroup()) {
            $tabContainer = $wizardItems[self::T3DDY_TAB_CONTAINER_KEY];
            $accordion = $wizardItems[self::T3DDY_ACCORDION_KEY];

            unset($wizardItems[self::T3DDY_TAB_CONTAINER_KEY]);
            unset($wizardItems[self::T3DDY_ACCORDION_KEY]);

            $wizardItems[] = array(
                'header' => $GLOBALS['LANG']->sL(
                    'LLL:EXT:t3ddy/Resources/Private/Language/locallang_db.xml:wizard.t3ddy.groupheadline'
                )
            );

            if ($extensionSettings->isTabContainerEnabled()) {
                $wizardItems[self::T3DDY_TAB_CONTAINER_KEY] = $tabContainer;
            }
            if ($extensionSettings->isAccordionEnabled()) {
                $wizardItems[self::T3DDY_ACCORDION_KEY] = $accordion;
            }
        }
    }
}

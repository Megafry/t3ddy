<?php
namespace ArminVieweg\T3ddy\Hooks;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

use ArminVieweg\T3ddy\Utilities\ExtensionSettings;
use \TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class PageRenderer to include additional js and css to page module
 *
 * @package ArminVieweg/T3ddy
 */
class PageRenderer
{
    /**
     * @var ExtensionSettings
     */
    protected $extensionSettings;

    /**
     * @var string
     */
    protected $resourcePath;

    /**
     * @var \TYPO3\CMS\Core\Page\PageRenderer
     */
    protected $pageRenderer;

    /**
     * Add css and js to backend page renderer, to make the magic happen
     *
     * @param array $parameters
     * @param \TYPO3\CMS\Core\Page\PageRenderer $pageRenderer
     * @return void
     */
    public function addAssets(array $parameters, \TYPO3\CMS\Core\Page\PageRenderer &$pageRenderer)
    {
        if ($this->isPageModule()) {
            $extensionSettings = GeneralUtility::makeInstance(ExtensionSettings::class);

            $pageRenderer->loadRequireJsModule('TYPO3/CMS/T3ddy/Backend/T3ddy');
//            $this->initialize($pageRenderer);

//            $this->includeLibrariesAndGeneralFiles();

            if ($extensionSettings->isTabContainerEnabled()) {
//                $this->includeTabContainerFiles();
            }
            if ($extensionSettings->isAccordionEnabled()) {
//                $this->includeAccordionFiles();
            }
        }
    }

    /**
     * Initializes this class
     *
     * @param \TYPO3\CMS\Core\Page\PageRenderer $pageRenderer
     * @return void
     */
    protected function initialize($pageRenderer)
    {
        $this->pageRenderer = $pageRenderer;
//        $this->extensionSettings = GeneralUtility::makeInstance('ArminVieweg\\T3ddy\\Utilities\\ExtensionSettings');
//        $this->resourcePath = ExtensionManagementUtility::extRelPath('t3ddy') . '/Resources/Public/';
    }

    /**
     * Checks on basis of GET parameter if current page shows page module
     *
     * @return boolean TRUE if is page module, otherwise FALSE
     */
    protected function isPageModule()
    {
        if (version_compare(TYPO3_version, '8', '<')) {
            return (array_key_exists('M', $_GET) && $_GET['M'] === 'web_layout');
        }
        if (version_compare(TYPO3_version, '9', '<')) {
            return (array_key_exists('id', $_GET) && count($_GET) === 1) ||
                   (array_key_exists('id', $_GET) && count($_GET) === 2 && array_key_exists('SET', $_GET));
        }
        return array_key_exists('id', $_GET) && array_key_exists('token', $_GET) &&
               array_key_exists('route', $_GET) && $_GET['route'] === '/web/layout/';
    }

    /**
     * Add library files (css and js)
     *
     * @return void
     */
    protected function includeLibrariesAndGeneralFiles()
    {
        $this->pageRenderer->loadJquery();

        // jQuery UI: sortable
        $this->pageRenderer->loadRequireJsModule('TYPO3/CMS/Backend/LayoutModule/DragDrop');

        // jQuery cookie
        $this->pageRenderer->addJsLibrary(
            'jquery-cookie',
            $this->resourcePath . 'JavaScript/Libraries/jquery.cookie.js',
            'text/javascript',
            FALSE,
            FALSE,
            '',
            TRUE
        );

        $this->pageRenderer->loadRequireJsModule('TYPO3/CMS/Backend/LayoutModule/DragDrop');

        $this->pageRenderer->addJsFooterFile(
            $this->resourcePath . 'JavaScript/Backend/t3ddy.js',
            'text/javascript',
            false,
            false,
            '',
            true
        );

        $this->pageRenderer->addCssFile(
            $this->resourcePath . 'CSS/jquery-ui-1.11.4.min.css',
            'stylesheet',
            'all', // media
            '', // title
            false, // compress
            false, // forcetop
            '', // allWrap
            false //excludeFromConcatenation
        );

        $this->pageRenderer->addCssFile(
            $this->resourcePath . 'CSS/t3ddy.css',
            'stylesheet',
            'all', // media
            '', // title
            false, // compress
            false, // forcetop
            '', // allWrap
            false //excludeFromConcatenation
        );
    }

    /**
     * Add tab container files (css and js)
     *
     * @return void
     */
    protected function includeTabContainerFiles()
    {
        $this->pageRenderer->addCssFile(
            $this->resourcePath . 'CSS/t3ddy-tab-container.css',
            'stylesheet',
            'all',
            '',             false,
            false,
            '',
            false
        );
    }

    /**
     * Add accordion files (css and js)
     *
     * @return void
     */
    protected function includeAccordionFiles()
    {
        $this->pageRenderer->addCssFile(
            $this->resourcePath . 'CSS/t3ddy-accordion.css',
            'stylesheet',
            'all',
            '',
            false,
            false,
            '',
            false
        );

    }
}

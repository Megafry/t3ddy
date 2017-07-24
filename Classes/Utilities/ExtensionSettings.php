<?php
namespace ArminVieweg\T3ddy\Utilities;

/*  | This extension is part of the TYPO3 project. The TYPO3 project is
 *  | free software and is licensed under GNU General Public License.
 *  |
 *  | (c) 2014-2017 Armin Ruediger Vieweg <armin@v.ieweg.de>
 */

/**
 * Class ExtensionSettings
 *
 * @package ArminVieweg\T3ddy
 */
class ExtensionSettings implements \TYPO3\CMS\Core\SingletonInterface
{
    /**
     * Constant for extension key
     */
    const EXTKEY = 't3ddy';

    /**
     * @var array
     */
    protected $settings = [];

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->settings = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][static::EXTKEY]);
    }

    /**
     * Returns value of setting "disableTabContainer"
     *
     * @return boolean
     */
    public function isTabContainerEnabled()
    {
        return !(bool) $this->settings['disableTabContainer'];
    }

    /**
     * Returns value of setting "disableAccordion"
     *
     * @return boolean
     */
    public function isAccordionEnabled()
    {
        return !(bool) $this->settings['disableAccordion'];
    }

    /**
     * Returns value of setting "disableGridElementsChildrenInT3ddyItem"
     *
     * @return bool
     */
    public function disableGridElementsChildrenInT3ddyItem()
    {
        return (bool) $this->settings['disableGridElementsChildrenInT3ddyItem'];
    }

    /**
     * Returns value of setting "createFirstT3ddyItem"
     *
     * @return bool
     */
    public function createFirstT3ddyItem()
    {
        return (bool) $this->settings['createFirstT3ddyItem'];
    }
}

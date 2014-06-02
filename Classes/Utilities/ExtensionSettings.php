<?php
namespace ArminVieweg\T3ddy\Utilities;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014 Armin Ruediger Vieweg <armin@v.ieweg.de>
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * Class ExtensionSettings
 *
 * @author Armin Ruediger Vieweg <armin@v.ieweg.de>
 * @package TYPO3
 * @subpackage tx_t3ddy
 */
class ExtensionSettings implements \TYPO3\CMS\Core\SingletonInterface {
	/**
	 * Constant for extension key
	 */
	const EXTKEY = 't3ddy';

	/**
	 * @var array
	 */
	protected $settings = array();

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->settings = unserialize($GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf'][self::EXTKEY]);
	}

	/**
	 * Returns value of setting "disableTabContainer"
	 *
	 * @return boolean
	 */
	public function isTabContainerEnabled() {
		return !(boolean) $this->settings['disableTabContainer'];
	}

	/**
	 * Returns value of setting "disableAccordion"
	 *
	 * @return boolean
	 */
	public function isAccordionEnabled() {
		return !(boolean) $this->settings['disableAccordion'];
	}

	/**
	 * Returns value of setting "showT3ddyGridsInNewGroup"
	 *
	 * @return boolean
	 */
	public function showT3ddyGridsInNewGroup() {
		return (boolean) $this->settings['showT3ddyGridsInNewGroup'];
	}




}
<?php
namespace ArminVieweg\T3ddy\Ajax;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2015 Patrick Crausaz <info@frontal.ch>
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

use \TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Backend\Routing\UriBuilder;

/**
 * Class LinkBuilder
 *
 * @author Patrick Crausaz <info@frontal.ch>
 * @package TYPO3
 * @subpackage tx_t3ddy
 * @todo status response hardcoded
 */
class LinkBuilder {

	/**
	 * Builds the link to create a new t3ddy item
	 * @return void
	 */
	public function createNewItemLink() {
		
		// /** @var UriBuilder $uriBuilder */
        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);

		$parameters = GeneralUtility::_GPmerged('t3ddy');
		$pid = intval($parameters['pid']);
		$colPos = $parameters['colPos'];
		$lastItemId = intval($parameters['lastItemId']);
		$sys_language_uid = $parameters['sys_language_uid'];
		$tx_gridelements_container = $parameters['tx_gridelements_container'];
		$tx_gridelements_columns = $parameters['tx_gridelements_columns'];
		
		 if($lastItemId === 0){
		 	// No t3ddy-items yet
		 	// create first t3ddy-item within current grid
		 	$lastItemId = $pid;
		 }else{
		 	// create new t3ddy-item after this ContentElement ID
		 	$lastItemId = '-'.$lastItemId;
		 }
		
		// generate return URL
		$returnUrl = urlencode($uriBuilder->buildUriFromModule('web_layout', array('id' => $pid)));

		$urlParams = array(
			'edit[tt_content]['.$lastItemId.']' => 'new',
			'defVals[tt_content][colPos]' => $colPos,
			'defVals[tt_content][sys_language_uid]' => $sys_language_uid,
			'defVals[tt_content][CType]' => 'gridelements_pi1',
			'defVals[tt_content][tx_gridelements_backend_layout]' => 't3ddy-item',
			'defVals[tt_content][tx_gridelements_container]' => $tx_gridelements_container,
			'defVals[tt_content][tx_gridelements_columns]' => $tx_gridelements_columns,
			'returnUrl' => $returnUrl
		);
		
        $link = $uriBuilder->buildUriFromRoute('record_edit', $urlParams);
        $uri = $link->getPath() .'?'. $link->getQuery();
        
        echo json_encode(array(
			'status' => 'ok',
			'link' => $uri
		));
	}

}
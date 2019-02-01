<?php

/*  | This extension is made with â¤ for TYPO3 CMS and is licensed
 *  | under GNU General Public License.
 *  |
 *  | (c) 2019 Armin Vieweg <armin@v.ieweg.de>
 */

/*
 * Definitions for routes provided by EXT:t3ddy
 * Contains all AJAX-based routes for entry points
 */
return [
    't3ddy_taborder' => [
        'path' => '/t3ddy/taborder',
        'target' => \ArminVieweg\T3ddy\Ajax\TabOrder::class . '::change'
    ],
    't3ddy_linkbuilder' => [
        'path' => '/t3ddy/linkbuilder',
        'target' => \ArminVieweg\T3ddy\Ajax\LinkBuilder::class . '::createNewItemLink'
    ],
];

<?php
defined('TYPO3_MODE') || die('Access denied.');

    
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
  't3ddy',
  'Configuration/TypoScript/',
  'T3ddy');

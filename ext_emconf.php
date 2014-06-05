<?php

########################################################################
# Extension Manager/Repository config file for ext "t3ddy".
#
# Manual updates:
# Only the data in the array - everything else is removed by next
# writing. "version" and "dependencies" must not be touched!
########################################################################

$EM_CONF[$_EXTKEY] = array(
	'title' => 'T3ddy - Super cute tabs and accordions',
	'description' => 'T3ddy provides comfortable tabs and accordion handling right in TYPO3 page module using the magic of gridelements.',
	'category' => 'Backend',
	'author' => 'Armin Ruediger Vieweg',
	'author_email' => 'armin@v.ieweg.de',
	'author_company' => '',
	'shy' => '',
	'dependencies' => '',
	'conflicts' => '',
	'priority' => '',
	'module' => '',
	'state' => 'beta',
	'internal' => '',
	'uploadfolder' => 0,
	'createDirs' => '',
	'modify_tables' => '',
	'clearCacheOnLoad' => 0,
	'lockType' => '',
	'version' => '0.1.1',
	'constraints' => array(
		'depends' => array(
			'typo3' => '6.0.0-6.2.99',
			'gridelements' => '2.0.0-3.0.99',
		),
		'conflicts' => array(
		),
		'suggests' => array(
		),
	),
	'suggests' => array(
	),
);

?>
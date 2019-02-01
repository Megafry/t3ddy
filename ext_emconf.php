<?php

$EM_CONF[$_EXTKEY] = [
	'title' => 't3ddy - Super cute tabs and accordions',
	'description' => 't3ddy provides comfortable tabs and accordion handling right in TYPO3 page module, using the techniques of gridelements.',
	'category' => 'be',
	'author' => 'Armin Ruediger Vieweg',
	'author_email' => 'armin@v.ieweg.de',
	'author_company' => '',
	'state' => 'stable',
	'uploadfolder' => 0,
	'createDirs' => '',
	'clearCacheOnLoad' => 0,
	'version' => '1.2.0',
	'constraints' => [
		'depends' => [
		    'php' => '7.1.0-7.3.99',
			'typo3' => '8.7.0-9.5.99',
			'gridelements' => '8.3.0-9.9.99',
        ],
		'conflicts' => [
        ],
		'suggests' => [
        ],
    ],
    'autoload' => [
        'psr-4' => ['ArminVieweg\\T3ddy\\' => 'Classes']
    ]
];

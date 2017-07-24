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
			'typo3' => '7.6.0-8.7.99',
			'gridelements' => '3.0.5-8.0.99',
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

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
	'version' => '2.0.2',
	'constraints' => [
		'depends' => [
					'typo3' => '10.4.0-11.5.99',
					'gridelements' => '10.0.0-11.9.99',
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

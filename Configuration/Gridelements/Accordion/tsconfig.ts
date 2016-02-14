tx_gridelements.setup.t3ddy-accordion {
	title = LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:title
	description = LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:description
	icon = EXT:t3ddy/Configuration/Gridelements/Accordion/icon.gif
	frame = t3ddy-accordion

	config {
		colCount = 1
		rowCount = 1
		rows {
			1 {
				columns {
					1 {
						name = Pages
						colspan = 1
						colPos = 31337
						allowed = gridelements_pi1
					}
				}
			}
		}
	}
}
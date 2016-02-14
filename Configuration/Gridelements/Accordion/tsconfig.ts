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
	flexformDS (
		<T3DataStructure>
			<meta>
				<langDisable>1</langDisable>
			</meta>
			<ROOT type="array">
				<type>array</type>
				<el type="array">
					<singlePageMode type="array">
						<TCEforms type="array">
							<label>LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.singlePageMode</label>
							<config type="array">
								<type>select</type>
								<items type="array">
									<numIndex index="0" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.off</numIndex>
										<numIndex index="1"></numIndex>
									</numIndex>
									<numIndex index="1" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.on</numIndex>
										<numIndex index="1">single-page-mode</numIndex>
									</numIndex>
								</items>
								<default>single-page-mode</default>
								</config>
						</TCEforms>
					</singlePageMode>
				</el>
			</ROOT>
		</T3DataStructure>
	)
}

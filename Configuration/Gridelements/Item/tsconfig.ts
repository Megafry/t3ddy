tx_gridelements.setup.t3ddy-item {
	title = LLL:EXT:t3ddy/Configuration/Gridelements/Item/locallang.xml:title
	description = LLL:EXT:t3ddy/Configuration/Gridelements/Item/locallang.xml:description
	icon = EXT:t3ddy/Resources/Public/Icons/Gridelements/Item/icon.gif
	frame = t3ddy-item

	config {
		colCount = 1
		rowCount = 1
		rows {
			1 {
				columns {
					1 {
						name = LLL:EXT:t3ddy/Configuration/Gridelements/Item/locallang.xml:column.contentElements
						colspan = 1
						colPos = 31338
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
					<focus type="array">
						<TCEforms type="array">
							<label>LLL:EXT:t3ddy/Configuration/Gridelements/Item/locallang.xml:option.focus</label>
							<config type="array">
								<type>select</type>
								<items type="array">
									<numIndex index="0" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.off</numIndex>
										<numIndex index="1"></numIndex>
									</numIndex>
									<numIndex index="1" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.on</numIndex>
										<numIndex index="1">focus</numIndex>
									</numIndex>
								</items>
								<default></default>
							</config>
						</TCEforms>
					</focus>
				</el>
			</ROOT>
		</T3DataStructure>
	)
}

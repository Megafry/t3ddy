tx_gridelements.setup.t3ddy-accordion {
	title = LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:title
	description = LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:description
	icon = EXT:t3ddy/Resources/Public/Icons/Gridelements/Accordion/icon.gif
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
										<numIndex index="1">multi-page-mode</numIndex>
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
					<collapsible type="array">
						<TCEforms type="array">
							<label>LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.collapsible</label>
							<config type="array">
								<type>select</type>
								<items type="array">
									<numIndex index="0" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.off</numIndex>
										<numIndex index="1"></numIndex>
									</numIndex>
									<numIndex index="1" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.on</numIndex>
										<numIndex index="1">collapsible</numIndex>
									</numIndex>
								</items>
								<default></default>
							</config>
						</TCEforms>
					</collapsible>
					<leaveAllItemsClosed type="array">
						<TCEforms type="array">
							<label>LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.leaveAllItemsClosed</label>
							<config type="array">
								<type>select</type>
								<items type="array">
									<numIndex index="0" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.off</numIndex>
										<numIndex index="1">respect-set-focus</numIndex>
									</numIndex>
									<numIndex index="1" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.on</numIndex>
										<numIndex index="1">leave-all-items-closed</numIndex>
									</numIndex>
								</items>
								<default>respect-set-focus</default>
							</config>
						</TCEforms>
					</leaveAllItemsClosed>
					<heightStyle type="array">
						<TCEforms type="array">
							<label>LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.heightStyle</label>
							<config type="array">
								<type>select</type>
								<items type="array">
									<numIndex index="0" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.heightStyle.auto</numIndex>
										<numIndex index="1">height-style-auto</numIndex>
									</numIndex>
									<numIndex index="1" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.heightStyle.fill</numIndex>
										<numIndex index="1">height-style-fill</numIndex>
									</numIndex>

									<numIndex index="2" type="array">
										<numIndex index="0">LLL:EXT:t3ddy/Configuration/Gridelements/Accordion/locallang.xml:option.heightStyle.content</numIndex>
										<numIndex index="1">height-style-content</numIndex>
									</numIndex>
								</items>
								<default>height-style-auto</default>
							</config>
						</TCEforms>
					</heightStyle>
				</el>
			</ROOT>
		</T3DataStructure>
	)
}

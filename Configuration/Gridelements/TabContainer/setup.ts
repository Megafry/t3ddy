tt_content.gridelements_pi1.20.10.setup.t3ddy-tab-container {
	columns {
		31337 {
			renderObj = COA
			renderObj {
				10 = TEXT
				10 {
					field = header
					typolink.parameter = #{field:uid}
					typolink.parameter.insertData = 1
					typolink.ATagParams = class="t3ddy-tab-title"
				}


				20 =< tt_content
				20.stdWrap.dataWrap = <div class="t3ddy-item t3ddy-tab-item {field:flexform_focus}" id="c{field:uid}">|</div>

				wrap = <li>|</li>
			}
		}
	}
	wrap = <div class="t3ddy t3ddy-tabContainer"><ul class="t3ddy-tabContainer-tabList">|</ul></div>
	prepend < lib.stdheader
}

tt_content.gridelements_pi1.20.10.setup.t3ddy-accordion {
	columns {
		31337 {
			renderObj = COA
			renderObj {
				10 = TEXT
				10 {
					field = header
					wrap = <h3 class="t3ddy-accordion-header">|</h3>
				}

				20 =< tt_content
				20.stdWrap.dataWrap = <div class="t3ddy-item t3ddy-accordion-item" id="c{field:uid}">|</div>
			}
		}
	}
	wrap = <div class="t3ddy t3ddy-accordion">|</div>
	prepend < lib.stdheader
}
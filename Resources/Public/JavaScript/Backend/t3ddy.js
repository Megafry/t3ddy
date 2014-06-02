var TYPO3 = TYPO3 || {};
TYPO3.t3ddy = {};

TYPO3.t3ddy.createNewItemLink = function($tabContainer, lastTabUidInList) {
	var originalNewLink = $tabContainer.find('.t3-page-ce-wrapper-new-ce:first a:first').attr('onclick').replace(/.*\?(.*)\'.*/g, '$1');
	var parts = originalNewLink.split('&');
	var parameters = {};

	for (var i = 0; i < parts.length; i++) {
		var part = parts[i].split('=');
		parameters[part[0]] = part[1];
	}

	var sysLanguageUid = parseInt(parameters.sys_language_uid);
	if (isNaN(sysLanguageUid)) {
		sysLanguageUid = 0;
	}

	var directNewLink = '../../../alt_doc.php'
		+ '?edit[tt_content][' + lastTabUidInList + ']=new'
		+ '&defVals[tt_content][colPos]=' + parameters.colPos
		+ '&defVals[tt_content][sys_language_uid]=' + sysLanguageUid
		+ '&defVals[tt_content][CType]=gridelements_pi1'
		+ '&defVals[tt_content][tx_gridelements_backend_layout]=t3ddy-item'
		+ '&defVals[tt_content][tx_gridelements_container]=' + parameters.tx_gridelements_container
		+ '&defVals[tt_content][tx_gridelements_columns]=' + parameters.tx_gridelements_columns
		+ '&returnUrl=' + parameters.returnUrl;

	return directNewLink;
}
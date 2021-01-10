import {loadReplacedContent} from "./modules.js";

(function() {

	const base = document.getElementById('replacement-base');


	function replaceContent(elementName) {
		let elements = document.getElementsByTagName(elementName);
		let i;
		for (i=0; i < elements.length; i++) {
			let element = elements[i];
			let id = 'element-' + i;
			// let consentText = frame.getAttribute('data-consent-text');
			// let htmlReplace = '<div id="' + id +'" class="replacement" data-omcookie-panel-show=""><strong>'+ consentText +'</strong></div>';
			let htmlReplace = base.cloneNode(true);

			htmlReplace.setAttribute('id', id);
			htmlReplace.classList.remove('hidden');

			element.setAttribute('data-element-id',id);
			element.insertAdjacentHTML('afterend',htmlReplace.outerHTML);
			element.classList.add('hidden');
		}
	}
	function getCookie(cookiename) {
		var name = cookiename + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	function checkCookie() {
		let cookiedata = getCookie("omCookieConsent");
		cookiedata = cookiedata.split(',');
		let groupname;
		let groupvalue;
		for(let i=0;cookiedata[i];i++) {
			cookiedata[i] = cookiedata[i].split('.');
			groupname = cookiedata[i][0];
			groupvalue = cookiedata[i][1];
			if(groupname == 'group-2' && groupvalue == 1) {
				return true;
			}
		}
	}

	if(checkCookie() === true) {
		loadReplacedContent();
	} else {
		replaceContent('iframe');
	}

})();

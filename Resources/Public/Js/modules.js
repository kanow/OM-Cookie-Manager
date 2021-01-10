export function loadReplacedContent(elementName) {
	let frames = document.getElementsByTagName(elementName);

	let i;
	for (i = 0;frames[i]; i++) {
		let dataSrc;
		let frame = frames[i];
		dataSrc = frame.getAttribute('data-src');
		frame.classList.remove('hidden');
		frame.setAttribute('src', dataSrc);

		let replacement;
		replacement = document.getElementById(frame.getAttribute('data-element-id'));
		if(replacement) {
			replacement.remove();
		}
	}
}

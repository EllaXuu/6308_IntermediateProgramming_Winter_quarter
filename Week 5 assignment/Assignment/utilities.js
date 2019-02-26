// Helper function to add an event listener
function addEvent(el, event, callback) {
	// parapeters are element that will get the event listener,
	// the event and a callback function as the event handler
	// first check to see there's already an event listener in place
	if ('addEventListener' in el) {
		el.addEventListener(event, callback, false);
	} else {
		el['e' + event + callback] = callback;
		el[event + callback] = function () {
			el['e' + event + callback](window.event);
		};
	
		el.attachEvent('on' + event, el[event + callback]);
	};
}

// Helper function to remove an event listener
function removeEvent (el, event, callback) {
	// if we already have it taken care of, just use it
	if ('removeEventListener' in el) {
		el.removeEventListener(event, callback, false);
	} else {
		el.detachEvent('on' + event, el[event + callback]); // IE fallback
		el[event + callback] = null;
		el['e' + event + callback] = null;
	}
}
"use strict";

import '../css/index.sass'

var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
    if (_this.className.match(/pseudoStyle/)) {
        var className = _this.className.match(/pseudoStyle[0-9]{1,}/)[0];
    } else {
	    var className = "pseudoStyle" + UID.getNew();
	    _this.className +=  " "+className; 
    }
	
    var style =" ."+className+":"+element+"{"+prop+":"+value+"}"

    if (_sheet.innerHTML.match(new RegExp("."+className+":"+element))) {
        var newStyle = _sheet.innerHTML.replace(new RegExp("."+className+":"+element+".*\}", "ig"), style)
    } else {
        var newStyle = _sheet.innerHTML + style;
    }

	_sheet.innerHTML = newStyle;

	_head.appendChild(_sheet);
	return this;
};

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback/*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

import eventPreview from './components/event-preview'
import mapBox from './components/mapbox'
import EventView from './components/event'
import Banner from './components/console-banner'


window.addEventListener('load', (e) => {
	setTimeout(() => {
		var body = document.querySelector('body')

		document.querySelector('.container.loader').style.display = 'none'
		body.className = body.className.replace('loading', '')
		
		var banner = new Banner()
		eventPreview.init()
		mapBox.init()
		var eventView = new EventView()
	}, 2000)
})
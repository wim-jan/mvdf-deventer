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

import eventPreview from './components/event-preview'
import mapBox from './components/mapbox'
import EventView from './components/event'
import Banner from './components/console-banner'
import Hamburger from './components/hamburger-menu'
import Analytics from './components/analytics'
import Contact from './components/contact'


window.addEventListener('load', (e) => {
	setTimeout(() => {
		var body = document.querySelector('body')

		document.querySelector('.container.loader').style.display = 'none'
		body.className = body.className.replace('loading', '')


		var eventView = new EventView()
		var hamburger = new Hamburger()
		var analytics = new Analytics()
		var contact = new Contact()		
		var banner = new Banner()

		eventPreview.init()
		mapBox.init()
	}, 2000)
})
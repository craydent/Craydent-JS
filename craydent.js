/*/---------------------------------------------------------/*/
/*/ Craydent LLC v1.0										/*/
/*/	Copyright 2011 (http://craydent.com/about) 				/*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.	/*/
/*/	(http://craydent.com/license) 							/*/
/*/---------------------------------------------------------/*/

/*----------------------------------------------------------------------------------------------------------------
/-	Global CONTANTS and variables
/---------------------------------------------------------------------------------------------------------------*/
var CLICK = "click";
var HANDPOINT = "pointer";
var ONMOUSEDOWN = "onmousedown";
var ONMOUSEUP = "onmouseup";
var POINTER = "default";
var SERVER = window.location.host;
var WAIT = "wait";


/*----------------------------------------------------------------------------------------------------------------
/-	Event tracking
/---------------------------------------------------------------------------------------------------------------*/
var EVENT_REGISTRY = {length : 0};// Array();
EVENT_REGISTRY.Exists = function (id, event, func, pos){
    try {
        pos = pos ? pos : function(){};
        if (EVENT_REGISTRY[id]) {
	        for(eri = 0; eri < EVENT_REGISTRY[id].length; eri++){
	            if(EVENT_REGISTRY[id][eri][0] == event && EVENT_REGISTRY[id][eri][1] == func){
	                pos.index = eri;
	                return true;
	            }
	        }
        }
        return false;
    } catch (e) {
		error("EVENT_REGISTRY.Exists", e);
	} 
};

/*----------------------------------------------------------------------------------------------------------------
/-	define functions preventing overwriting other framework functions
/---------------------------------------------------------------------------------------------------------------*/
window._$overwrite = window.$ || function () {return undefined;};
window.$ = function (object) {
	if (!object || object === true) {
		return undefined;
	}
	return (document.getElementById(object) || window._$overwrite(object));
};
window.$.duplicate = function (old) {
	for (prop in old){
		this[prop] = old[prop];	
	}
};
window.$.duplicate(window._$overwrite);
window._showoverwrite = window.show || function () {return undefined;};
window.show = function (object) {
	return ((document.getElementById(object) && $(object).show()) 
	|| (object instanceof HTMLElement && object.show()) 
	|| window._showoverwrite(object));
};
window._hideoverwrite = window.hide || function () {return undefined;};
window.hide = function (object) {
	return ((document.getElementById(object) && $(object).hide()) 
	|| (object instanceof HTMLElement && object.hide()) 
	|| window._hideoverwrite(object));
};
window._toggleoverwrite = window.toggle || function () {return undefined;};
window.toggle = function (object) {
	return ((document.getElementById(object) && $(object).toggle()) 
	|| (object instanceof HTMLElement && object.toggle()) 
	|| window._toggleoverwrite(object));
};


/*----------------------------------------------------------------------------------------------------------------
/-	Class prototypes
/---------------------------------------------------------------------------------------------------------------*/
function addObjectPrototype(name, func, override) {
	try {
		(!override && Object.prototype[name]) || Object.defineProperty(Object.prototype, name, {
			writable: true,
			enumerable: false,
			configurable: true,
			value: func
		});
	} catch (e) {
		error("addPrototype", e);
	}
};

/*IE prototype workaround*/
var DOM = {
	addPrototype: function(name,fn, override) {
		try {
			if (window.HTMLElement) {
				try {
					var original = override ? "" : "HTMLElement.prototype." + name + " || ";
					//override && (original = "");
					eval("HTMLElement.prototype." + name + " = " + original + "fn");
				} catch(e) {
					
				}
			} else {
				var _createElement = document.createElement;

				document.createElement = function(tag) {
					var _elem = _createElement(tag);
					eval("_elem." + name + " = fn");
					return _elem;
				};

				var _getElementById = document.getElementById;

				document.getElementById = function(id) {
					try {
						var _elem = _getElementById(id);
						if (isNull(_elem)) {
							return undefined;
						}
						eval("_elem." + name + " = fn");

						return _elem;
					}  catch (e) {
						error("getElementById", e);
					}
				};

				var _getElementsByTagName = document.getElementsByTagName;

				document.getElementsByTagName = function(tag) {
					var _arr = _getElementsByTagName(tag);
					for(var _elem=0;_elem<_arr.length;_elem++)
						eval("_arr[_elem]." + name + " = fn");
					return _arr;
				};
			}
		} catch (e) {
			error("DOM.addPrototype", e);
		}
	}
};
if (window.Event) {
	Event.prototype.pageX = function(){
	//addPrototype(Event, "pageX", function () {
	    try {
	        var scroll = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
	        return this.clientX + scroll;
	    } catch (e) {
			error("pageX", e);
	        return undefined;
	    }
	};
	Event.prototype.getCurrentTarget = function(func){
	//addPrototype(Event, "getCurrentTarget", function (func) {
	    try {
	        if(this.currentTarget){
	            return this.currentTarget;
	        } else {
	            var srcElement = this.srcElement;
	            var sid = srcElement.id;
	            var nextParentNode = srcElement.parentNode;
	            var fnString = func ? func.toString() : arguments.callee.caller.toString();//.indexOf("function", 0);
	            var sIndex = fnString.indexOf("function", 0) + 8;
	            var eIndex = fnString.indexOf("(", sIndex);
	            var found = false;
	            var fname = fnString.substring(sIndex, eIndex).trim();
	            while(sid){
	                if(EVENT_REGISTRY.Exists(sid, this.type, fname)){
	                    return $(sid);
	                }
	                sid = nextParentNode.id;
	                nextParentNode = nextParentNode.parentNode;
	            }
	            return undefined;
	        }
	    } catch (e) {
			error("getCurrentTarget", e);
		}
	};
}
DOM.addPrototype("moveDown", function (tagName) {
    try {
    	var thiss = this;
		while (!isNull(thiss.nextSibling) && (thiss.nextSibling.nodeType != 1 || (!tagName || thiss.nextSibling.tagName.toLowerCase() != tagName))) {
        //while (!isNull(this.nextSibling) && thiss.nextSibling.tagName.toLowerCase() != 'div') {
            thiss = thiss.nextSibling;
        }
        //if not last element
        if (!isNull(thiss.nextSibling)) {
            thiss.parentNode.insertBefore(thiss, thiss.nextSibling.nextSibling);
            return true;
        }
        return false;
    } catch (e) {
		error("moveDown", e);
	}
});
DOM.addPrototype("moveUp", function (tagName) {
    try {
    	var thiss = this;
        while (!isNull(thiss.previousSibling) && (thiss.previousSibling.nodeType != 1 || (!tagName || thiss.previousSibling.tagName.toLowerCase() != tagName))) {
            thiss = thiss.previousSibling;
        }
        //if not first element
        if (!isNull(thiss.previousSibling)) {
            thiss.parentNode.insertBefore(thiss, thiss.previousSibling);
            return true;
        }
        return false;
    } catch (e) {
		error("moveUp", e);
	}
});
DOM.addPrototype("insertAt", function (elem, pos){
    try {
    	var children = this.children;
    	this.insertBefore(elem, children[pos]);
    } catch (e) {
		error("insertAt", e);
	} 
});
DOM.addPrototype("insertAfter", function (elem, refElem){
    try {
    	var next = getNextElementSibling(refElem);
    	next ? this.insertBefore(elem, next) : refElem.parentNode.appendChild(elem);
    } catch (e) {
		error("insertAfter", e);
	} 
});
DOM.addPrototype("insertAlphabetically", function (elem){
    try {
        var childNodes = this.children;
		var eid = elem.id.toLowerCase();
        var arr = Array();
        for (var i = 0; i < childNodes.length; i++) {
            arr[i] = childNodes[i].id.toLowerCase();
        }
        arr[arr.length] = eid; //file.name;
        arr.sort();
        if (arr.length > 1) {
            this.insertBefore(elem, childNodes[arr.indexOf(eid)]);
		} else {
            this.appendChild(elem);
        }
    } catch (e) {
		error("insertAlphabetically", e);
	} 
});
DOM.addPrototype("remove", function () {
	try {
		return this.parentNode.removeChild(this);
	} catch (e) {
		error("remove", e);
	    return false;
	}
});
DOM.addPrototype("getContainer", function (tagName) {
    try {
		var thiss = this.parentNode;
		if (tagName) {
			while (thiss && thiss.tagName.toLowerCase() != tagName) {
				thiss = thiss.parentNode;
			}
		}
        return thiss;
    } catch (e) {
		error("getContainer", e);
	}
});
DOM.addPrototype("children", function() {
	return this.childNodes.filter(function (val) {
		return val.nodeType == 1;
	});
});
DOM.addPrototype("firstElementChild", function() {
	var children = this.childNodes;
	
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType == 1) {
			return children[i]; 
		}
	}
	return undefined;
});
DOM.addPrototype("nextElementSibling", function() {
	var next = this.nextSibling;
	while (next && next.nodeType != 1) {
		next = next.nextSibling;
	}
	return next;
});
DOM.addPrototype("hookEvent", function(type, fn){
    try {
        var fnString = fn.toString();
        var sIndex = fnString.indexOf("function", 0) + 8;
        var eIndex = fnString.indexOf("(", sIndex);
        if (typeof(EVENT_REGISTRY[this.id]) == "undefined") {
            EVENT_REGISTRY[this.id] = Array();
            EVENT_REGISTRY.length++;
        }
        var fname = fnString.substring(sIndex, eIndex).trim();

        if(!EVENT_REGISTRY.Exists(this.id, type, fname)) {
            if (this.attachEvent) {
            	this['e' + type + fn] = fn;
            	this[type + fn] = function() { 
            			try {
            				if (this['e' + type + fn]) {
            					//if (this['e' + type + fn]) {
	            				this['e' + type + fn](window.event);
	            				//}
	            			} else {
	            				if (this.event.getCurrentTarget(fn.toString())) {
	            					this.event.getCurrentTarget(fn.toString())['e' + type + fn](window.event);            				
	            				}
	            			}
            			} catch (exx) {
							error("hookEvent.anonymous", e);
            			}
            		};
            	this.attachEvent("on" + type, this[type + fn]);
            } else {
                this.addEventListener(type, fn, false);
            }
            EVENT_REGISTRY[this.id][EVENT_REGISTRY[this.id].length] = [type, fname];
        }
    } catch (e) {
		error("hookEvent", e);
    }
});
DOM.addPrototype("unhookEvent", function(type, fn) {
    try {
        var fnString;
        var sIndex;
        var eIndex;
        var fname = "";
        if(fn) {
            fnString = fn.toString();
            sIndex = fnString.indexOf("function", 0) + 8;
            eIndex = fnString.indexOf("(", sIndex);
            fname = fnString.substring(sIndex, eIndex).trim();
        }
        var pos = {};
        if (EVENT_REGISTRY.Exists(this.id, type, fname, pos)) {
        	EVENT_REGISTRY[this.id].splice(pos.index, 1);
           
		    if (this.detachEvent) {
            	this.detachEvent("on" + type, this[type + fn]);
                this[type + fn] = null;
            } else {
                this.removeEventListener(type, fn, false);
            }
			if (EVENT_REGISTRY[this.id].length < 1) {
            	delete EVENT_REGISTRY[this.id];
            	EVENT_REGISTRY.length--;
            }
        }
    } catch (e) {
		error("unhookEvent", e);
    }
});
DOM.addPrototype("show", function() {
    try {
		if (this.tagName.toLowerCase() == "object") {
			this.style.visibility = "visible";
			this.height = this.getAttribute('data-height') || this.height;
			this.width = this.getAttribute('data-width') || this.width;
			this.removeAttribute('data-height');
			this.removeAttribute('data-width');
		} else {
        	this.style.display = "block";
		}
		return true;
    } catch (e) {
		error("show", e);
		return false;
    }
});
DOM.addPrototype("hide", function() {
    try {
		if (this.tagName.toLowerCase() == "object") {
			this.style.visibility = "hidden";
			!parseInt(this.height) || this.setAttribute('data-height', this.height);
			!parseInt(this.width) || this.setAttribute('data-width', this.width);
			
			this.height = 0;
			this.width = 0;
		} else {
	        this.style.display = "none";
		}
		return true;
    } catch (e) {
		error("hide", e);
		return false;
    }
});
DOM.addPrototype("toggle", function() {
    try {
    	var style = "visibility",
    	inheritedStyle = this.style[style],
		parent = this.parentNode;
    	this.tagName.toLowerCase() == "object" || (style = "display");
		while (parent && !inheritedStyle) {
			if (parent.style[style]) {
				inheritedStyle = parent.style[style] in {none:'',hidden:''};
				break;
			}
			parent = parent.parentNode;
		}
		inheritedStyle ? this.show() : this.hide();
    	
/*
		if (this.tagName.toLowerCase() == "object") {
    		var inheritedStyle = this.style.visibility,
    		parent = this.parentNode;
    		while (parent && !inheritedStyle) {
    			if (parent.style.visibility) {
    				inheritedStyle = parent.style.visibility;
    				break;
    			}
    			parent = parent.parentNode;
    		}
    		inheritedStyle == "visible" || "" ? this.hide() : this.show();
    	} else {
    		this.style.display == "none" || "" ? (this.style.display = "block") : (this.style.display = "none");
    	}
*/
    	return true;
    } catch (e) {
		error("toggle", e);
		return false;
    }
});
DOM.addPrototype("removeClass", function(name) {
    try {
		var arr = this.className.split(' ');
		arr.splice(arr.indexOf(name),1);
		this.className = arr.join(' ');
    } catch (e) {
		error("removeClass", e);
        return false;
    }
});
DOM.addPrototype("addClass", function(name) {
    try {
		var arr = this.className.split(' ');
		arr.indexOf(name) != -1 || arr.push(name);
		this.className = arr.join(' ');
    } catch (e) {
		error("addClass", e);
        return false;
    }
});
DOM.addPrototype("hasClass", function(name) {
    try {
		var regex = new RegExp('((^)|(\\s+))' + name + '(\\s+|$)');
		return regex.test(this.className);
    } catch (e) {
		error("addClass", e);
        return false;
    }
});
DOM.addPrototype("width", function(isBody) {
    try {
    	if (!isBody && this.tagName.toLowerCase() == 'body') {
    		var width, currentStyleWidth = document.body.style.width;
    		document.body.style.width = "100%";
    		width = document.body.width(true);
    		document.body.style.width = currentStyleWidth;
    	}
    	return this.getClientRects && this.getClientRects()[0].width || this.offsetWidth || this.scrollWidth;
		//return this.getClientRects ? this.getClientRects()[0].width : this.offsetWidth;
    } catch (e) {
		error("width", e);
        return false;
    }
});
DOM.addPrototype("height", function(isBody) {
    try {
    	if (!isBody && this.tagName.toLowerCase() == 'body') {
    		var height, currentStyleHeight = document.body.style.height;
    		document.body.style.height = "100%";
    		height = document.body.height(true);
    		document.body.style.height = currentStyleHeight;
    	}
		return this.getClientRects && this.getClientRects()[0].height || this.offsetHeight || this.scrollHeight;
    } catch (e) {
		error("height", e);
        return false;
    }
});
DOM.addPrototype("top", function() {
    try {
		return this.getClientRects ? this.getClientRects()[0].top : this.offsetTop;
    } catch (e) {
		error("top", e);
        return false;
    }
});
DOM.addPrototype("left", function() {
    try {
		return this.getClientRects ? this.getClientRects()[0].left : this.offsetLeft;
    } catch (e) {
		error("left", e);
        return false;
    }
});
DOM.addPrototype("toString", function () {
	try {
		var domElemContainer = document.createElement('div');
		domElemContainer.appendChild(this.cloneNode(true));
		return domElemContainer.innerHTML; 
	} catch (e) {
		error("toString", e);
        return false;
    }
}, true);

/*dataset workaround*/
if (!window.DOMStringMap) {
	DOM.addPrototype("dataset", eval((function(){
		try {
			var attributes = this.attributes;
			var ds = {};
			for (var i in attributes) {
				attribute = attributes[i];
				if (attribute.name.indexOf("data-") == 0) {
					ds[attribute.name.substring(5)] = attribute.value;
				}
			}
			return eval(ds);
		} catch (e) {
			error("dataset", e);
		}
	})()));
}
Array.prototype.filter = Array.prototype.filter || function(func /*, thiss*/) {
	if (!func.isFunction()) {
		throw new TypeError();
	}
	var filtered = new Array();
	var thiss = arguments[1];
	for (var i = 0; i < this.length; i++) {
		var val = this[i];
		if (func.call(thiss, val, i, this)) {
			res.push(val);
		}
	}

	return res;
};
Array.prototype.isEmpty = Array.prototype.isEmpty || function() {
//addPrototype(Array, "isEmpty", function () {
    try {
        return (this.length == 0);
    } catch (e) {
		error("Array.isEmpty", e);
    }  
};
Array.prototype.indexOf = Array.prototype.indexOf || function(value) {
//addPrototype(Array, "indexOf", function (value) {
    try {
        var len = this.length;
        var i = 0;
        while (i < len) {
            if (this[i] === value) return i;
            ++i;
        }
        return -1;
    } catch (e) {
		error("Array.indexOf", e);
    }  
};
Array.prototype.indexOfAlt = Array.prototype.indexOfAlt || function(value, func) {
//addPrototype(Array, "indexOfAlt", function (value, func) {
    try {
        var len = this.length;
        var i = 0;
        while (i < len) {
            if (func(this[i], value)) return i;
            ++i;
        }
        return -1;
    } catch (e) {
		error("Array.indexOf", e);
    }  
};
Array.prototype.replaceAt = Array.prototype.replaceAt || function(index, value) {
//addPrototype(Array, "replaceAt", function (index, value) {
    try {
        this.splice(index, 1, value);
    } catch (e) {
		error("Array.replaceAt", e);
    }  
};
Array.prototype.insertAfter = Array.prototype.insertAfter || function(index, value) {
//addPrototype(Array, "insertAfter", function (index, value) {
    try {
        this.splice(index + 1, 0, value);
    } catch (e) {
		error("Array.insertAfter", e);
    }  
};
Array.prototype.insertBefore = Array.prototype.insertBefore || function(index, value) {
//addPrototype(Array, "insertBefore", function (index, value) {
    try {
        this.splice(index, 0, value);
    } catch (e) {
		error("Array.insertBefore", e);
    }  
};
Array.prototype.trim = Array.prototype.trim || function() {
//addPrototype(Array, "trim", function () {
    try {
        var len = this.length;
        for (i = 0; i < len; i++) {
            this[i] = this[i].toString().trim();
        }
    } catch (e) {
		error("Array.trim", e);
    }  
};

Array.prototype.remove = Array.prototype.remove || function (value, indexOf) {
	indexOf = indexOf || this.indexOf;
	var index = indexOf.call(this, value);
	if(index == -1) {
		return;
	}
	return this.splice(index, 1);
};

String.prototype.trim = String.prototype.trim || function() {
//addPrototype(String, "trim", function () {
    try {
        var temp = this;
        while (temp.charAt(0) == " " || temp.charAt(0) == "\t" || temp.charAt(0) == "\n") {
            temp = temp.substring(1);
        }

        while (temp.charAt(temp.length - 1) == " " || temp.charAt(0) == "\t" || temp.charAt(0) == "\n") {
            temp = temp.substring(0, temp.length - 1);
        }
        return temp.toString();
    } catch (e) {
		error("String.trim", e);
    }
};
String.prototype.sanitize = String.prototype.sanitize || function () {
//addPrototype(String, "sanitize", function () {
    try {
        var thiss = this.replace(/&/gi, "&amp").replace(/#/gi, "&#35").replace(/%/gi, "&#37").replace(/;/gi, "&#59").replace(/\+/gi, "&#43").replace(/\-/gi, "&#45").replace(/\'/gi, "&#39").replace(/\\"/gi, "&#34").replace(/\(/gi, "&#40").replace(/\)/gi, "&#41").replace(/\</gi, "&#60").replace(/\>/gi, "&#62");

        return thiss;
    } catch (e) {
		error("XSSCleaner", e);
    }
};
String.prototype.isValidEmail = String.prototype.isValidEmail || function () {
//addPrototype(String, "isValidEmail", function () {
	try {
		if (!this.isBlank() && !isNull(this)) {
			var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return (reg.test(this));
		}
		return false;
	} catch (e) {
		error("isValidEmail", e);
    }
};
String.prototype.isBlank = String.prototype.isBlank || function () {
//addPrototype(String, "isBlank", function () {
	try {
		return (this == "");
	} catch (e) {
		error("XSSCleaner", e);
  	}
};
String.prototype.capitalize = function () {
//addPrototype(String, "capitalize", function () {
	try {
		pos = pos || [0];
		!pos.isArray() && (pos = [pos]);
		var wordArray;
		everyWord ? (wordArray = this.split('')) : ([this]);
		for (var i = 0; i < pos.length; i++) {
			for (var j = 0; j < wordArray.length; j++) {
				wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(1);
			}
		}
		return wordArray.join(' ');
	} catch (e) {
		error("capitalize", e);
	}
};

//Function.prototype.duplicate = Function.prototype.duplicate || function (old){
//	try {
//		for (prop in old){
//			this[prop] = old[prop];	
//		}
//	} catch (e) {
//		error('duplicate', e);
//	}
//};
addObjectPrototype("itemCount", function () {
	try {
		if (this.isObject()) {
			var count = 0;
			for (prop in this){
				if (this.hasOwnProperty(prop)) {
					count++;	
				}
			}
			return count;
		}
		return undefined;
	} catch (e) {
		error('itemCount', e);
	}
});
addObjectPrototype("duplicate", function (old) {
	try {
		for (prop in old){
			this[prop] = old[prop];	
		}
	} catch (e) {
		error('duplicate', e);
	}
});
addObjectPrototype("toStringAlt", function (delimiter, prefix) {
	try {
		delimiter = delimiter || '=';
		prefix = prefix || '';
	  	var str = '';
	 	for (var prop in this) {
			if (this.hasOwnProperty(prop)) {
				str += prefix + prop + delimiter + this[prop];
		  	}
	  	}
		return str;
	} catch (e) {
		error('toStringAlt', e);
	}
}, true);
addObjectPrototype("isObject", function () {
	try {
		return (this.constructor == Object);
	} catch (e) {
		error('isObject', e);
	}
});
addObjectPrototype("isGeoposition", function () {
	try {
		return (this.constructor.toString().indexOf('function Geoposition()') == 0);
	} catch (e) {
		error('isGeoposition', e);
	}
});
addObjectPrototype("isString", function () {
	try {
		return (this.constructor == String);
	} catch (e) {
		error('isString', e);
	}
});
addObjectPrototype("isArray", function () {
	try {
		return (this.constructor == Array);
	} catch (e) {
		error('isArray', e);
	}
});
addObjectPrototype("isInt", function () {
	try {
		return (parseInt(this) || parseInt === 0);
	} catch (e) {
		error('isInt', e);
	}
});
addObjectPrototype(Object, "isFloat", function() {
	try {
		return (this.isNumber() && (parseFloat(this) == this || parseFloat(this) === 0));
		//return (parseFloat(this) || parseFloat === 0);
	} catch (e) {
		error('isFloat', e);
	}
});
addObjectPrototype("isNumber", function() {
	try {
		return (this.constructor == Number);
	} catch (e) {
		error('isNumber', e);
	}
});
addObjectPrototype("isDomElement", function() {
	try {
		return (this.nodeType == 1);
	} catch (e) {
		error('isDomElement', e);
	}
});
addObjectPrototype("isFunction", function() {
	try {
		return (this.constructor == Function);
	} catch (e) {
		error('isFunction', e);
	}
});
addObjectPrototype("isBetween", function(lowerBound, upperBound, inclusive) {
	try {
		if (inclusive) {
			return (this >= lowerBound && this <= upperBound);
		} else {
			return (this > lowerBound && this < upperBound);
		}
	} catch (e) {
		error('isBetween', e);
	}
});

/*----------------------------------------------------------------------------------------------------------------
/-	Ajax operations
/---------------------------------------------------------------------------------------------------------------*/
function Request() {
    try {
    	var ajaxHttpCaller;
        try {
            //request object for mozilla
            ajaxHttpCaller = new XMLHttpRequest();
	} catch (ex) {
            //request object for IE
            try {
                ajaxHttpCaller = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (ex) {
                try {
                    ajaxHttpCaller = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (ex) {
                    //alert("Your browser does not support AJAX!");        
                    return null;
                }
            }
        }
        return ajaxHttpCaller;
    } catch (e) {
		error("GetAJAXHttpObject", e);
    }
}

function ajaxServerResponse(response) {
    try {
        if (response.readyState == 4) {
           
            var objResponse = {};
            try {
	            objResponse = eval(response.responseText.trim());
			} catch (e) {
				objResponse = eval("(" + response.responseText.trim() + ")");
			}
            if (!objResponse || objResponse.hasErrors) {
                return false;
            }
            return objResponse;
        }
        return false;
    } catch (e) {
		error("ajaxServerResponse", e);
		return false;
    }  
}

function ajax(params){//run, callBack, addParam) {
    try {
    	params.dataType = params.dataType || 'json';
    	if (params.dataType.toLowerCase() == 'jsonp') {
    		var head = document.getElementsByTagName('head')[0];
			var func = '_cjson' + Math.floor(Math.random() * 1000000);
			while (window[func]) {
				func = '_cjson' + Math.floor(Math.random() * 1000000);
			}
			params.onsuccess = params.onsuccess || function (){};
			window[func] = function (data) {
				params.onsuccess(data);
			}
			if (params.query && params.query.isObject()) {
				params.query = params.query.toStringAlt('=',	'&');
			}
			params.url += (params.url.indexOf('?') != -1 ? "&" : "?") + "callback=" + func + (params.query || "");
			//params.url += (params.url.indexOf('?') != -1 ? "&callback=" + func : "?callback=" + func) + (params.query || "");
			var insert = 'insertBefore';
			var tag = document.createElement('script');
			tag['type'] = "text/javascript";
			tag.async = "async";
			tag['src'] = params.url;
			
			// Attach handlers for all browsers
			tag.onload = tag.onreadystatechange = function() {
				try {
					if (!this.readyState || /complete|loaded/.test( this.readyState ) ) {
						// Handle memory leak in IE
						this.onload = this.onreadystatechange = null;
		
						// Remove the script
						if ( head && this.parentNode) {
							head.removeChild( this );
						}
						// Dereference the script
						delete this;
					}
				} catch (e) {
					var index = window.location.search.indexOf("debug=");
					if(index != -1) {
						var query = window.location.search;
						var inext = query.indexOf('&', index);
						if (query.substring(index + 6, (inext == -1 ? undefined : inext)) == "true"){
							 alert("Error in include.statechange: " + (e.description || e));
						}
					}
				}
			};
			head[insert](tag, head.firstChild);
		} else {
	        var httpRequest = new Request();
			var fileUpload = httpRequest.upload || {};
			params.method = params.method || "POST";
			params.headers = params.headers || Array();
			params.url = params.url || "functions/controller.php";
			//params.run = params.run || "";
			
			if (params.query && params.query.isObject()) {
				params.query = params.query.toStringAlt('=',	'&');
			}
			params.query = params.run ? "run=" + params.run + (params.query || "") : params.query
			params.contentType = params.contentType || "application/x-www-form-urlencoded";
			params.onbefore = params.onbefore || function () {};
			params.onstatechange = params.onstatechange || function () {};
			params.onsuccess = params.onsuccess || function (dt) {};
			params.onerror = params.onerror || function (rt) {};
			params.oncomplete = params.oncomplete || function () {};
			fileUpload.onload = params.onfileload || function () {};
			fileUpload.onprogress = params.onprogress || function () {};
			fileUpload.onabort = params.onabort || function () {};
			fileUpload.onerror = params.onerror || function () {};
			fileUpload.onloadstart = params.onloadstart || function () {};
			//var qStr = params.run ? "run=" + params.run + params.query : params.query;
			if (params.method == "GET") { // && params.query) {
			  params.url += "?" + params.query;
			  params.query = undefined;
			}
			params.onbefore(httpRequest, this);
			httpRequest.onreadystatechange = function (xp) {
			  params.onstatechange();
			  var data = ajaxServerResponse(this); //xp.srcElement);
			  if (data) {
				params.onsuccess(data);
			  } else if (this.readyState == 4) {
			  	try {
					params.onerror(eval(this.responseText)); //xp.responseText);
				} catch (e) {
					params.onerror(this.responseText);
				}
			  }
			  params.oncomplete();
			};
			httpRequest.open(params.method, params.url, true);
			httpRequest.setRequestHeader("Content-type", params.contentType);
			
			for (var i = 0; i < params.headers.length; i++) {
			  var header = params.headers[i];
			  httpRequest.setRequestHeader(header.type, header.value);
			}
			httpRequest.send(params.query);
		}
    } catch (e) {
		error("ajaxCall", e);
    }
}


/*----------------------------------------------------------------------------------------------------------------
/-	helper operations
/---------------------------------------------------------------------------------------------------------------*/
//function $GET(variable, ignoreCase) {//used to retrieve variables in the url
function $GET(variable, options) {//used to retrieve variables in the url
    try {
    	options = options || {};
    	var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "";
    	var defer = $COMMIT.update && (options.defer || options == "defer") ? true : false;
		var regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase);
		var attr = "search";
		var location = {};
		location.hash = window.location.hash,
		location.search = window.location.search;
		if (defer) {
			location.hash = $COMMIT.hash || "";
			location.search = $COMMIT.search || "";
		}
		
		if (regex.test(location.hash)) {
			attr = 'hash';
		} else if (!regex.test(location.search)){
			return false;
		}
		regex = new RegExp('(.*)?(' + variable +'=)(.*?)(([&]|[@])(.*)|$)', ignoreCase);
		return location[attr].replace(regex, '$3');
    } catch (e) {

    }
}

function $SET(variable, value, options){
	try {
    	options = options || {};
    	var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "";
    	var defer = options.defer || options == "defer" ? true : false;
		var regex = new RegExp('(.*)?(' + variable +'=)(.*?)(([&]|[@])(.*)|$)', ignoreCase);
		var attr = "search";
		var symbol = "&";
		attr = variable.indexOf('@') == 0 ? !(symbol='') && "hash" : attr;
		
		$COMMIT[attr] = $COMMIT[attr] || "";
    	//$COMMIT[attr].url = $COMMIT[attr].url || "";
		
		if (!defer) {
			var queryStr = regex.test(window.location[attr]) ? 
				window.location[attr].replace(regex, '$1$2' + value + '$4') : 
				window.location[attr] + symbol + variable + '=' + value;
			if (symbol == "&" && queryStr.indexOf('&') == 0) {
				queryStr = "?" + queryStr.substring(1);
			}
			window.location[attr] = queryStr;
		} else {		
			$COMMIT[attr] = ($COMMIT[attr] || window.location[attr]);
			var queryStr = regex.test($COMMIT[attr]) ? 
				$COMMIT[attr].replace(regex, '$1$2' + value + '$4') : 
				$COMMIT[attr] + symbol + variable + '=' + value;
			if (symbol == "&" && queryStr.indexOf('&') == 0) {
				queryStr = "?" + queryStr.substring(1);
			}
			$COMMIT[attr] = queryStr;
			$COMMIT.update = true;
		}
    } catch (e) {
		error("$SET", e);
    }
}

function $DEL(variable, options){
	try {
    	options = options || {};
    	var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "";
    	var defer = options.defer || options == "defer" ? true : false;
		var regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase);
		var attr = "search";
		if (regex.test(window.location.hash)) {
			attr = 'hash';
		} else if (!regex.test(window.location.search)){
			return false;
		}
		
		$COMMIT[attr] = $COMMIT[attr] || "";
    	//$COMMIT[attr].url = $COMMIT[attr].url || "";
		
		regex = new RegExp('([&]?|[@])(' + variable + '=([^&|^@]*)[&]?)', ignoreCase);
		
		if (!defer) {
			window.location[attr] = window.location[attr].replace(regex, '');
		} else {		
			$COMMIT[attr] = ($COMMIT[attr] || window.location[attr]);
			$COMMIT[attr] = $COMMIT[attr].replace(regex, '');
			$COMMIT.update = true;
		}
	} catch (e) {
		error("$DEL", e);
    }
}
function $COMMIT() {
	if ($COMMIT.update) {
		if ($COMMIT.search) {
			window.location.href = $COMMIT.search + $COMMIT.hash || "";
		} else if ($COMMIT.hash) {
			window.location.hash = $COMMIT.hash;
		}
		delete $COMMIT.update;
		delete $COMMIT.search;
		delete $COMMIT.hash;
	}
}

function killPropagation(ev, bubble, returnValue) {//used to cancel any bubbling and propagation
	try {
		ev = ev || window.event;
		bubble = bubble || true;
		returnValue = returnValue || false;
	    if (ev.stopPropagation) {
    		ev.stopPropagation();
            ev.preventDefault();
    	} else {
            ev.cancelBubble = bubble;
            ev.returnValue = returnValue;
    	}
	} catch (e) {
		error("killPropagation", e);
	}
}

function isNull(thiss, value) {//used to determine if thiss is undefined->if undefined, replace with value
    try {
        if (value == null || value == undefined) {
            return (thiss == null || thiss == undefined || thiss.length == 0);
        }
        return ((thiss ? thiss.length == 0 : thiss) || value);
    } catch (e) {
		error("isNull", e);
    }  
}
function getUniqueId(prefix) {
	var index = "";
	while (!isNull($(prefix + index))) {
		index = index || 0;
		index++;
	}
	return {name : prefix + index, id: index};
}
function error(fname, e) {
	if ($GET("debug") == "true") {
		alert("Error in " + fname + "\n" + (e.description || e));
	}
}
function cout(value){
	try {
		console && console.log && console.log(value);
	} catch (e) {
		error('cout', e);
	}
}
function logit(value){
	cout(value);
}
function isIE6() {
	var rv = IEVersion();
  	return (rv != -1 && rv < 7.0);
}
function IEVersion () {
	var rv = -1;
  	if (navigator.appName == 'Microsoft Internet Explorer') {
    	var ua = navigator.userAgent,
    	re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    	if (re.exec(ua) != null) {
      		rv = parseFloat(RegExp.$1);
      	}
  	}
  	return rv;
}
function isIPad() {
	var navUserAgent = navigator.userAgent;
	return (/iPad|iPhone OS 3_[1|2]_2/i.test(navUserAgent));
}
function buildTemplateHTML (structure, obj) {
	structure = structure || "";
	obj = obj || {};
	var displayAll = "";
	for (property in obj) {
		if (!obj.hasOwnProperty(property)) {continue}
		if (structure != "" && obj[property] && obj[property].toString().indexOf('\n') == -1) {
			var regex = new RegExp("\\$\\{" + property + "\\}", "gi");
			structure = structure.replace(regex, obj[property]).replace(/\$\{dataproperties\}/gi, "data-" + property + "='" + 
					(obj[property].toString().indexOf('<') == 0 ? "" : obj[property]) + "' ${dataproperties}");
		} else if (structure == "" && obj[property].toString().indexOf('\n') == -1) {
			displayAll += "<span>" + propety + " : " + obj[property] + "</span>";
		}
	}
	return structure != "" ? structure.replace(/\$\{dataproperties\}/gi, "") : displayAll;
}
function buildQuery(params) {
	var query = '', invalid = true, cfield = params.compare.field || '=';
	for(var i = 0; i < params.length; i++) {
		var field = $('txt' + (params[i].field || params[i]).capitalize());
		if (params.required && field.value) {
			
		}
		
		if (params.compare && (/^(<|<=|=|>=|)$>/.test(cfield)) 
		&& !eval('"' + field.value + '"' + cfield + '"' + params.compare.field + '"')) {
			
		}
		query += '&' + (params[i].field || params[i]) + '=' + field.value;
	}
	return query;
}
function getNextElementSibling(elem) {
	var next = elem.nextSibling;
	while (next && next.nodeType != 1) {
		next = next.nextSibling;
	}
//	if (!next) {
//		var fchild = elem.parentNode.firstChild;
//		if (fchild != elem) {
//			return getNextElementSibling(fchild);
//		}
//	}
	return next;
}
function parseBoolean(obj) {
	if (obj.isString()) {
		return (obj == "true");
	} else if (obj.isNumber()) {
		return (obj == 1);
	}
	return;
}
/*/---------------------------------------------------------/*/
/*/ Craydent LLC v1.4.0                                     /*/
/*/	Copyright 2011 (http://craydent.com/about)          /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/	(http://craydent.com/license)                       /*/
/*/---------------------------------------------------------/*/

/*----------------------------------------------------------------------------------------------------------------
/-	Global CONTANTS and variables
/---------------------------------------------------------------------------------------------------------------*/

var $w = window,
$l = $w.location
$d = document,
_ie = IEVersion(),
Craydent = {
    CLICK: "click",
    HANDPOINT: "pointer",
    ONMOUSEDOWN: "onmousedown",
    ONMOUSEUP: "onmouseup",
    POINTER: "default",
    WAIT: "wait",
    VISIBLE: "visible",
    HIDDEN: "hidden",
    SERVER: $l.host,
    SERVER_PATH: $l.pathname,
    PROTOCOL: $l.protocol,
    PAGE_NAME: (function () {
        var pn = $l.href.substring($l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi,'$1');
        return !pn || pn.indexOf('.') == -1 ? "index.html" : pn;
    })(),
    DEBUG_MODE:false,
    IE_VERSION:_ie,
    IE6:(_ie < 7.0),
    IE7:(_ie < 8.0),
    IE8:(_ie < 9.0),
    FIREFOX:isFirefox(),
    CHROME:isChrome(),
    OPERA:isOpera(),
    SAFARI:isSafari(),
    FIREFOX_VERSION:FirefoxVersion(),
    CHROME_VERSION:ChromeVersion(),
    OPERA_VERSION:OperaVersion(),
    SAFARI_VERSION:SafariVersion(),
    IPAD:isIPad(),
    IPHONE:isIPhone(),
    WINDOWS:isWindows(),
    MAC:isMac(),
    LINUX:isLinux()
},
__$$ = [
    {
        func: '$', 
        selector: 'getElementById', 
        overwrite: '_$overwrite'
    },{
        func: '$CSS', 
        selector: 'querySelectorAll', 
        overwrite: '_$CSSoverwrite'
    },{
        func: '$TAG', 
        selector: 'getElementsByTagName', 
        overwrite: '_$TAGoverwrite'
    }
],

/*----------------------------------------------------------------------------------------------------------------
/-	Event tracking
/---------------------------------------------------------------------------------------------------------------*/
EVENT_REGISTRY = {
    length : 0
};// Array();
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
function _getFuncName (func) {
    return func.toString().replace(/\/\/.*?[\r\n]/gi,'').replace(/[\t\r\n]*/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/function\s*?(.*?)\s*?\(.*/,'$1').trim();
}
function _getFuncArgs (func) {
    return func.toString().trim().replace(/\s*/gi, '').replace(/.*?\((.*?)\).*/, '$1').split(',');
}
function __dup (old) {
    try {
        for (prop in old){
            this[prop] = old[prop];	
        }
    } catch (e) {
        error('dup', e);
    }
};
function _craydentSelector (by, overwrite, object, single) {
    try {
        if (!object || object === true) {
            return;
        }

        var elem = document[by](object);
        if (single) {
            return ((elem && ((elem.length && elem[0]) || elem)) || $w[overwrite](object)[0]);
        }
        return (elem || $w[overwrite](object));
    } catch (e) {
        error('selector', e);
    }
};
function _displayHelper(object, func){
    try {
        return ((document.getElementById(object) && $(object)[func]()) 
            || (object instanceof HTMLElement && object[func]()) 
            || $w['_'+func+'overwrite'](object));
    } catch (e) {
        error(func, e);
    }
}

for (var i = 0, len = __$$.length; i < len; i++) {
    var __$ = __$$[i];
    $w[__$.overwrite] = $w[__$.func] || function(){};
    $w[__$.func] = eval('$w.'+__$.func+' = (function (object, single) {try {return _craydentSelector(\''+__$.selector+'\', \''+__$.overwrite+'\', object, single);} catch (e) {error('+__$.func+', e);}})');
    $w[__$.func].duplicate = __dup;
    $w[__$.overwrite] && $w[__$.func].duplicate($w[__$.overwrite]);
}

$w._showoverwrite = $w.show || function () {};
$w._hideoverwrite = $w.hide || function () {};
$w._toggleoverwrite = $w.toggle || function () {};
$w.show = function (object) {
    _displayHelper(object, "show");
};
$w.hide = function (object) {
    _displayHelper(object, "hide");
};
$w.toggle = function (object) {
    _displayHelper(object, "toggle");
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
        try {
            Array.prototype[name] = !override && Array.prototype[name] || func;
            Function.prototype[name] = !override && Function.prototype[name] || func;
            String.prototype[name] = !override && String.prototype[name] || func;
            Number.prototype[name] = !override && Number.prototype[name] || func;
            Boolean.prototype[name] = !override && Boolean.prototype[name] || func;
        
            if (navigator.geolocation) {
                var GeoLocation = navigator.geolocation.constructor;
                GeoLocation.prototype[name] = !override && GeoLocation.prototype[name] || func;
            }
        } catch (ex) {
            error("addPrototype:Non-ECMAScript 5", e);
        }
    }
    args = _getFuncArgs(func),
    fstr = func.toString().replace(/this/g,'obj'),
    fnew = "(" + fstr.toString().replace(/(\(\s*?\))/, '(obj)') + ")";
    /*!$w.hasOwnProperty(name) &&*/ (
        //$w[name] = 
            eval(
                args.length === 0 || (args.length === 1 && !args[0].trim()) ? 
                    "$w."+name+"="+fnew : "$w."+name+"=(" + fstr.toString().replace(/\((.*?)\)/, '(obj,$1)') + ")"
            )
    );
}

/*IE prototype workaround*/
function _setDOMElementProperties(_elem) {
    try {
        if (!_elem) {
            return;
        }
        for (var prop in $w.HTMLElement.prototype) {
            if ($w.HTMLElement.prototype.hasOwnProperty(prop)) {
                try {
                    _elem[prop] = prop == "dataset" ? $w.HTMLElement.prototype[prop]() : $w.HTMLElement.prototype[prop];
                } catch(e) {

                }
            }
        }
    } catch (e) {
        error("_setDOMElementProperties", e);
    }
}
if(!$w.HTMLElement) {
    $w.HTMLElement = function(){};
    var _createElement = document.createElement;

    document.createElement = function(tag) {
        try {
            var _elem = _createElement(tag);
            _setDOMElementProperties(_elem);
            return _elem;
        } catch (e) {
            error("DOM.createElement", e);
        }
    };

    var _getElementById = document.getElementById;

    document.getElementById = function(id) {
        try {
            var _elem = _getElementById(id);
            _setDOMElementProperties(_elem);

            return _elem;
        } catch (e) {
            error("getElementById", e);
        }
    };

    var _getElementsByTagName = document.getElementsByTagName;

    document.getElementsByTagName = function(tag) {
        try {
            var _arr = _getElementsByTagName(tag);
            for(var _elem=0;_elem<_arr.length;_elem++) {
                try {
                    if (isNull(_arr[_elem][name])) {
                        _setDOMElementProperties(_arr[_elem]);
                    }
                } catch (e) {}
            }
            return _arr;
        } catch (e) {
            error("DOM.getElementsByTagName", e);
        }
    };
}
function addHTMLPrototype (name,fn, override) {
    try {
        var original = override ? "" : "HTMLElement.prototype." + name + " || ";
        eval("HTMLElement.prototype." + name + " = " + original + "fn");
            
        if (isFunction($w.HTMLElement)) {
            (!document.body[name] || override) && (document.body[name] = fn);
        }
    } catch (e) {
        error("addHTMLPrototype", e);
    }
}

/*----------------------------------------------------------------------------------------------------------------
/-	Event class Extensions
/---------------------------------------------------------------------------------------------------------------*/
(function(){
    if ($w.Event) {
        Event.prototype.pageX = Event.prototype.pageX || function(){
            try {
                var scroll = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
                return this.clientX + scroll;
            } catch (e) {
                error("pageX", e);
            }
        };
        Event.prototype._getCurrentTarget = Event.prototype._getCurrentTarget || function(func){
            try {
                if(this.currentTarget){
                    return this.currentTarget;
                } else {
                    var srcElement = this.srcElement,
                    sid = srcElement.id,
                    nextParentNode = srcElement.parentNode,
                    fnString = func ? func.toString() : arguments.callee.caller.toString(),
                    sIndex = fnString.indexOf("function", 0) + 8,
                    eIndex = fnString.indexOf("(", sIndex),
                    found = false,
                    fname = fnString.substring(sIndex, eIndex).trim();
                    while(sid){
                        if(EVENT_REGISTRY.Exists(sid, this.type, fname)){
                            return $(sid);
                        }
                        sid = nextParentNode.id;
                        nextParentNode = nextParentNode.parentNode;
                    }
                }
            } catch (e) {
                error("_getCurrentTarget", e);
            }
        };
    }
})();

/*----------------------------------------------------------------------------------------------------------------
/-	DOM class Extensions
/---------------------------------------------------------------------------------------------------------------*/

addHTMLPrototype("moveDown", function (tagName) {
    try {
        var thiss = this;
        while (!isNull(thiss.nextSibling) && (thiss.nextSibling.nodeType != 1 || (tagName && thiss.nextSibling.tagName.toLowerCase() != tagName))) {
            thiss = thiss.nextSibling;
        }
        //if not last element
        if (!isNull(thiss.nextSibling)) {
            thiss.parentNode.insertBefore(this, thiss.nextSibling.nextSibling);
            return true;
        }
        return false;
    } catch (e) {
        error("moveDown", e);
        return false;
    }
});
addHTMLPrototype("moveUp", function (tagName) {
    try {
        var thiss = this;
        while (!isNull(thiss.previousSibling) && (thiss.previousSibling.nodeType != 1 || (tagName && thiss.previousSibling.tagName.toLowerCase() != tagName))) {
            thiss = thiss.previousSibling;
        }
        //if not first element
        if (!isNull(thiss.previousSibling)) {
            thiss.parentNode.insertBefore(this, thiss.previousSibling);
            return true;
        }
        return false;
    } catch (e) {
        error("moveUp", e);
        return false;
    }
});
addHTMLPrototype("insertAt", function (elem, pos){
    try {
        var children = this.children;
        pos = pos || 0;
        if (children.length > pos) {
            this.insertBefore(elem, children[pos]);
            return true;
        } else if (children.length == pos) {
            this.appendChild(elem);
            return true;
        }
        return false;
    } catch (e) {
        error("insertAt", e);
        return false;
    } 
});
addHTMLPrototype("insertAfter", function (refElem){
    try {
        var next = isFunction(refElem.nextElementSibling) ? refElem.nextElementSibling() : refElem.nextElementSibling;
        next ? refElem.parentNode.insertBefore(this, next) : refElem.parentNode.appendChild(this);
        return true;
    } catch (e) {
        error("insertAfter", e);
        return false;
    } 
});
addHTMLPrototype("insertAlphabetically", function (elem){
    try {
        var childNodes = this.children,
        eid = elem.id.toLowerCase(),
        arr = Array();

        for (var i = 0; i < childNodes.length; i++) {
            arr[i] = childNodes[i].id.toLowerCase();
        }
        arr[arr.length] = eid;
        arr.sort();
        if (arr.length > 1) {
            this.insertBefore(elem, childNodes[arr.indexOf(eid)]);
        } else {
            this.appendChild(elem);
        }
        return true;
    } catch (e) {
        error("insertAlphabetically", e);
        return false;
    } 
});
addHTMLPrototype("remove", function () {
    try {
        return this.parentNode.removeChild(this);
    } catch (e) {
        error("remove", e);
        return false;
    }
});
addHTMLPrototype("getContainer", function (tagName) {
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
        return false;
    }
});
addHTMLPrototype("firstElementChild", function() {
    try {
        var children = this.childNodes;

        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeType == 1) {
                return children[i]; 
            }
        }
        return false;
    } catch (e) {
        error("firstElementChild", e);
        return false;
    }
});
addHTMLPrototype("nextElementSibling", function() {
    try {
        var next = this.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    } catch (e) {
        error("nextElementSibling", e);
        return false;
    }
});
addHTMLPrototype("hookEvent", function(type, fn){
    try {
        var fnString = fn.toString(),
        sIndex = fnString.indexOf("function", 0) + 8,
        eIndex = fnString.indexOf("(", sIndex),
        fname = fnString.substring(sIndex, eIndex).trim();

        if (typeof(EVENT_REGISTRY[this.id]) == "undefined") {
            EVENT_REGISTRY[this.id] = Array();
            EVENT_REGISTRY.length++;
        }

        if(!EVENT_REGISTRY.Exists(this.id, type, fname)) {
            if (this.attachEvent) {
                this['e' + type + fn] = fn;
                this[type + fn] = function() { 
                    try {
                        if (this['e' + type + fn]) {
                            //if (this['e' + type + fn]) {
                            this['e' + type + fn]($w.event);
                        //}
                        } else {
                            if (this.event._getCurrentTarget(fn.toString())) {
                                this.event._getCurrentTarget(fn.toString())['e' + type + fn]($w.event);            				
                            }
                        }
                    } catch (ex) {
                        error("hookEvent.anonymous", ex);
                    }
                };
                this.attachEvent("on" + type, this[type + fn]);
            } else {
                this.addEventListener(type, fn, false);
            }
            EVENT_REGISTRY[this.id][EVENT_REGISTRY[this.id].length] = [type, fname];
            return true;
        }
        return false;
    } catch (e) {
        error("hookEvent", e);
        return false;
    }
});
addHTMLPrototype("unhookEvent", function(type, fn) {
    try {
        var fnString, sIndex, eIndex, fname = "", pos = {};
        if(fn) {
            fnString = fn.toString();
            sIndex = fnString.indexOf("function", 0) + 8;
            eIndex = fnString.indexOf("(", sIndex);
            fname = fnString.substring(sIndex, eIndex).trim();
        }
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
        return true;
    } catch (e) {
        error("unhookEvent", e);
        return false;
    }
});
addHTMLPrototype("show", function() {
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
addHTMLPrototype("hide", function() {
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
addHTMLPrototype("toggle", function() {
    try {
        var style = "visibility",
        inheritedStyle,
        parent = this.parentNode;
        this.tagName.toLowerCase() == "object" || (style = "display");
        // look for inherited style
        inheritedStyle = this.style[style] in {none:1,hidden:1};
        while (parent && !inheritedStyle) {
            if (parent.style && parent.style[style]) {
                inheritedStyle = parent.style[style] in {
                    none:1,
                    hidden:1
                };
                break;
            }
            parent = parent.parentNode;
        }
        //finally check if height and width are 0/false
        !this.width() && !this.height() && (inheritedStyle = true);
        inheritedStyle ? this.show() : this.hide();
        return true;
    } catch (e) {
        error("toggle", e);
        return false;
    }
});
addHTMLPrototype("removeClass", function(name) {
    try {
        var arr = this.className.split(' '),
        index = arr.indexOf(name);
        if (index != -1) {
            arr.splice(index,1);
            this.className = arr.join(' ').trim();
        }
        return true;
    } catch (e) {
        error("removeClass", e);
        return false;
    }
});
addHTMLPrototype("addClass", function(name) {
    try {
        var arr = this.className.split(' ');
        arr.indexOf(name) != -1 || arr.push(name);
        this.className = arr.join(' ').trim();
        return true;
    } catch (e) {
        error("addClass", e);
        return false;
    }
});
addHTMLPrototype("hasClass", function(name) {
    try {
        var regex = new RegExp('((^)|(\\s+))' + name + '(\\s+|$)');
        return regex.test(this.className);
    } catch (e) {
        error("addClass", e);
        return false;
    }
});
addHTMLPrototype("width", function(isBody) {
    try {

        return _getDimension.call(this, isBody, 'width');
    } catch (e) {
        error("width", e);
        return false;
    }
});
addHTMLPrototype("height", function(isBody) {
    try {
        return _getDimension.call(this, isBody, 'height');
    } catch (e) {
        error("height", e);
        return false;
    }
});
function _getDimension(isBody, dimension) {
    try {
        if (!isBody && this.tagName.toLowerCase() == 'body') {
            var dim, currentStyle = document.body.style[dimension];
            document.body.style[dimension] = "100%";
            dim = document.body[dimension](true);
            document.body.style[dimension] = currentStyle;
        }
        return (this.getClientRects && this.getClientRects()[0][dimension]) || this["offset" + dimension.capitalize()] || this["scroll" + dimension.capitalize()];
    } catch (e) {
        if (!this.parentNode && this != document) {
            var temp = this.cloneNode(1),
            rtn;
            temp.style.visible = 'hidden';
            temp.style.position = 'absolute';
            temp["get" + dimension.capitalize()] = document.body[dimension];
            document.body.appendChild(temp);
            rtn = temp["get" + dimension.capitalize()]();
            temp.remove();
            return rtn;
        }
        error("_getDimension", e);
        return false;
    }
}
addHTMLPrototype("top", function() {
    try {
        return this.getClientRects && this.getClientRects()[0].top <= this.offsetTop ? this.getClientRects()[0].top : this.offsetTop;
    } catch (e) {
        error("top", e);
        return false;
    }
});
addHTMLPrototype("left", function() {
    try {
        return this.getClientRects && this.getClientRects()[0].left <= this.offsetLeft ? this.getClientRects()[0].left : this.offsetLeft;
    } catch (e) {
        error("left", e);
        return false;
    }
});
addHTMLPrototype("toString", function () {
    try {
        var domElemContainer = document.createElement('div');
        domElemContainer.appendChild(this.cloneNode(true));
        return domElemContainer.innerHTML; 
    } catch (e) {
        error("toString", e);
        return false;
    }
}, true);
addHTMLPrototype("getElementsByClassName", function(classnames, taghint) {
    try {
        var exps = classnames.split(/\s+/).map(function(name) {
            name = name.replace(/([/\\^$*+?.()|[\]{}])/g, '\\$1');
            return new RegExp('(^|\\s)'+name+'(\\s|$)');
        }),
        elems = this.getElementsByTagName(taghint || '*'),
        matches = Array();
        for (var i = 0, len = this.length; i < len; i++) {
            var elem = elems[i];
            (exps.every(function(exp) {
                return exp.test(elem.className);
            })) && matches.push(el);
        }
        return matches;
    } catch (e) {
        error("getElementsByClassName", e);
        return false;
    }
});
/*dataset workaround*/
if (!$w.DOMStringMap) {
    addHTMLPrototype("dataset", eval((function(){
        try {
            var attributes = this.attributes,
            ds = {};
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
/*----------------------------------------------------------------------------------------------------------------
/-	Array class Extensions
/---------------------------------------------------------------------------------------------------------------*/
Array.prototype.filter = Array.prototype.filter || function(func /*, thiss*/) {
    try {
        if (!isFunction(func)) {
            throw new TypeError();
        }
        var filtered = new Array(),
        thiss = arguments[1] || this;
        for (var i = 0; i < this.length; i++) {
            var val = this[i];
            if (func.call(thiss, val, i, this)) {
                filtered.push(val);
            }
        }

        return filtered;
    } catch (e) {
        return false;
    }
};

Array.prototype.isEmpty = Array.prototype.isEmpty || function() {
    try {
        return (this.length == 0);
    } catch (e) {
        error("Array.isEmpty", e);
        return false;
    }  
};
Array.prototype.indexOf = Array.prototype.indexOf || function(value) {
    try {
        var len = this.length,
        i = 0;
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
    try {
        var len = this.length,
        i = 0;
        while (i < len) {
            if (value instanceof Object ? func(this[i], value) : func(this[i]) == value) return i;
            ++i;
        }
        return -1;
    } catch (e) {
        error("Array.indexOf", e);
    }  
};
Array.prototype.replaceAt = Array.prototype.replaceAt || function(index, value) {
    try {
        return this.splice(index, 1, value)[0];
    } catch (e) {
        error("Array.replaceAt", e);
    }  
};
Array.prototype.insertAfter = Array.prototype.insertAfter || function(index, value) {
    try {
        this.splice(index + 1, 0, value);
        return true;
    } catch (e) {
        error("Array.insertAfter", e);
        return false;
    }  
};
Array.prototype.insertBefore = Array.prototype.insertBefore || function(index, value) {
    try {
        this.splice(index, 0, value);
        return true;
    } catch (e) {
        error("Array.insertBefore", e);
        return false;
    }  
};
Array.prototype.trim = Array.prototype.trim || function() {
    try {
        for (var i = 0, len = this.length; i < len; i++) {
            this[i].isString && this[i].isString() && (this[i] = this[i].toString().trim());
        }
        return true;
    } catch (e) {
        error("Array.trim", e);
        return false;
    }  
};
Array.prototype.condense = Array.prototype.condense || function () {
    try {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i]) {
                continue;
            }
            this.splice(i,1);
            len--;
            i--;
        }
        return true;
    } catch (e) {
        error("Array.condence", e);
        return false;
    }  
}
Array.prototype.remove = Array.prototype.remove || function (value, indexOf) {
    try {
        indexOf = indexOf || this.indexOf;
        var index = indexOf.call(this, value);
        if(index == -1) {
            return false;
        }
        return this.splice(index, 1)[0];
    } catch (e) {
        error("Array.remove", e);
    }  
};
Array.prototype.map = Array.prototype.map || function(callback /*, thisObject*/) {
    try {
        var thisObject = arguments[1] || this,
        other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= callback.call(thisObject, this[i], i, this);
        return other;
    } catch (e) {
        error("Array.map", e);
    }  
};
Array.prototype.every = Array.prototype.every || function(callback /*, thisObject*/) {
    try {
        var thisObject = arguments[1] || this;
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !callback.call(thisObject, this[i], i, this))
                return false;
        return true;
    } catch (e) {
        error("Array.every", e);
    }  
};

/*----------------------------------------------------------------------------------------------------------------
/-	Date class Extensions
/---------------------------------------------------------------------------------------------------------------*/
Date.prototype.format = Date.prototype.format || function (format) {
    var date = this.getDate(),
    day = this.getDay(),
    month = this.getMonth() + 1,
    year = this.getFullYear(),
    firstMonday = new Date((new Date('1/6/' + year)).getTime() + (1-(new Date('1/6/' + year)).getDay())*(24*60*60*1000)),
    week = Math.ceil(Math.ceil((this - (firstMonday - (new Date('1/1/'+year)))) - (new Date('12/31/' + (year - 1))))/(7*24*60*60*1000)),
    hour = this.getHours(),
    minute = this.getMinutes(),
    second = this.getSeconds(),
    GMTDiff = this.getTimezoneOffset(),
    GMTDiffFormatted = (GMTDiff > 0 ? "+" : "-") + (Math.abs(GMTDiff) < 100 ? "00" : (Math.abs(GMTDiff) < 1000 ? "0" : "")),
    epoch = this.getTime(),
    timezones = {
        'Afghanistan Time':'AFT',
        'AIX specific equivalent of Central European Time':'DFT',
        'Alaska Daylight Time':'AKDT',
        'Alaska Standard Time':'AKST',
        'Arab Standard Time (Kuwait, Riyadh)':'AST',
        'Arabian Standard Time (Abu Dhabi, Muscat)':'AST',
        'Arabic Standard Time (Baghdad)':'AST',
        'Argentina Time':'ART',
        'Armenia Summer Time':'AMST',
        'Armenia Time':'AMT',
        'ASEAN Common Time':'ACT',
        'Atlantic Daylight Time':'ADT',
        'Atlantic Standard Time':'AST',
        'Australian Central Daylight Time':'ACDT',
        'Australian Central Standard Time':'ACST',
        'Australian Eastern Daylight Time':'AEDT',
        'Australian Eastern Standard Time':'AEST',
        'Australian Western Daylight Time':'AWDT',
        'Australian Western Standard Time':'AWST',
        'Azerbaijan Time':'AZT',
        'Azores Standard Time':'AZOST',
        'Baker Island Time':'BIT',
        'Bangladesh Standard Time':'BST',
        'Bhutan Time':'BTT',
        'Bolivia Time':'BOT',
        'Brasilia Time':'BRT',
        'British Indian Ocean Time':'BIOT',
        'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)':'BST',
        'Brunei Time':'BDT',
        'Cape Verde Time':'CVT',
        'Central Africa Time':'CAT',
        'Central Daylight Time (North America)':'CDT',
        'Central European Daylight Time':'CEDT',
        'Central European Summer Time (Cf. HAEC)':'CEST',
        'Central European Time':'CET',
        'Central Standard Time (Australia)':'CST',
        'Central Standard Time (North America)':'CST',
        'Chamorro Standard Time':'CHST',
        'Chatham Daylight Time':'CHADT',
        'Chatham Standard Time':'CHAST',
        'Chile Standard Time':'CLT',
        'Chile Summer Time':'CLST',
        'China Standard Time':'CST',
        'China Time':'CT',
        'Christmas Island Time':'CXT',
        'Clipperton Island Standard Time':'CIST',
        'Cocos Islands Time':'CCT',
        'Colombia Summer Time':'COST',
        'Colombia Time':'COT',
        'Cook Island Time':'CKT',
        'Coordinated Universal Time':'UTC',
        'East Africa Time':'EAT',
        'Easter Island Standard Time':'EAST',
        'Eastern Caribbean Time (does not recognise DST)':'ECT',
        'Eastern Daylight Time (North America)':'EDT',
        'Eastern European Daylight Time':'EEDT',
        'Eastern European Summer Time':'EEST',
        'Eastern European Time':'EET',
        'Eastern Standard Time (North America)':'EST',
        'Ecuador Time':'ECT',
        'Falkland Islands Summer Time':'FKST',
        'Falkland Islands Time':'FKT',
        'Fiji Time':'FJT',
        'French Guiana Time':'GFT',
        'Further-eastern_European_Time':'FET',
        'Galapagos Time':'GALT',
        'Gambier Island Time':'GIT',
        'Georgia Standard Time':'GET',
        'Gilbert Island Time':'GILT',
        'Greenwich Mean Time':'GMT',
        'Gulf Standard Time':'GST',
        'Guyana Time':'GYT',
        'Hawaii Standard Time':'HST',
        'Hawaii-Aleutian Daylight Time':'HADT',
        'Hawaii-Aleutian Standard Time':'HAST',
        'Heard and McDonald Islands Time':'HMT',
        'Heure AvancÃ©e d\'Europe Centrale francised name for CEST':'HAEC',
        'Hong Kong Time':'HKT',
        'Indian Standard Time':'IST',
        'Indochina Time':'ICT',
        'Iran Standard Time':'IRST',
        'Irish Summer Time':'IST',
        'Irkutsk Time':'IRKT',
        'Israel Standard Time':'IST',
        'Israeli Daylight Time':'IDT',
        'Japan Standard Time':'JST',
        'Kamchatka Time':'PETT',
        'Korea Standard Time':'KST',
        'Krasnoyarsk Time':'KRAT',
        'Line Islands Time':'LINT',
        'Lord Howe Standard Time':'LHST',
        'Magadan Time':'MAGT',
        'Malaysia Time':'MYT',
        'Malaysian Standard Time':'MST',
        'Marquesas Islands Time':'MIT',
        'Mauritius Time':'MUT',
        'Middle European Saving Time Same zone as CEST':'MEST',
        'Middle European Time Same zone as CET':'MET',
        'Moscow Standard Time':'MSK',
        'Moscow Summer Time':'MSD',
        'Mountain Daylight Time (North America)':'MDT',
        'Mountain Standard Time (North America)':'MST',
        'Myanmar Standard Time':'MST',
        'Nepal Time':'NPT',
        'New Zealand Daylight Time':'NZDT',
        'New Zealand Standard Time':'NZST',
        'Newfoundland Daylight Time':'NDT',
        'Newfoundland Standard Time':'NST',
        'Newfoundland Time':'NT',
        'Norfolk Time<sup id="cite_ref-0" class="reference"><span>[</span>1<span>]</span></sup>':'NFT',
        'Omsk Time':'OMST',
        'Pacific Daylight Time (North America)':'PDT',
        'Pacific Standard Time (North America)':'PST',
        'Pakistan Standard Time':'PKT',
        'Philippine Standard Time':'PST',
        'Phoenix Island Time':'PHOT',
        'RÃ©union Time':'RET',
        'Samara Time':'SAMT',
        'Samoa Standard Time':'SST',
        'Seychelles Time':'SCT',
        'Singapore Standard Time':'SST',
        'Singapore Time':'SGT',
        'Solomon Islands Time':'SBT',
        'South African Standard Time':'SAST',
        'South Georgia and the South Sandwich Islands':'GST',
        'Sri Lanka Time':'SLT',
        'Tahiti Time':'TAHT',
        'Thailand Standard Time':'THA',
        'Uruguay Standard Time':'UYT',
        'Uruguay Summer Time':'UYST',
        'Venezuelan Standard Time':'VET',
        'Vladivostok Time':'VLAT',
        'West Africa Time':'WAT',
        'Western European Daylight Time':'WEDT',
        'Western European Summer Time':'WEST',
        'Western European Time':'WET',
        'Western Standard Time':'WST',
        'Yakutsk Time':'YAKT',
        'Yekaterinburg Time':'YEKT'
    },
    currentTimezone = this.toTimeString().replace(/.*?\((.*?)\).*?/, '$1'),
    dateWithZero = (date < 10 ? "0" + date : date),
    threeLetterDay = ['\\S\\u\\n','\\M\\o\\n','\\T\\u\\e\\s','\\W\\e\\d','\\T\\h\\u','\\F\\r\\i', '\\S\\a\\t'][day],
    threeLetterMonth = ['\\J\\a\\n','\\F\\e\\b','\\M\\a\\r','\\A\\p\\r','\\M\\a\\y','\\J\\u\\n','\\J\\u\\l','\\A\\u\\g','\\S\\e\\p','\\O\\c\\t','\\N\\o\\v','\\D\\e\\c'][month - 1],
    hour24 = (hour < 10 ? "0" + hour : hour),
    minuteWithZero = (minute < 10 ? "0" + minute : minute),
    secondsWithZero = (second < 10 ? "0" + second : second);
	
    return /*option d*/format.replace(/([^\\])d|^d/g, '$1' + dateWithZero).// replace all d's with the 2 digit day leading 0
    /*option D*/replace(/([^\\])D|^D/g, '$1' + threeLetterDay).// replace all D's with A textual representation of a day, three letters
    /*option j*/replace(/([^\\])j|^j/g, '$1' + date).// replace all j's with the day without leading 0
    /*option l*/replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).// replace all l's (lower case L) with A full textual representation of the day of the week
    /*option N*/replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).// replace all N's with ISO-8601 numeric representation of the day of the week
    /*option S*/replace(/([^\\])S|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).// replace all S's with English ordinal suffix for the day of the month, 2 characters
    /*option w*/replace(/([^\\])w|^w/g, '$1' + day).// replace all w's with Numeric representation of the day of the week
    /*option z*/replace(/([^\\])z|^z/g, '$1' + Math.ceil(Math.ceil(this - (new Date('12/31/' + (year - 1))))/(24*60*60*1000)) - 1).// replace all z's with The day of the year (starting from 0)
    
    /*option W*/replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).// replace all W's with ISO-8601 week number of the year, weeks staring on Monday
			
    /*option F*/replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).// replace all F's with A full textual representation of a month, such as January or March
    /*option m*/replace(/([^\\])m|^m/g, '$1' + (month < 10 ? "0" + month : month)).// replace all m's with Numeric representation of a month, with leading zeros
    /*option M*/replace(/([^\\])M|^M/g, '$1' + threeLetterMonth).// replace all M's with A short textual representation of a month, three letters
    /*option n*/replace(/([^\\])n|^n/g, '$1' + month).// replace all n's with Numeric representation of a month, without leading zeros
    /*option t*/replace(/([^\\])t|^t/g, '$1' + (month == 2 && isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).// replace all t's with Number of days in the given month
			
    /*option L*/replace(/([^\\])L|^L/g, '$1' + isInt(year/4) ? 0 : 1).//replace all t's with Whether it's a leap year
    /*option o*/replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).//replace all o's with A full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.
    /*option Y*/replace(/([^\\])Y|^Y/g, '$1' + year).//replace all t's with A full numeric representation of a year, 4 digits
    /*option y*/replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).//replace all t's with A two digit representation of a year
		
    /*option a*/replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).//replace all a's with Lowercase Ante meridiem and Post meridiem
    /*option A*/replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).//replace all A's with Uppercase Ante meridiem and Post meridiem
    /*option B*/replace(/([^\\])B|^B/g, '$1' + Math.floor((((this.getUTCHours() + 1)%24) + this.getUTCMinutes()/60 + this.getUTCSeconds()/3600)*1000/24)).//replace all B's with Swatch Internet time
    /*option g*/replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).//replace all g's with 12-hour format of an hour without leading zeros
    /*option G*/replace(/([^\\])G|^G/g, '$1' + hour).//replace all G's with 24-hour format of an hour without leading zeros
    /*option h*/replace(/([^\\])h|^h/g, '$1' + (hour < 10 ? "0" + hour : (hour > 12 && hour - 12 < 10) ? "0" + (hour - 12) : hour)).//replace all h's with 12-hour format of an hour with leading zeros
    /*option H*/replace(/([^\\])H|^H/g, '$1' + hour24).//replace all H's with 24-hour format of an hour with leading zeros
    /*option i*/replace(/([^\\])i|^i/g, '$1' + minuteWithZero).//replace all i's with Minutes with leading zeros
    /*option s*/replace(/([^\\])s|^s/g, '$1' + secondsWithZero).//replace all s's with Seconds, with leading zeros
    /*option u*/replace(/([^\\])u|^u/g, '$1' + epoch*1000).//replace all u's with Microseconds

    /*option e*/replace(/([^\\])e|^e/g, '$1' + currentTimezone).//replace all e's with Timezone identifier
    /*option I*/replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(this.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(this.getFullYear(), 6, 1)).getTimezoneOffset()) > this.getTimezoneOffset() ? 1 : 0).//replace all I's with Whether or not the date is in daylight saving time

    /*option O*/replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).//replace all O's with Difference to Greenwich time (GMT) in hours	
    /*option P*/replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).//replace all P's with Difference to Greenwich time (GMT) with colon between hours and minutes
    /*option T*/replace(/([^\\])T|^T/g, '$1' + timezones[currentTimezone]).//replace all T's with Timezone abbreviation
    /*option Z*/replace(/([^\\])Z|^Z/g, '$1' + (-1 * GMTDiff * 60)).//replace all Z's with Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
		
		
    /*option c*/replace(/([^\\])c|^c/g, '$1' + (this.toISOString ? this.toISOString() : "")).//replace all c's with ISO 8601 date
    /*option r*/replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).//replace all r's with RFC 2822 formatted date
    /*option U*/replace(/([^\\])U|^U/g, '$1' + epoch / 1000).//replace all U's with Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
    replace(/\\/gi, "");
};

/*----------------------------------------------------------------------------------------------------------------
/-	String class Extensions
/---------------------------------------------------------------------------------------------------------------*/
String.prototype.trim = String.prototype.trim || function(character) {
    try {
        return _trim(this, undefined, character);
    } catch (e) {
        error("String.trim", e);
    }
};
String.prototype.ltrim = String.prototype.ltrim || function (character) {
    try {
        return _trim(this, 'l', character);
    } catch (e) {
        error("String.ltrim", e);
    }
};
String.prototype.rtrim = String.prototype.rtrim || function (character) {
    try {
        return _trim(this, 'r', character);
    } catch (e) {
        error("String.rtrim", e);
    }
};
function _trim(str, side, character) {
    try {
        var temp = str,
        trimChars = character ? eval('{"'+character+'":1}') : {
            " ":1,
            "\t":1,
            "\n":1
        };
        if (!side || side == 'l') {
            while (temp.charAt(0) in trimChars) {
                temp = temp.substring(1);
            }
        }
        if (!side || side == 'r') {
            while (temp.charAt(temp.length - 1) in trimChars) {
                temp = temp.substring(0, temp.length - 1);
            }
        }
        return temp.toString();
    } catch (e) {
        error("_trim", e);
    }
}
String.prototype.sanitize = String.prototype.sanitize || function () {
    try {
        var thiss = this.replace(/&/gi, "&#38;").
        replace(/#/gi, "&#35;").
        replace(/%/gi, "&#37;").
        replace(/;/gi, "&#59;").
        replace(/\+/gi, "&#43;").
        replace(/\-/gi, "&#45;").
        replace(/\'/gi, "&#39;").
        replace(/\\"/gi, "&#34;").
        replace(/\(/gi, "&#40;").
        replace(/\)/gi, "&#41;").
        replace(/\</gi, "&#60;").
        replace(/\>/gi, "&#62;");

        return thiss;
    } catch (e) {
        error("XSSCleaner", e);
    }
};
String.prototype.isValidEmail = String.prototype.isValidEmail || function () {
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
    try {
        return (this === "");
    } catch (e) {
        error("XSSCleaner", e);
    }
};
String.prototype.capitalize = String.prototype.capitalize || function (pos, everyWord) {
    try {
        pos = pos || [0];
        !isArray(pos) && (pos = [pos]);
        var wordArray = everyWord ? this.split(' ') : ([this]);
        for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < wordArray.length; j++) {
                wordArray[j] = wordArray[j].substring(0,pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
            }
        }
        return wordArray.join(' ');
    } catch (e) {
        error("capitalize", e);
    }
};
String.prototype.toDomElement = String.prototype.toDomElement || function () {
    try {
        var div = document.createElement('div'), children;
        div.innerHTML = this;
        children = div.childNodes;
        if (children.length == 1) {
            return children[0];
        } else if (children.length == 0) {
            return false;
        }
        return children;
    } catch (e) {
        error("toDomElement", e);
    }
};
String.prototype.convertUTCDate = function (delimiter) {
    var dateAsString = this;
    if (dateAsString.substring(dateAsString.length - 2) == ".0") {
        dateAsString = dateAsString.substring(0, dateAsString.length - 2);
    }
    var pattern = new RegExp( "(\\d{4})" + delimiter + "(\\d{2})" + delimiter + "(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})" );
    var parts = dateAsString.match( pattern );

    return parts ? parts[2] + "/" + parts[3] + "/" + parts[1] + " " + parts[4] + ":" + parts[5] + ":" + parts [6] : dateAsString;
};
String.prototype.toCurrencyNotation = String.prototype.toCurrencyNotation || function () {
    try {
        return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    } catch (e) {
        error("", e);
    }
}

/*----------------------------------------------------------------------------------------------------------------
/-	Number class Extensions
/---------------------------------------------------------------------------------------------------------------*/
Number.prototype.aboutEqualTo = Number.prototype.aboutEqualTo || function (compare, giveOrTake) {
    try {
        return isBetween(this, compare - giveOrTake, compare + giveOrTake, true);
    } catch (e) {
        error("aboutEqualTo", e);
    }
};
Number.prototype.isOdd = Number.prototype.isOdd || function () {
    try {
        if (isNaN(this)) {
            return false;
        }
        return this&1;
    } catch (e) {
        error("isOdd", e);
    }
};
Number.prototype.isEven = Number.prototype.isEven || function () {
    try {
        if (isNaN(this)) {
            return false;
        }
        return !(this&1);
    } catch (e) {
        error("isEven", e);
    }
};
Number.prototype.toCurrencyNotation = Number.prototype.toCurrencyNotation || function () {
    try {
        return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    } catch (e) {
        error("", e);
    }
};

/*----------------------------------------------------------------------------------------------------------------
/-	Object class Extensions
/---------------------------------------------------------------------------------------------------------------*/
addObjectPrototype("every", function() {
    try {
		
    } catch (e) {
        error('every', e)
    }
});
addObjectPrototype("itemCount", function () {
    try {
        if (isObject(this)) {
            var count = 0;
            for (prop in this){
                if (this.hasOwnProperty(prop)) {
                    count++;	
                }
            }
            return count;
        }
    } catch (e) {
        error('itemCount', e);
    }
});
addObjectPrototype("equals", function (compare){
    try {
        if ((isObject(this) && isObject(compare)) || (this.isArray() && compare.isArray())) {
            for (prop in compare){
                if (!this.hasOwnProperty(prop)) {
                    continue;
                }
                if (this[prop] !== compare[prop]) {
                    return false;
                }
            }
            for (prop in this){
                if (!this.hasOwnProperty(prop)) {
                    continue;
                }
                if (this[prop] !== compare[prop]) {
                    return false;
                }
            }
            return true;
        } else {
            return (this.toString() == compare.toString() && this.constructor == compare.constructor);
        }
    } catch (e) {
        error('equals', e);
    }
});
addObjectPrototype("copyObject", function () {
    if (!this) {
        return;
    }
    var copyObject = new this.constructor();
    copyObject.duplicate ? copyObject.duplicate(this, true) : duplicate(copyObject, this, true);
    return copyObject;
});
addObjectPrototype("duplicate", function (original, properties_only) {
    try {
        if (isString(this) || isString(original)
            || isInt(this) || isInt(original)
            || isFloat(this) || isFloat(original)
            || isNumber(this) || isNumber(original)) {
            error('duplicate', 'invalid type');
            return false;
        }
        for (prop in this){
            if (this.hasOwnProperty(prop)) {
                delete this[prop];	
            }
        }
        for (prop in original){
            if (original.hasOwnProperty(prop) && (!original[prop].isFunction() || !properties_only)) {
                this[prop] = original[prop];	
            }
        }
        return true;
    } catch (e) {
        error('duplicate', e);
    }
});
addObjectPrototype("merge", function (secondary, shareOnly) {
    try {
        var obj = {};
        obj.duplicate(this);
        
        for (prop in secondary){
            if (secondary.hasOwnProperty(prop)) {
                obj[prop] = secondary[prop];	
            }
        }
        return obj;
    } catch (e) {
        error('merge', e);
    }
});
addObjectPrototype("joinLeft", function (right, overwrite) {
    try {
        if (!isObject(this) && !isObject(right)) {
            error('joinLeft', 'invalid type');
            return false;
        }
        for (prop in right){
            if (!this.hasOwnProperty(prop)) {
                continue;
            }
            (!this[prop] || overwrite) && (this[prop] = right[prop]);
        }
        return true;
    } catch (e) {
        error('joinLeft', e);
    }
});
addObjectPrototype("joinRight", function (right, overwrite) {
    try {
        if (!isObject(this) && !isObject(right)) {
            error('joinRight', 'invalid type');
            return false;
        }
        for (prop in this){
            if (!this.hasOwnProperty(prop)) {
                continue;
            }
            (!right[prop] || overwrite) && (right[prop] = this[prop]);
        }
        return true;
    } catch (e) {
        error('joinRight', e);
    }
});
addObjectPrototype("innerJoin", function (right, options) {
    try {
        if (!isObject(this) && !isObject(right)) {
            error('innerJoin', 'invalid type');
            return false;
        }
        var rtn = {},
        options = options || {
            equal:true
        };
        for (prop in this){
            if (!this.hasOwnProperty(prop)) {
                continue;
            }
            (options.equal || options.left) && (right[prop] == this[prop])
            ? rtn[prop] = this[prop] : options.right && (rtn[prop] = right[prop]);	
        }
        return rtn;
    } catch (e) {
        error('innerJoin', e);
    }
});
addObjectPrototype("toStringAlt", function (delimiter, prefix) {
    try {
        delimiter = delimiter || '=';
        prefix = prefix || '&';
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
addObjectPrototype("isGeolocation", function () {
    try {
        return (this.constructor.toString().indexOf('function Geolocation()') == 0);
    } catch (e) {
        error('isGeolocation', e);
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
        return (parseInt(this) == this || parseInt === 0);
    } catch (e) {
        error('isInt', e);
    }
});
addObjectPrototype("isFloat", function() {
    try {
        return (isNumber(this) && (parseFloat(this) == this || parseFloat(this) === 0));
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

function ajax(params){
    try {
        params.dataType = params.dataType || 'json';
        if (params.dataType.toLowerCase() == 'jsonp') {
            var head = document.getElementsByTagName('head')[0],
            func = '_cjson' + Math.floor(Math.random() * 1000000),
            insert = 'insertBefore',
            tag = document.createElement('script');
            while ($w[func]) {
                func = '_cjson' + Math.floor(Math.random() * 1000000);
            }
            params.onsuccess = params.onsuccess || function (){};
            params.error = params.error || function (){};
            $w[func] = function (data) {
                !data.hasErrors && params.onsuccess(data) || params.error(data);
            }
            if (params.query && isObject(params.query)) {
                params.query = toStringAlt(params.query, '=', '&');
            }
            params.url = params.url || "functions/controller.php";
            //params.query = params.run ? "&run=" + params.run + (params.query || "") : params.query || "";
            params.query = (params.run ? "&run=" + params.run :"") + (params.query || "");
            
            params.url += (params.url.indexOf('?') != -1 ? "&" : "?") + "callback=" + func + (params.query || "");
            
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
                        if ( head && this.parentNode && IEVersion () == -1) {
                            head.removeChild( this );
                        }
                        // Dereference the script
                        //delete this;
                    }
                } catch (e) {
                    error('ajax.tag.statechange', e);
                }
            };
            head[insert](tag, head.firstChild);
        } else {
            var httpRequest = new Request(),
            fileUpload = httpRequest.upload || {};
            params.method = params.method || "POST";
            params.headers = params.headers || Array();
            params.url = params.url || "functions/controller.php";
            	
            if (params.query && isObject(params.query)) {
                params.query = toStringAlt(params.query, '=', '&');
            }
            params.query = (params.run ? "run=" + params.run :"") + (params.query || "");
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
            
            if (params.method == "GET") {
                params.url += params.query ? "?" + params.query : "";
                params.query = undefined;
            }
            params.onbefore(httpRequest, this);
            httpRequest.onreadystatechange = function (xp) {
                params.onstatechange(xp);
                var data = ajaxServerResponse(this);
                if (data) {
                    params.onsuccess(data, this.status, this);
                } else if (this.readyState == 4) {
                    try {
                        params.onerror(eval(this.responseText), this.status, this);
                    } catch (e) {
                        params.onerror(this.responseText, this.status, this);
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
        error("ajax", e);
    }
}


/*----------------------------------------------------------------------------------------------------------------
/-	helper operations
/---------------------------------------------------------------------------------------------------------------*/
function $GET(variable, options) {//used to retrieve variables in the url
    try {
        options = options || {};
        var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
        defer = $COMMIT.update && (options.defer || options == "defer") ? true : false,
        regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase),
        attr = "search",
        location = {};
        location.hash = $l.hash,
        location.search = $l.search;
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
        return decodeURI(location[attr].replace(regex, '$3'));
    } catch (e) {
        var message = "Error in _import\n" + (e.description || e);
        if (console && console.log) {
            console.log(message);
        } else {
            alert(message);
        }
    }
}
function $SET(keyValuePairs, options) {
    try {
        if (arguments.length == 3 || isString(keyValuePairs)) {
            var variable = keyValuePairs;
            keyValuePairs = {};
            keyValuePairs[variable] = options;
            options = arguments[2] || {};
        } else if (!options) {
            options = {};
        }
        var defer = options.defer || options == "defer" ? true : false;
        loc = {
            'search' : $l.search, 
            'hash' : $l.hash
        };
        if (isArray(keyValuePairs)) {
            for (var i = 0, len = keyValuePairs.length; i < len; i++) {
                var keyValuePair = keyValuePairs[i];
                loc = _set(keyValuePair.variable, keyValuePair.value, defer, options, loc);
            }
        } else if (isObject(keyValuePairs)) {
            for (variable in keyValuePairs) {
                if (!keyValuePairs.hasOwnProperty(variable)) {
                    continue;
                }
                loc = _set(variable, keyValuePairs[variable], defer, options, loc);
            }
        }
        
        if (!defer) {
            $l.hash = loc.hash;
            if ($l.search.trim() != loc.search.trim()) {
                $l.search = loc.search;
            }
        }
    } catch (e) {
        error("$SET", e);
    }
}
function _set (variable, value, defer, options, loc){
    try {
        value = encodeURI(value);
        var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
        regex = new RegExp('(.*)?(' + variable +'=)(.*?)(([&]|[@])(.*)|$)', ignoreCase),
        attr = "search",
        symbol = "&",
        queryStr = "";
        attr = variable.indexOf('@') == 0 ? !(symbol='') && "hash" : attr;

        $COMMIT[attr] = $COMMIT[attr] || "";

        if (defer) {
            $COMMIT[attr] = ($COMMIT[attr] || $l[attr]);
            queryStr = regex.test($COMMIT[attr]) ? 
            $COMMIT[attr].replace(regex, '$1$2' + value + '$4') : 
            $COMMIT[attr] + symbol + variable + '=' + value;
            if (symbol == "&" && queryStr.indexOf('&') == 0) {
                queryStr = "?" + queryStr.substring(1);
            }
            $COMMIT[attr] = queryStr;
            $COMMIT.update = true;
        } else {
            queryStr = regex.test(loc[attr]) ? 
            loc[attr].replace(regex, '$1$2' + value + '$4') : 
            loc[attr] + symbol + variable + '=' + value;
            if (symbol == "&" && queryStr.indexOf('&') == 0) {
                queryStr = "?" + queryStr.substring(1);
            }
            loc[attr] = queryStr;
        }
        return loc;
    } catch (e) {
        error("_set", e);
    }
}
function $DEL(variable, options){
    try {
        options = options || {};
        var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
        defer = options.defer || options == "defer" ? true : false,
        regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase),
        attr = "search";
        if (regex.test($l.hash)) {
            attr = 'hash';
        } else if (!regex.test($l.search)){
            return false;
        }
		
        $COMMIT[attr] = $COMMIT[attr] || "";
		
        regex = new RegExp('([&]?|[@])(' + variable + '=([^&|^@]*)[&]?)', ignoreCase);
		
        if (!defer) {
            $l[attr] = $l[attr].replace(regex, '');
        } else {		
            $COMMIT[attr] = ($COMMIT[attr] || $l[attr]);
            $COMMIT[attr] = $COMMIT[attr].replace(regex, '');
            $COMMIT.update = true;
        }
        return true;
    } catch (e) {
        error("$DEL", e);
    }
}
function $COMMIT() {
    if ($COMMIT.update) {
        if ($COMMIT.search) {
            $l.href = $COMMIT.search + $COMMIT.hash || "";
        } else if ($COMMIT.hash) {
            $l.hash = $COMMIT.hash;
        }
        $ROLLBACK();
    }
}
function $ROLLBACK() {
    delete $COMMIT.update;
    delete $COMMIT.search;
    delete $COMMIT.hash;
}

function killPropagation(ev, bubble, returnValue) {//used to cancel any bubbling and propagation
    try {
        ev = ev || $w.event;
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

function isNull(thiss, value) {//used to determine if thiss is undefined->if undefined, return value
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
    try {
        var index = "";
        prefix = prefix || "";
        while (!isNull($(prefix + index))) {
            index = index || 0;
            index++;
        }
        return {
            id : prefix + index, 
            index: index
        };
    } catch (e) {
        error('getUniqueId', e);
    }
}
function error(fname, e) {
    try {
        if ($GET("debug") == "true" || Craydent.DEBUG_MODE) {
            cout("Error in " + fname + "\n" + (e.description || e));
        }
    } catch (e) {
        cout("Error in " + fname + "\n" + (e.description || e));
    }
}
function cout(value){
    try {
        if ($GET("debug") == "true" || Craydent.DEBUG_MODE) {
            console && console.log && console.log(value);
        }
    } catch (e) {
        error('cout', e);
    }
}
function logit(value){
    cout(value);
}
function isIE6() {
    try {
        var rv = IEVersion();
        return (rv != -1 && rv < 7.0);
    } catch (e) {
        error('isIE6', e);
    }
}
function IEVersion () {
    try {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent,
            re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    } catch (e) {
        error('IEVersion', e);
    }
}
function isChrome(){
    try {
        return (navigator.userAgent.indexOf("Chrome") != -1);
    } catch(e){
        error('isChrome', e);
    }
}
function isSafari(){
    try {
        return (navigator.userAgent.indexOf("Chrome") == -1) && (navigator.userAgent.indexOf("Apple") != -1);
    } catch(e){
        error('isSafari', e);
    }
}
function isOpera(){
    try {
        return (navigator.userAgent.indexOf("Chrome") == -1) 
            && (navigator.userAgent.indexOf("Apple") == -1) 
            && (navigator.userAgent.indexOf("Opera") != -1);   
    } catch(e){
        error('isOpera', e);
    }
}
function isFirefox(){
    try {
        return (navigator.userAgent.indexOf("Chrome") == -1) 
            && (navigator.userAgent.indexOf("Apple") == -1) 
            && (navigator.userAgent.indexOf("Opera") == -1) 
            && (navigator.userAgent.indexOf("Firefox") == -1);   
    } catch(e){
        error('isFirefox', e);
    }
}

function _getBrowserVersion(browser){
    try {
        var info = navigator.userAgent;
        if (browser == "safari") {
            info = navigator.vendor;
        } else if (browser == "Opera") {
            info = $w.opera;
        }
        var index = navigator.userAgent.indexOf(browser);
        if (index == -1 && $w["is"+browser]()) return -1;
        return parseFloat(navigator.userAgent.substring(index+browser.length+1));
    } catch(e){
        error('_getBrowserVersion', e);
    }
}
function ChromeVersion (){
    try {
        var browser = "Chrome"
        return _getBrowserVersion(browser);   
    } catch(e){
        error('ChromeVersion', e);
    }
}
function SafariVersion (){
    try {
        var browser = "Safari"
        return _getBrowserVersion(browser);
    } catch(e){
        error('SafariVersion', e);
    }
}
function OperaVersion (){
    try {
        var browser = "Opera"
        return _getBrowserVersion(browser);   
    } catch(e){
        error('OperaVersion', e);
    }
}
function FirefoxVersion (){
    try {
        var browser = "Firefox"
        return _getBrowserVersion(browser);
    } catch(e){
        error('FirefoxVersion', e);
    }
}

function isIPhone(){
    try{
        return !isIPad() && navigator.userAgent.indexOf("iPhone") != -1;
    } catch (e) {
        error('isIPhone', e);
    }
}
function isIPad() {
    try {
        var navUserAgent = navigator.userAgent;
        return (/iPad|iPhone OS 3_[1|2]_2/i.test(navUserAgent));
    } catch (e) {
        error('isIPad', e);
    }
}
function isWindows(){
    try{
        return navigator.platform.indexOf("Win") != -1;
    } catch (e) {
        error('isWindows', e);
    }
}
function isMac(){
    try{
        return navigator.platform.indexOf("Mac") != -1;
    } catch (e) {
        error('isMac', e);
    }
}
function isLinux(){
    try{
        return navigator.platform.indexOf("Linux") != -1;
    } catch (e) {
        error('isLinux', e);
    }
}
function fillTemplate (htmlTemplate, objs) {
    try {
        htmlTemplate.isDomElement() && (htmlTemplate.toString());
        htmlTemplate = htmlTemplate || "";
        if (htmlTemplate.trim() == "") {
            return "";
        }
        if (isString(objs)) {
            try {
                objs = eval("(" + objs + ")");
            } catch (ex) {
                return "";
            }
        }
        objs = objs || [{}];
        if (!isArray(objs)) {
            objs = [objs];
        }
        var html = "";
        for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i],
            template = htmlTemplate.replace(new RegExp("\\$\\{this\\}", "gi"), parseRaw(obj)).replace(new RegExp("\\$\\{index}", "gi"), i);
            for (property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (template != "" && obj[property] != undefined && obj[property].toString().indexOf('\n') == -1) {
                        var regex = new RegExp("\\$\\{" + property + "\\}", "gi");
                        template = template.replace(regex, parseRaw(obj[property], true)).replace(/\$\{dataproperties\}/gi, "data-" + property + "='" + 
                            (obj[property].toString().indexOf('<') == 0 ? "" : obj[property]) + "' ${dataproperties}");
                    }
                }
            }
            // special run sytax
            while (/\$\{RUN\[(.+?)\]\}/.test(template)) {
                var match = /\$\{RUN\[(.+?)\]\}/.exec(template),
                funcValue = Array(),
                func = "",
                regex;
                if (match[1]) {
                    funcValue = match[1].split(';');
                    func = funcValue.splice(0,1);
                    regex = new RegExp("\\$\\{RUN\\[" + match[1]
                        .replace(/\$/gi, "\\$")
                        .replace(/\//gi, "\\/")
                        .replace(/\^/gi, "\\^")
                        .replace(/\./gi, "\\.")
                        .replace(/\|/gi, "\\|")
                        .replace(/\*/gi, "\\*")
                        .replace(/\+/gi, "\\+")
                        .replace(/\?/gi, "\\?")
                        .replace(/\{(.*?)\}/gi, "\\{$1\\}")
                        .replace(/\[(.*?)\]/gi, "\\[$1\\]")
                    + "\\]\\}", "gi"),
                    template = template.replace(regex, $w[func] ? $w[func].apply(this, funcValue) : "");
                }
            }
            html += template.replace(/\$\{dataproperties\}/gi, "").replace(/\$\{.*?\}/gi,"");
        }
        return html;
    } catch (e) {
        error('fillTemplate', e);
    }
}
function buildQuery(params) {
    try {
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
    } catch (e) {
        error('buildQuery', e);
    }
}
function parseBoolean(obj) {
    try {
        if (isString(obj)) {
            return (obj == "true" ? true : obj == "false" ? false : obj == "1" ? true : obj == "0" ? false : undefined);
        } else if (isNumber(obj)) {
            return (obj === 1 ? true : obj === 0 ? false : undefined);
        }
    } catch (e) {
        error('parseBoolean', e);
    }
}
function cacheImages(imgs) {
    for (var i = 0, len = imgs.length; i < len; i++) {
        var img = document.createElement('img');
        img.src = imgs[i];	
    }
}
/*Benchmark testing functions*/
function Benchmarker() {
    this.start = new Date();
    this.end = "";
    this.executionTime = 0;
    this.stop = function (func) {
        this.end = new Date();
        this.executionTime = (this.end - this.start)/1000;
        return this.executionTime;
    };
}

/*timing functions*/
function wait() {
    var args = arguments.callee.caller.arguments,
    funcOriginal = arguments.callee.caller.toString().
    replace(/\/\/.*?[\r\n]/gi,'').
    replace(/[\t\r\n]*/gi, '').
    replace(/\/\*.*?\*\//gi, ''),
    func = funcOriginal,
    funcArgNames = func.trim().replace(/^function\s*?\((.*?)\).*/, '$1').replace(/\s*/gi,'').split(','),
    fname = func.replace(/function\s*?(.*?)\s*?\(.*/,'$1'),
    fnBefore = func.substr(0, func.indexOf('return wait')),
    variableGroups = fnBefore.match(/var .*?;/gi),
    condition = func.replace(/.*?(return)*\s*?wait\((.*?)\);.*/, '$2'),
    fregex = /\s*?function\s*?\(\s*?\)\s*?\{/;
    func = func.replace(fname, '').replace(/(function\s*?\(.*?\)\s*?\{).*?(return)*\s*?wait\((.*?)\);/, '$1');
    for (var a = 0, alen = funcArgNames.length; a < alen; a++) {
        if (funcArgNames[a]) {
            func = func.replace(fregex, 'function(){var ' + funcArgNames[a] + '=' + parseRaw(args[a]) + ';');
        }
    }
    for (var i = 0, len = variableGroups.length; i < len; i++) {
        variableGroups[i] = variableGroups[i].replace(/^var\s(.*)?;/,'$1');
        var variables = variableGroups[i].split(/^(?!.*\{.*,).*$/g);
        if (!variables[0]) {
            variables = variableGroups[i].split(',');
        }
        for (var j = 0, jlen = variables.length; j < jlen; j++) {
            var variable = variables[j], regex, values;
            if (variable.indexOf('=') != -1) {
                variable = variable.split('=')[0].trim();
            }
            regex = new RegExp(variable + '\\s*?=\\s*?.*?\\s*?[,;]', 'gi');
            values = fnBefore.match(regex) || [];
            for (var k = values.length - 1; k >= 0; k--){
                try {
                    var value = eval(values[k].replace(/.*?=\s*?(.*?)\s*?;/, '$1').trim());
                    func = func.replace(fregex, 'function(){var ' + variable + '=' + parseRaw(value) + ';');
                } catch (e) {
                    error("wait.eval-value", e)
                }
            }
        }
    }

    if (isNumber(condition)) {
        setTimeout(eval(func), condition);
    } else {
        var delayFunc = function(){
            if (eval(condition)) {
                (eval("(" + func + ")"))();
            } else {
                setTimeout(delayFunc, 1);
            }
        }
        setTimeout(delayFunc, 1);
    }
}
function parseRaw(value, skipQuotes) {
    var raw = "";
    if (isString(value)) {
        !skipQuotes && (raw = "\"" + value + "\"") || (raw = value);
    }
    else if (isArray(value)) {
        for (var i = 0, len = value.length; i < len; i++) {
            value[i] = parseRaw(value[i]);
        }
        raw = "[" + value.join(',') + "]";
    }
    else if (value instanceof Object) {
        raw = JSON.stringify(value);
    }
    else {
        raw = value.toString();
    }
    return raw;
}
// Changes XML to JSON
function xmlToJson(xml, ignoreAttributes) {  
    // Create the return object
    var obj = {};
    if (isString(xml)) {
        xml = xml.replace(/&(?!amp;)/gi, '&amp;');
        if ($w.DOMParser) {
            xml = (new DOMParser()).parseFromString(xml, 'text/xml');
        } else {
            var doc;
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async='false';
            xml = doc.loadXML(xml) && doc;
        }
    }
	
    if (xml.nodeType == 1 && !ignoreAttributes) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            /*if (nodeName == "#text" && ignoreAttributes) {
                obj = xmlToJson(item, ignoreAttributes);
            } else */if (typeof(obj[nodeName]) == "undefined") {
                if (nodeName != "#text" || !ignoreAttributes) {
                    obj[nodeName] = xmlToJson(item, ignoreAttributes);
                } else if (xml.childNodes.length == 1) {
                    obj = xmlToJson(item, ignoreAttributes);
                }
            } else {
                if (!isArray(obj[nodeName]) || typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item, ignoreAttributes));
            }
        }
    }
    return obj;
};
/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
            ? this.getUTCFullYear()     + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate())      + 'T' +
            f(this.getUTCHours())     + ':' +
            f(this.getUTCMinutes())   + ':' +
            f(this.getUTCSeconds())   + 'Z'
            : null;
        };

        String.prototype.toJSON      =
        Number.prototype.toJSON  =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;


    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
            ? c
            : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

        // Produce a string from holder[key].

        var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            // If the type is 'object', we might be dealing with an object or an array or
            // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

            // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', {
                '': value
            });
        };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                ? walk({
                    '': j
                }, '')
                : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
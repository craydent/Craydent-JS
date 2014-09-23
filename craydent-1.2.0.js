/*/---------------------------------------------------------/*/
/*/ Craydent LLC v1.2.0                                     /*/
/*/	Copyright 2011 (http://craydent.com/about)          /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/	(http://craydent.com/license)                       /*/
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
var VISIBLE = "visible";
var HIDDEN = "hidden";


/*----------------------------------------------------------------------------------------------------------------
/-	Event tracking
/---------------------------------------------------------------------------------------------------------------*/
var EVENT_REGISTRY = {length : 0};// Array();
EVENT_REGISTRY.Exists = function (id, event, func, pos){
    try {
        pos = pos ? pos : function(){};
        if (EVENT_REGISTRY[id]) {
            for(eri = 0; eri < EVENT_REGISTRY[id].length; eri++){
                if(EVENT_REGISTRY[id][eri][0] == event && EVENT_REGI
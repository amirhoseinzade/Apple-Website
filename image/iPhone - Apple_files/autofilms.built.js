(function(){function b(l,h,j){function k(c,e){if(!h[c]){if(!l[c]){var f=typeof require=="function"&&require;
if(!e&&f){return f(c,!0)}if(a){return a(c,!0)}var d=new Error("Cannot find module '"+c+"'");
throw d.code="MODULE_NOT_FOUND",d}var g=h[c]={exports:{}};l[c][0].call(g.exports,function(m){var n=l[c][1][m];
return k(n?n:m)},g,g.exports,b,l,h,j)}return h[c].exports}var a=typeof require=="function"&&require;
for(var i=0;i<j.length;i++){k(j[i])}return k}return b})()({1:[function(d,f,e){f.exports={EventEmitterMicro:d("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":2}],2:[function(f,j,g){function h(){this._events={}
}var i=h.prototype;i.on=function(b,a){this._events[b]=this._events[b]||[];this._events[b].unshift(a)
};i.once=function(d,a){var b=this;function c(e){b.off(d,c);if(e!==undefined){a(e)
}else{a()}}this.on(d,c)};i.off=function(c,a){if(!this.has(c)){return}if(arguments.length===1){this._events[c]=null;
delete this._events[c];return}var b=this._events[c].indexOf(a);if(b===-1){return
}this._events[c].splice(b,1)};i.trigger=function(c,a){if(!this.has(c)){return}for(var b=this._events[c].length-1;
b>=0;b--){if(a!==undefined){this._events[c][b](a)}else{this._events[c][b]()}}};
i.has=function(a){if(a in this._events===false||this._events[a].length===0){return false
}return true};i.destroy=function(){for(var a in this._events){this._events[a]=null
}this._events=null};j.exports=h},{}],3:[function(d,f,e){f.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],4:[function(m,l,h){var i=m("./touchAvailable").original;var j=m("./helpers/globals");
var k=m("@marcom/ac-function/once");function n(){var a=j.getWindow();return(!i()&&!a.orientation)
}l.exports=k(n);l.exports.original=n},{"./helpers/globals":3,"./touchAvailable":7,"@marcom/ac-function/once":8}],5:[function(l,k,n){var m=l("./isDesktop").original;
var i=l("./isTablet").original;var j=l("@marcom/ac-function/once");function h(){return(!m()&&!i())
}k.exports=j(h);k.exports.original=h},{"./isDesktop":4,"./isTablet":6,"@marcom/ac-function/once":8}],6:[function(n,m,p){var o=n("./isDesktop").original;
var k=n("./helpers/globals");var l=n("@marcom/ac-function/once");var i=600;function j(){var a=k.getWindow();
var b=a.screen.width;if(a.orientation&&a.screen.height<b){b=a.screen.height}return(!o()&&b>=i)
}m.exports=l(j);m.exports.original=j},{"./helpers/globals":3,"./isDesktop":4,"@marcom/ac-function/once":8}],7:[function(l,k,g){var i=l("./helpers/globals");
var j=l("@marcom/ac-function/once");function h(){var a=i.getWindow();var c=i.getDocument();
var b=i.getNavigator();return !!(("ontouchstart" in a)||(a.DocumentTouch&&c instanceof a.DocumentTouch)||(b.maxTouchPoints>0)||(b.msMaxTouchPoints>0))
}k.exports=j(h);k.exports.original=h},{"./helpers/globals":3,"@marcom/ac-function/once":8}],8:[function(e,h,f){h.exports=function g(a){var b;
return function(){if(typeof b==="undefined"){b=a.apply(this,arguments)}return b
}}},{}],9:[function(n,m,o){var p=n("./helpers/TabManager");var i=n("./helpers/hideSiblingElements");
var j=n("./helpers/showSiblingElements");var k=function(a){this._tabbables=null;
this._firstTabbableElement=null;this._lastTabbableElement=null;this._relatedTarget=null;
this.el=a;this._handleOnFocus=this._handleOnFocus.bind(this)};var l=k.prototype;
l.start=function(){this.updateTabbables();i(this.el);if(this._firstTabbableElement){if(!this.el.contains(document.activeElement)){this._firstTabbableElement.focus()
}}else{console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element.")
}this._relatedTarget=document.activeElement;document.addEventListener("focus",this._handleOnFocus,true)
};l.stop=function(){j(this.el);document.removeEventListener("focus",this._handleOnFocus,true)
};l.updateTabbables=function(){this._tabbables=p.getTabbableElements(this.el);this._firstTabbableElement=this._tabbables[0];
this._lastTabbableElement=this._tabbables[this._tabbables.length-1]};l._handleOnFocus=function(a){if(!this.el.contains(a.target)){a.preventDefault();
this.updateTabbables();if(this._relatedTarget===this._lastTabbableElement||this._relatedTarget===null){this._firstTabbableElement.focus();
this._relatedTarget=this._firstTabbableElement;return}if(this._relatedTarget===this._firstTabbableElement){this._lastTabbableElement.focus();
this._relatedTarget=this._lastTabbableElement;return}}else{this._relatedTarget=a.target
}};l.destroy=function(){this.stop();this.el=null;this._tabbables=null;this._firstTabbableElement=null;
this._lastTabbableElement=null;this._relatedTarget=null;this._handleOnFocus=null
};m.exports=k},{"./helpers/TabManager":10,"./helpers/hideSiblingElements":12,"./helpers/showSiblingElements":16}],10:[function(l,k,g){var i=l("./../maps/focusableElement");
var h=function(){this.focusableSelectors=i.join(",")};var j=h.prototype;j.isFocusableElement=function(b,c,d){if(!c&&!this._isDisplayed(b,c)){return false
}var a=b.nodeName.toLowerCase();var e=i.indexOf(a)>-1;if(a==="a"){return true}if(e){return !b.disabled
}if(!b.contentEditable){return true}d=d||parseFloat(b.getAttribute("tabindex"));
return !isNaN(d)};j.isTabbableElement=function(a,b){if(!b&&!this._isDisplayed(a,b)){return false
}var c=a.getAttribute("tabindex");c=parseFloat(c);if(!isNaN(c)){return(c>=0)}else{return this.isFocusableElement(a,b,c)
}};j._isDisplayed=function(b){var a=b.getBoundingClientRect();return a.top>0&&a.left>0&&a.width>0&&a.height>0
};j.getTabbableElements=function(b,e){var f=b.querySelectorAll(this.focusableSelectors);
var c=f.length;var d=[];for(var a=0;a<c;a++){if(this.isTabbableElement(f[a],e)){d.push(f[a])
}}return d};j.getFocusableElements=function(c,e){var f=c.querySelectorAll(this.focusableSelectors);
var d=f.length;var a=[];for(var b=0;b<d;b++){if(this.isFocusableElement(f[b],e)){a.push(f[b])
}}return a};k.exports=new h()},{"./../maps/focusableElement":18}],11:[function(r,s,q){var t=r("./setAttributes");
var n=r("./../maps/ariaMap");var k=r("./TabManager");var p="data-original-";var m="tabindex";
var l=function(b,a){var c=b.getAttribute(p+a);if(!c){c=b.getAttribute(a)||"";t(b,p+a,c)
}};s.exports=function o(b){if(k.isFocusableElement(b)){l(b,m);t(b,m,-1)}else{var a=k.getTabbableElements(b,true);
var c=a.length;while(c--){l(a[c],m);t(a[c],m,-1)}}l(b,n.HIDDEN);t(b,n.HIDDEN,true)
}},{"./../maps/ariaMap":17,"./TabManager":10,"./setAttributes":14}],12:[function(j,h,f){var i=j("./hide");
h.exports=function g(a,b){b=b||document.body;var c=a;var d=a;while((c=c.previousElementSibling)){i(c)
}while((d=d.nextElementSibling)){i(d)}if(a.parentElement&&a.parentElement!==b){g(a.parentElement)
}}},{"./hide":11}],13:[function(f,i,g){var h=function(b,c){if(typeof c!=="string"){return
}var a=c.split(/\s+/);for(var d=0;d<a.length;d++){if(b.getAttribute(a[d])){b.removeAttribute(a[d])
}}};var j=function(b,c){if(b.length){for(var a=0;a<b.length;a++){h(b[a],c)}}else{h(b,c)
}};i.exports=j},{}],14:[function(i,h,j){var f=function(b,c,a){if(b&&b.nodeType===1){b.setAttribute(c,a)
}};var g=function(d,b,a){if(typeof a!=="string"){a=a.toString()}if(!d){return}if(d.length){for(var c=0;
c<d.length;c++){f(d[c],b,a)}}else{f(d,b,a)}};h.exports=g},{}],15:[function(r,s,q){var n=r("./removeAttributes");
var t=r("./setAttributes");var m=r("./../maps/ariaMap");var p="data-original-";
var k="tabindex";var o=function(b,a){var c=b.getAttribute(p+a);if(typeof c==="string"){if(c.length){t(b,a,c)
}else{n(b,a)}n(b,p+a)}};s.exports=function l(b){n(b,k+" "+m.HIDDEN);o(b,k);o(b,m.HIDDEN);
var a=b.querySelectorAll("["+p+k+"]");var c=a.length;while(c--){o(a[c],k)}}},{"./../maps/ariaMap":17,"./removeAttributes":13,"./setAttributes":14}],16:[function(i,h,j){var f=i("./show");
h.exports=function g(a,b){b=b||document.body;var c=a;var d=a;while((c=c.previousElementSibling)){f(c)
}while((d=d.nextElementSibling)){f(d)}if(a.parentElement&&a.parentElement!==b){g(a.parentElement)
}}},{"./show":15}],17:[function(d,f,e){f.exports={AUTOCOMPLETE:"aria-autocomplete",CHECKED:"aria-checked",DISABLED:"aria-disabled",EXPANDED:"aria-expanded",HASPOPUP:"aria-haspopup",HIDDEN:"aria-hidden",INVALID:"aria-invalid",LABEL:"aria-label",LEVEL:"aria-level",MULTILINE:"aria-multiline",MULTISELECTABLE:"aria-multiselectable",ORIENTATION:"aria-orientation",PRESSED:"aria-pressed",READONLY:"aria-readonly",REQUIRED:"aria-required",SELECTED:"aria-selected",SORT:"aria-sort",VALUEMAX:"aria-valuemax",VALUEMIN:"aria-valuemin",VALUENOW:"aria-valuenow",VALUETEXT:"aria-valuetext",ATOMIC:"aria-atomic",BUSY:"aria-busy",LIVE:"aria-live",RELEVANT:"aria-relevant",DROPEFFECT:"aria-dropeffect",GRABBED:"aria-grabbed",ACTIVEDESCENDANT:"aria-activedescendant",CONTROLS:"aria-controls",DESCRIBEDBY:"aria-describedby",FLOWTO:"aria-flowto",LABELLEDBY:"aria-labelledby",OWNS:"aria-owns",POSINSET:"aria-posinset",SETSIZE:"aria-setsize"}
},{}],18:[function(d,f,e){f.exports=["input","select","textarea","button","optgroup","option","menuitem","fieldset","object","a[href]","*[tabindex]","*[contenteditable]"]
},{}],19:[function(f,j,g){f("@marcom/ac-polyfills/Array/prototype.slice");f("@marcom/ac-polyfills/Element/prototype.classList");
var i=f("./className/add");j.exports=function h(){var a=Array.prototype.slice.call(arguments);
var b=a.shift(a);var c;if(b.classList&&b.classList.add){b.classList.add.apply(b.classList,a);
return}for(c=0;c<a.length;c++){i(b,a[c])}}},{"./className/add":20,"@marcom/ac-polyfills/Array/prototype.slice":69,"@marcom/ac-polyfills/Element/prototype.classList":71}],20:[function(f,j,g){var i=f("./contains");
j.exports=function h(a,b){if(!i(a,b)){a.className+=" "+b}}},{"./contains":21}],21:[function(f,j,g){var h=f("./getTokenRegExp");
j.exports=function i(a,b){return h(b).test(a.className)}},{"./getTokenRegExp":22}],22:[function(e,h,f){h.exports=function g(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")
}},{}],23:[function(l,k,g){var j=l("./contains");var i=l("./getTokenRegExp");k.exports=function h(a,b){if(j(a,b)){a.className=a.className.replace(i(b),"$1").trim()
}}},{"./contains":21,"./getTokenRegExp":22}],24:[function(i,h,j){i("@marcom/ac-polyfills/Array/prototype.slice");
i("@marcom/ac-polyfills/Element/prototype.classList");var f=i("./className/remove");
h.exports=function g(){var a=Array.prototype.slice.call(arguments);var b=a.shift(a);
var c;if(b.classList&&b.classList.remove){b.classList.remove.apply(b.classList,a);
return}for(c=0;c<a.length;c++){f(b,a[c])}}},{"./className/remove":23,"@marcom/ac-polyfills/Array/prototype.slice":69,"@marcom/ac-polyfills/Element/prototype.classList":71}],25:[function(e,h,f){h.exports=function g(a,c,b,d){if(a.addEventListener){a.addEventListener(c,b,!!d)
}else{a.attachEvent("on"+c,b)}return a}},{}],26:[function(e,h,f){h.exports=function g(a,c,b,d){if(a.removeEventListener){a.removeEventListener(c,b,!!d)
}else{a.detachEvent("on"+c,b)}return a}},{}],27:[function(f,i,g){var h=function(){};
i.exports=function j(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{h.prototype=a;
return new h()}}},{}],28:[function(u,v,s){var m=u("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var p=u("@marcom/ac-dom-events/utils/addEventListener");var w=u("@marcom/ac-dom-events/utils/removeEventListener");
var q=u("@marcom/ac-object/create");var t=u("./internal/KeyEvent");var o="keydown";
var n="keyup";function x(a){this._keysDown={};this._DOMKeyDown=this._DOMKeyDown.bind(this);
this._DOMKeyUp=this._DOMKeyUp.bind(this);this._context=a||document;p(this._context,o,this._DOMKeyDown,true);
p(this._context,n,this._DOMKeyUp,true);m.call(this)}var r=x.prototype=q(m.prototype);
r.onDown=function(a,b){return this.on(o+":"+a,b)};r.onceDown=function(a,b){return this.once(o+":"+a,b)
};r.offDown=function(a,b){return this.off(o+":"+a,b)};r.onUp=function(a,b){return this.on(n+":"+a,b)
};r.onceUp=function(a,b){return this.once(n+":"+a,b)};r.offUp=function(a,b){return this.off(n+":"+a,b)
};r.isDown=function(a){a+="";return this._keysDown[a]||false};r.isUp=function(a){return !this.isDown(a)
};r.destroy=function(){w(this._context,o,this._DOMKeyDown,true);w(this._context,n,this._DOMKeyUp,true);
this._keysDown=null;this._context=null;m.prototype.destroy.call(this);return this
};r._DOMKeyDown=function(c){var a=this._normalizeKeyboardEvent(c);var b=a.keyCode+="";
this._trackKeyDown(b);this.trigger(o+":"+b,a)};r._DOMKeyUp=function(c){var a=this._normalizeKeyboardEvent(c);
var b=a.keyCode+="";this._trackKeyUp(b);this.trigger(n+":"+b,a)};r._normalizeKeyboardEvent=function(a){return new t(a)
};r._trackKeyUp=function(a){if(this._keysDown[a]){this._keysDown[a]=false}};r._trackKeyDown=function(a){if(!this._keysDown[a]){this._keysDown[a]=true
}};v.exports=x},{"./internal/KeyEvent":30,"@marcom/ac-dom-events/utils/addEventListener":25,"@marcom/ac-dom-events/utils/removeEventListener":26,"@marcom/ac-event-emitter-micro":1,"@marcom/ac-object/create":27}],29:[function(h,g,e){var f=h("./Keyboard");
g.exports=new f()},{"./Keyboard":28}],30:[function(j,i,f){var g=["keyLocation"];
function h(b){this.originalEvent=b;var a;for(a in b){if(g.indexOf(a)===-1&&typeof b[a]!=="function"){this[a]=b[a]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}h.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};i.exports=h},{}],31:[function(d,f,e){f.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,APOSTROPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],32:[function(l,k,g){var i=l("./utils/addEventListener");var h=l("./shared/getEventType");
k.exports=function j(a,c,b,d){c=h(a,c);return i(a,c,b,d)}},{"./shared/getEventType":39,"./utils/addEventListener":41}],33:[function(o,q,n){var m=o("./utils/eventTypeAvailable");
var j=o("./shared/camelCasedEventTypes");var p=o("./shared/windowFallbackEventTypes");
var l=o("./shared/prefixHelper");var r={};q.exports=function k(b,c){var a;var e;
var d;c=c||"div";b=b.toLowerCase();if(!(c in r)){r[c]={}}e=r[c];if(b in e){return e[b]
}if(m(b,c)){return e[b]=b}if(b in j){for(d=0;d<j[b].length;d++){a=j[b][d];if(m(a.toLowerCase(),c)){return e[b]=a
}}}for(d=0;d<l.evt.length;d++){a=l.evt[d]+b;if(m(a,c)){l.reduce(d);return e[b]=a
}}if(c!=="window"&&p.indexOf(b)){return e[b]=k(b,"window")}return e[b]=false}},{"./shared/camelCasedEventTypes":34,"./shared/prefixHelper":35,"./shared/windowFallbackEventTypes":36,"./utils/eventTypeAvailable":37}],34:[function(d,f,e){f.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],35:[function(i,o,j){var k=["-webkit-","-moz-","-ms-"];var n=["Webkit","Moz","ms"];
var l=["webkit","moz","ms"];var p=function(){this.initialize()};var m=p.prototype;
m.initialize=function(){this.reduced=false;this.css=k;this.dom=n;this.evt=l};m.reduce=function(a){if(!this.reduced){this.reduced=true;
this.css=[this.css[a]];this.dom=[this.dom[a]];this.evt=[this.evt[a]]}};o.exports=new p()
},{}],36:[function(d,f,e){f.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],37:[function(j,h,f){var g={window:window,document:document};h.exports=function i(a,c){var b;
a="on"+a;if(!(c in g)){g[c]=document.createElement(c)}b=g[c];if(a in b){return true
}if("setAttribute" in b){b.setAttribute(a,"return;");return(typeof b[a]==="function")
}return false}},{}],38:[function(k,j,l){var g=k("./utils/removeEventListener");
var h=k("./shared/getEventType");j.exports=function i(a,c,b,d){c=h(a,c);return g(a,c,b,d)
}},{"./shared/getEventType":39,"./utils/removeEventListener":42}],39:[function(j,h,f){var i=j("@marcom/ac-prefixer/getEventType");
h.exports=function g(a,b){var c;var d;if("tagName" in a){c=a.tagName}else{if(a===window){c="window"
}else{c="document"}}d=i(b,c);if(d){return d}return b}},{"@marcom/ac-prefixer/getEventType":33}],40:[function(e,h,f){h.exports=function g(a){a=a||window.event;
return(typeof a.target!=="undefined")?a.target:a.srcElement}},{}],41:[function(d,f,e){arguments[4][25][0].apply(e,arguments)
},{dup:25}],42:[function(d,f,e){arguments[4][26][0].apply(e,arguments)},{dup:26}],43:[function(h,g,e){g.exports=function f(b){var a;
b=b||window;if(b===window){a=window.pageXOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollLeft}},{}],44:[function(h,g,e){g.exports=function f(b){var a;
b=b||window;if(b===window){a=window.pageYOffset;if(!a){b=document.documentElement||document.body.parentNode||document.body
}else{return a}}return b.scrollTop}},{}],45:[function(d,f,e){f.exports=8},{}],46:[function(d,f,e){f.exports=11
},{}],47:[function(d,f,e){f.exports=1},{}],48:[function(d,f,e){f.exports=3},{}],49:[function(f,j,g){var i=f("../isNode");
j.exports=function h(a,b){if(!i(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)}},{"../isNode":52}],50:[function(y,A,v){var C=y("./isNodeType");
var B=y("../COMMENT_NODE");var u=y("../DOCUMENT_FRAGMENT_NODE");var w=y("../ELEMENT_NODE");
var x=y("../TEXT_NODE");var s=[w,x,B,u];var z=" must be an Element, TextNode, Comment, or Document Fragment";
var p=[w,x,B];var t=" must be an Element, TextNode, or Comment";var r=[w,u];var q=" must be an Element, or Document Fragment";
var D=" must have a parentNode";A.exports={parentNode:function(d,a,b,c){c=c||"target";
if((d||a)&&!C(d,r)){throw new TypeError(b+": "+c+q)}},childNode:function(d,a,b,c){c=c||"target";
if(!d&&!a){return}if(!C(d,p)){throw new TypeError(b+": "+c+t)}},insertNode:function(d,a,b,c){c=c||"node";
if(!d&&!a){return}if(!C(d,s)){throw new TypeError(b+": "+c+z)}},hasParentNode:function(c,a,b){b=b||"target";
if(!c.parentNode){throw new TypeError(a+": "+b+D)}}}},{"../COMMENT_NODE":45,"../DOCUMENT_FRAGMENT_NODE":46,"../ELEMENT_NODE":47,"../TEXT_NODE":48,"./isNodeType":49}],51:[function(l,k,g){var i=l("./internal/isNodeType");
var h=l("./ELEMENT_NODE");k.exports=function j(a){return i(a,h)}},{"./ELEMENT_NODE":47,"./internal/isNodeType":49}],52:[function(e,h,f){h.exports=function g(a){return !!(a&&a.nodeType)
}},{}],53:[function(j,i,f){var h=j("./internal/validate");i.exports=function g(a){h.childNode(a,true,"remove");
if(!a.parentNode){return a}return a.parentNode.removeChild(a)}},{"./internal/validate":50}],54:[function(d,f,e){arguments[4][27][0].apply(e,arguments)
},{dup:27}],55:[function(f,j,g){var h=f("./extend");j.exports=function i(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return h({},a,b)}},{"./extend":56}],56:[function(j,i,f){j("@marcom/ac-polyfills/Array/prototype.forEach");
var g=Object.prototype.hasOwnProperty;i.exports=function h(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]
}else{a=[].slice.call(arguments)}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(g.call(c,d)){b[d]=c[d]
}}}});return b}},{"@marcom/ac-polyfills/Array/prototype.forEach":67}],57:[function(d,f,e){f.exports={Modal:d("./ac-modal-basic/Modal"),Renderer:d("./ac-modal-basic/Renderer"),classNames:d("./ac-modal-basic/classNames"),dataAttributes:d("./ac-modal-basic/dataAttributes")}
},{"./ac-modal-basic/Modal":58,"./ac-modal-basic/Renderer":59,"./ac-modal-basic/classNames":60,"./ac-modal-basic/dataAttributes":61}],58:[function(y,z,v){var q={addEventListener:y("@marcom/ac-dom-events/addEventListener"),removeEventListener:y("@marcom/ac-dom-events/removeEventListener"),target:y("@marcom/ac-dom-events/target")};
var t={getScrollX:y("@marcom/ac-dom-metrics/getScrollX"),getScrollY:y("@marcom/ac-dom-metrics/getScrollY")};
var x={create:y("@marcom/ac-object/create"),defaults:y("@marcom/ac-object/defaults")};
var s=y("@marcom/ac-keyboard");var n=y("@marcom/ac-keyboard/keyMap");var p=y("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var w=y("./Renderer");var o={retainScrollPosition:false};function r(b,a){p.call(this);
this.options=x.defaults(o,b);this.renderer=new w(a);this.opened=false;this._keysToClose=[n.ESCAPE];
this._attachedKeysToClose=[];this.close=this.close.bind(this)}var u=r.prototype=x.create(p.prototype);
u.open=function(){if(this.options.retainScrollPosition){this._saveScrollPosition()
}if(!this.opened){this._attachEvents();this.trigger("willopen");this.renderer.open();
this.opened=true;this.trigger("open")}};u.close=function(c){var a;var b;if(this.opened){if(c&&c.type==="click"){a=q.target(c);
b=this.renderer.options.dataAttributes.close;if(!a.hasAttribute(b)){return}}this.trigger("willclose");
this._removeEvents();this.renderer.close();if(this.options.retainScrollPosition){this._restoreScrollPosition()
}this.opened=false;this.trigger("close")}};u.render=function(){this.renderer.render()
};u.appendContent=function(b,a){this.renderer.appendContent(b,a)};u.removeContent=function(a){this.renderer.removeContent(a)
};u.destroy=function(){this._removeEvents();this.renderer.destroy();for(var a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};u.addKeyToClose=function(a){var b=this._keysToClose.indexOf(a);if(b===-1){this._keysToClose.push(a);
this._bindKeyToClose(a)}};u.removeKeyToClose=function(a){var b=this._keysToClose.indexOf(a);
if(b!==-1){this._keysToClose.splice(b,1)}this._releaseKeyToClose(a)};u._bindKeyToClose=function(a){var b=this._attachedKeysToClose.indexOf(a);
if(b===-1){s.onUp(a,this.close);this._attachedKeysToClose.push(a)}};u._releaseKeyToClose=function(a){var b=this._attachedKeysToClose.indexOf(a);
if(b!==-1){s.offUp(a,this.close);this._attachedKeysToClose.splice(b,1)}};u._removeEvents=function(){if(this.renderer.modalElement){q.removeEventListener(this.renderer.modalElement,"click",this.close)
}this._keysToClose.forEach(this._releaseKeyToClose,this)};u._attachEvents=function(){if(this.renderer.modalElement){q.addEventListener(this.renderer.modalElement,"click",this.close)
}this._keysToClose.forEach(this._bindKeyToClose,this)};u._restoreScrollPosition=function(){window.scrollTo(this._scrollX||0,this._scrollY||0)
};u._saveScrollPosition=function(){this._scrollX=t.getScrollX();this._scrollY=t.getScrollY()
};z.exports=r},{"./Renderer":59,"@marcom/ac-dom-events/addEventListener":32,"@marcom/ac-dom-events/removeEventListener":38,"@marcom/ac-dom-events/target":40,"@marcom/ac-dom-metrics/getScrollX":43,"@marcom/ac-dom-metrics/getScrollY":44,"@marcom/ac-event-emitter-micro":1,"@marcom/ac-keyboard":29,"@marcom/ac-keyboard/keyMap":31,"@marcom/ac-object/create":54,"@marcom/ac-object/defaults":55}],59:[function(t,u,p){var v={add:t("@marcom/ac-classlist/add"),remove:t("@marcom/ac-classlist/remove")};
var r={defaults:t("@marcom/ac-object/defaults")};var m={remove:t("@marcom/ac-dom-nodes/remove"),isElement:t("@marcom/ac-dom-nodes/isElement")};
var n=t("./classNames");var l=t("./dataAttributes");var s={modalElement:null,contentElement:null,closeButton:null,classNames:n,dataAttributes:l};
var q=function(a){a=a||{};this.options=r.defaults(s,a);this.options.classNames=r.defaults(s.classNames,a.classNames);
this.options.dataAttributes=r.defaults(s.dataAttributes,a.dataAttributes);this.modalElement=this.options.modalElement;
this.contentElement=this.options.contentElement;this.closeButton=this.options.closeButton
};var o=q.prototype;o.render=function(){if(!m.isElement(this.modalElement)){this.modalElement=this.renderModalElement(this.options.classNames.modalElement)
}if(!m.isElement(this.contentElement)){this.contentElement=this.renderContentElement(this.options.classNames.contentElement)
}if(this.closeButton!==false){if(!m.isElement(this.closeButton)){this.closeButton=this.renderCloseButton(this.options.classNames.closeButton)
}this.modalElement.appendChild(this.closeButton)}this.modalElement.appendChild(this.contentElement);
document.body.appendChild(this.modalElement);return this.modalElement};o.renderCloseButton=function(a){var b;
a=a||this.options.classNames.closeButton;b=this._renderElement("button",a);b.setAttribute(this.options.dataAttributes.close,"");
return b};o.renderModalElement=function(a){a=a||this.options.classNames.modalElement;
return this._renderElement("div",a)};o.renderContentElement=function(a){a=a||this.options.classNames.contentElement;
return this._renderElement("div",a)};o.appendContent=function(b,a){if(!m.isElement(b)){return
}if(arguments[1]===undefined){this.contentElement.appendChild(b)}else{if(m.isElement(a)){a.appendChild(b)
}}};o.removeContent=function(a){if(a){if(this.modalElement.contains(a)){m.remove(a)
}}else{this._emptyContent()}};o.open=function(){var a=[document.documentElement].concat(this.options.classNames.documentElement);
var b=[this.modalElement].concat(this.options.classNames.modalOpen);v.add.apply(null,a);
v.add.apply(null,b)};o.close=function(){var a=[document.documentElement].concat(this.options.classNames.documentElement);
var b=[this.modalElement].concat(this.options.classNames.modalOpen);v.remove.apply(null,a);
v.remove.apply(null,b)};o.destroy=function(){var b=[document.documentElement].concat(this.options.classNames.documentElement);
if(this.modalElement&&document.body.contains(this.modalElement)){this.close();document.body.removeChild(this.modalElement)
}v.remove.apply(null,b);for(var a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};o._renderElement=function(d,c){var a=document.createElement(d);var b=[a];if(c){b=b.concat(c)
}v.add.apply(null,b);return a};o._emptyContent=function(){this.contentElement.innerHTML=""
};u.exports=q},{"./classNames":60,"./dataAttributes":61,"@marcom/ac-classlist/add":19,"@marcom/ac-classlist/remove":24,"@marcom/ac-dom-nodes/isElement":51,"@marcom/ac-dom-nodes/remove":53,"@marcom/ac-object/defaults":55}],60:[function(d,f,e){f.exports={modalElement:"modal",modalOpen:"modal-open",documentElement:"has-modal",contentElement:"modal-content",closeButton:"modal-close"}
},{}],61:[function(d,f,e){f.exports={close:"data-modal-close"}},{}],62:[function(d,f,e){f.exports={Modal:d("./ac-modal/Modal"),createStandardModal:d("./ac-modal/factory/createStandardModal"),createFullViewportModal:d("./ac-modal/factory/createFullViewportModal")}
},{"./ac-modal/Modal":63,"./ac-modal/factory/createFullViewportModal":64,"./ac-modal/factory/createStandardModal":65}],63:[function(p,o,i){var l=p("@marcom/ac-modal-basic").Modal;
var m=p("@marcom/ac-event-emitter-micro").EventEmitterMicro;var k=p("@marcom/ac-accessibility/CircularTab");
function j(a){m.call(this);this.options=a||{};this._modal=new l(a,this.options.renderer);
this.opened=false;this._render();this.closeButton=this._modal.renderer.closeButton;
this.modalElement=this._modal.renderer.modalElement;this.contentElement=this._modal.renderer.contentElement;
this.modalElement.setAttribute("role","dialog");this.closeButton.setAttribute("aria-label","Close");
this._circularTab=new k(this.modalElement);this._onWillOpen=this._onWillOpen.bind(this);
this._onOpen=this._onOpen.bind(this);this._onWillClose=this._onWillClose.bind(this);
this._onClose=this._onClose.bind(this);this._bindEvents()}var n=j.prototype=Object.create(m.prototype);
n.open=function(){this._modal.open();this.opened=this._modal.opened};n.close=function(){this._modal.close()
};n.appendContent=function(a){this._modal.appendContent(a)};n.removeContent=function(a){this._modal.removeContent(a)
};n.destroy=function(){this._releaseEvents();this._modal.destroy();this._removeModalFocus();
this._circularTab.destroy();this._focusObj=null;for(var a in this){if(this.hasOwnProperty(a)){this[a]=null
}}};n.addKeyToClose=function(a){this._modal.addKeyToClose(a)};n.removeKeyToClose=function(a){this._modal.removeKeyToClose(a)
};n._render=function(){this._modal.render();this._modal.renderer.modalElement.setAttribute("aria-hidden","true")
};n._bindEvents=function(){this._modal.on("willopen",this._onWillOpen);this._modal.on("open",this._onOpen);
this._modal.on("willclose",this._onWillClose);this._modal.on("close",this._onClose)
};n._releaseEvents=function(){this._modal.off("willopen",this._onWillOpen);this._modal.off("open",this._onOpen);
this._modal.off("willclose",this._onWillClose);this._modal.off("close",this._onClose)
};n._onWillOpen=function(){this.trigger("willopen")};n._onOpen=function(){this.opened=this._modal.opened;
this._giveModalFocus();this.trigger("open")};n._onWillClose=function(){this.trigger("willclose");
this._removeModalFocus()};n._onClose=function(){this.opened=this._modal.opened;
this.trigger("close")};n._giveModalFocus=function(){this.modalElement.setAttribute("aria-hidden","false");
this._activeElement=document.activeElement;this.closeButton.focus();this._circularTab.start()
};n._removeModalFocus=function(){this._circularTab.stop();this.modalElement.setAttribute("aria-hidden","true");
if(this._activeElement){this._activeElement.focus();this._activeElement=null}};
o.exports=j},{"@marcom/ac-accessibility/CircularTab":9,"@marcom/ac-event-emitter-micro":1,"@marcom/ac-modal-basic":57}],64:[function(k,j,m){var n=k("../Modal");
var h=k("@marcom/ac-modal-basic").classNames;var l={retainScrollPosition:true,renderer:{classNames:{documentElement:[h.documentElement].concat("has-modal-full-viewport"),modalElement:[h.modalElement].concat("modal-full-viewport")}}};
function i(a){var b=new n(l);if(a){b.appendContent(a)}return b}j.exports=i},{"../Modal":63,"@marcom/ac-modal-basic":57}],65:[function(p,q,o){var l=p("../Modal");
var n=p("@marcom/ac-modal-basic").classNames;var k=p("@marcom/ac-modal-basic").dataAttributes;
var r={add:p("@marcom/ac-classlist/add")};var j={renderer:{classNames:{documentElement:[n.documentElement].concat("has-modal-standard"),modalElement:[n.modalElement].concat("modal-standard")}}};
function m(e){var f=new l(j);if(e){f.appendContent(e)}var c=document.createElement("div");
var a=document.createElement("div");var b=document.createElement("div");var d=document.createElement("div");
r.add(c,"content-table");r.add(a,"content-cell");r.add(b,"content-wrapper");r.add(d,"content-padding","large-8","medium-10");
f.modalElement.setAttribute(k.close,"");b.setAttribute(k.close,"");a.setAttribute(k.close,"");
c.appendChild(a);a.appendChild(b);b.appendChild(d);f.modalElement.appendChild(c);
d.appendChild(f.contentElement);d.appendChild(f.closeButton);return f}q.exports=m
},{"../Modal":63,"@marcom/ac-classlist/add":19,"@marcom/ac-modal-basic":57}],66:[function(d,f,e){if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"
}}},{}],67:[function(e,h,f){if(!Array.prototype.forEach){Array.prototype.forEach=function g(a,b){var c=Object(this);
var l;var i;if(typeof a!=="function"){throw new TypeError("No function object passed to forEach.")
}var d=this.length;for(l=0;l<d;l+=1){i=c[l];a.call(b,i,l,c)}}}},{}],68:[function(e,h,f){if(!Array.prototype.indexOf){Array.prototype.indexOf=function g(c,b){var a=b||0;
var d=0;if(a<0){a=this.length+b-1;if(a<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(d=0;d<this.length;d++){if(this[d]===c){return d}}return(-1)}}},{}],69:[function(d,f,e){(function(){var b=Array.prototype.slice;
try{b.call(document.documentElement)}catch(a){Array.prototype.slice=function(c,q){q=(typeof q!=="undefined")?q:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return b.call(this,c,q)
}var o,r=[],p,s=this.length;var t=c||0;t=(t>=0)?t:s+t;var i=(q)?q:s;if(q<0){i=s+q
}p=i-t;if(p>0){r=new Array(p);if(this.charAt){for(o=0;o<p;o++){r[o]=this.charAt(t+o)
}}else{for(o=0;o<p;o++){r[o]=this[t+o]}}}return r}}}())},{}],70:[function(e,h,f){if(document.createEvent){try{new window.CustomEvent("click")
}catch(g){window.CustomEvent=(function(){function a(c,b){b=b||{bubbles:false,cancelable:false,detail:undefined};
var d=document.createEvent("CustomEvent");d.initCustomEvent(c,b.bubbles,b.cancelable,b.detail);
return d}a.prototype=window.Event.prototype;return a}())}}},{}],71:[function(d,f,e){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if("document" in self){if(!("classList" in document.createElement("_"))){(function(s){if(!("Element" in s)){return
}var B="classList",w="prototype",b=s.Element[w],A=Object,r=String[w].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},z=Array[w].indexOf||function(g){var h=0,i=this.length;for(;h<i;h++){if(h in this&&this[h]===g){return h
}}return -1},a=function(h,g){this.name=h;this.code=DOMException[h];this.message=g
},v=function(g,h){if(h===""){throw new a("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(h)){throw new a("INVALID_CHARACTER_ERR","String contains an invalid character")
}return z.call(g,h)},y=function(g){var h=r.call(g.getAttribute("class")||""),i=h?h.split(/\s+/):[],j=0,k=i.length;
for(;j<k;j++){this.push(i[j])}this._updateClassName=function(){g.setAttribute("class",this.toString())
}},x=y[w]=[],t=function(){return new y(this)};a[w]=Error[w];x.item=function(g){return this[g]||null
};x.contains=function(g){g+="";return v(this,g)!==-1};x.add=function(){var g=arguments,h=0,j=g.length,i,k=false;
do{i=g[h]+"";if(v(this,i)===-1){this.push(i);k=true}}while(++h<j);if(k){this._updateClassName()
}};x.remove=function(){var g=arguments,h=0,k=g.length,i,l=false,j;do{i=g[h]+"";
j=v(this,i);while(j!==-1){this.splice(j,1);l=true;j=v(this,i)}}while(++h<k);if(l){this._updateClassName()
}};x.toggle=function(i,h){i+="";var j=this.contains(i),g=j?h!==true&&"remove":h!==false&&"add";
if(g){this[g](i)}if(h===true||h===false){return h}else{return !j}};x.toString=function(){return this.join(" ")
};if(A.defineProperty){var c={get:t,enumerable:true,configurable:true};try{A.defineProperty(b,B,c)
}catch(u){if(u.number===-2146823252){c.enumerable=false;A.defineProperty(b,B,c)
}}}else{if(A[w].__defineGetter__){b.__defineGetter__(B,t)}}}(self))}else{(function(){var b=document.createElement("_");
b.classList.add("c1","c2");if(!b.classList.contains("c2")){var a=function(i){var j=DOMTokenList.prototype[i];
DOMTokenList.prototype[i]=function(g){var h,m=arguments.length;for(h=0;h<m;h++){g=arguments[h];
j.call(this,g)}}};a("add");a("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(j,i){if(1 in arguments&&!this.contains(j)===!i){return i
}else{return c.call(this,j)}}}b=null}())}}},{}],72:[function(d,f,e){if(typeof Object.assign!="function"){Object.assign=function(a){if(a==null){throw new TypeError("Cannot convert undefined or null to object")
}a=Object(a);for(var h=1;h<arguments.length;h++){var b=arguments[h];if(b!=null){for(var c in b){if(Object.prototype.hasOwnProperty.call(b,c)){a[c]=b[c]
}}}}return a}}},{}],73:[function(d,f,e){arguments[4][45][0].apply(e,arguments)},{dup:45}],74:[function(d,f,e){arguments[4][46][0].apply(e,arguments)
},{dup:46}],75:[function(d,f,e){f.exports=9},{}],76:[function(d,f,e){arguments[4][47][0].apply(e,arguments)
},{dup:47}],77:[function(d,f,e){arguments[4][48][0].apply(e,arguments)},{dup:48}],78:[function(d,f,e){arguments[4][49][0].apply(e,arguments)
},{"../isNode":82,dup:49}],79:[function(d,f,e){arguments[4][50][0].apply(e,arguments)
},{"../COMMENT_NODE":73,"../DOCUMENT_FRAGMENT_NODE":74,"../ELEMENT_NODE":76,"../TEXT_NODE":77,"./isNodeType":78,dup:50}],80:[function(l,k,g){var i=l("./internal/isNodeType");
var h=l("./DOCUMENT_FRAGMENT_NODE");k.exports=function j(a){return i(a,h)}},{"./DOCUMENT_FRAGMENT_NODE":74,"./internal/isNodeType":78}],81:[function(d,f,e){arguments[4][51][0].apply(e,arguments)
},{"./ELEMENT_NODE":76,"./internal/isNodeType":78,dup:51}],82:[function(d,f,e){arguments[4][52][0].apply(e,arguments)
},{dup:52}],83:[function(d,f,e){arguments[4][53][0].apply(e,arguments)},{"./internal/validate":79,dup:53}],84:[function(d,f,e){f.exports=window.Element?(function(a){return a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector
}(Element.prototype)):null},{}],85:[function(y,B,w){y("@marcom/ac-polyfills/Array/prototype.indexOf");
var q=y("@marcom/ac-dom-nodes/isNode");var C=y("@marcom/ac-dom-nodes/COMMENT_NODE");
var u=y("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var v=y("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var x=y("@marcom/ac-dom-nodes/ELEMENT_NODE");var z=y("@marcom/ac-dom-nodes/TEXT_NODE");
var D=function(a,b){if(!q(a)){return false}if(typeof b==="number"){return(a.nodeType===b)
}return(b.indexOf(a.nodeType)!==-1)};var s=[x,v,u];var r=" must be an Element, Document, or Document Fragment";
var p=[x,z,C];var t=" must be an Element, TextNode, or Comment";var A=" must be a string";
B.exports={parentNode:function(d,a,b,c){c=c||"node";if((d||a)&&!D(d,s)){throw new TypeError(b+": "+c+r)
}},childNode:function(d,a,b,c){c=c||"node";if(!d&&!a){return}if(!D(d,p)){throw new TypeError(b+": "+c+t)
}},selector:function(d,a,b,c){c=c||"selector";if((d||a)&&typeof d!=="string"){throw new TypeError(b+": "+c+A)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":73,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":74,"@marcom/ac-dom-nodes/DOCUMENT_NODE":75,"@marcom/ac-dom-nodes/ELEMENT_NODE":76,"@marcom/ac-dom-nodes/TEXT_NODE":77,"@marcom/ac-dom-nodes/isNode":82,"@marcom/ac-polyfills/Array/prototype.indexOf":68}],86:[function(o,n,p){var m=o("@marcom/ac-dom-nodes/isElement");
var k=o("./internal/validate");var j=o("./internal/nativeMatches");var l=o("./shims/matchesSelector");
n.exports=function i(a,b){k.selector(b,true,"matchesSelector");if(!m(a)){return false
}if(!j){return l(a,b)}return j.call(a,b)}},{"./internal/nativeMatches":84,"./internal/validate":85,"./shims/matchesSelector":88,"@marcom/ac-dom-nodes/isElement":81}],87:[function(h,n,i){h("@marcom/ac-polyfills/Array/prototype.slice");
var j=h("./internal/validate");var k=h("./shims/querySelectorAll");var l=("querySelectorAll" in document);
n.exports=function m(b,a){a=a||document;j.parentNode(a,true,"querySelectorAll","context");
j.selector(b,true,"querySelectorAll");if(!l){return k(b,a)}return Array.prototype.slice.call(a.querySelectorAll(b))
}},{"./internal/validate":85,"./shims/querySelectorAll":89,"@marcom/ac-polyfills/Array/prototype.slice":69}],88:[function(j,i,f){var h=j("../querySelectorAll");
i.exports=function g(a,e){var b=a.parentNode||document;var d=h(e,b);var c;for(c=0;
c<d.length;c++){if(d[c]===a){return true}}return false}},{"../querySelectorAll":87}],89:[function(r,s,p){r("@marcom/ac-polyfills/Array/prototype.indexOf");
var l=r("@marcom/ac-dom-nodes/isElement");var n=r("@marcom/ac-dom-nodes/isDocumentFragment");
var k=r("@marcom/ac-dom-nodes/remove");var q="_ac_qsa_";var m=function(a,c){var b;
if(c===document){return true}b=a;while((b=b.parentNode)&&l(b)){if(b===c){return true
}}return false};var o=function(a){if("recalc" in a){a.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};s.exports=function t(c,a){var e=document.createElement("style");
var d=q+(Math.random()+"").slice(-6);var b=[];var f;a=a||document;document[d]=[];
if(n(a)){a.appendChild(e)}else{document.documentElement.firstChild.appendChild(e)
}e.styleSheet.cssText="*{display:recalc;}"+c+'{ac-qsa:expression(document["'+d+'"] && document["'+d+'"].push(this));}';
o(a);while(document[d].length){f=document[d].shift();f.style.removeAttribute("ac-qsa");
if(b.indexOf(f)===-1&&m(f,a)){b.push(f)}}document[d]=null;k(e);o(a);return b}},{"@marcom/ac-dom-nodes/isDocumentFragment":80,"@marcom/ac-dom-nodes/isElement":81,"@marcom/ac-dom-nodes/remove":83,"@marcom/ac-polyfills/Array/prototype.indexOf":68}],90:[function(d,f,e){f.exports.EventEmitter=d("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":91}],91:[function(q,r,p){var n="EventEmitter:propagation";
var k=function(a){if(a){this.context=a}};var o=k.prototype;var m=function(){if(!this.hasOwnProperty("_events")&&typeof this._events!=="object"){this._events={}
}return this._events};var t=function(b,f){var e=b[0];var d=b[1];var a=b[2];if((typeof e!=="string"&&typeof e!=="object")||e===null||Array.isArray(e)){throw new TypeError("Expecting event name to be a string or object.")
}if((typeof e==="string")&&!d){throw new Error("Expecting a callback function to be provided.")
}if(d&&(typeof d!=="function")){if(typeof e==="object"&&typeof d==="object"){a=d
}else{throw new TypeError("Expecting callback to be a function.")}}if(typeof e==="object"){for(var c in e){f.call(this,c,e[c],a)
}}if(typeof e==="string"){e=e.split(" ");e.forEach(function(g){f.call(this,g,d,a)
},this)}};var l=function(e,d){var c;var b;var a;c=m.call(this)[e];if(!c||c.length===0){return
}c=c.slice();this._stoppedImmediatePropagation=false;for(b=0,a=c.length;b<a;b++){if(this._stoppedImmediatePropagation||d(c[b],b)){break
}}};var s=function(b,a,d){var c=-1;l.call(this,a,function(e,f){if(e.callback===d){c=f;
return true}});if(c===-1){return}b[a].splice(c,1)};o.on=function(){var a=m.call(this);
t.call(this,arguments,function(b,d,c){a[b]=a[b]||(a[b]=[]);a[b].push({callback:d,context:c})
});return this};o.once=function(){t.call(this,arguments,function(b,d,c){var a=function(e){d.call(c||this,e);
this.off(b,a)};this.on(b,a,this)});return this};o.off=function(a,d){var b=m.call(this);
if(arguments.length===0){this._events={}}else{if(!a||(typeof a!=="string"&&typeof a!=="object")||Array.isArray(a)){throw new TypeError("Expecting event name to be a string or object.")
}}if(typeof a==="object"){for(var e in a){s.call(this,b,e,a[e])}}if(typeof a==="string"){var c=a.split(" ");
if(c.length===1){if(d){s.call(this,b,a,d)}else{b[a]=[]}}else{c.forEach(function(f){b[f]=[]
})}}return this};o.trigger=function(b,a,c){if(!b){throw new Error("trigger method requires an event name")
}if(typeof b!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(c&&typeof c!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}b=b.split(" ");b.forEach(function(d){l.call(this,d,function(e){e.callback.call(e.context||this.context||this,a)
}.bind(this));if(!c){l.call(this,n,function(e){var f=d;if(e.prefix){f=e.prefix+f
}e.emitter.trigger(f,a)})}},this);return this};o.propagateTo=function(b,a){var c=m.call(this);
if(!c[n]){this._events[n]=[]}c[n].push({emitter:b,prefix:a})};o.stopPropagatingTo=function(e){var b=m.call(this);
if(!e){b[n]=[];return}var d=b[n];var a=d.length;var c;for(c=0;c<a;c++){if(d[c].emitter===e){d.splice(c,1);
break}}};o.stopImmediatePropagation=function(){this._stoppedImmediatePropagation=true
};o.has=function(c,d,g){var h=m.call(this);var b=h[c];if(arguments.length===0){return Object.keys(h)
}if(!b){return false}if(!d){return(b.length>0)?true:false}for(var a=0,f=b.length;
a<f;a++){var e=b[a];if(g&&d&&e.context===g&&e.callback===d){return true}else{if(d&&!g&&e.callback===d){return true
}}}return false};r.exports=k},{}],92:[function(d,f,e){f.exports={DOMEmitter:d("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":93}],93:[function(r,s,q){var p;var k=r("ac-event-emitter").EventEmitter,l=r("./DOMEmitterEvent"),o={addEventListener:r("@marcom/ac-dom-events/addEventListener"),removeEventListener:r("@marcom/ac-dom-events/removeEventListener"),dispatchEvent:r("@marcom/ac-dom-events/dispatchEvent")},t={querySelectorAll:r("@marcom/ac-dom-traversal/querySelectorAll"),matchesSelector:r("@marcom/ac-dom-traversal/matchesSelector")};
var m="dom-emitter";function n(a){if(a===null){return}this.el=a;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}p=n.prototype;p.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};p.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};p.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};p.has=function(c,e,f,a){var g,d;if(typeof e==="string"){g=e;d=f}else{d=e;
a=f}if(g){var b=this._getDelegateFuncBindingIdx(c,g,d,a,true);if(b>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};p.trigger=function(a,b,h,d){a=this._parseEventNames(a);a=this._cleanStringData(a);
var f,e,g,c=a.length;if(typeof b==="string"){f=this._cleanStringData(b);e=h}else{e=b;
d=h}for(g=0;g<c;g++){this._triggerDOMEvents(a[g],e,f)}return this};p.emitterTrigger=function(b,e,d){if(!this._eventEmitter){return this
}b=this._parseEventNames(b);b=this._cleanStringData(b);e=new l(e,this);var a,c=b.length;
for(a=0;a<c;a++){this._eventEmitter.trigger(b[a],e,d)}return this};p.propagateTo=function(b,a){this._eventEmitter.propagateTo(b,a);
return this};p.stopPropagatingTo=function(a){this._eventEmitter.stopPropagatingTo(a);
return this};p.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};p.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};p._parseEventNames=function(a){if(!a){return[a]
}return a.split(" ")};p._onListenerEvent=function(a,b){var c=new l(b,this);this._eventEmitter.trigger(a,c,false)
};p._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
o.addEventListener(this.el,a,this._bindings[a])};p._removeListener=function(a){o.removeEventListener(this.el,a,this._bindings[a]);
this._bindings[a]=null};p._triggerInternalEvent=function(b,a){this.emitterTrigger(m+":"+b,a)
};p._normalizeArgumentsAndCall=function(c,a){var d={};if(c.length===0){a.call(this,d);
return}if(typeof c[0]==="string"||c[0]===null){c=this._cleanStringData(c);d.events=c[0];
if(typeof c[1]==="string"){d.delegateQuery=c[1];d.callback=c[2];d.context=c[3]}else{d.callback=c[1];
d.context=c[2]}a.call(this,d);return}var b,f,e=":",g=c[0];for(b in g){if(g.hasOwnProperty(b)){d={};
f=this._cleanStringData(b.split(e));d.events=f[0];d.delegateQuery=f[1];d.callback=g[b];
d.context=c[1];a.call(this,d)}}};p._registerDelegateFunc=function(a,e,d,c,f){var b=this._delegateFunc.bind(this,a,e,d,f);
this._delegateFuncs[e]=this._delegateFuncs[e]||{};this._delegateFuncs[e][a]=this._delegateFuncs[e][a]||[];
this._delegateFuncs[e][a].push({func:c,context:f,delegateFunc:b});return b};p._cleanStringData=function(h){var a=false;
if(typeof h==="string"){h=[h];a=true}var b=[],f,d,e,g,c=h.length;for(f=0;f<c;f++){d=h[f];
if(typeof d==="string"){if(d===""||d===" "){continue}e=d.length;while(d[0]===" "){d=d.slice(1,e);
e--}while(d[e-1]===" "){d=d.slice(0,e-1);e--}}b.push(d)}if(a){return b[0]}return b
};p._unregisterDelegateFunc=function(a,d,c,e){if(!this._delegateFuncs[d]||!this._delegateFuncs[d][a]){return
}var f=this._getDelegateFuncBindingIdx(a,d,c,e),b;if(f>-1){b=this._delegateFuncs[d][a][f].delegateFunc;
this._delegateFuncs[d][a].splice(f,1);if(this._delegateFuncs[d][a].length===0){this._delegateFuncs[d][a]=null
}}return b};p._unregisterDelegateFuncs=function(c,a){if(!this._delegateFuncs[a]){return
}if(c!==null&&!this._delegateFuncs[a][c]){return}if(c===null){var b;for(b in this._delegateFuncs[a]){if(this._delegateFuncs[a].hasOwnProperty(b)){this._unbindDelegateFunc(b,a)
}}return}this._unbindDelegateFunc(c,a)};p._unbindDelegateFunc=function(c,a){var e,d,b=0;
while(this._delegateFuncs[a][c]&&this._delegateFuncs[a][c][b]){e=this._delegateFuncs[a][c][b];
d=this._delegateFuncs[a][c][b].length;this._off({events:c,delegateQuery:a,callback:e.func,context:e.context});
if(this._delegateFuncs[a][c]&&d===this._delegateFuncs[a][c].length){b++}}e=d=null
};p._unregisterDelegateFuncsByEvent=function(b){var a;for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._unregisterDelegateFuncs(b,a)
}}};p._delegateFunc=function(c,f,d,a,e){if(this._targetHasDelegateAncestor(e.target,f)){var b=Array.prototype.slice.call(arguments,0),g=b.slice(4,b.length);
a=a||window;if(typeof e.detail==="object"){g[0]=e.detail}d.apply(a,g)}};p._targetHasDelegateAncestor=function(a,b){var c=a;
while(c&&c!==this.el&&c!==document.documentElement){if(t.matchesSelector(c,b)){return true
}c=c.parentNode}return false};p._on=function(e){var b=e.events,d=e.callback,f=e.delegateQuery,a=e.context,c=e.unboundCallback||d;
b=this._parseEventNames(b);b.forEach(function(g,v,i,h,j){if(!this.has(j)){this._setListener(j)
}if(typeof h==="string"){g=this._registerDelegateFunc(j,h,g,v,i)}this._triggerInternalEvent("willon",{evt:j,callback:g,context:i,delegateQuery:h});
this._eventEmitter.on(j,g,i);this._triggerInternalEvent("didon",{evt:j,callback:g,context:i,delegateQuery:h})
}.bind(this,d,c,a,f));b=d=c=f=a=null};p._off=function(e){var b=e.events,d=e.callback,f=e.delegateQuery,g=e.context,c=e.unboundCallback||d;
if(typeof b==="undefined"){this._eventEmitter.off();var a;for(a in this._bindings){if(this._bindings.hasOwnProperty(a)){this._removeListener(a)
}}for(a in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(a)){this._delegateFuncs[a]=null
}}return}b=this._parseEventNames(b);b.forEach(function(h,x,j,i,w){if(typeof i==="string"&&typeof x==="function"){h=this._unregisterDelegateFunc(w,i,x,j);
if(!h){return}}if(typeof i==="string"&&typeof h==="undefined"){this._unregisterDelegateFuncs(w,i);
return}if(typeof w==="string"&&typeof h==="undefined"){this._unregisterDelegateFuncsByEvent(w);
if(typeof i==="string"){return}}this._triggerInternalEvent("willoff",{evt:w,callback:h,context:j,delegateQuery:i});
this._eventEmitter.off(w,h,j);this._triggerInternalEvent("didoff",{evt:w,callback:h,context:j,delegateQuery:i});
if(!this.has(w)){this._removeListener(w)}}.bind(this,d,c,g,f));b=d=c=f=g=null};
p._once=function(e){var c=e.events,d=e.callback,a=e.delegateQuery,b=e.context;c=this._parseEventNames(c);
c.forEach(function(f,h,g,i){if(typeof g==="string"){return this._handleDelegateOnce(i,f,h,g)
}if(!this.has(i)){this._setListener(i)}this._triggerInternalEvent("willonce",{evt:i,callback:f,context:h,delegateQuery:g});
this._eventEmitter.once.call(this,i,f,h);this._triggerInternalEvent("didonce",{evt:i,callback:f,context:h,delegateQuery:g})
}.bind(this,d,b,a));c=d=a=b=null};p._handleDelegateOnce=function(c,d,b,a){this._triggerInternalEvent("willonce",{evt:c,callback:d,context:b,delegateQuery:a});
this._on({events:c,context:b,delegateQuery:a,callback:this._getDelegateOnceCallback.bind(this,c,d,b,a),unboundCallback:d});
this._triggerInternalEvent("didonce",{evt:c,callback:d,context:b,delegateQuery:a});
return this};p._getDelegateOnceCallback=function(c,d,a,e){var b=Array.prototype.slice.call(arguments,0),f=b.slice(4,b.length);
d.apply(a,f);this._off({events:c,delegateQuery:e,callback:d,context:a})};p._getDelegateFuncBindingIdx=function(a,d,f,h,i){var b=-1;
if(this._delegateFuncs[d]&&this._delegateFuncs[d][a]){var e,g,c=this._delegateFuncs[d][a].length;
for(e=0;e<c;e++){g=this._delegateFuncs[d][a][e];if(i&&typeof f==="undefined"){f=g.func
}if(g.func===f&&g.context===h){b=e;break}}}return b};p._triggerDOMEvents=function(a,e,f){var b=[this.el];
if(f){b=t.querySelectorAll(f,this.el)}var g,d,c=b.length;for(g=0;g<c;g++){o.dispatchEvent(b[g],a,{bubbles:true,cancelable:true,detail:e})
}};s.exports=n},{"./DOMEmitterEvent":94,"@marcom/ac-dom-events/addEventListener":95,"@marcom/ac-dom-events/dispatchEvent":96,"@marcom/ac-dom-events/removeEventListener":104,"@marcom/ac-dom-traversal/matchesSelector":86,"@marcom/ac-dom-traversal/querySelectorAll":87,"ac-event-emitter":90}],94:[function(g,l,h){var j={preventDefault:g("@marcom/ac-dom-events/preventDefault"),stopPropagation:g("@marcom/ac-dom-events/stopPropagation"),target:g("@marcom/ac-dom-events/target")};
var k;var i=function(a,b){this._domEmitter=b;this.originalEvent=a||{};this._originalTarget=j.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(a){this.data=this.originalEvent;this.originalEvent={}}}};k=i.prototype;
k.preventDefault=function(){j.preventDefault(this.originalEvent)};k.stopPropagation=function(){j.stopPropagation(this.originalEvent)
};k.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};k._isDOMEvent=function(a){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&a instanceof CustomEvent)){return true
}return false};l.exports=i},{"@marcom/ac-dom-events/preventDefault":103,"@marcom/ac-dom-events/stopPropagation":107,"@marcom/ac-dom-events/target":108}],95:[function(d,f,e){arguments[4][32][0].apply(e,arguments)
},{"./shared/getEventType":105,"./utils/addEventListener":109,dup:32}],96:[function(k,j,l){var h=k("./utils/dispatchEvent");
var g=k("./shared/getEventType");j.exports=function i(a,b,c){b=g(a,b);return h(a,b,c)
}},{"./shared/getEventType":105,"./utils/dispatchEvent":110}],97:[function(d,f,e){f.exports={addEventListener:d("./addEventListener"),dispatchEvent:d("./dispatchEvent"),preventDefault:d("./preventDefault"),removeEventListener:d("./removeEventListener"),stop:d("./stop"),stopPropagation:d("./stopPropagation"),target:d("./target")}
},{"./addEventListener":95,"./dispatchEvent":96,"./preventDefault":103,"./removeEventListener":104,"./stop":106,"./stopPropagation":107,"./target":108}],98:[function(d,f,e){arguments[4][33][0].apply(e,arguments)
},{"./shared/camelCasedEventTypes":99,"./shared/prefixHelper":100,"./shared/windowFallbackEventTypes":101,"./utils/eventTypeAvailable":102,dup:33}],99:[function(d,f,e){arguments[4][34][0].apply(e,arguments)
},{dup:34}],100:[function(d,f,e){arguments[4][35][0].apply(e,arguments)},{dup:35}],101:[function(d,f,e){arguments[4][36][0].apply(e,arguments)
},{dup:36}],102:[function(d,f,e){arguments[4][37][0].apply(e,arguments)},{dup:37}],103:[function(h,g,f){g.exports=function e(a){a=a||window.event;
if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}},{}],104:[function(d,f,e){arguments[4][38][0].apply(e,arguments)
},{"./shared/getEventType":105,"./utils/removeEventListener":111,dup:38}],105:[function(d,f,e){arguments[4][39][0].apply(e,arguments)
},{"@marcom/ac-prefixer/getEventType":98,dup:39}],106:[function(k,i,g){var h=k("./stopPropagation");
var l=k("./preventDefault");i.exports=function j(a){a=a||window.event;h(a);l(a);
a.stopped=true;a.returnValue=false}},{"./preventDefault":103,"./stopPropagation":107}],107:[function(h,g,e){g.exports=function f(a){a=a||window.event;
if(a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}}},{}],108:[function(d,f,e){arguments[4][40][0].apply(e,arguments)
},{dup:40}],109:[function(d,f,e){arguments[4][25][0].apply(e,arguments)},{dup:25}],110:[function(e,h,f){e("@marcom/ac-polyfills/CustomEvent");
h.exports=function g(a,b,c){var d;if(a.dispatchEvent){if(c){d=new CustomEvent(b,c)
}else{d=new CustomEvent(b)}a.dispatchEvent(d)}else{d=document.createEventObject();
if(c&&"detail" in c){d.detail=c.detail}a.fireEvent("on"+b,d)}return a}},{"@marcom/ac-polyfills/CustomEvent":70}],111:[function(d,f,e){arguments[4][26][0].apply(e,arguments)
},{dup:26}],112:[function(d,f,e){arguments[4][90][0].apply(e,arguments)},{"./ac-event-emitter/EventEmitter":113,dup:90}],113:[function(d,f,e){arguments[4][91][0].apply(e,arguments)
},{dup:91}],114:[function(i,h,j){var g=i("qs");h.exports=function f(b,c){var a=g.stringify(b,{strictNullHandling:true});
if(a&&c!==false){a="?"+a}return a}},{qs:115}],115:[function(g,k,h){var i=g("./stringify");
var l=g("./parse");var j={};k.exports={stringify:i,parse:l}},{"./parse":116,"./stringify":117}],116:[function(f,j,g){var h=f("./utils");
var i={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1000,strictNullHandling:false,plainObjects:false,allowPrototypes:false};
i.parseValues=function(e,a){var r={};var s=e.split(a.delimiter,a.parameterLimit===Infinity?undefined:a.parameterLimit);
for(var q=0,c=s.length;q<c;++q){var u=s[q];var d=u.indexOf("]=")===-1?u.indexOf("="):u.indexOf("]=")+1;
if(d===-1){r[h.decode(u)]="";if(a.strictNullHandling){r[h.decode(u)]=null}}else{var b=h.decode(u.slice(0,d));
var t=h.decode(u.slice(d+1));if(!Object.prototype.hasOwnProperty.call(r,b)){r[b]=t
}else{r[b]=[].concat(r[b]).concat(t)}}}return r};i.parseObject=function(c,a,d){if(!c.length){return a
}var p=c.shift();var b;if(p==="[]"){b=[];b=b.concat(i.parseObject(c,a,d))}else{b=d.plainObjects?Object.create(null):{};
var e=p[0]==="["&&p[p.length-1]==="]"?p.slice(1,p.length-1):p;var n=parseInt(e,10);
var o=""+n;if(!isNaN(n)&&p!==e&&o===e&&n>=0&&(d.parseArrays&&n<=d.arrayLimit)){b=[];
b[n]=i.parseObject(c,a,d)}else{b[e]=i.parseObject(c,a,d)}}return b};i.parseKeys=function(e,a,p){if(!e){return
}if(p.allowDots){e=e.replace(/\.([^\.\[]+)/g,"[$1]")}var d=/^([^\[\]]*)/;var q=/(\[[^\[\]]*\])/g;
var b=d.exec(e);var c=[];if(b[1]){if(!p.plainObjects&&Object.prototype.hasOwnProperty(b[1])){if(!p.allowPrototypes){return
}}c.push(b[1])}var o=0;while((b=q.exec(e))!==null&&o<p.depth){++o;if(!p.plainObjects&&Object.prototype.hasOwnProperty(b[1].replace(/\[|\]/g,""))){if(!p.allowPrototypes){continue
}}c.push(b[1])}if(b){c.push("["+e.slice(b.index)+"]")}return i.parseObject(c,a,p)
};j.exports=function(p,a){a=a||{};a.delimiter=typeof a.delimiter==="string"||h.isRegExp(a.delimiter)?a.delimiter:i.delimiter;
a.depth=typeof a.depth==="number"?a.depth:i.depth;a.arrayLimit=typeof a.arrayLimit==="number"?a.arrayLimit:i.arrayLimit;
a.parseArrays=a.parseArrays!==false;a.allowDots=a.allowDots!==false;a.plainObjects=typeof a.plainObjects==="boolean"?a.plainObjects:i.plainObjects;
a.allowPrototypes=typeof a.allowPrototypes==="boolean"?a.allowPrototypes:i.allowPrototypes;
a.parameterLimit=typeof a.parameterLimit==="number"?a.parameterLimit:i.parameterLimit;
a.strictNullHandling=typeof a.strictNullHandling==="boolean"?a.strictNullHandling:i.strictNullHandling;
if(p===""||p===null||typeof p==="undefined"){return a.plainObjects?Object.create(null):{}
}var e=typeof p==="string"?i.parseValues(p,a):p;var r=a.plainObjects?Object.create(null):{};
var b=Object.keys(e);for(var q=0,d=b.length;q<d;++q){var c=b[q];var s=i.parseKeys(c,e[c],a);
r=h.merge(r,s,a)}return h.compact(r)}},{"./utils":118}],117:[function(f,j,g){var h=f("./utils");
var i={delimiter:"&",arrayPrefixGenerators:{brackets:function(a,b){return a+"[]"
},indices:function(a,b){return a+"["+b+"]"},repeat:function(a,b){return a}},strictNullHandling:false};
i.stringify=function(q,d,u,s,t){if(typeof t==="function"){q=t(d,q)}else{if(h.isBuffer(q)){q=q.toString()
}else{if(q instanceof Date){q=q.toISOString()}else{if(q===null){if(s){return h.encode(d)
}q=""}}}}if(typeof q==="string"||typeof q==="number"||typeof q==="boolean"){return[h.encode(d)+"="+h.encode(q)]
}var a=[];if(typeof q==="undefined"){return a}var r=Array.isArray(t)?t:Object.keys(q);
for(var e=0,c=r.length;e<c;++e){var b=r[e];if(Array.isArray(q)){a=a.concat(i.stringify(q[b],u(d,b),u,s,t))
}else{a=a.concat(i.stringify(q[b],d+"["+b+"]",u,s,t))}}return a};j.exports=function(e,a){a=a||{};
var w=typeof a.delimiter==="undefined"?i.delimiter:a.delimiter;var u=typeof a.strictNullHandling==="boolean"?a.strictNullHandling:i.strictNullHandling;
var s;var v;if(typeof a.filter==="function"){v=a.filter;e=v("",e)}else{if(Array.isArray(a.filter)){s=v=a.filter
}}var b=[];if(typeof e!=="object"||e===null){return""}var y;if(a.arrayFormat in i.arrayPrefixGenerators){y=a.arrayFormat
}else{if("indices" in a){y=a.indices?"indices":"repeat"}else{y="indices"}}var x=i.arrayPrefixGenerators[y];
if(!s){s=Object.keys(e)}for(var t=0,d=s.length;t<d;++t){var c=s[t];b=b.concat(i.stringify(e[c],c,x,u,v))
}return b.join(w)}},{"./utils":118}],118:[function(f,j,g){var h={};h.hexTable=new Array(256);
for(var i=0;i<256;++i){h.hexTable[i]="%"+((i<16?"0":"")+i.toString(16)).toUpperCase()
}g.arrayToObject=function(b,d){var a=d.plainObjects?Object.create(null):{};for(var c=0,e=b.length;
c<e;++c){if(typeof b[c]!=="undefined"){a[c]=b[c]}}return a};g.merge=function(p,a,k){if(!a){return p
}if(typeof a!=="object"){if(Array.isArray(p)){p.push(a)}else{if(typeof p==="object"){p[a]=true
}else{p=[p,a]}}return p}if(typeof p!=="object"){p=[p].concat(a);return p}if(Array.isArray(p)&&!Array.isArray(a)){p=g.arrayToObject(p,k)
}var c=Object.keys(a);for(var o=0,d=c.length;o<d;++o){var e=c[o];var b=a[e];if(!Object.prototype.hasOwnProperty.call(p,e)){p[e]=b
}else{p[e]=g.merge(p[e],b,k)}}return p};g.decode=function(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}};g.encode=function(b){if(b.length===0){return b}if(typeof b!=="string"){b=""+b
}var d="";for(var c=0,e=b.length;c<e;++c){var a=b.charCodeAt(c);if(a===45||a===46||a===95||a===126||(a>=48&&a<=57)||(a>=65&&a<=90)||(a>=97&&a<=122)){d+=b[c];
continue}if(a<128){d+=h.hexTable[a];continue}if(a<2048){d+=h.hexTable[192|(a>>6)]+h.hexTable[128|(a&63)];
continue}if(a<55296||a>=57344){d+=h.hexTable[224|(a>>12)]+h.hexTable[128|((a>>6)&63)]+h.hexTable[128|(a&63)];
continue}++c;a=65536+(((a&1023)<<10)|(b.charCodeAt(c)&1023));d+=h.hexTable[240|(a>>18)]+h.hexTable[128|((a>>12)&63)]+h.hexTable[128|((a>>6)&63)]+h.hexTable[128|(a&63)]
}return d};g.compact=function(q,e){if(typeof q!=="object"||q===null){return q}e=e||[];
var a=e.indexOf(q);if(a!==-1){return e[a]}e.push(q);if(Array.isArray(q)){var p=[];
for(var c=0,o=q.length;c<o;++c){if(typeof q[c]!=="undefined"){p.push(q[c])}}return p
}var b=Object.keys(q);for(c=0,o=b.length;c<o;++c){var d=b[c];q[d]=g.compact(q[d],e)
}return q};g.isRegExp=function(a){return Object.prototype.toString.call(a)==="[object RegExp]"
};g.isBuffer=function(a){if(a===null||typeof a==="undefined"){return false}return !!(a.constructor&&a.constructor.isBuffer&&a.constructor.isBuffer(a))
}},{}],119:[function(d,f,e){f.exports={clone:d("./clone"),create:d("./create"),defaults:d("./defaults"),extend:d("./extend"),getPrototypeOf:d("./getPrototypeOf"),isDate:d("./isDate"),isEmpty:d("./isEmpty"),isRegExp:d("./isRegExp"),toQueryParameters:d("./toQueryParameters")}
},{"./clone":120,"./create":121,"./defaults":122,"./extend":123,"./getPrototypeOf":124,"./isDate":125,"./isEmpty":126,"./isRegExp":127,"./toQueryParameters":128}],120:[function(n,m,h){n("@marcom/ac-polyfills/Array/isArray");
var j=n("./extend");var i=Object.prototype.hasOwnProperty;var l=function(c,b){var a;
for(a in b){if(i.call(b,a)){if(b[a]===null){c[a]=null}else{if(typeof b[a]==="object"){c[a]=Array.isArray(b[a])?[]:{};
l(c[a],b[a])}else{c[a]=b[a]}}}}return c};m.exports=function k(a,b){if(b){return l({},a)
}return j({},a)}},{"./extend":123,"@marcom/ac-polyfills/Array/isArray":66}],121:[function(d,f,e){arguments[4][27][0].apply(e,arguments)
},{dup:27}],122:[function(d,f,e){arguments[4][55][0].apply(e,arguments)},{"./extend":123,dup:55}],123:[function(d,f,e){arguments[4][56][0].apply(e,arguments)
},{"@marcom/ac-polyfills/Array/prototype.forEach":67,dup:56}],124:[function(j,i,f){var g=Object.prototype.hasOwnProperty;
i.exports=function h(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(g.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],125:[function(e,g,f){g.exports=function h(a){return Object.prototype.toString.call(a)==="[object Date]"
}},{}],126:[function(j,i,f){var g=Object.prototype.hasOwnProperty;i.exports=function h(b){var a;
if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(g.call(b,a)){return false}}return true}},{}],127:[function(h,g,e){g.exports=function f(a){return window.RegExp?a instanceof RegExp:false
}},{}],128:[function(j,h,f){var g=j("@marcom/ac-url/joinSearchParams");h.exports=function i(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return g(a,false)}},{"@marcom/ac-url/joinSearchParams":114}],129:[function(d,f,e){f.exports={Routes:d("./ac-routes/Routes"),Route:d("./ac-routes/Route")}
},{"./ac-routes/Route":130,"./ac-routes/Routes":131}],130:[function(f,j,g){function h(c,a,d,b,e){this.path=c;
this.callback=a;this.context=d;this.greedy=b||false;this.priority=e||0;if(typeof this.priority!=="number"){throw new Error("Priority must be a Number.")
}this.identifierPattern="([a-zA-Z0-9\\-\\_]+)";this.tokensRe=new RegExp(":"+this.identifierPattern,"g");
this.matcher=this._createRouteMatcher(c)}var i=h.prototype;i._createRouteMatcher=function(c){if(c&&c.exec){return{pattern:c}
}else{if(c==="/"){return{pattern:/^\/$/}}else{if(typeof c!=="string"){throw new Error("path must be either a string or regex")
}}}var d=this._extractRouteTokens(c);var a=c.replace(this.tokensRe,this.identifierPattern);
var b=new RegExp(a,"g");return{pattern:b,routeTokens:d}};i._extractRouteTokens=function(a){var d=a.replace(this.tokensRe,":"+this.identifierPattern);
var b=new RegExp(d,"g");var c=b.exec(a);if(c&&c.length>1){c=c.slice(1)}else{c=null
}return c};i.match=function(c){this.matcher.pattern.lastIndex=0;var d=this.matcher.pattern.exec(c);
if(d){var b=(d.length)?d.slice(1):[];var a=this.callback;if(a&&typeof a==="function"){a.apply(this.context||this,b);
return true}}return false};j.exports=h},{}],131:[function(l,k,g){var i=l("./Route");
function h(a){this._routes={};if(a){this.addRoutes(a)}}var j=h.prototype;j._getIndex=function(b,a,c){if(this._routes[b]!==undefined){var d=this._routes[b].length;
while(--d>-1){if(this._routes[b][d].callback===a&&this._routes[b][d].context===c){return d
}}}return -1};j.match=function(a){var b,c;for(b in this._routes){c=this._routes[b].length;
while(--c>-1){if(this._routes[b][c].match(a)&&this._routes[b][c].greedy){break}}}};
j.add=function(b){if(this._routes[b.path]===undefined){this._routes[b.path]=[b]
}else{if(!this.get(b.path,b.callback,b.context)){var a,c=this._routes[b.path].length;
if(c>0){for(a=0;a<c;++a){if(this._routes[b.path][a].priority>b.priority){this._routes[b.path].splice(a,0,b);
return b}}}this._routes[b.path].push(b)}}return b};j.remove=function(b){var a=this._getIndex(b.path,b.callback,b.context);
if(a>-1){this._routes[b.path].splice(a,1);return b}return false};j.get=function(b,a,c){var d=this._getIndex(b,a,c);
if(d>-1){return this._routes[b][d]}return false};j.createRoute=function(c,a,d,b,e){var f=new i(c,a,d,b,e);
this.add(f);return f};j.addRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;
for(a=0;a<d;++a){b=c[a];if(b&&typeof b==="object"){this.add(b)}}}else{throw new Error("routes must be an Array.")
}};j.removeRoutes=function(c){if(c instanceof Array){var a,b,d=c.length;for(a=0;
a<d;++a){b=c[a];if(b&&typeof b==="object"){this.remove(b)}}}else{throw new Error("routes must be an Array.")
}};j.getRoutes=function(a){if(this._routes[a]===undefined){return[]}return this._routes[a]
};k.exports=h},{"./Route":130}],132:[function(d,f,e){f.exports={Router:d("./ac-router/Router"),History:d("./ac-router/History"),Routes:d("@marcom/ac-routes").Routes,Route:d("@marcom/ac-routes").Route}
},{"./ac-router/History":133,"./ac-router/Router":134,"@marcom/ac-routes":129}],133:[function(p,n,i){var o=p("@marcom/ac-object").create;
var j=p("@marcom/ac-dom-events");var k=p("@marcom/ac-event-emitter").EventEmitter;
function l(a){a=a||{};this.history=window.history;this.rootStripper=/^\/+|\/+$/g;
this.root=a.root||"/";this.root=("/"+this.root+"/").replace(this.rootStripper,"/");
var b=typeof a.resolveInitialHash!=="boolean"?true:a.resolveInitialHash;this._pushState=typeof a.pushState!=="boolean"?true:a.pushState;
this._hashChange=a.hashChange||false;this._setUpdateVars(b);if(a.autoStart){this.start()
}}var m=l.prototype=o(k.prototype);m._isRoot=function(a){return("/"+a+"/").replace(this.rootStripper,"/")===this.root
};m._isPushStateSupported=function(){return(this.history&&this.history.pushState)
};m._isHashChangeSupported=function(){return("onhashchange" in window)};m._setUpdateVars=function(a){if(this._pushState&&this._isPushStateSupported()){if(a&&this._hashChange&&window.location.href.indexOf("#")!==-1){this.history.pushState({},document.title,window.location.href.replace("#",""))
}this._hashChange=false}else{if(a&&this._pushState&&this._hashChange&&window.location.href.indexOf("#")<0){if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname;
window.location.origin+=(window.location.port?":"+window.location.port:"")}var b=window.location.href.substr(window.location.origin.length+this.root.length);
if(b.length){window.location=window.location.origin+this.root+"#"+b;return}}if(this._hashChange&&!this._isHashChangeSupported()){this._interval=50;
this._iframe=document.createElement('<iframe src="javascript:0" tabindex="-1" style="display:none;">');
this._iframe=document.body.appendChild(this._iframe).contentWindow;this._iframe.document.open().close()
}this._pushState=false}};m._checkUrl=function(){var a=this._iframe.location.hash.substr(1);
if(a.length===0){a="/"}if(this.fragment()!==a){window.location.hash="#"+a;this._ignoreHashChange=false;
this._handleHashChange()}};m._handlePopState=function(a){this.trigger("popstate",{fragment:this.fragment()})
};m._handleHashChange=function(a){if(this._ignoreHashChange){this._ignoreHashChange=false;
return}this.trigger("popstate",{fragment:this.fragment()})};m.canUpdate=function(){return this._pushState||this._hashChange
};m.start=function(){if(!this.started&&(this._pushState||this._hashChange)){this.started=true;
if(this._pushState){this._handlePopState=this._handlePopState.bind(this);j.addEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){this._handleHashChange=this._handleHashChange.bind(this);
j.addEventListener(window,"hashchange",this._handleHashChange)}else{this._iframe.location.hash=this.fragment();
this._checkUrl=this._checkUrl.bind(this);this._checkUrlInterval=setInterval(this._checkUrl,this._interval)
}}}}return this.started||false};m.stop=function(){if(this.started){this.started=false;
if(this._pushState){j.removeEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){j.removeEventListener(window,"hashchange",this._handleHashChange)
}else{if(this._checkUrlInterval){clearInterval(this._checkUrlInterval);this._checkUrlInterval=null
}}}}}};m.navigate=function(a,b){if(!this.started||!this.canUpdate()){return false
}b=b||{};var c=((this._isRoot(a)?"":this.root)+a).replace(/([^:])(\/\/)/g,"$1/");
if(this._pushState){this.history.pushState(b,document.title,c)}else{if(this._hashChange){this._ignoreHashChange=true;
window.location.hash="#"+a;if(!this._isHashChangeSupported()){this._iframe.document.open().close();
this._iframe.location.hash="#"+a}}}return true};m.fragment=function(){var a="";
if(this._pushState){a=(window.location.pathname).substr(this.root.length)}else{if(this._hashChange){a=window.location.hash.substr(1)
}}return a===""?"/":a};n.exports=l},{"@marcom/ac-dom-events":97,"@marcom/ac-event-emitter":112,"@marcom/ac-object":119}],134:[function(q,r,o){var m=q("@marcom/ac-object").create;
var k=q("@marcom/ac-dom-emitter").DOMEmitter;var p=q("./History");var l=q("@marcom/ac-routes").Route;
var t=q("@marcom/ac-routes").Routes;function s(a){a=a||{};this._intercept=a.intercept||"[data-route]";
this._interceptAttribute=a.attribute||"href";this._handleTrigger=this._handleTrigger.bind(this);
this.intercept(this._intercept);this.history=a.history||new p({root:a.root,autoStart:a.autoStart,pushState:a.pushState,hashChange:a.hashChange,resolveInitialHash:a.resolveInitialHash});
t.call(this,a.routes);if(a.autoStart){if(!this.history.started){this.history.start()
}this.start()}}var n=s.prototype=m(t.prototype);n._handleTrigger=function(a){if(!this.started){return
}var b=a.target.getAttribute(this._interceptAttribute);if(b){if(/^(http|https):\/\/+/.exec(b)&&this._interceptAttribute==="href"){b=b.substr(b.indexOf(this.history.root)+this.history.root.length)||"/"
}if(this.navigate(b)){a.preventDefault()}}};n._handlePopstate=function(a){this.navigate(a.fragment,true)
};n.start=function(){if(!this.started){this.started=true;this.history.start();this._handlePopstate=this._handlePopstate.bind(this);
this.history.on("popstate",this._handlePopstate);this.navigate(this.history.fragment(),true)
}};n.stop=function(){if(this.started){this.started=false;this.history.stop();this.history.off("popstate",this._handlePopstate)
}};n.navigate=function(a,b){if(this.history.fragment()===a&&!b){return this.history.canUpdate()
}if(a&&!b){if(!this.history.navigate(a)){return false}}this.match(a);return true
};n.intercept=function(b,a){var c=new k(a||document.body);c.on("click",b,this._handleTrigger)
};r.exports=s},{"./History":133,"@marcom/ac-dom-emitter":92,"@marcom/ac-object":119,"@marcom/ac-routes":129}],135:[function(e,h,f){var g={ua:window.navigator.userAgent,platform:window.navigator.platform,vendor:window.navigator.vendor};
h.exports=e("./parseUserAgent")(g)},{"./parseUserAgent":138}],136:[function(d,f,e){f.exports={browser:{safari:false,chrome:false,firefox:false,ie:false,opera:false,android:false,edge:false,version:{name:"",major:0,minor:0,patch:0,documentMode:false}},os:{osx:false,ios:false,android:false,windows:false,linux:false,fireos:false,chromeos:false,version:{name:"",major:0,minor:0,patch:0}}}
},{}],137:[function(d,f,e){f.exports={browser:[{name:"edge",userAgent:"Edge",version:["rv","Edge"],test:function(a){return(a.ua.indexOf("Edge")>-1||a.ua==="Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
}},{name:"chrome",userAgent:"Chrome"},{name:"firefox",test:function(a){return(a.ua.indexOf("Firefox")>-1&&a.ua.indexOf("Opera")===-1)
},version:"Firefox"},{name:"android",userAgent:"Android"},{name:"safari",test:function(a){return(a.ua.indexOf("Safari")>-1&&a.vendor.indexOf("Apple")>-1)
},version:"Version"},{name:"ie",test:function(a){return(a.ua.indexOf("IE")>-1||a.ua.indexOf("Trident")>-1)
},version:["MSIE","rv"],parseDocumentMode:function(){var a=false;if(document.documentMode){a=parseInt(document.documentMode,10)
}return a}},{name:"opera",userAgent:"Opera",version:["Version","Opera"]}],os:[{name:"windows",test:function(a){return(a.platform.indexOf("Win")>-1)
},version:"Windows NT"},{name:"osx",userAgent:"Mac",test:function(a){return(a.platform.indexOf("Mac")>-1)
}},{name:"ios",test:function(a){return(a.ua.indexOf("iPhone")>-1||a.ua.indexOf("iPad")>-1)
},version:["iPhone OS","CPU OS"]},{name:"linux",userAgent:"Linux",test:function(a){return(a.platform.indexOf("Linux")>-1&&a.ua.indexOf("Android")===-1)
}},{name:"fireos",test:function(a){return(a.ua.indexOf("Firefox")>-1&&a.ua.indexOf("Mobile")>-1)
},version:"rv"},{name:"android",userAgent:"Android"},{name:"chromeos",userAgent:"CrOS"}]}
},{}],138:[function(q,r,o){var p=q("./defaults");var l=q("./dictionary");function m(a){return new RegExp(a+"[a-zA-Z\\s/:]+([0-9_.]+)","i")
}function n(a,b){if(typeof a.parseVersion==="function"){return a.parseVersion(b)
}else{var e=a.version||a.userAgent;if(typeof e==="string"){e=[e]}var f=e.length;
var d;for(var c=0;c<f;c++){d=b.match(m(e[c]));if(d&&d.length>1){return d[1].replace(/_/g,".")
}}}}function j(b,e,g){var h=b.length;var f;var d;for(var a=0;a<h;a++){if(typeof b[a].test==="function"){if(b[a].test(g)===true){f=b[a].name
}}else{if(g.ua.indexOf(b[a].userAgent)>-1){f=b[a].name}}if(f){e[f]=true;d=n(b[a],g.ua);
if(typeof d==="string"){var c=d.split(".");e.version.name=d;if(c&&c.length>0){e.version.major=parseInt(c[0]||0);
e.version.minor=parseInt(c[1]||0);e.version.patch=parseInt(c[2]||0)}}else{if(f==="edge"){e.version.name="12.0.0";
e.version.major="12";e.version.minor="0";e.version.patch="0"}}if(typeof b[a].parseDocumentMode==="function"){e.version.documentMode=b[a].parseDocumentMode()
}return e}}return e}function k(a){var b={};b.browser=j(l.browser,p.browser,a);b.os=j(l.os,p.os,a);
return b}r.exports=k},{"./defaults":136,"./dictionary":137}],139:[function(ct,a4,bC){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
;
"use strict";var cF=ct("base64-js");var bt=ct("ieee754");bC.Buffer=cH;bC.SlowBuffer=cu;
bC.INSPECT_MAX_BYTES=50;var bB=2147483647;bC.kMaxLength=bB;cH.TYPED_ARRAY_SUPPORT=cB();
if(!cH.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.")
}function cB(){try{var b=new Uint8Array(1);b.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42
}};return b.foo()===42}catch(a){return false}}Object.defineProperty(cH.prototype,"parent",{get:function(){if(!(this instanceof cH)){return undefined
}return this.buffer}});Object.defineProperty(cH.prototype,"offset",{get:function(){if(!(this instanceof cH)){return undefined
}return this.byteOffset}});function bJ(a){if(a>bB){throw new RangeError("Invalid typed array length")
}var b=new Uint8Array(a);b.__proto__=cH.prototype;return b}function cH(c,b,a){if(typeof c==="number"){if(typeof b==="string"){throw new Error("If encoding is specified then the first argument must be a string")
}return ci(c)}return bx(c,b,a)}if(typeof Symbol!=="undefined"&&Symbol.species&&cH[Symbol.species]===cH){Object.defineProperty(cH,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false})
}cH.poolSize=8192;function bx(a,c,b){if(typeof a==="number"){throw new TypeError('"value" argument must not be a number')
}if(bQ(a)||(a&&bQ(a.buffer))){return b8(a,c,b)}if(typeof a==="string"){return bs(a,c)
}return cg(a)}cH.from=function(a,c,b){return bx(a,c,b)};cH.prototype.__proto__=Uint8Array.prototype;
cH.__proto__=Uint8Array;function bM(a){if(typeof a!=="number"){throw new TypeError('"size" argument must be of type number')
}else{if(a<0){throw new RangeError('"size" argument must not be negative')}}}function cc(c,a,b){bM(c);
if(c<=0){return bJ(c)}if(a!==undefined){return typeof b==="string"?bJ(c).fill(a,b):bJ(c).fill(a)
}return bJ(c)}cH.alloc=function(c,a,b){return cc(c,a,b)};function ci(a){bM(a);return bJ(a<0?0:cw(a)|0)
}cH.allocUnsafe=function(a){return ci(a)};cH.allocUnsafeSlow=function(a){return ci(a)
};function bs(d,b){if(typeof b!=="string"||b===""){b="utf8"}if(!cH.isEncoding(b)){throw new TypeError("Unknown encoding: "+b)
}var c=bV(d,b)|0;var e=bJ(c);var a=e.write(d,b);if(a!==c){e=e.slice(0,a)}return e
}function bP(a){var b=a.length<0?0:cw(a.length)|0;var d=bJ(b);for(var c=0;c<b;c+=1){d[c]=a[c]&255
}return d}function b8(a,c,b){if(c<0||a.byteLength<c){throw new RangeError('"offset" is outside of buffer bounds')
}if(a.byteLength<c+(b||0)){throw new RangeError('"length" is outside of buffer bounds')
}var d;if(c===undefined&&b===undefined){d=new Uint8Array(a)}else{if(b===undefined){d=new Uint8Array(a,c)
}else{d=new Uint8Array(a,c,b)}}d.__proto__=cH.prototype;return d}function cg(a){if(cH.isBuffer(a)){var c=cw(a.length)|0;
var b=bJ(c);if(b.length===0){return b}a.copy(b,0,0,c);return b}if(a){if(ArrayBuffer.isView(a)||"length" in a){if(typeof a.length!=="number"||bw(a.length)){return bJ(0)
}return bP(a)}if(a.type==="Buffer"&&Array.isArray(a.data)){return bP(a.data)}}throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.")
}function cw(a){if(a>=bB){throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+bB.toString(16)+" bytes")
}return a|0}function cu(a){if(+a!=a){a=0}return cH.alloc(+a)}cH.isBuffer=function be(a){return a!=null&&a._isBuffer===true
};cH.compare=function ck(c,d){if(!cH.isBuffer(c)||!cH.isBuffer(d)){throw new TypeError("Arguments must be Buffers")
}if(c===d){return 0}var e=c.length;var a=d.length;for(var b=0,f=Math.min(e,a);b<f;
++b){if(c[b]!==d[b]){e=c[b];a=d[b];break}}if(e<a){return -1}if(a<e){return 1}return 0
};cH.isEncoding=function bE(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;
default:return false}};cH.concat=function cn(b,c){if(!Array.isArray(b)){throw new TypeError('"list" argument must be an Array of Buffers')
}if(b.length===0){return cH.alloc(0)}var d;if(c===undefined){c=0;for(d=0;d<b.length;
++d){c+=b[d].length}}var f=cH.allocUnsafe(c);var a=0;for(d=0;d<b.length;++d){var e=b[d];
if(ArrayBuffer.isView(e)){e=cH.from(e)}if(!cH.isBuffer(e)){throw new TypeError('"list" argument must be an Array of Buffers')
}e.copy(f,a);a+=e.length}return f};function bV(c,b){if(cH.isBuffer(c)){return c.length
}if(ArrayBuffer.isView(c)||bQ(c)){return c.byteLength}if(typeof c!=="string"){c=""+c
}var d=c.length;if(d===0){return 0}var a=false;for(;;){switch(b){case"ascii":case"latin1":case"binary":return d;
case"utf8":case"utf-8":case undefined:return cr(c).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return d*2;
case"hex":return d>>>1;case"base64":return cf(c).length;default:if(a){return cr(c).length
}b=(""+b).toLowerCase();a=true}}}cH.byteLength=bV;function bK(c,a,d){var b=false;
if(a===undefined||a<0){a=0}if(a>this.length){return""}if(d===undefined||d>this.length){d=this.length
}if(d<=0){return""}d>>>=0;a>>>=0;if(d<=a){return""}if(!c){c="utf8"}while(true){switch(c){case"hex":return cj(this,a,d);
case"utf8":case"utf-8":return cv(this,a,d);case"ascii":return bU(this,a,d);case"latin1":case"binary":return b9(this,a,d);
case"base64":return cD(this,a,d);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ca(this,a,d);
default:if(b){throw new TypeError("Unknown encoding: "+c)}c=(c+"").toLowerCase();
b=true}}}cH.prototype._isBuffer=true;function cl(c,a,d){var b=c[a];c[a]=c[d];c[d]=b
}cH.prototype.swap16=function b0(){var b=this.length;if(b%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")
}for(var a=0;a<b;a+=2){cl(this,a,a+1)}return this};cH.prototype.swap32=function cK(){var b=this.length;
if(b%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var a=0;
a<b;a+=4){cl(this,a,a+3);cl(this,a+1,a+2)}return this};cH.prototype.swap64=function by(){var b=this.length;
if(b%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var a=0;
a<b;a+=8){cl(this,a,a+7);cl(this,a+1,a+6);cl(this,a+2,a+5);cl(this,a+3,a+4)}return this
};cH.prototype.toString=function b2(){var a=this.length;if(a===0){return""}if(arguments.length===0){return cv(this,0,a)
}return bK.apply(this,arguments)};cH.prototype.toLocaleString=cH.prototype.toString;
cH.prototype.equals=function bX(a){if(!cH.isBuffer(a)){throw new TypeError("Argument must be a Buffer")
}if(this===a){return true}return cH.compare(this,a)===0};cH.prototype.inspect=function cq(){var a="";
var b=bC.INSPECT_MAX_BYTES;if(this.length>0){a=this.toString("hex",0,b).match(/.{2}/g).join(" ");
if(this.length>b){a+=" ... "}}return"<Buffer "+a+">"};cH.prototype.compare=function ck(d,k,h,c,j){if(!cH.isBuffer(d)){throw new TypeError("Argument must be a Buffer")
}if(k===undefined){k=0}if(h===undefined){h=d?d.length:0}if(c===undefined){c=0}if(j===undefined){j=this.length
}if(k<0||h>d.length||c<0||j>this.length){throw new RangeError("out of range index")
}if(c>=j&&k>=h){return 0}if(c>=j){return -1}if(k>=h){return 1}k>>>=0;h>>>=0;c>>>=0;
j>>>=0;if(this===d){return 0}var a=j-c;var b=h-k;var e=Math.min(a,b);var i=this.slice(c,j);
var f=d.slice(k,h);for(var g=0;g<e;++g){if(i[g]!==f[g]){a=i[g];b=f[g];break}}if(a<b){return -1
}if(b<a){return 1}return 0};function b3(e,a,c,b,d){if(e.length===0){return -1}if(typeof c==="string"){b=c;
c=0}else{if(c>2147483647){c=2147483647}else{if(c<-2147483648){c=-2147483648}}}c=+c;
if(bw(c)){c=d?0:(e.length-1)}if(c<0){c=e.length+c}if(c>=e.length){if(d){return -1
}else{c=e.length-1}}else{if(c<0){if(d){c=0}else{return -1}}}if(typeof a==="string"){a=cH.from(a,b)
}if(cH.isBuffer(a)){if(a.length===0){return -1}return bi(e,a,c,b,d)}else{if(typeof a==="number"){a=a&255;
if(typeof Uint8Array.prototype.indexOf==="function"){if(d){return Uint8Array.prototype.indexOf.call(e,a,c)
}else{return Uint8Array.prototype.lastIndexOf.call(e,a,c)}}return bi(e,[a],c,b,d)
}}throw new TypeError("val must be string, number or Buffer")}function bi(f,k,j,l,i){var c=1;
var b=f.length;var e=k.length;if(l!==undefined){l=String(l).toLowerCase();if(l==="ucs2"||l==="ucs-2"||l==="utf16le"||l==="utf-16le"){if(f.length<2||k.length<2){return -1
}c=2;b/=2;e/=2;j/=2}}function m(o,n){if(c===1){return o[n]}else{return o.readUInt16BE(n*c)
}}var g;if(i){var d=-1;for(g=j;g<b;g++){if(m(f,g)===m(k,d===-1?0:g-d)){if(d===-1){d=g
}if(g-d+1===e){return d*c}}else{if(d!==-1){g-=g-d}d=-1}}}else{if(j+e>b){j=b-e}for(g=j;
g>=0;g--){var a=true;for(var h=0;h<e;h++){if(m(f,g+h)!==m(k,h)){a=false;break}}if(a){return g
}}}return -1}cH.prototype.includes=function bS(a,c,b){return this.indexOf(a,c,b)!==-1
};cH.prototype.indexOf=function bp(a,c,b){return b3(this,a,c,b,true)};cH.prototype.lastIndexOf=function cz(a,c,b){return b3(this,a,c,b,false)
};function bj(d,e,g,h){g=Number(g)||0;var b=d.length-g;if(!h){h=b}else{h=Number(h);
if(h>b){h=b}}var a=e.length;if(h>a/2){h=a/2}for(var c=0;c<h;++c){var f=parseInt(e.substr(c*2,2),16);
if(bw(f)){return c}d[g+c]=f}return c}function bA(c,d,a,b){return bD(cr(d,c.length-a),c,a,b)
}function cM(c,d,a,b){return bD(ce(d),c,a,b)}function a7(c,d,a,b){return cM(c,d,a,b)
}function bG(c,d,a,b){return bD(cf(d),c,a,b)}function bf(c,d,a,b){return bD(bW(d,c.length-a),c,a,b)
}cH.prototype.write=function co(f,b,c,d){if(b===undefined){d="utf8";c=this.length;
b=0}else{if(c===undefined&&typeof b==="string"){d=b;c=this.length;b=0}else{if(isFinite(b)){b=b>>>0;
if(isFinite(c)){c=c>>>0;if(d===undefined){d="utf8"}}else{d=c;c=undefined}}else{throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
}}}var e=this.length-b;if(c===undefined||c>e){c=e}if((f.length>0&&(c<0||b<0))||b>this.length){throw new RangeError("Attempt to write outside buffer bounds")
}if(!d){d="utf8"}var a=false;for(;;){switch(d){case"hex":return bj(this,f,b,c);
case"utf8":case"utf-8":return bA(this,f,b,c);case"ascii":return cM(this,f,b,c);
case"latin1":case"binary":return a7(this,f,b,c);case"base64":return bG(this,f,b,c);
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return bf(this,f,b,c);default:if(a){throw new TypeError("Unknown encoding: "+d)
}d=(""+d).toLowerCase();a=true}}};cH.prototype.toJSON=function a8(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}
};function cD(b,a,c){if(a===0&&c===b.length){return cF.fromByteArray(b)}else{return cF.fromByteArray(b.slice(a,c))
}}function cv(j,k,h){h=Math.min(j.length,h);var e=[];var g=k;while(g<h){var c=j[g];
var d=null;var a=(c>239)?4:(c>223)?3:(c>191)?2:1;if(g+a<=h){var b,l,f,i;switch(a){case 1:if(c<128){d=c
}break;case 2:b=j[g+1];if((b&192)===128){i=(c&31)<<6|(b&63);if(i>127){d=i}}break;
case 3:b=j[g+1];l=j[g+2];if((b&192)===128&&(l&192)===128){i=(c&15)<<12|(b&63)<<6|(l&63);
if(i>2047&&(i<55296||i>57343)){d=i}}break;case 4:b=j[g+1];l=j[g+2];f=j[g+3];if((b&192)===128&&(l&192)===128&&(f&192)===128){i=(c&15)<<18|(b&63)<<12|(l&63)<<6|(f&63);
if(i>65535&&i<1114112){d=i}}}}if(d===null){d=65533;a=1}else{if(d>65535){d-=65536;
e.push(d>>>10&1023|55296);d=56320|d&1023}}e.push(d);g+=a}return ch(e)}var bF=4096;
function ch(c){var d=c.length;if(d<=bF){return String.fromCharCode.apply(String,c)
}var a="";var b=0;while(b<d){a+=String.fromCharCode.apply(String,c.slice(b,b+=bF))
}return a}function bU(c,a,e){var d="";e=Math.min(c.length,e);for(var b=a;b<e;++b){d+=String.fromCharCode(c[b]&127)
}return d}function b9(c,a,e){var d="";e=Math.min(c.length,e);for(var b=a;b<e;++b){d+=String.fromCharCode(c[b])
}return d}function cj(c,a,e){var f=c.length;if(!a||a<0){a=0}if(!e||e<0||e>f){e=f
}var d="";for(var b=a;b<e;++b){d+=bO(c[b])}return d}function ca(d,a,e){var f=d.slice(a,e);
var b="";for(var c=0;c<f.length;c+=2){b+=String.fromCharCode(f[c]+(f[c+1]*256))
}return b}cH.prototype.slice=function bb(a,c){var d=this.length;a=~~a;c=c===undefined?d:~~c;
if(a<0){a+=d;if(a<0){a=0}}else{if(a>d){a=d}}if(c<0){c+=d;if(c<0){c=0}}else{if(c>d){c=d
}}if(c<a){c=a}var b=this.subarray(a,c);b.__proto__=cH.prototype;return b};function bZ(a,c,b){if((a%1)!==0||a<0){throw new RangeError("offset is not uint")
}if(a+c>b){throw new RangeError("Trying to access beyond buffer length")}}cH.prototype.readUIntLE=function bq(a,f,c){a=a>>>0;
f=f>>>0;if(!c){bZ(a,f,this.length)}var b=this[a];var d=1;var e=0;while(++e<f&&(d*=256)){b+=this[a+e]*d
}return b};cH.prototype.readUIntBE=function bN(a,e,c){a=a>>>0;e=e>>>0;if(!c){bZ(a,e,this.length)
}var b=this[a+ --e];var d=1;while(e>0&&(d*=256)){b+=this[a+ --e]*d}return b};cH.prototype.readUInt8=function bn(a,b){a=a>>>0;
if(!b){bZ(a,1,this.length)}return this[a]};cH.prototype.readUInt16LE=function bk(a,b){a=a>>>0;
if(!b){bZ(a,2,this.length)}return this[a]|(this[a+1]<<8)};cH.prototype.readUInt16BE=function cA(a,b){a=a>>>0;
if(!b){bZ(a,2,this.length)}return(this[a]<<8)|this[a+1]};cH.prototype.readUInt32LE=function bL(a,b){a=a>>>0;
if(!b){bZ(a,4,this.length)}return((this[a])|(this[a+1]<<8)|(this[a+2]<<16))+(this[a+3]*16777216)
};cH.prototype.readUInt32BE=function cL(a,b){a=a>>>0;if(!b){bZ(a,4,this.length)
}return(this[a]*16777216)+((this[a+1]<<16)|(this[a+2]<<8)|this[a+3])};cH.prototype.readIntLE=function b7(a,f,c){a=a>>>0;
f=f>>>0;if(!c){bZ(a,f,this.length)}var b=this[a];var d=1;var e=0;while(++e<f&&(d*=256)){b+=this[a+e]*d
}d*=128;if(b>=d){b-=Math.pow(2,8*f)}return b};cH.prototype.readIntBE=function ba(a,f,c){a=a>>>0;
f=f>>>0;if(!c){bZ(a,f,this.length)}var e=f;var d=1;var b=this[a+ --e];while(e>0&&(d*=256)){b+=this[a+ --e]*d
}d*=128;if(b>=d){b-=Math.pow(2,8*f)}return b};cH.prototype.readInt8=function cx(a,b){a=a>>>0;
if(!b){bZ(a,1,this.length)}if(!(this[a]&128)){return(this[a])}return((255-this[a]+1)*-1)
};cH.prototype.readInt16LE=function bT(a,c){a=a>>>0;if(!c){bZ(a,2,this.length)}var b=this[a]|(this[a+1]<<8);
return(b&32768)?b|4294901760:b};cH.prototype.readInt16BE=function bR(a,c){a=a>>>0;
if(!c){bZ(a,2,this.length)}var b=this[a+1]|(this[a]<<8);return(b&32768)?b|4294901760:b
};cH.prototype.readInt32LE=function cp(a,b){a=a>>>0;if(!b){bZ(a,4,this.length)}return(this[a])|(this[a+1]<<8)|(this[a+2]<<16)|(this[a+3]<<24)
};cH.prototype.readInt32BE=function bv(a,b){a=a>>>0;if(!b){bZ(a,4,this.length)}return(this[a]<<24)|(this[a+1]<<16)|(this[a+2]<<8)|(this[a+3])
};cH.prototype.readFloatLE=function bo(a,b){a=a>>>0;if(!b){bZ(a,4,this.length)}return bt.read(this,a,true,23,4)
};cH.prototype.readFloatBE=function cG(a,b){a=a>>>0;if(!b){bZ(a,4,this.length)}return bt.read(this,a,false,23,4)
};cH.prototype.readDoubleLE=function bu(a,b){a=a>>>0;if(!b){bZ(a,8,this.length)
}return bt.read(this,a,true,52,8)};cH.prototype.readDoubleBE=function b6(a,b){a=a>>>0;
if(!b){bZ(a,8,this.length)}return bt.read(this,a,false,52,8)};function cy(e,b,a,c,f,d){if(!cH.isBuffer(e)){throw new TypeError('"buffer" argument must be a Buffer instance')
}if(b>f||b<d){throw new RangeError('"value" argument is out of bounds')}if(a+c>e.length){throw new RangeError("Index out of range")
}}cH.prototype.writeUIntLE=function b4(c,g,e,a){c=+c;g=g>>>0;e=e>>>0;if(!a){var f=Math.pow(2,8*e)-1;
cy(this,c,g,e,f,0)}var b=1;var d=0;this[g]=c&255;while(++d<e&&(b*=256)){this[g+d]=(c/b)&255
}return g+e};cH.prototype.writeUIntBE=function b1(c,g,e,a){c=+c;g=g>>>0;e=e>>>0;
if(!a){var f=Math.pow(2,8*e)-1;cy(this,c,g,e,f,0)}var d=e-1;var b=1;this[g+d]=c&255;
while(--d>=0&&(b*=256)){this[g+d]=(c/b)&255}return g+e};cH.prototype.writeUInt8=function cJ(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,1,255,0)}this[a]=(c&255);return a+1};cH.prototype.writeUInt16LE=function bz(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,2,65535,0)}this[a]=(c&255);this[a+1]=(c>>>8);return a+2
};cH.prototype.writeUInt16BE=function br(c,a,b){c=+c;a=a>>>0;if(!b){cy(this,c,a,2,65535,0)
}this[a]=(c>>>8);this[a+1]=(c&255);return a+2};cH.prototype.writeUInt32LE=function b5(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,4,4294967295,0)}this[a+3]=(c>>>24);this[a+2]=(c>>>16);
this[a+1]=(c>>>8);this[a]=(c&255);return a+4};cH.prototype.writeUInt32BE=function a6(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,4,4294967295,0)}this[a]=(c>>>24);this[a+1]=(c>>>16);
this[a+2]=(c>>>8);this[a+3]=(c&255);return a+4};cH.prototype.writeIntLE=function bg(b,g,e,h){b=+b;
g=g>>>0;if(!h){var f=Math.pow(2,(8*e)-1);cy(this,b,g,e,f-1,-f)}var d=0;var a=1;
var c=0;this[g]=b&255;while(++d<e&&(a*=256)){if(b<0&&c===0&&this[g+d-1]!==0){c=1
}this[g+d]=((b/a)>>0)-c&255}return g+e};cH.prototype.writeIntBE=function cs(b,g,e,h){b=+b;
g=g>>>0;if(!h){var f=Math.pow(2,(8*e)-1);cy(this,b,g,e,f-1,-f)}var d=e-1;var a=1;
var c=0;this[g+d]=b&255;while(--d>=0&&(a*=256)){if(b<0&&c===0&&this[g+d+1]!==0){c=1
}this[g+d]=((b/a)>>0)-c&255}return g+e};cH.prototype.writeInt8=function cd(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,1,127,-128)}if(c<0){c=255+c+1}this[a]=(c&255);return a+1
};cH.prototype.writeInt16LE=function cb(c,a,b){c=+c;a=a>>>0;if(!b){cy(this,c,a,2,32767,-32768)
}this[a]=(c&255);this[a+1]=(c>>>8);return a+2};cH.prototype.writeInt16BE=function bc(c,a,b){c=+c;
a=a>>>0;if(!b){cy(this,c,a,2,32767,-32768)}this[a]=(c>>>8);this[a+1]=(c&255);return a+2
};cH.prototype.writeInt32LE=function cE(c,a,b){c=+c;a=a>>>0;if(!b){cy(this,c,a,4,2147483647,-2147483648)
}this[a]=(c&255);this[a+1]=(c>>>8);this[a+2]=(c>>>16);this[a+3]=(c>>>24);return a+4
};cH.prototype.writeInt32BE=function bH(c,a,b){c=+c;a=a>>>0;if(!b){cy(this,c,a,4,2147483647,-2147483648)
}if(c<0){c=4294967295+c+1}this[a]=(c>>>24);this[a+1]=(c>>>16);this[a+2]=(c>>>8);
this[a+3]=(c&255);return a+4};function bI(e,b,a,c,f,d){if(a+c>e.length){throw new RangeError("Index out of range")
}if(a<0){throw new RangeError("Index out of range")}}function bd(e,d,a,b,c){d=+d;
a=a>>>0;if(!c){bI(e,d,a,4,3.4028234663852886e+38,-3.4028234663852886e+38)}bt.write(e,d,a,b,23,4);
return a+4}cH.prototype.writeFloatLE=function bm(c,a,b){return bd(this,c,a,true,b)
};cH.prototype.writeFloatBE=function cC(c,a,b){return bd(this,c,a,false,b)};function bh(e,d,a,b,c){d=+d;
a=a>>>0;if(!c){bI(e,d,a,8,1.7976931348623157e+308,-1.7976931348623157e+308)}bt.write(e,d,a,b,52,8);
return a+8}cH.prototype.writeDoubleLE=function bY(c,a,b){return bh(this,c,a,true,b)
};cH.prototype.writeDoubleBE=function cm(c,a,b){return bh(this,c,a,false,b)};cH.prototype.copy=function a5(c,b,a,e){if(!cH.isBuffer(c)){throw new TypeError("argument should be a Buffer")
}if(!a){a=0}if(!e&&e!==0){e=this.length}if(b>=c.length){b=c.length}if(!b){b=0}if(e>0&&e<a){e=a
}if(e===a){return 0}if(c.length===0||this.length===0){return 0}if(b<0){throw new RangeError("targetStart out of bounds")
}if(a<0||a>=this.length){throw new RangeError("Index out of range")}if(e<0){throw new RangeError("sourceEnd out of bounds")
}if(e>this.length){e=this.length}if(c.length-b<e-a){e=c.length-b+a}var f=e-a;if(this===c&&typeof Uint8Array.prototype.copyWithin==="function"){this.copyWithin(b,a,e)
}else{if(this===c&&a<b&&b<e){for(var d=f-1;d>=0;--d){c[d+b]=this[d+a]}}else{Uint8Array.prototype.set.call(c,this.subarray(a,e),b)
}}return f};cH.prototype.fill=function a9(h,g,d,a){if(typeof h==="string"){if(typeof g==="string"){a=g;
g=0;d=this.length}else{if(typeof d==="string"){a=d;d=this.length}}if(a!==undefined&&typeof a!=="string"){throw new TypeError("encoding must be a string")
}if(typeof a==="string"&&!cH.isEncoding(a)){throw new TypeError("Unknown encoding: "+a)
}if(h.length===1){var b=h.charCodeAt(0);if((a==="utf8"&&b<128)||a==="latin1"){h=b
}}}else{if(typeof h==="number"){h=h&255}}if(g<0||this.length<g||this.length<d){throw new RangeError("Out of range index")
}if(d<=g){return this}g=g>>>0;d=d===undefined?this.length:d>>>0;if(!h){h=0}var c;
if(typeof h==="number"){for(c=g;c<d;++c){this[c]=h}}else{var e=cH.isBuffer(h)?h:new cH(h,a);
var f=e.length;if(f===0){throw new TypeError('The value "'+h+'" is invalid for argument "value"')
}for(c=0;c<d-g;++c){this[c+g]=e[c%f]}}return this};var cI=/[^+/0-9A-Za-z-_]/g;function bl(a){a=a.split("=")[0];
a=a.trim().replace(cI,"");if(a.length<2){return""}while(a.length%4!==0){a=a+"="
}return a}function bO(a){if(a<16){return"0"+a.toString(16)}return a.toString(16)
}function cr(c,e){e=e||Infinity;var d;var g=c.length;var a=null;var f=[];for(var b=0;
b<g;++b){d=c.charCodeAt(b);if(d>55295&&d<57344){if(!a){if(d>56319){if((e-=3)>-1){f.push(239,191,189)
}continue}else{if(b+1===g){if((e-=3)>-1){f.push(239,191,189)}continue}}a=d;continue
}if(d<56320){if((e-=3)>-1){f.push(239,191,189)}a=d;continue}d=(a-55296<<10|d-56320)+65536
}else{if(a){if((e-=3)>-1){f.push(239,191,189)}}}a=null;if(d<128){if((e-=1)<0){break
}f.push(d)}else{if(d<2048){if((e-=2)<0){break}f.push(d>>6|192,d&63|128)}else{if(d<65536){if((e-=3)<0){break
}f.push(d>>12|224,d>>6&63|128,d&63|128)}else{if(d<1114112){if((e-=4)<0){break}f.push(d>>18|240,d>>12&63|128,d>>6&63|128,d&63|128)
}else{throw new Error("Invalid code point")}}}}}return f}function ce(a){var c=[];
for(var b=0;b<a.length;++b){c.push(a.charCodeAt(b)&255)}return c}function bW(a,e){var g,d,b;
var f=[];for(var c=0;c<a.length;++c){if((e-=2)<0){break}g=a.charCodeAt(c);d=g>>8;
b=g%256;f.push(b);f.push(d)}return f}function cf(a){return cF.toByteArray(bl(a))
}function bD(b,a,c,d){for(var e=0;e<d;++e){if((e+c>=a.length)||(e>=b.length)){break
}a[e+c]=b[e]}return e}function bQ(a){return a instanceof ArrayBuffer||(a!=null&&a.constructor!=null&&a.constructor.name==="ArrayBuffer"&&typeof a.byteLength==="number")
}function bw(a){return a!==a}},{"base64-js":140,ieee754:141}],140:[function(y,B,v){v.byteLength=i;
v.toByteArray=x;v.fromByteArray=D;var z=[];var s=[];var r=typeof Uint8Array!=="undefined"?Uint8Array:Array;
var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var t=0,q=C.length;
t<q;++t){z[t]=C[t];s[C.charCodeAt(t)]=t}s["-".charCodeAt(0)]=62;s["_".charCodeAt(0)]=63;
function A(b){var a=b.length;if(a%4>0){throw new Error("Invalid string. Length must be a multiple of 4")
}return b[a-2]==="="?2:b[a-1]==="="?1:0}function i(a){return(a.length*3/4)-A(a)
}function x(b){var c,e,d,a,f;var g=b.length;a=A(b);f=new r((g*3/4)-a);e=a>0?g-4:g;
var h=0;for(c=0;c<e;c+=4){d=(s[b.charCodeAt(c)]<<18)|(s[b.charCodeAt(c+1)]<<12)|(s[b.charCodeAt(c+2)]<<6)|s[b.charCodeAt(c+3)];
f[h++]=(d>>16)&255;f[h++]=(d>>8)&255;f[h++]=d&255}if(a===2){d=(s[b.charCodeAt(c)]<<2)|(s[b.charCodeAt(c+1)]>>4);
f[h++]=d&255}else{if(a===1){d=(s[b.charCodeAt(c)]<<10)|(s[b.charCodeAt(c+1)]<<4)|(s[b.charCodeAt(c+2)]>>2);
f[h++]=(d>>8)&255;f[h++]=d&255}}return f}function u(a){return z[a>>18&63]+z[a>>12&63]+z[a>>6&63]+z[a&63]
}function w(e,a,f){var b;var d=[];for(var c=a;c<f;c+=3){b=((e[c]<<16)&16711680)+((e[c+1]<<8)&65280)+(e[c+2]&255);
d.push(u(b))}return d.join("")}function D(e){var g;var d=e.length;var c=d%3;var a="";
var h=[];var b=16383;for(var f=0,j=d-c;f<j;f+=b){h.push(w(e,f,(f+b)>j?j:(f+b)))
}if(c===1){g=e[d-1];a+=z[g>>2];a+=z[(g<<4)&63];a+="=="}else{if(c===2){g=(e[d-2]<<8)+(e[d-1]);
a+=z[g>>10];a+=z[(g>>4)&63];a+=z[(g<<2)&63];a+="="}}h.push(a);return h.join("")
}},{}],141:[function(d,f,e){e.read=function(m,s,y,z,b){var a,w;var x=b*8-z-1;var c=(1<<x)-1;
var A=c>>1;var C=-7;var i=y?(b-1):0;var D=y?-1:1;var B=m[s+i];i+=D;a=B&((1<<(-C))-1);
B>>=(-C);C+=x;for(;C>0;a=a*256+m[s+i],i+=D,C-=8){}w=a&((1<<(-C))-1);a>>=(-C);C+=z;
for(;C>0;w=w*256+m[s+i],i+=D,C-=8){}if(a===0){a=1-A}else{if(a===c){return w?NaN:((B?-1:1)*Infinity)
}else{w=w+Math.pow(2,z);a=a-A}}return(B?-1:1)*w*Math.pow(2,a-z)};e.write=function(i,E,m,A,B,a){var H,y,F;
var z=a*8-B-1;var b=(1<<z)-1;var C=b>>1;var s=(B===23?Math.pow(2,-24)-Math.pow(2,-77):0);
var c=A?0:(a-1);var G=A?1:-1;var D=E<0||(E===0&&1/E<0)?1:0;E=Math.abs(E);if(isNaN(E)||E===Infinity){y=isNaN(E)?1:0;
H=b}else{H=Math.floor(Math.log(E)/Math.LN2);if(E*(F=Math.pow(2,-H))<1){H--;F*=2
}if(H+C>=1){E+=s/F}else{E+=s*Math.pow(2,1-C)}if(E*F>=2){H++;F/=2}if(H+C>=b){y=0;
H=b}else{if(H+C>=1){y=(E*F-1)*Math.pow(2,B);H=H+C}else{y=E*Math.pow(2,C-1)*Math.pow(2,B);
H=0}}}for(;B>=8;i[m+c]=y&255,c+=G,y/=256,B-=8){}H=(H<<B)|y;z+=B;for(;z>0;i[m+c]=H&255,c+=G,H/=256,z-=8){}i[m+c-G]|=D*128
}},{}],142:[function(n,o,m){n("@marcom/ac-polyfills/Object/assign");var l="data-films-modal-link";
var j="data-films-inline-target";var p=n("./factory/createFilms");var r=true;var k;
function q(h,u){if(!(this instanceof q)&&r){r=false;k=setTimeout(q,1);return function(s,t){clearTimeout(k);
return new q(s,t)}}h=h||document;var b=Array.prototype.slice.call(h.querySelectorAll("["+l+"]"));
var i=Array.prototype.slice.call(h.querySelectorAll("["+j+"]"));var f;if(b.length){f=p(b,Object.assign(u||{},{modal:true}))
}else{if(i.length){var e={};var g=0;var d=i.length;for(;g<d;g++){var v=i[g];var c=v.getAttribute(j);
if(!e[c]){e[c]=[]}e[c].push(v)}for(var a in e){if(e.hasOwnProperty(a)){f=p(e[a],Object.assign(u||{},{targetElement:h.querySelector("#"+a)}))
}}}}return f}o.exports=q()},{"./factory/createFilms":147,"@marcom/ac-polyfills/Object/assign":72}],143:[function(u,v,t){var p;
try{p=u("@marcom/ac-analytics")}catch(n){}var r=u("@marcom/ac-useragent").browser;
var q=r.ie||r.edge;var e=u("@marcom/ac-video/event-emitter-shim/EventEmitterShim");
var o=function(a,c,d){if(d){var b=function(){c.apply(d,arguments)};e.prototype.once.apply(this,[a,b])
}else{e.prototype.once.apply(this,arguments)}};function m(a,b,c){this.player=a;
this.sources={};this.currentStubPlayer=null;this.playerType="";this.videoType="";
this.options=b;if(c){this._bindAnchors(c)}}var s=m.prototype;s._bindAnchors=function(c){var a=0;
var b=c.length;for(;a<b;a++){this._bindAnchorForAnalytics(c[a])}};s.activate=function(){this._onPlay=this._onPlay.bind(this);
this._onEnded=this._onEnded.bind(this);this._onTimeupdate=this._onTimeupdate.bind(this);
this._onTexttrackshow=this._onTexttrackshow.bind(this);this._onLoadStart=this._onLoadStart.bind(this);
this.setCurrentStubPlayer=this.setCurrentStubPlayer.bind(this);if(q){this.player.on("playing",this._onPlay)
}else{this.player.on("play",this._onPlay)}this.player.on("ended",this._onEnded);
this.player.on("loadstart",this._onLoadStart);this.player.on("timeupdate",this._onTimeupdate);
this.player.on("texttrackshow",this._onTexttrackshow);this.player.on("durationchange",this.setCurrentStubPlayer)
};s.deactivate=function(){if(q){this.player.off("playing",this._onPlay)}else{this.player.off("play",this._onPlay)
}this.player.off("ended",this._onEnded);this.player.off("timeupdate",this._onTimeupdate);
this.player.off("texttrackshow",this._onTexttrackshow);this.player.off("durationchange",this.setCurrentStubPlayer)
};s._bindAnchorForAnalytics=function(b){var c;var a;if(b){if(this.sources[b.id]){return
}c=this._createStubPlayer(b);a=b.getAttribute("data-"+this.options.dataAttribute);
if(!a){c.videoId=b.id}this.sources[b.id]={stubPlayer:c,observer:this._createObserver(c)}
}};s.addSourceObject=s._bindAnchorForAnalytics;s.setCurrentStubPlayer=function(){var a;
var c=this.player.el;var d=c.getAttribute("data-"+this.options.dataAttribute);var b=this._getCurrentSourceObject(d);
if(b&&b.stubPlayer){this.currentStubPlayer=b.stubPlayer;this.playerType="html5";
a=this.player.getCurrentSrc();if(a&&a.attributes&&a.attributes.src){this.videoType=a.attributes.src.value.split(".").pop()
}}};s.destroy=function(){this.deactivate();this.player=null;this.sources=null;this.currentStubPlayer=null;
this.options=null};s._onPlay=function(){this.setCurrentStubPlayer();if(!this._started){this._proxyEvent("play");
this._started=true}};s._onLoadStart=function(){this._started=false};s._onEnded=function(){this._started=false;
this._proxyEvent("ended")};s._onTimeupdate=function(){this._proxyEvent("timeupdate");
if(this._started&&this.player.getCurrentTime()===0&&this.player.getPaused()){this._started=false
}};s._onTexttrackshow=function(){this._proxyEvent("captions-enabled")};s._getSourceObjectBySrcObjId=function(a){return this.sources[a]||null
};s._getCurrentSourceObject=function(b){var a;if(b){a=this._getSourceObjectBySrcObjId(b)
}return a};s._createStubPlayer=function(b){var a=new e();a.once=o;a.el=b;return a
};s._getEventData=function(){return{currentTime:this.player.getCurrentTime(),playerType:(this.playerType||"html5"),videoType:(this.videoType||null)}
};s._createObserver=function(a){var b;if(p&&p.observer&&p.observer.Video){b=new p.observer.Video(a,{dataAttribute:this.options.dataAttribute})
}return b};s._proxyEvent=function(a){if(this.currentStubPlayer){this.currentStubPlayer.trigger(a,this._getEventData())
}};v.exports=m},{"@marcom/ac-analytics":"@marcom/ac-analytics","@marcom/ac-useragent":135,"@marcom/ac-video/event-emitter-shim/EventEmitterShim":301}],144:[function(p,o,i){var n=p("../windowload/windowLoad");
var l=p("../touchclick/TouchClick");var m=p("@marcom/ac-useragent");var j=(m.os.ios||m.os.android);
o.exports=function k(b,a,d,c){var e=l.create(b);e.on("click",function(){a(b)});
b.addEventListener("TriggerAnchor",function(){a(b)});if(c&&b.id){c.createRoute(b.id,function(){n(function(){a(b,!j)
})})}}},{"../touchclick/TouchClick":154,"../windowload/windowLoad":155,"@marcom/ac-useragent":135}],145:[function(x,B,v){var A=x("@marcom/ac-router").Router;
var z=x("@marcom/ac-video/player/factory/createShareablePlayer");var G=x("@marcom/ac-video/optimizeVideoUrl");
var r=x("@marcom/ac-useragent");var t=x("./bindAnchor");var F=x("./createClickHandler");
var w=x("./createModalLink");var C=x("./createHandheldModalLink");var u=x("./createInlineLink");
var H="data-films-options";var D=x("@marcom/ac-feature/isHandheld")();var y=r.os.ios;
var E={controls:true,urlOptimizer:G};B.exports=function s(a,c){c=c||{};c=Object.assign({},E,c);
var e;a.forEach(function(j){if(j.hasAttribute(H)){var i=JSON.parse(j.getAttribute(H));
if(i.closeOnEnd===false&&!c.closeOnEnd){c.closeOnEnd=false}}});if(!c.maxWidth){c.maxWidth=1280
}var b=z(c);var d;e=new A({hashChange:true,pushState:false});if(c.modal&&(!D||!y)){d=w(b,c)
}else{if(c.modal){d=C(b,document.body,c)}else{d=u(b,c)}}var f=d.play.bind(d);var g=function(k){var i=0;
var j=a.length;for(;i<j;i++){if(a[i].id===k||a[i]===k){f(a[i].href)}}};var h=F({player:b,playHandler:f,attr:"data-"+c.dataAttribute});
a.forEach(function(i){t(i,h,f,e)});e.start();return{play:g,player:b,modalVideo:d.modal}
}},{"./bindAnchor":144,"./createClickHandler":146,"./createHandheldModalLink":148,"./createInlineLink":149,"./createModalLink":150,"@marcom/ac-feature/isHandheld":5,"@marcom/ac-router":132,"@marcom/ac-useragent":135,"@marcom/ac-video/optimizeVideoUrl":302,"@marcom/ac-video/player/factory/createShareablePlayer":307}],146:[function(m,l,n){var i="data-films-options";
var k="data-films-modal-label";var j="Video Player";l.exports=function h(a){return function(b,c){var f=b.getAttribute(i);
var d;if(f){d=JSON.parse(f)}else{d=null}if(d&&d.endState){d.endState.items.forEach(function(g){if(g.url&&g.url.indexOf("#")===0){var p=document.querySelector(g.url);
g.onclick=function(){p.dispatchEvent(new CustomEvent("TriggerAnchor"))}}})}if(d&&d.poster){a.player.setPoster(d.poster)
}else{a.player.setPoster(null)}var e=b.getAttribute(k)||(d&&d.modalLabel)||a.player.options.modalLabel||j;
a.player.el.setAttribute(a.attr,b.getAttribute(a.attr)||b.id);a.playHandler(b.href,d,c,e)
}}},{}],147:[function(n,m,h){var k=n("./bindAnchors");var l=n("../analytics/AnalyticsTranslator");
var j={dataAttribute:"analytics-video-id",analytics:true};m.exports=function i(b,c){c=c||{};
c=Object.assign({},j,c);var a=k(b,c);if(c.analytics){var d=new l(a.player,c,b);
d.activate()}return a}},{"../analytics/AnalyticsTranslator":143,"./bindAnchors":145}],148:[function(l,k,h){var g="ac-films-handheld-player";
var i="player-fullscreen";k.exports=function j(a,b,c){a.el.classList.add(g);var d=function(n,e){var f=function(){if(!a.getPaused()){a.pause()
}a.el.classList.remove(i)};a.el.classList.add(i);a.once("ended",f);a.once("exitfullscreen",f);
a.load(n);if(e!==false){a.play()}};b.appendChild(a.el);return{play:d,player:a}}
},{}],149:[function(e,h,f){h.exports=function g(a,b){var c=b.targetElement;var d=function(l,k){a.load(l,null,0,k);
a.play()};b.playHandler=d;if(c){c.appendChild(a.el)}return{play:d,player:a}}},{}],150:[function(q,s,o){var t=q("@marcom/ac-modal").createFullViewportModal;
var l=q("@marcom/ac-useragent");var r=l.os.ios||l.os.android;var n="ac-films-modal-mobile";
var k=q("./link/ModalLink");var m="ac-modal-video";s.exports=function p(a,b){b=b||{};
var c=document.createElement("div");c.classList.add("ac-player-container");if(r){c.classList.add(n)
}c.appendChild(a.el);var d=t(c);d.modalElement.classList.add(m);var e=new k({player:a,modal:d,closeOnEnd:b.closeOnEnd});
return e}},{"./link/ModalLink":151,"@marcom/ac-modal":62,"@marcom/ac-useragent":135}],151:[function(B,I,s){var u="-tft-";
var A=/_([0-9]+)x([0-9]+)/;var D="ac-video-cinematic-aspect-ratio";var E="ac-video-square-aspect-ratio";
var z="ac-video-vertical-aspect-ratio";var v="ac-video-19x9-aspect-ratio";var y="ac-video-9x19-aspect-ratio";
var w="ac-modal-video-pip";var t="pictureinpicture:change";var F="has-modal";var G=B("../../resize/ResizeHandler");
var H=B("@marcom/ac-video/utils/urlOptimizer/19X9AssetSizes");var C=function(a,b){return a.find(function(c){return(c.width===b.width)&&(c.height=b.height)||((c.width===b.height)&&(c.height=b.width))
})};var J=function(a){this.modal=a.modal;this.player=a.player;this._resizeHandler=new G({player:this.player,modal:this.modal});
this._closeOnEnd=(a.closeOnEnd!==undefined)?a.closeOnEnd:true;this._ended=false;
this._pauseTime=0;this._playing=false;this._initialize()};var x=J.prototype;x._initialize=function(){this._bindMethods();
this.player.on("ended",this._onEnded);this.player.on("pause",this._onPaused);this.modal.on("open",this._onOpen);
if(this.player.supportsPictureInPicture()){this.player.on(t,this._onPipModeChanged)
}};x._bindMethods=function(){this._onEnded=this._onEnded.bind(this);this._onPipModeChanged=this._onPipModeChanged.bind(this);
this._onPaused=this._onPaused.bind(this);this._onModalWillClose=this._onModalWillClose.bind(this);
this._onOpen=this._onOpen.bind(this)};x._onOpen=function(){this.player.refreshSize()
};x._onPaused=function(){this._pauseTime=Date.now()};x._onEnded=function(){this._ended=true;
if(!this.player.isPictureInPicture()&&this._closeOnEnd){this.modal.close()}else{if(this.player.isPictureInPicture()){this.player.setPictureInPicture(false);
this.modal.modalElement.classList.remove(w);if(!this._closeOnEnd){this.modal.open();
this._bindWillClose()}}}};x._onPipModeChanged=function(){if(this._ended){return
}if(this.player.isPictureInPicture()&&this._isModalOpen()){this._unBindWillClose();
this.modal.modalElement.classList.add(w);this.modal.close()}else{if(!this._isModalOpen()){this.modal.modalElement.classList.remove(w);
if(!this._pauseTime||(Date.now()-this._pauseTime)>400){this._bindWillClose();this.modal.open()
}else{this._resetVideo()}}}};x._resetVideo=function(){this.player.pause();this.player.setCurrentTime(0)
};x._onModalWillClose=function(){this._unBindWillClose();this._resetVideo();this.player.setPictureInPicture(false);
this.modal.modalElement.classList.remove(w)};x._clearAspectRatio=function(){this.player.el.parentElement.classList.remove(D);
this.player.el.parentElement.classList.remove(E);this.player.el.parentElement.classList.remove(z);
this.player.el.parentElement.classList.remove(v);this.player.el.parentElement.classList.remove(y)
};x._set19X9Mode=function(){this.player.el.parentElement.classList.add(v)};x._set9X19Mode=function(){this.player.el.parentElement.classList.add(y)
};x._setCinematicMode=function(){this.player.el.parentElement.classList.add(D)};
x._setSquareVideo=function(){this.player.el.parentElement.classList.add(E)};x._setVerticalVideo=function(){this.player.el.parentElement.classList.add(z)
};x._resetPiPVideo=function(){var a=this.player.getVisibleTextTracks();a.forEach(function(b){b.mode="hidden"
});this._resetVideo();a.forEach(function(b){b.mode="showing"})};x.play=function(d,c,a,e){this._ended=false;
this._clearAspectRatio();if(d.match(u)){this._setCinematicMode()}else{if(A.test(d)){var b=parseInt(RegExp.$1,10);
var f=parseInt(RegExp.$2,10);if(C(H,{width:b,height:f})){if(f>b){this._set9X19Mode(true)
}else{this._set19X9Mode(true)}}else{if(f>b){this._setVerticalVideo(true)}else{if(f===b){this._setSquareVideo(true)
}}}}}this.modal.modalElement.setAttribute("aria-label",e);this.player.load(d,null,0,Object.assign({},c,{maxWidth:window.innerWidth}));
if(!this.player.isPictureInPicture()){this.modal.open();this._bindWillClose()}else{this._resetPiPVideo()
}if(a!==false){this.player.play()}};x._bindWillClose=function(){this.modal.on("willclose",this._onModalWillClose)
};x._unBindWillClose=function(){this.modal.off("willclose",this._onModalWillClose)
};x._isModalOpen=function(){return document.documentElement.classList.contains(F)
};x.destroy=function(){this.player.off("ended",this._onEnded);this.player.off("paused",this._onPaused);
this.player.off(t,this._onPipModeChanged);this._unBindWillClose();this._resizeHandler.destroy();
this.modal.destroy();this.player.destroy()};I.exports=J},{"../../resize/ResizeHandler":153,"@marcom/ac-video/utils/urlOptimizer/19X9AssetSizes":356}],152:[function(d,f,e){d("../AutoFilms")()
},{"../AutoFilms":142}],153:[function(p,o,i){var k=/_([0-9]+)x([0-9]+)/;var m=p("@marcom/ac-useragent");
var j=(m.os.ios||m.os.android);function l(a){this._modal=a.modal;this._player=a.player;
this._mediaElement=a.player.getMediaElement();this._posterEl=this._player.el.querySelector(".ac-video-poster img");
this._playerContainer=this._player.el.parentElement;this._bindMethods();this._addEventListeners();
this._calcAspectRatio()}var n=l.prototype;n._bindMethods=function(){this._onLoadStart=this._onLoadStart.bind(this);
this._onResize=this._onResize.bind(this);this._fullScreenChange=this._fullScreenChange.bind(this);
this._calcAspectRatio=this._calcAspectRatio.bind(this);this._addResizeListeners=this._addResizeListeners.bind(this);
this._removeResizeListeners=this._removeResizeListeners.bind(this);this._onModalOpen=this._onModalOpen.bind(this)
};n._addEventListeners=function(){if(this._posterEl){this._posterEl.addEventListener("load",this._calcAspectRatio)
}this._modal.on("willopen",this._addResizeListeners);this._modal.on("open",this._onModalOpen);
this._modal.on("close",this._removeResizeListeners)};n._onModalOpen=function(){if(this._loadStarted){this._onResize();
this._player.el.style.display="";this._player.el.style.opacity=""}};n._addResizeListeners=function(){this._player.el.style.display="block";
this._player.el.style.opacity=0;window.addEventListener("resize",this._onResize);
window.addEventListener("orientationchange",this._onResize);this._player.on("loadstart",this._onLoadStart);
this._player.on("loadeddata",this._calcAspectRatio);this._player.on("fullscreen:change",this._fullScreenChange);
this._player.on("fullscreen:willenter",this._fullScreenChange);this._calcAspectRatio()
};n._removeResizeListeners=function(){this._onResize();window.removeEventListener("resize",this._onResize);
window.removeEventListener("orientationchange",this._onResize);this._player.off("loadstart",this._onLoadStart);
this._player.off("loadeddata",this._calcAspectRatio);this._player.off("fullscreen:change",this._fullScreenChange)
};n._removeEventListeners=function(){this._removeResizeListeners();this._modal.off("willopen",this._addResizeListeners);
this._modal.off("open",this._onModalOpen);this._modal.off("close",this._removeResizeListeners);
if(this._posterEl){this._posterEl.removeEventListener("load",this._calcAspectRatio)
}};n._onLoadStart=function(){this._loadStarted=false;requestAnimationFrame(function(){this._loadStarted=true;
this._onModalOpen()}.bind(this));this._calcAspectRatio()};n._calcAspectRatio=function(){this._aspectRatio=(this._player.getMediaWidth()/this._player.getMediaHeight());
if((isNaN(this._aspectRatio)||this._aspectRatio<=0)&&this._mediaElement.src){if(k.test(this._mediaElement.src)){this._aspectRatio=(parseInt(RegExp.$1,10)/parseInt(RegExp.$2,10))
}}if((isNaN(this._aspectRatio)||this._aspectRatio<=0)&&this._posterEl){this._aspectRatio=(this._posterEl.naturalWidth/this._posterEl.naturalHeight)
}this._onResize()};n._fullScreenChange=function(a){if(a&&a.type==="enter"){setTimeout(function(){this._isFullScreen=true;
this._onResize()}.bind(this),60);return}this._isFullScreen=this._player.isFullscreen();
this._onResize()};n.destroy=function(){this._removeEventListeners()};n._onResize=function(){var h=this._aspectRatio;
if(isNaN(h)){this._mediaElement.style.width="";this._mediaElement.style.height="";
return}var d=window.innerWidth;var f=window.innerHeight;var e=d/f;if(this._mediaElement.readyState<1){var a=parseInt(getComputedStyle(this._playerContainer).maxWidth.replace("px",""));
var b=a/h;var c=parseInt(getComputedStyle(this._playerContainer).minWidth.replace("px",""));
var g=(j)?parseInt(getComputedStyle(this._player.el).maxHeight.replace("px","")):b;
if(b>f||(g&&b>g)){a=(g||f)*h;b=Math.min(a/h,f)}if(a>d||a>(b*h)){b=Math.min((d/h),f);
a=b*h}this._mediaElement.style.width=a+"px";this._mediaElement.style.height=Math.min(b,f)+"px"
}else{this._mediaElement.style.width="";this._mediaElement.style.height=""}if(e>h&&!this._isFullScreen){this._playerContainer.parentElement.classList.add("center-horizontal")
}else{this._playerContainer.parentElement.classList.remove("center-horizontal")
}this._player.refreshSize()};o.exports=l},{"@marcom/ac-useragent":135}],154:[function(h,m,i){var k=h("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var n=h("@marcom/ac-feature/touchAvailable")();function j(a){a=a||{};this.el=a.el;
this._onTouchStart=this._onTouchStart.bind(this);this._onTouchMove=this._onTouchMove.bind(this);
this._onTouchEnd=this._onTouchEnd.bind(this);this._onClick=this._onClick.bind(this);
this._touchStart=false;k.call(this);this.activate()}var l=j.prototype=Object.create(k.prototype);
l._broadcastClick=function(a){this.trigger("click",{originalEvent:a})};l._onClick=function(a){a.stopPropagation();
a.preventDefault();if(!n){this._broadcastClick(a)}};l._onTouchStart=function(){this._touchStart=true
};l._onTouchEnd=function(a){if(this._touchStart===true){a.stopPropagation();a.preventDefault();
this._broadcastClick(a)}this._touchStart=false};l._onTouchMove=function(){this._touchStart=false
};l.activate=function(){if(n){this.el.addEventListener("touchstart",this._onTouchStart);
this.el.addEventListener("touchmove",this._onTouchMove);this.el.addEventListener("touchend",this._onTouchEnd)
}this.el.addEventListener("click",this._onClick)};l.deactivate=function(){this.el.removeEventListener("touchstart",this._onTouchStart);
this.el.removeEventListener("touchmove",this._onTouchMove);this.el.removeEventListener("touchend",this._onTouchEnd);
this.el.removeEventListener("click",this._onClick)};j.create=function(a,b){b=b||{};
return new j({el:a})};m.exports=j},{"@marcom/ac-event-emitter-micro":1,"@marcom/ac-feature/touchAvailable":7}],155:[function(j,i,f){var g=false;
window.addEventListener("load",function(){g=true});function h(a){if(g){a()}else{window.addEventListener("load",a)
}}i.exports=h},{}],156:[function(d,f,e){arguments[4][10][0].apply(e,arguments)},{"./../maps/focusableElement":162,dup:10}],157:[function(d,f,e){arguments[4][11][0].apply(e,arguments)
},{"./../maps/ariaMap":161,"./TabManager":156,"./setAttributes":159,dup:11}],158:[function(d,f,e){arguments[4][13][0].apply(e,arguments)
},{dup:13}],159:[function(d,f,e){arguments[4][14][0].apply(e,arguments)},{dup:14}],160:[function(d,f,e){arguments[4][15][0].apply(e,arguments)
},{"./../maps/ariaMap":161,"./removeAttributes":158,"./setAttributes":159,dup:15}],161:[function(d,f,e){arguments[4][17][0].apply(e,arguments)
},{dup:17}],162:[function(d,f,e){arguments[4][18][0].apply(e,arguments)},{dup:18}],163:[function(h,l,i){var k=h("./request/factory");
var m={complete:function(a,b){},error:function(a,b){},method:"GET",headers:{},success:function(b,c,a){},timeout:5000};
var j=function(){for(var a=1;a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]};var n={ajax:function(c,b){b=j({},m,b);if(c.substr(0,2)==="//"){c=window.location.protocol+c
}var a=k(c);a.open(b.method,c);a.setTransportHeaders(b.headers);a.setReadyStateChangeHandlers(b.complete,b.error,b.success);
a.setTimeout(b.timeout,b.error,b.complete);a.send(b.data);return a},get:function(b,a){a.method="GET";
return n.ajax(b,a)},head:function(b,a){a.method="HEAD";return n.ajax(b,a)},post:function(b,a){a.method="POST";
return n.ajax(b,a)}};l.exports=n},{"./request/factory":164}],164:[function(p,q,n){var j=p("./xmlhttprequest");
var k=p("./xdomainrequest");var l=/.*(?=:\/\/)/;var r=/^.*:\/\/|\/.+$/g;var o=window.XDomainRequest&&document.documentMode<10;
var m=function(a){if(!a.match(l)){return false}var b=a.replace(r,"");return b!==window.location.hostname
};q.exports=function(c,b){var a=o&&m(c)?k:j;return new a()}},{"./xdomainrequest":166,"./xmlhttprequest":167}],165:[function(e,g,f){var h=function(){};
h.create=function(){var a=function(){};a.prototype=h.prototype;return new a()};
h.prototype.open=function(a,b){a=a.toUpperCase();this.xhr.open(a,b)};h.prototype.send=function(a){this.xhr.send(a)
};h.prototype.setTimeout=function(a,b,c){this.xhr.ontimeout=function(){b(this.xhr,this.status);
c(this.xhr,this.status)}.bind(this)};h.prototype.setTransportHeaders=function(b){for(var a in b){this.xhr.setRequestHeader(a,b[a])
}};g.exports=h},{}],166:[function(g,j,h){var k=g("./request");var l=g("@marcom/ac-object/toQueryParameters");
var i=function(){this.xhr=new XDomainRequest()};i.prototype=k.create();i.prototype.setReadyStateChangeHandlers=function(c,b,a){this.xhr.onerror=function(){b(this.xhr,this.status);
c(this.xhr,this.status)}.bind(this);this.xhr.onload=function(){a(this.xhr.responseText,this.xhr.status,this.xhr);
c(this.xhr,this.status)}.bind(this)};i.prototype.send=function(a){if(a&&typeof a==="object"){a=l(a)
}this.xhr.send(a)};i.prototype.setTransportHeaders=function(a){};j.exports=i},{"./request":165,"@marcom/ac-object/toQueryParameters":231}],167:[function(f,i,g){var j=f("./request");
var h=function(){this.xhr=new XMLHttpRequest()};h.prototype=j.create();h.prototype.setReadyStateChangeHandlers=function(c,b,a){this.xhr.onreadystatechange=function(d){if(this.xhr.readyState===4){clearTimeout(this.timeout);
if(this.xhr.status>=200&&this.xhr.status<300){a(this.xhr.responseText,this.xhr.status,this.xhr);
c(this.xhr,this.status)}else{b(this.xhr,this.status);c(this.xhr,this.status)}}}.bind(this)
};i.exports=h},{"./request":165}],168:[function(d,f,e){f.exports={log:d("./ac-console/log")}
},{"./ac-console/log":169}],169:[function(k,j,g){var h="f7c9180f-5c45-47b4-8de4-428015f096c0";
var l=!!(function(){try{return window.localStorage.getItem(h)}catch(a){}}());j.exports=function i(){if(window.console&&typeof console.log!=="undefined"&&l){console.log.apply(console,Array.prototype.slice.call(arguments,0))
}}},{}],170:[function(d,f,e){arguments[4][32][0].apply(e,arguments)},{"./shared/getEventType":177,"./utils/addEventListener":178,dup:32}],171:[function(d,f,e){arguments[4][33][0].apply(e,arguments)
},{"./shared/camelCasedEventTypes":172,"./shared/prefixHelper":173,"./shared/windowFallbackEventTypes":174,"./utils/eventTypeAvailable":175,dup:33}],172:[function(d,f,e){arguments[4][34][0].apply(e,arguments)
},{dup:34}],173:[function(d,f,e){arguments[4][35][0].apply(e,arguments)},{dup:35}],174:[function(d,f,e){arguments[4][36][0].apply(e,arguments)
},{dup:36}],175:[function(d,f,e){arguments[4][37][0].apply(e,arguments)},{dup:37}],176:[function(d,f,e){arguments[4][38][0].apply(e,arguments)
},{"./shared/getEventType":177,"./utils/removeEventListener":179,dup:38}],177:[function(d,f,e){arguments[4][39][0].apply(e,arguments)
},{"@marcom/ac-prefixer/getEventType":171,dup:39}],178:[function(d,f,e){arguments[4][25][0].apply(e,arguments)
},{dup:25}],179:[function(d,f,e){arguments[4][26][0].apply(e,arguments)},{dup:26}],180:[function(d,f,e){arguments[4][45][0].apply(e,arguments)
},{dup:45}],181:[function(d,f,e){arguments[4][46][0].apply(e,arguments)},{dup:46}],182:[function(d,f,e){arguments[4][75][0].apply(e,arguments)
},{dup:75}],183:[function(d,f,e){arguments[4][47][0].apply(e,arguments)},{dup:47}],184:[function(d,f,e){arguments[4][48][0].apply(e,arguments)
},{dup:48}],185:[function(d,f,e){arguments[4][49][0].apply(e,arguments)},{"../isNode":189,dup:49}],186:[function(d,f,e){arguments[4][50][0].apply(e,arguments)
},{"../COMMENT_NODE":180,"../DOCUMENT_FRAGMENT_NODE":181,"../ELEMENT_NODE":183,"../TEXT_NODE":184,"./isNodeType":185,dup:50}],187:[function(d,f,e){arguments[4][80][0].apply(e,arguments)
},{"./DOCUMENT_FRAGMENT_NODE":181,"./internal/isNodeType":185,dup:80}],188:[function(d,f,e){arguments[4][51][0].apply(e,arguments)
},{"./ELEMENT_NODE":183,"./internal/isNodeType":185,dup:51}],189:[function(d,f,e){arguments[4][52][0].apply(e,arguments)
},{dup:52}],190:[function(d,f,e){arguments[4][53][0].apply(e,arguments)},{"./internal/validate":186,dup:53}],191:[function(d,f,e){arguments[4][85][0].apply(e,arguments)
},{"@marcom/ac-dom-nodes/COMMENT_NODE":180,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":181,"@marcom/ac-dom-nodes/DOCUMENT_NODE":182,"@marcom/ac-dom-nodes/ELEMENT_NODE":183,"@marcom/ac-dom-nodes/TEXT_NODE":184,"@marcom/ac-dom-nodes/isNode":189,"@marcom/ac-polyfills/Array/prototype.indexOf":234,dup:85}],192:[function(d,f,e){arguments[4][87][0].apply(e,arguments)
},{"./internal/validate":191,"./shims/querySelectorAll":193,"@marcom/ac-polyfills/Array/prototype.slice":235,dup:87}],193:[function(d,f,e){arguments[4][89][0].apply(e,arguments)
},{"@marcom/ac-dom-nodes/isDocumentFragment":187,"@marcom/ac-dom-nodes/isElement":188,"@marcom/ac-dom-nodes/remove":190,"@marcom/ac-polyfills/Array/prototype.indexOf":234,dup:89}],194:[function(B,C,z){var s;
var t=B("@marcom/ac-object/extend");var x=B("@marcom/ac-object/create");var r=B("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var D=B("@marcom/ac-dom-traversal/querySelectorAll");var v=B("@marcom/ac-dom-events/addEventListener");
var E=B("@marcom/ac-dom-events/removeEventListener");var F=B("@marcom/ac-console");
try{s=B("@marcom/ac-analytics")}catch(u){F.log(u.message)}var A={dataAttribute:"analytics-share",interactionEvents:["click"],autoEnable:true};
var e=function(a){a=a||{};this.options=t(A,a);r.call(this);this.elements=[];this.eventObserver=null;
this.publishShareClick=this.publishShareClick.bind(this);if(this.options.autoEnable){this.enable()
}};var w=r.prototype;var y=e.prototype=x(w);y.enable=function(){if(!s){return false
}this._createObserver();this.bindEventListener()};y.disable=function(){if(!s){return false
}this.unbindEventListener()};y.bindEventListener=function(){var a=0;this.elements=this.populateElements();
a=this.elements.length;for(var b=0;b<a;b++){v(this.elements[b],"click",this.publishShareClick)
}};y.unbindEventListener=function(){var a=(this.elements&&this.elements.length?this.elements.length:0);
for(var b=0;b<a;b++){E(this.elements[b],"click",this.publishShareClick)}};y.populateElements=function(){return D("[data-"+this.options.dataAttribute+"]",(this.options.context||document))
};y.publishShareClick=function(b){var a=b.currentTarget;var c=this.parseDataAttribute(a.getAttribute("data-"+this.options.dataAttribute));
if(typeof c==="object"){if(!c.title){console.log("data-"+this.options.dataAttribute+" attribute must have a `title` property");
return false}this.trigger("click",c)}};y.parseDataAttribute=function(a){var c={};
try{c=JSON.parse(a)}catch(b){console.log("data-"+this.options.dataAttribute+" must be a valid JSON string")
}return c};y.destroy=function(){this.disable();this.elements=[];this.eventObserver=null;
this.publishShareClick=null;this.options=null};y._createObserver=function(){if(!s||!s.observer||!s.observer.Event){return false
}this.eventObserver=new s.observer.Event(this,this.options)};C.exports=e},{"@marcom/ac-analytics":"@marcom/ac-analytics","@marcom/ac-console":168,"@marcom/ac-dom-events/addEventListener":170,"@marcom/ac-dom-events/removeEventListener":176,"@marcom/ac-dom-traversal/querySelectorAll":192,"@marcom/ac-event-emitter-micro":199,"@marcom/ac-object/create":229,"@marcom/ac-object/extend":230}],195:[function(h,g,e){var f=h("./../AnalyticsShare");
g.exports=function(a){return new f(a)}},{"./../AnalyticsShare":194}],196:[function(h,g,e){g.exports=function f(c){if(typeof c.select==="function"){var a=false;
a=c.select();if(!a){c.setSelectionRange(0,c.value.length)}}else{var d=document.createRange();
d.selectNodeContents(c);var b=window.getSelection();b.removeAllRanges();b.addRange(d)
}}},{}],197:[function(j,i,g){var k="f7c9180f-5c45-47b4-8de4-428015f096c0";var l=!!window.localStorage.getItem(k);
i.exports=function h(a){return function(){if(l&&typeof(window.console)==="object"){return console[a].apply(console,Array.prototype.slice.call(arguments,0))
}}}},{}],198:[function(d,f,e){f.exports=d("./internal/expose")("log")},{"./internal/expose":197}],199:[function(d,f,e){arguments[4][1][0].apply(e,arguments)
},{"./ac-event-emitter-micro/EventEmitterMicro":200,dup:1}],200:[function(d,f,e){arguments[4][2][0].apply(e,arguments)
},{dup:2}],201:[function(d,f,e){arguments[4][3][0].apply(e,arguments)},{dup:3}],202:[function(d,f,e){arguments[4][4][0].apply(e,arguments)
},{"./helpers/globals":201,"./touchAvailable":206,"@marcom/ac-function/once":222,dup:4}],203:[function(d,f,e){arguments[4][5][0].apply(e,arguments)
},{"./isDesktop":202,"./isTablet":205,"@marcom/ac-function/once":222,dup:5}],204:[function(f,j,g){var i=f("./helpers/globals");
j.exports=function h(){var a=i.getWindow();return("devicePixelRatio" in a&&a.devicePixelRatio>=1.5)
}},{"./helpers/globals":201}],205:[function(d,f,e){arguments[4][6][0].apply(e,arguments)
},{"./helpers/globals":201,"./isDesktop":202,"@marcom/ac-function/once":222,dup:6}],206:[function(d,f,e){arguments[4][7][0].apply(e,arguments)
},{"./helpers/globals":201,"@marcom/ac-function/once":222,dup:7}],207:[function(d,f,e){arguments[4][32][0].apply(e,arguments)
},{"./shared/getEventType":213,"./utils/addEventListener":214,dup:32}],208:[function(d,f,e){arguments[4][33][0].apply(e,arguments)
},{"./shared/camelCasedEventTypes":209,"./shared/prefixHelper":210,"./shared/windowFallbackEventTypes":211,"./utils/eventTypeAvailable":212,dup:33}],209:[function(d,f,e){arguments[4][34][0].apply(e,arguments)
},{dup:34}],210:[function(d,f,e){arguments[4][35][0].apply(e,arguments)},{dup:35}],211:[function(d,f,e){arguments[4][36][0].apply(e,arguments)
},{dup:36}],212:[function(d,f,e){arguments[4][37][0].apply(e,arguments)},{dup:37}],213:[function(d,f,e){arguments[4][39][0].apply(e,arguments)
},{"@marcom/ac-prefixer/getEventType":208,dup:39}],214:[function(d,f,e){arguments[4][25][0].apply(e,arguments)
},{dup:25}],215:[function(d,f,e){f.exports=d("./fullscreen")},{"./fullscreen":221}],216:[function(d,f,e){f.exports={STANDARD:"standard",IOS:"ios"}
},{}],217:[function(t,v,q){var r=t("@marcom/ac-dom-events/addEventListener");var n=t("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var x=t("./../events/types");var w=t("./../consts/modes");var u=new n();function o(a){u.trigger(x.ENTERFULLSCREEN,a)
}function m(a){u.trigger(x.EXITFULLSCREEN,a)}function s(a){if(u.fullscreenElement()){o(a)
}else{m(a)}}function p(){r(document,"fullscreenchange",s)}p();u.fullscreenEnabled=function(a){var b=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled;
return !!(b)};u.fullscreenElement=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitCurrentFullScreenElement
};u.exitFullscreen=function(a){var b;if(typeof document.exitFullscreen==="function"){b="exitFullscreen"
}else{if(typeof document.webkitExitFullscreen==="function"){b="webkitExitFullscreen"
}else{if(typeof document.webkitCancelFullScreen==="function"){b="webkitCancelFullScreen"
}else{if(typeof document.mozCancelFullScreen==="function"){b="mozCancelFullScreen"
}else{if(typeof document.msExitFullscreen==="function"){b="msExitFullscreen"}}}}}if(typeof document[b]==="function"){document[b].call(document)
}};u.requestFullscreen=function(a){var b;if(typeof a.requestFullscreen==="function"){b="requestFullscreen"
}else{if(typeof a.webkitRequestFullscreen==="function"){b="webkitRequestFullscreen"
}else{if(typeof a.webkitRequestFullScreen==="function"){b="webkitRequestFullScreen"
}else{if(typeof a.mozRequestFullScreen==="function"){b="mozRequestFullScreen"}else{if(typeof a.msRequestFullscreen==="function"){b="msRequestFullscreen"
}}}}}if(typeof a[b]==="function"){a[b].call(a)}};u.mode=w.STANDARD;v.exports=u},{"./../consts/modes":216,"./../events/types":220,"@marcom/ac-dom-events/addEventListener":207,"@marcom/ac-event-emitter-micro":199}],218:[function(j,i,g){var f=j("./ios");
var h=j("./desktop");i.exports={create:function(){var a=h;if("webkitEnterFullscreen" in document.createElement("video")&&!("webkitRequestFullScreen" in document.createElement("div"))){a=f
}return a}}},{"./desktop":217,"./ios":219}],219:[function(t,u,r){var s=t("@marcom/ac-dom-events/addEventListener");
var m=t("@marcom/ac-event-emitter-micro").EventEmitterMicro;var x=t("./../events/types");
var v=t("./../consts/modes");var n;w();function w(){s(document,"webkitbeginfullscreen",o,true);
s(document,"webkitendfullscreen",p,true)}function o(a){q.trigger(x.ENTERFULLSCREEN,a)
}function p(a){n=undefined;q.trigger(x.EXITFULLSCREEN,a)}var q=new m();q.fullscreenEnabled=function(a){return !!(a.webkitSupportsFullscreen)
};q.fullscreenElement=function(){return n};q.exitFullscreen=function(a){if(a&&typeof a.webkitExitFullscreen==="function"){a.webkitExitFullscreen()
}};q.requestFullscreen=function(a){if(typeof a.webkitEnterFullscreen==="function"){a.webkitEnterFullscreen()
}};q.mode=v.IOS;u.exports=q},{"./../consts/modes":216,"./../events/types":220,"@marcom/ac-dom-events/addEventListener":207,"@marcom/ac-event-emitter-micro":199}],220:[function(d,f,e){f.exports={ENTERFULLSCREEN:"enterfullscreen",EXITFULLSCREEN:"exitfullscreen"}
},{}],221:[function(p,q,o){var k=p("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var l=p("./delegate/factory");var r="Error: Element missing. ac-fullscreen requires an element to be specified";
var n=l.create();function j(){throw new Error(r)}var m={};m.requestFullscreen=function(a){if(!a){j()
}return n.requestFullscreen(a)};m.fullscreenEnabled=function(a){if(!a){j()}return n.fullscreenEnabled(a)
};m.fullscreenElement=function(){return n.fullscreenElement()};m.exitFullscreen=function(a){if(!a){j()
}return n.exitFullscreen(a)};m.getMode=function(){return n.mode};m.on=function(){return n.on.apply(n,arguments)
};m.off=function(){return n.off.apply(n,arguments)};m.once=function(){return n.once.apply(n,arguments)
};q.exports=m},{"./delegate/factory":218,"@marcom/ac-event-emitter-micro":199}],222:[function(d,f,e){arguments[4][8][0].apply(e,arguments)
},{dup:8}],223:[function(e,h,f){h.exports=function g(c,a){var b=null;return function(){if(b===null){c.apply(this,arguments);
b=setTimeout(function(){b=null},a)}}}},{}],224:[function(d,f,e){arguments[4][25][0].apply(e,arguments)
},{dup:25}],225:[function(d,f,e){arguments[4][26][0].apply(e,arguments)},{dup:26}],226:[function(d,f,e){arguments[4][28][0].apply(e,arguments)
},{"./internal/KeyEvent":227,"@marcom/ac-dom-events/utils/addEventListener":224,"@marcom/ac-dom-events/utils/removeEventListener":225,"@marcom/ac-event-emitter-micro":199,"@marcom/ac-object/create":229,dup:28}],227:[function(d,f,e){arguments[4][30][0].apply(e,arguments)
},{dup:30}],228:[function(d,f,e){arguments[4][120][0].apply(e,arguments)},{"./extend":230,"@marcom/ac-polyfills/Array/isArray":232,dup:120}],229:[function(d,f,e){arguments[4][27][0].apply(e,arguments)
},{dup:27}],230:[function(d,f,e){arguments[4][56][0].apply(e,arguments)},{"@marcom/ac-polyfills/Array/prototype.forEach":233,dup:56}],231:[function(d,f,e){arguments[4][128][0].apply(e,arguments)
},{"@marcom/ac-url/joinSearchParams":291,dup:128}],232:[function(d,f,e){arguments[4][66][0].apply(e,arguments)
},{dup:66}],233:[function(d,f,e){arguments[4][67][0].apply(e,arguments)},{dup:67}],234:[function(d,f,e){arguments[4][68][0].apply(e,arguments)
},{dup:68}],235:[function(d,f,e){arguments[4][69][0].apply(e,arguments)},{dup:69}],236:[function(h,g,f){if(!Date.now){Date.now=function e(){return new Date().getTime()
}}},{}],237:[function(d,f,e){
/*! MIT License
 *
 * performance.now polyfill
 * copyright Paul Irish 2015
 *
 */
;
d("../Date/now");(function(){if("performance" in window==false){window.performance={}
}if("now" in window.performance==false){var a=Date.now();if(performance.timing&&performance.timing.navigationStart){a=performance.timing.navigationStart
}window.performance.now=function b(){return Date.now()-a}}})()},{"../Date/now":236}],238:[function(d,f,e){f.exports={SharedInstance:d("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":239}],239:[function(o,l,p){var k=window,m="AC",j="SharedInstance",n=k[m];
var i=(function(){var a={};return{get:function(c,d){var b=null;if(a[c]&&a[c][d]){b=a[c][d]
}return b},set:function(b,d,c){if(!a[b]){a[b]={}}if(typeof c==="function"){a[b][d]=new c()
}else{a[b][d]=c}return a[b][d]},share:function(c,e,d){var b=this.get(c,e);if(!b){b=this.set(c,e,d)
}return b},remove:function(c,d){var b=typeof d;if(b==="string"||b==="number"){if(!a[c]||!a[c][d]){return
}a[c][d]=null;return}if(a[c]){a[c]=null}}}}());if(!n){n=k[m]={}}if(!n[j]){n[j]=i
}l.exports=n[j]},{}],240:[function(n,l,h){var i=n("@marcom/ac-shared-instance").SharedInstance;
var k="ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance",m="1.0.3";
var j=function(){this._currentID=0};j.prototype.getNewID=function(){this._currentID++;
return"raf:"+this._currentID};l.exports=i.share(k,m,j)},{"@marcom/ac-shared-instance":238}],241:[function(d,f,e){arguments[4][238][0].apply(e,arguments)
},{"./ac-shared-instance/SharedInstance":242,dup:238}],242:[function(d,f,e){arguments[4][239][0].apply(e,arguments)
},{dup:239}],243:[function(f,i,g){f("@marcom/ac-polyfills/performance/now");var h;
function j(a){a=a||{};this._reset();this._willRun=false;this._totalSubscribeCount=-1;
this._requestAnimationFrame=window.requestAnimationFrame;this._cancelAnimationFrame=window.cancelAnimationFrame;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._boundOnExternalAnimationFrame=this._onExternalAnimationFrame.bind(this)
}h=j.prototype;h.subscribe=function(b,a){this._totalSubscribeCount++;if(!this._nextFrameSubscribers[b.id]){if(a){this._nextFrameSubscribersOrder.unshift(b.id)
}else{this._nextFrameSubscribersOrder.push(b.id)}this._nextFrameSubscribers[b.id]=b;
this._nextFrameSubscriberArrayLength++;this._nextFrameSubscriberCount++;this._run()
}return this._totalSubscribeCount};h.unsubscribe=function(a){if(!this._nextFrameSubscribers[a.id]){return false
}this._nextFrameSubscribers[a.id]=null;this._nextFrameSubscriberCount--;if(this._nextFrameSubscriberCount===0){this._cancel()
}return true};h.trigger=function(a,b){var c;for(c=0;c<this._subscriberArrayLength;
c++){if(this._subscribers[this._subscribersOrder[c]]!==null&&this._subscribers[this._subscribersOrder[c]]._didDestroy===false){this._subscribers[this._subscribersOrder[c]].trigger(a,b)
}}};h.destroy=function(){var a=this._cancel();this._subscribers=null;this._subscribersOrder=null;
this._nextFrameSubscribers=null;this._nextFrameSubscribersOrder=null;this._rafData=null;
this._boundOnAnimationFrame=null;this._onExternalAnimationFrame=null;return a};
h.useExternalAnimationFrame=function(b){if(typeof b!=="boolean"){return}var a=this._isUsingExternalAnimationFrame;
if(b&&this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}if(this._willRun&&!b&&!this._animationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}this._isUsingExternalAnimationFrame=b;if(b){return this._boundOnExternalAnimationFrame
}return a||false};h._run=function(){if(!this._willRun){this._willRun=true;if(this.lastFrameTime===0){this.lastFrameTime=performance.now()
}this._animationFrameActive=true;if(!this._isUsingExternalAnimationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}return true}};h._cancel=function(){var a=false;if(this._animationFrameActive){if(this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}this._animationFrameActive=false;this._willRun=false;
a=true}if(!this._isRunning){this._reset()}return a};h._onSubscribersAnimationFrameStart=function(a){var b;
for(b=0;b<this._subscriberArrayLength;b++){if(this._subscribers[this._subscribersOrder[b]]!==null&&this._subscribers[this._subscribersOrder[b]]._didDestroy===false){this._subscribers[this._subscribersOrder[b]]._onAnimationFrameStart(a)
}}};h._onSubscribersAnimationFrameEnd=function(a){var b;for(b=0;b<this._subscriberArrayLength;
b++){if(this._subscribers[this._subscribersOrder[b]]!==null&&this._subscribers[this._subscribersOrder[b]]._didDestroy===false){this._subscribers[this._subscribersOrder[b]]._onAnimationFrameEnd(a)
}}};h._onAnimationFrame=function(a){this._subscribers=this._nextFrameSubscribers;
this._subscribersOrder=this._nextFrameSubscribersOrder;this._subscriberArrayLength=this._nextFrameSubscriberArrayLength;
this._subscriberCount=this._nextFrameSubscriberCount;this._nextFrameSubscribers={};
this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;this._nextFrameSubscriberCount=0;
this._isRunning=true;this._willRun=false;this._didRequestNextRAF=false;this._rafData.delta=a-this.lastFrameTime;
this.lastFrameTime=a;this._rafData.fps=0;if(this._rafData.delta>=1000){this._rafData.delta=0
}if(this._rafData.delta!==0){this._rafData.fps=1000/this._rafData.delta}this._rafData.time=a;
this._rafData.naturalFps=this._rafData.fps;this._rafData.timeNow=Date.now();this._onSubscribersAnimationFrameStart(this._rafData);
this.trigger("update",this._rafData);this.trigger("external",this._rafData);this.trigger("draw",this._rafData);
this._onSubscribersAnimationFrameEnd(this._rafData);if(!this._willRun){this._reset()
}};h._onExternalAnimationFrame=function(a){if(!this._isUsingExternalAnimationFrame){return
}this._onAnimationFrame(a)};h._reset=function(){this._rafData={time:0,delta:0,fps:0,naturalFps:0,timeNow:0};
this._subscribers={};this._subscribersOrder=[];this._subscriberArrayLength=0;this._subscriberCount=0;
this._nextFrameSubscribers={};this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;
this._nextFrameSubscriberCount=0;this._didEmitFrameData=false;this._animationFrame=null;
this._animationFrameActive=false;this._isRunning=false;this._shouldReset=false;
this.lastFrameTime=0};i.exports=j},{"@marcom/ac-polyfills/performance/now":237}],244:[function(n,k,h){var i=n("@marcom/ac-shared-instance").SharedInstance;
var j="ac-raf-executor:sharedRAFExecutorInstance",l="2.0.1";var m=n("./RAFExecutor");
k.exports=i.share(j,l,m)},{"./RAFExecutor":243,"@marcom/ac-shared-instance":241}],245:[function(n,m,o){var k;
var l=n("@marcom/ac-event-emitter-micro").EventEmitterMicro;var p=n("@marcom/ac-raf-executor/sharedRAFExecutorInstance");
var i=n("@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance");
function j(a){a=a||{};l.call(this);this.id=i.getNewID();this.executor=a.executor||p;
this._reset();this._willRun=false;this._didDestroy=false}k=j.prototype=Object.create(l.prototype);
k.run=function(){if(!this._willRun){this._willRun=true}return this._subscribe()
};k.cancel=function(){this._unsubscribe();if(this._willRun){this._willRun=false
}this._reset()};k.destroy=function(){var a=this.willRun();this.cancel();this.executor=null;
l.prototype.destroy.call(this);this._didDestroy=true;return a};k.willRun=function(){return this._willRun
};k.isRunning=function(){return this._isRunning};k._subscribe=function(){return this.executor.subscribe(this)
};k._unsubscribe=function(){return this.executor.unsubscribe(this)};k._onAnimationFrameStart=function(a){this._isRunning=true;
this._willRun=false;if(!this._didEmitFrameData){this._didEmitFrameData=true;this.trigger("start",a)
}};k._onAnimationFrameEnd=function(a){if(!this._willRun){this.trigger("stop",a);
this._reset()}};k._reset=function(){this._didEmitFrameData=false;this._isRunning=false
};m.exports=j},{"@marcom/ac-event-emitter-micro":199,"@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance":240,"@marcom/ac-raf-executor/sharedRAFExecutorInstance":244}],246:[function(g,l,h){var k=g("./SingleCallRAFEmitter");
var i=function(a){this.rafEmitter=new k();this.rafEmitter.on(a,this._onRAFExecuted.bind(this));
this.requestAnimationFrame=this.requestAnimationFrame.bind(this);this.cancelAnimationFrame=this.cancelAnimationFrame.bind(this);
this._frameCallbacks=[];this._nextFrameCallbacks=[];this._currentFrameID=-1;this._cancelFrameIdx=-1;
this._frameCallbackLength=0;this._nextFrameCallbacksLength=0;this._frameCallbackIteration=0
};var j=i.prototype;j.requestAnimationFrame=function(a){this._currentFrameID=this.rafEmitter.run();
this._nextFrameCallbacks.push(this._currentFrameID,a);this._nextFrameCallbacksLength+=2;
return this._currentFrameID};j.cancelAnimationFrame=function(a){this._cancelFrameIdx=this._nextFrameCallbacks.indexOf(a);
if(this._cancelFrameIdx===-1){return}this._nextFrameCallbacks.splice(this._cancelFrameIdx,2);
this._nextFrameCallbacksLength-=2;if(this._nextFrameCallbacksLength===0){this.rafEmitter.cancel()
}};j._onRAFExecuted=function(a){this._frameCallbacks=this._nextFrameCallbacks;this._frameCallbackLength=this._nextFrameCallbacksLength;
this._nextFrameCallbacks=[];this._nextFrameCallbacksLength=0;for(this._frameCallbackIteration=0;
this._frameCallbackIteration<this._frameCallbackLength;this._frameCallbackIteration+=2){this._frameCallbacks[this._frameCallbackIteration+1](a.time,a)
}};l.exports=i},{"./SingleCallRAFEmitter":248}],247:[function(g,l,h){var i=g("./RAFInterface");
var j=function(){this.events={}};var k=j.prototype;k.requestAnimationFrame=function(a){if(!this.events[a]){this.events[a]=new i(a)
}return this.events[a].requestAnimationFrame};k.cancelAnimationFrame=function(a){if(!this.events[a]){this.events[a]=new i(a)
}return this.events[a].cancelAnimationFrame};l.exports=new j()},{"./RAFInterface":246}],248:[function(l,k,g){var h=l("./RAFEmitter");
var j=function(a){h.call(this,a)};var i=j.prototype=Object.create(h.prototype);
i._subscribe=function(){return this.executor.subscribe(this,true)};k.exports=j},{"./RAFEmitter":245}],249:[function(e,h,f){var g=e("./RAFInterfaceController");
h.exports=g.cancelAnimationFrame("draw")},{"./RAFInterfaceController":247}],250:[function(e,h,f){var g=e("./RAFInterfaceController");
h.exports=g.requestAnimationFrame("draw")},{"./RAFInterfaceController":247}],251:[function(d,f,e){f.exports={getContentDimensions:d("./getContentDimensions"),getDimensions:d("./getDimensions"),getPagePosition:d("./getPagePosition"),getPercentInViewport:d("./getPercentInViewport"),getPixelsInViewport:d("./getPixelsInViewport"),getPosition:d("./getPosition"),getScrollX:d("./getScrollX"),getScrollY:d("./getScrollY"),getViewportPosition:d("./getViewportPosition"),isInViewport:d("./isInViewport")}
},{"./getContentDimensions":252,"./getDimensions":253,"./getPagePosition":254,"./getPercentInViewport":255,"./getPixelsInViewport":256,"./getPosition":257,"./getScrollX":258,"./getScrollY":259,"./getViewportPosition":260,"./isInViewport":261}],252:[function(i,h,j){var f=i("./utils/getBoundingClientRect");
h.exports=function g(c,a){var b=1;if(a){b=f(c).width/c.offsetWidth}return{width:c.scrollWidth*b,height:c.scrollHeight*b}
}},{"./utils/getBoundingClientRect":262}],253:[function(i,h,j){var f=i("./utils/getBoundingClientRect");
h.exports=function g(c,a){var b;if(a){b=f(c);return{width:b.width,height:b.height}
}return{width:c.offsetWidth,height:c.offsetHeight}}},{"./utils/getBoundingClientRect":262}],254:[function(m,l,n){var p=m("./getDimensions");
var o=m("./utils/getBoundingClientRect");var i=m("./getScrollX");var j=m("./getScrollY");
l.exports=function k(e,f){var c;var a;var b;var d;if(f){c=o(e);a=i();b=j();return{top:c.top+b,right:c.right+a,bottom:c.bottom+b,left:c.left+a}
}d=p(e,f);c={top:e.offsetTop,left:e.offsetLeft,width:d.width,height:d.height};while((e=e.offsetParent)){c.top+=e.offsetTop;
c.left+=e.offsetLeft}return{top:c.top,right:c.left+c.width,bottom:c.top+c.height,left:c.left}
}},{"./getDimensions":253,"./getScrollX":258,"./getScrollY":259,"./utils/getBoundingClientRect":262}],255:[function(l,j,g){var h=l("./getDimensions");
var i=l("./getPixelsInViewport");j.exports=function k(b,a){var c=i(b,a);var d=h(b,a).height;
return(c/d)}},{"./getDimensions":253,"./getPixelsInViewport":256}],256:[function(j,i,f){var g=j("./getViewportPosition");
i.exports=function h(d,a){var b=document.documentElement.clientHeight;var e=g(d,a);
var c;if(e.top>=b||e.bottom<=0){return 0}c=(e.bottom-e.top);if(e.top<0){c+=e.top
}if(e.bottom>b){c-=e.bottom-b}return c}},{"./getViewportPosition":260}],257:[function(k,j,l){var h=k("./getDimensions");
var g=k("./utils/getBoundingClientRect");j.exports=function i(d,a){var b;var e;
var c;if(a){b=g(d);if(d.offsetParent){e=g(d.offsetParent);b.top-=e.top;b.left-=e.left
}}else{c=h(d,a);b={top:d.offsetTop,left:d.offsetLeft,width:c.width,height:c.height}
}return{top:b.top,right:b.left+b.width,bottom:b.top+b.height,left:b.left}}},{"./getDimensions":253,"./utils/getBoundingClientRect":262}],258:[function(d,f,e){arguments[4][43][0].apply(e,arguments)
},{dup:43}],259:[function(d,f,e){arguments[4][44][0].apply(e,arguments)},{dup:44}],260:[function(m,l,n){var k=m("./getPagePosition");
var o=m("./utils/getBoundingClientRect");var p=m("./getScrollX");var i=m("./getScrollY");
l.exports=function j(d,a){var e;var b;var c;if(a){e=o(d);return{top:e.top,right:e.right,bottom:e.bottom,left:e.left}
}e=k(d);b=p();c=i();return{top:e.top-c,right:e.right-b,bottom:e.bottom-c,left:e.left-b}
}},{"./getPagePosition":254,"./getScrollX":258,"./getScrollY":259,"./utils/getBoundingClientRect":262}],261:[function(g,k,h){var i=g("./getPixelsInViewport");
var l=g("./getPercentInViewport");k.exports=function j(b,a,d){var c;d=d||0;if(typeof d==="string"&&d.slice(-2)==="px"){d=parseInt(d,10);
c=i(b,a)}else{c=l(b,a)}return(c>0&&c>=d)}},{"./getPercentInViewport":255,"./getPixelsInViewport":256}],262:[function(h,g,e){g.exports=function f(b){var a=b.getBoundingClientRect();
return{top:a.top,right:a.right,bottom:a.bottom,left:a.left,width:a.width||a.right-a.left,height:a.height||a.bottom-a.top}
}},{}],263:[function(A,C,y){var u=A("@marcom/ac-event-emitter-micro");var F=A("@marcom/ac-dom-metrics");
var E=A("@marcom/ac-keyboard/Keyboard");var r={num:37,string:"ArrowLeft"};var q={num:38,string:"ArrowUp"};
var t={num:39,string:"ArrowRight"};var w={num:40,string:"ArrowDown"};var v=[r,t,w,t];
var B=function(c){if(c.which){return c.which}var b=(c.key)?c.key:c.code;var a=0;
var d=v.length;for(;a<d;a++){if(v[a].string===b){return v[a].num}}return -1};var D={min:0,max:1,step:1,value:0,orientation:"horizontal",renderedPosition:false,template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb"></div>\n</div>',keyboardMaxStepPercentage:0.05,keyboardStepMultiplier:1.25};
var s=Object.keys(D);var z=function(b,c){this.options=Object.assign({},D,c);this.model=Object.create(this.options);
this.el=b;var a=(this.options.keyboardContext!==undefined)?this.options.keyboardContext:this.el;
if(a!==null){this._keyboard=new E(a);this._keyDown={}}b.className+=" ac-slider-container";
b.innerHTML=this.model.template;u.EventEmitterMicro.call(this);this.initialize()
};z.prototype=Object.create(u.EventEmitterMicro.prototype);var x=z.prototype;x.addEventListeners=function(){this.addEventListener(this.el,"mousedown",this.onMouseDown);
this.addEventListener(this.el,"touchstart",this.onTouchStart);this.addEventListener(this.el,"mouseover",this.onMouseOver);
this.addEventListener(this.el,"mouseleave",this.onMouseLeave);this.addEventListener(this.el,"touchend",this.onTouchEnd);
this.addEventListener(document,"touchend",this.onMouseUp);if(this._keyboard){if(this.model.orientation==="horizontal"){this._keyboard.onDown(t.num,this.stepUp);
this._keyboard.onDown(r.num,this.stepDown)}else{this._keyboard.onDown(w.num,this.stepDown);
this._keyboard.onDown(q.num,this.stepUp)}}};x.addEventListener=function(c,b,a){c.addEventListener(b,a)
};x.bindMethods=function(){this.stepDown=this.stepDown.bind(this);this.stepUp=this.stepUp.bind(this);
this._triggerRelease=this._triggerRelease.bind(this);this._preventDefault=this._preventDefault.bind(this);
this.onMouseDown=this.bindMethod(this.onMouseDown,this);this.onTouchStart=this.bindMethod(this.onTouchStart,this);
this.onMouseOver=this.bindMethod(this.onMouseOver,this);this.onMouseLeave=this.bindMethod(this.onMouseLeave,this);
this.onTouchEnd=this.bindMethod(this.onTouchEnd,this);this.onMouseUp=this.bindMethod(this.onMouseUp,this);
this.onMouseMove=this.bindMethod(this.onMouseMove,this);this.onTouchMove=this.bindMethod(this.onTouchMove,this)
};x.bindMethod=function(a,b){return a.bind(b)};x.correctValueMinMax=function(a,b,c){if(a>c){a=c
}if(a<b){a=b}return a};x.calculateStepsToValue=function(a,b){return Math.abs(a-b)
};x.calculateMaxSteps=function(a,b){return Math.abs(b-a)};x.calculateStepsEqualToPercentage=function(a,b){return(a/100)*b
};x.calculateNextStepInRange=function(a,f,g,b){var d=this.calculateMaxSteps(f,g);
var c=this.calculateStepsToValue(a,f);var e=f+(Math.floor(d/b)*b);a=Math.min(e,f+Math.round(c/b)*b);
return a};x.dispatchEvent=function(b,a){b.dispatchEvent(new CustomEvent(a))};x.disableUserControls=function(){this.removeEventListeners()
};x.enableUserControls=function(){this.addEventListeners()};x.getNextValue=function(a,c,d,b){a=this.correctValueMinMax(a,c,d);
if(b!=="auto"){a=this.calculateNextStepInRange(a,c,d,b)}return a};x.getOrientation=function(){return this.model.orientation
};x.getValue=function(){return this.model.value};x.getMin=function(){return this.model.min
};x.getMax=function(){return this.model.max};x.getStep=function(){return this.model.step
};x.getClientXValue=function(f,e){var b=this.getClientXFromEvent(f);var d=(e!==null)?F.getDimensions(e||this.thumbElement):{width:0,height:0};
var c=F.getDimensions(this.runnableTrackElement);var j=b-this.runnableTrackElement.getBoundingClientRect().left-Math.round(d.width/2);
var g=c.width-d.width;var a=j/(g)*100;var i=this.calculateMaxSteps(this.getMin(),this.getMax());
var h=this.calculateStepsEqualToPercentage(a,i);return this.getMin()+h};x.getClientYValue=function(f){var b=this.getClientYFromEvent(f);
var d=F.getDimensions(this.thumbElement);var c=F.getDimensions(this.runnableTrackElement);
var a=F.getViewportPosition(this.runnableTrackElement,this.model.renderedPosition);
var g=c.height-d.height;var e=g-(b-a.top-(d.height/2));var j=e/(c.height-d.height)*100;
var i=this.calculateMaxSteps(this.model.min,this.model.max);var h=this.calculateStepsEqualToPercentage(j,i);
return this.model.min+h};x.getClientValue=function(a){a=a.originalEvent||a;var b;
if(this.model.orientation==="horizontal"){b=this.getClientXValue(a)}else{b=this.getClientYValue(a)
}return b};x.getClientXFromEvent=function(a){return a.touches?a.touches[0].clientX:a.clientX
};x.getClientYFromEvent=function(a){return a.touches?a.touches[0].clientY:a.clientY
};x.initialize=function(){this.setNodeReferences();this.setValue(this.model.value);
this.bindMethods();this.addEventListeners()};x.onMouseLeave=function(){this.preventDocumentMouseUpDispatch=false
};x.onMouseDown=function(a){var b=this.getClientValue(a);this.addEventListener(document,"mouseup",this.onMouseUp);
this.addEventListener(document,"mousemove",this.onMouseMove);this.trigger("grab",this.getValue());
this.setValue(b)};x.onMouseUp=function(){this.removeEventListener(document,"mouseup",this.onMouseUp);
this.removeEventListener(document,"mousemove",this.onMouseMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"mouseup")}};
x.onMouseOver=function(){this.preventDocumentMouseUpDispatch=true};x.onTouchEnd=function(){this.removeEventListener(document,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchmove",this.onTouchMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"touchend")
}};x.onTouchStart=function(a){var b=this.getClientValue(a);this.addEventListener(document,"touchend",this.onMouseUp);
this.addEventListener(document,"touchmove",this.onTouchMove);this.trigger("grab",this.getValue());
this.setValue(b)};x.onMouseMove=function(a){var b=this.getClientValue(a);this.setValue(b)
};x.onTouchMove=function(a){if(a.preventDefault){a.preventDefault()}var b=this.getClientValue(a);
this.setValue(b)};x.getElementOrientationOffsetValue=function(a,b){if(b==="horizontal"){return F.getDimensions(a).width
}return F.getDimensions(a).height};x.getAvailableRunnableTrack=function(a,c){var b=this.getElementOrientationOffsetValue(this.thumbElement,c);
return a-b};x.getPercentageByValue=function(a,b){a=this.calculateStepsToValue(a,this.getMin());
b=this.calculateMaxSteps(this.getMin(),this.getMax());return(a/b)*100};x.getPercentageOfRunnableTrack=function(b){var e=this.getOrientation();
var a=this.getElementOrientationOffsetValue(this.runnableTrackElement,e);var f=this.getAvailableRunnableTrack(a,e);
var c=this.getPercentageByValue(b,this.getMax());var d=(c/100)*f;return(d/a)*100
};x.onChange=function(a){var b=this.getPercentageOfRunnableTrack(a);if(isNaN(b)){return
}if(this.getOrientation()==="horizontal"){this.thumbElement.style.left=b+"%"}else{this.thumbElement.style.bottom=b+"%"
}this.trigger("change",this.getValue())};x.removeEventListeners=function(){this.removeEventListener(this.el,"mousedown",this.onMouseDown);
this.removeEventListener(this.el,"touchstart",this.onTouchStart);this.removeEventListener(this.el,"mouseover",this.onMouseOver);
this.removeEventListener(this.el,"mouseleave",this.onMouseLeave);this.removeEventListener(this.el,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchend",this.onMouseUp)};x.removeEventListener=function(c,b,a){c.removeEventListener(b,a)
};x.setNodeReferences=function(){this.runnableTrackElement=this.el.querySelector(".ac-slider-runnable-track");
this.thumbElement=this.el.querySelector(".ac-slider-thumb")};x.setOrientation=function(a){this.set("orientation",a)
};x._triggerRelease=function(a){this._preventDefault(a);this.trigger("release",this.getValue());
this._keyDown[B(a)]=0};x._preventDefault=function(a){a.preventDefault();a.stopPropagation()
};x._step=function(b,c){this._preventDefault(b);this.el.focus();var a=this._keyDown[B(b)]||0;
if(!a){this.trigger("grab",this.getValue());a=this.getStep();a=(a!=="auto")?a:this._cachedMaxStep;
if(!c){a*=-1}this._keyboard.onceUp(B(b),this._triggerRelease)}else{if(Math.abs(this._keyDown[B(b)])<(Math.abs(this.model.max*this.model.keyboardMaxStepPercentage))){a*=this.model.keyboardStepMultiplier
}}this._keyDown[B(b)]=a;this.setValue(this.getValue()+a)};x.stepUp=function(a){this._step(a,true)
};x.stepDown=function(a){this._step(a,false)};x.setValue=function(a){a=this.getNextValue(a,this.getMin(),this.getMax(),this.getStep());
this.set("value",a);this.el.setAttribute("aria-valuenow",a);this.onChange(a)};x.setMin=function(a){this.set("min",a);
this.el.setAttribute("aria-valuemin",a)};x.setMax=function(a){this.set("max",a);
this.el.setAttribute("aria-valuemax",a);this._cachedMaxStep=a/100};x.setStep=function(a){this.set("step",a)
};x.set=function(c,a){if(s.indexOf(c)>-1&&this.model[c]!==a){var b=this.model[c];
this.model[c]=a;this.trigger("change:model:"+c,{previous:b,current:a})}};x._removeEventListeners=function(){this.removeEventListener(this.el,"mousedown",this.onMouseDown);
this.removeEventListener(this.el,"touchstart",this.onTouchStart);this.removeEventListener(this.el,"mouseover",this.onMouseOver);
this.removeEventListener(this.el,"mouseleave",this.onMouseLeave);this.removeEventListener(this.el,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchend",this.onMouseUp);if(this.model.orientation==="horizontal"){this._keyboard.offDown(t.num,this.stepUp);
this._keyboard.offDown(r.num,this.stepDown);this._keyboard.offUp(r.num,this._triggerRelease);
this._keyboard.offUp(t.num,this._triggerRelease)}else{this._keyboard.offDown(w.num,this.stepDown);
this._keyboard.offDown(q.num,this.stepUp);this._keyboard.offUp(w.num,this._triggerRelease);
this._keyboard.offUp(q.num,this._triggerRelease)}};x.destroy=function(){this._removeEventListeners();
if(this._keyboard){this._keyboard.destroy()}u.EventEmitterMicro.prototype.destroy.call(this)
};C.exports=z},{"@marcom/ac-dom-metrics":251,"@marcom/ac-event-emitter-micro":199,"@marcom/ac-keyboard/Keyboard":226}],264:[function(d,f,e){f.exports.Slider=d("./Slider")
},{"./Slider":263}],265:[function(d,f,e){f.exports=d("./lib/")},{"./lib/":266}],266:[function(d,f,e){arguments[4][115][0].apply(e,arguments)
},{"./parse":267,"./stringify":268,dup:115}],267:[function(f,j,g){var h=f("./utils");
var i={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1000};i.parseValues=function(e,a){var r={};
var s=e.split(a.delimiter,a.parameterLimit===Infinity?undefined:a.parameterLimit);
for(var q=0,c=s.length;q<c;++q){var u=s[q];var d=u.indexOf("]=")===-1?u.indexOf("="):u.indexOf("]=")+1;
if(d===-1){r[h.decode(u)]=""}else{var b=h.decode(u.slice(0,d));var t=h.decode(u.slice(d+1));
if(!r.hasOwnProperty(b)){r[b]=t}else{r[b]=[].concat(r[b]).concat(t)}}}return r};
i.parseObject=function(c,a,d){if(!c.length){return a}var p=c.shift();var b={};if(p==="[]"){b=[];
b=b.concat(i.parseObject(c,a,d))}else{var e=p[0]==="["&&p[p.length-1]==="]"?p.slice(1,p.length-1):p;
var n=parseInt(e,10);var o=""+n;if(!isNaN(n)&&p!==e&&o===e&&n>=0&&n<=d.arrayLimit){b=[];
b[n]=i.parseObject(c,a,d)}else{b[e]=i.parseObject(c,a,d)}}return b};i.parseKeys=function(e,a,p){if(!e){return
}var d=/^([^\[\]]*)/;var q=/(\[[^\[\]]*\])/g;var b=d.exec(e);if(Object.prototype.hasOwnProperty(b[1])){return
}var c=[];if(b[1]){c.push(b[1])}var o=0;while((b=q.exec(e))!==null&&o<p.depth){++o;
if(!Object.prototype.hasOwnProperty(b[1].replace(/\[|\]/g,""))){c.push(b[1])}}if(b){c.push("["+e.slice(b.index)+"]")
}return i.parseObject(c,a,p)};j.exports=function(p,a){if(p===""||p===null||typeof p==="undefined"){return{}
}a=a||{};a.delimiter=typeof a.delimiter==="string"||h.isRegExp(a.delimiter)?a.delimiter:i.delimiter;
a.depth=typeof a.depth==="number"?a.depth:i.depth;a.arrayLimit=typeof a.arrayLimit==="number"?a.arrayLimit:i.arrayLimit;
a.parameterLimit=typeof a.parameterLimit==="number"?a.parameterLimit:i.parameterLimit;
var e=typeof p==="string"?i.parseValues(p,a):p;var r={};var b=Object.keys(e);for(var q=0,d=b.length;
q<d;++q){var c=b[q];var s=i.parseKeys(c,e[c],a);r=h.merge(r,s)}return h.compact(r)
}},{"./utils":269}],268:[function(f,j,g){var h=f("./utils");var i={delimiter:"&",indices:true};
i.stringify=function(a,b,e){if(h.isBuffer(a)){a=a.toString()}else{if(a instanceof Date){a=a.toISOString()
}else{if(a===null){a=""}}}if(typeof a==="string"||typeof a==="number"||typeof a==="boolean"){return[encodeURIComponent(b)+"="+encodeURIComponent(a)]
}var o=[];if(typeof a==="undefined"){return o}var q=Object.keys(a);for(var c=0,p=q.length;
c<p;++c){var d=q[c];if(!e.indices&&Array.isArray(a)){o=o.concat(i.stringify(a[d],b,e))
}else{o=o.concat(i.stringify(a[d],b+"["+d+"]",e))}}return o};j.exports=function(a,e){e=e||{};
var o=typeof e.delimiter==="undefined"?i.delimiter:e.delimiter;e.indices=typeof e.indices==="boolean"?e.indices:i.indices;
var b=[];if(typeof a!=="object"||a===null){return""}var q=Object.keys(a);for(var c=0,p=q.length;
c<p;++c){var d=q[c];b=b.concat(i.stringify(a[d],d,e))}return b.join(o)}},{"./utils":269}],269:[function(e,h,f){var g={};
f.arrayToObject=function(b){var a={};for(var c=0,d=b.length;c<d;++c){if(typeof b[c]!=="undefined"){a[c]=b[c]
}}return a};f.merge=function(a,b){if(!b){return a}if(typeof b!=="object"){if(Array.isArray(a)){a.push(b)
}else{a[b]=true}return a}if(typeof a!=="object"){a=[a].concat(b);return a}if(Array.isArray(a)&&!Array.isArray(b)){a=f.arrayToObject(a)
}var d=Object.keys(b);for(var n=0,k=d.length;n<k;++n){var m=d[n];var c=b[m];if(!a[m]){a[m]=c
}else{a[m]=f.merge(a[m],c)}}return a};f.decode=function(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}};f.compact=function(a,n){if(typeof a!=="object"||a===null){return a
}n=n||[];var b=n.indexOf(a);if(b!==-1){return n[b]}n.push(a);if(Array.isArray(a)){var p=[];
for(var d=0,o=a.length;d<o;++d){if(typeof a[d]!=="undefined"){p.push(a[d])}}return p
}var c=Object.keys(a);for(d=0,o=c.length;d<o;++d){var i=c[d];a[i]=f.compact(a[i],n)
}return a};f.isRegExp=function(a){return Object.prototype.toString.call(a)==="[object RegExp]"
};f.isBuffer=function(a){if(a===null||typeof a==="undefined"){return false}return !!(a.constructor&&a.constructor.isBuffer&&a.constructor.isBuffer(a))
}},{}],270:[function(d,f,e){f.exports={Link:d("./ac-social/Link"),Dialog:d("./ac-social/Dialog"),Focus:d("./ac-social/Focus"),Debug:d("./ac-social/Debug")}
},{"./ac-social/Debug":271,"./ac-social/Dialog":272,"./ac-social/Focus":273,"./ac-social/Link":274}],271:[function(l,k,g){var h=l("./NetworkActions");
function i(){this.types={};var a;for(a in h){if(h.hasOwnProperty(a)){j[a]=a;this.addType(a,h[a].getDialogDebugData.bind(h[a]))
}}}var j=i.prototype;j.create=function(c,a){a=a||{};var b=this.types[c];if(!b){return
}return b(a)};j.addType=function(b,a){this.types[b]=a;return this};j.removeType=function(){this.types[name]=null;
return this};k.exports=new i()},{"./NetworkActions":275}],272:[function(k,j,l){var h=k("./NetworkActions");
function g(){this.types={};var a;for(a in h){if(h.hasOwnProperty(a)){i[a]=a;this.addType(a,h[a].generateDialog.bind(h[a]))
}}}var i=g.prototype;i.create=function(c,a){a=a||{};var b=this.types[c];if(!b){return
}return b(a)};i.addType=function(b,a){this.types[b]=a;return this};i.removeType=function(){this.types[name]=null;
return this};j.exports=new g()},{"./NetworkActions":275}],273:[function(d,f,e){f.exports=function(a){if(window.getSelection){var b=window.getSelection();
var c=document.createRange();c.selectNodeContents(a);b.removeAllRanges();b.addRange(c)
}else{if(a.setSelectionRange){a.setSelectionRange(0,a.value.length)}else{if(document.body.createTextRange){var c=document.body.createTextRange();
c.moveToElementText(a);c.select()}}}}},{}],274:[function(l,k,n){var i=l("./NetworkActions"),h=l("./network-actions/DefaultNetworkAction");
function m(){this.types={};var a;for(a in i){if(i.hasOwnProperty(a)){j[a]=a;this.addType(a,i[a].generateLink.bind(i[a]))
}}}var j=m.prototype;j.create=function(c,a,d){a=a||{};var b=this.types[c];if(!b){return
}return b(a,d)};j.createFromAnchor=function(a){var c=a.getAttribute("data-network-action");
var b;for(b in i){if(i.hasOwnProperty(b)){if(c===i[b].id){i[b].enhanceLinkEngagement(a);
return}}}h.enhanceLinkEngagement(a)};j.addType=function(b,a){this.types[b]=a;return this
};j.removeType=function(){this.types[name]=null;return this};k.exports=new m()},{"./NetworkActions":275,"./network-actions/DefaultNetworkAction":276}],275:[function(A,B,y){var s=A("./network-actions/FacebookShare"),t=A("./network-actions/PinterestShare"),r=A("./network-actions/TumblrShare"),z=A("./network-actions/TwitterFavorite"),w=A("./network-actions/TwitterReply"),p=A("./network-actions/TwitterRetweet"),q=A("./network-actions/TwitterTweet"),u=A("./network-actions/WeiboShare"),C=A("./network-actions/QQWeiboShare"),v=A("./network-actions/QZoneShare"),x=A("./network-actions/RenrenShare"),D=A("./network-actions/EMailShare");
B.exports={FACEBOOK_SHARE:s,PINTEREST_SHARE:t,TUMBLR_SHARE:r,TWITTER_FAVORITE:z,TWITTER_REPLY:w,TWITTER_RETWEET:p,TWITTER_TWEET:q,WEIBO_SHARE:u,QQWEIBO_SHARE:C,QZONE_SHARE:v,RENREN_SHARE:x,EMAIL_SHARE:D}
},{"./network-actions/EMailShare":277,"./network-actions/FacebookShare":278,"./network-actions/PinterestShare":280,"./network-actions/QQWeiboShare":281,"./network-actions/QZoneShare":282,"./network-actions/RenrenShare":283,"./network-actions/TumblrShare":284,"./network-actions/TwitterFavorite":285,"./network-actions/TwitterReply":286,"./network-actions/TwitterRetweet":287,"./network-actions/TwitterTweet":288,"./network-actions/WeiboShare":289}],276:[function(j,i,g){var h=j("./NetworkAction");
var f=function(a){return a};i.exports=new h(f,{baseLinkPath:""})},{"./NetworkAction":279}],277:[function(j,i,g){var h=j("./NetworkAction");
var f=function(a){var b={url:a.url};if(a.title){b.subject=a.title}if(a.description){b.body=a.description+"\r\n\r\n"+a.url
}else{b.body=a.url}return b};i.exports=new h(f,{id:"email-share",baseLinkPath:"mailto:",preventDialog:true})
},{"./NetworkAction":279}],278:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){return{u:a.url}
};i.exports=new h(f,{id:"facebook-share",baseLinkPath:"https://www.facebook.com/sharer/sharer.php",dialogDimensions:{width:555,height:368}})
},{"./NetworkAction":279}],279:[function(l,k,g){var h=l("qs");var i;var j=function(a,b){b=b||{};
this.baseLinkPath=b.baseLinkPath;if(b.dialogDimensions){this.dialogDimensions=b.dialogDimensions
}if(b.id){this.id=b.id}if(b.preventDialog){this.preventDialog=b.preventDialog}this.normalizeData=a
};i=j.prototype;i.dataAttributeName="network-action";i.id="network-action";i.normalizeData=function(a){return a
};i.dialogDimensions={width:500,height:500};i.generateLinkURL=function(a){var b=this.normalizeData(a),c=h.stringify(b),d=this.baseLinkPath;
if(c.length>0){d=d+"?"+c}return d};i.generateLink=function(a,b){var c=this.generateLinkURL(a);
b=b||document.createElement("A");b.setAttribute("href",c);b.setAttribute("target","_blank");
b.setAttribute("data-"+this.dataAttributeName,this.id);this.enhanceLinkEngagement(b,c);
return b};i.generateDialog=function(a){var b=this.generateLinkURL(a);this._triggerDialog(b)
};i.enhanceLinkEngagement=function(a,c){var b=this||i;c=c||a.getAttribute("href");
a.addEventListener("click",this._onLinkEngaged.bind(this,c))};i.getDialogOptions=function(){var b,a="status=1",c={width:this.dialogDimensions.width,height:this.dialogDimensions.height};
c.top=(window.screen.availHeight-c.height)/2;c.left=(window.screen.availWidth-c.width)/2;
for(b in c){if(c.hasOwnProperty(b)){a+=", "+b+"="+c[b]}}return a};i.getDialogDebugData=function(a){return{data:this.normalizeData(a),dialogUrl:this.generateLinkURL(a)}
};i._triggerDialog=function(a){if(this.preventDialog){window.location.href=a;return
}window.open(a,"_blank",this.getDialogOptions())};i._onLinkEngaged=function(b,a){a.preventDefault();
this._triggerDialog(b)};k.exports=j},{qs:265}],280:[function(j,i,g){var h=j("./NetworkAction");
var f=function(a){var b={url:a.url,description:a.description};if(a.media){b.media=a.media
}return b};i.exports=new h(f,{id:"pinterest-share",baseLinkPath:"http://www.pinterest.com/pin/create/button",dialogDimensions:{width:750,height:450}})
},{"./NetworkAction":279}],281:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){return{url:a.url,title:a.title,pic:a.media}
};i.exports=new h(f,{id:"qq-weibo-share",baseLinkPath:"http://v.t.qq.com/share/share.php",dialogDimensions:{width:658,height:506}})
},{"./NetworkAction":279}],282:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){return{url:a.url,title:a.title,pics:a.media,summary:a.description}
};i.exports=new h(f,{id:"qzone-share",baseLinkPath:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",dialogDimensions:{width:620,height:645}})
},{"./NetworkAction":279}],283:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){return{url:a.url,title:a.title}
};i.exports=new h(f,{id:"renren-share",baseLinkPath:"http://www.connect.renren.com/share/sharer",dialogDimensions:{width:500,height:315}})
},{"./NetworkAction":279}],284:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){var b={clickthru:a.url,caption:a.description};
if(a.media){b.source=a.media}return b};i.exports=new h(f,{id:"tumblr-share",baseLinkPath:"http://www.tumblr.com/share/photo",dialogDimensions:{width:450,height:432}})
},{"./NetworkAction":279}],285:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){var b={tweet_id:a.messageId};
return b};i.exports=new h(f,{id:"twitter-favorite",baseLinkPath:"https://twitter.com/intent/favorite",dialogDimensions:{width:550,height:420}})
},{"./NetworkAction":279}],286:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){var b={in_reply_to:a.messageId};
if(a.hashtags){b.hashtags=a.hashtags}return b};i.exports=new h(f,{id:"twitter-reply",baseLinkPath:"https://twitter.com/intent/tweet",dialogDimensions:{width:550,height:420}})
},{"./NetworkAction":279}],287:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){var b={tweet_id:a.messageId};
return b};i.exports=new h(f,{id:"twitter-retweet",baseLinkPath:"https://twitter.com/intent/retweet",dialogDimensions:{width:550,height:420}})
},{"./NetworkAction":279}],288:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){var b={url:a.url,text:a.description};
if(a.hashtags){b.hashtags=a.hashtags}return b};i.exports=new h(f,{id:"twitter-tweet",baseLinkPath:"https://twitter.com/intent/tweet",dialogDimensions:{width:550,height:420}})
},{"./NetworkAction":279}],289:[function(j,i,g){var h=j("./NetworkAction");var f=function(a){return{url:a.url,title:a.title,pic:a.media}
};i.exports=new h(f,{id:"weibo-share",baseLinkPath:"http://service.weibo.com/share/share.php",dialogDimensions:{width:650,height:426}})
},{"./NetworkAction":279}],290:[function(e,h,f){h.exports=function g(a,b,c){if(!b){return a
}c=c||/{([^{}]*)}/g;return a.replace(c,function(k,l){var d=b[l];return(typeof d==="string"||typeof d==="number"||typeof d==="boolean")?d:k
})}},{}],291:[function(d,f,e){arguments[4][114][0].apply(e,arguments)},{dup:114,qs:292}],292:[function(d,f,e){arguments[4][115][0].apply(e,arguments)
},{"./parse":293,"./stringify":294,dup:115}],293:[function(d,f,e){arguments[4][116][0].apply(e,arguments)
},{"./utils":295,dup:116}],294:[function(d,f,e){arguments[4][117][0].apply(e,arguments)
},{"./utils":295,dup:117}],295:[function(d,f,e){arguments[4][118][0].apply(e,arguments)
},{dup:118}],296:[function(d,f,e){arguments[4][135][0].apply(e,arguments)},{"./parseUserAgent":299,dup:135}],297:[function(d,f,e){arguments[4][136][0].apply(e,arguments)
},{dup:136}],298:[function(d,f,e){arguments[4][137][0].apply(e,arguments)},{dup:137}],299:[function(d,f,e){arguments[4][138][0].apply(e,arguments)
},{"./defaults":297,"./dictionary":298,dup:138}],300:[function(f,j,g){var h=function(a){this.el=a
};var i=h.prototype;i.on=function(){this.el.addEventListener.apply(this.el,arguments)
};i.off=function(){this.el.removeEventListener.apply(this.el,arguments)};i.once=function(a,b){var c=function(){b();
this.off(a,c)}.bind(this);this.on(a,c)};i.trigger=function(b,a){var c=new CustomEvent(b,a);
this.el.dispatchEvent(c)};j.exports=h},{}],301:[function(h,m,i){var j=h("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var k=function(){j.call(this)};var n=j.prototype;k.prototype=Object.create(n);var l=k.prototype;
l.constructor=k;l.once=function(c,a,b){if(b){var d=function(){a.apply(b,arguments)
};n.once.apply(this,[c,d])}else{n.once.apply(this,arguments)}};l.on=function(c,a,d){if(arguments.length>2){if(!this._boundListeners){this._boundListeners={}
}if(!this._boundListeners[c]){this._boundListeners[c]=[]}var b=a.bind(d);this._boundListeners[c].push([a,d,b]);
return n.on.call(this,c,b)}else{return n.on.apply(this,arguments)}};l.off=function(b,f,c){if(arguments.length>2){try{var q=this._boundListeners[b];
var d=0;var e=q.length;for(;d<e;d++){if(q[d][0]===f&&q[d][1]===c){var a=q.splice(d,1)[0];
return n.off.call(this,b,a[2])}}}catch(g){}}else{return n.off.apply(this,arguments)
}};l.destroy=function(){this._boundListeners=undefined;n.destroy.call(this)};m.exports=k
},{"@marcom/ac-event-emitter-micro":199}],302:[function(d,f,e){f.exports=d("./utils/urlOptimizer/OptimizeVideoUrl")
},{"./utils/urlOptimizer/OptimizeVideoUrl":358}],303:[function(S,ag,O){var U=S("../event-emitter-shim/EventEmitterShim");
var G=S("../dom-emitter/DOMEmitterMicro");var ab=S("../video/VideoFactory").create;
var Q=S("@marcom/ac-useragent");var aa=S("@marcom/ac-fullscreen");var Y=S("../posterframe/PosterFrameFactory");
var K=S("@marcom/ac-feature/isRetina")();var Z=S("@marcom/ac-feature/isDesktop")();
var M=S("@marcom/ac-feature/isHandheld")();var R=Q.browser.safari&&Q.os.osx;var X=Q.browser.safari&&Q.os.ios;
var aj=Q.browser.chrome;var L="user-hover";var ae="mobile";var ah="initial-play";
var P="ac-video-live";var N="longform";var I=S("../ui/DefaultBreakpoints");var V=S("@marcom/ac-console/log");
var ad=S("./event/EventsToForward");var T=S("./event/ReadyStateChangeEvents");var af=S("../utils/BreakpointDetect");
var ac=S("../ui/KeyboardControl");var F=S("@marcom/ac-accessibility/helpers/hide");
var W=S("@marcom/ac-accessibility/helpers/show");var H=function(b){b=b||{};this.el=b.el||document.createElement("div");
this._elementEmitter=new G(this.el);this.options=b;U.call(this);this._controlsFactory=b.controlsFactory;
this._urlOptimizer=b.urlOptimizer;try{var c=window.top;this._maxWidth=b.maxWidth||Math.min(window.innerWidth,1280)||Math.min(c.innerWidth,1280)
}catch(a){this._maxWidth=b.maxWidth||Math.min(window.innerWidth,1280)}this._lastResize=0;
this._lastMouseCoords={};this.el.classList.add("ac-video-player");this._isResponsive=b.responsive;
if(this._isResponsive){this._breakpointDetect=new af({el:this.el,player:this,breakpoints:I,addClass:true})
}this._isLive=b.live;if(this._isLive){this._useLiveMode()}this._videoImpl=ab(b,this.el);
this._supportsInlineVideo=Z||!(M&&X);this._cachedPiPMode=this.isPictureInPicture();
this._cachedReadyState=this.getReadyState();this._cachedVisibleTracksLength=0;this.el.appendChild(this._videoImpl.getMediaElement());
if(b.poster||typeof(b.poster)==="undefined"){this._initPoster(b.poster)}this._bindMethods();
this._addEventListeners();if(Z){this._keyboardControl=new ac({player:this,keyboardTarget:b.keyboardTarget})
}if(b.controls){this._initUIComponents()}if(b.parentElement){b.parentElement.appendChild(this.el)
}this.refreshSize=this.refreshSize.bind(this);setTimeout(this.refreshSize,0);window.addEventListener("DOMContentLoaded",this.refreshSize)
};H.LOADEDMETADATA=1;H.LOADEDDATA=2;H.CANPLAY=3;H.CANPLAYTHROUGH=4;var ai=U.prototype;
H.prototype=Object.create(ai);var J=H.prototype;J.constructor=H;J._bindMethods=function(){this._onStart=this._onStart.bind(this);
this._onEnded=this._onEnded.bind(this);this._onTimeUpdate=this._onTimeUpdate.bind(this);
this._onCaptionsChanged=this._onCaptionsChanged.bind(this);this._onPlay=this._onPlay.bind(this);
this._onFullscreenChange=this._onFullscreenChange.bind(this);this._forwardEvent=this._forwardEvent.bind(this);
this._onPresentationModeChanged=this._onPresentationModeChanged.bind(this);this._forwardFullScreenChangeEvent=this._forwardNamedEvent.bind(this,"fullscreen:change");
this._forwardEnterFullScreenEvent=this._forwardNamedEvent.bind(this,"enterfullscreen");
this._forwardExitFullScreenEvent=this._forwardNamedEvent.bind(this,"exitfullscreen");
this._onDurationChange=this._onDurationChange.bind(this);this._forwardReadyStateChange=this._forwardReadyStateChange.bind(this);
this._onFocusIn=this._onFocusIn.bind(this);this._onFocusOut=this._onFocusOut.bind(this);
this._showControls=this._showControls.bind(this);this._hideControls=this._hideControls.bind(this);
this._onClick=this._onClick.bind(this);this._onUserInteraction=this._onUserInteraction.bind(this);
this._onMouseLeave=this._onMouseLeave.bind(this);this._onMouseOut=this._onMouseOut.bind(this);
this._onPlayPromiseError=this._onPlayPromiseError.bind(this)};J._addEventListeners=function(){var a=0;
var b=ad.length;for(;a<b;a++){this._videoImpl.on(ad[a],this._forwardEvent)}a=0;
b=T.length;for(;a<b;a++){this._videoImpl.on(T[a],this._forwardReadyStateChange)
}this._videoImpl.on("timeupdate",this._onTimeUpdate);this._videoImpl.on("webkitpresentationmodechanged",this._onPresentationModeChanged);
this._videoImpl.on("durationchange",this._onDurationChange);this._videoImpl.on("addtrack",this._forwardEvent);
this._videoImpl.on("change",this._forwardEvent);this._videoImpl.on("change",this._onCaptionsChanged);
this._videoImpl.on("removetrack",this._forwardEvent);if(Z){aa.on("enterfullscreen",this._forwardEnterFullScreenEvent);
aa.on("exitfullscreen",this._forwardExitFullScreenEvent);aa.on("enterfullscreen",this._forwardFullScreenChangeEvent);
aa.on("exitfullscreen",this._forwardFullScreenChangeEvent)}else{if(X){this._videoImpl.on("webkitbeginfullscreen",this._forwardEnterFullScreenEvent);
this._videoImpl.on("webkitendfullscreen",this._forwardExitFullScreenEvent);this._videoImpl.on("webkitbeginfullscreen",this._forwardFullScreenChangeEvent);
this._videoImpl.on("webkitendfullscreen",this._forwardFullScreenChangeEvent);if(M){this.on("fullscreen:change",this._onFullscreenChange)
}}}this._videoImpl.on("PlayPromiseError",this._onPlayPromiseError);this._elementEmitter.on("focusin",this._onFocusIn);
this._elementEmitter.on("focusout",this._onFocusOut);this.on("fullscreen:change",this._onFullscreenChange)
};J._removeEventListeners=function(){var a=0;var b=ad.length;for(;a<b;a++){this._videoImpl.off(ad[a],this._forwardEvent)
}a=0;b=T.length;for(;a<b;a++){this._videoImpl.off(T[a],this._forwardReadyStateChange)
}this._videoImpl.off("timeupdate",this._onTimeUpdate);this._videoImpl.off("webkitpresentationmodechanged",this._onPresentationModeChanged);
this._videoImpl.off("durationchange",this._onDurationChange);if(Z){aa.off("enterfullscreen",this._forwardEnterFullScreenEvent);
aa.off("exitfullscreen",this._forwardExitFullScreenEvent);aa.off("enterfullscreen",this._forwardFullScreenChangeEvent);
aa.off("exitfullscreen",this._forwardFullScreenChangeEvent)}else{if(Q.os.ios){this._videoImpl.off("webkitbeginfullscreen",this._forwardEnterFullScreenEvent);
this._videoImpl.off("webkitendfullscreen",this._forwardExitFullScreenEvent);this._videoImpl.off("webkitbeginfullscreen",this._forwardFullScreenChangeEvent);
this._videoImpl.off("webkitendfullscreen",this._forwardFullScreenChangeEvent)}}this._elementEmitter.off("focusin",this._onFocusIn);
this._elementEmitter.off("focusout",this._onFocusOut);this._elementEmitter.off("mouseenter",this._onUserInteraction);
if(this.controls){this.controls.el.removeEventListener("mousemove",this._onUserInteraction,true);
this.controls.el.removeEventListener("click",this._onUserInteraction,true)}if(this._blockade){this._blockade.off("mouseenter",this._onUserInteraction);
this._blockade.off("mousemove",this._onUserInteraction);this._blockade.off("click",this._onUserInteraction);
this._elementEmitter.off("click",this._onClick);if("onmouseleave" in this.el){this._blockade.off("mouseleave",this._onMouseLeave)
}else{this._blockade.off("mouseout",this._onMouseOut)}clearTimeout(this._userInteractionTimeout)
}if(this._keyboardControl){this._keyboardControl.off("keyboardinteraction",this._onUserInteraction)
}this.off("fullscreen:change",this._onFullscreenChange);this._videoImpl.off("PlayPromiseError",this._onPlayPromiseError);
clearTimeout(this._userInteractionTimeout)};J._forwardReadyStateChange=function(){var a=this.getReadyState();
if(a>this._cachedReadyState||a===0){this._cachedReadyState=a;this.trigger("readystatechange",{readyState:a})
}};J._forwardEvent=function(a){V(a.type+" time:"+this.getCurrentTime());this.trigger(a.type)
};J._forwardNamedEvent=function(a){V(a+" time:"+this.getCurrentTime());this.trigger(a)
};J._onPlayPromiseError=function(){V("play() Promise rejected, probably because the browser is blocking autoplay");
this.el.classList.add(ah);this._showStartState();this.once("play",this._onPlay)
};J._onCaptionsChanged=function(b){var a=this.getVisibleTextTracks().length;if(a>0&&this._cachedVisibleTracksLength===0){this.trigger("texttrackshow")
}else{if(a===0&&this._cachedVisibleTracksLength>0){this.trigger("texttrackhide")
}}this._cachedVisibleTracksLength=a};J._onTimeUpdate=function(){this.trigger("timeupdate",{currentTime:this.getCurrentTime()})
};J.load=function(c,d,e,f){this.refreshSize();if(!Array.isArray(c)){c=[c]}if(d&&!Array.isArray(d)){d=[{src:d}]
}this._cachedReadyState=0;if(!f){f=this.options}if(this._urlOptimizer){if(!d){d=c.map(this._urlOptimizer.getCaptionsSource).filter(function(h){return(!!h)
})}var g=this.getVisibleTextTracks();if(g&&g.length&&d&&d.length){d[0].mode="showing"
}var b=f.maxWidth||this._calcMaxWidth();c=c.map(function(h){return this._urlOptimizer.getVideoSource(h,b,null,{maxWidth:this._maxWidth})
}.bind(this))}var a=(f&&f.thumbnails)||(this._urlOptimizer&&this._urlOptimizer.getThumbnailImageSource(c[0]));
this.once("play",this._onPlay);if((this.options.autoplay&&Z)||this.getEnded()){this.once("loadstart",function(){this.play()
}.bind(this))}if(!f){f=this.options}if(f){this.setPoster(f.poster)}if(this._poster){this._poster.show()
}if(this.controls&&this.controls.sharingModule){if(f.sharing){this.controls.sharingModule.setData(f.sharing)
}else{this.controls.sharingModule.setData(null)}}if(f.live!==undefined){this._isLive=f.live;
this._useLiveMode()}this._hideEndState();this._videoImpl.load(c,d,e);if(this.controls&&this.controls.overlays){this.controls.overlays.setData(a)
}else{if(this.controls){this.once("controlsready",function(){this.controls.overlays&&this.controls.overlays.setData(a)
}.bind(this))}}if(this.controls&&this.controls.endState){this.controls.endState.setData(f.endState)
}else{if(this.controls){this.once("controlsready",function(){this.controls.endState&&this.controls.endState.setData(f.endState)
}.bind(this))}}};J._calcMaxWidth=function(){if(this.el.parentElement){return this.el.parentElement.clientWidth
}else{return this._maxWidth}};J._isActiveArea=function(a){while(a!==this.el){if(a.hasAttribute("data-acv-active-area")){return true
}a=a.parentNode}return false};J._onPresentationModeChanged=function(b){this._forwardEvent(b);
var a=this.isPictureInPicture();if(this._cachedPiPMode!==a){this._cachedPiPMode=a;
V("pictureinpicture:change to "+a);this.trigger("pictureinpicture:change")}};J._onDurationChange=function(a){if(this.getDuration()>3600){this.el.classList.add(N)
}};J.appendTo=function(a){a.appendChild(this.el);this.refreshSize()};J.getTextTracks=function(){return Array.prototype.slice.call(this._videoImpl.getTextTracks())
};J.getVisibleTextTracks=function(){var a=Array.prototype.slice.call(this._videoImpl.getTextTracks());
if(a&&a.length){a=a.filter(function(b){return b.mode==="showing"})}return a};J.getFullScreenElement=function(){if(!Z){return this.getMediaElement()
}else{return this.el}};J.getFullScreenEnabled=function(){return aa.fullscreenEnabled(this.getFullScreenElement())
};J.isFullscreen=function(){if(Z){return aa.fullscreenElement()===this.getFullScreenElement()
}else{return this._videoImpl.isFullscreen()}};J.requestFullscreen=function(){if(!this.isFullscreen()){if(this.controls){this.controls.el.display="none"
}this._hideControls();this.trigger("fullscreen:willenter",{type:"enter"});this._lastResize=Date.now();
if(aj){setTimeout(function(){this._lastResize=Date.now();aa.requestFullscreen(this.getFullScreenElement())
}.bind(this),300)}else{aa.requestFullscreen(this.getFullScreenElement())}}};J.exitFullscreen=function(){if(this.isFullscreen()){if(this.controls){this.controls.el.display="none"
}this._hideControls();this.trigger("fullscreen:willexit",{type:"exit"});if(aj){setTimeout(function(){aa.exitFullscreen(this.getFullScreenElement())
}.bind(this),300)}else{aa.exitFullscreen(this.getFullScreenElement())}}};J._onFullscreenChange=function(){this._lastResize=Date.now();
if(this.controls){this.controls.el.display=""}this._hideControls();this._preventUserInteraction=true;
setTimeout(function(){this._preventUserInteraction=false}.bind(this),750)};J.toggleFullscreen=function(){if(this.isFullscreen()){this.exitFullscreen()
}else{this.requestFullscreen()}};J._initUIComponents=function(){if(this._controlsFactory){this._instantiateDefaultCustomUIControls();
if(!Z){this.controls.el.classList.add(ae);this.setControls(true)}else{this.el.appendChild(this._blockade.el)
}}else{this.setControls(true)}};J._onFocusIn=function(){clearTimeout(this._focusOutTimer);
this._focusOutTimer=null;this._hasFocus=true;if(Z){this._onUserInteraction()}};
J._onFocusOut=function(a){this._focusOutTimer=setTimeout(function(){if(this._hasFocus&&!this.el.contains(document.activeElement)){this._hasFocus=false;
this._hideControls()}}.bind(this),100)};J._showControls=function(){this.el.classList.remove(ah);
this.el.classList.add(L)};J._hideControls=function(){this.el.classList.remove(L)
};J._onControlsReady=function(){if(!this.options.autoplay||!Z){this._showStartState()
}};J._showStartState=function(){if(this.controls){this.controls.el.classList.add("start-state")
}if(this._poster){this._poster.show()}if(!Z){F(this.getMediaElement())}};J._hideStartState=function(){if(this.controls){this.controls.el.classList.remove("start-state")
}if(this._poster){this._poster.hide()}if(!Z){W(this.getMediaElement())}};J._showEndState=function(){if(this.controls){if(this.controls.mainControlsElement){if(this.controls.mainControlsElement.contains(document.activeElement)){this.controls.playButtonElement.focus()
}}else{if(this.el.contains(document.activeElement)&&!this.controls.sharingModule.el.contains(document.activeElement)){this.controls.playButtonElement.focus()
}}this.controls.el.classList.add("end-state")}if(this._poster){this._poster.show()
}F(this.getMediaElement())};J._hideEndState=function(){if(this.controls){this.controls.el.classList.remove("end-state")
}if(!Z){W(this.getMediaElement())}};J._instantiateDefaultCustomUIControls=function(){this.controls=this._controlsFactory.create({player:this,endState:this.options.endState,basePath:this.options.localizationBasePath,template:this.options.template,readyCallback:function(){if(!this.options.autoplay||!Z){this._showStartState()
}this.trigger("controlsready")}.bind(this)});if(this.controls.el.parentNode!==this.el){this.el.appendChild(this.controls.el)
}this._videoImpl.setControls(false);this._blockade=new G(document.createElement("div"));
this._blockade.el.classList.add("ac-video-blockade");if(Z){this.controls.el.addEventListener("mousemove",this._onUserInteraction,true);
this.controls.el.addEventListener("click",this._onUserInteraction,true);this._elementEmitter.on("click",this._onClick);
if("onmouseleave" in this.el){this.controls.el.addEventListener("mouseleave",this._onMouseLeave)
}else{this.controls.el.addEventListener("mouseout",this._onMouseOut,true)}if(this._keyboardControl){this._keyboardControl.on("keyboardinteraction",this._onUserInteraction)
}}return this.controls};J._onClick=function(){this._hasFocus=false};J._onMouseLeave=function(a){window.clearTimeout(this._userInteractionTimeout);
this._hideControls();this._lastMouseCoords={}};J._onMouseOut=function(a){if(!this.controls.el.contains(a.target)&&a.target!==this.controls.el){this._onMouseLeave()
}};J._onUserInteraction=function(a){this.controls.el.classList.remove("hide-cursor");
if(!this.getCurrentSrc()||this._preventUserInteraction||(a&&this._lastMouseCoords.x===a.screenX&&this._lastMouseCoords.y===a.screenY)){return
}if(a&&a.pageX){this._lastMouseCoords={x:a.screenX,y:a.screenY}}this._showControls();
window.clearTimeout(this._userInteractionTimeout);if(a&&a.target){if(this._isActiveArea(a.target)){return
}}this._userInteractionTimeout=window.setTimeout(function(){var b=this.getEnded();
if(!b){this.controls.el.classList.add("hide-cursor");this._hideControls()}}.bind(this),this.options.controlsTimeoutDuration)
};J._onPlay=function(){if(!R){this.once("timeupdate",this._onStart)}else{this.once("timeupdate",this._onStart,function(){return this.getCurrentTime()>0
}.bind(this))}};J._onStart=function(){this.el.classList.add(ah);if(this._poster){this._poster.hide()
}if(this.controls){this._hideStartState();this._hideEndState()}this.once("ended",this._onEnded)
};J._onEnded=function(){if(this.isFullscreen()){this.exitFullscreen()}if(this.controls){this._hideStartState();
this._showEndState()}this.once("timeupdate",this._onStart);if(this._poster){this._poster.show()
}};J._initPoster=function(a){this._poster=Y({player:this,video:this._videoImpl,useNativePoster:(this.options.controls===false),is2x:K,src:a});
if(this._poster.el){this.el.appendChild(this._poster.el)}if(!this.options.autoplay){this._poster.show()
}};J._useLiveMode=function(){if(this._isLive){this.el.classList.add(P)}else{this.el.classList.remove(P)
}};J.once=function(d,a,c){if(arguments.length<3||typeof c==="object"){ai.once.apply(this,arguments)
}else{var e=arguments;var b=Array.prototype.slice.call(arguments,2);var f=function(){if(b.every(function(g){return !!g()
})){e[1].apply(this,e);this.off(e[0],f)}}.bind(this);this.on(e[0],f)}};J.getMediaElement=function(){return this._videoImpl.getMediaElement()
};J.play=function(){V("play called");this._videoImpl.play()};J.pause=function(){this._videoImpl.pause()
};J.seek=function(a){this.setCurrentTime.apply(this,arguments)};J.addTextTrack=function(a){this._videoImpl.addTextTrack(a)
};J.getReadyState=function(){return this._videoImpl.getMediaElement().readyState
};J.getPreload=function(){return this._videoImpl.getPreload()};J.setPoster=function(a){this._poster.setSrc(a)
};J.getVolume=function(){return this._videoImpl.getVolume()};J.getMuted=function(){return this._videoImpl.getMuted()
};J.getCurrentTime=function(){return this._videoImpl.getCurrentTime()};J.getDuration=function(){return this._videoImpl.getDuration()
};J.getPaused=function(){return this._videoImpl.getPaused()};J.getEnded=function(){return this._videoImpl.getEnded()
};J.setCurrentTime=function(a){return this._videoImpl.setCurrentTime(a)};J.setVolume=function(a){this.trigger("uservolumechange");
return this._videoImpl.setVolume(a)};J.setMuted=function(a){this.trigger("uservolumechange");
this._videoImpl.setMuted(a)};J.setSrc=function(a){this._videoImpl.setSrc(a)};J.getCurrentSrc=function(){return this._videoImpl.getCurrentSrc()
};J.setControls=function(a){return this._videoImpl.setControls(a)};J.getMediaHeight=function(){return this._videoImpl.getMediaElement().videoHeight
};J.getMediaWidth=function(){return this._videoImpl.getMediaElement().videoWidth
};J.supportsPictureInPicture=function(){return this._videoImpl.supportsPictureInPicture()
};J.isPictureInPicture=function(){return this._videoImpl.isPictureInPicture()};
J.setPictureInPicture=function(a){return this._videoImpl.setPictureInPicture(a)
};J.supportsAirPlay=function(){return this._videoImpl.supportsAirPlay()};J.refreshSize=function(){if(this._breakpointDetect){this._breakpointDetect.refresh()
}else{this._currentBreakpoint&&this.el.classList.remove(this._currentBreakpoint.name);
this._currentBreakpoint=af.getBreakpointFromElement(this.el,I);this.el.classList.add(this._currentBreakpoint.name)
}};J.destroy=function(){this._removeEventListeners();this._videoImpl.destroy();
if(this.controls){this.controls.destroy();this.controls=null}this._videoImpl=undefined;
this.el.innerHTML="";if(this._breakpointDetect){this._breakpointDetect.destroy()
}U.prototype.destroy.call(this)};ag.exports=H},{"../dom-emitter/DOMEmitterMicro":300,"../event-emitter-shim/EventEmitterShim":301,"../posterframe/PosterFrameFactory":309,"../ui/DefaultBreakpoints":318,"../ui/KeyboardControl":320,"../utils/BreakpointDetect":351,"../video/VideoFactory":360,"./event/EventsToForward":304,"./event/ReadyStateChangeEvents":305,"@marcom/ac-accessibility/helpers/hide":157,"@marcom/ac-accessibility/helpers/show":160,"@marcom/ac-console/log":198,"@marcom/ac-feature/isDesktop":202,"@marcom/ac-feature/isHandheld":203,"@marcom/ac-feature/isRetina":204,"@marcom/ac-fullscreen":215,"@marcom/ac-useragent":296}],304:[function(d,f,e){f.exports=["loadstart","progress","suspend","abort","error","emptied","stalled","play","pause","loadedmetadata","loadeddata","waiting","playing","canplay","canplaythrough","seeking","seeked","ended","ratechange","durationchange","volumechange","addtrack","change","removetrack"]
},{}],305:[function(d,f,e){f.exports=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","waiting","canplay","canplaythrough"]
},{}],306:[function(k,j,g){var l=k("../Player");var i=k("@marcom/ac-feature/isDesktop")();
j.exports=function h(c){if(!c){c={}}else{if(arguments.length>1){c=Object.assign.apply(null,Array.prototype.slice.apply(arguments))
}}if(!c.components){c.components=k("../../ui/DefaultComponents")}if(typeof c.controls==="undefined"){c.controls=true
}if(!c.controlsImplementation){c.controlsImplementation=k("../../ui/ControlBar")
}if(!c.controlsFactory){c.controlsFactory=k("../../ui/ControlsFactory")({controlsImplementation:c.controlsImplementation,components:c.components,template:c.controlsTemplate})
}if(typeof c.urlOptimizer!=="undefined"&&c.urlOptimizer===true||c.urlOptimizer==="true"){c.urlOptimizer=k("../../optimizeVideoUrl")
}if(!c.sources&&!c.src){c.sources=[]}else{c.sources=(c.sources)?c.sources:(c.src)?[c.src]:[]
}c.autoplay=(c.autoplay!==undefined)?c.autoplay:i;if(!c.controlsTimeoutDuration){c.controlsTimeoutDuration=3000
}var a=new l(c);var b={};if(c.sharing){b.sharing=Object.assign({},c.sharing)}if(c.thumbnails){b.thumbnails=Object.assign({},c.thumbnails)
}if(c.endState){b.endState=Object.assign({},c.endState)}if(c.sources&&c.sources.length){a.load(c.sources,c.textTracks,c.startTime,b)
}return a}},{"../../optimizeVideoUrl":302,"../../ui/ControlBar":316,"../../ui/ControlsFactory":317,"../../ui/DefaultComponents":319,"../Player":303,"@marcom/ac-feature/isDesktop":202}],307:[function(i,h,j){var f=i("./createPlayer");
h.exports=function g(a){if(arguments.length>1){a=Object.assign.apply(null,Array.prototype.slice.apply(arguments))
}if(a.localizationBasePath){a.sharing.basePath=a.localizationBasePath}return f(a)
}},{"./createPlayer":306}],308:[function(h,n,i){var j="ac-video-poster";var k="ac-video-poster-hide";
var m=function(a){this._defaultSrc=a.src;this._initialize(a)};var l=m.prototype;
l._initialize=function(b){var a=b.src;this.el=b.el||document.createElement("div");
this._imgElement=document.createElement("img");this._imgElement.src=a;this._currentSrc=a;
this._imgElement.alt="";this._imgElement.addEventListener("load",this._onLoad.bind(this));
this.el.appendChild(this._imgElement);this.hide();this.el.classList.add(j)};l.hide=function(){this.el.classList.add(k)
};l.show=function(){this.el.classList.remove(k)};l.setSrc=function(a){var b=a||this._defaultSrc;
if(b!==this._currentSrc){this._imgElement.style.display="none";this._imgElement.src=b;
this._currentSrc=b}};l._onLoad=function(){this._imgElement.style.display=""};n.exports=m
},{}],309:[function(l,k,g){var j=l("./PosterFrame");var i={"1x":"https://images.apple.com/ac/ac-video-posterframe/1.0/images/ac-video-poster_848x480.jpg","2x":"https://images.apple.com/ac/ac-video-posterframe/1.0/images/ac-video-poster_848x480_2x.jpg"};
k.exports=function h(c){c.src=c.src||((c.is2x)?i["2x"]:i["1x"]);if(!c.useNativePoster){return new j(c)
}else{c.video.setPoster(c.src);var a=false;var b;return{show:function(){a=true;
if(b){c.video.setPoster(b);b=null}},hide:function(){a=false},setSrc:function(d){if(!a){b=d
}else{c.video.setPoster(d)}}}}}},{"./PosterFrame":308}],310:[function(o,m,i){var p=o("@marcom/ac-ajax-xhr");
var k=o("@marcom/ac-function/throttle");var n=o("./parseVTT");var j=function(b,a){this._view=b;
this._video=a.video;this._refreshTracks=this._refreshTracks.bind(this);this._throttledRefreshCurrentCaption=k(this._refreshCurrentCaption.bind(this),300);
this._addTrackListeners()};var l=j.prototype;l._addTrackListeners=function(){this._video.on("addtrack",this._refreshTracks);
this._video.on("removetrack",this._refreshTracks);this._video.on("change",this._refreshTracks)
};l._addVideoListeners=function(b){if(!b.cues){this._view.setText("");try{return p.get(b.src,{complete:function(c){b.cues=n(c.responseText);
this._addVideoListeners(b);this._refreshCurrentCaption()}.bind(this),error:function(c){}.bind(this)})
}catch(a){}}this._video.on("loadstart",this._refreshTracks);this._video.on("timeupdate",this._throttledRefreshCurrentCaption)
};l._removeVideoListeners=function(){this._video.off("loadstart",this._refreshTracks);
this._video.off("timeupdate",this._throttledRefreshCurrentCaption)};l._refreshTracks=function(){var a=this._video.getTextTracks();
if(a&&a.length){a=a.filter(function(b){return b.mode==="showing"})}if(a.length){this._activeTrack=a[0];
this._addVideoListeners(this._activeTrack)}else{this._activeTrack=null;this._removeVideoListeners()
}this._refreshCurrentCaption()};l._getCurrentCaptionText=function(e){var c=(this._activeTrack)?this._activeTrack.cues:null;
if(!c){return""}else{if(this._currentCaption&&this._currentCaption.startTime>=e&&this._currentCaption<=e){return this._currentCaption.text
}}var b=0;var d=c.length;var a;while(b<d){if(c[b].startTime<=e&&c[b].endTime>=e){a=c[b]
}else{if(c[b].startTime>=e){break}}b++}this._currentCaption=a;return(a)?a.text:""
};l._refreshCurrentCaption=function(){this._view.setText(this._getCurrentCaptionText(this._video.getCurrentTime()))
};l.destroy=function(){this._removeVideoListeners()};m.exports=j},{"./parseVTT":315,"@marcom/ac-ajax-xhr":163,"@marcom/ac-function/throttle":223}],311:[function(x,z,v){var o=x("../ui/factory/createComponents");
var w=x("./TextTracksBehavior");var s=x("../ui/elements/Label");var p=x("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var n='<div class="ac-video-player-text-track"></div>';var u="is-visible";var q="ac-video-player-text-track-container";
var r={textTracksPolyfill:{className:"ac-video-player-text-track",view:{classDef:s,options:{}},behavior:{classDef:w}}};
var y=function(a){p.call(this);this.container=a.container;this._video=a.video;this._initialize(a)
};var t=y.prototype=Object.create(p.prototype);t._initialize=function(a){this._onTrackChange=this._onTrackChange.bind(this);
this.el=document.createElement("div");this.el.innerHTML=a.template||n;this.el.classList.add(q);
this._tracks=a.tracks||[];this._textTrackComponent=o(this.el,r,{video:this._video})
};t._onTrackChange=function(){this.trigger("change");if(!this.el.parentElement){this._video.el.parentElement.appendChild(this.el);
this.el.firstElementChild.classList.add(u)}};t.addTrack=function(b){if(!this._tracks){this._tracks=[]
}var a=b.mode||"hidden";var c=this._onTrackChange;Object.defineProperty(b,"mode",{get:function(){return a
},set:function(d){a=d;c()},enumerable:true,configurable:true});this._tracks.push(b);
this.trigger("addtrack")};t.clearTracks=function(){this._tracks=[];this.trigger("removetrack");
this.trigger("change")};t.getTextTracks=function(){return this._tracks};t.trigger=function(b,a){return p.prototype.trigger.call(this,b,Object.assign({type:b},a||{}))
};t.destroy=function(){this._textTrackComponent.destroy();p.prototype.destroy.call(this)
};z.exports=y},{"../ui/elements/Label":335,"../ui/factory/createComponents":342,"./TextTracksBehavior":310,"@marcom/ac-event-emitter-micro":199}],312:[function(q,t,p){var l=q("@marcom/ac-useragent");
var k;if(l.browser.safari){k=function(b,a){b.track.mode=a}}else{k=function(b,a){b.mode=a
}}var o=function(a){var b;if(a instanceof HTMLElement){return this._videoElement.appendChild(a)
}var c=document.createElement("track");c.src=a.src;c.kind="captions";c.srclang=a.srclang;
if(c.srclang==="en"){c.label="English"}if(l.browser.firefox){b=this._videoElement.textTracks.length;
setTimeout(function(){this._videoElement.appendChild(c);k(this._videoElement.textTracks[b],a.mode||"hidden")
}.bind(this),0)}else{if(l.os.android){b=this._videoElement.textTracks.length;this._videoElement.appendChild(c);
k(this._videoElement.textTracks[b],a.mode||"hidden")}else{this._videoElement.appendChild(c);
k(c,a.mode||"hidden")}}};var r=function(){return this._videoElement.textTracks};
var n=function(){if(!this._textTracksEmitter){var a=q("../dom-emitter/DOMEmitterMicro");
this._textTracksEmitter=new a(this.getTextTracks())}return this._textTracksEmitter
};var s=function(a){var d=0;var c=a?a.length:0;for(;d<c;d++){var b=a[d];o.call(this,b)
}};var m=function(){};t.exports={create:s,add:o,get:r,getEmitter:n,destroy:m}},{"../dom-emitter/DOMEmitterMicro":300,"@marcom/ac-useragent":296}],313:[function(o,r,n){var p=o("./TextTracksDOM");
var k=function(b){if(!b){return}if(!this._textTracksPolyfill){this._textTracksPolyfill=new p({video:this,tracks:b,container:this._parentElement})
}else{this._textTracksPolyfill.clearTracks();var a=0;var c=b.length;for(;a<c;a++){this._textTracksPolyfill.addTrack(b[a])
}}};var m=function(a){return this._textTracksPolyfill.addTrack(a)};var q=function(){if(!this._textTracksPolyfill){this._createTextTrackTags([])
}return this._textTracksPolyfill.getTextTracks()};var l=function(){if(!this._textTracksPolyfill){this._createTextTrackTags([])
}return this._textTracksPolyfill};var j=function(){this._textTracksPolyfill.destroy();
this._textTracksPolyfill=null};r.exports={create:k,add:m,get:q,getEmitter:l,destroy:j}
},{"./TextTracksDOM":311}],314:[function(l,k,g){var i=l("@marcom/ac-useragent");
var j=!i.browser.ie&&!i.browser.edge;k.exports=function h(a){a=a||{};var b=(typeof a.useNativeCaptions==="undefined")?j:a.useNativeCaptions;
return(b)?l("./TextTracksNative"):l("./TextTracksPolyfill")}},{"./TextTracksNative":312,"./TextTracksPolyfill":313,"@marcom/ac-useragent":296}],315:[function(f,i,g){var h=f("../utils/Time");
i.exports=function j(a){var c=a.split(/\n/);var b=/([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}( \-\-> ){1}([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}/;
var d=[];var o;var q;var e=0;var p=c.length;for(e;e<p;e++){q="";if(b.test(c[e])){o=c[e].split(" --> ");
o[0]=o[0].split(":").length<3?"00:"+o[0]:o[0];o[1]=o[1].split(":").length<3?"00:"+o[1]:o[1];
while(++e&&e<p&&!b.test(c[e])){if(c[e]!==""){q+=c[e]+"<br />"}}q=q.substr(0,q.length-6);
if(e<p){e--}d.push({startTime:h.stringToNumber(o[0].split(" ")[0]),endTime:h.stringToNumber(o[1].split(" ")[0]),text:q})
}}return d}},{"../utils/Time":352}],316:[function(y,A,w){var B=y("@marcom/ac-string/supplant");
var s=y("../utils/Time");var u=y("./localization/Localization");var p=y("./factory/createComponents");
var r="ac-video-controls";var z="control-bar-skin-default";var x=y("@marcom/ac-feature/isDesktop")();
var D=y("./overlays/OverlayContainer");var C=y("./end-state/EndStateItemContainer");
var q=y("../utils/merge");var t=function(a){this._initialize(a)};var v=t.prototype;
v._initialize=function(a){this.el=a.element||document.createElement("div");this._basePath=a.basePath;
this.el.style.display="none";this._template=a.template||'<div class="controls-container" >\n\n\t<div class="{elementClassPrefix}-social-tray hidden"></div>\n\n\t<div class="center-button-container {elementClassPrefix}-play-pause-button-container">\n\t\t<div class="button-wrapper">\n\t\t\t<button type="button" class="ac-video-icon centered-button {elementClassPrefix}-play-pause-button {elementClassPrefix}-button no-autoplay" value="{playpause}" aria-label="{playpause}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t</div>\n\t</div>\n\n\t<div class="main-controls-container" >\n\t\t<div class="ac-video-overlay-container" ></div>\n\t\t<div class="main-controls">\n\t\t\t<div class="button-wrapper">\n\t\t\t\t<div class="main-controls-item controls-volume">\n\t\t\t\t\t<button type="button" class="ac-video-icon {elementClassPrefix}-toggle-mute-volume-button {elementClassPrefix}-button" value="{togglemutevolume}" aria-label="{togglemutevolume}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t\t\t\t<div class="{elementClassPrefix}-volume-level-indicator" tabindex="0" aria-valuemin="0" aria-valuemax="100" min="0" max="100" aria-label="{adjustvolume}" role="slider" aria-orientation="vertical" step="0.05" data-acv-active-area></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class="button-wrapper">\n\t\t\t\t<button type="button" class="ac-video-icon main-controls-item {elementClassPrefix}-text-tracks-toggle-button {elementClassPrefix}-button no-text-tracks" value="{captionscontrol}" aria-label="{captionscontrol}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t\t</div>\n\n\t\t\t<div class="main-controls-item controls-progress">\n\t\t\t\t<div class="controls-progress-time controls-progress-time-1">\n\t\t\t\t\t<div class="{elementClassPrefix}-elapsed-time-indicator" role="text" tabindex="-1">\n\t\t\t\t\t\t<span class="label">{elapsed}</span>\n\t\t\t\t\t\t<span class="{elementClassPrefix}-elapsed-time">00:00</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="controls-progress-bar">\n\t\t\t\t\t<div class="{elementClassPrefix}-buffered-indicator"></div>\n\t\t\t\t\t<div class="{elementClassPrefix}-progress-indicator ac-slider-inactive" aria-label="progress-indicator" role="slider" precision="float" min="0" max="{max}" step="0.0005" value="0" tabindex="0" aria-valuemax="{max}" aria-valuemin="{min}" aria-valuenow="{value}" data-acv-active-area></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="controls-progress-time controls-progress-time-2">\n\t\t\t\t\t<div class="{elementClassPrefix}-remaining-time-indicator" role="text" tabindex="-1">\n\t\t\t\t\t\t<span class="label">{remaining}</span>\n\t\t\t\t\t\t<span class="{elementClassPrefix}-remaining-time">-00:00</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class="main-controls-item live-stream">\n\t\t\t\t<span class="live-stream-text">{livestream}</span>\n\t\t\t</div>\n\n\t\t\t<div class="button-wrapper">\n\t\t\t\t<button type="button" class="ac-video-icon main-controls-item {elementClassPrefix}-airplay-button {elementClassPrefix}-button airplay-unsupported" value="{airplay}" aria-label="{airplay}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t\t</div>\n\n\t\t\t<div class="button-wrapper">\n\t\t\t\t<button type="button" class="ac-video-icon main-controls-item {elementClassPrefix}-picture-in-picture-button {elementClassPrefix}-button picture-in-picture-unsupported" value="{pictureinpicture}" aria-label="{pictureinpicture}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t\t</div>\n\n\t\t\t<div class="button-wrapper">\n\t\t\t\t<button type="button" class="ac-video-icon main-controls-item {elementClassPrefix}-full-screen-button {elementClassPrefix}-button fullscreen-unsupported" value="{fullscreen}" aria-label="{fullscreen}" role="button" tabindex="0" data-acv-active-area></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="end-state-wrapper">\n\t\t<div class="end-state-container"></div>\n\t</div>\n</div>\n';
this._templateData=a.templateData||Object.assign({elementClassPrefix:"controls"});
this._destroyed=false;this._localize().then(function(){if(!this._destroyed){this._initUIComponents(a);
this.el.style.display=""}if(typeof a.readyCallback==="function"){a.readyCallback()
}}.bind(this))};v._localize=function(){return new Promise(function(a){u.getTranslation({callback:function(b){a(b)
}.bind(this),basePath:this._basePath})}.bind(this)).then(function(a){this._templateData=Object.assign(this._templateData,a)
}.bind(this))};v._renderTemplateMarkup=function(){var a=B(this._template,this._templateData);
this.el.innerHTML=a};v._initDesktopControls=function(b,a){this._componentCollection=p(b,q(a,{elementClassPrefix:this._templateData.elementClassPrefix,elapsedTimeIndicator:{behavior:{observe:{source:this._player,events:["timeupdate","seeking","seeked","durationchange"],update:function(c){c.setText(s.formatTime(this._player.getCurrentTime(),this._player.getDuration()))
}.bind(this)}}},remainingTimeIndicator:{behavior:{observe:{source:this._player,events:["timeupdate","seeking","seeked","durationchange"],update:function(c){c.setText(s.formatTime(this._player.getCurrentTime()-this._player.getDuration(),this._player.getDuration()))
}.bind(this)}}},volumeLevel:{view:{options:{value:(this._player.getMuted())?0:(this._player.getVolume()*100)}}},playPauseContainer:{view:{options:{labels:{playing:this._templateData.pause,paused:this._templateData.play,ended:this._templateData.replay}}}},fullScreen:{view:{options:{labels:{initial:this._templateData.fullscreen,on:this._templateData.exitfullscreen,off:this._templateData.fullscreen}}}},pictureInPictureToggle:{view:{options:{labels:{initial:this._templateData.pictureinpicture,on:this._templateData.exitpictureinpicture,off:this._templateData.pictureinpicture}}}}}),{player:this._player,localization:this._templateData})
};v._initUIComponents=function(c){this._player=c.player;var d=this.el;var b=c.components;
d.classList.add(c.className||r);this._renderTemplateMarkup();var a=d.querySelector(".main-controls-container");
if(!x){a.parentElement.removeChild(a)}else{a.classList.add(z);this.mainControlsElement=a
}var e=d.querySelector(".end-state-container");this.endState=new C(Object.assign({},{el:e,player:this._player},c.endState));
this._initDesktopControls(d,b);this.sharingModule=this._componentCollection.components.socialShare[0].behavior.sharingModule;
if(this._componentCollection.components.progressBar.length){this.scrubberView=this._componentCollection.components.progressBar[0].view
}this.playButtonElement=this.el.querySelector(".controls-play-pause-button");if(x){this.overlays=new D({el:this.el.querySelector(".ac-video-overlay-container"),player:this._player})
}};v._setVolume=function(a){if(a){this._player.setMuted(false)}this._player.setVolume(a)
};v._thirySecondsBack=function(){var a=this._player.getCurrentTime();var b=a-30;
this._player.setCurrentTime((b<0)?0:b)};v.destroy=function(){if(this._componentCollection){this._componentCollection.destroy();
this._componentCollection=null}this._destroyed=true;this._player=null;this._templateData=null
};A.exports=t},{"../utils/Time":352,"../utils/merge":353,"./end-state/EndStateItemContainer":340,"./factory/createComponents":342,"./localization/Localization":345,"./overlays/OverlayContainer":347,"@marcom/ac-feature/isDesktop":202,"@marcom/ac-string/supplant":290}],317:[function(j,h,f){var i={components:j("./DefaultComponents"),controlsImplementation:j("./ControlBar")};
var g=function(b){b=b||{};var a=Object.assign({},i,b);return{create:function(c){var d=Object.assign({},a,c);
d.components=b.components||i.components;return new d.controlsImplementation(d)}}
};h.exports=g},{"./ControlBar":316,"./DefaultComponents":319}],318:[function(d,f,e){f.exports=[{name:"small",minWidth:0,maxWidth:479},{name:"medium",minWidth:480,maxWidth:779},{name:"large",minWidth:780,maxWidth:Infinity}]
},{}],319:[function(E,L,t){var A=E("./elements/Button");var B=E("./elements/StatefulButton");
var x=E("./elements/Label");var z=E("./elements/Slider");var y=E("./elements/Container");
var u=E("./behaviors/MuteButtonBehavior");var H=E("./behaviors/PlayPauseButtonBehavior");
var G=E("./behaviors/PictureInPictureButtonBehavior");var w=E("./behaviors/CaptionsButtonBehavior");
var C=E("./behaviors/FullScreenButtonBehavior");var F=E("./behaviors/ProgressBarSliderBehavior");
var D=E("./behaviors/VolumeSliderBehavior");var J=E("./behaviors/SharingButtonBehavior");
var K=E("./behaviors/SocialContainerBehavior");var I=E("./behaviors/AirPlayButtonBehavior");
var v=E("./elements/mixins/CursorPointer");L.exports={back30Seconds:{className:"back-30-seconds-button",view:{classDef:A}},fullScreen:{className:"full-screen-button",view:{classDef:B,options:{states:{initial:"fullscreen-unsupported",on:"is-fullscreen",off:""},labels:{initial:"fullscreen",on:"exitfullscreen",off:"fullscreen"}}},behavior:{classDef:C}},toggleMuteVolume:{className:"toggle-mute-volume-button",view:{classDef:B,options:{states:{initial:[],on:["is-muted"],off:[]}}},behavior:{classDef:u}},playPauseContainer:{className:"play-pause-button-container",view:{classDef:B,options:{states:{playing:["is-playing"],paused:[],ended:["is-ended"]}}},behavior:{classDef:H}},pictureInPictureToggle:{className:"picture-in-picture-button",view:{classDef:B,options:{states:{initial:["picture-in-picture-unsupported"],on:["is-picture-in-picture"],off:[]},labels:{initial:"pictureinpicture",on:"exitpictureinpicture",off:"pictureinpicture"}}},behavior:{classDef:G}},captionsToggle:{className:"text-tracks-toggle-button",view:{classDef:B,options:{states:{initial:["no-text-tracks"],on:["text-tracks-visible"],off:[]}}},behavior:{classDef:w}},airplayToggle:{className:"airplay-button",view:{classDef:B,options:{states:{initial:["airplay-unsupported"],on:["airplay-active"],off:[]}}},behavior:{classDef:I}},elapsedTimeIndicator:{className:"elapsed-time",view:{classDef:x}},remainingTimeIndicator:{className:"remaining-time",view:{classDef:x}},progressBar:{className:"progress-indicator",view:{classDef:z,options:{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-hover-track">\n\t\t<div class="ac-slider-hover-notch"></div>\n\t</div>\n\t<div class="ac-slider-thumb">\n\t\t<div class="ac-slider-thumb-background-wrapper">\n\t\t\t<div class="ac-slider-thumb-background"></div>\n\t\t</div>\n\t</div>\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-scrubbed"></div>\n\t</div>\n</div>',min:0,max:1,mixins:[v],orientation:"horizontal"}},behavior:{classDef:F}},volumeLevel:{className:"volume-level-indicator",view:{classDef:z,options:{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-background"></div>\n\t<div class="ac-slider-thumb-wrapper">\n\t\t<div class="ac-slider-thumb">\n\t\t\t<div class="ac-slider-thumb-background-wrapper">\n\t\t\t\t<div class="ac-slider-thumb-background"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-scrubbed"></div>\n\t</div>\n</div>',min:0,max:100,mixins:[v],orientation:"vertical"}},behavior:{classDef:D}},sharing:{className:"sharing-button",view:{classDef:B,options:{states:{initial:["sharing-unsupported"],on:["is-sharing"],off:[]}}},behavior:{classDef:J}},socialShare:{className:"social-tray",view:{classDef:y,options:{}},behavior:{classDef:K}}}
},{"./behaviors/AirPlayButtonBehavior":321,"./behaviors/CaptionsButtonBehavior":324,"./behaviors/FullScreenButtonBehavior":325,"./behaviors/MuteButtonBehavior":326,"./behaviors/PictureInPictureButtonBehavior":327,"./behaviors/PlayPauseButtonBehavior":328,"./behaviors/ProgressBarSliderBehavior":329,"./behaviors/SharingButtonBehavior":330,"./behaviors/SocialContainerBehavior":331,"./behaviors/VolumeSliderBehavior":332,"./elements/Button":333,"./elements/Container":334,"./elements/Label":335,"./elements/Slider":336,"./elements/StatefulButton":337,"./elements/mixins/CursorPointer":338}],320:[function(v,x,u){var y=v("@marcom/ac-keyboard/Keyboard");
var n=v("@marcom/ac-event-emitter-micro").EventEmitterMicro;var r=32;var w=37;var o=38;
var s=39;var q=40;var z=function(a){n.call(this);this._player=a.player;this._target=a.keyboardTarget||this._player.el;
this._keyboard=new y(this._target);this._addEventListeners()};var p=n.prototype;
var t=z.prototype=Object.create(p);t._addEventListeners=function(){this._onLeftArrow=this._onLeftArrow.bind(this);
this._onRightArrow=this._onRightArrow.bind(this);this._onUpArrow=this._onUpArrow.bind(this);
this._onDownArrow=this._onDownArrow.bind(this);this._onSpaceBarUp=this._onSpaceBarUp.bind(this);
this._onSpaceBarDown=this._onSpaceBarDown.bind(this);this._onKeyboardInteraction=this._onKeyboardInteraction.bind(this);
this._onDurationChange=this._onDurationChange.bind(this);this._boundKeyboardInteraction={};
[r,w,s,o,q].forEach(function(a){this._boundKeyboardInteraction[a]=this._onKeyboardInteraction.bind(this,a);
this._keyboard.onDown(a,this._boundKeyboardInteraction[a])}.bind(this));this._keyboard.onDown(r,this._onSpaceBarDown);
this._keyboard.onDown(w,this._onLeftArrow);this._keyboard.onDown(s,this._onRightArrow);
this._keyboard.onDown(o,this._onUpArrow);this._keyboard.onDown(q,this._onDownArrow);
this._player.on("durationchange",this._onDurationChange)};t._onKeyboardInteraction=function(){this.trigger("keyboardinteraction")
};t._onDurationChange=function(){var a=this._player.getDuration();if(a>=60){this._interval=10
}else{if(a>=20){this._interval=5}else{this._interval=1}}};t._onLeftArrow=function(b){b.originalEvent.preventDefault();
b.originalEvent.stopPropagation();var a=this._player.getCurrentTime();if(!isNaN(a)){this._player.seek(Math.max(a-this._interval,0))
}};t._onRightArrow=function(b){b.originalEvent.preventDefault();b.originalEvent.stopPropagation();
var a=this._player.getCurrentTime();if(!isNaN(a)){this._player.seek(Math.min(a+this._interval,this._player.getDuration()))
}};t._onUpArrow=function(c){c.originalEvent.preventDefault();c.originalEvent.stopPropagation();
var b=this._player.getMuted()?0:this._player.getVolume();var a=Math.min(1,b+0.1);
this._player.setVolume(a);this._player.setMuted(false)};t._onDownArrow=function(c){c.originalEvent.preventDefault();
c.originalEvent.stopPropagation();var b=this._player.getMuted()?0:this._player.getVolume();
var a=Math.max(0,b-0.1);this._player.setVolume(a);this._player.setMuted(Math.round(a*10)===0)
};t._onSpaceBarDown=function(a){if(a.target.tagName==="BUTTON"){return}this._keyboard.offDown(r,this._onSpaceBarDown);
this._keyboard.onUp(r,this._onSpaceBarUp)};t._onSpaceBarUp=function(){this._keyboard.offUp(r,this._onSpaceBarUp);
if(this._player.getPaused()){this._player.play()}else{this._player.pause()}this._keyboard.onDown(r,this._onSpaceBarDown)
};t.destroy=function(){[r,w,s,o,q].forEach(function(a){this._keyboard.offDown(a,this._boundKeyboardInteraction[a])
}.bind(this));this._boundKeyboardInteraction=null;this._keyboard.offDown(r,this._onSpaceBarDown);
this._keyboard.offUp(r,this._onSpaceBarUp);this._keyboard.offDown(w,this._onLeftArrow);
this._keyboard.offDown(s,this._onRightArrow);this._keyboard.offDown(o,this._onUpArrow);
this._keyboard.offDown(q,this._onDownArrow);this._player.off("durationchange",this._onDurationChange);
this._keyboard.destroy();p.destroy.call(this)};x.exports=z},{"@marcom/ac-event-emitter-micro":199,"@marcom/ac-keyboard/Keyboard":226}],321:[function(h,k,i){var l=h("./ButtonBehavior");
var m=function(b,a){l.apply(this,arguments);if(this._player.supportsAirPlay()){this._airplayStateChange=this._airplayStateChange.bind(this);
this._player.getMediaElement().addEventListener("webkitplaybacktargetavailabilitychanged",this._airplayStateChange);
this._updateState=this._updateState.bind(this);this._player.getMediaElement().addEventListener("webkitcurrentplaybacktargetiswirelesschanged",this._updateState)
}};var n=l.prototype;var j=m.prototype=Object.create(n);j._airplayStateChange=function(a){if(a.availability==="available"){this._airplayAvailable=true
}else{this._airplayAvailable=false}this._updateState()};j._updateState=function(){if(this._player.getMediaElement().webkitCurrentPlaybackTargetIsWireless){this._view.setState("on")
}else{if(this._airplayAvailable){this._view.setState("off")}else{this._view.setState("initial")
}}};j._onClick=function(){this._player.getMediaElement().webkitShowPlaybackTargetPicker()
};j.destroy=function(){this._player.getMediaElement().removeEventListener("webkitplaybacktargetavailabilitychanged",this._airplayStateChange);
this._player.getMediaElement().removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",this._updateState)
};k.exports=m},{"./ButtonBehavior":323}],322:[function(h,g,e){var f=function(b,a){this._player=a.player;
this._view=b;if(this._addViewListeners){this._addViewListeners()}if(this._addPlayerListeners){this._addPlayerListeners()
}};g.exports=f},{}],323:[function(g,j,h){var k=g("./BaseBehavior");var l=function(b,a){this._onClick=this._onClick.bind(this);
k.apply(this,arguments)};var i=l.prototype=Object.create(k.prototype);i._addViewListeners=function(){this._view.on("click",this._onClick)
};i._clickHandler=function(a){a.preventDefault();this._onClick(a)};i._onClick=function(a){};
i.destroy=function(){this._view.off("click",this._onClick)};j.exports=l},{"./BaseBehavior":322}],324:[function(h,l,i){var m=h("./ButtonBehavior");
var j=function(b,a){m.apply(this,arguments);this._updateState()};var n=m.prototype;
var k=j.prototype=Object.create(n);k._updateState=function(){var a=this._player.getVisibleTextTracks();
var b=this._player.getTextTracks();if(a.length){this._view.setState("on")}else{if(b.length){this._view.setState("off")
}else{this._view.setState("initial")}}};k._addPlayerListeners=function(){this._updateState=this._updateState.bind(this);
this._player.on("addtrack",this._updateState);this._player.on("change",this._updateState);
this._player.on("removetrack",this._updateState)};k._onClick=function(){var a=this._player.getVisibleTextTracks();
var b=this._player.getTextTracks();if(a.length){b[0].mode="hidden"}else{b[0].mode="showing"
}};k.destroy=function(){this._player.off("addtrack",this._updateState);this._player.off("change",this._updateState);
this._player.off("removetrack",this._updateState);n.destroy.call(this)};l.exports=j
},{"./ButtonBehavior":323}],325:[function(h,k,i){var l=h("./ButtonBehavior");var m=function(b,a){l.apply(this,arguments);
if(this._player.getFullScreenEnabled()){this._updateState()}};var n=l.prototype;
var j=m.prototype=Object.create(n);j._addPlayerListeners=function(){this._updateState=this._updateState.bind(this);
this._player.on("fullscreen:change",this._updateState)};j._updateState=function(){this._view.setState((this._player.isFullscreen())?"on":"off")
};j._onClick=function(){this._player.toggleFullscreen(!this._player.isFullscreen())
};j.destroy=function(){this._player.off("fullscreen:change",this._updateState);
n.destroy.call(this)};k.exports=m},{"./ButtonBehavior":323}],326:[function(h,l,i){var m=h("./ButtonBehavior");
var j=function(b,a){m.apply(this,arguments);this._updateState()};var n=m.prototype;
var k=j.prototype=Object.create(n);k._updateState=function(){this._view.setState((this._player.getMuted())?"on":"off")
};k._addPlayerListeners=function(){this._updateState=this._updateState.bind(this);
this._player.on("volumechange",this._updateState)};k._onClick=function(){if(this._player.getMuted()){this._player.setMuted(false);
if(this._player.getVolume()===0){this._player.setVolume(0.1)}}else{this._player.setMuted(true)
}};k.destroy=function(){this._player.off("volumechange",this._updateState);n.destroy.call(this)
};l.exports=j},{"./ButtonBehavior":323}],327:[function(h,k,i){var l=h("./ButtonBehavior");
var m=function(b,a){l.apply(this,arguments);this._initialize()};var n=l.prototype;
var j=m.prototype=Object.create(n);j._initialize=function(){this._updateButtonState=this._updateButtonState.bind(this);
if(this._player.supportsPictureInPicture()){this._updateButtonState();this._player.on("webkitpresentationmodechanged",this._updateButtonState)
}};j._onClick=function(){this._player.setPictureInPicture(!this._player.isPictureInPicture())
};j._updateButtonState=function(){this._view.setState((this._player.isPictureInPicture())?"on":"off")
};j.destroy=function(){this._player.off("webkitpresentationmodechanged",this._updateButtonState);
n.destroy.call(this)};k.exports=m},{"./ButtonBehavior":323}],328:[function(h,l,i){var m=h("./ButtonBehavior");
var k=function(b,a){m.apply(this,arguments);this._setPlayingState()};var n=m.prototype;
var j=k.prototype=Object.create(n);j._addPlayerListeners=function(){this._setPlayingState=this._setPlayingState.bind(this);
this._player.on("play",this._setPlayingState);this._player.on("playing",this._setPlayingState);
this._player.on("pause",this._setPlayingState);this._player.on("ended",this._setPlayingState)
};j._onClick=function(){this._togglePlay()};j._setPlayingState=function(){this._view.setState((this._player.getEnded())?"ended":((this._player.getPaused())?"paused":"playing"))
};j._togglePlay=function(){if(this._player.getPaused()||this._player.getEnded()){this._player.play()
}else{this._player.pause()}};j.destroy=function(){this._player.off("play",this._setPlayingState);
this._player.off("pause",this._setPlayingState);this._player.off("playing",this._setPlayingState);
this._player.off("ended",this._setPlayingState);n.destroy.call(this)};l.exports=k
},{"./ButtonBehavior":323}],329:[function(q,s,o){var m=q("./BaseBehavior");var t=q("@marcom/ac-string/supplant");
var p="is-playing";var k=q("@marcom/ac-raf-emitter/draw");var r=q("@marcom/ac-raf-emitter/cancelDraw");
var l=function(b,a){m.apply(this,arguments);this._visible=false;this._ariaTextTemplate=a.localization.currenttimetext;
this._onDurationChange()};var n=l.prototype=Object.create(m.prototype);n._addViewListeners=function(){this._onSliderGrab=this._onSliderGrab.bind(this);
this._onSliderChange=this._onSliderChange.bind(this);this._onSliderRelease=this._onSliderRelease.bind(this);
this._view.on("grab",this._onSliderGrab)};n._addPlayerListeners=function(){this._onTimeUpdate=this._onTimeUpdate.bind(this);
this._onPlay=this._onPlay.bind(this);this._onPause=this._onPause.bind(this);this._onEnded=this._onEnded.bind(this);
this._onDurationChange=this._onDurationChange.bind(this);this._onRAF=this._onRAF.bind(this);
this._player.on("durationchange",this._onDurationChange);this._player.on("loadstart",this._onEnded);
this._player.on("ended",this._onEnded);this._player.on("timeupdate",this._onTimeUpdate);
this._player.on("play",this._onPlay);this._player.on("pause",this._onPause);this._player.on("ended",this._onEnded)
};n._setIsPlaying=function(a){if(a){this._view.setState(p)}else{this._view.clearState(p)
}};n._onPlay=function(){this._setIsPlaying(true);r(this._timeUpdateInterval);k(this._onRAF)
};n._onRAF=function(){this._onTimeUpdate();this._timeUpdateInterval=k(this._onRAF)
};n._onPause=function(){this._setIsPlaying(false);r(this._timeUpdateInterval);this._onTimeUpdate()
};n._onEnded=function(){this._onPause();this._updateSliderPosition(0)};n._onSliderGrab=function(){this._player.off("timeupdate",this._onTimeUpdate);
r(this._timeUpdateInterval);this._view.off("grab",this._onSliderGrab);this._view.on("change",this._onSliderChange);
this._view.on("release",this._onSliderRelease);this._onPause()};n._onSliderRelease=function(){this._view.off("change",this._onSliderChange);
this._view.off("release",this._onSliderRelease);this._view.on("grab",this._onSliderGrab);
this._player.on("timeupdate",this._onTimeUpdate);if(!this._player.getPaused()){this._onPlay()
}};n._getTimeAsPercent=function(){return this._player.getCurrentTime()/this._cachedDuration
};n._onDurationChange=function(){this._cachedDuration=this._player.getDuration();
this._updateSliderPosition(this._getTimeAsPercent());if(!this._player.getPaused()){this._onPlay()
}};n._onSliderChange=function(){var a=this._view.getValue();this._setPlayerCurrentTime(a*this._cachedDuration);
this._setAriaValueText(a*this._cachedDuration);this._updateScrubbedValue()};n._onTimeUpdate=function(){if(this._player.getPaused()){this._updateSliderPosition(this._getTimeAsPercent())
}else{this._updateSliderPosition(this._getTimeAsPercent())}};n._updateSliderPosition=function(a){this._view.setValue(a);
this._setAriaValueText(a*this._cachedDuration);this._updateScrubbedValue();if(!this._visible&&!isNaN(this._cachedDuration)){this._view.show();
this._visible=true}};n._setAriaValueText=function(c){var b=Math.floor(c/60);var a=Math.ceil(c%60);
this._view.setAriaValueText(t(this._ariaTextTemplate,{minutes:b,seconds:a}))};n._updateScrubbedValue=function(){this._view.setScrubbedValue()
};n._setPlayerCurrentTime=function(a){this._player.setCurrentTime(a)};n._removeEventListeners=function(){this._player.off("durationchange",this._onDurationChange);
this._player.off("loadstart",this._onEnded);this._player.off("ended",this._onEnded);
this._player.off("timeupdate",this._onTimeUpdate);this._view.off("change",this._onSliderChange);
this._view.off("release",this._onSliderRelease);this._view.off("grab",this._onSliderGrab);
this._player.off("play",this._onPlay);this._player.off("pause",this._onPause);this._player.off("ended",this._onPause)
};n.destroy=function(){this._removeEventListeners();r(this._timeUpdateInterval)
};s.exports=l},{"./BaseBehavior":322,"@marcom/ac-raf-emitter/cancelDraw":249,"@marcom/ac-raf-emitter/draw":250,"@marcom/ac-string/supplant":290}],330:[function(n,k,h){var l=n("./ButtonBehavior");
var i=function(b,a){l.apply(this,arguments);if(this._player.states){this._updateState()
}};var m=l.prototype;var j=i.prototype=Object.create(m);j._addPlayerListeners=function(){this._updateState=this._updateState.bind(this);
this._player.states&&this._player.states.on("statechange",this._updateState)};j._updateState=function(){this._stateChanging=false;
this._view.setState((this._player.states.getCurrentState()==="sharing")?"on":"off")
};j._onClick=function(){if(this._stateChanging){return}if(this._player.states.getCurrentState()==="sharing"){this._view.setState("off");
this._player.states.setState("none")}else{this._view.setState("on");this._player.states.setState("sharing")
}this._stateChanging=true};j.destroy=function(){this._player.states&&this._player.states.off("statechange",this._updateState);
m.destroy.call(this)};k.exports=i},{"./ButtonBehavior":323}],331:[function(p,n,i){var j=p("./BaseBehavior");
var k=p("../sharing/SharingModule");var l=function(b,a){j.apply(this,arguments);
this._updateState()};var o=j.prototype;var m=l.prototype=Object.create(o);m._updateState=function(){this.sharingModule=new k(Object.assign({},{player:this._player,parentView:this._view}));
this.sharingModule.setData(this._player.options.sharing);this._view.el.innerHTML="";
this._view.el.appendChild(this.sharingModule.el)};n.exports=l},{"../sharing/SharingModule":350,"./BaseBehavior":322}],332:[function(g,k,h){var l=g("./BaseBehavior");
var j=function(b,a){l.apply(this,arguments);this._hideVolume();this._updateSliderVolumeValue()
};var i=j.prototype=Object.create(l.prototype);i._addViewListeners=function(){this._showVolume=this._showVolume.bind(this);
this._hideVolume=this._hideVolume.bind(this);this._onSliderGrab=this._onSliderGrab.bind(this);
this._onSliderChange=this._onSliderChange.bind(this);this._onSliderRelease=this._onSliderRelease.bind(this);
this._onFocusChange=this._onFocusChange.bind(this);this._view.on("grab",this._onSliderGrab);
this._view.on("focuschange",this._onFocusChange)};i._addPlayerListeners=function(){this._updateSliderVolumeValue=this._updateSliderVolumeValue.bind(this);
this._onUserVolumeChange=this._onUserVolumeChange.bind(this);this._player.once("durationchange",this._updateSliderVolumeValue);
this._player.on("volumechange",this._updateSliderVolumeValue);this._player.on("uservolumechange",this._onUserVolumeChange)
};i._onSliderGrab=function(){this._cachedVolume=this._player.getVolume();this._player.off("volumechange",this._updateSliderVolumeValue);
this._view.off("grab",this._onSliderGrab);this._view.on("change",this._onSliderChange);
this._view.on("release",this._onSliderRelease)};i._onSliderRelease=function(){this._setPlayerVolume(this._view.getValue());
this._view.off("change",this._onSliderChange);this._view.off("release",this._onSliderRelease);
this._view.on("grab",this._onSliderGrab);this._player.on("volumechange",this._updateSliderVolumeValue)
};i._onSliderChange=function(){var a=this._view.getValue();this._setPlayerVolume(a);
this._view.setScrubbedValue()};i._setPlayerVolume=function(a){if(a){this._player.setMuted(false);
this._player.setVolume(a/100)}else{this._player.setMuted(true);this._player.setVolume(this._cachedVolume)
}};i._showVolume=function(){this._view.show()};i._hideVolume=function(){this._view.hide()
};i._onUserVolumeChange=function(){this._showVolume();clearTimeout(this._hideVolumeTimer);
if(!this._view.isFocused()){this._hideVolumeTimer=setTimeout(this._hideVolume,1000)
}};i._onFocusChange=function(){if(!this._view.isFocused()){this._hideVolume()}else{this._showVolume()
}};i._updateSliderVolumeValue=function(){if(this._player.getMuted()){this._view.setValue(0);
this._view.setScrubbedValue()}else{var a=this._player.getVolume();this._view.setValue(a*100);
this._view.setScrubbedValue()}};i._removeEventListeners=function(){this._player.off("durationchange",this._updateSliderVolumeValue);
this._player.off("volumechange",this._updateSliderVolumeValue);this._player.off("uservolumechange",this._onUserVolumeChange);
this._view.off("change",this._onSliderChange);this._view.off("release",this._onSliderRelease);
this._view.off("grab",this._onSliderGrab)};i.destroy=function(){this._removeEventListeners()
};k.exports=j},{"./BaseBehavior":322}],333:[function(j,i,f){var h=j("../../dom-emitter/DOMEmitterMicro");
var g=function(a){this.el=a};g.prototype=Object.create(h.prototype);i.exports=g
},{"../../dom-emitter/DOMEmitterMicro":300}],334:[function(j,i,f){var g=function(a){this.el=a
};var h=g.prototype;h.show=function(){this.el.classList.remove("hidden")};h.hide=function(){this.el.classList.add("hidden")
};h.destroy=function(a){};i.exports=g},{}],335:[function(f,j,g){var h=function(a){this.el=a
};var i=h.prototype;i.setText=function(a){this.el.innerHTML=a};j.exports=h},{}],336:[function(h,n,i){var l=h("@marcom/ac-slider").Slider;
var j="ac-slider-inactive";var m=function(a,b){this.el=a;this._min=b.min||0;this._max=b.max||1;
if(b.mixins){var c=b.mixins.slice(0);while(c.length){Object.assign(this,c.pop())
}}this._slider=new l(this.el,{template:b.template,min:this._min,max:this._max,step:isNaN(+this.el.getAttribute("step"))?this.el.getAttribute("step"):+this.el.getAttribute("step"),value:(b.value!==undefined)?b.value:(+this.el.getAttribute("value")),orientation:b.orientation,renderedPosition:true,keyboardContext:this.el});
this._onFocusChange=this._onFocusChange.bind(this);this._setHoveringValue=this._setHoveringValue.bind(this);
this._onMouseOver=this._onMouseOver.bind(this);this._onMouseLeave=this._onMouseLeave.bind(this);
this._slider.el.addEventListener("blur",this._onFocusChange);this._slider.el.addEventListener("focus",this._onFocusChange);
this._slider.el.addEventListener("mouseout",this._onFocusChange);this.forceCursorPointer=this.forceCursorPointer.bind(this);
this.disableForcedCursorPointer=this.disableForcedCursorPointer.bind(this);this._slider.on("grab",this.forceCursorPointer);
this._slider.on("release",this.disableForcedCursorPointer);this._scrubbedEl=this.el.querySelector(".ac-slider-scrubbed");
this._notchEl=this.el.querySelector(".ac-slider-hover-notch");if(this._notchEl){this._slider.el.addEventListener("mouseover",this._onMouseOver);
this._slider.el.addEventListener("mouseleave",this._onMouseLeave);this._slider.el.addEventListener("mousemove",this._setHoveringValue)
}if(b.value){requestAnimationFrame(function(){if(this._slider){this.setValue(b.value)
}}.bind(this))}};var k=m.prototype;k.on=function(){return this._slider.on.apply(this._slider,arguments)
};k.off=function(){return this._slider.off.apply(this._slider,arguments)};k.trigger=function(){return this._slider.trigger.apply(this._slider,arguments)
};k.setValue=function(a){return this._slider.setValue.call(this._slider,a)};k.setAriaValueText=function(a){this._slider.el.setAttribute("aria-valuetext",a)
};k.setMin=function(a){this._min=a;this._slider.setMin(a)};k.setMax=function(a){this._max=a;
this._slider.setMax(a)};k._onMouseOver=function(){this._slider.el.classList.add("hover")
};k._onMouseLeave=function(){this._slider.el.classList.remove("hover")};k._onFocusChange=function(){setTimeout(function(){this.trigger("focuschange")
}.bind(this),0)};k.isFocused=function(){return(this._slider.el===document.activeElement&&this._hasFocusOutline())
};k._hasFocusOutline=function(){return(getComputedStyle(this._slider.el).getPropertyValue("outline-style")!=="none")
};k.getValue=function(){return this._slider.getValue.apply(this._slider,arguments)
};k.getMax=function(){return this._max};k.setScrubbedValue=function(){if(this._slider.getOrientation()==="horizontal"){this._scrubbedEl.style.left=this._slider.thumbElement.style.left
}else{this._scrubbedEl.style.bottom=this._slider.thumbElement.style.bottom}};k._setHoveringValue=function(b){var a=this.getClientXValue(b,this._notchEl);
this._notchEl.style.left=((a/this.getMax())*100)+"%";this._setNotchColor(a)};k._setNotchColor=function(a){if(a>this.getValue()){this._notchEl.style.backgroundColor="#fff"
}else{this._notchEl.style.backgroundColor="#333"}};k.show=function(){this.el.classList.remove(j)
};k.hide=function(){this.el.classList.add(j)};k.setState=function(a){this.el.classList.add(a)
};k.clearState=function(a){this.el.classList.remove(a)};k.getClientXValue=function(b,a){return this._slider.getClientXValue(b,a)
};k.destroy=function(){this._slider.el.removeEventListener("mousemove",this._setHoveringValue);
this._slider.el.removeEventListener("mouseleave",this._onMouseOver);this._slider.el.removeEventListener("mouseout",this._onMouseLeave);
this._slider.el.removeEventListener("blur",this._onFocusChange);this._slider.el.removeEventListener("focus",this._onFocusChange);
this._slider.el.removeEventListener("mouseout",this._onFocusChange);this._slider.off("grab",this.forceCursorPointer);
this._slider.off("release",this.disableForcedCursorPointer);this._slider.destroy();
this._slider=null};n.exports=m},{"@marcom/ac-slider":264}],337:[function(l,k,g){var h=l("./Button");
var i=function(a,b){h.apply(this,arguments);this._states=b.states||{};this._labels=b.labels;
this._focusTarget=this.el.querySelector("button")||this.el;if(this._states&&this._states.initial){this.setState("initial")
}};var j=i.prototype=Object.create(h.prototype);j.setState=function(a){if(this._currentState&&this._currentState!==a&&this._states[this._currentState].length){this.el.classList.remove(this._states[this._currentState])
}this._currentState=a;if(this._labels&&this._labels[this._currentState]){this._focusTarget.value=this._labels[this._currentState];
this._focusTarget.setAttribute("aria-label",this._labels[this._currentState])}if(this._currentState==="on"){this._focusTarget.setAttribute("aria-pressed",true)
}else{this._focusTarget.setAttribute("aria-pressed",false)}if(this._states[a].length){this.el.classList.add(this._states[a])
}};k.exports=i},{"./Button":333}],338:[function(e,h,f){var g="cursor-pointer";h.exports={disableForcedCursorPointer:function(){document.body.classList.remove(g);
this.onSelectStartResumeDefault()},forceCursorPointer:function(){document.body.classList.add(g);
this.onSelectStartPreventDefault()},onSelectStartResumeDefault:function(){document.removeEventListener("selectstart",this.preventDefault)
},onSelectStartPreventDefault:function(){document.addEventListener("selectstart",this.preventDefault)
},preventDefault:function(a){a.preventDefault()}}},{}],339:[function(n,l,i){var m="hidden";
var k='<a class="end-state-link hidden"></a>\n';var h=function(a){this.el=a.el;
this.el.innerHTML=k;this._player=a.player;this._bindContent(a)};var j=h.prototype;
j._bindContent=function(b){if(b.type==="link"||b.type==="video"){var c=this.el.querySelector(".end-state-link");
var a=document.createElement("div");c.classList.remove(m);a.classList.add("end-state-text-container");
a.innerText=b.label||"";c.href=b.url||"";c.appendChild(a);if(b.type==="link"){c.classList.add("icon","icon-after","icon-chevronright")
}else{if(b.type==="video"){c.classList.add("icon","icon-after","icon-playcircle")
}}this._bindAction(this.el,b)}};j._bindAction=function(a,b){if(typeof b.onclick==="function"){a.onclick=function(c){c.preventDefault();
b.onclick.call(null,c)}.bind(this)}else{if(b.type==="video"&&b.url){a.onclick=function(c){c.preventDefault();
this._player.load(b.url,null,0,{})}.bind(this)}}};j.destroy=function(){};l.exports=h
},{}],340:[function(l,k,h){var g=l("./EndStateItem");var i=function(a){this.el=a.el;
this._player=a.player;this._addItems(a.items||[])};var j=i.prototype;j._addItems=function(a){this._items=[];
a.forEach(function(b){var d=document.createElement("div");d.classList.add("end-state-item");
var c=new g(Object.assign({},b,{el:d,player:this._player}));this.el.appendChild(d);
this._items.push(c)}.bind(this))};j.setData=function(a){while(this._items.length){this._items.pop().destroy()
}this.el.innerHTML="";if(a){this.el.classList.remove("hidden");this._addItems(a.items)
}else{this.el.classList.add("hidden")}};j.destroy=function(){while(this._items.length){this._items.pop().destroy()
}};k.exports=i},{"./EndStateItem":339}],341:[function(n,m,h){var i=function(c,a,b){return new a.classDef(c,Object.assign(a.options||{},b||{}))
};var k=function(a,b,c){return function(d){a[b](d,c)}};var j=function(E,F){var g=F.handlers||{};
var d={};for(var C in g){if(g.hasOwnProperty(C)){E.on(C,d[C]=k(g,C,E))}}var f=F.observe;
var a;if(f){var e=f.update;var A=f.source;var G=A.on.bind(A)||A.addEventListener;
var z=A.off.bind(A)||A.removeEventListener;var B=f.events;var c=0;var b=B.length;
var y=function(){e.call(f,E)};for(;c<b;c++){C=B[c];G(C,y)}a=function(){for(c=0;
c<b;c++){C=B[c];z(C,y)}}}var D=function(){for(var o in d){if(d.hasOwnProperty(o)){E.off(o,d[o])
}}if(a){a()}};return{destroy:D}};m.exports=function l(c,a,b){if(a.classDef){return i(c,a,b)
}else{return j(c,a,b)}}},{}],342:[function(q,s,o){var p=q("./createView");var r=q("./createBehavior");
var n=function(b,a){if(typeof a.destroy==="function"){a.destroy()}if(typeof b.destroy==="function"){b.destroy()
}};var m=function(a){while(a.length){a.shift().destroy()}};var k=function(b){for(var a in b){if(b.hasOwnProperty(a)){m(b[a]);
delete b[a]}}};var t=function(a,d,b){var c=p(a,d.view);var e=r(c,d.behavior,b);
return{view:c,behavior:e,destroy:n.bind(null,c,e)}};s.exports=function l(i,e,j){var c={};
for(var a in e){if(e.hasOwnProperty(a)&&typeof e[a]==="object"){var g=e[a];var h=(e.elementClassPrefix)?("."+e.elementClassPrefix+"-"+g.className):"."+g.className;
var f=i.querySelectorAll(h);c[a]=[];var d=0;var b=f.length;for(;d<b;d++){c[a].push(t(f[d],g,j))
}}}return{components:c,destroy:k.bind(null,c)}}},{"./createBehavior":341,"./createView":343}],343:[function(h,g,f){g.exports=function e(b,a){return new a.classDef(b,a.options)
}},{}],344:[function(d,f,e){f.exports={backthirtyseconds:"Back 30 Seconds",playpause:"Play/Pause",play:"Play",pause:"Pause",togglemutevolume:"Toggle Mute Volume",mutevolume:"Mute Volume",minvolume:"Minimum Volume",adjustvolume:"Adjust Volume",fastreverse:"Fast Reverse",fastforward:"Fast Forward",fullvolume:"Full Volume",fullscreen:"Full Screen",exitfullscreen:"Exit Full Screen",airplay:"AirPlay",captionscontrol:"Closed Captions",captionsturnedon:"Closed Captions On",captionsturnedoff:"Closed Captions Off",subtitlescontrol:"Subtitles",subtitlesturnedon:"Subtitles On",subtitlesturnedoff:"Subtitles Off",sizescontrol:"Video Size",downloadcontrol:"Download Video",share:"Share",small:"Small",medium:"Medium",large:"Large",hd:"HD",ipod:"iPod/iPhone",mb:"MB",gb:"GB",tb:"TB",downloadquicktimetitle:"Get QuickTime.",downloadquicktimetext:"Download QuickTime to view this video. QuickTime is free for Mac + PC.",downloadquicktimebutton:"Download",downloadquicktimeurl:"https://www.apple.com/quicktime/download/",elapsed:"elapsed",remaining:"remaining",currenttimetext:"{minutes} minutes and {seconds} seconds",pictureinpicture:"Picture-in-Picture",exitpictureinpicture:"Exit Picture-in-Picture",closesharing:"Close Sharing",facebookshare:"Share to Facebook",twittershare:"Share to Twitter",copylink:"Copy Link",copyembed:"Copy Embed Code",copyarea:"Copy Link Text Area",selectlink:"Select Link Text",selectembed:"Select Embed Code",close:"Close",dismisscopy:"Dismiss Copy",replay:"Replay",livestream:"Live Streaming",newwindow:"Opens in New Window"}
},{}],345:[function(C,E,z){var u=C("./Translations");var y=C("./DefaultLabelStrings");
var A=window.document.documentElement;var B;try{B=window.top.document.documentElement
}catch(w){B=A}var e=C("@marcom/ac-ajax-xhr");var D="m";var t="/global/ac_"+D+"edia_player/scripts/ac_"+D+"edia_languages/";
var F="en-US";var v={};var m=function(b){var d;try{d=b||B.getAttribute("lang")}catch(a){d=A.getAttribute("lang")
}var c;if(!d){c=F}else{switch(d.toLowerCase()){case"es-418":c="es-LA";break;case"pt":c="pt-BR";
break;default:c=d;break}}return c};var x=function(a){a=m(a);return(v[a]!==undefined)
};var s=function(a){a=a||{};var c=m(a.lang);if(x(c)){if(a.callback){a.callback(v[c]);
return}else{return v[c]}}else{if(!a.callback){throw new Error("To use Localization.getTranslation you must either pass a callback or ensure the translation is ready via Localization.translationReady")
}}var d=a.basePath||t;var f=(u[c])?(d+u[c]):(d+u[F]);var b=y;e.get(f,{success:function(g){b=Object.assign(b,JSON.parse(g));
v[c]=b;a.callback(b)},error:function(){v[c]=b;a.callback(b)}})};E.exports={getLanguage:m,getTranslation:s,translationReady:x}
},{"./DefaultLabelStrings":344,"./Translations":346,"@marcom/ac-ajax-xhr":163}],346:[function(d,f,e){f.exports={"bg-BG":"bg-BG.json","cs-CZ":"cs-CZ.json","el-GR":"el-GR.json","de-AT":"de-AT.json","de-CH":"de-CH.json","de-DE":"de-DE.json","de-LI":"de-LI.json","da-DK":"da-DK.json",en:"en.json","en-US":"en-US.json","en-AP":"en-AP.json","en-CA":"en-CA.json","en-GB":"en-GB.json","en-HK":"en-HK.json","en-IE":"en-IE.json","en-IN":"en-IN.json","en-KR":"en-KR.json","en-AU":"en-AU.json","en-NZ":"en-NZ.json","en-SG":"en-SG.json","en-ZA":"en-ZA.json",es:"es.json","es-LA":"es-LA.json","es-MX":"es-MX.json","es-ES":"es-ES.json","et-EE":"et-EE.json","fi-FI":"fi-FI.json",fr:"fr.json","fr-BE":"fr-BE.json","fr-CA":"fr-CA.json","fr-CH":"fr-CH.json","fr-FR":"fr-FR.json","hr-HR":"hr-HR.json","hu-HU":"hu-HU.json","it-IT":"it-IT.json",ja:"ja.json","ja-JP":"ja-JP.json","ko-KR":"ko-KR.json","lt-LT":"lt-LT.json","lv-LV":"lv-LV.json","nl-BE":"nl-BE.json","nl-NL":"nl-NL.json","no-NO":"no-NO.json","pl-PL":"pl-PL.json",pt:"pt.json","pt-BR":"pt-BR.json","pt-PT":"pt-PT.json","ro-RO":"ro-RO.json","ru-RU":"ru-RU.json","sk-SK":"sk-SK.json","sv-SE":"sv-SE.json","tr-TR":"tr-TR.json",zh:"zh.json","zh-CN":"zh-CN.json","zh-HK":"zh-HK.json","zh-TW":"zh-TW.json"}
},{}],347:[function(l,k,g){var i=l("./PopUp");var h=function(a){this.el=a.el;this._player=a.player;
this._popUp=new i(a);this.el.appendChild(this._popUp.el)};var j=h.prototype;j.setData=function(a){this._popUp.setData(a)
};j.show=function(){this.el.classList.remove("hidden")};j.hide=function(){this.el.classList.add("hidden")
};j.destroy=function(){};k.exports=h},{"./PopUp":348}],348:[function(s,t,q){var k='<div class="ac-video-trickplay hidden" aria-hidden="true">\n    <div class="ac-video-trickplay-image">\n    </div>\n    <div class="ac-video-trickplay-time"></div>\n</div>\n';
var o=s("../../utils/Time");var n=s("./ThumbnailHandler");var m=s("@marcom/ac-function/throttle");
var r=5;var l=function(a){this._player=a.player;this.el=document.createElement("div");
this.el.style.opacity="0";this.el.innerHTML=k;this._thumbnailHandler=new n({el:this.el.querySelector(".ac-video-trickplay-image"),player:this._player,numberOfImages:a.numberOfImages});
this._timeLabel=this.el.querySelector(".ac-video-trickplay-time");this._bindMethods();
this._addEventListeners()};var p=l.prototype;p._initPointerTracking=function(){this._scrubberView=this._player.controls.scrubberView;
if(!this._scrubberView){return}this._runnableTrack=this._scrubberView.el.querySelector(".ac-slider-runnable-track");
this._calcOffsets();this._scrubberView.el.addEventListener("mouseover",this._show);
this._scrubberView.el.addEventListener("mouseout",this._hide);this._scrubberView.el.addEventListener("mousedown",this._startScrubbing);
this._scrubberView.el.addEventListener("mouseup",this._endScrubbing);this._scrubberView.el.addEventListener("mousemove",this._onTrackerUpdate);
this._scrubberView.el.addEventListener("mousemove",this._setThumbnail);this._player.on("resize",this._calcOffsets);
window.addEventListener("resize",this._calcOffsets)};p._bindMethods=function(){this._show=this._show.bind(this);
this._hide=this._hide.bind(this);this._onDurationChange=this._onDurationChange.bind(this);
this._onLoadedMetaData=this._onLoadedMetaData.bind(this);this._startScrubbing=this._startScrubbing.bind(this);
this._endScrubbing=this._endScrubbing.bind(this);this._initPointerTracking=this._initPointerTracking.bind(this);
this._onTrackerUpdate=this._onTrackerUpdate.bind(this);this._setThumbnail=this._setThumbnail.bind(this);
this._calcOffsets=this._calcOffsets.bind(this);this._debouncedCalcOffsets=m(this._calcOffsets,30)
};p._startScrubbing=function(a){this._thumbnailHandler.el.classList.add("hidden");
this._scrubberView.el.removeEventListener("mousemove",this._setThumbnail);this._scrubberView.el.removeEventListener("mouseout",this._hide);
document.addEventListener("mouseup",this._endScrubbing);document.addEventListener("mousemove",this._onTrackerUpdate)
};p._endScrubbing=function(a){if(a.target===this._scrubberView.el){this._hide()
}this._scrubberView.el.addEventListener("mousemove",this._setThumbnail);this._scrubberView.el.addEventListener("mouseout",this._hide);
document.removeEventListener("mouseup",this._endScrubbing);document.removeEventListener("mousemove",this._onTrackerUpdate);
this._setThumbnail(a);this._thumbnailHandler.el.classList.remove("hidden")};p._calcOffsets=function(){this._onLoadedMetaData();
var a=this._player.el.getBoundingClientRect();this._offsetLeft=a.left;var b=this._runnableTrack.getBoundingClientRect();
this._leftBoundary=b.left-this._offsetLeft+r;this._rightBoundary=this._leftBoundary+b.width-r-2;
this._imgWidth=this.el.firstElementChild.getBoundingClientRect().width};p._onLoadedMetaData=function(){var c=this._player.getMediaElement().videoWidth;
var b=this._player.getMediaElement().videoHeight;var a=this._player.getMediaElement().src.indexOf("-tft-")!==-1;
this.el.classList.remove("square-video");this.el.classList.remove("vertical-video");
this.el.classList.remove("tft-video");if(a){this.el.classList.add("tft-video");
this._thumbnailHandler.setVertical(false)}else{if(c<b){this.el.classList.add("vertical-video");
this._thumbnailHandler.setVertical(true)}else{if(c===b){this.el.classList.add("square-video");
this._thumbnailHandler.setVertical(false)}else{this._thumbnailHandler.setVertical(false)
}}}};p._addEventListeners=function(){this._player.on("durationchange",this._onDurationChange);
this._player.once("controlsready",this._initPointerTracking);this._player.on("loadedmetadata",this._calcOffsets)
};p._removeEventListeners=function(){this._player.off("durationchange",this._onDurationChange);
this._player.off("controlsready",this._initPointerTracking);this._player.off("timeupdate",this._calcOffsets);
this._player.off("resize",this._debouncedCalcOffsets);window.removeEventListener("resize",this._debouncedCalcOffsets);
this._scrubberView.el.removeEventListener("mouseover",this._show);this._scrubberView.el.removeEventListener("mouseout",this._hide);
this._scrubberView.el.removeEventListener("mousemove",this._onTrackerUpdate);this._scrubberView.el.removeEventListener("mousemove",this._setThumbnail)
};p._onTrackerUpdate=function(b){this._calcOffsets();var c=Math.min(Math.max(b.clientX-this._offsetLeft,this._leftBoundary),this._rightBoundary);
this.el.firstElementChild.style.left=(c-(this._imgWidth/2))+"px";var a=this._scrubberView.getClientXValue(b);
if(this._player.getReadyState()<=2){this._cachedTrackerUpdate=b}else{this._cachedTrackerUpdate=null
}this._setTime(Math.max(a,0))};p._onDurationChange=function(a){this._cachedDuration=this._player.getDuration();
if(this._cachedTrackerUpdate){this._onTrackerUpdate(this._cachedTrackerUpdate);
this._setThumbnail()}this.el.style.opacity="1"};p._setThumbnail=function(a){this._thumbnailHandler.setTime(this._time,this._cachedDuration)
};p._setTime=function(c){var a=(c/this._scrubberView.getMax());this._time=Math.min(a*this._cachedDuration,this._cachedDuration);
var b=o.formatTime(Math.round(this._time),this._cachedDuration);this._timeLabel.innerHTML=b
};p.setData=function(a){this.el.style.opacity="0";if(this._canPlayThroughHander){this._player.off("canplaythrough",this._canPlayThroughHander);
this._player.off("playing",this._canPlayThroughHander);this._canPlayThroughHander=null
}if(a&&this._player.getReadyState()>2){this.el.style.opacity="1";this._thumbnailHandler.setData(a);
if(this._cachedTrackerUpdate){this._onTrackerUpdate(this._cachedTrackerUpdate);
this._setThumbnail()}}else{this._thumbnailHandler.setData(null);if(a){this._canPlayThroughHander=this.setData.bind(this,a);
this._player.on("canplaythrough",this._canPlayThroughHander);this._player.on("playing",this._canPlayThroughHander)
}else{this.el.style.opacity="1"}}this._onLoadedMetaData()};p._show=function(a){this._onTrackerUpdate(a);
this.el.firstElementChild.classList.remove("hidden")};p._hide=function(){this.el.firstElementChild.classList.add("hidden")
};p.destroy=function(){if(this._canPlayThroughHander){this._player.off("canplaythrough",this._canPlayThroughHander);
this._player.off("playing",this._canPlayThroughHander)}this._tracker.destroy()};
t.exports=l},{"../../utils/Time":352,"./ThumbnailHandler":349,"@marcom/ac-function/throttle":223}],349:[function(o,m,p){var n=120;
var j=144;var i=81;var l=function(a){this.el=a.el;this._player=a.player;this._imgWidth=a.imgWidth||j;
this.el.style.backgroundSize=(this._numberOfImages*100)+"% 100%"};var k=l.prototype;
k.setVertical=function(a){this._imgWidth=(a)?i:j};k.getWidth=function(){return this._imgWidth
};k.setData=function(b){if(!b){this._imgUrl=null;this.el.style.backgroundImage="";
return}else{if(b.url===this._imgUrl){return}}this._imgUrl=b.url;this._numberOfImages=parseInt(b.numberOfImages||n);
this.el.style.backgroundSize=(this._numberOfImages*100)+"% 100%";this.el.style.backgroundImage="";
this.el.classList.add("hidden");var a=this._loadImage(this._imgUrl).then(function(){if(this._imageLoadPromise!==a){return
}this.el.style.backgroundImage='url("'+this._imgUrl+'")';this._imageLoadPromise=null;
this.el.classList.remove("hidden")}.bind(this));this._imageLoadPromise=a};k._loadImage=function(a){return new Promise(function(b,c){var d=new Image();
d.onload=function(){b()};d.onerror=function(){c()};d.src=a})};k.setTime=function(a,e){var b=a/e;
var d=Math.min(Math.round(b*this._numberOfImages),this._numberOfImages-1);var c=(d/(this._numberOfImages-1))*100;
this.el.style.backgroundPositionX=c+"%"};k.destroy=function(){if(this._imageLoadPromise){this._imageLoadPromise.cancel()
}};m.exports=l},{}],350:[function(d,f,e){(function(K){var C=K("PGRpdiBjbGFzcz0ic2hhcmluZy1zdGF0ZSI+CiAgICA8ZGl2IGNsYXNzPSJjb250YWluZXIiIGRhdGEtYWN2LWFjdGl2ZS1hcmVhPgogICAgICAgIDxkaXYgY2xhc3M9InNoYXJpbmctY29udGFpbmVyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ic2hhcmluZy1idXR0b24tY29udGFpbmVyIj4KICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImZhY2Vib29rLXNoYXJlIGFjLXZpZGVvLWljb24gaWNvbi1zaGFyZV9mYiIgYXJpYS1sYWJlbD0ie2ZhY2Vib29rc2hhcmV9LCB7bmV3d2luZG93fSI+PC9idXR0b24+CiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJ0d2l0dGVyLXNoYXJlIGFjLXZpZGVvLWljb24gaWNvbi1zaGFyZV90d2l0dGVyIiBhcmlhLWxhYmVsPSJ7dHdpdHRlcnNoYXJlfSwge25ld3dpbmRvd30iPjwvYnV0dG9uPgogICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iY29weS1saW5rIGFjLXZpZGVvLWljb24gaWNvbi1zaGFyZV9saW5rIiBhcmlhLWxhYmVsPSJ7Y29weWxpbmt9Ij48L2J1dHRvbj4KICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImNvcHktZW1iZWQtY29kZSBhYy12aWRlby1pY29uIGljb24tc2hhcmVfZW1iZWQiIGFyaWEtbGFiZWw9Intjb3B5ZW1iZWR9Ij48L2J1dHRvbj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0idGV4dGFyZWEtY29udGFpbmVyIj4KICAgICAgICAgICAgPHNwYW4+CiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9ImNvcHktYXJlYSBmb3JtLXRleHRib3ggZm9ybS10ZXh0Ym94LXRleHQgZGlzYWJsZWQiIHR5cGU9InRleHQiIGlkPSJjb3B5LWxpbmsiIGFyaWEtbGFiZWw9Intjb3B5bGlua30iPjwvaW5wdXQ+CiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJ0ZXh0aW5wdXQtY2xvc2UtYnV0dG9uIGFjLXZpZGVvLWljb24gaWNvbi1zaGFyZV9jbG9zZSIgYXJpYS1sYWJlbD0ie2Rpc21pc3Njb3B5fSI+PC9idXR0b24+CiAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICA8L2Rpdj4KICAgIDwvZGl2Pgo8L2Rpdj4K","base64").toString();
var G=K("PGlmcmFtZSBzcmM9IntlbWJlZENvZGVQYXRofXt2aWRlb2lkfXtleHRlbnNpb259IiB3aWR0aD0ie3dpZHRofSIgaGVpZ2h0PSJ7aGVpZ2h0fSIgdGl0bGU9Int0aXRsZX0iIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4K","base64").toString();
var a="https://www.apple.com/embed/";var D="Video Player";var F=d("@marcom/ac-console/log");
var y=d("@marcom/ac-clipboard/select");var J=d("@marcom/ac-social").Dialog;var x=d("@marcom/ac-string/supplant");
var b=d("../localization/Localization");var B=d("@marcom/ac-accessibility/helpers/TabManager");
var c;try{c=d("@marcom/ac-analytics-share/factory/create")}catch(I){F("ac-analytics-share failed to load, are you sure you've included it?")
}var w=d("@marcom/ac-useragent");var E=w.os;var A=E.ios||E.android;var L=735;var H=function(g){if(!this.el){this._initializeElement(g.el,g.template)
}this._player=g.player;this._parentView=g.parentView;this._clickedShareButton=null;
this._container=this.el.querySelector(".container");this._sharingButtonContainer=this.el.querySelector(".sharing-button-container");
this._facebookButton=this.el.querySelector(".facebook-share");this._twitterButton=this.el.querySelector(".twitter-share");
this._copyLinkButton=this.el.querySelector(".copy-link");this._copyEmbedCodeButton=this.el.querySelector(".copy-embed-code");
this._copyTextArea=this.el.querySelector(".copy-area");this._copyCloseButton=this.el.querySelector(".textinput-close-button");
this._closeButton=this.el.querySelector(".close-button");if(g.analytics===false){c=null
}if(A){this.el.firstChild.classList.add("mobile");this._player.on("loadstart",function(){if(this._getClientWidth()>L){this.el.firstChild.classList.add("mobile-large")
}}.bind(this))}this._bindMethods();this._addEventListeners();this._syncSocialShareHidden()
};var z=H.prototype;z._initializeElement=function(g,h){if(!g){this.el=document.createElement("div");
this._templateData=b.getTranslation();this.el.innerHTML=x((h||C).toString(),this._templateData)
}else{this.el=g}};z.setData=function(g){if(!g){this._parentView.hide();return}else{this._parentView.show()
}if(g.allowEmbed){this.el.firstChild.classList.add("embed-enabled")}this._sharingUrl=g.originatorUrl||window.location.href;
this._videoid=g.videoid;this._hideExtension=g.hideExtension;this._embedPath=g.embedpath||a;
this._hideFacebook=g.hideFacebookShare||false;this._hideTwitter=g.hideTwitterShare||false;
this._title=g.title||D;this._syncSocialShareHidden();this._container.classList.remove("textarea-active");
if(c&&g.analytics!==false&&g.videoid){try{this._initAnalyticsAttributes(g);if(!this._analyticsObserver){this._analyticsObserver=c({context:this.el})
}}catch(h){F("ac-analytics-share failed to load, are you sure you've included it?")
}}};z._bindMethods=function(){this._doFacebookShare=this._doSocialShare.bind(this,J.FACEBOOK_SHARE);
this._doTwitterShare=this._doSocialShare.bind(this,J.TWITTER_TWEET);this._copyUrl=this._copyUrl.bind(this);
this._copyEmbedCode=this._copyEmbedCode.bind(this);this._closeCopyArea=this._showTextArea.bind(this,false);
this._closeState=this._closeState.bind(this)};z._addEventListeners=function(){this._facebookButton&&this._facebookButton.addEventListener("click",this._doFacebookShare);
this._twitterButton&&this._twitterButton.addEventListener("click",this._doTwitterShare);
this._copyLinkButton&&this._copyLinkButton.addEventListener("click",this._copyUrl);
this._copyEmbedCodeButton&&this._copyEmbedCodeButton.addEventListener("click",this._copyEmbedCode);
this._copyCloseButton&&this._copyCloseButton.addEventListener("click",this._closeCopyArea);
this._closeButton&&this._closeButton.addEventListener("click",this._closeState)
};z._removeEventListeners=function(){this._facebookButton&&this._facebookButton.removeEventListener("click",this._doFacebookShare);
this._twitterButton&&this._twitterButton.removeEventListener("click",this._doTwitterShare);
this._copyLinkButton&&this._copyLinkButton.removeEventListener("click",this._copyUrl);
this._copyEmbedCodeButton&&this._copyEmbedCodeButton.removeEventListener("click",this._copyEmbedCode);
this._copyCloseButton&&this._copyCloseButton.removeEventListener("click",this._closeCopyArea);
this._closeButton&&this._closeButton.removeEventListener("click",this._closeState)
};z._syncSocialShareHidden=function(){if(this._facebookButton){if(this._hideFacebook){this._facebookButton.classList.add("hide-button")
}else{this._facebookButton.classList.remove("hide-button")}}if(this._twitterButton){if(this._hideTwitter){this._twitterButton.classList.add("hide-button")
}else{this._twitterButton.classList.remove("hide-button")}}};z._doSocialShare=function(g){this._clickedShareButton=null;
this._copyLinkButton.classList.remove("active");this._copyEmbedCodeButton.classList.remove("active");
this._showTextArea(false);J.create(g,{url:this._sharingUrl,title:this._title})};
z._showTextArea=function(g){if(g){this._container.classList.add("textarea-active");
y(this._copyTextArea);if(!A){this._copyTextArea.setAttribute("readonly","")}}else{this._container.classList.remove("textarea-active");
this._copyLinkButton.classList.remove("active");this._copyEmbedCodeButton.classList.remove("active");
this._copyTextArea.removeAttribute("readonly");if(this._clickedShareButton){this._clickedShareButton.focus()
}this._copyLinkButton.setAttribute("aria-label",this._templateData.copylink);this._copyEmbedCodeButton.setAttribute("aria-label",this._templateData.copyembed)
}};z._copyUrl=function(){this._clearTextArea();this._copyTextArea.value=this._sharingUrl;
this._copyLinkButton.classList.add("active");this._copyLinkButton.setAttribute("aria-label",this._templateData.selectlink);
this._showTextArea(true);this._clickedShareButton=this._copyLinkButton;this._copyTextArea.setAttribute("aria-label",this._templateData.copylink);
y(this._copyTextArea)};z._clearTextArea=function(){window.getSelection().removeAllRanges();
this._copyLinkButton.classList.remove("active");this._copyEmbedCodeButton.classList.remove("active");
this._copyTextArea.removeAttribute("readonly")};z._copyEmbedCode=function(){this._clearTextArea();
this._copyTextArea.value=x(G,{videoid:this._videoid,embedCodePath:this._embedPath,width:this._player.getMediaWidth(),height:this._player.getMediaHeight(),title:this._title,extension:this._hideExtension?"":".html"});
this._copyEmbedCodeButton.classList.add("active");this._copyEmbedCodeButton.setAttribute("aria-label",this._templateData.selectembed);
this._showTextArea(true);this._clickedShareButton=this._copyEmbedCodeButton;this._copyTextArea.setAttribute("aria-label",this._templateData.copyembed);
y(this._copyTextArea)};z._focusFirstButton=function(){if(!this._firstButton){this._firstButton=B.getTabbableElements(this._sharingButtonContainer)[0]
}this._firstButton.focus()};z.show=function(){return new Promise(function(g,h){requestAnimationFrame(function(){var i=function(){this.el.removeEventListener("transitionend",i);
if(focus){this._focusFirstButton()}g()}.bind(this);this.el.addEventListener("transitionend",i);
setTimeout(function(){this._container.classList.add("showing")}.bind(this))}.bind(this))
}.bind(this))};z.hide=function(){this._clickedShareButton=null;this._showTextArea(false);
return new Promise(function(i,g){var h=function(){this.el.removeEventListener("transitionend",h);
i()}.bind(this);this.el.addEventListener("transitionend",h);setTimeout(function(){this._container.classList.remove("showing")
}.bind(this))}.bind(this))};z._getClientHeight=function(){return this.el.clientHeight
};z._getClientWidth=function(){return this.el.clientWidth};z.destroy=function(){this._removeEventListeners()
};z._closeState=function(){this._showTextArea(false);if(this._player.getCurrentTime()===0||this._player.getEnded()){this._player.states.setState("initial")
}else{this._player.states.setState("none")}};z._getAnalyticsSource=function(){return"drawer"
};z._initAnalyticsAttributes=function(l){var h=[];this._facebookButton&&h.push({button:this._facebookButton,title:"facebook",events:"event85"});
this._twitterButton&&h.push({button:this._twitterButton,title:"twitter",events:"event84"});
this._copyLinkButton&&h.push({button:this._copyLinkButton,title:"copy-link",events:"event89"});
this._copyEmbedCodeButton&&h.push({button:this._copyEmbedCodeButton,title:"copy-embed-code",events:"event101"});
var k=(((l.url&&l.url.indexOf(".m3u8"))!==-1)?"m3u8":"mp4")+" via html5";var g=this._getAnalyticsSource();
var j=l.videoid;var i=document.head.querySelectorAll('meta[property="analytics-track"]');
i=i?(i[0].getAttribute("content")):"";h.forEach(function(m){m.button.setAttribute("data-analytics-click","");
m.button.setAttribute("data-analytics-share",JSON.stringify({title:j,events:m.events,prop2:i+" - "+j+" - "+m.title,prop18:k,eVar49:document.referrer,eVar54:document.location.href,eVar55:i+" - "+j,eVar70:g}))
}.bind(this))};f.exports=H}).call(this,d("buffer").Buffer)},{"../localization/Localization":345,"@marcom/ac-accessibility/helpers/TabManager":156,"@marcom/ac-analytics-share/factory/create":195,"@marcom/ac-clipboard/select":196,"@marcom/ac-console/log":198,"@marcom/ac-social":270,"@marcom/ac-string/supplant":290,"@marcom/ac-useragent":296,buffer:139}],351:[function(h,m,i){var j=h("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var k=function(a){j.call(this);this.el=a.el||document.body;this.breakpoints=a.breakpoints.sort(function(b,c){return b.minWidth-c.minWidth
});this._breakPointsLength=this.breakpoints.length;this._addClasses=a.addClass;
this._addEventListeners();this._onResize()};var n=j.prototype;var l=k.prototype=Object.create(n);
l.constructor=k;l._addEventListeners=function(){var a=this;this._boundOnResize=function(){a._onResize.apply(a,arguments)
};window.addEventListener("resize",this._boundOnResize);window.addEventListener("orientationchange",this._boundOnResize);
window.addEventListener("DOMContentLoaded",this._boundOnResize)};l._removeEventListeners=function(){window.removeEventListener("resize",this._boundOnResize);
window.removeEventListener("orientationchange",this._boundOnResize);window.addEventListener("DOMContentLoaded",this._boundOnResize)
};l._onResize=function(){var b=this.el.clientWidth;var c=this._currentBreakpoint;
if(c&&k.widthInBreakpoint(b,c)){return}var a=k.getBreakpointFromWidth(b,this.breakpoints,c,this._breakPointsLength);
if(this._addClasses){this._currentBreakpoint&&this.el.classList.remove(c.name);
this.el.classList.add(a.name)}this._currentBreakpoint=a;this.trigger("breakpointchange",a)
};l.getCurrentBreakpoint=function(){return this._currentBreakpoint};l.refresh=function(){this._onResize()
};l.destroy=function(){this._removeEventListeners();n.destroy.call(this)};k.getBreakpointFromElement=function(b,a){return k.getBreakpointFromWidth(b.clientWidth,a)
};k.getBreakpointFromWidth=function(g,b,a,f){var d=0;var e=f||b.length;for(;d<e;
d++){var c=b[d];if(c===a){continue}if(g>=c.minWidth&&g<=c.maxWidth){return c}}};
k.widthInBreakpoint=function(a,b){return(a>=b.minWidth&&a<=b.maxWidth)};m.exports=k
},{"@marcom/ac-event-emitter-micro":199}],352:[function(f,j,g){var h=f("@marcom/ac-string/supplant");
var i={addLeadingZero:function(a,b){b=b||2;if(a<10||b>2){a=String(a);while(a.length<b){a="0"+a
}}return a},formatTime:function(a,c,e){if(isNaN(a)){return"00:00"}a=this.splitTime(Math.floor(a),c,function(l){return this.addLeadingZero(l,e)
}.bind(this));var d;if(c>=3600){d="{PN}{hours}:{minutes}:{seconds}"}else{d="{PN}{minutes}:{seconds}"
}var b=h(d,{PN:a.negativeModifier,hours:a.hours,minutes:a.minutes,seconds:a.seconds});
return b},splitTime:function(a,e,d){d=d||function(l){return l};var b={negativeModifier:"",hours:0,minutes:0,seconds:0};
if(isNaN(a)){return b}b.negativeModifier=(a<0)?"-":"";a=Math.abs(a);b.hours=(e>=3600)?Math.floor(a/3600):0;
b.minutes=(b.hours)?Math.floor((a/60)%60):Math.floor(a/60);b.seconds=(a%60);for(var c in b){if(typeof b[c]!=="number"){continue
}if(c!=="hours"){b[c]=d(b[c])}}return b},stringToNumber:function(b){var a=0;var c=b.split(":");
while(c.length){if(c.length===3){a+=parseFloat(c.shift())*3600}else{if(c.length===2){a+=parseFloat(c.shift())*60
}else{a+=parseFloat(c.shift())}}}return a}};j.exports=i},{"@marcom/ac-string/supplant":290}],353:[function(f,j,g){var h=f("@marcom/ac-object/clone");
var i=function(){var c=Array.prototype.slice.call(arguments);if(c.length<2){return h(c[0])
}var d=h(c.shift(),true);var b=c.shift();for(var a in b){if(b.hasOwnProperty(a)){if(!d.hasOwnProperty(a)||typeof d[a]!=="object"){d[a]=b[a]
}else{if(typeof d[a]==="object"&&typeof b[a]==="object"){d[a]=i(d[a],b[a])}}}}if(c.length){return i.apply(null,[d].concat(c))
}else{return d}};j.exports=i},{"@marcom/ac-object/clone":228}],354:[function(d,f,e){f.exports=[{width:384,height:160,type:"baseline-high",suffix:"h"},{width:384,height:160,type:"small",suffix:"h"},{width:384,height:160,type:"baseline-low",suffix:"l"},{width:384,height:160,type:"baseline-medium",suffix:"m"},{width:480,height:200,type:"medium",suffix:"h"},{width:768,height:320,type:"large",suffix:""},{width:960,height:400,type:"large",suffix:""},{width:1536,height:640,type:"large",suffix:"h"},{width:1536,height:640,type:"large",suffix:"l"},{width:1920,height:800,type:"large",suffix:"l"},{width:1920,height:800,type:"large",suffix:"h"}]
},{}],355:[function(d,f,e){f.exports=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""},{width:960,height:540,type:"large",suffix:""},{width:1280,height:720,type:"large",suffix:"h"},{width:1280,height:720,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"l"},{width:1920,height:1080,type:"large",suffix:"h"}]
},{}],356:[function(d,f,e){f.exports=[{width:528,height:244,type:"baseline-high",suffix:"h"},{width:528,height:244,type:"small",suffix:"h"},{width:528,height:244,type:"baseline-low",suffix:"l"},{width:528,height:244,type:"baseline-medium",suffix:"m"},{width:812,height:375,type:"medium",suffix:"h"},{width:1082,height:500,type:"large",suffix:""},{width:1218,height:563,type:"large",suffix:""},{width:1624,height:750,type:"large",suffix:"h"},{width:1624,height:750,type:"large",suffix:"l"},{width:2436,height:1126,type:"large",suffix:"l"},{width:2436,height:1126,type:"large",suffix:"h"}]
},{}],357:[function(d,f,e){f.exports=[{width:360,height:360,type:"baseline-high",suffix:"h"},{width:360,height:360,type:"small",suffix:"h"},{width:360,height:360,type:"baseline-low",suffix:"l"},{width:480,height:480,type:"medium",suffix:""},{width:540,height:540,type:"medium",suffix:""},{width:720,height:720,type:"large",suffix:"h"},{width:720,height:720,type:"large",suffix:"l"},{width:1080,height:1080,type:"large",suffix:"l"},{width:1080,height:1080,type:"large",suffix:"h"}]
},{}],358:[function(J,R,j){var m=J("@marcom/ac-string/supplant");var T=/_r[0-9].+\.mov$/;
var O=/_[0-9]+x[0-9].+\.mp4$/;var I=/_([0-9]+)x([0-9]+)/;var N=/-tpl-.*-/;var L=/-cc-[a-z].*-/;
var H=/-tft-.*-/;var A="m";var E="_{width}x{height}{suffix}."+A+"p4";var P="_{height}x{width}{suffix}."+A+"p4";
var z="j";var S="_thumbnails."+z+"pg";var C=J("./1X1AssetSizes");var F=J("./16X9AssetSizes");
var D=J("./12X5AssetSizes");var Q=J("./19X9AssetSizes");var K=function(a,b){return a.find(function(c){return(c.width===b.width)&&(c.height=b.height)||((c.width===b.height)&&(c.height=b.width))
})};var B=function(k,e,c,h){var i;var f;I.test(k);var g={};var b;g.width=parseInt(RegExp.$1,10);
g.height=parseInt(RegExp.$2,10);if(k.match(H)){i=D;f=1536}else{if(g.width===g.height){i=C;
f=1080}else{if(k.match(T)||K(F,g)){i=F;f=1280}else{if(K(Q,g)){i=Q;f=1624}else{return k
}}}}if(g.width<g.height){b=true}var l=i[0].width;var n=(h&&h.maxWidth)?Math.max(h.maxWidth,l):f;
if(!k){throw"Must provide an url to optimize"}if(e===undefined||isNaN(e)){throw"Must provide a width"
}if(e===0){e=g.width}if(c){i=i.filter(function(o){return o.type===c})}if(n<1920){i=i.filter(function(o){return o.width<=n
})}var d;if(!b){d=i.reduce(function(p,o){return Math.abs(o.width-e)<Math.abs(p.width-e)?o:p
})}else{d=i.reduce(function(p,o){return Math.abs(o.height-e)<Math.abs(p.height-e)?o:p
})}var a=E;if(b){a=P}if(k.match(O)){return k.replace(O,m(a,d))}else{if(k.match(T)){return k.replace(T,m(a,d))
}else{return k}}};var M=function(a){if(!a.match(L)){return null}if(a.match(O)){return{src:a.replace(O,"_cc.vtt"),srclang:"en"}
}else{if(a.match(T)){return{src:a.replace(T,"_cc.vtt"),srclang:"en"}}else{return null
}}};var G=function(a){if(!a.match(N)){return null}else{return{url:a.replace(O,S)}
}};R.exports={getVideoSource:B,getCaptionsSource:M,getThumbnailImageSource:G}},{"./12X5AssetSizes":354,"./16X9AssetSizes":355,"./19X9AssetSizes":356,"./1X1AssetSizes":357,"@marcom/ac-string/supplant":290}],359:[function(q,r,o){var m=q("../dom-emitter/DOMEmitterMicro");
var k=q("../texttracks/createTextTracks");var p=q("@marcom/ac-console/log");var l=window.document;
var j=function(a){this._videoElement=(a&&a.mediaElement)?a.mediaElement:l.createElement("video");
this.options=a||{};this._textTracks=k(a);this._initElement();m.apply(this,[this._videoElement]);
this._forwardCaptionEvent=this._forwardCaptionEvent.bind(this);this._textTracksEmitter=this.getTextTracksEventEmitter();
this._textTracksEmitter.on("addtrack",this._forwardCaptionEvent);this._textTracksEmitter.on("change",this._forwardCaptionEvent);
this._textTracksEmitter.on("removetrack",this._forwardCaptionEvent)};var n=j.prototype=Object.create(m.prototype);
n._initElement=function(){this._videoElement.classList.add("ac-video-media-controller");
if(this.options.crossorigin!==null){this._videoElement.setAttribute("crossorigin",(this.options.crossorigin)?this.options.crossorigin:"anonymous")
}this._videoElement.setAttribute("preload",this.options.preload||"auto");this._videoElement.setAttribute("x-webkit-airplay","")
};n._forwardCaptionEvent=function(a){this.trigger(a.type)};n.load=function(a,c,b){if(b){a=a.map(function(d){return d+"#t="+b
})}this._createSourceTags(a);this._createTextTrackTags(c);this._videoElement.load()
};n._createSourceTags=function(a){this._videoElement.removeAttribute("src");this._videoElement.innerHTML="";
var c=0;var d=a.length;if(d){this._videoElement.setAttribute("src",a[0])}for(;c<d;
c++){var b=l.createElement("source");b.src=a[c];this._videoElement.appendChild(b)
}};n.play=function(){try{var a=this._videoElement.play();if(a&&typeof a["catch"]==="function"){a["catch"](function(c){if(this._playPromise===a){this.trigger("PlayPromiseError")
}}.bind(this))}this._playPromise=a}catch(b){p(b)}};n.pause=function(){this._playPromise=null;
this._videoElement.pause()};n.addTextTrack=function(a){this._addTextTrackTag(a)
};n.removeTextTrack=function(a){this._removeTextTrackTag(a)};n.getMediaElement=function(){return this._videoElement
};n._createTextTrackTags=function(){return this._textTracks.create.apply(this,arguments)
};n._addTextTrackTag=function(){return this._textTracks.add.apply(this,arguments)
};n._removeTextTrackTag=function(){return this._textTracks.remove.apply(this,arguments)
};n.getTextTracks=function(){return this._textTracks.get.apply(this,arguments)};
n.getTextTracksEventEmitter=function(){return this._textTracks.getEmitter.apply(this,arguments)
};n.getReadyState=function(){return this._videoElement.readyState};n.getPreload=function(){return this._videoElement.preload
};n.setPreload=function(a){return this._videoElement.preload=a};n.setPoster=function(a){this._videoElement.poster=a
};n.getVolume=function(){return this._videoElement.volume};n.getMuted=function(){return this._videoElement.muted
};n.getPaused=function(){return this._videoElement.paused};n.getCurrentTime=function(){return this._videoElement.currentTime
};n.getDuration=function(){return this._videoElement.duration};n.setCurrentTime=function(a){return this._videoElement.currentTime=a
};n.setVolume=function(a){return this._videoElement.volume=a};n.setMuted=function(a){this._videoElement.muted=a
};n.getEnded=function(){return this._videoElement.ended};n.setSrc=function(a){if(!this._videoElement.childNodes.length||a!==this._getSrcNode().url){this._createSourceTags([a])
}};n.getCurrentSrc=function(){return this._getSrcNode()};n._getSrcNode=function(){return this._videoElement.childNodes[0]
};n.setControls=function(a){if(!a){this._videoElement.removeAttribute("controls");
this._videoElement.setAttribute("aria-hidden","true")}else{this._videoElement.setAttribute("controls","");
this._videoElement.removeAttribute("aria-hidden")}};n.isFullscreen=function(){return this._videoElement.webkitDisplayingFullscreen
};n.supportsPictureInPicture=function(){return(typeof this._videoElement.webkitSetPresentationMode==="function")
};n.isPictureInPicture=function(){return(this._videoElement.webkitPresentationMode==="picture-in-picture")
};n.setPictureInPicture=function(a){if(!this.supportsPictureInPicture()){return
}this._videoElement.webkitSetPresentationMode((a)?"picture-in-picture":"inline")
};n.supportsAirPlay=function(){return !!window.WebKitPlaybackTargetAvailabilityEvent
};n.destroy=function(){this._textTracks.destroy();this._textTracksEmitter.off("addtrack",this._forwardCaptionEvent);
this._textTracksEmitter.off("change",this._forwardCaptionEvent);this._textTracksEmitter.off("removetrack",this._forwardCaptionEvent);
this._textTracks=null;this._textTracksEmitter=null;this._videoElement=null};r.exports=j
},{"../dom-emitter/DOMEmitterMicro":300,"../texttracks/createTextTracks":314,"@marcom/ac-console/log":198}],360:[function(l,j,h){var k=l("./HTML5Video");
var g=function(){};var i=g.prototype;i.create=function(a,b){return new k(Object.assign({},a,{parentElement:b}))
};j.exports=Object.create(g.prototype)},{"./HTML5Video":359}]},{},[152]);
!function t(e,i,o){function r(s,a){if(!i[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(n)return n(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[s]={exports:{}};e[s][0].call(u.exports,function(t){var i=e[s][1][t];return r(i?i:t)},u,u.exports,t,e,i,o)}return i[s].exports}for(var n="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(t,e,i){var o=t("./ac-clock/Clock"),r=t("./ac-clock/ThrottledClock"),n=t("./ac-clock/sharedClockInstance");n.Clock=o,n.ThrottledClock=r,e.exports=n},{"./ac-clock/Clock":2,"./ac-clock/ThrottledClock":3,"./ac-clock/sharedClockInstance":4}],2:[function(t,e,i){"use strict";function o(){n.call(this),this.lastFrameTime=null,this._animationFrame=null,this._active=!1,this._startTime=null,this._boundOnAnimationFrame=this._onAnimationFrame.bind(this),this._getTime=Date.now||function(){return(new Date).getTime()}}t("@marcom/ac-polyfills/Function/prototype.bind"),t("@marcom/ac-polyfills/requestAnimationFrame");var r,n=t("@marcom/ac-event-emitter-micro").EventEmitterMicro;(new Date).getTime();r=o.prototype=new n(null),r.start=function(){this._active||this._tick()},r.stop=function(){this._active&&window.cancelAnimationFrame(this._animationFrame),this._animationFrame=null,this.lastFrameTime=null,this._active=!1},r.destroy=function(){this.stop(),this.off();var t;for(t in this)this.hasOwnProperty(t)&&(this[t]=null)},r.isRunning=function(){return this._active},r._tick=function(){this._active||(this._active=!0),this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)},r._onAnimationFrame=function(t){null===this.lastFrameTime&&(this.lastFrameTime=t);var e=t-this.lastFrameTime,i=0;if(e>=1e3&&(e=0),0!==e&&(i=1e3/e),this._firstFrame===!0&&(e=0,this._firstFrame=!1),0===i)this._firstFrame=!0;else{var o={time:t,delta:e,fps:i,naturalFps:i,timeNow:this._getTime()};this.trigger("update",o),this.trigger("draw",o)}this._animationFrame=null,this.lastFrameTime=t,this._active!==!1?this._tick():this.lastFrameTime=null},e.exports=o},{"@marcom/ac-event-emitter-micro":13,"@marcom/ac-polyfills/Function/prototype.bind":void 0,"@marcom/ac-polyfills/requestAnimationFrame":void 0}],3:[function(t,e,i){"use strict";function o(t,e){null!==t&&(s.call(this),e=e||{},this._fps=t||null,this._clock=e.clock||n,this._lastThrottledTime=null,this._clockEvent=null,this._boundOnClockDraw=this._onClockDraw.bind(this),this._boundOnClockUpdate=this._onClockUpdate.bind(this),this._clock.on("update",this._boundOnClockUpdate))}t("@marcom/ac-polyfills/requestAnimationFrame");var r,n=t("./sharedClockInstance"),s=t("@marcom/ac-event-emitter-micro").EventEmitterMicro;r=o.prototype=new s(null),r.setFps=function(t){return this._fps=t,this},r.getFps=function(){return this._fps},r.start=function(){return this._clock.start(),this},r.stop=function(){return this._clock.stop(),this},r.isRunning=function(){return this._clock.isRunning()},r.destroy=function(){this._clock.off("update",this._boundOnClockUpdate),this._clock.destroy.call(this)},r._onClockUpdate=function(t){null===this._lastThrottledTime&&(this._lastThrottledTime=this._clock.lastFrameTime);var e=t.time-this._lastThrottledTime;if(!this._fps)throw new TypeError("FPS is not defined.");Math.ceil(1e3/e)>=this._fps+2||(this._clockEvent=t,this._clockEvent.delta=e,this._clockEvent.fps=1e3/e,this._lastThrottledTime=this._clockEvent.time,this._clock.once("draw",this._boundOnClockDraw),this.trigger("update",this._clockEvent))},r._onClockDraw=function(){this.trigger("draw",this._clockEvent)},e.exports=o},{"./sharedClockInstance":4,"@marcom/ac-event-emitter-micro":13,"@marcom/ac-polyfills/requestAnimationFrame":void 0}],4:[function(t,e,i){"use strict";var o=t("./Clock");e.exports=new o},{"./Clock":2}],5:[function(t,e,i){"use strict";e.exports={createBezier:t("./ac-easing/createBezier"),createPredefined:t("./ac-easing/createPredefined"),createStep:t("./ac-easing/createStep"),Ease:t("./ac-easing/Ease")}},{"./ac-easing/Ease":6,"./ac-easing/createBezier":7,"./ac-easing/createPredefined":8,"./ac-easing/createStep":9}],6:[function(t,e,i){"use strict";function o(t,e){if("function"!=typeof t)throw new TypeError(r);this.easingFunction=t,this.cssString=e||null}var r="Ease expects an easing function.",n=o.prototype;n.getValue=function(t){return this.easingFunction(t,0,1,1)},e.exports=o},{}],7:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.every");var o=t("./Ease"),r=t("./helpers/KeySpline"),n="Bezier curve expects exactly four (4) numbers. Given: ";e.exports=function(t,e,i,s){var a=Array.prototype.slice.call(arguments),c=a.every(function(t){return"number"==typeof t});if(4!==a.length||!c)throw new TypeError(n+a);var l=new r(t,e,i,s),u=function(t,e,i,o){return l.get(t/o)*i+e},h="cubic-bezier("+a.join(", ")+")";return new o(u,h)}},{"./Ease":6,"./helpers/KeySpline":10,"@marcom/ac-polyfills/Array/prototype.every":void 0}],8:[function(t,e,i){"use strict";var o=t("./createStep"),r=t("./helpers/cssAliases"),n=t("./helpers/easingFunctions"),s=t("./Ease"),a='Easing function "%TYPE%" not recognized among the following: '+Object.keys(n).join(", ");e.exports=function(t){var e;if("step-start"===t)return o(1,"start");if("step-end"===t)return o(1,"end");if(e=n[t],!e)throw new Error(a.replace("%TYPE%",t));return new s(e,r[t])}},{"./Ease":6,"./createStep":9,"./helpers/cssAliases":11,"./helpers/easingFunctions":12}],9:[function(t,e,i){"use strict";var o=t("./Ease"),r="Step function expects a numeric value greater than zero. Given: ",n='Step function direction must be either "start" or "end" (default). Given: ';e.exports=function(t,e){if(e=e||"end","number"!=typeof t||t<1)throw new TypeError(r+t);if("start"!==e&&"end"!==e)throw new TypeError(n+e);var i=function(i,o,r,n){var s=r/t,a=Math["start"===e?"floor":"ceil"](i/n*t);return o+s*a},s="steps("+t+", "+e+")";return new o(i,s)}},{"./Ease":6}],10:[function(t,e,i){function o(t,e,i,o){function r(t,e){return 1-3*e+3*t}function n(t,e){return 3*e-6*t}function s(t){return 3*t}function a(t,e,i){return((r(e,i)*t+n(e,i))*t+s(e))*t}function c(t,e,i){return 3*r(e,i)*t*t+2*n(e,i)*t+s(e)}function l(e){for(var o=e,r=0;r<4;++r){var n=c(o,t,i);if(0===n)return o;var s=a(o,t,i)-e;o-=s/n}return o}this.get=function(r){return t===e&&i===o?r:a(l(r),e,o)}}e.exports=o},{}],11:[function(t,e,i){"use strict";var o={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};o.easeIn=o["ease-in"],o.easeOut=o["ease-out"],o.easeInOut=o["ease-in-out"],o.easeInCubic=o["ease-in-cubic"],o.easeOutCubic=o["ease-out-cubic"],o.easeInOutCubic=o["ease-in-out-cubic"],o.easeInQuad=o["ease-in-quad"],o.easeOutQuad=o["ease-out-quad"],o.easeInOutQuad=o["ease-in-out-quad"],o.easeInQuart=o["ease-in-quart"],o.easeOutQuart=o["ease-out-quart"],o.easeInOutQuart=o["ease-in-out-quart"],o.easeInQuint=o["ease-in-quint"],o.easeOutQuint=o["ease-out-quint"],o.easeInOutQuint=o["ease-in-out-quint"],o.easeInSine=o["ease-in-sine"],o.easeOutSine=o["ease-out-sine"],o.easeInOutSine=o["ease-in-out-sine"],o.easeInExpo=o["ease-in-expo"],o.easeOutExpo=o["ease-out-expo"],o.easeInOutExpo=o["ease-in-out-expo"],o.easeInCirc=o["ease-in-circ"],o.easeOutCirc=o["ease-out-circ"],o.easeInOutCirc=o["ease-in-out-circ"],o.easeInBack=o["ease-in-back"],o.easeOutBack=o["ease-out-back"],o.easeInOutBack=o["ease-in-out-back"],e.exports=o},{}],12:[function(t,e,i){"use strict";var o=t("../createBezier"),r=o(.25,.1,.25,1).easingFunction,n=o(.42,0,1,1).easingFunction,s=o(0,0,.58,1).easingFunction,a=o(.42,0,.58,1).easingFunction,c=function(t,e,i,o){return i*t/o+e},l=function(t,e,i,o){return i*(t/=o)*t+e},u=function(t,e,i,o){return-i*(t/=o)*(t-2)+e},h=function(t,e,i,o){return(t/=o/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},p=function(t,e,i,o){return i*(t/=o)*t*t+e},d=function(t,e,i,o){return i*((t=t/o-1)*t*t+1)+e},f=function(t,e,i,o){return(t/=o/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},m=function(t,e,i,o){return i*(t/=o)*t*t*t+e},_=function(t,e,i,o){return-i*((t=t/o-1)*t*t*t-1)+e},y=function(t,e,i,o){return(t/=o/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},g=function(t,e,i,o){return i*(t/=o)*t*t*t*t+e},v=function(t,e,i,o){return i*((t=t/o-1)*t*t*t*t+1)+e},E=function(t,e,i,o){return(t/=o/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},b=function(t,e,i,o){return-i*Math.cos(t/o*(Math.PI/2))+i+e},T=function(t,e,i,o){return i*Math.sin(t/o*(Math.PI/2))+e},w=function(t,e,i,o){return-i/2*(Math.cos(Math.PI*t/o)-1)+e},S=function(t,e,i,o){return 0===t?e:i*Math.pow(2,10*(t/o-1))+e},O=function(t,e,i,o){return t===o?e+i:i*(-Math.pow(2,-10*t/o)+1)+e},C=function(t,e,i,o){return 0===t?e:t===o?e+i:(t/=o/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(-Math.pow(2,-10*--t)+2)+e},x=function(t,e,i,o){return-i*(Math.sqrt(1-(t/=o)*t)-1)+e},M=function(t,e,i,o){return i*Math.sqrt(1-(t=t/o-1)*t)+e},P=function(t,e,i,o){return(t/=o/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},N=function(t,e,i,o){var r=1.70158,n=0,s=i;return 0===t?e:1===(t/=o)?e+i:(n||(n=.3*o),s<Math.abs(i)?(s=i,r=n/4):r=n/(2*Math.PI)*Math.asin(i/s),-(s*Math.pow(2,10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/n))+e)},k=function(t,e,i,o){var r=1.70158,n=0,s=i;return 0===t?e:1===(t/=o)?e+i:(n||(n=.3*o),s<Math.abs(i)?(s=i,r=n/4):r=n/(2*Math.PI)*Math.asin(i/s),s*Math.pow(2,-10*t)*Math.sin((t*o-r)*(2*Math.PI)/n)+i+e)},D=function(t,e,i,o){var r=1.70158,n=0,s=i;return 0===t?e:2===(t/=o/2)?e+i:(n||(n=o*(.3*1.5)),s<Math.abs(i)?(s=i,r=n/4):r=n/(2*Math.PI)*Math.asin(i/s),t<1?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/n))+e:s*Math.pow(2,-10*(t-=1))*Math.sin((t*o-r)*(2*Math.PI)/n)*.5+i+e)},A=function(t,e,i,o,r){return void 0===r&&(r=1.70158),i*(t/=o)*t*((r+1)*t-r)+e},F=function(t,e,i,o,r){return void 0===r&&(r=1.70158),i*((t=t/o-1)*t*((r+1)*t+r)+1)+e},z=function(t,e,i,o,r){return void 0===r&&(r=1.70158),(t/=o/2)<1?i/2*(t*t*(((r*=1.525)+1)*t-r))+e:i/2*((t-=2)*t*(((r*=1.525)+1)*t+r)+2)+e},L=function(t,e,i,o){return(t/=o)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},I=function(t,e,i,o){return i-L(o-t,0,i,o)+e},q=function(t,e,i,o){return t<o/2?.5*I(2*t,0,i,o)+e:.5*L(2*t-o,0,i,o)+.5*i+e};e.exports={linear:c,ease:r,easeIn:n,"ease-in":n,easeOut:s,"ease-out":s,easeInOut:a,"ease-in-out":a,easeInCubic:p,"ease-in-cubic":p,easeOutCubic:d,"ease-out-cubic":d,easeInOutCubic:f,"ease-in-out-cubic":f,easeInQuad:l,"ease-in-quad":l,easeOutQuad:u,"ease-out-quad":u,easeInOutQuad:h,"ease-in-out-quad":h,easeInQuart:m,"ease-in-quart":m,easeOutQuart:_,"ease-out-quart":_,easeInOutQuart:y,"ease-in-out-quart":y,easeInQuint:g,"ease-in-quint":g,easeOutQuint:v,"ease-out-quint":v,easeInOutQuint:E,"ease-in-out-quint":E,easeInSine:b,"ease-in-sine":b,easeOutSine:T,"ease-out-sine":T,easeInOutSine:w,"ease-in-out-sine":w,easeInExpo:S,"ease-in-expo":S,easeOutExpo:O,"ease-out-expo":O,easeInOutExpo:C,"ease-in-out-expo":C,easeInCirc:x,"ease-in-circ":x,easeOutCirc:M,"ease-out-circ":M,easeInOutCirc:P,"ease-in-out-circ":P,easeInBack:A,"ease-in-back":A,easeOutBack:F,"ease-out-back":F,easeInOutBack:z,"ease-in-out-back":z,easeInElastic:N,"ease-in-elastic":N,easeOutElastic:k,"ease-out-elastic":k,easeInOutElastic:D,"ease-in-out-elastic":D,easeInBounce:I,"ease-in-bounce":I,easeOutBounce:L,"ease-out-bounce":L,easeInOutBounce:q,"ease-in-out-bounce":q}},{"../createBezier":7}],13:[function(t,e,i){"use strict";e.exports={EventEmitterMicro:t("./ac-event-emitter-micro/EventEmitterMicro")}},{"./ac-event-emitter-micro/EventEmitterMicro":14}],14:[function(t,e,i){"use strict";function o(){this._events={}}var r=o.prototype;r.on=function(t,e){this._events[t]=this._events[t]||[],this._events[t].unshift(e)},r.once=function(t,e){function i(r){o.off(t,i),void 0!==r?e(r):e()}var o=this;this.on(t,i)},r.off=function(t,e){if(this.has(t)){var i=this._events[t].indexOf(e);i!==-1&&this._events[t].splice(i,1)}},r.trigger=function(t,e){if(this.has(t))for(var i=this._events[t].length-1;i>=0;i--)void 0!==e?this._events[t][i](e):this._events[t][i]()},r.has=function(t){return t in this._events!=!1&&0!==this._events[t].length},r.destroy=function(){for(var t in this._events)this._events[t]=null;this._events=null},e.exports=o},{}],15:[function(t,e,i){"use strict";e.exports={Clip:t("./ac-clip/Clip")}},{"./ac-clip/Clip":16}],16:[function(t,e,i){"use strict";function o(t,e,i,r){r=r||{},this._options=r,this._isYoyo=r.yoyo,this._direction=1,this._timeScale=1,this._loop=r.loop||0,this._loopCount=0,this._target=t,this.duration(e),this._delay=1e3*(r.delay||0),this._remainingDelay=this._delay,this._progress=0,this._clock=r.clock||s,this._playing=!1,this._getTime=Date.now||function(){return(new Date).getTime()},this._propsTo=i||{},this._propsFrom=r.propsFrom||{},this._onStart=r.onStart||null,this._onUpdate=r.onUpdate||null,this._onDraw=r.onDraw||null,this._onComplete=r.onComplete||null;var u=r.ease||l;this._ease="function"==typeof u?new a(u):n(u),this._start=this._start.bind(this),this._update=this._update.bind(this),this._draw=this._draw.bind(this),this._isPrepared=!1,o._add(this),c.call(this)}t("@marcom/ac-polyfills/Array/isArray");var r=t("@marcom/ac-object/create"),n=t("@marcom/ac-easing").createPredefined,s=t("@marcom/ac-clock"),a=t("@marcom/ac-easing").Ease,c=t("@marcom/ac-event-emitter-micro").EventEmitterMicro,l="ease",u=o.prototype=r(c.prototype);o.COMPLETE="complete",o.PAUSE="pause",o.PLAY="play",u.play=function(){return this._playing||(this._playing=!0,0===this._delay||0===this._remainingDelay?this._start():(this._isPrepared||(this._setDiff(),this._updateProps()),this._startTimeout=setTimeout(this._start,this._remainingDelay/this._timeScale),this._delayStart=this._getTime())),this},u.pause=function(){return this._playing&&(this._startTimeout&&(this._remainingDelay=this._getTime()-this._delayStart,clearTimeout(this._startTimeout)),this._stop(),this.trigger(o.PAUSE,this)),this},u.destroy=function(){return this.pause(),this._options=null,this._target=null,this._storeTarget=null,this._ease=null,this._clock=null,this._propsTo=null,this._propsFrom=null,this._storePropsTo=null,this._storePropsFrom=null,this._propsDiff=null,this._propsEase=null,this._onStart=null,this._onUpdate=null,this._onDraw=null,this._onComplete=null,o._remove(this),c.prototype.destroy.call(this),this},u.reset=function(){if(this._isPrepared)return this._stop(),this._resetLoop(this._target,this._storeTarget),this._direction=1,this._loop=this._options.loop||0,this._loopCount=0,this._propsFrom=this._storePropsFrom,this._propsTo=this._storePropsTo,this._progress=0,this._setStartTime(),this._onUpdate&&this._onUpdate.call(this,this),this._onDraw&&this._onDraw.call(this,this),this},u.playing=function(){return this._playing},u.target=function(){return this._target},u.duration=function(t){return void 0!==t&&(this._duration=t,this._durationMs=1e3*t/this._timeScale,this._playing&&this._setStartTime()),this._duration},u.timeScale=function(t){return void 0!==t&&(this._timeScale=t,this.duration(this._duration)),this._timeScale},u.currentTime=function(t){return void 0!==t?this.progress(t/this._duration)*this._duration:this.progress()*this._duration},u.progress=function(t){return void 0!==t&&(this._progress=Math.min(1,Math.max(0,t)),this._setStartTime(),this._isPrepared||this._setDiff(),this._playing&&1===t?(this._completeProps(),this._onUpdate&&this._onUpdate.call(this,this),this._onDraw&&this._onDraw.call(this,this),this._complete()):(this._updateProps(),this._onUpdate&&this._onUpdate.call(this,this),this._onDraw&&this._onDraw.call(this,this))),this._progress},u._resetLoop=function(t,e){var i;for(i in e)e.hasOwnProperty(i)&&null!==e[i]&&("object"==typeof e[i]?this._resetLoop(t[i],e[i]):t[i]=e[i])},u._cloneObjects=function(){var t={},e={},i={};return this._cloneObjectsLoop(this._target,this._propsTo,this._propsFrom,t,e,i),{target:t,propsTo:e,propsFrom:i}},u._cloneObjectsLoop=function(t,e,i,o,r,n){var s,a;for(a in i)i.hasOwnProperty(a)&&void 0===e[a]&&void 0!==t[a]&&(o[a]=t[a],r[a]=t[a],n[a]=i[a]);for(a in e)t.hasOwnProperty(a)&&(s=typeof t[a],null!==t[a]&&"object"===s?(Array.isArray(t[a])?(o[a]=[],r[a]=[],n[a]=[]):(o[a]={},r[a]={},n[a]={}),this._cloneObjectsLoop(t[a],e[a]||{},i[a]||{},o[a],r[a],n[a])):null!==e[a]&&"number"===s&&(o[a]=t[a],r[a]=e[a],i&&void 0!==i[a]&&(n[a]=i[a])))},u._prepareProperties=function(){if(!this._isPrepared){var t=this._cloneObjects();this._storeTarget=t.target,this._propsTo=t.propsTo,this._storePropsTo=this._propsTo,this._propsFrom=t.propsFrom,this._storePropsFrom=this._propsFrom,this._isPrepared=!0}},u._setStartTime=function(){this._startTime=this._getTime()-this.progress()*this._durationMs},u._setDiff=function(){this._isPrepared||this._prepareProperties(),this._propsDiff={},this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)},u._setDiffLoop=function(t,e,i,o){var r,n;for(n in t)t.hasOwnProperty(n)&&(r=typeof t[n],null!==t[n]&&"object"===r?(e[n]=e[n]||{},o[n]=o[n]||{},this._setDiffLoop(t[n],e[n],i[n],o[n])):"number"===r&&void 0!==i[n]?(void 0!==e[n]?i[n]=e[n]:e[n]=i[n],o[n]=t[n]-i[n]):(t[n]=null,e[n]=null))},u._start=function(){this._startTimeout=null,this._remainingDelay=0,this._setStartTime(),this._clock.on("update",this._update),this._clock.on("draw",this._draw),this._clock.isRunning()||this._clock.start(),this._setDiff(),this._playing=!0,this._running=!0,this._onStart&&this._onStart.call(this,this),this.trigger(o.PLAY,this)},u._stop=function(){this._playing=!1,this._running=!1,this._clock.off("update",this._update),this._clock.off("draw",this._draw)},u._updateProps=function(){var t;t=1===this._direction?this._ease.getValue(this._progress):1-this._ease.getValue(1-this._progress),this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,t)},u._updatePropsLoop=function(t,e,i,o,r){var n;for(n in t)t.hasOwnProperty(n)&&null!==t[n]&&("number"!=typeof t[n]?this._updatePropsLoop(t[n],e[n],i[n],o[n],r):i[n]=e[n]+o[n]*r)},u._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)},u._completePropsLoop=function(t,e){var i;for(i in t)t.hasOwnProperty(i)&&null!==t[i]&&("number"!=typeof t[i]?this._completePropsLoop(t[i],e[i]):e[i]=t[i])},u._complete=function(){this._isYoyo&&(this._loop>0&&this._loopCount<=this._loop||0===this._loop&&0===this._loopCount)?(this._propsFrom=1===this._direction?this._storePropsTo:this._storePropsFrom,this._propsTo=1===this._direction?this._storePropsFrom:this._storePropsTo,this._direction*=-1,this._direction===-1&&++this._loopCount,this.progress(0),this._start()):this._loopCount<this._loop?(++this._loopCount,this.progress(0),this._start()):(this.trigger(o.COMPLETE,this),this._onComplete&&this._onComplete.call(this,this),this._options&&this._options.destroyOnComplete&&this.destroy())},u._update=function(t){this._running&&(this._progress=(t.timeNow-this._startTime)/this._durationMs,this._progress>=1?(this._progress=1,this._running=!1,this._completeProps()):this._updateProps(),this._onUpdate&&this._onUpdate.call(this,this))},u._draw=function(t){this._onDraw&&this._onDraw.call(this,this),this._running||(this._stop(),1===this._progress&&this._complete())},o._instantiate=function(){return this._clips=[],this},o._add=function(t){this._clips.push(t)},o._remove=function(t){var e=this._clips.indexOf(t);e>-1&&this._clips.splice(e,1)},o.getAll=function(t){if(void 0!==t){for(var e=[],i=this._clips.length;i--;)this._clips[i].target()===t&&e.push(this._clips[i]);return e}return Array.prototype.slice.call(this._clips)},o.destroyAll=function(t){var e=this.getAll(t);this._clips.length===e.length&&(this._clips=[]);for(var i=e.length;i--;)e[i].destroy();return e},o.to=function(t,e,i,r){return r=r||{},void 0===r.destroyOnComplete&&(r.destroyOnComplete=!0),new o(t,e,i,r).play()},o.from=function(t,e,i,r){return r=r||{},r.propsFrom=i,void 0===r.destroyOnComplete&&(r.destroyOnComplete=!0),new o(t,e,r.propsTo,r).play()},e.exports=o._instantiate()},{"@marcom/ac-clock":1,"@marcom/ac-easing":5,"@marcom/ac-event-emitter-micro":13,"@marcom/ac-object/create":51,"@marcom/ac-polyfills/Array/isArray":void 0}],17:[function(t,e,i){"use strict";var o=t("./utils/getBoundingClientRect");e.exports=function(t,e){var i;return e?(i=o(t),{width:i.width,height:i.height}):{width:t.offsetWidth,height:t.offsetHeight}}},{"./utils/getBoundingClientRect":19}],18:[function(t,e,i){"use strict";var o=t("./getDimensions"),r=t("./utils/getBoundingClientRect");e.exports=function(t,e){var i,n,s;return e?(i=r(t),t.offsetParent&&(n=r(t.offsetParent),i.top-=n.top,i.left-=n.left)):(s=o(t,e),i={top:t.offsetTop,left:t.offsetLeft,width:s.width,height:s.height}),{top:i.top,right:i.left+i.width,bottom:i.top+i.height,left:i.left}}},{"./getDimensions":17,"./utils/getBoundingClientRect":19}],19:[function(t,e,i){"use strict";e.exports=function(t){var e=t.getBoundingClientRect();return{top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}},{}],20:[function(t,e,i){"use strict";var o=t("./shared/stylePropertyCache"),r=t("./shared/getStyleTestElement"),n=t("./utils/toCSS"),s=t("./utils/toDOM"),a=t("./shared/prefixHelper"),c=function(t,e){var i=n(t),r=e!==!1&&n(e);return o[t]=o[e]=o[i]=o[r]={dom:e,css:r},e};e.exports=function(t){var e,i,n,l;if(t+="",t in o)return o[t].dom;for(n=r(),t=s(t),i=t.charAt(0).toUpperCase()+t.substring(1),e="filter"===t?["WebkitFilter","filter"]:(t+" "+a.dom.join(i+" ")+i).split(" "),l=0;l<e.length;l++)if("undefined"!=typeof n.style[e[l]])return 0!==l&&a.reduce(l-1),c(t,e[l]);return c(t,!1)}},{"./shared/getStyleTestElement":21,"./shared/prefixHelper":22,"./shared/stylePropertyCache":23,"./utils/toCSS":25,"./utils/toDOM":26}],21:[function(t,e,i){"use strict";var o;e.exports=function(){return o?(o.style.cssText="",o.removeAttribute("style")):o=document.createElement("_"),o},e.exports.resetElement=function(){o=null}},{}],22:[function(t,e,i){"use strict";var o=["-webkit-","-moz-","-ms-"],r=["Webkit","Moz","ms"],n=["webkit","moz","ms"],s=function(){this.initialize()},a=s.prototype;a.initialize=function(){this.reduced=!1,this.css=o,this.dom=r,this.evt=n},a.reduce=function(t){this.reduced||(this.reduced=!0,this.css=[this.css[t]],this.dom=[this.dom[t]],this.evt=[this.evt[t]])},e.exports=new s},{}],23:[function(t,e,i){"use strict";e.exports={}},{}],24:[function(t,e,i){"use strict";var o=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;e.exports=function(t){return t=String.prototype.replace.call(t,o,""),t.charAt(0).toLowerCase()+t.substring(1)}},{}],25:[function(t,e,i){"use strict";var o=/^(webkit|moz|ms)/gi;e.exports=function(t){return"cssfloat"===t.toLowerCase()?"float":(o.test(t)&&(t="-"+t),t.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase())}},{}],26:[function(t,e,i){"use strict";var o=/-([a-z])/g;e.exports=function(t){return"float"===t.toLowerCase()?"cssFloat":(t=t.replace(o,function(t,e){return e.toUpperCase()}),"Ms"===t.substr(0,2)&&(t="ms"+t.substring(2)),t)}},{}],27:[function(t,e,i){"use strict";var o=t("@marcom/ac-prefixer/getStyleProperty"),r=t("@marcom/ac-prefixer/stripPrefixes");e.exports=function(){var t,e,i,n,s=Array.prototype.slice.call(arguments),a=s.shift(s),c=window.getComputedStyle(a),l={};for("string"!=typeof s[0]&&(s=s[0]),n=0;n<s.length;n++)t=s[n],e=o(t),e?(t=r(e),i=c[e],i&&"auto"!==i||(i=null),i&&(i=r(i))):i=null,l[t]=i;return l}},{"@marcom/ac-prefixer/getStyleProperty":20,"@marcom/ac-prefixer/stripPrefixes":24}],28:[function(t,e,i){"use strict";e.exports=8},{}],29:[function(t,e,i){"use strict";e.exports=11},{}],30:[function(t,e,i){"use strict";e.exports=9},{}],31:[function(t,e,i){"use strict";e.exports=1},{}],32:[function(t,e,i){"use strict";e.exports=3},{}],33:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.slice"),t("@marcom/ac-polyfills/Array/prototype.filter");var o=t("./internal/isNodeType"),r=t("./ELEMENT_NODE");e.exports=function(t,e){return e=e||r,t=Array.prototype.slice.call(t),t.filter(function(t){return o(t,e)})}},{"./ELEMENT_NODE":31,"./internal/isNodeType":34,"@marcom/ac-polyfills/Array/prototype.filter":void 0,"@marcom/ac-polyfills/Array/prototype.slice":void 0}],34:[function(t,e,i){"use strict";var o=t("../isNode");e.exports=function(t,e){return!!o(t)&&("number"==typeof e?t.nodeType===e:e.indexOf(t.nodeType)!==-1)}},{"../isNode":38}],35:[function(t,e,i){"use strict";var o=t("./isNodeType"),r=t("../COMMENT_NODE"),n=t("../DOCUMENT_FRAGMENT_NODE"),s=t("../ELEMENT_NODE"),a=t("../TEXT_NODE"),c=[s,a,r,n],l=" must be an Element, TextNode, Comment, or Document Fragment",u=[s,a,r],h=" must be an Element, TextNode, or Comment",p=[s,n],d=" must be an Element, or Document Fragment",f=" must have a parentNode";e.exports={parentNode:function(t,e,i,r){if(r=r||"target",(t||e)&&!o(t,p))throw new TypeError(i+": "+r+d)},childNode:function(t,e,i,r){if(r=r||"target",(t||e)&&!o(t,u))throw new TypeError(i+": "+r+h)},insertNode:function(t,e,i,r){if(r=r||"node",(t||e)&&!o(t,c))throw new TypeError(i+": "+r+l)},hasParentNode:function(t,e,i){if(i=i||"target",!t.parentNode)throw new TypeError(e+": "+i+f)}}},{"../COMMENT_NODE":28,"../DOCUMENT_FRAGMENT_NODE":29,"../ELEMENT_NODE":31,"../TEXT_NODE":32,"./isNodeType":34}],36:[function(t,e,i){"use strict";var o=t("./internal/isNodeType"),r=t("./DOCUMENT_FRAGMENT_NODE");e.exports=function(t){return o(t,r)}},{"./DOCUMENT_FRAGMENT_NODE":29,"./internal/isNodeType":34}],37:[function(t,e,i){"use strict";var o=t("./internal/isNodeType"),r=t("./ELEMENT_NODE");e.exports=function(t){return o(t,r)}},{"./ELEMENT_NODE":31,"./internal/isNodeType":34}],38:[function(t,e,i){"use strict";e.exports=function(t){return!(!t||!t.nodeType)}},{}],39:[function(t,e,i){"use strict";var o=t("./internal/validate");e.exports=function(t){return o.childNode(t,!0,"remove"),t.parentNode?t.parentNode.removeChild(t):t}},{"./internal/validate":35}],40:[function(t,e,i){"use strict";var o=t("@marcom/ac-dom-nodes/filterByNodeType"),r=t("./filterBySelector"),n=t("./internal/validate");e.exports=function(t,e){var i;return n.parentNode(t,!0,"children"),n.selector(e,!1,"children"),i=t.children||t.childNodes,i=o(i),e&&(i=r(i,e)),i}},{"./filterBySelector":41,"./internal/validate":43,"@marcom/ac-dom-nodes/filterByNodeType":33}],41:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.slice"),t("@marcom/ac-polyfills/Array/prototype.filter");var o=t("./matchesSelector"),r=t("./internal/validate");e.exports=function(t,e){return r.selector(e,!0,"filterBySelector"),t=Array.prototype.slice.call(t),t.filter(function(t){return o(t,e)})}},{"./internal/validate":43,"./matchesSelector":44,"@marcom/ac-polyfills/Array/prototype.filter":void 0,"@marcom/ac-polyfills/Array/prototype.slice":void 0}],42:[function(t,e,i){"use strict";e.exports=window.Element?function(t){return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector}(Element.prototype):null},{}],43:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.indexOf");var o=t("@marcom/ac-dom-nodes/isNode"),r=t("@marcom/ac-dom-nodes/COMMENT_NODE"),n=t("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE"),s=t("@marcom/ac-dom-nodes/DOCUMENT_NODE"),a=t("@marcom/ac-dom-nodes/ELEMENT_NODE"),c=t("@marcom/ac-dom-nodes/TEXT_NODE"),l=function(t,e){return!!o(t)&&("number"==typeof e?t.nodeType===e:e.indexOf(t.nodeType)!==-1)},u=[a,s,n],h=" must be an Element, Document, or Document Fragment",p=[a,c,r],d=" must be an Element, TextNode, or Comment",f=" must be a string";e.exports={parentNode:function(t,e,i,o){if(o=o||"node",(t||e)&&!l(t,u))throw new TypeError(i+": "+o+h)},childNode:function(t,e,i,o){if(o=o||"node",(t||e)&&!l(t,p))throw new TypeError(i+": "+o+d)},selector:function(t,e,i,o){if(o=o||"selector",(t||e)&&"string"!=typeof t)throw new TypeError(i+": "+o+f)}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":28,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":29,"@marcom/ac-dom-nodes/DOCUMENT_NODE":30,"@marcom/ac-dom-nodes/ELEMENT_NODE":31,"@marcom/ac-dom-nodes/TEXT_NODE":32,"@marcom/ac-dom-nodes/isNode":38,"@marcom/ac-polyfills/Array/prototype.indexOf":void 0}],44:[function(t,e,i){"use strict";var o=t("@marcom/ac-dom-nodes/isElement"),r=t("./internal/validate"),n=t("./internal/nativeMatches"),s=t("./shims/matchesSelector");e.exports=function(t,e){return r.selector(e,!0,"matchesSelector"),!!o(t)&&(n?n.call(t,e):s(t,e))}},{"./internal/nativeMatches":42,"./internal/validate":43,"./shims/matchesSelector":46,"@marcom/ac-dom-nodes/isElement":37}],45:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.slice");var o=t("./internal/validate"),r=t("./shims/querySelectorAll"),n="querySelectorAll"in document;e.exports=function(t,e){return e=e||document,o.parentNode(e,!0,"querySelectorAll","context"),o.selector(t,!0,"querySelectorAll"),n?Array.prototype.slice.call(e.querySelectorAll(t)):r(t,e)}},{"./internal/validate":43,"./shims/querySelectorAll":47,"@marcom/ac-polyfills/Array/prototype.slice":void 0}],46:[function(t,e,i){"use strict";var o=t("../querySelectorAll");e.exports=function(t,e){var i,r=t.parentNode||document,n=o(e,r);for(i=0;i<n.length;i++)if(n[i]===t)return!0;return!1}},{"../querySelectorAll":45}],47:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.indexOf");var o=t("@marcom/ac-dom-nodes/isElement"),r=t("@marcom/ac-dom-nodes/isDocumentFragment"),n=t("@marcom/ac-dom-nodes/remove"),s="_ac_qsa_",a=function(t,e){var i;if(e===document)return!0;for(i=t;(i=i.parentNode)&&o(i);)if(i===e)return!0;return!1},c=function(t){"recalc"in t?t.recalc(!1):document.recalc(!1),window.scrollBy(0,0)};e.exports=function(t,e){var i,o=document.createElement("style"),l=s+(Math.random()+"").slice(-6),u=[];for(e=e||document,document[l]=[],r(e)?e.appendChild(o):document.documentElement.firstChild.appendChild(o),o.styleSheet.cssText="*{display:recalc;}"+t+'{ac-qsa:expression(document["'+l+'"] && document["'+l+'"].push(this));}',c(e);document[l].length;)i=document[l].shift(),i.style.removeAttribute("ac-qsa"),u.indexOf(i)===-1&&a(i,e)&&u.push(i);return document[l]=null,n(o),c(e),u}},{"@marcom/ac-dom-nodes/isDocumentFragment":36,"@marcom/ac-dom-nodes/isElement":37,"@marcom/ac-dom-nodes/remove":39,"@marcom/ac-polyfills/Array/prototype.indexOf":void 0}],48:[function(t,e,i){"use strict";e.exports=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}}},{}],49:[function(t,e,i){"use strict";e.exports={getWindow:function(){return window},getDocument:function(){return document},getNavigator:function(){return navigator}}},{}],50:[function(t,e,i){
"use strict";function o(){var t=r.getWindow(),e=r.getDocument(),i=r.getNavigator();return!!("ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch||i.maxTouchPoints>0||i.msMaxTouchPoints>0)}var r=t("./helpers/globals"),n=t("@marcom/ac-function/once");e.exports=n(o),e.exports.original=o},{"./helpers/globals":49,"@marcom/ac-function/once":48}],51:[function(t,e,i){"use strict";var o=function(){};e.exports=function(t){if(arguments.length>1)throw new Error("Second argument not supported");if(null===t||"object"!=typeof t)throw new TypeError("Object prototype may only be an Object.");return"function"==typeof Object.create?Object.create(t):(o.prototype=t,new o)}},{}],52:[function(t,e,i){"use strict";var o=t("./extend");e.exports=function(t,e){if("object"!=typeof t)throw new TypeError("defaults: must provide a defaults object");if(e=e||{},"object"!=typeof e)throw new TypeError("defaults: options must be a typeof object");return o({},t,e)}},{"./extend":53}],53:[function(t,e,i){"use strict";t("@marcom/ac-polyfills/Array/prototype.forEach");var o=Object.prototype.hasOwnProperty;e.exports=function(){var t,e;return t=arguments.length<2?[{},arguments[0]]:[].slice.call(arguments),e=t.shift(),t.forEach(function(t){if(null!=t)for(var i in t)o.call(t,i)&&(e[i]=t[i])}),e}},{"@marcom/ac-polyfills/Array/prototype.forEach":void 0}],54:[function(t,e,i){"use strict";function o(t,e){if(this.el=t,this._options=r(u,e||{}),!l()){this._isRightToLeft="rtl"===n(this.el,"direction").direction,this._inlineStart=this._isRightToLeft?"right":"left",this._inlineEnd=this._isRightToLeft?"left":"right",this._scrollType=this._scrollDirection();var i=this._isRightToLeft?this._options.rightPaddleSelector:this._options.leftPaddleSelector,o=this._isRightToLeft?this._options.leftPaddleSelector:this._options.rightPaddleSelector;this._wrapper=this.el.querySelector(this._options.itemsSelector),this._paddleStart=this.el.querySelector(i),this._paddleEnd=this.el.querySelector(o),this._children=s(this._wrapper),this._childCount=this._children.length,this._onScrollClipUpdate=this._onScrollClipUpdate.bind(this),this._onScrollClipComplete=this._onScrollClipComplete.bind(this),this._onPaddleStartClick=this._onPaddleStartClick.bind(this),this._paddleStart.addEventListener("click",this._onPaddleStartClick),this._onPaddleEndClick=this._onPaddleEndClick.bind(this),this._paddleEnd.addEventListener("click",this._onPaddleEndClick),this._onScroll=this._onScroll.bind(this),this._wrapper.addEventListener("scroll",this._onScroll),this._updateElementMetrics=this._updateElementMetrics.bind(this),window.addEventListener("resize",this._updateElementMetrics),window.addEventListener("orientationchange",this._updateElementMetrics),this._updateElementMetrics()}}var r=t("@marcom/ac-object/defaults"),n=t("@marcom/ac-dom-styles/getStyle"),s=t("@marcom/ac-dom-traversal/children"),a=t("@marcom/ac-dom-metrics/getPosition"),c=t("@marcom/ac-clip").Clip,l=t("@marcom/ac-feature/touchAvailable"),u={itemsSelector:".chapternav-items",leftPaddleSelector:".chapternav-paddle-left",rightPaddleSelector:".chapternav-paddle-right",scrollEasing:"ease-out",scrollDuration:.4},h=o.prototype;h._updateElementMetrics=function(){this._scrollStart=this._wrapper.scrollLeft,this._wrapperWidth=this._wrapper.offsetWidth,this._contentWidth=this._wrapper.scrollWidth,this._paddleWidth=this._paddleStart.offsetWidth,this._updatePaddleDisplay()},h._onScroll=function(){this._lockPaddles||(this._scrollStart=this._wrapper.scrollLeft,this._updatePaddleDisplay())},h._updatePaddleDisplay=function(){var t=this._getNormalizedScroll(this._scrollStart)+this._wrapperWidth,e=1;this._paddleStart.disabled=this._getNormalizedScroll(this._scrollStart)<=e,this._paddleEnd.disabled=t>=this._contentWidth-e},h._onPaddleStartClick=function(t){this._smoothScrollTo(this._getPaddleStartScrollDestination())},h._getPaddleStartScrollDestination=function(){var t,e,i=this._getNormalizedScroll(this._scrollStart);for(e=this._childCount-1;e>0;e--)if(t=this._normalizePosition(a(this._children[e])),t[this._inlineStart]<i)return t[this._inlineEnd]-this._wrapperWidth;return 0},h._onPaddleEndClick=function(t){this._smoothScrollTo(this._getPaddleEndScrollDestination())},h._getPaddleEndScrollDestination=function(){var t,e,i=this._getNormalizedScroll(this._scrollStart)+this._wrapperWidth;for(e=0;e<this._childCount;e++)if(t=this._normalizePosition(a(this._children[e])),t[this._inlineEnd]>i)return t[this._inlineStart];return this._contentWidth},h._getBoundedScrollX=function(t){var e=this._contentWidth-this._wrapperWidth;return Math.max(Math.min(t,e),0)},h._smoothScrollTo=function(t){if(this._updateElementMetrics(),!this._lockPaddles&&t!==this._scrollStart){this._lockPaddles=!0;var e={scrollLeft:this._wrapper.scrollLeft},i={scrollLeft:this._setNormalizedScroll(this._getBoundedScrollX(t))},o={ease:this._options.scrollEasing,onUpdate:this._onScrollClipUpdate,onComplete:this._onScrollClipComplete};c.to(e,this._options.scrollDuration,i,o)}},h._onScrollClipUpdate=function(t){this._scrollStart=this._wrapper.scrollLeft=Math.round(t.target().scrollLeft)},h._onScrollClipComplete=function(){this._updatePaddleDisplay(),this._lockPaddles=!1},h._scrollDirection=function(){var t="reverse",e=document.createElement("div");return e.style.cssText="width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;",e.style.direction="rtl",e.innerHTML="test",document.body.appendChild(e),e.scrollLeft>0?t="default":(e.scrollLeft=1,0===e.scrollLeft&&(t="negative")),document.body.removeChild(e),t},h._getNormalizedScroll=function(t){if(!this._isRightToLeft)return t;var e=Math.abs(t);return"default"===this._scrollType&&(e=this._contentWidth-this._wrapperWidth-e),e},h._setNormalizedScroll=function(t){return this._isRightToLeft&&"reverse"!==this._scrollType?"negative"===this._scrollType?-t:-(t-this._contentWidth+this._wrapperWidth):t},h._normalizePosition=function(t){return this._isRightToLeft?{top:t.top,right:this._wrapperWidth-t.right+this._paddleWidth,bottom:t.bottom,left:this._wrapperWidth-t.left+this._paddleWidth}:{top:t.top,right:t.right-this._paddleWidth,bottom:t.bottom,left:t.left-this._paddleWidth}},e.exports=o},{"@marcom/ac-clip":15,"@marcom/ac-dom-metrics/getPosition":18,"@marcom/ac-dom-styles/getStyle":27,"@marcom/ac-dom-traversal/children":40,"@marcom/ac-feature/touchAvailable":50,"@marcom/ac-object/defaults":52}],55:[function(t,e,i){"use strict";var o=t("./ChapterNav"),r=document.getElementById("chapternav");r&&(e.exports=new o(r))},{"./ChapterNav":54}],56:[function(t,e,i){"use strict";var o=(t("@marcom/ac-chapternav"),function(){return{initialize:function(){}}}());e.exports=o.initialize()},{"@marcom/ac-chapternav":55}]},{},[56]);
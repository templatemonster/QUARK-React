!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.quark=t(require("react")):e.quark=t(e.React)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=71)}({0:function(t,n){t.exports=e},10:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),u=r(a),i=n(8),l=r(i),s=function(e){return u.default.createElement(l.default,o({width:"full",height:"large"},e))};t.default=s},11:function(e,t){},2:function(e,t,n){e.exports=n(3)()},3:function(e,t,n){"use strict";var r=n(4),o=n(5),a=n(6);e.exports=function(){function e(e,t,n,r,u,i){i!==a&&o(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t};return n.checkPropTypes=r,n.PropTypes=n,n}},4:function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},5:function(e,t,n){"use strict";function r(e,t,n,r,a,u,i,l){if(o(t),!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,a,u,i,l],f=0;s=new Error(t.replace(/%s/g,function(){return c[f++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var o=function(e){};e.exports=r},6:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},7:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=n(0),i=r(u),l=n(2),s=r(l),c=n(10),f=r(c);n(11);var d=function(e){var t=e.widthType,n=e.heightType,r=e.roundedType,u=e.bgType,l=e.icon,s=e.className,c=e.type,d=e.isLoading,p=e.disabled,h=e.children,y=o(e,["widthType","heightType","roundedType","bgType","icon","className","type","isLoading","disabled","children"]),m=" button_width_"+t,b=" button_height_"+n,_=" button_rounded_"+r,g=p?"":" button_bg_"+u,v=d?" button_loading":"",O=s?" "+s:"",T="button"+m+b+_+g+v+O,x=l?" button__icon button__icon-"+l+" icon icon-"+l:"",w=!d&&x.length>0?i.default.createElement("i",{className:x}):null,P=d?i.default.createElement(f.default,null):w&&h;return"link"===c?i.default.createElement("a",a({},y,{className:T}),P):"text"===c?i.default.createElement("span",a({},y,{className:T}),P):i.default.createElement("button",a({},y,{type:c,className:T}),P)};d.propTypes={widthType:s.default.oneOf(["square","auto","full"]).isRequired,heightType:s.default.oneOf(["medium","large"]).isRequired,roundedType:s.default.oneOf(["all","bottom"]).isRequired,bgType:s.default.oneOf(["facebook","twitter","google-plus","pinterest","vk","1","2","3"]).isRequired,icon:s.default.string,className:s.default.string,type:s.default.oneOf(["button","submit","reset","link","text"]),isLoading:s.default.bool,disabled:s.default.bool,children:s.default.node},d.defaultProps={icon:"",className:"",type:"button",isLoading:!1,disabled:!1,children:null},t.default=d},71:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n(0),u=r(a),i=n(7),l=r(i),s=function(e){return u.default.createElement(l.default,o({widthType:"auto",heightType:"medium",roundedType:"all",bgType:"2"},e))};t.default=s},8:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=r(o),u=n(2),i=r(u);n(9);var l=function(e){var t=e.width,n=e.height,r=e.className;return a.default.createElement("span",{className:"tm-quark-loader tm-quark-loader_width_"+t+" tm-quark-loader_height_"+n+" "+r},a.default.createElement("span",{className:"loader__line"}),a.default.createElement("span",{className:"loader__line"}),a.default.createElement("span",{className:"loader__line"}))};l.propTypes={width:i.default.oneOf(["fixed","full"]).isRequired,height:i.default.oneOf(["medium","large"]).isRequired,className:i.default.string},l.defaultProps={className:""},t.default=l},9:function(e,t){}})});
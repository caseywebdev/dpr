(function(){var e,t,n,r,i;e=window.jQuery||window.Zepto,t=null,this.dpr=function(e){return typeof e=="string"?r(e):typeof e=="object"?n(e):i()},i=function(){var e,n,r,i,s,o,u,a,f;if(t)return t;o=window.devicePixelRatio,s=window.matchMedia;if(!o&&!s)return dpr["default"];u=dpr.supported,e=null,r=u[u.length-1],i="min-device-pixel-ratio: ";for(a=0,f=u.length;a<f;a++){n=u[a];if(!(e===null||o>=n||s&&s(""+i+n).matches||s("-webkit-"+i+n).matches||s("-moz-"+i+n).matches||s("-o-"+i+n).matches||s("-ms-"+i+n).matches))break;e=n}return t=e},r=function(e){var t;return(t=dpr())===1&&!dpr.one?e:e.replace(dpr.match,dpr.replace.replace(/#/,t))},dpr.scan=function(t){t==null&&(t=e(document));if(e)return e("img[data-dpr-src]",t).each(function(){var t;return(t=e(this)).attr({src:dpr(t.data("dprSrc"))}).removeAttr("data-dpr-src")})},(n=function(n){var r,i,s;if(n.supported&&""+n.supported!=""+dpr.supported||n["default"]&&n["default"]!==dpr["default"])t=null;(s=n.readyScan)!==dpr.readyScan&&e&&e(document)[s?"on":"off"]("ready",dpr.scan);for(r in n)i=n[r],dpr[r]=i;return dpr})({supported:[1,2],"default":1,match:/(\..*)/,replace:"-#x$1",one:!0,readyScan:!0})}).call(this);
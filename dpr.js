(function(){var e,t,n,r;e=window.jQuery||window.Zepto,this.dpr=function(e){return typeof e=="string"?n(e):(typeof e=="object"&&t(e),r())},r=function(){var e,t,n,r,i,s,o,u;i=window.devicePixelRatio,r=window.matchMedia;if(!i&&!r)return dpr["default"];s=dpr.supported,t=s[s.length-1],n="min-device-pixel-ratio: ";for(o=0,u=s.length;o<u;o++){e=s[o];if(i>=e||r&&r(""+n+check).matches||r("-webkit-"+n+check).matches||r("-moz-"+n+check).matches||r("-o-"+n+check).matches||r("-ms-"+n+check).matches)if(e!==t)continue;return e}},n=function(e){var t;return(t=dpr())===1&&!dpr.one?e:e.replace(dpr.match,dpr.replace.replace(/#/,t))},dpr.scan=function(){if(e)return e("img[data-dpr-src]").each(function(){var t;return(t=e(this)).attr({src:dpr(t.data("dprSrc"))}).removeAttr("data-dpr-src")})},(t=function(t){var n,r;for(n in t)r=t[n],dpr[n]=r;if(dpr.scanOnLoad&&e)return e(function(){return dpr.scan()})})({supported:[1,2],"default":1,match:/(\..*)/,replace:"-#x$1",one:!0,scanOnLoad:!0})}).call(this);
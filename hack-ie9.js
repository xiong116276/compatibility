//解决IE10以下不支持Function.bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
//IE 8 不支持forEach 函数
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback, thisArg ) {
    var T, k;
    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if ( typeof callback !== "function" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( arguments.length > 1 ) {
      T = thisArg;
    }
    k = 0;
    while( k < len ) {
      var kValue;
      if ( k in O ) {
        kValue = O[ k ];
        callback.call( T, kValue, k, O );
      }
      k++;
    }
  };
}
//判断IE 版本
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  if(isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if(fIEVersion == 7) {
      return 7;
    } else if(fIEVersion == 8) {
      return 8;
    } else if(fIEVersion == 9) {
      return 9;
    } else if(fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  }
}
//兼容 ie9 及以下 版本 不支持的一些 css 属性
//input placeholder属性
(function (win,doc) {
  var inputs = document.getElementsByTagName('input');

  if(IEVersion() === 9){
    var arr = Array.prototype.slice.call(inputs);
    arr.forEach(function (item, index) {
      if(item.attributes['placeholder']!== undefined && item.attributes['placeholder'].nodeValue.length > 0){
        var text = item.attributes['placeholder'].nodeValue;
        item.value = text;
        item.addEventListener("focus", function () {
          if(this.value !== text){
            this.value = this.value;
          }else {
            this.value = "";
          }
        });
        item.addEventListener("blur", function () {
          if(this.value !== text){
            if(this.value.replace(/(^\s*)|(\s*$)/g,'').length < 1){
              this.value = text;
            }else{
              this.value = this.value;
            }
          }else{
            this.value = text;
          }
        });
      }
    });
  }else if(IEVersion() < 9){
    var arr = [];
    for (var i = 0,len = inputs.length;i < len;i++){
      if(inputs[i].attributes['placeholder']!== undefined && inputs[i].attributes['placeholder'].nodeValue.length > 0){
        arr.push(inputs[i]);
      }
    }
    arr.forEach(function (item, index) {
      var text = item.attributes['placeholder'].nodeValue;
      item.value = text;
      item.attachEvent("onfocus", function (event) {
        if(event.srcElement.value !== text){
          event.srcElement.value = event.srcElement.value;
        }else {
          event.srcElement.value = "";
        }
      });
      item.attachEvent("onblur", function (event) {
        if(event.srcElement.value !== text){
          if(event.srcElement.value.replace(/(^\s*)|(\s*$)/g,'').length < 1){
            event.srcElement.value = text;
          }else{
            event.srcElement.value = event.srcElement.value;
          }
        }else{
          this.value = text;
        }
      });
    })
  }
})(window,document);





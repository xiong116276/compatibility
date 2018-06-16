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
// // 选择器
// $(".home-product .center-box .row-1 .item:last-child").each(function () {
//   $(this).css("border-right",0);
// });
//容器内最后一个元素border 为 0；
(function (win, doc, $) {
  var Border = function (obj) {
    this.container = obj.container;
    this.direction = obj.direction;
    this.init();
  };
  Border.prototype = {
    init:function () {
      $.each($(this.container),function (index,item) {
        $($(item).children()[$(item).children().length - 1]).css('border-'+this.direction,0);
      }.bind(this));
    }
  };
  win.Border = Border;
})(window,document,jQuery);
new Border({
  container:'.home-product .center-box .row-1',
  direction:'right'
});
//列表页商品
$(".goods-list-container-new .goods-show .show-table .goods-item:nth-child(5n)").each(function () {
  $(this).css("margin-right",0);
});

//input 内容垂直居中
(function (win, doc) {
  var inputs = doc.getElementsByTagName('input');
  for (var i = 0,len = inputs.length;i<len;i++){
    //判断元素没有line-height 属性时 添加line-height = height;
    if(inputs[i].currentStyle.lineHeight == 'normal'){
      inputs[i].style.lineHeight = inputs[i].currentStyle.height;
    }
  }
})(window,document);

//添加提示
var tips = function(){
  alert('你所用的浏览器版本过低，为了更好的体验，请升级或更换浏览器！');
};
// tips();
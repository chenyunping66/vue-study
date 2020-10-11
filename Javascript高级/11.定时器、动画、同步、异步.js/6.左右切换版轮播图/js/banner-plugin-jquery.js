/* 
 * //=> 向JQ的原型上扩展方法【一般用于写插件】
 * $.fn.extend({xxx;function(){}})   //见源码：jQuery.fn = jQuery.prototype = {}
 * $('.box').xxx(); //调用方式
 *
 * //=> 向JQ对象中增加私有的属性方法[一般用于完善类库，提供更多工具类方法]
 * $.extend({xxx:function(){}})  //见源码：jQuery.extend = jQuery.fn.extend = function(){} (将传进来的方法扩展到对象或者原型上)
 * $.xxx()
 */

/* 
  插件组件封装的一点思想：
  1.基于面向对象的方式来处理
    => 调取一次插件相当于创建插件的一个实例
    => 这样私有的可以设置，公有的方法也可以设置
  2.我们要保证几个事情（拟定参数配置项）：
     =》灵活且强大（尽可能适配更多不同的应用场景和需求）
     =》容错性和可扩展性更强（传参要采用对象配置的方式和参数初始化处理）
     =》追求极致的性能和优秀的代码管理方式
     =》开源，并且依赖社区力量不断的去完善
  3.按照步骤一次实现轮播图应该具备的功能
  4.增加生命周期函数（钩子函数）
  5.编写插件使用说明文档
  
*/
~ function ($) { //写一个闭包，$使用权有可能被其他类库所占用，为了保证$必须是jQuery
  if (typeof $ === 'undefined') {
    //=> throw new Error() 抛出浏览器异常信息，此时下面代码不再执行
    //new Error()创建Error实例
    throw new Error('当前插件必须依托JQUERY才可以实现~~');
  }

  //Banner-plugin：只封装合轮播图相关的功能（自动轮播，焦点）
  function bannerPlugin() {
    //=> this:要实现轮播图的容器（原生JS对象）
  }
  //扩展到jQuery上
  $.fn.extend({
    //=>bannerPlugin:bannerPlugin ES6的简写，属性名合属性值一样的话，省略，写一个就可以了
    bannerPlugin
  })
}(jQuery); //保证在闭包当中$必须是jQuery

$('#container1').bannerPlugin();
$('#container2').bannerPlugin();
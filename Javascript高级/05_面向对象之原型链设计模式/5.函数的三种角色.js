/* 
*
* 函数数据类型：
*   1.普通函数
*   2. 类（内置类 or 自定义类）
* 对象数据类型：（每一个对象数据类型的值由零到多组键值对组成的，只是属性名是它的数字索引）
*  1.{}普通对象 []数组对象 /^$/正则对象 日期对象 Math数学函数对象 
*     arguments等类数组对象  HTMLCollection/NodeLise元素或者节点集合类数组对象
*  2.实例也是对象数据类型的
*  3.类的prototype也是对象数据类型的（Function.prototype除外，它是一个匿名空函数）
*  4.函数也是对象
*  
*  =============================================
* 函数有三种角色
*    1.普通的函数
*       + 形参、实参 、arguments、return、箭头函数
*       + 私有作用域（栈内存、执行上下文）
*       + 形参赋值&变量提升
*       +作用域链
*       + 栈内存的释放和不释放（闭包）
*       +...
*    2.构造函数（类）
*       +类和实例
*       + prototype 和 _proto_原型和原型链
*       + instanceof
*       +constructor
*       +hasOwnProperty
*       +...
*    3.普通的对象
*      + 它是由键值对组成的
*      +......
*    函数中的this也是重点需要学习的内容

*/


//============================== JQuery源码初步分析(利用函数的三种角色)==================================

(function (global, factory) {
  // global:window（浏览器下运行） or global（node下运行）
  //factory: function ( window, noGlobal ) {...}  //callback
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    //  在node下运行
  } else {
    // 在浏览器下运行
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  //window:window
  //  noGlobal:undefined
  var
    version = "3.5.1",

    jQuery = function (selector, context) {

      return new jQuery.fn.init(selector, context);
    };
 var  init = jQuery.fn.init = function (selector, context, root) {
    //...
  };
  init.prototype = jQuery.fn = jQuery.prototype;  //重构原型

  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
  }


});
// typeof window !== "undefined" ? window : this  //利用暂时性死区的概念，判断该环境下是否存在window

/* 
*
* jQuery 是一个构造函数：jQuery.prototype上由很多供实例操作的方法，例如css...
*  $().css()
* jQuer 也是一个普通的对象，在它的堆空间中也存在很多的方法，例如ajax...   
*  $.ajax()
*/
$();//创建了jQuery这个类的一个实例，可以调取jQuery.prototype(jQuery.fn)这个上面的方法


// ==================================函数三种角色的应用（阿里超难面试题）===============================================
function Foo(){
  getName = function(){
    console.log(1);
  };
  return this;
};
Foo.getName= function(){
  console.log(2);
};
Foo.prototype.getName = function(){
  console.log(3);
};
var getName = function(){
  console.log(4);
};
function getName(){
  console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName(); //有参数列表和成员访问的优先级都是一样的，从左到右
new new Foo().getName();
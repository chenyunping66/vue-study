//构造函数复习
/*
* 类：都是函数类型的
* 实例：对象数据类型的
*/
function Fn() {
/*
*  new执行也会把类当作普通航速执行（当然也有类执行的一面）
*      1.创建一个私有的栈内存
*      2.形参赋值 & 变量提升
*      3.浏览器创建一个对象出来（这个对象就是当前类的一个新实例），
        并且让函数中的this指向这个实例对象 =>"构造函数模式中，方法中的this是当前类的实例"
       4.代码执行
       5.在我们不设置return的情况下，浏览器会把创建的实例对象默认返回
*
*/
this.x = 100;
this.y = 200;
this.say = function(){
  // ...
}

}

Fn.prototype.constructor === Fn; //true   在控制台输入这句代码
Fn.prototype.eat = function(){}
Fn.prototype.say = function(){}
Fn.prototype.write = function(){
  this.z = 1000;
}

let f1 = new Fn();
// （实例）f1  类 Fn
let f2 = new Fn();


// 创建值有两种方式
let a = 12; //字变量方式
let d = new Number('13'); //构造函数方式
Fn.prototype.write();  //this:Fn.prototype = >

// ============================

//基于内置类原型扩展方法（判断不是原型上的方法）
Object.prototype.hasPubProperty = function(property){
  //验证传递的属性名合法性（一般只能是数字或者字符串等基本值）
  // <!-- if( !["string","number","boolean"].includes(typeof property)){
  //     return false 
  // } -->
  // <!-- 简写方式： -->
  let x = ["string","number","boolean"],
      y = typeof property;
  if(!x.includes(y)) return false;
  //开始校验是否为公有的属性(方法中的this就是要校验的对象)
  let n = property in this,
      m = this.hasOwnProperty(property);
  return n && !m; //如果n为假返回n的值
}
// this是Array.prototype
console.log(Array.prototype.hasPubProperty('push')); //false
// ary.hasPubProperty('push')
console.log([].hasPubProperty('push')); //true
/* 
 * "..."的作用
 *   1.拓展运算符（多用在解构赋值中）
 *   2.展开运算符（多用在传递实参中）
 *   3.剩余运算符（多用在接收实参中）
 */

const {
  prototype
} = require("vue/types/umd");

// => 1.解构赋值
let [n, ...m] = [12, 23, 34];
// m:12  m:[23,34]

// =>2.传递实参
let ary = [12, 23, 13, 24, 10, 25];
let min = Math.min(...ary);

// 数组克隆(浅克隆)
let cloneAry = ary.slice(0);
let cloneAry = [...ary];
// 对象克隆（浅克隆）
let obj = {
  name: '放松',
  age: 16
};
let cloneObj = {
  ...obj,
  sex: 'girl',
  age: 17
} //还可以在后面新增属性

// => 3.接收实参
let fn = (n, ...args) => {
  ///n:10
  //args:[20,30]
};
fn(10, 20, 30)

/* 
 *  class创建类
 */
// 面向对象：通过构造函数模式创建一个类，并且创建一个类的实例，
// 通过原型链和原型相关的机制实现我们实例能够有私有也能够用所属类公有的方法，来实现整个面向对象，构造函数，原型链的模式

// =======================传统es3或者es5创建类的方法：================================
function Fn() {
  this.x = 100;
};
Fn.prototype.getX = function () {
  console.log(this.x);
};
var f1 = new Fn();
f1.getX();
//也可以当作普通函数执行，但是当作普通函数执行的话就没有原型实例的概念
// 没有那么严谨，很松散
Fn();
// 还可以把Fn当作普通的对象设置键值对
Fn.queryx = function () {};
// F1.queryx();//不能够这样调取
Fn.queryx()

// 有一种方式可以让当前Fn只能New执行不能当作普通函数执行

/* ==========================ES6创建类========================================== */
class Fn{
  // 等价于之前的函数体
  constructor(n,m){
    this.x = 100;
  }
  //直接写方法就是加在原型上的 ==== Fn.prototype.getx....
  getX(){
    console.log(this.x);
  }
  // 前面设置static的：把Fn当作普通对象设置的键值对
  static queryX(){}
  static z = 200; //当作普通函数z设置为200
  y = 200; //给实例设置的私有属性
}
// 也可以在外面单独这样写
Fn.prototype.getY = function(){}

// 可以在外面使用类型值的属性
Fn.z = 300;

let f = new Fn(10,20);
f.getX();
Fn.queryX(); //

// 举例子------------------------------
class Fn{
    
  constructor(n=0,m=0){ 
   this.x = n+m;
  }  
getX(){console.log('私有属性')}   //也不会导致原型重构的问题
static queryX(){console.log('私有属性')}
}

dir(Fn)
Fn.queryX
// ƒ queryX(){console.log('私有属性')}
let f = new Fn(10,20)
f
// Fn {x: 30}
f.getX
// ƒ getX(){console.log('私有属性')}
Fn()   //Uncaught TypeError: Class constructor Fn cannot be invoked without 'new'
//  =>class创建的类只能new执行，不能当作普通函数执行



// ===+++============================ES6中的模板字符串==============================================
// 例子1
let year = 2019,
    month = '08',
    day = '09';
//=>"你好小伙伴，今天是2019年08月09日，今天天气晴空万里！"
let res = "你好小伙伴，今天是"+year+"年"+month+"月"+day+"日，今天天气晴空万里！"
console.log(res);  //外层双引号，双引号++//外层单引号，内层单引号++  这样才能够快速实现字符串拼接

// 例子2
let id ="box";
let html = '<ul class="list clear" id="'+id+'"></ul>';  //单引号和双引号不能同事用

// 总结：我们真实项目中会大量进行字符串拼接（尤其是需要动态绑定数据：把现有的HTML代码拼接成数据的HTML字符串），
//       传统的ES3语法模式下字符串拼接是一个非常苦逼的任务/(ㄒoㄒ)/~~ 😭

// ES6模板字符串拼接
let year = 2019,
    month = '08',
    day = '09';
//=>"你好小伙伴，今天是2019年08月09日，今天天气晴空万里！"
// =>反引号（撇）： TAB键上面的
//${} 模板字符串书写JS表达式的方法（方式有输出结果的都可以被称为JS表达式，一般都是一行搞定的）
let res = `你好小伙伴，今天是${year}年${month}月${day}日，今天天气晴空万里！`
console.log(res); 

// 例子2
let id ="box";
let html = `<ul class="list clear" id="${id}"></ul>`;  
// 传统字符串方式拼接一套HTML字符串，还需要一行行的处理，非常麻烦

/* 
 * ES6基础语法：
 *  let 和 const： ES6新增的用来创建变化产量的
 */
let a = 12;
a = 13;
console.log(a); //13

const a = 12;
a = 13; //Uncaught TypeError: Assignment to constant variable. 基于const创建变量，变量存储的值不能被修改（常量）
console.log(a);

/* 
 *  let和var的区别：
 *  1.let 不存在变量提升（当前作用域中，不能在let声明使用变量）
 *  2.同一个作用域中，let不允许重复声明
 *  3.let解决了typeof的一个暂时性死区问题
 *  4.全局作用域中，使用let声明的变量并没有给winow加上对应的属性
 *  5.let会存在块作域（除对象以外的大括号都可以被看作块级作用域）
 */

// ========================箭头函数及this问题============================
/* 
 *  ES6新增了创建函数的方式："箭头函数"
 *     真实项目中是箭头函数和Function这种普通函数混合使用的
 */
// 1.箭头函数简化了创建函数的代码：--------------------------------------------------------
// 箭头函数的创建都是函数表达式的方式（变量=函数），这种模式下，
// 不存在变量提升，函数只能在创建完成后执行（也就是创建的代码之后执行）
const fn = ([形参]) => {
  //函数体（return）
};
fn([实参]);

// 如果形参只有一个小括号可以不加
const fn = n => {};
// 函数体中只要一句话，并且return xxx 的。可以省略大括号和return等
const fn = n => n * 10;

// 比如：
function fn(n) {
  return function (m) {
    return m + (++n);
  }
}

const fn = n => m => m + (++n);

// 2.箭头函数没有arguments,但是可以基于剩余运算符获取实参集合，而且ES6中是支持给形参设置默认值的-------------
// 比如：
let obj = {};
let fn = (context = window, ...args) => { // context = context || window => context = window给形参赋值默认值
  // console.log(arguments);  // Uncaught ReferenceError: arguments is not defined  函数中没有arguments
  console.log(args); //...args剩余运算符：把除第一项外的，其他传递的实参信息都存储到args这个数组集合中
}
fn(obj, 10, 20); //context:obj  //[10, 20]  __proto__: Array(0)
fn(); //context: window   //[]  __proto__: Array(0)

// 3.箭头函数中没有自己的this,它里面用到的this,都是自己所处上下文中的this(真实项目中，一旦涉及this问题，箭头函数慎用)-----------
// 比如：
window.name = 'WINDOW';
let fn = n => {
  console.log(this.name);
};
let obj = {
  name: 'OBJ',
  fn: fn //fn创建完成之后才可以使用,所以在前面声明
};
// fn所处的执行上下文中的this是window
fn(10); //this:window
fn.call(obj); //this:window 不是我们预期的obj
document.body.onclick = fn; //this:window 不是我们预期的body
obj.fn(10); //this:window

// 再比如：
let obj = {
  name: 'OBJ',
  fn: function () {
    // => this:obj 普通函数是有自己的this的
    let f = () => {
      // 箭头函数的this是指向自己所处的上下文中的this,就会往上一级寻找this,所以this：obj
      console.log(this);
    };
    // f();  //this:obj   // 箭头函数的this是指向自己所处的上下文中的this,就会往上一级寻找this
    return f;
  }
};
// obj.fn();
let f = obj.fn();
f(); // this:obj
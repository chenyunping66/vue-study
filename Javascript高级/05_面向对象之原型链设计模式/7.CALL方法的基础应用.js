/* 
 *  This:
 *    每一个函数（普通函数/构造函数/内置类）都是Function这个内置类的实例，所以：函数._proto_ === Function.prototype,
 *    函数可以直接调取Function原型上的方法
 */
// Function.prototype => function anonymous(){}  只有function这个类的原型是一个函数，但是把它当作对象用就可以了
// dir( Function.prototype ) 发现原型上有几个公有属性方法，每一个函数都可以调用这个方法执行： call/apply/bind.....
//  这些方法都是用来改变函数中的this指向的

const {
  delete
} = require("vue/types/umd");

// const { delete } = require("vue/types/umd");

function fn() {};
fn.call(); // fn函数基于原型链找到Function.prototype上的call方法，并且让其执行（执行的是call方法：方法中的this是fn）
fn.call.call(); //fn.call就是Function.prototype上的call方法，也是一个函数，只要是函数就能用原型上的方法，所以可以连续调用call来执行

// Function.prototype.call = function $1(){
//   //...
// }
// fn.call => $1;
// fn.call => $1() this:fn
// fn.call.call() => $1.call()  => 继续让call执行，this:$1

// 总结： 实例.方法（）：都是找到原型上的内置方法，让内置方法先执行（只不过执行的时候，做了一些事情会对实例产生改变，而这也是这些内置方法的作用）
// 内置方法中的this一般都是当前操作的实例

// ==========================call方法===============================
window.name = 'WINDOW';
let obj = {
  name: 'OBJ'
};
let fn = function () {
  console.log(this.name);
};
fn(); // this:window  // =>'WINOW'   严格下是undefined

// 我们的需求是想让fn执行的时候，方法中的this执行OBJ
// obj.fn(); //  Uncaught TypeError: obj.fn is not a function报错  obj并没有fn这个属性

// -------------------解决办法一----------------------------
obj.fn = fn;
obj.fn(); //'OBJ'
delete obj.fn; //执行完成后删除
console.log(obj);

// -------------------解决办法二----------------------------
fn.call(obj); //this:obj    //=>'OBJ'
fn.call(); //=>this:window  //=>'WINOW'  严格模式下指向的是undefined
fn.call(null); //=>this:window  //=>'WINOW'  严格模式下指向的是undefined 
// (第一个参数传递的是null/undefined不传,非严格模式下this指向window,严格模式下传递的是谁，this就是谁，不传this是undefined)
fn.call(obj, 10, 20); //this:obj  n=10  m=20
fn.call(10, 20); //this:10  n=20, m=undefined


//总结： call方法
// 语法：函数.call([context],[params1],....)
/* 
 * 函数基于原型链找到Function.prototype.call这个方法，并且把它执行在call方法执行的时候完成了一些功能
 * - 1. 让当前函数执行
 * - 2. 把函数中的this指向改为第一个传递给call的实参
 * - 3. 把传递给call其余的实参,当作参数信息传递给当前函数
 * 如果执行call一个实参都没有传递，非严格模式下是让函数中的this指向window,严格模式下指向的是undefined
 */

// call更强大的地方：
Object.prototype.toString(); //=>toString方法中发this: Object.prototype
Object.prototype.toString.call(100); //toString方法中的this:100

// =======================================基于原生JS实现（模拟）内置call的方法（真正的call是用c++写的）========================================================
~ function () {
  /* 
   * call:改变函数中的this指向
   *   @params
   *      context可以不传递，传递必须是引用类型值（因为后面要给它加$fn的属性）
   */
  function call(context) {
    //this: fn 当前要操作的这个函数实例
    // context.$fn = this;  //this指向当前要操作的函数
    // context.$fn();
    // delete context.$fn;
    // return this;

    context = context || window; //如果不传指向window
    let args = [], //除第一个参数外剩余传递的信息值
      result;
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    context.$fn = this; //this指向当前要操作的函数
    result = context.$fn(...args); ///args=[10,20]...是es6里面的展开运算符，把数组中的每一项分别的展开传递给函数 //=》context.$fn(10,20)
    delete context.$fn;
    return result;
  }
  /* 扩展到内置类的原型上 */
  Function.prototype.call = call; //这样把内置call改了,这个时候执行的是自己内置的call方法
  //  Function.prototype.mycall = call;  //正常来写是这样的
}();

// 测试用例
let obj = {
  name: 'OBJ'
}

function sum() {
  console.log(this);
  return n + matchMedia;
}
sum.call(obj, 10, 20);

// =========================阿里面试题===================================
function fn1() {console.log(1)};
function fn2 () {console.log(2)};
fn1.call(fn2);  //1 把fn1执行，让fn1的this指向fn2，最后指向的都是fn1
fn1.call.call(fn2); //2  不管前面有多少个，首先执行的都是最后一个call方法 
/* 
*  context:fn2
*  this:fn1.call
=>第一次执行call方法：
fn1.$fn() = fn1.call
fn2.$fn() => fn1.call方法执行，方法中的this变为fn2
=> 第二次执行call方法：
fn1.call this:fn2
context: undefined || window
this:fn2
 => context.$fn => window.$fn() = fn2;
 => result = window.$fn() =>fn2执行，this是window
*/
Function.prototype.call(fn1); //undefined
/* 
*  context:fn1  this: Function prototype
=> fn1.$fn() = Function prototype
=>fn1.$fn() //this:fn1
Function prototype执行，但是它是一个匿名空函数，没有任何输出结果
*/
Function.prototype.call.call(fn1); //1
/* 
* context:fn1  this:Function.prototype.call
第一次执行call方法
* =>fn1.$fn = F.p.call
* => fn1.$fn() 执行F.p.call() 此时this执行fn1
第二次执行call方法
context: window this:fn1
=> window.$fn = fn1
=> window.$fn 执行fn1 this:window,所以输出1
*/

// 总结：1个call是让左边点的 函数执行（this是传递的参数），
//       多个calll是让最后传参的函数执行（this是window/undefined）
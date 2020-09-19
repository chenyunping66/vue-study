// 案例一
var a = 12;
var b = a;
b = 13; 
console.log(a);  //12
console.log(b); //13

console.log(a); //undefined 只是var先声明了，但是并没有赋值
var a = 12;
var b = a;
b = 13;
console.log(a);  //12


// 案例二
console.log(sum(10, 20)); //30  function不仅声明而且赋值了
function sum(n,m){
  return n + m;
}

// 函数表达方式，由于使用var来创建sum,变量提升阶段只会声明变量，不会赋值
// 所以此时函数在前面执行，函数是没有值的，不能执行(真实项目中，这种方式最常用，因为它操作严谨)
console.log(sum);  //undefined
sum(10,20);  //Uncaught TypeError: sum is not a function
var sum = function(n,m) {
  return n + m;
}
console.log(sum(10,20));
//es6写法，也是为了让逻辑更加严谨
let sum = (n,m) => n+m;

// ---------------------------------------------------------------------------------------------
// 作业题一
console.log(a); //undefiend
var a =12; //a = 12 给a赋值
a = 13;  //a=13 将a赋值给13
console.log(a);  // 13输出结果是13
// 全局作用域（栈内存）
// 1.变量提升
        var a;  //默认值undefined
// 2.代码执行



// 作业题二
console.log(a); //VM30:1 Uncaught ReferenceError（引用错误）: a is not defined  因为只有带var或者带function的才提前声明或者定义
let a = 12;   //在js当中，上一行代码报错，下面一行都不会再去执行了
a = 13;
console.log(a);
// 全局作用域（栈内存）
// 1.变量提升
// 2.代码执行

// var 定义的变量存在提升机制，但是let不存在变量提升
// --------------------------------------------------------------------------------------------------

// 作业题三
console.log(a);  //VM2964:1 Uncaught ReferenceError: a is not defined
// 因为只有带var或者带function的才提前声明或者定义
a = 13;
console.log(a);

a = 13;  //a是window.a = 13 是window的全局的属性名
console.log(a); //13
alert("");  //window.alert()

// --------------------------------------------------------------------------------------

作业四:
var a = 12;
var a =13;
console.log(a); //13  
// 同一个变量定义两次，后面的覆盖掉前面的

let a = 12;
let a = 13;  //Uncaught SyntaxError: Identifier 'a' has already been declared //a的变量已经被定义了
console.log(a); 

console.log(1);  //这行代码已经不会再被执行了
let a = 12;
console.log(a);
let a = 13;  ////直接报错 Uncaught SyntaxError（语法错误）: Identifier 'a' has already been declared  这一行已经报错了
console.log(a);  
// 词法检测，不符合要求直接报错

console.log(1);  //1
console.log(a);  //1.html:13 Uncaught ReferenceError(引用错误): Cannot access 'a' before initialization
let a = 12;
// SyntaxError（语法错误）： 词法解析发现通过不了
//  ReferenceError(引用错误)： 等到执行到哪一行的时候，发现才执行不了


// => 所谓重复是不管之前通过声明变量，只要当前执行上下文中存在了这个变量，我们使用let/const重复再声明这个变量就是语法错误
console.log(a);
var a = 12;
let a = 99; //Uncaught SyntaxError: Identifier 'a' has already been declared  直接报错
console.log(a);
//不允许重复声明是：不管你用什么办法，我都是不允许重复声明

console.log(a);
let a = 99;  //Uncaught SyntaxError: Identifier 'a' has already been declared  直接报错
var a = 12;
console.log(a);

// -----------------------------------------------------------------------------------------

fn();
function fn(){console.log(1);}
fn();
function fn(){console.log(2);}
fn();
var fn = function fn(){console.log(3);}
fn();
function fn(){console.log(4);}
fn();
function fn(){console.log(5);}
fn();
// 解析：见作业题讲解

// -----------------------------------------------------------------------------------------

// 作业：变量提升关于条件判断的处理
let obj = {
  name:'cc',
  age: 88
}
console.log("name" in obj); //true
console.log("age" in obj); //true
console.log("sex" in obj); //false
// [property] in [object] 验证当前属性是否属于这个对象

// 全局作用域（栈内存）
// 1.变量提升/词法解析
// 不管条件是否成立都要进行变量提升
//  var a; //创建一个全局变量a  =>window.a   创建全局变量，同时给window增加了一个属性
// 2.代码执行
console.log(a); //undefined
if(!('a' in window)){  //true  =>  !true => false
  var a = 3;
}
console.log(a);  // undefined


//全局作用域（栈内存）
//1.变量提升
    // 但是做函数的有特殊性，在老版本浏览器中，确实不论条件是否成立，函数也是提前声明或者定义的，
    // 但是新版本浏览器当中，为了兼容es6严谨的语法规范，
    // 条件中的函数，只会在变量提升阶段只能提前声明，不能提前定义。
    // function fn; 
// 2.代码执行
console.log(fn); //undefined
fn();  //1.html:11 Uncaught TypeError（类型错误：调用不存在的方法）: fn is not a function
if('fn' in window){
    function fn(){
      console.log('hhhh')
    }
}
fn();


console.log(fn); //undefined
if('fn' in window){  //true
  // 条件成立，进来后的第一件事就是给fn赋值，然后再执行代码。
     fn()
    function fn(){
      console.log('hhhh')
    }
}
fn(); //hhh

// ----------------------------------------------------------------------------------------------------------------------------
// 自执行函数(匿名函数):创建一个没有名字的函数，不能执行，但是创建完立刻变成（）表达式，让它立即执行
// =>前面加的(),或者!、-、+、~只有一个目的，让语法符合而已
//=>自执行函数本身不进行变量提升（没名字）
// function(n){10}; 这样写不支持
(function(n){})(10);

//全局作用域（栈内存）
//1.变量提升
// 2.代码执行
f = function() {return true;} // => window.f = ...
g = function() {return false;} // => window.g = ...
~function(){
  //函数执行会形成一个私有作用域
  //  1.变量提升 function g;
  //  2.代码执行
  if(g() && [] == ![]){  //1.html:17 Uncaught TypeError: g is not a function  一次也没有输出直接报错
    // &&遇到真就往后走，遇到假返回，走到最后不管真假都返回
    // || 遇到假往后走，遇到真就返回，...
    // undefined , null, NaN, "" , 0, false都为假，其他都为真
    f = function() {return false;}
    function g(){return true;}
  }
}();
console.log(f());
console.log(g());

// ----------------------------------------------------------------------------------------------------------------------------

// 重点：暂时性死区
// let能够解决浏览器的暂时性死区
console.log(a);  //VM46:1 Uncaught ReferenceError: a is not defined

// typeof检测数据类型，返回结果是字符串，字符串里面包含对应的类型(基本类型包含：number,null,string,boolean,undefiend。。。引用类型：object,function)

console.log(typeof  a);  //"undefined"  这是浏览器的bug，本应该是报错的，因为没有a(暂时性死区)


/*
* 词法解析
*/
console.log( typeof a);  //1.html:12 Uncaught ReferenceError: Cannot access 'a' before initialization  不能够在初始化a之前使用a
let a;
//解决了暂时性死区问题

// --------------------------------------------------------------------------------------------------------------------------
console.log(a,b);
var  a = 12,
     b = 12;
function fn(){
  console.log(a,b);
  var a= b = 13;
  console.log(a,b);
}
fn();
console.log(a,b);
// 解析：见私有作用域下的变量提升图

//练习
console.log(a,b,c);
var  a = 12,
     b = 13,
     c = 14;
function fn(a){
  console.log(a,b,c);
  a =100;
  c = 200;
  console.log(a,b,c);
}
b = fn(10);
console.log(a,b,c);
// 解析：见私有作用域下的变量提升图1

//练习
function sum(a){
  console.log(a);
  let a = 100;  //Uncaught SyntaxError: Identifier 'a' has already been declared
  console.log(a); 
}
sum(200);

// ----------------------------------------------------------------------------------------------------
var arry = [12,23];
function fn(ary) {
  console.log(ary);  ///[12,23]
  ary[0] = 100;
  ary = [100];
  ary[0] = 0;
  console.log(ary); //[0]
}
fn(ary);
console.log(ary); //[100,23]
// 解析：见私有作用域下的变量提升图3

// ---------------------------------------------------------------------------------------------------------

//如何查找上级作用域链和堆内存释放问题
var n = 1;
function fn() {
  var n = 2;
  function f(){
    n--;
    console.log(n);
  }
  fn();
  return f;
}
var x = fn();
x();
console.log(n);
// 解析：见如何查找上级作用域链和堆内存释放问题图

//练习
var i = 0; 
function  A() {
  var  i = 10;
  // 函数x()是在A()的私有作用域下创建的
  function x() {
    console.log(i); // 10  10
  }
  return x;
}
var  y = A();  // y = x;
y();  // 相当于x 上级作用域永远是A里面的  //10
function B()
 {
   var i = 20;
   y(); //还是x，在A里面创建的，上级作用域还是A
 }
 B();  //10

//  总结：上级作用域是谁跟他在哪执行没有关系，只跟它在哪里创建有关系，在哪儿创建的，它的上级作用域就指向谁。


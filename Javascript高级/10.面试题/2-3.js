/* 3.使用箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用new生成实例，那么箭头函数可以吗？为什么？ */
/* 
* 答： 箭头函数和普通函数的区别：
*       1.箭头函数语法上比普通函数更加简洁(ES6中每一种函数都可以使用形参赋默认值（x=0）和剩余运算符(...args))
*       2.箭头函数没有自己的this,它里面的this是继承函数所处上下文中的this（使用call/apply等任何方式都无法改变this的指向）
*       3.箭头函数中没有arguments(arguments得到的是类数组)，只能基于...args获取传递的参数集合（得到的参数集合本身就是一个数组）
*       4.箭头函数不能被new执行（因为：箭头函数没有this也没有prototype）
*/


// 1.箭头函数语法上比普通函数更加简洁
function fn(x){
  return function(y){
    return x+y;
  }
}
let fn=x=>y=>x+y;


//  2.箭头函数没有自己的this,它里面的this是继承函数所处上下文中的this（使用call/apply等任何方式都无法改变this的指向）
let obj = {
  name:'OBJ'
}
function fn1(){
  console.log(this); //{name: "OBJ"}
}
fn1.call(obj);

let fn2 = () => {
  console.log(this);  //windwow
}
fn2.call(obj);

document.body.onclick=()=>{
  //this: window 不是当前操作的body
}

document.body.onclick = function(){
  //this: body
  arr.sort(function(a,b){
    //将创建的方法传给sort,之后让sort把这个方法执行  this:window
    //这叫回调函数，回调函数中的this一般都是window
    // (回调函数就是我把一个函数当作指传给另一个方法，然后在另外一个方法中执行的时候，把当前函数执行)
    return a-b;
  })

  arr.sort((a,b)=>{
    //this:body
    return a-b;
  })
}

//回调函数：把一个函数B作为实参传递给另外一个函数A，函数A在执行的时候，可以把传递进来的函数B去执行（执行N次,可传值，可改this）
// jquery的each()方法的原理：支持返回值，结束循环，可以自己写在循环上
function each(arr,callBack){
  //=》 callback：function(item,index){}
   for(let  i=0;i<arr.length;i++){
    //  let item = arr[i];
    //      index = i;
      // callBack(item,index);
      let flag = callBack.call(arr,arr[i],i);
      //=> 接收回调函数返回的结果，如果是false,我们结束循环
      if(flag === false){
        break;
      }

   }
}
each([10,20,30,40],function(item,index){
    //call之后，this变成原始操作的数组
    if(index>1){
      return false;
    }
});

//  3.箭头函数中没有arguments(arguments得到的是类数组)，只能基于...args获取传递的参数集合（得到的参数集合本身就是一个数组）
let fn = (...args) =>{
  // console.log(arguments);  //ReferenceError: arguments is not defined
  console.log(args);  //[10, 20, 30]
};
fn(10,20,30);


// ================构造函数（function）可以使用new生成实例，那么箭头函数可以吗？为什么？===================
function Fn(){
  this.x=100;
}
Fn.prototype.getX = function(){};
let f = new Fn();

//箭头函数
let Fn = () => {
  this.x = 200; ///Uncaught TypeError: Fn is not a constructor
}  //dir(Fn)没有prototypes,所以没有构造函数
let f = new Fn;

//普通函数能被new执行，而箭头函数不能new当作构造函数执行

// ========================================================================
// 思考题1：
// each方法（）：
let arr = [10,2030,'AA',40];
    obj = {};
arr =arr.each(function (item,index){
   //this:obj （each第二个参数不传，this是window即可）
   if(isNaN(item)){
     return false; //如果return 的是false,则结束当前数组的循环
   }
   return item*10; //返回的结果是啥，就把数组中当前项替换成啥
},obj);
// arr = [100,200,300,'AA',40];

//思考题2：
// 重写一个方法replace，实现和内置一模一样的效果，只需要考虑replace([reg],[callback])这种参数格式的处理
let str  = "xuexixuexi2020jiayou2020922";
str = str.replace(/xuexi/g,function(...arg){
  // arg中存储每一次大正则的信息和小分组匹配的信息
  return '@'; //返回的是啥把当前正则匹配的内容替换成啥
});
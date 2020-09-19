// 求两个数的和，算完后乘以10，然后再除以2

// let n = 10 + 10;
// n = n * 10;
// m = n / 2;

// let n = 20 + 20;
// n = n * 10;
// n = n / 2;

//sum是函数名，代表这个函数本身
//sum()是让函数执行，代表的是函数执行返回的结果
//n/m是形参，是变量，，用来存储执行函数时传递的实参

// function sum(n, m) {
//   let result = n + m;
//   result *= 10;
//   result /= 2;
//   console.log(result);
// }
// console.log(sum); //代表函数本身
// //10，20，20，30这都是传递给形参变量的值（实参）
// sum(10,20); //把函数执行
// sum(20,30);  //函数封装的作用

// =========================形参的细节
//如果创建函数的时候，设置了形参变量，但是如果执行的时候，
// 并没有给传递实参，那么形参变量默认的值是undefined
function sum2(a, b) {
  console.log(a,b);
  //undefined undefined   //数学运算的时候undefined变为NaN
  //10 undefined
  //22 99
  //19 29
  //形参默认值的处理：如果没有传递形参值，给予一个默认值
  // 使得容错性更好一点，保证程序在执行的时候不会出现NaN
  if(a === undefined) {  //方法一
    // null == undefined //true
    // null === undefined //false
    a = 0;
  }
  if( typeof b == 'undefined'){  //方法二 更喜欢用这个方式 typeof undefined => undefined
    b = 0;
  }
  let result = a + b;  // 0+0 =>0
  result *= 10;  
  result /= 2;
  // console.log(result);
}
sum2();
sum2(10);  //n=10 => 10+0 => 10 =>10*10 =100 => 100/2 =》150
sum2(22,99);
sum2(19,29,39);

// ================================================================函数中的返回值
//函数执行的时候，函数体内部创建的变量我们是无法获取和操作的，
// 如果想要获取内部的信息，我们需要基于true返回值机制，把信息返回才可以
function sum(n,m){
  let result = n +m;
  return result; //return的一定是值：此处是把result变量存储的值返回给外面,不然外面拿不到就报错
}
sum(10,20);
let AA = sum(10,20);
console.log(AA);  //30
console.log(result);  //报错 （闭包）  Uncaught ReferenceError: result is not defined

//情况二
function sum(n,m){
  let result = n +m;
  // return result;  //如果没有写return ,函数默认返回值是undefined
}

let AA = sum(10,20);
console.log(AA); //undefined

//情况三
function sum(n,m){
  if(n === undefined || m === undefined){
    //函数体中遇到return,后面代码则不再执行了
      return;
  }
  let result = n + m;
}
sum(10,20);

// ===============================匿名函数
//匿名函数之函数表达式，把一个匿名函数本身作为值赋值给其他东西，
// 这种函数一般不是手动触发执行，而是靠其他程序驱动触发执行（例如：触发某个事件的时候把它执行等）
document.body.onclick = function(){}  //1.触发某个事件的时候把它执行
setTimeout(function(){
  //2.设置定时器，1000ms后执行匿名函数
  //定时器驱动函数执行的
},1000);
//3. 匿名函数值自执行函数：创建完一个匿名函数，紧接着就把当前函数加小括号执行
(function(n){
 //立即执行函数
 //创建完成之后，立刻执行
 //n=>100
}(100));
//匿名函数有两大类：自执行函数，函数表达式
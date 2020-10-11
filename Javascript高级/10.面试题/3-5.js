var b = 10;
(function b(){ 
  b = 20;
   console.log(b);  //函数
})();
console.log(b); //10

// 如何 console.log(b); 输出20？
//答：里面的b一定需要是私有的，不能是全局的
var b = 10;
(function b(){ 
   var b = 20;  //里面的b一定需要是私有的，不能是全局的（声明它或者改为形参）var const let 。。。 或者（function b(c)}();
   console.log(b);  //20
})();
console.log(b); //10


// ==========解析匿名函数=============================
let fn =function AAA(){
  "use strict";
  AAA = 1000;  //VM273:4 Uncaught TypeError: Assignment to constant variable.
  console.log(AAA);  //当前函数
}; 
// AAA();  //Uncaught SyntaxError: Identifier 'fn' has already been declared
 //匿名函数一旦起名字: 1.本应匿名的函数如果设置了函数名，在外面还是无法调用的，但是在函数里面是可以使用的
 //                   2. 而且类似于创建常量一样，这个名字存储的值不能再被修改
//                    (非严格模式下不报错，但是不会有任何的效果，严格模式下直接报错，我们可以把AAA理解为是用const创建出来的)
 fn();
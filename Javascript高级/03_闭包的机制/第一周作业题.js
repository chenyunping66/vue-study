// 学知识要不断强化复习，一直到变成习惯性表达，才算掌握扎实
// 抛弃之前的，踏踏实实把每一步扎扎实实走下来，空杯心态

/*  全局作用域
  * 
  *变量提升（全局）
  *  function fn(){...}
  * 
  * 在全局作用域下，带var/function声明的全局变量相当于给window设置了对应的属性（即是全局变量也是属性），
  *                不带var的声明的只是window设置了对应的属性，
  * 如果使用的是let/const声明的，只是全局变量，没有给window设置属性
  */

  // console.log(a); //Uncaught ReferenceError: a is not defined
  a = 12;
  function fn() {
    console.log(a); //12
    a = 13;
  }
  fn();
  console.log(a); //13

  /*  全局作用域
  * 
  *变量提升（全局）
  *  function fn(){...}
  * 
  * let/cost是不进行变量提升的
  */
 console.log(1); //1
 console.log(a); //Uncaught ReferenceError: Cannot access 'a' before initialization
 let a = 12;
 function fn() {
   console.log(a);
   let a = 13;
 }
 fn();
 console.log(a);
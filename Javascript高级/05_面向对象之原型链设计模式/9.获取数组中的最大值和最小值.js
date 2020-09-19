// 根据实际情况用call.apply.bind，但是有些需求是只能用call实现，apply有时候有自己的特殊用处

/* 获取数组中的最大值和最小值 */
let ary = [12, 24, 14, 8, 35, 15];

/* 解决方案一：先排序，第一项和最后一项就是我们需要的 */
ary.sort(function (a, b) {
  return a - b;
})
let min = ary[0];
let max = [ary.length - a];
console.log(min, max);

/* 解决方案二：Math.max/Math.min */
// =>Math.max/min 要求我们传递的数据是一项项传递进来的，获取一堆数中的最大最小值，而不是获取一个数组中的最大最小值
let min = Math.min([12, 24, 14, 8, 35, 15]);
console.log(min); //NaN
let min = Math.min(12, 24, 14, 8, 35, 15);
console.log(min); //8

// 1.基于ES6展开运算符(但是es6低版本不兼容)
let ary = [12, 24, 14, 8, 35, 15];
let min = Math.min(...ary);
console.log(min); //8

// 2.利用apply来实现即可(this无所谓，主要是利用apply给函数传参，需要写成一个数组的特征)
let min = Math.min.apply(null, ary); //(window,ary); 
console.log(min); //8
// babel.js 网站可以将es6编译成原生js

/* 解决方案三：假设法（假设第一个是最大的，让数组中的每一项分别和当前假设的值比较，如果比假设的值大，则把最大的值设为
新的假设值，继续向后比较即可） 
*/
let max = ary[0];
// for(let i=1;i<ary.length;i++){
//   let item = ary[i];
//   item>max?max = item:null;
// }
// ary.slice(1).forEach(item => [
  ary.forEach(item => {
  // forEach默认从第一项开始比较
  item > max ? max = item : null
  })
console.log(max); // 35

//-------------------- 真实项目中的一个应用： --------------------------------
let obj = {
  name:'OBJ',
  fn:function(){
   //this:obj
  //  ..
  //=> 原本期望的需求是：1s后把OBJ中的name改为"学习“
  // setTimeout(function(){
  //   console.log(this);  //this:window  因为setTimout本身就是（window.setTimout）浏览器上的
  //  this.name = '学习';
  // },1000);

  // 没有箭头函数之前的用法是这样的
  // let _this = this;  //把需要的this提前用变量存储起来，
  // setTimeout(function(){
  //   _this.name ='学习';  //需要使用的时候，拿出来用即可
  // },1000);

  // 箭头函数的解决办法
  setTimeout(() =>{
    console.log(this);
    this.name = "学习";
  },1000)
  }
};
obj.fn();  //name: "学习"
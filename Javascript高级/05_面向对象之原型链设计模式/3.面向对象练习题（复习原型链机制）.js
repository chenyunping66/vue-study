// const { fn } = require("jquery");

function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function (){
    console.log(this.x);
  }
}
Fn.prototype.getX = function(){
  console.log(this.x);
}
Fn.prototype.getY = function(){
  console.log(this.y);
}
let f1 = new Fn;
let f2 = new Fn;
console.log(f1.getX === f2.getX); // 看图找答案：因为都是找的自己私有的方法，所以答案为false
console.log(f1.getY === f2.getY);  // true ，自己私有的没有，就去找公有的，结果公有上有，公用一个方法，所以为true
// console.log(f1._proto_.getY === Fn.prototype.getY);  // true  相等，找的是同一个  //Uncaught TypeError: Cannot read property 'getY' of undefined
// console.log(f1._proto__.getX === f2.getX); // 一个是公有的，一个是私有的，所以不一样 false
console.log(f1.getX === Fn.prototype.getX); // false  一个私有的一个公有的
console.log(f1.constructor); // Fn 

f1.getX();  //100 找this执行，
f1._proto_.getX();  //
/* 
1.找的是公有方法
2.this： f1._proto_  === Fn.prototype
3.替换console.log(f1._proto_.x)
4.都没有x ，所以值为undefined
*/
f2.getY();
/* 
1.找的是公有方法
2.this:f2
3.console.log(f2.y)
4. 200
 */
Fn.prototype.getY();
/* 
1. 找的公有方法
2.this:Fn.prototype
3.console.log(Fn.prototype.y)
4.undefined
*/


// 某个值是否是数组： 基于constructor实现数据类型检测就是这样来玩的
// 但这种方式有很大的弊端：因为用户可以去随意修改对应的constructor值或者手动给ary增加一个私有的constructor属性等
let ary = [];
console.log(ary.constructor); //为true说明是数组
console.log(Fn.prototype._proto_.constructor); //Object
// 添加公有的属性：
// Fn.prototype.constructor = 'AAA';
// ary._proto_.constructor = 'BBB';
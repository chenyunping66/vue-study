/*
 * 类：都是函数类型的
 * 实例：对象数据类型的
 */
function Fn() {
  //这个里面的this:指向当前的实例f1
  this.x = 100;
  this.y = 200;
  this.say = function () {
    //还没有执行不知道this执行谁，方法执行的时候才知道执行主体是谁
    console.log(this.x)
  }

}
Fn.prototype.say = function () {
  console.log(this.y)
}
Fn.prototype.eat = function () {
  console.log(this.x + this.y)
}
Fn.prototype.write = function () {
  this.z = 1000;
}
// =======================================================================================================================================
// （实例）f1  类 Fn
let f1 = new Fn();
f1.say(); //=>say方法执行，this指向f1  =》console.log(this.x)=》f1.x =>100
f1.eat(); //=>this:f1 =>comsole.log(f1.x +f1.y) =>300
// f1._proto_.say(); //=>this.f1._proto_ => consoel.log(f1._proto_.y) => undefined
Fn.prototype.eat(); //=this:Fn.prototype => (Fn.prototype.x + Fn.prototype.y) => undefined+undefined= NaN
f1.write(); //=>this:f1 =>f1.z = 1000 =>给f1设置一个私有属性z=1000
Fn.prototype.write(); //=>this:Fn.prototype =>Fn.prototype.z=1000 =>给原型上设置一个属性z=1000(属性是实例的的公有属性)
/*
 *面向对象中有关私有/公有方法上的this问题，我们遵守三个原则
 *  1.方法执行，看前面是否有点，点前面是谁this就是谁
 *  2.把方法中的this进行替换
 *  3.再基于原型链查找的方法确定结果即可
 */
//  =======================================================================================================================================

// let f2 = new Fn();

// Fn.prototype.write();  //this:Fn.prototype = >



//数组去重
function unique(ary) {
  let obj = {};
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (typeof obj[item] !== 'undefined') {
      // <!-- ary.splice(i,1); -->  //影响性能损耗
      ary[i] = ary[ary.length - 1];
      ary.length--;
      i--;
      continue;
    }
    obj[item] = item;
  }
  obj = null; //堆内存释放
  return ary;
}

let ary = [12, 34, 555, 44, 56, 44, 12];
ary = unique(ary);
console.log(ary);

//使用内置类原型扩展方法实现数组去重
~ function () {
  /*
   * myUnique:实现数组去重
   * @params
   * @return
   *  [Array] 去重后的数组
   * by chenyunping on 20200909
   */
  function myUnique() {
    //此时没有传递要操作的ary进来,但是方法中的this是当前要操作的数组ary.myUnique()
    let obj = {};
    // <!-- _this = this; -->
    for (let i = 0; i < ary.length; i++) {
      let item = this[i];
      if (typeof obj[item] !== 'undefined') {
        // <!-- ary.splice(i,1); -->  //影响性能损耗
        //优化
        this[i] = this[this.length - 1];
        this.length--;
        i--;
        continue;
      }
      obj[item] = item;
    }
    obj = null; //堆内存释放
    return this;
  }
/* 

*/

  //扩展到内置类的原型上
  Array.prototype.myUnique = myUnique;
}();
let ary2 = [12, 34, 555, 44, 56, 44, 12];
// ary.myUnique();
// ary.sort((a,b) => b-a);// 降序
// // ary.sort((a,b) => a-b); //升序
//链式写法（保证返回值以让是当前类的实例，一般都会return this）
ary = ary.myUnique().sort((a, b) => a - b).reverse().slice(2).push('学习加油'); //=>链式写法
ary = ary.myUnique().sort((a, b) => a - b).reverse().slice(2).push('学习加油').concat(12); //=>报错
//执行完push返回的是一个数字（新增数组的长度，不能继续使数组的方法）
console.log(ary);
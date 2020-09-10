function CreatePerson(name,age){
  // 函数没有执行前,this是一堆字符串
  //thi=>person1  this指向这个实例
  this.name = name;
  this.age = age;
  // return 100； //=>返回的还是实例
  // return {    /=>如果手动return的是一个基本值，对返回的实例无影响，如果手动return的是一个引用类型的值，会把默认返回的实例给替换
  // （所以在构造函数模式执行下，我们一般都不要手动写return,防止把返回的实例给替换掉）
  //   xxx:'xxx'
  // }
}
CreatePerson('张三',23); //=>this:window  普通函数执行

let person1 = new CreatePerson('lili',12);
/*
 *
 *new CreatePerson()执行和普通函数执行的联系
 *  1.new这种执行方式叫做“构造函数执行模式”，此时CreatePerson不仅仅是一个函数名，被成为"类“，
 * 而返回的结果（赋值给person1的）是一个对象，我们称之为"实例"，而函数体中出现的this都是这个实例。
 *  (new的执行让普通方法变成了一个实例)
 * 
 */

//  ====================================instanceof/typeof=============================================================

//  检测数据类型有四种方式：typeof instanceof  Object.prototype.toString.call()  constructor
/*
* instanceof:用来检测某个实例是否属于这个（某个）类，利用这个特征可以用来做一些数据类型的检测，
             （实例 instanceof  类），属于返回true,不属于返回false
*             【局限性】
                  1.要求检测的实例必须是对象数据型的，基本数据类型的实例是无法 基于它检测出来的

  typeof: 【局限性】typeof null //=>"Object"  无法具体的区分数组和正则
  而instanceof可以区分出数组和真则了，两个互补。
 */
console.log(person1 instanceof  CreatePerson) //=>true
// Array 是一个数组类，每一个数组都是Array的类
let ary= [12,23];
console.log(ary instanceof Array); //=>true
console.log(ary instanceof Object);//=>true
// 主要判断实例和类的关系，检测A是否是B的实例
// 类的第一个字母大写，类都是函数数据类型，实例/数组/正则都是对象数据类型的，但是基本数据类型是值类型

// 缺点：// 基本类型在js中有一个特殊性：
//   1.一定是自己所属类的实例
//   2.但是不一定是对象数据类型的
console.log(1 instanceof Number); //false 

//方式一：字面量创建方式(也是Number类的实例，也可以调取内置的公有方法)
let n = 10;
console.log(typeof n); //=>"number" 基本类型
console.log( n.toFixed(2)) //"10.00"

//方式二：构造函数创建模式（创建出来的实例是对象类型的）
let m = new Number("10");
console.log(typeof m);  //"object" 构造类型
console.log(m.toFixed(2)); //"10.00"

// ===============================================================================================================
// 总结：创建值有两种方式，
//方式一：字面量创建方式（创建出来的是基本值类型）
let n = 10;
//方式二：构造函数创建模式（创建出来的实例是对象类型的）
let m = new Number("10");
// 但是对于正则来说，这两种方式创建出来的都是对象（RegExp）
// =================================================================================================================

//练习题
//构造函数执行，因为它具备普通函数执行的特点
// 1.和实例有关系的操作一定是this.xxx = xxx,因为this是当前类创造出来的实例
// 2.私有变量和实例没有必然联系
function Fn(n){
  let m = 10;  //私有变量
  this.total = n + m;
  this.say = function(){
    console.log(this.total);
  };
}
let f1 = new Fn(10);
let f2 = new Fn(20);
let f3 = new Fn; //函数执行不加小括号，代表函数本身 =>new 的时候无论是否加小括号，都相当于把Fn执行了。
// 也创建了对于的实例，只不过不加小括号是不能传递实参的（当前案例中的形参n=undefined）, this.total = n + m;  undefined+10 // =>NaN

console.log(f1.m); //undefined
comsole.log(f2.n); //undefined
console.log(f1.total); //20
f2.say(); //this:f2(因为say执行前面有点，this就是谁)  30
console.log(f1 === f2);//是两个不同的实例对象（不同的堆地址） false
// 只有this才跟当前实例有关系
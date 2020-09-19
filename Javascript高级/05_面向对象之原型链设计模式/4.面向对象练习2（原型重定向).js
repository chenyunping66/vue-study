// 练习题二
function Func() {
  this.a = 0;
  this.b = function () {
    alert(this.a);
  }
}
func.prototype = {
  b: function () {
    this.a = 20;
    alert(this.a);
  },
  c: function () {
    this.a = 30;
    alert(this.a);
  }
}
var my_fun = new Func();
my_fun.b();
my_fun.c();

// 知识点：
/* 
*  重构类的原型：让某个类的原型指向新的堆内存地址（叫重定向指向）
*      导致的问题：重定向后的空间中不一定有constructor属性（只有浏览器默认给prototype开辟的堆内存中才有constructor）,
*                 这样导致类和原型机制不完整：所以需要我们手动再给新的原型空间设置constructor属性：指向函数本身
*      导致的问题2：在重新指向之前，我们需要确保原有原型的堆内存中没有设置属性和方法，因为重定向后，原有的属性和方法就没啥用了
                   （如果需要克隆到新的原型堆内存中，我们还需要额外的处理） =>
                   但是内置类的原型，由于担心这样的改变会让内置的方法都小时，所以进制我们给内置类原型的空间重定向，
                   例如：Array.prototype={...}这样没有用，如果想加方法：Array.prototype.xxx=function(){...}可以这样处理。
*
*
*/
// 真实项目上的使用：
function Fn() {
  //...
}
Fn.prototype.getA = function () {}
Fn.prototype.getB = function () {}
Fn.prototype.getC = function () {}
// 上面这样写太麻烦了

// 1.批量给原型设置属性方法的时候：设置别名
let proto = Fn.prototype;
proto.getA = function () {};
proto.getB = function () {};

// 2.批量给原型设置属性方法的时候：重构类的原型
// 这样写还支持多人开发，但是会导致一个问题：constructor属性
Fn.prototype = {
  constructor: Fn,
  getA: function () {},
  getB: function () {}
};



// ==================================================================

// 练习题三
function C1(name) {
  // name: undefined
  if (name) { //undefined代表五个值中的一个，为假false，所以不成立
    this.name = name;
  }
  // this.xxxx = xxx才叫私有属性
}

function C2(name) {
  // name:undefined
  // this.name = undefined
  this.name = name;
}

function C3(name) {
  //name：undefined
  // this.name = undefined || 'join';  
  this.name = name || 'join'; //如果为假，返回右边的值
}

C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name)); //=> "Tomundefinedjoin"

// 解析：
let c = new C1();
c.name; //找原型上的'Tom'

new C2().name; //undefined
new C3().name; // 'join'

// ====================================================================

// 练习题四
function Fn(num) {
  this.x = this.y = num;
}
Fn.prototype = {
  x: 20,
  sum: function () {
    console.log(this.x + this.y);
  }
};
let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum);
f.sum();
Fn.prototype.sum();
console.log(f.constructor);

// ======================================================================

//练习题五
function Fn() {
  let a = 1;
  this.a = a;
}
Fn.prototype.say = function () {
  this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;
Fn.prototype.b = function () {
  this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor === Fn);

// ==================================================
// 练习题六
let n = 10;
let m = n.plus(10).minus(5);
console.log(m); // 15

// 基于内置类的原型扩展方法

~ function () {
  // x是需要加减的数字(必须是有效数字)
  function checkX(x) {
    x = Number(x);  //非有效数字返回NaN
    return isNaN(x) ? 0 : x;
  }

  function plus(x) {
    // this:我们要操作的原始值数字（this=xxx我们不能给this手动赋值）
   x=checkX(x);
   return this + x;
  }

  function minus(x) {
  x = checkX(x);
  return this - x;
  }
  /* 扩展到内置类的原型上 */
  Number.prototype.plus = plus;
  Number.prototype.minus = minus;
}();

let n = 10;
let m = n.plus(10).minus(5);
console.log(m); // 15

// 思考题：重构数组的slice方法（不能用内置的），基于原生JS实现出内置方法一模一样的效果
// N/M的各种情况
##  基础知识点与高频考题

### JavaScript基础

```js
// 京程一灯，每日一题
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
// 写出代码执行结果，并解释为什么

// 答案与解析
true false
对于运算符>、<,一般的计算从左向右
第一个题：1 < 2 等于 true, 然后true < 3，true == 1 ，因此结果是true
第二个题：3 > 2 等于 true, 然后true > 1, true == 1 ，因此结果是false

/*********************************/

[typeof null, null instanceof Object]
// 写出代码执行的结果，并解释为什么

//答案与解析
 ["object", false]
1）typeof操作符返回一个字符串，表示未经计算的操作数的类型
	类型					结果
Undefined		"undefined"
Null				"object"
Boolean			"boolean"
Number			"number"
String			"string"
Symbol			"symbol"
函数对象			"function"
任何其他对象	"object"
typeof null === 'object';// 从最开始的时候javascript就是这样
JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null的类型标签也成为了 0，typeof null就错误的返回了"object"。这算一个bug,但是被拒绝修复，因为影响的web系统太多

2）instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
null不是以Object原型创建，因此返回false

/*********************************/
// 死循环陷阱
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);
// 写出正确的打印结果，并解释为什么？

// 答案与解析
这个会陷入一个死循环，2^53是最大的值，因此2^53+1 等于 2^53

/*********************************/

var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c];
// 写出代码执行结果

// 答案与解析
 [false,false,false]
需要注意的是只能通过调用 Date 构造函数来实例化日期对象：以常规函数调用它（即不加 new 操作符）将会返回一个字符串，而不是一个日期对象。另外，不像其他JavaScript 类型，Date 对象没有字面量格式。
a是字符串，b和c是Date对象，并且b代表的是1970年那个初始化时间，而c代表的是当前时间。

/*********************************/
// 逗号表达式
var x = 20;
var temp = {
    x: 40,
    foo: function() {
        var x = 10;
      	console.log(this.x);
    }
};
(temp.foo, temp.foo)();

// 写出打印结果
20
逗号操作符，逗号操作符会从左到右计算它的操作数，返回最后一个操作数的值。所以(temp.foo, temp.foo)();等价于var fun = temp.foo; fun();，fun调用时this指向window，所以返回20。

/*********************************/
链式调用
// 实现 (5).add(3).minus(2) 功能
// console.log((5).add(3).minus(2)); // 6

/*
	答案：12
	arguments中c的值还是1不会变成10，  
	因为a函数加了默认值，就按ES的方式解析，ES6是有块级作用域的，所以c的值是不会改变的
*/
Number.prototype.add = function (number) {
    if (typeof number !== 'number') {
        throw new Error('请输入数字～');
    }
    return this + number;
};
Number.prototype.minus = function (number) {
    if (typeof number !== 'number') {
        throw new Error('请输入数字～');
    }
    return this - number;
};
console.log((5).add(3).minus(2));

/*********************************/

var a = 1;        
(function a () {            
    a = 2;            
    console.log(a);        
})();

// 答案
ƒ a () {            
    a = 2;            
    console.log(a);        
}
/*
立即调用的函数表达式（IIFE） 有一个 自己独立的 作用域，如果函数名称与内部变量名称冲突，就会永远执行函数本身；所以上面的结果输出是函数本身；
*/

/*********************************/

var a = [0];
if(a){
    console.log(a == true);
}else{
    console.log(a);
}

/*
答案：false
当a出现在if的条件中时，被转成布尔值，而Boolean([0])为true,所以就进行下一步判断 a == true,在进行比较时，[0]被转换成了0，所以0==true为false
js的规则是：  
如果比较的是原始类型的值，原始类型的值会转成数值再进行比较
1 == true  //true   1 === Number(true)
'true' == true //false Number('true')->NaN  Number(true)->1
'' == 0//true
'1' == true//true  Number('1')->1
对象与原始类型值比较，对象会转换成原始类型的值再进行比较。
undefined和null与其它类型进行比较时，结果都为false，他们相互比较时结果为true。



下边的不要了sadfasdfasdfasdfsadfasdffasdfasdf
一些隐式转换
数组从非primitive转为primitive的时候会先隐式调用join变成“0”，string和boolean比较的时候，两个都先转为number类型再比较，最后就是0==1的比较了
var a = [1];
if(a){
    console.log(a == true);
}else{
    console.log(a);
}
// true
!![] //true  空数组转换为布尔值是true,  
!![0]//true  数组转换为布尔值是true  
[0] == true;//false   数组与布尔值比较时却变成了false  
Number([])//0  
Number(false)//0  
Number(['1'])//1

所以当a出现在if的条件中时，被转成布尔值，而Boolean([0])为true,所以就进行下一步判断 a == true,在进行比较时，js的规则是：  
如果比较的是原始类型的值，原始类型的值会转成数值再进行比较
1 == true  //true   1 === Number(true)
'true' == true //false Number('true')->NaN  Number(true)->1
'' == 0//true
'1' == true//true  Number('1')->1
对象与原始类型值比较，对象会转换成原始类型的值再进行比较。
undefined和null与其它类型进行比较时，结果都为false，他们相互比较时结果为true。
*/

/****************************/

const a = [1,2,3],
    b = [1,2,3],
    c = [1,2,4],
		d = "2",
		e = "11";
console.log([a == b, a === b, a > c, a < c, d > e]);
// 写出正确打印结果

// 答案
[false,false,false,true,true] 

// 解析
1）JavaScript 有两种比较方式：严格比较运算符和转换类型比较运算符。
	对于严格比较运算符（===）来说，仅当两个操作数的类型相同且值相等为 true，而对于被广泛使用的比较运算符（==）来说，会在进行比较之前，将两个操作数转换成相同的类型。对于关系运算符（比如 <=）来说，会先将操作数转为原始值，使它们类型相同，再进行比较运算。
	当两个操作数都是对象时，JavaScript会比较其内部引用，当且仅当他们的引用指向内存中的相同对象（区域）时才相等，即他们在栈内存中的引用地址相同。
	javascript中Array也是对象，所以这里a,b,c显然引用是不相同的，所以这里a==b,a===b都为false。

2）两个数组进行大小比较，也就是两个对象进行比较
	当两个对象进行比较时，会转为原始类型的值，再进行比较。对象转换成原始类型的值，算法是先调用valueOf方法；如果返回的还是对象，再接着调用toString方法。
①valueOf() 方法返回指定对象的原始值。
  JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。
②toString() 方法返回一个表示该对象的字符串。
  每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。
③经过valueOf,toString的处理，所以这里a,c最终会被转换为"1,2,3"与"1,2,4";

3）两个字符串进行比较大小
	上边的数组经转换为字符串之后，接着进行大小比较。
	MDN中的描述是这样的：字符串比较则是使用基于标准字典的 Unicode 值来进行比较的。
	字符串按照字典顺序进行比较。JavaScript 引擎内部首先比较首字符的 Unicode 码点。如果相等，再比较第二个字符的 Unicode 码点，以此类推。
	所以这里 "1,2,3" < "1,2,4",输出true,因为前边的字符的unicode码点都相等，所以最后是比较3和4的unicode码点。而3的Unicode码点是51,4的uniCode码点是52，所以a<c。
"2" > "11"也是同理，这个也是开发中有时会遇到的问题，所以在进行运算比较时需要注意一下。

4）关于valueOf，toString的调用顺序
①javascript中对象到字符串的转换经历的过程如下：
	如果对象具有toString()方法，javaScript会优先调用此方法。如果返回的是一个原始值（原始值包括null、undefined、布尔值、字符串、数字），javaScript会将这个原始值转换为字符串，并返回字符串作为结果。
	如果对象不具有toString()方法，或者调用toString()方法返回的不是原始值，则javaScript会判断是否存在valueOf()方法，如若存在则调用此方法，如果返回的是原始值，javaScript会将原始值转换为字符串作为结果。
  如果javaScript无法调用toString()和valueOf()返回原始值的时候，则会报一个类型错误异常的警告。
	比如：String([1,2,3]);将一个对象转换为字符串
	var a = [1,2,3];
	a.valueOf = function(){
    console.log("valueOf");
    return this
  }
	a.toString = function(){
    console.log('toString')
    return this
  }	
	String(a);
	因为这里我返回的是this，最后，所以如果javaScript无法调用toString()和valueOf()返回原始值的时候，则会报一个类型错误异常的警告。
  
②javaScript中对象转换为数字的转换过程：
	javaScript优先判断对象是否具有valueOf()方法，如具有则调用，若返回一个原始值，javaScript会将原始值转换为数字并作为结果。
	如果对象不具有valueOf()方法，javaScript则会调用toString()的方法，若返回的是原始值，javaScript会将原始值转换为数字并作为结果。
	如果javaScript无法调用toString()和valueOf()返回原始值的时候，则会报一个类型错误异常的警告。
	比如：Number([1,2,3]);将一个对象转换为字符串
  
/*****************************************/
  
var a = ?;
if(a == 1 && a== 2 && a== 3){
 	console.log(1);
}

/*
比较操作涉及多不同类型的值时候，会涉及到很多隐式转换，其中规则繁多即便是经验老道的程序员也没办法完全记住，特别是用到 `==` 和 `!=` 运算时候。所以一些团队规定禁用 `==` 运算符换用`===` 严格相等。
*/
// 答案一
var aﾠ = 1;
var a = 2;
var ﾠa = 3;
if(aﾠ==1 && a== 2 &&ﾠa==3) {
    console.log("1")
}
/*
	考察你的找茬能力，注意if里面的空格，它是一个Unicode空格字符，不被ECMA脚本解释为空格字符(这意味着它是标识符的有效字符)。所以它可以解释为
  var a_ = 1;
  var a = 2;
  var _a = 3;
  if(a_==1 && a== 2 &&_a==3) {
      console.log("1")
  }
*/
//答案二
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}
/*
	如果原始类型的值和对象比较，对象会转为原始类型的值，再进行比较。
	对象转换成原始类型的值，算法是先调用valueOf方法；如果返回的还是对象，再接着调用toString方法。
*/
// 答案三
var a = [1,2,3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3);
/*
	比较巧妙的方式，array也属于对象，
	对于数组对象，toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。
	数组 toString 会调用本身的 join 方法，这里把自己的join方法该写为shift,每次返回第一个元素，而且原数组删除第一个值，正好可以使判断成立
*/
// 答案四
var i = 0;
with({
  get a() {
    return ++i;
  }
}) {
  if (a == 1 && a == 2 && a == 3)
    console.log("1");
}
/*
	with 也是被严重建议不使用的对象，这里也是利用它的特性在代码块里面利用对象的 get 方法动态返回 i.
*/
// 答案五
var val = 0;
Object.defineProperty(window, 'a', {
  get: function() {
    return ++val;
  }
});
if (a == 1 && a == 2 && a == 3) {
  console.log('1');
}
/*
	全局变量也相当于 window 对象上的一个属性，这里用defineProperty 定义了 a的 get 也使得其动态返回值。和with 有一些类似。
*/

// 答案六
let a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};
if (a == 1 && a == 2 && a == 3) {
  console.log('1');
}
/*
	ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。我们之前在定义类的内部私有属性时候习惯用 __xxx ,这种命名方式避免别人定义相同的属性名覆盖原来的属性，有了 Symbol  之后我们完全可以用 Symbol值来代替这种方法，而且完全不用担心被覆盖。
	除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。Symbol.toPrimitive就是其中一个，它指向一个方法，表示该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。这里就是改变这个属性，把它的值改为一个 闭包 返回的函数。
*/

业务中一般不会写出这种代码,重点还是知识点的考察

/*******************************************/

let a = {n: 1};
let b = a;
a.x = a = {n: 2};
console.log(a.x) 	
console.log(b.x)

答案：
undefined {n:2}

注意点：

1: 点的优先级大于等号的优先级
2: 对象以指针的形式进行存储，每个新对象都是一份新的存储地址

解析：

- `var b = a;` b 和 a 都指向同一个地址。
- `.`的优先级高于`=`。所以先执行`a.x`，于是现在的`a`和`b`都是`{n: 1, x: undefined}`。
- `=`是从右向左执行。所以是执行 `a = {n: 2}`，于是`a`指向了`{n: 2}`
- 再执行 `a.x = a`。 这里注意，`a.x` 是最开始执行的，已经是`{n: 1, x: undefined}`这个地址了，而不是一开的的那个`a`，所以也就不是`{n: 2}`了。而且`b`和旧的`a`是指向一个地址的，所以`b`也改变了。
- 但是，`=`右面的a，是已经指向了新地址的新`a`。
- 所以，`a.x = a` 可以看成是`{n: 1, x: undefined}.x = {n: 2}`
- 最终得出
  a = { n: 2 }，
  b = {
     n: 1,
     x: { n: 2 }
  }

/*****************************************/

// 实现一个模板引擎
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined
function render(template,data){
  // your code
}
// 补充代码，使代码可以正确执行

// 代码实现
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

/*****************************************/

什么是包装对象(wrapper object)？

// 答案
1）复习一下JS的数据类型，JS数据类型被分为两大类，基本类型和引用类型
①基本类型：Undefined,Null,Boolean,Number,String,Symbol,BigInt
②引用类型：Object,Array,Date,RegExp等，说白了就是对象。

2）其中引用类型有方法和属性，但是基本类型是没有的，但我们经常会看到下面的代码
let name = "marko";
console.log(typeof name); // "string"
console.log(name.toUpperCase()); // "MARKO"
name类型是 string，属于基本类型，所以它没有属性和方法，但是在这个例子中，我们调用了一个toUpperCase()方法，它不会抛出错误，还返回了对象的变量值。
原因是基本类型的值被临时转换或强制转换为对象，因此name变量的行为类似于对象。 除null和undefined之外的每个基本类型都有自己包装对象。也就是：String，Number，Boolean，Symbol和BigInt。 在这种情况下，name.toUpperCase()在幕后看起来如下：
console.log(new String(name).toUpperCase()); // "MARKO"
在完成访问属性或调用方法之后，新创建的对象将立即被丢弃。
```

### 防抖/节流

```js
const debounce = (fn,delay) => {
  // 介绍防抖函数原理，并实现
  // your code
}
const throttle = (fn,delay = 500) => {
  // 介绍节流函数原理，并实现
   // your code
}

// 答案与解析
/*
	1）防抖函数原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
	适用场景：
		①按钮提交场景：防止多次提交按钮，只执行最后提交的一次
		②服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似
*/
// 手写简化版实现
const debounce = (fn,delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this.args);
    },delay)
  }
}

/*
	2）节流函数原理:规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。防抖是延迟执行，而节流是间隔执行，函数节流即每隔一段时间就执行一次
	适用场景：
		①拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
		②缩放场景：监控浏览器resize
		③动画场景：避免短时间内多次触发动画引起性能问题
*/
// 手写简化版实现
// ①定时器实现
const throttle = (fn,delay = 500) =>{
  let flag = true;
  return (...args) => {
    if(!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this,args);
      flag = true;
    },delay);
  };
}
// ②时间戳实现
const throttle = (fn,delay = 500) => {
  let preTime = Date.now();
  return (...args) => {
    const nowTime = Date.now();
    if(nowTime - preTime >= delay){
      	preTime = Date.now();
      	fn.apply(this,args);
    }
  }
}
```

### new 的实现原理，模拟实现一下

```js
// 首先，new操作符做了什么
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作
创建一个空的简单JavaScript对象（即{}）；
链接该对象（即设置该对象的构造函数）到另一个对象 ；
将步骤1新创建的对象作为this的上下文 ；
如果该函数没有返回对象，则返回this。即创建的这个的新对象，否则，返回构造函数中返回的对象。

// 参考答案：1.简单实现
function newOperator(ctor) {
    if (typeof ctor !== 'function'){
        throw 'newOperator function the first param must be a function';
    }
  	// ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    var args = Array.prototype.slice.call(arguments, 1);
    // 1.创建一个空的简单JavaScript对象（即{}）
    var obj = {};
    // 2.链接该新创建的对象（即设置该对象的__proto__）到该函数的原型对象prototype上
    obj.__proto__ = ctor.prototype;
    // 3.将步骤1新创建的对象作为this的上下文
    var result = ctor.apply(obj, args);
    // 4.如果该函数没有返回对象，则返回新创建的对象

    var isObject = typeof result === 'object' && result !== null;
    var isFunction = typeof result === 'function';
    return isObject || isFunction ? result : obj;
}

// 测试
function company(name, address) {
    this.name = name;
    this.address = address;
  }
  
var company1 = newOperator(company, 'yideng', 'beijing');
console.log('company1: ', company1);

// 参考答案：2.更完整的实现
/**
 * 模拟实现 new 操作符
 * @param  {Function} ctor [构造函数]
 * @return {Object|Function|Regex|Date|Error}      [返回结果]
 */
function newOperator(ctor){
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1.创建一个全新的对象，
    // 2.并且执行[[Prototype]]链接
    // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    var argsArr = [].slice.call(arguments, 1);
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
}
```

### this指向

```js
// 来一道面试题
var a=10;
var foo={
  a:20,
  bar:function(){
      var a=30;
      return this.a;
    }
}
console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar=foo.bar)());
console.log((foo.bar,foo.bar)());

// 答案：
20 20 10 10

// 第一问  foo.bar()
/*
	foo调用，this指向foo , 此时的 this 指的是foo，输出20
*/
// 第二问  (foo.bar)()
/*
	给表达式加了括号，而括号的作用是改变表达式的运算顺序，而在这里加与不加括号并无影响；相当于foo.bar(),输出20
*/
// 第三问  (foo.bar=foo.bar)()
/*
	等号运算，
	相当于重新给foo.bar定义，即
	foo.bar = function () {
    var a = 10;
    return this.a;
	}
	就是普通的复制,一个匿名函数赋值给一个全局变量
	所以这个时候foo.bar是在window作用域下而不是foo = {}这一块级作用域，所以这里的this指代的是window,输出10
*/
// 第四问  (foo.bar,foo.bar)()
/*
	1.逗号运算符，
	2.逗号表达式，求解过程是：先计算表达式1的值，再计算表达式2的值，……一直计算到表达式n的值。最后整个逗号表达式的值是表达式n的值。逗号运算符的返回值是最后一个表达式的值。
  3.其实这里主要还是经过逗号运算符后，就是纯粹的函数了，不是对象方法的引用，所以这里this指向的是window，输出10
  4.第三问，第四问，一个是等号运算，一个是逗号运算，可以这么理解，经过赋值，运算符运算后，都是纯粹的函数，不是对象方法的引用。所以函数指向的this都是windows的。
*/
```

如果用一句话说明 this 的指向，那么即是: 谁调用它，this 就指向谁。但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

首先来看一下this绑定的规则，来详细看一下，这样再遇到this的问题，可以从容应对

- 默认绑定

  - ```js
    // 默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var name = 'yideng';
    sayHi();
    //在调用Hi()时，应用了默认绑定，this指向全局对象（非严格模式下），严格模式下，this指向undefined，undefined上没有this对象，会抛出错误。
    // 如果在浏览器环境中运行，那么结果就是 Hello,yideng
    // 如果在node环境中运行，结果就是 Hello,undefined.这是因为node中name并不是挂在全局对象上的。
    ```

- 隐式绑定

  - ```js
    // 函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun()
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'yidneg1',
        sayHi: sayHi
    }
    var name = 'yidneg2';
    person.sayHi();
    // Hello yideng1
    // sayHi函数声明在外部，严格来说并不属于person，但是在调用sayHi时,调用位置会使用person的上下文来引用函数，隐式绑定会把函数调用中的this(即此例sayHi函数中的this)绑定到这个上下文对象（即此例中的person）
    ```

  - 需要注意的是：对象属性链中只有最后一层会影响到调用位置。

  - ```js
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person2 = {
        name: 'yideng1',
        sayHi: sayHi
    }
    var person1 = {
        name: 'yideng2',
        friend: person2
    }
    person1.friend.sayHi();
    // Hello yideng1
    //因为只有最后一层会确定this指向的是什么，不管有多少层，在判断this的时候，我们只关注最后一层，即此处的friend。
    ```

  - **隐式绑定有一个大陷阱，**绑定很容易丢失(或者说容易给我们造成误导，我们以为this指向的是什么，但是实际上并非如此).

  - ```js
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'yideng1',
        sayHi: sayHi
    }
    var name = 'yideng2';
    var Hi = person.sayHi;
    Hi();
    // Htllo yideng2
    // Hi直接指向了sayHi的引用，在调用的时候，跟person没有半毛钱的关系，针对此类问题，我建议大家只需牢牢记住这个格式:XXX.fn();fn()前如果什么都没有，那么肯定不是隐式绑定。
    ```

  - 除了上面这种丢失之外，隐式绑定的丢失是发生在回调函数中(事件回调也是其中一种)，

  - ```js
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person1 = {
        name: 'yideng1',
        sayHi: function(){
            setTimeout(function(){
                console.log('Hello,',this.name);
            })
        }
    }
    var person2 = {
        name: 'yideng2',
        sayHi: sayHi
    }
    var name='yideng3';
    person1.sayHi();
    setTimeout(person2.sayHi,100);
    setTimeout(function(){
        person2.sayHi();
    },200);
    
    // Hello yideng3
    // Hello yideng3
    // Hello yideng2
    
    1.第一条输出很容易理解，setTimeout的回调函数中，this使用的是默认绑定，非严格模式下，执行的是全局对象
    2.第二条输出是不是有点迷惑了？说好XXX.fun()的时候，fun中的this指向的是XXX呢，为什么这次却不是这样了！Why?
    其实这里我们可以这样理解: setTimeout(fn,delay){ fn(); },相当于是将person2.sayHi赋值给了一个变量，最后执行了变量，这个时候，sayHi中的this显然和person2就没有关系了。
    3.第三条虽然也是在setTimeout的回调中，但是我们可以看出，这是执行的是person2.sayHi()使用的是隐式绑定，因此这是this指向的是person2，跟当前的作用域没有任何关系。
    ```

  - 看到这里是不是有点疲倦了

- 显示绑定

  - 显式绑定比较好理解，就是通过call,apply,bind的方式，显式的指定this所指向的对象。

  - call,apply和bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。

  - ```js
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'yideng1',
        sayHi: sayHi
    }
    var name = 'yideng2';
    var Hi = person.sayHi;
    Hi.call(person); //Hi.apply(person)
    // Hello yideng1  因为使用硬绑定明确将this绑定在了person上。
    ```

  - 使用了硬绑定，是不是意味着不会出现隐式绑定所遇到的绑定丢失呢？显然不是这样的，不信，继续往下看。

  - ```js
    function sayHi(){
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'yideng1',
        sayHi: sayHi
    }
    var name = 'yideng2';
    var Hi = function(fn) {
        fn();
    }
    Hi.call(person, person.sayHi); 
    // Hello yideng2
    输出的结果是 Hello, Wiliam. 原因很简单，Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候，相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了，隐式绑定也丢了)，没有指定this的值，对应的是默认绑定。
    现在，我们希望绑定不会丢失，要怎么做？很简单，调用fn的时候，也给它硬绑定。
    
    var Hi = function(fn) {
        fn.call(this);
    }
    这样就行了
    因为person被绑定到Hi函数中的this上，fn又将这个对象绑定给了sayHi的函数。这时，sayHi中的this指向的就是person对象。
    ```

- new 绑定

  - javaScript和Ｃ＋＋不一样，并没有类，在javaScript中，构造函数只是使用new操作符时被调用的函数，这些函数和普通的函数并没有什么不同，它不属于某个类，也不可能实例化出一个类。任何一个函数都可以使用new来调用，因此其实并不存在构造函数，而只有对于函数的“构造调用”

  - 前边我们提到new 操作符都干了什么

    - 创建一个空对象，构造函数中的this指向这个空对象
    - 这个新对象被执行 [[原型]] 连接
    - 执行构造函数方法，属性和方法被添加到this引用的对象中
    - 如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。

  - 因此，我们使用new来调用函数的时候，就会新对象绑定到这个函数的this上。

  - ```js
    function sayHi(name){
        this.name = name;
    	
    }
    var Hi = new sayHi('yideng');
    console.log('Hello,', Hi.name); // Hello yideng
    ```

- 绑定优先级

  - 我们知道了this有四种绑定规则，但是如果同时应用了多种规则，怎么办？
  - 显然，我们需要了解哪一种绑定方式的优先级更高，这四种绑定的优先级为:
    - new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
    - 感兴趣的可以写个demo测试看看

- 绑定例外

  - 凡事都有例外，this的规则也是这样。

  - 如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。

  - ```js
    var foo = {
        name: 'yideng1'
    }
    var name = 'yideng2';
    function bar() {
        console.log(this.name);
    }
    bar.call(null); //yideng2
    因为这时实际应用的是默认绑定规则。
    ```

- 箭头函数

  - 箭头函数是ES6中新增的，它和普通函数有一些区别，箭头函数没有自己的this，它的this继承于外层代码库中的this。箭头函数在使用时，需要注意以下几点:
    - 函数体内的this对象，继承的是外层代码块的this。
    - 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
    - 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
    - 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
    - 箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

  

### 一道综合面试题

```js
function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log (4);};
function getName() { console.log (5);}
 
//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

// 2 4 1 1 2 3 3
```

这道题的经典之处在于它综合考察了面试者的JavaScript的综合能力，包含了变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等知识

先看此题的上半部分做了什么，

- 首先定义了一个叫Foo的函数，
- 之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，
- 之后为Foo的原型对象新创建了一个叫getName的匿名函数。
- 之后又通过函数变量表达式创建了一个getName的函数，
- 最后再声明一个叫getName函数。

**第一问：Foo.getName**

自然是访问Foo函数上存储的静态属性，答案自然是2,一般来说第一问对于稍微懂JS基础的同学来说应该是没问题的

```js
// 回顾下基础知识
function User(name) {
	var name = name; //私有属性
	this.name = name; //公有属性
	function getName() { //私有方法
		return name;
	}
}
User.prototype.getName = function() { //公有方法
	return this.name;
}
User.name = 'yideng'; //静态属性
User.getName = function() { //静态方法
	return this.name;
}
var yideng = new User('yideng'); //实例化
```

几个注意点：

- 调用公有方法，公有属性，我们必需先实例化对象，也就是用new操作符实化对象，就可构造函数实例化对象的方法和属性，并且公有方法是不能调用私有方法和静态方法的
- 静态方法和静态属性就是我们无需实例化就可以调用
- 而对象的私有方法和属性,外部是不可以访问的

**第二问:getName();**

直接调用getName函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以这里应该直接把关注点放在4和5上,跟1 2 3都没什么关系。

那这里是输出4还是5呢？-----------互动

这里就有两个坑了

- 一是变量声明提升

  - JavaScript 解释器中存在一种变量声明被提升的机制，也就是说函数声明会被提升到作用域的最前面，即使写代码的时候是写在最后面，也还是会被提升至最前面。

- 二是函数表达式和函数声明的区别

  - 函数声明在JS解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用。

- ```js
  // 直观的例子
  getName();// 函数声明
  var getName = function(){
    console.log('函数表达式')
  }
  getName();// 函数表达式
  function getName(){
    console.log('函数声明');
  }
  getName(); // 函数表达式
  ```

- 所以第二问的答案就是4，5的函数声明被4的函数表达式覆盖了

**第三问：Foo().getName()**

先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数

Foo函数的第一句`getName = function () { console.log(1); };`是一句函数赋值语句，注意它没有var声明，

所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的console.log(4)函数，将此变量的值赋值为`function(){console.log(1)}`。

此处实际上是将外层作用域内的getName函数修改了。

> 注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量。

之后Foo函数的返回值是this,this的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this指向window对象。

所以Foo函数返回的是window对象，相当于执行`window.getName()`，而window中的getName已经被修改为alert(1)，所以最终会输出1

此处考察了两个知识点，一个是变量作用域问题，一个是this指向问题

关于this，this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象

所以第三问中实际上就是window在调用**Foo()**函数，所以this的指向是window

**第四问：getName()**

直接调用getName函数，相当于`window.getName()`，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1，也就是说Foo执行后把全局的getName函数给重写了一次，所以结果就是Foo()执行重写的那个getName函数

**第五问：new Foo.getName()**

此处考察的是JS的运算符优先级问题

MDN运算符优先级：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

这题首先看优先级的第18和第17都出现关于new的优先级，new (带参数列表)比new (无参数列表)高比函数调用高，跟成员访问同级

```js
new Foo.getName();的优先级是这样的
相当于是:
new (Foo.getName)();

// 点的优先级(18)比new无参数列表(17)优先级高
// 当点运算完后又因为有个括号()，此时就是变成new有参数列表(18)，所以直接执行new，当然也可能有朋友会有疑问为什么遇到()不函数调用再new呢，那是因为函数调用(17)比new有参数列表(18)优先级低

.成员访问(18)->new有参数列表(18)
所以这里实际上将getName函数作为了构造函数来执行，遂弹出2。
```

**第六问：(new Foo()).getName()**

这一题比上一题的唯一区别就是在Foo那里多出了一个括号，这个有括号跟没括号我们在第五问的时候也看出来优先级是有区别的

```js
1.与第四问的区别就是有括号无括号，这里带括号是new 有参数列表，new 有参数列表的优先级是18，点的优先级也是18，优先级相同按从左到右的顺序执行。
	2.所以这里是先执行有参数列表，再执行点的优先级，最后再函数调用
	3.这里涉及到一个知识点，fn作为构造函数有返回值，在JS中构造函数可以有返回值也可以没有
		a.没有返回值，返回实例化的对象
		b.有返回值，检查其返回值是否为引用类型。
			非引用类型，如基本类型（String,Number,Boolean,Null,Undefined）则与无返回值相同，实际返回其实例化对象。
			引用类型，实际返回值为这个引用类型
	4.这里fn函数返回的是this,this在构造函数中本来就代表当前实例化对象，最终fn函数返回实例化对象。最终调用，实例化对象的getValue函数，因为在Foo构造函数中没有为实例化对象添加任何属性，当前对象的原型对象(prototype)中寻找getName函数。所以输出3。	
```

**第七问：new new Foo().getName();**

还有优先级的问题，到这里其实答案已经不重要了，关键是否真的知道面试官在考察我们什么。

```js
最终就是
new ((new Foo()).getName)();
new有参数列表(18)->new有参数列表(18)
先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new，所以最终结果为3
```

### 原型

```js
function yideng(){}
const a = {}, b = Object.prototype;
console.log(a.prototype === b);
console.log(Object.getPrototypeOf(a) === b);
console.log(yideng.prototype === Object.getPrototypeOf(yideng));
// 写出执行结果，并解释为什么？
// 答案
false true false

//解析：

1）a.prototype === b  =>false
prototype属性是只有函数才特有的属性，当你创建一个函数时，js会自动为这个函数加上prototype属性，值是一个空对象。而实例对象是没有prototype属性的。所以a.prototype是undefined,第一个结果为false。

2）Object.getPrototypeOf(a) === b =>true
首先要明确对象和构造函数的关系，对象在创建的时候，其__proto__会指向其构造函数的prototype属性
Object实际上是一个构造函数（typeof Object的结果为"function"）,使用字面量创建对象和new Object创建对象是一样的，所以a.__proto__也就是Object.prototype，所以Object.getPrototypeOf(a)与a.__proto__是一样的，第二个结果为true

3）yideng.prototype === Object.getPrototypeOf(yideng) =>false
关键点：f.prototype和Object.getPrototypeOf(f)说的不是一回事

①f.prototype 是使用使用 new 创建的 f 实例的原型:
f.prototype === Object.getPrototypeOf(new f()); // true

②Object.getPrototypeOf(f)是 f 函数的原型:
Object.getPrototypeOf(f) === Function.prototype; //true

所以答案是 false

//知识点
__proto__（隐式原型）与prototype（显式原型）
1）是什么？
①显式原型 explicit prototype property：
每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象。(需要注意的是，通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性)
②隐式原型 implicit prototype link：
JavaScript中任意对象都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__来访问。ES5中有了对于这个内置属性标准的Get方法Object.getPrototypeOf()。(注意：Object.prototype 这个对象是个例外，它的__proto__值为null)
③二者的关系：
隐式原型指向创建这个对象的函数(constructor)的prototype

2）作用是什么？
①显式原型的作用：用来实现基于原型的继承与属性的共享。
②隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着__proto__依次查找。

3）__proto__的指向：
__proto__的指向到底如何判断呢？根据ECMA定义 'to the value of its constructor’s "prototype" ' ----指向创建这个对象的函数的显式原型。
所以关键的点在于找到创建这个对象的构造函数，接下来就来看一下JS中对象被创建的方式，一眼看过去似乎有三种方式：（1）对象字面量的方式 （2）new 的方式 （3）ES5中的Object.create()。
但是本质上只有一种方式，也就是通过new来创建。为什么这么说呢，首先字面量的方式是一种为了开发人员更方便创建对象的一个语法糖，本质就是 var o = new Object(); o.xx = xx;o.yy=yy; 
```

### 加载页面和渲染过程

回答问题的时候，关键要抓住核心的要点，把要点说全面，然后再稍微加一些解析，要简明扼要，思路清晰，不能拖沓。

**面试题目：浏览器从加载到渲染页面的过程**

- 首先回答加载的流程，回答要点
  - 浏览器根据 DNS 服务器得到域名的 IP 地址
  - 向这个 IP 的机器发送 HTTP 请求
  - 服务器收到、处理并返回 HTTP 请求
  - 浏览器得到返回内容
- 稍加分析
  - 例如在浏览器输入https//yidengxuetang.com的时候，首先经过 DNS 解析，yidengxuetang.com对应的 IP 是101.200.185.250,然后浏览器向该 IP 发送 HTTP 请求。
  - server 端接收到 HTTP 请求，然后经过计算（向不同的用户推送不同的内容），返回 HTTP 请求，返回的内容其实就是一堆 HMTL 格式的字符串，因为只有 HTML 格式浏览器才能正确解析，这是 W3C 标准的要求。
- 接下来就是渲染过程了，回答要点
  - 根据 HTML 结构生成 DOM 树
  - 根据 CSS 生成 CSSOM
  - 将 DOM 和 CSSOM 整合形成 RenderTree
  - 根据 RenderTree 开始渲染和展示
  - 遇到`<script>`时，会执行并阻塞渲染
- 加以分析
  - 浏览器已经拿到了 server 端返回的 HTML 内容，开始解析并渲染。最初拿到的内容就是一堆字符串，必须先结构化成计算机擅长处理的基本数据结构，因此要把 HTML 字符串转化成 DOM 树 —— 树是最基本的数据结构之一。
  - 解析过程中，如果遇到`<link href="...">`和`<script src="...">`这种外链加载 CSS 和 JS 的标签，浏览器会异步下载，下载过程和上文中下载 HTML 的流程一样。只不过，这里下载下来的字符串是 CSS 或者 JS 格式的。
  - 浏览器将 CSS 生成 CSSOM，再将 DOM 和 CSSOM 整合成 RenderTree ，然后针对 RenderTree 即可进行渲染了。大家可以想一下，有 DOM 结构、有样式，此时就能满足渲染的条件了。另外，这里也可以解释一个问题 —— **为何要将 CSS 放在 HTML 头部？**—— 这样会让浏览器尽早拿到 CSS 尽早生成 CSSOM，然后在解析 HTML 之后可一次性生成最终的 RenderTree，渲染一次即可。如果 CSS 放在 HTML 底部，会出现渲染卡顿的情况，影响性能和体验。
  - 最后，渲染过程中，如果遇到`<script>`就停止渲染，执行 JS 代码。因为浏览器渲染和 JS 执行共用一个线程，而且这里必须是单线程操作，多线程会产生渲染 DOM 冲突。待`<script>`内容执行完之后，浏览器继续渲染。最后再思考一个问题 —— **为何要将 JS 放在 HTML 底部？**—— JS 放在底部可以保证让浏览器优先渲染完现有的 HTML 内容，让用户先看到内容，体验好。另外，JS 执行如果涉及 DOM 操作，得等待 DOM 解析完成才行，JS 放在底部执行时，HTML 肯定都解析成了 DOM 结构。JS 如果放在 HTML 顶部，JS 执行的时候 HTML 还没来得及转换为 DOM 结构，可能会报错。

### 性能优化

性能优化的题目也是面试常考的，这类题目有很大的扩展性，能够扩展出来很多小细节，而且对个人的技术视野和业务能力有很大的挑战。

- 优化原则是以更好的用户体验为标准的，目标就是

  - 多使用内存、缓存或者其他方法
  - 减少 CPU 和GPU 计算，更快展现

- 优化方向

  - **减少页面体积，提升网络加载**

    - 静态资源的压缩合并（JS 代码压缩合并、CSS 代码压缩合并、雪碧图）
    - 静态资源缓存（资源名称加 MD5 戳）
    - 使用 CDN 让资源加载更快

  - **优化页面渲染**

    - CSS 放前面，JS 放后面

    - 懒加载（图片懒加载、下拉加载更多）

    - 减少DOM 查询，对 DOM 查询做缓存

    - 减少DOM 操作，多个操作尽量合并在一起执行（`DocumentFragment`）

    - 事件节流

    - 尽早执行操作（`DOMContentLoaded`）

      - ```js
        window.addEventListener('load', function () {
            // 页面的全部资源加载完才会执行，包括图片、视频等
        })
        document.addEventListener('DOMContentLoaded', function () {
            // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
        })
        ```

      - 

    - 使用 SSR 后端渲染，数据直接输出到 HTML 中，减少浏览器使用 JS 模板渲染页面 HTML 的时间

### 安全

### XSS

面试题：什么是xss攻击

`XSS` 全称是 `Cross Site Scripting`(即`跨站脚本`)，为了和 CSS 区分，故叫它`XSS`。XSS 攻击是指浏览器中执行恶意脚本(无论是跨域还是同域)，从而拿到用户的信息并进行操作。

这些操作一般可以完成下面这些事情:

1. 窃取`Cookie`。
2. 监听用户行为，比如输入账号密码后直接发送到黑客服务器。
3. 修改 DOM 伪造登录表单。
4. 在页面中生成浮窗广告。

通常情况，XSS 攻击的实现有三种方式——**存储型**、**反射型**和**文档型**。原理都比较简单，我们来了解下

- #### 存储型


`存储型`，顾名思义就是将恶意脚本存储了起来，确实，存储型的 XSS 将脚本存储到了服务端的数据库，然后在客户端执行这些脚本，从而达到攻击的效果。

常见的场景是留言评论区提交一段脚本代码，如果前后端没有做好转义的工作，那评论内容存到了数据库，在页面渲染过程中`直接执行`, 相当于执行一段未知逻辑的 JS 代码，是非常恐怖的。这就是存储型的 XSS 攻击。

- #### 反射型


`反射型XSS`指的是恶意脚本作为**网络请求的一部分**。

比如我输入:

```
http://yideng.com?q=<script>alert("你完蛋了")</script>
复制代码
```

这杨，在服务器端会拿到`q`参数,然后将内容返回给浏览器端，浏览器将这些内容作为HTML的一部分解析，发现是一个脚本，直接执行，这样就被攻击了。

之所以叫它`反射型`, 是因为恶意脚本是通过作为网络请求的参数，经过服务器，然后再反射到HTML文档中，执行解析。和`存储型`不一样的是，服务器并不会存储这些恶意脚本。

- #### 文档型


文档型的 XSS 攻击并不会经过服务端，而是作为中间人的角色，在数据传输过程劫持到网络数据包，然后**修改里面的 html 文档**！

这样的劫持方式包括`WIFI路由器劫持`或者`本地恶意软件`等。

### 防范措施

明白了三种`XSS`攻击的原理，我们能发现一个共同点: 都是让恶意脚本直接能在浏览器中执行。

那么要防范它，就是要避免这些脚本代码的执行。

为了完成这一点，必须做到

千万不要相信任何用户的输入！

无论是在前端和服务端，都要对用户的输入进行**转码**或者**过滤**。

如:

```
<script>alert('你完蛋了')</script>
复制代码
```

转码后变为:

```
&lt;script&gt;alert(&#39;你完蛋了&#39;)&lt;/script&gt;
复制代码
```

这样的代码在 html 解析的过程中是无法执行的。

当然也可以利用关键词过滤的方式，将 script 标签给删除。那么现在的内容只剩下:

#### 利用 HttpOnly

很多 XSS 攻击脚本都是用来窃取Cookie, 而设置 Cookie 的 HttpOnly 属性后，JavaScript 便无法读取 Cookie 的值。这样也能很好的防范 XSS 攻击。

### CSRF

面试题：说一下CSRF攻击

### 什么是CSRF攻击？

CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户**目前的登录状态**发起跨站请求。

举个例子, 你在某个论坛点击了黑客精心挑选的小姐姐图片，你点击后，进入了一个新的页面。

那么恭喜你，被攻击了:）

你可能会比较好奇，怎么突然就被攻击了呢？接下来我们就来拆解一下当你点击了链接之后，黑客在背后做了哪些事情。

可能会做三样事情。列举如下：

#### 1. 自动发 GET 请求

黑客网页里面可能有一段这样的代码:

```
<img src="https://xxx.com/info?user=hhh&count=100">
```

进入页面后自动发送 get 请求，值得注意的是，这个请求会自动带上关于 xxx.com 的 cookie 信息(这里是假定你已经在 xxx.com 中登录过)。

假如服务器端没有相应的验证机制，它可能认为发请求的是一个正常的用户，因为携带了相应的 cookie，然后进行相应的各种操作，可以是转账汇款以及其他的恶意操作。

#### 2. 自动发 POST 请求

黑客可能自己填了一个表单，写了一段自动提交的脚本。

```
<form id='hacker-form' action="https://xxx.com/info" method="POST">
  <input type="hidden" name="user" value="hhh" />
  <input type="hidden" name="count" value="100" />
</form>
<script>document.getElementById('hacker-form').submit();</script>
复制代码
```

同样也会携带相应的用户 cookie 信息，让服务器误以为是一个正常的用户在操作，让各种恶意的操作变为可能。

#### 3. 诱导点击发送 GET 请求

在黑客的网站上，可能会放上一个链接，驱使你来点击:

```
<a href="https://xxx/info?user=hhh&count=100" taget="_blank">点击进入修仙世界</a>
```

点击后，自动发送 get 请求，接下来和`自动发 GET 请求`部分同理。

这就是`CSRF`攻击的原理。和`XSS`攻击对比，CSRF 攻击并不需要将恶意代码注入用户当前页面的`html`文档中，而是跳转到新的页面，利用服务器的**验证漏洞**和**用户之前的登录状态**来模拟用户进行操作。

### 防范措施

#### 1. 利用Cookie的SameSite属性

`CSRF攻击`中重要的一环就是自动发送目标站点下的 `Cookie`,然后就是这一份 Cookie 模拟了用户的身份。因此在`Cookie`上面下文章是防范的不二之选。

恰好，在 Cookie 当中有一个关键的字段，可以对请求中 Cookie 的携带作一些限制，这个字段就是`SameSite`。

`SameSite`可以设置为三个值，`Strict`、`Lax`和`None`。

**a.** 在`Strict`模式下，浏览器完全禁止第三方请求携带Cookie。比如请求`sanyuan.com`网站只能在`sanyuan.com`域名当中请求才能携带 Cookie，在其他网站请求都不能。

**b.** 在`Lax`模式，就宽松一点了，但是只能在 `get 方法提交表单`况或者`a 标签发送 get 请求`的情况下可以携带 Cookie，其他情况均不能。

**c.** 在`None`模式下，也就是默认模式，请求会自动携带上 Cookie。

#### 2. 验证来源站点

这就需要要用到请求头中的两个字段: **Origin**和**Referer**。

其中，**Origin**只包含域名信息，而**Referer**包含了`具体`的 URL 路径。

当然，这两者都是可以伪造的，通过 Ajax 中自定义请求头即可，安全性略差。

#### 3. CSRF Token

它的原理是怎样的呢？

首先，浏览器向服务器发送请求时，服务器生成一个字符串，将其植入到返回的页面中。

然后浏览器如果要发送请求，就必须带上这个字符串，然后服务器来验证是否合法，如果不合法则不予响应。这个字符串也就是`CSRF Token`，通常第三方站点无法拿到这个 token, 因此也就是被服务器给拒绝。

防范措施: `利用 Cookie 的 SameSite 属性`、`验证来源站点`和`CSRF Token`。

## 算法题

```js
/*
	给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
  有效字符串需满⾜：
 	 	1. 左括号必须⽤相同类型的右括号闭合。
  	2. 左括号必须以正确的顺序闭合。
  注意空字符串可被认为是有效字符串。
  示例1：
  	输⼊: "()"
  	输出: true
  示例2：
  	输⼊: "()[]{}"
  	输出: true
  示例 3:
  	输⼊: "(]"
  	输出: false
  示例 4:
  	输⼊: "([)]"
  	输出: false
  示例 5:
  	输⼊: "{[]}"
  	输出: true
*/

// 思路
出栈、入栈的思想
1）首先，我们通过上边的例子可以分析出什么样子括号匹配是复合物条件的，两种情况。
	①第一种（非嵌套情况）：{} [] ；
	②第二种（嵌套情况）：{ [ ( ) ] } 。
除去这两种情况都不是符合条件的。
2）然后，我们将这些括号自右向左看做栈结构，右侧是栈顶，左侧是栈尾。
3）如果编译器中的括号是左括号，我们就入栈（左括号不用检查匹配）；如果是右括号，就取出栈顶元素检查是否匹配。
4）如果匹配，就出栈。否则，就返回 false；

// 代码实现
var isValid = function(s){
  let stack = [];
  var obj = {
     "[": "]",
     "{": "}",
     "(": ")",
  };
  // 取出字符串中的括号
  for (var i = 0; i < s.length;i++){
    if(s[i] === "[" || s[i] === "{" || s[i] === "("){
      // 如果是左括号，就进栈
      stack.push(s[i]);
    }else{
   		var key = stack.pop();
      // 如果栈顶元素不相同，就返回false
      if(obj[key] !== s[i]){
        return false;
      }
    }
  }
  return stack.length ===  0
}
```

因此这就需要一个系统的训练，进行专项突破，按分类进行学习

比如按照经典的数据结构进行分类，刷题

- 常见的数据结构
  - 栈、队列、链表
  - 集合、字典、散列表
- 常见算法
  - 递归
  - 排序
  - 枚举
- 算法复杂度分析
- 算法思维
  - 分治
  - 贪心
  - 动态规划
- 高级数据结构
  - 树、图
  - 深度优先和广度优先搜索

## 框架相关

### Vue响应式原理介绍一下，Object.defineProperty 的缺陷，模板编译的过程，将模板解析为 AST，优化AST,将AST转换为render函数 等等。

### HOC是什么？相比mixins有什么优点

很多人看到高阶组件（HOC）这个概念就被吓到了，认为这东西很难，其实这东西概念真的很简单，我们先来看一个例子。

```js
function add(a, b) {
    return a + b
}
//现在如果我想给这个 add 函数添加一个输出结果的功能，那么你可能会考虑我直接使用 console.log 不就实现了么。说的没错，但是如果我们想做的更加优雅并且容易复用和扩展，我们可以这样去做：
function withLog (fn) {
    function wrapper(a, b) {
        const result = fn(a, b)
        console.log(result)
        return result
    }
    return wrapper
}
const withLogAdd = withLog(add)
withLogAdd(1, 2)
//其实这个做法在函数式编程里称之为高阶函数，大家都知道 React 的思想中是存在函数式编程的，高阶组件和高阶函数就是同一个东西。我们实现一个函数，传入一个组件，然后在函数内部再实现一个函数去扩展传入的组件，最后返回一个新的组件，这就是高阶组件的概念，作用就是为了更好的复用代码。
// 其实 HOC 和 Vue 中的 mixins 作用是一致的，并且在早期 React 也是使用 mixins 的方式。但是在使用 class 的方式创建组件以后，mixins 的方式就不能使用了，并且其实 mixins 也是存在一些问题的，比如：
隐含了一些依赖，比如我在组件中写了某个 state 并且在 mixin 中使用了，就这存在了一个依赖关系。万一下次别人要移除它，就得去 mixin 中查找依赖
多个 mixin 中可能存在相同命名的函数，同时代码组件中也不能出现相同命名的函数，否则就是重写了，其实我一直觉得命名真的是一件麻烦事。。
雪球效应，虽然我一个组件还是使用着同一个 mixin，但是一个 mixin 会被多个组件使用，可能会存在需求使得 mixin 修改原本的函数或者新增更多的函数，这样可能就会产生一个维护成本

HOC 解决了这些问题，并且它们达成的效果也是一致的，同时也更加的政治正确（毕竟更加函数式了）。
```

## 聊到具体的项目

一般在面试中，比如一面、二面基本会问到具体做过的项目，然后就是追问项目的细节。一般可能会出现这些问题

1. 发现你简历的一个项目，直接让你介绍下这个项目
2. 让你回忆下你做过的项目中，最值得分享（最大型/最困难/最能体现技术能力/最难忘）的
3. 如果让你设计 xx 系统/项目，你会怎么着手干

这类跟项目相关的综合性问题，既能体现候选人的技术水平、业务水平和架构能力，也能够辨别候选人是不是真的做过项目，还能够发现候选人的一些软技能。

### 如何进行应对

- 首先简历中的项目，肯定是你精挑细选的，不能随便选几个，要做好充分的准备，简历中的项目，既要体现技术难度，又要想好细节。一般介绍一个项目可以按几步来
- 介绍项目背景
  - 这个项目为什么做，当初大的环境背景是什么？还是为了解决一个什么问题而设立的项目？背景是很重要的，如果不了解背景，一上来就听一个结论性的项目，面试官可能对于项目的技术选型、技术难度会有理解偏差，甚至怀疑是否真的有过这样的项目。
  - 比如一上来就说：我们的项目采用了「backbone」来做框架，然后。。。而「backbone」已经是三四年前比较新鲜的技术，现在会有更好的选择方案，如果不介绍项目的时间背景，面试官肯定一脸懵逼。
- 承担角色
  - 项目涉及的人员角色有哪些，自己在其中扮演的角色是什么？
  - 这里候选往往人会自己给自己挖坑，比如把自己在项目中起到的作用夸大等。一般来说，面试官细节追问的时候，如果候选人能够把细节或者技术方案等讲明白、讲清楚，不管他是真的做过还是跟别人做过，或者自己认真思考过，都能体现候选人的技术水平和技术视野。前提还是在你能够兜得住的可控范围之内做适当的「美化」。
- 最终的结果和收益
  - 项目介绍过程中，应该介绍项目最终的结果和收益，比如项目最后经过多久的开发上线了，上线后的数据是怎样的，是否达到预期，还是带来了新的问题，遇见了问题自己后续又是怎样补救的。
- 非常重要的：项目的总结和反思
  - 有总结和反思，才会有进步。 项目做完了往往会有一些心得和体会，这时候应该跟面试官说出来。在梳理项目的总结和反思时，可以按照下面的列表来梳理：
    - 收获有哪些？
    - 是否有做得不足的地方，怎么改进？
    - 是否具有可迁移性？
  - 比如，之前详细介绍了某个项目，这个项目当时看来没有什么问题，但是现在有更好的解决方案了，候选人就应该在这里提出来：现在看来，这个项目还有 xx 的问题，我可以通过 xx 的方式来解决。
  - 再比如：做这个项目的时候，你做得比较出彩的地方，可以迁移到其他项目中直接使用，小到代码片段，大到解决方案，总会有你值得总结和梳理的地方。
  - 介绍完项目总结这部分，也可以引导面试官往自己擅长的领域思考。比如上面提到项目中的问题，可以往你擅长的方面引导，即使面试官没有问到，你也介绍到了。

按照上面的四段体介绍项目，会让面试官感觉候选人有清晰的思路，对整个项目也有理解和想法，还能够总结反思项目的收益和问题，可谓「一箭三雕」。

### 没有做过大型项目怎么办

对于刚刚找工作的应届生，或者面试官让你进行一个大型项目的设计，候选人可能没有类似的经验。这时候不要用「我不会、没做过」一句话就带过。

如果是实在没有项目可以说，那么可以提自己日常做的练手项目，或者看到一个解决方案的文章/书，提到的某个项目，抒发下自己的想法。

如果是对于面试官提出来需要你设计的项目/系统，可以按照下面几步思考：

- 有没有遇见过类似的项目
- 有没有读过类似解决方案的文章
- 项目能不能拆解，拆解过程中能不能发现自己做过的项目可以用
- 项目解决的问题是什么，这类问题有没有更好的解决方案

总之，切记不要一句「不知道、没做过」就放弃，每一次提问都是自己表现的机会。

### 项目细节和技术点的追问

介绍项目的过程中，面试官可能会追问技术细节，所以我们在准备面试的时候，应该尽量把技术细节梳理清楚，技术细节包括：

- 技术选型方案：当时做技术选型所面临的状况
- 技术解决方案：最终确定某种技术方案的原因，比如：选择用 Vue 而没有用 React 是为什么？
- 项目数据和收益
- 项目中最难的地方
- 遇见的坑：如使用某种框架遇见哪些坑

一般来说，做技术选型的时候需要考虑下面几个因素：

- 时代：现在比较火的技术是什么，为什么火起来，解决了什么问题，能否用到我的项目中？
- 团队：个人或者团队对某种技术的熟悉程度是怎样的，学习成本又是怎样的？
- 业务需求：需求是怎样的，能否套用现在的成熟解决方案/库来快速解决？
- 维护成本：一个解决方案的是否再能够 cover 住的范围之内？

在项目中遇见的数据和收益应该做好跟踪，保证数据的真实性和可信性。另外，遇见的坑可能是面试官问得比较多的，尤其现在比较火的一些技术（Vue、React、webpack），一般团队都在使用，所以一定要提前准备下

## 软技能问题回答

- 韧性：抗压能力，在一定项目压力下能够迎难而上，比如勇于主动承担和解决技术难题
- 责任心：对于自己做过的项目，能够出现 bug 之类主动解决
- 持续学习能力：IT 行业是个需要不断充电的行业，尤其 Web 前端这些年一直在巨变，所以持续学习能力很重要
- 团队合作能力：做项目不能个人英雄主义，应该融入团队，跟团队一起打仗
- 交流沟通能力：经常会遇见沟通需求和交互设计的工作，应该乐于沟通分享

### 回想下你遇见过最难打交道的同事，你是如何跟他沟通的

一般来说，工作中总会遇见一两个自己不喜欢的人，这种情况应该尽量避免冲突，从自己做起慢慢让对方感觉到自己的合作精神。

所以，遇见难打交道的同事，不要急于上报领导，应该自己主动多做一些事情，比如规划好工作安排，让他选择自己做的事情，有了结论记得发邮件确认下来，这样你们的领导和其他成员都会了解到工作的安排，在鞭笞对方的同时，也做到了职责明确。在项目当中，多主动检查项目进展，提前发现逾期的问题。

重点是突出：自己主动沟通解决问题的意识，而不是遇见问题就找领导。

### 当你被分配一个几乎不可能完成的任务时，你会怎么做

这种情况下，一般通过下面方式来解决：

1. 自己先查找资料，寻找解决方案，评估自己需要怎样的资源来完成，需要多长时间
2. 能不能借助周围同事来解决问题
3. 拿着分析结果跟上级反馈，寻求帮助或者资源

突出的软技能：分析和解决问题，沟通寻求帮助。

### 业余时间都做什么？除了写码之外还有什么爱好

这类问题也是面试官的高频问题，「一个人的业余时间决定了他的未来」，如果回答周末都在追剧打游戏之类的，未免显得太不上进。

一般来说，推荐下面的回答：

> 周末一般会有三种状态：
>
> 1. 和朋友一起去做做运动，也会聚会聊天，探讨下新技术之类的；
> 2. 也会看一些书籍充充电，比如我最近看的 xx，有什么的想法；
> 3. 有时候会闷在家用最近比较火的技术做个小项目或者实现个小功能之类的。

这样的回答，既能表现自己阳光善于社交沟通的一面，又能表现自己的上进心。

## 面试注意事项

### 提问环节

面试是一个双向选择的事情，所以面试后一般会有提问环节。在提问环节，候选人最好不要什么都不问，更不要只问薪水待遇、是否加班之类的问题。

其实这个时候可以反问面试官了解团队情况、团队做的业务、本职位具体做的工作、工作的规划，甚至一些数据（可能有些问题不会直面回答）。

还可以问一些关于公司培训机会和晋升机会之类的问题。如果是一些高端职位，则可以问一下：自己的 leader 想把这个职位安排给什么样的人，希望多久的时间内可以达到怎样的水平。

### 面试后的总结和思考

面试完了多总结自己哪里做得不好，哪里做得好，都记录下来，后续扬长避短



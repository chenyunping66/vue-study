// 控制台输出语法：console.log([val]); //在控制台输出内容

// == 用来进行比较的
console.log('AA' == NaN); //false
console.log(10 == NaN);  //false
console.log(NaN == NaN); //false

// 语法：isNaN([val])   //[val]参数占位符
console.log(isNaN(10)); //false  是有效数
console.log(isNaN('qq')); //true 不是有效数字
/* 
* Number('AA') =>NaN
* isNaN(NaN) => true
*/
console.log(isNaN('10')); //false  为啥是有效数字？
// 因为首先会验证检测的值是否为数字类型，如果不是有效数字，会用Numer()方法，把值转为数字类型，进行转换，再检测
/* 
* Number('10') => 10
* isNaN(10) =>false
*/

// ======================把其他数据类型转换为数字类型之 Number====================+++++++
//--------------------基本数据类型转为数字类型-------------------
//把字符串转换为数字类型，只要字符串中包含任意一个非有效数字（第一个点除外）,结果都是NaN,空字符串会变成数字零
console.log(Number('12.5')); //=>12
console.log(Number('12.5px')); //=>NaN
console.log(Number('12.5.5')); //=>NaN
console.log(Number('')); //=>0

//布尔转为数字类型：true为1，false为0
console.log(Number(true)); //1
console.log(Number(false)); //0
console.log(isNaN(false)); //=>false 因为 => Number(false) => isNaN(0) =>false

//null和undefined转为数字类型 ：null=>0   undefined =>NaN
console.log(Number(null)); //0  空对象指针
console.log(Number(undefined)); //NaN    未定义，相当于没有被赋值

//----------------------引用类型转为数字类型-----------------------------------------
//普通对象转为数字类型
console.log(Number({name:'99'})); //NaN
console.log(Number({})); //NaN
//{}/{xxx:'xxx'}.toString() => "[oject Object]"

// ({}).toString()  => "[object Object]"
// ({name:23}).toString() =>"[object Object]"
// 因为Object.rpototype.toString() 进行了一隐式的数据检测

//数组对象转为数字类型
console.log(Number([]));  //0
//[]/toString() => ""
console.log(Number([12])); //12
//[12].toString() => "12"
console.log(Number([12,23])); //NaN
// [12,23].toString => "12,23"

//正则转为数字类型全部为NaN

//总结：把引用数据类型转为数字，是先把它基于toString方法转换为字符串，然后再转换为数字

// ===============parseInt/parseFloat([val],[进制]) 也是转换为数字的方法===============================
let str = '12.5px';
console.log(Number(str)); //NaN
console.log(parseInt(str)); //=>12
console.log(parseFloat(str)); //=>12,5
console.log(parseFloat('width:12.5px')); //false

console.log(parseFloat(true)); //NaN
console.log(Number(true)); //1
//它跟Number走的处理机制不一样，Number走的是V8引擎最底层的机制，底层机制规定好的。
// 而parseInt/parseFloat不是，它们是浏览器额外提供的方法，处理字符串的，如果不是字符串，先转成字符串，再从左到右查找，因为它只能处理字符串

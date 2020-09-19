
// 知识点：
// JS中的9大数据类型和数据类型转换
// 数据类型分类：
//     基本数据类型(值类型/原始值类型) 【7】
//         Number string  boolean  unll  undefiend symbol(es6)  bigint(es6)
//     引用数据类型 【2】
//         object: 普通对象(Map)、实例对象、数组对象(Set)、正则对象、日期对象、（Math数字函数对象也是普通函数对象）、prototype原型对象...
//         function
// 检测数据类型：
//    typeof、instanceof、 constructor、  Object.prototype.toString.call([value])


// 数据类型转换的4大核心标准：
// 所有转换分为手动转换和隐式转换
// 一.把其他数据类型转换为Number类型
//     1.特定需要转换为Number的
//       -Number([val])
//       -parseInt/parseFloat([val])
//     2.隐式转换(浏览器内部默认要先转换为Number)
//       -isNaN([val])
//       -数学运算(特殊情况: +在出现字符串的情况下不是数学运算,是字符串拼接)
//       -在==比较的时候,有些值需要转换为数字再进行比较
//       -...
// 二、把其他数据类型转换为字符串
//     1.能使用的办法
//       -toString()
//       -String()
//     2.隐式转换(一般都是调用其toString)
//       -加号运算的时候，如果某一边出现字符串，则是字符串拼接
//       -把对象转换为数字，需要先toString()转换成字符串，再去转换成数字
//       -基于alert/confirm/prompt/document.write...这些方式输出的内容，都是先把内容转换成字符串，然后再输出的
//       -...
    
//   三、把其他数据类型转成布尔
//     1.基于以下方式可以把其他数据类型转换为布尔
//      -！转换成布尔值后取反
//      -！！转换为布尔类型
//      -Boolean([val])
//     2.隐式转换
//       -在循环或者条件判断中，条件处理的结果就是布尔类型值
//       -...

//   规则：只有“0、null、undefined、空字符串、NaN”五个值会变为false,其余的都是true

//   四、在==比较的过程中，数据转换的规则
//     [类型一样的几个特殊点]
//         {} == {}:false 对象比较的是堆内存中的地址
//         [] == []:false
//         NaN == NaN:false
//     [类型不一样的几个特殊点]
//       1.null== undefined:true,但是换成===结果是false(因为类型不一样)，剩下null/undefined和任何数据类型值都不相等
//       2.字符串==对象，要把对象转换成字符串
//       3.剩下的如果==两边数据类型不一致，都是需要转换成数字再进行比较


// 以上知识点举例子面试题：
//   四、在==比较的过程中，数据转换的规则
console.log([] == false); //true 对象和布尔比较 
// 对象 == 布尔 都转化为数字（隐式转换）
// 1.对象转换为数字：先toSting转换为字符串（应该是先基于valueOf获得原始值，没有原始值再去toString）,再转换为数字的
// [] => ''=> 0   Number([]) //0 =>①[].valeOf() //[]  => ②[].toSting() //"" =>③Number("") //0 
// 2.false => 0 ture => 1  //false转化为数字类型为0，true转换为数字为1
// 3.所以 0 = 0 //true
console.log(![] == false); //true
// js运算符优先级：两个等号优先级低于叹号！优先级
// 1. ![]（js表达式） 把数组转换为布尔类型再取反，只有5种类型(0,NaN,null,"",undefiend)变成ture, 其他false  //false
// 2.false == false
// 3.所以 false == false //ture

// 知识点2：把其他类型转化为字符串，一般都是直接""包起来，只有普通对象调取toString是调取的Object.prototype.toString,不是转为字符串，而是检测数据类型，返回的结果是"[object Object]"
// String(1)
// "1"
// String(true)
// "true"
// String(false)
// "false"
// String(null)
// "null"
// String(undefined)
// "undefined"
// String([])
// ""
// String({})
// "[object Object]"
// ({}).toString()
// "[object Object]"
// Object.prototype.toString()
// "[object Object]"

// 知识点3：把其他类型转换为数字 Number机制
console.log(Number('10')); //10
console.log(Number('10px')); //NaN 只要是出现的非有效数字字符结果都是NaN
console.log(Number(true)); //1
console.log(Number(false)); //0
console.log(Number(null));// 0
console.log(Number('')); //0
console.log(Number(undefined)); //NaN
console.log(Number(Symbol(10))); //报错
console.log(Number(BigInt(10))); //10 超大数字
// 对象变为数字，应该先valeOf,没有原始值，再toString变为字符串，最后把字符串转换为数字

// 知识点：parseInt机制：从字符串左侧第一个字符开始，查找有效数字字符，遇到非有效数字字符停止查找，不论后面是否还有数字字符，都不再找了。
//                      否则把找到的有效数字字符转换数字，如果一个都没有找到，结果就是NaN.
//       parseFloat比它多识别一个小数点
// 面试题：
parseInt("") //NaN 一个都没有找到 答错了
Number("") //0 
isNaN("") //false  //因为0是有效数字,isNaN检测不是有效数字   答错了
parseInt(null)  //NaN  //parseInt("null") => 没有找到有效字符 ，所以为NaN  答错了
Number(null) //0
isNaN(null) //false //先隐式转换转为数字，0是有效数字，所以NaN   答错了
parseInt("12px") //12 // 为什么  应该是找到了有效数字就讲他转为数字
Number("12px") //NaN  //只要遇到一个非有效数字就停止转换，而paseInt会从左边第一个开始找s，这是和parseInt的区别
isNaN("12px") //true  //隐式转换Number("12px")=》 NaN 所以不是有效数字
parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt("null")  //"2.6number"
// 加号运算符优先级是最低的
// 1.6 + 1 + "number"(typeof NaN  == "number" NaN是特殊的数字类型)  
// 2.6 + "number"
// JS中加号左右两边只要出现字符串（或者对象）都会变成字符串拼接（有特殊性）,如果出现对象也有可能变为字符串拼接，
// （因为原本把对象转为数字，但是对象转换数字需要先转换为字符串，则+遇到字符串直接变成字符串拼接1+[]）
//"2.6number"
isNaN(Number(!!Number(parseInt(0.8)))) //false
// parseInt(0.8) => 0
// Number(parseInt(0.8) =>Number(0) => 0
//!!0 => false 0转为boolean类型为false
//Number(false) => 0
// isNaN(0) -> false
typeof !parseInt(null) + !isNaN(null)  //booleantrue
//   规则：只有“0、null、undefined、空字符串、NaN”五个值会变为false,其余的都是true
// parseInt(null) //NaN =>  !NaN  // true  =>typeof(true) //"boolean"
// isNaN(null ) //0  => Number(0) => false => !false => true
// "boolean" + true => "booleantrue"

// 面试题2
let result = 10 + false + [] + 'Renct' + null + true + {};  //"10Renctnulltrue[object Object]"
// 10+false => 10+0 => 10 ??
//10 + undefined  => 10 + Number(undefined(非有效数字)) => 10 + NaN =>NaN  任何数字加上NaN都是NaN ？？
// NaN + [] => "NaN"
// "NaN" + 'Renct' => "NaNRenct"
// ...都是字符串拼接 ??
// "NaNRenctnulltrue[object object]"
console.log(result); // "NaNRenctnulltrue[object object]"

// 特殊性：+加号即使一边出现字符串或对象，也不一定是字符串拼接：++i/+i/i++这种情况是字符串数学运算
// +[]
// 0
// +10
// 10
let n = "10";
console.log(++n); //11
console.log(+n); //10

// 特殊情况2：
{}+0
// 0  
0+{}
// "0[object Object]" 这是数学运算
// 左边的认为是一个代码块，不参与运算
// 运算只处理的是+0 =>0
// function fn(){}+0  压缩
// 假如：
({}+0)
// "[object Object]0" 参与到数学运算中



// --------------------------------------------------------------------------------------------------------------------------


 // typeof： 检测出来的结果是字符串，字符串中包含了对应的数据类型
//  typeof ""
// "string"
// typeof "AA"
// "string"
// typeof true
// "boolean"
// typeof null  //typeof null 的结果是"object" 知识点：计算机遗留的bug,计算机存储的是二进制，所以二进制00开头是对象，1开头是整数，010是浮点数，
// "object" // 100是字符串，110是布尔，而null按照00开头，所以null打印对象，但是null并不是对象(object),而是因为存储值以000开头了
// 检测数据细分的类型，结果都是"object"
// typeof undefined
// "undefined"
// typeof Symbol
// "function"
// typeof Symbol()
// "symbol"
// typeof BigInt(10)
// "bigint"
// BigInt(10)
// 10n
// typeof {
// }
// "object"
// typeof []
// "object"
// typeof /^$/
// "object"
// typeof function(){}
// "function"

// 知识点：因为typeof null/{对象}/[数组]/正则 都是object , 所以typeof检测数据细分的类型（数组/对象/正则。。。），结果都是"object"

// 练习题
let a = typeof typeof typeof [12,23];
// 原因：typeof [12,23] => "object"
// typeof "object" => "string"
// ...
console.log(a)  //"string" 字符串，控制台为黑色说明是字符串类型


// ---------------------------------------------------------------------------------------------------------------------------

// 1.Symbol([value]); 创建唯一值
Symbol('A')
console.log(Symbol('A') === Symbol('A'));  //false
// Symbol这个值不能被new的，底层应用场景还是很多的

//2. BigInt 大数据值
//JS存在最大值和最小值
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991  max-safe-integer
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991
// 007199254740993 + 1
// 9007199254740992
// 9007199254740993n  //bigint类型的最大安全数 
// 9007199254740993n
// 9007199254740993n +1
// VM147:1 Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
//     at <anonymous>:1:19
// (anonymous) @ VM147:1
// typeof 9007199254740993n
// "bigint"

// 数字类型中比较奇怪的值：
//知识点1. NaN(not a number)不是一个数字, 不是有效数字，但是属于Number类型的
console.log(typeof NaN); //"number"  字符串number，虽然是奇怪值，但是属于number
console.log(NaN === NaN); //false   除了是一个数字之外，可以是任何东西
// 知识点2. 想检测一个值是否为有效数字，用isNaN来做对比
console.log(isNaN(10)); //false  因为它是有效数字，所以打印false. isNaN用来检测这个数字是否是有效数字
console.log(isNaN('AA')); //ture 因为在检测的时候。如果当前这个值不是数字类型，先进行隐藏式转换，转成数字类型（Number）,然后再检测是否为非有效数字，所以结果为true
// Object.is(NaN,NaN)   //检测是否是NaN
// true
// Object.is(10,10)   //is这个方法用来检测两个值是否相等
// true
// Object.is(10,'10')
// false
// 知识点3：Infinity为无穷大的值
console.log(Infinity)

let res = parseFloat('left:200px'); //NaN
// console.log(parseFloat('left:200px'));  // NaN 会进行隐式类型转换
if (res === 200) {
  alert(200);
} else if (res === NaN) {   //NaN === NaN  false
  alert(NaN);
} else if (typeof res === 'number') {  //NaN是字符串number  所以相等 'number' === 'number'
  alert('number');  //"number" alert输出的结果都会转换为字符串number
} else {
  alert('Invalid Number');
}


// ----------------------------------------------深度剖析parseInt()----------------------------------------------------

// 课后思考题：
let arr = [10.8,0,10,25,23];
arr = arr.map(parseInt);
console.log(arr);  //[10, NaN, 2, 2, 11]

// ------------------------------------解题---------------------------------------------------------------------------------
arr = arr.map((item,index) => {
  // 循环遍历数组中的某一项就会触发回调函数
  // 每一次还会传递当前项和当前项目的索引
})
// 循环5次
parseInt('10.18',0(10))  //10
// 从字符串左侧第一个开始查找，找到符合[radix]进制的值（遇到一个不合法的，则停止查找），把找到的值变成数字，再按照[radix]转换为十进制的规则处理
// '10' => 10
parseInt('0',1) //39  =》NaN
parseInt('10',2)  //0
// 10 把它看作二进制，最后转换成10进制
// 1*2^1 + 0*2^0 = 》 2+0 =》 2
parseInt('25',3) //35
//  0 1 2 符合3进制，5不符合规则，则停止查找
// 2 当作3进制转换为10进制
// 2*3^0 => 2*1 =》 2
parseInt('23',4) 
// 0，1，2，3符合4进制
// 23 当作4进制转为10进制
// 2*4^1 3*4^0 =》 2*4 + 3*1 =》8+3 =》11

// ==============================================parseInt()规则===========================================================

parseInt([value],[radix])
// =>[radix] 这个值是一个进制，不写或者写都默认按照10进制处理（特殊情况，如果value是以0x开发，则默认值不是10进制，而是16进制）
// =>进制有一个取值的范围，2~36之间，如果不在这之间，整个程序运行的结果一定是NaN
// =>把[value]转换为[radix]进制，最后把[radix]进制转化为十进制

// =======================================================================================================

// 把一个值转化为十进制怎么算
// 147 （八进制） =》 十进制
//  1  4   7 [位权值，每一位的权重，个位是0，十位是1...]
// 1*8^2 + 4*8^1 + 7*8^0

// 12.23(四进制) =》十进制
// 1*4^1 2*4^0 2*4^-1 2*4^-2

// parseInt(26,2) //NaN

// 4^0=1 4的零次幂是1
// 4^-1=1/4  4的负一次幂是1/4
//4^-2=1/(4*4)  //1/4^2
let a = 12;
console.log(a.toString()); //'12'
console.log((NaN).toString()); //'NaN '((NaN))表达式写法

//null和undefined是禁止直接toString()的
// (null).toString(); //报错 Uncaught TypeError: Cannot read property 'toString' of null
//但是和undefined一样转换为字符串的结果是'null'/'undefined'

({name:"xxx"}.toString())  //"[object Object]"
// 普通对象.toString()的结果是"[object Object]"  =>Object.prototype.toString()方法不是转换为字符串的，而是用来检测数据类型的

// ==================字符串拼接======================
console.log('10' + 10);  //1010
// 四则运算法则中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接
//（一旦遇到字符串，则不是数学运算，而是字符串拼接）
console.log('10' - 10); //=>0
console.log('10px' - 10); //NaN

// 面试题：
let aa = 10 + null + true + [] + undefined + '学习' + null + [] + 10 +false;
/* 
* 10 +null => 10 +0 => 10 
*10 + true => 10 +1 => 11
*11 + [] => 11 + '' => '11' 空数组变成数字，先要经历变为空字符串，遇到字符串（还没有来得及转为数字类型），啥也别想了直接变为字符串拼接
*'11' + undefined => '11undefined'
*....
* '11undefined学习null10false'   //空数组遇到空字符串还是空字符串   比如：([]+""+10)  //"10"
*/
console.log(aa); // "11undefined学习null10false"

let ab = 10 + null + true + [12] + undefined + '学习' + null + [] + 10 +false;
console.log(ab); //'1112undefined学习null10false'

/* 
* 基于typeof检测出来的结果
*   1.首先是一个字符串
*  2.字符串包含对应的类型
*/
console.log(typeof 1); //"number"  返回的结果是字符串number
let a = NaN;
console.log(typeof a);    ///控制台输出的蓝色是是字符串，黑色是数字
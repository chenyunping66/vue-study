/* 
* 基于typeof检测出来的结果
*   1.首先是一个字符串
*  2.字符串包含对应的类型
*
*局限性：
*   1. typeof null => "object" 但是null并不是对象
*   2. 基于typeof无法细分出当前值是普通对象还是数组对象等数据类型，返回的结果是“object”
*/
console.log(typeof 1); //"number"  返回的结果是字符串number
let a = NaN;
console.log(typeof a);    ///控制台输出的蓝色是数字，黑色是字符串

//面试题
console.log(typeof typeof typeof []); //"object"
// 第一步先算这个 typeof [] => "object"
// 第二步算这个 => typeof "object" => "string"
//因为typeof检测的结果是字符串（ "string"），所以只要两个及以上同时检测，最后结果必然是“string”



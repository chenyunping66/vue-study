// ================================================================= concat: 实现数组拼接
/* 
*  concat: 实现数组拼接
*  @params
*     多个任意类型值
* @return
*    拼接后的新数组（原来后的数组不会变）
*
*/
let ary1 = [10,20,30];
let ary2 = [40,44,20,50];
let res = ary1.concat('学习')
console.log(res);  // [10, 20, 30, "学习"]

let ary1 = [10,20,30];
let res = ary1.concat()
console.log(res);  // [10, 20, 30, "学习"]
console.log(res=== ary1)  //false

let ary1 = [10,20,30];
let ary2 = [40,44,20,50];
let res = ary1.concat('学习',ary2)
console.log(res);  // [10, 20, 30, "学习", 40, 44, 20, 50]

// ================================================================= toString(): 把数组转换为字符串
/* 
*  toString(): 把数组转换为字符串
*  @params
* @return
*   转换后的字符串,每一项用逗号分隔（原来的数组不变）
*
*/
let ary1 = [10,20,30];
let res = ary1.toString()
console.log(res);  //"10,20,30"
console.log([].toString()); // ""
console.log([12].toString()); //"12"

// ================================================================= join(): 把数组转换为字符串
/* 
*  join(): 把数组转换为字符串
*  @params
*    指定的分隔符（字符串格式）(默认没有写分隔符的话，还是逗号)
* @return
*   转换后的字符串,每一项用逗号分隔（原来的数组不变）
*
*/
let ary1 = [10,20,30];
let res = ary1.join()
console.log(res);  //"10,20,30"

let ary1 = [10,20,30];
let res = ary1.join('')
console.log(res);  //"102030"

let ary1 = [10,20,30];
let res = ary1.join('|')
console.log(res);  //"10|20|30"


let ary1 = [10,20,30];
let res = ary1.join('+')
console.log(res);  //"10+20+30"
console.log(eval(res));  //60  eval把字符串变成JS表达式执行


// ================================================================= indexOf/lastIndexOf/includes: 检测数组中是否包含某一项
/* 
*  indexOf/lastIndexOf: 检测当前项在数组中第一次或者最后一次出现位置的索引值（在IE6~8不兼容）
*  @params
*    要检索的这一项内容
* @return
*   这一项出现的位置索引值（数字），如果数组中没有这一项，返回结果都是-1
* 原来数组不变
*/
let ary1 = [10,20,30,10,20,30];
console.log(ary1.indexOf(20));  //1
console.log(ary1.lastIndexOf(20));  //4

// 也可以使用es6新提供的inclueds方法判断
console.log(ary1.includes(10));  //true

// 想验证ary中是否包含'10'
if(ary1.indexOf('10') === -1) {
  // 不包含
}

if(ary.includes('学习')){
  // 包含：如果存在返回的是true 
}


 

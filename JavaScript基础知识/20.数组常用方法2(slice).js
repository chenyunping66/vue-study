
// +++++++++++++++++++++++++++++++++ 数组常用方法2（slice）: 数组的查询和拼接*(原来的数组不会变)
/* 
*  slice
*    slice: 实现数组的查询
*    @params  
*       n,m 都是数字，从索引n开始，找到索引为m的地方（不包含m这一项）
*    @return 
*      把找到的内容以一个新数组的形式返回
*/
let ary = [10,20,30];
let res =ary.slice(0,1); 
console.log(res,ary);  //[10, 20]  [10, 20, 30]

// m不写是找到末尾
res =ary.slice(1); 
console.log(res,ary);  // [20, 30] 

// 数组的克隆，参数0不写也可以
res =ary.slice(0); 
console.log(res,ary);  // [10, 20, 30]
// ===================================================================================================
// 思考题：
// 1.如果n和为负数会咋地
let ary = [10,20,30,99,88,56];
res =ary.slice(-1,4); 
console.log(res);  // []  //任意一个或者全部为负数都空数组
// 2.如果n>m会咋地
let ary = [10,20,30,99,88,56];
res =ary.slice(4,1); 
console.log(res);  // []  n>m都为空数组
// 3.如果是小数会咋地？
let ary = [10,20,30,99,88,56];
res =ary.slice(0.9,0.6); 
console.log(res);  // 如果都为小数或者n为小数都返回空数组，如果m不为小数，就返回从索引0开始，找到索引为m的地方（不包含m这一项）
// 4. 如果是非有效数字会咋地？
undefined
let ary = [10,20,30,99,88,56];
res =ary.slice(NaN,true); 
console.log(res);  //  [10,length: 1]

let ary = [10,20,30,99,88,56];
res =ary.slice(NaN,NaN); 
console.log(res);  // []

//  5. 如果m或者n的值最大索引都会咋?
let ary = [10,20,30,99,88,56];
res =ary.slice(5,5); 
console.log(res); // []

let ary = [10,20,30,99,88,56];
res =ary.slice(1,5); 
console.log(res);  //[20, 30, 99, 88]

let ary = [10,20,30,99,88,56];
res =ary.slice(5,3); 
console.log(res);  // []
//  这种方式叫做浅克隆，可以回去先看看实现深克隆如何让处理

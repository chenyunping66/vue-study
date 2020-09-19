/* 
*笔记：
*  Math
*    数学函数：但是它不是一个函数，它是一个对象，对象中存储了很多操作数字的属性方法，因此被称为数学函数
*
* Math中常用的属性和各种方法：
* 1.Math.abs([number value])  // 获取绝对值（绝对值永远是正数或者零）
* 2.Math.ceil/floor([number value]) // 把一个数向上取整/向下取整
* 3.Math.round()  //四舍五入
* 4.Math.max/min([val],[val2]...)  //获取一堆数中的最大值/最小值
* 5. Math.sqrt/pow()  //sqrt: 给一个数开平方  pow:计算一个数的多少次幂
* 6.Math.random() // 获取0~1之间的随机小数
*/
console.log(typeof Math);  // object 
console.dir(Math);  //dir输出详情， 遇到某个方法不会就去MDN查看用法
/* 
*  Math = {
  PI: 3.141592653589793  //圆周率
  abs: ƒunction(){[native code]} //源代码里面的一些东西，不匀速我们看  //输出绝对值
  ceil:ƒunction(){[native code]}
  ...
}
*
* Math.abs();  //abs是一个方法所以可以加小括号执行
* Math.PI  //是一个属性之间点就可以了
*/

// * ========================1.Math.abs([number value])  // 获取绝对值（绝对值永远是正数或者零）====================================

console.log(Math.abs(-12,5)); //12
console.log(Math.abs(0)); //0
// 传递的不是有效类型的值:先基于Number()转换为数字再进行处理
console.log(Math.abs('-1'))  //1 
console.log(Math.abs('-1px'))  //NaN
console.log(Math.abs(true))  //1 

// *===================== 2.Math.ceil/floor([number value]) // 把一个数向上取整/向下取整 =======================================================
//向上取整（一定要比之前的大）
console.log(Math.ceil(12)); //12
console.log(Math.ceil(12.9)); //13
console.log(Math.ceil(-12.1)); //-12
console.log(Math.ceil(-12.9)); //-12

// 向下取整（比之前的小）
console.log(Math.floor(12)); //12
console.log(Math.floor(12.9)); //12
console.log(Math.floor(-12.1)); //-13
console.log(Math.floor(-12.9)); //-13

// * ===============================3.Math.round()  //四舍五入  =================================
console.log(Math.round(12));  //12
console.log(Math.round(12.1)); //12
console.log(Math.round(12.5)); //13 正数中.5属于入
console.log(Math.round(12.9));//13 
console.log(Math.round(-12.1)); // -12
console.log(Math.round(-12.5)); //-12  负数中.5要舍
console.log(Math.round(-12.9)); //-13
// 负数里面.5是舍，正数.5是进

// * ============================== 4.Math.max/min([val],[val2]...)  //获取一堆数中的最大值/最小值================
console.log(Math.max(12,5,6,7,23,56,78));  //78
console.log(Math.min(83,5,6,222,555,6,0));  //0
// 思考题：如何基于Math.max/min获取数组中的最大值最小值？
console.log(Math.max([83,5,6,222,555,6,0]));  //NaN 传递的值不能是数组，此处只传递一个值，是个数组和内置的语法要求不符合

// * ===============================  5. Math.sqrt/pow()  //sqrt: 给一个数开平方  pow:计算一个数的多少次幂 ==================
console.log(Math.sqrt(18)); // 4.242640687119285 开平方，两个数字相乘
console.log(Math.sqrt(9)); //3 符合N*N = M ,这样的M才能够整开平方
console.log(Math.sqrt(-9)); //NaN 负数不能开平方
console.log(Math.pow(2,10)); //1024  2的十次幂是1024  10.24是程序员节日


// * =============================== 6.Math.random() // 获取0~1之间的随机小数 =================================
// 小数点后面二十多位的也有
for(let i = 1;i<=10;i++){
  console.log(Math.random())
}
/* 
* 0.9905912890493045
* 0.6082040052995996
* 0.5374189539295391
* 0.4895400327904993
* 0.4618108882558578
* 0.366072814383563
* 0.4641970830748843
* 0.4530270512239911
* 0.7726623718067103
* 0.9757887497429927
*/

// 扩展：获取[n-m]之间的随机整数
// 包含n也包含m,n<m
// 获取[1-10]之间的随机小数
//把一个效数编程正数有三种方法： 向上向下取整，四舍五入
Math.round(Math.random()*(10-1)+1);  //公式： 0-1 *9(0-9 + 1 (1-10))
// 公式：Math.round(Math.random()*(m-n)+n)

// 获取30-25之间的随机正数
for(let i=1;i<=10;i++){
  let ran =Math.round(Math.random()*(30-25)+25);
  console.log(ran);
}
/* 
* 28
* 26
* 28
* 30
*3 28
* 26
* 29
* 28
* 26
*/
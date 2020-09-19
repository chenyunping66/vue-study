/* 
* 任意数求和：
*     1.传递实参的个数不定
*     2.传递的值是否为有效数字不定
* => 把传递的有效数字进行相加求和
*
*  arguments:函数内置的实参集合
*       1.类数组集合，集合中存储着所有函数执行时，传递的实参信息
*       2.不论是否设置形参，arguments都存在
*       3.不论是否传递实参，arguments也都存在
* arguments.callee:存储的是当前函数本身（一般不用的，JS严格模式下禁止使用这些属性）
*
*/
function sum() { 
    // console.log(arguments);  //类数组
    // console.log(arguments.length)
    let total = null;
    for(let i = 0;i<arguments.length;i++){
      // 获取的每一项的结果都要先转换为数字，因为我们要先转换为数字（数学运算）
      let item = Number(arguments[i]);  //基于循环i存的索引，获取到集合中的每一项
      // 但是不一定是有效数字，所以需要判断非有效数字不加
      if(isNaN(item)){
        continue; //不再执行这一轮代码，继续执行下一轮循环
      }
      total += item; //在原始值上不停的进行累加
    }
    return total;  //函数执行会形成一个私有的栈，所以需要return出来，外面才可以拿到
}
let total = sum(10,20,30,40);
console.log(total);

total = sum(10,20);
console.log(total);

total = sum(10,20,'30');
console.log(total);

total = sum(10,'AA');
console.log(total);

total = sum(10,20,undefined);
console.log(total);

total = sum(10,20,null);
console.log(total);
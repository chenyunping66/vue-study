// 6.遍历数组中的每一项方法
// forEach /map / fiflter/ find / reduce / some / every ....

// ====================== forEach遍历数组中的每一项内容
/* 
* forEach: 遍历数组中的每一项内容
* @params
*    回调函数
* @return 
*  原来数组不变
*
*/
let ary = [12,15,9,28,20,44];

ary.forEach((item,index)=>{
  // 数组当中有多少项目，函数就会被执行多少次
  // 每一次执行函数：item是数组中当前要操作的这一项，index是当前项的索引
  console.log('索引：'+ index + '内容' + item);
})

// 基于原生JS中的循环可以实现
for(let i = 0; i<ary.length;i++){
   //i: 当前循环这一项的索引
  //  ary[i]: 根据索引获取循环的这一项
  console.log('索引：'+i+ '内容' + ary[i]);
}


// Array.prototype 在控制台输出这个可以查看数组中所有提供的方法，可以基于MDN网站去查询方法的用法
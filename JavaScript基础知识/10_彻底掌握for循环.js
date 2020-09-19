/* 
 * 1.创建循环初始值
 * 2.设置（验证）循环执行的条件
 * 3.条件成立执行循环中的内容 
 * 4.当前循环结束执行后的累计操作
 */
// for (var i = 0; i < 5; i++) {
//   console.log(i);  // 0 1 2 3 4
// }
// console.log(i); //5

for (var i = 10; i > 4; i -= 2) {
  if (i < 7) {
    i++;

  } else {
    i--
  }
}
console.log(i); //4

// 循环中的两个关键词
//continue: 结束当前这轮循环（continue后面的代码不再执行），继续执行下一轮循环
//break:强制结束整个循环（break后面代码也不再执行，而且整个循环啥也不再直接结束）
for(var i = 0; i <10; i++){
  if(i>=2){
    i+=2;
    continue;
  }
  if(i>=6){
    i--;
    break;
  }
  i++;
  console.log(i); // 1 5  8 11    // 1 遇到continue不再执行
}
console.log(i);  //11

for(var i = 0; i <10; i++){
  if(i>=2){
    i+=2;
    // continue;
    break;

  }
  if(i>=6){
    i--;
    // break;
    continue;
  }
  i++;
  console.log(i); //
}
console.log(i);  //4 遇到break整个for循环都结束
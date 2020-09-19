let a = 10;
if (!a) {
  // 条件可以多样性：大于、等于、小于的比较/一个值或者取反等 =》最后都要计算出true还是false
}
if (a <= 0) {
  console.log("hhh");
} else if (a > 0 && a < 10) {
  // A && B A和B都成立才为true
  //A || B A或者B只有一个成立就为true
  console.log("666");
} else if (a == 10) {
  console.log("嘿嘿");
} else {
  console.log("888");
}

// ========================三元运算符：简单if/else的特殊处理方式=========================
//条件？条件成立处理的事情：不成立处理的事情
let a = 10;
a >= 10 ? console.log("hehe") : console.log("嘿嘿");
// 1.如果处理的事情比较多，我们用括号包起来，每一件事情用逗号分隔
//2.如果不需要处理的事情，可以使用null/undefined占位
let a = 10;
/* if(a > 0 && a < 20) {
  a++; // a+=1  a=a+1 =>自身累加1
  console.log(a);
}
 */
a > 0 && a < 20 ? (a++, console.log(a)) : null;

//案例二

let b = 10;
// if (b > 0) {
//   if (b < 10) {
//     b++
//   } else {
//     a--;
//   }
// } else {
//   if (a > -10) {
//     a += 2;
//   }
// }
// 三目运算符写法：
b > 0 ? (b < 10 ? b++ : a--)
      : (a > -10 ? a += 2 : null);




//=============================switch case===================================
//1.每一种break情况结束后最好都加上break
// 2.default等价于else,以上都不成立刚的事情
let c = 10;
// if(c==1){
//   console.log('呵呵');
// }else if(c == 5){
//   console.log('haha');
// }else if(c ==10){
//   console.log('嘿嘿');
// }else {
//   console.log('喜喜');
// }

//3.不加break，当前条件成立完成后，后面条件不论是否成立都要执行，直到遇到break为止
switch(c){
  case 1:
    console.log('呵呵');
    break;
 case 5:
   console.log('haha');
case 10:
   console.log('嘿嘿');
   break;
default:
  console.log('喜喜');
}

//4.不加break可以实现变量在某些情况下做相同的事情 =>编程开发人员要具备探索尝试之心
switch(c){
  case 1:
  case 5:
   console.log('haha');
case 10:
   console.log('嘿嘿');
   break;
default:
  console.log('喜喜');
}
console.log(a);

// 5. 使用字符串区别: 每一种case情况的比较用的都是 === “绝对相等”
c = '5';
if(c==1){
  console.log('呵呵');
}else if(c == 5){
  console.log('haha'); ///“haha”输出    true
}else {
  console.log('喜喜');
}

let c = '5';
switch(c){
  case 1:
    console.log('呵呵');
    break;
 case 5:
   console.log('haha');  //  此处'5' case 5 => false
default:
  console.log('喜喜');  //执行喜喜
}


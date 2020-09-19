// 实现一些常用的需求
// 时间字符串的处理
let time = '2020-9-14 16:28:20'; //变为自己需要呈现的格式，，例如： 2020年09月14日 .....
//-  2020年09月14日  16时28分20秒
//- 2020年09月14日 
//- 09/14  16:28

// 不足十位数不不补零的方法
let addZero = val => val.length < 2 ? '0' + val : val;

// 方案一：一路replace
time = time.replace('-', '年').replace('-', '月').replace(' ', '日').replace(':', '时').replace(':', '分') + '秒';
console.log(time); //2020年9月14日16时28分20秒

// 方案二：获取年月日小时分钟秒几个值之后，最后想拼成什么效果就拼成什么效果
let arry = time.split(/(?:|-|)/g);
time = ary[0] + '年' + addZero(ary[1]) + '月' + addZero(ary[2]) + '日';
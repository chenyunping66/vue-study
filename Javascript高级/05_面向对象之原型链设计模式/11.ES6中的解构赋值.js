const { weekdays } = require("moment");

/* 
 * 解构赋值：
 *   让左侧出现和右侧相同的结构，以此快速获取到我们需要的内容
 *   真实项目中，最常用的就是对数组和对象的解构赋值
 */
let ary = [10, 20, 30, 40, 50];
let n = ary[0];
m = ary[1];
x = ary.slice(2);
console.log(n, m, x); //10 20 [30, 40, 50]

// es6写法
// ...扩展你运算符，把剩下的内容存储到x中（x是个数组），但是它只能出现在最后
let ary = [10, 20, 30, 40, 50];
let [n, m, ...x] = ary;
console.log(n, m, x); //10 20  [30, 40, 50]

let [n, , m, , , x = 0] = ary; //如果没有这一项，我们可以基于等号赋值默认值
console.log(n, m, x); //10 30 0

// 多维数组解构赋值（让左侧出现的结构和右侧相同即可）
let ary = [10, [30, 40, [80, 90]]];
let [n, [, , [, m]]] = ary;
console.log(n, m); //10 90

// 对象解构赋值
let obj = {
  name: '学习',
  age: '20',
  sex: 'man',
  friends: ['js', 'c', 'rect']
};
// let name = obj.name;
// let sex = obj.sex;

//解构赋值的写法：
// =>1.创建变量要和对象的属性名一致
// let {
//   name,
//   sex,
//   address,
//   ...friends
// } = obj;
// console.log(name,sex,address,friends);  //学习 man undefined {age: "20", friends: Array(3)}

//=》2.冒号相当于给获取的结果设置了一个别名（变量名）：创建了一个叫做nianling的变量存储于obj.age的值
// let {
//   age:nianling
// } = obj;
// console.log(nianling);  //20

// =>3.给获取变量的结果设置默认值（没有这个属性走的是默认值）
// let {
//   height= "180cm"
// } = obj;
// console.log(height);  //"180cm"

//4，多维对象获取
let {
  name,
  friends: [firstFriend]
} = obj;
console.log(name, firstFriend); //学习 "js"

// 项目中使用的真实例子：
let data = {
  code: 0,
  "data": {
    "today": "2019-07-17",
    "data": [{
      "id": "33",
      "url": "//cm.l.qq.com/?Bid=69c00a19dce3b1e8ade42d4652652f7e"
    }, {
      "id": "48",
      "url": "//cm.l.qq.com/?Bid=ba264f0b1cfde45b439ed8591edd7a6c"
    }]
  }
};

// 以前用法
// let code = data.code,
//   today = data.data.url;

// ES6用法：解构赋值
let {
  code,
  data: {
    today,
    data: calendarData
  }
} = data;
console.log(code, today, calendarData); //0 "2019-07-17" [{…}, {…}]
// 循环拿到每一项
// calendarData.forEach((item) => {
//   // let id = item.id,
//   //     url = item.url;  //改为es6写法 再解构
//   let {
//     id,
//     url
//   } = item;
//   console.log(id, url); //33 //cm.l.qq.com/?Bid=69c00a19dce3b1e8ade42d4652652f7e  48  //cm.l.qq.com/?Bid=ba264f0b1cfde45b439ed8591edd7a6c
// })
// 将item直接在参数进行解构
calendarData.forEach(({
  id,
  url
})=>{
  console.log(id,url);
})
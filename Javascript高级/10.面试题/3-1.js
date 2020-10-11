/* 编写一个程序，将数组扁平化，并去除其中重复部分数据，最终得到一个升序且不重复的数组 */
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
//=》 使用ES6中提供的Array.prototype.flat处理
arr = arr.flat(Infinity);  //对大部分低版本浏览器都不兼容
//使用 Infinity，可展开任意深度的嵌套数组
console.log(arr); //[1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

/* 方法二 =========================*/
//=> 基于new Set去重（也可以自己写方法）
// [...new Set(arr)];
// Array.from(new Set(arr));
console.log(Array.from(new Set(arr)));
arr = Array.from(new Set(arr)).sort((a, b) => a - b);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

//简写：
// arr = Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>a-b);

/* 方法三=========================*/
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];

//=> 数组直接变为字符串即可（数组toString之后，不管你有多少级，
// 最后都变为以逗号分隔的字符串，没有中括号和所谓的层级了，）相当于直接的扁平化了。
arr = arr.toString().split(',').map(item=>{  //IE6~8不兼容
  return Number(item); //将字符串转为数字
})
console.log(arr);  // [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

/*  方法四===================================*/
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
//"[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10]"
//"1,2,2,3,4,5,5,6,7,8,9,11,12,12,13,14,10"
//["1", "2", "2", "3", "4", "5", "5", "6", "7", "8", "9", "11", "12", "12", "13", "14", "10"]
//[1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
arr = JSON.stringify(arr).replace(/(\[|\])/g,'').split(',').map(item=>Number(item));

/* 方法五======================== */
/* =>基于数组的some方法进行判断检测 ：验证数组中的某一项有没有符合函数中提供的规则的
* => find和some的区别：some返回的是boolean,find找到符合规则的，返回当前这一项，没有找到符合规则的，返回undefined
*/
//=》Array.isArray()检测某个值是否是数组类型
var A = [2,3,4,5];
var B =  A.find(item=>{
  return item<6;
});
console.log(B);  //2找到一项就不再找了

let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
while(arr.some(item=>Array.isArray(item))){
  arr = [].concat(...arr);  //[1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
}


/* 方法六 ======================== */
/* 自己递归处理 */
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];
~function(){
  function  myFlat(){
    let result = [],  //创建空数组存储最终的结果
        _this = this;  //当前操作的数组
      // console.log(this);
      //=》 创建方法，循环arr中的每一项，把不是数组的存储到新数组中
    let fn = (arr) => {  
      for(let i=0;i<arr.length;i++){
        let item = arr[i];
        if(Array.isArray(item)){
          fn(item);  ////fn([1,2,3]) 一层层往下传
          console.log(item);
          continue;
        }
        result.push(item);  //
      }
    };
    fn(_this);
    return result;
  }
  Array.prototype.myFlat = myFlat;
}();
arr = arr.myFlat();




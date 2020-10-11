/* 
 * 某公司1到12月份的销售额存在一个对象里面，
 * 如下：{
 *    1：222，
 *    2：123，
 *    5：8888
 *      }，
 *请把数据处理为如下的架构：[222,123,null,null,888,null,null,null,null,null,null,null]
 */
let obj = {
  1: 222,
  2: 123,
  5: 888
};
let arr = new Array(12).fill(null).map((item, index) => { // new Array(12)创建长度为12位的数组，填充null,循环12个null
  return obj[index + 1] || null //如果索引+1和obj的索引对上了，返回
  //0+1=1：222 => 1+1=2：123  =>4+1=5:888
  //0：222，1：123，2:null,3:null, 4:888,null,null,null...意思是arr的下标加了1，但是位置还是原来的填充位置而已
  console.log(obj[index + 1])

});
console.log(arr); // [222, 123, null, null, 888, null, null, null, null, null, null, null]

/* 方法二================================================= */
let obj = {
  1: 222,
  2: 123,
  5: 888
};
obj.length = 13;
// Array.from(obj); //Array.from(arrayLike): 想要转换成数组的伪数组或者可迭代对象
let arr = Array.from(obj).slice(1).map((item) => {
  return typeof item === "undefined" ? null : item
  //  return item.replace('undefined','null') 检测数据类型，只能用undefined
});
console.log(arr);  //[222, 123, null, null, 888, null, null, null, null, null, null, null]

/* 方法二================================================= */
//通过多种办法第一学点思路，第二学点语法，第三能够知道某个数据类型的用法
let obj = {
  1: 222,
  2: 123,
  5: 888
};
// => Object.keys(obj); 获取obj中所有可枚举的属性名，以数组的方式返回
console.log(Object.keys(obj)); // ["1", "2", "5"]
let arr = new Array(12).fill(null); 
//当我们想借助new Array()生成指定数组长度的假数据的时候，借助fill往里面添加数据，如果没有传之，默认是undefined,起码这样有值了
Object.keys(obj).forEach(item=>{
  arr[item-1] = obj[item];
});
console.log(arr); //[222, 123, null, null, 888, null, null, null, null, null, null, null]

//总结：数组原型上的方法Array.prototype(20个)
//push/pop/shift/unshift/splice/slice/concat/join/toString/reverse/sort
// /indexOf/lastIndexoOf/includes/forEach/map/som/find/flat/fill...  filter/reduce

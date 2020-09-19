let ary = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3];

// 方案三： 这种思想是比较好的，兼容所有浏览器的

// 1.创建一个空对象
let obj = {};
// 2.循环数组中的每一项，把每一项向对象中进行存储 =>  item:item
for (let i = 0; i < ary.length; i++) {
  let item = ary[i];
  //  3. 每一次存储之前进行判断：验证obj中是否存在这一项
  if (obj[item] !== undefined) {
    // 已经存在这一项
    ary.splice(i, 1);
    // i--
    continue;
  }
  obj[item] = item;
  // obj[1] =1; obj[2] = 2
}
console.log(ary); //[1, 2, 3]

// splice()实现删除性能不好：当前项被删除后，后面每一项的索引都要向前提一位，如果后面内容过多，一定影响性能
// 方案四：处理基本数据类型的值
let ary = [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3];
let obj = {};
for (let i = 0; i < ary.length; i++) {
  let item = ary[i];
  if (obj[item] !== undefined) {
    ary[i] = ary[ary.length - 1];
    ary.length--;
    i--;
    continue;
  }
  obj[item] = item;
}
console.log(ary);

/* 
 * unique: 实现数组去重的方法
 *  @params
 *     ary[Array] 要去重的数组
 *  @return
 *    [Array] 要去重的数组
 *by cyp on 20200914
 */
function unique(ary) {
  let obj = {};
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (obj[item] !== undefined) {
      ary[i] = ary[ary.length - 1];
      ary.length--;
      i--;
      continue;
    }
    obj[item] = item;
  }
  return ary;
}
console.log(unique([12,23,44,33,55,55,23,12]));  //[12, 23, 44, 33, 55]
let aa =[12,23,44,33,55,55,23,12];
aa = unique(aa);
aa.sort((a,b)=>a-b);  //排序
console.log(aa);  //[12, 23, 44, 33, 55]

// 基于ES6的Set(对于Map)实现去重
let ary = [12,23,23,15,46];
ary = [...new Set(ary)];
console.log(ary);  // [12, 23, 15, 46]
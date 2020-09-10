let person = {
  name: '加油学习',
  age:40,
  heighet:'185cm',
  weight: '80kg',
  1:100
};
//1.获取属性名对应的属性值
//    => 1.对象.属性名  2.对象[属性名](属性名是数字或者字符串的格式)
console.log(person.name); //这个人的名字    //"加油学习"
console.log(person['age']); //40
console.log(person[1]); //100
// console.log(person.1); // Uncaught SyntaxError: missing ) after argument list如果属性名是数字则不能使用点的方式获取属性（对象.属性名）
//2.如果当前属性名不存在，默认的属性值是undefined
console.log(person.sex); //undefined   //意料之外（不是我能决定的）

//3.设置属性名和属性值 
//    => 属性名不能重复，如果属性名已经存在，不属于新增属于修改属性值
person.GF = '小慧';
person.name = '李易峰';
console.log(person['GF']);  //"小慧"
console.log(person['name']); 

//4.删除属性名属性值
//   =>真删除：把属性彻底删除
delete person[1];
//   =>假删除：属性还在，值为空
person.weight = null;  //能够自己管控的，一般用这个
// person.weight = undefined;
console.log(person);

// =======================================================================================

// 数组是特殊的对象类型
/* 因为：
*  1. 我们中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，
*  我们把其称为“索引” => 从零开始，连续递增，代表每一项位置的数字属性名
*  2.天生默认一个属性名length, //存储数组的长度
*/
let ary = [12,'哈哈', true ,13];
console.log(ary.length); //4
console.log(ary['length']); //4
console.log(ary[1]); //"哈哈"
//知识点：第一项索引为0，最后一项索引ary.length -1 
console.log(ary[0]); // 12
console.log(ary[ary.length - 1]); // 13

//向数组末尾追加内容
ary[ary.length] = 100;
console.log(ary);
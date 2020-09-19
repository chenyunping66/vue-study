var name = 10;
// var name（变量） = 10;
// var obj(变量) = {
  var obj ={
  name:'好好学习',
  // "name(属性名)":'好好学习'  "name"引号可写可不写
  0:100,
  [12]:1000,
  ['AGE']:88,
  true:77,
  null:44,
  undefined:33,

};
// 获取obj这个对象的name属性对应的值
console.log(obj.name); //'好好学习'  //这种方式不能点数字
// 一个对象的属性名只有两种格式：数字或者字符串(等基本类型)
console.log(obj['name']); //'好好学习'  加单引号代表属性名就是它   //这种方式可以获取数字类型的值 obj[0]


// 'age' 值 ->代表本身
// age 变量 ->代表的是他存储的这个值
// obj[name变量代表的值]  obj[10]  => undefined
console.log(obj[name]); 

// console.log(name); //name这个变量存储的是值

// function fn() {
//   var aa  =100;
//   return aa; //=>把aa的值返回 return 100；
// }
// 变量的本身并没有任何意义，它的存在就是为了存储值

var name = '哈好';
var obj = {

  // 相当于name:'哈好'
  // 属性名：属性值（放的是变量也是把变量值存储的值拿过来做属性值）
  name:name,
  // 在es6可以简化为：
  name,  //ES6简化和name:name 一模一样
  age: 1===1?100:200
}
// 属性名是对象里面独有的

// ==============================
// for in 循环，用来循环遍历对象中的键值对的(continue和break同样适用)
var obj = {
  name:'ceshi',
  age:22,
  friends:'小刘，小慧',
  1:20,
  2:149,
  3:140
};
// obj['friends']; //拿不到每一个的值
// for(var (key0)变量 in 对象))
// 对象中有多少组键值对，循环就执行及几次（除非break结束）
for(var key in obj){
// 每一次循环Key变量存储的值是：当前对象的属性名
// 获取属性值：obj[属性名]->obj[key（变量，把这个变量存的值作为属性名来获取）]  而obj.key/obj['key'] 是获取obj里面为key的属性值
  console.log('属性名：'+ key + '属性值:' + key[key]);
}
// for in在遍历的时候优先循环，数字属性名（从小到大）


/* 
 *   == 进行比较的时候，如果左右两边数据类型不一样，则先转换为相同的数据类型，然后再进行比较
 *  1.{} == {} 不想等，两个对象进行比较，比较的是堆内存中的地址
 *  2. null == undefined  相等的，谁转换成谁不知道  null === undefined 不相等，因为是两个不同的堆
 *  3. NaN==NaN 不相等   NaN和谁都不相等 
 *  4. [12] == "12"  //true 对象和字符串比较，是把对象toString（）转换为字符串后，再进行比较的
 *  5.剩余所有情况在进行比较的时候，都是转化为数字（前提是数字类型不一样）
 *       =>               对象转数字：先转换为字符串，然后再转换为数字
 *                        字符串转数字：只要出现一个非数字字符，结果就是NaN
 *                        布尔转数字：true->1  false->0
 *                        null转数字是0  
 *                        undefined转数字NaN
 *   [12] == true   =>  Number([12].toString())  //12  true=> 1 => false
 *   []== false     =>[] //0  false//0  => true
 *   []==1          => 0 ==1 false
 *   "1"==1         => 1==1 true
 *   true==2        => 1==2  false
 * .......
 * 但左右两边数据类型不相同的时候，对象和字符串比较是对象转换为字符串，其余的情况NaN和undefined比较是相等的，其余的情况都是把值转换为数字再比较，而对象是先toString()再比较
 *  
 */

//解题：
//对象和数字比较：先把对象.toString()变为字符串，然后再变为数字
var a = {
  n: 0,
  //=> 私有属性方法
  toString: function () {
    return ++this.n; //this:指向调用它的a
  }
};
// a.toString();//=>此时调取的就不再是Object.prototype.toString()了，调取的是自己私有的

// var a = ? ;
if (a == 1 && a == 2 && a == 3) {
  console.log('OK');
}

//总结：考察两个知识点：1.数据类型两边不扽的情况下，是怎么比较的，以及对象转换先toString()再比较
// 2.所有的值都是先找自己私有的，再找原型上的。

// [12].toString()
// "12"
// ({n:0}).toString
// ƒ toString() { [native code] }
// ({n:0}).toString()
// "[object Object]"
// Object.prototype.toString()
// "[object Object]"

/* 方法二 */
//=》 shift: 删除第一项，把删除的内容返回
let a = [1, 2, 3];
a.toString = a.shift; //添加一个私有的toString()方法，让它自己的私有toString()等于shift方法，再将返回结果删除，依次类推
if (a == 1 && a == 2 && a == 3) {
  console.log('OK');
}
//自己在私有属性重构一个方法


/* 方法三： */
/* 
 *    ES6中新增加的一些方法：
 *       String.fromCharCode([n])   <=>  "z".charCodeAt()
 *       Array.from()
 *       Array.isArray()
 *       Object.create([obj]) // 创建一个空对象，并且让空对象的原型链指向obj
 *       Object.defineProperty()
 */

"z".charCodeAt() //122
String.fromCharCode(122); //"z"

//Object.defineProperty()
let obj = {
  // name: '学习'
};
Object.defineProperty(obj, 'name', {
  get: function () {
    console.log('哈哈');
    return "学习开心";
  },
  set:function(){
    console.log('呵呵');
    this.value = "呵呵呵";
  }
});

Object.defineProperty(window, 'a', {  //监听window的a的属性
  get: function () {
    this.value ? this.value++ : this.value = 1;
    return this.value;
  }
});
if (a == 1 && a == 2 && a == 3) {
  console.log('ok');
}
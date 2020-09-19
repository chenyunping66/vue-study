const { delete } = require("vue/types/umd");

/* 
*  数组以及数组中常用的方法：
* 1.向数组末尾增加内容三种方法：
*  ① **push 向数组末尾增加内容 **
*  ② **向数组末尾追加
*   ary.splice(ary.length,0,'AAA');**
*  ③ **基于源生js操作键值对的方法，也可以向末尾追加一项新的内容
*    ary[ary.length] = 40; **
*
* 2. 向数组开始增加内容两种方法：
*     ①unshift 向数组开始位置增加内容
*     ②// 向数组前面追加 ary.splice(0,0,'放前面');
*
* 3. 删除数组中的最后一项有三种方法：
*     ① pop 删除数组中的最后一项
*     ②//基于原生JS让数组的长度干掉以为，默认干掉的就是最后一项
*         ary.length--;  // 相当于ary.length = ary.length-1
*     ③ary.splice(ary.length-1);
*
* 4. 删除数组中的第一项有三种方法：
*    ①shift删除第一项
*    ②// 删除第一项  ary.splice(0,1);
*    
*/
let ary = [12,23,456,6];  
console.log(typeof ary)  ////"object"
console.dir(ary);

/* 
* ary = {
   0:12,
   1:23,
   2:456,
   3:6,
   length:4
}
*
* 数字作为索引（key属性名）
* length代表长度
*
* ary[0] 根据索引获取制定项的内容
* ary.length获取数组的长度
* ary.length -1 最后一项的索引
*
*
*/

// ====================================/* 2.数组的常用方法 */=============================================

// 2.1实现数组增删改的方法
/*
 *  方法的作用和含义，
 *   方法的实参（类型和含义），
 *   方法的返回值，
 *   原来的数组是否会发生改变
 * 
 */

//  这一部分方法都会修改原有的数组

// ++++++++++++++++++++++++++++++++++++ **push 向数组末尾增加内容 **
/* 
*  push
*    push: 向数组末尾增加内容
*    @params:
*       多个任意类型
*    @return 
*      新增后数组的长度，原始数组改变
*/

let ary = [10,20];
let res =ary.push(30,'AA',{name:'学习'});
console.log(res,ary);

// 基于源生js操作键值对的方法，也可以向末尾追加一项新的内容
ary[ary.length] = 40;
console.log(res,ary); //=> 5, [10,20,30,'AA',{name:'学习'}，40]

// ++++++++++++++++++++++++++++++++ **unshift 向数组开始位置增加内容**
/* 
*  unshift
*    unshift: 向数组开始位置增加内容
*    @params:
*       多个任意类型
*    @return 
*      新增后数组的长度
*/

let ary = [10,20];
let res =ary.unshift(30,'AA',{name:'学习'});
console.log(res,ary);  //5,[30, "AA", {…}, 10, 20]

// 基于原生ES6展开运算符，把原有的ary克隆一份，在新的数组中创建第一项，其余的内容使用原始ary中的信息即可，也算是了向开始追加的效果
ary = [100,...ary];
console.log(ary); //[100, 30, "AA", {…}, 10, 20]

// +++++++++++++++++++++++++++++++++ shift删除第一项
/* 
*  shift
*    shift: 删除数组的第一项
*    @params  
*    @retur
*       删除后新增后数组的长度
*/

let ary = [10,20];
let res =ary.shift(); 
console.log(res,ary);  // [20]

// 基于原生JS中的delete,把数组当作普通的对象，确实可以删除掉某一项内容，但是不会影响数组本身的结构特点（length长度不会跟着修改），
// 真实项目中独居这样的删除使用
let ary = [10,20];
delete ary[0];
console.log(ary);  // [empty, 20，length: 2]


// +++++++++++++++++++++++++++++++++ pop 删除数组中的最后一项
/* 
*  pop
*    pop: 删除数组中的最后一项
*    @params  
*    @return 
*      删除的那一项
*/
let ary = [10,20,30];
let res =ary.pop(); 
console.log(res,ary);  //30 (2) [10, 20，length: 2]

//基于原生JS让数组的长度干掉以为，默认干掉的就是最后一项
ary.length--;  // 相当于ary.length = ary.length-1
console.log(ary); //[10, 20,length:2]


// +++++++++++++++++++++++++++++++++ splice 实现数组的增加删除和修改
/* 
*  splice
*    splice: 实现数组的删除
*    @params  
*        n,m 都是数字  从第n开始删除m个元素（m不写，是删除到末尾）
*    @return 
*      把删除的部分用新数组存储起来返回
*/
let ary = [10,20,30,88,90,2,4,6];
let res =ary.splice(2,4); 
console.log(res,ary);  //[30, 88, 90, 2]  [10, 20, 4, 6]

//基于这种方法可以清空一个数组，把原始数组中的内容以新数组存储起来（有点类似数组的克隆：把原来数组克隆，一模一样的给新数组）
res = ary.splice(0);
console.log(res,ary); // [10, 20, 4, 6] ,  []

// 删除最后一项
let ary = [10,20,30,88,90,2,4,6];
ary.splice(ary.length-1);
// 删除第一项
ary.splice(0,1);
console.log(ary);  //[20, 30, 88, 90, 2, 4]

// +++++++++++++++++++++++++++++++++ splice 实现数组的增加和修改
/* 
*  splice
*    splice: 实现数组的增加、修改
*    @params  
*       n,m 从索引n开始删除m个元素，用x占用删除的部分
*       n,0,x  从索引n开始，一个都不删，把x放到索引n的前面
*    @return 
*      删除后新增后数组的长度
*/
let ary = [10,20,30];
let res =ary.splice(1,2,'学习'); 
console.log(res,ary);  //[20, 30]  [10, "学习"]

//实现增加
ary.splice(1,0,'哈哈哈');
console.log(ary);  //[10, "哈哈哈", "学习"]

// 向数组末尾追加
ary.splice(ary.length,0,'AAA');
console.log(ary);  // [10, "哈哈哈", "学习", "AAA"]

// 向数组前面追加
ary.splice(0,0,'放前面');
console.log(ary);  //  ["放前面", 10, "哈哈哈", "学习", "AAA"]





















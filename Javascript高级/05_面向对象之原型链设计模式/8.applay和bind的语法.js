/* 
* Apply方法:
*  和call方法一样，都是把函数执行，并且改变里的this关键字，唯一的区别就是传递给函数的参数方式不同
*
*/
let obj = {
  name: 'OBJ'
};
let fn = function () {
  console.log(this.name);
};
// 让fn()方法执行，让方法中的this变为obj,并且传递10/20
fn.call(obj,10,20);
fn.apply(obj,[10,20]);

/* 
* bind方法：
*  和call/apply一样，也是用来改变函数中的this关键字的，只不过基于bind改变this,当前方法并没有被执行，类似于预先改变this
*/
let obj = {
  name: 'OBJ'
};
function fn() {
  console.log(this.name);
};
document.body.onclick=fn;  //当事件触发，fn中的this:body
// 我们想点击body，让fn中的this指向obj
document.body.onclick=fn.call(obj);//这样是基于call/apply这样处理，不是把fn绑定给事件，而是把fn执行后的结果绑定给事件
// -------------------------解决办法一----------------------------
document.body.onclick=function(){
  //this:body
  fn.call(obj); //点击的时候，先执行匿名函数，而在匿名函数执行的时候。再把想要执行的fn更改，再把this更改
  // 但是不好的地方是，执行了两个函数，比较麻烦
}
// -------------------------解决办法二----------------------------
document.body.onclick = fn.bind(obj);  //bind的好处是：通过bind方法只是预先把fn中的this修改为obj,此时fn并没有执行，
// 当点击事件触发才会执行fn（call/apply都是改变this的同时立即把方法执行）
// => 在IE6~8不支持bind方法，预先做啥事情的思想被称为“柯里化函数编程思想”
// 高程3里面有一章节专门讲柯里化，其实就是闭包的应用

/* 
this有四大种情况：
    1.给元素的某个事件改变方法，当事件被触发，方法被执行，方法中的this是当前元素本身
    2.方法执行，看方法前面有没有点，有点，点前面是谁，this就是谁，没有this是window/undefined
    3.在new一个函数，创建一个类的实例的时候，在构造函数执行当中，构造函数体当中的this等于什么什么，this是当前类的实例
    4.可以基于call/apply/bind强制改变this的指向
*/



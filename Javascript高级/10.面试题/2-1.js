/* 1.call和apply的区别是什么？哪个性能更好一点？ */
// 相同点：都是用来改变this指向的
// 不同点：传递的参数不同
fn.call(obj,10,20,30);
fn.apply(obj,[10,20,30]);
// 1. call和apply都是Function原型上的方法，每个函数作为function这个类的的实例，所以都可以调取原型上的这个两个方法，这两个方法执行的目的都是用来
// 改变this指向的, 让函数执行，并且能够改变函数中this的指向。
// 2.而他们两个的区别是call传参要求给函数传参一个个传递，而applay需要传递的参数以数组的形式保存起来，
// 3.跟他们相似的方法还有一个bind，只是bind并没有立即把函数执行，只是预先处理改变this。
//4. call要比apply的性能相对好一些。（经过测试的） 由其是在传递给函数的参数超过三个的时候，所以后期开发的时候，可以使用call多一点。

let arr = [10,20,30],
   obj = {};
function fn(x,y,z){}
fn.apply(obj,arr);  //x=10,y=20,z=30
fn.call(obj,arr); // x=[10,20,30] y=z=undefined
fn.call(obj,...arr);  //基于es6的展开运算符，也可以实现把数组中的每一项依次传递给函数
//展开运算符下，call也能够实现apply的效果

//有些工具也能够测试代码的性能，但是也可以自己实现性能测试（只供参考，因为任何的代码性能测试都和测试的环境有关系的，例如：
// CPU、内存、GPU等电脑当前的性能不会有相同的情况，不同浏览器也会导致性能上的不同）

// let t1 = new Date();
//console.time()可以测试出一段程序执行的时间
//console.profile()在火狐浏览器中安装fireBug，可以更精准的获取到程序每一个步骤消耗的时间
console.time('A');
for(let i =0;i<100000000;i++){

}
// console.log(new Date()-t1);
console.timeEnd('A');

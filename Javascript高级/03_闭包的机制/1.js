//练习题1
var i= 5;
function fn(i) {
  return function (n){
    console.log(n+ (++i));
  }
}
var f = fn(1);
f(2);
fn(3)(4);
f(5)(6);
f(7);
console.log(i);
// 解析见：堆栈内存的释放.png

//课后作业
var i= 20;
function fn(){
  i-=2;
  return function (n){
    console.log((++i)-n);
  }
}
var f = fn();
f(1);
f(2);
fn()(3);
fn()(4);
f(5);
console.log(i);
// 解析见：作用域链闭包变量提升（课后作业）.png


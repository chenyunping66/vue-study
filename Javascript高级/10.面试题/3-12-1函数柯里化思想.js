/* 函数柯里化：预先处理的思想（利用闭包的机制 ）*/
//比如bind()的预先处理：利用闭包里面的保存机制，将数据保存起来供里面的小（匿名函数）函数用的时候再取，就是柯里化
//bind就是一个最经典的柯里化函数编程思想
function fn(x){
  //预先在闭包中把x值存储起来 。这就叫柯里化函数编程思想，柯里化就是闭包
  return function(y){
    return x+y;
  }
}
fn(100)(200); //第一个作用域不销毁

~ function () {
  function myBind(context = window,...argOuter) {
    //this就是需要处理的函数（需要改变this的函数）
    //context:需要改变的this指向
    //argOuter:其余需要传递给函数的实参值
    let _this=this; //this:fn
    return function anonymous(...argInner){
       //...argInner有的时候传参有的时候不传，定时器不传
       _this.call(obj,...argOuter.concat(argInner)); //call是一个个传参的
      //  _this.applay(obj,argOuter.concat(argInner)); //apply是传递的数组
    }

  }
  Function.prototype.myBind = myBind;
}();

let obj = {
  name: 'obj'
};

function fn(...arg) {
  console.log(this, arg);
}
document.body.onclick = fn.myBind(obj, 100, 200); //fn.myBind(obj, 100, 200) => function(...argInner){}

//=》 点击的时候fn中的this=》obj  /arg=>[100,200,事件对象]
// document.body.onclick = fn.bind(obj,100,200);
//bind方法的原理：
//  document.body.onclick = function(ev){
//   fn.call(obj,100,200,ev);
// }
//总结：执行bind方法，会返回一个匿名函数，当事件触发，匿名函数执行，我们再处理fn即可

// document.body.onclick =fn; //点击Bbody触发事件执行fn   this:body  arg:[事件对象]
// document.body.onclick = function(ev){
//   //ev:事件对象：给元素的某个事件绑定方法，当事件触发会执行这个方法，并且会把当前事件的相关信息会传递给这个函数（”事件对象“）
// }


/* 请实现一个add函数，满足以下功能（不固定层级） */
add(1); //1
add(1)(2); //3
add(1)(2)(3); //6
add(1)(2)(3)(4); //10
add(1)(2, 3); //6
add(1, 2)(3); //6
add(1, 2, 3); ///6
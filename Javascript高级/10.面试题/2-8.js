function Foo(){
  Foo.a = function(){
    console.log(1)
  }
  //this:obj
  this.a = function(){
    console.log(2)
  }

}
//=> 把Foo当作类，在原型上设置实例公有的属性方法 =》 实例.a();
Foo.prototype.a = function(){
  console.log(3)
}
// => 把Foo当作普通对象设置私有的属性方法 =》 Foo.a();
Foo.a  = function(){
  console.log(4)
}
Foo.a();  //4
let obj = new Foo();    //创建Foo的实例，obj可以调取原型上的方法 Foo.a:f =>1  obj.a:f=>2
obj.a();  //2  私有属性中有a 就不往公有属性里面找了
Foo.a();  //1

//类似jquery既把它当作类，也把它当作普通对象使用
// jQuery.prototype={}; // $().xxx();
// jQuery.xxx;  //$.xxx();

//重点研究阿里的拿到面试题，多看jquery源码，里面很多函数的三种形式
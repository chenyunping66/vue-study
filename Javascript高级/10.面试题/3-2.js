/*   基于内置的new关键词，我们可以创建Dog的一个实例sanmo,实例可以调取原型上的属性和方法，现在的需求是：自己实现一个_new方法，
*    也能够模拟出内置new后的结果
*/
function Dog(name){
  this.name = name;
}
Dog.prototype.bark = function(){
  console.log('wangwang');
}
Dog.prototype.sayName = function(){
  console.log('my name is'+this.name);
}
// 分析：
//new的时候都发生了哪些事情？let sanmo = _new(Dog,'三毛');
//(构造函数执行的步骤：)
/*  1.像普通函数执行一样，形成一个私有的作用域
*     + 形参赋值
*     + 变量提升
*  2.默认创建一个对象，让函数中的this执行这个对象，这个对象就是当前类的一个实例
*  3.代码执行
*  4.默认把创建的对象返回
*/
function _new(Fn,...arg) {
  //=> 完成你的代码
  //Fn当前new的类（DOg）/ ...arg后期需要给构造函数（Dog）传递的参数(['三毛'])
  
  //=》 创建一个空对象，让它的原型链指向Fn.prototype(作为Fn的一个实例)
    // let obj = {}; //obj创建一个对象（浏览器默认帮我们创建一个对象）
    // obj.__proto__ = Fn.prototype; //让这个对象编程当前类的实例
    
  //=> Object.create([AA对象])：创建一个空对象，并且让空对象作为AA对象所属构造函数的实例（obj._proto_=AA）
    let obj = Object.create(Fn.prototype);  //let AA = {name:'AAA'}; let BBB = Object.create(AAA); 将BB所属构造函数AAA的实例
    // Fn(...arg);  //把Fn(Dog)执行，需要把参数传递给Fn
    Fn.call(obj,...arg);  //2.默认创建一个对象，让函数中的this执行这个对象，这个对象就是当前类的一个实例
    return obj; //返回实例
}
let sanmo = _new(Dog,'三毛');
sanmo.bark(); //"wangwang"
sanmo.sayName(); //"my name is '三毛'"
console.log(sanmo instanceof Dog); //true
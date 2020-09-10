"use strict";
exports.__esModule = true;
// 类型推断
// 1.从赋值来判断，类型从右向左流动
var foo = 1;
var bar = 'foostudy';
// 2.通过return关键字推断返回值类型
// 底部流出
function add(a, b) {
    return a + b;
}
var c = add(1, 2);
var sum = function (a, b) {
    return a + b;
};
var person = {
    name: 'syudy',
    age: 11
};
function mixin(one, two) {
    var result = {};
    for (var key in one) {
        result[key] = one[key];
    }
    for (var key in two) {
        result[key] = two[key];
    }
}
var x = mixin({ name: 'cyp' }, { age: 11 });
//typeof返回数据类型：取一个值的类型
var ol = { name: 'ccc' };
//索引访问操作符
//interfa 和 type的区别
// 类型类型（三目元素符）
//条件类型的分类
// 第一节课ts的数据类型
//命令行 tsc 1.ts  将ts文件生成为js文件
//tsc 1.ts --watch
var age = 10; //声明变量
// const name:string = 'zhufeng'
//如果一个TS文件里面有export或者import语句，ts会把它当成一个模块处理，里面的变量都是私有变量，不会命名冲突了
//如果没有 export 和import ，那么当前文件就是全局的
// export {}
//我们所声明的变量或者const都会变成var?那还用let有用么？
//ts主要是在编译阶段起作用，运行时候没有用
//知识点一：数据类型
var name2;
var age2;
//数组的两种写法
var arr = [1, 2, 3];
var arr2 = [1, 2, 3]; //数组泛型的写法
// 知识点二： 元组 tuple
//类型和数里是固定的
//js数组和ts元组的区别
// 1.数据每一项 的类型是固定的，元组每一项类型是随意的
//2.数组长度是不限定，元素长度是固定的
//3.数组用于表示一个列表，元组一般用于表示固定的结构
var position = [100, 100];
var person2 = ['张三', 10];
// const BOY:number = 9 
//知识点三 ：枚举 enum
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
// 原理：var Gender;
// (function (Gender) {
//   Gender['BOY'] = 0;
//   Gender[0] = 'BOY';
//   Gender['GIRL'] = 1;
//   Gender[1] = 'GIRL';
// })({})
console.log(Gender.BOY);
console.log(Gender.GIRL);
//可以互相引用
var Week;
(function (Week) {
    Week[Week["monday"] = 4] = "monday";
    Week[Week["tuesday"] = 5] = "tuesday";
})(Week || (Week = {}));
console.log(0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */);
//知识点：any 任意类型
//如果一个变量是any类型。那就是相当于放弃类型检查了，可以把任意的值赋给他，也可以调用它身上的任意方法
//TS内置了很多实例，比如说给常用的DOM实例提供对应的Ts类型
var root = document.getElementById('root');
//解决办法
//1.强转成any,断言成any类型。断言，强转成any类型
//2.非空断言 ！就表示告诉TS我这个root肯定不为null,你就放心让我调用属性吧
// root!.style.color = 'red
root.style.color = 'red';
//如果定义一个变量不赋值，也不定义类型。那么就是any
var root2;
//如果定义的没有定义类型，但是赋值了，进行类型的推断（根据值推断出类型）
var root3 = document.getElementById('root');
//知识点：null和undefiend 是其他类型的子类型
//如果strictNullChecks =false,就不要进行严格null检查。null undefiend 才可以赋值给任何类型
var str;
str = null;
str = undefined;
var n;
n = null;
var un;
un = undefined;
//联合类型，三者中的某一项
var str22;
str22 = '';
str22 = null;
str22 = undefined;
//void表示没有任何类型
//"strictNullChecks": false,如果一个函数的返回值void,那么可以返回null
//"strictNullChecks": true,如果一个函数的返回值void,那么不可以返回null
function greeting(name) {
    // return 1  //Type '1' is not assignable to type 'void'
    return null;
}
//知识点：never永远不
//never是其他的类型（null,undefiend)的子类型，代表不会出现的值
//never有两种可能
//什么情况下函数的返回值是永远拿不到的呢?
// 答：1.函数中间抛出异常
// 2.函数里面有死循环
function getName() {
    var a = 0;
    // return 1  //Type '1' is not assignable to type 'never'类型“1”不能赋值给类型“never”
    throw new Error('can no getName');
    //Unreachable code detected.如果一个函数中间抛出了异常，那么此函数永远无法正常结束
    var b = 2;
    console.log(b); //Unreachable code detected.
}
function count() {
    while (true) {
        console.log(1);
    }
    //Unreachable code detected.
    console.log(2);
}
function fn(x) {
    if (typeof x === 'number') {
        console.log(x);
    }
    else if (typeof x === 'string') {
        console.log(x);
    }
    else {
        console.log(x); //(parameter) x: never  (参数)x:从来没有
    }
}
//推断类型
var v1;
var v2 = 1;
var v3 = 'sh';
//知识点：类型包装
//原始数据类型是不能调用方法的
var name22 = 'zhsd';
//当你在原始类型上调用方法的时候，内部会自动进行包装，把原始类型包装成对象类型
console.log(name22.toUpperCase);
// let name33 = new String(name22);
// name33.toUpperCase();
var isOK = true;
var isOK2 = Boolean(1);
//知识点：类型断言：可以把一个一个联合类型指定为一个更加具体的类型
var name3;
name3 = 'rr';
console.log(name3.length);
name3 = 10;
console.log(name3.toFixed(2));

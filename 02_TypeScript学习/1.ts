/*
 * @Author: your name
 * @Date: 2020-08-26 20:03:42
 * @LastEditTime: 2020-08-27 20:58:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\1.ts
 */
export {}
// 类型推断
// 1.从赋值来判断，类型从右向左流动
let foo = 1;
let bar = 'foostudy';

// 2.通过return关键字推断返回值类型
// 底部流出
function  add(a:number, b:number){
  return a + b;
}
let c = add (1,2);
// console.log(c)

// 3.从左向右流动
type Sum  = (a:number,b:number) => number;
let sum:Sum = (a,b) => {
  return a+b;
}
let person = {
  name: 'syudy',
  age: 11
}

// 二。交叉类型
//联合类型的交叉类型
type T1 = string | number;
type T2 = number | boolean;
type T3 = T1 & T2;  //number 交叉类型
type T4 = T1 | T2;  //联合类型  string | number | boolean

//三。mixin(混合)是js的一个功能，需要靠交叉类型实现
interface AnyObject{
  [prop:string]:any
}
function mixin<T,U>(one:T,two:U){
  const result = < (T & U)>{};
  for(let key in one){
    (<T>result)[key] = one[key];
  }
  for(let key in two){
    (<U>result)[key] = two[key]
  }
}
const x = mixin({name:'cyp'},{age:11});

//typeof返回数据类型：取一个值的类型
let ol = {name: 'ccc'};
type ol  = typeof ol;
//索引访问操作符
//interfa 和 type的区别
// 类型类型（三目元素符）

//条件类型的分类

// 第一节课ts的数据类型
//命令行 tsc 1.ts  将ts文件生成为js文件
//tsc 1.ts --watch

let age: number = 10; //声明变量
// const name:string = 'zhufeng'
//如果一个TS文件里面有export或者import语句，ts会把它当成一个模块处理，里面的变量都是私有变量，不会命名冲突了
//如果没有 export 和import ，那么当前文件就是全局的
// export {}

//我们所声明的变量或者const都会变成var?那还用let有用么？
//ts主要是在编译阶段起作用，运行时候没有用

//知识点一：数据类型
let name2: string;
let age2: number;
//数组的两种写法
let arr: number[] = [1,2,3];
let arr2: Array<number> =[1,2,3]  //数组泛型的写法

// 知识点二： 元组 tuple
//类型和数里是固定的
//js数组和ts元组的区别
// 1.数据每一项 的类型是固定的，元组每一项类型是随意的
//2.数组长度是不限定，元素长度是固定的
//3.数组用于表示一个列表，元组一般用于表示固定的结构
let position:[number,number] = [100,100];
let person2: [string,number] = ['张三', 10]

// const BOY:number = 9 

//知识点三 ：枚举 enum
enum Gender {
  BOY,
  GIRL
}
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
enum Week {
  monday = 4,
  tuesday = 5
}

//知识点：常数枚举
const enum  Color {
  RED,
  YELLOW,
  BLUE
}
console.log(Color.RED, Color.YELLOW, Color.BLUE)

//知识点：any 任意类型
//如果一个变量是any类型。那就是相当于放弃类型检查了，可以把任意的值赋给他，也可以调用它身上的任意方法
//TS内置了很多实例，比如说给常用的DOM实例提供对应的Ts类型
let root: HTMLElement | null = document.getElementById('root');
//解决办法
//1.强转成any,断言成any类型。断言，强转成any类型
//2.非空断言 ！就表示告诉TS我这个root肯定不为null,你就放心让我调用属性吧
// root!.style.color = 'red
(root as any).style.color = 'red';

//如果定义一个变量不赋值，也不定义类型。那么就是any
let root2;
//如果定义的没有定义类型，但是赋值了，进行类型的推断（根据值推断出类型）
let root3 = document.getElementById('root');

//知识点：null和undefiend 是其他类型的子类型
//如果strictNullChecks =false,就不要进行严格null检查。null undefiend 才可以赋值给任何类型
let str:string;
str = null;
str = undefined;

let n:null;
n = null;
let un: undefined;
un = undefined;

//联合类型，三者中的某一项
let str22: string | null | undefined;
str22 = '';
str22 = null;
str22 = undefined;

//void表示没有任何类型
//"strictNullChecks": false,如果一个函数的返回值void,那么可以返回null
//"strictNullChecks": true,如果一个函数的返回值void,那么不可以返回null
function greeting(name:string):void {
  // return 1  //Type '1' is not assignable to type 'void'
  return null;
}

//知识点：never永远不
//never是其他的类型（null,undefiend)的子类型，代表不会出现的值
//never有两种可能
//什么情况下函数的返回值是永远拿不到的呢?
// 答：1.函数中间抛出异常
// 2.函数里面有死循环
function getName(): never {
  let a = 0;
  // return 1  //Type '1' is not assignable to type 'never'类型“1”不能赋值给类型“never”
  throw new Error('can no getName');
  //Unreachable code detected.如果一个函数中间抛出了异常，那么此函数永远无法正常结束
  let b =2;
  console.log(b);  //Unreachable code detected.
}

function count(): never {
  while (true) {
    console.log(1)
  }
  //Unreachable code detected.
  console.log(2)
}

function fn(x:string | number) {
  if(typeof x === 'number') {
    console.log(x)
  }else if(typeof x === 'string'){
    console.log(x);
  }else {
    console.log(x); //(parameter) x: never  (参数)x:从来没有
  }
}



//推断类型
let v1;
let v2 = 1;
let v3 = 'sh';

//知识点：类型包装
//原始数据类型是不能调用方法的
let name22 = 'zhsd';
//当你在原始类型上调用方法的时候，内部会自动进行包装，把原始类型包装成对象类型
console.log(name22.toUpperCase);
// let name33 = new String(name22);
// name33.toUpperCase();

let isOK: boolean = true;
let isOK2:boolean = Boolean(1);

//知识点：类型断言：可以把一个一个联合类型指定为一个更加具体的类型
let name3: string | number;
name3 = 'rr'
console.log((name3 as string).length);
name3 = 10;
console.log((name3 as number).toFixed(2));

console.log((name3 as any).length)

//字面量类型 值的联合
let v4: 1 | 2 | 3 | 'one';
v4 = 1;
v4 = 2;
v4 = 3;
v4 = 'one';

// function getSomething():string | number





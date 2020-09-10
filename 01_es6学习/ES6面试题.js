// 宏管理：消除魔术字符串
// const vote_plus = 
// Symbol不能被new,基本数据类型
Object(Symbol()) //转成构造函数

// 隐式转换
Symbol().toString() //"Symbol"
String(Symbol())
Symbol() === 12; //false
// Symbol() ==12

//for in遍历的时候不能遍历Symbol属性值

// function是所有函数的类

// 所有可被迭代的对象，才能够使用for of循环 ，可被迭代对象：拥有Symbol.iterator属性
// 迭代就是循环的意思

//让类数组被我们迭代
let obj = {
  0:1,
  1:2,
  length:2,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
};
for (let item of obj) {
  console.log(item)
}

// 应用（包过基础知识，实战，源码，底层实现）+ 扩展

// 数组迭代器
let arr = [1,2,320,90];
let it = arr[Symbol.iterator](arr);
let it = createIterator(arr);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
//迭代器是一种新的数据结构：next，依次遍历每一项

// 自己手写一个迭代器
function createIterator(items) {
  let i =0;
  return {
    next () {
      // i++;
      let done = (i>=items.length);
      let value = !done ? items[i++] : undefined;
      return {
        done,
        value
      }
    }
  }
}

//genteratorFunction生成器
function* gen(){
  // GeneratorFunction
  yield 1;
  yield 2;
  yield 3;
}
// 基于生成器函数执行的返回结果就是一个迭代器
let g = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
// 应用场景：可以管理异步编程，尤其是数据请求的异步任务，防止回调地狱
// 比如
function API(num){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num);
    },1000)
  });
}
// 跳槽按技术来的
// API(10).then(data => {
//   return API(data+10);
// }).then(data => {
//   console.log(data);
// })
// let data = API(10);
// data = API(data + 10);
// console.log(data);

async function func(){
  let data = API(10);
  data = API(data + 10);
  console.log(data);
}
func();

// ********************重点************************
// async和awit底层实现机制就是级语GenratorFunction实现的
// 手动实现类似于一个async/awit的方法
function asyncFunction() {
  const iterator = generator();
  // 递归为true的时候不执行
 const next =  data => {
   let {data,value} =  iterator.next(data);  //解构赋值
   if(done) return ;
  //  第一次请求成功往下走
  // promise语法
   value.then(data => {  //data每次从服务器拿到的实例
      //如果成功之后，执行下一个next
      next(data);
   })
 };
 next();
}
asyncFunction(function* (){ //传递一个Genrator函数
  // 让函数一步一步向下走  微任务
  let data = yield API(10);
  data = yield API(data+10);
  console.log(data);
})

// redux-saga /dav /umi 默认继承redux-saga
//=> 定时器是异步编程：每一轮循环设置定时器，无需等待定时器触发执行，继续下一轮循环（定时器触发的时候，循环已经结束了）
for(var i=0;i<10;i++){
  setTimeout(()=>{
    console.log(i);
  }),1000;
}

//方法一：let存在块级作用域：每次循环都会在当前块作用域中形成一个私有的变量i,存储0-9 ========================
///当定时器执行的时候，所使用的i就是所处块作用域中的i
for(let i=0;i<10;i++){
  setTimeout(()=>{
    console.log(i);
  }),1000;
}

/* 方法二：自己形成闭包(闭包解决) ==========================*/
for(var i=0;i<10;i++){
  ~function(i){
    setTimeout(()=>{
       console.log(i);
    },1000);
  }(i);
}

// 闭包二的写法: 一个大函数执行，返回一个函数，也能够形成一个闭包
for(var i=0;i<10;i++){
  setTimeout(((i)=>{
     return() => {
       console.log(i);
     }
  })(i),1000)
}

//简写：
for(var i=0;i<10;i++){
  setTimeout((i=>()=>console.log(i))(i),1000);
}

// ==方法三：闭包写法三=========================================
//基于bind的预先处理机制：在循环的时候就把每次执行函数需要输出的结果，预先传给函数即可
var fn = function(i){
  console.log(i);
};
for(var i=0;i<10;i++){
  setTimeout(fn.bind(null,i),1000);
}
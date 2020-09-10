// 案例一：
// let a = 12;
// let b = a;
// b = 13;
// console.log(a);

// let n = {name:'珠峰'};
// let m = n;
// m.name = '培训';
// console.log(n.name);

//案例二：
// let n = [10,20];
// let  m = n ;
// let x = m;
// m[0] = 100;
// x = [30,40];
// x[0] = 200;
// m = x;
// m[1] = 300;
// n[2] = 400;
// console.log(n,m,x);

//作业题目1.
let a = {
  n: 1
};
let b = a;
a.x = a ={
  n: 2
};
console.log(a.x);  //2
console.log(b); //1
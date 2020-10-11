
//当一段代码看不懂的时候，就把它的源码模拟出来（内置的push方法）
// Array.prototype.push = function @@(val){
//    this[this.length] = val;  //val传递进来的值
//    //=》this.length在原来的基础上加1了，所以需要返回新增后数组长度
//    return this.length; //返回新增的数组长度
// }

// [12,13].push(100); //[12，23，100]
// arr[arr.length] = 100;  不用push方法，末尾添加100

let obj = {
  2:3,  //=> 1
  3:4, //=>2
  length:2, //=>3  // =>4
  push:Array.prototype.push  //首先知道push方法怎么实现的，就是当前数组在数组的最大索引，再新增一项目 this.length-1+1。
  // （知其然而知其所以然（大厂的基础知识题底层原理））
}
obj.push(1);  //=> @@(1)  //=>this:obj  //=>obj[obj.length] =1 => obj[2]=1 //=>obj.length+1 =3
obj.push(2);  //@@(2) //=>this:obj   //=>obj[obj.length]=2  //obj[3] =2  //=> obj.length =4
console.log(obj);  //{2: 1, 3: 2, length: 4, push: ƒ}
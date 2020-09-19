// sort的排序原理： 如果下一项减去上一项，大于零，不交换位置；下一项目减上一项，小于零（下一项比上一项小）,就交换位置
let ary = [{
  id:1,
  age:25,
  name:"小米"
},{
  id:2,
  age:32,
  name:"小hui"
},{
  id:3,
  age:40,
  name:"liu米"
}];
// 按照age升序
ary.sort((a,b) => {
  // b:当前项
  // a:当前项的下一项
  console.log(a,b); 
  // {id: 2, age: 32} {id: 1, age: 25}
  // {id: 3, age: 40} {id: 2, age: 32}

  // a-b/b-a 根本无法计算

  // return -1;//就是把值倒过来了而已

  return a.age - b.age;
});
console.log(ary);
// 0: {id: 1, age: 25}
// 1: {id: 2, age: 32}
// 2: {id: 3, age: 40}
// length: 3
// __proto__: Array(0)


// 按照age降序
ary.sort((a,b)=>{
  return (a.age-b.age)*-1;
});
console.log(ary);
// 0: {id: 3, age: 40}
// 1: {id: 2, age: 32}
// 2: {id: 1, age: 25}
// length: 3
// __proto__: Array(0)

// 按照name排序： localeCompare能够进行字符串比较
ary.sort((a,b) => {
  // return a.name.localeCompare(b.name);  //升序
  return a.name.localeCompare(b.name)*-1;  //降序
})
console.log(ary);
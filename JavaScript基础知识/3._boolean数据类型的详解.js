console.log(Boolean(0));  //false
console.log(Boolean('')); //false
console.log(Boolean(' ')); //true
console.log(Boolean(null));  //false
console.log(Boolean(undefined)); //false
console.log(Boolean([])); //true
console.log(Boolean({})); //true
console.log(Boolean([12])); //true
console.log(Boolean(-1)); //true

//!取反（先转为布尔，然后取反）
//!!取反再取反，只相当于转换为布尔（Boolean）
console.log(!1);  //false  //true=> !true  =>false
console.log(!!33); // true 相当于没有取反，相当于Boolean

//条件判断转boolean
//如果条件只是一个值，不是==/==/!=/>= 等这些比较，是要把这个值先转换为布尔类型，然后验证真相
if(1) {  // <=> if(1===1)
  console.log('hahha')
}

if('3px' + 3) {
  //'3px3'  => true
  console.log('hehe');
}
if('3px' - 3) {
  //NaN - 3 =>NaN => false
  console.log('嘿嘿')
}
/* 请实现一个add函数，满足以下功能（不固定层级） */
add(1); //1
add(1)(2); //3
add(1)(2)(3); //6
add(1)(2)(3)(4); //10
add(1)(2, 3); //6
add(1, 2)(3); //6
add(1, 2, 3); ///6

function currying(fn, length) {
  length = length || fn.length;
  return function (...arg) {
    if (arguments.length >= length) {
      return fn(...arg);
    }
    return currying(fn.bind(null, ...arg), length - arg.length);
  }
}

function add(n1, n2, n3, n4) {
  return n1 + n2 + n4;
}
add = currying(add, 4);
console.log(add(1)(2)(3)(4));
console.log((1, 2)(3, 4));

//没有挺多
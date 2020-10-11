/* 
 * 函数的防抖（debounce）:
 *      不是某个时间触发就去执行函数，而是在指定的时间间隔内，执行一次，减少函数执行的次数。
 *  underscorejs.com  //JS类库，提供很多项目中经常需要使用的方法（一个工具方法）
 *  =》  npm install underscore@1.5.1   http://www.css88.com/doc/underscore/
 */

/* 
 * 函数的节流（throttle）:
 *   函数节流是为了缩减执行的频率，当达到了一定时间就会执行一次。
 *      但是不会像防抖一样，一定时间内只能执行一次，而是一定时间内能执行多次。
 */


/* 
 *  debounce：函数防抖
 *    @params
 *       func:要执行的函数
 *       wait:间隔等待时间
 *       immediate:在开始边界还是结束边界触发执行（true=>开始边界，默认是结束边界）
 *   @return
 *      可被调用的函数
 *  by ccyp on 2020-9-24
 */

// _.debounce = function(func, wait, immediate) {
//   var result;
//   var timeout = null;
//   return function() {
//     var context = this, args = arguments;
//     var later = function() {
//       timeout = null; 
//       if (!immediate) result = func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) result = func.apply(context, args);
//     return result;
//   };
// };

//手写防抖（只是执行一次）
function debounce(func, wait, immediate) {
  let result = null,
    timeout = null;
  return function (...args) {
    //柯里化函数思想的应用
    //（闭包的应用：你是怎么理解闭包的？.....真实项目中，我们有些情况下堆于闭包的使用还是必不可少的，高程三有一张柯里化函数的防抖节流和...）
    let context = this,
      now = immediate && !timeout; //timeout==null
    clearTimeout(timeout); //在设置新的定时器之前，我们要把设置的定时器干掉，因为防抖的目的是等待时间内，只执行一次
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) result = func.call(context, ...args);
      // result = func.call(context,...args);
      // clearTimeout(timeout);
    }, wait);
    if (now) result = func.call(context, ...args);
    return result;
  }
}


//手写节流（只是减少频率）
let throttle = function (func, wait) {
  let timeout = null,
    result = null,
    previous = 0; //=>上次执行的时间点
  return function (...args) {
    let now = new Date,
      context = this;
    //=> remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间间隔
    let remaining = wait - (now - previous);
    if (remaining <= 0) { //超过间隔时间，不需要等待，立即执行
      clearImmediate(timeout);
      previous = now;
      timeout = null;
      result = func.apply(context, args);
    } else if (!timeout) { //还没有达到间隔时间，设置一个定时器，每隔remaining几秒执行
      timeout = setTimeout(() => {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
      }, remaining);
    }
  }
}

let count = 0;

function fn() {
  console.log(++count);
}
let lazyFn = _.debounce(fn, 1000, true);
// let lazyFn = debounce(fn,1000,true);
// let lazyFn = _.throttle(fn,1000,true);


// __.debounce();
window.onscroll = lazyFn;
//停了之后的一秒触发
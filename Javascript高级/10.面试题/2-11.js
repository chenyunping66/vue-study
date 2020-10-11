/* 
 *  实现一个$attr(name,value)遍历
 *  属性为name
 *  值为value的元素集合
 *
 *  例如下面的实例：
 */
function $attr(property, value) {
  //获取当前页面中所有的标签
  let elements = document.getElementsByTagName('*'),
    arr = [];
  //[].forEach.call(elements,item=>{});
  //Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
  //参数：想要转换成数组的伪数组对象或可迭代对象。
  elements = Array.from(elements); //=>把非数组转换为数组
  elements.forEach(item => {
    //存储的是当前元素property对于的属性值
    let itemVlaue = item.getAttribute(property);
    if (property === 'class') {
      //样式类属性名要特殊的处理
      new RegExp("\\b" + value + "\\b").test(itemVlaue) ? arr.push(item) : null;
      return;
    }
    if (itemVlaue === value) {
      //获取的值和传递的值校验成功：当前就是我们想要的
      arr.push(item);
    }
  })
  return arr;
}
//只是特殊处理了class还有其他地方需要处理的

let ary = $attr('class', 'box'); //获取当前页面包含myIn的，但是值必须为1的
console.log(ary);
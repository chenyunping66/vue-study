// 如何用proxy 来实现响应式原理
// 对象的代理和数组的代理
let obj = {
  name:{
    name:'cyp'
  },
  arr:['学习','做笔记','看书']
}
// 兼容性 可以代理13种方法set get
// defienProperty只能对特定的属性进行取值
let handler = {
  // target就是原对象，key当前取的那个值
get(target,key){
  console.log('收集依赖')
  //对象的代理处理
  // 判断传进来的如果是对象层级关系
  if(typeof target[key]==='object' && target[key]!==null){
    //递归代理只有取到对应的值才会进行代理
    //es6 Proxy对象详解 https://www.cnblogs.com/kdcg/p/9145385.html
    return new Proxy(target[key],handler)  //new Proxy用来生成Proxy实例，target是表示所要拦截的对象，handle是用来定制拦截行为的对象。
  }
  // Reflect反射 这个方法包含了很都多api
// return target[key];  //老的写法
// 新的写法target[key]
return Reflect.get(target,key) //target[key]
},
set(target,key,value){ //[1,2,3].length = 4
  // console.log('触发更新',key)
  //判断一下 当前是新增操作还是修改操作
  let oldValue = target[key]; //[1,2,3,123]  //先修改新增的数组长度，改成新的数组长度一致，第二次就不需要再更新了
  console.log(oldValue,key,value)
  if(!oldValue){
    console.log('新增属性')
  }else if(oldValue !== value){
   console.log('修改属性')
  }

  //  target[key] = value  //对象赋值 //设置时，如果设置不成功，不报错，对象不可配置
  //  所以使用Reflect这种方法实现
  return Reflect.set(target,key,value)
}
}
let proxy = new Proxy(obj,handler)

//对象的代理
// obj.name=123
// proxy.name = 123;
// console.log(proxy.name)
//赖代理
// proxy.name.name =123  //解决了层级取不到值的问题

// 数组的代理
proxy.arr.push(123);  //解决导致触发两次更新的问题
// proxy.arr[0] =100;  //length特殊处理，老值和新值的更改
// // console.log(proxy.arr[0])
// proxy.xxx =100;  //也会触发新增属性
/* 如何把一个字符串的大小写取反（大写变小写，小写变大写），例如：'ABC'变为'abc' */
let str = "xuexiejiayou是件开心的事情！努力*1000！YEYEYE!";
str = str.replace(/[a-zA-Z]/g, content => { //正则把我们想要的拿到再处理，性能更好
  //=>content:每一次正则匹配的结果
  //验证是否为大写字母：把字母转换为大写后看和之前是否一样，如果一样，之前也是大写的：在ASCII表找到大写字母的取值范围(65-90)
  //'A'。charCodeAt() 65  'Z'.charCodeAt() 90
  // content.toUpperCase() === content;  //方法一
  // content.charCodeAt() >= 65 && content.charCodeAt()<=90  //方法二
  return content.toUpperCase() === content ?
                                           content.toLowerCase() 
                                           : 
                                           content.toUpperCase();
});
console.log(str);
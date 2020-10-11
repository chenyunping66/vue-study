/* 英文字母汉字组成的字符串，用正则给英文单词前后加空格 */
let str = "good好好学习hard,天天upup向上";
    reg = /\b[a-z]+\b/ig;
str = str.replace(reg,value=>{
  //value正则捕获的内容
  return " " + value + " ";
}).trim();   //.trim(去掉首位空格)  String.prototype.trim/.trimLeft/.trimRight 去掉字符串首尾空格
console.log(str);


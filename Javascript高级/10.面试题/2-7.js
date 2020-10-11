/*在输入框中如何判断输入的是一个正确的网址，例如：用户输入一个字符串，验证是否符合URL网址的格式*/

let str = "http://www.baicu.com/index.html/?lx=1&fom=wx#video";
//=> URL格式
//1.请求协议://(双斜杠修饰符)   http/https/ftp
//2. 域名  www.xxx.xx (www.baicu.com) /  xxx.xx(baicu.com) /  kbs.sports.qq.com /kbs.sports.qq.com.cn
//3.请求的路径  /   /index.html  /stu/index.html  /stu/ 
//4.问号传参 ？xxx=xxx&xxx=xxx
//5.hash哈希值  #xxx
//6.协议，请求路径，问好传参，hash值可以省略

let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;  
//? 零到一次,   i忽略大小写 ,   [\w-]+\.数字，字母，下划线出现多位, 
//?:只匹配不捕获
// +表示一次或者多次，等同于{1,}，即c+ 和c{1,} 是一个意思
//[^/]  非斜杠
//*匹配前面的子表达式零次或多次 
// 协议部分 ((http|https|ftp):\/\/)?  域名部分 (([\w-]+\.)+[a-z0-9]+)  ；路径((?:\/[^/?#]*)+)?  传参(\?[^#]+)?
// 元字符点’.’的用法 :‘.’会匹配字符串中除了换行符\n之外的所有字符


console.log(reg.exec(str));
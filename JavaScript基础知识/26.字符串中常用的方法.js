// 字符串中常用的方法
/* 所有用单引号、反引号、双引号包起来的都是字符串 */

let str = 'xuexijiayou';
//每一个字符串都是由零到多个字符组成的
str.length // 字符串长度
str[0]  // 获取索引为零（第一个）字符
str[str.length-1]  //获取最后一个字符 str.length-1最后一项索引
str[1000] //undefined不存在这个索引

let str = 'xuexijiayou';
// 循环输出每一个字符串中的每一个字符
for(let i=0;i<str.length;i++){
  let chart = str[i];
  console.log(chart);
}

// ============================/* charAt/charCodeAt */===========================
/* 
* charAt: 根据索引获取指定位置的字符
* chartCodeAt: 获取指定字符的ASII码值（Unicode编码值）
*  @params
*     n[number] 获取字符指定的索引值
*  @return
*   返回查找到的字符
*   找不到返回的空字符串不是undefined,或者对应的编码值
*/
let str = 'haohaoxuexi';
// console.log(str.charAt(0));  //'h'
// console.log(str[0]);  //'h'
console.log(str.charAt(10000));  //'' 这个更好一点
console.log(str[1000]);  //undefined

console.log(str.charCodeAt(0)); //104  h的十进制值
// dir(String)
console.log(String.fromCharCode(104));  //h  获取ASII码对应的值

// ============================/* substr/substring/slice 字符串查找或者截取的方法*/===========================
/* 
* substr/substring/slice: 都是为了实现字符串的截取（在原来字符串中查找到自己想要的）
*     substr(n,m):从索引n开始截取m个字符，m不写截取到末尾（后面方法也是）
*     substring(n,m): 从索引n开始找到索引为m处（不含m）
*     slice(n,m): 和substring一样，都是找到索引为m处，但是slice可以支持负数作为索引，其余两个方法是不可以的
*   
*/
let str = 'haohaoxuexi';
console.log(str.substr(3,7)); //'haoxuex'
console.log(str.substring(3,7)); //'haox'
console.log(str.substr(3)); //'haoxuexi' 截取到末尾
console.log(str.substring(3,1000)); //'haoxuexi'  截取到末尾（超过索引的也只截取到末尾）

console.log(str.substring(3,7));  //'haox'
console.log(str.slice(3,7)); //'haox'
console.log(str.substring(-7,-3)); //'' substring不支持负数索引
console.log(str.slice(-7,-3)); //'aoxu' slice支持负数索引(3,8),快捷朝朝：负索引，我们可以按照str.length+负索引的方式找 =》 slice(11-7,11-3) =>slice(3,8)

// ============================/* indexOf/lastIndexOf /includes 验证字符是否存在*/===========================
/* 
*  indexOf/lastIndexOf （在所有浏览器都兼容）
*   indexOf(x,y): 获取x第一次出现位置的索引，y是控制查找的起始位置索引
*   lastIndexOf(x): 最后依次出现位置的索引
*    =>没有这个字符，返回的结果是-1
*/

let str = 'haohaoxuexi';
console.log(str.indexOf('h'));    //0
console.log(str.lastIndexOf('o'));  //5
console.log(str.indexOf('@'));  //-1  不存在返回-1

if(str.indexOf('@') === -1){
  // 字符串不包含@字符
}

console.log(str.indexOf('xue'));  //6 验证整体第一次出现的位置，返回的所以是第一个字符所在位置的索引值
console.log(str.indexOf('xueli')); //-1

console.log(str.indexOf('h',2)); //3  查找字符串索引2以及之后的字符串中，h第一次出现的位置索引

let str = 'haohaoxuexi';
if(!str.includes('@')){
  console.log('当前字符串不包含@');
}

// ============================/* toUpperCase/ toLowerCase */===========================
/* 
*   toUpperCase/ toLowerCase: 字符串中字母的大小写转换
*  toUpperCase(): 转大写
*  toLowerCase(): 转小写
*/

let str = 'shshs';
str= str.toUpperCase();
console.log(str);  //SHSHS

str = str.toLowerCase();
console.log(str); //shshs

// 实现首字母大写
str = str.substr(0,1).toUpperCase() + str.substr(1);
console.log(str);  //Shshs

// ============================/* split */===========================
/* 
*   split([分隔符]):把字符串按照指定的分隔符拆分为数组（和数组中join对应） 
*
*   split支持传递正则表达式
*  
*/
let str = 'music|movie|eat|sport';
ary = str.split('|');
console.log(ary); //["music", "movie", "eat", "sport"]

let str = 'music|movie|eat|sport';
ary = str.split('|');
str = ary.join(",")
console.log(str); //"music,movie,eat,sport"

// ============================/* replace */===========================
/* 
*   replace(老字符，新字符):实现字符串的替换
*
*/

let str = 'xuexiejiayou@坚持呀@自信@不要落后太多'
str = str.replace('@','-');
console.log(str);  //xuexiejiayou-坚持呀@自信@不要落后太多   
//在不使用正则表达式的情况下，执行依次replace只能替换一次字符

let str = 'xuexiejiayou@坚持呀@自信@不要落后太多'
str= str.replace(/@/g,'-');
console.log(str);  //xuexiejiayou-坚持呀-自信-不要落后太多

// str.localeCompare
// str.match
// str.trim/trimLeft.trimRught
// ...
// 控制台输出String.prototype查看所有字符串中提供的所有方法

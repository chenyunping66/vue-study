~ function () {
  /* 
   * formatTime: 时间字符串的格式化处理方法
   *  @params
   *     templete:[string] 我们最后期望获取日期格式的模板
   *     模板规则：{0}代表年，{1~5}代表年月日时分秒
   *  @return
   *   [string] 格式化后的时间字符串
   * by cyp on 2020/9/19

   */

  //1.这个是使用默认格式
  // function formatTime() { 
  //   //1.首先获取时间字符串中的年月日信息
  //   let timeAry = this.match(/\d+/g); //this指向 要操作的字符串time
  //   // console.log(timeAry); //["2019", "8", "10", "16", "30", "40"]

  //   let template = "{0}年{1}月{2}日 {3}时{4}分{5}秒";
  //   template = template.replace(/\{(\d+)\}/g, (bigContent, $1) => { //匹配几次函数执行几次
  //     //bigContent:当前本次大正则匹配的信息 $1:本次小分组单独匹配的信息
  //     //以$1的值，作为索引，到time-day中找到对应的时间（如果没有用"00"补）
  //     let time = timeAry[$1] || "00"; //00 防止没有时分秒，如果没有用"00"补
  //     time.length < 2 ? time = "0" + time : null;
  //     return time;
  //   });
  //   return template;
  // }

  //2.这个是用户没有传递格式就使用默认格式，以及代码简化版
  function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") { //用户不传默认格式 "{0}年{1}月{2}日 {3}时{4}分{5}秒"
    //1.首先获取时间字符串中的年月日信息
    let timeAry = this.match(/\d+/g);
    return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
      let time = timeAry[$1] || "00";
      return time.length < 2 ? "0" + time : time;
    })
  }

  /* 
  *  queryURLParmas:获取URL地址后面的参数信息，可能也包含hash值
  *    @params（参数可以没有）
  *    @return
  *       [object]把所有问号参数信息以键值对的方式存储起来并且返回
  *  by cyp on 2020/9/19
  */
  function queryURLParmas() {
     let obj = {};
     this.replace(/([^?=&#]+)=([^?=&#]+)/g,(...[,$1,$2])=>obj[$1] = $2);  //第一项大正则捕获，第二项是第一个分组，第三项第三个分组 
     //obj[$1] = $2 作为属性名，属性值存起来
     this.replace(/#([^?=&#]+)/g,(...[,$1])=>obj['HASH']=$1);
     return obj;  //{1x: "1", form: "mx", HASH: "void"}
  }

/* 
* millimeter: 实现大数字的千分符处理
*  @params
*  @return
*    返回
*/
function millimeter(){
  // ?=正向查找，
  return this.replace(/\d{1,3}(?=\d{3})+$/g),(content=>{
    // https://www.cnblogs.com/lvmylife/p/8287247.html  见博客详细解析
    //https://www.cnblogs.com/lvmylife/p/11731783.html
    //"15,6289582" (/\d{1,3}(?=\d{3})+$/g) 从后往前面走  (?=\d{3})+$ =>\d{1,3}
    return content + ",";
  })
}

  /* 扩展到内置类String.prototype上 */
  ["formatTime", "queryURLParmas","millimeter"].forEach(item => {
    String.prototype[item] = eval(item); //这样写的方式可以在原型上面扩展无数个方法  eval(item)转为表达式 => eval("formatTime")
  })
}();

let time = "2020-8-10 16:30:40";
console.log(time.formatTime()); //2019年08月10日 16时30分40秒
console.log(time.formatTime("{0}/{1}/{2} {3}:{4}")); //2020/08/10 16:30
console.log(time.formatTime("{0}年{1}月{2}日")); //2020年08月10日
time = "2020/9/19";
console.log(time.formatTime()); //2020年09月19日 00时00分00秒
console.log(time.formatTime("{0}年{1}月{2}日")); //2020年09月19日
console.log(time.formatTime("{1}-{2} {3}:{4}")) //09-19 00:00
//=> 服务器获取的
//"2019-8-13 19:20:02"
//"2019/8/13 16:51:3"
//"2019/8/13"
//=>想要转变为的格式
//"08月13日 16时51分"
//"2019年08月12日"
//"2019年08月12日 16时51分3秒"

//...
time.formatTime();

let url = "http://ww.baidu.cn/?1x=1&form=mx#void";
//=> {lx:1,form:'mx',hash:'video'}
console.log(url.queryURLParmas());

// 千字符
let num = "15628958234";  //=>"15,628,958.234" 千分符 们通常在数字每隔三位，加一个“，”，即千位分隔符，便于读写
console.log(num.millimeter());  //15,628,958,234
// let num = "156289582348";
// console.log(num.millimeter());  //156,289,582,348



// num.split('') //将字符串变成数组
num =num.split('').reverse().join('');  //将字符串变为数组再倒过来之后再变为字符串
// console.log(num);  //43285982651
for(let i=2; i<num.length-1;i+=4){  //num.length-1 去掉末尾的逗号
  //下一个开始的字符串 i+=4  //从第三个字符串后面开始加逗号 i=2
  let prev = num.substring(0,i+1);
     next = num.substring(i+1);
num = prev +","+next;
}
num =num.split('').reverse().join('');  //再倒过来
console.log(num);  //156,289,582,348

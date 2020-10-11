/* 实现一个字符串匹配算法，从字符串S中，查找是否存在字符串T, 
若存在返回所在值的位置，不存在返回-1(如果不能基于IndexOf/includes等内置的方法，你会如何处理？) */
~ function () {
  function myIndexOf(T) {
    //=> this:S
    /* 
     *  循环原始字符中的每一项，让每一项从当前位置向后截取T.length个字符，然后和T进行比较，
     * 如果不一样，继续循环：如果一样返回当前索引即可（循环结束）
     */
    let lenT = T.length,
      lenS = this.length,
      res = -1;
    if (lenT > lenS) return -1;
    for (let i = 0; i < lenS - lenT; i++) {
      if (this.substr(i, lenT) === T) {
        res = i;
        break;
      }
    }
    return res;
  }
  String.prototype.myIndexOf = myIndexOf;
}();

let S = "jintianshigehaotianqi",
  T = 'tian';
console.log(S.myIndexOf(T));


/* 正则处理 */
~ function () {
  function myIndexOf(T) {
    //this:S
    // /tian/.exec("jintianshigehaotianqi");
    let reg = new RegExp(T), //元字符就是T  把一个变量变为正则要用new RegExp(T)  /T/变成了变量T  /\T/把T转成了特殊字符
      res = reg.exec(this);
    console.log(res);
    return res === null ? -1 : res.index;
  }
  String.prototype.myIndexOf = myIndexOf;
}();
let S = "jintianshigehaotianqi",
  T = 'tian';
console.log(S.myIndexOf(T));
let ary = [1, 3, 4, 5, 2, 3, 4, 6, 8];

// ======================方案一：给一个空数组,循环原有数组中的每一项，每拿到一项都往新数组中添加，============================
// 添加之前验证新数组中是否存在这一项，不存在再增加
let newAry = [];
for (let i = 0; i < ary.length; i++) {
  // 循环获取原有数组中的每一项
  let item = ary[i];
  // 验证新数组里面是否存在这一项,如果包含就不增加
  if (newAry.includes(item)) {
    // 存在这一项，不再增加到新数组中，继续下一轮循环即可
    continue;
  }
  // 新数组中不存在这一项，我们加入到新数组中即可
  newAry.push(item);
}
console.log(newAry); //[1, 3, 4, 5, 2, 6, 8]

// 优化上面的代码
let ary = [1, 3, 4, 5, 2, 3, 4, 6, 8];
let newAry = [];
ary.forEach(item => {
  if (newAry.includes(item)) return;
  newAry.push(item);
})
console.log(newAry); //[1, 3, 4, 5, 2, 6, 8]


// ===================方案二  =============================
// 循环原来数组中的每一项。
// 先分别拿出数组中的每一项A，用这一项和它后面的每项依次进行比较，如果遇到和当前项A相同的，则在原来数组中把这一项移除掉

/* 
 *
 * 不用includes/indexOf/let/forEach(这样保证兼容性)
 */
var ary = [1, 3, 4, 5, 2, 3, 4, 6, 8];
for (var i = 0; i < ary.length; i++) {
  // item:每次循环拿出来的当前项
  // i:当前索引
  // itemLast: 当前项后面所有的内容（新数组）
  // i+1代表后一项
  var item = ary[i];
  // var itemLast = ary.slice(i+1);
  //  当当前项和后面的每一项进行比较（循环）
  for (var j = i + 1; j < ary.length; j++) {
    // compare:后面拿出来要比较的每一项
    var compare = ary[j];
    // 如果compare和item相等，说明这一项是重复的，我们把删掉
    if (compare === item) {
      // j索引这一项要从数组中移除
      ary.splice(j, 1);
      // 数组塌陷：j后面的每一项索引都提请了一位，下一次要比较的应该还是j这个索引的内容
      j--;
    }
  }
}
console.log(ary); //[1, 3, 4, 5, 2, 6, 8]


// 数组塌陷问题
aey = [12, 20, 30];
for (var i = 0; i < ary.length; i++) {
  // 把当前项从数组中移除（原来数组变）
  ary.splice(i, 1); //循环第二次的时候，数组长度变为了2，删除下标1的值为30，而不是20 ，导致数组塌陷
  //  解决办法：数组塌陷后，我们为了不然i再继续累加，我们先把i--
}
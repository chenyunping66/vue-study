/* 给定两个数组，写一个方法来计算他们的交集，思考题：交集并补是什么意思？ */
//交集：只要共同拥有什么就可以了
let nums1 = [12, 23, 23,34, 25, 46, 56];
let nums2 = [10, 35, 46, 56,23, 19, 24];
// let nums1 = [1,2,2,1];
// let nums2 = [2,2];
// => 输出结果 【2，2】

/* 方法一：两个数组循环进行比较 */
let arr = [];
for (let i = 0; i < nums1.length; i++) {
  let item1 = nums1[i];
  for (let j = 0; j < nums2.length; j++) {
    let item2 = nums2[j]; //拿到第一组和第二组的某一项进行匹配
    if (item1 == item2) {
      arr.push(item1);
      nums1.splice(i,1);
      nums2.splice(j,1);
      break; //结束里面的循环比较（当拿到两个组相匹配的值后）
    }
  }
}
console.log(arr); //[2, 2]  //解决bug之后的值 [23, 46]

/* 方法二：用数组方法实现forEach/includes */
let nums1 = [12, 23, 23,34, 25, 46, 56];
let nums2 = [10, 35, 46, 56, 23,23,23, 19, 24];
let arr = [];
nums1.forEach(item => nums2.includes(item) ? arr.push(item) : null); //[23, 46, 56]

//解决前面的方法存在的一个bug问题
let nums1 = [12, 23, 23,34, 25, 46, 56];
let nums2 = [10, 35, 46, 56,23, 19, 24];
let arr = []; //[23, 23, 46, 56]bug
//解决办法：找一个删掉一个
nums1.forEach((item,index)=>{
  //index:是nums1第一个数组当前项的索引
  //n:是第二个数组中找到相同那一项的索引
  let n = nums2.indexOf(item); //检测当前项在数组中第一次出现位置的索引值（在IE6~8不兼容）
  if(n>=0){
    arr.push(item);
    nums1.splice(index,1);// n,m 都是数字  从第n开始删除m个元素（m不写，是删除到末尾）
    nums2.splice(n,1);
  }
});
console.log(arr);//[23, 46]

//2.什么叫叉集：我有你没有的，取反获得
//3.什么叫并集：拼接之后去重
//4.什么叫补集：求第一个数字的补集：第二个数组的内容在第一个数组没有的，补进来
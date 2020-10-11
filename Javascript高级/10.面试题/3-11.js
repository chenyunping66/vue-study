/* 
 *  旋转数组
 *  给定一个数组，将数组中的元素向右移动K个位置，其中K不能是非负数
 *  输入：[1,2,3,4,5,6,7] 和 k=3
 *  输出：[5,6,7,1,2,3,4]
 *  解释:......
 *  输入：【-1，-100，3，99】 和k=2
 *  输出：【3，99，-1，-100】
 */

//这个代码还是存在Bug未解决.....
function rotate(k) {
  //=> 参数处理
  if (k < 0 || k === 0 || k === this.length) return this; //return原始数组
  if (k > this.length) k = k % this.length; //k=8/7=1把它诺前面，从头调回一圈
  //=》 旋转数组
  // arr.slice(-3)  arr.slice(arr.length-3) 让两个数组拼起来就可以了
  // return this.slice(-k).concat(this.slice(0, this.length - k));
  //方法二：把删掉的数组和原来的新数组进行拼接
  // return [...this.splice(this.length-k),...this];
  // 方法三：删除一个放到前面，删除一个放前面，依次类推
  // for(let i=0;i<k;i++){
  //   this.unshift(this.pop()); //返回删除的一项，放到开头  //unshift: 向数组开始位置增加内容 //  pop: 删除数组中的最后一项
  // }
  //用数组的代码改进代码:new Array(k)创建以k为准的多少位的数组
  new Array(k).fill('').forEach(()=>this.unshift(this.pop()));
  return this;
  
}
Array.prototype.rotate = rotate;

let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.rotate(6)); // [5, 6, 7, 1, 2, 3, 4]

//不畏惧，不否定，尽可能去尝试，只有用户想不到的，没有开发做不到的，
//不要以后遇到案例的时候，不要告诉自己我不会，以后遇到面试官的时候告诉面试官我啥都会,,,,ahhhh 
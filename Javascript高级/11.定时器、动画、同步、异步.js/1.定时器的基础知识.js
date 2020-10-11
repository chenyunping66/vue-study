// https://undercorejs.com

//1.浏览器中的定时器有两种：设置一个定时器，规定在等待时间之后执行某个方法
// 1-1. setTimeout: 执行一次
//1-2. setInterval: 一直会执行下去，每间隔这么长时间都会执行
//=> 设置定时器会有一个返回值：是一个数字，代表当时是第几个定时器
//1-3：clearTimeout(数字)/clearInterval(数字)：清除第几个定时器
//1-4: 定时器返回值
let n =0;
setTimeout(()=>{
  console.log(++n);
},1000);

let n =0;
setInterval(()=>{
  console.log(++n);
},1000);

//定义一个变量来清除定时器
let n =0;
    timeout = null;
timeout = setInterval(()=>{
  console.log(++n);
  if(n>=10){
    clearInterval(timeout); //一般用谁设置的就用哪个清除
    // clearTimeout(timeout); //到10就不再执行下去了
    timeout = null; //定时器清除了，但是此时的timeout=1
  }
},1000);
let timer2 = setInterval(()=>{},1000);
let timer3 = setInterval(()=>{},1000);
console.log(timeout,timer2,timer3);

//为什么设置为timeout=null;  
//比如：<input type="button" value="暂停" id="handleTimer">
<script>
  let handleTimer = document.getElementById('handleTimer'),
      time = null;
      count= 0;
  function createTimer() {
     timer = setInterval(()=>{
       count++;
       console.log(count);
     },1000)
  }
  createTimer();
  handleTime.onclick =function () {
    clearInterval(timer);
    handleTime.value = "开始";
  }
</script>
/* 基于单例模式构建,创建一个命名空间，把所有需要实现当前模块所需要的功能和方法，把需要外界调用的方法给暴露出来 */
/* 使用一个闭包 */


/* 
 *  瀑布流效果实现：
 *    - 单例模式构建
 *    - 基于JQUERY开发
 *    - AJAX获取数据和数据绑定
 *    - 图片赖加载
 *    - 加载更多数据
 */

/* 
*  debounce：函数防抖
*    @params
*       func:要执行的函数
*       wait:间隔等待时间
*       immediate:在开始边界还是结束边界触发执行（true=>开始边界，默认是结束边界）
*   @return
*      可被调用的函数
*  by ccyp on 2020-9-24
*/
//手写防抖
function debounce(func,wait,immediate){
  let result = null,
      timeout = null;
   return function(...args){
     //柯里化函数思想的应用（闭包的应用：你是怎么理解闭包的？.....真实项目中，我们有些情况下堆于闭包的使用还是必不可少的，高程三有一张柯里化函数的防抖节流和...）
      let context = this,
          now = immediate && !timeout;  //timeout==null
      clearTimeout(timeout); //在设置新的定时器之前，我们要把设置的定时器干掉，因为防抖的目的是等待时间内，只执行一次
      timeout = setTimeout(()=>{
        timeout = null;
        if(!immediate) result = func.call(context,...args);
        // result = func.call(context,...args);
        // clearTimeout(timeout);
      },wait);
      if(now) result = func.call(context,...args);
      return result;
   }
}


let flowModule = (function () {
  /* 获得页面中所有的列 */
  let $colums = $('.column'),
    _DATA = null; //存储从服务器获取的数据

  //=> queryData:基于AJAX从服务器获取数据
  let queryData = function () {
    //暂时先采用同步
    /* jqeury默认会把我们获取到的数据转换为json格式 */
    $.ajax({
      url: 'json/data.json',
      method: 'GET',
      async: false, //async是异步。false采用同步
      success: result => {
        _DATA = result;
        // console.log(_DATA)
      } //sucess请求成功后会，会执行这个方法
    });
  };
  /* 获取的数据绑定到页面中 bindHTML:获取绑定的数据 */
  let bindHTML = function () {
    console.log(_DATA)

    //瀑布流实现的原理：每一次从_DATA中取出三条数据，按照三列由矮到高的顺序依次插入
    for (let i = 0; i < _DATA.length; i += 3) {
      //=> 把数据图片由高到底排序
     let group = _DATA.slice(i,i+3);
     group.sort((A,B)=>B.height-A.height);


      /* 每三个为一组循环,将这三列按照由矮到高排列 (升序)*/
      $colums.sort((A, B) => { //sort是jq的排序方法
        // $A,$B 加$是jquery对象，不加$是原生对象
        // console.log(A, B);
        //=> A/B是原生JS元素对象，想要使用JQ的方法，需要转换为JQ对象
        let $A = $(A),
          $B = $(B);
        return $A.outerHeight - $B.outerHeight();
        //计算每个div的每一列内容的高度outerHeight计算高度大小，由小到大排序
      }).each((index, column) => {
        // console.log(index)
        //=>_DATA[i+index] 计算出要往每一列中插入的数据
        // let dataItem = _DATA[i + index];
        let dataItem = group[index];
        //如果没有数据，，说明数据都已经处理完了，我们结束循环
        if (!dataItem) return false; //如果没有就结束当前循环
        let {
          // id,
          pic,
          // width,
          height,
          title,
          link
        } = dataItem;
        $(column).append(`
       <a class="item" href="${link}">
         <div class="imgBox" style="height:${height}px">
           <img src="" alt="" data-img="${pic}">
         </div>
         <p>${title}</p>
       </a>
    `);
        // <p>${id}${title}</p>

        //img的加载属于异步加载，加载图片的时候，其余的任务可以继续执行，
        //想实现瀑布流的效果，必须在图片没有加载出来之前也知道它的高度（从服务器获取的数据就得到了图片的高度）

        // index==0 _DATA[i]
        //index==1 _DATA[i+1]
        //index ==2 _DATA[i+2]
        //_DATA[i+index]

      });
      //  依次给每一个里面放内容
      // $colums.eq(0).append(``); 这样写要写三个，所有用each循环
      // _DATA[i]
      // _DATA[i+]
      // _DATA[i+2]
    }

    //=》 实现图片延迟加载：数据绑定完，延迟1000ms加载真实的图片
    setTimeout(lazyImgs, 1000);
  }

  //lazyImgs：图片的延迟加载（目的：为了让页面第一次加载打开更快一点，而且优化性能，节省流量）
  let lazyImgs = function () {
    //获得所有图片所在的盒子
    let $imgBoxs = $('.container .imgBox[isLoad!="true"]'), //首先处理，这样性能更好，不要每次都循环处理
      $window = $(window),
      B = $window.outerHeight() + $window.scrollTop(); //一屏幕的高度+滚动条卷去的高度（浏览器距离底边框的偏移）
    //=> 循环每一个图片（图片盒子），计算其底边距离body的偏移，从而验证出是否加载真实图片
    $imgBoxs.each((index, imgBox) => {
      let $imgBox = $(imgBox),
        $img = $imgBox.children('img'),
        //得到盒子距离底边框的距离：盒子本身高度+距离盒子上边的高度（图片盒子距离底边框的偏移）
        A = $imgBox.outerHeight() + $imgBox.offset().top;
      // if($imgBox.attr('isLoad')=== 'true') return;
      if (A <= B) {
        //=> 加载真实图片
        $imgBox.attr('isLoad', 'true'); //attr设置的自定义属性值都是字符串
        $img.attr('src', $img.attr('data-img'));
        $img.on('load', () => {
          //  $img.addClass('display','block');  //直显示
          $img.stop().fadeIn(); //jq动画渐现显示
        });
      }
    });
  };

  //=> loadMore:加载更多数据
  let loadMore = function () {
    //在这里判断是否滚动到底部
    // => 滚动到底端（一屏幕高度+卷去的高度+100(500)像素误差 >= 页面真实的约等于值高度）
    let $window = $(window),
      winH = $window.outerHeight(); // 一屏幕高度
    scrollT = $window.scrollTop(); //卷去的高度
    pageH = $(document).height(); //获取整个文档的高度 window.height获取的一屏幕的高度
    if (winH + scrollT + 500 >= pageH) {
      queryData();
      bindHTML();
    }
  };

  return {
    /* 把外边所有需要调用的方法暴露出来 */
    init: function () {
      // init：当前模块所属的闭包里面会使用很多方法，init用来控制哪个先执行，哪个后执行（业务的唯一入口）
      queryData();
      bindHTML();
      // layzeImgs:触发事件也有执行
      //=> 滚动条滚动处理的一些事情
      // let lazy = debounce(function(){},50,true); //true开始就触发
      // // $(window).on('scroll')
      // window.onscroll = function () {
      //   lazyImgs();
      //   // scrollHeight() 真实内容滚滚动的高度
      //   // => 滚动到底端（一屏幕高度+卷去的高度+100(500)像素误差 >= 页面真实的约等于值高度）
      //   loadMore();
      // }


    //  let lazy = debounce(function(){
    //    lazyImgs();
    //    //=> 加载更多数据
    //    loadMore();
    //  },50,true);
    //  window.onscroll = lazy;

    window.onscroll = _.throttle(function(){
          lazyImgs();
       //=> 加载更多数据
       loadMore();
    },50,true);
    }
  }
})();
flowModule.init(); //初始化模块，让它在init里面控制flowModule执行

/* 工具方法类的不需要Init ,写业务逻辑的时候需要init执行先后顺序*/
// let utils = (function(){
//   let query = ()=>{}
//   return {
//       query
//   }
// })();
// utils.query; //使用的时候直接点就可以了
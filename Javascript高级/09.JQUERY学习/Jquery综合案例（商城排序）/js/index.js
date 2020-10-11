// 使用设计模式规范代码（单例模式）
/* let xxxModule = (function(){
  function fn1(){}
  function fn2(){}
  //....
  return {
    fn1,fn2
  }
})();
xxxModule.fn1(); */

/* 
 *  基于单例设计模式来管理商城排序的代码
 */
let shopModule = (function ($) {
  //=> 想要操作谁，就先获取谁（项目中尽可能的把创建变量提前并放在一起）
  let $navList = $('.navbar-nav li'),
    $cardBox = $('.card-deck'),
    $cardList = null, //刚开始没有数据赋值为Null
    _DATA = null; //存储从服务器获取的数据

  //这种方式可以爆露出来给外面用
  //=> queryData:从服务器获取数据
  function queryData() {
    $.ajax({
      url: 'json/product.json',
      method: 'GET',
      async: 'false', //同步
      success: result => {
        //从服务器获取数据成功会执行success,result存储的就是获取到的数据，并且默认数据就已经转换为JSON格式的对象
        _DATA = result;
        // debugger;
        // F10单步调试逐过程 F11逐语句
        console.log(_DATA);
      }
      // success:result => _DATA = result
    });
  }
  //=》 bindHtml:把数据绑定在页面当中
  function bindHtml() {
    // console.log(this)
    console.log(_DATA);
    //_DATA是否存在 !null == ture
    if (!_DATA) return;
    let HTML = ``;
    $.each((_DATA, item) => {
      let {
        title,
        price,
        img,
        hot,
        time
      } = item;
      HTML += `
    <div class="card"
         time="${time}"
         price="${price}"
         hot="${hot}"
    >
    <img src="${img}" class="card-img-top" alt="">
    <div class="card-body">
      <h6 class="card-title">${title}</h6>
      <p class="card-text">价格：￥${price}</p>
      <p class="card-text">好评：${hot}}</p>
      <p class="card-text"><small class="text-muted">上架时间：${time}</small></p>
    </div>
  </div>
    `;
    });
    $cardBox.html(HTML); // 等价于innerHtml
    //获取所有的card
    $cardList = $cardBox.children('.card');
  }

  //=>sortHandle:实现商城排序
  function sortHandle() {
    $navList.attr('typeA',-1);
     $navList.on('click',function(){
       //=> this:当前点击的li(原生JS对象) =》 $(this)变为jquery
       let  $this = $(this);
            pai = $this.attr('pai'); 
        $this.attr('typeA',$this.attr('typeA')*-1).siblings().attr('typeA',-1);
        $cardList.sort((A,B)=>{
              let $A = $(B);
                  $B = $(A);
              $A = $A.attr(pai);
              $B = $B.attr(pai);
              pai === "time" ? ($A = $A.replace(/-/g,""),$B = $B.replace(/-/g,"")) : null;
              return ($A-$B)*$this.attr('typeA');
        });
        $cardList.each((index,item)=> $cardBox.append(item));
     })
  }
  return {
    //当前模块的入口：想让商城排序开始执行，我们只要执行Init,在init中会按照顺序，依次完成具体的业务逻辑
    init() { //=> es6语法：init:function(){}
      queryData();
      bindHtml();
      sortHandle(); //按照顺序依次执行
    }
  }
})(jQuery); //把jQuery当作参数传给闭包，闭包里面定义一个形参$,这样保证我们使用的$永远是jQuer，是私有的，不被别人占用

// ~function(){
//这种只能是一种闭包而已，不能给别人使用
// }();

shopModule.init(); //团队协作开发的时候，每个人把自己的方法写完之后，再init()
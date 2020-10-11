/* 
 细节知识点：
   1.我们封装公共方法的时候，如果需要传递的参数过多（超过两个就可以理解为多了），则不要定义为形参，
   让用户依次传递，这样会受到顺序、传或者不传，等因素的影响，管理起来很复杂：我们可以吧需要传递的值
   统一放到一个对象中（一般都是options）,这样我们传递的信息可以传或者不传，顺序也随便，最后把转递的
   信息覆盖默认的信息即可，方便管理，也方便进行二次扩展

  2.我们把后期需要用到的信息都挂载到当前类的实例上，这样后面不管在那个方法中用这些信息，只要能够获取到
  实例，直接通过实例获取即可。

  3.本插件中需要使用的工具类方法，我们一般放到类的私有属性上（普通对象上）
*/
/* 
  插件组件封装的一点思想：
  1.基于面向对象的方式来处理
    => 调取一次插件相当于创建插件的一个实例
    => 这样私有的可以设置，公有的方法也可以设置
  2.我们要保证几个事情（拟定参数配置项）：
     =》灵活且强大（尽可能适配更多不同的应用场景和需求）
     =》容错性和可扩展性更强（传参要采用对象配置的方式和参数初始化处理）
     =》追求极致的性能和优秀的代码管理方式
     =》开源，并且依赖社区力量不断的去完善
  3.按照步骤一次实现轮播图应该具备的功能
  4.增加生命周期函数（钩子函数）
  5.编写插件使用说明文档
  
  //https://www.css-js.com/  压缩代码
*/
~ function () {
  /* Banner:渐隐渐现轮播图插件 */
  class Banner {
    constructor(selector, options = {}) {
      //2.参数初始化
      this.initialParams(options);

      //1.获取需要操作的容器
      if (!selector) throw new ReferenceError('The first selector parameter must be passed~')
      if (typeof selector === "string") {
        this.container = document.querySelector(selector);
      } else if (selector.nodeType) {
        //    //元素对象$(DOMElement)  => document.getElementById("inputid");
        this.container = selector;
      }
      //获取需要的元素
      this.wrapper = this.container.querySelector('.wrapper');
      this.slideList = this.wrapper.querySelectorAll('.slide');
      this.autoTimer = null;
      this.activeIndex = this.initialSlide; //索引
      this.count = this.slideList.length; //总图片个数
      console.log(this);

      //初始展示slide
      [].forEach.call(this.slideList, (item, index) => {
        if (index === this.initialSlide) {
          item.style.zIndex = 1;
          item.style.opacity = 1;
          return;
        }
        item.style.zIndex = 0;
        item.style.opacity = 0;
      })

      //=> 设置定时器，开始执行轮播图效果
      // this.autoTimer = setInterval(this.autoMove,this.autoplay);
      //setInterval(function(){},this.autoplay)  //这相当于一个回调函数。this指向window,需要使用bind预先改变this
      //=》开启自动轮播(自动轮播处理)
      if (this.autoplay) {
        let anonymous = this.autoMove.bind(this);
        this.autoTimer = setInterval(anonymous, this.autoplay); //bind预先改变this,此时this指向实例
        this.container.addEventListener('mouseenter', () => {
          clearInterval(this.autoTimer);
        });
        this.container.addEventListener('mouseleave', () => {
          this.autoTimer = setInterval(anonymous, this.autoplay);
        })
      }

      //=》分页器的处理
      if (this.pagination && this.pagination.el) {
        this.handlePagination();
      }

      //=》 前进和后退按钮的处理
      if (this.navigation) {
        this.handleButton();
      }

      //=> 钩子函数的处理
      // if(this.on){
      //   //=>初始化成功
      //   this.on.init && this.on.init();
      // }
      //简写：
      this.on && this.on.init && this.on.init.call(this, this); //改变this指向实例，同时把this当作值传递
    }
    /* === Banner.prototype ==== */
    /* initialParams：初始化插件参数配置信息  */
    initialParams(options) {
      //1.首先设置默认的参数信息
      let _default = {
        initialSlide: 0, //=> 初始化展示slide的索引
        speed: 300, //=> 切换动画的速度
        autoplay: 3000, //=> 每间隔3000ms自动切换一次
        pagination: { //=> 设置分页器
          el: '.pagination',
          //=> 焦点操作是否触发轮播图切换，不设置则为不触发，想要触发请给出触发事件类型
          tiggerEEvent: 'click'
        },
        navigation: { //=> 设置前进后退按钮
          nextEl: '.button-next',
          prevEl: '.button-prev',
          hide: true, //=> 默认是隐藏的，鼠标进入容器中才显示
        },
        //=> 设置生命周期函数（钩子函数）
        on: {
          //=> 初始化成功
          init: function (examp) {
            //=> this:当前创建的Banner类的实例
            //=> examp:等同于this
          },
          //=>切换动画运动开始
          transitionStart: function (examp) {},
          //=>切换动画运动完成
          transitionEnd: function (examp) {}
        }
      };
      //2.把传递进来的options中信息替换成_default中的信息（替换默认值）
      for (let key in options) {
        if (!options.hasOwnProperty(key)) break; //不是私有属性，跳出循环
        //i 不区分(ignore)大小写；
        if (/^(pagination|navigation|on)$/i.test(key)) continue; //结束本轮循环，继续执行下一个循环
        _default[key] = options[key];
      }
      //=> pagination处理
      let pagination = options.pagination; //判断是否有传递pagination，如果传了是个对象，没有传就是一个空对象
      if (pagination !== null) {
        pagination = pagination || {};
        for (let key in pagination) {
          if (!pagination.hasOwnProperty(key)) break;
          _default['pagination'][key] = pagination[key];
        }
      } else {
        _default['pagination'] = null;
      }

      //=>navigation
      //https://www.cnblogs.com/yuanxinghuo/p/7881366.html || 真前假后
      let navigation = options.navigation;
      if (navigation !== null) {
        navigation = navigation || {};
        for (let key in navigation) {
          if (!navigation.hasOwnProperty(key)) break;
          _default['navigation'][key] = navigation[key];
        }
      } else {
        _default['navigation'] = null;
      }

      //=> on 
      let _on = options.on;
      if (_on !== null) {
        _on = _on || {};
        for (let key in _on) {
          if (!_on.hasOwnProperty(key)) break;
          _default['on'][key] = _on[key];
        }
      } else {
        _default['on'] = null;
      }


      // let {
      //   navigation,
      //   on:_on = {} //起别名——on
      // } = options

      //3.把处理好的信息挂载到实例上
      for (let key in _default) {
        if (!_default.hasOwnProperty(key)) break;
        this[key] = _default[key];
      }

    }

    /* 实现轮播图切换 */
    change() {
      //  this:实例
      //let _this = this;
      //  [].forEach.call(this.slideList,function(item,index){
      //     // this:window =》 改进方法二：所以改成箭头函数，将this指向实例，而所有东西都是挂载在实例上
      //     // _this 使用外面的this指向实例 改进方法一
      //  });
      [].forEach.call(this.slideList, (item, index) => {
        if (index === this, this.activeIndex) {
          // => 当前项要操作的slide
          //webkitTransition 
          item.style.transition = `opacity ${this.speed}ms`;
          item.style.zIndex = 1;
          return;
        }
        //=> 其余slide
        item.style.transition = `opacity 0ms`;
        item.style.zIndex = 0;
      });
      //=> 开始动画
      //=> 动画开始前的钩子函数
      this.on && this.on.transitionStart && this.on.transitionStart.call(this, this); //第二个this=>examp
      let active = this.slideList[this.activeIndex];
      active.style.opacity = 1;
      active.addEventListener('transitionend', () => {
        //=>addEventListener： DOM2级事件绑定
        [].forEach.call(this.slideList, (item, index) => {
          if (index !== this.activeIndex) {
            item.style.opacity = 0;
          }
        })
      });
      //=> 动画结束后的钩子函数
      this.on && this.on.transitionEnd && this.on.transitionEnd.call(this, this);

      /* 焦点对齐 */
      if (this.paginationList) {
        [].forEach.call(this.paginationList, (item, index) => {
          if (index === this.activeIndex) {
            item.className = "active";
            return;
          }
          item.className = "";
        })
      }
    }

    /* 自动轮播 */
    autoMove() {
      this.activeIndex++;
      this.activeIndex >= this.count ? this.activeIndex = 0 : null;
      this.change(); //实例调用原型上的方法
    }

    /* 分页器的处理 */
    handlePagination() {
      //1.获取分页器盒子，动态创建内容
      this.paginationBox = this.container.querySelector(this.pagination.el); //传进来的选择器
      let str = ``;
      // new Array(this.count).fill(null).forEach() 也可以循环多少次
      for (let i = 0; i < this.count; i++) {
        str += `<span class="${i === this.activeIndex?'active':''}"></span>`;
      }
      this.paginationBox.innerHTML = str;
      this.paginationList = this.paginationBox.querySelectorAll('span');
      //2.是否焦点触发切换
      if (this.pagination.triggerEvent) {
        [].forEach.call(this.paginationList, (item, index) => {
          //给每个span绑定对应事件
          item.addEventListener(this.pagination.triggerEvent, Banner.throttle(() => {
            this.activeIndex = index;
            this.change();
          },500));
        })
      }
    }

    /* 前进后退按钮的处理 */
    handleButton() {
      //左按钮处理
      this.prevEl = this.container.querySelector(this.navigation.prevEl);
      this.prevEl.addEventListener('click', Banner.throttle(() => { //箭头函数，this指向上下文就是当前的实例
        this.activeIndex--;
        this.activeIndex < 0 ? this.activeIndex = this.count - 1 : null;
        this.change();
      },300));
      //右按钮处理
      this.nextEl = this.container.querySelector(this.navigation.nextEl);
      this.nextEl.addEventListener('click', Banner.throttle(this.autoMove.bind(this),300));

      //=》显示隐藏的处理
      if (this.navigation.hide) {
        //默认隐藏
        this.prevEl.style.display = 'none';
        this.nextEl.style.display = 'none';
        //鼠标划入的时候显示
        this.container.addEventListener('mouseenter', () => {
          this.prevEl.style.display = 'block';
          this.nextEl.style.display = 'block';
        })
        this.container.addEventListener('mouseleave', () => {
          this.prevEl.style.display = 'none';
          this.nextEl.style.display = 'none';
        })
      }
    }

    /* ===设置私有的属性和方法=== */
    static throttle(func,wait){
       let timer = null,
           result = null,
           previous = 0;
      return function anonymous(...args){
        let context = this,
            now = new Date,
            spanTime = wait - (now-previous);
        if(spanTime<=0){
          result = func.call(context,...args);
          clearTimeout(timer);
          timer = null;
          previous = now;
        }else if(!timer){
          timer = setTime(()=>{
            result = func.call(context,...args);
            timer = null;
            previous = new Date;
          },spanTime);
        }
        return result;
      }
    }
  }

  window.Banner = Banner;
}();

/* 使用 */
// let b = new Banner('#container1', {
//   speed: 300,
//   autoplay: 4000,
//   pagination: {
//     triggerEvent: null
//   }
// });
// b.slideList  //在外部获取


/* 
知识点：
  枚举属性(可枚举或者不可枚举)
  => 在for in遍历循环的时候，可以被迭代到的属性是可枚举的，反之是不可枚举的
  => 可枚举的：1.一般自己设置的私有属性和方法，或者设置的公有属性和方法都是可枚举的
              2. Object.defineProperty() 的enumerable可以设置是否可枚举
              //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
*/
/* Object.prototype.AAAA = '私有属性方法，可枚举';
let obj = {
  anme: 'xuexi',
  year: 20
  //_proto:Object.ptototype
};
for (let key in obj) {
  if (!obj.hasOwnProperty(key)) break;  //防止别人在内置原型上扩展方法
  console.log(key);
}
 */
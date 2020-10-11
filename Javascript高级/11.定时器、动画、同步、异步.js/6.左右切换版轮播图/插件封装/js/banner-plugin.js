/*
 * 细节知识点：
 *   1.我们封装公共方法的时候，如果需要传递的参数过多（超过两个就可以理解为多了），则不要定义为形参，让用户依次传递，这样会受到 顺序、传或者不传 等因素的影响，管理起来很复杂；我们可以把需要传递的值统一放到一个对象中（一般都是options），这样我们传递的信息可传可不传，顺序也随便，最后把传递的信息覆盖默认的信息即可，方便管理，也方便进行二次扩展
 *   
 *   2.我们把后期需要用到的信息都挂载到当前类的实例上，这样后面不管在哪个方法中用这些信息，只要能获取到实例，直接通过实例获取即可
 *   
 *   3.本插件中需要使用的工具类方法，我们一把放到类的私有属性上（普通对象）
 */

~ function () {
	/* Banner：渐隐渐现轮播图插件 */
	class Banner {
		constructor(selector, options = {}) {
			//=>参数初始化
			this.initialParams(options);

			//=>获取需要操作的容器
			if (!selector) throw new ReferenceError('The first selector parameter must be passed~~');
			if (typeof selector === "string") {
				this.container = document.querySelector(selector);
			} else if (selector.nodeType) {
				this.container = selector;
			}
			this.wrapper = this.container.querySelector('.wrapper');
			this.slideList = this.wrapper.querySelectorAll('.slide');
			this.autoTimer = null;
			this.activeIndex = this.initialSlide;
			this.count = this.slideList.length;

			//=>初始展示SLIDE
			[].forEach.call(this.slideList, (item, index) => {
				if (index === this.initialSlide) {
					item.style.zIndex = 1;
					item.style.opacity = 1;
					return;
				}
				item.style.zIndex = 0;
				item.style.opacity = 0;
			});

			//=>自动轮播处理
			if (this.autoplay) {
				let anonymous = this.autoMove.bind(this);
				this.autoTimer = setInterval(anonymous, this.autoplay);
				this.container.addEventListener('mouseenter', () => {
					clearInterval(this.autoTimer);
				});
				this.container.addEventListener('mouseleave', () => {
					this.autoTimer = setInterval(anonymous, this.autoplay);
				});
			}

			//=>分页器的处理
			if (this.pagination && this.pagination.el) {
				this.handlePagination();
			}

			//=>前进和后退按钮处理
			if (this.navigation) {
				this.handleButton();
			}

			//=>钩子函数的处理
			//=>初始化成功
			this.on && this.on.init && this.on.init.call(this, this);
		}
		/*===Banner.prototype===*/
		/*
		 * initialParams：初始化插件的参数配置信息
		 */
		initialParams(options) {
			//1.首先设置默认的参数信息
			let _default = {
				initialSlide: 0,
				speed: 300,
				autoplay: 3000,
				pagination: {
					el: '.pagination',
					triggerEvent: 'click'
				},
				navigation: {
					nextEl: '.button-next',
					prevEl: '.button-prev',
					hide: true
				},
				on: {
					init: function (examp) {},
					transitionStart: function (examp) {},
					transitionEnd: function (examp) {}
				}
			};
			//2.把传递进来的OPTIONS中的信息替换_DEFAULT中的信息
			for (let key in options) {
				if (!options.hasOwnProperty(key)) break;
				if (/^(pagination|navigation|on)$/i.test(key)) continue;
				_default[key] = options[key];
			}
			//=>pagination
			let pagination = options.pagination;
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

			//=>on
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

			//3.把处理好的信息挂载到实例上
			for (let key in _default) {
				if (!_default.hasOwnProperty(key)) break;
				this[key] = _default[key];
			}
		}

		/* 实现轮播图切换 */
		change() {
			[].forEach.call(this.slideList, (item, index) => {
				if (index === this.activeIndex) {
					//=>当前要操作的SLIDE
					item.style.transition = `opacity ${this.speed}ms`;
					item.style.zIndex = 1;
					return;
				}
				//=>其余的SLIDE
				item.style.transition = `opacity 0ms`;
				item.style.zIndex = 0;
			});
			//=>开始动画
			//=>动画开始前的钩子函数
			this.on && this.on.transitionStart && this.on.transitionStart.call(this, this);
			let active = this.slideList[this.activeIndex];
			active.style.opacity = 1;
			active.addEventListener('transitionend', () => {
				//=>addEventListener:DOM2级事件绑定
				[].forEach.call(this.slideList, (item, index) => {
					if (index !== this.activeIndex) {
						item.style.opacity = 0;
					}
				});
				//=>动画结束后的钩子函数
				this.on && this.on.transitionEnd && this.on.transitionEnd.call(this, this);
			});
			//=>焦点对齐
			if (this.paginationList) {
				[].forEach.call(this.paginationList, (item, index) => {
					if (index === this.activeIndex) {
						item.className = "active";
						return;
					}
					item.className = "";
				});
			}
		}

		/* 自动轮播 */
		autoMove() {
			this.activeIndex++;
			this.activeIndex >= this.count ? this.activeIndex = 0 : null;
			this.change();
		}

		/* 分页器处理 */
		handlePagination() {
			//=>获取分页器盒子，动态创建内容
			this.paginationBox = this.container.querySelector(this.pagination.el);
			let str = ``;
			for (let i = 0; i < this.count; i++) {
				str += `<span class='${i===this.activeIndex?'active':''}'></span>`;
			}
			this.paginationBox.innerHTML = str;
			this.paginationList = this.paginationBox.querySelectorAll('span');

			//=>是否焦点触发切换
			if (this.pagination.triggerEvent) {
				[].forEach.call(this.paginationList, (item, index) => {
					item.addEventListener(this.pagination.triggerEvent, Banner.throttle(() => {
						this.activeIndex = index;
						this.change();
					}, 500));
				});
			}
		}

		/* 前进后退按钮 */
		handleButton() {
			this.prevEl = this.container.querySelector(this.navigation.prevEl);
			this.prevEl.addEventListener('click', Banner.throttle(() => {
				this.activeIndex--;
				this.activeIndex < 0 ? this.activeIndex = this.count - 1 : null;
				this.change();
			}, 500));

			this.nextEl = this.container.querySelector(this.navigation.nextEl);
			this.nextEl.addEventListener('click', Banner.throttle(this.autoMove.bind(this), 500));

			//=>显示隐藏的处理
			if (this.navigation.hide) {
				this.prevEl.style.display = 'none';
				this.nextEl.style.display = 'none';
				this.container.addEventListener('mouseenter', () => {
					this.prevEl.style.display = 'block';
					this.nextEl.style.display = 'block';
				});
				this.container.addEventListener('mouseleave', () => {
					this.prevEl.style.display = 'none';
					this.nextEl.style.display = 'none';
				});
			}
		}

		/*===设置私有的方法===*/
		static throttle(func, wait) {
			let timer = null,
				result = null,
				previous = 0;
			return function anonymous(...args) {
				let context = this,
					now = new Date,
					spanTime = wait - (now - previous);
				if (spanTime <= 0) {
					result = func.call(context, ...args);
					clearTimeout(timer);
					timer = null;
					previous = now;
				} else if (!timer) {
					timer = setTimeout(() => {
						result = func.call(context, ...args);
						timer = null;
						previous = new Date;
					}, spanTime);
				}
				return result;
			}
		}
	}

	window.Banner = Banner;
}();


/* 
 * 枚举属性（可枚举或者不可枚举） 
 * =>在FOR IN遍历循环的时候，可以被迭代到的属性是可枚举的，反之是不可枚举的
 * =>可枚举的：
 * 1. 一般自己设置的私有属性和方法 或者 自己设置的公有属性和方法 都是可枚举的
 */
/* Object.prototype.AAA = "珠峰培训";
let obj = {
	name: '珠峰',
	year: 10
	// __proto__:Object.prototype
};
for (let key in obj) {
	if (!obj.hasOwnProperty(key)) break;
	console.log(key);
} */
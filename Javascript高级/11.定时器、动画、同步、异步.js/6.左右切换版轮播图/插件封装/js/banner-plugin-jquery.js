/*
 * JQUERY：extend  向JQ内部扩展方法
 *    //=>向JQ的原型上扩展方法[写插件]
 *    $.fn.extend({ xxx:function(){} }) 
 *    $('.box').xxx();
 *    
 *    //=>向JQ对象中增加私有的属性方法[完善类库,提供更多工具类方法]
 *    $.extend({ xxx:function(){} })
 *    $.xxx();
 */
~ function ($) {
	if (typeof $ === 'undefined') {
		//=>throw new Error() 抛出浏览器异常信息,此时下面代码不在执行
		throw new Error('当前插件必须依托JQUERY才可以实现~~');
	}

	//=>THROTTLE:函数节流
	function throttle(func, wait) {
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

	//=>BANNER-PLUGIN:只封装和轮播图相关的功能（自动轮播、焦点触发、左右按钮）
	function bannerPlugin() {
		//=>this:要实现轮播图的容器(原生JS对象)
		let $this = $(this),
			$wrapper = $this.find('.wrapper'),
			$pagination = $this.find('.pagination'),
			$buttonPrev = $this.find('.button-prev'),
			$buttonNext = $this.find('.button-next'),
			$slideList = $wrapper.find('.slide'),
			$paginationList = $pagination.find('span');

		let autoTimer = null,
			interval = 1000,
			speed = 300,
			activeIndex = 0,
			count = $slideList.length;

		let change = function () {
			let $active = $slideList.eq(activeIndex),
				$siblings = $active.siblings();
			$active.css('transition', `opacity ${speed}ms`);
			$siblings.css('transition', `opacity 0ms`);
			$active.css('z-index', 1);
			$siblings.css('z-index', 0);
			$active.css('opacity', 1).on('transitionend', function () {
				$siblings.css('opacity', 0);
			});

			//=>焦点对齐
			$paginationList.each((index, item) => {
				let $item = $(item);
				if (index === activeIndex) {
					$item.addClass('active');
					return;
				}
				$item.removeClass('active');
			});
		};

		let autoMove = function () {
			activeIndex++;
			activeIndex >= count ? activeIndex = 0 : null;
			change();
		};

		let handlePagination = function () {
			$paginationList.mouseover(throttle(function () {
				activeIndex = $(this).index();
				change();
			}, 500));
		};

		let handleButton = function () {
			$buttonNext.click(throttle(autoMove, 300));
			$buttonPrev.click(throttle(function () {
				activeIndex--;
				activeIndex < 0 ? activeIndex = count - 1 : null;
				change();
			}, 500));
		};

		autoTimer = setInterval(autoMove, interval);
		handlePagination();
		handleButton();
		$this.mouseenter(() => clearInterval(autoTimer))
			.mouseleave(() => autoTimer = setInterval(autoMove, interval));
	}


	$.fn.extend({
		//=>bannerPlugin:bannerPlugin
		bannerPlugin
	});
}(jQuery);
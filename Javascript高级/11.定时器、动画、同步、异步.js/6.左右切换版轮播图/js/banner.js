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

function debounce(func, wait, immediate) {
	let timer = null,
		result = null;
	return function anonymous(...args) {
		let context = this,
			now = immediate && !timer;
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			!immediate ? result = func.call(context, ...args) : null;
		}, wait);
		now ? result = func.call(context, ...args) : null;
		return result;
	}
}


let bannerModule = (function () {
	let $container = $('.container'),
		$wrapper = $container.find('.wrapper'),
		$pagination = $container.find('.pagination'),
		$buttonPrev = $container.find('.button-prev'),
		$buttonNext = $container.find('.button-next'),
		$slideList = null,
		$paginationList = null;

	let autoTimer = null,
		interval = 1000,
		speed = 300,
		activeIndex = 0,
		count = 0;

	//=>queryData：获取数据
	let queryData = function (callBack) {
		$.ajax({
			url: 'json/bannerData1.json',
			method: 'get',
			async: true,
			success: result => {
				// typeof callBack === 'function' ? callBack() : null;
				callBack && callBack(result);
			}
		});
	};

	//=>bindHTML：数据绑定
	let bindHTML = function (data) {
		let str1 = ``,
			str2 = ``;
		data.forEach((item, index) => {
			str1 += `<div class="slide">
				<img src="${item.pic}" alt="">
			</div>`;

			str2 += `<span class="${index===0?'active':''}"></span>`;
		});
		$wrapper.html(str1);
		$pagination.html(str2);

		//=>获取结构内容
		$slideList = $wrapper.children('.slide');
		$paginationList = $pagination.children('span');
	};

	//=>autoMove：自动轮播
	let change = function () {
		let $active = $slideList.eq(activeIndex),
			$siblings = $active.siblings();
		//基于CSS3中的TRANSITION实现动画
		$active.css('transition', `opacity ${speed}ms`);
		$siblings.css('transition', `opacity 0ms`);
		$active.css('z-index', 1);
		$siblings.css('z-index', 0);
		$active.css('opacity', 1).on('transitionend', function () {
			//=>transitionend：当CSS3过渡动画结束后触发的事件，特殊注意的是，如果是多个样式执行了过渡效果，则当前事件被触发多次
			$siblings.css('opacity', 0);
		});
		autoFocus();
	};
	let autoMove = function () {
		//1.每一次进来步长累加，累加到超过边界，则从头开始
		activeIndex++;
		activeIndex >= count ? activeIndex = 0 : null;
		//2.实现切换
		change();
	};

	//=>autoFocus：焦点对齐
	let autoFocus = function () {
		$paginationList.each((index, item) => {
			let $item = $(item);
			if (index === activeIndex) {
				$item.addClass('active');
				return;
			}
			$item.removeClass('active');
		});
	};

	//=>handlePagination：给焦点绑定触发的事件
	let handlePagination = function () {
		$paginationList.mouseover(throttle(function () {
			activeIndex = $(this).index();
			change();
		}, 500));
	};

	//=>handleButton：点击左右按钮实现切换
	let handleButton = function () {
		$buttonNext.click(throttle(autoMove, 300));
		$buttonPrev.click(throttle(function () {
			activeIndex--;
			activeIndex < 0 ? activeIndex = count - 1 : null;
			change();
		}, 500));
	};

	return {
		init() {
			//=>AJAX采用异步编程，我们需要在获取到数据后，才能进行数据绑定，轮播图处理等事情，此时我们可以基于回调函数来完成这件事情
			queryData(function anonymous(data) {
				//=>DATA就是从服务器获取的数据
				bindHTML(data);
				count = data.length;
				autoTimer = setInterval(autoMove, interval);
				handlePagination();
				handleButton();
			});

			$container.mouseenter(function () {
				clearInterval(autoTimer);
			}).mouseleave(function () {
				autoTimer = setInterval(autoMove, interval);
			});
		}
	}
})();
bannerModule.init();
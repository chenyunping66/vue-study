let $container1 = $('#container1'),
	$container2 = $('#container2');

//=>第一个轮播图数据绑定
$.ajax({
	url: '../../json/bannerData1.json',
	method: 'get',
	success: result => {
		let str1 = ``;
		result.forEach((item, index) => {
			str1 += `<div class="slide">
				<img src="${item.pic}" alt="">
			</div>`;
		});
		$container1.find('.wrapper').html(str1);

		//=>实现轮播效果
		// $container1.bannerPlugin();	
		new Banner('#container1', {
			initialSlide: 3,
			autoplay: 2000,
			pagination: {
				triggerEvent: 'mouseover'
			},
			navigation: null,
			on: {
				/* init: function () {
					console.log('初始化成功了');
				},
				transitionStart: function () {
					console.log('动画开始~~');
				}, */
				transitionEnd: function (examp) {
					//=>this===examp===实例
					// let active = this.slideList[this.activeIndex];
					// active.innerHTML += `<span>我是第${this.activeIndex+1}个SLIDE</span>`;
				}
			}
		});
	}
});

//=>第二个轮播图数据绑定
$.ajax({
	url: '../../json/bannerData2.json',
	method: 'get',
	success: result => {
		let str1 = ``;
		result.forEach((item, index) => {
			str1 += `<div class="slide">
				<img src="${item.pic}" alt="">
			</div>`;
		});
		$container2.find('.wrapper').html(str1);

		//=>实现轮播效果
		// $container2.bannerPlugin();
		new Banner('#container2', {
			autoplay: null,
			pagination: null
		});
	}
});
/* let $imgBox = $('.imgBox'),
	$img = $imgBox.children('img'),
	$window = $(window);

//=>JQ中的事件绑定支持多事件绑定：window.onload & window.onscroll 两个事件触发的时候执行相同的事情
$window.on('load scroll', function () {
	if ($img.attr('isLoad') === 'true') {
		//=>之前加载过则不会重新加载
		return;
	}
	let $A = $imgBox.outerHeight() + $imgBox.offset().top,
		$B = $window.outerHeight() + $window.scrollTop();
	if ($A <= $B) {
		//=>加载真实图片
		$img.attr('src', $img.attr('data-img'));
		$img.on('load', function () {
			//=>加载成功：fadeIn是JQ中的渐现动画
			// $img.css('display', 'block');
			$img.stop().fadeIn();
		});
		$img.attr('isLoad', true); //=>ATTR存储的自定义属性值都是字符串"true"
	}
}); */

let $container = $('.container'),
	$imgBoxs = null,
	$window = $(window);

//=>造点假数据 new Array(20).fill(null)创建长度为20的数组，每一项用null填充
let str = ``;
new Array(20).fill(null).forEach(item => {
	str += `<div class="imgBox">
		<img src="" alt="" data-img="http://www.zhufengpeixun.cn/main/img/banner10.png">
	</div>`;
});
$container.html(str);
$imgBoxs = $container.children('.imgBox');

//=>多张图片延迟加载
$window.on('load scroll', function () {
	//$B:获取浏览器底边框距离BODY的距离
	let $B = $window.outerHeight() + $window.scrollTop();
	//循环每一个图片区域，根据自己区域距离BODY的距离，计算出里面的图片是否加载
	$imgBoxs.each((index, item) => {
		let $item = $(item),
			$itemA = $item.outerHeight() + $item.offset().top,
			isLoad = $item.attr('isLoad');
		if ($itemA <= $B && isLoad !== 'true') {
			$item.attr('isLoad', true);
			//加载当前区域中的图片
			let $img = $item.children('img');
			$img.attr('src', $img.attr('data-img'));
			$img.on('load', () => $img.stop().fadeIn());
		}
	});
});
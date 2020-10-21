/* let cartModule = (function ($) {
	let $btns = $('.list i'),
		$counts = $('.list em'),
		$strongs = $('.list strong'),
		$ems = $('.info em');

	//=>实现加号减号的点击事件
	function handleClick() {
		$btns.click(function () {
			let $this = $(this),
				n = $this.index(); //=>JQ中的INDEX获取的是元素在兄弟结构中的索引
			//=>根据点击按钮，获取当前行中：存储数字、单价、总价这几个元素
			let $par = $this.parent(),
				$count = $par.children('em'),
				$strongs = $par.find('strong'),
				$price = $strongs.eq(0), //=>eq获取的依然是JQ对象,get获取的是JS对象
				$total = $strongs.eq(1);
			//=>0减号 2加号 根据点击的加减号，计算出最新购买的数量
			let x = parseFloat($count.html());
			if (n === 0) {
				x--;
				x < 0 ? x = 0 : null;
			} else {
				x++;
				x > 10 ? x = 10 : null;
			}
			$count.html(x);
			//=>获取单价计算总价
			$total.html(parseFloat($price.html()) * x + '元');
			//=>计算总信息
			computed();
		});
	}

	//=>计算总信息
	function computed() {
		let allCount = 0,
			allMoney = 0,
			allPrice = [];
		//=>计算总购买数
		$counts.each((index, item) => {
			allCount += parseFloat($(item).html());
		});
		$ems.eq(0).html(allCount);

		//=>计算总价格和最高单价
		$strongs.each((index, item) => {
			let itemVal = parseFloat($(item).html());
			if (index % 2 === 1) {
				allMoney += itemVal;
			} else {
				//=>只有购买了才进入比较的序列
				if (parseFloat($(item).next('strong').html()) !== 0) {
					allPrice.push(itemVal);
				}
			}
		});
		$ems.eq(1).html(allMoney);
		$ems.eq(2).html(Math.max(...allPrice));
	}

	return {
		init() { //=>init:function(){}
			handleClick();
		}
	}
})(jQuery);

cartModule.init(); */

//==========================================
let cartModule = (function ($) {
	let $list = $('.list'),
		$info = $('.info'),
		$btns = null;

	//=>准备数据模型（页面就是按照数据模型渲染出来的）
	let _DATA = [{
		id: 1,
		count: 0,
		price: 12.5,
		total: 0
	}, {
		id: 2,
		count: 0,
		price: 10.5,
		total: 0
	}, {
		id: 3,
		count: 0,
		price: 8.5,
		total: 0
	}, {
		id: 4,
		count: 0,
		price: 8,
		total: 0
	}, {
		id: 5,
		count: 0,
		price: 14.5,
		total: 0
	}];

	//=>render:按照数据模型渲染视图
	function render() {
		//渲染操作区域视图
		let str = ``;
		$.each(_DATA, (index, item) => {
			let {
				count,
				price,
				total,
				id
			} = item;
			str += `<li>
				<i group="${id}"></i>
				<em>${count}</em>
				<i group="${id}"></i>
				<span>
					单价：<strong>${price}元</strong>
					小计：<strong>${total}元</strong>
				</span>
			</li>`;
		});
		$list.html(str);

		//渲染总计信息区视图
		let counts = 0,
			totals = 0,
			maxprice = 0;
		_DATA.forEach(item => {
			counts += item.count;
			totals += item.total;
			//=>购买才进入最高价格的计算
			if (item.count > 0) {
				maxprice < item.price ? maxprice = item.price : null;
			}
		});
		$info.html(`<span>商品公合计：<em>${counts}</em>件</span>
		<span>共花费了：<em>${totals}</em>元</span>
		<span>其中最贵的商品单价是：<em>${maxprice}</em>元</span>`);

		//执行事件绑定
		handle();
	}

	//=>handle:点击按钮操作（不操作DOM，只改变_DATA的数据）
	function handle() {
		$btns = $list.find('i');
		$btns.click(function () {
			let $this = $(this),
				n = $this.index(),
				group = parseFloat($this.attr('group'));
			//修改数据
			_DATA = _DATA.map(item => {
				if (item.id === group) {
					if (n === 0) {
						item.count--;
						item.count < 0 ? item.count = 0 : null;
					} else {
						item.count++;
						item.count > 10 ? item.count = 10 : null;
					}
					item.total = item.price * item.count;
				}
				return item;
			});
			//重新渲染
			render();
		});
	}

	return {
		init() {
			render();
		}
	}
})(jQuery);

cartModule.init();
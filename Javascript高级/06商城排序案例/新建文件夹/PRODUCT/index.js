let filterModule = (function () {
	//=>准备两组数据
	let _SELECT = [{
		type: 1,
		name: '苹果'
	}];
	let _DATA = [{
		type: 1,
		text: '品牌',
		content: ["苹果", "小米", "锤子", "魅族", "华为", "三星", "OPPO", "vivo", "乐视", "360", "中兴", "索尼"]
	}, {
		type: 2,
		text: '尺寸',
		content: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
	}, {
		type: 3,
		text: '系统',
		content: ["安卓", "苹果", "微软", "无", "其他"]
	}, {
		type: 4,
		text: '网络',
		content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"]
	}];

	//=>需要操作的元素
	let $typeBox = $('#type'),
		$chooseBox = $('#choose');

	//=>根据数据渲染视图
	function render() {
		//=>待选区
		let str = ``;
		_DATA.forEach(item => {
			let {
				type,
				text,
				content
			} = item;
			str += `<li _type="${type}">
				${text}：
				${content.map(A=>{
					return `<a href="javascript:;">${A}</a>`;
				}).join('')}
			</li>`;
		});
		$typeBox.html(str);

		//=>选择区（绑定之前先根据TYPE排序）
		str = `你的选择:`;
		_SELECT.sort((A, B) => A.type - B.type);
		_SELECT.forEach(item => {
			str += `<mark>
				${item.name}
				<a href="javascript:;" _type="${item.type}">X</a>
			</mark>`;
		});
		$chooseBox.html(str);

		//=>渲染完绑定事件
		handle();
		handleSelect();
	}

	//=>待选取绑定点击事件
	function handle() {
		$typeBox.find('a').click(function () {
			let $this = $(this),
				obj = {};
			//=>构建存储的内容
			obj.type = parseFloat($this.parent().attr('_type'));
			obj.name = $this.text().trim();

			//=>点击谁就把谁存储到_SELECT中
			//1.存储之前，先看看原有数组中是否存在TYPE和当前存储这一项相同的，有相同的就要干掉它（同一个类别只能存储一个）
			_SELECT.forEach((item, index) => {
				if (item.type === obj.type) {
					_SELECT.splice(index, 1);
				}
			});
			_SELECT.push(obj);

			//=>重新渲染
			render();
		});
	}

	//=>已选区绑定点击事件
	function handleSelect() {
		//=>点击的时候在_SELECT中删除这一项
		$chooseBox.find('a').click(function () {
			let $this = $(this),
				_type = parseFloat($this.attr('_type'));
			_SELECT.forEach((item, index) => {
				if (item.type === _type) {
					_SELECT.splice(index, 1);
				}
			});
			render();
		});
	}

	return {
		init() {
			render();
		}
	}
})();
filterModule.init();
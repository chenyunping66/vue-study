 ~ function () {
   /* 闭包：防止和别人的代码冲突 */

   /* 第一步：从服务器获取需要展示的数据，然后绑定在页面中 */
   // 1.基于AJAX获取服务器端的数据，把数据存储到data中

   // 1.1创建AJAX的实例
   let DATA = null; //data存储数据的
   let xhr = new XMLHttpRequest; //XMLHttpRequest是ajax请求的内置类
   // 1.2打开一个请求的链接，基于GET请求和同步编程完成
   xhr.open('GET', 'json/product.json', false); //false表示同步
   // 1.3监听服务器返回的状态信息（在http状态码为200，请求状态为4的时候能拿到数据）
   xhr.onreadystatechange = function () {
     if (xhr.status === 200 && xhr.readyState === 4) {
       //  基于responseText获取响应回来的信息
       DATA = xhr.responseText; //（JSON字符串）
     }
   };
   // 1.4发送AJAX请求
   xhr.send();
   // console.log(DATA);  
   // 把获取的JSON字符串转换为对象
   DATA = JSON.parse(DATA);
   // console.log(DATA[1]['id']); //2

   /* 第二大步骤：.把获取的数据展示在页面当中 */
   // 根据获取的DATA：DATA当中有多少项，我就创建出多少个card盒子
   // （项目中为了性能优化都是基于字符串拼接的方法，把需要创建的card拼出来）
   // let htmlStr = '';
   let htmlStr = ``;
   DATA.forEach((item) => {
     // htmlStr += '<div class="card-body">';
     // htmlStr += '<img src="'+item.img+'" class="card-img-top" alt="">';

     // item是每一项（对象），包含需要展示的每一个产品详情信息：我们需要拿出每一项信息来展示到页面中（拼接到模板字符串中）
     let {
       id,
       // id=0  赋值默认值
       title,
       price,
       hot,
       time,
       img
     } = item; //基于解构赋值获取信息
     // 我们需要的数据绑定在元素card的自定义属性DATA-XXX上，后续需要直接基于自定义属性获取即可
     htmlStr += ` <div class="card"
                      data-price="${price}"
                      data-hot="${hot}"
                      data-time="${time}">
    <img src="${img}" class="card-img-top" alt="">
    <div class="card-body">
      <h6 class="card-title">${title}</h6>
      <p class="card-text">价格：￥${price}</p>
      <p class="card-text">好评：${hot}</p>
      <p class="card-text"><small class="text-muted">上架时间:${time}</small></p>
    </div>
    </div>`;
     // console.log(htmlStr);
   });
   //把拼接好的字符串放到页面指定容器中（card-deck）
   let cardDeck = document.querySelector('.card-deck'); //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
   cardDeck.innerHTML = htmlStr; //nnerHTML 属性设置或返回表格行的开始和结束标签之间的 HTML。

   /* 第三大步骤：点击价格/热度/时间，可以把内容按照升降序排列 */
   //1.想操作谁，先获取谁（三个排序按钮）和所有的card产品内容
   let navList = document.querySelectorAll('.navbar-nav li');
   //    querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象。
   // NodeList 对象表示节点的集合。可以通过索引访问，索引值从 0 开始。
   cardList = document.querySelectorAll('.card');
   // console.log(cardList)
   // 给所有的按钮绑定点击事件，点击的时候按照指定的规则排序
   for (let i = 0; i < navList.length; i++) {
     let item = navList[i];
     item['data-type'] = -1; //控制升降序的自定义属性
     item.onclick = function () {
       //  点击当前的某个按钮，让其按照升降序切换，而其余的都用过回归原始-1
       //  [].forEach.call(navList,item) 将navList类数组改为数组，接用[]数组上的foreach方法
       //  [].forEach.call(navList, item => {
       //    if (item === this) {
       //      // 当前按钮继续按照升序切换
       //      this['data-type'] *= -1;
       //    } else {
       //      //其余都变成-1
       //      item['data-type'] = -1;
       //    }
       //   // 优化为三元运算符,再用es6箭头函数的简写方式简化
       //  })
       [].forEach.call(navList, item => (item === this ? this['data-type'] *= -1 : item['data-type'] = -1));
       //  this['data-type'] *= -1;
       cardList = [].slice.call(cardList, 0); //类数组转换成数组
       cardList.sort((next, current) => {
         //获取当前按钮记录的排序方式data-time/data-price/data-hot
         let btnSort = this.getAttribute('data-sort');
         current = current.getAttribute(btnSort);
         next = next.getAttribute(btnSort);
         if (btnSort === 'data-time') {
           //  获取日期数据：我们要把字符串中的“-”去掉
           current = current.replace(/-/g, '');
           next = next.replace(/-/g, '');
         }
         return (next - current) * this['data-type'];
       });
       cardList.forEach(item => {
         cardDeck.appendChild(item);
       });
     }
   }

 }();



 //    //2.先实现按照价格的升序排序 navList[1]:价格
 //    //设置data-type自定义属性，记录排序的状态（1升序，-1降序）
 //    // navList[1].setAttribute('data-type',-1); 
 //    navList[1]['data-type'] = -1;
 //    navList[1].onclick = function () {
 //      // 控制升降序切换
 //      this['data-type'] *= -1;
 //      // cardList 是一个元素集合，是一个类数组，不能用sort
 //      // 2.1 把类数组转换为数组，目的是为了使用sort进行排序
 //      //  cardList = [...cardList]; //方法一
 //      cardList = Array.prototype.slice.call(cardList, 0); //方法二
 //      // 2.2 进行排序（按照每个产品中的价格进行升序）
 //      // current:当前项 next:下一项
 //      cardList.sort((next, current) => {
 //        // next/current存储的是每个元素的对象（此时我们需要使用每个元素的价格：在绑定的时候，
 //        //  我们就把价格等信息绑定给当前元素的某个自定义属性，此时需要用的时候，直接基于自定义属性的方法获取即可）
 //        //  什么时候使用自定义属性？（之前知道值，后面想用的时候，把它存起来，后面就可以直接使用）
 //        current = current.getAttribute('data-price'); //getAttribute() 方法返回指定属性名的属性值。
 //        next = next.getAttribute('data-price');
 //        // return next-current;  //只是升序
 //        return (next - current) * this['data-type']; //升降序  this:当前操作的上下文
 //      });
 //      // console.log(cardList);
 //      // 以上只是让数据排好序，但是页面中结构还没有改，我们需要按照当前的执行顺序，把每一个card重新增加到容器里才可以
 //      cardList.forEach(item => {
 //        cardDeck.appendChild(item); //appendChild() 方法向节点添加最后一个子节点。
 //      });
 //    }

 //  }();
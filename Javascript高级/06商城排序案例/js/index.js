~ function () {
  /* 1.从服务器获取需要展示的数据 */
  let DATA = null;
  xhr = new XMLHttpRequest;
  xhr.open('GET', 'json/product.json', false);
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      DATA = xhr.responseText;
    }
  };
  xhr.send();
  DATA = JSON.parse(DATA);

  /* 2.把获取的数据展示在页面当中 */
  let htmlStr = ``;
  DATA.forEach(item => {
    let {
      id,
      title,
      price,
      hot,
      time,
      img
    }  = item;
    htmlStr += `
    <div class="card"
         data-price="${price}"
         data-hot="${hot}"
         data-time="${time}">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
          <h6 class="card-title">${title}</h6>
          <p class="card-text">价格：￥${price}</p>
          <p class="card-text">好评：${hot}</p>
          <p class="card-text"><small class="text-muted">上架时间：${time}</small></p>
        </div>
      </div>
    `;
  })
  let cardDeck = document.querySelector('.card-deck');
  cardDeck.innerHTML = htmlStr;
  
  /* 第三大步骤：点击价格/热度/时间，可以把内容按照升降序排列  */
  let navList = document.querySelectorAll('.navbar-nav li');
       cardList = document.querySelectorAll('.card');
  // for(let i =0;i<navList.length;i++){}
  // for (let i = 0; i < navList.length; i++) {
  //   let item = navList[i];
  navList.forEach(item => {
    item['data-type'] = -1;
    item.onclick = function(){
      [].forEach.call(navList,item => (item === this?this['data-type']*= -1 :item['data-type'] =-1))
      cardList = [].slice.call(cardList,0);
      cardList.sort((next,current) =>{
        let btnSort = this.getAttribute('data-sort');
             current = current.getAttribute(btnSort);
             next = next.getAttribute(btnSort);
        if(btnSort === 'data-time'){
          current = current.replace(/-/g,'');
          next = next.replace(/-/g,'');
        }
        return [next-current] * this['data-type'];
      });
      cardList.forEach(item=>{
        cardDeck.appendChild(item);
      })
    }
     
  })
}();
$.ajax({
  url:'http://127.0.0.1:8001/list',
  // method:'get',
  type: 'GET',
  dataType: 'jsonp',
  // dataType:'jsonp', // => 执行的是JSONP的请求
  success:res=>{
      console.log(res);
  }
});
let express = require('express');
app = express();
app.listen(8001, _ => {
  //_=> es6写法占位
  console.log('OK！');
});
app.get('/list', (req, res) => {
  // {callback} 解构对象  = Funtion.prototype 赋值一个匿名空函数
  // Function.prototype 属性存储了 Function 的原型对象。
  let {
    callback = Funtion.prototype
  } = req.query;
  let data = {
    code:0,
    message:'温故而知新'
  };
  res.send(`${callback}(${JSON.stringify(data)})`);
});

// run code
let express = require('express');
app = express();
app.listen(1001, _ => {
  //_=> es6写法占位
  console.log('OK111！');
});
app.use(express.static('./'));

// run code
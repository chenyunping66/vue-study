let express = require('express');
app = express();
app.listen(1002, _ => {
  //_=> es6写法占位
  console.log('OK222！');
});
app.use(express.static('./'));

// run code
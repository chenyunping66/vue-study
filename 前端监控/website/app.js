const koa = require('koa');
const serve = require('koa-static');

const app = new koa();
const port = 3003;

// app.use((c)=>{c.body = 123;})
app.use((c)=>c.body = 123)



// https://www.npmjs.com/package/koa-static
app.use(serve(__dirname + '/client'));


app.listen(port,()=>{
  console.log(`${port} is listen`);
});
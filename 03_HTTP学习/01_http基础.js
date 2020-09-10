
  // tcp特点：安全，可靠（三次握手 4次断开） 不会丢数据
  // 应用层学习重点：
  //     1.http, ftp, dns 都是应用层，基于传输层，新增了很多报文
  //        1）http豹纹分类：请求行报文，请求头报文，请求体报文
  //           curl -v http://www.baidu.com 在命令行中查看百度的报文
  //        2）Restful风格 是对接接口操作的一种风格
  //            操作资源的方式如： get     /users #查询用户信息列表
  //                              get     /users/1001 #查询某个用户信息
  //                              post    /users  #新建用户信息
  //                              put     /users/1001 #更新用户信息（全部字段）
  //                              delete  /users/1001 #删除用户信息
  //          请求方法: get(获取资源)，post(新增资源)， put（上传资源）， delete, 
  //                   options(跨域请求资源的时候，非简单请求时候才会出现（get和post都是基本简单请求+自定义的头信息，put delete属于非简单请求）) 
  //       3)状态码： 1xxx   2xxx  3xx   4xxx  5xxx
  //                 常见的1xxx有: websocket
  //                       2xxx有：200（表示成功，没有问题）/ 206（分段传输） /  204（没有响应体）      
  //                       3xxx有：301（永久重定向）/ 302（临时重定向）/ 304（服务端缓存） / 306，307 
  //                       4xxx有：400 （参数错误） / 401 (没有权限访问) / 403（没有权限访问） / 404 （找不到） / 405 （方法不允许） 
  //                       5xxx有：500 （服务器错误）/ 502 （负载均衡问题） 
  //      4）req代表客户端。res代表服务端
          // 5）url路径几部分组成:协议/端口/用户名/命名

      
      // 使用node写一个服务
      const http = require('http');
      const url = require('url'); //专门用来解析url路径的
      // url路径，几部分组成
      let str = 'http://username:password@www.baidu.com:80/source?query=1#app';
      // console.log(url.parse(str)); //字符串转成对象  将路径解析成对象
      console.log(url.parse(str,true))  //true将字符串转成对象
      // Url {
      //   protocol: 'http:',            // 协议
      //   slashes: true,               //  当前的//
      //   auth: 'username:password',   // 作者
      //   host: 'www.baidu.com:80',   // 用户名
      //   port: '80',                 //端口
      //   hostname: 'www.baidu.com',  //
      //   hash: '#app',                //
      //   search: '?query=1',          //
      //   query: 'query=1',          //
      //   pathname: '/source',       //
      //   path: '/source?query=1',   //
      //   href:
      //    'http://username:password@www.baidu.com:80/source?query=1#app' }
      // server start 3000
      const querystring = require('querystring');
const { ok } = require('assert');
      console.log(querystring.parse('a=1&b=2'));  //将字符串转成对象  // [Object: null prototype] { a: '1', b: '2' }
      console.log(querystring.parse('a=1*b=2','*','=')); //[Object: null prototype] { a: '1', b: '2' }
      //1.使用http模块 1.创建请求  2.接收请求
      let server = http.createServer(function (req, res) { //当前请求到来的时候会执行此方法
        //node中的代码是单线程的，尽量使用异步，不然会造成堵塞,阻塞运行，尽量不要使用cpu密集型操作，外面可以用同步
        // req代表客户端。res代表服务端
        // console.log(req.url) //很多数据
        // ------------------------------请求行--------------------------------------------
        // let 拿到pathname,query 路径还有
        let {pathname,query} = url.parse(req.url,true);
        console.log(pathname,query) //[Object: null prototype] {}
        // 拿协议版本号
        let httpVersion = req.httpVersion;
        console.log(httpVersion); //1.1
        //拿请求方法
        let method = req.method.toLowerCase();
        console.log(method)    //get
        // ------------------------------请求头 Request headres-----------------------------------------------------
        let headers = req.headers; //所有的header信息都是小写的，key/value的对象类型
        console.log(headers);  //需要访问localhost:3000才会打印在控制台上
        // ---------------------------------获取请求体的结果，它是可读流---------------------------------------------------------------------
        // cur -X POST / POSTMAN
        let arr = [];
        req.on('data',function (chunk){ //tcp分段 保证有请求数据，才能获取
          arr.push(chunk);
        });
        req.on('end',function() {
          console.log(req.headers);
          // 在对后端程序进行测试的时候,需要进行模拟连接或者书写测试脚本.curl是一个很棒的命令.
           //测试一表单数据格式： 往服务器发送一个数据请求(在cmd输入) curl -X POST --data "a=1&b=2" localhost:3000
           //或者 curl -X POST --data a=1 localhost:3000
           //接收到的格式为：'content-type': 'application/x-www-form-urlencoded' 
          //测试二json数据： 在postman发送一个自己写的row的参数{"name":"cyp"},测试
          //json的话接收结果为：'content-type': 'application/json',
          console.log(Buffer.concat(arr).toString(),'end');

          // 取出参数的值
          let content = Buffer.concat(arr).toString(); //a=1&b=2
          if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            content = querystring.parse(content);  //查询字符串
          }else if(req.headers['content-type'] === 'application/json'){
            content = JSON.parse(content);
          }
          res.statusCode = 404; //可以自己设置，但是必须要合法
          res.setHeader('a','1');
          res.setHeader('b','9');
          res.setHeader('Content-Type','text/plain;charset=utf-8'); //纯文本，charset=utf-8否则IE不兼容。解决乱码问题
          //实体头信息 contenttype对照表：https://tool.oschina.net/commons/
          // res.end(content.a); //表示当前响应结束 res是一个可写流
          // res.write('content.a');    //取出a的值
          res.end('结束');  //http://localhost:3000/xxx?a=1
        })
        // 模拟同步请求操作
        //   if(req.url === '/'){ //客户端获取路径
      //     // 单线程案例
      //     let sum = 0;
      //     for(let i = 0;i<10000000;i++){
      //       sum  += i;
      //     }
      //     res.end('end'+sum)
      //   }
      //   if(req.url === '/xxx'){
      //     // 在浏览器直接输入localhost:3000，就可以打印处理end(res.end('end');)
      //     res.end('end'); //可写流
      //  }
        
      });

      // 2.监听一个ip地址，端口号
      let port = 3000;
      server.listen(3000,function(){
        console.log('server start ' + port)
      });
      // 一个服务器，只能有一个对应的使用端口
      server.on('error',function(error){
        console.log(error);
        if(error.errno === 'EADDRINUSE'){//如果端口被占用，直接重新监听新的端口号即可
          // 实时订阅模式
          server.linsten(++port)
        }
      })
      // 3.启动服务器 node 01_http基础.js

      // 每次更改服务端代码，都需要重新启动服务器
      // nodemon 可以实现代码重新启动，可以指定哪个文件变化了，自动重启。文件变化的时候，重新链接
      //1.npm install -g nodemon
      // 2.nodemon 01_http基础.js

      // 总结：从请求到响应，包过响应头的接收说完了。


      // 图片
      // req代表客户端。res代表服务端

    //   客户端                       |服务器（ip地址,端口）
    // --------------------------------------------------
    //   请求行：        >>>>>req.xxx | 响应行：
    //   post index.html HTTP/1.1     |     http/1.1 ok
    // ---------------------------------------------------
    //   请求头：                      |响应头：
    //   content-type：               |     content-type
    //   applicantion/json            |     content-length
    // ----------------------------------------------------
    //  请求体                      |
    //  {name:"cyp"}    res.xxx <<<<<<|
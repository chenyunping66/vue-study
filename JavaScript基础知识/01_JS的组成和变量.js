/* 
*
*Javascript中的变量和数据类型
* Javascript是由三部分组成的：
*     1.ECMScript(ES):描述了该语言的语法和基本对象
*     2.DOM: 文档对象模型，描述处理网页内容的方法和接口
*     3.BOM:浏览器的对象模型，描述与浏览器进行交互的方法和接口                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
*
*/

// 创建变量的几种方式：
    /* 
    * 1.ES3
    *     var a = 12;
    *         a = 13;
    *    console.log(a); //=>输出的是a，代表的值是13
    * 
    * 2.ES6
    *   let b = 100;
    *       b = 200;
    * 
    *  const c = 1000;
    *        c= 2000; //=>报错：因为const创建的变量，存储的值不能被修改（可以理解为叫做常量）
    * 
    * //3.创建函数也相当于在创建变量：
    *     function fn(){}
    * 
    * //4.创建类也相当于创建变量
    *     class A{}
    * 
    * //5.ES6模块的导入也可以创建变量
    *     inport B from  './B.js/'
    * 
    * //6. Symbol创建唯一值
    *       let n = Symbol(100);
    *       let m = Symbol(200);
    */


    //命名规范
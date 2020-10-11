//==========================================example1======================
var a ={}, b= '123',c =123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //'c'  因为a['123']和a[123]是等价的

//解析：
var obj = {100:100};
obj[100];
obj["100"]; //数字属性名和字符串属性名没有区别

//解析：
var obj = {100:"努力","100":"学习"};
// obj
// {100:"哈哈哈"}
obj[100]  //"学习"
obj["100"]  //"学习" =》 总结：后面的会覆盖掉前面的

//==========================================example2======================
var a={},b=Symbol('123'),c=Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);  //"b"   Symbol是ES6中新增的数据类型 typeof  Symbol('123')===Symbol('123')  //false
// 它创建出来的值是唯一值， Symbol('123')===Symbol('123')  //false

//解些：
Symbol('123'); //Symbol(123)
typeof Symbol('123')   //"symbol"
Symbol('123')===Symbol('123')  //false

var obj={};a=Symbol('1');b=Symbol('1');
obj[a] = 100;
obj[b] = 100;
obj;  //{Symbol(1): 100, Symbol(1): 100}  唯一的值

//==========================================example3======================
var a={}, b={key:'123'}, c={key:'456'};
a[b] ='b';
a[c] ='c';  ///{[object Object]: "c"}
console.log(a[b]); //c
//1.对象的属性名不能是一个对象（遇到对象属性名，默认转换为字符串）
//obj = {}  arr=[12,23] obj[arr]="学习" obj=> {"12,23":"学习"}
//2.普通对象.toString  自身原型上没有toString,所以调取Object.prototype上的方法（这个方法用来检测数据类型的）
//obj={}   obj.toString=>"[object Object]"
//obj[b] ='b' => obj["[object Object]"] ='b'
!(!"Number(undefined)"); // !(!true) => !(false) =>true   
// > 只有0、NaN、''、null、undefined五个值会转换为false,其余都转换为true(而且没有任何的特殊情况)

isNaN(parseInt(new Date())) + Number([1]) + typeof undefined;
// => 1. parseInt(new Date())  // NaN ：new Date()非有效数字
//=> 2. isNaN(NaN)  =>true
// => 3. true + 1 => 1+1 = 2
//=> 4. 2+ typeof undefined =>  2+ "undefined" => "2undefined"

Boolean(Number("")) + !isNaN(Number(null)) + Boolean("parseInt([])") + typeof !(null);
//1.Boolean(Number("")) => Boolean(0) => false
// 2.false +  !isNaN(Number(null))   => false+!isNaN(0) => false + !false =>false + true
//3.false + true + Boolean("parseInt[]") => false + true+true
// 4. false + true+true + typeof !(null) =>  false + true+true  + typeof !(false) 
// => false + true+true  + typeof true(typeof检测数据类型的)
//  =>false + true+true  + "boolean"
// 5. 0 + 1 + 1 + "boolean"  => "2boolean"

parseFloat("1.6px") + parseInt("1.2px") + typeof parseInt(null);
// 1.6 +1+  "number"   parseInt只能识别整数  typeof NaN 为字符串number (NaN是特殊的数字类型)
//"2.6number"

isNaN(Number(!!Number(parseInt("0.8"))));  //从最里层算起
// parseInt("0.8") =>0
//!!Number(0) => !! 0 => false
//isNaN(Number(false)) => isNaN(0) => false

console.log(1+ "2" + "2");  //122

!typeof parseFloat("0"); 
//  parseFloat("0") => 0
// typeof 0 => "number"
//!"number" => ! true => false

Number(""); //0

typeof "parseInt(null)" +12 + !!Number(NaN);
// typeof "parseInt(null)"  => "string"
// !!Number(NaN) => !!NaN => NaN在五个值里面，所以为false  => !!false => false
// "string" + 12+  false => "string12false"

!typeof (isNaN("")) + parseInt(NaN);
// isNaN("") => 0 => false =>typeof false  => "boolean"
// !"boolean" => !true => false
// false  + NaN  => NaN

typeof !parseInt(null) + !isNaN(null);
//  typeof !NaN => typeof !flase => typeof true => "boolean"
//!isNaN(null); => !isNaN(Number(null)) =>!isNaN(0) => !false => true
//"boolean" + true => "booleantrue"


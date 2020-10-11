(function (global, factory) {

  "use strict"; //开启严格模式
  // 模块处理
  if (typeof module === "object" && typeof module.exports === "object") {
    //=> 支持CommonJS模块规范的执行走这里（例如：node.js）

    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("jQuery requires a window with a document");
        }
        return factory(w);
      };
  } else {
    //=> 可以初步理解为是浏览器或者（web-wiew）环境
    // global ==== window
    // factory === function( window, noGlobal ){}
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  //利用js暂时性死区问题 typeof a //undefined
  //=>  参数信息
  // window === window
  // noGlobal === undefined
  "use strict";

  var
    version = "3.5.1",
    jQuery = function (selector, context) {  //context 支持第二个参数上下文

      return new jQuery.fn.init(selector, context);  //把传给我的选择器和上下文再传给类 jQuery.fn.init
    };
  //=> jQuery是一个类（因为只有类上才有prototype）,jQuery.fn是给原型设置一个别名而已
  jQuery.fn = jQuery.prototype = {
    //=》 公共的属性和方法
    jquery: version,
    constructor: jQuery,  //原型重构之后，没有constructor,为了保证完整性，需要手动添加constructor
    length: 0,
    //=> 转换为数组方法 （类似于argouments转换为数组方法类似）
    toArray: function() {
      //=》 this:类似于当前类jQuery类的实例
      return slice.call( this );
    },  
    //=> get将jQuery对象转化为原生js对象
    get: function( num ) {
      // Return all the elements in a clean array
      if ( num == null ) {
        return slice.call( this );
      }
      // Return just the one element from the set
      return num < 0 ? this[ num + this.length ] : this[ num ]; //支持负数索引找倒数第几个 this:jQUERY实例（对象）
    },
    eq: function( i ) {
      var len = this.length,
        j = +i + ( i < 0 ? len : 0 );
      return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
    },
  
    // => JQ当中只有一个each:用来遍历数组、对象、类数组中的每一项的
    //$a.each() 最后也会转换成（$a）这种模式
    each: function( callback ) {
      //this:$navList  callback:function(index,item){}
      return jQuery.each( this, callback );
    },
    // $navList.each(function(index,item){})
    // $each([数组、对象、类数组],function (index,item){
      // => this:循环的这一项  if ( callback.call( obj[ i ], i, obj[ i ] ) 
      // return false; //可以控制循环结束，所以执行一次
    // })
    
    //each的原理
/* 	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {  //判断是否是类数组或者数组
			length = obj.length; //获取长度
			for ( ; i < length; i++ ) {  //从零开始循环每一项
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {  
          // => 每循环一次，执行一次函数，把函数中的this设置为循环项
          //传递索引和循环项
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
  }, */
  
  };
  
  // 检测对象是否是数组或者类数组
/* function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
} */

//9373
// =》 jQuery 是一个普通对象
jQuery.ajax = function(){};
/*jQuery给我们提供的方法放到两个位置上，
   1.原型上，jQuery.prototype = {toArray:,get:,...}
     $().get()  只有jQuery的实例才可以调用
   2.对象上，jQuery.ajax = ....
    $.ajax()  直接调取使用 // 实例不能调取ajax对象(函数的三种方式)
*/
// Main method
// ajax: function( url, options ) {}

if(!noGlobal){  //!noGlobal = !undefined
  //把jQuery复制给window下的jQuery和$
  window.jQuery = window.$ = jQuery;
}

});
//外面就可以调用了
//$()
//jQuery()

//=》 基于jQuery选择器创建出来的是JQ类的一个实例,就可以调取jQuery.prototype上的方法
//=》 1.创建出来的JQ实例是一个类数组（JQ对象），基于makeArray创建出来的
//=》 2. selector支持三种数据格式：
//      [string]
//       + 选择器 $('.box')
//        + 创建元素 $('<div>...</div>')
//      [元素对象:JS原生对象]
//          把原生JS对象转成JQ对象，只有这样才能够调取JQ中的方法
//          把JQ对象转为原生对象，直接基于索引获取即可，例如：$A[0]，真实项目中建议大家使用JQ自带的get方法实现，因为它更加完善，可以支持负数索引（$A.get(0)）
//  eq方法也是根据索引值获取集合中的某一项（也支持负数索引），只不过返回的结果是原生JS对象，依然是JQ的对象
//      [函数]：
//          ($function(){}) 等待页面中除DOM结构加载完成再执行函数，等价于$(document)
// 3.JQ对象和原生Js对象中的属性和方法不能够相互调用
//       jQ对象调用原生的得互相转换  $(tabBox)
//dir(jQuery.prototype)
$('.box')   //context 支持第二个参数上下文
$('.box')  === $('.box');  //false 不相等的实例
let $box = ('.box');  //节省开辟的内存空间，减少代码，提高性能，少开了两个实例
$box.css();
$box.attr();
$box.anumate();


// ===========================================================================/
var init = jQuery.fn.init = function( selector, context, root ) {
  var match, elem;

  // HANDLE: $(""), $(null), $(undefined), $(false)
  if ( !selector ) { 
    return this; //this:当前实例
  }

  // Method init() accepts an alternate rootjQuery
  // so migrate can support jQuery.sub (gh-2101)
  root = root || rootjQuery;    //rootjQuery = jQuery( document );指的是整个文档

  // Handle HTML strings
  if ( typeof selector === "string" ) {  //通过选择器获取到我们所需要的元素
    if ( selector[ 0 ] === "<" &&
      selector[ selector.length - 1 ] === ">" &&
      selector.length >= 3 ) {

      // Assume that strings that start and end with <> are HTML and skip the regex check
      match = [ null, selector, null ];

    } else {
      match = rquickExpr.exec( selector );
    }

    // Match html or make sure no context is specified for #id
    if ( match && ( match[ 1 ] || !context ) ) {

      // HANDLE: $(html) -> $(array)
      if ( match[ 1 ] ) {
        context = context instanceof jQuery ? context[ 0 ] : context;

        // Option to run scripts is true for back-compat
        // Intentionally let the error be thrown if parseHTML is not present
        jQuery.merge( this, jQuery.parseHTML(
          match[ 1 ],
          context && context.nodeType ? context.ownerDocument || context : document,
          true
        ) );

        // HANDLE: $(html, props)
        if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
          for ( match in context ) {

            // Properties of context are called as methods if possible
            if ( isFunction( this[ match ] ) ) {
              this[ match ]( context[ match ] );

            // ...and otherwise set as attributes
            } else {
              this.attr( match, context[ match ] );
            }
          }
        }

        return this;

      // HANDLE: $(#id)
      } else {
        elem = document.getElementById( match[ 2 ] );

        if ( elem ) {

          // Inject the element directly into the jQuery object
          this[ 0 ] = elem;
          this.length = 1;
        }
        return this;
      }

    // HANDLE: $(expr, $(...))
    } else if ( !context || context.jquery ) {
      return ( context || root ).find( selector );

    // HANDLE: $(expr, context)
    // (which is just equivalent to: $(context).find(expr)
    } else {
      return this.constructor( context ).find( selector );
    }

  // HANDLE: $(DOMElement)
  } else if ( selector.nodeType ) {
    this[ 0 ] = selector;
    this.length = 1;
    return this;

  // HANDLE: $(function)
  // Shortcut for document ready
  } else if ( isFunction( selector ) ) {
    return root.ready !== undefined ?
      root.ready( selector ) :

      // Execute immediately if ready is not present
      selector( jQuery );
  }

  return jQuery.makeArray( selector, this );  ///makeArray（）创造类数组的方法
};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;   
rootjQuery = jQuery( document );


function Fn(){

}
new Fn(); //init.prototype = jQuery.fn;  为了不需要new ,直接当作普通函数执行，让jQuery里面写的方法变的简单一点 return new jQuery.fn.init(selector, context);  


// =================================================


//jQuery() 允许多库并存
var _jQuery = window.jQuery,
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
    //如果别人自己也使用了$,将使用权转让给别人
		window.$ = _$;   // _ $=window.$
	}

	if ( deep && window.jQuery === jQuery ) {
    //如果别人的类库也叫jQuery
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
// });

//=>  转移$的使用权
let j = jQuery.noConflict();  // j === jQuery
jQuery();
j();



// ===========================================================

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},  //形参赋默认值，对象
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};  
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;  // this是谁调用这个方法，this就是谁
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;  
				}
			}
		}
	}

	// Return the modified object
	return target;
};

//extend使用
$.extend();
$.fn.extend();
// $().extend();
//extend的语法: extend向JQ中继续扩展方法
$.extend({});  //扩展到JQ对象上：一般为了完善类库，提供更多的工具方法
$.extend(true,{});
$.fn.extend(); //扩展JQ原型上：一般为了写JQ插件，让JQ的实例来调用

$.extend(true,{    //扩展到Jquery对象上了  ,true以我写的为主（深度覆盖）
  queryURLParams:function(url){
    //。。。
  }
})
$.queryURLParams("http://.....")
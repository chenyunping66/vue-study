function fun(n,o){
  console.log(o);  // undefined
  return{
    fun:function(m){
      return fun(m,n);
    }
  };
}
var c = fun(0).fun(1);
c.fun(2);  //1
c.fun(3);  //1
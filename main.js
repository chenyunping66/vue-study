import Vue from 'vue'

import App from './App.vue';
// console.log(App)
// 默认使用 的是runtime-only 语法
new Vue({
  el:'#app', //内部自带的html模板
  // template:'<div>heollo</div>',//会报错
  // render(h){
  //   return h('h1',['hello'])
  //   return h(App)
  // }
  // render:h=>h(App)
  ...App
})

// 组件间的通信
// ？v-loader =>.vue vue-template-complier 来实现的
// 编译时，将template变成render函数
// main.js用是最简易的模板
// 默认的配置就是vue-cli配置

// 传递方法
// 1.props+emit/同步数据 v-model/.sync
// 2.provide.inject会造成单向数据流混乱(自己实现工具库的话，可以采用)（父亲和孙子）
// （尽量不要直接更改父组件的数据）
// 3.$parent $children可以直接触发儿子的事件或者父亲的事件
//@click=" $parent.$emit('eat)"  $parent指代父组件  $children指代子组件 => $dispatch('eat')=>Vue.prototype.$dispatch
// elemnt-ui内部实现了这样一套机制。就是触发事件只要 父亲绑定过这个方法就出发
Vue.prototype.$dispatch = function(eventName,CommentName,value){
  let parent = this.$parent;
  while(parent){
    //触发指定组件的事件，而不是全部向上找
    if(parent.$option.name === CommentName){
      parent.$emit(eventName,value); //没有绑定触发，不会有任何影响
      break;
    }
    parent = parent.$parent   //dispatch作用：向上派发事件，只要组件上绑定过此事件就会触发

    }
   
}
//我想将这个方法，指定到特定组件上
// 例子：<button @click="$dispatch('eat','parent'),''饭">触发son2事件</button>

// 2..$broadcast向下通知某个组件进行触发事件（跨级通讯）
Vue.prototype.$broadcast = function(eventName,CommentName,value){
  // 需要找到所有儿子组件进行触发
  let children = this.$children; //获取的是数组
  function broadcast(child){
    for(let i=0;i<children.length;i++){
      let child = children[i];
      if(CommentName === child.$options.name){
         // 找到同名组件再触发
         child.$emit(eventName,value);
         return;
      }else{
        if(child.$children){
          broadcast(child.$children);
        }
      }
    }
    // forEach的缺陷
    // child.forEach(child => {
    //   if(CommentName === child.$options.name){        // 找到同名组件再触发
    //   }
    //   child.$emit(eventName,value);
    // });
  }
}

// 3.$attrs是响应式的，父亲变了，数据也会更新
// 如果在props里面用了attr就会减少caida
// :4.nheritAttrs:false  这些属性，虽然没用，但是我不希望增加到dom元素上
// $attrs $listenrs 表示的是所有的属性和方法的合集。可以使用v-bind和v-on传递
// ref eventBus slot插槽的用法
// 表单组件 异步组件和cai'da
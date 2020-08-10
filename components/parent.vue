<!--
 * @Author: your name
 * @Date: 2020-08-05 15:52:46
 * @LastEditTime: 2020-08-05 19:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\components\grandson.vue
-->
<template>
    <div class="">
      parent
      <!-- 第一种方式 -->
      <!-- <Son1 :money="mny" :changeMoneyson="changeMoney"></Son1> -->

     <!-- 方式二：给儿子添加一个事件，等一会触发这个事件 -->
     <!-- v-on:click="changeMoney" 相当于son1.$on('click',changeMoney) 。触发的是son1.$emit('click',100)-->
     <!--@click="changeMoney" click不是原生事件 .native修饰符会把事件绑定给组件最外层元素上（div上）-->
      <!-- <Son1 :money="mny" @a="changeMoney"></Son1> -->

      <!-- 同步数据 -->
      {{mny}}
      <Son1 :value="mny" @b="val=>mny=>val"></Son1>
      <!-- 可以更换成是value+input的语法糖 -->
      <Son1 v-model="mny"></Son1>
    </div>
</template>

<script>
import Son1 from './son1'
export default {
  name:'parent',
  provide(){ //提供者 上下文
  return {parent:this} //直接将这个组件爆露出去

  },
    components: {
      Son1
    },
    data() {
        return {
            // 父亲有一百块
            // mny:'父组件传给子组件100'
            mny:100
        };
    },
    computed: {},
    watch: {},
    methods: {
      // methods里面的函数，已经被bind过了，不能再更改了
      changeMoney(value){ 
        // console.log(this.mny +=value)
        this.mny +=value;
          //  console.log(this.$options) //查看是父组件还是子组件
      }
    },
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
    //数据传递：父子传递，子父传递，平级传递，跨级通信
</script>
<style lang='' scoped>
/* @import url(); 引入公共css类 */

</style>
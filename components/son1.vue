<!--
 * @Author: your name
 * @Date: 2020-08-05 15:52:46
 * @LastEditTime: 2020-08-05 18:44:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\components\grandson.vue
-->
<template>
    <div class="">
      son1
      {{money}}
      <!-- 第一种方式 -->
      <!-- <button @click="changeMoneyson(200)">更改父亲的钱数</button> -->
   <!-- 第二种方式 -->
   <div @click="change">点击按钮</div>
    </div>
</template>

<script>

export default {
  // props:
  //   // 把Money属性添加给子组件
  //   // 子组件不能更改父组件中的数据，因为属性不是响应式的
  //   ['money'],
  // 通过子组件就可以调用父组件中的函数，将需要修改的值传递给父组件，典型的单向数据流
  props:{
    money:{
      // type:String,
      // default:''
      type:Number,
      default:100
    },
    changeMoneyson:{
      type:Function,
      default:()=>{}
    },
    value:{
      type:Number,
    }
  },
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
      change(){
        this.$emit('a',300)
      },
      change1(){
        this.$emit('b',900)
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
</script>
<style lang='' scoped>
/* @import url(); 引入公共css类 */

</style>
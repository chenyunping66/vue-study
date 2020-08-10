<!--
 * @Author: your name
 * @Date: 2020-08-05 15:30:56
 * @LastEditTime: 2020-08-05 16:42:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\App.vue
-->
<template>
  <my-parent></my-parent>
</template>
<script>
import Parent from './components/parent'
// 组件的注册规则：1.定义组件 2/引入 3.注册组件 4。使用组件
// 注册时候和使用时候命名一致
// Vue.extend({

// }) 等价于=》export default
export default {
  data(){
   return {msg:'nussa'}
  },
   components:{
      'myParent':Parent
    }
}
</script>
<style scoped>

</style>
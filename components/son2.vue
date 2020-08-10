<!--
 * @Author: your name
 * @Date: 2020-08-05 15:52:46
 * @LastEditTime: 2020-08-08 11:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\components\grandson.vue
-->
<template>
    <div class="">
      son2
      <Grandson @drink="drink"></Grandson>
    </div>
</template>

<script>
import Grandson from './grandson'
export default {
    components: {},
    components:{
        Grandson
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        drink(){
            console.log('喝水')
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
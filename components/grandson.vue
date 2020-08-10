<!--
 * @Author: your name
 * @Date: 2020-08-05 15:52:46
 * @LastEditTime: 2020-08-05 19:06:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\components\grandson.vue
-->
<template>
    <div class="">
      grandson
      <!-- {{parent.money}}  父组件提供数据直孙子可以拿到了-->
    </div>
</template>

<script>

export default {
    inject:['parent'],
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
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
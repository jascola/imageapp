<template>

</template>

<script>

  import Carousel from './Carousel'
  import Menu from './Menu'
  export default {
    components: {Carousel,Menu},
    methods: {

      },
    created: function () {
       /* 根据上一个路由给的 条件  （vuex 传递参数）发送axios请求 ，获取图片路径、总数*/
        console.log(this.$route.params.id);
      console.log(this.$route.params.path);
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

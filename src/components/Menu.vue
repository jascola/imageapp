<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>

    <el-input v-model="menudata.input" placeholder="请输入相册名或作者名"
              style="width: 20%;height: 20%;position: relative;margin-top: 0.67%;margin-left: 35%"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="toserch">搜索</el-button>

    <el-dropdown style="position: relative;">
       <span class="el-dropdown-link" style="color: #ff6daf">
          {{menudata.name}}
         <i class="el-icon-arrow-down el-icon--right"></i>
       </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  export default {
    name: 'Menu',
    props: {
      menudata: {
        type: Object
      }
    },
    methods: {
      toserch: function () {
        this.$emit("serch", {});
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>

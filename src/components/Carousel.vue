<template>
  <div class="block" >
    <el-carousel height="140px" style="width: 80%;position: relative;margin-left: 10%">
      <el-carousel-item v-for="item in urls" :key="item.id">
        <template>
          <a href="#"><img :src="item.url"></a>
        </template>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    data() {
      return {
        urls: [
          {url: 'http://localhost:8089/images/index/Koala.jpg', id: 1},
          {url: 'http://localhost:8089/images/index/3.jpg', id: 2},
          {url: 'http://localhost:8089/images/index/4.jpg', id: 3},
          {url: 'http://localhost:8089/images/index/5.jpg', id: 4}
        ]
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item img{
    height: 100%;
    width: 100%;
  }
</style>

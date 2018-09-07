<template>

  <div>
    <!--菜单-->
    <Menu :menudata="menudata" @serch="serch"></Menu>

    <!--走马灯-->
    <Carousel></Carousel>

    <div style="position: relative;margin-left: 11%;margin-top: 1%">
      <div v-for="td in tds" style="float: left;margin-right: 5%" class="polaroid">
        <a href="javascript:void(0);" @click="router(td.url,td.content)">
          <img :src="td.url" alt="Norway" style="width:100%" height="350px"/>
        </a>
        <div class="container">
          <p>{{td.content}}</p>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
    <!--分页菜单-->
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange"
                @sizeChange="handleSizeChange" style="position: relative;margin-top: 2%">
    </Pagination>
  </div>
</template>

<script>
  import Carousel from './Carousel'
  import Menu from './Menu'
  import Pagination from './Pagination'

  export default {
    components: {Carousel, Menu, Pagination},
    name: "",
    methods: {
      router(url, content) {
        console.log(url, content);
        this.$router.push({
          name: 'SingleImage',
          query: {
            content: content,
            url: url
          }
        });
      },
      /*改变pagesize*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagination.defaultsize = val;
      },
      /*跳页*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagination.currentpage = val;
      },

      /*按照每页条数，以及输入框内容搜索*/
      serch: function () {
      }
    },
    data() {
      return {
        menudata: {
          input: '',
          name: 'jascola,欢迎你！'
        },
        pagination: {
          total: 400,
          pagesize: [10, 20, 30, 40],
          defaultsize: 10,
          currentpage: 1
        },

        tds: [{url: 'http://localhost:8089/images/1/10.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/2.jpg', content: 'a image'},
          {url: 'http://localhost:8089/images/1/10.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'},
          {url: 'http://localhost:8089/images/1/3.jpg', content: 'this is a image'}],

      }
    }
  }
</script>

<style scoped>
  div.polaroid {
    width: 250px;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 25px;
  }

  div.container {
    text-align: center;
    padding: 10px 20px;
  }
</style>

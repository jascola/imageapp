<template>

  <div>
    <!--菜单-->
    <Menu :menudata="menudata" @serch="serch"></Menu>

    <!--走马灯-->
    <Carousel></Carousel>

    <div style="position: relative;margin-left: 11%;margin-top: 1%">
      <div v-for="td in tds" style="float: left;margin-right: 5%" class="polaroid">
        <a href="javascript:void(0);" @click="router(td.id)">
          <img :src="td.indexpic" alt="Norway" style="width:100%" height="350px"/>
        </a>
        <div class="container">
          <p>{{td.picname}}</p>
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
    name: "UserContent",
    beforeCreate: function () {
      this.axios.get('http://localhost:8089/test/user/check.html'
      ).then(res => {
        if (res.data.status === "success") {
          this.$store.commit('login');
          this.menudata.name = res.data.messages[0];
        }
        else {
          this.$message.error(res.data.messages[0]);
          this.$router.push({
            name: 'Login'
          });
        }
      });
    },

    created: function () {
      this.axios.get('http://localhost:8089/test/user/getpic.html', {
        params: {
          pageNo: this.pagination.currentpage,
          pageSize: this.pagination.defaultsize,
          param: this.menudata.input
        }
      }).then(res => {
        const x = res.data.list;
        this.tds = x;
        this.pagination.total = res.data.size;
      }).catch(error => {
        this.$message.error("请求失败");
      });
    },
    methods: {
      router(id) {
        this.$router.push({
          name: 'SingleImage',
          query: {
            id:id
          }
        });
      },
      /*改变pagesize*/
      handleSizeChange(val) {
        this.pagination.defaultsize = val;
        this.axios.get('http://localhost:8089/test/user/getpic.html', {
          params: {
            pageNo: this.pagination.currentpage,
            pageSize: this.pagination.defaultsize,
            param: this.menudata.input
          }
        }).then(res => {
          const x = res.data.list;
          this.tds = x;
          this.pagination.total = res.data.size;
        }).catch(error => {
          this.$message.error("请求失败");
        });
      },
      /*跳页*/
      handleCurrentChange(val) {
        this.pagination.currentpage = val;
        this.axios.get('http://localhost:8089/test/user/getpic.html', {
          params: {
            pageNo: this.pagination.currentpage,
            pageSize: this.pagination.defaultsize,
            param: this.menudata.input
          }
        }).then(res => {
          const x = res.data.list;
          this.tds = x;
          this.pagination.total = res.data.size;
        }).catch(error => {
          this.$message.error("请求失败");
        });
      },

      /*按照每页条数，以及输入框内容搜索*/
      serch: function () {
        this.axios.get('http://localhost:8089/test/user/getpic.html', {
          params: {
            pageNo: this.pagination.currentpage,
            pageSize: this.pagination.defaultsize,
            param: this.menudata.input
          }
        }).then(res => {
          const x = res.data.list;
          this.tds = x;
          this.pagination.total = res.data.size;
        }).catch(error => {
          this.$message.error("请求失败");
        });
      }
    },
    data() {
      return {
        menudata: {
          input: '',
          name: '',
          content:'请输入相册名或作者名',
          flag:false
        },
        pagination: {
          total: 400,
          pagesize: [10, 20, 30, 40],
          defaultsize: 10,
          currentpage: 1
        },
        tds: [],

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

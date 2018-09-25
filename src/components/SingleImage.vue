<template>
  <div>
    <Menu :menudata="menudata" @serch="serch"></Menu>
    <div>
      <div style="float: left">
        <div style="margin-bottom: 2%">
          <span style="font-size: 20px;">{{routeData.picname}}</span>
        </div>
        <div style="margin-bottom: 2%">
          <el-tag style="position: relative;margin-right: 2px" v-for="x in routeData.tag" :key="routeData.tag.text">
            <a href="javascript:void (0);" @click="selectByTag(x.text)">{{x.text}}</a>
          </el-tag>
        </div>
        <div>
          <span style="font-size: 14px">喜欢就收藏一波吧！</span>
          <el-button type="success" :icon="styleclass" circle></el-button>
        </div>
      </div>
      <div style="position: relative;margin-left: 15%;margin-top: 1%;">
        <img :src="routeData.imgsrc"/>
      </div>
    </div>
    <!--清除浮动-->
    <div style="clear: both"></div>
    <!--分页菜单-->
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange"
                style="position: relative;margin-top: 2%">
    </Pagination>
  </div>
</template>

<script>

  import Pagination from './Pagination'
  import Menu from './Menu'

  export default {
    components: {Pagination, Menu},
    methods: {
      selectByTag: function (tag) {
        console.log(tag);
      },

      turnTOJpg: function (index) {
        let xx = this.routeData.indexpic.split('.');
        let gs = '.' + xx[xx.length - 1];
        if (index < 10) {
          return this.routeData.virtualdir + '/' + "00" + index + gs;
        }
        if (index >= 10 && index < 100) {
          return this.routeData.virtualdir + '/' + "0" + index + gs;
        }
        if (index >= 100) {
          return this.routeData.virtualdir + '/' + index + gs;
        }
      },
      /*跳页*/
      handleCurrentChange(val) {
        this.pagination.currentpage = val;
        this.routeData.imgsrc = this.turnTOJpg(val);
      }
    },
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
      }).catch(error => {
        this.$message.error("请求失败");
      });
    },
    created: function () {
      this.axios.get('http://localhost:8089/test/user/selectid.html', {
          params: {
            id: this.$route.query.id
          }
        }
      ).then(res => {
        let xx = res.data[0];
        this.routeData.virtualdir = xx.virtualdir;
        this.pagination.total = xx.counts;
        this.routeData.id = xx.id;
        this.routeData.picname = xx.picname;
        this.routeData.authorname = xx.authorname;
        this.routeData.indexpic = xx.indexpic;
        this.routeData.imgsrc = this.turnTOJpg(1);
        let x = xx.tag.split(',');
        for (let i = 0; i < x.length; i++) {
          this.routeData.tag.push({text: x[i]});
        }
      }).catch(error => {
        this.$message.error("请求失败");
      });
      /*验证是否收藏*/
      this.axios.get('http://localhost:8089/test/user/checkcollected.html',{
          params: {
            id: this.$route.query.id
          }
        }
      ).then(res => {
        this.styleclass = res.data[0];
      });
    },
    data() {
      return {
        styleclass: null,
        menudata: {
          input: '',
          name: '',
          content: '此页面禁止搜索',
          flag: true
        },
        routeData: {
          virtualdir: null,
          id: null,
          picname: null,
          authorname: null,
          tag: [],
          indexpic: null,
          imgsrc: null
        },
        pagination: {
          total: null,
          pagesize: [1],
          defaultsize: 1,
          currentpage: 1
        }
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

  a {
    text-decoration: none;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

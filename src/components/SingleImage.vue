<template>
  <div>
    <div>
      {{routeData.picname}}
    </div>
    <el-tag style="position: relative;margin-right: 2px" v-for="x in routeData.tag" :key="routeData.tag.text" >
      <el-button size="mini" type="primary" @click="selectByTag(x.text)">{{x.text}}</el-button>
    </el-tag>
    <img :src="routeData.imgsrc"/>
    <!--分页菜单-->
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange"
                 style="position: relative;margin-top: 2%">
    </Pagination>
  </div>
</template>

<script>

  import Pagination from './Pagination'

  export default {
    components: {Pagination},
    methods: {
      selectByTag:function(tag){
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
          /*this.menudata.name = res.data.messages[0];*/
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
      this.routeData.virtualdir = this.$route.query.virtualdir;
      this.pagination.total = this.$route.query.counts;
      this.routeData.id = this.$route.query.id;
      this.routeData.picname = this.$route.query.picname;
      this.routeData.indexpic = this.$route.query.indexpic;
      this.routeData.imgsrc = this.turnTOJpg(1);
      let x = this.$route.query.tag.split(',');
      for (let i = 0; i < x.length; i++) {
        this.routeData.tag.push({text: x[i]});
      }
    },
    data() {
      return {
        routeData: {
          virtualdir: null,
          id: null,
          picname: null,
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

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

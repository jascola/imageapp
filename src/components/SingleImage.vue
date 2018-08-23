<template>
  <div>
    <!--菜单-->
    <div>
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

        <el-input v-model="serchContent" placeholder="请输入内容"
                  style="width: 20%;height: 20%;position: relative;margin-top: 0.67%;margin-left: 35%"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="serch()">搜索</el-button>

        <el-dropdown style="position: relative;">
       <span class="el-dropdown-link" style="color: #ff6daf">
          {{name}}
         <i class="el-icon-arrow-down el-icon--right"></i>
       </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>
    <!--走马灯-->
    <Carousel></Carousel>


    <div style="position:relative; margin-left: 17%">
      <template>
        <img :src="srcPath"/>
      </template>
    </div>
    <!--分页菜单-->
    <div class="block" style="position: relative;margin-left: 25%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentpage"
        :page-sizes="pagination.pagesize"
        :page-size="pagination.defaultsize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import Carousel from './Carousel'

  export default {
    components: {Carousel},
    methods: {
      /*改变pagesize*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagination.defaultsize = val;
      },
      /*跳页*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagination.currentpage = val;
        var data = {
          currentpage: this.pagination.currentpage,
          serchContent: this.serchContent,
          pagesize: this.pagination.defaultsize
        };
        const x = [{
          id: '222',
          imgDiscrete:
            'fuck',
          imgPath: 'http://localhost:8089/images/1/5.jpg'

        }, {
          id: '111',
          imgDiscrete:
            'fucks',
          imgPath: 'http://localhost:8089/images/1/10.jpg'
        }, {
          id: '111',
          imgDiscrete:
            'fucks',
          imgPath: 'http://localhost:8089/images/1/4.jpg'
        }];
        this.banner = x;
        this.pagination.total = 100;

        //
      },

      /*按照每页条数，以及输入框内容搜索*/
      serch: function () {
        var data = {
          serchContent: this.serchContent,
          pagesize: this.pagination.defaultsize
        };
        console.log(data);
        /*axios请求，拿到返回值对象（包含总记录数），遍历存入数组*/
        const x = [{
          id: '222',
          imgDiscrete:
            'fuck',
          imgPath: 'http://localhost:8089/images/1/10.jpg'

        }, {
          id: '111',
          imgDiscrete:
            'fucks',
          imgPath: 'http://localhost:8089/images/1/5.jpg'
        }, {
          id: '111',
          imgDiscrete:
            'fucks',
          imgPath: 'http://localhost:8089/images/1/4.jpg'
        }];
        this.banner = x;
        this.pagination.total = 400;
      }
    },
    created: function () {
       /* 根据上一个路由给的 条件  （vuex 传递参数）发送axios请求 ，获取图片路径、总数*/
        console.log(this.$route.params.id);
      console.log(this.$route.params.path);
        this.srcPath = this.$route.params.path;
        this.pagination.total = 100;
    },
    data() {
      return {
        scrPath: null,
        serchContent: '',
        name: '欢迎，jascola！',
        banner: null,
        pagination: {
          total: null,
          pagesize: [10, 20, 30, 40],
          defaultsize: 10,
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

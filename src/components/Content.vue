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


    <div>
      <!--对话框-->
      <el-dialog title="增加相册" :visible.sync="dialogFormVisible.add_dialog_seen">
        <el-form :model="form">
          <el-form-item label="相册名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.add_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible.add_dialog_seen = false">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="编辑相册" :visible.sync="dialogFormVisible.edit_dialog_seen">
        <el-form :model="form">
          <el-form-item label="相册名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.edit_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible.edit_dialog_seen = false">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="删除相册" :visible.sync="dialogFormVisible.delete_dialog_seen">
        <el-form :model="form">
          <el-form-item label="相册名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.delete_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible.delete_dialog_seen = false">确 定</el-button>
        </div>
      </el-dialog>

      <!--表格数据绑定-->
      <el-table
        :data="banner"
        style="width: 100%"
      >
        <el-table-column type="expand" label="详细" fixed>

          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="相册id">
                <span style="color: #dd6161">{{ props.row.imgPath }}</span>
              </el-form-item>
              <el-form-item label="相册路径">
                <span style="color: #dd6161">{{ props.row.imgPath }}</span>
              </el-form-item>
              <el-form-item label="相册描述">
                <span style="color: #dd6161">{{ props.row.imgDiscrete }}</span>
              </el-form-item>
              <el-form-item label="征途">
                <a href="javascript:void(0);" @click="router(props.row.imgPath,props.row.id)"><img
                  :src="props.row.imgPath" width="400px" height="400px"/></a>
              </el-form-item>
            </el-form>
          </template>

        </el-table-column>

        <el-table-column prop="id" label="ID" sortable header-align="center" align="center" fixed></el-table-column>

        <el-table-column prop="imgDiscrete" label="图片描述">

        </el-table-column>

        <el-table-column prop="imgPath" label="图片路径">
        </el-table-column>

        <el-table-column label="操作" v-if="adminseen">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleAdd()">添加
            </el-button>

          </template>
        </el-table-column>
      </el-table>
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
      /*跳转函数*/
      router(path, id) {
        console.log(path, id);
        this.$router.push({
          name: 'SingleImage',
          params: {
            id: id,
            path: path
          }
        });
      },
      /*编辑*/
      handleEdit(index, row) {
        console.log(index);
        console.log(row.id, row.imgPath);
        this.dialogFormVisible.edit_dialog_seen = true;
      },
      /*删除*/
      handleDelete(index, row) {
        console.log(index);
        console.log(row.id, row.imgPath);
        this.dialogFormVisible.delete_dialog_seen = true;
      },
      /*添加*/
      /*操作对话框*/
      handleAdd() {
        console.log(this.dialogFormVisible.add_dialog_seen);
        this.dialogFormVisible.add_dialog_seen = true;
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
        var data = {
          currentpage: this.pagination.currentpage,
          serchContent: this.serchContent,
          pagesize: this.pagination.defaultsize
        };
        console.log(data);
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

    data() {
      return {
        adminseen: true, /*操作权限控制*/
        serchContent: '', /*输入框查询内容*/
        name: '欢迎，jascola！', /*登录后显示内容*/
        banner: null, /*table数据绑定*/
        dialogFormVisible: {
          add_dialog_seen: false,
          delete_dialog_seen: false,
          edit_dialog_seen: false
        }, /*dailog是否弹出控制*/

        form: {
          name: '',
          region: ''
        }, /*dailog表单数据*/
        formLabelWidth: '120px', /*dailog样式*/
        pagination: {
          total: null,
          pagesize: [10, 20, 30, 40],
          defaultsize: 10,
          currentpage: 1
        }  /*分页菜单数据参数*/
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

  /*详细列 表单样式*/
</style>

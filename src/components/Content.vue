<template>
  <div>
    <!--菜单-->
    <Menu :menudata="menudata" @serch="serch"></Menu>
    <!--走马灯-->
    <Carousel></Carousel>
    <!--表格数据绑定-->
    <TableData :tabledata="tabledata" @add="handleAdd" @delete="handleDelete" @edit="handleEdit" @router="router">
    </TableData>
    <!--分页菜单-->
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange" @sizeChange="handleSizeChange"></Pagination>

    <div>
      <!--对话框-->
      <el-dialog title="增加相册" :visible.sync="dialogFormVisible.add_dialog_seen">
        <el-form :model="form">
          <el-form-item label="相册名称" :label-width="form.formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="form.formLabelWidth">
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
          <el-form-item label="相册名称" :label-width="form.formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="form.formLabelWidth">
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
          <el-form-item label="相册名称" :label-width="form.formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="form.formLabelWidth">
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

    </div>

  </div>
</template>

<script>

  import Carousel from './Carousel'
  import Menu from './Menu'
  import Pagination from './Pagination'
  import TableData from './TableData'

  export default {
    beforeCreate:function(){
        this.axios.get('http://localhost:8089/test/user/check.html'
        ).then(res => {
          if (res.data.status === "success") {
            this.$store.commit('login');
            this.menudata.name = res.data.messages[0];
          }
          else {
            this.$message.error("登录失效，请登录！");
            this.$router.push({
              name: 'Login'
            });
          }
        });
    },
    components: {Carousel, Menu, Pagination, TableData},
    methods: {
      /*跳转函数*/
      router(data) {
        this.$router.push({
          name: 'SingleImage',
          params: {
            id: data.id,
            path: data.path
          }
        });
      },
      /*编辑*/
      handleEdit(data) {
        console.log(data.index);
        console.log(data.row.id, data.row.imgPath);
        this.dialogFormVisible.edit_dialog_seen = true;
      },
      /*删除*/
      handleDelete(data) {
        console.log(data.index);
        console.log(data.row.id, data.row.imgPath);
        this.dialogFormVisible.delete_dialog_seen = true;
      },
      /*添加*/
      /*操作对话框*/
      handleAdd(data) {
        console.log(data.index);
        console.log(data.row.id, data.row.imgPath);
        this.dialogFormVisible.add_dialog_seen = true;
      },

      /*改变pagesize*/
      handleSizeChange(val) {
        console.log(val);
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
        this.tabledata.banner = x;
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
        this.tabledata.banner = x;
        this.pagination.total = 300;
      }
    },

    data() {
      return {
        /*菜单数据*/
        menudata: {
          input: '',
          name: ''
        },

        /*表格数据*/
        tabledata: {
          banner: null,
          adminseen: true/*操作权限控制*/
        },

        /*dailog是否弹出控制*/
        dialogFormVisible: {
          add_dialog_seen: false,
          delete_dialog_seen: false,
          edit_dialog_seen: false
        },

        /*dailog表单数据*/
        form: {
          name: '',
          region: '',
          formLabelWidth: '120px', /*dailog样式*/
        },

        /*分页菜单数据参数*/
        pagination: {
          total: 400,
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

  /*详细列 表单样式*/
</style>

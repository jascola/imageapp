<template>
  <div>
    <!--菜单-->
    <Menu :menudata="menudata" @serch="serch"></Menu>
    <!--走马灯-->
    <Carousel></Carousel>
    <!--表格数据绑定-->
    <AcgData :tabledata="tabledata" @add="handleAdd" @delete="handleDelete" @edit="handleEdit" @router="router">
    </AcgData>
    <!--分页菜单-->
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange"
                @sizeChange="handleSizeChange"></Pagination>
    <div>
      <el-dialog title="删除" :visible.sync="dialogFormVisible.delete_dialog_seen">
        <el-form :model="form">

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.delete_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="deletePic">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="更新" :visible.sync="dialogFormVisible.edit_dialog_seen">
        <el-form :model="form">


          <!--文件上传-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.edit_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="增加" :visible.sync="dialogFormVisible.add_dialog_seen">
        <el-form :model="form">

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.add_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Carousel from '../units/Carousel'
  import Menu from '../units/Menu'
  import Pagination from '../units/Pagination'
  import AcgData from '../units/AcgData'

  export default {
    components: {Carousel, Menu, Pagination, AcgData},
    name: "AcgContent",
    methods: {
      /*编辑*/
      handleEdit(data) {
        this.dialogFormVisible.edit_dialog_seen = true;
      },
      /*删除*/
      handleDelete(data) {
        this.dialogFormVisible.delete_dialog_seen = true;
      },
      /*添加*/
      /*操作对话框*/
      handleAdd() {
        this.dialogFormVisible.add_dialog_seen = true;
      },

      /*改变pagesize*/
      handleSizeChange(val) {
        this.pagination.defaultsize = val;
      },
      /*跳页*/
      handleCurrentChange(val) {
        this.pagination.currentpage = val;
      },

      /*按照每页条数，以及输入框内容搜索*/
      serch: function () {

      }
    },
    data(){
      return {
        /*分页菜单数据参数*/
        pagination: {
          total: 400,
          pagesize: [10, 20, 30, 40],
          defaultsize: 10,
          currentpage: 1
        },
        /*表格数据*/
        tabledata: {
          banner: null,
          adminseen: true/*操作权限控制*/
        },
        /*菜单数据*/
        menudata: {
          input: '',
          name: '',
          content:'请输入厂商名或里番名',
          flag:false
        },
        /*dailog是否弹出控制*/
        dialogFormVisible: {
          add_dialog_seen: false,
          delete_dialog_seen: false,
          edit_dialog_seen: false,
          tag_dialog_seen: false
        },

        /*dailog表单数据*/
        form: {
          id: null,
          picname: null,
          authorname: null,
          counts: null,
          tag: null,
          filelist: {id: '', x: []},
          formLabelWidth: '120px', /*dailog样式*/
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

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
    <Pagination :pagination="pagination" @currentChange="handleCurrentChange"
                @sizeChange="handleSizeChange"></Pagination>

    <div>
      <!--对话框-->
      <el-dialog title="增加相册" :visible.sync="dialogFormVisible.add_dialog_seen">
        <el-form :model="form">
          <el-form-item label="相册ID" :label-width="form.formLabelWidth">
            <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="相册名称" :label-width="form.formLabelWidth">
            <el-input v-model="form.picname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者名" :label-width="form.formLabelWidth">
            <el-input v-model="form.authorname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="标签" :label-width="form.formLabelWidth">
            <el-tag style="position: relative;margin-right: 2px" v-for="x in form.tag">{{x.text}}</el-tag>
            <el-button type="primary" @click="addtag" size="mini">添加</el-button>
          </el-form-item>
          <!--文件上传-->
          <el-upload
            multiple
            action=""
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"
            ref="upload"
            :file-list="FileList.lists"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-upload
            action=""
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile2"
            ref="upload2"
            :file-list="FileList.list"
            limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.add_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加标签" :visible.sync="dialogFormVisible.tag_dialog_seen">
        <el-input v-model="inputTag" auto-complete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.tag_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible.edit_dialog_seen = true">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="编辑相册" :visible.sync="dialogFormVisible.edit_dialog_seen">
        <el-form :model="form">

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible.edit_dialog_seen = false">取 消</el-button>
          <el-button type="primary" @click="addtag">确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="删除相册" :visible.sync="dialogFormVisible.delete_dialog_seen">
        <el-form :model="form">

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
    components: {Carousel, Menu, Pagination, TableData},
    /*vue创建成功前，判断是否登录*/
    beforeCreate: function () {
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
      }).catch(error => {
        this.$message.error("请求失败");
      });
    },
    /*创建成功后请求所有数据*/
    created: function () {
      this.axios.get('http://localhost:8089/test/user/getpic.html', {
        params: {
          pageNo: this.pagination.currentpage,
          pageSize: this.pagination.defaultsize,
          param: this.menudata.input
        }
      }).then(res => {
        const x = res.data.list;
        this.tabledata.banner = x;
        this.pagination.total = res.data.size;
      }).catch(error => {
        this.$message.error("请求失败");
      });
    },

    methods: {
      /*添加标签*/
      addtag: function () {
        if (this.inputTag != '' || this.inputTag != null) {
          this.form.tag.push({text: this.inputTag});
        }
        this.inputTag = '';
        this.dialogFormVisible.tag_dialog_seen = false;
      },
      beforeUpload: function () {

      },
      /*重写默认的上传方法*/
      uploadFile: function (file, lists) {
        var i = 0;
        for (; i < this.form.filelist.x.length; i++) {
          if (this.form.filelist.x[i] === file.file.name) {
            break;
          }
        }
        if (i >= this.form.filelist.x.length) {
          this.formDate.append('images', file.file);
          this.form.filelist.x.push(file.file.name);
        }
        this.FileList.lists = lists;
      },
      uploadFile2: function (file, list) {
        this.formDate.append('image', file.file);
        this.FileList.list = list;
      },
      /*提交文件上传的表单*/
      submitDialog: function () {
        this.$refs.upload.submit();
        this.$refs.upload2.submit();
        console.log(this.form.filelist.x);
        this.formDate.append('id', this.form.id);
        this.formDate.append('picname', this.form.picname);
        this.formDate.append('authorname', this.form.authorname);
        let you = "";
        for (let i = 0; i < this.form.tag.length; i++) {
          if (i != this.form.tag.length - 1) {
            you = you + this.form.tag[i].text + ',';
          }
          else {
            you = you + this.form.tag[i].text;
          }
        }
        this.formDate.append('tag', you);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.axios.post("http://localhost:8089/test/pic/upload.html", this.formDate, config).then(res => {
          this.formDate.delete('id');
          this.formDate.delete('picname');
          this.formDate.delete('authorname');
          this.formDate.delete('tag');
          this.formDate.delete('images');
          this.formDate.delete('image');
          this.FileList.lists = [];
          this.FileList.list = [];
        }).catch(res => {
          this.formDate.delete('id');
          this.formDate.delete('picname');
          this.formDate.delete('authorname');
          this.formDate.delete('tag');
          this.formDate.delete('images');
          this.formDate.delete('image');
          this.FileList.lists = [];
          this.FileList.list = [];
        });
        this.dialogFormVisible.add_dialog_seen = false;
      },
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
        this.form.id = data.row.id;
        this.form.picname = data.row.picname;
        this.form.authorname = data.row.authorname;
        let x = data.row.tag.split(',');
        this.form.tag = [];
        for (let i = 0; i < x.length; i++) {
          this.form.tag.push({text: x[i]});
        }
        if (this.form.filelist.id != data.row.id) {
          this.form.filelist.x = [];
          this.form.filelist.id = data.row.id;
        }
        this.dialogFormVisible.add_dialog_seen = true;
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
          this.tabledata.banner = x;
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
          this.tabledata.banner = x;
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
          this.tabledata.banner = x;
          this.pagination.total = res.data.size;
        }).catch(error => {
          this.$message.error("请求失败");
        });
      }
    },

    data() {
      return {
        inputTag: '',
        /*文件列表*/
        FileList: {lists: [], list: []},
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
          edit_dialog_seen: false,
          tag_dialog_seen: false
        },

        /*dailog表单数据*/
        form: {
          id: null,
          picname: null,
          authorname: null,
          tag: null,
          filelist: {id: '', x: []},
          formLabelWidth: '120px', /*dailog样式*/
        },
        formDate: new FormData(),

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

<template>
  <div>
    <el-dialog title="增加相册" :visible.sync="dialogFormVisible">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="banner"
      style="width: 100%"
    >
      <el-table-column type="expand" label="详细" fixed>

        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="相册id">
              <span style="color: #dd6161">{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="相册路径">
              <span style="color: #dd6161">{{ props.row.imgPath }}</span>
            </el-form-item>
            <el-form-item label="相册描述">
              <span style="color: #dd6161">{{ props.row.imgDiscrete }}</span>
            </el-form-item>
            <el-form-item label="征途">
              <img :src="props.row.imgPath" width="400px" height="400px"/>
            </el-form-item>
          </el-form>
        </template>

      </el-table-column>

      <el-table-column prop="id" label="ID" sortable header-align="center" align="center" fixed></el-table-column>

      <el-table-column prop="imgDiscrete" label="图片描述">

      </el-table-column>

      <el-table-column prop="imgPath" label="图片路径">
      </el-table-column>

      <el-table-column label="操作">
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
            @click="sheet()">添加
          </el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "TableData",
    methods: {
      handleEdit(index, row) {
        console.log(index);
        console.log(row.id, row.imgPath);
      },
      handleDelete(index, row) {
        console.log(index);
        console.log(row.id, row.imgPath);
      },
      sheet() {
        console.log(this.dialogFormVisible);
        this.dialogFormVisible = true;
      }
    },
    data() {
      const x = [{

        id: '222',
        imgDiscrete:
          'fuck',
        imgPath: 'http://localhost:8089/images/1/3.jpg'

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
      return {
        banner: x,
        dialogFormVisible: false,
        form: {
          name: '',
          region: ''
        },
        formLabelWidth: '120px'
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<template>
  <div>
    <el-table
      :data="tabledata.banner"
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

      <el-table-column label="操作" v-if="tabledata.adminseen">
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
            @click="handleAdd(scope.$index, scope.row)">添加
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
        this.$emit('edit', {index: index, row: row})
      },
      handleDelete(index, row) {
        this.$emit('delete', {index: index, row: row})
      },
      handleAdd(index, row) {
        this.$emit('add', {index: index, row: row})
      },
      router(path,id){
        this.$emit('router', {path: path, id: id})
      }
    },
    props: {
      tabledata: {}
    },
    data() {
      return {}
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

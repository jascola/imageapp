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
              <span style="color: #dd6161;font-size: 16px">{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="相册名">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.picname }}</span>
            </el-form-item>
            <el-form-item label="作者名">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.authorname }}</span>
            </el-form-item>
            <el-form-item label="物理路径">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.realdir }}</span>
            </el-form-item>
            <el-form-item label="虚拟路径">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.virtualdir }}</span>
            </el-form-item>
            <el-form-item label="封面物理路径">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.indexrealdir }}</span>
            </el-form-item>
            <el-form-item label="封面虚拟路径">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.indexpic }}</span>
            </el-form-item>
            <!--标签的渲染可以 数组循环迭代-->
            <el-form-item label="标签">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.tag }}</span>
            </el-form-item>
            <el-form-item label="相册图片数量">
              <span style="color: #dd6161;font-size: 16px">{{ props.row.counts }}</span>
            </el-form-item>

          </el-form>
        </template>

      </el-table-column>

      <el-table-column prop="id" label="相册ID" sortable header-align="center" align="center" fixed></el-table-column>

      <el-table-column prop="picname" label="相册名">

      </el-table-column>

      <el-table-column prop="authorname" label="作者名">
      </el-table-column>
      <el-table-column prop="tag" label="标签">
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
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button size="medium" type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
    </div>
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
      handleAdd() {
        this.$emit('add', {})
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

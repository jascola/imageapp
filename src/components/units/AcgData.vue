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
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.id}}
              </el-tag>
            </el-form-item>
            <el-form-item label="相册名">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.picname}}
              </el-tag>
            </el-form-item>
            <el-form-item label="作者名">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.authorname}}
              </el-tag>
            </el-form-item>
            <el-form-item label="物理路径">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.realdir}}
              </el-tag>
            </el-form-item>
            <el-form-item label="虚拟路径">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.virtualdir}}
              </el-tag>
            </el-form-item>
            <el-form-item label="封面物理路径">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.indexrealdir}}
              </el-tag>
            </el-form-item>
            <el-form-item label="封面虚拟路径">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.indexpic}}
              </el-tag>
            </el-form-item>
            <!--标签的渲染可以 数组循环迭代-->
            <el-form-item label="标签">
              <el-tag style="position: relative;margin-right: 2px" v-for="x in toTag(props.row.tag)"
                      :key="toTag(props.row.tag).text">
                {{x.text}}
              </el-tag>
            </el-form-item>
            <el-form-item label="相册图片数量">
              <el-tag style="position: relative;margin-right: 2px">
                {{props.row.counts}}
              </el-tag>
            </el-form-item>

          </el-form>
        </template>

      </el-table-column>

      <el-table-column prop="id" label="相册ID" sortable header-align="center" align="center" fixed></el-table-column>

      <el-table-column prop="picname" label="相册名">

      </el-table-column>

      <el-table-column prop="authorname" label="作者名">
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
      <el-button size="medium" type="primary" icon="el-icon-plus" circle @click="handleAdd" style="position: relative;margin-left: 50%"></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableData",
    methods: {
      toTag: function (tag) {
        let xx = [];
        let x = tag.split(',');
        for (let i = 0; i < x.length; i++) {
          xx.push({text: x[i]});
        }
        return xx;
      },
      handleEdit(index, row) {
        this.$emit('edit', {index: index, row: row})
      },
      handleDelete(index, row) {
        this.$emit('delete', {index: index, row: row})
      },
      handleAdd() {
        this.$emit('add', {})
      },
      router(path, id) {
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

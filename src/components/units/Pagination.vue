<template>
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
</template>

<script>
    export default {
      name:'Pagination',
      methods: {
        handleSizeChange(val) {
          this.$emit('sizeChange',val)
        },
        handleCurrentChange(val) {
          this.$emit('currentChange',val)
          //这里写页面跳转
        }
      },
      props:{
        pagination:{

        }
      },
      data() {
        return {

        };
      }
    }
</script>

<style scoped>

</style>

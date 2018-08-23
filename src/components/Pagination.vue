<template>
  <div class="block">
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
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          //这里写页面跳转
        },
        ss:function () {
          return 400;
        }
      },
      data() {
        return {
          pagination:{
            total:this.ss(),
            pagesize:[10,20,30,40],
            defaultsize:10,
            currentpage:1
          }
        };
      }
    }
</script>

<style scoped>

</style>

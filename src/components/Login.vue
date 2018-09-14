<template>
  <el-form :model="ruleForm" :rules="rules" style="position: relative;margin-left : 38%;margin-top: 10%"
           ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
    <el-form-item label="账号" prop="number">
      <el-input v-model="ruleForm.number" :style="inputcss"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" :style="inputcss"></el-input>
    </el-form-item>
    <!--<el-form-item label="验证码" prop="validcode">
      <el-input v-model="ruleForm.validcode" :style="inputcss"></el-input>
    </el-form-item>
    <el-form-item>
      <img src="link"/>
    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import qs from 'qs';
  export default {
    data() {
      return {
        inputcss: {
          width: '20%',
          fontFamily:'微软雅黑'
        },
        link: '',
        ruleForm: {
          number: '',
          password: '',
          validcode: ''
        },
        rules: {
          number: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]/*,
          validcode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]*/
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://localhost:8089/test/user/login.html',qs.stringify(
              {phone:this.ruleForm.number,password:this.ruleForm.password}
            )).then(res=>{
              if(res.data.status==="success"){
                this.$message.success(res.data.messages[0]);
                this.$store.commit('login');
                this.$store.commit('setMessage',res.data.messages[1]);
                this.$router.push({
                  name: 'UserContent'
                });
              }else{
                this.$message.error(res.data.messages[0]);
              }

            }).catch(error=>{
              this.$message.error("请求失败");
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-button {
    margin-left: 2.8%;
  }
</style>

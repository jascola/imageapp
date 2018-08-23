<template>
  <el-form :model="ruleForm" :rules="rules" style="position: relative;margin-left : 38%;margin-top: 10%"
           ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
    <el-form-item label="账号" prop="number">
      <el-input v-model="ruleForm.number" v-bind:style="inputcss"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" v-bind:style="inputcss"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" v-bind:style="inputcss"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="validcode">
      <el-input v-model="ruleForm.validcode" v-bind:style="inputcss"></el-input>
    </el-form-item>
    <el-form-item>
      <img src="link"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        inputcss: {
          width: '20%'
        },
        link: '',
        ruleForm: {
          number: '',
          password: '',
          validcode: '',
          email:''
        },
        rules: {
          number: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          validcode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          email:[
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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

</style>

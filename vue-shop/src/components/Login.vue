<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginformRef"
        :model="loginform"
        :rules="loginformrules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginform.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() { 
    return {
      loginform: {
          username: 'admin',
          password: ''
      },
      loginformrules: {
        // 验证用户名
        username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
                min: 5,
                max: 10,
                message: '密码长度在 5 到 10 个字符',
                trigger: 'blur'
            }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    resetLoginForm() {
      this.$refs.loginformRef.resetFields()
    },
    login() {
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginform)
        if (res.meta.status !== 200)
          return this.$message.error('用户名或密码错误')
        this.$message.success('登录成功')
        // console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.avatar {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
    }
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    // 弹性盒子
    display: flex;
    // 尾部对齐
    justify-content: flex-end;
}
</style>

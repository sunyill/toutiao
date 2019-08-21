<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="formData" label-width="80px" ref="loginform" class="form" :rules="rules">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input v-model="formData.code" placeholder="请输入验证码" style="width:62%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="formData.check" class="checkbox">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

          <el-button @click="clickFun" type="primary" style="width:100%;margin-top:15px">点击登录</el-button>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var doCheck = function (rule, valus, callback) {
      if (valus) {
        callback()
      } else {
        callback(new Error('不好意思,霸王条款🙄'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }, {
            len: 11,
            message: '手机长度必须为11个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6个数字',
            trigger: 'blur'
          }
        ],
        check: [
          {
            validator: doCheck
          }
        ]
      }
    }
  },
  methods: {
    // 点击登录时, 进行的表单验证
    clickFun () {
      this.$refs.loginform.validate(isOK => {
        if (isOK) {
          // alert('hahha ,你是天才')
          this.$http({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(res => {
            console.log(res.data)
            window.localStorage.setItem(
              'user_data',
              JSON.stringify(res.data)
            )
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 450px;
    height: 350px;
    .title {
      text-align: center;
      margin-bottom: 25px;
      img {
        width: 200px;
        height: 45px;
      }
    }
    .form {
      .checkbox {
        display: flex;
        justify-content: left;
        text-align: center;
      }
    }
  }
}
</style>

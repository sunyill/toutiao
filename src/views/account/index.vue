<template>
  <el-card>
    <breadCommon slot="header">
      <template slot="title">个人账户</template>
    </breadCommon>
    <el-form label-width="100px" ref="userForm" :rules="rules" :model="formData">
      <!-- 用户名 -->
      <el-form-item label="用户名称" prop="name">
        <el-input style="width:300px" v-model="formData.name"></el-input>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="用户简介">
        <el-input style="width:300px" v-model="formData.info"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input style="width:300px" v-model="formData.emaill"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="用户手机号">
        <el-input style="width:300px" disabled v-model="formData.mobile"></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <img class="head-img" :src="formData.photo?formData.photo:imgUrl" alt />
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: require('../../assets/img/404.png'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 2, max: 7, message: '用户名必须在2到7个字符之间' }],
        emill: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      },
      formData: {
        name: '',
        info: '',
        photo: '',
        emill: '',
        mobile: ''

      }
    }
  },
  methods: {
    // 保存信息
    saveInfo () {
      this.$refs.userForm.validate((isOk) => {
        if (isOk) {
          this.$http({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then((res) => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    getUserInfo () {
      this.$http({
        url: '/user/profile'
      }).then((res) => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.head-img {
  position: absolute;
  left: 700px;
  top: 150px;
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>

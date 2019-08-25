<template>
  <el-card>
    <breadCommon slot="header">
      <template slot="title">个人账户</template>
    </breadCommon>
    <el-form label-width="100px">
      <!-- 用户名 -->
      <el-form-item label="用户名称">
        <el-input style="width:300px" v-model="formData.name"></el-input>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="用户简介">
        <el-input style="width:300px" v-model="formData.info"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="用户邮箱">
        <el-input style="width:300px" v-model="formData.emaill"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="用户手机号">
        <el-input style="width:300px" disabled v-model="formData.mobile"></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
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

<template>
  <el-row type="flex" class="row-bg" justify="space-between">

    <el-col :span="10"  >
      <div style="display:flex; flex-direction:row; align-items: center ;">
      <i @click="openOrClose" :class="currentClass" class="fold_open"></i>
      <div class="grid-content">北京市粉丝总部</div>
      </div>
    </el-col>

    <el-col :span="6" class="layout_right">
      <img :src="user.photo?user.photo:defaultImg" alt />
      <el-dropdown trigger="click" @command="commandAction">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-coordinate" command="persion_info">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-loading" command="git_address">git地址</el-dropdown-item>
          <el-dropdown-item icon="el-icon-position" command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      user: {},
      currentClass: 'el-icon-s-fold',
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 展开或者折叠
    openOrClose () {
      eventBus.$emit('collopseOrClose')
      this.currentClass = this.currentClass === 'el-icon-s-fold' ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    getUserInfo () {
      this.$http({
        url: '/user/profile'
      }).then(res => {
        console.log(res.data.data)
        this.user = res.data
      })
    },
    commandAction (command) {
      switch (command) {
        case 'persion_info':
          alert('personInfo')
          this.$router.push('./home/account')
          break
        case 'git_address':
          window.location.href = 'https://github.com/sunyill/toutiao'
          // this.$router.push('./home/')
          break
        case 'quit':
          window.localStorage.clear()
          this.$router.push('./login')
          break
      }
    }
  },
  created () {
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.fold_open{
  font-size: 25px;
  margin-right:10px;
}
.layout_right {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.el-dropdown-link {
  margin-left: 10px;
}
</style>

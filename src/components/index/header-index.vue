<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6">
      <div class="grid-content">北京市blackHouse总部</div>
    </el-col>

    <el-col :span="6" class="layout_right">
      <img :src="user.photo?user.photo:defaultImg" alt />
      <el-dropdown trigger="click" @command=commandAction>
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
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$http({
        url: '/user/profile'
      }).then((res) => {
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
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
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

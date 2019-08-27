<template>
  <div class="layout-aside">
    <div class="title">
      <img :style="{width:collapse ? '30px':'120px'}" :src="collapse?smallImg:bigImg" alt="">
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition="false"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-document"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/content">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/index/publish">发表文章</el-menu-item>
          <el-menu-item index="/index/articles">内容列表</el-menu-item>
          <el-menu-item index="/index/material">素材管理</el-menu-item>
          <el-menu-item index="/index/comment">评论列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/index/fansdata">图文数据</el-menu-item>
          <el-menu-item index="/index/fansinfo">粉丝概况</el-menu-item>
          <el-menu-item index="/index/fansimg">粉丝画像</el-menu-item>
          <el-menu-item index="/index/fanslist">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/index/account">
        <i class="el-icon-document"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false,
      smallImg: require('../../assets/img/toutiao.png'),
      bigImg: require('../../assets/img/logo_admin.png')
    }
  },
  created () {
    // 展开或者折叠取反
    eventBus.$on('collopseOrClose', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>
.layout-aside {
  .title {
    padding: 15px 0;
    text-align: center;
    background-color: #2e2f32;
    img {
      width: 120px;
      height: 30px;
    }
  }
}
</style>

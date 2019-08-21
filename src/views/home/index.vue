<template>
  <el-container>
    <el-aside style="width:200px;height:100vh;background-color:#323745">
      <slide-index style="background:green"></slide-index>
    </el-aside>
    <el-container>
      <el-header>
        <header-index></header-index>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>
</style>

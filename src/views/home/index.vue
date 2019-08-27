<template>
  <el-container>
    <el-aside :style="{width}"  style="min-height:100vh;background-color:#323745">
      <slide-index  style="background:green"></slide-index>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      width: '200px'

    }
  },
  created () {
    eventBus.$on('collopseOrClose', () => {
      this.width = this.width === '200px' ? '60px' : '200px'
    })
  }
}
</script>

<style>
</style>

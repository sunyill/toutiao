<template>
<el-card>
    <breadCommon slot='header'>
      <!-- 面包屑的插槽 具名插槽  title-->
        <template slot='title'>评论列表</template>
    </breadCommon>

    <el-table :data="list" stripe >
         <!-- prop属性是绑定的字段名称 -->
          <el-table-column prop='title' width='500' label='标题'></el-table-column>
         <el-table-column :formatter="formatter" prop='comment_status' label='评论状态'></el-table-column>
          <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
        <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
     <el-table-column  label='操作'>
       <el-button type="text">修改</el-button>
       <el-button type="text">关闭评论</el-button>
     </el-table-column>
   </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []

    }
  },
  methods: {
    getComments () {
      this.$http({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>

<template>
  <el-card>
    <breadCommon slot="header">
      <!-- 面包屑的插槽 具名插槽  title-->
      <template slot="title">评论列表</template>
    </breadCommon>

    <el-table :data="list" stripe>
      <!-- prop属性是绑定的字段名称 -->
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改评论</el-button>
          <el-button @click="closeOrOpen(obj.row)" :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"   type="text" >{{ obj.row.comment_status ? "关闭评论" : "打开评论" }}</el-button></template>
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
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗?`, '提示').then(() => {
        this.$http({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComments()
        })
      })
    },
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

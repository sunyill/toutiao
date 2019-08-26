<template>
  <el-card
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
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
          <el-button
            @click="closeOrOpen(obj.row)"
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
            type="text"
          >{{ obj.row.comment_status ? "关闭评论" : "打开评论" }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页处理 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        background
        class="fenye"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="pageStartChange"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    // 页面改动时触发
    pageStartChange (newPage) {
      this.page.currentPage = newPage
      this.getComments()
    },

    // 使用 async  , await 方式
    async closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      try {
        await this.$confirm(`您确定要${mess}评论吗?`, '提示')
        await this.$http({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        })
        await this.getComments()
      } catch (error) {
        // 如果点击了取消的处理
        console.log(error)
      }
    },

    // closeOrOpen (row) {
    //   let mess = row.comment_status ? '关闭' : '打开'
    //   this.$confirm(`您确定要${mess}评论吗?`, '提示').then(() => {
    //     this.$http({
    //       method: 'put',
    //       url: '/comments/status',
    //       params: { article_id: row.id.toString() },
    //       data: { allow_comment: !row.comment_status }
    //     }).then(() => {
    //       this.getComments()
    //     })
    //   })
    // },
    async getComments () {
      this.loading = true
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      // 使用 async  , await 方式
      let result = await this.$http({
        url: '/articles',
        params: {
          response_type: 'comment',
          ...pageParams
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
      this.loading = false
      // .then(result => {
      //   console.log(result)
      //   this.list = result.data.results
      //   // total_count  接口中总的数据
      //   this.page.total = result.data.total_count
      //   this.loading = false
      // })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    // 页面刚进入时, 跳入的是第一页的数据
    this.getComments()
  }
}
</script >

<style lang="less" scoped>
.fenye {
  background: paleturquoise;
}
</style>

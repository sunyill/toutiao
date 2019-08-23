<template>
  <el-card
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <breadCommon slot="header">
      <template slot="title">素材管理</template>
    </breadCommon>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row align="middle" class="operate" type="flex" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    // tabs标签切换
    handleClick () {
      this.page.currentPage = 1
      this.getMaterial()
    },

    // 切换分页中的页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },

    // 获取页面中的数据
    getMaterial () {
      this.loading = true
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$http({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;

    }
    .operate {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      width: 100%;
      background-color: #f4f5f6;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>

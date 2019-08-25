<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材管理" name="material">
        <div class="material-list">
          <el-card class="material-item" v-for="item in list" :key="item.id">
            <img alt @click="selectOneImg(item)" :src="item.url" />
          </el-card>
        </div>
        <!-- 分页部分 -->
        <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :pager-size="page.pagerSize"
            :current-page="page.currentPage"
            :total="page.total"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传" name="upload">上传</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        total: 0,
        pagerSize: 8
      }
    }
  },
  methods: {
    // 选择图片
    selectOneImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    // 更改分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      let pagerParams = {
        page: this.page.currentPage,
        per_page: this.page.pagerSize
      }
      this.$http({
        url: '/user/images',
        params: { collect: false, ...pagerParams }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .material-item {
    margin: 5px 0;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

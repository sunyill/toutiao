<template>
  <el-card
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <el-upload :http-request="upLoadThisImg" action=''  class="upload-material" :show-file-list="false">
      <el-button type="primary" cursor='pointer'>
        上传图片
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-upload>
    <breadCommon slot="header">
      <template slot="title">素材管理</template>
    </breadCommon>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row align="middle" class="operate" type="flex" justify="space-around">
              <i
                class="el-icon-star-on"
                cursor="pointer"
                :style="{color:item.is_collected ? 'red':''}"
                @click="collectThisImg(item)"
              ></i>
              <i class="el-icon-delete-solid" cursor="pointer" @click="delMaterial(item)"></i>
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
    // 上传图片的方法
    upLoadThisImg (params) {
      alert('1')
      let formData = new FormData()
      formData.append('image', params.file)
      this.$http({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then((res) => {
        this.getMaterial()
      })
    },
    // 收藏or 取消 素材图片
    collectThisImg (item) {
      let msg = item.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您确定${msg}此图片吗?`, '提示').then(() => {
        this.$http({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: { collect: !item.is_collected } // 取相反,收藏=>取消收藏

        }).then((res) => {
          this.getMaterial()
        })
      })
    },
    // 删除素材
    delMaterial (item) {
      this.$confirm('您确定要删除我吗? (*@ο@*) 哇～', '提示').then(() => {
        this.$http({
          method: 'delete',
          url: `/user/images/${item.id}`

        }).then(res => {
          this.getMaterial()
        })
      })
    },
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
.upload-material {
  position: absolute;
  right: 25px;
  margin-top: -10px;
  z-index: 1;
}
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

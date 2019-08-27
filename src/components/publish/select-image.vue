<template>
  <el-card v-loading='loading'>
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材管理" name="material">
        <div class="material-list">
          <el-card class="material-item" v-for="item in list" :key="item.id">
            <img @click="selectOneImg(item)" :src="item.url" />
          </el-card>
        </div>
        <!-- 分页部分 -->
        <el-row type="flex" justify="center" style="margin:10px 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            :total="page.total"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传" name="upload">
          <el-upload :http-request="uploadImg" class="avatar-uploader" action  :show-file-list="false"></el-upload>
          <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      }
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: '/user/images',
        method: 'post',
        data
      }).then((res) => {
        this.loading = false
        this.$emit('selectOneImg', res.data.url)
      })
    },
    // 选择图片
    selectOneImg (item) {
      console.log(item.url)
      this.$emit('selectOneImg', item.url)
    },
    // 更改分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$http({
        url: '/user/images',
        params: { collect: false, ...pageParams }
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

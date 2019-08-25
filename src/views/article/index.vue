<template>
  <el-card>
    <breadCommon slot="header">
      <template slot="title">内容列表</template>
    </breadCommon>
    <!-- 工具栏--显示表单  可搜索区域 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group @change="refreshList" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择">
        <el-date-picker
          style="width:450px;background-color:skyblue"
          type="daterange"
          @change="refreshList"
          value-format="yyyy-MM-dd"
          v-model="formData.dataRange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <div class="total_title">共找到{{page.total}}条数据</div>
      <!-- 创建div列表 -->
      <div class="content-list" v-for="(item,index) in list" :key="index">
        <div class="content-item">
          <div class="left">
            <img :src="item.cover.images[0]" alt />
            <div class="info">
              <span style="font-size:14px">{{item.title}}</span>
              <el-tag
                style="width:60px"
                :type="item.status | statusType"
              >{{item.status | statusText}}</el-tag>
              <span class="date">{{item.pubdate}}</span>
            </div>
          </div>
          <div class="right">
            <span style="cursor:pointer" @click="takeEdit(item)">
              <i class="el-icon-edit"  ></i>修改
            </span>
            <span style="cursor:pointer" @click="delThisItem(item)">
              <i class="el-icon-milk-tea"></i>删除
            </span>
          </div>
        </div>
      </div>

      <!-- 分页组件 -->
      <el-row type="flex" justify="center" style="margin:25px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          @current-change="changePages"
        ></el-pagination>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      list: [],
      // 文章总数 默认为0
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      formData: {
        status: 5,
        channel_id: null,
        dataRange: null
      },
      channels: [] // 频道数据
    }
  },
  methods: {
    // 点击修改文章item内容
    takeEdit (item) {
      this.$router.push(`/index/publish/${item.id.toString()}`)
    },
    // 点击删除删除item
    delThisItem (item) {
      // alert('王站, 你是最棒的!')
      this.$confirm('亲,您确定不爱我了吗?', '友情提示').then(() => {
        this.$http({
          url: `/articles${item.id.toString()}`,
          method: 'delete'
        })
      }).then(() => {
        this.getArticles(this.getConditions())
      })
    },
    // Huo取搜索的条件
    getConditions () {
      let { status, channel_id: cid, dataRange } = this.formData
      let params = {
        status: status === 5 ? null : status,
        channel_id: cid,
        begin_pubdate: dataRange && dataRange.length ? dataRange[0] : null,
        end_pubdate: dataRange && dataRange.length > 1 ? dataRange[1] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    // changePages 改变时会触发
    changePages (newPages) {
      this.page.currentPage = newPages
      this.getArticles(this.getConditions()) // 查询数据
    },
    // 请求数据, 刷新列表
    refreshList () {
      this.page.currentPage = 1
      this.getArticles(this.getConditions())
    },
    getArticles (params) {
      this.$http({
        url: '/articles',
        params: { ...params }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 获取频道列表数据
    getChannels () {
      this.$http({
        url: '/channels'
      }).then(res => {
        console.log(res.data)
        this.channels = res.data.channels
      })
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles({ page: 1, per_page: 10 })
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.total_title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 150px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        margin-left: 10px;
        display: flex;
        height: 100px;
        padding: 5px 0;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      span,
      span i {
        font-size: 14px;
        color: #333;
      }
      span {
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 2px;
        margin-right: 10px;
        .el-icon-edit {
          color: purple;
          margin-right: 5px;
        }
        .el-icon-milk-tea {
          color: red;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>

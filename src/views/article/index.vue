<template>
  <el-card>
    <breadCommon slot="header">
      <template slot="title">内容列表</template>
    </breadCommon>
    <!-- 工具栏--显示表单  可搜索区域 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核成功</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择">
        <el-date-picker
          style="width:450px;background-color:skyblue"
          type="daterange"
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
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span>
              <i class="el-icon-milk-tea"></i>删除
            </span>
          </div>
        </div>
      </div>
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
        total: 0
      },
      radio: 1,
      value: '',
      item: '',
      options: [
        {
          lable: '蛋糕🍰',
          value: '选项1'
        },
        {
          lable: '蛋挞🥚',
          value: '选项2'
        },
        {
          lable: '香蕉🍌',
          value: '选项3'
        },
        {
          lable: '苹果🍎',
          value: '选项4'
        },
        {
          lable: '榴莲🍊',
          value: '选项5'
        }
      ]
    }
  },
  methods: {
    getArticles () {
      this.$http({
        url: '/articles'
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
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
    this.getArticles()
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

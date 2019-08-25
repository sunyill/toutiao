// 发布文章界面, form填充
<template>
  <el-card>
    <breadCommon slot="header">
      <template slot="title">发表文章</template>
    </breadCommon>
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="80px" class="publish-form">
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="width:800px;height:300px;margin-bottom:100px" placeholder="请输入内容" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publisThisArticle(false)">发布</el-button>
        <el-button @click="publisThisArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          {
            min: 5,
            max: 30,
            message: '亲, 输入字符在5-30字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 根据type 获取不同的一图, 三图, 自动
    changeType () {
      if (this.formData.cover.type === 1) { // 单图
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 根据ID 获取修改文章中内容
    getArticlesById () {
      let { articlesId } = this.$route.params
      console.log(articlesId)
      this.$http({
        url: `/articles/${articlesId}`
      }).then(res => {
        this.formData = res.data
      })
    },
    // 发布文章
    publisThisArticle (draft) {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          let { articlesId } = this.$route.params
          // 根据articlesId  来区分是否是put 还是post
          let method = articlesId ? 'put' : 'post'
          let url = articlesId
            ? `/articles/${articlesId}`
            : `/articles`
          this.$http({
            // url: '/articles',
            // method: 'post',
            url,
            method,
            params: { draft }, // 是否是草稿
            data: this.formData
          })
            .then(res => {
              // alert('发布成功')
              this.$router.push('/index/articles')
            })
        }
      })
    },
    // 获取频道列表
    getChannels () {
      this.$http({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    let { articlesId } = this.$route.params
    // 如果 articlesId 存在的话,就进行调用其中的根据Id  调用方法
    articlesId && this.getArticlesById()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.publish-form {
  margin-left: 50px;
}
</style>

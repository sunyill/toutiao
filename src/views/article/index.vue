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
            v-for="items in options"
            :key="items.value"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间选择">
        <el-date-picker
          v-model="value1"
          style="width:450px;background-color:skyblue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      value: '',
      item: '',
      options: [{
        lable: '蛋糕🍰',
        value: '选项1'
      }, {
        lable: '蛋挞🥚',
        value: '选项2'
      }, {
        lable: '香蕉🍌',
        value: '选项3'
      }, {
        lable: '苹果🍎',
        value: '选项4'
      }, {
        lable: '榴莲🍊',
        value: '选项5'
      }]

    }
  }
}
</script>

<style>
</style>

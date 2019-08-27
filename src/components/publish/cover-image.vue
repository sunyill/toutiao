<template>
 <!-- 循环生成添加图片初步界面 -->
    <div class="cover-image">
        <div class="cover-item" @click="clickImage(index)" v-for="(item,index) in images" :key="index">
            <img :src="item?item:defaultImg" alt="">
        </div>
        <el-dialog :visible="showDialog" @close= "showDialog=false" >
            <imageselect @selectOneImg="selectImg"></imageselect>
        </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      imageIndex: -1,
      showDialog: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    selectImg (url) {
      this.$emit('updateImages', url, this.imageIndex)
      this.showDialog = false
    },
    clickImage (index) {
      this.showDialog = true
      this.imageIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    .cover-item {
        width:200px;
        height:200px;
        border: 1px solid #ccc;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
            width:100%;
            height:100%;
        }
    }
}
</style>

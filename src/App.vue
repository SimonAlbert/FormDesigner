<script setup lang="ts">
import FormDesigner from './views/meta/FormManager/FormDesigner/index.vue'

let author = {
  name: 'Simon',
  email: '2653195657@qq.com',
  wechat: 'SimonWithGravity'
};
</script>

<template>
  <a-layout-content style="height: 90%">
    <FormDesigner></FormDesigner>
  </a-layout-content>
  <a-layout-footer>
    <div class="author-info">
      <p>联系作者: </p>
      <p>姓名: {{ author.name }}</p>
      <p>邮箱: {{ author.email }}</p>
      <p>微信: {{ author.wechat }}</p>
    </div>
  </a-layout-footer>
</template>

<style scoped lang="less">
.author-info {
  margin: 10px;
}
</style>

<script setup lang="ts">
import type { GridComponentOption } from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'
import DesignerArray from '@/views/meta/FormManager/FormDesigner/components/DesignerArray.vue'
import { Col, Row } from 'ant-design-vue'

let option = defineProps<GridComponentOption>()
function childAt(i: number, j: number) {
  return option.children[i][j]
}
</script>

<template>
  <!--  x行  -->
  <Row v-for="(i, x) in option.row" :key="i">
    <!--  y列  -->
    <Col v-for="(j, y) in option.column" :key="j" :span="Math.floor(24 / option.column)">
      <div class="grid-item">
        <DesignerArray :schema-array="childAt(x, y)" :single="true"/>
      </div>
    </Col>
  </Row>
</template>

<style scoped lang="less">

.grid-item {
  height: 100%;
  min-height: 100px;
}
</style>

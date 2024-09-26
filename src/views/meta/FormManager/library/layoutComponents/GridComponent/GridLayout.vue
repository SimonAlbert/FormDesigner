<script setup lang="ts">
import { injectCurrentComponent } from '@/views/meta/FormManager/common/useInjection'
import { computed, type ComputedRef } from 'vue'
import type { GridComponentOption } from '@/views/meta/FormManager/library/layoutComponents/GridComponent/index'
import DesignerArray from '@/views/meta/FormManager/FormDesigner/components/DesignerArray.vue'
import { Col, Row } from 'ant-design-vue'
import type { ComponentOption, ComponentProp } from '@/views/meta/FormManager/library/model'

const { currentComponent } = injectCurrentComponent()
const option: ComputedRef<GridComponentOption> = computed(() => (currentComponent.value.option as GridComponentOption))
function childAt(i: number, j: number): Array<ComponentProp<ComponentOption>> {
  return option.value.children[i][j];
}
</script>

<template>
  <!--  x行  -->
  <Row v-for="(x, i) in option.row" :key="x">
    <!--  y列  -->
    <Col v-for="(y, j) in option.column" :key="y" :span="Math.floor(24 / option.column)">
      <DesignerArray :schema-array="childAt(i, j)" />
    </Col>
  </Row>
</template>

<style scoped lang="less">

</style>

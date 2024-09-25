<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import type { ComponentProp } from '@/views/meta/FormManager/library/model'
import type {
  GridComponentOption,
} from '@/views/meta/FormManager/library/layoutComponents/GridComponent'

const currentComponent: Ref<ComponentProp<GridComponentOption>> = inject('currentComponent') as Ref<ComponentProp<GridComponentOption>>
const data = ref([3, 4, 6])

function handleChange(nemNum) {
  const children = currentComponent.value.option.children
  if (children.length < nemNum) {
    let addNum = nemNum - children.length
    while (addNum) {
      currentComponent.value.option.children.push([])
      addNum--
    }
  }
}
</script>

<template>
  <h2>格栅控件配置</h2>
  列数<a-segmented v-model:value="currentComponent.option.size" :options="data" @change="handleChange" />
</template>

<style scoped lang="less">

</style>

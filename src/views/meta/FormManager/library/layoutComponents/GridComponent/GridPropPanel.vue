<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { ComponentProp } from '@/views/meta/FormManager/library/model'
import type { GridComponentOption } from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import { deleteLastColumn, deleteLastRow, addEmptyColumn, addEmptyRow } from '@/public/matrix'
import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'

// let currentComponent = defineProps<ComponentProp<GridComponentOption>>()
let currentComponent = useCurrentComponent().currentComponent as Ref<ComponentProp<GridComponentOption>>

const colNum = ref([3, 4, 6])
const rowNum = ref([1, 3, 4, 6])

function handleColChange(newCol: number) {
  let ch = newCol - currentComponent.value.option.column
  if (ch > 0) {
    // 增加列
    addEmptyColumn(currentComponent.value.option.children, ch, () => [])
  } else {
    // 删除列
    deleteLastColumn(currentComponent.value.option.children, -ch)
  }
  currentComponent.value.option.column = newCol
}
function handleRowChange(newRow: number) {
  let ch = newRow - currentComponent.value.option.row
  if (ch > 0) {
    // 增加行
    addEmptyRow(currentComponent.value.option.children, ch, () => [])
  } else {
    // 删除行
    deleteLastRow(currentComponent.value.option.children, -ch)
  }
  currentComponent.value.option.row = newRow
}
</script>

<template>
  <h2>格栅控件配置</h2>
  列数<a-segmented :value="currentComponent.option.column" :options="colNum" @change="handleColChange" />
  行数<a-segmented :value="currentComponent.option.row" :options="rowNum" @change="handleRowChange" />
</template>

<style scoped lang="less"></style>

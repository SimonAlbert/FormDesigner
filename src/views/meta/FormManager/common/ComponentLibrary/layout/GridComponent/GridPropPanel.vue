<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { ComponentProp } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import type { GridComponentOption } from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'

import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'
const { current } = useCurrentComponent()

let currentComponent = current as Ref<ComponentProp<GridComponentOption>>

const colNum = ref([3, 4, 6])
const rowNum = ref([1, 2, 3, 4])

function handleColChange(newCol: number) {
  let num = newCol - currentComponent.value.option.column
  let abs = Math.abs(num)
  let children = currentComponent.value.option.children
  if (num > 0) {
    // 增加列
    children.forEach(row => {
      for (let i = 0; i < abs; i++) {
        row.push([])
      }
    });
  } else {
    // 删除列
    children.forEach(row => {
      row.splice(row.length - abs, abs);
    });
  }
  currentComponent.value.option.column = newCol
}
function handleRowChange(newRow: number) {
  let num = newRow - currentComponent.value.option.row
  let abs = Math.abs(num)
  let children = currentComponent.value.option.children
  if (num > 0) {
    // 增加行
    let addRows = Array(abs)
    for (let i = 0; i < abs; i++){
      let rowLen = children[0].length
      addRows[i] = Array(rowLen)
      for (let j = 0; j < rowLen; j++){
        addRows[i][j] = []
      }
    }
    children.push(...addRows)
  } else {
    // 删除行
    children.splice(children.length - abs, abs);
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

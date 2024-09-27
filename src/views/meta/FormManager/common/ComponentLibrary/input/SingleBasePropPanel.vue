<script setup lang="ts">

import type { Ref } from 'vue'
import type { ComponentProp, SingleComponentOption } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'
const { current, getCurrent, setCurrent } = useCurrentComponent()

let currentComponent = current as Ref<ComponentProp<SingleComponentOption>>

</script>

<template>
  <a-descriptions :title="`${currentComponent.typeName}组件配置`" size="small" layout="horizontal" :column="1">
    <a-descriptions-item label="字段编码">
      {{ currentComponent.option.field }}
    </a-descriptions-item>
    <a-descriptions-item label="字段名">
      <a-input
        :value="currentComponent.option.label"
        @change="item => {
          currentComponent.option.label = item.target.value
          // updateCurrentField('name', item.target.value)
        }"
      />
    </a-descriptions-item>
  </a-descriptions>
  <a-divider style="height: 1px; background-color: #a9a9a9" />
</template>

<style scoped lang="less">

</style>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import {
  injectCurrentComponent,
} from '@/views/meta/FormManager/common/useInjection'
import type { SingleComponentOption } from '@/views/meta/FormManager/library/model'

const { currentComponent, updateCurrentField } = injectCurrentComponent()
const option: ComputedRef<SingleComponentOption> = computed(() => (currentComponent.value.option as SingleComponentOption))
</script>

<template>
  <a-descriptions :title="`${currentComponent.typeName}组件配置`" size="small" layout="horizontal" :column="1">
    <a-descriptions-item label="字段编码">
      {{ option.field }}
    </a-descriptions-item>
    <a-descriptions-item label="字段名">
      <a-input
        :value="currentComponent.option.label"
        @change="item => {
          currentComponent.option.label = item.target.value
          updateCurrentField('name', item.target.value)
        }"
      />
    </a-descriptions-item>
  </a-descriptions>
  <a-divider style="height: 1px; background-color: #a9a9a9" />
</template>

<style scoped lang="less">

</style>

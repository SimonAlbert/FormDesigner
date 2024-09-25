<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue'
import { computed, inject } from 'vue'
import type { ComponentProp } from '@/views/meta/FormManager/library/model'
import type {
  SubTableComponentOption,
} from '@/views/meta/FormManager/library/containerComponents/SubTableComponent'

const currentComponent: Ref<ComponentProp<SubTableComponentOption>> = inject('currentComponent') as Ref<ComponentProp<SubTableComponentOption>>
// 单纯为了书写方便
const option: ComputedRef<SubTableComponentOption> = computed(() => currentComponent.value.option as SubTableComponentOption)

function handleChange(newVale) {
  option.value.formId = newVale
}
</script>

<template>
  <div>
    <h3>SubTable配置</h3>
    绑定数据源:<a-input :value="option.formId" @change="e => option.formId = e.target.value" />
    绑定字段:<a-input :value="option.relationFieldId" @change="e => option.relationFieldId = e.target.value" />
  </div>
</template>

<style scoped lang="less">

</style>

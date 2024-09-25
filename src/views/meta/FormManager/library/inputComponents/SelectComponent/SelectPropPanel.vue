<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import type {
  SelectComponentOption,
} from '@/views/meta/FormManager/library/inputComponents/SelectComponent'
import type { ComponentProp } from '@/views/meta/FormManager/library/model'

const currentComponent: Ref<ComponentProp<SelectComponentOption>> = inject('currentComponent') as Ref<ComponentProp<SelectComponentOption>>
const newOption = ref('')
function addOption() {
  currentComponent.value.option.options.push({
    value: newOption.value,
    label: newOption.value,
    disabled: false,
    key: newOption.value,
    title: newOption.value,
  })
  newOption.value = ''
}
</script>

<template>
  <h4>下拉配置</h4>
  <ul>
    <li v-for="item in currentComponent.option.options" :key="item.key">
      {{ item.label }}
    </li>
  </ul>
  <input v-model="newOption">
  <button @click="addOption">
    添加属性
  </button>
</template>

<style scoped lang="less">

</style>

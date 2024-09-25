<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  InputComponentOption,
} from '@/views/meta/FormManager/library/model'

interface Props {
  option: InputComponentOption
  value: any
  displayValue: any
}
const props = withDefaults(defineProps<Props>(), {
  option: undefined,
  value: '',
  displayValue: '',
})
// const props = defineProps({
//   option: {
//     type: Object as PropType<InputComponentOption>,
//     required: true,
//   },
//   value: {
//     required: true,
//     default: () => { return '' },
//   },
// })
</script>

<template>
  <span style="padding: 4px 11px">
    {{ props.displayValue }}
  </span>
</template>

<style scoped lang="less">

</style>

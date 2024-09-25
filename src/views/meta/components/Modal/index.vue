<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  showValue: any
  modelValue: any
  dataSource: Array<any>
  columns: Array<{ title: string; dataIndex: string; key?: string; width?: number }>
}
const props = withDefaults(defineProps<Props>(), {
})

const emit = defineEmits(['update:modelValue'])

const open = ref<boolean>(false)
// 选择数据
function chooseData(record) {
  emit('update:modelValue', record.id)
  open.value = false
}
function showModal() {
  open.value = true
}

function handleOk() {
  open.value = false
}
</script>

<template>
  <div>
    <a-input :value="props.showValue" @click="showModal" />
    <a-modal v-model:open="open" width="1000px" title="Basic Modal" @ok="handleOk">
      <!--  打开以后显示formId对应的表单内容  -->
      <a-table :columns="[...props.columns, { key: 'operate', name: '操作', width: 20 }]" :data-source="props.dataSource">
        <template #headerCell="{ column }">
          <span>
            {{ column.name }}
          </span>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column?.key === 'operate'">
            <a @click="chooseData(record)">
              选择
            </a>
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

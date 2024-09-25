<script lang="ts" setup>
import { type Ref, ref, onBeforeMount } from 'vue'
// import { listData } from '@/views/meta/api/data'
// import { getFieldinfo, getFieldinfoPage } from '@/views/meta/api/fieldinfo'
import { injectMetadata } from "@/views/meta/FormManager/common/useInjection";
interface Props {
  field: string
  value?: number
  displayValue?: any
}
const props = withDefaults(defineProps<Props>(), {
  value: 0,
})
// TODO 要添加客户端缓存功能 有过期时间且允许手动刷新

const emit = defineEmits(['change'])

const { metadata } = injectMetadata()
const reference = JSON.parse(<string>(metadata.value.fieldMap[props.field].refInfo))
const referFieldMeta = ref({})
const open = ref<boolean>(false)
const columns: Ref<Array<{ name: string; dataIndex: string; key: string }>> = ref([])
const data = ref([])
// 加载表头
function loadColumn() {
  // TODO 列表配置还没写完, 现在暂时这样取数
  // getFieldinfoPage(reference).then((res) => {
  //   res = res.list
  //   res.sort((a, b) => a.id - b.id)
  //   columns.value = []
  //   for (const item of res) {
  //     columns.value.push({
  //       name: item.name,
  //       dataIndex: item.code,
  //       key: item.code,
  //     })
  //   }
  //   columns.value.push({
  //     name: '操作',
  //     dataIndex: 'operate',
  //     key: 'operate',
  //   })
  // }).catch((err) => {
  //   console.log(err)
  // })
}
function loadData() {
  // listData({ id: reference.formId }).then((res) => {
  //   data.value = res
  // }).catch((err) => {
  //   console.log(err)
  // })
}
function loadMeta() {
  // getFieldinfo(reference.fieldId).then((field) => {
  //   referFieldMeta.value = field
  //   console.log(referFieldMeta.value)
  // })
}
// 选择数据
function chooseData(record) {
  emit('change', record.id, record[referFieldMeta.value.code])
  open.value = false
}
function showModal() {
  loadColumn()
  loadData()
  open.value = true
}

function handleOk() {
  open.value = false
}
onBeforeMount(() => {
  if (reference)
    loadMeta()
})
</script>

<template>
  <div>
    <a-input :value="props.displayValue" @click="showModal" />
    <a-modal v-model:open="open" width="1000px" title="Basic Modal" @ok="handleOk">
      <!--  打开以后显示formId对应的表单内容  -->
      <a-table :columns="columns" :data-source="data">
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

<script lang="ts" setup>
import {onBeforeMount, PropType, Ref} from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { listDataByParam } from '@/views/meta/api/data'
// import { getFieldinfoPage } from '@/views/meta/api/fieldinfo'

const props = defineProps({
  formId: {
    required: true,
  },
  relationFieldId: {
    type: String,
    default: '',
  },
  formArtifact: {
    type: Object as PropType<NonNullable<unknown>>,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
})
const router = useRouter()
const columns: Ref<Array<{ name: string; dataIndex: string; key: string }>> = ref([])
const data = ref([])

// 加载表头
function loadColumn(formId) {
  // TODO 列表配置还没写完, 现在暂时这样取数
  // getFieldinfoPage({ formId }).then((res) => {
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
// 加载数据
function loadData(formId, fieldId, value) {
  // listDataByParam({ formId, fieldId, value }).then((res) => {
  //   data.value = res
  // }).catch((err) => {
  //   console.log(err)
  // })
}
// 初始化列表页面 加载表头和数据
function initList() {
  loadColumn(props.formId)
  console.log(props.formArtifact)
  loadData(props.formId, props.relationFieldId, props.formArtifact?.id?.value)
}
function openDetail(record: Recordable) {
  // router.push({
  //   name: 'formRender',
  //   query: {
  //     viewId: route.query.viewId,
  //     formId: route.query.formId,
  //     busiId: record.id,
  //   },
  // })
}
onBeforeMount(() => {
  initList()
})
</script>

<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <span>
          {{ column.name }}
        </span>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column?.key === 'operate'">
          <a @click="openDetail(record)">
            查看详情
          </a>
        </template>
      </template>
    </a-table>
  </div>
</template>

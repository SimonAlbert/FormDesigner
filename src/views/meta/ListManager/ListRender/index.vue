<script lang="ts" setup>
import type { Ref } from 'vue'
import { onBeforeMount, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { listData } from '@/views/meta/api/data'
import { getFieldinfoPage } from '@/views/meta/api/fieldinfo'

const route = useRoute()
const router = useRouter()
/**
 * viewId
 * formId
 */
const columns: Ref<Array<{ name: string; dataIndex: string; key: string }>> = ref([])
const data = ref([])
// 加载表头
async function loadColumn(formId) {
  // TODO 列表配置还没写完, 现在暂时这样取数
  getFieldinfoPage({ formId }).then((res) => {
    res = res.list
    res.sort((a, b) => a.id - b.id)
    columns.value = []
    for (const item of res) {
      columns.value.push({
        name: item.name,
        dataIndex: item.code,
        key: item.code,
      })
    }
    columns.value.push({
      name: '操作',
      dataIndex: 'operate',
      key: 'operate',
    })
  }).catch((err) => {
    console.log(err)
  })
}
// 加载数据
function loadData(formId) {
  listData({ id: formId }).then((res) => {
    data.value = res
  }).catch((err) => {
    console.log(err)
  })
}
// 初始化列表页面 加载表头和数据
function initList(viewId, formId) {
  loadColumn(formId)
  loadData(formId)
}
onBeforeMount(() => {
  initList(route.query.viewId, route.query.formId)
})
// 路由更新时重新加载视图
onBeforeRouteUpdate((to, from) => {
  initList(to.query.viewId, to.query.formId)
})

function openDetail(record: Recordable) {
  router.push({
    name: 'formRender',
    query: {
      viewId: route.query.viewId,
      formId: route.query.formId,
      busiId: record.id,
    },
  })
}
</script>

<template>
  <div>
    <a-space>
      <button @click="openDetail({})">
        add
      </button>
    </a-space>
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

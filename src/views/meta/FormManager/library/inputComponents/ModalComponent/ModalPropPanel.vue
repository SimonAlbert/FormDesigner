<script setup lang="ts">
import {ComputedRef, onBeforeMount, Ref} from 'vue'
import { computed, inject, ref } from 'vue'
import type { ComponentProp, Metadata } from '@/views/meta/FormManager/library/model'
import type {
  ModalComponentOption,
} from '@/views/meta/FormManager/library/inputComponents/ModalComponent'
import Modal from '@/views/meta/components/Modal/index.vue'
// import {getForminfoPage} from "@/views/meta/api/forminfo";
// import {getFieldinfoPage} from "@/views/meta/api/fieldinfo";

const currentComponent: Ref<ComponentProp<ModalComponentOption>>
  = inject('currentComponent') as Ref<ComponentProp<ModalComponentOption>>
const metadata: Ref<Metadata>
  = inject('metadata') as Ref<Metadata>
// 单纯为了书写方便
const option: ComputedRef<ModalComponentOption>
  = computed<ModalComponentOption>(() => currentComponent.value.option as ModalComponentOption)
const reference: Ref<{ formId: number; formName: string; fieldId: number; fieldName: string }>
  = ref({ formId: 0, formName: '', fieldId: 0, fieldName: '' })

const formList = ref([])
const formColumns = [
  {
    title: '主键',
    dataIndex: 'id',
    width: 20,
  },
  {
    title: '编码',
    dataIndex: 'code',
    width: 160,
  },
  {
    title: '业务名称',
    dataIndex: 'name',
    width: 160,
  },
]
function initFormList() {
  // getForminfoPage({}).then(res => {
  //   console.log(res)
  //   formList.value = res.list
  // })
}
const fieldList = ref([])
const fieldColumns = [
  {
    title: '主键',
    dataIndex: 'id',
    width: 20,
  },
  {
    title: '编码',
    dataIndex: 'code',
    width: 50,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 50,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 50,
  },
  {
    title: '参照信息',
    dataIndex: 'refInfo',
    width: 100,
  },
]
function initFieldList() {
  if (!reference.value?.formId)
    return
  // getFieldinfoPage({ formId: reference.value.formId }).then(res => {
  //   fieldList.value = res.list
  // })
}
function handleChange(e, p) {
  reference.value[p] = e
  metadata.value.fieldMap[option.value.field].refInfo = JSON.stringify(reference.value)
}
onBeforeMount(() => {
  if (!metadata.value.fieldMap[option.value.field])
    metadata.value.fieldMap[option.value.field].refInfo = JSON.stringify(reference.value)
  let r = JSON.parse(<string>metadata.value.fieldMap[option.value.field].refInfo)
  if (r)
    reference.value = r
  initFormList()
  initFieldList()
})
</script>

<template>
  <div>
    <h3>Modal配置</h3>
    <template v-if="option.field">
      参照数据源:<Modal :show-value="reference.formId"
                        :columns="formColumns"
                        v-model="reference.formId"
                        :data-source="formList"
                        @update:model-value="e => {reference.formId = e; initFieldList(); handleChange(e, 'formId')}"
      />
<!-- <a-input-number :value="reference.formId" @change="e => handleChange(e, 'formId')" /> -->
      参照目标字段:<Modal :show-value="reference.fieldId"
                          :columns="fieldColumns"
                          v-model="reference.fieldId"
                          :data-source="fieldList"
                          @update:model-value="e => {reference.fieldId = e; handleChange(e, 'fieldId')}"
      />
<!-- <a-input-number :value="reference.fieldId" @change="e => handleChange(e, 'fieldId')" /> -->
    </template>
  </div>
</template>

<style scoped lang="less">

</style>

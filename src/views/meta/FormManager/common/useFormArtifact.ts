import type { Ref } from 'vue'
import { ref } from 'vue'
import type { FormArtifact } from '@/views/meta/FormManager/library/model'
import { addData, detailData, updateData } from '@/views/meta/api/data'

// 加载数据
function loadFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {
  detailData(formInfo.value).then((res) => {
    formArtifact.value = res
  }).catch((err) => {
    console.log(err)
  })
}
// 保存数据
function saveFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {
  if (formArtifact.value) {
    addData({ formId: formInfo.value.formId, formArtifact: formArtifact.value }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
// 更新数据
function updateFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {
  if (formArtifact.value && formInfo.value.busiId) {
    updateData({ formId: formInfo.value.formId, formArtifact: formArtifact.value, busiId: formInfo.value.busiId }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
export function useFormArtifact() {
  const formArtifact: Ref<FormArtifact> = ref({})
  function putArtifactValue(key, displayValue, value) {
    if (!key || !formArtifact.value)
      return
    formArtifact.value[key] = { value, displayValue }
  }
  return {
    formArtifact,
    putArtifactValue,
    loadFormArtifact,
    saveFormArtifact,
    updateFormArtifact,
  }
}

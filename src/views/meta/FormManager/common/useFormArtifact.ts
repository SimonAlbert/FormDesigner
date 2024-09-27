import type { Ref } from 'vue'
import { ref } from 'vue'
import type { FormArtifact } from '@/views/meta/FormManager/common/ComponentLibrary/model'

// 加载数据
function loadFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {

}
// 保存数据
function saveFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {

}
// 更新数据
function updateFormArtifact(formArtifact: Ref<FormArtifact>, formInfo: Ref<{ viewId: number; formId: number; busiId: number }>) {

}
export function useFormArtifact() {
  const formArtifact: Ref<FormArtifact> = ref({})
  function putArtifactValue() {
  }
  return {
    formArtifact,
    putArtifactValue,
    loadFormArtifact,
    saveFormArtifact,
    updateFormArtifact,
  }
}

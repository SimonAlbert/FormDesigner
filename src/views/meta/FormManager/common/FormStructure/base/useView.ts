import type { Ref } from 'vue'
import { ref } from 'vue'
import type { View } from '@/views/meta/FormManager/library/model'

// 加载视图
function loadView(view: Ref<View>, viewId) {
  view.value.formId = 1
  view.value.maxKey = 1
  view.value.viewContent = {}
  view.value.fieldContent = {}
  if (!view.value.viewContent)
    view.value.viewContent = []
  if (!view.value.fieldContent)
    view.value.fieldContent = {}
}

export function useView() {
  const view: Ref<View> = ref({
    formId: 0,
    viewContent: [],
    fieldContent: {},
    maxKey: 0,
  })
  return {
    view,
    loadView,
  }
}

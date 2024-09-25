import { type Ref, onBeforeMount, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useFormStructure } from '@/views/meta/FormManager/common/FormStructure/useFormStructure'
import { useFormArtifact } from '@/views/meta/FormManager/common/useFormArtifact'

export function useFormRender() {
  const route = useRoute()
  const formInfo: Ref<{ viewId: number; formId: number; busiId: number }>
    = ref({ viewId: 0, formId: 0, busiId: 0 })
  const editing = ref(false)
  const {
    view,
    metadata,
    loadFormStructure,
  } = useFormStructure()
  const {
    formArtifact,
    putArtifactValue,
    loadFormArtifact,
    saveFormArtifact,
    updateFormArtifact,
  } = useFormArtifact()

  function init(query) {
    formInfo.value = query
    loadFormStructure(formInfo.value)
    if (formInfo.value.busiId)
      loadFormArtifact(formArtifact, formInfo)
    else
      editing.value = true
  }
  // 组件挂载时加载视图
  onBeforeMount(() => {
    console.log(route.query)
    init(route.query)
  })
  // 路由更新时重新加载视图
  onBeforeRouteUpdate((to, from) => {
    if (to.query.viewId === from.query.viewId
      && to.query.formId === from.query.formId
      && to.query.busiId === from.query.busiId)
      return
    init(to.query)
  })
  return {
    formInfo,
    editing,
    view,
    metadata,
    formArtifact,
    putArtifactValue,
    saveFormArtifact: () => {
      if (formInfo.value.busiId)
        updateFormArtifact(formArtifact, formInfo)
      else
        saveFormArtifact(formArtifact, formInfo)
    },
  }
}

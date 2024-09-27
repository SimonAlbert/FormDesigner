import { onBeforeMount } from 'vue'
import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'
import { useFormStructure } from '@/views/meta/FormManager/common/FormStructure/useFormStructure'
import { useComponentLibrary } from '@/views/meta/FormManager/common/ComponentLibrary/useComponentLibrary'

import { useGroup } from '@/views/meta/FormManager/common/DraggableGroup/useGroup'


export function useFormDesigner() {
  const {
    view,
    metadata,
  } = useFormStructure()

  const {
    current,
    setCurrent
  } = useCurrentComponent()

  const {
    componentPropLibrary,
    componentMap,
    propPanelMap,
    readonlyComponentMap
  } = useComponentLibrary()
  const {
    libraryGroup
  } = useGroup()

  function init(viewId: any) {
    if (!viewId)
      return
  }

  // 组件挂载时加载视图
  onBeforeMount(() => {
    // init(route.query.id)
    init(undefined)
  })
  // 路由更新时重新加载视图
  // onBeforeRouteUpdate((to, from) => {
  //   console.log(from)
  //   init(to.query.id)
  // })
  return {
    view,
    metadata,
    current,
    setCurrent,
    libraryGroup,
    componentPropLibrary,
    componentMap,
    propPanelMap,
    readonlyComponentMap
  }
}

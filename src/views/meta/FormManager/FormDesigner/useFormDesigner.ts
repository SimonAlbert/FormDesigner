import { onBeforeMount } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useGroup } from '@/views/meta/FormManager/common/draggable/useGroup'
import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'
import { useFormStructure } from '@/views/meta/FormManager/common/FormStructure/useFormStructure'
import { prop2field } from '@/views/meta/FormManager/library/util'
import type {
  ComponentOption,
  ComponentProp,
  InputComponentOption,
  SingleComponentOption,
} from '@/views/meta/FormManager/library/model'


export function useFormDesigner() {
  const { libraryGroup, formGroup } = useGroup()
  const { currentComponent } = useCurrentComponent()
  const {
    view,
    metadata,
    loadFormStructure,
  } = useFormStructure()

  function init(viewId: any) {
    if (!viewId)
      return
    loadFormStructure({ viewId })
  }
  function updateCurrentField(k: string, v: any) {
    // const cur = currentComponent as Ref<ComponentProp<SingleComponentOption>>
    // metadata.value.fieldMap[cur.value.option.field][k] = v
    // view.value.fieldContent[cur.value.option.field][k] = v
  }
  // 从组件库拖拽创建新组件
  function createComponent(item: ComponentProp<ComponentOption>) {
    console.log(item)
    if (item.option.uniqueKey)
      return
    const maxKey = view.value.maxKey
    view.value.maxKey += 1
    const option = <InputComponentOption>(item.option)
    switch (item.componentLogicType) {
      case 'input':
        if (option.inputMode === 'single') {
          // 1.用于新增的field
          const field = prop2field(<ComponentProp<SingleComponentOption>>item)
          if (!field.code) {
            field.name = field.name + maxKey
            field.code = `field_${maxKey}`
            field.formId = view.value.formId
            // 3.新field放入metadata
            metadata.value.fieldList.push(field)
            if (field.code) {
              metadata.value.fieldMap[field.code] = field
              // 4.新field放入fieldContent
              view.value.fieldContent[field.code] = cloneDeep(field)
            }
            // 5.构造prop
            if (field.code != null) {
              (<SingleComponentOption>item.option).field = field.code
              item.option.uniqueKey = `${field.code}_${maxKey}`
            }
            item.option.label = field.name
            console.log(item)
          }
          else {
            (<SingleComponentOption>item.option).field = field.code
            item.option.uniqueKey = `${field.code}_${maxKey}`
            item.option.label = field.name
          }
        }
        break
      case 'layout':
      case 'container':
      default:
        item.option.uniqueKey = `${item.componentType}_${maxKey}`
    }
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
    libraryGroup,
    formGroup,
    currentComponent,
    view,
    metadata,
    updateCurrentField,
    createComponent,
  }
}

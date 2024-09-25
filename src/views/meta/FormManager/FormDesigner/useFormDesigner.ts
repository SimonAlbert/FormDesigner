import type { Ref } from 'vue'
import { computed, onBeforeMount } from 'vue'
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

// import { createFieldinfo, getFieldinfo } from '@/views/meta/api/fieldinfo'
import { componentPropMap } from '@/views/meta/FormManager/library/register/RegisterComponentLibrary'

export function useFormDesigner() {
  const { libraryGroup, formGroup } = useGroup()
  const { currentComponent, setCurrentComponent } = useCurrentComponent()
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
    const cur = currentComponent as Ref<ComponentProp<SingleComponentOption>>
    metadata.value.fieldMap[cur.value.option.field][k] = v
    view.value.fieldContent[cur.value.option.field][k] = v
  }
  // 从组件库拖拽创建新字段
  function createComponent(item: ComponentProp<ComponentOption>) {
    if (item.option.key)
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
              item.option.key = `${field.code}_${maxKey}`
            }
            item.option.label = field.name
            console.log(item)
          }
          else {
            (<SingleComponentOption>item.option).field = field.code
            item.option.key = `${field.code}_${maxKey}`
            item.option.label = field.name
          }
        }
        break
      case 'layout':
      case 'container':
      default:
        item.option.key = `${item.componentType}_${maxKey}`
    }
  }
  const fieldSource
    = computed(() => {
      return Object.values(view.value.fieldContent).map((field) => {
        const prop = cloneDeep(componentPropMap[field.component])
        prop.option.label = field.name
        prop.option.field = field.code
        return prop
      })
    })
  // 组件挂载时加载视图
  onBeforeMount(() => {
    // init(route.query.id)
    init()
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
    setCurrentComponent,
    view,
    metadata,
    fieldSource,
    updateCurrentField,
    createComponent,
  }
}

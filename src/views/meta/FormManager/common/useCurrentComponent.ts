import type {
  ComponentOption,
  ComponentProp, InputComponentOption,
  SingleComponentOption
} from '@/views/meta/FormManager/common/ComponentLibrary/model'
import { defineStore, storeToRefs } from 'pinia'
import { prop2field } from '@/views/meta/FormManager/common/ComponentLibrary/util'
import { useFormStructure } from '@/views/meta/FormManager/common/FormStructure/useFormStructure'



const useCurrentComponentStore = defineStore('CurrentComponent', {
  state: (): { current: ComponentProp<ComponentOption> | undefined} => ({
    current: undefined
  }),
  getters: {
    getCurrent(state) {return state.current}
  },
  actions: {
    setCurrent(current: ComponentProp<ComponentOption> | undefined) {
      this.current = current
    },
    // PropPanel中编辑current组件的属性后, 更新metadata和view
    afterComponentUpdate(k: string, v: any) {

    },
    afterComponentCreate(item: ComponentProp<ComponentOption>) {
      const {
        view,
        metadata,
      } = useFormStructure()
      console.log(item)
      if (item.option.uniqueKey || !view.value)
        return
      const maxKey = view.value.maxComponentKey
      view.value.maxComponentKey += 1
      const option = <InputComponentOption>(item.option)
      switch (item.componentLogicType) {
        case 'input':
          if (option.inputMode === 'single') {
            // 1.用于新增的field
            const field = prop2field(<ComponentProp<SingleComponentOption>>item)
            if (!field.code) {
              field.name = field.name + maxKey
              field.code = `field_${maxKey}`
              // 3.新field放入metadata
              if (field.code) {
                metadata.value.fieldMap[field.code] = field
              }
              // 5.构造prop
              (<SingleComponentOption>item.option).field = field.code
              item.option.uniqueKey = `${field.code}_${maxKey}`
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
  }
})
export function useCurrentComponent() {

  const store = useCurrentComponentStore()
  const { setCurrent, getCurrent, afterComponentCreate, afterComponentUpdate } = store
  const { current } = storeToRefs(store)
  return  {
    current,
    setCurrent,
    getCurrent,
    afterComponentCreate,
    afterComponentUpdate
  }
}


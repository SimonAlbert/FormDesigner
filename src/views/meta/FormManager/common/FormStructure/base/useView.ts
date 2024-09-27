import type { View } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import { defineStore, storeToRefs } from 'pinia'
const useViewStore = defineStore('View', {
  state: (): { view: View} => ({
    view: {
      maxComponentKey: 0,
      metadata: {
        loaded: false,
        form: {
          maxFieldKey: 0,
        },
        fieldMap: {},
      },
      viewContent: []
    }
  }),
  getters: {
    getView(state) {return state.view}
  },
  actions: {
    setView(v: View) {
      this.view = v
    }
  }
})
export function useView() {
  const store = useViewStore()
  const { getView, setView } = store
  const { view } = storeToRefs(store)
  return  {
    view,
    setView,
    getView
  }
}
// export function useView() {
//   const view: Ref<View> = ref({
//     formId: 0,
//     maxKey: 0,
//     viewContent: [],
//     maxComponentKey: 0,
//     view: {
//       loaded: false,
//       form: {
//         maxFieldKey: 0
//       },
//       fieldMap: {},
//       subTableMap: {}
//     }
//   })
//   return {
//     view
//   }
// }

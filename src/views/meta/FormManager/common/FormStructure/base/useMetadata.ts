
import { defineStore, storeToRefs } from 'pinia'
import type { Metadata } from '@/views/meta/FormManager/common/ComponentLibrary/model'

const useMetadataStore = defineStore('Metadata', {
  state: (): { metadata: Metadata } => {
    console.log("重建")
    return {
      metadata: {
        loaded: false,
        form: {
          maxFieldKey: 0,
        },
        fieldMap: {},
      }
    }
  },
  getters: {
    getMetadata(state) {return state.metadata}
  },
  actions: {
    setMetadata(md: Metadata) {
      this.metadata = md
    }
  }
})
export function useMetadata() {
  const store = useMetadataStore()
  const { getMetadata, setMetadata } = store
  const { metadata } = storeToRefs(store)
  return  {
    metadata,
    setMetadata,
    getMetadata
  }
}

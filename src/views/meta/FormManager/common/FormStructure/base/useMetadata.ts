import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Metadata } from '@/views/meta/FormManager/library/model'
// import { metaDataByFormId, metaDataByViewId, rollbackMetadata, updateMetadata } from '@/views/meta/api/metadata'

function initMeta(metadata: Ref<Metadata>, md) {
  metadata.value = md
  if (metadata.value) {
    metadata.value.fieldList.forEach((item) => {
      if (metadata.value && item.code)
        metadata.value.fieldMap[item.code] = item
    })
  }
  metadata.value.loaded = true
}
function loadMetadata(metadata: Ref<Metadata>, params: { formId?: number; viewId?: number }) {
  if (params.formId) {
    metaDataByFormId(params.formId).then((md) => {
      initMeta(metadata, md)
    }).catch((err) => {
      console.log(err)
    })
  }
  else if (params.viewId) {
    metaDataByViewId(params.viewId).then((md) => {
      initMeta(metadata, md)
    }).catch((err) => {
      console.log(err)
    })
  } else {
    initMeta(metadata, {})
  }
}
function saveMetadata(metadata: Ref<Metadata>) {
  return updateMetadata(metadata.value)
}

export function useMetadata() {
  const metadata: Ref<Metadata> = ref({
    loaded: false,
    form: {},
    fieldMap: {},
    fieldList: [],
  })
  return {
    metadata,
    loadMetadata,
  }
}

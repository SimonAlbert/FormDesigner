import { useMetadata } from './base/useMetadata'
import { useView } from '@/views/meta/FormManager/common/FormStructure/base/useView'

export function useFormStructure() {
  const { metadata, loadMetadata } = useMetadata()
  const { view, loadView } = useView()

  function loadFormStructure(params: { formId?: number; viewId: number }) {
    loadView(view, params.viewId)
    loadMetadata(metadata, {})
  }
  return {
    metadata,
    view,
    loadFormStructure,
  }
}

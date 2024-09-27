import { useMetadata } from './base/useMetadata'
import { useView } from '@/views/meta/FormManager/common/FormStructure/base/useView'

export function useFormStructure() {
  const { metadata } = useMetadata()
  const { view } = useView()

  return {
    metadata,
    view,
  }
}

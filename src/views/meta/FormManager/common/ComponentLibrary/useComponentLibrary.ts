import { componentPropLibrary } from '@/views/meta/FormManager/common/ComponentLibrary/register/ComponentPropRegister'
import { componentMap } from '@/views/meta/FormManager/common/ComponentLibrary/register/ComponentRegister'
import { propPanelMap } from '@/views/meta/FormManager/common/ComponentLibrary/register/ComponentPropPanelRegister'
import { readonlyComponentMap } from '@/views/meta/FormManager/common/ComponentLibrary/register/ComponentReadonlyRegister'

export function useComponentLibrary() {
  return {
    componentPropLibrary,
    componentMap,
    propPanelMap,
    readonlyComponentMap
  }
}

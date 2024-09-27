import type {
  ComponentOption,
  ComponentProp,
  InputComponentType,
  SingleComponentOption,
} from '@/views/meta/FormManager/common/ComponentLibrary/model'

import { textComponentProp } from '@/views/meta/FormManager/common/ComponentLibrary/input/TextComponent'
import {
  selectComponentProp,
} from '@/views/meta/FormManager/common/ComponentLibrary/input/SelectComponent'
import { gridComponentProp } from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'

export const componentPropLibrary: ComponentProp<ComponentOption>[] = [
  textComponentProp,
  selectComponentProp,
  gridComponentProp,
]

export const inputComponentPropMap: { [key in InputComponentType]: ComponentProp<SingleComponentOption> } = {
  Input: textComponentProp,
  Select: selectComponentProp,
}

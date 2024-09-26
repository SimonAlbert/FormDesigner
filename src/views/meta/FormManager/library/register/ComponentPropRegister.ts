import type {
  ComponentOption,
  ComponentProp,
  InputComponentType,
  SingleComponentOption,
} from '@/views/meta/FormManager/library/model'

import { textComponentProp } from '@/views/meta/FormManager/library/inputComponents/TextComponent'
import {
  selectComponentProp,
} from '@/views/meta/FormManager/library/inputComponents/SelectComponent'
import {
  modalComponentProp,
} from '@/views/meta/FormManager/library/inputComponents/ModalComponent'
import { gridComponentProp } from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import {
  subTableComponentProp,
} from '@/views/meta/FormManager/library/containerComponents/SubTableComponent'

export const componentPropLibrary: ComponentProp<ComponentOption>[] = [
  textComponentProp,
  selectComponentProp,
  modalComponentProp,
  gridComponentProp,
  subTableComponentProp,
]

export const inputComponentPropMap: { [key in InputComponentType]: ComponentProp<SingleComponentOption> } = {
  Input: textComponentProp,
  Select: selectComponentProp,
  Modal: modalComponentProp,
}

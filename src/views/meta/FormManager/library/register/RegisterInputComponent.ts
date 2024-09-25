import {
  Input,
  Select,
} from 'ant-design-vue'
import { ModalInput }
  from '@/views/meta/FormManager/library/inputComponents/ModalComponent'
import { SubTableInput }
  from '@/views/meta/FormManager/library/containerComponents/SubTableComponent'
import type { ComponentMap } from '@/views/meta/FormManager/library/model'

export const inputComponentMap: ComponentMap = {
  Input,
  Select,
  Modal: ModalInput,
  Grid: {},
  SubTable: SubTableInput,
}

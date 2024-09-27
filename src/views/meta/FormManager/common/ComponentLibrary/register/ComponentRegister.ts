import {
  Input,
  Select,
} from 'ant-design-vue'
import type { ComponentMap } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import { GridLayout } from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'

export const componentMap: ComponentMap = {
  Input,
  Select,
  Grid: GridLayout,
}

import type { ComponentMap } from '@/views/meta/FormManager/library/model'
import SingleRead from '@/views/meta/FormManager/library/inputComponents/SingleRead.vue'
import { GridLayout } from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import { SubTableInput } from '@/views/meta/FormManager/library/containerComponents/SubTableComponent'

// 只读时的组件(暂不启用)
export const readonlyComponentMap: ComponentMap = {
  Input: SingleRead,
  Select: SingleRead,
  Modal: SingleRead,
  Grid: GridLayout,
  SubTable: SubTableInput,
}

import type { ComponentMap } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import SingleRead from '@/views/meta/FormManager/common/ComponentLibrary/input/SingleRead.vue'
import { GridLayout } from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'

// 只读时的组件(暂不启用)
export const readonlyComponentMap: ComponentMap = {
  Input: SingleRead,
  Select: SingleRead,
  Grid: GridLayout,
}

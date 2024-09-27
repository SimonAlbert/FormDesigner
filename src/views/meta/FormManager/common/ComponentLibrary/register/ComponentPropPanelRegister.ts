import { SelectPropPanel }
  from '@/views/meta/FormManager/common/ComponentLibrary/input/SelectComponent'
import { GridPropPanel }
  from '@/views/meta/FormManager/common/ComponentLibrary/layout/GridComponent'
import { TextPropPanel }
  from '@/views/meta/FormManager/common/ComponentLibrary/input/TextComponent'
import type { ComponentMap } from '@/views/meta/FormManager/common/ComponentLibrary/model'

export const propPanelMap: ComponentMap = {
  Input: TextPropPanel,
  Select: SelectPropPanel,
  Grid: GridPropPanel,
  SubTable: {},
  Modal: {},
}

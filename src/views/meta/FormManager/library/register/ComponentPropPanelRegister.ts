import { SelectPropPanel }
  from '@/views/meta/FormManager/library/inputComponents/SelectComponent'
import { ModalPropPanel }
  from '@/views/meta/FormManager/library/inputComponents/ModalComponent'
import { GridPropPanel }
  from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import { SubTablePropPanel }
  from '@/views/meta/FormManager/library/containerComponents/SubTableComponent'
import { TextPropPanel }
  from '@/views/meta/FormManager/library/inputComponents/TextComponent'
import type { ComponentMap } from '@/views/meta/FormManager/library/model'

export const propPanelMap: ComponentMap = {
  Input: TextPropPanel,
  Select: SelectPropPanel,
  Modal: ModalPropPanel,
  Grid: GridPropPanel,
  SubTable: SubTablePropPanel,
}

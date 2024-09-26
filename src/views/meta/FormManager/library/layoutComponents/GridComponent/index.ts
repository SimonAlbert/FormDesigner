import type { ComponentOption, ComponentProp, LayoutComponentOption } from '../../model'
import GridPropPanel from './GridPropPanel.vue'
import GridLayout from './GridLayout.vue'

interface GridComponentOption extends LayoutComponentOption {
  children: Array<Array<Array<ComponentProp<ComponentOption>>>>
  column: number // 每行个数
  row: number // 每列个数
}

const gridComponentProp: ComponentProp<GridComponentOption> = {
  // 组件类型
  typeName: '简单网格格栅',
  componentLogicType: 'layout',
  // 渲染组件
  componentType: 'Grid',
  // 组件选项options,决定怎样渲染
  option: {
    // 表单输入项label
    label: '',
    uniqueKey: '',
    // 列
    column: 3,
    row: 1,
    children: [
      [[], [], []]
    ]
  },
}

export {
  GridPropPanel,
  GridLayout,
  type GridComponentOption,
  gridComponentProp,
}

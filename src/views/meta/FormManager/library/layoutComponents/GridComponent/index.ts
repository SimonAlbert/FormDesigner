import type { ComponentOption, ComponentProp, LayoutComponentOption } from '../../model'
import GridPropPanel from './GridPropPanel.vue'

interface GridComponentOption extends LayoutComponentOption {
  children: ComponentProp<ComponentOption>[][]
  size: number // 每行个数
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
    key: '',
    size: 3,
    children: [
      [],
      [],
      [],
    ],
  },
}

export {
  GridPropPanel,
  GridComponentOption,
  gridComponentProp,
}

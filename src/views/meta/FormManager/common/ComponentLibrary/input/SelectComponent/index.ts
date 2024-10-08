import type { ComponentProp, SingleComponentOption } from '@/views/meta/FormManager/common/ComponentLibrary/model'
import SelectPropPanel from './SelectPropPanel.vue'

interface SelectComponentOption extends SingleComponentOption {
  options: Array<{ value: any; label: string; disabled: boolean; key: string; title: string }>
  mode: string
}

const selectComponentProp: ComponentProp<SelectComponentOption> = {
  // 组件类型
  typeName: '下拉选择',
  componentLogicType: 'input',
  // 渲染组件
  componentType: 'Select',
  // 组件选项options,决定怎样渲染
  option: {
    defaultType: 'VARCHAR',
    // 表单输入项label
    label: '下拉选择',
    inputMode: 'single',
    // 表单输入项绑定字段
    field: '',
    uniqueKey: '',
    options: [],
    mode: '',
  },
}

export {
  SelectPropPanel,
 type SelectComponentOption,
  selectComponentProp,
}

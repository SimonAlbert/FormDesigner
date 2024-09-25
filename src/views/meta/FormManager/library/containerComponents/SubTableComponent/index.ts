import SubTableInput
  from './SubTableInput.vue'
import SubTablePropPanel
  from './SubTablePropPanel.vue'
import type { ComponentProp, ContainerComponentOption } from '@/views/meta/FormManager/library/model'

interface SubTableComponentOption extends ContainerComponentOption {
  formId: number | string
  relationFieldId: number | string
}

const subTableComponentProp: ComponentProp<SubTableComponentOption> = {
  // 组件类型
  typeName: 'SubTable子表',
  componentLogicType: 'container',
  // 渲染组件
  componentType: 'SubTable',
  // 组件选项options,决定怎样渲染
  option: {
    // 表单输入项label
    label: 'SubTable子表',
    key: '',
    formId: '',
    relationFieldId: '',
  },
}
export {
  SubTableInput,
  SubTablePropPanel,
  SubTableComponentOption,
  subTableComponentProp,
}

import ModalPropPanel
  from './ModalPropPanel.vue'
import ModalInput
  from './ModalInput.vue'
import type { ComponentProp, SingleComponentOption } from '@/views/meta/FormManager/library/model'

interface ModalComponentOption extends SingleComponentOption {
}

const modalComponentProp: ComponentProp<ModalComponentOption> = {
  // 组件类型
  typeName: 'Modal弹窗',
  componentLogicType: 'input',
  // 渲染组件
  componentType: 'Modal',
  // 组件选项options,决定怎样渲染
  option: {
    defaultType: 'VARCHAR',
    // 表单输入项label
    label: 'Modal弹窗',
    inputMode: 'single',
    // 表单输入项绑定字段
    field: '',
    uniqueKey: '',
  },
}

export {
  ModalInput,
  ModalPropPanel,
  type ModalComponentOption,
  modalComponentProp,
}

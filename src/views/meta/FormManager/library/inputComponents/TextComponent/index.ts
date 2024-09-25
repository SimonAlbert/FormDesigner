import TextPropPanel
  from './TextPropPanel.vue'
import type { ComponentProp, SingleComponentOption } from '@/views/meta/FormManager/library/model'

interface TextComponentOption extends SingleComponentOption {
  placeholder: string
}

const textComponentProp: ComponentProp<TextComponentOption> = {
  // 组件类型
  typeName: '输入框',
  componentLogicType: 'input',
  // 渲染组件
  componentType: 'Input',
  // 组件选项options,决定怎样渲染
  option: {
    defaultType: 'VARCHAR',
    // 表单输入项label
    label: '输入框',
    inputMode: 'single',
    // 表单输入项绑定字段
    field: '',
    key: '',
    placeholder: '请输入内容',
  },
}
export {
  TextPropPanel,
  TextComponentOption,
  textComponentProp,
}

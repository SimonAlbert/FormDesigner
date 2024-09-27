// 输入组件类型
type InputComponentType =
  | 'Input'
  | 'Select'
// 组件类型
type ComponentType =
  InputComponentType
  | 'Grid'
// 字段类型
type FieldType = 'VARCHAR' | 'BIGINT'

/**
 * 组件属性分两部分
 * 1. 通用基本属性: 组件唯一标志,颜色,边框等每个组件都需要有的基本属性
 * 2. 组件定义属性: 不同组件可以继承并扩展自己需要的配置项, 比如下拉选项,模态框的数据来源
 */
/**
 * TODO 20240313 这里还可以把Option再次细分成布局和输入
 */
interface ComponentOption {
  // 组件标签
  label: string
  // 唯一标志
  uniqueKey: string
}
// 子表等容器
interface ContainerComponentOption extends ComponentOption {
}
// 输入型组件
interface InputComponentOption extends ComponentOption {
  inputMode: 'single' | 'multi'
}
// 1组件-1字段, 一对一型输入组件
interface SingleComponentOption extends InputComponentOption {
  // 表单输入项绑定字段 TODO 字段应该对应数据源内的字段对象, 这样可以在PropPanel内直接更新数据源字段
  field: string
  defaultType: FieldType
}
// 1组件-多字段, 一对多型输入组件 例如:开始时间和结束时间
interface MultiComponentOption extends InputComponentOption {
}
// 布局型组件
interface LayoutComponentOption extends ComponentOption {
}
// ComponentProp: 决定渲染什么, 所有组件都有的不可编辑属性, 直接挂到组件上
interface ComponentProp<T extends ComponentOption> {
  // 控件名
  typeName: string
  componentLogicType: 'input' | 'layout' | 'container'
  // 渲染组件
  componentType: ComponentType
  // 组件选项options,决定怎样渲染
  option: T
}

// Prop是不可变属性, Option是可变属性

// 填写表单后产出的数据
interface FormArtifact {
  [key: number | string]: { displayValue?: any; value?: any }
}

type ComponentMap = {
  [key in ComponentType]: object
}

interface FieldInfo {
  id?: number
  code?: string
  name: string
  formId?: number
  type: FieldType
  container: boolean
  length: number
  refInfo?: string | undefined
  description?: string
  materialized?: boolean
  component: ComponentType
}
interface FormInfo {
  id?: number
  code?: string
  name?: string
  maxFieldKey: number
  description?: string
  materialized?: boolean
}
interface Metadata {
  loaded: boolean
  form: FormInfo
  fieldMap: { [key: string]: FieldInfo }
  subTableMap?: { [key: string]: Metadata }
}
interface View {
  maxComponentKey: number
  viewContent: Array<ComponentProp<ComponentOption>>
  metadata: Metadata
}
export {
  type InputComponentType,
  type ComponentType,
  type ComponentOption,
  type ContainerComponentOption,
  type InputComponentOption,
  type SingleComponentOption,
  type MultiComponentOption,
  type LayoutComponentOption,
  type ComponentProp,
  type ComponentMap,
  type FormArtifact,
  type FieldInfo,
  type Metadata,
  type View,
  type FieldType,
}

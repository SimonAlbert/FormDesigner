import type {
  ComponentOption,
  ComponentProp,
  FieldInfo,
  InputComponentOption,
  SingleComponentOption,
} from './model'

// 组件库拖出时, 创建字段并添加到档案
function prop2field(prop: ComponentProp<SingleComponentOption>) {
  const field: FieldInfo = {
    code: prop.option.field,
    name: prop.option.label,
    type: prop.option.defaultType,
    container: false,
    length: 256,
    materialized: false,
    component: prop.componentType,
  }
  return field
}
// 下面是一些常用的类型转换方法
function asInput(option: ComponentOption | undefined): InputComponentOption {
  return option as InputComponentOption
}
function asSingle(option: ComponentOption | undefined): SingleComponentOption {
  return option as SingleComponentOption
}
export {
  asInput,
  asSingle,
  prop2field,
}

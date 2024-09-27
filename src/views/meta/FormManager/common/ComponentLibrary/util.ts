import type {
  ComponentProp,
  FieldInfo,
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

export {
  prop2field,
}

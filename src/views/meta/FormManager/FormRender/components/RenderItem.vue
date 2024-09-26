<script lang="ts" setup>
// 整理思路
// 表单设计器里的组件大致分为两类: 1.布局组件 2.字段值渲染组件
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type {
  ComponentOption,
  ComponentProp,
  FormArtifact,
} from '@/views/meta/FormManager/library/model'
import { componentMap, readonlyComponentMap } from '@/views/meta/FormManager/library/register'
import type { GridComponentOption } from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import { asInput, asSingle } from '@/views/meta/FormManager/library/util'
import { injectFormArtifact } from '@/views/meta/FormManager/common/useInjection'

interface Props {
  schema: ComponentProp<ComponentOption>
  formArtifact: FormArtifact
  editing: boolean
}
const props = defineProps<Props>()
const { putArtifactValue } = injectFormArtifact()
const valueItem: ComputedRef<{ value?; displayValue? }> = computed(() => {
  if (props.schema.componentLogicType === 'input'
    && props.formArtifact[asSingle(props.schema?.option).field])
    return props.formArtifact[asSingle(props.schema?.option).field]
  else
    return { value: undefined, displayValue: undefined }
})
// 输入时触发, vue动态组件难以双向绑定, 直接监听输入
function handleChange(_event, displayValue) {
  let newValue
  let newDisplayValue
  switch (props.schema?.componentType) {
    case 'Select':
      newValue = _event
      newDisplayValue = displayValue.label
      break
    case 'Modal':
      newValue = _event
      newDisplayValue = displayValue
      break
    default:
      newValue = _event.target.value
      newDisplayValue = newValue
  }
  // 暂停使用key
  putArtifactValue(asSingle(props.schema?.option).field, newDisplayValue, newValue)
}
function toGrid() {
  return props.schema?.option as GridComponentOption
}
</script>

<template>
  <div class="render-item border">
    <template v-if="schema.componentLogicType === 'layout'">
      <!-- 一.布局组件渲染 -->
      <!--  Simon的留言: 这里的布局组件也可以使用单文件组件  -->
      <!--  我选择直接写在DragItem中, 理由是如果使用更多单文件组件就需要在独立组件中引入DragItem, 使引用关系变得复杂  -->
      <!--  以上论述仅凭直觉得出, 没有经过严谨的推理, 以后可能会改成单文件组件  -->
      <!--  Simon 20240313 VueDraggable实现跨组件拖拽比较麻烦,布局组件又容易涉及复杂嵌套,所以干脆都写在DragItem内  -->
      <!--  1.grid格栅  -->
      <template v-if="schema.componentType === 'Grid'">
        <!--  x行  -->
        <a-row v-for="(x, i) in Math.floor(toGrid().children.length / toGrid().size + 0.5)" :key="x">
          <!--  y列  -->
          <a-col v-for="(y, j) in toGrid().size" :key="y" :span="Math.floor(24 / toGrid().size)">
            <template v-for="(element) in toGrid().children[i * toGrid().size + j]" :key="element.option.uniqueKey">
              <RenderItem
                :schema="element"
                :form-artifact="props.formArtifact"
                :editing="props.editing"
              />
            </template>
          </a-col>
        </a-row>
      </template>
      <!--  2.tab标签  -->
      <!--  3.collapse折叠面板  -->
    </template>
    <template v-else-if="schema.componentLogicType === 'container' && props.formArtifact.id">
      <!-- 二.容器组件渲染 -->
      <template v-if="schema.componentType === 'SubTable'">
        <component
          :is="componentMap[schema.componentType]"
          v-bind="{ ...props.schema?.option }"
          :form-artifact="props.formArtifact"
        />
      </template>
    </template>
    <template v-else-if="schema.componentLogicType === 'input'">
      <!-- 三.输入组件渲染 -->
      <template v-if="asInput(schema.option).inputMode === 'single'">
        <a-form-item :label="asSingle(schema.option).label">
          <!-- 输入输出组件最终要合二为一,实现最大程度的定制化 -->
          <!-- 目前显示和输入超分开是为了充分利用ant-design-vue已有的Select等输入组件,减少工作量 -->
          <template v-if="props.editing">
            <component
              :is="componentMap[schema.componentType]"
              v-bind="{ ...props.schema?.option }"
              :value="valueItem.value"
              :display-value="valueItem.displayValue"
              @change="handleChange"
            />
          </template>
          <template v-else>
            <component
              :is="readonlyComponentMap[schema.componentType]"
              :option="props.schema?.option"
              :value="valueItem.value"
              :display-value="valueItem.displayValue"
            />
          </template>
        </a-form-item>
      </template>
    </template>
  </div>
</template>

<style scoped lang="less">
.render-item {
  padding: 10px;
  margin: 10px; //这里一定要用margin,用padding会导致元素判定边界和实际看到的边界不一致,在vuedraggable中会导致抖动
  position: relative;
}
.border {
  border: 1px solid gainsboro;
}
</style>

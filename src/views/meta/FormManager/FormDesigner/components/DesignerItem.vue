<script lang="ts" setup>
// 整理思路
// 表单设计器里的组件大致分为两类: 1.布局组件 2.字段值渲染组件
import { VueDraggableNext }from 'vue-draggable-next'
import {ref, toRefs} from 'vue'
import { Col, Row } from 'ant-design-vue'
import type {
  ComponentOption,
  ComponentProp,
} from '@/views/meta/FormManager/library/model'
import type { GridComponentOption } from '@/views/meta/FormManager/library/layoutComponents/GridComponent'
import { injectCreateField, injectCurrentComponent } from '@/views/meta/FormManager/common/useInjection'
import Icon, { DeleteOutlined } from '@ant-design/icons-vue'
interface Props {
  parent: Array<ComponentProp<ComponentOption>>
  componentIndex: number
  schema: ComponentProp<ComponentOption>
  group: object
}
const props = defineProps<Props>()
const { parent } = toRefs(props)
const { currentComponent, setCurrentComponent } = injectCurrentComponent()
const { createComponent } = injectCreateField()

function handleChange(dragEvent) {
  console.log(dragEvent)
  const prop = ref(<ComponentProp<ComponentOption>>dragEvent.added?.element)
  createComponent(prop.value)
  setCurrentComponent(prop.value)
}

function handleClick() {
  setCurrentComponent(props.schema as ComponentProp<ComponentOption>)
}
function handleDelete() {
  if (currentComponent.value.option.key === props.schema.option.key)
    setCurrentComponent(undefined)
  parent?.value?.splice(props.componentIndex, 1)
}
function toGrid() {
  return props.schema?.option as GridComponentOption
}
</script>

<template>
  <div
    class="designer-item"
    :class="currentComponent && schema.option.key === currentComponent.option?.key ? 'selectedBorder' : 'border'"
    @click.stop="handleClick"
  >
    <template v-if="schema.componentLogicType === 'layout'">
      <!--  1 布局组件渲染 -->
      <!--  Simon的留言: 这里的布局组件也可以使用单文件组件  -->
      <!--  我选择直接写在DragItem中, 理由是如果使用更多单文件组件就需要在独立组件中引入DragItem, 使引用关系变得复杂  -->
      <!--  以上论述仅凭直觉得出, 没有经过严谨的推理, 以后可能会改成单文件组件  -->
      <!--  Simon 20240313 VueDraggable实现跨组件拖拽比较麻烦,布局组件又容易涉及复杂嵌套,所以干脆都写在DragItem内  -->
      <!--  Simon 20240407 经验证,vue-draggable-next支持跨组件拖拽, 这样就可以把各布局组件的实现拆分, 暂时没有时间改, 先记下  -->
      <!--  1.1 grid格栅  -->
      <template v-if="schema.componentType === 'Grid'">
        <!--  x行  -->
        <Row v-for="(x, i) in Math.floor(toGrid().children.length / toGrid().size + 0.5)" :key="x">
          <!--  y列  -->
          <Col v-for="(y, j) in toGrid().size" :key="y" :span="Math.floor(24 / toGrid().size)">
            <VueDraggableNext
              class="grid-item"
              :list="toGrid().children[i * toGrid().size + j]"
              item-key="option.key"
              :group="props.group"
              animation="300"
              @change="handleChange"
            >
              <transition-group>
                <div v-for="(element,index) in toGrid().children[i * toGrid().size + j]" :key="element.option.key">
                  <DesignerItem
                    :parent="toGrid().children[i * toGrid().size + j]"
                    :component-index="index"
                    :schema="element"
                    :group="props.group"
                    :horizontal="false"
                  />
                </div>
              </transition-group>
            </VueDraggableNext>
          </Col>
        </Row>
      </template>
      <!--  1.2 tab标签  -->
      <!--  1.3 collapse折叠面板  -->
    </template>
    <template v-else-if="schema.componentLogicType === 'container'">
      <!--  2 容器组件渲染 -->
      <!--  2.1 子表 -->
      <template v-if="schema.componentType === 'SubTable'">
        <a-table />
      </template>
    </template>
    <template v-else-if="schema.componentLogicType === 'input'">
      <!--  3 输入组件渲染 -->
      <a-form-item
        :label="schema.option.label"
      >
        <a-input v-bind="{ ...schema?.option }" />
      </a-form-item>
    </template>

    <div
      v-if="currentComponent && schema.option.key === currentComponent.option?.key"
      class="tool-bar"
      @click.stop="handleDelete"
    >
      <DeleteOutlined />
    </div>
  </div>
</template>

<style scoped lang="less">
.designer-item {
  padding: 10px;
  margin: 10px; //这里一定要用margin,用padding会导致元素判定边界和实际看到的边界不一致,在vuedraggable中会导致抖动
  position: relative;
}
.border {
  border: 1px solid deepskyblue;
}
.selectedBorder {
  border: 1px solid #ed082b;
}
.tool-bar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
.grid-item {
  height: 100%;
  min-height: 50px;
  border: 1px dashed lightskyblue;
}
</style>

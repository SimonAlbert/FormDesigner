<script lang="ts" setup>
// 整理思路
// 表单设计器里的组件大致分为两类: 1.布局组件 2.字段值渲染组件
import { VueDraggableNext }from 'vue-draggable-next'
import type { ComponentOption, ComponentProp } from '@/views/meta/FormManager/library/model'
import { injectCreateField, injectCurrentComponent } from '@/views/meta/FormManager/common/useInjection'
import { useGroup } from '@/views/meta/FormManager/common/draggable/useGroup'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { readonlyComponentMap } from '@/views/meta/FormManager/library/register'


interface Props {
  schemaArray: Array<ComponentProp<ComponentOption>>
}
const props = defineProps<Props>()
const { currentComponent, setCurrentComponent } = injectCurrentComponent()
const { createComponent } = injectCreateField()
const { formGroup } = useGroup()

function handleAdded(dragEvent: any) {
  if (dragEvent.added){
    const prop = <ComponentProp<ComponentOption>>(dragEvent.added.element)
    createComponent(prop)
    // setCurrentComponent(prop)
    currentComponent.value = prop
  }
}

function handleClick(prop: ComponentProp<ComponentOption>) {
  setCurrentComponent(prop)
  // currentComponent.value = prop
}
// 点击删除
function handleDelete(schemaArray: Array<ComponentProp<ComponentOption>>, index: number) {
  if (currentComponent.value?.option.uniqueKey === schemaArray[index].option.uniqueKey)
    // setCurrentComponent(undefined)
    currentComponent.value = undefined
  schemaArray.splice(index, 1)
}

</script>

<template>
  <VueDraggableNext
    class="drag-container"
    :list="props.schemaArray"
    :group="formGroup"
    animation="300"
    @change="handleAdded"
  >
    <transition-group>
      <div v-for="(element,index) in props.schemaArray" :key="element.option.uniqueKey"
           @click.stop="handleClick(element)"
           class="designer-item"
           :class="currentComponent && element.option.uniqueKey === currentComponent.option?.uniqueKey ? 'selected-border' : 'border'"
      >
          <template v-if="element.componentLogicType === 'input'">
            <a-form-item :label="element.option.label">
              <!-- 输入组件 -->
              <a-input></a-input>
            </a-form-item>
          </template>
          <template v-else-if="element.componentLogicType === 'layout'">
            <!-- 布局组件 -->
            <component
              :is="readonlyComponentMap[element.componentType]"
              v-bind="{ ...element.option }"
            />
          </template>
          <template v-else-if="element.componentLogicType === 'container'">

          </template>
        <div
          v-if="currentComponent && element.option.uniqueKey === currentComponent.option?.uniqueKey"
          class="tool-bar"
          @click.stop="handleDelete(props.schemaArray, index)"
        >
          <DeleteOutlined />
        </div>
      </div>
    </transition-group>
  </VueDraggableNext>
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
.selected-border {
  border: 1px solid #ed082b;
}
.tool-bar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
</style>

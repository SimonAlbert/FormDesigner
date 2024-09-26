<script lang="ts" setup>
// 整理思路
// 表单设计器里的组件大致分为两类: 1.布局组件 2.字段值渲染组件
import { VueDraggableNext }from 'vue-draggable-next'
import type { ComponentOption, ComponentProp } from '@/views/meta/FormManager/library/model'
import { injectCreateField, injectCurrentComponent } from '@/views/meta/FormManager/common/useInjection'
import { useGroup } from '@/views/meta/FormManager/common/draggable/useGroup'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { inputComponentMap } from '@/views/meta/FormManager/library/register'


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
  }
}

function handleClick(element: ComponentProp<ComponentOption>) {
  setCurrentComponent(element)
}
// 点击删除
function handleDelete(schemaArray: Array<ComponentProp<ComponentOption>>, index: number) {
  if (currentComponent.value.option.key === schemaArray[index].option.key)
    setCurrentComponent(undefined)
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
      <div v-for="(element,index) in props.schemaArray" :key="element.option.key"
           @click="handleClick(element)"
           class="designer-item"
           :class="currentComponent && element.option.key === currentComponent.option?.key ? 'selected-border' : 'border'"
      >
        <a-form-item :label="element.option.label">
          <component
            :is="inputComponentMap[element.componentType]"
            v-bind="{ ...element.option }"
          />
        </a-form-item>
        <div
          v-if="currentComponent && element.option.key === currentComponent.option?.key"
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
.grid-item {
  height: 100%;
  min-height: 50px;
  border: 1px dashed lightskyblue;
}
</style>

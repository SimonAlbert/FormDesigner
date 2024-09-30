<script lang="ts" setup>
// 整理思路
// 表单设计器里的组件大致分为两类: 1.布局组件 2.字段值渲染组件
import { VueDraggableNext } from 'vue-draggable-next'
import type {
  ComponentOption,
  ComponentProp
} from '@/views/meta/FormManager/common/ComponentLibrary/model'
import { useGroup } from '@/views/meta/FormManager/common/DraggableGroup/useGroup'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useCurrentComponent } from '@/views/meta/FormManager/common/useCurrentComponent'
import { useComponentLibrary } from '@/views/meta/FormManager/common/ComponentLibrary/useComponentLibrary'

const { current, getCurrent, setCurrent, afterComponentCreate, afterComponentUpdate } =
  useCurrentComponent()
const { readonlyComponentMap } = useComponentLibrary()
interface Props {
  schemaArray: Array<ComponentProp<ComponentOption>>
  single: boolean
}
const props = defineProps<Props>()

const { formGroup } = useGroup()

function handleAdded(dragEvent: any) {
  if (dragEvent.added) {
    const prop = <ComponentProp<ComponentOption>>dragEvent.added.element
    if (!prop.option.uniqueKey) {
      afterComponentCreate(prop)
    }
    setCurrent(prop)
  }
}

function handleClick(prop: ComponentProp<ComponentOption>) {
  setCurrent(prop)
}
// 点击删除
function handleDelete(schemaArray: Array<ComponentProp<ComponentOption>>, index: number) {
  if (current.value?.option.uniqueKey === schemaArray[index].option.uniqueKey) {
    setCurrent(undefined)
  }
  schemaArray.splice(index, 1)
}
</script>

<template>
  <!--
  dragClass: 拖拽原位置的样式
  chosenClass: 拖拽浮空的样式
  ghostClass: 目标位置占位样式
  -->
  <VueDraggableNext
    :class="'drag-container ' + (props.single && 'shadow-border')"
    :list="props.schemaArray"
    :group="{
      ...formGroup,
      put: props.single? props.schemaArray.length === 0 : true
    }"
    animation="300"
    @change="handleAdded"
  >
    <div
      v-for="(element, index) in props.schemaArray"
      :key="element.option.uniqueKey"
      @click.stop="handleClick(element)"
      :class="
          current && element.option.uniqueKey === current.option?.uniqueKey
            ? 'designer-item selected-border'
            : 'designer-item' + (!props.single && 'border')
        "
    >
      <template v-if="element.componentLogicType === 'input'">
        <a-form-item :label="element.option.label" style="padding: 5px">
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
        <!-- 容器组件 -->
      </template>
      <div
        v-if="current && element.option.uniqueKey === current.option?.uniqueKey"
        class="tool-bar"
        @click.stop="handleDelete(props.schemaArray, index)"
      >
        <DeleteOutlined />
      </div>
    </div>
  </VueDraggableNext>
</template>

<style scoped lang="less">
// 拖拽容器
.drag-container {
  // 限制最小渲染高度, 优化拖入判定
  min-height: 50px;
  // 下方留一个隐形外框, 让拖拽容器和内部元素间有间距
  //padding-bottom: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.designer-item {
  display: block;
  // 让控件内容不要紧贴着边框, 保持美观
  //padding: 5px;
  position: relative;
}
.border {
  border: 1px solid deepskyblue;
  //background: lightgray;
}
.shadow-border {
  border: 1px dashed deepskyblue;
  //background: lightgray;
}
.selected-border {
  border: 1px solid #ed082b;
  //background: lightgray;
}
.moving-border {
  border: 1px solid #4908ed;
  //background: lightgray;
}
.tool-bar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
</style>

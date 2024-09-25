<script setup lang="ts">
/**
 * 梳理视图设计器的工作流程
 * 1.拖拽设计
 * 重要的对象:组件库, 表单对象, 当前选中组件
 * 最终产物是表单对象的JSON
 * 2.持久化
 * 将上一步的JSON持久化到数据库中
 * 3.根据JSON渲染表单
 * 请求到JSON，交给渲染器渲染出表单
 * 4.表单数据录入并持久化
 */
import { provide, ref } from 'vue'
import { VueDraggableNext }from 'vue-draggable-next'
import { cloneDeep } from 'lodash-es'
import { onBeforeRouteLeave } from 'vue-router'
import DesignerItem from '@/views/meta/FormManager/FormDesigner/components/DesignerItem.vue'
import { componentLibrary, propPanelMap } from '@/views/meta/FormManager/library/register'
import { asSingle } from '@/views/meta/FormManager/library/util'
import SingleBasePropPanel
  from '@/views/meta/FormManager/library/inputComponents/SingleBasePropPanel.vue'
import { useFormDesigner } from '@/views/meta/FormManager/FormDesigner/useFormDesigner'
import type {ComponentOption, ComponentProp} from "@/views/meta/FormManager/library/model";

const {
  libraryGroup,
  formGroup,
  currentComponent,
  setCurrentComponent,
  view,
  metadata,
  fieldSource,
  updateCurrentField,
  createComponent,
} = useFormDesigner()

function addComponent(dragEvent) {
  if (dragEvent.added){
    const prop = <ComponentProp<ComponentOption>>(dragEvent.added.element)
    const option = prop.option
    console.log(dragEvent)
    createComponent(dragEvent.added.element)
  }
}

provide('setCurrentComponent', setCurrentComponent)
provide('currentComponent', currentComponent)
provide('metadata', metadata)
provide('updateCurrentField', updateCurrentField)
provide('createComponent', createComponent)

const activeKey = ref('1')

// onBeforeRouteLeave((leave) => {
  // console.log(leave)
  // if (window.confirm('是否保存视图和元数据?')) {
  //   saveFormStructure()
  // }
  // else {
  //   rollbackMetadata()
  // }
  // return true
// })
</script>

<template>
  <div>
    <a-space>
      <a-button @click="() => console.log(view)">
        打印视图数据(view)
      </a-button>
      <a-button @click="() => console.log(metadata)">
        打印元数据(metadata)
      </a-button>
      <a-button
        @click="() => {
          view.viewContent = []
          setCurrentComponent(undefined)
        }"
      >
        清除视图(view.viewContent)
      </a-button>
      <a-button @click="() => console.log(currentComponent)">
        打印当前选中的组件(currentComponent)
      </a-button>
    </a-space>

    <a-row>
      <!-- 1.ComponentsContainer组件库,可拖出 -->
      <a-col :span="4" class="library-panel border">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="组件库">
            <VueDraggableNext
              :group="libraryGroup"
              :list="componentLibrary"
              :clone="cloneDeep"
              :sort="false"
              item-key="typeName"
            >
              <transition-group>
                <div v-for="element in componentLibrary" :key="element.componentType">
                  <div class="library-item border">
                    {{ element.typeName }}
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
          </a-tab-pane>
          <a-tab-pane key="2" tab="数据源" force-render>
            <VueDraggableNext
              :group="{
                name: 'fieldSource',
                pull: 'clone',
                put: false,
              }"
              :list="fieldSource"
              :clone="cloneDeep"
              :sort="false"
              item-key="typeName"
            >
              <transition-group>
                <div v-for="element in fieldSource" :key="element.option.field">
                  <div class="library-item border">
                    {{ element.option.label }}
                  </div>
                </div>
              </transition-group>
            </VueDraggableNext>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <!-- 2.FormPanel表单主面板,可拖入 -->
      <a-col :span="16" class="border">
        <a-form :layout="'vertical'">
          <VueDraggableNext
            class="drag-container"
            :list="view.viewContent"
            :group="formGroup"
            animation="300"
            item-key="option.key"
            @change="addComponent"
          >
            <transition-group>
              <div v-for="(element,index) in view.viewContent" :key="element.option.key">
                <DesignerItem
                  :parent="view.viewContent"
                  :component-index="index"
                  :schema="element"
                  :group="formGroup"
                />
              </div>
            </transition-group>
          </VueDraggableNext>
        </a-form>
      </a-col>
      <!-- 3.ComponentPropsPanel组件配置面板,根据组件动态渲染 -->
      <a-col :span="4" class="props-panel border">
        <template v-if="currentComponent">
          <template v-if="currentComponent.componentLogicType === 'input'">
            <template v-if="asSingle(currentComponent.option).inputMode === 'single' && asSingle(currentComponent.option).field">
              <SingleBasePropPanel />
              <component
                :is="propPanelMap[currentComponent.componentType]"
              />
            </template>
          </template>
          <template v-else-if="currentComponent.componentLogicType === 'container'">
            <component
              :is="propPanelMap[currentComponent.componentType]"
            />
          </template>
          <template v-else-if="currentComponent.componentLogicType === 'layout'">
            <component
              :is="propPanelMap[currentComponent.componentType]"
            />
          </template>
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.library-panel {
  padding: 10px;
}

.library-item {
  width: auto;
  height: 66px;
  padding: 5px;
  margin-bottom: 10px;
}

.border {
  border: 1px solid deepskyblue;
}

.selectedBorder {
  border: 1px solid #ed082b;
}

.props-panel {
  padding: 10px;
}

.drag-container {
  height: 100%;
  min-height: 50px;
  border-bottom: 1px dashed lightskyblue;
}
</style>

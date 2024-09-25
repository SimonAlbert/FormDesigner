<script setup lang="ts">
import { provide } from 'vue'

import RenderItem from '@/views/meta/FormManager/FormRender/components/RenderItem.vue'
import { useFormRender } from '@/views/meta/FormManager/FormRender/useFormRender'

const {
  editing,
  view,
  metadata,
  formArtifact,
  putArtifactValue,
  saveFormArtifact,
} = useFormRender()

// 注入属性，子组件通过inject获取响应式数据
// 把祖先组件的方法项注入到子组件中，子组件可通过inject获取
provide<(key: string, displayValue: any, value: any) => void>('putArtifactValue', putArtifactValue)
provide('metadata', metadata)
</script>

<template>
  <div>
    <a-space>
      <button @click="() => console.log(view.viewContent)">
        打印视图内容(viewContent)
      </button>
      <button @click="() => console.log(metadata)">
        打印元数据(metadata)
      </button>
      <button @click="() => console.log(formArtifact)">
        打印单据填写结果(formArtifact)
      </button>
      <button @click="saveFormArtifact">
        保存或更新单据结果（saveFormArtifact)
      </button>
      <button @click="editing = !editing">
        {{ editing ? '退出编辑模式' : '进入编辑模式' }}
      </button>
    </a-space>
    <a-row>
      <a-col :span="16" :offset="4" class="border">
        <a-form v-if="metadata.loaded">
          <template v-for="(element) in view.viewContent" :key="element.option.key">
            <RenderItem
              :schema="element"
              :form-artifact="formArtifact"
              :editing="editing"
            />
          </template>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.library-item {
  width: auto;
  height: 50px;
  margin-bottom: 10px
}

.border {
  border: 1px solid gainsboro;
}
</style>

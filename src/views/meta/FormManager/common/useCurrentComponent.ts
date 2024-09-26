import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ComponentOption, ComponentProp } from '@/views/meta/FormManager/library/model'
import { defineStore } from 'pinia'

export function useCurrentComponent() {
  const currentComponent: Ref<ComponentProp<ComponentOption> | undefined> = ref()
  function setCurrentComponent(cur: ComponentProp<ComponentOption> | undefined) {
    currentComponent.value = cur
  }
  return {
    currentComponent,
    setCurrentComponent,
  }
}



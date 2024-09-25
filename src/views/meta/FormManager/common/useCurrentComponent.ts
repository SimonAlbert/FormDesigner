import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ComponentOption, ComponentProp } from '@/views/meta/FormManager/library/model'

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

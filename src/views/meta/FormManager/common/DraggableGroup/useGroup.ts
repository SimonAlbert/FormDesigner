// 不同拖拽组
import { ref } from 'vue'

const libraryGroup = ref({
  name: 'libraryGroup',
  pull: 'clone',
  put: false,
})
const formGroup = ref({
  name: 'formGroup',
  pull: true,
  put: true,
})

export function useGroup() {
  return {
    libraryGroup,
    formGroup,
  }
}

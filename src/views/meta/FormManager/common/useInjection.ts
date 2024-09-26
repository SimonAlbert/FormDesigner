import { type Ref, inject } from 'vue'
import type {
  ComponentOption,
  ComponentProp,
  Metadata,
} from '@/views/meta/FormManager/library/model'

export function injectCurrentComponent() {
  const currentComponent: Ref<ComponentProp<ComponentOption> | undefined>
    = inject('currentComponent') as Ref<ComponentProp<ComponentOption> | undefined>
  const setCurrentComponent
    = inject('setCurrentComponent') as (cur: ComponentProp<ComponentOption> | undefined) => void
  const updateCurrentField
    = inject('updateCurrentField') as (k: string, v: any) => void
  return {
    currentComponent,
    setCurrentComponent,
    updateCurrentField,
  }
}

export function injectMetadata() {
  const metadata: Ref<Metadata> = inject('metadata') as Ref<Metadata>
  return {
    metadata,
  }
}

export function injectFormArtifact() {
  const putArtifactValue = inject('putArtifactValue') as (key: string, displayValue: any, value: any) => void
  return {
    putArtifactValue,
  }
}

export function injectCreateField() {
  const createComponent = inject('createComponent') as (item: ComponentProp<ComponentOption>) => void
  return {
    createComponent,
  }
}

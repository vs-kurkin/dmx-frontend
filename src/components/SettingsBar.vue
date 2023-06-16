<script setup lang="ts" type="tsx">
import UniverseManager from '@/components/settings/UniverseManager.vue'
import Sidebar from 'primevue/sidebar'
import { computed } from 'vue'

export interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const visible = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
</script>

<template>
  <Sidebar
    v-model:visible="visible"
    position="right"
    :dismissable="true"
    modal
  >
    <UniverseManager />
  </Sidebar>
</template>

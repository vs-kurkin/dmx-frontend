<script setup lang="ts" type="tsx">
import SwitchTheme from '@/components/menu/SwichTheme.vue'
import UniverseManager from '@/components/universe/UniverseManager.vue'
import Sidebar from 'primevue/sidebar'
import Divider from 'primevue/divider'
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

    <Divider />

    <SwitchTheme link-id="theme_style" />
  </Sidebar>
</template>

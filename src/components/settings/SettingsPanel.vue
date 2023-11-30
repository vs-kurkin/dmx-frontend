<script setup lang="ts" type="tsx">
import ConfigUI from '@/components/settings/ConfigUI.vue'
import SwitchTheme from '@/components/settings/SwichTheme.vue'
import UniverseManager from '@/components/settings/universe/UniverseManager.vue'
import Divider from 'primevue/divider'
import Sidebar from 'primevue/sidebar'
import { computed } from 'vue'

export interface Props {
  show: boolean
}

const props: Props = withDefaults(defineProps<Props>(), {
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
    <SwitchTheme />
    <Divider />
    <ConfigUI />
  </Sidebar>
</template>

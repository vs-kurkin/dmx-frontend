<script lang="ts" setup type="tsx">
import Drawer from 'primevue/drawer'
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
  <Drawer
    v-model:visible="visible"
    :dismissable="true"
    header="Settings"
    modal
    position="right"
  >
    <SwitchTheme />
    <SettingsUI />
  </Drawer>
</template>

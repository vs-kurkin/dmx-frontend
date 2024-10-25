<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps<{
  label: string;
  modelValue: string;
  validate?: Function;
}>()

defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  modelValue.value = newValue
})
</script>

<template>
  <label>{{ label }}
    <InputText
      v-model="modelValue"
      :invalid="!modelValue"
      :validate="validate"
      class="w-20rem"
      name="name"
      size="small"
    />
  </label>
</template>

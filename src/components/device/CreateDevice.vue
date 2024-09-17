<script lang="ts" setup type="tsx">
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import InputText from 'primevue/inputtext'
import { inject, ref } from 'vue'

const dialogRef = inject<DynamicDialogInstance>('dialogRef')

const name = ref('')
const nameRef = ref<typeof InputText>()
const buttonRef = ref<typeof Button>()
</script>

<template>
  <div class="flex gap-3 mt-4">
    <FloatLabel>
      <InputText
        ref="nameRef"
        v-model="name"
        :invalid="!name"
        autocomplete="off"
        autofocus
        @keyup.enter="() => buttonRef?.$emit('click')"
      />
      <label for="name">Device Name</label>
    </FloatLabel>
  </div>

  <div class="flex justify-content-end gap-3 mt-5">
    <Button
      ref="buttonRef"
      :disabled="nameRef?.invalid"
      label="Create"
      severity="success"
      @click="() => dialogRef?.close({
        name,
        vendor: '',
        model: '',
        channels: []
      })"
    />

    <Button
      label="Cancel"
      severity="danger"
      @click="() => dialogRef?.close()"
    />
  </div>
</template>

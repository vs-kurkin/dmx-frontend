<script lang="ts" setup type="tsx">
import { MAIN_MENU } from '@/utils/constants'
import { PrimeIcons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'

const showSettings = ref(false)
const items = ref<MenuItem[]>(MAIN_MENU)
</script>

<template>
  <SettingsPanel
    ref="settings"
    v-model:show="showSettings"
    position="right"
  />

  <Menubar
    :model="items"
    class="w-full"
  >
    <template #start>
      <slot name="start" />
    </template>

    <template #item="{ item }">
      <router-link :to="item.route">
        <Button
          :icon="item.icon"
          :label="String(item.label)"
          text
        />
      </router-link>
    </template>

    <template #end>
      <div class="flex-column gap-2">
        <UniverseSelect>
          <template #after>
            <Button
              :icon="PrimeIcons.COG"
              severity="primary"
              type="button"
              @click="showSettings = true"
            />
          </template>
        </UniverseSelect>
      </div>
    </template>
  </Menubar>
</template>

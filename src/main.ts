import App from '@/App.vue'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '@/assets/primeflex.css'
import '@/assets/main.css'

import router from '@/router'
import store, { StoreKey } from '@/store'
import { DEFAULT_INPUT_STYLE, DEFAULT_RIPPLE_EFFECT } from '@/store/modules/settings'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import { createApp } from 'vue'

const app = createApp(App)

/* Plugins */
app.use(PrimeVue, {
  ripple: DEFAULT_RIPPLE_EFFECT,
  inputStyle: DEFAULT_INPUT_STYLE,
})
app.use(router)
app.use(store, StoreKey)
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

/* Directives */
app.directive('tooltip', Tooltip)

app.mount('#app')

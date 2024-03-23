import App from '@/App.vue'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import router from '@/router'
import store, { StoreKey } from '@/store'
import { DEFAULT_INPUT_STYLE } from '@/store/modules/settings'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import { createApp } from 'vue'

const app = createApp(App)

/* Plugins */
app.use(PrimeVue, {
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

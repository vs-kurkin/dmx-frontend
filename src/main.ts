import App from '@/App.vue'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@/assets/main.css'
import router from '@/router'
import { key, store } from '@/store'
import { DEFAULT_INPUT } from '@/store/modules/settings'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import { createApp } from 'vue'

const app = createApp(App)

/* Sentry */
// Sentry.init({
//   app,
//   ...sentryConfig,
// })

/* Plugins */
app.use(PrimeVue, {
  theme: {
    prefix: 'dmx-',
    preset: Aura
  },
  inputStyle: DEFAULT_INPUT,
})
app.use(router)
app.use(store, key)
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

/* Directives */
app.directive('tooltip', Tooltip)

app.mount('#app')

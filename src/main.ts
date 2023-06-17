import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/viva-dark/theme.css'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import App from '@/App.vue'
import router from '@/router'
import store, { StoreKey } from '@/store'

import { createApp } from 'vue'
import './assets/main.css'

const app = createApp(App)

/* Plugins */
app.use(PrimeVue)
app.use(router)
app.use(store, StoreKey)
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

/* Directives */
app.directive('tooltip', Tooltip)

app.mount('#app')

import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/viva-dark/theme.css'

import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

import { createApp } from 'vue'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(store)

app.directive('tooltip', Tooltip)

app.mount('#app')

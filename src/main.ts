import './assets/main.css'

import 'primevue/resources/themes/viva-dark/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import router from '@/router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip';

import App from '@/App.vue'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.directive('tooltip', Tooltip);

app.mount('#app')

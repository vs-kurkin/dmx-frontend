import './assets/main.css'

import 'primevue/resources/themes/viva-dark/theme.css'
import 'primevue/resources/primevue.min.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import router from  '@/router/index.js'
import App from '@/App.vue'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')

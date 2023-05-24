import './assets/main.css'

import 'primevue/resources/themes/viva-dark/theme.css'
import 'primevue/resources/primevue.min.css'

  import App from '@/App.vue'
import { createApp } from 'vue'
import router from '@/router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')

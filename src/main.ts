<<<<<<< HEAD
import './assets/main.css'

import 'primevue/resources/themes/viva-dark/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import router from '@/router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip';

import App from '@/App.vue'
=======
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
>>>>>>> bc90574 (Init)

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
<<<<<<< HEAD

app.directive('tooltip', Tooltip);
=======
app.use(store)

app.directive('tooltip', Tooltip)
>>>>>>> bc90574 (Init)

app.mount('#app')

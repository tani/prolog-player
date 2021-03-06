import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import "primevue/resources/themes/saga-green/theme.css"
import "primevue/resources/primevue.css"
import "primeicons/primeicons.css"

const app = createApp(App)
app.mount('#app')
app.use(PrimeVue)
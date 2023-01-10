import { createApp } from 'vue'
import App from './App.vue'
import StoragePlugin from 'vue-web-storage';
import router from './router'
import VueCookies from 'vue-cookies'

const app = createApp(App)

// app.use(VueSessionStorage)
app.use(router)
app.use(VueCookies, {
    expires: '1d',
    secure: true,
    sameSite: 'strict'
})

app.mount('#app')
app.use(StoragePlugin, {
    prefix: 'your_app_slug_',// default `app_`
    drivers: ['session', 'local'], // default 'local'
});

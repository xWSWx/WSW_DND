import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//import { loadFonts } from './plugins/webfontloader'
//import 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css';
import '@mdi/font/css/materialdesignicons.css';
//loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')

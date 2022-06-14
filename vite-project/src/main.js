import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './configs/router'  //啟用router

import elementPlus from 'element-plus'

import '@fullcalendar/core/vdom'
import '@fullcalendar/core'

//firebase 放置在firebase.js

const app = createApp(App);

app.use(router);
app.use(elementPlus);

app.mount('#app');
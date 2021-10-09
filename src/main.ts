import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 路由引入
import naive from './naive' // naive-ui 组件局部引入
import axios from 'axios'
const app = createApp(App)
axios.defaults.baseURL = "http://s3.s100.vip:19231/api/v1/";
app.use(naive)
app.use(router)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 路由引入
import naive from './naive' // naive-ui 组件局部引入

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')

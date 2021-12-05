import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' // 路由引入
import naive from './naive' // naive-ui 组件局部引入
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
const app = createApp(App)

app.use(naive)
app.use(VuesticPlugin)
app.use(router)
app.mount('#app')

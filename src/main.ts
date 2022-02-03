import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' // 路由引入
import naive from './naive' // naive-ui 组件局部引入
import { createPinia } from 'pinia' // pinia引入
import './index.css' // tailwind引入

// 避免tailwind对naiveui的样式覆盖
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

app.use(router)
app.use(naive)
app.mount('#app')
app.use(createPinia())

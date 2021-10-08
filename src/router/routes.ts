import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
    {
        name: 'home',
        path: '/',
        component: () => import('../views/Home.vue'),
        meta: {
            title: "主页",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('../views/about.vue'),
        meta: {
            title: 'About',
            requiresAuth: false
        }
    },

]



const routes: RouteRecordRaw[] = [
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: "登录"
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('../views/Register.vue'),
        meta: {
            title: "注册"
        }
    },
    // render layout
    {
        name: 'layout',
        path: '/',
        component: () => import('../layouts/index.vue'),
        children: [...mainRoutes,]
    },
    // ## not found page
    {
        name: 'not-found',
        path: '/:path*',
        component: () => import('../views/error.vue'),
        meta: {
            title: 'Oh no!'
        }
    }
]

export default routes
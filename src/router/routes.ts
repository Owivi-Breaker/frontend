import { RouteRecordRaw } from 'vue-router'

const mainRoutes: RouteRecordRaw[] = [
    {
        name: 'home',
        path: '/',
        component: () => import('../views/home.vue'),
        meta: {
            title: "主页",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'player',
        path: '/player',
        component: () => import('../views/player.vue'),
        meta: {
            title: "球员",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'playerPerform',
        path: '/playerPerform',
        component: () => import('../views/playerPerform.vue'),
        meta: {
            title: "球员",
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
        component: () => import('../views/register.vue'),
        meta: {
            title: "注册"
        }
    },
    {
        name: 'selectSave',
        path: '/select-save',
        component: () => import('../views/selectSave.vue'),
        meta: {
            title: "选择存档"
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
        name: 'notFound',
        path: '/:path*',
        component: () => import('../views/error.vue'),
        meta: {
            title: 'Oh no!'
        }
    }
]

export { routes }
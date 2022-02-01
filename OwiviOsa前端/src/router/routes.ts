import { RouteRecordRaw } from 'vue-router';

// 框在Sidebar、Header和Footer里的页面
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
        path: '/club-player',
        component: () => import('../views/clubPlayer.vue'),
        meta: {
            title: "球员",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'playerPerform',
        path: '/playerPerform',
        component: () => import('../views/playerDataTable.vue'),
        meta: {
            title: "数据",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'gameResult',
        path: '/gameResult',
        component: () => import('../views/endGame.vue'),
        meta: {
            title: "比赛结果",
            requiresAuth: true // 需要登陆才能访问
        }
    },
    {
        name: 'mail',
        path: '/mail',
        component: () => import('../views/Mail.vue'),
        meta: {
            title: "收件箱",
            requiresAuth: true
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
    {
        name: 'playerPage',
        path: '/player-page',
        component: () => import('../views/playerPage.vue'),
        meta: {
            title: '球员页',
            requiresAuth: true
        }
    },
    {
        name: 'prepareGame',
        path: '/prepareGame',
        component: () => import('../views/prepareGame.vue'),
        meta: {
            title: '赛前准备',
            requiresAuth: true
        }
    },
    {
        name: 'onGame',
        path: '/onGame',
        component: () => import('../views/onGame.vue'),
        meta: {
            title: '比赛进行中',
            requiresAuth: true
        }
    },
    {
        name: 'endGame',
        path: '/endGame',
        component: () => import('../views/endGame.vue'),
        meta: {
            title: '比赛结果',
            requiresAuth: true
        }
    },
    {
        name: "playerPage",
        path: "/player-page",
        component: () => import('../views/playerPage.vue'),
        meta: {
            title: "球员页",
            requiresAuth: true
        }
    }
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
export { routes };

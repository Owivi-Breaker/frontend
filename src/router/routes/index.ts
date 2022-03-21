export const sidebarRoutes: AuthRoute.Route[] = [
    {
        name: 'home',
        path: '/home',
        component: 'self',
        meta: {
            title: '主页',
            icon: 'mdi:clipboard-account',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'club-player',
        path: '/club-player',
        component: 'self',
        meta: {
            title: '球员',
            icon: 'mdi:volleyball',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'player-perform',
        path: '/player-perform',
        component: 'self',
        meta: {
            title: '数据',
            icon: 'mdi:account-multiple-outline',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    // {
    //     name: 'mail',
    //     path: '/mail',
    //     component: 'self',
    //     meta: {
    //         title: '收件箱',
    //         icon: 'mdi:email',
    //         requiresAuth: true,
    //         singleLayout: 'basic'
    //     }
    // },
    {
        name: 'game-prepare',
        path: '/game-prepare',
        component: 'self',
        meta: {
            title: '赛前准备',
            icon: 'mdi:clipboard-arrow-right-outline',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    // {
    //     name: 'game-result',
    //     path: '/game-result',
    //     component: 'self',
    //     meta: {
    //         title: '比赛结果',
    //         icon: 'mdi:star-shooting',
    //         requiresAuth: true,
    //         singleLayout: 'basic'
    //     }
    // },
    {
        name: 'transfer-list',
        path: '/transfer-list',
        component: 'self',
        meta: {
            title: '转会大名单',
            icon: 'mdi:hand-coin-outline',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'game-result-test',
        path: '/game-result-test',
        component: 'self',
        meta: {
            title: '比赛结束测试页',
            icon: 'mdi:hand-coin-outline',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
     {
        name: 'game-on-test',
        path: '/game-on-test',
        component: 'self',
        meta: {
            title: '比赛进行测试页',
            icon: 'mdi:hand-coin-outline',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
];

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
    {
        name: 'root',
        path: '/',
        redirect: '/home',
        meta: {
            title: '主页'
        }
    },
    {
        name: 'select-save',
        path: '/select-save',
        component: 'self',
        meta: {
            title: '选择存档'
        }
    },
    {
        name: 'login',
        path: '/login',
        component: 'self',
        meta: {
            title: '登录'
        }
    },
    {
        name: 'register',
        path: '/register',
        component: 'self',
        meta: {
            title: '注册'
        }
    },
    {
        name: 'game-result',
        path: '/game-result',
        component: 'self',
        meta: {
            title: '比赛结果',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'game-on',
        path: '/game-on',
        component: 'self',
        meta: {
            title: '比赛进行中',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'player-page',
        path: '/player-page',
        component: 'self',
        meta: {
            title: '球员详情页',
            requiresAuth: true,
            singleLayout: 'basic'
        }
    },
    {
        name: 'no-permission',
        path: '/no-permission',
        component: 'self',
        meta: {
            title: '无权限',
            singleLayout: 'blank'
        }
    },
    {
        name: 'not-found',
        path: '/not-found',
        component: 'self',
        meta: {
            title: '未找到',
            singleLayout: 'blank'
        }
    },
    {
        name: 'service-error',
        path: '/service-error',
        component: 'self',
        meta: {
            title: '服务器错误',
            singleLayout: 'blank'
        }
    },
    // 匹配无效路径的路由
    {
        name: 'not-found-page',
        path: '/:pathMatch(.*)*',
        component: 'blank',
        meta: {
            title: '未找到!',
            singleLayout: 'blank'
        }
    },
    ...sidebarRoutes
];

/** 路由名称 */
export const routeName = (key: AuthRoute.RouteKey) => key;

/** 路由路径 */
export function routePath(key: Exclude<AuthRoute.RouteKey, 'not-found-page'>): AuthRoute.RoutePath {
    const rootPath: AuthRoute.RoutePath = '/';
    if (key === 'root') return rootPath;
    const splitMark: AuthRoute.RouteSplitMark = '_';
    const pathSplitMark = '/';
    const path = key.split(splitMark).join(pathSplitMark);
    return (pathSplitMark + path) as AuthRoute.RoutePath;
}

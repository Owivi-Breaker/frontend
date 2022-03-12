import type {Router} from 'vue-router';
import {defineStore} from 'pinia';
import {transformAuthRouteToMenu, transformRouteToList} from '@/utils';
import {sidebarRoutes} from '@/router/routes';
import type {GlobalMenuOption} from '@/interface';

interface RouteState {
    /** 是否添加过动态路由 */
    isAddedDynamicRoute: boolean;
    /** 路由首页name */
    routeHomeName: AuthRoute.RouteKey;
    /** 菜单 */
    menus: GlobalMenuOption[];
    menusList: AuthRoute.Route[];
    /** 缓存的路由名称 */
    cacheRoutes: string[];
    rawRoutes: AuthRoute.Route[];
}

export const useRouteStore = defineStore('route-store', {
    state: (): RouteState => ({
        isAddedDynamicRoute: false,
        routeHomeName: 'test1',
        menus: [],
        menusList: [],
        rawRoutes: sidebarRoutes,
        cacheRoutes: []
    }),
    actions: {
        /**
         * 初始化动态路由
         * @param router - 路由实例
         */
        async initDynamicRoute(router: Router) {
            this.menus = transformAuthRouteToMenu(this.rawRoutes);
            this.menusList = transformRouteToList(this.rawRoutes);
            // const { initHomeTab } = useTabStore();

            // const { userId } = getUserInfo();
            // if (!userId) return;
            // const { data } = await fetchUserRoutes(userId);
            // if (data) {
            //   this.routeHomeName = data.home;
            //   this.menus = transformAuthRouteToMenu(data.routes);
            //   this.menusList = transformRouteToList(data.routes);

            //   const vueRoutes = transformAuthRoutesToVueRoutes(data.routes);
            //   vueRoutes.forEach(route => {
            //     router.addRoute(route);
            //   });

            //   this.cacheRoutes = getCacheRoutes(vueRoutes);

            //   initHomeTab(data.home, router);
            //   this.isAddedDynamicRoute = true;
            // }
        }
    }
});

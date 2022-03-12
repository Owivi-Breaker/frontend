import type {NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router';
import {useRouteStore} from '@/store';

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
    router: Router
) {
    const route = useRouteStore();
    await route.initDynamicRoute(router);
    // const token = storage.get('token');
    // const saveId = storage.get('saveId');

    // // 初始化动态路由
    // if (!route.isAddedDynamicRoute) {
    //   // 未登录情况下直接回到登录页，登录成功后再加载动态路由
    //   if (token == null) {
    //     if (to.name === routeName('login')) {
    //       next();
    //     } else {
    //       const redirect = to.fullPath;
    //       next({ name: routeName('login'), query: { redirect } });
    //     }
    //     return false;
    //   }

    //   await route.initDynamicRoute(router);

    //   if (to.name === routeName('not-found-page')) {
    //     // 动态路由没有加载导致被not-found-page路由捕获，等待动态路由加载好了，回到之前的路由
    //     next({ path: to.fullPath, replace: true, query: to.query });
    //     return false;
    //   }
    //   // 动态路由已经加载，仍然未找到，重定向到not-found
    //   if (to.name === routeName('no-permission')) {
    //     next({ name: routeName('no-permission'), replace: true });
    //     return false;
    //   }
    // }

    return true;
}

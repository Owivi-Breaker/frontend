import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { routeName } from '@/router';
import { useAuthStore } from '@/store';
import { exeStrategyActions, getToken, storage } from '@/utils';
import { createDynamicRouteGuard } from './dynamic';

/** 处理路由页面的权限 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router
) {
  // 动态路由
  const permission = await createDynamicRouteGuard(to, from, next, router);
  if (!permission) return;

  // 外链路由, 从新标签打开，返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }
  const token = storage.get('token');
  const saveId = storage.get('saveId');
  // const auth = useAuthStore();
  // const isLogin = Boolean(getToken());
  // const permissions = to.meta.permissions || [];
  const needLogin = Boolean(to.meta?.requiresAuth);
  // const hasPermission = !permissions.length || permissions.includes(auth.userInfo.userRole);
  // next();
  const actions: Common.StrategyAction[] = [
    //  allreay authorized
    [
      (to.name === routeName('login') && token != null) ||
        (to.name === routeName('select-save') && token != null && saveId != null),
      () => {
        next({ name: routeName('root') });
      }
    ],
    // no need authorize
    [
      !needLogin,
      () => {
        next();
      }
    ],
    // need authorize & token is invalid
    [
      token == null && needLogin,
      () => {
        const redirect = to.fullPath;
        next({ name: routeName('login'), query: { redirect } });
      }
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      token != null && needLogin,
      () => {
        console.log('hasPermission');
        next();
      }
    ]
    // [
    //   // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
    //   isLogin && needLogin && !hasPermission,
    //   () => {
    //     next({ name: routeName('no-permission') });
    //   }
    // ]
  ];

  exeStrategyActions(actions);
}

import router from '@/router';

import type { RouteRecordRaw } from 'vue-router';

function loadLocalRoutes() {
  //
  //5.动态加载所有的路由对象文件
  //5.1动态获取所有的路由对象,放到数组中
  //路由对象都在独立的文件中
  //从文件中将所有路由对象先读取到数组中
  //5.2 根据菜单去匹配正确的路由
  //router.addRoute(’main’,xxx)

  //路由对象 routes的类型 :RouteRecordRaw
  const localRoutes: RouteRecordRaw[] = [];

  //读取router/main 所有的ts文件
  //因为files的key-value 的value 有可能是unknown类型 所以要进行类型重写
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
    //取消异步 立即执行
  });

  //将加载的对象放进localRoutes里
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  return localRoutes;
}
export let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any) {
  //1.加载本地路由
  const localRoutes = loadLocalRoutes();
  //根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      //最后排查出来这里的find不能用{}
      const route = localRoutes.find((item) => item.path === subMenu.url);
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }

        // 2.将二级菜单对应的路径
        routes.push(route);
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = subMenu;
    }
  }
  //因为这里封装的是工具类 所以这里只把映射关系添加到数组里  把数组返回出去 在store->login.ts 中进行真正的添加路由
  //如果是更深层的子菜单 则多进行n层for循环进行 或者递归
  console.log(routes);
  return routes;
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu;
      }
    }
  }
}
interface IBreadcrumbs {
  name: string;
  path: string;
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  //1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = [];

  //2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url });
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}

export function mapMenuListToIds(menulist: any) {
  const ids: number[] = [];
  function recurse(menu: any) {
    for (const item of menu) {
      if (item.children) {
        recurse(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurse(menulist);

  return ids;
}

/**
 * 从菜单列表映射到按钮的权限
 * @param menulist 菜单的列表
 * @returns 权限的数组 (字符串数组)
 */
export function mapMenuListToPermission(menulist: any[]) {
  const permissions: string[] = [];
  //实现映射逻辑
  function recurseGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        //当type为3时,说明是最里层的菜单 系统管理->用户管理->创建用户
        //如果不是3  则递归调用函数往里遍历
        permissions.push(item.permission);
      } else {
        recurseGetPermission(item.children ?? []);
      }
    }
  }
  recurseGetPermission(menulist);

  return permissions;
}

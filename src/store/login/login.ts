import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login';
import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import { defineStore } from 'pinia';
import { mapMenuListToPermission, mapMenusToRoutes } from '@/utils/mapMenu';

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录 获取token 等信息
      const loginResult = await accountLoginRequest(account);
      const id = loginResult.data.id;
      this.token = loginResult.data.token;
      //4.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      //2.获取登录用户详细身份信息(role信息)
      const userInfoResult = await getUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;

      //3.根据角色信息请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id);
      const userMenus = userMenusResult.data;
      //这里原来也忘了往给state中的userMenus赋值
      this.userMenus = userMenus;

      //4.进行本地缓存
      localCache.setCache('userInfo', userInfo);
      localCache.setCache('userMenus', userMenus);

      //重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenuListToPermission(userMenus);
      //保存权限数据
      this.permissions = permissions;
      localCache.setCache('permissions', permissions);
      //5.动态地添加路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        console.log(route);
        router.addRoute('main', route);
      });

      //页面跳转
      await router.push('/main');
    },
    loadLocalCacheAction() {
      //1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache('userInfo');
      const userMenus = localCache.getCache('userMenus');
      const permissions = localCache.getCache('permissions');
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;
        this.permissions = permissions;
        //动态添加路由
        const routes = mapMenusToRoutes(userMenus);
        routes.forEach((route) => {
          router.addRoute('main', route);
        });
      }
    }
  }
});

export default useLoginStore;

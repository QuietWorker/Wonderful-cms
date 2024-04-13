import { localCache } from '@/utils/cache';
import yyRequest from '..';
import type { IAccount } from '@/types';
import { LOGIN_TOKEN } from '@/global/constants';

export function accountLoginRequest(account: IAccount) {
  return yyRequest.post({
    url: '/login',
    data: account
  });
}
//用户信息的请求

export function getUserInfoById(id: number) {
  return yyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer' + localCache.getCache(LOGIN_TOKEN)
    // }
    // //其实在这里携带token也是可以的 但是其他网络请求也要携带token 的时候就要每个请求都写一遍 比较冗余 所以集成到拦截器中
  });
}

//用户权限(menus)的请求

export function getUserMenusByRoleId(roleId: number) {
  return yyRequest.get({
    url: `/role/${roleId}/menu`
  });
}

import yyRequest from '@/service';

/* 用户列表的网络请求 */

export function postUsersListData(queryInfo?: any) {
  return yyRequest.post({
    url: '/users/list',
    data: queryInfo
  });
}
//根据id删除数据
export function deleteUserById(id: number) {
  return yyRequest.delete({
    url: `/users/${id}`
  });
}

//添加用户
export function newUserData(userInfo: any) {
  return yyRequest.post({
    url: '/users',
    data: userInfo
  });
}

//编辑用户
export function editUserData(id: number, userInfo: any) {
  return yyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  });
}

/* 针对所有页面的网络请求 */

export function postPageListData(pageName: string, queryInfo?: any) {
  return yyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

export function deletePageById(pageName: string, id: number) {
  return yyRequest.delete({
    url: `/${pageName}/${id}`
  });
}

export function newPageData(pageName: string, pageInfo: any) {
  return yyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  });
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return yyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  });
}

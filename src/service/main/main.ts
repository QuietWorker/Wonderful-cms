import yyRequest from '@/service';

//获取所有的角色
export function getEntireRoles() {
  return yyRequest.post({
    url: '/role/list'
  });
}

//获取所有的部门
export function getEntireDepartments() {
  return yyRequest.post({
    url: '/department/list'
  });
}

//获取完整的菜单

export function getEntireMenus() {
  return yyRequest.post({
    url: '/menu/list'
  });
}

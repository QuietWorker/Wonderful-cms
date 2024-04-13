import useLoginStore from '@/store/login/login';

export function usePermissions(permissionID: string) {
  const loginStore = useLoginStore();
  const { permissions } = loginStore;

  //两次取反表示一定确定有值
  return !!permissions.find((item) => item.includes(permissionID));
}

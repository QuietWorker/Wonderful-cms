import { getEntireDepartments, getEntireMenus, getEntireRoles } from '@/service/main/main';
import { defineStore } from 'pinia';

interface IMainState {
  entireRoles: any[];
  entireDepartments: any[];
  entireMenus: any[];
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireDepartments: [],
    entireMenus: [],
    entireRoles: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleResult = await getEntireRoles();
      const departmentsResult = await getEntireDepartments();
      const menuResult = await getEntireMenus();

      //保存数据
      this.entireMenus = menuResult.data.list;
      this.entireDepartments = departmentsResult.data.list;
      this.entireRoles = roleResult.data.list;
    }
  }
});

export default useMainStore;

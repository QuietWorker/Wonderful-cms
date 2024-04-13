import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system';
import type { ISystemState } from '@/service/main/system/type';
import { defineStore } from 'pinia';
import useMainStore from '../main';

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //获取用户列表数据
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo);
      const { totalCount, list } = userListResult.data;
      this.usersList = list;
      this.usersTotalCount = totalCount;
    },

    //根据id删除数据
    async deleteUserByIdAction(id: number) {
      //1删除数据的操作
      const deleteResult = await deleteUserById(id);
      console.log(deleteResult);
      //2.重新请求新的数据
      await this.postUserListAction({ offset: 0, size: 10 });
    },
    //创建新用户
    async newUserDataAction(userInfo: any) {
      //1.创建新的用户
      const newResult = newUserData(userInfo);
      //2.重新请求新的数据
      await this.postUserListAction({ offset: 0, size: 10 });
    },

    //编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo);
      console.log(editResult);

      // 2.重新请求新的数据
      await this.postUserListAction({ offset: 0, size: 10 });
    },

    /* 针对所有页面的action */

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo);
      const { totalCount, list } = pageListResult.data;
      this.pageList = list;
      this.pageTotalCount = totalCount;
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id);
      console.log(deleteResult);
      await this.postPageListAction(pageName, { offset: 0, size: 10 });

      //获取所有的数据
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo);
      console.log(newResult);
      await this.postPageListAction(pageName, { offset: 0, size: 10 });

      //重新获取完整的数据
      const mainStore = useMainStore();
      await mainStore.fetchEntireDataAction();
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo);
      console.log(editResult);
      await this.postPageListAction(pageName, { offset: 0, size: 10 });

      //获取完整的数据
      const mainStore = useMainStore();
      await mainStore.fetchEntireDataAction();
    }
  }
});

export default useSystemStore;

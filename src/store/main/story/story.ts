import { postStoryListData } from '@/service/main/story/story';
import { defineStore } from 'pinia';

const useStoryStore = defineStore('story', {
  state: () => ({
    storylist: []
  }),

  actions: {
    async postStoryListDataAction() {
      const { storylist } = await postStoryListData();
      this.storylist = storylist;
    }
  }
});

export default useStoryStore;

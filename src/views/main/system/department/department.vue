<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/pageSearch/pageSearch.vue';
import pageContent from '@/components/pageContent/pageContent.vue';
import pageModal from '@/components/pageModal/pageModal.vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
import { computed, ref } from 'vue';
import useMainStore from '@/store/main/main';
//对modalConfig进行一个操作
const modalConfigRef = computed(() => {
  //这里使用computed的好处
  const mainStore = useMainStore();
  mainStore.entireDepartments;
  //直接解构得到的是name id 的数据
  //需要进行遍历拿到需要的label属性传进去
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id };
  });

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      // item.options.push(...mainStore.entireDepartments);
      item.options.push(...departments);
    }
  });
  return modalConfig;
});

//点击Search content的操作
// const contentRef = ref<InstanceType<typeof pageContent>>();

// const handleQueryClick = (queryInfo: any) => {
//   contentRef.value?.fetchPageListData(queryInfo);
// };
// const handleResetClick = () => {
//   contentRef.value?.fetchPageListData();
// };

//直接使用hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

//点击content modal的操作

// const modalRef = ref<InstanceType<typeof pageModal>>();

// function handleNewClick() {
//   modalRef.value?.setModalVisible();
// }
// function handleEditClick(itemData: any) {
//   modalRef.value?.setModalVisible(false, itemData);
// }

const { modalRef, handleNewClick, handleEditClick } = usePageModal();
</script>

<style scoped>
.department {
}
</style>

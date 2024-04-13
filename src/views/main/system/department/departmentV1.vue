<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"></page-search>
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './cpns/pageSearch.vue';
import pageContent from './cpns/pageContent.vue';
import pageModal from './cpns/pageModal.vue';
import { ref } from 'vue';

//点击Search content的操作
const contentRef = ref<InstanceType<typeof pageContent>>();

const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPageListData(queryInfo);
};
const handleResetClick = () => {
  contentRef.value?.fetchPageListData();
};
//点击content modal的操作

const modalRef = ref<InstanceType<typeof pageModal>>();

function handleNewClick() {
  modalRef.value?.setModalVisible();
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style scoped>
.department {
}
</style>

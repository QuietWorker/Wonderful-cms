<template>
  <div class="user">
    <h2>
      <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
      <user-content
        ref="contentRef"
        @edit-click="handleEditClick"
        @new-click="handleNewClick"
      ></user-content>

      <user-modal ref="modalRef"></user-modal>
    </h2>
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './cpns/UserSearch.vue';
import UserContent from './cpns/UserContent.vue';
import { ref } from 'vue';
import UserModal from './cpns/UserModal.vue';
//对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();

const handleQueryClick = (fromData: any) => {
  contentRef.value?.fetchUserListData(fromData);
};
function handleResetClick() {
  contentRef.value?.fetchUserListData();
}

//是否显示新建用户的弹窗
const modalRef = ref<InstanceType<typeof UserModal>>();
const handleNewClick = () => {
  modalRef.value?.setModalVisible();
};
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData);
};
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>

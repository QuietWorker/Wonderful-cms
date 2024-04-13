<template>
  <div class="role">
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
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        ></el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from '@/components/pageSearch/pageSearch.vue';
import pageContent from '@/components/pageContent/pageContent.vue';
import pageModal from '@/components/pageModal/pageModal.vue';

import searchConfig from './config/search.config';
import modalConfig from './config/modal.config';
import contentConfig from './config/content.config';

import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
import useMainStore from '@/store/main/main';
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';
import type { ElTree } from 'element-plus';

import { mapMenuListToIds } from '@/utils/mapMenu';

const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback);

//获取完整的菜单
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});
function handleElTreeCheck(data1: any, data2: any) {
  const menulist = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menulist };
}

const treeRef = ref<InstanceType<typeof ElTree>>();

function newCallback() {
  treeRef.value?.setCheckedKeys([]);
}

function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList);
    treeRef.value?.setCheckedKeys(menuIds);
  });
}
</script>

<style scoped>
.role {
}
</style>

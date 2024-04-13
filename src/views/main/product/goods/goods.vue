<template>
  <div class="goods">
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          preview-teleported
          fit="cover"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="goods">
import pageContent from '@/components/pageContent/pageContent.vue';
import pageModal from '@/components/pageModal/pageModal.vue';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';

const { modalRef, handleNewClick, handleEditClick } = usePageModal();
</script>

<style scoped>
.goods {
}
</style>

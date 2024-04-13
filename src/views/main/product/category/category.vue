<template>
  <div class="category">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="category">
import pageContent from '@/components/pageContent/pageContent.vue';
import contentConfig from './config/content.config';
</script>

<style scoped>
.category {
}
</style>

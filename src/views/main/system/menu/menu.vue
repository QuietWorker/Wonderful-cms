<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/pageContent/pageContent.vue';
import contentConfig from './config/content.config';
</script>

<style scoped>
.menu {
}
</style>

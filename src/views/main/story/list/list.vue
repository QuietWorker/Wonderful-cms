<template>
  <div class="list">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="list">
import pageContent from '@/components/pageContent/pageContent.vue';
import contentConfig from './config/content.config';
import useStoryStore from '@/store/main/story/story';
import { storeToRefs } from 'pinia';

const storyStore = useStoryStore();

const { storylist } = storeToRefs(storyStore);

console.log(storylist);
</script>

<style scoped>
.list {
}
</style>

<template>
  <div class="chart-card">
    <el-card class="box-card" :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProp {
  header?: string;
}
//withDefaults: 为props声明默认值
withDefaults(defineProps<IProp>(), {
  header: '卡片的头部标题'
});
</script>

<style scoped>
.chart-card {
  color: red;
}
</style>

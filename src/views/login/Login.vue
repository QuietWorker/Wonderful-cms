<template>
  <div class="login">
    <Login-panel></Login-panel>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from '@/views/login/c-cpns/LoginPanel.vue';
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

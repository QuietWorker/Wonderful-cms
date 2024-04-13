<template>
  <div class="PanelAccount">
    <el-form
      label-width="60px"
      style="max-width: 460px"
      size="large"
      :model="account"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormRules, ElForm } from 'element-plus';
import type { IAccount } from '@/types';
import useLoginStore from '@/store/login/login';
import { ElMessage } from 'element-plus';
import { localCache } from '@/utils/cache';

//定义常量 :作用是为了后续编写的时候避免在单词上出错 无法检测
const CACHE_NAME = 'name';
const CACHE_PASSWORD = 'password';

//1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
});

//2.定义校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
});

//3.执行账号登录的逻辑
const loginStore = useLoginStore();
const formRef = ref<InstanceType<typeof ElForm>>();
const loginAciton = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //表单登录成功的后续操作
      const name = account.name;
      const password = account.password;
      //2.使用Pinia中的loginStore向服务器发送请求 (携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        //3.判断用户是否需要记住账号密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name);
          localCache.setCache(CACHE_PASSWORD, password);
        } else {
          localCache.removeCache(CACHE_NAME);
          localCache.removeCache(CACHE_PASSWORD);
        }
      });
    } else {
      ElMessage.error('账号或者密码输入格式不正确');
    }
  });
};
//暴露给父组件
defineExpose({
  loginAciton
});
</script>

<style scoped lang="ts"></style>
@/utils/cache

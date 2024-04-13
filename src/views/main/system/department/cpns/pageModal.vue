<template>
  <div class="pageModal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useSystemStore from '@/store/main/system/system';
import useMainStore from '@/store/main/main';
import { storeToRefs } from 'pinia';

//1.定义el组件内部属性
const dialogVisible = ref(false);
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
});
const isNewRef = ref(true);
const editData = ref();

//2.获取roles/departments数据
const mainStore = useMainStore();
const systemStore = useSystemStore();
mainStore.fetchEntireDataAction();
const { entireDepartments } = storeToRefs(mainStore);

//3.定义设置dialogVisible的方法
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if (!isNew && itemData) {
    //编辑数据
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    //新建数据
    for (const key in formData) {
      formData[key] = '';
    }
    editData.value = null;
  }
};
defineExpose({ setModalVisible });
//4.点击确定的逻辑
const handleConfirmClick = () => {
  dialogVisible.value = false;
  if (!isNewRef.value && editData.value) {
    //编辑用户的数据发送出去
    systemStore.editPageDataAction('department', editData.value.id, formData);
  } else {
    //创建新用户的数据发送出去
    systemStore.newPageDataAction('department', formData);
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>

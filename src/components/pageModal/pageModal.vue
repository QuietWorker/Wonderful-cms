<template>
  <div class="pageModal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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

interface IModalProps {
  modalConfig: {
    pageName: string;
    header: {
      newTitle: string;
      editTitle: string;
    };
    formItems: any[];
  };
  otherInfo?: any;
}

const props = defineProps<IModalProps>();

//1.定义el组件内部属性
const dialogVisible = ref(false);
//定义初始化formData数据
const initialValue: any = {};
for (const item of props.modalConfig.formItems) {
  initialValue[item.prop] = item.initialValue ?? '';
}

const formData = reactive<any>(initialValue);
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
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData);
  } else {
    //创建新用户的数据发送出去
    systemStore.newPageDataAction(props.modalConfig.pageName, formData);
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>

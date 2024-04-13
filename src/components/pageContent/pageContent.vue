<template>
  <div class="pageContent">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">{{
        contentConfig.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>

    <div class="table">
      <el-table
        :data="pageList"
        border
        lazy
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                  v-if="isUpdate"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" showOverflowTooltip></el-table-column>
          </template>
        </template>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/format';
import useSystemStore from '@/store/main/system/system';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { IContentProps } from './type';
import useLoginStore from '@/store/login/login';
import { usePermissions } from '@/hooks/usePermissions';

//定义事件
const emit = defineEmits(['newClick', 'editClick']);
const props = defineProps<IContentProps>();

//0.获取是否有对应的增删改查的权限

const isQuery = usePermissions(`${props.contentConfig.pageName}:query`);
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`);
const isUpdate = usePermissions(`${props.contentConfig.pageName}:create`);
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`);

//1.发起action 请求pageList数据
const systemStore = useSystemStore();
const currentPage = ref(1);
const pageSize = ref(10);
fetchPageListData();

//判断用户增加/删除/修改时,让页码回到第一页
systemStore.$onAction(({ name, after }) => {
  //name是具体哪个action标识
  //after值的是确保action执行完有结果再执行对应的回调
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value === 1;
    }
  });
});

///2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore);

//3.页码相关逻辑
const handleSizeChange = () => {
  fetchPageListData();
};

const handleCurrentChange = () => {
  fetchPageListData();
};

//4.定义函数 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  //1.获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  //2.发送网络请求
  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo);
}

//5.编辑和删除的操作
const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id);
};
//编辑
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData);
};

// 6.新建用户的操作
const handleNewUserClick = () => {
  emit('newClick');
};

defineExpose({ fetchPageListData });
</script>

<style scoped lang="less">
.pageContent {
  background-color: white;
  margin-top: 20px;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

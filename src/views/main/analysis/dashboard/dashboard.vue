<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.echart 图表的展示 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="商品销量饼图">
          <pie-echart :pie-data="showGoodsCategoryCount"></pie-echart>
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="地区销量分布图">
          <map-echart :map-data="showGoodsAddressSale"></map-echart>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="商品销量玫瑰图">
          <rose-echart :rose-data="showGoodsCategoryCount"></rose-echart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <!-- 一个折线图一个柱状图 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card header="分类销量统计折线图">
          <line-echart v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类销量统计柱状图">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { PieEchart, RoseEchart, MapEchart, BarEchart, LineEchart } from '@/components/page-echarts';

import useAnalysisStore from '@/store/main/analysis/analysis';
import countCard from './cpns/countCard.vue';
import chartCard from './cpns/chartCard.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

//1.发起数据的请求
const analysisStore = useAnalysisStore();
analysisStore.fetchAnalysisDataAction();

//2.从store获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore);

//3.获取数据
//piechart数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});

//rosechart 数据

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name);
  const values = goodsCategorySale.value.map((item) => item.goodsCount);
  return { labels, values };
});
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name);
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor);
  return { labels, values };
});
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }));
});
</script>

<style scoped>
.dashboard {
  color: red;
}

.el-row {
  margin-bottom: 10px;
}
</style>

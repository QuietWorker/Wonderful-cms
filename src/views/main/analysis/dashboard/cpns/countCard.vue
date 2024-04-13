<template>
  <div class="count-card">
    <div class="header">
      <h2>{{ subtitle }}</h2>

      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>

    <div class="content">
      <!-- <span v-if="props.amount === 'saleroom'">￥</span> -->
      <span ref="count1Ref">{{ number1 }}</span>
    </div>

    <div class="footer">
      <span>{{ subtitle }}</span>
      <!-- <span v-if="props.amount === 'saleroom'">￥</span> -->
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js';
import { onMounted, ref } from 'vue';

interface IProps {
  amount?: string;
  title?: string;
  tips?: string;
  number1?: number;
  number2?: number;
  subtitle?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
});

//创建countUp的实例对象
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();

//参数1:执行动画的元素
//参数2:数字增加的数值  10000

//当amount ===saleroom 时 代表该数据是销售额 前面加个￥的符号
const countOption = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
};

//对dom的操作要在onMounted 里面操作  因为正常来讲dom元素还没渲染出来
onMounted(() => {
  const countUp1 = new CountUp(count1Ref.value!, props.number1, countOption);
  const countUp2 = new CountUp(count2Ref.value!, props.number2, countOption);
  countUp1.start();
  countUp2.start();
});
</script>

<style scoped lang="less">
/* 上下两个div固定高度 中间内容占据剩下部分 所以用flex布局 */
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>

import { ref } from 'vue';
import pageContent from '@/components/pageContent/pageContent.vue';
function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>();

  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPageListData(queryInfo);
  };
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData();
  };

  return { contentRef, handleQueryClick, handleResetClick };
}

export default usePageContent;

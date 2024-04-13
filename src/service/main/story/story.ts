import yyRequest from '@/service';

export function postStoryListData(queryInfo?: any) {
  return yyRequest.post({
    url: '/story/list',
    data: queryInfo
  });
}

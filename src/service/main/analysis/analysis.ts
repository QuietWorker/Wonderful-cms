import yyRequest from '@/service';

export function getAmountListData() {
  return yyRequest.get({
    url: '/goods/amount/list'
  });
}

export function getGoodsCategoryCount() {
  return yyRequest.get({
    url: '/goods/category/count'
  });
}

export function getGoodsCategorySale() {
  return yyRequest.get({
    url: '/goods/category/sale'
  });
}

export function getGoodsCategoryFavor() {
  return yyRequest.get({
    url: '/goods/category/favor'
  });
}
export function getGoodsAddressSale() {
  return yyRequest.get({
    url: '/goods/address/sale'
  });
}

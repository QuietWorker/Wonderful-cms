const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '商品名称', width: '200px' },
    { type: 'custom', prop: 'oldPrice', label: '原价', width: '70px', slotName: 'oldPrice' },
    { type: 'custom', prop: 'newPrice', label: '现价', width: '70px', slotName: 'newPrice' },
    { prop: 'status', label: '状态', width: '60px', slotName: 'status' },
    { type: 'custom', prop: 'imgUrl', label: '商品图片', width: '100px', slotName: 'image' },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间',
      slotName: 'createTime'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间',
      slotName: 'updateTime'
    },
    {
      type: 'handler',
      label: '操作',
      width: '150px'
    }
  ]
};

export default contentConfig;

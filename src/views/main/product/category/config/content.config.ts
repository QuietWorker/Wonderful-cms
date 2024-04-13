const contentConfig = {
  pageName: 'category',
  header: {
    title: '商品分类',
    btnTitle: '新建分类'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'id', label: '类别id', width: '200px' },

    { prop: 'name', label: '类别名称', width: '200px' },
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

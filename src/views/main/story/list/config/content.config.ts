const contentConfig = {
  pageName: 'story',
  header: {
    title: '故事列表',
    btnTitle: '新建故事'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '故事名称', prop: 'title', width: '150px' },
    { type: 'normal', label: '故事内容', prop: 'content', width: '300px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' }
  ]
};

export default contentConfig;

const compListData = [
  {
    component: 'text-comp', // 组件名称，需要提前注册到 Vue
    configDataPathName: 'Text', // 引入组件配置信息时所用路径名
    name: 'Text',
    compClass: 'text-comp-class', // 用于获取组件宽高及位置信息
    label: '文字组件', // 左侧组件列表中显示的名字
    animations: [], // 动画列表
    events: {}, // 事件列表
    propValue: {
      text: '文字'
    }, // 组件所使用的props值
    propStyle: {
      // 组件样式
      color: 'red'
    }
  }
];

export default compListData;

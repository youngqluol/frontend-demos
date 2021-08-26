export default [
  {
    name: '样式配置',
    compTag: 'el-divider'
  },
  {
    name: '宽',
    valueName: 'width',
    compTag: 'el-input-number',
    comProps: {
      min: 0,
      max: 1000
    }
  },
  {
    name: '高',
    valueName: 'height',
    compTag: 'el-input-number',
    comProps: {
      min: 0,
      max: 1000
    }
  },
  {
    name: 'X',
    valueName: 'left',
    compTag: 'el-input-number',
    comProps: {
      min: 0,
      max: 1000
    }
  },
  {
    name: 'Y',
    valueName: 'top',
    compTag: 'el-input-number',
    comProps: {
      min: 0,
      max: 1000
    }
  },
  {
    name: '其他配置',
    compTag: 'el-divider'
  },
  {
    name: '文字',
    valueName: 'text',
    compTag: 'el-input'
  }
];
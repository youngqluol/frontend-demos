// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue: 20, //  根元素(html)的字体大小
      propList: ['*'], // 设置哪些属性可以从px变为rem。“！”表示不匹配，“ !font* ”表示不匹配字体相关属性
      selectorBlackList:[],  //  设置哪些属性选择器（这里是属性选择器）忽略并保留px
      minPixeValue: 2 //替换的最小像素值。1px不想被替换就设置为2
    }
  }
}

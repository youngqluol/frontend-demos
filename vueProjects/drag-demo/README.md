# drag-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### todo
##### 一、node服务
1. 配置koa跨域
1. server目录单独抽离成一个项目



### issues
1. `vue-config.js`配置的devServer.proxy后，无法代理请求到本地服务器
- 原因：node版本问题
- 解决：1. node版本降级至12.16.1或以下 2. 尝试使用koa-cors中间件解决跨域问题

2. 下载less-loader后，报错`TypeError: this.getOptions is not a function`
- 原因：less-loader版本过高。8.0版本后的配置方式跟之前不一样
- 解决：1.下载less-loader@6.0.0  2. 重新配置


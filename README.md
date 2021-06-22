该项目是 axios 库的typescript 版的重构，用于axios和typescript的学习。

> **不包括 axios 在 Node 中的实现**

## Features

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

## TODO

- [x] 编写基础请求代码
- [x] 处理请求url参数
- [x] 处理请求body数据
- [x] 处理请求header
- [ ] 处理响应数据
- [ ] 获取响应数据
- [ ] 处理响应header
- [ ] 处理响应data
- [ ] 错误处理
- [ ] 错误信息增强
- [ ] axios接口扩展
- [ ] 拦截器设计与实现
- [ ] 合并配置设与实现
- [ ] 请求和相应配置化
- [ ] 扩展 axios.create 静态接口
- [ ] 取消功能设计与实现
- [ ] withCredentials功能
- [ ] XSRF防御功能
- [ ] 上传和下载进度监控功能
- [ ] HTTP授权功能
- [ ] 自定义合法状态码功能
- [ ] 自定义参数序列化功能
- [ ] baseURL功能
- [ ] 静态方法扩展
- [ ] 单元测试
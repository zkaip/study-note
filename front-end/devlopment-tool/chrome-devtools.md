Chrome DevTools
===
##基础篇 Debug
- Elements
  - 可以查看`DOM`元素
  - 直接书写内联样式
  - 查看绑定的`EventListener`
  - 强制元素状态 :active :hover :focus :visit
  - 监控事件发生时的代码: 该元素添加dom操作事件监听。包含三个选项（树结构改变、属性改变、节点移除）
  - 查看 properties
  - ctrl+f 搜索代码内容
  - scrollto 直接滚动到该元素位置
- Network
  - 查看每个请求的耗时 方法 状态 类型 大小 及 每个请求的所有响应 Header头
- [Resource](http://www.cnblogs.com/constantince/p/4579121.html)
  - 本界面所加载的资源列表 SessionStorage Cookie LocalStorage 缓存等
- Source 断点调试 JS
  - 监控JS事件, 设置断点
  - 书写Snippets, 自己的调试函数, 不会被浏览器清空
  - 线上代码测试
  - 查看堆栈调用信息
  - 添加DOM事件监控
  - 添加Ajax请求监控

##响应式开发
- Console 移动开发模式

##性能分析
- Network 监控加载速度
- [Timeline](http://www.cnblogs.com/constantince/p/4585983.html) 
  - 监控事件渲染时间
  - js内存占用(是否存在内存泄露)
  - dom文档数
  - 内存监听事件数目
  - 内存dom节点数
- [Profiles](http://www.cnblogs.com/constantince/p/4607497.html) `Timeline` 的精确数字版
  - (Collect JavaScript CPU Profile)监控函数执行期花费的时间
  - (Take Heap Snapshot)为当前界面拍一个内存快照, 检测内存占用,可以多个快照进行比较差异
  - (Record Heap Allocations)实时监控记录内存变化(对象分配跟踪), 连续不断的跟踪对象，在结束时，你可以选择某个时间段内（比如说蓝色条没有变灰）查看期间活跃的对象
- Audits
  - 根据雅虎网页优化14条建议 提出网络优化建议 及 界面性能优化建议
    - 尽可能的减少 HTTP 的请求数 content
    - 使用 CDN（Content Delivery Network） server
    - 添加 Expires 头(或者 Cache-control )  server
    - Gzip 组件  server
    - 将 CSS 样式放在页面的上方  css
    - 将脚本移动到底部（包括内联的）  javascript
    - 避免使用 CSS 中的 Expressions  css
    - 将 JavaScript 和 CSS 独立成外部文件 javascript css
    - 减少 DNS 查询  content
    - 压缩 JavaScript 和 CSS (包括内联的) javascript css
    - 避免重定向 server
    - 移除重复的脚本 javascript
    - 配置实体标签（ETags） css
    - 使 AJAX 缓存 

## 第三方工具
- Performance-Analyser(网页性能分析)
- (FeHelper)WEB前端助手
  - 编码规范检测(检测编码不规范)
  - 页面性能检测(检测网页加载各个阶段耗时)
  - JS覆盖面检测(检测JS冗余代码)
- POSTMAN 模拟请求
- Browser Compatibility Detector 网页兼容性检查工具




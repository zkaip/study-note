HTML5 Web Worker
===
`Web Workers` 是 `HTML5` 提供的一个`javascript`多线程解决方案，我们可以将一些大计算量的代码交由`web Worker`运行而不冻结用户界面。

### WebWorker 可以做什么
- 可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过`postMessage`，`onmessage`进行通信
- 可以在`worker`中通过`importScripts(url)`加载另外的脚本文件
- 可以使用 `setTimeout()`, `clearTimeout()`, `setInterval()`, and `clearInterval()`
- 可以使用`XMLHttpRequest`来发送请求
- 可以访问`navigator`的部分属性
- `close()`结束线程
- `navigator`对象
  - 可以使用`localStorage`和`sessionStorage`
  - `XMLHttpRequest`可以在线程中使用`Ajax`
- 预先抓取和/或缓存数据以便稍后使用
- 突出显示代码语法或其他实时文本格式
- 拼写检查程序
- 分析视频或音频数据
- 背景 `I/O` 或网络服务轮询
- 处理较大数组或超大 `JSON` 响应
- `<canvas>`中的图片过滤
- 更新本地网络数据库中的多行内容

### 局限性
- 不能跨域加载J`S`
- `worker`内代码不能访问`DOM`
- 各个浏览器对`Worker`的实现不大一致，例如FF里允许`worker`中创建新的`worker`,而`Chrome`中不行
- 不是每个浏览器都支持这个新特性

### WebWorker 使用
- **Worker创建** `var worker = new Worker('task.js')`
- **Worker启动** `worker.postMessage() `
- **Worker事件** `worker.addEventListener('message'/'error', function(e) {e.data;}, false);`

#### 加载外部脚本
```javascript
importScripts('script1.js');
importScripts('script2.js');
// 或
importScripts('script1.js', 'script2.js');
```

#### 子Worker ([参考链接](http://www.whatwg.org/specs/web-workers/current-work/#delegation))
- 子`Worker`必须托管在与父网页相同的来源中。
- 子`Worker`中的 URI 应相对于父`Worker`的位置进行解析（与主网页不同）。
- 在主网页和`Worker`之间传递的消息是复制而不是共享的。

### 内嵌Worker
即时创建 `Worker` 脚本，或者在不创建单独 `Worker` 文件的情况下创建独立网页
``` javascript
// Prefixed in Webkit, Chrome 12, and FF6: window.WebKitBlobBuilder, window.MozBlobBuilder
var bb = new BlobBuilder();
bb.append("onmessage = function(e) { postMessage('msg from worker'); }");

// Obtain a blob URL reference to our worker 'file'.
// Note: window.webkitURL.createObjectURL() in Chrome 10+.
var blobURL = window.URL.createObjectURL(bb.getBlob());

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
  // e.data == 'msg from worker'
};
worker.postMessage(); // Start the worker.
```

### Blob 网址
对`window.URL.createObjectURL()` 的调用十分奇妙。此方法创建了一个简单的网址字符串，该字符串可用于 `DOM File` 或 `Blob` 对象中存储的参考数据。例如：`blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1`

`Blob` 网址是唯一的，且只要应用存在，该网址就会一直有效（例如直到卸载 `document` 为止）。如果您要创建很多 `Blob` 网址，最好发布不再需要的参考资料。您可以通过将 `Blob` 网址传递给 `window.URL.revokeObjectURL()` 来明确发布该网址：
`window.URL.revokeObjectURL(blobURL); // window.webkitURL.createObjectURL() in Chrome 10+.`

### 使用 WebWorker 技巧
示例只涉及 `XMLHttpRequest` 和计算；不是很大也不复杂。如果您让 `worker` 处理更复杂的任务，比如处理大量计算，它将会是一个功能强大的特性。在将这个很酷的技术运用到您的项目之前，了解一些使用技巧。
- 在 `workers` 中不能访问 `DOM(非线程安全)` `window` `document` `parent`
- **为了安全，`workers` 不能直接对 HTML 进行操作。**同一 `DOM` 上的多线程操作可能会引发线程安全问题。优势是您不再担忧 `worker` 实现中的多线程安全问题。
这在开发 `worker` 时有一些局限性，您不能在 `worker` 中调用 `alert()`，这是一个非常流行的调试 JavaScript 代码的方法。您也不能调用 `document.getElementById()`，因为它只能检索和返回变量（可能是字符串、数组、JSON 对象，等等）。
- `worker` 中可用的对象
 - 尽管 `worker` 不能访问 window 对象，但可以直接访问 `navigator`。您也可以在 `navigator` 对象中访问 `appName` `appVersion` `platform` 和 `userAgent`。
 - `location` 对象可以以 **只读方式**访问。您可以在 `location` 对象中获取 `hostname` 和 `port`。
在 `worker` 中也支持 `XMLHttpRequest`。有了这一特性，您就可以将大量感兴趣的扩展添加到 `worker` 中。

此外还有：
- `importScripts()` 方法（导入外部脚本文件, 在同一个域上访问）
- `JavaScript` 对象，比如 `Object` `Array` `Date` `Math` 和 `String`
- `setTimeout()` `clearTimeout()` 和 `setInterval()` `clearInterval()`方法
- 应用缓存
- 生成其他`Web Worker`
- `postMessage` 中携带的数据类型
  - `postMessage` 的使用十分频繁，因为它是主 `JavaScript` 线程的主要方法，用于和 `worker`s 交互。然而，现在 `postMessage` 中携带的数据类型仅限于本地 `JavaScript` 类型，比如，`Array` `Date` `Math` `String` `JSON` 等等。结构复杂的自定义 `JavaScript` 对象不能被很好地支持。

### WebWorker 安全
`postMessage`在`HTML5`中被引入，用来解决跨域或者跨线程数据交互的问题。但是如果`messaging`可以接收任何来源的信息，此页面有可能会被攻击；另外`postMessage`不通过服务器，如果不经过验证和过滤，可能成为`XSS`注入点。

- 使用`postMessage`时需要验证来源可信；
- 不要使用`innerHTML`，现代浏览器提供了`textContent`属性，可以帮助对`HTML`标签进行过滤，或者你可以自行编写过滤的逻辑和函数。

### 参考
- [Web Worker 的基本信息](http://www.html5rocks.com/zh/tutorials/workers/basics/)
HTML5 Imports
===
### 常见的HTML加载方式
- `<iframe>` 和当前页面进行交互的`CSS` `Javascript`书写困难
- `Ajax` `xhr.responseType="document`
- 用字符串的形式嵌入界面, 像注释一样隐藏

### HTML5 提供了新的方法 Imports
通过声明` <link rel="import">` 来在页面中包含一个导入

- 导入的 `MIME` 类型是 `text/html`。
- 导入跨域资源需要启用 `CORS`
- 来自相同 `URL` 的导入仅获取和解析一次。这表示导入中的脚本只在第一次导入的时候执行。
- 导入中的脚本按 **顺序自动执行**，它们 **不会阻塞主页面解析**。
- 导入链接不代表 **#把内容添加到这里**。它代表 **解析器，去把这个文档取过来，我一会要用**。脚本在导入期间运行，而样式，标记，还有其他资源需要明确的加入到主页面中。`这是 HTML 导入和 <iframe> 之间的最大区别，后者表示 "在这里加载并渲染资源"。`

#### Load/error 事件
```html
<script async>
  function handleLoad(e) {
    console.log('Loaded import: ' + e.target.href);
  }
  function handleError(e) {
    console.log('Error loading import: ' + e.target.href);
  }
</script>

<link rel="import" href="file.html" onload="handleLoad(event)" onerror="handleError(event)">
```
```javascript
// 动态的创建导入
var link = document.createElement('link');
link.rel = 'import';
link.href = 'file.html'
link.onload = function(e) {...};
link.onerror = function(e) {...};
document.head.appendChild(link);
```

#### 使用导入中的内容
**导入的内容不在主文档中, 仅仅作为主文档附属存在**
**导入的内容**
```javascript
  var content = document.querySelector('link[rel="import"]').import;
```
**使用导入内容的DOM元素**
```javascript
  var test = content.querySelector('.test');
```
**使用导入内容的样式表**
```javascript
  var styles = content.querySelector('link[rel="stylesheet"]');
  document.head.appendChild(styles.cloneNode(true));
```
### 兼容性
[Can I use](http://caniuse.com/#search=html%20imports)显示, 目前只有`Chrome` `Opera`支持, 可以使用[Polyfill](http://www.polymer-project.org/platform/html-imports.html)来兼容
```javascript
// 原生兼容性检测代码
function supportsImports() {
  return 'import' in document.createElement('link');
}
if (supportsImports()) {
  // 支持导入!
} else {
  // 使用其他的库来加载文件。
}
```

### imports 的应用
#### 打包资源引入
只需要引入一个`HTML`文件, 在该文件上引入各种打包资源, 理论上可以在页面导入一个完整的`web应用`

**a.html**
```html
<link rel="stylesheet" href="a.css">
<script src="a.js"></script>
...

<!-- 脚手架标记 -->
<template>
  ...
</template>
```
**主文件中引入**
```html
<head>
  <link rel="import" href="a.html">
</head>
```

#### 代码模块化 复用性
按逻辑将代码划分为不同的文件进行导入

#### 管理依赖 自动解决资源重复加载
#### 加快脚本进度
没有导入之前，一个大型的 JS 库需要在使用前全部解析，这通常很慢。有了导入，只要块 A 解析完毕，库就能够立即使用。延迟更少了！
```html
<link rel="import" href="chunks.html">:
```
```html
<script>/* script chunk A goes here */</script>
<script>/* script chunk B goes here */</script>
<script>/* script chunk C goes here */</script>
...
```

#### CustomElements 的导入
自定义元素自动注册, web组件化的良好实践, 接口/定义与使用分离
```html
<script>
  // 定义并注册 <say-hi>。
  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function() {
    this.innerHTML = 'Hello, <b>' + (this.getAttribute('name') || '?') + '</b>';
  };

  document.register('say-hi', {prototype: proto});

  // 定义并注册使用了 Shadow DOM 的 <shadow-element>。
  var proto2 = Object.create(HTMLElement.prototype);

  proto2.createdCallback = function() {
    var root = this.createShadowRoot();
    root.innerHTML = "<style>::content > *{color: red}</style>" +
                     "I'm a " + this.localName +
                     " using Shadow DOM!<content></content>";
  };
  document.register('shadow-element', {prototype: proto2});
</script>
```
```html
<head>
  <link rel="import" href="elements.html">
</head>
<body>
  <say-hi name="Eric"></say-hi>
  <shadow-element>
    <div>( I'm in the light dom )</div>
  </shadow-element>
</body>
```

#### 性能注意事项
- 合并导入
- 导入影响浏览器缓存(导入的资源也可以被缓存)
- 内容只有在被添加后才是可用的(在导入文档中直接 "运行" 的只有 `<script>`)
- 优化异步载入(避免阻塞)

#### 并行HTML解析
#### 调试和非调试模式迅速切换, 只需要修改导入目标

### 参考
- [HTML Imports](http://www.html5rocks.com/zh/tutorials/webcomponents/imports/)
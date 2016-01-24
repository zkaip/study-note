HTML5 Template
===
### 兼容性检测
```javascript
function supportsTemplate() {
  return 'content' in document.createElement('template');
}

if (supportsTemplate()) {
  // 检测通过！
} else {
  // 使用旧的模板技术或库。
}
```

#### HTML4 hidden DOM 
`DOM` 并使用 `hidden` 特性或 `display:none` 来将其从视图中隐藏

- 使用 `DOM`——浏览器了解 `DOM`。它们擅长处理它。我们可以轻易的复制这些 `DOM`。
- 没有内容渲染——增加 `hidden` 来阻止区块的显示。
- 非惰性——即便内容是隐藏的，当仍然会发起图片请求。
- 难以设置样式和主题——嵌入页面需要为所有 `CSS` 规则增加 `#id` 前缀，以此来将样式限定在模板范围内。这种做法无法确保未来可能出现的命名冲突- 

#### HTML4 重载脚本
重载 `<script>` 并将它的内容作为字符串来操作。 
```html
<script id="mytemplate" type="text/x-handlebars-template">
  <img src="logo.png">
  <div class="comment"></div>
</script>
```

- 没有内容渲染——浏览器不会渲染该块，因为 `<script> `默认为 `display:none`。
- 惰性——若脚本的类型不为 `"text/javascript"`，那么浏览器就不会将它的内容当作 JS 来解析。
- 安全问题——鼓励使用 `.innerHTML`。对户提供的数据进行运行时字符串解析很容易导致 XSS 漏洞。


### 声明模板内容
```html
<template id="mytemplate">
  <img src="" alt="great image">
  <div class="comment"></div>
</template>
```

### 激活模板
模板深拷贝: `document.importNode(template.content, true)`
```javascript
var t = document.querySelector('#mytemplate');
// 在运行时填充 src。
t.content.querySelector('img').src = 'logo.png';

var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```

### 模板特性
- 内容惰性激活, 激活前不会被渲染
- 模板内容无副作用, 脚本不会运行, 图片不会加载, 音频不会播放... 直到模板被使用
- 内容不在文档中, `document.getElementById()` `document.querySelector()`均不会返回模板的节点
- 模板能够被放置在任何位置, 包括`<head>` `<body>` `<frameset>`

### 模板应用
#### 惰性脚本(`Element`绑定事件激活模板)
```html
<button onclick="useIt()">Use me</button>
<div id="container"></div>
<script>
  function useIt() {
    var content = document.querySelector('template').content;
    // 更新 template DOM 中的内容。
    var span = content.querySelector('span');
    span.textContent = parseInt(span.textContent) + 1;
    document.querySelector('#container').appendChild(
        document.importNode(content, true));
  }
</script>

<template>
  <div>Template used: <span>0</span></div>
  <script>alert('Thanks!')</script>
</template>
```

#### 从模板中生成 `Shadow DOM`

```html
<template>
<style>
  ……
</style>
<div>
  <header>
    <h3>Add a Comment</h3>
  </header>
  <content select="p"></content>
  <textarea></textarea>
  <footer>
    <button>Post</button>
  </footer>
</div>
</template>

<div id="host">
  <p>Instructions go here</p>
</div>

<script>
  var shadow = document.querySelector('#host').createShadowRoot();
  shadow.appendChild(document.querySelector('template').content);
</script>
```

### 注意事项
- 注意嵌套模板, 激活外层模板不会激活内层模板, 内层模板需要手动激活
- 模板无法预渲染, 无法预加载, 只能在激活后被渲染

### 参考
- [HTML's New Template Tag](http://www.html5rocks.com/zh/tutorials/webcomponents/template/)
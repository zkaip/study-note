HTML5 ShadowDOM & CustomElements
===
Web组件由四部分组成
- Template
- Shadow DOM (Chrome Opera支持)
- Custom Elements
- Packaging

### Shadow DOM 组成
`Shadow DOM`可以和一个根节点`Shadow root`关联, 该`Shadow DOM`元素称为`Shadow Host`内容不会被渲染, 而`Shadow root`内容会被渲染。

但是，内容不应该放进`Shadow DOM`内, 以便被`搜索引擎` `阅读器`等访问到, 可重用部件无意义的标记应该放进`Shadow DOM`中

### Shadow DOM从展现中分离细节
内容在文档内；展现在 `Shadow DOM` 里。 当需要更新的时候，浏览器会自动保持它们的同步。
```html
<template>
  <style>
    ……
  </style>
  <div class="outer">
    <div class="boilerplate">
      Hi! My name is
    </div>
    <div class="name">
      <content></content>
    </div>
  </div>
</template>

<script>
  var shadow = document.querySelector('#nameTag').createShadowRoot();
  var template = document.querySelector('#nameTagTemplate');
  var clone = document.importNode(template.content, true);
  shadow.appendChild(clone);
  document.querySelector("#nameTag").textContent = "Shellie"
</script>
<div id="nameTag"></div>
```

通过`select`特性, 可以使用多个元素并控制投射元素
```html
<!-- Shadow DOM -->
<div style="background: purple; padding: 1em;">
  <div style="color: red;">
    <content select=".first"></content>
  </div>
  <div style="color: yellow;">
    <content select="div"></content>
  </div>
  <div style="color: blue;">
    <content select=".email"></content>
  </div>
</div>

<!-- DOM -->
<div id="nameTag">
  <div class="first">Bob</div>
  <div>B. Love</div>
  <div class="email">bob@</div>
</div>
```

### Shadow DOM 样式
`Shadow DOM`定义的`CSS`样式只在`Shadow Root`下生效, 样式被封装起来

#### 样式化宿主元素(host element)
`:host`样式化`Shadow DOM`元素, 并且无法影响到`Shadow DOM`外的元素

```css
:host(x-bar:host) {
  /* 当宿主是 <x-bar> 元素时生效。 */
}
:host(.different:host) {
  /* 当宿主的类 <class="diffent"> 时生效。 */
}
:host:hover {
  /* 当鼠标放置到宿主上时生效。 */
  opacity: 1;
}
```

#### ^(Hat) 和 ^^(Cat)选择器
`^` 连接符等价于后代选择器(例如 div p {...})，只不过它能跨越 **一个** shadow 边界。
`^^` 后代选择器能够跨越 **任意数量**的 shadow 边界。
`querySelector()`支持该选择器

#### 可以通过 shadowdom 样式化原生HTML控件
```css
video ^ input[type="range"] {
  background: hotpink;
}
```

#### 插入点重置样式
```javascript
var root = document.querySelector('div').createShadowRoot();
root.resetStyleInheritance = false;
```
```css
{
  reset-style-inheritance: true;
}
```
在插入点, 选择是否继承上级样式(只影响可继承的样式)

#### ::content 伪元素 穿过插入点来指定样式
```html
<div>
  <h3>Light DOM</h3>
  <section>
    <div>I'm not underlined</div>
    <p>I'm underlined in Shadow DOM!</p>
  </section>
</div>

<script>
var div = document.querySelector('div');
var root = div.createShadowRoot();
root.innerHTML = '\
    <style>\
      h3 { color: red; }\
      content[select="h3"]::content > h3 {\
        color: green;\
      }\
      ::content section p {\
        text-decoration: underline;\
      }\
    </style>\
    <h3>Shadow DOM</h3>\
    <content select="h3"></content>\
    <content select="section"></content>';
</script>
```

对于一个 ShadowRoot 或 `<shadow>` 插入点：reset-style-inheritance 意味着可继承的 CSS 属性在宿主元素处被设置为 initial，此时这些属性还没有对 shadow 中的内容生效。该位置称为上边界(upper boundary)。

对于 `<content>` 插入点：reset-style-inheritance 意味着在宿主的子元素分发到插入点之前，将可继承的 CSS 属性设置为 initial。该位置称为下边界(lower boundary)。

### 使用多个shadowdom
最近添加的树称为 **younger tree**。之前添加的树称为 **older tree。**

添加进宿主元素中的 shadow 树按照它们的添加顺序而堆叠起来，从最先加入的 shadow 树开始。最终渲染的是最后加入的 shadow 树。

如果一个 shadow 树中存在多个 `<shadow>` 插入点，那么仅第一个被确认，其余的被忽略。

"Shadow 插入点" (`<shadow>`) 作为占位符可以插入 **ShadowDOM** 
普通插入点 (`<content>`) 作为占位符可以插入 **普通DOM元素**

如果一个元素托管着 Shadow DOM，你可以使用 `.shadowRoot` 来访问它的 `youngest shadow root`

如果不想别人乱动你的 shadow，那就将 .shadowRoot 重定义为 null：
```javascript
Object.defineProperty(host, 'shadowRoot', {
  get: function() { return null; },
  set: function(value) { }
});
```

### JS中构建 shadowdom
可以使用 HTMLContentElement 和 HTMLShadowElement 接口。
使用插入点从宿主元素中选择并"分发"到 shadow 树

无法遍历 `<content>` 中的 DOM。
`.getDistributedNodes()` 允许我们查询一个插入点的分布式节点：
```html
<div id="example4">
  <h2>Eric</h2>
  <h2>Bidelman</h2>
  <div>Digital Jedi</div>
  <h4>footer text</h4>
</div>

<template id="sdom">
  <header>
    <content select="h2"></content>
  </header>
  <section>
    <content select="div"></content>
  </section>
  <footer>
    <content select="h4:first-of-type"></content>
  </footer>
</template>

<script>
var container = document.querySelector('#example4');

var root = container.createShadowRoot();

var t = document.querySelector('#sdom');
var clone = document.importNode(t.content, true);
root.appendChild(clone);

var html = [];
[].forEach.call(root.querySelectorAll('content'), function(el) {
  html.push(el.outerHTML + ': ');
  var nodes = el.getDistributedNodes();
  [].forEach.call(nodes, function(node) {
    html.push(node.outerHTML);
  });
  html.push('\n');
});
</script>
```

可以在分布式节点上调用它的 `.getDestinationInsertionPoints()` 来查看它被分发进了哪个插入点中
```html
<div id="host">
  <h2>Light DOM</h2>
</div>

<script>
  var container = document.querySelector('div');

  var root1 = container.createShadowRoot();
  var root2 = container.createShadowRoot();
  root1.innerHTML = '<content select="h2"></content>';
  root2.innerHTML = '<shadow></shadow>';

  var h2 = document.querySelector('#host h2');
  var insertionPoints = h2.getDestinationInsertionPoints();
  [].forEach.call(insertionPoints, function(contentEl) {
    console.log(contentEl);
  });
</script>
```
Shadow DOM 可视化渲染工具: 
[Shadow DOM Visualizer](http://html5-demos.appspot.com/static/shadowdom-visualizer/index.html)

### shadowdom 事件模型
事件会被重定向，使它看起来是从宿主元素上发出，而并非是 Shadow DOM 的内部元素。(`event.path` 来查看调整后的事件路径。)

以下事件永远无法越过 shadow 边界：
- abort
- error
- select
- change
- load
- reset
- resize
- scroll
- selectstart

### 自定义元素
#### 使用场景
- 定义新的 HTML/DOM 元素
- 基于其他元素创建扩展元素
- 给一个标签绑定一组自定义功能
- 扩展已有 DOM 元素的 API

#### 注册新元素
`document.registerElement()` 可以创建一个自定义元素
- 第一个参数是元素的标签名。这个标签名必须包括一个连字符（-）。
- 第二个参数是一个（可选的）对象，用于描述该元素的 prototype。在这里可以为元素添加自定义功能（例如：公开属性和方法）。

```javascript
var XFoo = document.registerElement('x-foo', {
  prototype: Object.create(HTMLElement.prototype)
});
// 非全局创建新元素, 可以放置到自己的命名空间内
var myapp = {}; 
myapp.XFoo = document.registerElement('x-foo');
// 扩展原生元素 要创建扩展自元素 B 的元素 A，元素 A 必须继承元素 B 的 prototype。
var MegaButton = document.registerElement('mega-button', {
  prototype: Object.create(HTMLButtonElement.prototype)
});
// 以下方法为重载版本
var megaButton = document.createElement('button', 'mega-button');
// <button is="mega-button">
```

#### 添加JS属性和方法
```javascript
var XFooProto = Object.create(HTMLElement.prototype);

// 1. 为 x-foo 创建 foo() 方法
XFooProto.foo = function() {
  alert('foo() called');
};

// 2. 定义一个只读的“bar”属性
Object.defineProperty(XFooProto, "bar", {value: 5});

// 3. 注册 x-foo 的定义
var XFoo = document.registerElement('x-foo', {prototype: XFooProto});

// 4. 创建一个 x-foo 实例
var xfoo = document.createElement('x-foo');

// 5. 插入页面
document.body.appendChild(xfoo);

/* 更简洁的方式 */
var XFoo = document.registerElement('x-foo', {
  prototype: Object.create(HTMLElement.prototype, {
    bar: {
      get: function() { return 5; }
    },
    foo: {
      value: function() {
        alert('foo() called');
      }
    }
  })
});
```

#### 生命周期回调方法
回调名称 | 调用时间点
:---: | :---:
createdCallback | 创建元素实例
attachedCallback | 向文档插入实例
detachedCallback | 从文档中移除实例
attributeChangedCallback(attrName, oldVal, newVal) | 添加，移除，或修改一个属性

```javascript
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  this.addEventListener('click', function(e) {
    alert('Thanks!');
  });
  this.innerHTML = "<b>I'm an x-foo!</b>";
};
proto.attachedCallback = function() {...};

var XFoo = document.registerElement('x-foo', {prototype: proto});
```

#### 用 Shadow DOM 封装内部实现
- 一种隐藏内部实现的方法，从而将用户与血淋淋的实现细节隔离开。
- 简单有效的样式隔离。

从 Shadow DOM 创建元素，跟创建一个渲染基础标记的元素非常类似，区别在于 createdCallback() 回调：
```javascript
var XFooProto = Object.create(HTMLElement.prototype);

XFooProto.createdCallback = function() {
  // 1. 为元素附加一个 shadow root。
  var shadow = this.createShadowRoot();

  // 2. 填入标记。
  shadow.innerHTML = "<b>I'm in the element's Shadow DOM!</b>";
};

var XFoo = document.registerElement('x-foo-shadowdom', {prototype: XFooProto});
```

#### 从模板创建元素
```html
<template id="sdtemplate">
  <style>
    p { color: orange; }
  </style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
var proto = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      var t = document.querySelector('#sdtemplate');
      var clone = document.importNode(t.content, true);
      this.createShadowRoot().appendChild(clone);
    }
  }
});
document.registerElement('x-foo-from-template', {prototype: proto});
</script>
```

#### 为自定义元素增加样式
```javascript
<style>
  app-panel {
    display: flex;
  }
  [is="x-item"] {
    transition: opacity 400ms ease-in-out;
    opacity: 0.3;
    flex: 1;
    text-align: center;
    border-radius: 50%;
  }
  [is="x-item"]:hover {
    opacity: 1.0;
    background: rgb(255, 0, 255);
    color: white;
  }
  app-panel > [is="x-item"] {
    padding: 5px;
    list-style: none;
    margin: 0 7px;
  }
</style>

<app-panel>
  <li is="x-item">Do</li>
  <li is="x-item">Re</li>
  <li is="x-item">Mi</li>
</app-panel>
```

#### 为使用 Shadow DOM 的元素增加样式
- [Polymer 文档](https://www.polymer-project.org/1.0/)
- [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-201/)

#### 使用 :unresolved 伪类避免无样式内容闪烁（FOUC）
使用 :unresolved 伪类避免无样式内容闪烁（FOUC）

注册后渐显的 <x-foo> 标签：
```html
<style>
  x-foo {
    opacity: 1;
    transition: opacity 300ms;
  }
  x-foo:unresolved {
    opacity: 0;
  }
</style>
```

`:unresolved` 伪类只能用于 `unresolved` 元素，而不能用于继承自 `HTMLUnkownElement` 的元素
```html
<style>
  /* 给所有 unresolved 元素添加边框 */
  :unresolved {
    border: 1px dashed red;
    display: inline-block;
  }
  /* unresolved 元素 x-panel 的文本内容为红色 */
  x-panel:unresolved {
    color: red;
  }
  /* 定义注册后的 x-panel 文本内容为绿色 */
  x-panel {
    color: green;
    display: block;
    padding: 5px;
    display: block;
  }
</style>

<panel>
  I'm black because :unresolved doesn't apply to "panel".
  It's not a valid custom element name.
</panel>

<x-panel>I'm red because I match x-panel:unresolved.</x-panel>
```

#### 历史和浏览器支持
检查 `document.registerElement()` 是否存在：
```javascript
function supportsCustomElements() {
  return 'registerElement' in document;
}

if (supportsCustomElements()) {
  // Good to go!
} else {
  // Use other libraries to create components.
}
```

### 参考
- [Shadow DOM 101](http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom/)
- [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-201/)
- [Shadow DOM 301 - CSS and Styling](http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-301/)
- [Custom Elements](http://www.html5rocks.com/zh/tutorials/webcomponents/customelements/)
- [Polymer](https://www.polymer-project.org/1.0/)






















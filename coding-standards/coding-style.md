Coding Style
===
### 基本原则
- 结构、样式、行为分离
- 统一缩进(建议 **两个空格**)
- 文件编码统一 不带`BOM`的`UTF-8`
- 一律使用小写字母
- 省略外链资源 URL 协议部分(FTP等其他URL不省略)
- 统一注释

### HTML
- 标签
  - 自闭合无需闭合`img` `input` `br` `hr` 等
  - 可选闭合需闭合
  - 尽量减少标签
- `class` & `id`
  - 以功能或内容命名, 不以表现形式命名
  - 以`-`分隔
- 属性顺序 id > class > name > data-xxx > src,for,type,href > title,alt > aria-xxx,role
- 属性统一使用双引号
- 语义嵌套及严格嵌套约束 参考:[WEB标准系列-HTML元素嵌套](http://www.smallni.com/element-nesting/)
  - `<li>`用于`<ul>`或`<ol>`下
  - `<dd>` `<dt>` 用于 `<dl>`下
  - `<thead>` `<tbody>` `<tfoot>` `<tr>` `<td>` 用于 `<table>` 下
  - inline-Level 元素，仅可以包含文本或其它 inline-Level 元素;
  - `<a>`里不可以嵌套交互式元素`<a>`、`<button>`、`<select>`等;
  - `<p>`里不可以嵌套块级元素`<div>`、`<h1>~<h6>`、`<p>`、`<ul>/<ol>/<li>`、`<dl>/<dt>/<dd>`、`<form>`等。
- **HEAD**
  - 文档类型 `<!DOCTYPE html>`
  - 语言属性 `<lang="zh-cmn-Hans">`
  - 字符编码(必须是`<head>`标签的第一个子元素) `<meta charset="utf-8">`
  - 优先使用最新内核 `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">`
  - `SEO`优化 `<meta name="keywords" content="your keywords"> <meta name="description" content="your description"> <meta name="author" content="author,email address">`
  - **viewport** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - **iOS图标**
    - `apple-touch-icon` 图片自动处理成圆角和高光等效果;
    - `apple-touch-icon-precomposed` 禁止系统自动添加效果，直接显示设计原图;
  - **favicon** `<link rel="shortcut icon" href="path/to/favicon.ico">`

**HEAD模板**
```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Style Guide</title>
  <meta name="description" content="不超过150个字符">
  <meta name="keywords" content="">
  <meta name="author" content="name, email@gmail.com">

  <!-- 为移动设备添加 viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- iOS 图标 -->
  <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">

  <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
  <link rel="shortcut icon" href="path/to/favicon.ico">
</head>
```

**HTML标签语义化**

标签 | 语义
:---: | :---:
`<p>` | 段落
`<h1> <h2> <h3> ...` | 标题
`<ul>` | 无序列表
`<ol>` | 有序列表
`<blockquote>` | 大段引用
`<cite>` | 一般引用
`<b>` 为样式加粗而加粗
`<storng>` | 为强调内容而加粗
`<i>` | 为样式倾斜而倾斜
`<em>` | 为强调内容而倾斜
`<code>` | 代码标识
`<abbr>` | 缩写

### CSS
- 以组件为单位组织代码
- 组件块和子组件块以及声明块之间使用一空行分隔，子组件块之间三空行分隔；
- 如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动；
- 避免选择器嵌套层级过多, 尽量少于3级
- 避免`Class` `ID`叠加使用
- 声明块
  - 选择器分组时, 保持独立的选择器占用一行
  - 声明块的左括号 `{` 前添加一个空格；
  - 声明块的右括号 `}` 应单独成行；
  - 声明语句中的 `:` 后应添加一个空格；
  - 声明语句应以分号 `;` 结尾；
  - 一般以逗号分隔的属性值，每个逗号后应添加一个空格；
  - rgb()、rgba()、hsl()、hsla() 或 rect() 括号内的值，逗号分隔，但逗号后不添加一个空格；
  - 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）；
  - 十六进制值应该全部小写和尽量简写，例如，#fff 代替 #ffffff；
  - 避免为 0 值指定单位
- 声明顺序 Positioning > Box model > Typographic > Visual
- url() 、属性选择符、属性值使用双引号。
- 将媒体查询(Media query)放在尽可能相关规则的附近
- 不要使用 `@import`
- 链接样式顺序 `a:link -> a:visited -> a:hover -> a:active（LoVeHAte）`
- 使用[Autoprefixer](https://github.com/postcss/autoprefixer)自动添加浏览器前缀, 书写CSS无需添加浏览器前缀

```css
/* ==========================================================================
   组件块
 ============================================================================ */

/* 子组件块
 ============================================================================ */
```

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型决定了组件的尺寸和位置，因此排在第二位。其他属性只是影响组件的内部（inside）或者是不影响前两组属性。
```javascript
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box model */
  display: block;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin: 10px;
  float: right;
  overflow: hidden;

  /* Typographic */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  color: #fff;
  opacity: .8;

  /* Other */
  cursor: pointer;
}
```

#### CSS 网页字体排版

##### 字体
**内文字体**
```css
p { font-family: "Georgia", "Times New Roman", "Songti SC", "SimSun", serif; }
```
**标题字体**
```css
h1, h2, h3, h4, h5, h6 { font-family: "Lucida Grande", "Helvetica Neue", "Arial", "Hiragino Sans GB", "Noto Sans CJK SC", "Heiti SC", "Microsoft YaHei", "WenQuanYi Microhei", sans-serif; }
```

##### 字号
将内文以 `16px` 作为字号 
标题 `h1`, `h2`, `h3`, `h4`, `h5`, `h6` 以 `16px` 作为字号基础，按同比例的递减
```css
p  { font-size: 16px; }
h1 { font-size: 2em; }
h2 { font-size: 1.8em; }
h3 { font-size: 1.6em; }
h4 { font-size: 1.4em; }
h5, h6 { font-size: 1.2em; }
```

##### 行高
将内文以 1.7em 作为行高
标题 h1, h2, h3, h4, h5, h6 以 1.5em 作为行高.
```css
p { line-height: 1.7em; }
h1, h2, h3, h4, h5, h6 { line-height: 1.5em; }
```

##### 段落间距
```css
p { margin-bottom: 1.7em; }
h1, h2, h3, h4, h5, h6 {
  margin-top: .7em;
  margin-bottom: 0.2em;
}
```

##### 齐头尾
```css
p {
text-align: justify;
text-justify: inter-ideographic;
}
```

##### 断词使中英文混排时字符间距不会被齐头尾拉的不均匀
```css
p { word-break: break-all; }
```

#### Less
- 代码顺序 @import > 变量声明 > 样式声明
- @import `.less`不得省略, 用双引号
- Mixin 
  - 在定义 mixin 时，如果 mixin 名称不是一个需要使用的 className，必须加上括号，否则即使不被调用也会输出到 CSS 中。
  - 如果混入的是本身不输出内容的 mixin，需要在 mixin 后添加括号（即使不传参数），以区分这是否是一个 className。
- 避免嵌套层级过多, 限制在2层
- 可以使用字符串插值使变量嵌入字符串中 `@base-url: "http://assets.fnord.com"; background-image: url("@{base-url}/images/bg.png");`

#### 命名(从组件方式思考命名)
- Components 至少以两个单词命名,通过`-`分离 `.like-button` `.search-form` `.article-card`
- Elements (Element 是 Components 中的元素)
  - 类名尽可能仅有一个单词
  - 多个单词应直接连接
  - 避免标签选择器(性能稍弱,表意不明) 
- Variants(变体) 带有前缀`-` 
  - `.-wide .-short .-disabled .title.-small`
  - 避免定位属性
    - Positioning (position, top, left, right, bottom)
    - Floats (float, clear)
    - Margins (margin)
    - Dimensions (width, height) 
- **头像** **logos**等元素应设置 **固定尺寸**
- 在父元素中设置定位
- 避免过分嵌套
    
##### className命名
**常见class关键词：**
- 布局类：header, footer, container, main, content, aside, page, section
- 包裹类：wrap, inner
- 区块类：region, block, box
- 结构类：hd, bd, ft, top, bottom, left, right, middle, col, row, grid, span
- 列表类：list, item, field
- 主次类：primary, secondary, sub, minor
- 大小类：s, m, l, xl, large, small
- 状态类：active, current, checked, hover, fail, success, warn, error, on, off
- 导航类：nav, prev, next, breadcrumb, forward, back, indicator, paging, first, last
- 交互类：tips, alert, modal, pop, panel, tabs, accordion, slide, scroll, overlay,
- 星级类：rate, star
- 分割类：group, seperate, divider
- 等分类：full, half, third, quarter
- 表格类：table, tr, td, cell, row
- 图片类：img, thumbnail, original, album, gallery
- 语言类：cn, en
- 论坛类：forum, bbs, topic, post
- 方向类：up, down, left, right
- 其他语义类：btn, close, ok, cancel, switch; link, title, info, intro, more, icon; form, label, search, contact, phone, date, email, user; view, loading…

**简单规则**
- 以中划线连接，如.item-img
- 使用 **两个中划线表示特殊化**，如.item-img.item-img--small表示在.item-img的基础上特殊化
- **状态类直接使用单词**，参考上面的关键词，如.active, .checked
- **图标以icon-为前缀**（字体图标采用.icon-font.i-name方式命名）。
- **模块采用关键词命名**，如.slide, .modal, .tips, .tabs，特殊化采用上面两个中划线表示，如.imgslide--full, .modal--pay, .tips--up, .tabs--simple
- **js操作**的类统一加上js-前缀
- 不要超过四个class组合使用，如.a.b.c.d

### JavaScript
- 注释 如无必要勿增注释, 如有必要尽量详尽, 只使用`//`, 避免使用`/*...*/`
  - 函数方法注释包含函数说明参数和返回值及返回值类型, 如果函数是内部函数可以使用`@inner`标识
  - 文件注释 应该提供文件的大体内容, 它的作者, 依赖关系和兼容性信息。如下:

```javascript
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
```
```javascript
/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @author user@meizu.com (Firstname Lastname)
 * Copyright 2009 Meizu Inc. All Rights Reserved.
 */
```

- 命名
  - 变量 驼峰命名法
  - 私有属性变量方法 `_`开头
  - 常量 全部字母大写, `_`分隔
  - 函数及函数的参数 驼峰命名法
  - 类 单词首字母大写, 类的方法及属性 驼峰命名法
  - 枚举变量 单词首字母大写, 枚举属性 全部字母大写, `_`分隔
  - 多个单词组成的缩写词, 在命名中, 根据当前命名法和出现的位置, 所有字母的大小写与首字母大小写保持一致
- 命名词法
  - 类名 使用名词 `function Engine(options) {}`
  - 函数名，使用动宾短语。 `function getStyle(element) {}`
  - **boolean**类型的变量 使用 is 或 has 开头。`var isReady = false; var hasMoreCommands = false;`
  - Promise 对象用动宾短语的进行时表达。`var loadingData = ajax.get('url'); loadingData.then(callback);`
- 接口命名规范 (1.可读性强 2.不与`jQuery`社区习惯冲突 3.尽量写全不用缩写,除非下表中已经约定的)

常用词 | 说明
:--- |:---
options | 表示选项，与 jQuery 社区保持一致，不要用 config, opts 等
active |  表示当前，不要用 current 等
index | 表示索引，不要用 idx 等
trigger | 触点元素
triggerType | 触发类型、方式
context | 表示传入的 this 对象
object |  推荐写全，不推荐简写为 o, obj 等
element | 推荐写全，不推荐简写为 el, elem 等
length |  不要写成 len, l
prev |  previous 的缩写
next |  next 下一个
constructor | 不能写成 ctor
easing |  示动画平滑函数
min | minimize 的缩写
max | maximize 的缩写
DOM | 不要写成 dom, Dom
.hbs |  使用 hbs 后缀表示模版
btn | button 的缩写
link |  超链接
title | 主要文本
img | 图片路径（img标签src属性）
dataset | html5 data-xxx 数据接口
theme | 主题
className | 类名
classNameSpace |  class 命名空间

- True False
  - 类型检测 优先使用`typeof`
  - 对象检测 使用`instanceof`
  - null 或 undefined 检测使用 `== null`
  - 返回 **false** `null` `undefined` `''` `0` 
  - 返回 **true** `'0'` `[]` `{}`
- `for-in`循环只用于`object/map/hash`遍历, 因为`Array`上使用`for-in`循环会对所有出现在原型上的对象进行遍历
- 二元及三元操作符始终写在前一行
- 三元操作符替代`if...else`
- `&&` `||` 设置默认值和替代多个`if`嵌套判断
- 正则表达式 仅准用`.test()`和`.exec()`。不准用`"string".match()`
- 多个参数使用对象字面量存储

#### jQuery
- 使用最新版本的jQuery
- jQuery变量 以`$`开头, 并缓存到本地变量中复用, 使用驼峰命名法命名
- jQuery选择器
  - 尽量使用ID选择器
  - 父元素选择子元素用`.find()`方法性能会更好
- DOM 操作, 尽量先与节点分离, 操作结束后再插入节点
- 字符串连接 `array.join('')` >`+` > `.append()`
- 事件
  - 如果需要，对事件使用自定义的 namespace，这样容易解绑特定的事件，而不会影响到此 DOM 元素的其他事件监听；
  - 对 Ajax 加载的 DOM 元素绑定事件时尽量使用事件委托。事件委托允许在父元素绑定事件，子代元素可以响应事件，也包括 Ajax 加载后添加的子代元素；

```javascript
$("#myLink").on("click.mySpecialClick", myEventHandler);
$("#myLink").unbind("click.mySpecialClick");
```

```javascript
// Not recommended
$("#list a").on("click", myClickHandler);
// Recommended
$("#list").on("click", "a", myClickHandler);
```
- 链式写法 1.尽量使用链式写法而不是用变量缓存或者多次调用选择器方法； 2.当链式写法超过三次或者因为事件绑定变得复杂后，使用换行和缩进保持代码可读性；
- `CSS`不要写在`jQuery`里面
- 避免使用 `jQuery` 实现动画
  - 禁止使用`slideUp/Down() fadeIn/fadeOut()` 等方法；
  - 尽量不使用`animate()`方法；

**jQuery 插件模板**
```javascript
// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.pluginName = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {

            foo: 'bar',

            // if your plugin is event-driven, you may provide callback capabilities
            // for its events. execute these functions before or after events of your
            // plugin, so that users may customize those particular events without
            // changing the plugin's code
            onFoo: function() {}

        }

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin,
        // where "element" is the element the plugin is attached to;
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // code goes here

        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside
        // the plugin, where "element" is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        plugin.foo_public_method = function() {
            // code goes here
        }

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        // a private method. for demonstration purposes only - remove it!
        var foo_private_method = function() {
            // code goes here
        }

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();
    }

    // add the plugin to the jQuery.fn object
    $.fn.pluginName = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('pluginName')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.pluginName(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('pluginName', plugin);
            }
        });
    }
})(jQuery);
```

### ES6
- 块级作用域
  - `let`取代`var`
  - `let` `const`优先使用`const`(所有的函数应设置为`const常量`,`let`表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。)
- 字符串
  - 静态字符串使用单引号
  - 动态字符串使用反引号
- 解构赋值
  - 数组成员赋值,优先使用解构赋值 `const [first, second] = [1, 2];`
  - 函数的参数如果是对象的成员，优先使用解构赋值。
  - 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。
- 对象
  - 单行定义的对象,最后一个成员不以逗号结尾
  - 多行定义的对象,最后一个成员以逗号结尾
  - 对象尽量静态化,不得随意添加属性.如果添加属性不可避免,使用`Object.assign()`
  - 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
  - 对象属性和方法尽量采用简洁表达法
- 数组
  - 使用扩展运算符`...`拷贝数组
  - 使用`Array.from()`将类数组对象转为数组
- 函数
  - 立即执行函数可以写成箭头函数 `(()=>{console.log('a');})()`
  - 能用箭头函数尽量用箭头函数,不仅简洁而且绑定了`this`
  - 箭头函数取代`Function.prototype.bind`，不应再用`self/_this/that`绑定`this`。
  - 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
  - 不要在函数体内使用`arguments`变量，使用`rest运算符（...）`代替。
  - 使用默认值语法设置函数参数的默认值。
- `Map`结构
  - 只有模拟实体对象时，才使用`Object`。如果只是需要`key:value`的数据结构，使用`Map`。因为`Map`有内建的遍历机制。
- class
  - 用`class`取代`prototype`操作
  - 使用`extends`实现继承，这样不会有破坏`instanceof`运算的危险。
- module
  - `import` 取代 `require`
  - `export` 取代 `module.exports`
  - 如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，不要`export default`与普通的`export`同时使用。
  - 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（`export default`）。
  - 模块输出函数, 函数首字母小写
  - 模块输出对象,对象首字母大写

### 代码校验
#### 代码验证
- 使用 [W3C HTML Validator](http://validator.w3.org/) 来验证你的HTML代码有效性；
- 使用 [W3C CSS Validator](http://jigsaw.w3.org/css-validator/validator.html.zh-cn) 来验证你的CSS代码有效性；

#### ESlint 使用
- `$ npm i -g eslint`
- `$ npm i -g eslint-config-airbnb`
- `.eslintrc`文件，配置ESLint。`{"extends": "eslint-config-airbnb"}`

### 参考
- [ES6入门-编程风格](http://es6.ruanyifeng.com/#docs/style)
- [前端开发规范手册](http://zhibimo.com/read/Ashu/front-end-style-guide/index.html)
- [网页字体排印指南](http://aaaaaashu.me/shu/)



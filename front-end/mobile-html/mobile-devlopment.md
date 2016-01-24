移动端性能优化及兼容性
===
### 禁止保存或者拷贝图像
**仅iOS有效**
```css
img {
  -webkit-touch-callout: none;
}
```

### 取消touch高亮
所有设置了`:active`的元素, 默认在激活状态时, 显示高亮框
```css
.xxx {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```
### 禁止选中内容
```css
html {
  -webkit-user-select: none;
}
```

### click 300ms 延时响应 使用 [Fastclick](https://github.com/ftlabs/fastclick)
```javascript
window.addEventListener( "load", function() {
  FastClick.attach( document.body );
}, false );
```

### 快速回弹滚动
- 早期的时候，移动端的浏览器都不支持非body元素的滚动条，所以一般都借助 `iScroll`;
- `Android 3.0/iOS`解决了非body元素的滚动问题，但滚动条不可见，同时iOS上只能通过2个手指进行滚动；
- `Android 4.0`解决了滚动条不可见及增加了快速回弹滚动效果，不过随后这个特性又被移除；
- `iOS`从`5.0`开始解决了滚动条不可见及增加了快速回弹滚动效果

在`iOS`上如果你想让一个元素拥有像 `Native` 的滚动效果，你可以这样做：
```css
.element {
  overflow: auto; /* auto | scroll */
  -webkit-overflow-scrolling: touch; /* 该规则可能引起iOS UIWebView崩溃 */
}
```
还可以借助[iScroll](https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/versions.html)或者更强大的[Swiper](http://www.idangero.us/swiper/#.VfaVk52qqko)(支持3D内置滚动条)实现

### 设备检测
```javascript
// 这段代码引用自：https://github.com/binnng/device.js

var WIN = window;
var LOC = WIN["location"];
var NA = WIN.navigator;
var UA = NA.userAgent.toLowerCase();

function test(needle) {
  return needle.test(UA);
}

var IsTouch = "ontouchend" in WIN;
var IsAndroid = test(/android|htc/) || /linux/i.test(NA.platform + "");
var IsIPad = !IsAndroid && test(/ipad/);
var IsIPhone = !IsAndroid && test(/ipod|iphone/);
var IsIOS = IsIPad || IsIPhone;
var IsWinPhone = test(/windows phone/);
var IsWebapp = !!NA["standalone"];
var IsXiaoMi = IsAndroid && test(/mi\s+/);
var IsUC = test(/ucbrowser/);
var IsWeixin = test(/micromessenger/);
var IsBaiduBrowser = test(/baidubrowser/);
var IsChrome = !!WIN["chrome"];
var IsBaiduBox = test(/baiduboxapp/);
var IsPC = !IsAndroid && !IsIOS && !IsWinPhone;
var IsHTC = IsAndroid && test(/htc\s+/);
var IsBaiduWallet = test(/baiduwallet/);
```

### 获取滚动条的值
```javascript
window.scrollY;
window.scrollX;
```

### <head> 
**页面窗口自动调整到设备宽度, 并禁止用户缩放页面**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
**指定 iOS 的 safari 顶端状态条的样式**
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```
**添加到主屏幕时隐藏地址栏和状态栏（即全屏）**
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```
**添加到主屏幕时设置系统顶栏颜色**
当我们将一个网页添加到主屏幕时，还可以对 系统显示手机信号、时间、电池的顶部状态栏 颜色进行设置，前提是开启了：
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```
有了这个前提，你可以通过下面的方式来进行定义：
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```
- `content`只有3个固定值可选：`default | black | black-translucent`, **该设置只在 iOS 上有效。**
  - 如果设置为 `default`，状态栏将为正常的，即白色，网页从状态栏以下开始显示；
  - 如果设置为 `black`，状态栏将为黑色，网页从状态栏以下开始显示；
  - 如果设置为 `black-translucent`，状态栏将为灰色半透明，网页将充满整个屏幕，状态栏会盖在网页之上；

**iOS Safari 提供了一个私有的 meta 来定义主屏幕App名字**
```html
<!-- iOS自动增加图标效果 -->
<meta name="apple-mobile-web-app-title" content="Web App名称" />
<!-- 使用原图作为App的图标，用以保持各平台表现一致 -->
<link rel="apple-touch-icon-precomposed" href="app.png" />
<!-- 想给不同的设备定不同的图标，可以通过 sizes 属性来定义 -->
<!-- 如果没有跟相应设备推荐尺寸一致的图标，会优先选择比推荐尺寸大并且最接近推荐尺寸的图标。
如果没有比推荐尺寸大的图标，会优先选择最接近推荐尺寸的图标。
如果有多个图标符合推荐尺寸，会优先选择包含关键字precomposed的图标。 -->
<!-- 想省事的话，可以分别为 iPhone 和 iPad 定义一种高质量的 icon 即可 -->
<link rel="apple-touch-icon" sizes="76x76" href="ipad.png@1x" />
<link rel="apple-touch-icon" sizes="120x120" href="iphone-retina@2x.png" />
<link rel="apple-touch-icon" sizes="152x152" href="ipad-retina@2x.png" />
<link rel="apple-touch-icon" sizes="180x180" href="iphone-retina@3x.png" />
```
**自定义App图标**
```html
<link rel="apple-touch-icon" href="app.png" />
<link rel="apple-touch-icon-precomposed" href="app.png" />
```
**电话号码识别**
```javascript
<!-- 关闭电话号码识别： -->
<meta name="format-detection" content="telephone=no" />
<!-- 开启电话功能： -->
<a href="tel:123456">123456</a>
<!-- 开启短信功能： -->
<a href="sms:123456">123456</a>
```
**邮箱地址的识别**
```html
<!-- 关闭邮箱地址识别： -->
<meta name="format-detection" content="email=no" />
<!-- 开启邮件发送： -->
<a href="mailto:mobile@gmail.com">mobile@gmail.com</a>
```
**同时关闭电话和邮箱识别**
```html
<meta name="format-detection" content="telephone=no,email=no" />
```
**关闭iOS输入自动修正**
```html
<input type="text" autocorrect="off" />
```
**关闭iOS键盘首字母自动大写**
```html
<input type="text" autocapitalize="off" />
```
**禁止文本缩放**
当移动设备横竖屏切换时，文本的大小会重新计算，进行相应的缩放，当我们不需要这种情况时，可以选择禁止(PC端的该属性已经被移除，该属性在移动端要生效，必须设置 `meta viewport`)：
```css
html {
  -webkit-text-size-adjust: 100%;
}
```

### CSS 兼容性
#### CSS伪类 `:active`
**如果需要 按下激活 状态，推荐使用 js 新增一个 className**
- `iOS`上的几乎任何浏览器，定义元素的伪类`:active`都是无效；
- `Android`上，`Android Browser`和`Chrome`都支持伪类`:active`，其它第三方浏览器有部分不支持；
- 定义了`:active`并且当前浏览器环境支持，当手指在滚动或者无意间的划过时`:active`状态都会被激活；

#### 清除输入框内阴影
`iOS`默认输入框有内阴影,无法使用`box-shadow`来清除,可以采用以下代码清除
```css
input,
textarea {
  border: 0; // 方法1 去掉边框
  border-color: transparent; // 方法2 边框色透明
  -webkit-appearance: none; // 方法3 重置输入框默认外观
  appearance: none;
}
```

#### Samsung S4圆角Bug
**Samsung S4**手机在 **Android Browser4.4.2** 上（其他版本未测），*如果你使用了 border-radius，并且使用了 -webkit-transform 属性，当使用了 translatez 或者 translate3d 值，圆角会出现问题*，可以直接使用 `-webkit-transform: translate(0, 0)` 来避免这个问题。

#### 边框圆角导致背景溢出
`红米` `OPPO`某些版本的`Android Webview`, 如果一个元素定义了`border` + `border-radius`, 这时背景将会溢出圆角之外。其主要原因是因为CSS对背景裁剪（`background-clip`）有不同的处理方式，通常它可以是 `border-box | padding-box | content-box` 这3种方式。
浏览器的默认裁减方式是 `border-box`，即溢出 border 之外的背景都将被裁减。将值定义为 `padding-box | content-box` 都能fix这问题，不过 **更推荐使用 padding-box**。*因为使用 content-box，如果定义了 padding 不为 0，背景将无法铺满元素。*

#### 圆角绘制失败
```css
// 绘制圆角
.circle {
    border-radius: 50%;
}
// 在 Android Browser2.* 上，这个定义将会失效，而显示为默认的矩形。
// 因为 Android Browser2.* 不支持以 百分比 作为 border-radius 的值

// 兼容 Android Browser2.*
// 方法1
.circle {
    width: 10rem;
    height: 10rem;
    border-radius: 5rem;
}
// 方法2
.circle {
    border-radius: 100rem;
}
```

#### 不要使用伪元素动画
如果你想给伪元素增加 `animation` 或者 `transition` 动画，在以下系统会出现问题
- `iOS Safari6.1`及以下
- `Android Browser4.1.*`及以下，包括一些深度定制的系统，比如：
  - 魅族 `Flyme OS 4.1.1.1C`及以下

#### :checked与兄弟选择符一起使用的bug
在 `Android Browser4.2.*`及以下（可能版本稍有出入）（包括坑爹的`Flyme`），以下代码无任何效果：
```css
input:checked ~ .test {
  background-color: #f00;
}
```
如果你想使得上述代码生效，有2种方式：
```css
// 第一种，使用 input 和 + 进行激活：
// 只要存在 input和 + 选择符配合使用的选择器（空规则集也行）即可使得上述代码激活生效。
html + input {}
input:checked ~ .test {
  background-color: #f00;
}
// 第二种，直接换成 +：
input:checked + .test {
  background-color: #f00;
}
```

#### 小于12px字号不生效
在`Android Chrome`上（包括部分版本上的`Android Browser`），仍然不支持小于`12px`的字号（测试至`Android5.0.2`, `Chrome46`）
项目使用`rem`, 不要使用`10`作为换算因子, 原因也如上

#### Flex 布局不生效
**Android Browser4.3及以下，iOS Safari6.1及以下**
- 使用块级元素作为 `flex items（flex子项）`；
- 当横向布局时，给 `flex子项` 子项定义 `width` 为非 `auto` 的值
- 当纵向布局时，给 `flex子项` 子项定义 `height` 为非 `auto` 的值

### 参考
- [移动端经验开发指南](http://hackersome.com/p/doyoe/trip)
- [前端开发规范手册](http://zhibimo.com/read/Ashu/front-end-style-guide/mobile-optimize/index.html)
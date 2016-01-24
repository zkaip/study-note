IE8 兼容性处理
===
### Doctype
```html
<!DOCTYPE html>
```

### Meta
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- 针对360 -->
<meta name="renderer" content="webkit">
```

### 媒体查询支持
[Respond.js](https://github.com/scottjehl/Respond)

### CSS3 支持
[CSS3 PIE](http://css3pie.com/)，它支持的特性有这些：`border-radius` `box-shadow` `border-image` `multiple background images` `linear-gradient`等。注意阅读 [Knows Issues](http://css3pie.com/documentation/known-issues/)

### HTML5 支持
[html5shiv](https://github.com/aFarkas/html5shiv)

### CSS 兼容性
#### max-width
`IE`解析`max-width`所遵循的规则：严格要求直接父元素的宽度是固定的

- `td`中的`max-width`

**如果针对td中的img元素设置max-width: 100%**，在`IE`和`Firefox`你会发现不奏效，而在`Chrome`中却是可以的。经查询发现需要给`table`设置`table-layout: fixed`。

- 嵌套标签中的`max-width`

```html
<div class="work-item">
    <a href="#" class="work-link">
        <img src="sample.jpg" class="work-image img-responsive">
    </a>
</div>
```
最外层元素`.work-item`设置了固定宽度，但是对`img`设置`max-width为100%`却无效，后来才发现 **需要再对a标签设置width: 100%**，这样才能使最内层的`img`标签充满整个`div`。

#### 嵌套`inline-block`下`padding`元素重叠
`IE8`出现重叠, 解决方法: `float: left`替代`display: inline-block`实现水平布局。
```html
<ul>
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
</ul>
```
```css
ul li{
    display: inline-block;
}
ul li a{
    display: inline-block;
    padding: 10px 15px;
}
```

#### placeholder
[jquery-placeholder](https://github.com/mathiasbynens/jquery-placeholder)

#### last-child
最后一个元素, 单独设置一个`.last`的`class`

#### background-size: cover
如果你想使用`background-size: cover`设置全屏背景，很遗憾IE8办不到...但可以使用IE独有的`AlphaImageLoader`滤镜来实现，添加一条如下的`CSS`样式：
```css
filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=Enabled, sizingMethod=Size , src=URL)
```
将`sizingMethod`设置为`scale`就OK了。

如果你在此背景之上放置了链接，那这个链接是无法点击的。一般情况下的解决办法是为链接或按钮添加`position:relative`使其相对浮动。

#### filter blur
`CSS3`中提供支持滤镜效果的属性`filter`，比如支持高斯模糊效果的`blur`
```css
filter: blur(10px);
-webkit-filter: blur(10px);
-moz-filter: blur(10px);
```
`IE8`对`filter: blur(10px)`的显示效果是对HTML元素进行小范围的模糊处理，这个效果并不是高斯模糊，要想支持高斯模糊，需要如下设置：
```css
filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10');
```
在实践中发现一个坑就是，所有`position: relative`的元素都不会生效。

`IE9`对`filter: blur(10px)`无效，而对`filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10');`是针对元素小范围的模糊效果。

### 参考
- [IE8+ 兼容性小结](http://www.hustlzp.com/post/2014/01/ie8-compatibility)
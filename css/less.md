LESS
===
### 变量
```less
@color: #4D926F;

#header {
  color: @color;
}
```

### 嵌套
`&`表示串联选择器
```less
#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
  &.float {
    float: left; 
  }
}
```

### 函数运算`加减乘除`
可以分辨出颜色和单位, 可以在复合属性中进行运算
```less
@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
  color: @base-color * 3;
  border-left: @the-border;
  border-right: @the-border * 2;
}
#footer { 
  color: @base-color + #003300;
  border-color: desaturate(@red, 10%);
}

@var: 1px + 5;
border: (@width * 2) solid black;
```

### 混合(可带参数混合(参数可设置默认值),可进行模式匹配,可进行表达式匹配) Mixin
#### 普通混合
```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  .bordered; // <= 混合
}
```
### 带参数混合(可设置默认值),特殊参数`@arguments`包含了所有传递进来的参数
```less
.border-radius (@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}
#header {
  .border-radius(4px); // <= 混合
}

// 设置默认值
.border-radius (@radius: 5px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

#header {
  .border-radius;  // <= 用默认值混合
}

// @arguments
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
// => 混合后
// => box-shadow: 2px 5px 1px #000;
// => -moz-box-shadow: 2px 5px 1px #000;
// => -webkit-box-shadow: 2px 5px 1px #000;
```
#### 模式匹配
只有被匹配的混合才会被使用。变量可以匹配任意的传入值，而变量以外的固定值就仅仅匹配与其相等的传入值，可以匹配多个参数。
```less
.mixin (@s, @color) { ... }

.class {
  .mixin(@switch, #888);
}

.mixin (dark, @color) {
  color: darken(@color, 10%);
}
.mixin (light, @color) {
  color: lighten(@color, 10%);
}
.mixin (@_, @color) {
  display: block;
}

// 进行模式匹配
@switch: light;

.class {
  .mixin(@switch, #888);
}

// 匹配多个参数
.mixin (@a) {
  color: @a;
}
.mixin (@a, @b) {
  color: fade(@a, @b);
}
```
#### 匹配表达式
- 可用的全部比较运算有：`>` `>=` `=` `=<` `<``
- 关键字`true`只表示布尔真值，`true`以外的值都被视示布尔假
- 逗号`,`分割，当且仅当所有条件都符合时，才会被视为匹配成功。
- 可以无参数，也可以对参数进行比较运算
- 想基于值的类型进行匹配，我们就可以使用`is*`函数
- 可以使用`and` `not` 关键字

```javascript
iscolor
isnumber
isstring
iskeyword
isurl
// 判断数值单位
ispixel
ispercentage
isem
```

```less
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}

.truth (@a) when (@a = true) { ... }
.mixin (@a) when (@a > 10), (@a < -10) { ... }
.mixin (@a) when (@media = desktop) { ... }
.max (@a, @b) when (@a > @b) { width: @a }
.mixin (@a, @b: 0) when (isnumber(@b)) { ... }
.mixin (@b) when not (@b > 0) { ... }
```
### 函数 及 字符串
#### Color 函数
颜色会先被转化成`HSL`色彩空间, 然后在通道级别操作
```less
lighten(@color, 10%); // 颜色变浅
darken(@color, 10%); // 颜色变深

saturate(@color, 10%); // 增加饱和度
desaturate(@color, 10%); // 减少饱和度

fadein(@color, 10%); // 返回透明度比@color小10%的颜色
fadeout(@color, 10%); // 返回透明度比@color大10%的颜色
fade(@color, 50%); // 把颜色调到指定透明度

spin(@color, 10); // 色相高10度的颜色
spin(@color, -10); // 色相低10度的颜色

mix(@color1, @color2); // 两中颜色进行混合后的颜色

hue(@color);        // 返回该颜色的色相
saturation(@color); // 返回该颜色的饱和度
lightness(@color);  // 返回该颜色的明度

// 在一种颜色的通道上创建另一种颜色
@new: hsl(hue(@old), 45%, 90%); // @new 将会保持 @old的 色调, 但是具有不同的饱和度和亮度
```
#### Math 函数
```less
round(1.67); // returns `2`
ceil(2.4);   // returns `3`
floor(2.6);  // returns `2`
percentage(0.5); // returns `50%` 转化百分比
```
### javascript 表达式
```less
@var: `"hello".toUpperCase() + '!'`;

// 同时使用字符串插值和避免编译:
@str: "hello";
@var: ~`"@{str}".toUpperCase() + '!'`;

// 访问JavaScript环境:
@height: `document.body.clientHeight`;

// 将一个JavaScript字符串解析成16进制的颜色值,
@color: color(`window.colors.baseColor`);
@darkcolor: darken(@color, 10%);
```
#### 字符串差值
```less
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```
#### 避免编译 `~`
```less
.class {
  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
```
#### 注释
- `/**/` 该注释编译后保留
- `//` 该注释编译后被过滤掉

### 模块化
#### 作用域
`LESS`首先会从本地查找变量或者混合模块，如果没找到的话会去父级作用域中查找，直到找到为止.
#### 命名空间
```less
// 将一些变量或者混合模块打包起来
#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}

// 在 #header a中像这样引入 .button:
#header a {
  color: orange;
  #bundle > .button; // <= 引入模块中的元素
}
```
#### import
`.less`后缀可不带, `.css`文件不会被处理
```
@import "lib.less";
@import "lib";
@import "lib.css";
```

### 参考
[Less学习](http://www.bootcss.com/p/lesscss/)
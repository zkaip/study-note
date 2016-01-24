SASS 语法
===
### 文件后缀名
`scss` `sass`

### 导入
`scss`会被合并成一个CSS文件, `css`不会被合并

### 注释
双斜杠注释不会被转译出来

### 变量
`$`开头, `:`分隔, `!default`默认变量, `#{$variables}`特殊变量, `!global`全局变量

类型
- numbers (e.g. 1.2, 13, 10px)
- strings of text, with and without quotes (e.g. "foo", 'bar', baz)
- colors (e.g. blue, #04a3f9, rgba(255, 0, 0, 0.5))
- booleans (e.g. true, false)
- nulls (e.g. null)
- lists of values, separated by spaces or commas (e.g. 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
  - nth($var,$index)
  - length($list)
  - join($list1,$list2,[$separator])
  - append($list,$value,[$separator])
- maps from one value to another (e.g. (key1: value1, key2: value2))
  - map-get($map,$key)
  - map-merge($map1,$map2)
  - map-keys($map)
  - map-values($map)

### 嵌套
- 选择器嵌套
- 属性嵌套
- `@at-root`跳出嵌套
- `@at-root (without: ...)`和`@at-root (with: ...)`

> 默认@at-root只会跳出选择器嵌套，而不能跳出@media或@support，如果要跳出这两种，则需使用@at-root (without: media)，@at-root (without: support)。这个语法的关键词有四个：all（表示所有），rule（表示常规css），media（表示media），support（表示support，因为@support目前还无法广泛使用，所以在此不表）。我们默认的@at-root其实就是@at-root (without:rule)。

### 混合
声明的`@mixin`通过`@include`来调用。
`@content`

### 继承
`@extend`，后面紧跟需要继承的选择器。
占位选择器`%`

### 函数
- `lighten($color,$amount)`
- `darken($color,$amount)`

### 运算
可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。

### 条件判断及循环
`@if @else`
`if($condition, $if_true, $if_false)`
`@for $var from <start> through <end>` `@for $var from <start> to <end>`
`@each $var in <list or map>`

### 参考
- [sass语法](http://www.w3cplus.com/sassguide/syntax.html)
- [Sass (Syntactically Awesome StyleSheets)](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
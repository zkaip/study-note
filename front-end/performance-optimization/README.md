前端性能优化
===
### AJax 优化
- 缓存 Ajax
- 请求尽量使用`GET`, 仅取决于`cookie`数量

### Cookie 优化
- 减少`Cookie`的大小
- 使用无`Cookie`的域来存放静态资源(可以利用`CDN`)

### DOM 优化
#### 优化节点修改(使用`cloneNode`在外部更新节点后在通过`replace`与原始节点互换)
```javascript
var orig = document.getElementById('container');
var clone = orig.cloneNode(true);
var list = ['foo', 'bar', 'baz'];
var content;
for (var i = 0; i < list.length; i++) {
  content = document.createTextNode(list[i]);
  clone.appendChild(content);
}
orig.parentNode.replaceChild(clone, orig);
```

#### 优化节点添加(创建`DocumentFragment`, 在其中插入节点后再添加到页面)
```javascript
createSafeFragment(document) {
  var list = nodeNames.split( "|" ),
  safeFrag = document.createDocumentFragment();

  if (safeFrag.createElement) {
    while (list.length) {
      safeFrag.createElement(
        list.pop();
      );
    };
  };
  return safeFrag;
};
```

#### 优化`CSS`样式转换(尽量采用触发`reflow`次数少的方式, 使用直接设置元素的`className`来代替逐条更改元素样式)
```javascript
// Not Recommended
element.style.fontWeight = 'bold' ;
element.style.marginLeft= '30px' ;
element.style.marginRight = '30px' ;
// Recommended
element.className = 'selectedAnchor' ;
```

#### 减少`DOM`元素数量
`document.getElementsByTagName( '*' ).length <= 1000`

#### `DOM`操作优化
**`DOM`操作性能原因**
- DOM元素过多导致元素定位缓慢。
- 大量的DOM接口调用。
- DOM操作触发频繁的 *reflow(layout)(计算页面元素的几何信息)*和 *repaint(绘制页面元素)*。
- layout发生在repaint之前，所以layout相对来说会造成更多性能损耗。
- 对DOM进行操作会导致浏览器执行回流reflow。

**优化`DOM`操作**
- 纯`JAVASCRIPT`执行时间是很短的。
- 最小化`DOM访问次数`，尽可能在js端执行。
- 如果需要多次访问某个DOM节点，请`使用局部变量存储对它的引用`。
- `谨慎处理HTML集合`（HTML集合实时连系底层文档），把集合的长度缓存到一个变量中，并在迭代中使用它，`如果需要经常操作集合，建议把它拷贝到一个数组中`。
- 如果可能的话，使用速度更快的API，比如`querySelectorAll`和`firstElementChild`。
- 要留意重绘和重排。
- 批量修改样式时，`离线`操作DOM树。
- `使用缓存`，并减少访问布局的次数。
- `动画中使用绝对定位，使用拖放代理`。
- `使用事件委托来减少事件处理器的数量`

#### 优化`DOM`交互
**最小化`现场更新`**
**多使用`innerHTML`替代`createElement()`和`appendChild()`**: 

#### `reflow`回流
**发生场景**
- 改变窗体大小。
- 更改字体。
- 添加移除stylesheet块。
- 内容改变哪怕是输入框输入文字。
- CSS虚类被触发如 :hover。
- 更改元素的className。
- 当对DOM节点执行新增或者删除操作或内容更改时。
- 动态设置一个style样式时（比如element.style.width="10px"）。
- 当获取一个必须经过计算的尺寸值时，比如访问offsetWidth、clientHeight或者其他需要经过计算的CSS值。

**解决关键: 限制`DOM`操作所引发的回流**
- 在对当前DOM进行操作之前，尽可能多的做一些准备工作，保证N次创建，1次写入。
- 在对DOM操作之前，把要操作的元素，先从当前DOM结构中删除：
  - 通过`removeChild()`或者`replaceChild()`实现真正意义上的删除。
  - 设置该元素的`display`样式为“`none`”。
- 每次修改元素的style属性都会触发回流操作。`element.style.backgroundColor = "blue";`
  - 使用更改`className`的方式替换`style.xxx=xxx`的方式。
  - 使用`style.cssText = '';`一次写入样式。
  - 避免设置过多的行内样式。
  - 添加的结构外元素尽量设置它们的位置为`fixed`或`absolute`。
  - 避免使用表格来布局。
  - 避免在CSS中使用`JavaScript expressions(IE only)`。
- 将获取的DOM数据缓存起来。这种方法，对获取那些会触发回流操作的属性（比如offsetWidth等）尤为重要。
- 当对`HTMLCollection`对象进行操作时，应该将访问的次数尽可能的降至最低，最简单的，你可以将length属性缓存在一个本地变量中，这样就能大幅度的提高循环的效率。

### `repaint`重绘
- 注意JavaScript代码优化, 减少重绘。
- 使用HTML5和CSS3的一些新特性。
- 避免在HTML里面缩放图片。
- 避免使用插件。
- 确保使用正确的字体大小。

### HTML 优化
- 插入HTML。(找一个容器元素，并使用`innerHTML`来将HTML代码插入到页面中。)
- `避免空的src和href`。
  - 当link标签的href属性为空、script标签的src属性为空的时候，浏览器渲染的时候会把当前页面的URL作为它们的属性值，从而把页面的内容加载进来作为它们的值。
- 为文件头指定`Expires`。
- 重构HTML，`把重要内容的优先级提高`。
- `Post-load（次要加载）`不是必须的资源。
- 利用`预加载`优化资源。
- 合理架构，使DOM结构尽量简单。
- 利用`LocalStorage`合理缓存资源。
- 尽量`避免CSS表达式和滤镜`。
- 尝试`使用defer方式加载Js脚本`。
- 新特性：`will-change`，把即将发生的改变预先告诉浏览器。
- 新特性`Beacon`，不堵塞队列的异步数据发送。
- 尽量多地缓存文件。
- 使用`HTML5 Web Workers来允许多线程工作`。
- `为不同的Viewports设置不同大小的Content`。
- 正确设置可Tap的目标的大小。
- 使用`响应式图片`。
- 支持`新接口协议`（如HTTP2）。
- 未来的`缓存离线机制`：`Service Workers`。
- 未来的资源优化`Resource Hints(preconnect, preload, 和prerender)`。
- 使用`Server-sent Events`。
- 设置一个`Meta Viewport`。
- 避免跨域
  - 同域：注意避免反斜杠 “`/`” 的跳转；
  - 跨域：使用`Alias`或者`mod_rewirte`建立`CNAME`（保存域名与域名之间关系的DNS记录）

### 动画优化


### CSS 优化
####慎重选择高消耗的样式
高消耗属性在绘制前需要浏览器进行大量计算： `box-shadows` `border-radius` `transparency` `transforms` `CSS filters（性能杀手）`

####避免过分重排
当发生重排的时候，浏览器需要重新计算布局位置与大小，[更多详情](http://www.jianshu.com/p/e305ace24ddf)。

常见的重排元素: `width` `height` `padding` `margin` `display` `border-width` `position` `top` `left` `right` `bottom` `font-size` `float` `text-align` `overflow-y` `font-weight` `overflow` `font-family` `line-height` `vertical-align` `clear` `white-space` `min-height`

####正确使用 `Display` 的属性
`Display` 属性会影响页面的渲染，请合理使用。
- `display: inline`后不应该再使用 `width` `height` `margin` `padding` 以及 `float`
- `display: inline-block` 后不应该再使用 `float`；
- `display: block` 后不应该再使用 `vertical-align`；
- `display: table-*` 后不应该再使用 `margin` 或者 `float`；

####不滥用 Float
Float在渲染时计算量比较大，尽量减少使用。

####动画性能优化
动画的基本概念：

- 帧：在动画过程中，每一幅静止画面即为一“帧”;
- 帧率：即每秒钟播放的静止画面的数量，单位是fps(Frame per second);
- 帧时长：即每一幅静止画面的停留时间，单位一般是ms(毫秒);
- 跳帧(掉帧/丢帧)：在帧率固定的动画中，某一帧的时长远高于平均帧时长，导致其后续数帧被挤压而丢失的现象。

一般浏览器的渲染刷新频率是 `60 fps`，所以在网页当中，帧率如果达到 `50-60 fps` 的动画将会相当流畅，让人感到舒适。

- 如果使用基于 `javaScript` 的动画，尽量使用 `requestAnimationFrame`. 避免使用 `setTimeout`, `setInterval`.
- 避免通过类似 `jQuery animate()-style` 改变每帧的样式，使用 CSS 声明动画会得到更好的浏览器优化。
- 使用 `translate` 取代 `absolute` 定位就会得到更好的 `fps`，动画会更顺滑。
- 动画效果在缺少硬件加速支持的情况下反应缓慢，例如手机客户端。
- 特效只在确实能够改善用户体验时才使用
- 至少给用户一个可以禁用动画效果的选项
- 设置动画元素为 `position:absolute;` 或 `position:fixed`(只需要`repaint`),而`position: static`或`position: relative`元素应用动画效果会造成频繁的`reflow`
- 使用一个`timer`完成多个元素的动画
- 使用一个`timer`完成多个对象的动画效果
- 以脚本为基础的动画, 由浏览器控制动画的更新频率
- 避免使用 `jQuery` 实现动画
  - 禁止使用 `slideUp/Down()` `fadeIn/fadeOut()` 等方法；
  - 尽量不使用 `animate()` 方法；

![高性能动画](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/cheap-operations.jpg)

####多利用硬件能力，如通过 3D 变形开启 GPU 加速(3D 变形会消耗更多的内存和功耗)
一般在 `Chrome` 中，3D或透视变换（`perspective transform`）`CSS`属性和对 `opacity` 进行 `CSS` 动画会创建新的图层，在硬件加速渲染通道的优化下，`GPU` 完成 `3D` 变形等操作后，将图层进行复合操作（`Compesite Layers`），从而避免触发浏览器大面积重绘和重排。

使用 `translate3d` 右移 `500px` 的动画流畅度要明显优于直接使用 `left`：
```css
.ball-1 {
  transition: -webkit-transform .5s ease;
  -webkit-transform: translate3d(0, 0, 0);
}
.ball-1.slidein{
  -webkit-transform: translate3d(500px, 0, 0);
}
.ball-2 {
  transition: left .5s ease; left：0;
}
.ball-2.slidein {
  left：500px;
}
```

####提升 CSS 选择器性能
CSS 选择器对性能的影响源于浏览器匹配选择器和文档元素时所消耗的时间，所以优化选择器的原则是应尽量避免使用消耗更多匹配时间的选择器。CSS 选择器匹配的机制， 如子选择器规则：

```css
#header > a {font-weight:blod;}
```

**CSS 选择器是从右到左进行规则匹配。**
最右边选择符为**关键选择器**。——[更多详情](http://www.jianshu.com/p/268c7f3dd7a6)
- 避免使用通用选择器
- 避免使用标签或 `class` 选择器限制 `id` 选择器
- 避免使用标签限制 `class` 选择器
- 避免使用多层标签选择器。使用 `class` 选择器替换，减少`css`查找
- 避免使用子选择器
- 使用继承

```css
/* Not recommended */
#bookmarkMenuItem > .menu-left { list-style-image: url(blah) }
/* Recommended */
#bookmarkMenuItem { list-style-image: url(blah) }
```

### JS 载入优化
- 使用加快JS载入速度的工具, 使JS并行载入
- 使用CDN
- 网页尾部载入JS, 头部载入必须异步载入
- 跟踪代码等跟页面关系不大的代码异步载入或延迟载入
- 将JS打包成`PNG`文件, 之后进行拆包, 只要使用画布API的getImageData()。可以在不缩小数据的情况下，多压缩35%左右。而且是无损压缩，对比较庞大的脚本来说，在图片指向画布、读取像素的过程中，会有一段读取时间。
- 设置`Cache-Control`和`Expires`头
```javascript
(function() {
  var script,
      scripts = document.getElementsByTagName('script')[0];
  function load(url) {
    script = document.createElement('script');
    script.async = true;
    script.src = url;
    scripts.parentNode.insertBefore(script, scripts);
  }

  load('//apis.google.com/js/plusone.js');
  load('//platform.twitter.com/widgets.js');
  load('//s.widgetsite.com/widget.js');
}());
```

### 代码压缩
- 使用代码压缩工具精简混淆压缩代码
- 启用`Gzip`压缩, 比 `deflate` 更高效
  - 客户端在请求`Accept-Encoding`中声明可以支持`Gzip`。
  - 服务器将请求文档压缩，并在`Content-Encoding`中声明该回复为`Gzip`格式。
  - 客户端收到之后按照`Gzip`解压缩。

### `Javascript`优化
#### 优化原则
- 只需要为IE6（未打补丁的JScript 5.6或更早版本）做优化
- 解释执行的情况下，在所有操作中，函数调用的效率是较低的。此外，过深的prototype继承链或者多级引用也会降低效率。
- JS优化总是出现在大规模循环的地方
- 尽量避免过多的引用层级和不必要的多次方法调用
- **arguments**优化: 
  - 如果一个可变参数的简单函数成为性能瓶颈的时候，可以将其内部做一些改变，不要访问arguments，而是通过对参数的显式判断来处理
  - `ES6`可以使用`...args`代替隐式的`arguments`

```javascript
// 显式判断处理优化
function sum() {  
  var r = 0;  
  for (var i = 0; i < arguments.length; i++) {  
    r += arguments[i];  
  }  
  return r;  
}
// 参数较少时优化
function sum() {  
  switch (arguments.length) {  
    case 1: return arguments[0];  
    case 2: return arguments[0] + arguments[1];  
    case 3: return arguments[0] + arguments[1] + arguments[2];  
    case 4: return arguments[0] + arguments[1] + arguments[2] + arguments[3];  
    default:  
      var r = 0;  
      for (var i = 0; i < arguments.length; i++) {  
        r += arguments[i];  
      }  
      return r;  
  }  
}
// 显式调用优化 (速度至少快1倍)
function sum(a, b, c, d, e, f, g) {  
  var r = a ? b ? c ? d ? e ? f ? a + b + c + d + e + f : a + b + c + d + e : a + b + c + d : a + b + c : a + b : a : 0;  
  if (g === undefined) return r;  
  for (var i = 6; i < arguments.length; i++) {  
    r += arguments[i];  
  }  
  return r;  
}
```

#### 常规优化
- 定时器
  - 使用`setInterval`取代多次`setTimeout`, 多次执行相同的代码
  - `setTimeout()` `setInterval()`传递方法取代方法字符串
    - `setTimeout(test, 1);` 取代 `setTimeout('test()', 1);`
- 使用原始操作代替方法调用
  - `var min = a<b?a:b;` 取代 `var min = Math.min(a, b);`
- 避免双重解释(一般在使用`eval函数`、`new Function构造函数`和`setTimeout`传一个字符串时等情况下会遇到)
  - `eval("alert('hello world');");`
  - `var sayHi = new Function("alert('hello world');");`
  - `setTimeout("alert('hello world');", 100);`
- 使用原生方法
- 最小化语句数目
  - 多个变量声明
  - 插入迭代值 `var name = values[i++];`
- 使用数组和对象字面量, 避免使用构造函数 `Array()` `Object()`
- 避免使用属性访问方法, 直接访问属性
- 减少使用元素位置操作
  - 一般浏览器都会使用增量reflow的方式将需要reflow的操作积累到一定程度然后再一起触发，但是如果脚本中要获取以下属性，那么 **积累的reflow将会马上执行**，用来得到准确的位置信息。`offsetLeft` `offsetTop` `offsetHeight` `offsetWidth` `scrollTop/Left/Width/Height` `clientTop/Left/Width/Height` `getComputedStyle()`
- **严格避免使用`eval()`**: 因为`eval()`会导致代码脏, 消耗大量时间, 无法被压缩工具压缩, 容易造成安全漏洞
- **避免使用`with`**: 尽可能地少用with语句，因为它会增加with语句以外的数据的访问代价。

#### 字符串优化
- 字符串替换、查找等操作，使用正则表达式(用`C`写的)
- 字符串拼接使用`+=`(如果考虑`IE6`,则使用`Array.join("")`), 编译器已经优化

#### 变量优化
- 通过 **包装函数**来处理 **全局变量**
  - `window`对象成员, 会一直存在老生代堆内存中, 直到页面被关闭
  - 多人协作易产生混淆
  - 作用域链中易被干扰
  - 全局变量需要搜索更长的作用域链, 生命周期长, 不利于内存释放
- 尽量使用 **局部变量**
  - 局部变量放在函数的栈里, 访问速度比全局变量更快
- **手动解除变量引用** `data = null;`
- 变量查找优化
  - 变量声明带上`var`, `ES6`中为`let`
  - 通过一条语句声明变量, 变量用`,`分隔
  - 缓存重复使用的全局变量(重复调用方法, 也可以用局部缓存提速)
- 善用回调(后续传递风格(Continuation Passing Style, CPS)的技术)
  - 如果传入的参数是基础类型（如字符串、数值），回调函数中传入的形参就会是复制值，业务代码使用完毕以后，更容易被回收。
  - 通过回调，我们除了可以完成同步的请求外，还可以用在异步编程中，这也就是现在非常流行的一种编写风格。
  - 回调函数自身通常也是临时的匿名函数，一旦请求函数执行完毕，回调函数自身的引用就会被解除，自身也得到回收。
```javascript
function getData(callback) {
  var data = 'some big data';
  callback(null, data);
}
getData(function(err, data) {
  console.log(data);
});
```

#### 运算符优化
- 尽量使用 `+=` `-=` `*=` `\=` 运算符, 而不是直接赋值
- 尽量使用`位运算`

#### 逻辑判断优化
- `swich`语句来优化多个`if...else`语句
- `||` `&&` 来优化多个`if`语句

#### 类型转换优化
- 数字=>字符串 `""+num` > `String()` > `.toString()` > `new String()`
- 浮点数=>整型 `Math.floor()` 或 `Math.round()`
- 字符串=>数字 `parseInt(str,10)`

#### 对象优化
- 对象创建
  - 尽量减少不必要的创建(JS的垃圾回收调度算法, 会随着对象个数增加, 性能会开始严重下降(复杂度`O(n^2)`))
  - 尽量采用缓存缓存复杂的`Javascript`对象
  - 尽量使用`JSON`创建对象, 而不是`var obj = new Object()`
- 对象查找
  - 避免对象的嵌套查询(因为JAVASCRIPT的解释性，`a.b.c.d.e`嵌套对象，需要进行`4`次查询，嵌套的对象成员会明显影响性能。)
  - 如果出现嵌套对象, 利用局部变量, 把它缓存, 放入临时的地方查询
- 对象属性
  - 先从本地变量表找到对象。
  - 然后遍历属性。
  - 如果在当前对象的属性列表里没找到。
  - 继续从prototype向上查找。
  - 且不能直接索引，只能遍历。

#### 数组优化
- 当需要使用数组时，可使用`JSON`格式的语法
- 如果需要遍历数组，应该先缓存数组长度，将数组长度放入局部变量中，避免多次查询数组长度。

#### 循环优化
- 循环性能 `do-while` > `for(;;)` ≈ `while()` > `for(in)`
  -  `for(;;)` 
    - 推荐使用for循环，如果循环变量递增或递减，不要单独对循环变量赋值，而应该使用嵌套的++或–-运算符。
    - 代码的可读性对于for循环的优化。
    - 用`-=1`。
    - 从大到小进行循环(代码可读性降低)
    - `IE6`下, `divs.length`在每次循环执行中都会计算一下长度
  - `for(in)`
    - `for(in)`内部实现是构造一个所有元素的列表，包括`array`继承的属性，然后再开始循环，并且需要查询`hasOwnProperty`。
- 避免不必要的属性查找
  - 访问`变量`或`数组`是`O(1)`操作
  - 访问`对象`上的`属性`是一个O(n)操作。(局部变量缓存)
- 优化循环
  - 减值迭代更有效
  - 简化终止条件
  - 简化循环体(尽可能移除循环的密集计算)
  - 使用后测试循环(`do-while`是后测试循环, 可以避免最初终止条件的计算)

```javascript
for(var i = 0; i < values.length; i++) { 
  process(values[i]); 
} 
// 优化1：简化终止条件 
for(var i = 0, len = values.length; i < len; i++) { 
  process(values[i]); 
} 
// 优化2：使用后测试循环（注意：使用后测试循环需要确保要处理的值至少有一个） 
var i values.length - 1; 
if(i > -1) { 
  do { 
    process(values[i]); 
  } while(--i >= 0); 
}
```

- 展开循环
  - 当循环的次数确定时，消除循环并使用多次函数调用往往更快。
  - 当循环的次数不确定时，可以使用`Duff`装置来优化。(`Duff`装置的基本概念是通过计算迭代的次数是否为8的倍数将一个循环展开为一系列语句。)

```javascript 
// Jeff Greenberg for JS implementation of Duff's Device 
// 如上展开循环可以提升大数据集的处理速度。
// 假设：
values.length > 0 
function process(v) { 
  alert(v); 
} 
var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]; 
var iterations = Math.ceil(values.length / 8); 
var startAt = values.length % 8; var i = 0; 
do { 
  switch(startAt) { 
    case 0 : 
      process(values[i++]); 
    case 7 : 
      process(values[i++]); 
    case 6 : 
      process(values[i++]); 
    case 5 : 
      process(values[i++]); 
    case 4 : 
      process(values[i++]); 
    case 3 : 
      process(values[i++]); 
    case 2 : 
      process(values[i++]); 
    case 1 : 
      process(values[i++]); 
  }
  startAt = 0; 
}
while(--iterations > 0); 
// 接下来给出更快的Duff装置技术，
// 将do-while循环分成2个单独的循环。（注：这种方法几乎比原始的Duff装置实现快上40%。） 
function process(v) {
  alert(v);
}
var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]; 
var iterations = Math.floor(values.length / 8); 
var leftover = values.length % 8; 
var i = 0; 
if(leftover > 0) {
  do {
    process(values[i++]);
  }while(--leftover > 0); 
}
do {
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
  process(values[i++]); 
}while(--iterations > 0);
// 针对大数据集使用展开循环可以节省很多时间，但对于小数据集，额外的开销则可能得不偿失。
```

- 避免遍历大量元素(避免对全局DOM元素进行遍历，如果`parent`已知可以指定`parent`在特定范围查询。)
```javascript
var elements = document.getElementsByTagName( '*' );
for (i = 0; i < elements.length; i++) {
  if (elements[i].hasAttribute( 'selected' )) {}
}
// 如果已知元素存在于一个较小的范围内，
var elements = document.getElementById( 'canvas' ).getElementsByTagName ( '*' );
for (i = 0; i < elements.length; i++) {
  if (elements[i].hasAttribute( 'selected' )) {}
}
```

- 避免在循环中使用`try_catch`
  - `try-catch-finally`语句在`catch`语句被执行的过程中会动态构造变量插入到当前域中，对性能有一定影响。
  - 如果需要异常处理机制，可以将其放在循环外层使用。

```javascript
// Not recommended
for ( var i = 0; i < 200; i++) {
  try {} catch (e) {}
}
// Recommended
try {
  for ( var i = 0; i < 200; i++) {}
} catch (e) {}
```

#### 原型优化
JAVASCRIPT中原型的概念，构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承

**通过原型优化方法定义**
- 如果一个方法类型将被频繁构造，通过方法原型从外面定义附加方法，从而避免方法的重复定义。
- 可以通过外部原型的构造方式初始化值类型的变量定义。（这里强调值类型的原因是，引用类型如果在原型中定义，一个实例对引用类型的更改会影响到其他实例。）

**可以把那些不变的属性和方法，直接定义在prototype对象上**
- 可以通过对象实例访问保存在原型中的值。
- 不能通过对象实例重写原型中的值。
- 在实例中添加一个与实例原型同名属性，那该属性就会屏蔽原型中的属性。
- 通过`delete`操作符可以删除实例中的属性。

#### 作用域链和闭包优化
##### 作用域
`作用域(scope)` JAVASCRIPT编程中一个重要的运行机制，在JAVASCRIPT同步和异步编程以及JAVASCRIPT内存管理中起着至关重要的作用。
**在JAVASCRIPT中，能形成作用域的有如下几点**
- 函数的调用
- `with`语句 with会创建自已的作用域，因此会增加其中执行代码的作用域的长度。
- 全局作用域。

```javascript
var foo = function() {
  var local = {};
};
foo();
console.log(local); //=> undefined

var bar = function() {
  local = {};
};
bar();
console.log(local); //=> {}

/**这里我们定义了foo()函数和bar()函数，他们的意图都是为了定义一个名为local的变量。在foo()函数中，我们使用var语句来声明定义了一个local变量，而因为函数体内部会形成一个作用域，所以这个变量便被定义到该作用域中。而且foo()函数体内并没有做任何作用域延伸的处理，所以在该函数执行完毕后，这个local变量也随之被销毁。而在外层作用域中则无法访问到该变量。而在bar()函数内，local变量并没有使用var语句进行声明，取而代之的是直接把local作为全局变量来定义。故外层作用域可以访问到这个变量。**/

local = {};
// 这里的定义等效于
global.local = {};
```

##### 作用域链
**在JAVASCRIPT编程中，会遇到多层函数嵌套的场景，这就是典型的作用域链的表示。**
```javascript
function foo() {
  var val = 'hello';
  function bar() {
    function baz() {
      global.val = 'world;'
    };
    baz();
    console.log(val); //=> hello
  };
  bar();
};
foo();

/**在`JAVASCRIPT`中，变量标识符的查找是从当前作用域开始向外查找，直到全局作用域为止。所以`JAVASCRIPT`代码中对变量的访问只能向外进行，而不能逆而行之。baz()函数的执行在全局作用域中定义了一个全局变量val。而在bar()函数中，对val这一标识符进行访问时，按照从内到外的查找原则：在bar函数的作用域中没有找到，便到上一层，即foo()函数的作用域中查找。然而，使大家产生疑惑的关键就在这里：本次标识符访问在foo()函数的作用域中找到了符合的变量，便不会继续向外查找，故在baz()函数中定义的全局变量val并没有在本次变量访问中产生影响。**/
```
**减少作用域链上的查找次数**
JAVASCRIPT代码在执行的时候，如果需要访问一个变量或者一个函数的时候，它需要遍历当前执行环境的作用域链，而遍历是从这个作用域链的前端一级一级的向后遍历，直到全局执行环境。
```javascript
/**效率低**/
for(var i = 0; i < 10000; i++){
    var but1 = document.getElementById("but1");
}
/**效率高**/
/**避免全局查找**/
var doc = document;
for(var i = 0; i < 10000; i++){
    var but1 = doc.getElementById("but1");
}
/**上面代码中，第二种情况是先把全局对象的变量放到函数里面先保存下来，然后直接访问这个变量，而第一种情况是每次都遍历作用域链，直到全局环境，我们看到第二种情况实际上只遍历了一次，而第一种情况却是每次都遍历了，而且这种差别在多级作用域链和多个全局变量的情况下还会表现的非常明显。在作用域链查找的次数是`O(n)`。通过创建一个指向`document`的局部变量，就可以通过限制一次全局查找来改进这个函数的性能。**/
```

##### 闭包
**JAVASCRIPT中的标识符查找遵循从内到外的原则。**
```javascript
function foo() {
  var local = 'Hello';
  return function() {
    return local;
  };
}
var bar = foo();
console.log(bar()); //=> Hello

/**这里所展示的让外层作用域访问内层作用域的技术便是闭包(Closure)。得益于高阶函数的应用，使foo()函数的作用域得到`延伸`。foo()函数返回了一个匿名函数，该函数存在于foo()函数的作用域内，所以可以访问到foo()函数作用域内的local变量，并保存其引用。而因这个函数直接返回了local变量，所以在外层作用域中便可直接执行bar()函数以获得local变量。**/
```
**闭包是JAVASCRIPT的高级特性，因为把带有​​内部变量引用的函数带出了函数外部，所以该作用域内的变量在函数执行完毕后的并不一定会被销毁，直到内部变量的引用被全部解除。**所以闭包的应用很容易造成内存无法释放的情况。

**良好的闭包管理**。

循环事件绑定、私有属性、含参回调等一定要使用闭包时，并谨慎对待其中的细节。
循环绑定事件，我们假设一个场景：有六个按钮，分别对应六种事件，当用户点击按钮时，在指定的地方输出相应的事件。
```javascript
var btns = document.querySelectorAll('.btn'); // 6 elements
var output = document.querySelector('#output');
var events = [1, 2, 3, 4, 5, 6];
// Case 1
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function(evt) {
    output.innerText += 'Clicked ' + events[i];
  };
}
/**这里第一个解决方案显然是典型的循环绑定事件错误**/
// Case 2
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = (function(index) {
    return function(evt) {
      output.innerText += 'Clicked ' + events[index];
    };
  })(i);
}
/**第二个方案传入的参数是当前循环下标，而后者是直接传入相应的事件对象。事实上，后者更适合在大量数据应用的时候，因为在JavaScript的函数式编程中，函数调用时传入的参数是基本类型对象，那么在函数体内得到的形参会是一个复制值，这样这个值就被当作一个局部变量定义在函数体的作用域内，在完成事件绑定之后就可以对events变量进行手工解除引用，以减轻外层作用域中的内存占用了。而且当某个元素被删除时，相应的事件监听函数、事件对象、闭包函数也随之被销毁回收。**/
// Case 3
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = (function(event) {
    return function(evt) {
      output.innerText += 'Clicked ' + event;
    };
  })(events[i]);
}
```
**避开闭包陷阱**
闭包是个强大的工具，但同时也是性能问题的主要诱因之一。不合理的使用闭包会导致内存泄漏。
**闭包的性能不如使用内部方法，更不如重用外部方法。**
由于`IE 9`浏览器的`DOM`节点作为`COM`对象来实现，`COM`的内存管理是通过引用计数的方式，引用计数有个难题就是循环引用，一旦`DOM`引用了闭包(例如`event handler`)，闭包的上层元素又引用了这个`DOM`，就会造成循环引用从而导致内存泄漏。

**善用函数, 避免闭包陷阱**
- 使用一个匿名函数在代码的最外层进行包裹。`(function() { // 主业务代码 })();`
- 甚至更高级一点(传入参数)：

```javascript
(function(win, doc, $, undefined) {
  // 主业务代码
})(window, document, jQuery);
```

- 甚至连如RequireJS, SeaJS, OzJS 等前端模块化加载解决方案，都是采用类似的形式：

```javascript
/**RequireJS**/
define(['jquery'], function($) {
  // 主业务代码
});
/**SeaJS**/
define('m​​odule', ['dep', 'underscore'], function($, _) {
  // 主业务代码
});
```

**被定义在全局作用域的对象，可能是会一直存活到进程退出的，如果是一个很大的对象，那就麻烦了。**

比如有的人喜欢在JavaScript中做模版渲染：
```javascript
<?php
  $db = mysqli_connect(server, user, password, 'myapp');
  $topics = mysqli_query($db, "SELECT * FROM topics;");
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>你是猴子请来的逗比么？</title>
</head>
<body>
  <ul id="topics"></ul>
  <script type="text/tmpl" id="topic-tmpl">
    <li class="topic">
      <h1><%=title%></h1>
      <p><%=content%></p>
    </li>
  </script>
  <script type="text/javascript">
    var data = <?php echo json_encode($topics); ?>;
    var topicTmpl = document.querySelector('#topic-tmpl').innerHTML;
    var render = function(tmlp, view) {
      var complied = tmlp
        .replace(/\n/g, '\\n')
        .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
          return '" + escape(' + code + ') + "';
        });

      complied = [
        'var res = "";',
        'with (view || {}) {',
          'res = "' + complied + '";',
        '}',
        'return res;'
      ].join('\n');

      var fn = new Function('view', complied);
      return fn(view);
    };

    var topics = document.querySelector('#topics');
    function init()
      data.forEach(function(topic) {
        topics.innerHTML += render(topicTmpl, topic);
      });
    }
    init();
  </script>
</body>
</html>
```
在从数据库中获取到的数据的量是非常大的话，前端完成模板渲染以后，data变量便被闲置在一边。可因为这个变量是被定义在全局作用域中的，所以JAVASCRIPT引擎不会将其回收销毁。如此该变量就会一直存在于老生代堆内存中，直到页面被关闭。可是 **如果我们作出一些很简单的修改，在逻辑代码外包装一层函数，这样效果就大不同了**。当UI渲染完成之后，代码对data的引用也就随之解除，而在最外层函数执行完毕时，JAVASCRIPT引擎就开始对其中的对象进行检查，data也就可以随之被回收

### 事件优化
- 当存在多个元素需要注册事件时，在每个元素上绑定事件本身就会对性能有一定损耗。
- 由于`DOM Level2事件模型`中所有事件默认会传播到上层文档对象，可以借助这个机制在上层元素注册一个统一事件对不同子元素进行相应处理。
**使用事件代理**
```javascript
// 捕获型事件先发生。
// 两种事件流会触发DOM中的所有对象，从document对象开始，也在document对象结束。
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>
// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click",function(e) {
  // e.target is the clicked element!
  // If it was a list item
  if(e.target && e.target.nodeName == "LI") {
    // List item found!  Output the ID!
    console.log("List item ",e.target.id.replace("post-")," was clicked!");
  }
});
```

### 性能测试工具
#### js性能优化和内存泄露问题及检测分析工具
- 性能优化ajax工具`diviefirebug`
- web性能分析工具[YSlow](http://developer.yahoo.com/yslow/)
  - `performance`性能评估打分，右击箭头可看到改进建议。
  - `stats`缓存状态分析，传输内容分析。
  - `components`所有加载内容分析，可以查看传输速度，找出页面访问慢的瓶颈。
  - `tools`可以查看js和css，并打印页面评估报告。
- 内存泄露检测工具`sIEve`
  - `sIEve`是基于`IE`的内存泄露检测工具，需要下载运行，可以查看`dom`孤立节点和内存泄露及内存使用情况。
  - 列出当前页面内所有dom节点的基本信息(html id style 等)
  - 页面内所有dom节点的高级信息 (内存占用,数量,节点的引用)
  - 可以查找出页面中的孤立节点
  - 可以查找出页面中的循环引用
  - 可以查找出页面中产生内存泄露的节点
- 内存泄露提示工具`leak monitor`
  - `leak monitor`在安装后，当离开一个页面时，比如关闭窗口，如果页面有内存泄露，会弹出一个文本框进行即时提示。
- 代码压缩工具
  - YUI压缩工具
  - Dean Edwards Packer
  - JSMin
  - Uglify
- 在`Blink/Webkit`浏览器中（`Chrome`, `Safari`, `Opera`），我们可以借助其中的`Developer Tools`的`Profiles`工具来 **对我们的程序进行内存检查**。

#### `Node.js`中的内存检查
- `OneApm` 或 `alinode` 进行线上监控
- 在`Node.js`中，我们可以使用`node-heapdump`和`node-memwatch`模块进​​行内存检查。

```
var heapdump = require('heapdump');
var fs = require('fs');
var path = require('path');
fs.writeFileSync(path.join(__dirname, 'app.pid'), process.pid);
```
在业务代码中引入`node-heapdump`之后，我们需要在某个运行时期，向`Node.js`进程发送`SIGUSR2`信号，让`node-heapdump`抓拍一份堆内存的快照。
`$ kill -USR2 (cat app.pid)`
这样在文件目录下会有一个以`heapdump-<sec>.<usec>.heapsnapshot`格式命名的快照文件，我们可以使用浏览器的`Developer Tools`中的`Profiles`工具将其打开，并进行检查。

#### 分析浏览器提供的Waterfall图片来思考优化入口。
#### 新的测试手段`Navigation` `Resource` `User timing`

Developer Tools - Profiles
### `JIT`与`GC`优化(内存优化)
- `number+number`，`string+string` 等等可以使用`JIT`优化，但特殊情况，如：`number+undefined`无法被优化
- `list`很大时, `JIT`无法优化

**Type-specializing JIT**优化
- 使用代价
  - 前置的扫描类型
  - 编译优化。
- 使用场景
  - 热点代码。
  - 通过启发式算法估算出来的有价值的代码。
- 当变量类型 发生变化时，引擎有2种处理方式：
  - 少量变更，重编译，再执行。
  - 大量变更，交给JIT执行。
- 数组，object properties， 闭包变量 不在优化范畴之列。

#### JavaScript的内存回收机制
在V8引擎中所有的JAVASCRIPT对象都是通过堆来进行内存分配的。当我们在代码中声明变量并赋值时，V8引擎就会在堆内存中分配一部分给这个变量。如果已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止（默认情况下，V8引擎的堆内存的大小上限在`64位`系统中为`1464MB`，在`32位`系统中则为`732MB`）

`V8`引擎对堆内存中的JAVASCRIPT对象进行分代管理。
- 新生代 即存活周期较短的JAVASCRIPT对象，如临时变量、字符串等
- 老生代 则为经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

**垃圾回收算法**
- `Scavange`算法：通过复制的方式进行内存空间管理，主要用于新生代的内存空间；
- `Mark-Sweep`算法和`Mark-Compact`算法：通过标记来对堆内存进行整理和回收，主要用于老生代对象的检查和回收。

**回收对象**
- 当函数执行完毕时，在函数内部所声明的对象不一定就会被销毁。
- 为了保证垃圾回收的行为不影响程序逻辑的运行，`JAVASCRIPT`引擎不会把正在使用的对象进行回收。所以判断对象是否正在使用中的标准，就是是否仍然存在对该对象的 **引用**
- 引用(Reference)是JAVASCRIPT编程中十分重要的一个机制。是指代码对对象的访问这一抽象关系
- JAVASCRIPT的引用是可以进行转移的，那么就有可能出现某些引用被带到了全局作用域，但事实上在业务逻辑里已经不需要对其进行访问了，这个时候就应该被回收，但是JAVASCRIPT引擎仍会认为程序仍然需要它。

```javascript
// 当代码执行完毕时，对象val和bar()并没有被回收释放，
// JAVASCRIPT代码中，每个变量作为单独一行而不做任何操作，
// JAVASCRIPT引擎都会认为这是对对象的访问行为，存在了对对象的引用
var val = 'hello world';
function foo() {
  return function() {
    return val;
  };
}
global.bar = foo();
```

#### 内存泄露及处理
**给DOM对象添加的属性是一个对象的引用。**
```javascript
var MyObject = {};
document.getElementByIdx_x('myDiv').myProp = MyObject;
```
解决方法：在`window.onunload`事件中写上:
```javascript
document.getElementByIdx_x('myDiv').myProp = null;
```
**DOM对象与JS对象相互引用。**
```javascript
function Encapsulator(element) {
   this.elementReference = element;
   element.myProp = this;
}
new Encapsulator(document.getElementByIdx_x('myDiv'));
```
解决方法：在`window.onunload`事件中写上:
```javascript
document.getElementByIdx_x('myDiv').myProp = null;
```
**给DOM对象用`attachEvent`绑定事件。**
```javascript
function doClick() {}
element.attachEvent("onclick", doClick);
```
解决方法：在onunload事件中写上:
```javascript
element.detachEvent('onclick', doClick);
```
**从外到内执行`appendChild`。这时即使调用`removeChild`也无法释放。**
```javascript
var parentDiv = document.createElement_x("div");
var childDiv = document.createElement_x("div");
document.body.appendChild(parentDiv);
parentDiv.appendChild(childDiv);
```
解决方法：**从内到外执行appendChild**:
```javascript
var parentDiv =   document.createElement_x("div");
var childDiv = document.createElement_x("div");
parentDiv.appendChild(childDiv);
document.body.appendChild(parentDiv);
```
**反复重写同一个属性会造成内存大量占用(但关闭IE后内存会被释放)。**
```javascript
for(i = 0; i < 5000; i++) {
  hostElement.text = "asdfasdfasdf";
}
// 这种方式相当于定义了5000个属性
```
解决方法：无, 避免这样书写代码。
**IE下`闭包`会引起跨页面内存泄露。**

**内存不是缓存**
- 不要轻易将内存当作缓存使用。
- 如果是很重要的资源，请不要直接放在内存中，或者制定过期机制，自动销毁过期缓存。

**CollectGarbage**。
CollectGarbage是IE的一个特有属性,用于释放内存的使用方法,将该变量或引用对象设置为null或delete然后在进行释放动作，
在做CollectGarbage前,要必需清楚的两个必备条件:（引用）。
- 一个对象在其生存的上下文环境之外，即会失效。
- 一个全局的对象在没有被执用(引用)的情况下，即会失效


### 服务端优化
- 避免`404`
- 删除重复的`JavaScript`和`CSS`
  - 重复调用会增加额外的`HTTP`请求
  - 多次运算也会浪费时间(`IE` `Firefox`中不管脚本是否可缓存, 都存在重复运算的问题)
- `ETags`配置`Entity`标签, 可以有效减少Web应用负载
- 权衡DNS查找次数
  - 减少主机名可以节省响应时间。但同时也会减少页面中并行下载的数量(IE浏览器在同一时刻只能从同一域名下载两个文件)
- 通过`Keep-alive`机制减少TCP连接。
- 通过CDN减少延时。
- 平行处理请求（参考`BigPipe`）。
- 通过合并文件或者`Image Sprites`减少HTTP请求。
- 减少重定向（ HTTP 301和40x/50x）

---

### [FastJS](https://github.com/alsotang/fast-js) 书写最快的`JavaScript`

#### try_catch
`try_catch捕获错误代码块会造成性能损失`
- without try_catch
- ~~with try_catch~~

#### regex_method
`正则表达式匹配最快方法`
- String.match
- Regex.exec
- String.search
- ~~test~~

#### random_int
`获取随机整数`
- Math.random % range `~~(Math.random() * 1000)`
- ~~lodash.random~~

#### is_object_empty
`判断对象是否为空`
- Array.length === 0 
- ~~lodash.isEmpty(arr)~~
- ~~Object.keys().length === 0~~
- ~~lodash.isEmpty(obj)~~

#### sample_from_array
`从数组中抽样`
- Math.random % arr.length
- ~~lodash.sample~~

#### uniq_str_array
`数组去重`
- lodash.uniq 
```js
var _map = Object.create(null);
    for (var i = 0; i < arr.length; i++) {
      _map[arr[i]] = true;
    }
    var newArr = Object.keys(_map);
```
- ~~obj[key] = true~~

#### arguments_to_array
`默认参数(类数组)转换成数组`
- lodash.toArray
- Array.from(arguments) // ES6
- ~~Array.prototype.slice.call~~
- ~~[].slice.apply~~
- ~~[].slice.call~~
- ~~Array.prototype.slice.apply~~

#### clone_object
`克隆对象`
- lodash.clone (this is a shadow clone)
- ~~JSON.parse(JSON.stringify)~~
- ~~lodash.cloneDeep~~

#### for_loop
`for循环`
- normal for loop. i < array.length
- normal for loop. cache arr.length
- ~~lodash.forEach~~
- ~~native forEach~~

#### hidden_class
`函数中初始化对象后函数速度更快`
- withHiddenClass

```js
function withHiddenClass() {
  this._timeout = 0;
  this._url = '';
  this._type = '';
}
withHiddenClass.prototype.timeout = timeout;
withHiddenClass.prototype.url = url;
withHiddenClass.prototype.type = type;

function timeout(timeout) {
  this._timeout = timeout;
}

function url(url) {
  this._url = url;
}

function type(type) {
  this._type = type;
}
```
- ~~withoutHiddenClass~~

```js
function withoutHiddenClass() {
}
withoutHiddenClass.prototype.timeout = timeout;
withoutHiddenClass.prototype.url = url;
withoutHiddenClass.prototype.type = type;

function timeout(timeout) {
  this._timeout = timeout;
}

function url(url) {
  this._url = url;
}

function type(type) {
  this._type = type;
}
```

#### inner_function
`减少函数嵌套,函数嵌套拆分成多函数速度更快`
- outter
- ~~inner~~

#### iterate_object
`迭代对象`
- for … in
- ~~lodash.forEach~~
- ~~Object.keys~~

#### map_loop
`数组内部进行遍历求值,先构造好数组后,再把值传进去,速度比较快`
- new Array(arr.length)
- ~~normal loop. use index~~
- ~~normal loop. use push~~
- ~~lodash.forEach~~
- ~~native map~~

#### new_array
`构造新数组,采用字面量形式更快`
- []
- ~~new Array()~~

#### next_tick
`下一步操作`
- process.nextTick
- ~~setTimeout(0)~~
- ~~setImmediate~~

#### start_with
`检测字符串是否以特定字符开头`
- lodash.startsWith
- ~~indexOf === 0~~
- ~~regex /^ab/~~

#### str_concat
`字符串连接`
- +
- ~~+=~~
- ~~str.concat~~
- ~~arr.join("")~~

#### str_to_int_number
`字符串转换成整数`
- parseInt(str,10)  
- ~~Number(str)~~
- ~~parseInt(str)~~
- ~~\~\~str~~
- ~~+str~~

---

### 参考
- [前端性能优化指南](https://github.com/kahn1990/web_performance_optimization)
- [前端开发规范](http://zhibimo.com/read/Ashu/front-end-style-guide)
- [FastJS](https://github.com/alsotang/fast-js)
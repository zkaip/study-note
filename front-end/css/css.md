CSS 基础
===
```html
<p style="color:red;background-color:gray;"></p> 
<style>
*{ margin: 0px; padding: 0px; }代表所有元素的属性初始化
</style>
<link href="CSSurl路径" rel="stylesheet" type="text/css" />
```
**CSS常用属性**
- color 
- background-color 
- font-family 
- font-size 
- width 
- height 
- top 
- left 
- position: absolute/relative 
- magine/bordr/padding 
- display:block/inline/none

### 概述   级联（层叠）样式表
1、CSS的作用：标准的统一的方式为页面定义外观，可以实现页面数据和表现的分离. 

2、CSS 的用法
用法一（内联方式）：将 CSS 定义，写在元素的 style 属性里
 -----写在元素的内部，仅供当前元素用
   <元素 style="color:red;" />
 -----不能重用，不好维护
 
用法二（内部样式表）：将 CSS 定义写在页面的 head 里的 style 里
 -----当前页面的所有元素重用
   <style>
    CSS选择器{
     color:red;
    }
   </style>
 -----提高了重用性和可维护性
 
用法三（外部样式表）：将CSS单独定义在一个后缀为.css 的文件中，在 html 页面的 head 里，用 link引入
 -----被多个页面重用
 -----大大提高了重用性和可维护性，实现了页面数据和表现的分离
-------优先推荐使用

3、CSS的语法
 样式属性的名称：值；
 style="color:red;"
 
 内部样式表或者外部样式表
  选择器{color:red;}
 
4、特征
 级联（层叠）样式表
 父元素的样式，大部分可以被子元素继承
 可以使用多种方式为元素定义样式
  样式不重复，取并集
  样式重复定义：依靠优先级
 
5、CSS 的优先级
 就近优先：内联>内部样式表 或者 外部样式表
 级别相同的情况下：以最后一次定义的为准
 
### 选择器 
1、选择器：谁使用样式声明

2、元素选择器：以 html 中的元素的名称作为选择器的名称
 h2{} p{} div{}
-----某种元素统一使用

3、类选择器：自定义样式类，html中的元素使用 class 属性引用
 .name{ }-------CSS
 <元素 class="name" />------html
 ------谁用都可以
 
元素名称.类名 {}：特定的元素，且 class="" 的用----分类细分
 input.txt {}
 input.btn {}'
 
 -----同一种元素下的细分
 
<input type="text" value="mary" />
<input type="button" value="普通按钮" />

多类选择器.p1.p2{}
<div class="p1 p2"></div>

4、id 选择器：使用 元素 id 属性的值作为选择器
 -----页面的大的布局，特定功能的元素
css 代码中：
 #info { ... }

html代码中：
  <div id="info">提示信息。</div>

ID只能在文档中使用一次，而类选择器可以使用多次
ID选择器不能多个ID结合使用，而类选择器可以
当使用js时候，需要用到id
 
5、选择器分组：把多个选择器用逗号连接，统一定义
 css 代码中：
   p,h1,input.txt { 字体大小 }
 -----
 P{颜色}
 h1{背景色}
 input.txt {边框}
 
6、派生选择器：根据元素的层次关系---常用于选择某个特定范围里
 css 代码中：
   div input { ... } //后代选择器，下面所有层的元素（后代没有单独定义样式的会被这个样式覆盖）
 html 中：
   <div>
    <input />
   </div>

  *[属性] //属性选择器 选择所有具有该属性的选择器
      [属性=""] 选择属性=属性值的元素
      [属性~=""]选择属性~=属性值的元素（模糊查询）

  div > em //子元素选择器,选择该元素下面一层的子元素
 标签 + 标签 //选择相邻兄弟的选择器把该元素相邻元素（向下）选择
     
7、伪类选择器：元素在不同状态下  链接 
  :hover 鼠标悬停 链接
  :focus 获得焦点 
  :link 普通的未被访问的链接
  :active 激活的，链接被点击 
  :visited  ---已访问的链接元素 
常见的链接样式 text-decoration:none 去掉链接中的下划线
                        background-color

 CSS 代码：
   p:hover { 。。。 }  鼠标悬停
   
### 度量单位
1、尺寸
绝对单位：cm、pt（磅）
相对单位：px（像素）、20%
2、颜色
  单词
  color = "#ffffff"
  color="#fff"
 
### 尺寸、边框、间距
1、尺寸：
  width
  height
  line-height    设置行高
  max-height    元素最大高度
  max-width    元素最大宽度
  min-width    元素最小宽度
  min-height    元素最大宽度
  overflow：内容超出预先的尺寸
    visible（可见）
    hidden(隐藏)
    scroll（总是显示滚动条）
    auto（自动）
   
2、边框
   简写方式： border:1px solid red;
     border-width:1px; 
     border-style:solid;
     border-color:red;
   单边定义：
     border-left:1px solid red;
     border-right:2px solid green;
     
     border-left-width:
     border-left-style:
     
3、盒子模型（box model）：定义了元素内容、边框、内边距、外边距的方式
   margin：外边距（4个边）会叠加合并
                margin-top/left/right/bottom:;
   padding：内边距(4个边)
        padding-top/left/right/bottom:;
   border:边框
      border-style：定义了10个不同的非继承样式，包括none
      边框单边样式：border-top/left/right/bottom-style
      border-width
      border-color
元素所占用的面积：受内容、边框、边距的影响
       CSS3
      border-radius圆角边框
      box-shadow:边框阴影
             box-shadow: 0 1px 1px rgba(0,0,0,0.2);
      border-image:边框图片
  简写方式：
  margin:10px 20px 30px 40px;
     top right bottom left
     
  margin:10px 20px 10px 20px;
  等同于
  margin:10px 20px;
     top/bottom left/right         
  重要：
    margin:0px auto;----水平方向上，居中显示
   
### 背景
1、background-color：颜色；---纯色

2、background-image：url("imags/a.jpg");  ---背景图片

3、background-repeat: repeat/no-repeat/repeat-x/repeat-y; ----背景平铺的
 ----渐变色的效果
 
4、background-position:x y;
     background-position:right top; 
          10px/20%/center
 ----修改背景图片的位置
 
5、background-attachment:scroll/fixed;
 ----背景图片的附着（固定）方式
 设置为 fixed，图片固定---水印的效果
 
6、CSS3背景
  background-size:规定背景图片的尺寸
  background-origin:规定背景图片的定位区域
  background-clip:规定背景的绘制区域

### 文本样式 字体
1、color
2、font-size 设置字体尺寸
3、text-align：文本水平方向的对齐 left/center/right
  ----针对有空间的元素，比如块级元素
4、font-family：设置字体，字形
  ----取值可以设置多个，设置备用的字体(类似)
    value1,value2,value3;
5、font-weight：normal/bold；设置加粗显示
6、text-decoration:none/underline;设置是否有下划线
7、line-height:;设置行高----常用于设置文本在垂直方向的居中
8、text-indent: ;设置文本的首行缩进
9、direction:文本方向
10、letter-spacing:字符间距
11、text-transform:元素中的字母
12、unicode-bidi:设置文本方向
13、white-space:元素中空白的处理方式
14、word-spacing字间距
15、font-style:设置字体风格
16、font-variant：以小型大写字体或正常字体显示文本
  
**CSS3**
1、text-shadow：文本添加阴影（可以设置浮雕效果）
2、word-wrap:规定文本的换行规则（需要设定元素width）normal自动换行
3、CSS3改进了字体引用，可以引用url字体
  @font-face{
      font-family: myfont;
      src:url();
  }
  div{
      font-family:myfont;
  }


### 表格-----表格所特有的样式
表格边框 border、折叠边框border-collapse:collapse
表格宽高 width height
表格文本对齐 text-align:right
表格内边距 padding
表格颜色
1、border-collapse:separate/collapse;---设置单元格的边框合并
2、vertical-align:top/middle/bottom;---适用 td

### 浮动（+列表 可做瀑布流效果）
1、块级元素希望在同一行上显示：使用表格、浮动
2、定位
默认规则：流模式（从上向下、从左向右、不会发生重叠）
  使用浮动修改定位：元素将脱离原有的页面，浮动起来
     停靠在左侧或者右侧，原有的位置会被填充
 float: none/left/right/inherit 从父级继承浮动属性;
   ----将多个块级元素在同一行上显示
     将某个元素单独做定位
 clear：none/left/right/both/inherit;     
3、实现复杂的定位：其它属性

### 显示
1、每个元素都有默认的显示效果（行内、块级元素）
 可以使用 display 属性修改原有的效果
2、display:block(块级)/inline(行内)/none(不显示);
block、inline:实现块级元素和行内元素之间的转换
none：常和 js 代码结合使用，实现动态效果（出现、消失）

### 列表的样式：特有
1、列表项的标识符号
  list-style-type:none/disc/circle/....；
   ----最常用的是 none
2、使用图片作为标识
  list-style-image:url();
3、list-style: 简写列表项
4、list-style-position: 列表标志位置 inside/outside
 
### 定位
1、流模式
2、依靠定位属性修改方式：浮动、相对定位
  position:static/relative/absolute/fixed;
  偏移属性：
3、相对定位：相对于原有的位置偏移，原有的空间依然保留
   position:relative;
   top/left/right/bottom:;
   z-index：；---设置堆叠顺序（层的顺序）       
4、绝对定位：原有的空间不再保留，相对于已定位的最近的祖先元素偏移
   如果没有，则相对于 body       
5、固定定位
常用属性：
position    把元素放在一个静态的、相对的、绝对的或固定的位置 
          static 偏移量没有效果的相对布局/
          relative 在页面中占据位置/
          absolute 浮动到页面上/
          fixed 在页面固定位置
top    元素向上的偏移量
left    元素向下的偏移量
right    元素向右的偏移量
bottom    元素向下的偏移量
overflow    设置元素溢出其区域发生的事情（可设置滚动条或者不滚动）
clip    设置元素显示的形状（主要用于图片）
vertical-align    设置元素垂直对齐方式
z-index    设置元素的堆叠顺序

### 光标
cursor: default/pointer/wait/help/.../url() ;

### 轮廓
主要是用来突出元素
outline:设置轮廓属性
outline-color:设置轮廓颜色
outline-style:设置轮廓样式
outline-width:设置轮廓宽度
CSS Common 常用的CSS特效
===
## CSS 特效
### 对齐
margin   水平对齐(居中)
    margin:0px auto;
    -->> margin-left: auto; margin-right: auto;
position 左右对齐（左对齐，右对齐）
    position: absolute;
    left/right: 0px
float   左右对齐（左对齐，右对齐）
    float:    left/right
### 分类
clear        设置一个元素的侧面是否允许其他的浮动元素
cursor        规定当指向某元素之上时显示的指针类型
display        设置是否及如何显示元素 (in-line 导航栏常用)
float          定义元素在哪个方向浮动
position        把元素放置到一个静态的、相对的、绝对的、固定的位置
visibility        设置元素是否可见 (hiden/visible)
### 导航栏
**垂直导航栏** 
```css
ul{
    list-style-type: none;
    margin:    0px;
    padding:    0px;
}
a:link, a:visited{
    text-decoration: none;
    display:    block;
    background-color:    black;
    color:    white;
    width:    50px;
    text-align:    center;
}
a:active,a:hover{
    background-color:    blue;
}
```
**水平导航栏**
```css
ul{
    list-style-type: none;
    margin:    0px;
    padding:    0px;
    width:    250px;
    text-align:    center;
    background-color:    black;
}
a:link, a:visited{
    text-decoration: none;
    font-weight:    bold;
    background-color:    black;
    color:    white;
    width:    50px;
    text-align:    center;
}
a:active,a:hover{
    background-color:    blue;
}
li{
    display:    inline;
    padding:   3px 5px;
}
```
### 图片
```css
container{
    margin:    10px auto;
    width:    70%;
    height:    auto;
}
.image{
    border:    1px    solid    darkgray;
    width:    auto;
    height:    left;
    float:    left; //把边框套到图片上
    text-align:    center;
    margin:    5px;
}
img{
    margin:    5px;    
    opacity:    0.8;//透明度 0~1
}
.text{
    font-size:    12px;
    margin-bottom:5px  
}
a:hover{
    background-color:    yellow;
}
<div class="image">
    <a href="#" target="_self">
        <img src="1.jpg" alt="风景" width="200px" height="200px">
    </a>
    <div class="text">8月份的维多利亚在</div>
</div>
```
## CSS动画—页面特效
### 2D 3D转换（CSS3）
**CSS3可以对元素移动、缩放、转动、拉长或拉伸**
- 2D转换方法：
  - translate() //移动
  - rotate() //旋转
  - scale()  //缩放
  - skew()    //倾斜
  - matrix()    //矩阵
- 3D转换方法：
  - rotateX(180deg)
  - rotateY(120deg)

```css
div{
    width:    100px;
    height:    100px;
    background-color:    blue;
}
.div2{
    transform:translate(200px,100px); /*坐标X移动200px，坐标Y移动100px*/
    -webkit-transform:translate(200px,100px); /*safari chrome*/
    -ms-transform:translate(200px,100px); /*IE*/
    -o-transform:translate(200px,100px); /*opera*/
    -moz-transform:translate(200px,100px); /*firefox*/
}
.div2{
    transform:scale(1,2); /*宽度缩放1倍，高度缩放2倍*/
    -webkit-transform:scale(1,2); /*safari chrome*/
    -ms-transform:scale(1,2); /*IE*/
    -o-transform:scale(1,2); /*opera*/
    -moz-transform:scale(1,2); /*firefox*/
}
.div2{
    transform:rotate(180deg); /*旋转180度*/
    -webkit-transform:rotate(120deg); /*safari chrome*/
    -ms-transform:rotate(110deg); /*IE*/
    -o-transform:rotate(80deg); /*opera*/
    -moz-transform:rotate(180deg); /*firefox*/
}
.div2{
    transform:skew(20deg,50deg); /*围绕X轴倾斜20度，围绕Y轴倾斜50度*/
    -webkit-transform:skew(20deg,50deg); /*safari chrome*/
    -ms-transform:skew(20deg,50deg); /*IE*/
    -o-transform:skew(20deg,50deg); /*opera*/
    -moz-transform:skew(20deg,50deg); /*firefox*/
}
```

### CSS3 过渡(过渡效果+过渡时间)
- transition    设置四个过渡属性
  - transition-property    过渡的名称
  - transition-duration    过渡效果花费的时间
  - transition-timing-function    过渡效果的时间曲线
  - transition-delay        过渡效果（延时）开始时间

```css
div{
    width:    100px;
    height:    100px;
    background-color:    blue;
    -webkit-transition:    width 2s, height 2s, -webkit-transform 2s; /*宽度变换时间2s，高度变换时间2s，动画效果变换时间2s*/
    -webkit-transition-delay:    2s;
    transition-delay:    2s;
}
div:hover{
    width:    200px;
    height:    200px;
    transform:    rotate(360deg);
    -webkit-transform:    rotate(360deg);
}
```
### CSS3 动画（@keyframes 动画时长+动画名称）
```css
div{
    width:    100px;
    height:    100px;
    background-color:    red;
    position:    relative;
    animation:    anim    5s; /*设置动画时间*/
    -webkit-animation:    anim    5s; /*设置浏览器适配*/
}
@keyframes anim{
    0%{background-color:red;    left:0px;    top:0px;}
    25%{background-color:blue;    left:200px;    top:0px;}
    50%{background-color:#ccffcc;    left:200px;    top:200px;}
    75%{background-color:#00ffff;    left:0px;    top:200px;}
    100%{background-color:red;    left:0px;    top:0px;}
}
@-webkit-keyframes anim{
    0%{background-color:red;    left:0px;    top:0px;}
    25%{background-color:blue;    left:200px;    top:0px;}
    50%{background-color:#ccffcc;    left:200px;    top:200px;}
    75%{background-color:#00ffff;    left:0px;    top:200px;}
    100%{background-color:red;    left:0px;    top:0px;}
}
```
### CSS3多列
```css
创建多列对文本或区域进行布局
column-count    分列的数量
column-gap       每列之间的距离
column-rule         每列之间的线及颜色
.div{
    column-count:    3;
    -webkit-column-count:    3;
    column-gap:    40px;
    -webkit-column-gap:    40px;
    column-rule     5px outset #ff000;
    -webkit-column-rule     5px outset #ff000;
}
```
### 瀑布流
```css
.container{
    column-width: 250px;
    -webkit-column-width: 250px;
    column-gap: 5px;
    -webkit-column-gap: 5px;
}
.container div{
    width:    250px;
    margin:    5px 0;
}
.container p{
    text-align:    center;
}
```
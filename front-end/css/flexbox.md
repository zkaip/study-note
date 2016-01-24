Flexbox 弹性盒模型
===
FlexBox（CSS Flexible Box Layout Module）是css3新添加一个用于页面布局的全新CSS3模块功能。它可以把列表放在同一个方向（从左到右或从上到下排列），并且让这些列表能延伸到占用可用的空间。

![Flex盒模型](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

- 新版本语法：
  - display: flex;
  - display: inline-flex;
  - flex-direction:column;
  - justify-content:space-between;
  - align-items:flex-start；
- 旧版本语法：
  - display: -webkit-box;
  - -webkit-box-orient: vertical;
  - -webkit-box-pack: justify;

![新版本语法](http://segmentfault.com/img/bVre4f)
![新版本语法](http://segmentfault.com/img/bVre4g)

### Flex 语法
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- 容器的属性
  - flex-direction
  - flex-wrap
  - flex-flow
  - justify-content
  - align-items
  - align-content
- 项目的属性
  - order
  - flex-grow
  - flex-shrink
  - flex-basis
  - flex
  - align-self

### Flex 案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Centering an Element on the Page</title>
  <style type="text/css">
      html {
  height: 100%;
} 

body {
  display: -webkit-box;  /* 老版本语法: Safari,  iOS, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox (buggy) */ 
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */

  /*垂直居中*/  
  /*老版本语法*/
  -webkit-box-align: center; 
  -moz-box-align: center;
  /*混合版本语法*/
  -ms-flex-align: center; 
  /*新版本语法*/
  -webkit-align-items: center;
  align-items: center;

  /*水平居中*/
  /*老版本语法*/
  -webkit-box-pack: center; 
  -moz-box-pack: center; 
  /*混合版本语法*/
  -ms-flex-pack: center; 
  /*新版本语法*/
  -webkit-justify-content: center;
  justify-content: center;

  margin: 0;
  height: 100%;
  width: 100% /* needed for Firefox */
} 
/*实现文本垂直居中*/
h1 {
  display: -webkit-box; 
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-box-align: center; 
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 10rem;
}   

  </style>
</head>
<body>
  <h1>OMG, I’m centered</h1>
</body>
</html> 
```

反向分布
```html
<head>
<style>
  body {
    display: -webkit-flex;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    color: white;
  }
  #box1,#box2,#box3 {
    width: 100px;
    height: 80px;
  }
  #box1 {
    background-color: red;
  }
  #box2 {
    background-color: green;
  }
  #box3 {
    background-color: blue;
  }
</style>
</head>
<body>
  <div id="box1">1</div>
  <div id="box2">2</div>
  <div id="box3">3</div>
</body>
```

**典型布局**
- 骰子布局
- 网格布局
- 百分比布局
- 圣杯布局
- 输入框布局
- 悬挂式布局
- 固定的底栏

### 参考
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [详解css3弹性盒模型（Flexbox）](http://segmentfault.com/a/1190000000707526)
- [CSS3 Flexbox在移动端的应用](http://segmentfault.com/a/1190000004070556)
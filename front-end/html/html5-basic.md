HTML5 技术组成
===

### 离线功能
HTML5透过JavaScript提供了数种不同的离线储存功能，相对于传统的Cookie而言有更好的弹性以及架构，并且可以储存更多的内容。

localStorage 没有时间限制的数据存储
sessionStorage 针对一个session的数据存储（用户关闭浏览器，数据被删除）
Web SQL Database – 本地端的SQL资料库
Indexed DB – Key-value的本地资料库
Application Cache – 将部分常用的网页内容cache起来

**localStorage样例**
```javascript
<textarea id="ta" width="200px" height="200px" ></textarea>
<button id="btn" >save</button>
<script>
        var ta,btn;
        window.onload=function(){
          ta=document.getElementById("ta");
if(localStorage.text){
ta.value=localStorage.text;
}
          btn=document.getElementById("btn");
btn.onclick=function(){
localStorage=ta.value;
}
        }
</script>
```
**sessionStorage样例**
```javascript
<span id="txt">0<span><button id="addbtn" >Add</button>
<script>
var num;
var txt, btn;
window.onload=function(){
        txt=document.getElementById("txt");
        btn=document.getElementById("addbtn");
        if(sessionStorage.num){
                num=sessionStorage.num;
                txt.innerHtml=num;    
        }else{
                num=0;
       }
        btn.onclick=function(){
                num++;
                sessionStorage.num=num;
                showNum();
        }
}
function showNum(){
        txt.innerHtml=num;        
}
</script>
```
### 即时通讯
以往网站由于HTTP协定以及浏览器的设计，即时的互动性相当的受限，只能使用一些技巧来「模拟」即时的通讯效果，但HTML5提供了完善的即时通讯支援。

WebSocket – 即时的socket连线
Web Workers – 以往JavaScript都是single thread，透过Worker可以有多个运算
Notifications – 塬生的提示讯息，类似像OS X的Growl提示


**WebWorker**：
**方法**：
postMessage() - 它用于向HTML页面 传回一段消息
terminate() - 终止 web worker，并释放浏览器/计算机资源
**事件**：onmessage
样例：
```javascript
<script src="index.js"></script>
<div id="numDiv"></div>
<button id="start">start</button>
<button id="stop">stop</button>

index.js
var numDiv,worker=null;
window.onload=function(){
        numDiv=document.getElementById("numDiv");
        document.getElementById("strart").onclick=startWorker;
        document.getElementById("stop").onclick=stopWorker;
}
function startWorker(){
        if(worker){
                return;
        }
        work=new Worker("count.js");
        work.onmessage=function(e){
        numDiv.innerHTML=e.data;
}
function stopWorker(){
       if(worker){
              worker.terminate();
              worker=null;//重新初始化
       }
}

count.js
var countNum=0;
function count(){
        postmessage(countNum);
        countNum++;
        setTimeout(count,1000);
}
count();
```

**服务器推送事件（Server-sent Events）**
服务器代码头：header("Content-Type:text/event-stream")
EventSource事件：
- addEventListener  监听事件
- onopen  服务器的链接被打开
- onmessage  接收消息
- onerror  错误发生
样例：
```javascript
Server: index.php(http://developer.mozilla.org EventSource)
<?php
header("Content-Type:text/event-stream");
for($i=0;i<100;i++){
          date_default_timezone_set("Asia/Shanghai")
          echo 'event:newDate\n'
echo 'data:'.date('Y-m-d H-i-s');
echo "\n\n"
flush();
sleep(1);
}

Client:
index.html
<script src="index.js"></script>
<h1>Status:</h1>
<div id="statusDiv"></div>
<h1>Server Data</h1>
<div id="serverData"></div>

index.js
var serverData;
var SERVER_URL="index.php";
window.onload=function(){
        serverData=document.getElementById("serverData");
        statusDiv=document.getElementById("statusDiv");
        startListenServer();
}
function startListenServer(){
        statusDiv.innerHTML="start Connect Server..."
        var es=new EventSource(SERVER_URL);
        es.addEventListener("newDate",newDateHandler);
        es.onopen=openHandler;
        es.onerror=errorHandler;
        es.onmessage=messageHandler;
}
function openHandler(e){
        status.innerHTML="Server open";
}
function errorHandler(e){
        status.innerHTML="Error";
}
function messageHandler(e){
        status.innerHTML=e.data;
}
function newDateHandler(e){
        status.innerHTML=e.data;
}
```
### 文件以及硬件支持
Drag’n Drop – HTML元素的拖拉
File API – 读取使用者本机电脑的内容
Geolocation – 地理定位
Device orientation – 手持装置的方向
Speech input – 语音输入

**drag/drop**
- 拖动开始： ondragstart调用了一个函数，drag(event)规定了被拖动的数据
- 设置拖动数据 setData():设置被拖数据的数据类型和值
- 放入位置 ondragover：事件规定在何处放置被拖动的数据
- 放置 ondrop：当放置被拖数据时，会发生drop事件

**页面图片拖放**
```javascript
var box1Div,box2Div,msgDiv,img1;
window.onload=function(){
box1Div=document.getElementById("box1");
box2Div=document.getElementById("box2");
msgDiv=document.getElementById("msg");
img1=document.getElementById("img1");
}
box1Div.ondragover=function(e){
e.preventDefault();
}
box2Div.ondragover=function(e){
e.preventDefault();
}
img1.ondragstart=function(e){
//e.preventDefault();
e.dataTransfer.setData("imgId","img1");
}
box1Div.ondrop=dropImgHandler;
box2Div.ondrop=dropImgHandler;
function dropImgHandler(e){
showObj(e.dataTransfer);
e.preventDefault();
//创建节点
var img=document.getElementById(e.dataTransfer.getData("imgId"));
e.target.appendChild(img);
}
/*展示obj里面所有属性及信息*/
function show(obj){
var s="";
for(var k in obj){
s+=k+":"+obj[k]+"<br/>";
}
msgDiv.innerHTML=s;
}
-----------------
.box{
width: 400px;
height: 400px;
}
#box1{ 
float: left;
background-color: aqua;
}
#box2{
float: left;
background-color: #cccccc;
}
----------------
<div id="box1" class="box"></div>
<div id="box2" class="box"></div>
<img id="img1" src="1.jpg" />
<div id="msg"></div>
```

**Manifest文件(*.appcache)**
- CACHE MANIFEST - 在此标题下列出的文件将在首次下载后缓存
- NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
- FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（如：404页面）
样例
```javascript
client: index.html
<html manifest="index.appcache"
<link href="style.css" rel="stylesheet" type="text/css">

<h1 class="h1">Hello HTML5</h1>
style.css
.h1{
        background-color: blue;
}
index.appcache
          CACHE MANIFEST

CACHE:
style.css
index.js

NETWORK:
style.css

FALLBACK:
404.html
```
**拖放本地资源**
```javascript
var imgContainer,msgDiv;
window.onload=function(){
imgContainer=document.getElementById("imgContainer");
msgDiv=document.getElementById("msg");
}
imgContainer.ondragover=function(e){
e.preventDefault();
}
imgContainer.ondrop=dropImgHandler;
function dropImgHandler(e){
e.preventDefault();
//创建文件
var f=e.dataTransfer.files[0];
var fileReader = new FileReader();
fileReader.onload=function(e){
//showObj(e.target);
imgContainer.innerHTML="<img src=\""+fileReader.result+"\">"
}
fileReader.readAsDataURL(f);
}
/*展示obj里面所有属性及信息*/
function show(obj){
var s="";
for(var k in obj){
s+=k+":"+obj[k]+"<br/>";
}
msgDiv.innerHTML=s;
}
-----------------
#imgContainer{
width: 500px;
height: 500px;
background-color: #cccccc;
}
----------------
<div id="imgContainer"></div>
<div id="msg"></div>
```

### 语意化
语意化的网路是可以让电脑能够更加理解网页的内容，对于像是搜寻引擎的优化（SEO）或是推荐系统可以有很大的帮助。

New tags – 新的标籤，像是<header>、<section>等
Application tags – 也是新的标籤，像是<meter>、<progress>等
Microdata – 加入语意的资料让搜寻引擎等网站可以正确显示
Form type – <form>可以加入的type便多了，包含email和tel等属性，浏览器会协助进行资料格式的验证

### 多媒体
Audio、Video的标签支援以及Canvas的功能应该是大家对于HTML5最熟悉的部份了，也是许多人认为Flash会被取代的主要原因。

Audio video – 影片和音乐的塬生播放支援
Canvas – 2D的绘图功能支援
Canvas 3D – 3D的绘图功能支援
SVG – 向量图支援

**音频播放**：control控制器，提供播放暂停和音量控件
```
<audio>    定义声音
<source>    规定多媒体资源，可以是多个
<audio src="1.mp3" controls="controls">您的浏览器不支持音频播放</audio>
<button onclick="clickA()">播放/暂停</button>
<script>
    var a=document.getElementById("audio");
    function clickA(){
        if(a.paused){a.play();}else{a.pause();}
    }
<script>
```
**编解码工具**
FFmpeg  http://www.ffmpeg.org (转码)
```
./ffmpeg
.../ffmpeg -i 3.mp4 -acodec libvorbis 3.ogg
```
**视频播放** control控制器，提供播放暂停和音量控件
```
            <video>    定义视频
            <source>    规定多媒体资源，可以是多个
            属性：width    height
<video controls="controls">
       <source src="1.mp4" />
       <source src="1.ogg" />
您的浏览器不支持视频播放</video>
<button onclick="clickA()">播放/暂停</button>
<button onclick="clickBig()">放大</button>
<button onclick="clickSmall()">缩小</button>
<script>
    var a=document.getElementById("audio");
    function clickA(){
        if(a.paused){a.play();}else{a.pause();}
    }
    function clickBig(){
        a.width=800px; a.height=800px;
    }
    function clickSmall(){
        a.width=300px; a.height=300px;
    }
<script>
```


**Canvas标签**：
HTML5`<canvas>`元素用于图形的绘制，通过脚本（通常是javascript）来完成
`<canvas>`标签只是图形容器，必须使用脚本来绘制图形
可以通过多种方法使用Canvas绘制路径、盒、圆、字符以及添加图像
```javascript
// 创建Canvas标签
// 绘制图形 http://developer.mozilla.org
// 绘制图片
var CANVAS_WIDTH=500;
var CANVAS_HEIGHT=500;
var mycanvas,context;
window.onload=function(){
      createCanvas();
      drawRect();
      drawImage()
      }
      function createCanvas(){
            document.body.innerHTML="<canvas id=\"mycanvas\" width=\""+CANVAS_WIDTH+"\" height=\""+CANVAS_HEIGHT+" />";
            mycanvas=document.getElementById("mycanvas");
            context=mycanvas.getContext("2d");
     }
     //绘制图形
     function drawRect(){
context.fillStyle="#FF0000";
context.rotate(45);//旋转45度
context.translate(200,200);//移动200x,200y
context.scale(2,0.5);//缩放2x,0.5y
context.fillRect(0,0,200,200);//绘制200*200矩形
     }
     //绘制图片
     function drawImage(){
var img=new Image();
img.onload=function(){
context.drawImage(img,0,0);//绘制图像(图像对象，x位置，y位置)
}
img.src ="1.jpg"
     }
```

**Canvas应用**
利用CreateJS http://createjs.com/ )
- EASELJS处理HTML5Canvas
- TWEENJS调整Html5动画和JS属性
- SOUNDJS处理音频相关API
- PRELOADJS处理js协调和加载的类库

```javascript
//Canvas简单创建文字效果
<script src="easeljs-0.7.1.min.js"></script>
<canvas id="canvas" width="500px" height="500px">
<script>
var canvas, stage,txt;
var count=0;
window.onload=function(){
    canvas=document.getElementById("canvas");
//创建舞台
    stage=new createjs.Stage(canvas);
//创建文字
    txt=new createjs.Text("number->","20px Arial","#ff7700");
    stage.addChild(txt);
//设置监听
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick",tick);//事件对象，舞台
}
function tick(e){
    count++;
    txt.text="number->"+count+"!";
    stage.update();//更新舞台
}
</script>
//Canvas烟花效果
<script src="easeljs-0.7.1.min.js"></script>
<canvas id="canvas" width="1000px" height="500px">
<script> 
var canvas, stage;
var img=new Image();
var sprite;
window.onload=function(){
    canvas=document.getElementById("canvas");
    stage=new createjs.Stage(canvas);
    stage.addEventListener("stagemousedown",clickCanvas);
    stage.addEventListener("stagemousemove",moveCanvas);
//数据源
    var data={
        image:["2.jpg"];
        frames:{width:20,height:20,regX:10,regY:10};//宽，高，变化范围X，变化范围Y
    }
//处理数据源
    sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick",tick);//事件对象，舞台
}
function tick(e){
    var t=stage.getNumChildren();
    for(var i=t-1;i>0;i--){
        var s=stage.getChildAt(i);

        s.vY+=2;
        s.vX+=1;
        s.x+=s.vX;
        s.y+=s.vY;
        s.scaleX=s.scaleY=s.scaleX+s.vS;
        s.alpha+=s.vA;

        if(s.alpha<=0||s.y>canvas.height){
            stage.removeChildAt(i);
        }
    }
    stage.update(e);
}
function clickCanvas(e){
    addS(Math.random*200+100,stage.mouseX,stage.mouseY,2);
}
function moveCanvas(e){
    addS(Math.random*2+1,stage.mouseX,stage.mouseY,1);
}
//添加烟花方法
function addS(count,x,y,speed){
    for(var i=0; i<count; i++){
        var s=spite.clone();//返回当前实例的clone
        s.x=x;
        s.y=y;
        s.alpha=Math.random()*0.5+0.5;//透明度初始化
        s.scaleX=s.scaleY=Math.random()+0.3;//缩放初始化，x=y防止缩放变形

        var a=Math.PI*2*Math.random();//滑动曲线
        var v=(Math.random()-0.5)*30*speed;//下落速度
        s.vX=Math.cos(a)*v;
        s.vY=Math.sin(a)*v;
        s.vS=(Math.random()-0.5)*0.2//scale动态变化
        s.vA=-Math.random()*0.05-0.01//alpha动态变化
        stage.addChild(s);
    }
}
</script>
```

**SVG 可伸缩矢量图形（Scalable Vector Graphic）**
- SVG 用来定义用于网络的基于矢量的图形
- SVG使用XML格式定义图形
- SVG图像在改变尺寸后其图形质量不变
- SVG是W3C标准
- SVG可通过文本编辑器来创建和修改
- SVG可以被搜索、索引、脚本化或压缩
- SVG可伸缩
- SVG在任何分辨率可被高质量打印
- SVG在图像质量不下降的情况下被放大

**SVG绘制矢量图形 http://developer.mozilla.org**
```
<svg width="120" height="120" viewBox="0 0 120 120" version="1.1">
        <circle cx="60" cy="50" r="50"></circle>
</svg>
```
**引入SVG外部文件**
```javascript
// svg.svg 加上xml头
<?xml version="1.0"?>
<iframe src="svg.svg" width="400" height="400" frameborder="no"></iframe>
```
### CSS 3
CSS3支援了字体的嵌入、版面的排版，以及最令人印象深刻的动画功能。

Selector – 更有弹性的选择器
Webfonts – 嵌入式字体
Layout – 多样化的排版选择
Stlying radius gradient shadow – 圆角、渐层、阴影
Border background – 边框的背景支援
Transition – 元件的移动效果
Transform – 元件的变形效果
Animation – 将移动和变形加入动画支援

### JavaScript
在比较JavaScript的基本面也新增了DOM的API、和浏览器上下页的纪录修改。

DOM API – 更方便的查询DOM元件
History API – 浏览器的上下页内容修改，方便AJAX可以保留浏览记录
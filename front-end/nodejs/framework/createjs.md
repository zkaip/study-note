CreateJS 游戏开发引擎
===
包含四款工具
- EaseJS        用来处理HTML5的canvas
- TweenJS    用来处理HTML5的动画调整和JavaScript属性
- SoundJS    用来帮助和简化处理音频相关的API
- PreloadJS    管理和协调程序加载项的类库

### EaseJS样例
```javascript
<canvas width="400px" height="400px" style="background-color: blue" id="gameView"></canvas>

var stage=new createjs.Stage('gameView');
var text=new createjs.Text('Hello easejs','36px Arial','#777');
stage.addChild(text);
stage.update();
```
### TweenJS样例
```javascript
<canvas width="400px" height="400px" style="background-color: blue" id="gameView"></canvas>

          stage.x=100;
          stage.y=100;
var stage=new createjs.Stage('gameView');
var circle=new createjs.Shape();
circle.graphics.beginFill('#FF0000').drawCircle(0,0,50);
stage.addChild(circle);

createjs.Tween.get(circle,{loop:true})
.wait(1000)
.to({scaleX:0.2,scaleY:0.2}) //缩放0.2倍
.wait(1000)
.to({scaleX:1,scaleY:1},1000,createjs.Ease.bounceInOut); //还原至原来大小后颤动效果

createjs.Ticker.setFPS(20);
createjs.Ticker.addEventListener("tick",stage);
```
### SoundJS样例
```javascript
<div><h4 id='status'>startUp</h4></div>

var displayStatus;
displayStatus=document.getElementById("status");
src="1.mp3";
createjs.Sound.alternateExtensions=['mp3'];//声音文件扩展名[mp3]
createjs.Sound.addEventListener('fileload',playSound);
displayStatus.innerHTML="Waiting for load to complete...";
function playSound(e){
        soundInstance=createjs.Sound.play(e.src);
        displayStatus.innerHTML="Playing source:"+e.src;
}
```
### PreloadJS样例
```javascript
<div>
        <img id='texas' class="image" />
        <img id='bluebird' class="image" />
        <img id='nepal' class="image" />
</div>

var preload;
preload=new createjs.LoadQueue(false,'assets/');//从文件夹加载资源到队列中
var plugin={
        getPreloadHandlers:function(){
                return{
                        type:["image"];
                        callback:function(src){
                                var id=src.toLowerCase().splite('/').pop().splite(".")[0];
                                var img=document.getElementById('image');
                                return {tag:img};
                        }
                }
        }
}
preload.installPlugin(plugin);
preload.loadManifest([
        "Texas.jpg",
        "BludBird.png",
        "Nepal.jpg"
]);
```

## 控件
### EaseJS
**Text**
```javascript
<canvas id='gameView' width='500px' height='400px'></canvas>

var canvas,stage,text;
var count=0;
canvas=document.getElementById('gameView');
stage=new createjs.Stage(canvas);
text=new createjs.Text('text on the canvas...0!','36px Arial','#FF0000');
text.x=text.y=100;
text.rotation=20;//旋转角度
stage.addChild(text);

rect=new createjs.Shape();//矩形
rect.x=text.x;
rect.y=text.y;
rect.rotation=text.rotation;
stage.addChildAt(rect,0);

createjs.Ticker.setFPS(100);
createjs.Ticker.addEventListener("tick",handlertick);

function handlertick(event){
        count++;
        text.text="text on the canvas..."+count+"!";
        
        rect.graphics.clear() //清空原先状态
              .beginFill('#F00') //红色
              .drawRect(-10,-10,text.getMeasureWidth()+20,50); //（位置X，位置Y，宽、长）
        stage.update();
}
```
**BitMap**
```javascript
var gameView,stage,bitmap;
stage=new createjs.Stage("gameView");
gameView=new createjs.Container(); 
stage.addChild(canvas);

bitmap=new createjs.Bitmap("9.jpg");
stage.addChild(bitmap);

createjs.Ticker.setFPS(30);
create.Ticker.addEventListener('tick',function(){ stage.update(); }); //建议采用PreloadJS加载资源
```
**MovieClip**
```javascript
var stage=new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
create.Ticker.addEventListener('tick',stage);

var mc=new createjs.MovieClip(null,0,true,{start:50,stop:0});//执行起始位置
stage.addChild(mc);

var state1=new createjs.Shape(new createjs.Graphics().beginFill("#999999")).drawCircle(0,100,30);
var state2=new createjs.Shape(new createjs.Graphics().beginFill("#555555")).drawCircle(0,100,30);
//时间线
mc.time.addTween(
    createjs.Tween.get(state1).to({x:0}).to({x:400},100).to({x:0},100)
);
mc.time.addTween(
    createjs.Tween.get(state2).to({x:400}).to({x:0},100).to({x:400},100)
);
mc.gotoAndPlay("start");
Sprite/SpriteSheet
var stage;
stage=new createjs.Stage('gameView');
var ss=new createjs.SpriteSheet({
        "image":["runningGrant.png"],    //把一张图片的所有元素切下来
        "frames":{
                "height":292.5,
                "width":165.75,
                "count":64
        }
        "animations":{
                "run":[0,25,"jump"],
                "jump":[26,63,"run"]
        }
});

var s=new createjs.Sprite(ss,"run");
s.x=100;
s.y=100;
stage.addChild(s);
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick",stage);
DOMElement(操作DOM元素，目前不完善，可能有bug 2015.02.10)
var stage,container,canvas;
canvas=document.getElementById('gameView');
stage=new createjs.Stage('gameView');
container=new createjs.Container();
stage.addChild(container);
container.x=100;
container.y=100;
var content=new createjs.DOMElement("div");
container.addChild(content);
stage.update();
```

### TweenJS
**CSSPlugin//操作CSS属性**
```javascript
createjs.CSSPlugin.install(createjs.Tween);
var box=document.createElement('div');
box.style.width="400px";
box.style.height="400px";
box.style.position="absolute";
box.style.backgroundColor="#F00";
document.body.appendChild(box);
Ease//元素运动路径 http://createjs.com/#!/Demos/TweenJS/Spark-Table
var stage=new createjs.Stage('gameView');

var circle=new createjs.Shape();
circle.graphics.beginFill('#F00').drawCircle(50,50,50);
stage.addChild(circle);
createjs.Tween.get(circle,{loop:false},true)
        .to({x:500,y:0,alpha:0.1},1000,createjs.Ease.elasticInout)
        .to({x:0},1000,createjs.Ease.backIn)
        .wait(1000)
        .to({alpha:1},100);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);
MotionGuidePlugin//按照传入的坐标所生成的路径运动
var canvas,stage;
createjs.MotionGuidePlugin.install(createjs.Tween);

canvas=document.getElementById("gameView");
stage=new createjs.Stage(canvas);

var ball=new createjs.Shape();
ball.graphics.beginFill("#F00").drawCircle(0,0,50);
ball.graphics.endFill();

createjs.Tween.get(ball,{loop:false},true)
            .to({guide:{path:[100,100,800,100,800,300],orient:true}},5000);

stage.addChild(ball);
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListerner("tick",stage);
Event/EventDispatch //事件处理http://createjs.com/#!/Demos/TweenJS/Tween-Circles
var canvas,stage;
var tweens,circleCount=25;
canvas=document.getElementById("gameView");
stage=new createjs.Stage(canvas);
tweens=[];

for(var i=0;i<circleCount;i--){
        var circle=new createjs.Shape();
        circle.graphics.setStrokeStyle(15);
        circle.graphics.setbeginStroke('#113355');
        circle.graphics.drawCircle(0,0,(i+1)*4);
        circle.compositeOperation="lighter";

        var tween=createjs.Tween.get(circle)
                           .to({x:300,y:200},{0.5+i*0.04}*1500,createjs.Ease.bounceOut).call(tweenComplete));
        tweens.push({tween:tween,ref:circle});
        stage.addChild(circle);
}
activeCount=circleCount;
stage.addEventListener("stagemouseup",handlerMouseup);
createjs.Ticker.addEventListener("tick",stage);

function handlerMouseup(e){
        for(var i=0;i<circleCount;i++){
                var ref=tweens[i].ref;
                createjs.Tween.get(ref,{override:true})
                .to({x:stage.mouseX,y:stage.mouseY},(0.5+i*0.04)*1500,new createjs.Ease.bounceOut).call(tweenComplete);
        }
        activeCount=circleCount;
}

function tweenComplete(){
        activeCount--;
}
```

### CreateJS与Flash交互（使用Flash生成的js文件实现动画效果，加载图片资源）
把Flash以fla项目保存的文件(js、image)直接复制到项目中，然后引入所需要的库文件，并把
Flash生成的js中的`function init(){}`函数中的代码copy到自己的js文件中即可。
CSS3 动画模块
===
### CSS 2D Transform
- rotate(deg) 旋转
- skew(x,y) 倾斜
- translate(x,y) 移动
- scale(num) 缩放
- matrix() 矩阵

### CSS 3D Transform
- rotateX(deg) 旋转 X轴
- rotateY(deg) 旋转 Y轴

### Transition(基本上都支持)
CSS属性值在一定的时间区间内平滑的过渡
- transition-property(none表示没有 all表示所有) 用于指定哪些属性值改变时有动画效果
- transition-duration 动画持续时间, 可以设置多个值
- transition-timing-function
  - linear 线性改变
  - ease 逐渐慢下来的动画
  - ease-in 先慢后快的渐变动画
  - ease-out 先快后慢的渐变动画
  - ease-in-out 先慢后快再慢的渐变动画
  - cubic-bezier 贝塞尔曲线来指定一个复杂的动画渐变效果 [工具](http://cubic-bezier.com/)
- transition-delay 动画开始前的等待时间,可以省略

[支持transition的属性](http://oli.jp/2010/css-animatable-properties/)

### Animation
设置多帧动画
`steps(num)`可以实现分步过渡 http://dabblet.com/gist/1745856

- `animation-name` 此属性指定动画应对的keyframes，比如设置animation-name为loading，那么动画就对应@keyframes loading所声明的关键帧。如果没有定义关键帧，动画将不会生效。
- `animation-duration` 定义一次动画的持续时间，默认值为0
- `animation-fill-mode`  
  - `none` 回到动画没开始的状态(默认值)
  - `forwards` 动画保持到结束状态 
  - `backwards` 让动画回到第一帧的状态。
  - `both` 根据animation-direction（见后）轮流应用forwards和backwards规则。
- `animation-delay` 定义从触发到开始动画的时间
- `animation-timing-function` 定义动画显示的效果，例如先快后慢，先慢后快等，属性值与transition-timing-function相同
- `animation-iteration-count` 该属性定义动画循环的次数，默认为1。我们可以用`infinite`来使动画无限次循环，这是transition动画所无法支持的。
- `animation-direction` 定义动画播放的方向，
  - 默认值为normal，代表每次动画都向前播放。
  - `alternate`，第偶数次动画向前播放，第奇数次逆向播放。
  - `reverse` 动画反向播放
  - `alternate-reverse` 动画正向反向播放
- `animation-play-state`
  - `pause` 暂停
  - `running` 运行

@keyframes表示关键帧 0%可以用from代表 100%可以用to代表
```css
@keyframes 动画标识名{  /*动画标识名将被animation-name属性所引用*/
   /*每一帧的动画效果，可以通过百分比数值加样式的形式来定义*/
    0%{
           background-color: white;
    }
    50%{
           background-color: red;
    }       
   100%{
           background-color: black;  
    }
}

/*我们可以把百分比数值看做第一帧在动画中时间轴的位置，0%在时间轴的开始，50%在时间轴的正中，100%在时间轴的终点。那以上的动画效果就是，元素的背景颜色会从白色渐变成红色，再从红色渐变成黑色。0%和100%也可以分别用form和to来代替*/

@keyframes 动画标识名{
    from{
           background-color: white;
    }
    50%{
           background-color: red;
    }       
    to{
           background-color: black;  
    }
}
```

### 参考
- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- [网页动效库大全](http://www.ui.cn/detail/16348.html)

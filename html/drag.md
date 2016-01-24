HTML5 Drag
===
### 拖放事件
`HTML4` 通过`mousedown` `mousemove` `mouseup` 来实现拖放

**HTML5 拖放事件**

事件 | 产生的源对象 | 说明
--- | --- | ---
dragstart | 被拖动的元素 | 开始拖放动作
drag | 被拖动的元素 | 拖放过程中
dragenter | 拖动过程中鼠标经过的元素 | 被拖动的元素开始进入本元素的范围内
dragleave | 拖动过程中鼠标经过的元素 | 被拖动的元素离开本元素的范围
drop | 拖放的目标元素 | 有其他元素拖动到了本元素中
dragend | 拖动的对象元素 | 拖动结束
dragover | 拖动过程中鼠标经过的元素 | 被拖动的元素在本元素上移动(尽量使用dragenter来代替该事件)

### 使用拖放
#### 兼容性检测
使用[Modernizr](http://www.modernizr.com/) 进行兼容性检测
```javascript
if (Modernizr.draganddrop) {
  // Browser supports HTML5 DnD.
} else {
  // Fallback to a library solution.
}
```
#### 创建可拖动内容
在要设为可移动的元素上设置 `draggable=true` 属性。可以是任何能启用拖动功能的内容，包括图片、链接、文件或其他 DOM 节点 
```javascript
<div class="column" draggable="true">
```
#### 监听拖动事件
`HTML4` 通过`mousedown` `mousemove` `mouseup` 来实现拖放

**HTML5 拖放事件**

事件 | 产生的源对象 | 说明
--- | --- | ---
dragstart | 被拖动的元素 | 开始拖放动作
drag | 被拖动的元素 | 拖放过程中
dragenter | 拖动过程中鼠标经过的元素 | 被拖动的元素开始进入本元素的范围内
dragleave | 拖动过程中鼠标经过的元素 | 被拖动的元素离开本元素的范围
drop | 拖放的目标元素 | 有其他元素拖动到了本元素中
dragend | 拖动的对象元素 | 拖动结束
dragover | 拖动过程中鼠标经过的元素 | 被拖动的元素在本元素上移动(尽量使用dragenter来代替该事件)

**注意**
- `e.target / this`的指向
- `e.preventDefault()`阻止浏览器默认行为(拖动链接)
- `e.stopPropagation()`阻止浏览器拖动默认的重定向行为( `drop` 和 `dragend` 事件)
- 使用`dragenter`代替`dragover`, 以避免浏览器在目标上反复进行`css`重绘

#### 数据 DataTransfer 对象
**要设置/获取数据必须通过 DataTransfer 对象**

属性/方法 | 作用
--- | :---
dropEffect属性 | 控制用户在 dragenter 和 dragover 事件期间收到的反馈，当用户将鼠标悬停在目标元素上方时，浏览器的光标会显示即将采取的操作类型（例如复制、移动等）, 可以指定为none(不允许拖放到目标元素中)、copy、link、move
effectAllowed属性 | 限制用户可在元素上执行的“拖动类型”。在拖放处理模型中用于初始化 dragenter 和 dragover 事件中的 dropEffect。none、copy、copyLink、copyMove、link、linkMove、move、all 和 uninitialized
types属性 | 存入数据的种类
cleraData(DomString format) | 清楚DataTransfer对象中存放的数据
setData(DOMString format,DomString data) | 存入数据
DOMString getData(DOMString format) | 从DataTransfer对象中读取数据
setDragImange(Element image，long x,long y) | 用img元素来设置拖放图标

**文件的拖动**: 数据会包含在 `dataTransfer.files` 属性中

### 参考
- [本机 HTML5 拖放](http://www.html5rocks.com/zh/tutorials/dnd/basics/)
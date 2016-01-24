React API 0.14
===
## 顶级API
### React
- React.Component
- React.createClass
- React.createElement
- React.cloneElement
- React.createFactory
- React.isValidElement
- React.DOM
- React.PropTypes
- React.Children
  - React.Children.map
  - React.Children.forEach
  - React.Children.count
  - React.Children.only
  - React.Children.toArray

### ReactDOM 
- ReactDOM.render
- ReactDOM.unmountComponentAtNode
- ReactDOM.findDOMNode `In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.`

### ReactDOMServer
`react-dom/server`
- ReactDOMServer.renderToString
- ReactDOMServer.renderToStaticMarkup

## 组件API
### React.Component 
- setState
- ~~replaceState~~ 该方法在ES6组件中不存在, 可能未来会被移除
- forceUpdate
- isMounted
- ~~setProps~~ 该方法将会被移除
- ~~replaceProps~~ 该方法将会被移除

## 生命周期相关API
### 组件详细说明
- render
- getInitialState
- getDefaultProps
- propTypes
- mixins
- static
- displayName 在debugging message使用

### 生命周期函数
- Mounting
  - Mounting: componentWillMount
  - Mounting: componentWillMount
- Updating
  - Updating: componentWillReceiveProps
  - Updating: shouldComponentUpdate
  - Updating: componentWillUpdate
  - Updating: componentWillUpdate
- Unmounting
  - Unmounting: componentWillUnmount

## 标签属性
### HTML 元素
```
a abbr address area article aside audio b base bdi bdo big blockquote body br
button canvas caption cite code col colgroup data datalist dd del details dfn
dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5
h6 head header hr html i iframe img input ins kbd keygen label legend li link
main map mark menu menuitem meta meter nav noscript object ol optgroup option
output p param picture pre progress q rp rt ruby s samp script section select
small source span strong style sub summary sup table tbody td textarea tfoot th
thead time title tr track u ul var video wbr
```

### SVG 元素
```
circle clipPath defs ellipse g line linearGradient mask path pattern polygon polyline
```
[react-art](https://github.com/facebook/react-art)是`React`渲染的第三方组件库
radialGradient rect stop svg text tspan

## HTML 属性
所有的属性都是驼峰命名的, `data-*` 和 `aria-*` 属性也支持, `className` `htmlFor`
```
accept acceptCharset accessKey action allowFullScreen allowTransparency alt
async autoComplete autoFocus autoPlay capture cellPadding cellSpacing charSet
challenge checked classID className cols colSpan content contentEditable contextMenu
controls coords crossOrigin data dateTime defer dir disabled download draggable
encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode
keyParams keyType label lang list loop low manifest marginHeight marginWidth max
maxLength media mediaGroup method min minLength multiple muted name noValidate open
optimum pattern placeholder poster preload radioGroup readOnly rel required role
rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes
span spellCheck src srcDoc srcSet start step style summary tabIndex target title
type useMap value width wmode wrap

```

非标属性的支持
- `dangerouslySetInnerHTML`用来插入脏的HTML字符串
- `autoCapitalize` `autoCorrect` **Mobile Safari**
- `property` **Open Graph meta tags**
- `itemProp` `itemScope` `itemType` `itemRef` `itemID` **HTML5 microdata**.
- `unselectable` **Internet Explorer**
- `results` `autoSave` **WebKit/Blink `input fields` of type `search`**
 

## SVG 属性
```
clipPath cx cy d dx dy fill fillOpacity fontFamily
fontSize fx fy gradientTransform gradientUnits markerEnd
markerMid markerStart offset opacity patternContentUnits
patternUnits points preserveAspectRatio r rx ry spreadMethod
stopColor stopOpacity stroke  strokeDasharray strokeLinecap
strokeOpacity strokeWidth textAnchor transform version
viewBox x1 x2 x xlinkActuate xlinkArcrole xlinkHref xlinkRole
xlinkShow xlinkTitle xlinkType xmlBase xmlLang xmlSpace y1 y2 y
```

## 事件系统
### 合成事件
React 0.14 版本 `return false`并不能阻止事件传播, 必须在合适的时间使用`e.stopPropagation()` `e.preventDefault()`
```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

### 事件池
所有的合成事件都被放入事件池, 回调执行后会立刻被置为`nullified`, 不能同步使用, 除非使用`event.persist()`
```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  var eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  this.setState({clickEvent: event}); // Won't work. this.state.clickEvent will only contain null values.
  this.setState({eventType: event.type}); // You can still export event properties.
}
```

### 支持的事件
下面的事件处理程序在事件冒泡阶段被触发。如果要注册事件捕获处理程序，应该使用 Capture 事件，例如使用 onClickCapture 处理点击事件的捕获阶段，而不是 onClick。
- 剪贴板事件
  - 事件名
    - onCopy
    - onCut
    - onPaste
  - 属性
    - DOMDataTransfer clipboardData
- 组成事件
  - 事件名
    - onCompositionEnd
    - onCompositionStart
    - onCompositionUpdate
  - 属性
    - string data
- 键盘事件
  - 事件名
    - onKeyDown
    - onKeyPress
    - onKeyUp
  - 属性
    - boolean altKey
    - number charCode
    - boolean ctrlKey
    - boolean getModifierState(key)
    - string key
    - number keyCode
    - string locale
    - number location
    - boolean metaKey
    - boolean repeat
    - boolean shiftKey
    - number which
- 焦点事件
  - 事件名
    - onFocus
    - onBlur
  - 属性
    - DOMEventTarget relatedTarget
- 鼠标事件
  - 事件名
    - onClick
    - onContextMenu
    - onDoubleClick
    - onDrag
    - onDragEnd
    - onDragEnter
    - onDragExit
    - onDragLeave
    - onDragOver
    - onDragStart
    - onDrop
    - onMouseDown
    - onMouseEnter
    - onMouseLeave
    - onMouseMove
    - onMouseOut
    - onMouseOver
    - onMouseUp
  - 属性
    - boolean altKey
    - number button
    - number buttons
    - number clientX
    - number clientY
    - boolean ctrlKey
    - boolean getModifierState(key)
    - boolean metaKey
    - number pageX
    - number pageY
    - DOMEventTarget relatedTarget
    - number screenX
    - number screenY
    - boolean shiftKey
- 选择事件
  - 事件名
    - onSelect
- 触控事件
  - 事件名
    - onTouchCancel
    - onTouchEnd
    - onTouchMove
    - onTouchStart
  - 属性
    - boolean altKey
    - DOMTouchList changedTouches
    - boolean ctrlKey
    - boolean getModifierState(key)
    - boolean metaKey
    - boolean shiftKey
    - DOMTouchList targetTouches
    - DOMTouchList touches
- 用户界面事件
  - 事件名
    - onScroll
  - 属性
    - number detail
    - DOMAbstractView view
- 滚轮事件
  - 事件名
    - onWheel
  - 属性
    - number deltaMode
    - number deltaX
    - number deltaY
    - number deltaZ
- 媒体事件
  - 事件名
    - onAbort
    - onCanPlay
    - onCanPlayThrough
    - onDurat
    - onChange
    - onEmptied
    - onEncrypted
    - onEnded
    - onError
    - onLoadedData
    - onLoadedMetadata
    - onLoadStart
    - onPause
    - onPlay
    - onPlaying
    - onProgress
    - onRateChange
    - onSeeked
    - onSeeking
    - onStalled
    - onSuspend
    - onTimeUpdate
    - onVolumeChange
    - onWaiting
- 图片事件
  - 事件名
    - onLoad
    - onError

## React 术语
- ReactElement / ReactElement Factory
- ReactNode
  - ReactElement
  - string （又名 ReactText）
  - number （又名 ReactText）
  - ReactNode 实例数组 （又名 ReactFragment）
- ReactComponent / ReactComponent Class

**入口点（Entry Point）**
```javascript
React.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent;
```
**节点和元素（Nodes and Elements）**
```javascript
type ReactNode = ReactElement | ReactFragment | ReactText;

type ReactElement = ReactComponentElement | ReactDOMElement;

type ReactDOMElement = {
  type : string,
  props : {
    children : ReactNodeList,
    className : string,
    etc.
  },
  key : string | boolean | number | null,
  ref : string | null
};

type ReactComponentElement<TProps> = {
  type : ReactClass<TProps>,
  props : TProps,
  key : string | boolean | number | null,
  ref : string | null
};

type ReactFragment = Array<ReactNode | ReactEmpty>;

type ReactNodeList = ReactNode | ReactEmpty;

type ReactText = string | number;

type ReactEmpty = null | undefined | boolean;
```
**类和组件（Classes and Components）**
```javascript
type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

type ReactComponent<TProps> = {
  props : TProps,
  render : () => ReactElement
};
```



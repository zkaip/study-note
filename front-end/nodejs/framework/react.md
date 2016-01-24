## React.PropTypes类型(验证传入的数据的有效性)
```js
PropTypes:{
  optionalArray: React.PropTypes.array, // 数组
  optionalBool: React.PropTypes.bool, // Boolean
  optionalFunc: React.PropTypes.func, // 函数
  optionalNumber: React.PropTypes.number, // 数字
  optionalObject: React.PropTypes.object, // 对象
  optionalString: React.PropTypes.string, // 字符串
  optionalNode: React.PropTypes.node, // 任何类型的: numbers, strings, elements 或者任何这种类型的阵列
  optionalElement: React.PropTypes.element, // React 元素
  optionalMessage: React.PropTypes.instanceOf(XXX), // 某种XXX类别的实体
  optionalEnum: React.PropTypes.oneOf(['foo', 'bar']), // 其中一个字串
  optionalUnion: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]), // 其中一种格式类型
  optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.string), // 某种类型的阵列(字串类型)
  optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.string), // 具有某种属性类型的物件(字串类型)
  optionalObjectWithShape: React.PropTypes.shape({ // 是否符合指定格式的物件
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number
  }),
  requiredFunc: React.PropTypes.func.isRequired, // 以后任意类型加上 `isRequired` 来使 prop 不可空。
  requiredAny: React.PropTypes.any.isRequired, // 可以是任何格式，且必要。
  // 自定义格式(当不符合的时候，会显示Error)
  // 不要用`console.warn` 或者throw, 因为它在`oneOfType` 的情况下无效。

  customPropType: function(props, propName, componentName) {
    if (!/^[0-9]/.test(props[propName])) {
      return new Error('Validation failed!');
    }
  },

  children: React.PropTypes.element.isRequired //单一子集
}
```

## React 组件(状态机)
**属性 props** 只读
**状态 state** 读写
注意: 组件只能更新一个根node, 如果想更新多个node, 必须把这些节点进行包装

### Props
默认Props值: `getDefaultProps()`
```javascript
var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});
```

**Props传递**
- 手动传递
- `...props`传递(注意顺序, 选择传递)
  - `var { checked, ...other } = this.props;`
  - `{...other} checked={checked} className={fancyClass}`


**Mixins 复杂组件之间复用代码**
 关于 mixin 值得一提的优点是，如果一个组件使用了多个 mixin，并用有多个 mixin 定义了同样的生命周期方法（如：多个 mixin 都需要在组件销毁时做资源清理操作），所有这些生命周期方法都保证会被执行到。方法执行顺序是：**首先按 mixin 引入顺序执行 mixin 里方法，最后执行组件内定义的方法。**

### State
尽可能把组件做成无状态的, 这样能隔离`state`把它放到最合理的地方, 

常用的模式是创建多个只负责渲染数据的无状态（stateless）组件，在它们的上层创建一个有状态（`stateful`）组件并把它的状态通过`props`传给子级。这个有状态的组件封装了所有用户的交互逻辑，而这些无状态组件则负责声明式地渲染数据

**哪些应该作为state**
- State 应该包括那些可能被组件的事件处理器改变并触发用户界面更新的数据。 

**哪些不应该作为state**
- 计算所得数据
- `React` 组件
- 基于 `props` 的重复数据:尽可能使用 props 来作为惟一数据来源。把 props 保存到 state 的一个有效的场景是需要知道它以前值的时候，因为未来的 props 可能会变化。

## ES6 class
- 没有自动绑定, 需要手动 `bind(this)` 或者使用 `=>`
- 不支持 `Mixins`

```javascript
export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };
```

### 无状态函数
React也可以使用JS函数来定义`React classes`
```javascript
function HelloMessage(props) {
  return <div>Hello {props.name}</div>;
}
// ES6 写法
var HelloMessage = (props) => <div>Hello {props.name}</div>;

ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);
```
**注意:由于无状态函数没有实例,所以你也不能添加一个ref到这个函数组件上,通常这不是一个问题**

## 表单组件
`<input>` `<textarea>` `<option>` `<option>`
- value，用于 `<input>`、`<textarea>` 组件。
- checked，用于类型为 checkbox 或者 radio 的 `<input>` 组件。
- selected，用于 `<option>` 组件。

`onChange` 监听组件变化
- `<input>` 或 `<textarea>` 的 value 发生变化时。
- `<input>` 的 checked 状态改变时。
- `<option>` 的 selected 状态改变时。

- **受限组件** 设置 value 的 `<input>` 组件, 必须使用onChange事件才能更新
- **不受限组件** 没有设置 value(或者设为 null) 的 `<input>` 组件
  - **defaultValue** 默认非空值的不受限组件的属性, 仅用于初始渲染, 如果想更新值, 需要控制组件
  - **defaultChecked** `checkbox` `radio`
  - **defaultValue** `<select>`

**为什么 `<select>` 使用 value 属性?**
HTML 中 `<select>` 通常使用 `<option>` 的 selected 属性设置选中状态；React 为了更方面的控制组件，采用以下方式代替：
```html
<select value="B">
  <option value="A">Apple</option>
  <option value="B">Banana</option>
  <option value="C">Cranberry</option>
</select>
<!-- 进行多选的话 -->
<select multiple={true} value={['B', 'C']}>
```

## React 与 浏览器
[Refs and `findDOMNode()`](https://facebook.github.io/react/docs/more-about-refs.html) 可以有助于老代码过渡

**refs** 来自于 ReactDOM.render(): 该引用只能用作顶层, 内层的 props 和 state 通过`get`方法取得`ref`的属性或者回调函数

**refs 回调函数**
当组件是DOM component ,你得到的是DOM节点
当组件是React component, 你得到的是React class实例
**注意:** 当refs改变之后会立即被置为`null`,可以防止内存泄露, 但是, 如果`refs`在内联函数中的时候, React会看到不同的函数对象, refs会被立即置为`null`在它被置为组件实例之前

**refs 字符串**
```javascript
<input ref="myInput" />

var input = this.refs.myInput;
var inputValue = input.value;
var inputRect = input.getBoundingClientRect();
```

- 优点
  - 你可以在组件类中定义任何公共方法(如在 Typeahead 中的复位方法)，并通过 refs(如 this.refs.myTypeahead.reset())调用这些公共方法。更好的方式是使用构建在React中的流来替代refs方法
  - 执行 DOM 测量几乎总是需要接触“本地”组件，如 `<input/ >`，并通过 React.findDOMNode(this.refs.myInput) 访问它的底层 DOM 节点。Refs 是可行的可靠的方法之一。
  - 当组件销毁的时候,React会自动销毁refs,不用担心内存泄露
- 缺点
  - 永远不要访问组件的 render 方法内部的 refs——或任何组件的 render 方法正在 call satck 中运行时，也不要访问 refs。
  - 如果你的 ref 被定义为 ref =“myRefString”，你必须使用 this.refs['myRefString'] 来访问。
  - 请尽量尝试使用state来构建程序
  - refs不能链接到无状态函数,因为无状态函数没有实例, 你可以用包装成React组件后使用refs

**向一个特定的子实例发送消息，Refs 是一个很好的方式，而通过流动式接收 Reactive 的 props 和 state 的方式可能是不方便的。然而，对于你的应用程序中的流动数据来说，refs 应该不是你的首选抽象特性。默认情况下，为用例使用 Reactive 数据流并保存 refs 本来就是无功无过的。**

**浏览器兼容**
- IE8兼容 [html5shiv](https://github.com/aFarkas/html5shiv) 
- ES5兼容 [kriskowal's es5-shim](https://github.com/es-shims/es5-shim)

### 与DOM的差异
- 所有 DOM 的 properties 和 attributes （包括事件处理器）应该都是驼峰命名的，以便和标准的 JavaScript 风格保持一致。我们故意和规范不同，因为规范本身就不一致。然而，data-* 和 aria-* 属性符合规范，应该仅是小写的。
- `style` 属性接收一个带有驼峰命名风格的 JavaScript 对象，而不是一个 CSS 字符串。这与 DOM 中的 style 的 JavaScript 属性保持一致，更加有效，并且弥补了 XSS 安全漏洞。
- 所有的事件对象和 W3C 规范保持一致，并且所有的事件（包括提交事件）冒泡都正确地遵循 W3C 规范。参考事件系统获取更多详细信息。
- `onChange` 事件表现得和你想要的一样：当表单字段改变了，该事件就被触发，而不是等到失去焦点的时候。我们故意和现有的浏览器表现得不一致，是因为 onChange 是它的行为的一个错误称呼，并且 React 依赖于此事件来实时地响应用户输入。参考表单获取更多详细信息。
- 表单输入属性，例如 value 和 checked，以及 textarea。

### 特殊的非DOM属性
- `key`：可选的唯一的标识器。当组件在渲染过程中被各种打乱的时候，由于差异检测逻辑，可能会被销毁后重新创建。给组件绑定一个 key，可以持续确保组件还存在 DOM 中。
- `ref`
- `dangerouslySetInnerHTML`：提供插入纯 HTML 字符串的功能，主要为了能和生成 DOM 字符串的库整合。

## WebComponent使用React组件
```javascript
var proto = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      var mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      var name = this.getAttribute('name');
      var url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
```
## 生产环境集成
- 使用CDN托管的`React`
- 生产环境预编译`JSX` `npm install babel-preset-es2015 babel-preset-react;babel --presets es2015,react --watch src/ --out-dir lib/`

## JSX 语法
[深入学习JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
[JSX陷阱](https://facebook.github.io/react/docs/jsx-gotchas.html)

**html 标签关键词**
`class`=>`className`
`for`=>`htmlFor`

**ReactDOM 渲染**
- 小写字母名开头的变量 => HTML标签
- 大写字母开头的变量 => React Component

**注意变量的作用域, 渲染的组件变量必须已经定义**

**含命名空间的组件**
```javascript
var MyFormComponent = React.createClass({ ... });

MyFormComponent.Row = React.createClass({ ... });
MyFormComponent.Label = React.createClass({ ... });
MyFormComponent.Input = React.createClass({ ... });

var Form = MyFormComponent;

var App = (
  <Form>
    <Form.Row>
      <Form.Label />
      <Form.Input />
    </Form.Row>
  </Form>
);
```

- 属性表达式 `{}` 可以使用`...props` 属性不可变否则会造成不可预知的错误,同名属性后面的会覆盖前面的
- 布尔属性 `disabled`或`disabled={true}` `disabled` `required` `checked` `readOnly`
- 子表达式 `{}`
- 注释 它们只是 `JS` 表达式而已。你只需要在一个标签的子节点内(非最外层)小心地用`{}`包围要注释的部分。

**JSX陷阱**
- HTML实体(React默认会转义所有字符串)
  - 使用`Unicode`字符
  - 可以在数组里混合使用字符串和 JSX 元素。` <div>{['First ', <span>&middot;</span>, ' Second']}</div>`
  - 万不得已使用原始的HTML ` <div dangerouslySetInnerHTML={{'{{'}}__html: 'First &middot; Second'}} />`
- 自定义HTML属性
  - `aria-` 无障碍属性可以正常使用
  - `data-` 前缀才可以显示
  - 其余HTML规范里不存在的属性, React不会显示

## React 性能优化
- 不要进行 DOM 节点跨层级的操作。
- 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升(只使用CSS进行DOM元素的隐藏显示)
- 尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

## React 生命周期
![React 生命周期](https://pic2.zhimg.com/f5e1a1ac230ee99a44b7dd68b28bdf5d_b.png)
- 当首次装载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount；
- 当卸载组件时，执行 componentWillUnmount；
- 当重新装载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps；
- 当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

![三种状态](https://pic1.zhimg.com/e255f4c4003923089a02a645b312f94c_b.png)
- **mount**Component -> MOUNTING 负责管理生命周期中的`getInitialState`、`componentWillMount`、render 和 `componentDidMount`
  - getInitialState():object
  - componentWillMount()
  - componentDidMount()
- **update**Component -> RECEIVE_PROPS 负责管理生命周期中的componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate
  - componentWillReceiveProps(object nextProps) 
  - shouldComponentUpdate(object nextProps, object nextState):boolean
  - componentWillUpdate(object nextProps, object nextState) 不能在此设置 this.setState()
  - componentDidUpdate(object prevProps, object prevState) 
    - componentWillUnmount() 
- **unmount**Component -> UNMOUNTING 负责管理生命周期中的componentWillUnmount
- **复合组件强制更新**
  - `component.forceUpdate()` 无需调用 this.setState()

![mountComponent](https://pic3.zhimg.com/ec65c26c1123f588c2a57e40423cf6fa_b.png)
![updateComponent](https://pic1.zhimg.com/34357c2a84e53be3619667ffa4ebbc90_b.png)

**setState 更新机制**
setState 会先进行`_pendingState`更新队列的合并操作，不会立刻 reRender，因此是异步操作，且通过判断状态（MOUNTING、RECEIVE_PROPS）来控制 reRender 的时机；

**不建议在 getDefaultProps、getInitialState、shouldComponentUpdate、componentWillUpdate、render 和 componentWillUnmount 中调用 setState，特别注意：不能在 shouldComponentUpdate 和 componentWillUpdate中调用 setState，会导致循环调用。**

![生命周期](https://pic4.zhimg.com/24487816f694e6bee594870992c1c54b_b.png)

## [React Mixin](http://zhuanlan.zhihu.com/purerender/20361937)
- createClass
- Decorator(`import { mixin } from 'core-decorators'`)
- **Higher-Order Components（HOCs）**
  - 通过class继承来写

## 插件
`npm install react-addons-pure-render-mixin`
- TransitionGroup和CSSTransitionGroup，用于处理动画和过渡
- LinkedStateMixin，用于简化用户表单输入数据和组件 state 之间的 **双向数据绑定**。
- React.cloneElement ，用于实现 React 组件浅复制，同时改变它们的 props 。
- createFragment, 创建一个带key的children.
- update，一个辅助方法，使得在 JavaScript 中处理不可变数据更加容易。
- PureRednerMixin，在某些场景下的性能检测器。
- shallowCompare, 一个比较函数来确定props和state是否应该更新, 常用于纯函数的值的比较
- TestUtils， 简单的辅助工具，用于编写测试用例（仅存在于未压缩版）.
- Perf，用于性能测评，并帮助你检查出可优化的功能点。

## context 
`Context`是全局变量,谨慎使用,该API是新引入的API可能会在将来有所变化
不要使用`Context`传递模型的数据, `Context`可能会造成代码难以理解, 因为这样会使数据流动不清晰.

**context生命周期**
```javascript
void componentWillReceiveProps(
  object nextProps, object nextContext
)

boolean shouldComponentUpdate(
  object nextProps, object nextState, object nextContext
)

void componentWillUpdate(
  object nextProps, object nextState, object nextContext
)

void componentDidUpdate(
  object prevProps, object prevState, object prevContext
)
```
**无状态函数中使用context**
```javascript
function Button(props, context) {
  return (
    <button style={{background: context.color}}>
      {props.children}
    </button>
  );
}
Button.contextTypes = {color: React.PropTypes.string};
```

**注意:** 如果组件的变化导致的`context`,但是实际上这个context值不应该更新,应该在`shouldComponentUpdate`return`false`

## TIPS
### 行内样式
对象, 驼峰形式的样式名, 浏览器前缀除`ms`外大写
### if-else
`JSX`中无法使用`if-else`, 应该使用三元操作符, 或者在JSX语法外,用`if-else`声明变量, 或者用立即执行函数
```javascript
{(() => {
        switch (this.state.color) {
          case "red":   return "#FF0000";
          case "green": return "#00FF00";
          case "blue":  return "#0000FF";
          default:      return "#FFFFFF";
        }
      })()}
```
### 自闭合标签
JSX中必须使用严格的自闭合标签
**合法:**`<div />` `<div></div>`
### JSX根节点最大数量
必须只返回一个根节点(多个节点需要用`div`或`span`包裹), 千万不要在三元操作符中放入超过一个子节点
### JSX false处理
- 被渲染成 id="false"
- input value 的值将会是 "false" 字符串
- 节点内部的false 渲染成没有子节点

### style像素值后缀px
内联样式会自动在数字后加上`px`后缀, 以下除外
animationIterationCount
- boxFlex
- boxFlexGroup
- boxOrdinalGroup
- columnCount
- fillOpacity
- flex
- flexGrow
- flexPositive
- flexShrink
- flexNegative
- flexOrder
- fontWeight
- lineClamp
- lineHeight
- opacity
- order
- orphans
- stopOpacity
- strokeDashoffset
- strokeOpacity
- strokeWidth
- tabSize
- widows
- zIndex
- zoom

### Children props的类型
通常是数组类型, 但是只有一个子代的话,会成为一个单独的组件
### Input value 为 undefined 或 null时,input会变成可编辑状态
### componentWillReceiveProps 在 Mounting 后不会触发
### getInitialState 里的 Props 是一个反模式
### 组件的 DOM 事件监听
通常和JQuery共用时使用
```javascript
var Box = React.createClass({
  getInitialState: function() {
    return {windowWidth: window.innerWidth};
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    return <div>Current window width: {this.state.windowWidth}</div>;
  }
});

ReactDOM.render(<Box />, mountNode);
```
`componentDidMount` 会在 component 渲染完成且已经有了 DOM 结构的时候被调用。通常情况下，你可以在这绑定普通的 DOM 事件。

注意，事件的回调被绑定在了 react 组件上，而不是原始的元素上。React 通过一个 autobinding 过程自动将方法绑定到当前的组件实例上

### 通过 AJAX 加载初始数据
在 `componentDidMount` 时加载数据。当加载成功，将数据存储在 state 中，触发 render 来更新你的 UI。

**当执行同步请求的响应时**，在更新 state 前， 一定要先通过 `this.isMounted()` 来检测组件的状态是否还是 mounted。
```
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  mountNode
);
```

### 组件间的通信
- 父-子通信, 直接传递 props
- 子-父通信 `bind(this, arg1, arg2, ...)` 传递到函数, 函数调用返回传入的值
- 对于没有 父-子 关系的组件间的通信，你可以设置你自己的全局时间系统。 在 `componentDidMount()` 里订阅事件，在 `componentWillUnmount()` 里退订，然后在事件回调里调用 `setState()`。
- 父组件调用子组件公开的方法

### this.props.children 无法取出
你无法通过 this.props.children 访问子组件, this.props.children 只是表示该子组件被传递到父组件, 除非你用 `refs` 引用它
### 使用其他的库
你只需在组件的生命周期调用其他库的方法即可, 你也可以在此调用你自己的事件流和事件监听器
```javascript
var App = React.createClass({
  getInitialState: function() {
    return {myModel: new myBackboneModel({items: [1, 2, 3]})};
  },

  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this.refs.placeholder)).append($('<span />'));
  },

  componentWillUnmount: function() {
    // Clean up work here.
  },

  shouldComponentUpdate: function() {
    // Let's just never update this component again.
    return false;
  },

  render: function() {
    return <div ref="placeholder"/>;
  }
});

ReactDOM.render(<App />, mountNode);
```

### Dangerously Set innerHTML
```javascript
function createMarkup() { return {__html: 'First &middot; Second'}; };
<div dangerouslySetInnerHTML={createMarkup()} />
```

## React-router 路由系统
![](https://pic1.zhimg.com/0e753ac7e440fca9cb1cd7995ce26ef0_b.png)

## ReactCSSTransitionGroup 动画
- appear 动画是 ReactCSSTransitionGroup 组件初次 mount 后，才会被添加到 ReactCSSTransitionGroup 的所有子元素上。
- enter 动画是 ReactCSSTransitionGroup 组件更新后，被添加到新增的子元素上。
- ReactCSSTransitionGroup 提供创建 `CSS` 动画最简单的方法，对于更加个性化的动画，大家可以通过调用 ReactTransitionGroup 自定义动画。

## ReactMotion 缓动动画
requestAnimationFrame (raf)可以看到，上述章节使用 setTimeout 来模拟时间的逝去，然而浏览器为动画过程提供了一个更为专注的 API -requestAnimationFrame。
```javascript
const update = now => {
  // calculate new state...

  // rerender here...

  raf(update);
};

raf(update);
```
raf 使用起来就像 setTimeout 一样，但有以下优点：
- 所有注册到 raf 中的回调，浏览器会统一管理， 在适当的时候一同执行所有回调。
- 当页面不可见，例如当前标签页被切换，隐藏在后面的时候，为了减少终端的损耗，raf 就会暂停。（如果像 jQuery 那样， 使用 setTimeout 实现动画，此时页面就会进行没有意义的重绘）。

raf 的这个特性，还可以利用在实时模块中，让标签页隐藏时停止发请求。在开始使用 raf 前，我们需要一个 raf 的 polyfill ，比如 [chrisdickinson/raf](https://github.com/chrisdickinson/raf)

## Immutable 不变对象库
- `immutable.js` 16K `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`。有非常全面的`map`、`filter`、`groupBy`、`reduce``find`函数式操作方法。同时 API 也尽量与 Object 或 Array 类似。采用结构共享构造不可变对象
- `seamless-immutable` 2K 只支持`Array` `Object`两种类型

### 优势
- 降低可变数据带来的复杂度
- 节省内存
- Undo/Redo，Copy/Paste，甚至时间旅行等功能容易实现
- 并发安全
- 更有利于函数式编程

### 缺点
- API学习成本
- 资源文件大小增加
- 容易与原生对象混淆
  - 使用`TypeScript`有静态类型检查的工具
  - 约定变量命名规则：如所有 Immutable 类型对象以 `$$` 开头。
  - 使用 `Immutable.fromJS` 而不是 `Immutable.Map` 或 `Immutable.List` 来创建对象，这样可以避免 Immutable 和原生对象间的混用。

### 其他
- 两个 immutable 对象可以使用 `===` 来比较，这样是直接比较内存地址，性能最好。但即使两个对象的值是一样的，也会返回 `false`,比较值`Immutable.is(map1, map2)`
- 与 `Object.freeze`、`const` 区别(它们是ShallowCopy,对象层级深的话需要特殊处理)
- `Cursor`可以直接访问`Immutable数据`的深层引用

## 参考
[React 0.14 发布，拆分为 react 和 react-dom](http://segmentfault.com/a/1190000003830223)
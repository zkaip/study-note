JSX 使用说明
===
### JSX 是什么? 有哪些需要注意
JSX实际上是语法糖, 用`xml标签`写`Javascript`代码, 看上去结构更加清晰
一般来说,在项目上线前要把jsx代码转换成纯js代码,`gulp-react` 或 `react-tools`
**JSX 需要注意关键词**
由于`class`和`for`这两个`html标签`里的属性与`Javascript`关键词冲突, 所以需要用`className`和`htmlFor`代替
**JSX 会丢弃非标准属性,所以自定义属性需要添加 `data-` 前缀**
```html
<div data-custom-attribute="foo" />
```

### JSX 命名空间
一个组件有多个子组件，你希望这些子组件可以作为其父组件的属性，那么可以像这样用：
```javascript
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
这样你只需将子组件的ReactClass作为其父组件的属性：
```javascript
var MyFormComponent = React.createClass({ ... });

MyFormComponent.Row = React.createClass({ ... });
MyFormComponent.Label = React.createClass({ ... });
MyFormComponent.Input = React.createClass({ ... });
```
创建子元素可以直接交给JSX转化器：
```javascript
var App = (
    React.createElement(Form, null,
        React.createElement(Form.Row, null,
            React.createElement(Form.Label, null),
            React.createElement(Form.Input, null)
        )
    )
);
```
### JSX 不能使用`if`条件语句,会出现语法错误,可以使用三目运算符
```javascript
// This JSX:
<div id={if (condition) { 'msg' }}>Hello World!</div>

// Error: Is transformed to this JS:
React.createElement("div", {id: if (condition) { 'msg' }}, "Hello World!");
// 可以从转化后的Javascript代码中看出明显的语法错误，所以要不用三目运算符，要不就这样写：
if (condition) <div id='msg'>Hello World!</div>
else <div>Hello World!</div>
```
### JSX 使用`...`运算符
```js
var props = { foo: x, bar: y };
var component = <Component { ...props } />;
// 这样就相当于：
var component = <Component foo={x} bar={y} />

// 它也可以和普通的XML属性混合使用，需要同名属性，后者将覆盖前者：
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```
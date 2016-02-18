vuejs 1.0
===
## Vue 实例
### 构造器
`new Vue({})` 或者 `Vue.extend({})`
### 属性与方法
Vue实例会代理其`data`对象里的所有属性(属性不要以下划线开头)
暴露的属性及方法都有`$`前缀
- `实例属性`: `$data` `$el` `$options` `$parent` `$root` `$children` `$refs` `$els`
- `实例方法/数据`: `$watch` `$get` `$set` `$delete` `$eval` `$interpolate` `$log`
- `实例属性/事件`: `$on` `$once` `$off` `$emit` `$dispatch` `$broadcast`
- `实例方法/DOM`: `$appendTo` `$before` `$after` `$remove` `$nextTick`
- `实例方法/生命周期`: `$mount` `$destory`

### 实例生命周期
init
  => created
      => beforeCompile => compiled
                            => ready
                                (=> attached => detached)
                                                  => beforeDestory
                                                       => destoryed
`attached`/`detached`为$el元素插入/删除时调用该钩子函数
![生命周期](http://cn.vuejs.org/images/lifecycle.png)

## 数据绑定
(*Mustache*)
- **文本** `{{msg}}` `{{* msg}}只处理单次插值`
- **HTML** `{{{raw_html}}}`
- **HTML属性** `<div id="item-{{ id }}"></div>`
- **JavaScript** `{{ ok ? 'YES' : 'NO' }}`
- **过滤器(允许串联过滤器, 允许过滤器参数)** `{{ message | filterA | filterB }}` `{{ message | filterA 'arg1' arg2 }}`
- **指令** 以`v-`开头
  - `v-bind` 响应式的更新HTML特性 `<a v-bind:href="url"></a>` 缩写`:href`
  - `v-on` 监听DOM事件 `<a v-on:click="doSomething">` 缩写`@click`
  - `v-if` `<p v-if="greeting">Hello!</p>`
  - `v-show`
- **修饰符** `<a v-bind:href.literal="/a/b/c"></a>`
- **Class与Style绑定**
  - 绑定内联样式 `v-bind:style`,使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
  - 绑定`class` `v-bind:class` 或者 `class="{{ className }}"`(可以使用三元表达式,可以动态的切换className)

尽可能使用计算属性 `$computed` 而不使用 `$watch`
计算属性默认只是`getter`,也可以提供`setter`
```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 渲染
**条件渲染**
*v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。*
- `v-if`
- `template v-if`
- `v-show`
- `v-else`

**列表渲染**
- `v-for="item in items"` `$index`
- `v-for="(index,item) in items"`
- `template v-for`

数组变动方法
- 返回原始数组
  - `push()`
  - `pop()`
  - `shift()`
  - `unshift()`
  - `splice()`
  - `sort()`
  - `reverse()`
- 返回新数组
  - `filter()`
  - `concat()`
  - `slice()`


**数组跟踪**
- `track-by` 尽可能复用已有实例
- `track-by="$index"`，它强制让 v-for 进入原位更新模式：片断不会被移动，而是简单地以对应索引的新值刷新。

**对象** `v-for` `$key`(按照`Object.keys()`遍历)
**值** `v-for` 

## 方法与事件处理 `v-on` ($methods)
**禁止在层上滑动(比如：背景层，不想让用户滚动)**
```
@touchstart.stop.prevent
```

**如果要阻止默认事件，一定要写在前面，否则会影响其他事件绑定**
```
@touchmove.stop.prevent @click.stop="show=false"
```

- 方法处理器 **methods**
- 内联语句处理器 **限制为一个语句**
- **修饰符**
  - 事件修饰符
    - `stop` 阻止单击事件冒泡 `event.stopPropagation()`
    - `prevent` 提交事件不再重载页面 `event.preventDefault()`
    - `capture` 添加事件侦听器时使用 capture 模式(捕获模式)
    - `self` 只当事件在该元素本身（而不是子元素）触发时触发回调
  - 按键修饰符 `<input v-on:keyup.13="submit">`
    - `enter`
    - `tab`
    - `delete`
    - `esc`
    - `space`
    - `up`
    - `down`
    - `left`
    - `right`
    - 支持数字按键(`keyCode`)
    - 支持单字母按键 (1.0.8+)

## 表单控件绑定
可以用 `v-model `指令在表单控件元素上创建双向数据绑定。根据控件类型它自动选取正确的方法更新元素。
- `lazy`(在默认情况下，v-model 在input 事件中同步输入框值与数据，可以添加一个特性 lazy，从而改到在 change 事件中同步) `<input v-model="msg" lazy>`
- `number`(自动将用户的输入保持为数字) `<input v-model="age" number>`
- `debounce`(设置最小延时) `<input v-model="msg" debounce="500">`

## 过渡动画效果
为了应用过渡效果, 需要在目标元素上使用`transition`特性
`<div v-if="show" transition="my-transition"></div>`

**transition 特性可以与下面资源一起用：**
- v-if
- v-show
- v-for （只为插入和删除触发）
- 动态组件 （介绍见组件）
- 在组件的根节点上，并且被 Vue 实例 DOM 方法（如 vm.$appendTo(el)）触发。

**CSS过渡**
如果 `transition` 特性没有值，类名默认是 `.v-transition`, `.v-enter` 和 `.v-leave`。
- `.fade-transition` 始终保留在元素上。
- `.fade-enter` 定义进入过渡的开始状态。只应用一帧然后立即删除。
- `.fade-leave` 定义离开过渡的结束状态。在离开过渡开始时生效，在它结束后删除。

**自定义过渡类名(1.0.14 新增)**
```javascript
Vue.transition('bounce', {
  enterClass: 'bounceInLeft',
  leaveClass: 'bounceOutRight'
})
```

**显式声明 CSS 过渡类型**
`type: 'animation/transition'`

**javascript钩子函数**
```javascript
Vue.transition('expand', {
  beforeEnter: function (el) {
    el.textContent = 'beforeEnter'
  },
  enter: function (el) {
    el.textContent = 'enter'
  },
  afterEnter: function (el) {
    el.textContent = 'afterEnter'
  },
  enterCancelled: function (el) {
    // handle cancellation
  },

  beforeLeave: function (el) {
    el.textContent = 'beforeLeave'
  },
  leave: function (el) {
    el.textContent = 'leave'
  },
  afterLeave: function (el) {
    el.textContent = 'afterLeave'
  },
  leaveCancelled: function (el) {
    // handle cancellation
  }
})
```

**CSS动画**
在动画中 `v-enter` 类名在节点插入 `DOM` 后不会立即删除，而是在 animationend 事件触发时删除。
```css
.bounce-transition {
  display: inline-block; /* 否则 scale 动画不起作用 */
}
.bounce-enter {
  animation: bounce-in .5s;
}
.bounce-leave {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
```

**JavaScript过渡**
如果仅使用JavaScript钩子, 则需要显式声明`css:false`
`enter` 和 `leave` 钩子需要调用 `done` 回调，否则它们将被同步调用，过渡将立即结束。
```javascript
Vue.transition('fade', {
  css: false,
  enter: function (el, done) {
    // 元素已被插入 DOM
    // 在动画结束后调用 done
    $(el)
      .css('opacity', 0)
      .animate({ opacity: 1 }, 1000, done)
  },
  enterCancelled: function (el) {
    $(el).stop()
  },
  leave: function (el, done) {
    // 与 enter 相同
    $(el).animate({ opacity: 0 }, 1000, done)
  },
  leaveCancelled: function (el) {
    $(el).stop()
  }
})
```

**渐近过渡**
`transition` 与 `v-for` 一起用时可以创建渐近过渡。给过渡元素添加一个特性 `stagger`, `enter-stagger` 或 `leave-stagger`

`<div v-for="item in list" transition="stagger" stagger="100"></div>`

或者，提供一个钩子 `stagger`, `enter-stagger` 或 `leave-stagger`，以更好的控制：
```javascript
Vue.transition('stagger', {
  stagger: function (index) {
    // 每个过渡项目增加 50ms 延时
    // 但是最大延时限制为 300ms
    return Math.min(300, index * 50)
  }
})
```

## 组件 Component
### 注册组件
`Vue.extend()` `Vue.component(tag, constructor) `
**注册**
```javascript
// 定义
var MyComponent = Vue.extend({
  template: '<div>A custom component!</div>'
})

// 注册
Vue.component('my-component', MyComponent)

// 创建根实例
new Vue({
  el: '#example'
})
```

**局部注册**
```javascript
var Child = Vue.extend({ /* ... */ })

var Parent = Vue.extend({
  template: '...',
  components: {
    // <my-component> 只能用在父组件模板内
    'my-component': Child
  }
})
```

**注册语法糖**
```javascript
// 在一个步骤中扩展与注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 局部注册也可以这么做
var Parent = Vue.extend({
  components: {
    'my-component': {
      template: '<div>A custom component!</div>'
    }
  }
})
```

### 组件选项
`el` `data`: 必须 返回 **函数**

`is`特性:一些 HTML 元素，如 `<table>`，限制什么元素可以放在它里面。自定义元素不在白名单上，将被放在元素的外面，因而渲染不正确。这时应当使用 is 特性，指示它是一个自定义元素

### Props
**使用Props传递数据**: “prop” 是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用 props 选项 声明 props
**驼峰写法的JS属性需要转换成短横杠写法的HTML属性**
**动态Props**: `v-bind:my-message` 或 `:my-message`
**传递数值需要使用动态Props方法**

**Props绑定修饰符**
```html
<!-- 默认为单向绑定 -->
<child :msg="parentMsg"></child>

<!-- 双向绑定 -->
<child :msg.sync="parentMsg"></child>

<!-- 单次绑定 -->
<child :msg.once="parentMsg"></child>
```

**Props验证**
`type`: `String` `Number` `Boolean` `Function` `Object` `Array` `instanceof`
`default`
`twoWay`
`自定义函数`

### 父子组件通讯
尽量显示的通过`Props`传递数据, 不使用实例
- `this.$parent` 子组件用`this.$parent`访问它的父组件
- `this.$root` 根实例的后代可以用 this.$root 访问它
- `this.$children` 父组件有一个数组 this.$children，包含它所有的子元素

**自定义事件** 可以使用 `v-on`绑定自定义事件 `<child v-on:child-msg="handleIt"></child>`
Vue 实例实现了一个自定义事件接口，用于在组件树中通信。
每个 Vue 实例都是一个事件触发器：
- 使用 `$on()` 监听事件；
- 使用 `$emit()` 在它上面触发事件；
- 使用 `$dispatch()` 派发事件，事件沿着父链冒泡；
- 使用 `$broadcast()` 广播事件，事件向下传导给所有的后代。

**子组件索引** `v-ref`
**v-ref 和 v-for 一起用时，ref 是一个数组或对象，包含相应的子组件。**

### 使用 Slot 分发内容
父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译

**单个Slot**
`<slot>` 标签的内容视为回退内容。回退内容在子组件的作用域内编译，只有当宿主元素为空并且没有内容供插入时显示。

**Slot的name**
`<slot>` 元素有一个特殊特性 `name`，用于配置如何分发内容。多个 `slot` 可以有不同的名字。命名 `slot` 将匹配有对应 `slot` 特性的内容片断。

### 动态组件
多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 `is` 特性
- `keep-alive` 把切换出去的组件保留在内存中, 可以保留它的状态或避免重新渲染
- `activate 钩子` 在切换组件时，切入组件在切入前可能需要进行一些异步操作。为了控制组件切换时长，给切入组件添加 `activate` 钩子, `activate` 钩子只作用于动态组件切换或静态组件初始化渲染的过程中，不作用于使用实例方法手工插入的过程中。
- `transition-mode` 特性用于指定两个动态组件之间如何过渡。在默认情况下，进入与离开平滑地过渡。这个特性可以指定另外两种模式：
  - `in-out`：新组件先过渡进入，等它的过渡完成之后当前组件过渡出去。
  - `out-in`：当前组件先过渡出去，等它的过渡完成之后新组件过渡进入。

```html
<!-- 先淡出再淡入 -->
<component
  :is="view"
  transition="fade"
  transition-mode="out-in">
</component>
```
```css
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
```

### 杂项
**组件和`v-for`**: 不能传递数据给组件，因为组件的作用域是孤立的。为了传递数据给组件，应当使用 props

**编写可复用组件**
Vue.js 组件 API 来自三部分——prop，事件和 slot：
- `prop` 允许外部环境传递数据给组件；
- 事件 允许组件触发外部环境的 `action`
- `slot` 允许外部环境插入内容到组件的视图结构内。

**异步组件**
在大型应用中，我们可能需要将应用拆分为小块，只在需要时才从服务器下载。为了让事情更简单，Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。

推荐配合使用 Webpack 的代码分割功能：
```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```

**资源命名约定**
`Vue.js` 支持资源的名字使用 `camelCase` 或 `PascalCase` 的形式，并且在模板中自动将它们转为 `kebab-case`（类似于 `prop` 的命名约定）

**递归组件**
组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以：

**片断实例**
在使用 `template` 选项时，模板的内容将替换实例的挂载元素。因而推荐模板的顶级元素始终是单个元素。
**组件元素上的非流程控制指令，非 prop 特性和过渡将被忽略**

**内联模板**
如果子组件有 `inline-template` 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板更灵活。

**template**
- 在vue组件 template 中不能出现 `<` 字符, 如果有此字符，那么在使用webpack.optimize.UglifyJsPlugin压缩的时候，编译会报错
- vue文件的，template模版中，注释的html里面如果有img标签，相关资源也会被打包。
- 尽量少用`<template>`,使用过多容易造成渲染过慢

**压缩，发布生产的时候，设置 `Vue.config.debug = false;` 去除注释，因为某些安卓机型里面，可能会出现莫名奇妙的问题。**

**关于版本控制**
参考：[http://webpack.github.io/docs/long-term-caching.html](http://webpack.github.io/docs/long-term-caching.html)

[https://github.com/teambition/coffee-webpack-starter/blob/92082085d96f6c5003711e042da38bfa140d8dd6/webpack.min.coffee#L21](https://github.com/teambition/coffee-webpack-starter/blob/92082085d96f6c5003711e042da38bfa140d8dd6/webpack.min.coffee#L21)

```javascript
 plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash:8].js'),
    new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
    new ExtractTextPlugin("style.[chunkhash:8].css"),
    function() {
      return this.plugin('done', function(stats) {
        var content;
        content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2);
        return fs.writeFileSync('build/assets.json', content);
      });
    }
  ]
```

## 混合 Mixin
**选项合并**
子函数钩子混合: 混合的钩子将在组件自己的钩子之前调用
同名对象混合: 组件自身对象优先

**全局混合** `Vue.mixin()`
也可以全局注册混合。小心使用！一旦全局注册混合，它会影响所有之后创建的 Vue 实例。如果使用恰当，可以为自定义选项注入处理逻辑

**自定义选项合并**
子函数钩子混合:(默认简单覆盖, 可以自定义逻辑)
```javascript
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回 mergedVal
}
```
同名对象混合,可以简单的使用`methods`所用的合并策略
```javascript
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```

## 自定义指令
可以用 `Vue.directive(id, definition)` 方法注册一个全局自定义指令，它接收两个参数 **指令 ID** 与 **定义对象**。也可以用组件的 `directives` 选项注册一个局部自定义指令。

**钩子函数**(可选)
- bind：只调用一次，在指令第一次绑定到元素上时调用。
- update： 在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值。
- unbind：只调用一次，在指令从元素上解绑时调用。

```javascript
Vue.directive('my-directive', {
  bind: function () {
    // 准备工作
    // 例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update: function (newValue, oldValue) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次
  },
  unbind: function () {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
  }
})
```
`<div v-my-directive="someValue"></div>`
当只需要 `update` 函数时，可以传入一个函数替代定义对象：

**指令实例属性**
所有的钩子函数都将被复制到实际的 **指令对象** 中,钩子中的`this`指向这个指令对象, 该对象暴露以下属性(应当视为只读不要修改)
- `el`: 指令绑定的元素。
- `vm`: 拥有该指令的上下文 ViewModel。
- `expression`: 指令的表达式，不包括参数和过滤器。
- `arg`: 指令的参数。
- `name`: 指令的名字，不包含前缀。
- `modifiers`: 一个对象，包含指令的修饰符。
- `descriptor`: 一个对象，包含指令的解析结果。

**对象字面量**
如果指令需要多个值，可以传入一个 `JavaScript` 对象字面量。记住，指令可以使用任意合法的 `JavaScript` 表达式

**字面修饰符**
当指令使用了字面修饰符，它的值将按普通字符串处理并传递给 update 方法。update 方法将只调用一次，因为普通字符串不能响应数据变化。

**元素指令** `Vue.elementDirective()`
元素指令是终结性的，这意味着，一旦 `Vue` 遇到一个元素指令，它将跳过该元素及其子元素——只有该元素指令本身可以操作该元素及其子元素。
`<my-directive></my-directive>`
```javascript
Vue.elementDirective('my-directive', {
  // API 同普通指令
  bind: function () {
    // 操作 this.el...
  }
})
```

**高级选项**
- `params` 自定义指令可以接收一个 `params` 数组，指定一个特性列表，`Vue` 编译器将自动提取绑定元素的这些特性。
- `deep` 如果自定义指令用在一个对象上，当对象内部属性变化时要触发 `update`，则在指令定义对象中指定 `deep: true`
- `twoWay` 如果想向Vue实例写回数据,则在指令定义对象中指定`twoWay:true`,则指令中可以使用`this.set(val)`
- `acceptStatement` 让自定义指令接受内联语句
- `priority` 给指令指定一个优先级, 默认为`1000`, 流程控制指令始终拥有最高级

## 自定义过滤器
- `Vue.filter()`注册过滤器, 接收参数 **过滤器ID** 和 **过滤器函数**
- **双向过滤器**: **read** **write**
- **动态参数**: 如果过滤器参数没有用引号包起来，则它会在当前 vm 作用域内动态计算。另外，过滤器函数的 this 始终指向调用它的 vm。
- 内置过滤器 **filterBy** **orderBy**

## 插件
- 开发插件(插件通常有以下几种)
  - 添加全局方法或属性，如 vue-element
  - 添加全局资源：指令/过滤器/过渡等，如 vue-touch
  - 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
  - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 vue-router
- 使用插件 `Vue.use(pluginName, options)`
- 已有插件及工具
  - `vue-router`：Vue.js 官方路由。与 Vue.js 内核深度整合，让构建单页应用易如反掌。
  - `vue-resource`：通过 XMLHttpRequest 或 JSONP 发起请求并处理响应。
  - `vue-async-data`：异步加载数据插件。
  - `vue-validator`：表单验证插件。
  - `vue-devtools`：Chrome 开发者工具扩展，用于调试 Vue.js 应用。
  - `vue-touch`：使用 Hammer.js 添加触摸手势指令（已过时）。
  - `vue-element`：使用 Vue.js 注册自定义元素。

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = ...
  // 2. 添加全局资源
  Vue.directive('my-directive', {})
  // 3. 添加实例方法
  Vue.prototype.$myMethod = ...
}
```

---

vue-router
===
## 杂项
路由配置时不要使用下划线




















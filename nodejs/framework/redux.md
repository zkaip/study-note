Redux
===
## Redux 介绍
**严格的单向数据流**
### 三大原则
- 单一数据源 store <= dispatch(action)
  - 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
- State是只读的 action
  - 惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
- 使用纯函数来执行修改 逻辑层 reducer
  - 为了描述 action 如何改变 `state tree` ，你需要编写 `reducers`

## Redux 基础
### Action
Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的 **唯一来源**。一般来说你会通过 `store.dispatch()` 将 action 传到 store。

**我们应该尽量减少在 action 中传递的数据。**

Action 创建函数 就是生成 action 的方法。只会返回`action`对象, 是纯函数
只需把 action 创建函数的结果传给 dispatch() 方法即可实例化 dispatch

可以 创建一个 **被绑定的 action 创建函数** 来自动 dispatch, 然后直接调用它们

`bindActionCreators()` 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。

### Reducer
> 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同数据相互引用时通过 ID 来查找。把应用的 state 想像成数据库。

**reducer 就是一个函数，接收旧的 state 和 action，返回新的 state。**
**永远不要在 reducer 里做这些操作**：
- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转。

**reducer 一定要保持纯净。只要传入参数一样，返回必须一样。没有特殊情况、没有副作用，没有 API 请求、没有修改参数，单纯执行计算。**

- 不要修改 state(Object.assign() _assign())
- 在 default 情况下返回旧的 state
- 如果需要更新数组中的一项数据, 需要把数组切开,或者使用  React.addons.update，updeep，或者 Immutable

### Store
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器。

**Redux 应用只有一个单一的 store。当需要拆分处理数据的逻辑时，使用 reducer 组合 而不是创建多个 store。**

### Redux 数据流
Redux 应用中 **数据的生命周期**遵循下面 4 个步骤：
- 调用 store.dispatch(action)。
- Redux store 调用传入的 reducer 函数。
- 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
- Redux store 保存了根 reducer 返回的完整 state 树。

### Redux & React
`npm install --save react-redux`
**明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入。**

 | 容器组件 | 展示组件
 :---:|:---:|:---:
Location | 最顶层，路由处理 | 中间和子组件
Aware of Redux | 是 | 否
读取数据 | 从 Redux 获取 state | 从 props 获取数据
修改数据 | 向 Redux 派发 actions | 从 props 调用回调函数

## Redux 高级
### 异步 Action
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }

同步 Action Creator
设计 state 结构: 如果你有嵌套内容，或者用户可以编辑接收到的内容，你需要把它们分开存放在 state 中，就像数据库中一样。

你可以使用任意多异步的 middleware 去做你想做的事情，但是需要使用普通对象作为最后一个被 dispatch 的 action ，来将处理流程带回同步方式

### Middleware
它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。
- 它只暴露一个 store API 的子集给 middleware：dispatch(action) 和 getState()。
- 它用了一个非常巧妙的方式来保证你的 middleware 调用的是 store.dispatch(action) 而不是 next(action)，从而使这个 action 会在包括当前 middleware 在内的整个 middleware 链中被正确的传递。这对异步的 middleware 非常有用，正如我们在之前的章节中提到的。
- 为了保证你只能应用 middleware 一次，它作用在 createStore() 上而不是 store 本身。因此它的签名不是 (store, middlewares) => store， 而是 (...middlewares) => (createStore) => createStore。

## Redux 技巧
### 减少样板模板
- Actions 定值
- Action Creators 创建函数
- 生成 Action Creators 生成器生成, redux-action-utils 和 redux-actions
- 生成 Reducers

### 服务端渲染
把数据发送到客户端，需要以下步骤：
**Redux 在服务端惟一要做的事情就是，提供应用所需的初始 state。**
- 为每次请求创建全新的 Redux store 实例；
- 按需 dispatch 一些 action；
- 从 store 中取出 state；
- 把 state 一同返回给客户端。

### 计算衍生数据(防止重复计算)
`import { createSelector } from 'reselect';`
- 创建可记忆的 Selector
- 组合 Selector
- connect 连接 selector 和 Redux store

### 实现撤销重做
- 你想要跟踪的 state 子树不会包含多个模型（models—just）。
- state 是不可变的，所有修改已经被描述成分离的 action，而这些 action 与预期的撤销堆栈模型很接近了。
- reducer 的签名 (state, action) => state 让它可以自然的实现 “reducer enhancers” 或者 “higher order reducers”。它们可以让你在为 reducer 添加额外的功能时保持这个签名。撤消历史就是一个典型的应用场景。

**Reducer Enhancer**

## Redux 排错
- 永远不要直接修改 reducer 的参数
- 不要忘记调用 dispatch(action)

## Redux 词汇表
### State
State (也称为 state tree) 是一个宽泛的概念，但是在 Redux API 中，通常是指一个唯一的 state 值，它表示了 Redux 应用的全部状态，通常为一个多层嵌套的对象。

`type State = any`

可由`getState()`获得, 尽可能保证`state`可以被序列化

### Action
Action 是一个普通对象，用来表示即将改变 state 的意图。它是将数据放入 store 的唯一途径。无论是从 UI 事件、网络回调，还是其他诸如 WebSocket 之类的数据源所获得的数据，最终都会被 dispatch 成 action。

`type Action = Object`

action 必须拥有一个 `type` 域, 可参考[Flux Standard Action](https://github.com/acdlite/flux-standard-action)构建标准的`Action`

### Reducer
Reducer (也称为 reducing function) 函数接受两个参数：之前累积运算的结果和当前被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。

`type Reducer<S, A> = (state: S, action: A) => S`

**不要在 reducer 中有 API 调用**

### dispatch 函数
```javascript
type BaseDispatch = (a: Action) => Action
type Dispatch = (a: Action | AsyncAction) => any
```

dispatching function (或简言之 dispatch function) 是一个接收 action 或者异步 action的函数，该函数要么往 store 分发一个或多个 action，要么不分发任何 action。

`Base dispatch function` **总是同步**地把 action 与上一次从 store 返回的 state 发往 reducer，然后计算出新的 state。它期望 action 会是一个可以被 reducer 消费的普通对象。

### Action Creator
`type ActionCreator = (...args: any) => Action | AsyncAction`

Action Creator 很简单，就是一个创建 action 的函数。

如果 action creator 需要读取当前的 state、调用 API、或引起诸如路由变化等副作用，那么它应该返回一个异步 action而不是 action。

### 异步 Action
`type AsyncAction = any`

异步 action 是一个发给 dispatching 函数的值，但是这个值还不能被 reducer 消费。
在发往 base dispatch() function 之前，middleware 会把异步 action 转换成一个或一组 action。

### Middleware
```javascript
type MiddlewareAPI = { dispatch: Dispatch, getState: () => State }
type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch
```

Middleware 是一个组合 dispatch function 的高阶函数，返回一个新的 dispatch function，通常将异步 actions 转换成 action。

### Store
```javascript
type Store = {
  dispatch: Dispatch
  getState: () => State
  subscribe: (listener: () => void) => () => void
  replaceReducer: (reducer: Reducer) => void
};
```

Store 维持着应用的 state tree 对象。 因为应用的构建发生于 reducer，所以一个 Redux 应用中应当只有一个 Store。
- `dispatch(action)` 是上述的 base dispatch function。
- `getState()` 返回当前 store 的 state。
- `subscribe(listener)` 注册一个 state 发生变化时的回调函数。
- `replaceReducer(nextReducer)` 可用于热重载荷和代码分割。通常你不需要用到这个 API。

### Store Creator
`type StoreCreator = (reducer: Reducer, initialState: ?State) => Store`
Store creator 是一个创建 Redux store 的函数


### Store enhancer
`type StoreEnhancer = (next: StoreCreator) => StoreCreator`
Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。

## Redux API
`import { createStore } from 'redux';`
- 顶级 API
  - createStore(reducer, [initialState])
  - combineReducers(reducers)
  - applyMiddleware(...middlewares)
  - bindActionCreators(actionCreators, dispatch)
  - compose(...functions) 从右到左来组合多个函数。
- Store API
  - Store
    - getState()
    - dispatch(action)
    - subscribe(listener)
    - getReducer()
    - replaceReducer(nextReducer)

## React-redux 
### 排错
#### View 不更新的问题
- Reducer 永远不应该更改原有 state，应该始终返回新的对象
- 确保你使用了 connect() 的 mapDispatchToProps 参数或者 bindActionCreators 来绑定 action creator 函数

#### React Router 0.13 的 route 变化中，view 不更新
当使用 <RouteHandler> 或者 Router.run 提供的 Handler 时，不要忘记传递 router state

#### Redux 外部的一些东西更新时，view 不更新
- 最好的解决方案是保持组件的纯净，并且所有外部的 state 都应通过 props 传递给它们。
- 当不可抗力导致上述解法无法实现时（比如，你使用了严重依赖 React context 的外部库），你可以设置 connect() 的 pure: false 

#### 在 context 或 props 中都找不到 “store”
- 确保你没有引入多个 React 实例 到页面上。
- 确保你没有忘记将根组件包装进 <Provider>。
- 确保你运行的 React 和 React Redux 是最新版本。

#### Invariant Violation：addComponentAsRefTo(...)：只有 ReactOwner 才有 refs。这通常意味着你在一个没有 owner 的组件中添加了 ref

如果你在 web 中使用 React，就通常意味着你引用了两遍 React。按照这个链接解决即可。

## 参考
- [Redux 介绍](http://segmentfault.com/a/1190000003503338#articleHeader5)








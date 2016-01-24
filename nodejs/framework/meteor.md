Meteor 学习笔记
===
### 什么是Meteor?
[Meteor](http://meteor.com/)是高性能Javascript全端开发框架
**优势:**
- Javascript 全平台单一语言开发
- 跨平台开发 iOS Android Browser Mobile
- 热部署
- 前后端可以同时操作数据库
- 实时系统
- 代码压缩混淆部署都由Meteor透明完成
- 可以使用npm扩展

### Meteor Collections(数据库 Mongodb)
每个Collections对应MongoDB的一个表
**Create**
> Languages=new Mongo.Collection('languages');

**增删改查**
```javascript
Languages.insert({})
Languages.find({})
Languages.remove({})
Languages.update()
```

### html,css,js
Meteor规定，在一个模板文件里，只能出现三种顶层标签：`head`、`body`和`template`。css样式最终也会合并后呈现给用户.
最终, Meteor会编译合并后呈现给用户.

**模板语言**
{{spacebars}} 基于流行的`handlebars`,`{{> hello}}`模板标签用来调用一个子模板

**加载顺序**
- 应用程序根目录下的 lib 目录里的文件最先加载。
- 然后是所有文件名匹配 main.* 的文件。
- 子目录里的文件在父目录之前加载，所以先加载最深层的文件，根目录下的文件最后加载。
- 在一个目录中，文件按照文件名的字母顺序加载。

### 目录结构
- **client** 参与打包的前端代码文件夹, 相当与使用`if(Meter.isClient){...}`进行前端代码隔离的效果
- **server** 参与打包的后端代码文件夹, 相当与使用`if(Meter.isServer){...}`进行后端代码隔离的效果, 敏感代码(如身份验证)放在此目录
- **public** 不参与打包的前端资源文件夹,相当于`http`虚拟根目录
- **client/compatibility** 不参与打包的前端兼容库目录, 全局var变量,会在其他前端`JavaScript`文件之前执行
- **test** 仅用于测试,前后端都不会使用

### Meteor 函数
**helper**
```html
<template name="test">
  <h1>Hello,{{displayName "Jason" "Mr."}}!</h1>
</template>
```
```javascript
//JS声明如下
Template.test.helpers({
  'displayName' : function(name,title){
    return title + ' ' + name;
  }
});
```
// 渲染后
```html
<h1>Hello,Mr. Jason!</h1>
```
**Meteor.flush** 使DOM立刻更新
**Meteor.render** 渲染HTML
**preserve** 指定模板重新渲染后保留的元素
### Meteor 安全
**封装直接操作数据库操作方法**
`meteor remove insecure`
```javascript
Meteor.methods({
    // 增删改查
    // 权限验证
    method_name:function(...args){},...
});
Meteor.call('method_name',..args);
```
**禁用自动发布**
`meteor remove autopublish`
```javascript
if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find();
  });
}
 
if (Meteor.isClient) {
  Meteor.subscribe("tasks");
}
```
### [Meteor 部署](https://github.com/MeteorChina/FAQ/blob/master/faqs/meteor-deploy.md)
**`meteor deploy`**
支持自定义域名, 可以操作服务器上的mongodb
**自定义部署** [meteor-up](http://cmeteor.org/t/meteor-npm/31)
```
$ meteor #1 先保证应用是可以执行运行的
$ meteor build --directory ../rel # 构建 Node.js 项目
$ cd  ../rel/bundle

# 该目录下 README 有详细的介绍
$ (cd programs/server && npm install)
$ export MONGO_URL='mongodb://user:password@host:port/databasename'
$ export ROOT_URL='http://example.com'
$ export MAIL_URL='smtp://user:password@mailhost:port/'
$ export PORT=3000 # 默认 80
$ node main.js
```
### F&Q
#### 如何使用`npm package`?

请在[AtmosphereJS](https://atmospherejs.com)上搜索有无相关的封装包。**尽量采用已有的封装包，而不是自己封装。**

有两种方法在项目中使用来自npm的模块。

1. 封装为Meteor包并在项目中添加包。使用`meteor create 包名 --package`来创建包，并通过将包目录放置于项目的`packages`文件夹等方法向项目引入包。包中使用`Npm.depends`和`Npm.require`来引入npm模块。[Meteor文档-包中引入Npm模块](http://docs.meteor.com/#/full/Npm-depends) http://cmeteor.org/t/meteor-npm/31
2. 使用`meteorhacks:npm`。[meteorhacks:npm @ AtmosphereJS](https://atmospherejs.com/meteorhacks/npm)

#### 如何使用Cordova插件？
一般在 http://plugins.cordova.io 上搜索插件包时就会提供插件包的全名和版本号。

`meteor add cordova:org.apache.cordova.media@0.2.16`

注意包名前要加cordova: 包名后要加@版本号

#### 如何在一个域名下使用多个的APP?
Meteor的localstorage package存储代码:
```javascript
if (key === retrieved) {
  Meteor._localStorage = {
    getItem: function (key) {
      return window.localStorage.getItem(key);
    },
    setItem: function (key, value) {
      window.localStorage.setItem(key, value);
    },
    removeItem: function (key) {
      window.localStorage.removeItem(key);
    }
  };
}
```
这样会导致app1和app2的value被覆盖
改成:
```javascript
if (key === retrieved) {
  var path = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1') + '.';
  Meteor._localStorage = {
    getItem: function (key) {
      return window.localStorage.getItem(path + key);
    },
    setItem: function (key, value) {
      window.localStorage.setItem(path + key, value);
    },
    removeItem: function (key) {
      window.localStorage.removeItem(path + key);
    }
  };
}
```
则最终 `www.example.com/app1` & `www.example.com/app2` 的`value`
```javascript
app1.Meteor.userId
app1.Meteor.loginToken
app1.Meteor.loginTokenExpires
app2.Meteor.userId
app2.Meteor.loginToken
app2.Meteor.loginTokenExpires
```
参考: [搭建MutilMeteorApps](https://cnodejs.org/topic/52131a200a746c580b4cba7e)
#### 触发界面更新的reactive数据源有哪些?reactive上下文运行的函数有哪些?
Meteor函数会在reactive上下文中运行你的代码:
- Templates
- Meteor.render 和 Meteor.renderList
- Meteor.autosubscribe
- Meteor.autorun

能够触发变化的reactive数据源：
- Session variables
- Database queries on Collections
- Meteor.status
- Meteor.user
- Meteor.userId
- Meteor.loggingIn
**可以用Meteor.deps模块“勾入”到上下文中，以增加新的reactive上下文和数据源。**

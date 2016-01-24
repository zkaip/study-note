Visual Studio Code 写前端代码
===
### VSC 简介
VSC内置`emmet`,对`Less``Sass`都有很好的支持, 支持`DEBUG` `多屏调试`, 与`Git`有良好的集成, `智能提示`相当强大(结合`.d.ts`文件后)

### 智能提示
手动引入
```
npm install -g tsd
tsd query angular --action install
```
自动引入 `ctrl+k`

### DEBUG
1. 打开要调试的文件，按f5,编辑器会生成一个launch.json
2. 修改`launch.json`相关内容，主要是name和program字段，改成和你项目对应的
3. 点击编辑器左侧长得像蜘蛛的那个按钮
4. 点击左上角DEBUG后面的按钮，启动调试
5. 打断点，尽情调试

### API查看
1. Help > Toggle Developer Tools > Console
2. var url = require('url');
3. url.parse

### 默认快捷键
- 自动补全 command + SPACE
- 快速打开文件 command + o
- 快速定位文件 command + p
- 分割编辑窗口 command + \
- 关闭当前窗口 command + w
- 隐藏二级菜单 command + b
- 放大 command + =
- 缩小 command + -
- 插入表情 ctrl + command + space

搜索
- 当前文档里搜索 command + -
- 所有文档里搜索 shift + command + -

### snippets
`User/snippets/javascript.json`
自定义 snippets
```javascript
 // Place your snippets for JavaScript here. Each snippet is defined under a snippet name and has a prefix, body and 
 // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
 // $1, $2 for tab stops, ${id} and ${id:label} and ${1:label} for variables. Variables with the same id are connected.
 // Example:
 "Print to console": {
    "prefix": "log",
    "body": [
        "console.log('$1');",
        "$2"
    ],
    "description": "Log output to console"
}
```
- "Print to console" 是智能提示显示的
- "prefix" 是用户输入的字母，比如本例中输入log自动提示
- 当用户触发此snippet的时候，会按照"body"里代码生成
- $1代表光标位置

### 支持 ES6
项目根目录建立文件`jsconfig.json`，内容为
```json
{
    "compilerOptions":{
        "target":"ES6",
        "module":"commonjs"
    }
}
```
*嫌麻烦的话可以安装下@hellopao 写的模块jsf，通过命令行来生成该文件**
```sh
npm install jsf -g
jsf
```
### 参考
[](http://i5ting.github.io/vsc/)

### [node debugger](https://nodejs.org/api/debugger.html)
`node debug <jsname>`
- 需要在程序代码中手动添加中断debugger;
- 这样当以调试模式运行时，程序会自动中断，然后等候你调试
- 就像GDB一样，可以用help命令查看自己都可以使用哪些调试命令。
- 此时repl打开js上下文即时求值环境，和chrome的debug的console是一样的。
- 如果想退出，请按下ctrl + c,这样就可以返 到debug模式
- `ps -ef|grep debug-brk|awk '{print $2}'|xargs kill -9` 强制杀掉debug进程

```sh
node-debug-tutorial git:(master) ✗ node debug helloword-debug.js
< debugger listening on port 5858
connecting... ok
break in helloword-debug.js:1
  1 var hello = 'hello';
  2 var world = 'nodejs';
  3 
debug> help
Commands: run (r), cont (c), next (n), step (s), out (o), backtrace (bt), setBreakpoint (sb), clearBreakpoint (cb),
watch, unwatch, watchers, repl, restart, kill, list, scripts, breakOnException, breakpoints, version
debug> 
debug> n
break in helloword-debug.js:2
  1 var hello = 'hello';
  2 var world = 'nodejs';
  3 
  4 debugger;
debug> repl
Press Ctrl + C to leave debug repl
> hello
'hello'
```

可选项 | 用途
---|---
run | 执行脚本,在第一行暂停
restart | 重新执行脚本
cont, c | 继续执行,直到遇到下一个断点
next, n | 单步执行
step, s | 单步执行并进入函数
out, o | 从函数中步出
setBreakpoint(), sb() | 当前行设置断点
setBreakpoint(‘f()’), sb(...) | 在函数f的第一行设置断点
setBreakpoint(‘script.js’, 20), sb(...) | 在 script.js 的第20行设置断点
clearBreakpoint, cb(...) | 清除所有断点
backtrace, bt | 显示当前的调用栈
list(5) | 显示当前执行到的前后5行代码
watch(expr) | 把表达式 expr 加入监视列表
unwatch(expr) | 把表达式 expr 从监视列表移除
watchers | 显示监视列表中所有的表达式和值
repl | 在当前上下文打开即时求值环境
kill | 终止当前执行的脚本
scripts | 显示当前已加载的所有脚本
version | 显示v8版本

### node inspector
通过`websocket`方式向debug输入输出
- `npm install -g node-inspector`
- `node-inspector &`默认会监听8080端口，当然，也可能通过使用--web-port参数来修改。
- `node --debug-brk app.js` 或者`node-debug app.js`
- 控制台会返回“debugger listening on port 5858”
- 打开浏览嚣，访问http://localhost:8080/debug?port=5858，这时候就会打开一个很像Chrome内置调试工具的界面，并且代码断点在第一行，下面就可以使用这个来调试了。

常用调试功能
- 增加断点，查看调用栈，变量等
- 使用console打印查看日志
- 使用方法和`chrome`的`inspect element`调试`web`开发是一样的。
- 可以远程调试。

断点操作
- resume script execution（F8） 挂起断点，也可以理解为放弃当前断点，如果有下一个断点，会自动断住得
- step over（F10） 跳过这行，到下一行，如果当前函数结束，会跳到调用栈的上一级的下一行
- step into（F11） 进入当前行代码里的函数内部
- step out（Shift + F11） 从当前函数退出到之前进入的代码处

控制台操作
- 不能使用var，直接打印变量即可

### 测试驱动开发
- tdd
- bdd
- 代码覆盖率

#### 测试框架
- nodeunit
- mocha 首选

#### 代码覆盖率
```sh
npm install --save-dev gulp
npm install --save-dev gulp-mocha
npm install --save-dev gulp-istanbul
```

```js
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha'); 

gulp.task('test', function (cb) {
  gulp.src(['db/**/*.js'])
    .pipe(istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('default',['test'], function() {
  gulp.watch(['./db/**/*','./test/**/*'], ['test']);
});

gulp.task('watch',['test'], function() {
  gulp.watch(['./db/**/*','./test/**/*'], ['test']);
});
```

"scripts": { "test": "./node_modules/.bin/mocha -u tdd" },

### 第三方工具
[Alinode](http://alinode.aliyun.com/)
[OneApm](http://www.oneapm.com/)
Gulp的使用
===
### 安装
> npm install gulp 

### gulp with ES6
> npm install babel-core <br>
> mv gulpfile.js gulpfile.babel.js <br>
> .js can be writen by ES6

### gulp with project
#### core
- `gulp` 核心文件
- `babel-core` js => ES6
- `gulp-load-plugins` 加载`package.json`中的依赖文件

#### js css html
- `gulp-uglify` AND `gulp-minify-css gulp-cssshrink` AND `gulp-minify-html` 压缩js css html
- `jshint` js语言错误检测
- `sprity sproty-sass` css雪碧图生成
- `auto-prefixer` css自动生成浏览器兼容性前缀
- `gulp-sass` AND `gulp-less`  sass less => css
- `gulp-sourcemaps` 生成map文件

#### file
- `gulp-rename` 重命名
- `gulp-clean` 删除文件
- `gulp-imagemin imagemin-pngquant` 图片压缩
- `gulp-tinypng` 调用`tinppng`API压缩图片
- `vinyl-source-stream` 引入nodejs文件并转换成vinyl数据流
- `gulp-concat` 合并文件

#### project
- `browser-sync` 浏览器同步刷新
- `gulp-rev gulp-rev-collector gulp-static-hash` 版本控制
- `gulp-zip` 代码文件打包上传
- `opn` 使用浏览器打开
- `gulp-sftp` 上传到ftp服务器
- `gulp-qn` 七牛云存储
- `gulp-webpack` webpack打包
- `gulp-notify` 消息提醒
- `gulp-plumber` 忽略错误继续执行

#### others
- `gulp-if` 逻辑**if**
- `run-sequence` 顺序执行任务
- [gulp-gh-pages](https://cnodejs.org/topic/5464c7fe88b869cc33a97985) 上传page到Github网页分支上
- `yargs` 解析终端命令参数 `if(yargs.(w|p|s)){}`
 - `-p` port,
 - `-w` watch,
 - `-s` 启动服务器
 - gulp -s -p 3000 -w
hexo 使用说明

### 安装
1. `install git node`
2. `npm install -g hexo-cli`
3. `hexo init <filename> && cd <filename>`
4. `npm install`
5. `hexo server`

### 目录结构
- scaffolds 脚手架，也就是一个工具模板
- scripts 写文件的js，扩展hexo的功能
- source 存放博客正文内容
- source/_drafts 草稿箱
- source/_posts 文件箱
- themes 存放皮肤的目录
- themes/landscape 默认的皮肤
- _config.yml 全局的配置文件
- db.json 静态常量
- .gitignore 自建的gitignore文件

### 命令行
- `hexo help`
- help 查看帮助信息
- init 创建一个hexo项目
- migrate 从其他系统向hexo迁移
- version 查看hexo的版本
- –config参数，指定配置文件，代替默认的_config.yml
- –debug参数，调试模式，输出所有日志信息
- –safe参数，安全模式，禁用所有的插件和脚本
- –silent参数，无日志输出模式
- `hexo new <postname>` 创建新文章 支持markdown语法和Swig语法

### 发布到github
1. `hexo generate`静态化处理 `npm install hexo-deployer-git --save`
2. `_config.yml`里面 `repo: git@github.com:bsspirit/nodejs-hexo.git`
3. `hexo deploy` 部署到 **gh-pages分支**
4. 设置域名

### 插件功能
- 替换皮肤
- 评论系统
- RSS 订阅 `npm install hexo-generator-feed`
- 站长地图 `npm install hexo-generator-sitemap`
- mathjax 数学公式 `touch themes/pacman/layout/_partial/mathjax.ejs`，找到mathjax的调用代码复制到文件。

参考: [Hexo在github上构建免费的Web应用](http://blog.fens.me/hexo-blog-github/)
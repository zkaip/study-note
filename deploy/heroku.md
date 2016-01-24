heroku 部署应用

===

### 部署准备
- https://www.heroku.com/ 申请个账号
- 下载它的工具包 https://toolbelt.heroku.com/ 
- 在命令行里面，通过 `heroku login` 来登录。

### 部署
- 进入要上传的应用根文件夹
- 建立 `Procfile` 文件, 内容 `web: node app.js` //配置启动脚本
- app.js 里面 app.listen(process.env.PORT || 5000); //配置监听端口,如果端口被占用,使用系统提供的端口
- 本地 `git init` `git add 全部文件` `git commit -m "commits"`
- 执行 `heroku apps:create [NAME]` // 在heroku上创建应用,heroku提供一个git仓库给我们 自动 git remote heroku added
- `heroku ps:scale web=1` 查看应用运行情况
- `git remote -v` 查看分支
- `git push heroku master` 往远端推送我们的master分支
- heroku 自动检测出我们是nodejs程序并安装依赖,然后按照Procfile启动
- `heroku open` heroku自动打开浏览器带我们去相应的网址
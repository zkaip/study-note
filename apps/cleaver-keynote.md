## cleaver(keynote maker)

### 安装 & 使用
* npm install cleaver -g --save
* cleaver <文件.md>

### 配置
```
title: Basic Example
author:
  name: Jordan Scales
  twitter: jdan
  url: http://jordanscales.com
output: basic.html
```

* title: HTML的标题名
* author: 作者信息,在最后一页显示
	* name: 名字
	* url: 个人网站
	* twitter: 微博
	* email: 邮件地址
* theme: 皮肤(theme: jdan/cleaver-retro)
* style: css样式表(style: css/main.css)
* output: 生成的HTML文件名(output: basic.html)
* controls: 控制按钮(controls: true)
* progress: 顶部显示进程条(progress: true)
* agenda: 生成一个目录页(progress: false)
* encoding: 文档的字符编码(encoding: utf-8)
* template: 设置每张slide的模板(template: template/slide.mustache)
* layout: 设置HTML模板(template: template/layout.mustache)

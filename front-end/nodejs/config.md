NodeJS 项目中的配置文件
===
### 1.通过环境变量设置
`export` `process.env`

### 2.通过配置文件设置
- `.js`
- `.json`(strip-json-comments模块可以去掉json备注信息)
- `.yaml`(yamljs模块解析)

### 3.通过config模块来读取配置
默认读取根目录下的`config`文件夹
###安装
`npm install log4js`

###使用
```js
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log', 
      maxLogSize: 1024,
      backups:3,
      category: 'normal' 
    }
  ]
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
```

### 说明
#### 输出级别6个
trace, debug, info, warn, error, fatal
#### 日志级别对应规则：
- http responses 3xx, level = WARN
- http responses 4xx & 5xx, level = ERROR
- else, level = INFO

### 配置
log4js.configure(path,option)
- log4js.configure('file.json', { reloadSecs: 300 });
- replaceConsole: true/false (是否替代系统console日志)

**my_log4js_configuration.json**
```js
{
  "appenders": [
    {
      "type": "file",
      "filename": "relative/path/to/log_file.log",
      "maxLogSize": 20480,
      "backups": 3,
      "category": "relative-logger"
    },
    {
      "type": "file",
      "absolute": true,
      "filename": "/absolute/path/to/log_file.log",
      "maxLogSize": 20480,
      "backups": 10,
      "category": "absolute-logger"          
    }
  ]
}
```
### 根据日志解决问题
[Nginx反向代理Nodejs – log4js日志IP显示错误](http://blog.fens.me/nodejs-nginx-log4js/)
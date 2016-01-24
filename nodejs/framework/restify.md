###restify服务端API

- restify.createServer(): 创建服务器
- server.use(): 注册handler
- server.get(): 路由控制
- server.formatters: 设置content-type
- 异常处理
- socket.IO集成/li>
- Server API
- 组件管理
- Request API
- Response API

#### restify.createServer(): 创建服务器

**创建服务器代码**
```js
var restify = require('restify');

var server = restify.createServer({
  certificate: ...,
  key: ...,
  name: 'MyApp',
});

server.listen(8080);
```
**服务器创建参数**

- certificate: string, HTTPS服务器的证书
- key: string, HTTPS服务器的证书key
- formatters: object, 自定义的response的content-type
- log: object, 服务器日志，可以配合bunyan一起使用
- name: string, 服务器的response header
- spdy: Object, 允许集成node-spdy服务器
- version: string, 路由版本
- responseTimeHeader: string, X-Response-Time
- responseTimeFormatter: function, 格式化header的值

#### server.use(): 注册handler

注册服务器控制组件，按照代码顺序执行，需要放在路由代码之前。

#### server.get(): 路由控制

**REST响应请求：**

- server.get(): 响应GET请求
- server.post(): 响应POST请求
- server.put(): 响应PUT请求
- server.head(): 响应HEAD请求
- server.del(): 响应DELETE请求

**路由控制代码**

```js
 function send(req, res, next) {
   res.send('hello ' + req.params.name);
   return next();
 }

 server.post('/hello', function create(req, res, next) {
   res.send(201, Math.random().toString(36).substr(3, 8));
   return next();
 });
 server.put('/hello', send);
 server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, send);
 server.head('/hello/:name', send);
 server.del('hello/:name', function rm(req, res, next) {
   res.send(204);
   return next();
 });
 ```
 
#### server.formatters: 设置Response的content-type

**content-type类型**

- application/json
- text/plain
- application/octet-stream
- 增加自定义的content-type:application/foo

```js
var server = restify.createServer({
  formatters: {
    'application/foo': function formatFoo(req, res, body) {
      if (body instanceof Error)
        return body.stack;

      if (Buffer.isBuffer(body))
        return body.toString('base64');

      return util.inspect(body);
    }
  }
});
```

**显式的设置Response的content-type**

- res.setHeader('content-type', 'application/foo');
- res.send({hello: 'world'});

### 异常处理

**异常处理代码**

```js
var server = restify.createServer();
server.get('/hello/:name', function(req, res, next) {
  return next(new restify.InvalidArgumentError("I just don't like you"));
});
```
运行程序

```bash
~ curl -i localhost:3900/err/conan

HTTP/1.1 409 Conflict
Content-Type: application/json
Content-Length: 60
Date: Mon, 13 Jan 2014 11:06:26 GMT
Connection: keep-alive
```

**RestError的内置的异常类型：**

- BadDigestError: 400
- BadMethodError: 405
- InternalError: 500
- InvalidArgumentError: 409
- InvalidContentError: 400
- InvalidCredentialsError: 401
- InvalidHeaderError: 400
- InvalidVersionError: 400
- MissingParameterError: 409
- NotAuthorizedError: 403
- RequestExpiredError: 400
- RequestThrottledError: 429
- ResourceNotFoundError: 404
- WrongAcceptError: 406

**自定义异常:MyError, errorCode:418**

```js
var restify = require('restify');
var util = require('util');

function MyError(message) {
  restify.RestError.call(this, {
    restCode: 'MyError'
    statusCode: 418,
    message: message,
    constructorOpt: MyError
  });
  this.name = 'MyError';
};
util.inherits(MyError, restify.RestError);
```

#### Socket.IO集成

**服务器端集成代码**

```js
var server = restify.createServer();
var io = socketio.listen(server);

server.get('/', function indexHTML(req, res, next) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
});


io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
            console.log(data);
    });
});

server.listen(8080, function () {
    console.log('socket.io server listening at %s', server.url);
});
```

####Server API

Events事件监听：

- NotFound: 404 handler
- MethodNotAllowed: 405 handler
- VersionNotAllowed: 400 handler
- UnsupportedMediaType: 415 handler
- after: 在所有handler之后执行
- uncaughtException: 未处理的异常
注: uncaughtException的处理，可以参考文章, [Nodejs异步异常处理domain](http://blog.fens.me/nodejs-core-domain/%20%E2%80%8E)

Properties配置属性：

- name: string, 服务器名字
- version: string, 路由默认版本
- log: Object, 日志对象
- acceptable: Array(String), content-types列表
- url: string, 服务器信息

Methods函数：

- address(): 绑定地址
- listen(port, [host], [callback]): 启动服务器
- close(): 停止服务器
- pre(): 在路由之前触发的组件
- use(): 注册组件

#### 组件管理

restify已支持的组件

- Accept header parsing: 解析aceept header，返回客户端
- Authorization header parsing: HTTP Basic Auth认证
- Date header parsing: 数据头解析
- JSONP support: JSONP请求
- Gzip Response: 设置accept-encoding:gzip
- Query string parsing: 解析URL参数
- Body parsing (JSON/URL-encoded/multipart form): 解析内容
- Static file serving: 静态文件处理
- Throttling: 优化服务器性能配置
- Conditional request handling: 设置请求条件
- Audit logger: 日志记录

注册组件server.use()

```js
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './public'
}));
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true,
  overrides: {
    '192.168.1.1': {
      rate: 0,        // unlimited
      burst: 0
    }
  }
}));
server.use(function setETag(req, res, next) {
  res.header('ETag', 'myETag');
  res.header('Last-Modified', new Date());
});
server.use(restify.conditionalRequest());
server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));
```

#### Request API

对node内核API：http.ServerRequest的封装

#### Response API

对node内核API：http.ServerResponse的封装

### restify客户端API

- JsonClient: 收application/json, 发application/json
- StringClient: 收text/plain, 发url-encoded request
- HttpClient: 封装http/https
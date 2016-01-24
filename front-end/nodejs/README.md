NodeJS 官方文档学习笔记 v5.3.0
===
https://nodejs.org/api/documentation.html

## 工具模块
### Assert 测试 断言库 (功能已锁定) 
- `require('assert')`
  - `assert(value[, message])`, `assert.ok(value[, message])` **相当于**`assert.equal(!!value, true, message)`
  - `assert.deepEqual(actual, expected[, message])` **所有原型链的属性**`==`
  - `assert.deepStrictEqual(actual, expected[, message])` **相当于**`===`
  - `assert.doesNotThrow(block[, error][, message])` **该块不会抛出错误**
  - `assert.equal(actual, expected[, message])` **相当于**`==`
  - `assert.fail(actual, expected, message, operator)` 抛出一个实际值`actual`和期望值`expected`的异常, 用`operator`分隔开
  - `assert.ifError(value)` 抛出一个错误值如果该值`true`, 这个在回调函数测试`error`参数时十分有用
  - `assert.notDeepEqual(actual, expected[, message])`
  - `assert.notDeepStrictEqual(actual, expected[, message])`
  - `assert.notEqual(actual, expected[, message])`
  - `assert.notStrictEqual(actual, expected[, message])`
  - `assert.strictEqual(actual, expected[, message])`
  - `assert.throws(block[, error][, message])` **抛出错误, 该错误可以为构造函数 正则表达式 或者 验证函数**

### Utitlies 工具类 (稳定)
- `require('util')`
  - `util.debuglog(section)` **debug日志** 在设置环境变量`NODE_DEBUG`的时候, 可以打印该`debuglog`日志
  - `util.deprecate(function, string)` **标记方法不应该被使用**
  - `util.format(format[, ...])` **返回格式化后的字符串**
    - `%s` 
    - `%d`
    - `%j` `JSON`
  - `util.inherits(constructor, superConstructor)` **通过构造函数继承**

```javascript
var util = require("util");
var EventEmitter = require("events");

function MyStream() {
  EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit("data", data);
}

var stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on("data", function(data) {
  console.log('Received data: "' + data + '"');
})
stream.write("It works!"); 
```

  - `util.inspect(object[, options])` **返回一个代表了object的字符串，在调试时很有用。**
    - `Customizing` **util.inspect colors**
    - `Custom` **inspect() function on Objects**
    - `options`
      - `showHidden`  **如果设置为true，那么对象的不可枚举属性也会被显示。默认为false。**
      - `depth`
      - `colors`
      - `customInspect` **如果为false，那么定义在被检查对象上的inspect(depth, opts)函数将不会被调用。默认为false**
  - `util.log(string)` 有时间戳的日志

## 数据
### Buffer 全局, 无需`require('buffer')`
**内存是被复制的, 内存被解释成一个数组**
- `Class: Buffer`
  - `new Buffer(array)`
  - `new Buffer(buffer)`
  - `new Buffer(size)`
  - `new Buffer(str[, encoding])`
    - `encoding`
      - `ascii`
      - `utf8`
      - `utf16le`
      - `ucs2`
      - `base64`
      - `binary`
      - `hex`
  - `Class Method: Buffer.byteLength(string[, encoding])` **string的实际长度,编码默认为utf8**
  - `Class Method: Buffer.compare(buf1, buf2)` **比较两个buf**
  - `Class Method: Buffer.concat(list[, totalLength])`
  - `Class Method: Buffer.isBuffer(obj)`
  - `Class Method: Buffer.isEncoding(encoding)`
  - `buffer.entries()`
  - `buffer.keys()`
  - `buffer.values()`
  - `buf[index]`
  - `buf.compare(otherBuffer)`
  - `buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])`
  - `buf.equals(otherBuffer)`
  - `buf.fill(value[, offset][, end])` 用值填满buf(offset偏移位置 end最终位置)
  - `buf.indexOf(value[, byteOffset])`
  - `buf.length`
  - `buf.readDoubleBE(offset[, noAssert])`
  - `buf.readDoubleLE(offset[, noAssert])`
  - `buf.readFloatBE(offset[, noAssert])`
  - `buf.readFloatLE(offset[, noAssert])`
  - `buf.readInt8(offset[, noAssert])`
  - `buf.readInt16BE(offset[, noAssert])`
  - `buf.readInt16LE(offset[, noAssert])`
  - `buf.readInt32BE(offset[, noAssert])`
  - `buf.readInt32LE(offset[, noAssert])`
  - `buf.readIntBE(offset, byteLength[, noAssert])`
  - `buf.readIntLE(offset, byteLength[, noAssert])`
  - `buf.readUInt8(offset[, noAssert])`
  - `buf.readUInt16BE(offset[, noAssert])`
  - `buf.readUInt16LE(offset[, noAssert])`
  - `buf.readUInt32BE(offset[, noAssert])`
  - `buf.readUInt32LE(offset[, noAssert])`
  - `buf.readUIntBE(offset, byteLength[, noAssert])`
  - `buf.readUIntLE(offset, byteLength[, noAssert])`
  - `buf.slice([start[, end]])`
  - `buf.toString([encoding][, start][, end])`
  - `buf.toJSON()`
  - `buf.write(string[, offset][, length][, encoding])`
  - `buf.writeDoubleBE(value, offset[, noAssert])`
  - `buf.writeDoubleLE(value, offset[, noAssert])`
  - `buf.writeFloatBE(value, offset[, noAssert])`
  - `buf.writeFloatLE(value, offset[, noAssert])`
  - `buf.writeInt8(value, offset[, noAssert])`
  - `buf.writeInt16BE(value, offset[, noAssert])`
  - `buf.writeInt16LE(value, offset[, noAssert])`
  - `buf.writeInt32BE(value, offset[, noAssert])`
  - `buf.writeInt32LE(value, offset[, noAssert])`
  - `buf.writeIntBE(value, offset, byteLength[, noAssert])`
  - `buf.writeIntLE(value, offset, byteLength[, noAssert])`
  - `buf.writeUInt8(value, offset[, noAssert])`
  - `buf.writeUInt16BE(value, offset[, noAssert])`
  - `buf.writeUInt16LE(value, offset[, noAssert])`
  - `buf.writeUInt32BE(value, offset[, noAssert])`
  - `buf.writeUInt32LE(value, offset[, noAssert])`
  - `buf.writeUIntBE(value, offset, byteLength[, noAssert])`
  - `buf.writeUIntLE(value, offset, byteLength[, noAssert])`
- `buffer.INSPECT_MAX_BYTES` 默认是50
- `ES6 iteration` 可以用`for...of`遍历,`buffer.values()`, `buffer.keys()`, `buffer.entries()`
- `Class: SlowBuffer` 返回无池管理的`Buffer`, 为了避免创建许多单个的被分配内存的小 `Buffer` 的垃圾回收开销。默认得，分配小于`4 KB` 的空间将会被从一个更大的被分配好内存的对象（`allocated object`）中切片(`sliced`)得到。这个方法改进了性能以及内存占用，因为 V8 的垃圾回收机制不再需要追踪和清理许多的小对象。当开发者需要将池中一小块数据保留不确定的一段时间，较为妥当的办法是用 `SlowBuffer`创建一个不被池管理的Buffer实例并将相应数据拷贝出来。该功能仅在开发者察觉到应用中有过度使用内存时谨慎使用

### punycode
**用来转换纯ASCII符号和Unicode符号的工具类**
- `require('punycode')`
  - `punycode.decode(string)` **ASCII=>Unicode**
  - `punycode.encode(string)` **Unicode=>ASCII**
  - `punycode.toASCII(domain)` **Unicode=>ASCII, 仅转换域名部分**
  - `punycode.toUnicode(domain)` **ASCII=>Unicode, 仅转换域名部分**
  - `punycode.ucs2`
    - `punycode.ucs2.decode(string)`
    - `punycode.ucs2.encode(codePoints)`
  - `punycode.version` **返回Punycode.js版本号**

### queryStrings
- `require('querystring')` **处理查询字符串**
  - `querystring.escape` `querystring.stringify`**使用的转义函数，在需要时可以被覆盖。**
  - `querystring.parse(str[, sep][, eq][, options])` **字符串反序列化成一个对象**
  - `querystring.stringify(obj[, sep][, eq][, options])` **序列化一个对象为字符串**
  - `querystring.unescape` `querystring.parse`**使用的反转义函数，在需要时可以被覆盖。**

### stringDecoder 
- `require('string_decoder')`
  - `Class: StringDecoder` **StringDecoder解码一个buffer为一个字符串。它是一个buffer.toString()的简单接口，但是提供了 utf8 的额外支持。**
    - `decoder.end()` 返回遗留在`buffer`中的所有末端字节
    - `decoder.write(buffer)` **返回被解码的字符串**

### readline
- `require('readline')` **逐行读取流, 一旦执行这个模块, 在关闭此接口前将不会退出**
  - `Class: Interface`
    - `rl.close()` **关闭**
    - `rl.pause()` **暂停**
    - `rl.prompt([preserveCursor])`
    - `rl.question(query, callback)` **设置问题**
    - `rl.resume()` **恢复**
    - `rl.setPrompt(prompt)` **设置提示符**
    - `rl.write(data[, key])` **向output流写入数据**
  - `Events`
    - `Event: 'close'`
    - `Event: 'line'` **收到\n触发**
    - `Event: 'pause'` 
    - `Event: 'resume'`
    - `Event: 'SIGCONT'` 
    - `Event: 'SIGINT'` **当input流接收到^C（也被认作SIGINT）时触发。如果当前没有SIGINT事件的监听器，pause事件将会被触发。**
    - `Event: 'SIGTSTP'`
  - `readline.clearLine(stream, dir)`
  - `readline.clearScreenDown(stream)`
  - `readline.createInterface(options)` **创建一个readline接口**
    - `input` **必选**
    - `output` **可选**
    - `completer` **用于自动补全**
    - `terminal` **是否像tty一样**
    - `historySize` **默认30**
  - `readline.cursorTo(stream, x, y)` **在给定的 TTY 流中，将光标移动到指定位置。**
  - `readline.moveCursor(stream, dx, dy)` **相对于当前位置，将光标移动到指定位置。**

**Example: Tiny CLI**
```javascript
var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('OHAI> ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
```

## 多线程
### child-process
- `require('child_process')`
  - `Class: ChildProcess` <= **spawn() exec() execFile() fork()**
    - `Event: 'close'` **正常退出,存在退出码, 被父进程杀死则signal**
    - `Event: 'disconnect'`
    - `Event: 'error'` **发生于进程不能被创建时，进程不能杀死时，给子进程发送信息失败时。**
    - `Event: 'exit'` **正常退出,存在退出码, 被父进程杀死则signal**
    - `Event: 'message'`
    - `child.connected`
    - `child.disconnect()`
    - `child.kill([signal])`
    - `child.pid`
    - `child.send(message[, sendHandle][, callback])`
      - `Example: sending server object`
      - `Example: sending socket object`
    - `child.stderr`
    - `child.stdin`
    - `child.stdio`
    - `child.stdout`
  - `Asynchronous Process Creation` **异步进程创建**
    - `child_process.exec(command[, options], callback)`
    - `child_process.execFile(file[, args][, options][, callback])`
    - `child_process.fork(modulePath[, args][, options])`
    - `child_process.spawn(command[, args][, options])`
      - `options.detached`
      - `options.stdio`
  - `Synchronous Process Creation` **同步进程创建**
    - `child_process.execFileSync(file[, args][, options])`
    - `child_process.execSync(command[, options])`
    - `child_process.spawnSync(command[, args][, options])`

### cluster
`Node.js`是单线程, `cluster`可以很容易创建共享服务器端口的子进程, 注意子进程的状态不要与自身代码有关, 尽可能的依赖第三方来存储状态, 避免状态同步问题
- `require('cluster')`
  - `Class: Worker`
    - `Event: 'disconnect'`
    - `Event: 'error'`
    - `Event: 'exit'`
    - `Event: 'listening'`
    - `Event: 'message'`
    - `Event: 'online'`
    - `worker.disconnect()`
    - `worker.id`
    - `worker.isConnected()`
    - `worker.isDead()`
    - `worker.kill([signal='SIGTERM'])`
    - `worker.process`
    - `worker.send(message[, sendHandle][, callback])`
    - `worker.suicide` **自愿退出进程**
  - `Event: 'disconnect'`
  - `Event: 'exit'`
  - `Event: 'fork'`
  - `Event: 'listening'`
  - `Event: 'message'`
  - `Event: 'online'`
  - `Event: 'setup'`
  - `cluster.disconnect([callback])`
  - `cluster.fork([env])`
  - `cluster.isMaster`
  - `cluster.isWorker`
  - `cluster.schedulingPolicy` **调度策略**, 通过环境变量`NODE_CLUSTER_SCHED_POLICY`来设定。合法值为`rr`和`none`
    - `cluster.SCHED_RR` **循环式**
    - `cluster.SCHED_NONE` **由操作系统处理**
  - `cluster.settings` 在调用`.setupMaster()`（或`.fork()`）方法之后，这个`settings`对象会存放方法的配置，包括默认值。不建议手动更改
    - `execArgv` Array 传递给Node.js执行的字符串参数（默认为process.execArgv）
    - `exec` String 工作进程文件的路径（默认为process.argv[1]）
    - `args` Array 传递给工作进程的字符串参数（默认为process.argv.slice(2)）
    - `silent` Boolean 是否将工作进程的输出传递给父进程的stdio（默认为false）
    - `uid` Number 设置用户进程的 ID
    - `gid` Number 设置进程组的 ID
  - `cluster.setupMaster([settings])`
  - `cluster.worker`
  - `cluster.workers`

## 网络
### http
**这个接口从不缓冲整个请求或响应。用户可以对它们使用流**
**键是小写的, 值没有被修改**
**原始消息头会被保留在rawHeaders属性中**
- `require('http')`
  - `Class: http.Agent` HTTP Agent 是用来把 HTTP 客户端请求中的socket做成池。
    - `new Agent([options])`
      - `keepAlive` Boolean 在未来保持池中的socket被其他请求所使用，默认为false
      - `keepAliveMsecs` Integer 当使用 HTTP KeepAlive 时，通过被保持连接的socket发送 TCP KeepAlive 报文的间隔。默认为1000。只在KeepAlive被设置为true时有效
      - `maxSockets` Number 每个主机允许拥有的socket的最大数量。默认为Infinity
      - `maxFreeSockets` Number 在空闲状态下允许打开的最大socket数。仅在keepAlive为true时有效。默认为256
    - `agent.destroy()` 销毁正在被 agent 使用的所有socket
    - `agent.freeSockets` 这个对象包含了当 HTTP KeepAlive 被使用时正在等待的socket数组
    - `agent.getName(options)` 
通过一个请求选项集合来获取一个独一无二的名字，来决定一个连接是否可被再使用
    - `agent.maxFreeSockets` 默认为`256`
    - `agent.maxSockets` 默认为`Infinity`
    - `agent.requests` 这个对象包含了还没有被分配给socket的请求队列
    - `agent.sockets` 包含了正在被Agent使用的`socket`数组
  - `Class: http.ClientRequest`
    - `Event: 'abort'` 当请求被客户端中止时触发。这个事件只会在第一次调用abort()时触发
    - `Event: 'connect'` function (request, socket, head) { }
      - `request`是一个 http 请求参数，它也被包含在request事件中。
      - `socket`是一个服务器和客户端间的网络套接字。
      - `head`是一个Buffer实例，隧道流中的第一个报文，该参数可能为空
      - 在这个事件被触发后，请求的socket将不会有data事件的监听器，意味着你将要绑定一个data事件的监听器来处理这个socket中发往服务器的数据。 
    - `Event: 'continue'` 当服务器发出一个'100 Continue'HTTP 响应时，通常这是因为请求包含'Expect: 100-continue'。这是一个客户端须要发送请求体的指示
    - `Event: 'response'`
    - `Event: 'socket'` 当一个socket被分配给一个请求时触发。
    - `Event: 'upgrade'` 每当客户端发起一个`http upgrade`请求时触发。如果这个事件没有被监听，那么客户端发起`upgrade`的连接会被关闭。
    - `request.abort()` 终止请求
    - `request.end([data][, encoding][, callback])` 结束发送请求。如果有任何部分的请求体未被发送，这个函数将会将它们冲刷至流中。如果请求是成块的，它会发送终结符`0\r\n\r\n`
    - `request.flushHeaders()` 冲刷请求头
    - `request.setNoDelay([noDelay])` 一旦一个socket被分配给这个请求并且完成连接，socket.setNoDelay()会被调用。
    - `request.setSocketKeepAlive([enable][, initialDelay])` 一旦一个socket被分配给这个请求并且完成连接，socket.setKeepAlive()会被调用。
    - `request.setTimeout(timeout[, callback])`
    - `request.write(chunk[, encoding][, callback])`
  - `Class: http.Server`
    - `Event: 'checkContinue'` 当每次收到一个 `HTTPExpect: 100-continue`请求时触发。如果不监听这个事件，那么服务器会酌情自动响应一个`100 Continue`
    - `Event: 'clientError'` 客户端连接发生错误时触发
    - `Event: 'close'` 当服务器关闭时触发
    - `Event: 'connect'` 每次服务器使用CONNECT方法响应一个请求时触发
    - `Event: 'connection'` 当一个新的 TCP 流建立时触发。socket是一个net.Socket类型的实例
    - `Event: 'request'` 当有请求来到时触发。注意每一个连接可能有多个请求（在长连接的情况下）。请求是一个`http.IncomingMessage`实例，响应是一个`http.ServerResponse`实例。
    - `Event: 'upgrade'`
    - `server.close([callback])`
    - `server.listen(handle[, callback])`
    - `server.listen(path[, callback])`
    - `server.listen(port[, hostname][, backlog][, callback])`
      - `backlog` 连接等待队列的最大长度。它的实际长度将有你操作系统的sysctl设置（如 linux 中的tcp_max_syn_backlog和somaxconn）决定。默认值为511（不是512）。
    - `server.maxHeadersCount` 最大请求头数量, 默认为1000, 0为无限制
    - `server.setTimeout(msecs, callback)`
    - `server.timeout` 默认为120000ms(2分钟)
  - `Class: http.ServerResponse`
    - `Event: 'close'` 表明底层的连接在response.end()被调用或能够冲刷前被关闭。
    - `Event: 'finish'` 当响应被设置时触发。更明确地说，这个事件在当响应头的最后一段和响应体为了网络传输而交给操作系统时触发。它并不表明客户端已经收到了任何信息。
    - `response.addTrailers(headers)` 添加 HTTP 尾随头（一个在消息最后的头）给响应。
    - `response.end([data][, encoding][, callback])` 这个方法告知服务器所有的响应头和响应体都已经发送；服务器会认为这个消息完成了。这个方法必须在每次响应完成后被调用。
    - `response.finished` 响应是否已经完成
    - `response.getHeader(name)` 读取已经被排队但还未发送给客户端的响应头。
    - `response.headersSent` 只读,判断响应头是否被发送
    - `response.removeHeader(name)` 取消一个在队列中等待隐式发送的头。
    - `response.sendDate` 当为true时,响应头没有Date时会被自动设置
    - `response.setHeader(name, value)` 为一个隐式响应头设置一个单独的头内容
    - `response.setTimeout(msecs, callback)` 设置超时方式
    - `response.statusCode` 当使用隐式响应头
    - `response.statusMessage` 当使用隐式响应头
    - `response.write(chunk[, encoding][, callback])`
    - `response.writeContinue()` `给客户端传递一个HTTP/1.1 100 Continue信息，表明请求体必须被传递。`
    - `response.writeHead(statusCode[, statusMessage][, headers])` 为请求设置一个响应头。
        - `statusCode`是一个三位的 HTTP 状态码，如404。
        - 最后一个参数`headers`，是响应头。
        - 第二个参数`statusMessage`是 **可选** 的，表示状态码的一个可读信息。
  - `http.IncomingMessage` 一个IncomingMessage对象被http.Server或http.ClientRequest创建，并且分别被传递给request和response事件的第一个参数。它被用来取得响应状态，响应头和响应体。
    - `Event: 'close'`
    - `message.headers` 请求/响应头对象
    - `message.httpVersion` http版本号
    - `message.method` 仅对从http.Server获得的请求有效。请求方法是字符串。只读。
    - `message.rawHeaders` 原始的请求/响应头列表
    - `message.rawTrailers` 原始的请求/响应尾部对象
    - `message.setTimeout(msecs, callback)`
    - `message.statusCode` 只对从http.ClientRequest到来的响应有效。HTTP 状态码。
    - `message.statusMessage`
    - `message.socket` 连接关联的`net.Socket`对象。通过 HTTPS 的支持，使用`request.socket.getPeerCertificate()`来获取客户端的身份细节。
    - `message.trailers` 请求/响应尾部对象。只在end事件中存在
    - `message.url`
  - `http.METHODS` Array HTTP方法列表
  - `http.STATUS_CODES` 一个所有标准 HTTP 响应状态码的集合，以及它们的简短描述
  - `http.createServer([requestListener])` 创建`http.Server`实例
  - `http.get(options[, callback])`
  - `http.globalAgent`
  - `http.request(options[, callback])` 
    - `options`
      - `host` 一个将要向其发送请求的服务器域名或 IP 地址。默认为localhost。
      - `hostname` host的别名。为了支持url.parse()的话，hostname比host更好些。
      - `family` 解析host和hostname时的IP地址协议族。合法值是4和6。当没有指定时，将都被使用。
      - `port` 远程服务器端口。默认为80。
      - `localAddress` 用于绑定网络连接的本地端口。
      - `socketPath` Unix 域socket（使用host:port或socketPath）。
      - `method` 指定 HTTP 请求方法的字符串。默认为GET。
      - `path` 请求路径。默认为/。如果有查询字符串，则需要包含。例如'/index.html?page=12'。请求路径包含非法字符时抛出异常。目前，只否决空格，不过在未来可能改变。
      - `headers` 一个包含请求头的对象。
      - `auth` 用于计算认证头的基本认证，即'user:password'。
      - `agent` 控制agent行为。当使用一个代理时，请求将默认为Connection: keep-alive。可能值有：
      - `undefined (默认)` 在这个主机和端口上使用全局`agent。
      - `Agent object` 在agent中显示使用 passed。
      - `false` 跳出agent的连接池。默认请求为Connection: close。
    - 特殊的请求头
      - 发送`Connection: keep-alive`会告知io.js保持连直到下一个请求发送。
      - 发送`Content-length`头会禁用默认的数据块编码。
      - 发送`Expect`头将会立刻发送一个请求头。通常，当发送`Expect: 100-continue`时，你需要同时设置一个超时和监听后续的时间。
      - 发送一个授权头将会覆盖使用`auth`选项来进行基本授权

### https
`HTTPS`是建立在`TLS/SSL`之上的`HTTP`协议
- `require('https')`
  - `Class: https.Agent`
  - `Class: https.Server` 该类是`tls.Server`的子类, 和`http.Server`触发相同的事件
    - `server.setTimeout(msecs, callback)`
    - `server.timeout`
  - `https.createServer(options[, requestListener])`
    - `server.close([callback])`
    - `server.listen(handle[, callback])`
    - `server.listen(path[, callback])`
    - `server.listen(port[, host][, backlog][, callback])`
  - `https.get(options, callback)`
  - `https.globalAgent` 所有 `HTTPS` 客户端请求的全局`https.Agent`实例。
  - `https.request(options, callback)` 向一个安全的`Web`服务器发送请求, 如果`options`是一个字符串，它会自动被`url.parse()`解析
    - `options`
        - `host` 一个将要向其发送请求的服务器域名或 IP 地址。默认为localhost。
        - `hostname` host的别名。为了支持url.parse()的话，hostname比host更好些。
        - `family` 解析host和hostname时的 IP 地址协议族。合法值是4和6。当没有指定时，将都被使用。
        - `port` 远程服务器端口。默认为80。
        - `localAddress` 用于绑定网络连接的本地端口。
        - `socketPath` Unix 域socket（使用host:port或socketPath）。
        - `method` 指定 HTTP 请求方法的字符串。默认为GET。
        - `path` 请求路径。默认为/。如果有查询字符串，则需要包含。例如'/index.html?page=12'。请求路径包含非法字符时抛出异常。目前，只否决空格，不过在未来可能改变。
        - `headers` 一个包含请求头的对象。
        - `auth` 用于计算认证头的基本认证，即'user:password'。
        - `agent` 控制agent行为。当使用一个代理时，请求将默认为Connection: keep-alive。可能值有：
          - `undefined (默认)` 在这个主机和端口上使用全局`agent。
          - `Agent object` 在agent中显示使用 passed。
          - `false` 跳出agent的连接池。默认请求为Connection: close。
        - 以下来自`tls.connect()`的选项也可以被指定。但是，一个`globalAgent`会默默忽略这些。
          - `pfx` 证书，SSL 所用的私钥和 CA 证书。默认为null。
          - `key` SSL 所用的私钥。默认为null。
          - `passphrase` 私钥或 pfx 的口令字符串。默认为null。
          - `cert` 所用的公共 x509证书。默认为null。
          - `ca` 一个用来检查远程主机的权威证书或权威证书数组。
          - `ciphers` 一个描述要使用或排除的密码的字符串。更多格式信息请查询http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT。
          - `rejectUnauthorized` 如果设置为true，服务器证书会使用所给的 CA 列表验证。验证失败时，一个error事件会被触发。验证发生于连接层，在 HTTP 请求发送之前。默认为true。
          - `secureProtocol` 所用的 SSL 方法，如SSLv3_method强制使用 SSL v3。可用的值取决你的OpenSSL安装和SSL_METHODS常量。

### net
该模块提供了异步网络调用的包装
- `require('net')`
  - `Class: net.Server` <= `net.createServer(...)`
    - `Event: 'close'` 服务关闭时触发, 如果当前服务器仍有连接, 全部连接关闭时触发
    - `Event: 'connection'` 新连接产生时触发
    - `Event: 'error'` 错误发生时触发
    - `Event: 'listening'` 当调用`server.listen`后，服务器已被绑定时触发。
    - `server.address()` 返回服务器绑定的地址，协议族名和端口
    - `server.close([callback])` 使服务器停止接收新的连接并且保持已存在的连接。
    - `server.getConnections(callback)` 返回当前服务器连接数
    - `server.listen(handle[, callback])` 启动本地的socket服务器
    - `server.listen(options[, callback])`
      - `options`
        - `port` Number
        - `host` String
        - `backlog` Number
        - `path` String
        - `exclusive` Boolean
    - `server.listen(path[, callback])`
    - `server.listen(port[, hostname][, backlog][, callback])`
    - `server.maxConnections` 设置最大连接数
    - `server.ref()` 在一个已经被调用unref方法的server中调用ref方法，那么如果它是唯一活跃的服务器时，程序将不会退出（默认）。
    - `server.unref()` 调用一个server对象的unref方法将允许如果它是事件系统中唯一活跃的服务器，程序将会退出。
  - `Class: net.Socket` <= `net.createConnection(...)` 这个对象是一个 `TCP` 或本地`socket`的抽象。`net.Socket`实例实现了双工流（`duplex Stream`）接口。它可以被使用者创建，并且被作为客户端使用。或者也可以被`Node.js`创建，并且通过服务器的`connection`事件传递给使用者。
    - `new net.Socket([options])`
      - `options`
        - `fd` null
        - `allowHalfOpen` false,
        - `readable` false,
        - `writable` false
    - `Event: 'close'` socket完全被关闭时触发
    - `Event: 'connect'` 在socket连接成功建立后触发
    - `Event: 'data'` 接受到数据后触发
    - `Event: 'drain'` 缓冲为空时触发, 可以控制上传流量
    - `Event: 'end'` 当另一端的socket发送一个FIN报文时触发。
    - `Event: 'error'` 发生错误时触发
    - `Event: 'lookup'` 在解析主机名后，连接主机前触发。对 `UNIX socket`不适用。
    - `Event: 'timeout'` 超时时触发
    - `socket.address()` 返回地址
    - `socket.bufferSize` 遇到数值很大或增长很快的bufferSize时，应当尝试使用pause()和resume()来控制。
    - `socket.bytesRead` 接受的字节数
    - `socket.bytesWritten` 发送的字节数
    - `socket.connect(options[, connectListener])`
    - `socket.connect(path[, connectListener])`
    - `socket.connect(port[, host][, connectListener])`
    - `socket.destroy()` 确保这个socket上没有 I/O 活动发生。只在发生错误情况才需要（如处理错误）。
    - `socket.end([data][, encoding])` 半关闭一个socket
    - `socket.localAddress` 本地地址
    - `socket.localPort` 本地端口
    - `socket.pause()` 暂停数据读取
    - `socket.ref()`
    - `socket.remoteAddress` 远程IP地址
    - `socket.remoteFamily` 远程IP协议族字符串
    - `socket.remotePort` 远程端口
    - `socket.resume()` 恢复数据读取
    - `socket.setEncoding([encoding])` 设置编码
    - `socket.setKeepAlive([enable][, initialDelay])` 启用长连接功能
    - `socket.setNoDelay([noDelay])` 设置数据是否立即发送
    - `socket.setTimeout(timeout[, callback])` 设置超时时间
    - `socket.unref()`
    - `socket.write(data[, encoding][, callback])`
  - `net.connect(options[, connectListener])`
  - `net.connect(path[, connectListener])`
  - `net.connect(port[, host][, connectListener])`
  - `net.createConnection(options[, connectListener])` 工厂函数，返回一个新的net.Socket实例，并且自动使用提供的options进行连接。
  - `net.createConnection(path[, connectListener])`
  - `net.createConnection(port[, host][, connectListener])`
  - `net.createServer([options][, connectionListener])`
    - `options`
      - `allowHalfOpen` : false/true
      - `pauseOnConnect` : false/true
  - `net.isIP(input)` 检测是否是IP
  - `net.isIPv4(input)` 检测是否是IPv4
  - `net.isIPv6(input)` 检测是否是IPv6

### dns
**该模块包含两类函数**
  - `dns.lookup`(调用底层操作系统工具与操作系统其他应用域名解析行为相同)
  - `dns.resolve`连接实际的`DNS`服务器来进行域名解析的函数，并且经常使用网络来执行`DNS`查找。
- `require('dns')`
  - `dns.getServers()`
  - `dns.lookup(hostname[, options], callback)`
    - `hostname` 第一个找到的 A（IPv4）或 AAAA（IPv6）记录。
    - `options`
      - `family` Number 地址族。如果提供，必须为整数4或6。如果没有提供，那么 IPv4 和IPv6 都是有效的。
      - `hints` Number 如果提供,它必须是一个或多个支持的getaddrinfo标识。如果没有提供，那么没有标识被传递给getaddrinfo。多个标识可以通过在逻辑上ORing它们的值，来传递给hints
      - `all` Boolean 如果true，那么回调函数以数组的形式返回所有解析的地址，否则只返回一个地址。默认为false。
    - `callback` （err, address, family）或（err, address）
  - `dns.lookupService(address, port, callback)` **解析给定的address和port为一个主机名和使用getnameinfo的服务**
  - `dns.resolve(hostname[, rrtype], callback)`
    - rrtype
      - `A` (IPV4 地址，默认)
      - `AAAA` (IPV6 地址)
      - `MX` (邮件交换记录)
      - `TXT` (文本记录)
      - `SRV` (SRV 记录)
      - `PTR` (用于 IP 反向查找)
      - `NS` (域名服务器记录)
      - `CNAME` (别名记录)
      - `SOA` (权限开始记录)
    - `dns.resolve4(hostname, callback)` 只查询`IPv4`
    - `dns.resolve6(hostname, callback)` 只查询`IPv6`
    - `dns.resolveCname(hostname, callback)` 只查询`Cname`
    - `dns.resolveMx(hostname, callback)` 只查询`Mx`
    - `dns.resolveNs(hostname, callback)` 只查询`Ns`
    - `dns.resolveSoa(hostname, callback)` 只查询`Soa`
    - `dns.resolveSrv(hostname, callback)` 只查询`Srv`
    - `dns.resolveTxt(hostname, callback)` 只查询`Txt`
    - `dns.reverse(ip, callback)` 为得到一个主机名数组，反向查询一个 **IP**
  - `dns.setServers(servers)` 给定一个 IP 地址字符串数组，将它们设置给用来解析的服务器
  - `Error codes`
    - `dns.NODATA` `DNS`服务器返回一个没有数据的应答。
    - `dns.FORMERR` `DNS`服务器声明查询是格式错误的。
    - `dns.SERVFAIL` `DNS`服务器返回一个普通错误。
    - `dns.NOTFOUND` 域名没有找到。
    - `dns.NOTIMP` `DNS`服务器没有实现请求的操作。
    - `dns.REFUSED` `DNS`服务器拒绝查询。
    - `dns.BADQUERY` 格式错误的 `DNS`查询。
    - `dns.BADNAME` 格式错误的主机名。
    - `dns.BADFAMILY` 不支持的协议族。
    - `dns.BADRESP` 格式错误的 `DNS`响应。
    - `dns.CONNREFUSED` 不能连接到 `DNS`服务器。
    - `dns.TIMEOUT` 连接 `DNS`服务器超时。
    - `dns.EOF` 文件末端。
    - `dns.FILE` 读取文件错误。
    - `dns.NOMEM` 内存溢出。
    - `dns.DESTRUCTION` 通道被销毁。
    - `dns.BADSTR` 格式错误的字符串。
    - `dns.BADFLAGS` 指定了非法标志。
    - `dns.NONAME` 给定的主机名不是数字。
    - `dns.BADHINTS` 给定的提示标识非法。
    - `dns.NOTINITIALIZED` c-ares库初始化未被执行。
    - `dns.LOADIPHLPAPI` 加载iphlpapi.dll错误。
    - `dns.ADDRGETNETWORKPARAMS` 找不到GetNetworkParams函数。
    - `dns.CANCELLED` `DNS`查询被取消。
  - `Supported getaddrinfo flags` 支持的`getaddrinfo`标识, 以下标识可以被传递给`dns.lookup`的`hints`
    - `dns.ADDRCONFIG` 返回的地址类型由当前系统支持的地址类型决定
    - `dns.V4MAPPED` 如果 IPv6 协议族被指定，但是没有发现 IPv6 地址，那么返回 IPv6 地址的IPv4 映射
  - `Implementation considerations` 实践注意事项
    - `dns.lookup` 调用了系统查询DNS的功能
    - `dns.resolve, functions starting with dns.resolve and dns.reverse` 调用网络进行DNS查询

### udp/datagram
`socket`通过`require('dgram')`使用
- `require('dgram')`
  - `Class: dgram.Socket` <= `dgram.createSocket(...)`
    - `Event: 'close'` 在一个`socket`通过`close()`被关闭时触发。这个`socket`中不会再触发新的message事件。
    - `Event: 'error'`
    - `Event: 'listening'` UDP socket 创建时触发, 当一个socket开始监听数据报时触发
    - `Event: 'message'` 
      - `msg` Buffer object. 消息
      - `rinfo` Object. 远程地址信息
    - `socket.addMembership(multicastAddress[, multicastInterface])` 告诉内核加入一个组播分组，通过`IP_ADD_MEMBERSHIP socket`选项。
    - `socket.address()` 返回包含`socket`地址信息的对象
    - `socket.bind([port][, address][, callback])`
      - `port` Integer
      - `address` String, 可选
      - `callback` Function 可选，没有参数。当绑定完毕后触发。
    - `socket.bind(options[, callback])`
      - `options`
        - `port` Number - 必须
        - `address` String - 可选
        - `exclusive` Boolean - 可选
    - `socket.close([callback])` 关闭底层`socket`
    - `socket.dropMembership(multicastAddress[, multicastInterface])` 告诉内核离开一个组播分组，通过`IP_DROP_MEMBERSHIP socket`选项。当`socket`被关闭或进程结束时，它会被内核自动调用。所以大多数应用不需要亲自调用它
    - `socket.send(buf, offset, length, port, address[, callback])`
      - `buf` Buffer object or string. 要被发送的信息。
      - `offset` Integer. 信息在buffer里的初始偏移位置。
      - `length` Integer. 信息的字节数。
      - `port` Integer. 目标端口。
      - `address` String. 目标主机或 IP 地址。
      - `callback` Function. 可选，当信息被发送后调用。
    - `socket.setBroadcast(flag)` 设置或清除`SO_BROADCAST socket`, 当这个选项被设置，UDP报文将会被送至本地接口的广播地址
    - `socket.setMulticastLoopback(flag)` 设置或清除`IP_MULTICAST_LOOP socket`。当这个选项被设置，组播报文也将会在本地接口上接收。
    - `socket.setMulticastTTL(ttl)` 设置`IP_MULTICAST_TTL socket`选项(0~255 系统默认为`1`)
    - `socket.setTTL(ttl)` 设置`IP_TTL socket`选项(1~255 系统默认为`64`)
    - `socket.ref()` 在一个先前被`unref`的`socket`上调用`ref`，那么在它是唯一的剩余的`socket`（默认行为）时，将不允许程序退出。
    - `socket.unref()` 在一个`socket`上调用`unref`将会在它是事件系统中唯一活跃的`socket`时，允许程序退出。
  - `dgram.createSocket(options[, callback])`
    - `options` Object
      - `type` : udp4 / udp6
      - `reuseAddr` : true / false
    - `callback` Function. 会被添加为`message`事件的监听器
    - `Returns`: socket对象
  - `dgram.createSocket(type[, callback])`
    - `type` String. 'udp4'或'udp6'，两者之一
    - `callback` Function. 可选，会被添加为`message`事件的监听器
    - `Returns`: socket对象

### url
**该模块提供了URL解析和解释工具**
- `require('url')`
  - `URL Parsing`
    - `http://user:pass@host.com:8080/p/a/t/h?query=string#hash`
      - `href` : `http://user:pass@host.com:8080/p/a/t/h?query=string#hash`
      - `protocol` : `http:`
      - `slashes` : `true/false` (协议冒号后是否有斜杠)
      - `host` : `host.com:8080`
      - `auth` : `user:pass`
      - `hostname` : `host.com`
      - `port` : `8080`
      - `pathname` : `/p/a/t/h`
      - `search` : `?query=string`
      - `path` : `/p/a/t/h?query=string`
      - `query` : `query=string` 或 `{'query':'string'}`
      - `hash` : `#hash`
    - `Escaped Characters` `空格 反引号 < > "  \r \n \t { } | \ ^ '`
  - `url.format(urlObj)` 接收URL对象,返回格式化后的字符串
  - `url.parse(urlStr[, parseQueryString][, slashesDenoteHost])` 接收`URL`字符串, 返回对象
  - `url.resolve(from, to)` 接受一个基础`URL`，和一个路径 `URL`，并且带上锚点像浏览器一样解析他们。
    - `url.resolve('/one/two/three', 'four')`  `/one/two/four`
    - `url.resolve('http://example.com/', '/one')`  `http://example.com/one`
    - `url.resolve('http://example.com/one', '/two')`  `http://example.com/two`

## 基类
### events
`var EventEmitter = require('events')`
所有触发事件的对象都是`events.EventEmitter`的实例, 事件名建议以驼峰字符串命名
默认 **event** 都有`error`事件, 默认没有添加监听器, 默认行为是打印堆栈信息并退出程序
- `require("events")`
  - `Class: events.EventEmitter`
    - `Inheriting from 'EventEmitter'` 继承自`EventEmitter`
    - `Class Method: EventEmitter.listenerCount(emitter, event)` 返回指定事件的监听器数目
    - `Event: 'newListener'` 
      - `event` **事件名**
      - `listener` **事件监听器函数**
    - `Event: 'removeListener'` **移除监听器**
    - `EventEmitter.defaultMaxListeners` **实例级别的默认的最大监听数**
    - `emitter.addListener(event, listener)` **添加事件监听器**
    - `emitter.emit(event[, arg1][, arg2][, ...])` **使用提供的参数, 执行每一个监听器, 返回布尔值(有/无 监听器)**
    - `emitter.getMaxListeners()` **获取最大监听器数目**
    - `emitter.listenerCount(type)` **某类型的监听器数量**
    - `emitter.listeners(event)` **事件监听器数组**
    - `emitter.on(event, listener)` **为指定的事件，在其监听器数组的末尾添加一个新的监听器。不会去检查这个事件是否已经被监听过。事件的多次触发会导致监听器的多次被调用。**
    - `emitter.once(event, listener)` **添加一次性监听器**
    - `emitter.removeAllListeners([event])` **移除指定事件的所有监听器**
    - `emitter.removeListener(event, listener)` **移除事件的监听器**
    - `emitter.setMaxListeners(n)` 在实例级别设置最大监听器数。这个类属性让你可以设置所有`EventEmitter`的默认最大监听器数，对当前已创建的和未来创建的`EventEmitter`都有效。请谨慎使用

### stream
所有的流都是`EventEmitter`实例, 流是可读,可写或者双向的
- `require('stream')` `Readable` `Writable` `Duplex` `Transform`
  - `API for Stream Consumers` 面向消费者的API
    - `Class: stream.Duplex` 双向流
    - `Class: stream.Readable` 可读流(读取数据源的抽象),包括 **流动模式** 和 **暂停模式**, 流默认是 **暂停模式**
      - 切换到 **流动模式**
        - 添加一个`data`事件的监听器来监听数据。
        - 调用`resume()`方法来明确开启流动模式。
        - 调用`pipe()`方法将数据导入一个可写流。
      - 切换回 **暂停模式**
        - 如果没有导流`pipe`目标，调用`pause()`方法。
        - 如果有导流`pipe`目标，移除所有的`data`事件监听器，并且通过`unpipe()`方法移除所有导流目标
      - **内置的可读流**
        - 客户端的 HTTP 请求
        - 服务端的 HTTP 响应
        - 文件系统读取流
        - zlib流
        - crypto流
        - tcp sockets
        - 子进程的 stdout 和 stderr
        - process.stdin
      - `Event: 'close'` **底层资源被关闭时触发(不是所有的流都会触发该事件)**
      - `Event: 'data'` 如果`data`事件没有绑定监听器, 并且没有`pipe`目标, 并且切换到流动模式, 数据将会丢失, 为一个没有被暂停的流添加一个`data`事件的监听器会使其切换到流动模式。之后数据会被尽快得传递给用户。
      - `Event: 'end'` **没有更多可读数据时触发**
      - `Event: 'error'` **接受数据有错误时触发**
      - `Event: 'readable'` **数据块可以从流中读出的时候触发**
      - `readable.isPaused()` 判断`readable`是否被暂停
      - `readable.pause()` 使流动模式的流停止触发`data`事件, 并切换至暂停模式, 所有可用的数据将仍存在于内部缓冲区
      - `readable.pipe(destination[, options])` 自动取出可读流所有数据, 并将之写入指定目标, 函数返回目标流, 可以链式调用
        - `options` > `{end: Boolean}`
      - `readable.read([size])` **指定读取数据的数量, 该方法只能在暂停模式中被调用, 流动模式中会自动重复调用直到内部缓冲区被排空**
      - `readable.resume()` 让可读流继续触发`data`事件, 该方法会使流切换至流动模式, 如果不想消费流中的数据, 可以监听`end`事件
      - `readable.setEncoding(encoding)` **设置读入流的编码方式**
      - `readable.unpipe([destination])` **解除导流的流**
      - `readable.unshift(chunk)` **插回读取队列开头的数据块**
      - `readable.wrap(stream)` **几乎不会用到该函数, 它的存在仅为了与旧函数交互**
    - `Class: stream.Transform` **传输流**
    - `Class: stream.Writable` **可写流(写入数据的目标抽象)**
      - **内部可写流的例子**
        - 客户端的 http 请求
        - 服务端的 http 响应
        - 文件系统写入流
        - zlib流
        - crypto流
        - tcp socket
        - 子进程stdin
        - process.stdout，process.stderr
      - `Event: 'drain'` 如果一个`writable.write(chunk)`调用返回了`false`，那么`drain`事件会指示出可以继续向流写入数据的时机
      - `Event: 'error'`
      - `Event: 'finish'` 当调用了end()方法，并且所有的数据都被写入了底层系统, 该事件会被触发
      - `Event: 'pipe'` 将会在可读流被一个可写流使用`pipe()`方法进行导流时触发
      - `Event: 'unpipe'` 当可读流对其调用`unpipe()`方法，在源可读流的目标集合中删除这个可写流，这个事件将会触发。
      - `writable.cork()` 强制滞留所有写入, 滞留的数据会调用`.uncork()`或`.end()`后写入
      - `writable.end([chunk][, encoding][, callback])` 没有更多数据可写时调用该方法, 如果指定了回调函数, 那么会被添加为`finish`事件的监听器
      - `writable.setDefaultEncoding(encoding)` 设置写入流的编码
      - `writable.uncork()` 写入在调用`.cork()`方法所有被滞留的数据。
      - `writable.write(chunk[, encoding][, callback])`
        - `chunk` String | Buffer 要写入的数据
        - `encoding` String 编码，如果数据块是字符串
        - `callback` Function 当数据块写入完毕后调用的回调函数
        - `Returns`: Boolean 如果被全部处理则返回true
  - `API for Stream Implementors` **面向流实现者的API**
    - 实现所有种类的流的模式都是一样的：
      - 为你的子类继承合适的父类（`util.inherits`非常合适于做这个）。
      - 为了保证内部机制被正确初始化，在你的构造函数中调用合适的父类构造函数。
      - 实现一个或多个特定的方法，

用途 | 类 | 需要实现的方法
:---:|:---:|:---:
只读 | Readable | _read
只写 | Writable | _write, _writev
可读以及可写 | Duplex | _read, _write, _writev
操作被写入数据，然后读出结果 | Transform | _transform, _flush

在实现代码中，非常重要的一点是永远不要调用面向流消费者的 API。否则，在程序中消费你的流接口时可能有潜在的副作用。
  -
    - `Class: stream.Duplex` 需要实现`_read(size)`和`_write(chunk, encoding, callback)`
      - `new stream.Duplex(options)`
        - `options`
          - `allowHalfOpen` Boolean 默认为true。如果设置为false，那么流的可读的一端结束时可写的一端也会自动结束，反之亦然。
          - `readableObjectMode` Boolean 默认为false，为流的可读的一端设置objectMode。当objectMode为true时没有效果。
          - `writableObjectMode` Boolean 默认为false，为流的可写的一端设置objectMode。当objectMode为true时没有效果。
    - `Class: stream.PassThrough`  这是一个`Transform`流的实现。将输入的流简单地传递给输出。它的主要目的是用来演示和测试，但它在某些需要构建特殊流的情况下可能有用。
    - `Class: stream.Readable`
      - `new stream.Readable([options])` 需要实现底层`_read(size)`
        - `options`
          - `highWaterMark` Number 在停止从底层资源读取之前，在内部缓冲中存储的最大字节数。默认为16kb，对于objectMode则是16
          - `encoding` String 如果被指定，那么缓冲将被利用指定编码解码为字符串，默认为null
          - `objectMode` Boolean 是否该流应该表现如一个对象的流。意思是说stream.read(n)返回一个单独的对象而不是一个大小为n的Buffer，默认为false
      - `readable._read(size)` 
      - `readable.push(chunk[, encoding])`
      - `Example: A Counting Stream` **例子: 一个计数流**
      - `Example: SimpleProtocol v1 (Sub-optimal)` **例子:简单协议v1(次优)**
    - `Class: stream.Transform` “转换”流是一个输出于输入存在对应关系的双工流，如一个`zilib`流或一个`crypto`流。除了实现`_read()`方法和`_write()`方法，转换流还必须实现`_transform()`方法，并且可选地实现`_flush()`方法
      - `new stream.Transform([options])`
      - `Events: 'finish' and 'end'`
      - `transform._flush(callback)` 当排空所有剩余数据后, `callback`会被调用
      - `transform._transform(chunk, encoding, callback)`
        - `chunk` Buffer | String 将要被写入的数据块。除非decodeStrings配置被设置为false，否则将一直是一个buffer
        - `encoding` String 如果数据块是一个字符串，那么这就是编码的类型。如果是一个 buffer，那么则会忽略它
        - `callback` Function 当你处理完给定的数据块后调用这个函数
      - `Example: SimpleProtocol parser v2` **简单协议解析器v2**
    - `Class: stream.Writable` 需要实现底层`_write(chunk, encoding, callback)`
      - `new stream.Writable([options])`
        - `options`
          - `highWaterMark` Number write()方法开始返回false的缓冲级别。默认为16 kb，对于objectMode流则是16
          - `decodeStrings` Boolean 是否在传递给write()方法前将字符串解码成Buffer。默认为true
          - `objectMode` Boolean 是否write(anyObj)为一个合法操作。如果设置为true你可以写入任意数据而不仅是Buffer或字符串数据。默认为false
      - `writable._write(chunk, encoding, callback)`
        - `chunk` Buffer | String 将要被写入的数据块。除非decodeStrings配置被设置为false，否则将一直是一个buffer
        - `encoding` String 如果数据块是一个字符串，那么这就是编码的类型。如果是一个buffer，那么则会忽略它
        - `callback` Function 当你处理完给定的数据块后调用这个函数
      - `writable._writev(chunks, callback)`
        - `chunks` Array 将被写入的数据块数组。其中每一个数据都有如下格式：{ chunk: ..., encoding: ... }
        - `callback` Function 当你处理完给定的数据块后调用这个函数
  - `Simplified Constructor API` **可简单构造流而不使用继承**
    - `Duplex`
    - `Readable`
    - `Transform`
    - `Writable`
  - `Streams: Under the Hood` **内部细节**
    - `Buffering` 缓冲`Writable`流和`Readable`流都会分别在一个内部的叫`_writableState.buffer`或`_readableState.buffer`的对象里缓冲数据。潜在的被缓冲的数据量取决于被传递给构造函数的`highWaterMark`参数。
      - `stream.read(0)` 返回`null`
      - `stream.push('')`
    - `Compatibility with Older Node.js Versions` 与旧版本的兼容性
    - `Object Mode` 可以读出普通的`Javascript`值, 只会返回单个项目, 应该在子类的构造函数的`options`中设置对象模式, 可以用来实现序列化器

## 文件 及 模块
### filesystem
**文件系统, 所有的方法都有异步和同步两种形式。**
- `require('fs')`
  - `Class: fs.FSWatcher` `fs.watch()`返回的对象
    - `Event: 'change'`
    - `Event: 'error'`
    - `watcher.close()`
  - `Class: fs.ReadStream` **文件可读流**
    - `Event: 'open'`
  - `Class: fs.Stats` `fs.stat()` `fs.lstat()` `fs.fstat()`返回的对象
      - `stats.isFile()`
      - `stats.isDirectory()`
      - `stats.isBlockDevice()`
      - `stats.isCharacterDevice()`
      - `stats.isSymbolicLink() (only valid with fs.l- stat())`
      - `stats.isFIFO()`
      - `stats.isSocket()`
    - `Stat Time Values`
      - `atime`
      - `mtime`
      - `ctime`
      - `birthtime`
  - `Class: fs.WriteStream` 文件可写流
    - `Event: 'open'`
    - `writeStream.bytesWritten`
  - `fs.access(path[, mode], callback)` **对于指定的路径，检测用户的权限**
    - `fs.F_OK` **文件对于当前进程可见。这对于检查文件是否存在很有用，但是不提供任何rwx权限信息。这是默认值。**
    - `fs.R_OK` **文件对于当前进程可读。**
    - `fs.W_OK` **文件对于当前进程可写。**
    - `fs.X_OK` **文件对于当前进程可执行。**
  - `fs.accessSync(path[, mode])`
  - `fs.appendFile(file, data[, options], callback)` 向文件追加数据(可以是字符串或者Buffer)
  - `fs.appendFileSync(file, data[, options])`
  - `fs.chmod(path, mode, callback)`
  - `fs.chmodSync(path, mode)`
  - `fs.chown(path, uid, gid, callback)`
  - `fs.chownSync(path, uid, gid)`
  - `fs.close(fd, callback)`
  - `fs.closeSync(fd)`
  - `fs.createReadStream(path[, options])`
  - `fs.createWriteStream(path[, options])`
  - `fs.fchmod(fd, mode, callback)`
  - `fs.fchmodSync(fd, mode)`
  - `fs.fchown(fd, uid, gid, callback)`
  - `fs.fchownSync(fd, uid, gid)`
  - `fs.fstat(fd, callback)`
  - `fs.fstatSync(fd)`
  - `fs.fsync(fd, callback)`
  - `fs.fsyncSync(fd)`
  - `fs.ftruncate(fd, len, callback)`
  - `fs.ftruncateSync(fd, len)`
  - `fs.futimes(fd, atime, mtime, callback)`
  - `fs.futimesSync(fd, atime, mtime)`
  - `fs.lchmod(path, mode, callback)`
  - `fs.lchmodSync(path, mode)`
  - `fs.lchown(path, uid, gid, callback)`
  - `fs.lchownSync(path, uid, gid)`
  - `fs.link(srcpath, dstpath, callback)`
  - `fs.linkSync(srcpath, dstpath)`
  - `fs.lstat(path, callback)`
  - `fs.lstatSync(path)`
  - `fs.mkdir(path[, mode], callback)`
  - `fs.mkdirSync(path[, mode])`
  - `fs.open(path, flags[, mode], callback)`
    - `flags`
      - `r` **以只读的方式打开文件。如果文件不存在则抛出异常。**
      - `r+` **以读写的方式打开文件。如果文件不存在则抛出异常。**
      - `rs` **同步地以只读的方式打开文件。绕过操作系统的本地文件系统缓存。**
      - `'rs+'` **以读写的方式打开文件，告诉操作系统同步地打开它。注意事项请参阅'rs'。**
      - `'w'` **以只写的方式打开文件。如果文件不存在，将会创建它。如果已存在，将会覆盖它。**
      - `'wx'` **类似于'w'，但是路径不存在时会失败。**
      - `'w+'` **以读写的方式打开文件。如果文件不存在，将会创建它。如果已存在，将会覆盖它。**
      - `'wx+'` **类似于'w+'，但是路径不存在时会失败。**
      - `'a'` **以附加的形式打开文件。如果文件不存在，将会创建它。**
      - `'ax'` **类似于'a'，但是路径不存在时会失败。**
      - `'a+'` **以读取和附加的形式打开文件。如果文件不存在，将会创建它。**
      - `'ax+'` **类似于'a+'，但是路径不存在时会失败。**
  - `fs.openSync(path, flags[, mode])`
  - `fs.read(fd, buffer, offset, length, position, callback)` 
    - `buffer` 数据将要被写入的缓冲区。
    - `offset` 开始向buffer写入数据的缓冲区偏移量。
    - `length` 一个指定了读取字节数的整数。
    - `position` 一个指定了从文件的何处开始读取数据的整数。如果`position`是`null`，数据将会从当前位置开始读取。
  - `fs.readdir(path, callback)`
  - `fs.readdirSync(path)`
  - `fs.readFile(file[, options], callback)`
  - `fs.readFileSync(file[, options])`
  - `fs.readlink(path, callback)`
  - `fs.readlinkSync(path)`
  - `fs.realpath(path[, cache], callback)`
  - `fs.readSync(fd, buffer, offset, length, position)`
  - `fs.realpathSync(path[, cache])`
  - `fs.rename(oldPath, newPath, callback)` 重命名
  - `fs.renameSync(oldPath, newPath)`
  - `fs.rmdir(path, callback)` 删除路径
  - `fs.rmdirSync(path)`
  - `fs.stat(path, callback)` 文件状态
  - `fs.statSync(path)`
  - `fs.symlink(target, path[, type], callback)`
  - `fs.symlinkSync(target, path[, type])`
  - `fs.truncate(path, len, callback)`
  - `fs.truncateSync(path, len)`
  - `fs.unlink(path, callback)`
  - `fs.unlinkSync(path)`
  - `fs.unwatchFile(filename[, listener])`
  - `fs.utimes(path, atime, mtime, callback)`
  - `fs.utimesSync(path, atime, mtime)`
  - `fs.watch(filename[, options][, listener])`
    - `Caveats`
      - `Availability`
      - `Filename Argument`
  - `fs.watchFile(filename[, options], listener)`
  - `fs.write(fd, buffer, offset, length[, position], callback)` 向文件描述符`fd`指向的文件写入`buffer`, 不等待回调函数而多次执行`fs.write`是不安全的。这种情况下推荐使用`fs.createWriteStream`。
  - `fs.write(fd, data[, position[, encoding]], callback)`
  - `fs.writeFile(file, data[, options], callback)`
  - `fs.writeFileSync(file, data[, options])`
  - `fs.writeSync(fd, buffer, offset, length[, position])`
  - `fs.writeSync(fd, data[, position[, encoding]])`

### modules
模块加载系统, 该模块已经被锁定
- `Accessing the main module` 当文件被`Node.js`运行的时候, `require.main === module`
- `Addenda: Package Manager Tips`
  - `node_modules`中模块查找 从当前模块的的`node_modules`一直找到根目录的`node_modules`
  - 全局模块查找: `$HOME/.node_modules`=>`$HOME/.node_libraries`=>`$PREFIX/lib/node`
- `All Together...` 为了获得`require()`被调用时将要被加载的准确文件名，使用`require.resolve()`函数。
- `Caching` 缓存
  - `Module Caching Caveats` 缓存依赖于它们被解析后的文件名
- `Core Modules` `require('core_name')`直接加载
- `Cycles` **循环依赖应确保它们按照计划工作**
- `File Modules` `Node.js`依次添加`.js` `.json` `.node` 后缀名试图加载
- `Folders as Modules` 文件夹作为模块加载, `package.json=>main` 或 `index`
- `The module Object`
  - `module.children` 该模块所引入的模块
  - `module.exports` 对`module.exports`的赋值必须立刻完成。它不能在任何的回调函数中完成。在需要导出一个对象或者对象的属性时使用
    - `exports alias` `module.exports`的引用, 如果你将一个新的值赋予它，那么它将不再指向先前的那个值, 导出多个函数的时候使用
  - `module.filename` 模块被解析的文件名
  - `module.id` 模块的识别符(通常是被解析的文件名)
  - `module.loaded` 模块是否加载完成
  - `module.parent` 该模块的父模块
  - `module.require(id)` 该方法提供了一种像`require()`一样，从源模块中加载模块的方法。，为了这么做，你必须取得`module`对象的引用。因为`require()`返回`module.exports`，并且`module`对象是一个典型的只在特定的模块作用域中有效的变量，如果要使用它，必须被明确地导出。

### path
- `require('path')`
  - `path.basename(p[, ext])` **返回路径中的最后一部分**
  - `path.delimiter` 特定平台的路径分隔符，`;`或`:`
  - `path.dirname(p)` **返回路径的目录名**
  - `path.extname(p)` **返回路径的扩展名**
  - `path.format(pathObject)` **根据对象解析成路径**
  - `path.isAbsolute(path)` **判断是否是绝对路径**
  - `path.join([path1][, path2][, ...])` **连接所有参数,并规范化路径**
  - `path.normalize(p)` **规范字符串路径**
  - `path.parse(pathString)` **根据路径字符串返回一个对象**
  - `path.posix`
  - `path.relative(from, to)` 解析从`from`到`to`的相对路径
  - `path.resolve([from ...], to)` 将`to`解析为绝对路径, 如果`to`不是`from`参数的绝对路径, `to`会被添加到`from`的右边，直到找出绝对了路径。如果使用了`from`中所有的路径仍没有找出绝对路径，当前的工作路径也会被使用。
  - `path.sep` 返回特定平台的文件分隔符。`\\`或`/`
  - `path.win32`

### zlib
提供了`Gzip/Gunzip`，`Deflate/Inflate`和`DeflateRaw/InflateRaw`类的绑定。每个类都有相同的选项，并且都是 **可读/可写流**。
- `require('zlib')`
  - `Memory Usage Tuning` 内存使用调优, 默认的内存需求 `(1 << (windowBits+2)) +  (1 << (memLevel+9))`
  - `Constants` 常量
    - `zlib.Z_NO_FLUSH`
    - `zlib.Z_PARTIAL_FLUSH`
    - `zlib.Z_SYNC_FLUSH`
    - `zlib.Z_FULL_FLUSH`
    - `zlib.Z_FINISH`
    - `zlib.Z_BLOCK`
    - `zlib.Z_TREES`
    - `zlib.Z_OK`
    - `zlib.Z_STREAM_END`
    - `zlib.Z_NEED_DICT`
    - `zlib.Z_ERRNO`
    - `zlib.Z_STREAM_ERROR`
    - `zlib.Z_DATA_ERROR`
    - `zlib.Z_MEM_ERROR`
    - `zlib.Z_BUF_ERROR`
    - `zlib.Z_VERSION_ERROR`
    - `zlib.Z_NO_COMPRESSION`
    - `zlib.Z_BEST_SPEED`
    - `zlib.Z_BEST_COMPRESSION`
    - `zlib.Z_DEFAULT_COMPRESSION`
    - `zlib.Z_FILTERED`
    - `zlib.Z_HUFFMAN_ONLY`
    - `zlib.Z_RLE`
    - `zlib.Z_FIXED`
    - `zlib.Z_DEFAULT_STRATEGY`
    - `zlib.Z_BINARY`
    - `zlib.Z_TEXT`
    - `zlib.Z_ASCII`
    - `zlib.Z_UNKNOWN`
    - `zlib.Z_DEFLATED`
    - `zlib.Z_NULL`
  - `Class Options`
    - `flush` (默认：`zlib.Z_NO_FLUSH`)
    - `chunkSize` (默认：16*1024)
    - `windowBits`
    - `level` (仅用于压缩)
    - `memLevel` (仅用于压缩)
    - `strategy` (仅用于压缩)
    - `dictionary` (仅用于`deflate/inflate`，默认为空目录)
  - `Class: zlib.Deflate`
  - `Class: zlib.DeflateRaw`
  - `Class: zlib.Gunzip`
  - `Class: zlib.Gzip`
  - `Class: zlib.Inflate`
  - `Class: zlib.InflateRaw`
  - `Class: zlib.Unzip`
  - `Class: zlib.Zlib`
    - `zlib.flush([kind], callback)`
    - `zlib.params(level, strategy, callback)` 动态地更新压缩等级和压缩策略。只适用于`deflate`算法
    - `zlib.reset()` 将`compressor/decompressor`重置为默认值。只适用于`inflate`和`deflate`算法。
  - `zlib.createDeflate([options])`
  - `zlib.createDeflateRaw([options])`
  - `zlib.createGunzip([options])`
  - `zlib.createGzip([options])`
  - `zlib.createInflate([options])`
  - `zlib.createInflateRaw([options])`
  - `zlib.createUnzip([options])` 通过自动探测头信息，解压`Gzip`或`Deflate`压缩流。
  - `Convenience Methods` **便捷方法** 所有的方法接受一个字符串或一个`buffer`作为第一个参数，并且第二个参数是一个可选的`zlib`类的配置，并且会以`callback(error, result)`的形式执行提供的回调函数。每一个方法都有一个同步版本，除去回调函数，它们接受相同的参数。
    - `zlib.deflate(buf[, options], callback)`
    - `zlib.deflateRaw(buf[, options], callback)`
    - `zlib.deflateRawSync(buf[, options])`
    - `zlib.deflateSync(buf[, options])`
    - `zlib.gunzip(buf[, options], callback)`
    - `zlib.gunzipSync(buf[, options])`
    - `zlib.gzip(buf[, options], callback)`
    - `zlib.gzipSync(buf[, options])`
    - `zlib.inflate(buf[, options], callback)`
    - `zlib.inflateRaw(buf[, options], callback)`
    - `zlib.inflateRawSync(buf[, options])`
    - `zlib.inflateSync(buf[, options])`
    - `zlib.unzip(buf[, options], callback)`
    - `zlib.unzipSync(buf[, options])`

## 系统
### os
**获取操作系统相关信息**
- `require('os')` **稳定**
  - `os.EOL` **系统文件结束符(Linux \n)**
  - `os.arch()` **系统cpu架构 'x64'，'arm' 'ia32'。返回process.arch值。**
  - `os.cpus()` **返回系统cpu和时间(包含cpu花费毫秒数的对象)**
  - `os.endianness()` **CPU 的字节序。BE为大端字节序，LE为小端字节序**
  - `os.freemem()` **系统剩余内存**
  - `os.homedir()` **当前用户的主目录**
  - `os.hostname()` **当前系统的主机名**
  - `os.loadavg()` **包含1 5 15 分钟平均负载的数组**
  - `os.networkInterfaces()` **获取系统的网络接口列表**
  - `os.platform()` **操作系统平台。'darwin'，'freebsd'，'linux'，'sunos' 'win32'。返回process.platform值**
  - `os.release()` **操作系统发行版本**
  - `os.tmpdir()` **操作系统临时文件夹**
  - `os.totalmem()` **操作系统总内存**
  - `os.type()` **操作系统名 'Linux' 'Darwin' 'Windows_NT'。**
  - `os.uptime()` **返回操作系统的运行时间（秒）**

### process
`process`是一个全局对象, 是`EventEmitter`的一个实例
- `Event: 'beforeExit'`
- `Event: 'exit'`
- `Event: 'message'`
- `Event: 'rejectionHandled'` 当一个`Promise`被“拒绝”并且一个错误处理函数被附给了它（如.catch()）时的下一个事件循环之后触发。
- `Event: 'uncaughtException'` 监听未处理异常事件
- `Event: 'unhandledRejection'` 在一个事件循环中，当一个`promise`被“拒绝”并且没有附属的错误处理函数时触发
- `Exit Codes`
  - `0` 正常退出
  - `1` 未捕获异常
  - `3` 内部`Javascript`解析错误
  - `4` 内部`Javascript`求值错误
  - `5` v8中严重的不可恢复的错误
  - `6` 内部异常处理函数丧失功能, 未捕获异常
  - `7` 内部异常处理函数运行时失败, 未捕获异常
  - `9` 无效参数
  - `10` 内部`Javascript`运行时错误
  - `12` 无效的调试参数
  - `>128` `Node.js`收到了`SIGKILL`或`SIGHUP`致命信号, 将以`128`加上信号码的退出码退出
- `Signal Events`
  - `SIGUSR1`
  - `SIGPIPE`
  - `SIGTERM`
  - `SIGBREAK`
  - `SIGINT` 支持所有的平台。可以由 `CTRL+C` 产生（尽管它可能是可配置的）。当启用终端的`raw mode`时，它不会产生。
  - `SIGWINCH`
  - `SIGKILL` `可以被添加监听器。它会无条件得在所有平台下关闭io`
  - `SIGSTOP`
- `process.abort()` 触发`abort`事件, 导致`Node.js`退出, 并创建一个核心文件
- `process.arch` 当前的处理器结构：'arm'，'ia32'或'x64'
- `process.argv` 命令行参数的数组
- `process.chdir(directory)` 为当前进程改变当前工作目录, 如果失败, 抛出异常
- `process.config` 一个表示用于编译当前`Node.js`执行文件的配置的 `JavaScript` 对象。
  - `process.connected` `process.disconnect()`执行后, 把该值变为`false`
- `process.cwd()` 当前进程运行目录
- `process.disconnect()` 关闭连接到父进程的`IPC`通道, 与`childProcess.disconnect()`相同
- `process.env` 一个宝航用户环境变量的对象
- `process.execArgv` 这是在启动时`Node.js`自身参数的集合。这些参数不会出现在`process.argv`中，并且不会包含`Node.js`可执行文件，脚本名和其他脚本名之后的参数。这些参数对开启和父进程相同执行环境的子进程非常有用。
- `process.execPath` 启动应用的绝对路径名
- `process.exit([code])` 以退出码退出
- `process.exitCode` 退出码
- `process.getegid()`
- `process.geteuid()`
- `process.getgid()`
- `process.getgroups()`
- `process.getuid()`
- `process.hrtime()` 以`[seconds, nanoseconds]`元组数组的形式返回高分辨时间。是相对于过去的任意时间。它与日期无关所以不用考虑时区等因素。它的主要用途是衡量程序性能
- `process.initgroups(user, extra_group)`
- `process.kill(pid[, signal])`
- `process.mainModule` 检索`require.main`的备用方式。区别是，如果主模块在运行时改变，`require.main`可能仍指向改变发生前的被引入的原主模块
- `process.memoryUsage()` 进程内存使用情况（用字节描述）的对象。
- `process.nextTick(callback[, arg][, ...])` 这不是`setTimeout(fn, 0)`的简单别名，它更有效率。在之后的`tick`中，它在任何其他的 I/O 事件（包括`timer`）触发之前运行。
- `process.pid` 进程`pid`
- `process.platform` 'darwin'，'freebsd'，'linux'，'sunos'或'win32'
- `process.release` 包含`name` `sourceUrl` `headersUrl` `libUrl`
- `process.send(message[, sendHandle][, callback])`
- `process.setegid(id)`
- `process.seteuid(id)`
- `process.setgid(id)`
- `process.setgroups(groups)`
- `process.setuid(id)`
- `process.stderr` 指向`stderr`的可写流 无法被关闭
- `process.stdin` 指向`stdin`的可读流
- `process.stdout` 指向`stdout`的可写流 无法被关闭
- `process.title` 设置/获取 `ps` 中显示的进程名
- `process.umask([mask])` 设置或读取进程的文件模式的创建掩码。子进程从父进程中继承这个掩码。返回旧的掩码如果`mask`参数被指定。否则，会返回当前掩码。
- `process.uptime()` 进程执行的秒数
- `process.version` 一个暴露`NODE_VERSION`的编译时存储属性
- `process.versions` 一个暴露 `Node.js` 版本和它的依赖的字符串属性

### tty
`tty` 功能基本上不直接使用, 只在检测是否处于 `tty` 环境的时候使用, 包含`tty.ReadStream` `tty.WriteStream`两个`class`
- `Class: ReadStream` net.Socket子类，代表了一个 TTY 中的可读部分。process.stdin是仅有的tty.ReadStream实例
  - `rs.isRaw` 一个被初始化为false的布尔值。它代表了tty.ReadStream实例的“原始”状态。
  - `rs.setRawMode(mode)` mode必须为true或false。它设定tty.ReadStream的属性表现得像原始设备或默认值。isRaw将会被设置为结果模式（resulting mode）
- `Class: WriteStream` net.Socket子类，代表了一个 TTY 中的可写部分。process.stdout是仅有的tty.WriteStream实例
  - `Event: 'resize'` 当列属性或行属性被改变时，通过refreshSize()被触发
  - `ws.columns` 当前tty列数
  - `ws.rows` 当前tty行数
- `tty.isatty(fd)` 如果fd关联了终端，就返回true，反之返回false

```javascript
process.stdout.on('resize', function() {
  console.log('screen size has changed!');
  console.log(process.stdout.columns + 'x' + process.stdout.rows);
});
```

### v8
**v8内部的接口暴露**
- `require('v8')`
  - `getHeapStatistics()` **返回v8堆内存状态**
  - `setFlagsFromString(string)` **设置额外的 V8 命令行标识。请谨慎使用；在虚拟机启动后改变设定可能会产生不可预测的行为，包括程序崩溃或数据丢失。或者它也可能什么都没有做。**

### vm
`JavaScript`代码会被编译且立刻执行 或 编译，保存，并且稍后执行。
- `require('vm')`
  - `Class: Script`
    - `new vm.Script(code, options)`
    - `script.runInContext(contextifiedSandbox[, options])`
    - `script.runInNewContext([sandbox][, options])`
    - `script.runInThisContext([options])`
  - `vm.createContext([sandbox])` 指定一个`sandbox`, 将其上下文化
  - `vm.isContext(sandbox)` 判断是否`sandbox`已经上下文化
  - `vm.runInContext(code, contextifiedSandbox[, options])` 在`sandbox`上下文运行
  - `vm.runInDebugContext(code)` 在`debug`上下文环境中运行
  - `vm.runInNewContext(code[, sandbox][, options])` 如果有`sandbox`就在该环境中运行,否则创建一个新的已上下文化的沙箱, 然后将沙箱作为全局对象运行代码并返回结果
  - `vm.runInThisContext(code[, options])` 编译代码，运行它，然后返回结果。运行中的代码不能访问本地作用域，但是可以访问当前的全局对象。
    - `options`
      - `filename`
      - `displayErrors`
      - `timeout`

## 安全
### crypto
- `require('crypto')`
  - `Class: Certificate`
    - `Certificate.exportChallenge(spkac)`
    - `Certificate.exportPublicKey(spkac)`
    - `Certificate.verifySpkac(spkac)`
  - `Class: Cipher` 加密数据类
    - `cipher.final([output_encoding])` 返回所有的剩余的加密内容
    - `cipher.getAuthTag()`
    - `cipher.setAAD(buffer)`
    - `cipher.setAutoPadding(auto_padding=true)`
    - `cipher.update(data[, input_encoding][, output_encoding])`
  - `Class: Decipher` 解密数据类
    - `decipher.final([output_encoding])`
    - `decipher.setAAD(buffer)`
    - `decipher.setAuthTag(buffer)`
    - `decipher.setAutoPadding(auto_padding=true)` 你可以禁用自动填充输入数据至块大小
    - `decipher.update(data[, input_encoding][, output_encoding])`
  - `Class: DiffieHellman`
    - `diffieHellman.computeSecret(other_public_key[, input_encoding][, `output_encoding])
    - `diffieHellman.generateKeys([encoding])`
    - `diffieHellman.getGenerator([encoding])`
    - `diffieHellman.getPrime([encoding])`
    - `diffieHellman.getPrivateKey([encoding])`
    - `diffieHellman.getPublicKey([encoding])`
    - `diffieHellman.setPrivateKey(private_key[, encoding])`
    - `diffieHellman.setPublicKey(public_key[, encoding])`
    - `diffieHellman.verifyError`
  - `Class: ECDH`
    - `ECDH.computeSecret(other_public_key[, input_encoding][, output_encoding])`
    - `ECDH.generateKeys([encoding[, format]])`
    - `ECDH.getPrivateKey([encoding])`
    - `ECDH.getPublicKey([encoding[, format]])`
    - `ECDH.setPrivateKey(private_key[, encoding])`
  - `Class: Hash` 创建数据哈希摘要 <= `crypto.createHash`
    - `hash.digest([encoding])` 计算所有的被传递的数据的摘要
    - `hash.update(data[, input_encoding])` 使用给定的data更新哈希内容
  - `Class: Hmac` 创建 hmac 加密图谱（cryptographic）
    - `hmac.digest([encoding])`
    - `hmac.update(data)`
  - `Class: Sign`
    - `sign.sign(private_key[, output_format])`
    - `sign.update(data)`
  - `Class: Verify`
    - `verifier.update(data)`
    - `verifier.verify(object, signature[, signature_format])`
  - `crypto.DEFAULT_ENCODING`
  - `crypto.createCipher(algorithm, password)` 创建和返回一个`cipher`对象，指定指定的算法和密码。
  - `crypto.createCipheriv(algorithm, key, iv)` 创建和返回一个`cipher`对象，指定指定的算法，密钥和 iv。
  - `crypto.createDecipher(algorithm, password)` 根据给定的算法和密码,创建一个解密的类
  - `crypto.createDecipheriv(algorithm, key, iv)` 根据给定的算法秘钥iv,创建一个解密的类
  - `crypto.createDiffieHellman(prime[, prime_encoding][, generator][, generator_encoding])` 通过给定的质数，和可选的生成器，创建一个迪菲－赫尔曼密钥交换对象
  - `crypto.createDiffieHellman(prime_length[, generator])` 创建一个迪菲－赫尔曼密钥交换对象
  - `crypto.createECDH(curve_name)` 使用由`curve_name`指定的预定义椭圆，创建一个椭圆曲线`EC`迪菲－赫尔曼密钥交换对象
  - `crypto.createHash(algorithm)` 创建并返回一个哈希对象
  - `crypto.createHmac(algorithm, key)` 创建并返回一个 hmac 对象，即通过给定的算法和密钥生成的加密图谱（cryptographic）。
  - `crypto.createSign(algorithm)` 使用指定的算法，创建并返回一个数字签名类
  - `crypto.createVerify(algorithm)` 使用给定的算法，创建并返回一个数字签名验证类
  - `crypto.getCiphers()` 返回支持的加密算法的名字数组
  - `crypto.getCurves()` 返回支持椭圆加密算法的名字数组
  - `crypto.getDiffieHellman(group_name)`
  - `crypto.getHashes()` 返回支持的哈希算法的名字数组
  - `crypto.pbkdf2(password, salt, iterations, keylen[, digest], callback)`
  - `crypto.pbkdf2Sync(password, salt, iterations, keylen[, digest])`
  - `crypto.privateDecrypt(private_key, buffer)`
  - `crypto.privateEncrypt(private_key, buffer)`
  - `crypto.publicDecrypt(public_key, buffer)`
  - `crypto.publicEncrypt(public_key, buffer)`
  - `crypto.randomBytes(size[, callback])`
  - `crypto.setEngine(engine[, flags])`
    - `engine` 引擎可以通过 id 或 引擎共享库的路径来选择
    - `flags`
      - `ENGINE_METHOD_RSA`
      - `ENGINE_METHOD_DSA`
      - `ENGINE_METHOD_DH`
      - `ENGINE_METHOD_RAND`
      - `ENGINE_METHOD_ECDH`
      - `ENGINE_METHOD_ECDSA`
      - `ENGINE_METHOD_CIPHERS`
      - `ENGINE_METHOD_DIGESTS`
      - `ENGINE_METHOD_STORE`
      - `ENGINE_METHOD_PKEY_METH`
      - `ENGINE_METHOD_PKEY_ASN1_METH`
      - `ENGINE_METHOD_ALL` 默认
      - `ENGINE_METHOD_NONE`

### tls/ssl
tls模块使用 `OpenSSL` 来提供传输层的安全 和/或 安全`socket`层：已加密的流通信。
**TLS/SSL 是一种公/私钥架构。每个客户端和每个服务器都必须有一个私钥。一个私钥通过像如下的方式创建：**
- 私钥 `openssl genrsa -out ryans-key.pem 2048`

**所有的服务器和部分的客户端需要一个证书。证书是被 CA 签名或自签名的公钥。**
- 获取证书签署请求`Certificate Signing Request(CSR)` `openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem`
- 通过`CSR`创建证书
  - 自签名 `openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem`
  - 交给`CA`请求签名

**为了完全向前保密（PFS），需要产生一个 迪菲-赫尔曼 参数**
- `openssl dhparam -outform PEM -out dhparam.pem 2048`
- 创建`.pfx`或`.p12` 
`openssl pkcs12 -export -in agent5-cert.pem -inkey agent5-key.pem -certfile ca-cert.pem -out agent5.pfx`

- `in` 证书
- `inkey` 私钥
- `certfile` 将所有`CA certs`串联在一个文件中，就像`cat ca1-cert.pem ca2-cert.pem > ca-cert.pem`

**减缓客户端发起的重新协商攻击**
- `tls.CLIENT_RENEG_LIMIT` 重新协商限制，默认为`3`。
- `tls.CLIENT_RENEG_WINDOW` 重新协商窗口（秒），默认为`10`分钟。

**NPN** 通过多个协议（HTTP，SPDY）使用一个 TLS 服务器。
**SNI** 通过多个有不同的 SSL 证书的主机名来使用一个 TLS 服务器。

**完全向前保密**
通过在每次握手中（而不是所有的会话都是同样的密钥）随机地产生用于密钥-协商的密钥对来实现。实现了这个技术的方法被称作`ephemeral`

存在性能问题, 因为密钥的生成是昂贵的

- `DHE` 一个 迪菲-赫尔曼 密钥-协商 协议的ephemeral版本。
- `ECDHE` 一个椭圆曲线 迪菲-赫尔曼 密钥-协商 协议的ephemeral版本。

- `require('tls')`
  - `ALPN, NPN and SNI`
  - `Client-initiated renegotiation attack mitigation`
  - `Modifying the Default TLS Cipher suite`
  - `Perfect Forward Secrecy`
  - `Class: CryptoStream`
    - `cryptoStream.bytesWritten`
  - `Class: SecurePair` <= `tls.createSecurePair`
    - `Event: 'secure'` 成功建立一个安全连接时触发, 与检查服务器的`secureConnection`事件相似，`pair.cleartext.authorized`必须被检查，来确认证书是否使用了合适的授权。
  - `Class: tls.Server` 这是一个`net.Server`的子类，并且与其有相同的方法。除了只接受源 TCP 连接，这个类还接受通过TLS 或 SSL 加密的数据。
    - `Event: 'clientError'` `function (exception, tlsSocket) { }`
当安全连接被建立之前，服务器触发了一个error事件时触发
    - `Event: 'newSession'` `function (sessionId, sessionData, callback) { }`在 TLS 会话创建时触发。可能会被用来在外部存储会话。callback必须最终被执行，否则安全连接将不会收到数据。**注意：这个事件监听器只会影响到它被添加之后建立的连接。**
    - `Event: 'OCSPRequest'` `function (certificate, issuer, callback) { }` 当客户端发送一个证书状态请求时触发。
      - 典型流程
        - 客户端连接到服务器，然后发送一个`OCSPRequest`给它（通过`ClientHello`中扩展的状态信息）。
        - 服务器接受请求，然后执行`OCSPRequest`事件监听器（如果存在）。
        - 服务器通过证书或发起人抓取 OCSP url，然后向 CA 发起一个 OCSP 请求。
        - 服务器从 CA 收到一个`OCSPResponse`，然后通过回调函数的参数将其返回给客户端。
        - 客户端验证响应，然后销毁`socket`或者进行握手。
    - `Event: 'resumeSession'` `function (sessionId, callback) { }`当客户端想要恢复先前的 TLS 会话时触发。**注意：这个事件监听器只会影响到它被添加之后建立的连接。**
    - `Event: 'secureConnection'` `function (tlsSocket) {}` 当一个新连接被成功握手后，这个事件会被触发。参数是一个`tls.TLSSocket`实例。它拥有所有普通流拥有的事件和方法。
      - `socket.authorized`是一个表明了 客户端是否通过提供的服务器 CA 来进行了认证 的布尔值。如果`socket.authorized`为`false`，那么`socket.authorizationError`将被设置用来描述授权失败的原因。一个不明显的但是值得提出的点：依靠 TLS 服务器的设定，未授权的连接可能会被接受。
      - `socket.npnProtocol`是一个包含了被选择的 NPN 协议的字符串。
      - `socket.servernam`是一个包含了通过 SNI 请求的服务器名的字符串。
    - `server.addContext(hostname, context)` 添加安全内容，它将会在如果客户端请求的 SNI 主机名被传递的主机名匹配（可以使用通配符）时使用。`context`可以包含密钥，证书，`CA` 和/或 其他任何`tls.createSecureContext`的`options`参数的属性。
    - `server.address()` 返回绑定的地址
    - `server.close([callback])` 阻止服务器继续接收新连接。这个函数是异步的，当服务器触发一个close事件时，服务器将最终被关闭。
    - `server.connections` 服务器当前连接数
    - `server.getTicketKeys()`
    - `server.listen(port[, hostname][, callback])` 从指定的端口和主机名接收连接。如果hostname被忽略，服务器会在当 `IPv6` 可用时，接受任意 `IPv6` 地址`（::）`上的连接，否则为任意 `IPv4（0.0.0.0）`上的。将`port`设置为`0`则会赋予其一个随机端口。
    - `server.setTicketKeys(keys)`
    - `server.maxConnections` 服务器最大连接数, 通过设置这个来拒绝连接
  - `Class: tls.TLSSocket` 
`net.Socket`实例的包装，替换了内部`socket`的 读/写例程，来提供透明的对 传入/传出数据 的 加密/解密, 这个实例实现了一个双工流接口。它有所有普通流所拥有的事件和方法。
    - `new tls.TLSSocket(socket[, options])`
      - `options`
        - `secureContext` 一个可选的通过tls.createSecureContext( ... )得到的 TLS 内容对象。
        - `isServer` 如果为true，TLS socket将会在服务器模式（server-mode）下被初始化。
        - `server` 一个可选的net.Server实例。
        - `requestCert` 可选，参阅tls.createSecurePair。
        - `rejectUnauthorized` 可选，参阅tls.createSecurePair。
        - `NPNProtocols` 可选，参阅tls.createServer。
        - `SNICallback` 可选，参阅tls.createServer。
        - `session` 可选，一个Buffer实例，包含了 TLS 会话。
        - `requestOCSP` 可选，如果为true，OCSP状态请求扩展将会被添加到客户端 hello，并且OCSPResponse事件将会在建立安全通信前，于socket上触发。
    - `Event: 'OCSPResponse'` `function (response) { }` 如果`requestOCSP`选项被设置，这个事件会触发。`response`是一个`buffer`对象，包含了服务器的 `OCSP` 响应。
习惯上，`response`是一个来自服务器的 `CA`（包含服务器的证书撤销状态）的已签名对象。
    - `Event: 'secureConnect'`
    - `tlsSocket.address()` 返回绑定的地址
    - `tlsSocket.authorized` 如果对等（peer）证书通过一个指定的 CA 被签名，那么这个值为true。否则为false。
    - `tlsSocket.authorizationError` 对等（peer）的证书没有被验证的原因。这个值只在`tlsSocket.authorized === false`时可用。
    - `tlsSocket.encrypted` 用来区分`TLSsocket`和 普通`socket`
    - `tlsSocket.getCipher()` 返回一个代表了当前连接的加密器名和`SSL/TLS`协议版本的对象。
    - `tlsSocket.getEphemeralKeyInfo()`
    - `tlsSocket.getPeerCertificate([ detailed ])` 返回了一个代表了对等证书的对象。返回的对象有一些属性与证书的属性一致。如果detailed参数被设置为true，issuer属性的完整链都会被返回，如果为false，只返回不包含issuer属性的顶端的证书。如果peer没有提供一个证书，那么会返回null或空对象。
    - `tlsSocket.getSession()` 返回`ASN.1`编码的 `TLS` 会话，如果没有被协商，返回`undefined`。可以被用在重新连接服务器时，加速握手的建立。
    - `tlsSocket.getTLSTicket()` 仅在客户端 `TLS socket`中工作。仅在调试时有用，因为会话重新使用了给`tls.connect`提供的`session`选项。
返回 `TLSticket`，如果没有被协商，返回`undefined`。
    - `tlsSocket.localAddress` 本地IP地址
    - `tlsSocket.localPort` 本地端口
    - `tlsSocket.remoteAddress` 远程 IP 地址
    - `tlsSocket.remoteFamily` 远程 IP 协议族
    - `tlsSocket.remotePort` 远程端口
    - `tlsSocket.renegotiate(options, callback)` 初始化 TLS 重新协商过程。
      - `options`
        - `rejectUnauthorized`
        - `requestCert`
    - `tlsSocket.setMaxSendFragment(size)` 设置`TLS` 碎片大小的最大值（默认最大值为`16384`，最小值为`512`）。设置成功返回true，否则返回false。
  - `tls.connect(options[, callback])`
  - `tls.connect(port[, host][, options][, callback])` 根据给定的 端口和主机 或 `options.port`和`options.host`创建一个新的客户端连接。如果忽略了主机，默认为`localhost`, 返回一个`tls.TLSSocket`对象
    - `options`
      - `host` 客户端应该连接到的主机。
      - `port` 客户端应该连接到的端口。
      - `socket` 根据给定的socket的来建立安全连接，而不是创建一个新的socket。如果这个选项被指定，host和port会被忽略。
      - `path` 创建到path的 unix socket连接。如果这个选项被指定，host和port会被忽略。
      - `pfx` 一个PFX或PKCS12格式的包含了私钥，证书和 CA 证书的字符串或buffer。
      - `key` 一个PEM格式的包含了客户端私钥的字符串或buffer（可以是密钥的数组）。
      - `passphrase` 私钥或pfx的密码字符串。
      - `cert` 一个PEM格式的包含了证书密钥的字符串或buffer（可以是密钥的数组）。
      - `ca` 一个PEM格式的受信任证书的字符串或buffer数组。如果它被忽略，将使用一些众所周知的CA，像VeriSign。这些被用来授权连接。
      - `ciphers` 一个描述了要使用或排除的加密器，由:分割。使用的默认加密器套件与tls.createServer使用的一样。
      - `rejectUnauthorized` 若被设置为true，会根据提供的 CA 列表来验证服务器证书。当验证失败时，会触发error事件；err.code包含了一个 OpenSSL 错误码。默认为true。
      - `NPNProtocols` 包含支持的NPN协议的字符串或buffer数组。buffer必须有以下格式：0x05hello0x05world，第一个字节是下一个协议名的长度（传递数组会更简单：['hello', 'world']）。
      - `servername` SNI TLS 扩展的服务器名。
      - checkServerIdentity(servername, `cert)` 为根据证书的服务器主机名检查提供了覆盖。必须在验证失败时返回一个错误，验证通过时返回undefined。
      - `secureProtocol` 将要使用的 SSL 方法，举例，SSLv3_method将强制使用 SSL v3。可用的值取决于 OpenSSL 的安装和SSL_METHODS常量中被定义的值。
      - `session` 一个Buffer实例，包含了 TLS 会话。     
  - `tls.createSecureContext(details)` 创建一个证书对象
    - `details`
      - `pfx` 一个含有PFX或PKCS12编码的私钥，证书和 CA 证书的字符串或buffer。
      - `key` 一个含有PEM编码的私钥的字符串。
      - `passphrase` 一个私钥或pfx密码字符串。
      - `cert` 一个含有PEM加密证书的字符串。
      - `ca` 一个用来信任的PEM加密 CA 证书的字符串或字符串列表。
      - `crl` 一个PEM加密CRL的字符串或字符串列表。
      - `ciphers` 一个描述需要使用或排除的加密器的字符串。更多加密器的格式细节参阅 http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT。
      - `honorCipherOrder` 选择一个加密器时，使用使用服务器的首选项而不是客户端的首选项。默认为true。更多细节参阅tls模块文档。
  - `tls.createSecurePair([context][, isServer][, requestCert][, rejectUnauthorized][, options])` 根据两个流，创建一个新的安全对（secure pair）对象，一个是用来读/写加密数据，另一个是用来读/写明文数据。通常加密的数据是从加密数据流被导流而来，明文数据被用来作为初始加密流的一个替代。返回一个带有`cleartext`和 `encrypted`流 属性的对象
    - `credentials` 一个通过tls.createSecureContext( ... )得到的安全内容对象。
    - `isServer` 一个表明了 是否这个tls连接应被作为一个服务器或一个客户端打开 的布尔值。
    - `requestCert` 一个表明了 是否服务器应该向连接的客户端请求证书 的布尔值。只应用于服务器连接。
    - `rejectUnauthorized` 一个表明了 是否服务器应该拒绝包含不可用证书的客户端 的布尔值。只应用于启用了requestCert的服务器
  - `tls.createServer(options[, secureConnectionListener])`
    - `options`
      - `pfx` 一个包含PFX或PKCS12格式的私钥，加密凭证和 CA 证书的字符串或buffer。
      - `key` 一个带着PEM加密私钥的字符串（可以是密钥数组）**（必选）**。
      - `passphrase` 一个私钥或pfx密码字符串。
      - `cert` 一个包含了PEM格式的服务器证书密钥的字符串或buffer（可以是cert数组）**（必选）**。
      - `ca` 一个PEM格式的受信任证书的字符串或buffer数组。如果它被忽略，将使用一些众所周知的“根”CA，像VeriSign。这些被用来授权连接。
      - `crl ` 一个PEM编码的证书撤销列表（Certificate Revocation List）字符串或字符串列表。
      - `ciphers` 一个描述要使用或排除的加密器的字符串，通过:分割。默认的加密器套件是：
        - `ECDHE-RSA-AES128-GCM-SHA256`
        - `ECDHE-ECDSA-AES128-GCM-SHA256`
        - `ECDHE-RSA-AES256-GCM-SHA384`
        - `ECDHE-ECDSA-AES256-GCM-SHA384`
        - `DHE-RSA-AES128-GCM-SHA256`
        - `ECDHE-RSA-AES128-SHA256`
        - `DHE-RSA-AES128-SHA256`
        - `ECDHE-RSA-AES256-SHA384`
        - `DHE-RSA-AES256-SHA384`
        - `ECDHE-RSA-AES256-SHA256`
        - `DHE-RSA-AES256-SHA256`
        - `HIGH`
   
      - `ecdhCurve` 一个描述用于ECDH密钥协商的已命名的椭圆的字符串，如果要禁用ECDH，就设置为false。
    默认值为prime256v1（NIST P-256）。使用crypto.getCurves()来获取一个可用的椭圆列表。在最近的发行版中，运行`openssl ecparam -list_curves`命令也会展示所有可用的椭圆的名字和描述。
      - `dhparam` 一个包含了迪菲-赫尔曼参数的字符串或buffer，要求有完全向前保密。使用openssl dhparam来创建它。它的密钥长度需要大于等于1024字节，否则会抛出一个错误。强力推荐使用2048或更多位，来获取更高的安全性。如果参数被忽略或不合法，它会被默默丢弃并且DHE加密器将不可用。
      - `handshakeTimeout` 当 SSL/TLS 握手在这个指定的毫秒数后没有完成时，终止这个链接。默认为120秒。
    当握手超时时，tls.Server会触发一个clientError事件。
      - `honorCipherOrder ` 选择一个加密器时，使用使用服务器的首选项而不是客户端的首选项。默认为true。
      - `requestCert` 如果设置为true，服务器将会向连接的客户端请求一个证书，并且试图验证这个证书。默认为true。
      - `rejectUnauthorized` 如果设置为true，服务器会拒绝所有没有在提供的 CA 列表中被授权的客户端。只有在requestCert为true时这个选项才有效。默认为false。
      - `NPNProtocols` 一个可用的NPN协议的字符串或数组（协议应该由它们的优先级被排序）。
      - `SNICallback(servername, cb)` 当客户端支持SNI TLS扩展时，这个函数会被调用。这个函数会被传递两个参数：servername 和 cb。SNICallback必须执行cb(null, ctx),ctx是一个SecureContext实例（你可以使用tls.createSecureContext(...)来获取合适的SecureContext）。如果SNICallback没有被提供 - 默认的有高层次API的回调函数会被使用（参阅下文）。
      - `sessionTimeout` 一个指定在 TLS 会话标识符和 TLS 会话门票（tickets）被服务器创建后的超时时间。更多详情参阅SSL_CTX_set_timeout。
      - `ticketKeys` 一个由16字节前缀，16字节 hmac 密钥，16字节 AEC 密钥组成的48字节buffer。你可以使用它在不同的tls服务器实例上接受tls会话门票。 **注意：会在cluster模块工作进程间自动共享。**
      - `sessionIdContext` 一个包含了会话恢复标识符的字符串。如果requestCert为true，默认值是通过命令行生成的 MD5 哈希值。否则，就将不提供默认值。
      - `secureProtocol` 将要使用的 SSL 方法，举例，SSLv3_method将强制使用 SSL v3。可用的值取决于 OpenSSL 的安装和SSL_METHODS常量中被定义的值。
  - `tls.getCiphers()` 支持 SSL 加密器的名字数组

## 调试
### console
- `Class: Console`
  - `new Console(stdout[, stderr])`
- `console`
  - `console.assert(value[, message][, ...])` 类似于`assert.ok()`,但是错误信息使用`util.format(message...)`
  - `console.dir(obj[, options])` Uses `util.inspect()` on obj
    - `showHidden`
    - `depth`
    - `colors`
  - `console.error([data][, ...])`
  - `console.log([data][, ...])`
  - `console.time(label)` **日志开始时间**
  - `console.timeEnd(label)` **日志结束时间**
  - `console.trace(message[, ...])` `Trace: with stderr`

### debugger
- `Watchers` `watch("my_expression")` `unwatch("my_expression")`
- `Commands reference`
  - `Stepping`
    - `cont, c` **继续**
    - `next, n` **下一步**
    - `step, s` **介入**
    - `out, o` **离开**
    - `pause` **暂停**
  - `Breakpoints`
    - `setBreakpoint(), sb()` **在当前行设置断点**
    - `setBreakpoint(line), sb(line)` **在指定行设置断点**
    - `setBreakpoint('fn()'), sb(...)` **在函数体第一个语句上设置断点**
    - `setBreakpoint('script.js', 1), sb(...)` **在script.js第一行设置断点**
    - `clearBreakpoint('script.js', 1), cb(...)`
  - `Info`
    - `backtrace, bt` **打印当前执行框架的回溯**
    - `list(5)` **勒出当前代码的前后5行上下文**
    - `watch(expr)` **为监视列表添加表达式**
    - `unwatch(expr)`
    - `watchers` **列出监视器所有表达式的值**
    - `repl` **打开调试器**
    - `exec expr` **执行表达式**
  - `Execution control`
    - `run` **运行**
    - `restart` **重启**
    - `kill` **结束**
  - `Various`
    - `scripts` **列出所有载入的脚本**
    - `version` **列出v8版本号**
- `Advanced Usage` **高级用法, 可以通过 PID 或 URI 连接**
  - `node debug -p <pid>`
  - `node debug <URI>`

### error
- `Error Propagation and Interception` **异常传播和拦截**
  - `Error events` **异常事件监听, 同步的采用try...catch**
  - `Node style callbacks` **回调函数**
- `JavaScript Errors` **JavaScript错误**
  - `Class: Error`
    - `new Error(message)`
    - `Error.captureStackTrace(targetObject[, constructorOpt])` 为`targetObject`创建一个.`stack`属性，它代表了`Error.captureStackTrace`被调用时，在程序中的位置。
    - `Error.stackTraceLimit` **初始值10**
    - `error.message`
    - `error.stack`
  - `Class: RangeError` **范围错误**
  - `Class: ReferenceError` **引用错误**
  - `Class: SyntaxError` **语法错误**
  - `Class: TypeError` **类型错误**
  - `Exceptions vs. Errors`
- `System Errors` **系统错误**
  - `Class: System Error`
    - `error.code`
    - `error.errno`
    - `error.syscall`
  - `Common System Errors` **常见的系统错误**
    - `EACCES: Permission denied` **权限错误**
    - `EADDRINUSE: Address already in use` **地址已经被使用**
    - `ECONNREFUSED: Connection refused` **连接拒绝**
    - `ECONNRESET: Connection reset by peer` **节点连接被重置**
    - `EEXIST: File exists` **文件已存在**
    - `EISDIR: Is a directory` **是目录**
    - `EMFILE: Too many open files in system` **系统打开太多文件**
    - `ENOENT: No such file or directory` **指定的文件或目录不存在**
    - `ENOTDIR: Not a directory` **不是一个文件夹**
    - `ENOTEMPTY: Directory not empty` **文件夹非空**
    - `EPERM: Operation not permitted` **操作不被允许**
    - `EPIPE: Broken pipe` **坏的管道**
    - `ETIMEDOUT: Operation timed out` **操作超时**

**向用户隐藏实现细节**
```javascript
function MyError() {
  Error.captureStackTrace(this, MyError);
}

// without passing MyError to captureStackTrace, the MyError
// frame would should up in the .stack property. by passing
// the constructor, we omit that frame and all frames above it.

new MyError().stack
```

### repl
一种交互运行`javascript`的环境
- `require('repl')`
  - `Environment Variable Options` 环境变量配置
    - `NODE_REPL_HISTORY`
    - `NODE_REPL_HISTORY_SIZE`
    - `NODE_REPL_MODE`
  - `Persistent History` `.node_repl_history`
  - `REPL Features`
    - `Commands`
      - `.break`
      - `.clear`
      - `.exit`
      - `.help`
      - `.save`
        - `.save - ./file/to/save- .js`
      - `.load`
        - `.load ./file/to/load.js`
      - `<ctrl>C` `.break`
      - `<ctrl>D` `.exit`
      - `<tab>`
    - `Customizing Object displays in the REPL` 默认使用`util.inspect()`, 可以自定义`inspect()`
  - `Class: REPLServer` 继承于`Readline`接口
    - `Event: 'exit'` **退出**
    - `Event: 'reset'` **被重置**
    - `replServer.defineCommand(keyword, cmd)` 自定义操作命令
      - `keyword` String
      - `cmd` Object|Function
        - `help`
        - `action` 
    - `replServer.displayPrompt([preserveCursor])`
  - `repl.start(options)`
    - `prompt`
    - `input`
    - `output`
    - `terminal`
    - `eval`
    - `useColors`
    - `useGlobal`
    - `ignoreUndefined`
    - `writer`
    - `replMode`
      - `repl.REPL_MODE_SLOPPY`
      - `repl.REPL_MODE_STRICT`
      - `repl.REPL_MODE_MAGIC`


### global
- `Class: Buffer` **用来处理二进制数据**
- `__dirname` **当前执行文件目录**
- `__filename` **当前文件名(绝对路径)**
- `clearInterval(t)`
- `clearTimeout(t)`
- `console` 用来打印`stdout` `stderr`
- `exports` `module.exports`的一个快捷引用, 是每个模块本地的
- `global` **全局命名空间对象**
- `module` **当前模块的一个引用**
- `process` **进程对象**
- `require()` **用来引入模块**
  - `require.cache` **当模块被引入时，模块在这个对象中被缓存。通过删除这个对象的键值，下一次引入会重新加载模块。**
  - `require.resolve()` 引入`require`机制来查找模块位置, 返回模块路径
- `setInterval(cb, ms)` **循环计时器**
- `setTimeout(cb, ms)` 一次性计时器, 在至少`ms`毫秒后，执行回调函数`cb`。实际的延时依赖于外部因素，如操作系统的定时器粒度和系统负载。
超时时间必须在`1`到`2,147,483,647`之间。如果超过了这个范围，它会被重置为`1ms`。即定时器的跨度不可以超过`24.8天`。

### timers
**时间相关函数, 全局有效**
- `setImmediate(callback[, arg][, ...])` 在下一次`I/O`事件循环后，在`setTimeout`和`setInterval`前，“立刻”执行回调函数。
- `clearImmediate(immediateObject)`
- `setTimeout(callback, delay[, arg][, ...])`
- `clearTimeout(timeoutObject)`
- `setInterval(callback, delay[, arg][, ...])`
- `clearInterval(intervalObject)`
- `unref()` `setTimeout`和`setInterval`的返回值也有一个`timer.unref()`方法，这个方法允许你创建一个 **当它是事件循环中的仅剩项时，它不会保持程序继续运行** 的定时器。
- `ref()` 如果你先前对一个定时器调用了`unref()`，你可以调用`ref()`来明确要求定时器要保持程序运行。
HTML5 Websocket
===
### 什么是 WebSocket
`WebSocket`的服务端和客户端可以双向进行通讯，并且允许跨域通讯。由`HTTP/1.1`的`Upgrade`机制支持，通过`ws`(非加密)或`wss`(加密)协议进行通讯
```javascript
WebSocket WebSocket(
  in DOMString url,
  in optional DOMString protocols
);

WebSocket WebSocket(
  in DOMString url,
  in optional DOMString[] protocols
);
```

### HTML5 中的 WebSocket
`HTML5`只专注于客户端的`API`, 而服务器端是各个语言自己去实现
```javascript
// 创建一个Socket实例
var socket = new WebSocket('ws://localhost:8080');
// 打开Socket 
socket.onopen = function(event){
  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!');
  // 监听消息
  socket.onmessage = function(event){
    console.log('Client received a message',event);
  };
  // 监听Socket的关闭
  socket.onclose = function(event){
    console.log('Client notified socket has closed',event);
  };
  // 关闭Socket.... 
  //socket.close()
};
```

**事件**
`onclose` `onerror` `onmessage` `onopen`
**属性**
- `readyState`: `CONNECTING  0` `OPEN  1` `CLOSING 2` `CLOSED  3`
- `binaryType`: `String` `Blob` `ArrayBuffer`

### 兼容性
**方法1:**
如果客户端不支持`WebSocket`, 那么可以使用几个候选选项 `Flash Socket` `AJAX long-polling` `AJAX multipart streaming` `IFrame` `JSONP polling`

**方法2**
使用`Socket.io`来抹平差异,该库可以在浏览器不支持`WebSocket`的时候, 自动用浏览器支持的消息推送方式进行连接, 该库还会检测连接是否掉线，并在掉线时自动为你重新连接。
```javascript
// 创建Socket.IO实例，建立连接
var socket= new io.Socket('localhost',{
  port: 8080,
});
socket.connect();
// 添加一个连接监听器
socket.on('connect',function(){
  console.log('Client has connected to the server!');
});
// 添加一个连接监听器
socket.on('message',function(data){
  console.log('Received a message from the server!',data);
});
// 添加一个关闭连接的监听器
socket.on('disconnect',function(){
  console.log('The client has disconnected!');
});
// 通过Socket发送一条消息到服务器
function sendMessageToServer(message){
  socket.send(message);
}
```

### 优势
- 实时双向通信
- 浏览器本地支持良好(兼容性可以用第三方库很好解决)
- 支持自定义协议

### 实际应用
- 聊天室
- 服务器消息推送
- 前后端实时系统

### 参考
- [Websocket | MDN](https://developer.mozilla.org/zh-CN/docs/WebSockets)
- [认识HTML5的WebSocket](http://www.phpernote.com/html5/1142.html)
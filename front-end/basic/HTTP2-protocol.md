HTTP2 协议
===
### HTTP/2 优势
- `HTTP/2` 采用二进制格式传输数据，而非 `HTTP/1.x` 的文本格式。二进制格式在协议的解析和优化扩展上带来更多的优势和可能。
- `HTTP/2` 对消息头采用 `HPACK` 进行压缩传输，能够节省消息头占用的网络的流量。
- 多路复用，直白的说就是所有的请求都是通过一个 TCP 连接并发完成。同时，多路复用流还支持优先级和流量控制。
- `Server Push`：服务端能够更快的把资源推送给客户端。

### HTTP/2 底层数据格式 Frame(分为 `HEADERS frame` `DATA frame`)
```
+-----------------------------------------------+
|                 Length (24)                   |
+---------------+---------------+---------------+
|   Type (8)    |   Flags (8)   |
+-+-------------+---------------+-------------------+
|R|                 Stream Identifier (31)          |
+=+=================================================+
|                   Frame Payload (0...)        ...
+---------------------------------------------------+
```

### HTTP/2 兼容 HTTP/1.x
#### 非加密HTTP兼容
利用`HTTP/1.x`的`Upgrade`进行兼容
**Request**
```
GET / HTTP/1.1
Host: server.example.com
Connection: Upgrade, HTTP2-Settings
Upgrade: h2c
HTTP2-Settings: <base64url encoding of HTTP/2 SETTINGS payload>
```
**Response**
服务端支持`HTTP/2`
```
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: h2c

[ HTTP/2 connection ...
```
服务端不支持`HTTP/2`
```
HTTP/1.1 200 OK
Content-Length: 243
Content-Type: text/html
...
```
经由代理流如服务端, 如果代理不支持`HTTP/2`, 会将`Request Header`中的关于`HTTP/2`的头信息去除, 变成`HTTP/1.x`请求

#### 加密TLS兼容
[TLS-ALPN](https://tools.ietf.org/html/rfc7301)定义了在`TLS握手阶段`完成兼容性协定, 可以直接收发`HTTP/2`

### 参考
- [HTTP/2 新特性浅析](http://io.upyun.com/2015/05/13/http2/)
- [HTTPS, SPDY和 HTTP/2性能的简单对比](http://www.qianduan.net/a-simple-performance-comparison-of-https-spdy-and-http2/)
- [HTTP/2前向兼容](http://segmentfault.com/a/1190000002896785)
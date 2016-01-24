HTTP 协议
===
超文本传输协议(`HyperText Transfer Protocol`)
版本: `http/1.0` `http/1.1` `http/2.0`

### Request
#### request line
- `http`请求的种类(`GET` `POST` `DELETE` `PUT`...) 
- 请求资源路径
- `http`协议版本

#### request headers
- `cache`
  - `If-Modified-Since`
    - `If-Modified-Since: Thu, 09 Feb 2012 09:07:57 GMT`(时间一致`304`)
  - `If-Unmodified-Since`
    - `If-Unmodified-Since: Thu, 09 Feb 2012 09:07:57 GMT`(时间一致`304`)
  - `If-None-Match`
    - `If-None-Match: "03f2b33c0bfcc1:0"`(内容为`response`中的`Etag`, 一致`304`)
  - `Pragma`
    - `Pragma: no-cache`
  - `Cache-Control`
    - `Cache-Control: Public`
    - `Cache-Control: Private`
    - `Cache-Control: no-cache`
- `Client`
  - `Accept` 浏览器端可以接受的媒体类型(服务器无法返回该类型, 应返回`406 non acceptable`)
    - `Accept: */*`
    - `Accept: text/html`
  - `Accept-Encoding` 浏览器端申明自己接受的 **文件编码**, 通常是 **压缩方法**
    - `Accept-Encoding: gzip, deflate`
  - `Accept-Language`
    - `Accept-Language: en-us`
  - `User-Agent`
    - `User-Agent: Mozilla/4.0......`
  - `Accept-Charset` 浏览器申明自己接受的字符集编码
    - `Accept-Charset：utf-8`
  - `TE` 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息 
    - `TE: trailers,deflate;q=0.5`
- `Cookie/Login`
  - `Cookie`
  - `Proxy-Authorization` 
    - `Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`
- `Entity`
  - `Content-Length` 常配合`Range`使用
    - `Content-Length: 38`
  - `Range` 
    - `Range: bytes: 600-999`
  - `Content-Type ` 不常出现，一般出现在`response`头部，用于指定数据文件类型 
    - `Content-Type: application/x-www-form-urlencoded`
  - `Warning`
    - `Warn: 199 Miscellaneous warning`
- `Miscellaneous`
  - `Referer `
    - `Referer: http://ce.sysu.edu.cn/hope/`
- `Transport`
  - `Connection `
    - `Connection: keep-alive： `
    - `Connection: close： `
  - `Host `
    - `Host: ce.sysu.edu.cn`
  - `Upgrade`
    - `Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11`
  - `Via`
    - `Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)`


#### request body
发送给服务器的`query`信息, `GET`命令`body`为空

### Response
#### response line
- `http`协议版本
- 状态码 及 `message`
  - `200` `OK`
  - `302` `Found`
  - `304` `Not Modified`
  - `400` `Bad Request`
  - `403` `Forbidden`
  - `404` `Not Found`
  - `500` `Internal Server Error`
  - `503` `Server Unavailable`

**状态码**
- `1XX` 提示信息 - 表示请求已被成功接收，继续处理
- `2XX` 成功 - 表示请求已被成功接收，理解，接受
- `3XX` 重定向 - 要完成请求必须进行更进一步的处理
- `4XX` 客户端错误 - 请求有语法错误或请求无法实现
- `5XX` 服务器端错误 - 服务器未能实现合法的请求

#### response headers
- `cache`
  - `Date` 生成消息的具体时间和日期
    - `Date: Sat, 11 Feb 2012 11:35:14 GMT`
  - `Expires`
    - `Expires: Tue, 08 Feb 2022 11:35:14 GMT`
  - `Vary` 告诉下游代理是使用缓存响应还是从原始服务器请求
    - `Vary: Accept-Encoding`
    - `Vary: *`
  - `Last-Modified`
    - `Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT`
  - `Pragma`
    - `Pragma: no-cache`
  - `Age` 从原始服务器到代理缓存形成的估算时间（以秒计，非负） 
    - `Age: 12`
- `Cookie/Login`
  - `P3P` 跨域设置`Cookie`, 这样可以解决`iframe`跨域访问`cookie`的问题, 兼容`IE`
    - `P3P: CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR`
  - `Set-Cookie`
    - `Set-Cookie: sc=4c31523a; path=/; domain=.acookie.taobao.com;  UserID=JohnDoe; Max-Age=3600; Version=1`
  - `Proxy-Authenticate`
    - `Proxy-Authenticate: Basic`
  - `WWW-Authenticate` 客户端请求实体类应该使用的授权方案
    - `WWW-Authenticate: Basic`
- `Entity`
  - `ETag` 和`request header`的`If-None-Match`配合使用
    - `ETag: "03f2b33c0bfcc1:0"`
  - `Last-Modified`
    - `Last-Modified: Wed, 21 Dec 2011 09:09:10 GMT`
  - `Content-Type`
    - `Content-Type: text/html; charset=utf-8`
    - `Content-Type:text/html;charset=GB2312`
    - `Content-Type: image/jpeg`
  - `Content-Encoding`
    - `Content-Encoding：gzip`
  - `Content-Language`
    - `Content-Language: en-us`
  - `Content-Language`
    - `Content-Language: en,zh`
  - `Content-Length`
    - `Content-Length: 348`
  - `Content-Location`
    - `Content-Location: /index.htm`
  - `Content-MD5`
    - `Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==`
  - `Content-Range`
    - `Content-Range: bytes 21010-47021/47022`
  - `Trailer` 指出头域在分块传输编码的尾部存在 
    - `Trailer: Max-Forwards`
  - `Transfer-Encoding` 文件传输编码 
    - `Transfer-Encoding:chunked`
  - `Warning`
    - `Warning: 199 Miscellaneous warning`
  - `Allow`
    - `Allow: POST` 声明必须用`POST`方法请求资源, 否则服务器返回`405 Method Not Allowed`
- `Miscellaneous`
  - `Server`
    - `Server: Microsoft-IIS/7.5`
  - `X-AspNet-Version`
    - `X-AspNet-Version: 4.0.30319`
  - `X-Powered-By`
    - `X-Powered-By: ASP.NET`
  - `Via` 告知代理客户端响应是通过哪里发送的
    - `Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)`
- `Transport`
  - `Connection`
    - `Connection: keep-alive`
    - `Connection: close`
- `Location`
  - `Location：http://ce.sysu.edu.cn/hope/`
  - `Refresh` 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持）
    - `Refresh: 5; url=http:///archives/94.html`
  - `Retry-After` 如果实体暂时不可取，通知客户端在指定时间之后再次尝试 
    - `Retry-After: 120`

#### response body
返回的请求资源主体(数据)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  ...
</body>
</html>
```

### 参考
- [HTTP协议详解](https://www.zybuluo.com/yangfch3/note/167490)
- [HTTP Header详解](http://utrace.blog.51cto.com/2213120/1546426)
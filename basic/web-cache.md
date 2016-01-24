Web Cache
===
### Web 缓存的作用与类型
- 数据库缓存
  - `memcached` `redis`
- 服务端缓存
  - 代理服务器缓存`squid`
  - CDN缓存(网关缓存 反向代理缓存)
- 浏览器端缓存
- Web应用逻辑层缓存(代码逻辑实现)

### Web 缓存机制(浏览器端)
根据 **Meta 标签**和 **HTTP Header头**来决定是否缓存(根据 **新鲜度(过期机制)** 和 **校验值(验证机制Etag**))

**有关缓存的消息报头**

规则 | 消息报头 | 值/示例 | 类型 | 作用
:---: | :---: | :---: | :---: | :---
新鲜度 | Expires | Sun, 16 Oct 2016 05:43:02 GMT | 响应 | 告诉浏览器过期时间前可以使用副本(有可能存在时间不一致问题)
| Pragma | no-cache | 请求/响应 | 告诉浏览器忽略的缓存副本(HTTP1.1 可用Cache-Control替代)
| Cache-Control | no-cache | 请求/响应 | 告诉浏览器忽略的缓存副本, 强制每次请求直接发送给源服务器
| | no-store | 响应 | 强制缓存在任何情况下都不要保留任何副本
| | max-age=[秒] | 请求/响应 | 指明缓存副本的有效时长, 从请求时间开始到过期时间之间的秒数
| | public | 响应 | 任何途径的缓存者(本地缓存, 代理服务器), 可以无条件的缓存该资源
| | private | 响应 | 只针对单个用户或实体(不同用户, 窗口)缓存资源
| Last-Modified | Sun, 16 Oct 2016 05:43:02 GMT | 响应 | 告诉浏览器当前资源的最后修改时间
| If-Modified-Since | Sun, 16 Oct 2016 05:43:02 GMT | 请求 | 如果浏览器第一次请求时响应中 Last-Modified 非空, 第二次请求同一资源时, 会把它作为该项的值发给服务器
校验值 | ETag | 50udw1e3f99dw91:df3 | 响应 | 告知浏览器当前资源在服务器的唯一标识符(生成规则由服务器决定)
| If-None-Match | 50udw1e3f99dw91:df3 | 请求 | 如果浏览器第一次请求时响应中Etag非空, 第二次请求同一资源时, 会把它作为该项的值发给服务器
辅助 | Vary | Accept-Encoding | 响应 | 辅助从多个缓存副本中筛选合适的版本(不同压缩算法产生的副本)

**缓存优先级**
- Cache-Control(控制更细致) > Expires
- Cache-Control/Expires > Last-Modified/ETag 常配合使用
- ETag > Last-Modified

**用户操作行为与缓存**

用户操作 | Cache-Control/Expires | Last-Modified/ETag
--- | --- | ---
地址栏回车 | 有效 | 有效
页面链接跳转 | 有效 | 有效
新开窗口 | 有效 | 有效
前进后退 | 有效 | 有效
F5刷新 | 无效 | 有效
Ctrl+F5强制刷新 | 无效 | 无效

### 无法缓存的请求
- HTTP信息头中包含Cache-Control:no-cache，pragma:no-cache，或Cache-Control:max-age=0等告诉浏览器不用缓存的请求
- 需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的
- 经过HTTPS安全加密的请求（有人也经过测试发现，ie其实在头部加入Cache-Control：max-age信息，firefox在头部加入Cache-Control:Public之后，能够对HTTPS的资源进行缓存，参考[《HTTPS的七个误解》](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)）
- POST请求无法被缓存
- HTTP响应头中不包含`Last-Modified/Etag`，也不包含`Cache-Control/Expires`的请求无法被缓存

### 使用缓存
- 同一资源保证URL稳定
- 给`CSS JS 图片`等静态资源增加`HTTP缓存头`, 并强制入口不被缓存
- 减少对`Cookie`的依赖
- `HTTPS`加密协议尽量不对可缓存资源使用(因为`HTTPS`默认不缓存, 必须配置才能缓存)
- 不涉及敏感信息的资源尽量采用`GET`方式请求
- 动态内容缓存
  - 动态脚本定期将内容导出成静态文件, 让Web可直接访问
  - 动态脚本的响应头增加 `Cache-Control:max-age`,告诉浏览器过期前可以直接使用副本
  - 通过代码给动态脚本的响应头添加`Last-Modified/Etag`信息，浏览器再次请求的时候，可以通过解析`If-Modified-Since/If-None-Match`得知浏览器是否存在缓存，由代码逻辑控制是否返回304

**服务器配置**
Apache Nginx 进行缓存头配置
**动态脚本配置**
服务端代码Header头增加 `Expires/Cache-Control/Etag` 等信息, 更精细的控制缓存效果

### 禁用缓存
#### 方法1 在meta标签标明
```javascript
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 
```
#### 方法2 动态setRequestHeader
```javascript
cache-control='no-cache,no-store'
pragma='no-cache'
if-modified-since=0;
```
#### 方法3 请求端设置`if-modified-since`为已经过期的某个时间，可以是几年前或者几十年前。

#### 方法4 服务端设置Expires为过期某个时间
**需要一致性检测则尽量去配合Etag以及last-Modified去进行比较然后返回使用缓存还是新数据**
```javascript
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
```
#### 方法3 url后面加随机数或者时间戳
```javascript
url += “&random=” + Math.random()
```

### Ajax 缓存
- `Ajax` 缓存和 `HTTP` 缓存效果相同, 只缓存 `GET` 请求
- `IE` 浏览器不会刷新过期日期前的`Ajax`内容, 只能强制清空缓存
- `Ajax` 禁用缓存方式与`HTTP`禁用缓存方式相同

### 非幂等请求缓存(POST)
一些`idempotent request`并不能通过`Get`来实现的时候，例如，搜索API通常会需要很多的参数，尤其是那些拥有很多属性的产品，而这些属性都必须通过参数来传递。问题来了，如果请求携带的参数超过了GET请求的限制长度怎么办?

**HTTP的协议规范允许满足下列条件中其一的以缓存来响应:**
- 缓存的响应与原始服务器的响应是一致的，简而言之就是说代理可以保证缓存的响应和服务器的响应之间的语义等价。
- 到客户端的响应的新鲜度是可以接受的
- 到客户端的响应的新鲜度不可接受，但是附加了合适的警告。

**解决方式:** 
将POST的内容（附带一部分头信息），做一个摘要，将摘要附在URL后面，使用这个来作为缓存的key。换句话说，缓存主键被修改为包括URL以及一些请求体，后续的拥有相同的请求体的请求将会命中缓存。在实践的过程中我添加了一些头脑保证缓存的唯一性。

- 区分idempotent request的post请求和非idempotent request的post请求
  - 在代理中配置URL的匹配模式，代理如果匹配到非idempotent request请求就不缓存。
  - 在头中添加context-aware以区分不同的请求
  - 基于缓存逻辑的一些命名约定，例如API的名称以set、add、delete等开头的就不被缓存。
- 处理非idempotent request的post请求
  - 如果URL在“DO NOT CACHE”列表中
  - 如果摘要不匹配
  - 过了缓存的有效时间
  - 任何收到需要重新验证的请求的时候

**优势**
- 加快了重复请求的效率，减少了代理到原服务器之间的往返
- 一个用户的请求不仅可以用作缓存该用户的后续请求，其他用户也可共享
- 节省了代理和原服务器之间的带宽

**这个解决方案的变种可以用在正向代理和反向代理，甚至两者都用**

### HTML5 离线缓存
#### Manifest
- 在服务器上添加MIME TYPE支，让服务器能够识别manifest后缀的文件
`AddType text/cache-manifest manifest`
- 创建一个后缀名为`.manifest`的文件，把需要缓存的文件按格式写在里面，并用注释行标注版本
```sh
CACHE MANIFEST
# 直接缓存的文件
CACHE:
Path/to/cache.js
# version：2012-03-20
```
- 给 `<html>` 标签加 `manifest` 属性，并引用`manifest`文件
`<html manifest=”path/to/name-of.manifest”>`

**离线应用访问及更新流程**
- 第一次访问离线应用的入口页HTML（引用了manifest文件），正常发送请求，获取manifest文件并在本地缓存，陆续拉取manifest中的需要缓存的文件
- 再次访问时，无法在线离线与否，都会直接从缓存中获取入口页HTML和其他缓存的文件进行展示。如果此时在线，浏览器会发送请求到服务器请求manifest文件，并与第一次访问的副本进行比对，如果发现版本不一致，会陆续发送请求重新拉取入口文件HTML和需要缓存的文件并更新本地缓存副本
- 之后的访问重复第2步的行为

**离线机制的缓存用途**
从Manifest的机制来看，即使我们不是为了创建离线应用，也同样可以使用这种机制用于缓存文件，可以说是给Web缓存提供多一种可以选择的途径。

**存在的问题**
- 缓存文件更新控制不灵活
- 一些`http`头设置会导致manifest无法正常更新, http://www.alloyteam.com/2012/01/html5-offline-app-update-problem/
- Manifest 中缓存文件一旦下载出错，后续的文件将不再下载，抛出错误事件，见：http://stackoverflow.com/questions/6666513/html5-manifest-caching-error
- Android 系统版本众多，较低版本的浏览器对 manifest 支持不完善
- 引用 manifest 的 html 页面本身也会被缓存
- 《[慎用manifest](http://mweb.baidu.com/?p=220)》一文提到的如：页面的参数传递、manifest 的发布、回滚、下线等问题

#### Localstorage
`Localstorage`存储的地方是跟Web缓存分开的，是浏览器重新开辟的一个地方。严格来讲不属于`Web缓存`
**Localstorage的作用**
使Web页面能够通过浏览器提供的`set/get`接口，存储一些自定义的信息到本地硬盘，并且在单次访问或以后的访问过程中随时获取或修改。

**Localstorage的API**
`setItem/getItem/removeItem/clear`

**Localstorage的缓存用途**
Localstorage设计的本意可能是用来存储一些用户操作的个性化设置的文本类型的信息和数据，当我们其实也可能拿来当Web缓存区使用，*比如我们可以将Base64格式编码的图片信息，存在localstorage中，再次访问时，直接本地获取后，使用Css3的Data:image的方式直接展现出来。*

**Localstorage的存在的问题**
**大小限制**，目前浏览器只给每个独立的域名提供5m的存储空间，当存储超过5m，浏览器就会弹出警告框。

### Apache 缓存设置
对于 Apache 服务器，可以通过 `mod_expires` 模块来设定`Expires`或`Cache-Control`HTTP 头。编辑相应目录下的 `.htaccess` 文件，或直接对 Apache 的配置文件（根据服务器系统版本不同，可能为`httpd.conf`或`apache2.conf`等）作出修改。

#### 分文件类别设定
使用ExpiresByType可以按照文件的 MIME Type 设定某一类文件的过期日期。例如：
```sh
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css                "access plus 1 week"
    ExpiresByType application/javascript  "access plus 2 weeks"
    ExpiresByType image/x-icon            "access plus 6 months"
    ExpiresByType image/gif               "access plus 6 months"
    ExpiresByType image/png               "access plus 6 months"
    ExpiresByType image/jpeg              "access plus 6 months"
    ExpiresByType video/x-flv             "access plus 6 months"
    ExpiresByType application/pdf         "access plus 6 months"
</IfModule>
```
其中access plus 1 week表示将缓存过期设置为访问时间（即当前时间）之后的一周。*如果将access替换为modification，则缓存过期会被设定为文件修改时间之后的一周。*
**可以使用的时间单位包括：**
```sh
years
months
weeks
days
hours
minutes
seconds
```
**不同的时间也可以进行组合**
```sh
ExpiresByType text/html "access plus 1 month 15 days 2 hours"
ExpiresByType image/gif "modification plus 5 hours 3 minutes"
```

#### 根据文件扩展名进行设置
如果希望根据扩展名来指定缓存规则，可以使用FilesMatch配合正则表达式。为了简洁，我这里只规定了ExpiresDefault。它的优先级很低，只会在对应文件没有任何其他规则能够匹配（包括上层目录下的缓存规则）时生效。
```
<IfModule mod_expires.c>
    <FilesMatch "\.(css|js)$">
        ExpiresActive on 
        ExpiresDefault "access plus 1 week"
    </FilesMatch>
</IfModule>
```

**对某些文件设定**
```sh
<IfModule mod_expires.c>
    <FilesMatch "^(example\.css|example\.js)$">
        ExpiresActive on 
        ExpiresDefault "access plus 1 week"
    </FilesMatch>
</IfModule>
```
#### 对某一文件夹下的所有文件设定
对于静态文件，一个比较方便的做法是将它们全部放到一个目录下，并对该目录下的所有文件设定。但是，此处需要注意防止其他规则将ExpiresDefault覆盖掉。
```sh
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 10 years"
</IfModule>
```

### 参考
- [【Web缓存机制系列】](http://www.alloyteam.com/2012/03/web-cache-1-web-cache-overview/)
- [缓存 HTTP POST请求和响应](http://www.oschina.net/question/82993_74342)
- [网站优化：浏览器缓存控制简介及配置策略- Blog - Renfei Song](https://www.renfei.org/blog/http-caching.html)
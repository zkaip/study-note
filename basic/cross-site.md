Web 跨域
===
### 为什么需要跨域?
浏览器 **同源策略** (域名、协议、端口相同)限制其他网页对本网页进行非法篡改, 只有带有 **src** 属性的标签才允许跨域(`<img>` `<iframe>` `<script>`)

### JSONP
`JSONP（JSON with Padding）`是一个非官方的协议，它允许在服务器端集成`Script tags`返回至客户端，通过`javascript callback`的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。利用`<script/>`标签对`javascript`进行动态解析来实现(其实也可以用`eval`函数),然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求。

#### IE 兼容
**P3P 规范让 IE 跨域接受第三方 cookie**
> header('P3P:CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');

#### 原理
1.首先在客户端注册一个callback, 然后把callback的名字传给服务器。
1. 此时，服务器先生成 json 数据。
1. 然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp.
1. 最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。
1. 客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）

#### 缺点
- 只能采用`GET`请求,数据量大的跨域请求不能使用
- 如果使用`eval`来解析会容易出现安全问题
- 没有`JSONP调用的错误处理`,如果无效静默失败
- 被不信任的服务使用时会很危险,因为 JSONP 服务返回打包在函数调用中的 JSON 响应，而函数调用是由浏览器执行的，这使宿主 Web 应用程序更容易受到各类攻击。

#### 代码示例
##### 原生实现JSONP跨域
```javascript
// 客户端
<script>
    // 这是回调方法
    function cb(data){
        alert(data.website);
    }
</script>
<!--这是跨域请求的代码,切记，这段代码要在回调函数之后-->
<script src="http://172.22.22.120/new/ajax_jsonp.php?callback=cb"></script>
```

```php
<!-- 服务端 -->
<?php
    $cb = htmlspecialchars($_GET['callback']);  // 注意了，这里要做好过滤，防止xss攻击
    echo $cb,'(',json_encode(array('website'=>'hcoding')),')';  // 返回客户端的数据为：cb({"name":"hcoding"})  这是一段js代码
?>
```

##### AJax实现JSONP
客户端代码：
```javascript
<script>
    // 客户端使用getJSON方法请求另一台机子上的脚本
    // 浏览器会生成一个随机的callback参数
    $.getJSON("http://172.22.22.120/new/ajax_jsonp.php?callback=?",function(json){
        alert(json.website);
    });
// $.getJSON简单易用，但就是不能指定回调函数。
</script>
//或者
<script>
    $.ajax({
        type : "GET",
        url : "http://172.22.22.120/new/ajax_jsonp.php",
        dataType : "jsonp",    // 数据格式指定为jsonp
        jsonp: "callback",     // 服务点通过这个键值获取回调方法
        jsonpCallback:"cb",   // 指定回调方法
        success : function(json){

        },
    });   

    // 回调方法
    function cb(data){
        alert(data.website);
    }
</script>
```
服务端PHP脚本代码：
```php
<?php
    $cb = htmlspecialchars($_GET['callback']);  // 注意了，这里要做好过滤，防止xss攻击
    echo $cb,'(',json_encode(array('website'=>'hcoding')),')';  // 返回客户端的数据,这是一段js代码
?>
```

### CORS (IE8+) 推荐使用
跨源资源共享标准( cross-origin sharing standard ) 使得以下场景可以使用跨站 HTTP 请求：
- 如上所述，使用 XMLHttpRequest 发起跨站 HTTP 请求。
- Web 字体 (CSS 中通过 @font-face 使用跨站字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- 使用 drawImage API 在 canvas 上画图

#### 相关Header
**服务端设置Header: (ResponseHeader)**
- `Access-Control-Allow-Origin *` 服务器设置允许访问的源的网址
 - `*` 可以为网站网址 如`http://api.a.com`
- `Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header` 允许访问服务器的头信息
- `Access-Control-Max-Age: <delta-seconds>` 允许预请求参数缓存的毫秒数,在此期间不用发出另一条预请求
- `Access-Control-Allow-Credentials: true | false`
- `Access-Control-Allow-Methods: <method>[, <method>]*`
- `Access-Control-Allow-Headers: X-PINGOTHER` 这样在实际的请求里请求头信息里就可以有这么一条:`X-PINGOTHER: pingpong`可以有多个自定义HTTP请求头,用逗号分隔.
- `Access-Control-Allow-Headers: <field-name>[, <field-name>]*`

**HTTP 请求头(RequestHeader)**

**注意这些请求头信息都是在请求服务器的时候已经为你设置好的,当开发者使用跨域的XMLHttpRequest的时候,不需要手动的设置这些头信息.**
- `Origin: <origin> `注意,不仅仅是跨域请求,普通请求也会带有ORIGIN头信息.
- `Access-Control-Request-Method: <method>`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Headers: <field-name>[, <field-name>]*`

#### 请求方式
- 简单请求
 - 只使用 GET, HEAD 或者 POST 请求方法。如果使用 POST 向服务器端传送数据，则数据类型(Content-Type)只能是 application/x-www-form-urlencoded, multipart/form-data 或 text/plain中的一种。
 - 不会使用自定义请求头（类似于 X-Modified 这种）。
- 预请求
 - 请求以 GET, HEAD 或者 POST 以外的方法发起请求。或者，使用 POST，但请求数据为 application/x-www-form-urlencoded, multipart/form-data 或者 text/plain 以外的数据类型。比如说，用 POST 发送数据类型为 application/xml 或者 text/xml 的 XML 数据的请求。
 - 使用自定义请求头（比如添加诸如 X-PINGOTHER）
- 附带凭证信息的请求
 - XMLHttpRequest和访问控制功能，最有趣的特性就是，发送凭证请求（HTTP Cookies和验证信息）的功能。一般而言，对于跨站请求，浏览器是不会发送凭证信息的。但如果将XMLHttpRequest的一个特殊标志位设置为true，浏览器就将允许该请求的发送。

**安全问题**:不要依赖CORS当中的权限制度，应当使用更多其它的措施来保障，比如`OAuth2`

### iframe 隐藏表单,进行POST提交(非现代浏览器)
- 建立一个iframe，iframe内的JS创建一个form表单，并可以将接收到的参数放入表单中POST提交
- 将iframe页面插入到页面中。

### window.name
有三个页面：
- a.com/app.html：应用页面。
- a.com/proxy.html：代理文件，一般是一个没有任何内容的html文件，需要和应用页面在同一域下。
- b.com/data.html：应用页面需要获取数据的页面，可称为数据页面。

实现起来基本步骤如下：

- 在应用页面（a.com/app.html）中创建一个iframe，把其src指向数据页面（b.com/data.html）。
数据页面会把数据附加到这个iframe的window.name上，data.html代码如下：
```javascript
<script type="text/javascript">
    window.name = 'I was there!';    // 这里是要传输的数据，大小一般为2M，IE和firefox下可以大至32M左右
                                     // 数据格式可以自定义，如json、字符串
</script>
```

- 在应用页面（a.com/app.html）中监听iframe的onload事件，在此事件中设置这个iframe的src指向本地域的代理文件（代理文件和应用页面在同一域下，所以可以相互通信）。app.html部分代码如下：
```javascript
<script type="text/javascript">
    var state = 0, 
    iframe = document.createElement('iframe'),
    loadfn = function() {
        if (state === 1) {
            var data = iframe.contentWindow.name;    // 读取数据
            alert(data);    //弹出'I was there!'
        } else if (state === 0) {
            state = 1;
            iframe.contentWindow.location = "http://a.com/proxy.html";    // 设置的代理文件
        }  
    };
    iframe.src = 'http://b.com/data.html';
    if (iframe.attachEvent) {
        iframe.attachEvent('onload', loadfn);
    } else {
        iframe.onload  = loadfn;
    }
    document.body.appendChild(iframe);
</script>
```
- 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）。
```javascript
<script type="text/javascript">
    iframe.contentWindow.document.write('');
    iframe.contentWindow.close();
    document.body.removeChild(iframe);
</script>
```

**总结起来即：iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。**

### HTML5 postMessage(IE8+)
`otherWindow.postMessage(message, targetOrigin);`
- otherWindow: 对接收信息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。
- message: 所要发送的数据，string类型。
- targetOrigin: 用于限制otherWindow，“*”表示不作限制

a.com/index.html中的代码：
```javascript
<iframe id="ifr" src="b.com/index.html"></iframe>
<script type="text/javascript">
window.onload = function() {
    var ifr = document.getElementById('ifr');
    var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                        // 若写成'http://c.com'就不会执行postMessage了
    ifr.contentWindow.postMessage('I was there!', targetOrigin);
};
</script>
```
b.com/index.html中的代码：
```javascript
<script type="text/javascript">
    window.addEventListener('message', function(event){
        // 通过origin属性判断消息来源地址
        if (event.origin == 'http://a.com') {
            alert(event.data);    // 弹出"I was there!"
            alert(event.source);  // 对a.com、index.html中window对象的引用
                                  // 但由于同源策略，这里event.source不可以访问window对象
        }
    }, false);
</script>
```

### 用nginx/Apache把B网站的数据url反向代理。(数据转发)

### 参考
- [AJAX 跨域请求 - JSONP获取JSON数据](http://justcoding.iteye.com/blog/1366102)
- [JavaScript跨域总结与解决办法](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)
- [HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
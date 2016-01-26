AJax - Xhr & Fetch
===
`Asynchronous JavaScript and XML`（异步的 JavaScript 和 XML）

---

## XHR
### XHR对象
```javascript
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();    
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE5,IE6
}
```

1、创建XMLHttpRequest对象
  XMLHttpRequest 对象 ，异步的提交请求给服务器 
    创建 XMLHttpRequest (xhr)
    不同的浏览器有不同的 xhr 对象
    IE7+,FF,Chrome
    类型：XMLHttpRequest
    IE6 IE5.5
    类型:ActiveXObject("Microsoft.XMLHttp")
    判断浏览器类型 ：
    if(window.XMLHttpRequest){
         //IE7+,FF,Chrome
         xhr = new XMLHttpRequest();
    } else {
        // IE6 IE5.5
         xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
2、XMLHttpRequest对象的属性与方法
   xhr方法:
     a、open(method,url,asyn): 创建请求 
            method:get , post 
            url : servlet 路径
                    -get: var uri="test.do?name=value&name=value";
                    -post: var uri="servlet 路径"
            asyn : true 表示异步    false 表示同步 
     b、send(body) : 发送请求
             get : send(null)
             post : send("name=value&name=value");
     c、setRequestHeader() : 设置请求消息头
        当请求方式为post的时候，有参数的时候必须手动设置请求消息头 setRequestHeader("Content-type","application/x-www-form-urlencoded");
     d、abort : 取消所有请求
     e、getAllResponseHeaders :获取所有响应消息头
           getResponseHeader : 获取指定的响应消息头
   xhr属性:
     a、readyState:ajax对象与服务器交互状态
           0：尚未初始化
           1：正在发送请求
           2：请求发送完成
           3：请求成功，服务器响应数据
           4：数据接收成功，响应完成
     b、status：服务器响应状态
           404 ：为找到
           405 ：service方法
           500 ：内部异常
           200 ：服务器正常响应
     c、responseText ：服务器端响应的数据
     d、responseXML : 服务器端响应的xml文本
     e、onreadystatechange:绑定事件处理函数
        每当readyState发生改变的时候，都会激发当前绑定的函数
3、通过ajax发送异步请求
   步骤:
      a、创建 XMLHttpRequest
      b、创建请求
         调用 open()
      c、设置事件绑定函数(设置回调函数)
         onreadystatechange=function(){
  if(xhr.readyState==4&&xhr.status==200){
           ...;
      }
  }
      d、发送请求
         send

### XHR对象的请求及相应
#### request
- xhr.setRequestHeader(header,value)
- xhr.open(method='GET/POST',url,async='true/false')
- xhr.send(DOMString/Document(XML)) //`DOMString/Document(XML)`仅用于`POST`

**xhr2**
- xhr.send(DOMString/Document/FormData/Blob/File/ArrayBuffer)

#### response
- xhr.responseText
- xhr.responseXML

**xhr2**
- xhr.responseType 'json/text/arraybuffer/blob/document'

### XHR对象的事件
- xhr.onloald()
- xhr.onerror()

### XHR对象的状态
- xhr.onreadystatechange  当`readyState`属性改变时，就会调用该函数。
- xhr.readyState  存有`XMLHttpRequest`的状态。从`0`到`4`发生变化。
 - 0: 请求未初始化
 - 1: 服务器连接已建立
 - 2: 请求已接收
 - 3: 请求处理中
 - 4: 请求已完成，且响应已就绪
- xhr.status  
 - 200: "OK"
 - 404: 未找到页面

### 代码
```javascript
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();    
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE5,IE6
}
xhr.onreadystatechange=function() {
  if (xhr.readyState==4 && xhr.status==200){
    var jsonString = xhr.response.json();
    ...
  }
}

xhr.setRequestHeader(header,value);
xhr.open("GET",url,true);
xhr.send();
```

**利用xhr2特性抓取BLOB数据(图片)**
```javascript
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  if (this.status == 200) {
    var bb = new BlobBuilder();
    bb.append(this.response); // Note: not xhr.responseText

    var blob = bb.getBlob('image/png');
    ...
  }
};

xhr.send();
```

**xhr2提交表单**
```javascript
<form id="myform" name="myform" action="/server">
  <input type="text" name="username" value="johndoe">
  <input type="number" name="id" value="123456">
  <input type="submit" onclick="return sendForm(this.form);">
</form>

function sendForm(form) {
  var formData = new FormData(form);

  formData.append('secret_token', '1234567890'); // Append extra data before send.

  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function(e) { ... };

  xhr.send(formData);

  return false; // Prevent page from submitting.
}
```

**xhr2表单上传文件**
```javascript
function uploadFiles(url, files) {
  var formData = new FormData();

  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function(e) { ... };

  xhr.send(formData);  // multipart/form-data
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  uploadFiles('/server', this.files);
}, false);
```

**xhr2上传文件或 blob：xhr.send(Blob)**
该示例使用 BlobBuilder API 从头开始创建新的文本文件，并将该 Blob 上传到服务器。该代码还设置了一个处理程序，用于通知用户上传进度：
```javascript
<progress min="0" max="100" value="0">0% complete</progress>
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
    }
  };

  xhr.send(blobOrFile);
}

// Take care of vendor prefixes.
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

var bb = new BlobBuilder();
bb.append('hello world');

upload(bb.getBlob('text/plain'));
```

**xhr2上传字节：xhr.send(ArrayBuffer)**
```javascript
function sendArrayBuffer() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  var uInt8Array = new Uint8Array([1, 2, 3]);

  xhr.send(uInt8Array.buffer);
}
```

**xhr2分割文件并上传各个部分**
```javascript
window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder ||
                     window.BlobBuilder;

function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  var blob = this.files[0];

  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;

  var start = 0;
  var end = BYTES_PER_CHUNK;

  while(start < SIZE) {

    // Note: blob.slice has changed semantics and been prefixed. See http://goo.gl/U9mE5.
    if ('mozSlice' in blob) {
      var chunk = blob.mozSlice(start, end);
    } else {
      var chunk = blob.webkitSlice(start, end);
    }

    upload(chunk);

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);

})();
```

### 参考
- [XMLHttpRequest2 新技巧](http://www.html5rocks.com/zh/tutorials/file/dndfiles/)

---

## fetch

`fetch()` 方法用于发起获取资源的请求。它返回一个 `promise`，这个`promise`会在请求响应后被`resolve`，并传回 `Response` 对象。

**当遇到网络错误时**，fetch() 返回的 promise 会被 reject，并传回 `TypeError`，虽然这也可能因为权限或其它问题导致。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 Response.ok 属性为 true。HTTP 404 状态并不被认为是网络错误。

可以使用[isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)进行前后端同构应用

### 语法
> fetch(input[, init]).then(function(response) { ... });

- input URLString/RequestObj
- init(可选)
一个配置项对象，包括所有对请求的设置。可选的参数有：
 - method: 请求使用的方法，如 GET、POST。
 - headers: 请求的头信息，形式为 Headers 对象或 ByteString。
 - body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 `GET` 或 `HEAD` 方法的请求不能包含 body 信息。
 - mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
 - credentials: 请求的 credentials，如 omit、same-origin 或者 include。
 - cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.

**返回值** 一个 `Promise`，resolve 时回传 Response 对象。

### 代码示例
```javascript
var myImage = document.querySelector('img');
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg');

fetch(myRequest,myInit).then(function(response) {
  ... 
});

// 也可以传入:
var myRequest = new Request('flowers.jpg',myInit);
```

```javascript
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
// ES6 =>
fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e));
// ES7 async await
async function(){
  try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  } catch(e) {
    console.log("Oops, error", e);
  }
}
```

### 兼容性
![fetch-caniuse](https://cloud.githubusercontent.com/assets/948896/10188421/c6e19fc8-6791-11e5-8ac2-bfede76df6b4.png)
需要引入下面`polyfill`后完美支持`IE8+`
1. 由于 IE8 是 ES3，需要引入 ES5 的 polyfill: es5-shim, es5-sham
1. 引入 Promise 的 polyfill: es6-promise
1. 引入 fetch 探测库：fetch-detector
1. 引入 fetch 的 polyfill: fetch-ie8
1. 可选：如果你还使用了 jsonp，引入 fetch-jsonp
1. 可选：开启 Babel 的 runtime 模式，现在就使用 async/await

### 坑
- Fetch 请求默认是不带 cookie 的，需要设置 `fetch(url, {credentials: 'include'}`)
- 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
- `IE8` `IE9`的`XHR`不支持`CORS`跨域,推荐使用`fetch-jsonp`

### 不足
- 没有获取状态方法：isRejected，isResolved
- 缺少其它一些方法：always，progress，finally
- 不能中断，没有 abort、terminate、onTimeout 或 cancel 方法

### 参考
- [传统 Ajax 已死，Fetch 永生](https://github.com/camsong/blog/issues/2)
- [GlobalFetch.fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)

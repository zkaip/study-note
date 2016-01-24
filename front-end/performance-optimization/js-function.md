Javascript 中最快的JS函数
===
## 来源: [FastJS](https://github.com/alsotang/fast-js)

#### try_catch
`try_catch捕获错误代码块会造成性能损失`
- without try_catch
- ~~with try_catch~~

#### regex_method
`正则表达式匹配最快方法`
- String.match
- Regex.exec
- String.search
- ~~test~~

#### random_int
`获取随机整数`
- Math.random % range `~~(Math.random() * 1000)`
- ~~lodash.random~~

#### is_object_empty
`判断对象是否为空`
- Array.length === 0 
- ~~lodash.isEmpty(arr)~~
- ~~Object.keys().length === 0~~
- ~~lodash.isEmpty(obj)~~

#### sample_from_array
`从数组中抽样`
- Math.random % arr.length
- ~~lodash.sample~~

#### uniq_str_array
`数组去重`
- lodash.uniq 
```js
var _map = Object.create(null);
    for (var i = 0; i < arr.length; i++) {
      _map[arr[i]] = true;
    }
    var newArr = Object.keys(_map);
```
- ~~obj[key] = true~~

#### arguments_to_array
`默认参数(类数组)转换成数组`
- lodash.toArray
- Array.from(arguments) // ES6
- ~~Array.prototype.slice.call~~
- ~~[].slice.apply~~
- ~~[].slice.call~~
- ~~Array.prototype.slice.apply~~

#### clone_object
`克隆对象`
- lodash.clone (this is a shadow clone)
- ~~JSON.parse(JSON.stringify)~~
- ~~lodash.cloneDeep~~

#### for_loop
`for循环`
- normal for loop. i < array.length
- normal for loop. cache arr.length
- ~~lodash.forEach~~
- ~~native forEach~~

#### hidden_class
`函数中初始化对象后函数速度更快`
- withHiddenClass

```js
function withHiddenClass() {
  this._timeout = 0;
  this._url = '';
  this._type = '';
}
withHiddenClass.prototype.timeout = timeout;
withHiddenClass.prototype.url = url;
withHiddenClass.prototype.type = type;

function timeout(timeout) {
  this._timeout = timeout;
}

function url(url) {
  this._url = url;
}

function type(type) {
  this._type = type;
}
```
- ~~withoutHiddenClass~~

```js
function withoutHiddenClass() {
}
withoutHiddenClass.prototype.timeout = timeout;
withoutHiddenClass.prototype.url = url;
withoutHiddenClass.prototype.type = type;

function timeout(timeout) {
  this._timeout = timeout;
}

function url(url) {
  this._url = url;
}

function type(type) {
  this._type = type;
}
```

#### inner_function
`减少函数嵌套,函数嵌套拆分成多函数速度更快`
- outter
- ~~inner~~

#### iterate_object
`迭代对象`
- for … in
- ~~lodash.forEach~~
- ~~Object.keys~~

#### map_loop
`数组内部进行遍历求值,先构造好数组后,再把值传进去,速度比较快`
- new Array(arr.length)
- ~~normal loop. use index~~
- ~~normal loop. use push~~
- ~~lodash.forEach~~
- ~~native map~~

#### new_array
`构造新数组,采用字面量形式更快`
- []
- ~~new Array()~~

#### next_tick
`下一步操作`
- process.nextTick
- ~~setTimeout(0)~~
- ~~setImmediate~~

#### start_with
`检测字符串是否以特定字符开头`
- lodash.startsWith
- ~~indexOf === 0~~
- ~~regex /^ab/~~

#### str_concat
`字符串连接`
- +
- ~~+=~~
- ~~str.concat~~
- ~~arr.join("")~~

#### str_to_int_number
`字符串转换成整数`
- parseInt(str,10)  
- ~~Number(str)~~
- ~~parseInt(str)~~
- ~~str
- +str
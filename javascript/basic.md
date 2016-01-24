Javascript 基础
===
## 语法基础 - 词法
### 字符集
Unicode字符集, 区分大小写

### 注释
`//` `/* */`

### 直接量
数字 小数 字符串 布尔值 正则表达式

### 标识符
字母 下划线 美元符号开始

### 保留字
```javascript
break delete case do catch else continue false debugger finally default for function return typeof if switch var in this void instanceof throw while new true with null try
class const enum export extends import super
implements let private public yield interface package protected static
abstract double goto boolean enum implements byte export import char extends int class final interface const float long native static package super private synchronized protected throws public transient short volatile
```

### 预定义的全局变量
```javascript
arguments encodeURI Infinity Array encodeURIComponent isFinite Boolean Error isNaN Date eval JSON decodeURI EvalError Math decodeURIComponent Function NaN Number Object parseFloat parseInt RangeError ReferenceError RegExp String SyntaxError TypeError undefined URIError
```

### 分号
- 当没有分号就无法解析代码时，把换行符当成一个分号
- 当换行符的下一个非空字符无法解释为语句的延续时，把换行符当成一个分号
- 如果一条语句以 (, [, /, +, or -开头, 可能会被解释为是之前语句的延续
**注意:** `return` `++` `--`

---

## 语法基础 - 数据结构
`undefined`是预定义的全局变量, 不是关键字 typeof undefined === "undefined"

### 原始类型
数字，字符串和布尔值
#### 数字
不区分整数值和浮点数，JavaScript中所有数字均用64位浮点数值标识（IEEE 754）。
取值范围在 `±1.7976931348623157 × 10 308` 到 `±5 × 10 −324` 之间
**由于浮点值:** `0.3-0.2 !== 0.1`

整数
- 十六进制 0x
- 八进制 0
- 浮点表示

Math类
- pow // 求幂
- round //四舍五入
- ceil //向上取整
- floor //向下取整
- abs //求绝对值
- max //最大值
- min //最最小值
- sqrt
- log
- exp
- acos
- asin
- atan
- atan2
- random
- sin
- cos

ES6
- Math.clz32(v)CountLeadingZeroes32。计算一个数字在32位无符号位整形数字的二进制形式开头有多少个0。
- Math.imul(v) 以32位正数的乘法方式来计算给定参数。该方法的一种可能的Javascript实现：

```javascript
function imul(a, b) {
  var ah  = (a >>> 16) & 0xffff;
  var al = a & 0xffff;
  var bh  = (b >>> 16) & 0xffff;
  var bl = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  // the final |0 converts the unsigned value into a signed value
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
}
```

- Math.sign(v) 判断一个数的符号位
  - Math.sign(3)     //  1
  - Math.sign(-3)    // -1
  - Math.sign("-3")  // -1
  - Math.sign(0)     //  0
  - Math.sign(-0)    // -0
  - Math.sign(NaN)   // NaN
  - Math.sign("foo") // NaN
  - Math.sign()      // NaN
  - Math.log10(x) lg(x)
- Math.log2(x) log2(x)
- Math.log1p(x) ln(1+x)
- Math.expm1(x) e^x-1
- Math.cosh(x)
- Math.sinh(x)
- Math.tanh(x)
- Math.acosh(x)
- Math.asinh(x)
- Math.atanh(x)
- Math.hypot(v1,v2,v3....) 计算给定参数的平方平均数
- Math.trunc(v)

```javascript
function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

- Math.fround(v) 返回数值的最接近的单精度浮点。
- Math.cbrt(x) 立方根

常量
- PI
- E
- LN2
- LN10
- LOG2E
- LOG10E
- SQRT1_2
- SQRT2

无限值
- 正无穷
  - Infinity //rw
  - Number.POSITIVE_INFINITY // r
  - 1/0
  - Number.MAX_VALUE + 1
- 负无穷
  - Number.NEGATIVE_INFINITY //rw
  - -Intifinty //r
  - -1/0
  - -Number.MAX_VALUE - 1

NaN 不与任何值相等 包括它自己.
- NaN //rw
- Number.NaN //r
- 0/0 //计算结果为NaN

Zero
- Number.MIN_VALUE/2
- -Number.MIN_VALUE/2
- -1/Infinity
- -0  

#### 布尔值
true/false 
`undefined` `null` `0` `-0` `NaN` `""` 会转换成 `false`

#### 字符串
- s.length
- s.charAt(0)      // => "h" 第一个字符
- s.charAt(s.length-1) // => "d" 最后一个字符
- s.substring(1, 4) // => "ell" 第2-4个字符
- s.slice(1,4) // => "ell" 同上
- s.slice(-3)  // => "rld": 最后三个字符
- s.indexOf("l") // => 2 字符l首次出现的位置
- s.lastIndexOf("l") // => 10: 字符l最后一次出现的位置
- s.indexOf("l", 3) // => 在位置3及之后首次出现字符l的位置
- s.split(",") // => ["hello", "world"]分割成子串
- s.replace("h", "H") // => "Hello, world": 全文字符替换
- s.toUpperCase() // => "HELLO WORLD"

ES5
- trim

ES6
- String.fromCodePoint(n1,n2,n3,...)从UTF16代码转换字符。
- codePointAt 从字符串的字符上取CodePoint。
- repeat "abc".repeat(2) // "abcabc"
- startsWith(a[,p]) 判断字符串是否以a开头；检索的起始位置p是可选的。
- endWith(a[,p]) 判断字符串是否以a结尾；检索的起始位置p是可选的。
- contains(a[,p])

### 对象类型
特殊的对象:
函数 Promise Map Set WeakMap WeakSet Proxy typeof === 'function'

Symbol() typeof === 'symbol'

数组 日期 `null` typeof === 'object'

全局对象 Math JSON typeof === 'object'

构造函数 Date 

包装对象 Number String Boolean Array Function RegExp Error(SyntaxError ReferenceError TypeError)

全局属性 undefined typeof === 'undefined'

全局属性 Infinity typeof === 'number'

### 特殊对象方法
JSON.parse(text)
JSON.stringify(obj)
Date.now 获取当前时间距1970.1.1 00:00:00的毫秒数

Map
- size
- clear()
- entries()
- forEach(callback, thisArg)
- get(k)
- set(k,v)
- has(k)
- keys()
- values()

Set
- size
- add(v)
- clear()
- delete(v)
- entries()
- forEach(callback, thisArg)
- has(v)
- keys()
- values()

var proxy = Proxy(target, handler);

Symbol()

### 类型转换
Number parseInt parseFloat
toString String +''
Boolean

### 类型检测
isNaN() 该函数会尝试将参数值用Number()进行转换，如果结果为“非数值”则返回true，否则返回false。

ES6 
- Number.isFinite(v) 判断数字是否为有穷。判断过程不尝试将参数转换为number。
  - Number.isFinite(Infinity);  // false
  - Number.isFinite(NaN);       // false
  - Number.isFinite(-Infinity); // false
  - Number.isFinite(0);         // true
  - Number.isFinite(2e64);      // true
- Number.isInteger(v) 判断是否为正整数。
- Number.isNaN(v) 不将参数强制转行为number。判断是否确实为NaN。
- Number.isSafeInteger() 判断是否为在MAX_SAFE_INTEGER范围内的正整数。NUMBER.MAX_SAFE_INTEGER是2^53-1。NUMBER.MAX_VALUE是1.7976931348623157 × 10308，这是IEE754中定义的double的最大值［^13］。
- Number.EPSILON13 一个常量，代表正整数1与大于1的最小值之差。大约为： 2.2204460492503130808472633361816 x 10‍^16。

### 操作符
#### 加法运算操作符
- 如果两个操作值都是数值，其规则为：
  - 如果一个操作数为NaN，则结果为NaN
  - 如果是Infinity+Infinity，结果是Infinity
  - 如果是-Infinity+(-Infinity)，结果是-Infinity
  - 如果是Infinity+(-Infinity)，结果是NaN
  - 如果是+0+(+0)，结果为+0
  - 如果是(-0)+(-0)，结果为-0
  - 如果是(+0)+(-0)，结果为+0
  - 如果有一个操作值为字符串，则：
- 如果两个操作值都是字符串，则将它们拼接起来
  - 如果只有一个操作值为字符串，则将另外操作值转换为字符串，然后拼接起来
  - 如果一个操作数是对象、数值或者布尔值，则调用toString()方法取得字符串值，然后再应用前面的字符串规则。对于undefined和 null，分别调用String()显式转换为字符串。

#### 乘除、减号运算符、取模运算符
这些操作符针对的是运算，所以他们具有共同性：如果操作值之一不是数值，则被隐式调用Number()函数进行转换。

#### 逻辑操作符（!、&&、||）
- 逻辑非（！）操作符首先通过Boolean()函数将它的操作值转换为布尔值，然后求反。
- 逻辑与（&&）操作符，如果一个操作值不是布尔值时，遵循以下规则进行转换：
  - 如果第一个操作数经Boolean()转换后为true，则返回第二个操作值，否则返回第一个值（不是Boolean()转换后的值）
  - 如果有一个操作值为null，返回null
  - 如果有一个操作值为NaN，返回NaN
  - 如果有一个操作值为undefined，返回undefined
- 逻辑或（||）操作符，如果一个操作值不是布尔值，遵循以下规则：
  - 如果第一个操作值经Boolean()转换后为false，则返回第二个操作值，否则返回第一个操作值（不是Boolean()转换后的值）
对于undefined、null和NaN的处理规则与逻辑与（&&）相同

#### 关系操作符（<, >, <=, >=）
关系操作符的操作值也可以是任意类型的，所以使用非数值类型参与比较时也需要系统进行隐式类型转换：
- 如果两个操作值都是数值，则进行数值比较
- 如果两个操作值都是字符串，则比较字符串对应的字符编码值
- 如果只有一个操作值是数值，则将另一个操作值转换为数值，进行数值比较
- 如果一个操作数是对象，则调用valueOf()方法（如果对象没有valueOf()方法则调用toString()方法），得到的结果按照前 面的规则执行比较
- 如果一个操作值是布尔值，则将其转换为数值，再进行比较

#### 相等操作符（==）
相等操作符会对操作值进行隐式转换后进行比较：
- 如果一个操作值为布尔值，则在比较之前先将其转换为数值
- 如果一个操作值为字符串，另一个操作值为数值，则通过Number()函数将字符串转换为数值
- 如果一个操作值是对象，另一个不是，则调用对象的valueOf()方法，得到的结果按照前面的规则进行比较
- null与undefined是相等的
- 如果一个操作值为NaN，则相等比较返回false
- 如果两个操作值都是对象，则比较它们是不是指向同一个对象

---

## 语法基础 - 语句
### 表达式
#### 原始表达式
常量 关键字 变量
#### 对象/数组初始化表达式
#### 函数定义表达式
#### 属性访问表达式
o.x
#### 调用表达式
f(0)
Math.max(x,y,z)
a.sort()
#### 对象创建表达式
new Object()

### 运算符
#### 算术表达式
#### 关系表达式
`===` `instanceof`
#### 逻辑表达式
#### 三元操作符
#### 赋值表达式
#### 表达式计算
`eval('3+2')`
#### 其他运算符
`typeof`
`delete`
`in`

> delete o.x  //删除一个属性
> "x" in o => false

---

## 语法基础 - 数组
### 创建数组
**数组字面量** var a = [1, 2, 3];
**使用构造函数** var a = new Array();

### 判断数组
数组本质上是object(type of [ ] == 'object');
需要通过判断constructor。
`[].constructor //Array`

### 数组长度 arr.length
**数组的length属性是可写的。当length属性小于元素个数时，数组中索引值大于length属性的元素会被删掉。**

### 数组元素的添加和删除
- push 从数组尾部添加
- unshift 从数组头部添加
- pop 从尾部弹出
- shift 从头部弹出

### 数组方法
- join 将数组中所有元素转换成字符串并连接在一起
- reverse 将数组中成员颠倒排序
- sort 将数组元素排序，可以指定一个排序函数
- contact 将数组连接起来
- slice 返回指定数组的一个片段或子数组
- splice 从数组中插入或删除元素

> var a = [1, 2, 3, 4];
> var b = a.splice(1,2);//a = 1,4,b = 2,3

ES5
- Array.isArray(a)
- indexOf(e[,i]) 使用“严格等”来判断元素e在数组中的索引号。
- lastIndexOf(e[,i])
- every(t,c) 
测试数组中的每个元素都满足测试t。之后介绍的所有数组遍历方法，都支持一个可选的上下文对象c，可以灵活设置回调函数的执行上下文。传递给数组的测试函数、遍历函数通常有如下签名：`function(item, index, array) {}`
- some(t,c) 测试数组中是否有元素满足测试t。
- forEach(f,c) 使用函数f遍历每个数组的元素。
- map(f,c)
使用函数f修改每个数组的每个元素。按顺序收集f的每个返回值，并返回这个新组成的数组。
- filter(f,c)
收集通过函数测试f的书组元素。
- reduce(r,v)
从左向右，使用函数r聚集数组的每个元素。可以可选的制定一个初始值v。
- reduceRight(r,v)

ES6
- Array.from(arrayLike,map,thisArg) 根据类数组对象arrayLike创建数组；一个可选的map方法和其上下文对象thisArg。
- Array.of(...items) 从给定参数创建数组。
- find(cb,thisArg) 寻找通过指定函数cb测试的第一个元素。
- findIndex(cb,thisArg) 同上，但返回该元素的索引号。
- fill(v,s,e) 在数组索引s和e之间添入多个元素v。

### ECMAScript 5中的数组新方法

- forEach 从头到尾遍历数组，为每个元素调用制定的函数
- map 把数组的每个元素传给指定的函数，并返回一个数组。

```javascript
var a = [1, 2, 3];
var b = a.map(function(x) {
return x*x;
}); //b = [1,4,9]
```

- filter 把数组的每个元素传给指定的函数，通过函数返回的布尔值决定是否在返回数组中添加该元素

```javascript
var a = [1, 2, 3];
var b = a.filter(function(x){
return x % 2 !== 0;
});//b = [1, 3]
```

- every 把数组的每个元素传给指定的函数，如果全部调用返回true则every函数返回true
- some 把数组的每个元素传给指定的函数，如果有调用返回true则every函数返回true
- reduce 用指定的函数对数组进行组合，生成单个值

```javascript
var a = [1, 2, 3];
var b = a.reduce(function(x, y){
return x + y;
}, 0); //b = 6;
```

- indexOf/lastIndexOf在整个数组中搜索制定的元素

### 类数组对象
通过为对象增加length自增的特性或者其他特性，可以生成一个‘类数组对象’，可以通过length进行遍历。
例如函数的Arguments对象就是这样

---

## 语法基础 - 函数
### 定义
var plus = function (x, y) {}
function plus(x, y) {}

### 调用
- 作为函数调用

```javascript
function a(){};
a();
```

- 作为方法调用

```javascript
a = {}; a.x = function() {}
a.x();
```

-通过`call`和`apply`间接调用函数(改变`this`)

call 和 apply带有多个参数，call和apply把当前函数的this指向第一个参数给定的函数或对象中，并传递其余所有的参数作为当前函数的参数。
call和apply的不同之处，在于call传递的参数是作为arguments依次传入的, 而apply传递的参数是以一个数组的方式传入的
> fn.call(o, 1, 2, 3);
> fn.apply(o, [1, 2, 3]);

```javascript
var O = function () {
    this.foo  = 'hello';
    this.hello = function () {
        return 'world';
    }
};

var fn = function () {
    console.log('call', this);
};

var o = new O();

fn.call(o);//此时fn的this指向o
```

### 函数的参数
当传入参数少于函数声明的参数时，留空的参数的值是`undefined`。
Javascript允许传入参数的个数大于声明时制定的参数个数。可以用`arguments`来访问这些参数
ES6中, 不建议使用`arguments`建议使用`...args`代替

`arguments`还有两个属性，`callee`和`caller`
- callee表示正在执行的function对象，
- caller表示调用当前function的function

```javascript
function f(){
    console.log(arguments.callee);//[Function: f]
    console.log(arguments.callee.caller);[Function: g]
    var i;
    for( i = 0; i < arguments.length ; i++) {
        console.log(arguments[i]);
    }
}

function g(){
    f(1,2,3,4,5,6);
}

g();
callee 的重要用法之一是在匿名函数中实现递归

var result = function (x) {
    if (x <= 1) return 1;
    return x * arguments.callee(x - 1);
}(3);

console.log(result);
```

### 函数作为值来传递
```javascript
function square(x) {
    return x * x;
}

var s = square;
s(4);
```

### 函数作为命名空间
```javascript
(function() {

}());
```

### 闭包
Javascript函数对象的内部状态不仅包含着函数的代码逻辑，还引用当前的作用域链。
函数对象通过作用域链相互关联起来，函数体内部变量包含在函数作用域内，这就叫闭包。
```javascript
var scope = 'global scope';
function checkscope() {
    var scope = 'local scope';
    function f() { 
        return scope;
    }
    return f;
}

checkscope()();
```

### 函数中的this对象
在一个对象中的this始终引用当前对象，但是在函数中，特别是在闭包中，this有一些特殊的行为。

函数中的this对象始终绑定在函数运行时的上下文环境上。所以在普通模式下调用一个全局函数，this始终指向window（客户端），在严格模式下调用一个全局函数，this始终是undefined
```javascript
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    },
    getName : function () {
        return this.name;
    }
};

console.log(object.getNameFunc()());
console.log(object.getName());
```

### 函数柯里化
函数柯里化是指，把接受多个参数的函数转换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
```javascript
var add1 = add.curry(1);
console.log(add1(2));
```
其中，add是接受两个参数的函数，add调用了curry返回一个只接受一个参数的新函数，之后调用add1便等效于调用add(1, 2);

**javascript并不原生支持curry，可以用prototype来模拟**
```javascript
Function.prototype.curry = function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
};


function add(n1, n2) {
    return n1 + n2;
}

var add1 = add.curry(1);
console.log(add1(2));
```
**curry创建了一个新函数，在新函数的闭包中保存了原先传递的参数。**

### 函数的属性和方法
- length 函数的length表示函数实参的数量，是只读的
- prototype 指向一个该函数的原型对象的引用
- toString 返回一个字符串

---

## 语法基础 - 对象
### 创建对象
- 对象直接量 `var o = {foo: "bar"}`
- 构造函数 `var o = new Object()`
- 原型继承 `var p = Object.create(o)`

### 类继承
Javascript对象拥有自有属性和继承属性。
- 在查询对象o的属性x时，先查找o中的属性x，如果没找到，则查找o的原型对象中的x属性，直到查找到x或者一个原型是null的对象为止
- 在给对象o的x属性赋值时，如果o中已经有一个自有属性x，则改变x的值，若o中不存在属性x，则为o创建一个x属性并赋值
- 也就是说，**只有在查询时原型链才会起作用**。

可以使用`in`或者`hasOwnProperty`来判断对象中是否存在属性。
```javascript
var O = {
  x : 1
};

function P() {
  this.y = 2;
}

P.prototype = O;

var t = new P();
console.log(t);
console.log('x' in t);//true
console.log(t.hasOwnProperty('x'));//false
```

### 对象属性
#### 属性遍历
`for...in` 广度优先会遍历到原型链
#### 属性的特性 `Object.getOwnPropertyDescriptor()`获取对象特定属性的描述符
如果某个对象的属性定义了存取描述符，value 和 writable会被忽略，JavaScript 只会考虑 Getter, Setter, configurable, 和 enumerable。

- 属性描述符 (Property Descriptor) 
  - configurable
  - value
  - 可写性 `writable`
  - 可枚举性 `enumerable` false的时候`for..in`无法遍历
- 定义这些配置属性 `Object.defineProperties`
  - **get/set** 获取/设置对象的属性 (存取描述符)

```javascript
Object.defineProperty(o, "foo", { writable : false });
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, "year", {
    get: function () {
        console.log('get year');
        return this._year;
    },
    set: function (newValue) {
        console.log('set year');
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year = 2005;//控制台输出‘set year’
console.log(book.year);//控制台输出‘get year’和year的值
```

### ES5 新增对象方法
- Object.getPrototypeOf(o) 获取给丁对象的prototype对象。等价于以前的o.__proto__。
- Object.getOwnPropertyDescriptor(o,p) 获取对象描述。和Object.defineProperty的相关方法。
- Object.getOwnPropertyNames(o) 获取自有属性名列表。结果列表将不包含原型链上的属性。
- Object.create(o,p) 以给定对象o为prototype创建新的对象并返回。如果对象描述p存在，就使用其定义刚创建的对象（类似调用Object.defineProperties(obj,p)）。
- Object.defineProperty(o,p,attrs) 根据规则attrs定义对象o上，属性名为p的属性
- Object.defineProperties(o,props) 根据对象描述props来定义对象o，通常props包含多个属性的定义。
- Object.seal(o)
  - 一个对象在默认状态下，
  - extensible: 可以添加新的属性
  - configurable: 可以修改已有属性的特性
  - **Object.seal会改变这两个特性，既不能扩展新属性，也不能修改已有属性的特性。**
- Object.freeze(o)
  - 将对象的每个自有自有属性(own property)做如下操作：
  - 属性的writable特性置为false
  - 属性的configurable特性置为false
  - 同时，该对象将不可扩展。
  - **该方法比Object.seal更加严格的限制了对一个对象的未来改动。**
- Object.preventExtensions(o) 将对象置为不可扩展。
- Object.isSealed(o)
  - 判断一个对象是否sealed：
  - 对象的每个自有属性：如果属性的configurable特性为true，则返回false
  - 如果对象为extensible的，那么返回false
  - 不满足以上两个条件，则返回true
- Object.isFrozen(o)
  - 对每个自有属性，如果该属性的configurable或writable特性为true，则返回false
  - 如果对象为extensible的，那么返回false
  - 不满足以上两个条件，则返回true
- Object.isExtensible(o) 判断一个对象是否可扩展。
- Object.keys(o) 返回对象o的所有可枚举(enumerable)属性的名称。
- Object.prototype.isPrototypeOf(v) 检查对象是否是位于给定对象v的原型链上。
- Object.prototype.propertyIsEnumerable(p) 检查一个对象上的属性p是否可枚举。

ES6
- Object.getOwnPropertyDescriptors(o,p) 获取对象o上属性p的特性描述对象。在搜寻属性时，不在原型链上搜索。
- Object.getPropertyDescriptor(o,p) 获取对象o上属性p的特性描述对象。
- Object.getOwnPropertyNames(o) 获取对象自身上可枚举和不可枚举的键名数组。注意，该方法会返回那些enumerable属性已经设置为false的propety。
- Object.is(a, b)
检测两个给定对象的值是否相同。该方法不会进行如同==操作符那样去进行数值转换。
与`===`也有细微差别。**仅当符合下面任意条件才返回true：**
  - 都是undefined
  - 都是null
  - 都是true或false
  - 都是等长、内容相同的字符串
  - 都是同一个对象
  - 都是number，并且满足以下任一条件：
    - 都是+0
    - 都是-0
    - 都是NaN
    - 都是非零、非NaN，并且数值一样
- Object.setPrototypeOf(o, proto) 将对象o的原型修改为proto。和对象的__proto__属性行为一致。修改单个对象的prototype一般是不被推荐的。
- Object.assign(target, source1, source2, ...)

### 对象方法
- toString()
- valueof()
- JSON.stringify(obj) => JSON字符串

### 对象的Getter/Setter(ES5)
```javascript
// 通过闭包
var o = {
  a: 7,
  get b() { 
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25

// 通过 Object.defineProperty
var d = Date.prototype;
Object.defineProperty(d, "year", {
  get: function() {return this.getFullYear() },
  set: function(y) { this.setFullYear(y) }
});

// 通过函数属性
function Field(val){
    var value = val;
   
    this.getValue = function(){
        return value;
    };
   
    this.setValue = function(val){
        value = val;
    };
}
```


### 可执行对象
既可以当作对象来使用（有原型链），也可以当作函数来直接调用
```javascript
function bar(o) {
    var f = function() { return "Hello World!"; }
    o.__proto__ = f.__proto__;
    f.__proto__ = o;
    return f;
}

var o = { x: 5 };
var foo = bar(o);

console.log(foo());
console.log(foo.x);
console.log(typeof foo);//function
```

---

## 语法基础 - 严格模式
### 开启严格模式
"use strict"
### 严格模式具体行为
#### ReferenceError
创建隐式的全局变量

#### TypeError
- 试图修改不可写的属性
- 给只读属性赋值
- 给不可扩展的对象新建属性
- 试图删除不可删除的属性
- `arguments.callee`不能被返回、删除、修改；

#### SyntaxError
- 重复定义属性名
- 禁用八进制字面量
- 不允许重复参数名
- 不能使用`with`
- 不允许对 `eval` `arguments` 赋值
- 不可将 `eval` `arguments` 作为参数名 变量名

#### eval被限制在临时的本地作用域
#### arguments不再追踪实际参数值变化
#### 函数的动态绑定后的this不做任何修改
即使指定null或undefined，引擎也不会重新指定全局对象作为this
#### 指定基础数据类型时，也不会用包装类进行转换
```javascript
"use strict";
function fun() { return this; }
// fun() === undefined
// fun.call(2) === 2
// fun.apply(null) === null
// fun.call(undefined) === undefined
// fun.bind(true)() === true
```
#### 调用堆栈不可被追踪

---

## 参考
- [词法 - Javascript核心 - Javascript语法基础](http://segmentfault.com/a/1190000000515129)
- [数据类型 - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000515133)
- [Javascript语句 - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000515136)
- [数组 - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000515148)
- [函数 - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000515140)
- [Javascript Objects - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000515144)
- [Strict Mode和Extended Mode - Javascript语法基础 - Javascript核心](http://segmentfault.com/a/1190000000517498)
- [ES5特性 - ECMAScript特性 - Javascript核心](http://segmentfault.com/a/1190000000515151)
- [ES6引入的数据结构 - ES6 - ECMAScript特性 - Javascript核心](http://segmentfault.com/a/1190000000515162)
- [如何定义 Getters 和 Setters](http://codethoughts.info/javascript/2015/06/18/javascript-getters-and-setters/)
- [ES6特性概述 - ES6 - ECMAScript特性 - Javascript核心](http://segmentfault.com/a/1190000000515160)
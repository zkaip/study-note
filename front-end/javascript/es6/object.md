对象的扩展
===
#### 属性的简洁表示法
ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```js
var foo = 'bar';
var baz = {foo};
// 等同于
var baz = {foo: foo};

function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}

var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function() {
    return "Hello!";
  }
};
```
下面是一个更实际的例子。
```js
var Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```
这种写法用于函数的返回值，将会非常方便。
```js
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
```
__赋值器和取值器，也可以采用简洁写法。__
```js
var cart = {
  _wheels: 4,
  get wheels () {
    return this._wheels
  },
  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('hey, come back here!')
    }
    this._wheels = value
  }
}
```
模块输出变量，就非常合适使用简洁写法。
```js
var ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
```
#### 属性名表达式
JavaScript语言定义对象的属性，有两种方法。
```js
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。
```

但是，如果使用字面量方式定义对象（使用大括号），在ES5中只能使用

```js
方法一（标识符）定义属性。

var obj = {
  foo: true,
  abc: 123
};
ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```
下面是另一个例子。
```js
var lastWord = 'last word';

var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```
表达式还可以用于定义方法名。
```js
let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```
**注意，属性名表达式与简洁表示法，不能同时使用，会报错。**
```js
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };

// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};
```
#### 方法的name属性
函数的`name`属性，返回函数名。对象方法也是函数，因此也有`name`属性。
```js
var person = {
  sayName: function() {
    console.log(this.name);
  },
  get firstName() {
    return "Nicholas"
  }
}

person.sayName.name   // "sayName"
person.firstName.name // "get firstName"
// 上面代码中，方法的name属性返回函数名（即方法名）。如果使用了取值函数，则会在方法名前加上get。如果是存值函数，方法名的前面会加上set。
```
**有两种特殊情况：bind方法创造的函数，name属性返回“bound”加上原函数的名字；Function构造函数创造的函数，name属性返回“anonymous”。**
```js
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```
如果对象的方法是一个`Symbol`值，那么`name`属性返回的是这个`Symbol`值的描述。
```js
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
// 上面代码中，key1对应的Symbol值有描述，key2没有。
```
#### Object.is()
`Object.is`用来比较两个值是否严格相等。它与严格比较运算符（`===`）的行为基本一致。**不同之处只有两个：一是+0不等于-0，二是NaN等于自身。**
```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
ES5可以通过下面的代码，部署`Object.is`。
```js
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```
#### Object.assign() 浅拷贝
`Object.assign`方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。
```js
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
**注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。**
```js
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
**Object.assign只拷贝自身属性，不可枚举的属性（enumerable为false）和继承的属性不会被拷贝。**
```js
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
// 上面代码中，Object.assign要拷贝的对象只有一个不可枚举属性invisible，这个属性并没有被拷贝进去。
```
属性名为`Symbol`值的属性，也会被Object.assign拷贝。
```js
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
```
**对于嵌套的对象，Object.assign的处理方法是替换，而不是添加。**
```js
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
// 上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。有一些函数库提供Object.assign的定制版本（比如Lodash的_.defaultsDeep方法），可以解决深拷贝的问题。
```
**注意，Object.assign可以用来处理数组，但是会把数组视为对象。**
```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
上面代码中，Object.assign把数组视为属性名为0、1、2的对象，因此目标数组的0号属性4覆盖了原数组的0号属性1。
```

**Object.assign方法有很多用处。**

（1）为对象添加属性
```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```
上面方法通过assign方法，将x属性和y属性添加到Point类的对象实例。

（2）为对象添加方法
```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```
上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。

（3）克隆对象
```js
function clone(origin) {
  return Object.assign({}, origin);
}
```
上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

不过，**采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。**如果想要保持继承链，可以采用下面的代码。
```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```
（4）合并多个对象

将多个对象合并到某个对象。
```js
const merge =
  (target, ...sources) => Object.assign(target, ...sources);
```
如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
```js
const merge =
  (...sources) => Object.assign({}, ...sources);
```
（5）为属性指定默认值
```
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  let options = Object.assign({}, DEFAULTS, options);
}
```
上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则option的属性值会覆盖DEFAULTS的属性值。

**注意，由于存在深拷贝的问题，DEFAULTS对象和options对象的所有属性的值，都只能是简单类型，而不能指向另一个对象。否则，将导致DEFAULTS对象的该属性不起作用。**

#### 属性的可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。
```js
let obj = { foo: 123 };
 Object.getOwnPropertyDescriptor(obj, 'foo')
 //   { value: 123,
 //     writable: true,
 //     enumerable: true,
 //     configurable: true }
```
描述对象的`enumerable`属性，称为”可枚举性“，如果该属性为`false`，就表示某些操作会忽略当前属性。

ES5有三个操作会忽略`enumerable为false`的属性。

- for...in 循环：只遍历对象自身的和继承的可枚举的属性
- Object.keys()：返回对象自身的所有可枚举的属性的键名
- JSON.stringify()：只串行化对象自身的可枚举的属性

ES6新增了两个操作，会忽略enumerable为false的属性。

- Object.assign()：只拷贝对象自身的可枚举的属性
- Reflect.enumerate()：返回所有for...in循环会遍历的属性

这五个操作之中，只有`for...in`和`Reflect.enumerate()`会返回继承的属性。实际上，引入`enumerable`的最初目的，就是让某些属性可以规避掉`for...in`操作。比如，对象原型的`toString`方法，以及数组的`length`属性，就通过这种手段，不会被`for...in`遍历到。
```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```
另外，**ES6规定，所有Class的原型的方法都是不可枚举的。**
```js
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```
总的来说，**操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。**

#### \_\_proto\_\_属性，Object.setPrototypeOf()，Object.getPrototypeOf()
（1）\_\_proto\_\_属性

**\_\_proto\_\_属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。**目前，所有浏览器（包括IE11）都部署了这个属性。
```js
// es6的写法
var obj = {
  method: function() { ... }
}
obj.__proto__ = someOtherObj;

// es5的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... }
```
该属性没有写入ES6的正文，而是写入了附录，原因是__proto__前后的双引号，说明它本质上是一个内部属性，而不是一个正式的对外的API，只是由于浏览器广泛支持，才被加入了ES6。**标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。**因此，无论从语义的角度，还是从兼容性的角度，都**不要使用这个属性**，而是__使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。__

在实现上，`__proto__`调用的是`Object.prototype.__proto__`，具体实现如下。
```js
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (! status) {
      throw new TypeError();
    }
  },
});
function isObject(value) {
  return Object(value) === value;
}
```
如果一个对象本身部署了`__proto_`_属性，则该属性的值就是对象的原型。
```js
Object.getPrototypeOf({ __proto__: null })
// null
```
（2）Object.setPrototypeOf()

`Object.setPrototypeOf`方法的作用与`__proto__`相同，用来设置一个对象的prototype对象。它是ES6正式推荐的设置原型对象的方法。
```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null);
//该方法等同于下面的函数。
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
下面是一个例子。
```js
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```
上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。

（3）Object.getPrototypeOf()

该方法与`setPrototypeOf`方法配套，用于读取一个对象的`prototype`对象。

> Object.getPrototypeOf(obj);

下面是一个例子。
```js
function Rectangle() {
}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
```
#### Object.observe()，Object.unobserve() ES7
Object.observe方法用来监听对象（以及数组）的变化。一旦监听对象发生变化，就会触发回调函数。
```js
var user = {};
Object.observe(user, function(changes){
  changes.forEach(function(change) {
    user.fullName = user.firstName+" "+user.lastName;
  });
});

user.firstName = 'Michael';
user.lastName = 'Jackson';
user.fullName // 'Michael Jackson'
```
上面代码中，Object.observer方法监听user对象。一旦该对象发生变化，就自动生成fullName属性。

一般情况下，Object.observe方法接受两个参数，
- 第一个参数是监听的对象，
- 第二个函数是一个回调函数。一旦监听对象发生变化（比如新增或删除一个属性），就会触发这个回调函数。很明显，利用这个方法可以做很多事情，比如自动更新DOM。

```js
var div = $("#foo");

Object.observe(user, function(changes){
  changes.forEach(function(change) {
    var fullName = user.firstName+" "+user.lastName;
    div.text(fullName);
  });
});
```
上面代码中，只要user对象发生变化，就会自动更新DOM。如果配合jQuery的change方法，就可以实现数据对象与DOM对象的双向自动绑定。

回调函数的changes参数是一个数组，代表对象发生的变化。下面是一个更完整的例子。
```js
var o = {};

function observer(changes){
  changes.forEach(function(change) {
    console.log('发生变动的属性：' + change.name);
    console.log('变动前的值：' + change.oldValue);
    console.log('变动后的值：' + change.object[change.name]);
    console.log('变动类型：' + change.type);
  });
}
```
Object.observe(o, observer);
参照上面代码，Object.observe方法指定的回调函数，接受一个数组（changes）作为参数。该数组的成员与对象的变化一一对应，也就是说，对象发生多少个变化，该数组就有多少个成员。每个成员是一个对象（change），它的name属性表示发生变化源对象的属性名，oldValue属性表示发生变化前的值，object属性指向变动后的源对象，type属性表示变化的种类。基本上，change对象是下面的样子。
```js
var change = {
  object: {...},
  type: 'update',
  name: 'p2',
  oldValue: 'Property 2'
}
```
**Object.observe方法目前共支持监听六种变化。**

- add：添加属性
- update：属性值的变化
- delete：删除属性
- setPrototype：设置原型
- reconfigure：属性的attributes对象发生变化
- preventExtensions：对象被禁止扩展（当一个对象变得不可扩展时，也就不必再监听了）

**Object.observe方法还可以接受第三个参数，用来指定监听的事件种类。**
```js
Object.observe(o, observer, ['delete']);
// 上面的代码表示，只在发生delete事件时，才会调用回调函数。
```
**Object.unobserve方法用来取消监听。**
```js
Object.unobserve(o, observer);
```
**注意，Object.observe和Object.unobserve这两个方法不属于ES6，而是属于ES7的一部分。不过，Chrome浏览器从33版起就已经支持。**

#### 对象的扩展运算符 ES7
目前，ES7有一个提案，**将rest参数/扩展运算符（...）引入对象。**Babel转码器已经支持这项功能。

（1）Rest参数

Rest参数用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```
上面代码中，变量z是Rest参数所在的对象。它获取等号右边的所有尚未读取的键（a和b），将它们和它们的值拷贝过来。

注意，**Rest参数的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么Rest参数拷贝的是这个值的引用，而不是这个值的副本。**
```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```
上面代码中，x是Rest参数，拷贝了对象obj的a属性。a属性引用了一个对象，修改这个对象的值，会影响到Rest参数对它的引用。

另外，**Rest参数不会拷贝继承自原型对象的属性。**
```js
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let o3 = { ...o2 };
o3 // { b: 2 }
```
上面代码中，对象o3是o2的复制，但是只复制了o2自身的属性，没有复制它的原型对象o1的属性。

（2）扩展运算符

扩展运算符用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```
这等同于使用`Object.assign`方法。
```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```
扩展运算符可以用于合并两个对象。
```js
let ab = { ...a, ...b };
```
扩展运算符还可以用自定义属性，会在新对象之中，覆盖掉原有参数。
```js
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```
上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。

**如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。**
```js
let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
```
扩展运算符的参数对象之中，如果有取值函数`get`，这个函数是**会执行的**。
```js
// 并不会抛出错误，因为x属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throws new Error('not thrown yet');
  }
};

// 会抛出错误，因为x属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throws new Error('thrown now');
    }
  }
};
```
如果扩展运算符的参数是`null`或`undefined`，这个两个值会被忽略，不会报错。
```js
let emptyObject = { ...null, ...undefined }; // 不报错
```
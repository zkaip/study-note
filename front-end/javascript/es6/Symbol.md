Symbol
===
ES6引入了一种新的`原始数据类型Symbol，表示独一无二的值`。它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
Symbol值通过`Symbol`函数生成。
> let s = Symbol();
>
> typeof s // "symbol"

Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

**注意，Symbol函数前不能使用new命令，否则会报错。**这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

**Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，**主要是为了在控制台显示，或者转为字符串时，比较容易区分。

**Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。**
```js
var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar

// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");

s1 === s2 // false
```
Symbol值不能与其他类型的值进行运算，会报错。但是，Symbol值可以转为字符串。
```js
var sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string

var sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```
#### 作为属性名的Symbol
由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这**对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。**
```js
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个Symbol值。
```
**注意，Symbol值作为对象属性名时，不能用点运算符。**
```js
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // "Hello!"
a['mySymbol'] // undefined
```
上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个Symbol值。

**在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。Symbol值作为属性名时，该属性还是公开属性，不是私有属性。**
```js
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};
//增强对象写法
let obj = {
  [s](arg) { ... }
};

obj[s](123);
```
上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个Symbol值。

Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
```js
log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn'),
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
```
#### 属性名的遍历
Symbol作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有`Symbol`属性名。

**Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。**
```js
var obj = {};
var a = Symbol('a');
var b = Symbol.for('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```
下面是另一个例子，`Object.getOwnPropertySymbols`方法与`for...in`循环、`Object.getOwnPropertyNames`方法进行对比的例子。
```js
var obj = {};

var foo = Symbol("foo");

Object.defineProperty(obj, foo, {
  value: "foobar",
});

for (var i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj)
// []

Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]
```
上面代码中，使用`Object.getOwnPropertyNames`方法得不到Symbol属性名，需要使用`Object.getOwnPropertySymbols`方法。

另一个新的API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和Symbol键名。
```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']
```
由于以`Symbol`值作为名称的属性，不会被常规方法遍历得到。**我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。**
```js
var size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```
上面代码中，对象x的size属性是一个Symbol值，所以`Object.keys(x)`、`Object.getOwnPropertyNames(x)`都无法获取它。这就造成了一种非私有的内部方法的效果。

#### Symbol.for()，Symbol.keyFor()
有时，我们希望重新使用同一个Symbol值，`Symbol.for`方法可以做到这一点。**它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。**
```js
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true
```
上面代码中，s1和s2都是Symbol值，但是它们都是同样参数的`Symbol.for`方法生成的，所以实际上是同一个值。

`Symbol.for()`与`Symbol()`这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30次，每次都会返回同一个Symbol值，但是调用`Symbol("cat")`30次，会返回30个不同的Symbol值。
```js
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```
上面代码中，由于`Symbol()`写法没有登记机制，所以每次调用都会返回一个不同的值。

`Symbol.keyFor`方法返回一个已登记的Symbol类型值的key。
```js
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```
上面代码中，变量`s2`属于未登记的Symbol值，所以返回`undefined`。

**需要注意的是，Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。**
```js
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true
```
上面代码中，iframe窗口生成的Symbol值，可以在主页面得到。

#### 内置的Symbol值
除了定义自己使用的Symbol值以外，ES6还**提供了11个内置的Symbol值，指向语言内部使用的方法。**

- Symbol.hasInstance
对象的`Symbol.hasInstance`属性，指向一个内部方法。该对象使用`instanceof`运算符时，会调用这个方法，判断该对象是否为某个构造函数的实例。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。
```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}
var o = new MyClass();
o instanceof Array // false
```
- Symbol.isConcatSpreadable
对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象使用`Array.prototype.concat()`时，是否可以展开。

```js
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```
上面代码说明，**数组的Symbol.isConcatSpreadable属性默认为true，表示可以展开。**

类似数组的对象也可以展开，但它的`Symbol.isConcatSpreadable`属性默认为`false`，必须手动打开。
```js
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```
对于一个类来说，Symbol.isConcatSpreadable属性必须写成一个返回布尔值的方法。
```js
class A1 extends Array {
  [Symbol.isConcatSpreadable]() {
    return true;
  }
}
class A2 extends Array {
  [Symbol.isConcatSpreadable]() {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
```
上面代码中，类A1是可扩展的，类A2是不可扩展的，所以使用concat时有不一样的结果。

- Symbol.species
对象的`Symbol.species`属性，指向一个方法。该对象作为构造函数创造实例时，会调用这个方法。即如果`this.constructor[Symbol.species]`存在，就会使用这个属性作为构造函数，来创造新的实例对象。

- Symbol.match
对象的`Symbol.match`属性，指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。

```js
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```
- Symbol.replace
对象的`Symbol.replace`属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值。

```js
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```
- Symbol.search
对象的`Symbol.search`属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值。

```js
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```
- Symbol.split
对象的`Symbol.split`属性，指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值。

```js
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```
- Symbol.iterator
对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法，即该对象进行`for...of`循环时，会调用这个方法。

```js
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```
- Symbol.toPrimitive
对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，**一共有三种模式**。

1. Number：该场合需要转成数值
1. String：该场合需要转成字符串
1. Default：该场合可以转成数值，也可以转成字符串

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj === 'default' // true
String(obj) // 'str'
```
- Symbol.toStringTag
对象的`Symbol.toStringTag`属性，指向一个方法。在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在`toString`方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。

```js
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```
ES6新增内置对象的Symbol.toStringTag属性值如下。

1. `JSON[Symbol.toStringTag]`：'JSON'
1. `Math[Symbol.toStringTag]`：'Math'
1. `Module对象M[Symbol.toStringTag]`：'Module'
1. `ArrayBuffer.prototype[Symbol.toStringTag]`：'ArrayBuffer'
1. `DataView.prototype[Symbol.toStringTag]`：'DataView'
1. `Map.prototype[Symbol.toStringTag]`：'Map'
1. `Promise.prototype[Symbol.toStringTag]`：'Promise'
1. `Set.prototype[Symbol.toStringTag]`：'Set'
1. `%TypedArray%.prototype[Symbol.toStringTag]`：'Uint8Array'等
1. `WeakMap.prototype[Symbol.toStringTag]`：'WeakMap'
1. `WeakSet.prototype[Symbol.toStringTag]`：'WeakSet'
1. `%MapIteratorPrototype%[Symbol.toStringTag]`：'Map Iterator'
1. `%SetIteratorPrototype%[Symbol.toStringTag]`：'Set Iterator'
1. `%StringIteratorPrototype%[Symbol.toStringTag]`：'String Iterator'
1. `Symbol.prototype[Symbol.toStringTag]`：'Symbol'
1. `Generator.prototype[Symbol.toStringTag]`：'Generator'
1. `GeneratorFunction.prototype[Symbol.toStringTag]`：'GeneratorFunction'

- Symbol.unscopables
对象的`Symbol.unscopables`属性，指向一个对象。该对象指定了使用`with`关键字时，哪些属性会被with环境排除。

```js
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']
```
上面代码说明，数组有_6_个属性，会被`with`命令排除。
```js
// 没有unscopables时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}

// 有unscopables时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}
```
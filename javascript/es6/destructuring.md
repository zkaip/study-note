变量的解构赋值
===
####[数组的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)
- 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
- 解构不成功，变量的值就等于undefined。
- 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
- 等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
- 解构赋值允许指定默认值。(如果一个数组成员不严格等于undefined，默认值是不会生效的。)
- 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

```js
var [a, b, c] = [1, 2, 3];

let [,,third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;

var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null

var [v1, v2, ..., vN ] = array;
let [v1, v2, ..., vN ] = array;
const [v1, v2, ..., vN ] = array;

[a, b, c] = new Set(["a", "b", "c"])
a // "a

function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```
####对象的解构赋值
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
- 如果变量名与属性名不一致，必须写成下面这样。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
- 解构也可以用于嵌套结构的对象。
- 对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于undefined。
- 如果解构失败，变量的值等于undefined。
- 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
- 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
- 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

var obj = {
  p: [
    "Hello",
    { y: "World" }
  ]
};

var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"

var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
console.log(x, y) // 1, 5

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

var {foo} = {bar: 'baz'}
foo // undefined

// 报错
var {foo: {bar}} = {baz: 'baz'}

var _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错

// 错误的写法
var x;
{x} = {x:1};
// SyntaxError: syntax error
// 正确的写法
({x} = {x:1});

//对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, sin, cos } = Math;
```
####字符串的解构赋值
- 此时，字符串被转换成了一个类似数组的对象。
- 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```
####函数参数的解构赋值
```js
function add([x, y]){
  return x + y;
}

add([1, 2]) // 3
```
```js
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]


//注意，指定函数参数的默认值时，不能采用下面的写法。

function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
// 上面代码是为函数move的参数指定默认值，
// 而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
```
#### 圆括号问题
如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

建议只要有可能，就不要在模式中放置圆括号。

######不能使用圆括号的情况
```js
// 变量声明语句中，模式不能带有圆括号。
// 全部报错
var [(a)] = [1];
var { x: (c) } = {};
var { o: ({ p: p }) } = { o: { p: 2 } };

// 函数参数中，模式不能带有圆括号。
// 报错
function f([(z)]) { return z; }

// 不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
上面代码将整个模式放在模式之中，导致报错。

// 报错
[({ p: a }), { x: c }] = [{}, {}];
```
######可以使用圆括号的情况
```js
// 只有一种：赋值语句的非模式部分，可以使用圆括号。

[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

####用途
- 交换变量的值
`[x, y] = [y, x];`
- 从函数返回多个值

```js
// 函数只能返回一个值，
// 如果要返回多个值，
// 只能将它们放在数组或对象里返回。
// 有了解构赋值，取出这些值就非常方便。


// 返回一个数组
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
```
- 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。
```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({x:1, y:2, z:3})
```
- 提取JSON数据

```js
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
}

let { id, status, data: number } = jsonData;

console.log(id, status, number)
// 42, OK, [867, 5309]
```
- 函数参数的默认值

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```
指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。
- 遍历Map结构

任何部署了`Iterator`接口的对象，都可以用`for...of`循环遍历。`Map`结构原生支持`Iterator`接口，配合变量的解构赋值，获取键名和键值就非常方便。
```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```
- 输入模块的指定方法

加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。
```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
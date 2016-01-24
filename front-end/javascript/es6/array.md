数组的扩展
===
#### Array.from() ...
将两类对象转为真正的数组：类似数组的对象（`array-like object`）和可遍历（`iterable`）的对象（包括ES6新增的数据结构Set和Map）
```js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

Array.from([1, 2, 3])
// [1, 2, 3]

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});
// querySelectorAll方法返回的是一个类似数组的对象，只有将这个对象转为真正的数组，才能使用forEach方法。
```
> Array.from方法可以将函数的arguments对象，转为数组。

```js
function foo() {
  var args = Array.from(arguments);
}

foo('a', 'b', 'c');
```
> 扩展运算符（...）也可以将某些数据结构转为数组。

> 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法就不存在这个问题

> 任何有length属性的对象，都可以通过Array.from方法转为数组。

```js
// arguments对象
function foo() {
  var args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });
// [ "a", "b" , "c" ]
```
> 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。

```js
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

> Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']
```

> Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，你可以在数组里造出任何想要的值。

> 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

```js
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
// 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。
```

> Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug

```js
function countSymbols(string) {
  return Array.from(string).length;
}
```

#### Array.of()
`Array.of`方法用于将一组值，转换为数组。基本上可以用来替代`new Array()`，并且不存在`new Array(length)`导致的重载。它的行为非常统一。
```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

Array() // []
Array(3) // [undefined, undefined, undefined]
Array(3, 11, 8) // [3, 11, 8]
// 只有当参数个数不少于2个，
// Array()才会返回由参数组成的新数组。
```
Array.of方法可以用下面的代码模拟实现。
```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

#### 数组的实例copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
- 这三个参数都应该是数值，如果不是，会自动转为数值

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```
#### 数组实例的find()和findIndex()
数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。
```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
上面代码找出数组中第一个小于0的成员。

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
// 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```
数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。
```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
这两个方法都可以发现`NaN`，弥补了数组的`IndexOf`方法的不足。
```js
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
// 上面代码中，indexOf方法无法识别数组的NaN成员，
// 但是findIndex方法可以借助Object.is方法做到。
```
#### 数组实例的fill()
fill方法使用给定值，填充一个数组。用于空数组的初始化非常方便。还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```js
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
#### 数组实例的entries()，keys()和values()
ES6提供三个新的方法——`entries()，keys()和values()`——用于遍历数组。它们都返回一个遍历器对象，可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。
```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```
#### 数组实例的includes() ES7
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。
```js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true

// 该方法的第二个参数表示搜索的起始位置，默认为0。
// 如果第二个参数为负数，则表示倒数的位置，
// 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```
没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值。
```js
if (arr.indexOf(el) !== -1) {
  // ...
}
```
__indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。__
```js
[NaN].indexOf(NaN)
// -1
includes使用的是不一样的判断算法，就没有这个问题。

[NaN].includes(NaN)
// true
```
下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
```
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(["foo", "bar"], "baz"); // => false
```
__另外，Map和Set数据结构有一个has方法，需要注意与includes区分。__

- Map结构的`has`方法，是用来查找键名的<br>比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set结构的`has`方法，是用来查找值的<br>比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

#### 数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

> Array(3) // [, , ,]

> 上面代码中，Array(3)返回一个具有3个空位的数组。

注意，**空位不是undefined**，一个位置的值等于undefined，依然是有值的。空位是没有任何值，**in运算符可以说明这一点**。

> 0 in [undefined, undefined, undefined] // true

> 0 in [, , ,] // false

> 上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值。

##### ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- forEach(), filter(), every() 和some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

```js
// forEach方法
[,'a'].forEach((x,i) => log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```
##### ES6则是明确将空位转为undefined。

- Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
- 扩展运算符（...）也会将空位转为undefined。
- copyWithin()会连空位一起拷贝。
- fill()会将空位视为正常的数组位置。
- entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

```js
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

[...['a',,'b']]
// [ "a", undefined, "b" ]

[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

new Array(3).fill('a') // ["a","a","a"]

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```
**由于空位的处理规则非常不统一，所以建议避免出现空位。**

#### 数组推导 ES7
数组推导（array comprehension）提供简洁写法，允许直接通过现有数组生成新数组。这项功能本来是要放入ES6的，但是TC39委员会想继续完善这项功能，让其支持所有数据结构（内部调用iterator对象），不像现在只支持数组，所以就把它推迟到了ES7。Babel转码器已经支持这个功能。
```js
var a1 = [1, 2, 3, 4];
var a2 = [for (i of a1) i * 2];

a2 // [2, 4, 6, 8]
// 上面代码表示，通过for...of结构，数组a2直接在a1的基础上生成。
```
**注意，数组推导中，for...of结构总是写在最前面，返回的表达式写在最后面。**

for...of后面还可以附加if语句，用来设定循环的限制条件。
```js
var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];

[for (year of years) if (year > 2000) year];
// [ 2006, 2010, 2014 ]

[for (year of years) if (year > 2000) if(year < 2010) year];
// [ 2006]

[for (year of years) if (year > 2000 && year < 2010) year];
// [ 2006]
// 上面代码表明，if语句写在for...of与返回的表达式之间，
// 可以使用多个if语句。
```
数组推导可以替代`map`和`filter`方法。
```js
[for (i of [1, 2, 3]) i * i];
// 等价于
[1, 2, 3].map(function (i) { return i * i });

[for (i of [1,4,2,3,-8]) if (i < 3) i];
// 等价于
[1,4,2,3,-8].filter(function(i) { return i < 3 });
/// 上面代码说明，模拟map功能只要单纯的for...of循环就行了，模拟filter功能除了for...of循环，还必须加上if语句。
```
在一个数组推导中，还可以使用多个`for...of`结构，构成多重循环。
```js
var a1 = ["x1", "y1"];
var a2 = ["x2", "y2"];
var a3 = ["x3", "y3"];

[for (s of a1) for (w of a2) for (r of a3) console.log(s + w + r)];
// x1x2x3
// x1x2y3
// x1y2x3
// x1y2y3
// y1x2x3
// y1x2y3
// y1y2x3
// y1y2y3
// 上面代码在一个数组推导之中，使用了三个for...of结构。
```
**需要注意的是，数组推导的方括号构成了一个单独的作用域，在这个方括号中声明的变量类似于使用let语句声明的变量。**

由于字符串可以视为数组，因此字符串也可以直接用于数组推导。
```js
[for (c of 'abcde') if (/[aeiou]/.test(c)) c].join('') // 'ae'

[for (c of 'abcde') c+'0'].join('') // 'a0b0c0d0e0'
// 上面代码使用了数组推导，对字符串进行处理。
```
__数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。__

推导的用法不限于数组，还可以直接使用。
```js
var results = (
  for (c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
)
```
#### Array.observe()，Array.unobserve() ES7
这两个方法用于监听（取消监听）数组的变化，指定回调函数。

它们的用法与`Object.observe`和`Object.unobserve`方法完全一致，也属于ES7的一部分。

唯一的区别是，对象可监听的变化一共有六种，而数组只有四种：`add`、`update`、`delete`、`splice`（数组的length属性发生变化）。


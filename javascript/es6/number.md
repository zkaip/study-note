Number
===
#### 二进制和八进制表示法
ES6提供了二进制和八进制数值的新的写法，分别用前缀`0b`和`0o`表示。
```js
0b111110111 === 503 // true
0o767 === 503 // true
八进制不再允许使用前缀0表示，而改为使用前缀0o。

011 === 9 // 不正确
0o11 === 9 // 正确
```
#### Number.isFinite(), Number.isNaN()
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。


Number.isFinite()用来检查一个数值是否非无穷（infinity）
```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// ES5可以通过下面的代码，部署Number.isFinite方法。

(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```
Number.isNaN()用来检查一个值是否为NaN。
```js
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true'/0) // true
Number.isNaN('true'/'true') // true
// ES5通过下面的代码，部署Number.isNaN()。

(function (global) {
  var global_isNaN = global.isNaN;

  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

#### Number.parseInt(), Number.parseFloat()
ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
```js
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```
#### Number.isInteger()
Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

// ES5可以通过下面的代码，部署Number.isInteger()。
(function (global) {
  var floor = Math.floor,
    isFinite = global.isFinite;

  Object.defineProperty(Number, 'isInteger', {
    value: function isInteger(value) {
      return typeof value === 'number' && isFinite(value) &&
        value > -9007199254740992 && value < 9007199254740992 &&
        floor(value) === value;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```
#### Number.EPSILON
ES6在Number对象上面，新增一个极小的常量Number.EPSILON

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。但是如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。

Number.EPSILON的实质是一个可以接受的误差范围。
```js
// 误差检查函数
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON
}
withinErrorMargin(0.1 + 0.2, 0.3)
// true
withinErrorMargin(0.2 + 0.2, 0.3)
// false
```
#### 安全整数和Number.isSafeInteger()
JavaScript能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点）。ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

// Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(1) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```
注意，验证运算结果是否落在安全整数的范围时，不要只验证运算结果，而要同时验证参与运算的每个值。

如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。
```js
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result
  }
  throw new RangeError('Operation cannot be trusted!')
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
```
#### 指数运算符(ES7)
ES7新增了一个指数运算符`（**）`，目前Babel转码器已经支持。
```js
2 ** 2 // 4
2 ** 3 // 8

// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 2;
a **= 2;
// 等同于 a = a * a;

let b = 3;
b **= 3;
// 等同于 b = b * b * b;
```
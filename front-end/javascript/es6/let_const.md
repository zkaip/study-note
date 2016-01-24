let和const命令
===
####let命令
- 声明变量
- 在代码块中有效,特别适用于`for`循环
```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
- 不存在变量提升
- 暂时性死区(temporal dead zone)
- 不允许重复声明

####块级作用域
ES5存在__内层变量可能覆盖外层变量__,用来__循环计数的循环变量泄露为全局变量__的问题
- 允许块级作用域任意嵌套
- 内层作用域可以定义外层作用域的同名变量
- 外层作用域无法读取内层作用域的变量。
- 函数本身的作用域，在其所在的块级作用域之内。
- 实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了

```js
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```
```js
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// ES5 I am outside
// ES6 I am inside
```
__需要注意的是，如果在严格模式下，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。__

####const命令
- 声明常量,一旦声明,不能改变
- 重新赋值不会报错,只会赋值失败
- 只在声明所在的块级作用域有效
- 暂时性死区
- 将一个对象声明为常量必须非常小心,const命令只是指向变量所在的地址
- 如果真的想将对象冻结，应该使用`Object.freeze`方法。除了将对象本身冻结，对象的属性也应该冻结。
```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```
####跨模块常量

```js
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```
####全局对象属性
全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。在JavaScript语言中，所有全局变量都是全局对象的属性。
（Node的情况比较特殊，这一条只对REPL环境适用，模块环境必须显式声明成global的属性。）

ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。
```js
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```
上面代码中，全局变量`a`由`var`命令声明，所以它是全局对象的属性；全局变量`b`由`let`命令声明，所以它不是全局对象的属性，返回`undefined`。

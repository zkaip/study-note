正则的扩展
===
#### RegExp构造函数
RegExp构造函数能接受字符串和正则表达式作为参数
```js
var regex = new RegExp("xyz", "i");
// 等价于
var regex = /xyz/i;

var regex = new RegExp(/xyz/i);

new RegExp(/abc/ig, 'i').flags
// "i"
```
#### 字符串的正则方法
`match()`、`replace()`、`search()`和`split()`
```
// ES6将这4个方法，在语言内部全部调用RegExp的实例方法，
// 从而做到所有与正则相关的方法，全都定义在RegExp对象上。

String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]
```
#### u修饰符
```js
/^\uD83D/.test('\uD83D\uDC2A')
// true
/^\uD83D/u.test('\uD83D\uDC2A')
// false
```
- 点字符
点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。

```js
var s = "𠮷";

/^.$/.test(s) // false
/^.$/u.test(s) // true
```
- Unicode字符表示法
```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```
- 量词
```js
// 使用u修饰符后，所有量词都会正确识别大于码点大于0xFFFF的Unicode字符。
// 只有在使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词。
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
/^\u{3}$/.test('uuu') // true
```
- 预定义模式
u修饰符也影响到预定义模式，能否正确识别码点大于`0xFFFF`的Unicode字符。
```js
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
// \S是预定义模式，匹配所有不是空格的字符。
// 只有加了u修饰符，它才能正确匹配码点大于0xFFFF的Unicode字符。
```

正确返回字符串长度的函数。
```js
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = "𠮷𠮷";

s.length // 4
codePointLength(s) // 2
```
- `i`修饰符
有些Unicode字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
```js
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
// 不加u修饰符，就无法识别非规范的K字符。
```

#### y修饰符
ES6还为正则表达式添加了`y修饰符`，叫做“粘连”（sticky）修饰符。

y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
```js
var s = "aaa_aa_a";
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null
//上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是“_aa_a”。由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。

// 如果改一下正则表达式，保证每次都能头部匹配，y修饰符就会返回结果了。

var s = "aaa_aa_a";
var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
```
```js
使用lastIndex属性，可以更好地说明y修饰符。
const REGEX = /a/g;

REGEX.lastIndex = 2; // 指定从第三个位置y开始搜索
const match = REGEX.exec('xaya');

match.index
// 3
REGEX.lastIndex
// 4
REGEX.exec('xaxa')
// null

// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。

const REGEX = /a/y;

// 第三个位置y不匹配
REGEX.lastIndex = 2;
console.log(REGEX.exec('xaya')); // null

// 第四个位置出现匹配
REGEX.lastIndex = 3;
const match = REGEX.exec('xaxa');
match.index // 3
REGEX.lastIndex // 4
```
__y修饰符号隐含了头部匹配的标志ˆ,y修饰符的设计本意，就是让头部匹配的标志ˆ在全局匹配中都有效。__
```js
/b/y.exec("aba")
// null
```
在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。
```js
// 没有找到匹配
'x##'.split(/#/y)
// [ 'x##' ]

// 找到两个匹配
'##x'.split(/#/y)
// [ '', '', 'x' ]

// 后续的分隔符只有紧跟前面的分隔符，才会被识别。
'#x#'.split(/#/y)
// [ '', 'x#' ]

'##'.split(/#/y)
// [ '', '', '' ]
```
字符串对象的replace方法的例子。
```js
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'
// 上面代码中，最后一个a因为不是出现下一次匹配的头部，所以不会被替换。

// 如果同时使用g修饰符和y修饰符，则y修饰符覆盖g修饰符。

// y修饰符的主要作用，是从字符串提取token（词元），y修饰符确保了匹配之间不会有漏掉的字符。
```
应用:
__非法字符匹配__
```js
function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}

const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]
// 上面代码中，如果字符串里面没有非法字符，y修饰符与g修饰符的提取结果是一样的。
// 但是，一旦出现非法字符，两者的行为就不一样了。

tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]
// 上面代码中，g修饰符会忽略非法字符，而y修饰符不会，这样就很容易发现错误。
```
#### sticky属性
与y修饰符相匹配，ES6的正则对象多了sticky属性，表示是否设置了y修饰符。
```js
var r = /hello\d/y;
r.sticky // true
```
#### flags属性(会返回正则表达式的修饰符)
```js
// ES5的source属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6的flags属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'
```
#### RegExp.escape()
目前字符串必须经过转义后才能作为一个正则匹配的模式,目前由于该方法存在安全风险,可以用`escapeRegExp函数`或者`垫片模块regexp.escape`实现
```js
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

let str = '/path/to/resource.html?search=query';
escapeRegExp(str)
// "\/path\/to\/resource\.html\?search=query"
```
```js
var escape = require('regexp.escape');
escape('hi. how are you?')
"hi\\. how are you\\?"
```

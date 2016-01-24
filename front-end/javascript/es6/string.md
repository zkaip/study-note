字符串的扩展
===
####字符的Unicode表示法
```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
"\u{20BB7}"
// "𠮷"
"\uD842\uDFB7"
// "𠮷"
```
####codePointAt()

```js
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

var s = "𠮷a";

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.charCodeAt(2) // 97
```
```js
// 应用
// 测试一个字符是由两个字节还是四个字节组成
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```
####String.fromCodePoint()
```js
String.fromCharCode(0x20BB7)
// "ஷ" > 0xFFFF 溢出乱码
String.fromCodePoint(0x20BB7)
// "𠮷"
```
####字符串的遍历器接口`for...of`
传统的for循环无法识别这个码点
####at()可以识别`Unicode`大于`0xFFFF`的字符
```js
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
```
####normalize() Unicode正规化

normalize方法可以接受四个参数。

- `NFC`，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- `NFD`，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- `NFKC`，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。
- `NFKD`，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

'\u01D1'.normalize() === '\u004F\u030C'.normalize()

```
`normalize`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。

####includes(), startsWith(), endsWith(), indexOf()

都支持第二个参数，表示开始搜索的位置。使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

####repeat()
 - repeat方法返回一个新字符串，表示将原字符串重复n次。
 - 参数如果是小数，会被向前取整
 - 参数是0到-1之间的小数，则等同于0
 - 如果repeat的参数是负数或者Infinity，会报错。
 - 参数NaN等同于0。
 - 如果repeat的参数是字符串，则会先转换成数字。

####模板字符串
 - \` 标识
 - 反斜杠转义
 - 多行字符,则空格缩进都会保留
 - 模板嵌入变量,需要将变量名写入 `${}`中
 - `${}`中可以进行运算、引入对象属性、调用函数，默认最后调用toString方法
 - `${}`中的变量没有声明，会报错
 - `${}`中如果事字符串，会原样输出

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```
####标签模板
```js
var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}

msg
// "The total is 30 (31.5 with tax)"
```
应用:
- 过滤HTML字符串，防止用户输入恶意内容。

```js
var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```
- 多语言转换（国际化处理）

```js
i18n`Hello ${name}, you have ${amount}:c(CAD) in your bank account.`
// Hallo Bob, Sie haben 1.234,56 $CA auf Ihrem Bankkonto.
```
- 模板库
```js
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
var libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```
- 嵌入其他语言
```js
java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println(“Hello World!”); // Display the string.
  }
}
`
HelloWorldApp.main();
```
- 模板处理函数的第一个参数(模板字符串数组)还有一个raw属性
```js
tag`First line\nSecond line`

function tag(strings) {
  console.log(strings.raw[0]);
  // "First line\\nSecond line"
}
```
####String.raw()
String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。

```js
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`

String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```
Module
===
**ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。**`CommonJS`和`AMD`模块，都只能在运行时确定这些东西。

比如，`CommonJS`模块就是对象，输入时必须查找对象属性。

> let { stat, exists, readFile } = require('fs');

上面代码的实质是整体加载`fs`模块（即加载fs的所有方法），然后使用时用到3个方法。这种加载称为“**运行时加载**”。

**ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。**

> import { stat, exists, readFile } from 'fs';

> 上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块编译，效率要比CommonJS模块的加载方式高。

#### 严格模式
ES6的模块__自动采用严格模式__，不管你有没有在模块头部加上`"use strict"`。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀`0`表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected、static`和`interface`）

上面这些限制，模块都必须遵守。

#### export命令
模块功能主要由两个命令构成：`export`和`import`。

**export命令用于规定模块的对外接口**

**import命令用于输入其他模块提供的功能**

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

下面是一个JS文件，里面使用`export`命令输出变量。
```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```
上面代码是profile.js文件，保存了用户信息。ES6将其视为一个模块，里面用export命令对外部输出了三个变量。

export的写法，除了像上面这样，还有另外一种。
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```
上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。

export命令除了输出变量，还可以**输出函数或类（class）**。
```js
export function multiply (x, y) {
  return x * y;
};
```
上面代码对外输出一个函数multiply。

通常情况下，**export输出的变量**就是本来的名字，但是可以使用`as`关键字重命名。
```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```
上面代码使用as关键字，重命名了函数v1和v2的对外接口。_重命名后，v2可以用不同的名字输出两次_。

最后，**export命令可以出现在模块的任何位置，只要处于模块顶层就可以。**如果处于块级作用域内，就会报错，下面的import命令也是如此。
```js
function foo () {
  export default 'bar' // SyntaxError
}
foo()
```
上面代码中，export语句放在函数之中，结果报错。

**export语句输出的值是动态绑定，绑定其所在的模块。**
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
上面代码输出变量foo，值为bar，500毫秒之后变成baz。

#### import命令
使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
```js
// main.js

import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```
上面代码的import命令，就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。**大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同**。

如果想为输入的变量重新取一个名字，import命令要使用`as`关键字，将输入的变量重命名。
```js
import { lastName as surname } from './profile';
```
ES6支持**多重加载，即所加载的模块中又加载其他模块**。
```js
import { Vehicle } from './Vehicle';

class Car extends Vehicle {
  move () {
    console.log(this.name + ' is spinning wheels...')
  }
}

export { Car }
```
上面的模块先加载`Vehicle`模块，然后在其基础上添加了`move`方法，再作为一个新模块输出。

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。
```js
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```
上面代码中，export和import语句可以结合在一起，写成一行。**但是从可读性考虑，不建议采用这种写法，而应该采用标准写法**。

*另外，ES7有一个提案，简化先输入后输出的写法，拿掉输出时的大括号。*
```js
// 提案的写法
export v from "mod";

// 现行的写法
export {v} from "mod";
```
`import`语句**会执行所加载的模块**，因此可以有下面的写法。
```js
import 'lodash'
```
上面代码仅仅执行lodash模块，但是不输入任何值。

#### 模块的整体加载
除了指定加载某个输出值，还**可以使用整体加载，即用星号（\*）指定一个对象，所有输出值都加载在这个对象上面。**

下面是一个circle.js文件，它输出两个方法area和circumference。
```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
现在，加载这个模块。
```js
// main.js

import { area, circumference } from './circle';

console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));
```
上面写法是逐一指定要加载的方法，整体加载的写法如下。
```js
import * as circle from './circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));
```
#### module命令
**module命令可以取代import语句，达到整体输入模块的作用。**
```js
// main.js

module circle from './circle';

console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));
```
`module`命令后面跟一个变量，表示输入的模块定义在该变量上。

#### export default命令
**export default命令，为模块指定默认输出。**
```js
// export-default.js
export default function () {
  console.log('foo');
}
```
上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。
```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。**需要注意的是，这时import命令后面，不使用大括号**。

`export default`命令用在非匿名函数前，也是可以的。
```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```
上面代码中，`foo`函数的函数名`foo`，在模块外部是无效的。加载的时候，视同匿名函数加载。

下面比较一下默认输出和正常输出。
```js
import crc32 from 'crc32';
// 对应的输出
export default function crc32(){}

import { crc32 } from 'crc32';
// 对应的输出
export function crc32(){};
```
上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export deault命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

_本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。_所以，下面的写法是有效的。
```
// modules.js
function add(x, y) {
  return x * y;
};
export {add as default};

// app.js
import { default as xxx } from 'modules';
```
有了export default命令，输入模块时就非常直观了，以输入jQuery模块为例。
```js
import $ from 'jquery';
```
__如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。__
```js
import customName, { otherMethod } from './export-default';
```
如果要输出默认的值，只需将值跟在export default之后即可。
```js
export default 42;
```
export default也可以用来输出类。
```js
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass'
let o = new MyClass();
```
#### 模块的继承
模块之间也可以继承。

**假设有一个circleplus模块，继承了circle模块。**
```js
// circleplus.js

export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```
上面代码中的“export *”，表示输出circle模块的所有属性和方法，export default命令定义模块的默认方法。

这时，也可以将circle的属性或方法，改名后再输出。
```js
// circleplus.js

export { area as circleArea } from 'circle';
```
上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。

加载上面模块的写法如下。
```js
// main.js

module math from "circleplus";
import exp from "circleplus";
console.log(exp(math.E));
```
上面代码中的"import exp"表示，将circleplus模块的默认方法加载为exp方法。

#### ES6模块的转码
浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。

##### ES6 module transpiler
[ES6 module transpiler](https://github.com/esnext/es6-module-transpiler)是square公司开源的一个转码器，可以将ES6模块转为CommonJS模块或AMD模块的写法，从而在浏览器中使用。

首先，安装这个转玛器。

> $ npm install -g es6-module-transpiler

然后，使用`compile-modules convert`命令，将ES6模块文件转码。

> $ compile-modules convert file1.js file2.js

o参数可以指定转码后的文件名。

> $ compile-modules convert -o out.js file1.js

##### SystemJS
另一种解决方法是使用[SystemJS](https://github.com/systemjs/systemjs)。它是一个垫片库（`polyfill`），`可以在浏览器内加载ES6模块、AMD模块和CommonJS模块`，将其转为ES5格式。它在后台调用的是Google的Traceur转码器。

使用时，先在网页内载入`system.js`文件。
```html
<script src="system.js"></script>
```
然后，使用System.import方法加载模块文件。
```html
<script>
  System.import('./app');
</script>
```
上面代码中的`./app`，指的是当前目录下的`app.js`文件。它可以是`ES6`模块文件，`System.import`会自动将其转码。

**需要注意的是，System.import使用异步加载，返回一个Promise对象，可以针对这个对象编程。下面是一个模块文件。**
```js
// app/es6-file.js:

export class q {
  constructor() {
    this.es6 = 'hello';
  }
}
```
然后，在网页内加载这个模块文件。
```html
<script>

System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>
```
上面代码中，`System.import`方法返回的是一个`Promise`对象，所以可以用`then`方法指定回调函数。
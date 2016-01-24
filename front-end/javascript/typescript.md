TypeScript 学习笔记
===
### TypeScript 简介
TypeScript 是 Javascript 的超集, 语法糖角度引入了面向对象和强类型以及模块系统

### 强类型
`boolean number string array enum any void any`
- 变量 `var a:boolean = false;`
- 数组 `var arr:Array = [1,3,4,'a','b']; var list:number[]=[1,3,2,31,33,2,2]`
- 函数 function fun_name(a:number,b:string,...):void{}
- 匿名函数 function (a:number,b:string,...){}
- 函数可选参数与默认参数 function fun_name(b:string="sth",a?:number){}

### OO
#### 类 class new . 
```javascript
class Student{
  name:string;  //定义类的属性
  static count=10;
  constructor(myname:string){ //定义构造函数
      this.name=myname;
  }
  fun(){ //定义了一个无返回值的方法
    //定义该方法所要实现的功能
  }
  say():string{ //定义返回值类型为string的方法
    //定义该方法所要实现的功能
    return "返回值"; // 用return关键字返回函数值
  }
}
```
#### 继承 extends super() super.基类方法()
#### 接口 interface
```javascript
interface SquareConfig { //定义了两个可选属性
  color?: string;  
  width?: number;
}
interface SearchFunc {  
  (source: string, subString: string): boolean; //定义一个匿名方法
}
interface StringArray { //定义数组接口
  [index: number]: string;  //每个数组元素的类型
}
// class需要用implements来实现
interface IPrint{
  print();
}
class A implements IPrint  { //实现接口
  print(){  //实现接口中的方法
      document.write("实现接口");
  }
}
// 接口继承, 如果继承的接口中，定义的同名属性的类型不同的话，是不能编译通过的。
interface Shape {
    color: string;
}
 
interface PenStroke {
    penWidth: number;
}
 
interface Square extends Shape, PenStroke {
    sideLength: number;
}

```

### 模块化
**Validation.ts**
```javascript
module Validation {
  export interface StringValidator {
      isAcceptable(s: string): boolean;
  }
}
```
**LettersOnlyValidator.ts**
```javascript
/// <reference path="Validation.ts"></reference>
module Validation {
  var lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
      isAcceptable(s: string) {
        return lettersRegexp.test(s);
      }
  }
}
```
**ZipCodeValidator.ts**
```javascript
/// <reference path="Validation.ts"></reference>
module Validation {
  var numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
```
**Test.ts**
```javascript
/// <reference path="Validation.ts"></reference>
/// <reference path="LettersOnlyValidator.ts"></reference>
/// <reference path="ZipCodeValidator.ts"></reference>
 
var strings = ['Hello', '98052', '101'];
var validators: { [s: string]: Validation.StringValidator; } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();
for(var i=0;i<strings.length;i++){
  for (var name in validators) {
     document.write('"' + strings[i] + '" ' + (validators[name].isAcceptable(strings[i]) ? ' matches ' : ' does not match ') + name+"<br>"); //调用类的方法
    }
}
```
**在引用编译生成的 JavaScript 文件时，我们需要注意顺序。**
```html
<script src="Validation.js" type="text/javascript"></script>
<script src="LettersOnlyValidator.js" type="text/javascript"></script>
<script src="ZipCodeValidator.js" type="text/javascript"></script>
<script src="Test.js" type="text/javascript"></script>
```

Python 基础
===
**String**
append,extend,insert
isinstance() len() print()

## 概述
### 安装Python，使用 PyCharm
### 声明函数
```python
def approximate_size(size, a_kilobyte_is_1024_bytes=True):
if __name__ == '__main__':
    print(approximate_size(1000000000000, False))
    print(approximate_size(1000000000000))  
```

### 文档注释
```python
''' 
aaa
'''
```
### import 的搜索路径(它会搜寻在 sys.path 里面定义的所有目录)
### 一切都是对象
所有函数都有一个内置的属性 __doc__，用来返回这个函数的源代码里面定义的文档字符串（docstring）。
内置__name__返回模块名，sys 模块是一个对象，它有（除了别的以外）一个名叫 path 的属性，等等。
### 代码缩进来控制语句
### 异常处理
`try...except` 块来处理异常，使用 raise 语句来抛出异常
```python
if size <0:
  raiseValueError('number must be non-negative')
try:
  from lxml import etree
except ImportError:
  import xml.etree.ElementTree as etree
```
### 引用变量必须赋值之后使用
### 区分大小写

## 数据类型
- Booleans［布尔型］ 或为 True［真］ 或为 False［假］。 //当作数值看 True=1,False=0
- Numbers［数值型］ 可以是 Integers［整数］（1 和 2）、Floats［浮点数］（1.1 和 1.2）、Fractions［分数］（1/2 和 2/3）；甚至是 Complex Number［复数］。 
- Strings［字符串型］ 是 Unicode 字符序列，例如： 一份 html 文档。 字符串切片
'< %s : %s >' % (name, score)
- Bytes［字节］ 和 Byte Arrays［字节数组］， 例如: 一份 jpeg 图像文件。 
- Lists［列表］ 是值的有序序列。 
  - L = ['Adam', 'Lisa', 'Bart']
  - L.insert(0, 'Paul')  L.append('Paul')  L.pop()删除最后一个元素 L.remove('Paul') del L[index]
  - L.strip(rm) 删除 s 字符串中开头、结尾处的 rm 序列的字符。 当rm为空时，默认删除空白符（包括'\n', '\r', '\t', ' ')
- 切片 [:]
- Tuples［元组］ 是有序而不可变的值序列(指向不变)。 
('Adam',)
- Sets［集合］ 是装满无序值的包裹,，不能重复。 

set的内部结构和dict很像，唯一区别是不存储value
创建 set 的方式是调用 set() 并传入一个 list，list的元素将作为set的元素：
>>> s = set(['A', 'B', 'C']) 用in关键字判断元素是否在set里
s.add('a'),  s.remove('a')#需判断'a'是否存在
- Dictionaries［字典］ 是键值对的无序包裹。key不能重复,不可变
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
d[key], d.get('keyname')不存在返回None 
d.values(), itervalues(), d.items(), d.iteritems(), d.keys(), d.iterkeys()
遍历dict for key in d: print key

- None 空值

### 常用语句
print语句：也可以跟上多个字符串，用逗号“,”隔开，就可以连成一串输出，print会依次打印每个字符串，遇到逗号“,”会输出一个空格
注释：单行 # 多行'''
变量：等号=是赋值语句，可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量
字符串：\转义：\n换行 \t制表符 \\表示\ r'...'表示这是一个raw字符串，里面的字符就不需要转义了 u'...'表示这是一个Unicode字符串  # -*- coding: UTF-8 -*- 
布尔类型：布尔类型还可以与其他数据类型做 and、or和not运算（短路运算）True and 'a=T' 计算结果是 'a=T' ，计算 'a=T' or 'a=F' 计算结果还是 'a=T'
条件语句: if , if else ,if elif else
循环语句: for name in L: , while x<N:, break ,continue
迭代：Python 的 for循环不仅可以用在list或tuple上，还可以作用在其他任何可迭代对象上，迭代永远是取出元素本身，而非元素的索引。确实想在 for 循环中拿到索引，使用 enumerate() 函数：
>>> L = ['Adam', 'Lisa', 'Bart', 'Paul']
>>> for index, name in enumerate(L):
...     print index, '-', name
            集合是指包含一组元素的数据结构，我们已经介绍的包括：
                1. 有序集合：list，tuple，str和unicode；
                2. 无序集合：set
                3. 无序集合并且具有 key-value 对：dict
生成列表: [x * x for x in range(1, 11) if x%2==0] , [m + n for m in 'ABC' for n in '123'] 相当于嵌套循环

### 函数：
help(abs)
绝对值函数 abs(num)
比较函数 cmp(x, y) 
int() str()
len()
math.sqrt() 函数用于计算平方根
range(1, ?) 可以创建出起始为 1 的数列。
upper(), lower() 
isinstance(x, 类型) 可以判断变量 x 是否是该类型
sorted(list)
递归函数 使用递归函数需要注意防止栈溢出。
默认参数：由于函数的参数按从左到右的顺序匹配，所以默认参数只能定义在必需参数的后面
定义可变参数 def fn(*args):     print args
zip()函数可以把两个 list 变成一个 list  >>> zip([10, 20, 30], ['A', 'B', 'C'])
            [(10, 'A'), (20, 'B'), (30, 'C')]

## 函数式编程 functional
把计算视为函数而非指令
纯函数式编程：不需要变量，没有副作用，测试简单
支持高阶函数，代码简洁
python支持的函数式编程
不是纯函数式编程：允许有变量
支持高阶函数：函数也可以作为变量传入
支持闭包：有了闭包就能返回函数
有限度的支持匿名函数

### 高阶函数
变量可以指向函数
函数的参数可以接收变量
一个函数可以接收另一个函数
能接收函数作参数的函数就是高阶函数
作为参数函数名是指向函数的变量
```python
def add(x, y, f):
    return f(x) + f(y)
add(-5, 9, abs)
```

map()函数 map()是 Python 内置的高阶函数，它接收一个函数 f 和一个 list，并通过把函数 f 依次作用在 list 的每个元素上，得到一个新的 list 并返回。map(???, ['adam', 'LISA', 'barT'])
```python
def f(x):
    return x*x
print map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])
```

### reduce()函数
也是Python内置的一个高阶函数。reduce()函数接收的参数和 map()类似，一个函数 f，一个list，但行为和 map()不同，reduce()传入的函数 f 必须接收两个参数，reduce()对list的每个元素反复调用函数f，并返回最终结果值。reduce()还可以接收第3个可选参数，作为计算的初始值。
```python
def f(x, y):
    return x + y
reduce(f, [1, 3, 5, 7, 9], 100)
```

### filter()函数
是 Python 内置的另一个有用的高阶函数，filter()函数接收一个函数 f 和一个list，这个函数 f 的作用是对每个元素进行判断，返回 True或 False，filter()根据判断结果自动过滤掉不符合条件的元素，返回由符合条件元素组成的新list。
```python
def is_odd(x): 
    return x % 2 == 1
filter(is_odd, [1, 4, 6, 7, 9, 12, 17])
sorted()
```

也是一个高阶函数，它可以接收一个比较函数来实现自定义排序，比较函数的定义是，传入两个待比较的元素 x, y，如果 x 应该排在 y 的前面，返回 -1，如果 x 应该排在 y 的后面，返回 1。如果 x 和 y 相等，返回 0。
```python
def reversed_cmp(x, y): 
    if x > y:
        return -1
    if x < y:
        return 1
    return 0
>>> sorted([36, 5, 12, 9, 21], reversed_cmp)

def cmp_ignore_case(s1, s2):
    return cmp(s1.lower(),s2.lower())
print sorted(['bob', 'about', 'Zoo', 'Credit'], cmp_ignore_case)
返回函数：
def f():
    print 'call f()...'
    # 定义函数g:
    def g():
        print 'call g()...'
    # 返回函数g:
    return g
```

### 闭包：像这种内层函数引用了外层函数的变量（参数也算变量），然后返回内层函数的情况，称为闭包（Closure）。
闭包的特点是返回的函数还引用了外层函数的局部变量，所以，要正确使用闭包，就要确保引用的局部变量在函数返回后不能变。
```python
def count():
    fs = []
    for i in range(1, 4):
        def f(j):
            def g():
                return j*j
            return g
        r = f(i)
        fs.append(r)
    return fs
f1, f2, f3 = count()
print f1(), f2(), f3()

def count():
    fs = []
    for i in range(1, 4):
        def f(i):
            return lambda : i*i
        fs.append(f(i))
    return fs
f1, f2, f3 = count()
print f1(), f2(), f3()
```

### 匿名函数:匿名函数有个限制，就是只能有一个表达式，不写return，返回值就是该表达式的结果。
`lambda x: -x if x < 0 else x` 

### 装饰器 decoration:
作用：
可以极大的简化代码，避免每个函数编写重复性代码
打印日志:@log
检测性能:@performance
数据库事务:@transaction
URL路由:@post('/register')
属性 @property 
无参数的装饰器
```python
import time
def performance(f):
    def fn(*args, **kw):
        t1 = time.time()
        r = f(*args, **kw)
        t2 = time.time()
        print 'call %s() in %fs' % (f.__name__, (t2 - t1))
        return r
    return fn
@performance
def factorial(n):
    return reduce(lambda x,y: x*y, range(1, n+1))
print factorial(10)
```
有参数的装饰器
```python
import time
def performance(unit):
    def perf_decorator(f):
        @functools.wraps(f) #Python内置的functools可以用来自动化完成属性“复制”
        def wrapper(*args, **kw):
            t1 = time.time()
            r = f(*args, **kw)
            t2 = time.time()
            t = (t2 - t1) * 1000 if unit=='ms' else (t2 - t1)
            print 'call %s() in %f %s' % (f.__name__, t, unit)
            return r
        return wrapper
    return perf_decorator
@performance('ms')
def factorial(n):
    return reduce(lambda x,y: x*y, range(1, n+1))
print factorial(10)
```

偏函数 functools.partial
functools.partial可以把一个参数多的函数变成一个参数少的新函数，少的参数需要在创建时指定默认值，这样，新函数调用的难度就降低了。
import functools
sorted_ignore_case = functools.partial(sorted, cmp=lambda s1, s2: cmp(s1.upper(), s2.upper())) 
print sorted_ignore_case(['bob', 'about', 'Zoo', 'Credit'])

## 模块和包
每层的每一个包下都应有_init_.py 文件
os.path模块可以以若干种方式导入：
```python
import os
import os.path
from os import path
from os.path import isdir, isfile
利用import ... as ...，还可以动态导入不同名称的模块。
try:
    import json
except ImportError:
    import simplejson as json
print json.dumps({'python':2.7})
```
“试用”某一新的特性，就可以通过导入__future__模块的某些功能来实现
在Python 3.x中，字符串统一为unicode，不需要加前缀 u，而以字节存储的str则必须加前缀 b。请利用__future__的unicode_literals在Python 2.7中编写unicode字符串。
from __future__ import unicode_literals
s = 'am I an unicode?'
print isinstance(s, unicode)
pip 安装第三方模块 pip install web.py #安装第三方模块 import web #导入第三方模块

## 面向对象编程
定义类，并创建实例，创建实例属性，初始化实例属性，访问限制(__aaa)，创建类属性（当实例属性和类属性重名时，实例属性优先级高，它将屏蔽掉对类属性的访问）
```python
class Person(object):
    count = 0
    def __init__(self, name, gender, birth, **kw):
        Person.count = Person.count + 1
        self.name = name
        self.gender = gender
        self.birth = birth
        for k, v in kw.iteritems():
            setattr(self, k, v)
xiaoming = Person('Xiao Ming', 'Male', '1990-1-1', job='Student')
print xiaoming.name
print xiaoming.job
print Person.count
```
定义实例方法：是在类中定义的函数，它的第一个参数永远是 self，指向调用该方法的实例本身，其他参数和一个普通函数是完全一样的，调用实例方法必须在实例上调用：
```python
class Person(object): 
    def __init__(self, name, score): 
        self.__name = name
        self.__score = score
    def get_grade(self): 
        if self.__score >= 80:
            return 'A'
        if self.__score >= 60:
            return 'B'
        return 'C'
p1 = Person('Bob', 90) 
p2 = Person('Alice', 65)
p3 = Person('Tim', 48)
print p1.get_grade() 
print p2.get_grade()
print p3.get_grade()
```
方法也是一个属性，所以，它也可以动态地添加到实例上，只是需要用 types.MethodType() 把一个函数变为一个方法：
```python
import types
def fn_get_grade(self):
    if self.score >= 80:
        return 'A'
    if self.score >= 60:
        return 'B'
    return 'C'
class Person(object): 
    def __init__(self, name, score):
        self.name = name
        self.score = score
p1 = Person('Bob', 90) 
p1.get_grade = types.MethodType(fn_get_grade, p1, Person)
print p1.get_grade()
# => A
p2 = Person('Alice', 65)
print p2.get_grade()
# ERROR: AttributeError: 'Person' object has no attribute 'get_grade'
# 因为p2实例并没有绑定get_grade
```
定义类方法
通过标记一个 `@classmethod`，该方法将绑定到 Person 类上，而非类的实例。类方法的第一个参数将传入类本身，通常将参数名命名为 cls，因为是在类上调用，而非实例上调用，因此类方法无法获得任何实例变量，只能获得类的引用。
```python
class Person(object):
    __count = 0 
    @classmethod 
    def how_many(cls):
        return cls.__count
    def __init__(self, name):
        self.name = name
        Person.__count += 1
print Person.how_many() 
p1 = Person('Bob') 
print Person.how_many()
```
类的继承
总是从某个类继承，不要忘记调用`super(SupClass,self).__init__(args)`方法
```python
class Person(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
class Teacher(Person):
    def __init__(self, name, gender, course):
        super(Teacher, self).__init__(name, gender)
        self.course = course
t = Teacher('Alice', 'Female', 'English') 
print t.name
print t.course
```
获取对象信息：isinstance(x, 类型) 可以判断x 是否是该类型，dir() 函数获取变量的所有属性，type() 函数获取变量的类型，它返回一个 Type 对象
传入**kw 即可传入任意数量的参数，并通过 setattr() 绑定属性。
```python
class Person(object): 
    def __init__(self, name, gender, **kw):
        self.name = name
        self.gender = gender
        for k, v in kw.iteritems():
            setattr(self, k, v)
p = Person('Bob', 'Male', age=18, course='Python') 
print p.age
print p.course
```
多态：动态语言调用实例方法，不检查类型，只要方法存在，参数正确，就可以调用。
多重继承
```python
class Person(object):
    pass
class Student(Person):
    pass
class Teacher(Person):
    pass
class SkillMixin(object): 
    pass
class BasketballMixin(SkillMixin): 
    def skill(self):
        return 'basketball'
class FootballMixin(SkillMixin): 
    def skill(self):
        return 'football'
class BStudent(Student, BasketballMixin): 
    pass
class FTeacher(Teacher, FootballMixin): 
    pass
s = BStudent() 
print s.skill()
t = FTeacher() 
print t.skill()
```

## 特殊方法
定义在class中，不需要直接调用，python内置的函数或操作符会调用特殊方法，只需要编写用到的特殊方法，有关联性的特殊方法必须都要都要实现
用于print的`__str__`
用于len的`__len__`
用于cmp的`__cmp__`
属性设置`__getattr__` `__setattr__` `__delattr__`
`__str__`和`__repr__`
```python
class Person(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
    def __str__(self):
        return '(Person: %s, %s)' % (self.name, self.gender)
    __repr__ = __str__
```
**`__cmp__`**
如果对一组 Student 类的实例排序时，就必须提供我们自己的特殊方法 `__cmp__()`
```python
class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def __str__(self): 
        return '<%s: %s>' % (self.name, self.score)
    __repr__ = __str__ 
    def __cmp__(self, s): 
        if self.score == s.score:
            return cmp(self.name, s.name)
        return -cmp(self.score, s.score)
L = [Student('Tim', 99), Student('Bob', 88), Student('Alice', 99)]
print sorted(L)
```
**`__len__`**
```python
class Fib(object):
    def __init__(self, num):
        a, b, L = 0, 1, []
        for n in range(num):
            L.append(a)
            a, b = b, a + b
        self.numbers = L
    def __str__(self): 
        return str(self.numbers)
    __repr__ = __str__ 
    def __len__(self): 
        return len(self.numbers)
f = Fib(10) 
print f
print len(f)
```
**数学运算（有理数）**
如果运算结果是 6/8，在显示的时候需要归约到最简形式3/4。
```python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

class Rational(object):
    def __init__(self, p, q):
        self.p = p
        self.q = q
    def __add__(self, r):
        return Rational(self.p * r.q + self.q * r.p, self.q * r.q)
    def __sub__(self, r):
        return Rational(self.p * r.q - self.q * r.p, self.q * r.q)
    def __mul__(self, r):
        return Rational(self.p * r.p, self.q * r.q)
    def __div__(self, r):
        return Rational(self.p * r.q, self.q * r.p)
    def __str__(self):
        g = gcd(self.p, self.q)
        return '%s/%s' % (self.p / g, self.q / g)
    __repr__ = __str__
r1 = Rational(1, 2)
r2 = Rational(1, 4)
print r1 + r2
print r1 - r2
print r1 * r2
print r1 / r2
```
**类型转换** `__int__`  `__float__`:
```python
class Rational(object):
    def __init__(self, p, q):
        self.p = p
        self.q = q
    def __int__(self): 
        return self.p // self.q
    def __float__(self): 
        return float(self.p) / self.q
print float(Rational(7, 2)) 
print float(Rational(1, 3))
```

属性装饰@property 相当于getattr
```python
class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.__score = score
    @property
    def score(self):
        return self.__score
    @score.setter
    def score(self, score):
        if score < 0 or score > 100:
            raise ValueError('invalid score')
        self.__score = score
    @property
    def grade(self):
        if self.score < 60:
            return 'C'
        if self.score < 80:
            return 'B'
        return 'A'
s = Student('Bob', 59)
print s.grade
s.score = 60
print s.grade
s.score = 99
print s.grade
```

`__slots__`:  是指一个类允许的属性列表,目的是限制当前类所能拥有的属性，如果不需要添加任意动态的属性，使用__slots__也能节省内存。
```python
class Person(object):
    __slots__ = ('name', 'gender')
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
class Student(Person): 
    __slots__ = ('score',)
    def __init__(self, name, gender, score):
        super(Student, self).__init__(name, gender)
        self.score = score
s = Student('Bob', 'male', 59) 
s.name = 'Tim'
s.score = 99
print s.score
```
`__call__`：所有的函数都是可调用对象。 一个类实例也可以变成一个可调用对象，只需要实现一个特殊方法`__call__()`。
```python
class Person(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
    def __call__(self, friend): 
        print 'My name is %s...' % self.name
        print 'My friend is %s...' % friend
#现在可以对 Person 实例直接调用：
>>> p = Person('Bob', 'male')
>>> p('Tim')
My name is Bob...
My friend is Tim...
```
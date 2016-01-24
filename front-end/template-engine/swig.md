swig 模板引擎
===
Swig 优点: 代码清楚, 逻辑控制方便, 功能强大
Swig 缺点: 需要上手时间, 很多过滤器要手写自定义, 不能写在页面渲染端, 不是特别方便

### swig init
```javascript
swig.init({
  allowErrors: false, //编译错误直接输出到Node.js(true)/模板(false) 
  autoescape: true, //是否转义
  cache: true, //模板是否缓存
  encoding: 'utf8',
  filters: {},
  root: '/',// 需要搜索模板的目录
  tags: {},
  extensions: {},//第三方库
  tzOffset: 0//时区偏移
});
```

### 变量
`{{ foo.bar }}` `{{ foo[bar] }}` `{{ foo | filter | filter... }}`

设置变量:`{% set foo={bar: "baz"} %}`

### 空白
```javascript
{% for item in seq -%}
    {{ item }}
{%- endfor %}
```

### 逻辑
{% for item in items %}
{% for key, value in maps %}
{% if else %}
{% if elseif else %}

**特殊循环变量** 
- loop.index：当前循环的索引（1开始） 
- loop.index0：当前循环的索引（0开始） 
- loop.revindex：当前循环从结尾开始的索引（1开始） 
- loop.revindex0：当前循环从结尾开始的索引（0开始） 
- loop.key：如果迭代是对象，是当前循环的键，否则同 loop.index 
- loop.first：如果是第一个值返回 true 
- loop.last：如果是最后一个值返回 true 
- loop.cycle：一个帮助函数，以指定的参数作为周期

### 模板继承
- `extends` 使当前模板继承父模板，必须在文件最前
- `block` 定义一个块，使之可以被继承的模板重写，或者重写父模板的同名块
- `parent` 将父模板中同名块注入当前块中
- `include` 包含一个模板到当前位置，这个模板将使用当前上下文
- `marcro` 自定义可复用代码段
- `import` 允许引入另一个模板的宏进入当前上下文

### 过滤器
#### 内置过滤器
- add(value) 使变量与value相加，可以转换为数值字符串会自动转换为数值。
- addslashes 用 \ 转义字符串
- capitalize 大写首字母
- date(format[, tzOffset]) 转换日期为指定格式
  - format： 格式 
  - tzOffset： 时区
- default(value) 默认值（如果变量为undefined，null，false）
- escape([type]) e 同escape 转义字符
  - 默认： &, <, >, ", ' 
  - js: &, <, >, ", ', =, -, ;
- first 返回数组第一个值
- join(glue) 同[].join
- json_encode([indent]) 类似JSON.stringify, indent为缩进空格数
- last 返回数组最后一个值
- length 返回变量的length，如果是object，返回key的数量
- lower 同''.toLowerCase()
- raw 指定输入不会被转义 同 safe
- replace(search, replace[, flags]) 同''.replace
- reverse 翻转数组
- striptags 去除html/xml标签
- title 大写首字母
- uniq 数组去重
- upper 同''.toUpperCase
- url_encode 同encodeURIComponent
- url_decode 同decodeURIComponemt

#### 自定义过滤器
函数返回字符串即可

### 特殊标签
- `spaceless`移除html标签间的空格
- `autoescape`改变标签内自动转义行为

### 参考
- [Swig 官方文档](http://paularmstrong.github.io/swig/docs/)
- [Swig 使用指南](http://www.cnblogs.com/elementstorm/p/3142644.html)
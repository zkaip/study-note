PHP基础
===

- 开发环境：xampp + phpStorm(F2帮助文档)
- 部署：BAE SAE
- 版本工具：git svn
- 帮助手册：http://php.net/manual/zh/

```php
echo 'Hello world'
print_r($result) //打印数组
@开头，忽略警告输出

include *.php //提示警告（包含）include_once
require *.php //提示错误（依赖）require_once(只引入一次）
intval() 转成整形
header('Location:a.php');//跳转
```

## PHP基础
### 语法
变量 $a 
常量 const THE_VALUE/define('THE_VALUE',200)（不能重复赋值）
if...elseif...else   
switch...case for(; ;){} 
while(){}   do{...}while()  
break continue
|| && == !=

### 字符串(单引号或双引号)
$str='Hello PHP';
. 连接字符串 或 "$str<br>$str2<br>"
strpos($str,'PH') //获取字符所在字符串位置
substr($str,2,3) //截取字符串从2开始截取3个
str_split($str,2) //按长度为2分割$str
explode(' ',$str) //按字符串' '分隔$str

### 数组
```php
$arr=array();
for($i=0;$i<10;$i++){
    array_push($arr,'Array '.$i);
}
$arr1=array(0=>'Hi',1=>'nihao','h'=>'Hello')；
```

### 面向对象
$h=new Hello();
$h->sayHello();
namespace jkxy;  //命名空间
__construct() //构造方法
类方法::调用 Man::sayHello();
继承 extends
重写
parent::父类的方法; 

### 库函数
#### 时间
- time();//返回毫秒数 
- date($format, [$timestamp]);
- date_default_timezone...设定时区

#### JSON
- json.encode($arr); //编码成json
- $obj= json.decode(json数据) //解码成obj
- $obj->h; //调用json数据`<key>`

#### File
```php
    $f = @fopen('data','w');
                fwrite($f,'Hello PHP'); 
                fclose($f);
    fread=@fopen('data','r'); 
    while(!feof($fread)){
        echo fgets($fread);
    }
    file_get_contents('data')
```

#### 图片：GD http://php.net/manual/zh/book.image.php
图片签名
> $img = imagecreatefromjpeg('msn.jpg');
> imagestring($img,2,10,5,'keke',imagecolorallocate($img,255,255,255));
> header('Content-type:image/jpeg');
> imagejpeg($img);

### 前端：
注意判断参数合法性 
isset($_GET['a'])  empty($_POST)
GET $_GET
POST $_POST
图片上传与接收 enctype="multipart/form-data" echo "<img src="" />"

### 会话管理：
Cookie setcookie('name','jkxy')  $_COOKIE['name']
Session session_start();$_SESSION['name']='jkxy';session_destory();
Cookie被禁用，可以网址传入参数，使用$_GET['name']获取参数

### MySQL
```php
define('MYSQL_HOST','localhost:3306')
define('MYSQL_USER','root')
define('MySQL_PWD','')

$conn=mysql_connect(MYSQL_HOST,MYSQL_USR,MYSQL_PWD);
mysql_select_db('test',$conn);
$result=mysql_query(sql语句,$conn);
$rownum=mysql_row_num($result);//用于循环读取选择选择集条数
if(mysql_errno){
    echo mysql_error();
    die('mysql db wrong');    
}else{
    header('Location:a.php');
}
```

**防止注入攻击 字符串用引号引起来，确定类型用转换函数把值转成该类型**

### PHP框架
提供了一个用以构建web应用的基本代码框架及基础类库。

**作用：**
1、做好了代码组织结构部署
2、提供了简明的成熟稳定的基础类库，比如分页，数据库类，日志类，图片处理等。
3、更加安全
4、整体性能更加高效
5、节约了开发时间，减少了重复代码的编写
6、为系统的稳定性打下了良好基础

**原理：**
URL请求->入口文件->路由->不同的控制器->不同的模型和不同的视图

**PHP主流框架** 国内使用较多的是`Yii框架`和`CakePHP`

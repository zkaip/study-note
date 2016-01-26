Java基础
===
Linux与Windows区别: 
  1)文件系统不同:
      Windows是盘符的，Linux是目录的
  2)外部设备映射不同:
      Windows是盘符，Linux是挂载点(目录)
  3)安全级别不同:
      Windows安全级别低
      Linux安全级别高，因为其为服务器端系统
           /home/soft01(家)--具有最高权限

绝对路径: 相对于根的路径
            /home/soft01----根目录下home下soft01
  相对路径: 相对于当前路径的路径
            wkj/me----当前目录下wkj下me
     
java编译运行过程:
    java源文件(.java)，经过编译(javac)，
    编译为java字节码文件(.class)，(java)
    JVM来加载.class并运行.class文件
不同系统有不同的JVM，但对.class是一样的
  java可以实现跨平台  一次编程到处运行

JDK:java开发工具包
  JRE:java运行环境
  JVM:java虚拟机

  JRE=JVM+java系统类库----运行的最小环境
  JDK=JRE+编译、运行等开发工具---开发的最小环境

IDE:集成开发环境，eclipse是最主流的IDE
  eclipse为IBM公司的，开源的   eclipse是基于插件的(自动去找JRE)   绿色版(只需解压，不需安装即可)

java_home:指向jdk目录
          java_home=/usr/local/jdk
path:指向jdk下的bin目录(bin下javac,java...命令)
          path=/usr/local/jdk/bin
classpath:指向.(当前路径)
          classpath=.

path=目录1;目录2;目录3
javac 编译命令

生成帮助文档：
    文档注释，可以使用JDK的javadoc工具从原文件中抽取这种注释形成程序的帮助文档。
    使用javadoc命令建立HTML格式的程序文档:
     javadoc[options][packagenames][sourcefiles][@files]

生成jar包：
    在eclipse里，选中要打包的几个文件，右键-Export-写文件名-Next-Next-选main方法的class-finish
    在jar包的同一文件夹下，新建一个空文档，写“java -jar ./文件名.jar”，再把这文档改成“文件名.sh”
    把这sh的属性－权限 改成“允许以程序执行文件”。以后双击这个sh即可运行

垃圾回收：
    java.lang.System.gc(); / java.lang.Runtime.gc();
    垃圾回收的建议语句,只能建议而不能强制回收
    注意： System.gc(); 是静态方法，可直接调用。
          java.lang.Runtime.gc(); 不是静态方法，不能直接在main方法里调用

C文件，编译，直接编译为可执行文件(0,1)
JAVA文件，编译，字节码文件，
          JVM运行字节码文件，计算机识别(0,1)

c语言----直接编译为0,1(要么适应Windows 要么适应Linux)
1.变量是一个代词，指代内存中的数据
  变量是可以改变的量---指代不同的数据

2.变量必须先声明，再使用
    语法: 数据类型 变量名;
          int a;
  可以一条语句声明多个同类型变量
    eg: int a,b,c;
        int a=1,b,c=2;

3.变量的命名:
    规定:
      1)只能包含字母、数字、_、$，
        并且不能以数字开头
      2)严格区分大小写
      3)不能使用关键字(java已经用了的字)
    建议:
      1)不建议中文命名变量
      2)最好"见名知意"
      3)驼峰命名法:第一个单词首字母小写，其余单词首字母大写
     
4.变量的初始化:
    java语法规定:变量在使用前必须初始化
    初始化两种方式:
      1)声明同时初始化
          int a=5;
      2)先声明再初始化
          int b;  b=8;

5.变量的使用:
    1)必须与数据类型匹配
      eg: int a=2.5; //错误，类型不匹配

6.int:
   1)整型，占4个字节，范围-21个多亿到21个多亿
   2)整数直接量(25,250,2500...)，默认为int类型
   3)两个整数相除，结果为整数
     (无条件舍去小数位)
  long:
   1)长整型，占8个字节，范围特别大(足够用)
   2)long型直接量，在数字后面加l或L
      eg: long a = 35L;

财务系统ERP----数字敏感----不可以使用double型
BigDecimal----精确表示任何小数

char字符型:
两部分组成: 字符+码
char c='A'; //字符
char c=65; //字符所对应的码
char c='\''; //转义字符

java规定两点规则:
1.整数直接量可以直接赋值给byte,char,short
2.byte,char,short只要参与运算，则一律转为int

int型变量只占4字节

驼峰命名法:
name,teacherName,englishTeacherName

&&:两边都为真，则为真
||:有一边为真，都为真
!:非真则假，非假则真


接收用户输入:
import java.util.Scanner; //1
Scanner scan = new Scanner(System.in); //2

int age=scan.nextInt(); //3
boolean b1 = age>=18 && age<=50;
System.out.println(b1); //true


闰年条件:
1.能被4整除但是不能被100整除
或者
2.能被400整除

总结:
1.运算符
    算术
    关系
    逻辑
    赋值:建议使用扩展赋值
         a+=5; 相当于a=a+5
    +
    三目: 语法: boolean ? 1 : 2
          运算过程:
     计算boolean
     为true，则整个为1
     为false，则整个为2
2.分支结构
    if:1条路
    if...else:2条路
    if...else if:多条路
    switch...case:多条路(JDK7.0之后支持String)
                  常常和break配合使用
    break:跳出switch
    优点:清晰、效率高
    缺点:整型、只能判断相等
         ---灵活性稍差

3.循环:反复做一件相同或相似的事
循环三要素:
1.循环变量初始化
2.循环条件(以循环变量为条件)
3.循环变量的改变(向着循环结束变)
循环变量:在循环过程中改变的那个量
第一要素和第三要素一样时-------do...while更好

while和do...while的区别:

break:
continue:应用率低，常常可以用if...else代替

Math.random()
-------生成0到1之间的(包含0，不包含1)
-------[0,1)

嵌套循环执行过程:
  外层循环走一次，内层循环走所有次
建议:
  循环层数越少越好
break:
  只能跳出一层循环


1.数组可以装一组数，必须类型相同
2.数组按线性顺序，一个跟一个
3.数组也是一种数据类型
4.数组new之后，数组中的每个元素都有一个默认值
    整数:0 浮点数:0.0 boolean:false


1)数组的定义:
    int[] arr = new int[4]; //每个数都是0
2)数组的初始化
    int[] arr; //声明数组
    arr = new int[4]; //初始化
    int[] arr = {1,5,8,3}; //只能声明同时初始化
    int[] arr = new int[]{1,5,8,3};

    int[] arr;
    arr = {1,5,8,3}; //错误
3)数组的访问:通过下标
    下标从0开始
    int[] arr = new int[4];
    System.out.println(arr.length);//数组的长度4
    arr[0] = 55;//给arr中的第1个数赋值为55
    arr[4] = 99; //错误，数组越界，最大到3
    System.out.println(arr[2]);//输出第3个数

    //遍历数组
    int[] arr = {1,8,5,3};
    for(int i=0;i<arr.length;i++){ //正序
       System.out.println(arr[i]);
    }
    for(int i=arr.length-1;i>=0;i--){ //倒序
       System.out.println(arr[i]);
    }

  能用一层循环就不用两层
  能用两层循环就不用三层
  后期写个程序需要4层循环-----设计有问题
break:只能跳出1层循环


小结:
1.嵌套循环
2.数组
  1)定义
      数据类型[] 数组名 = new 数据类型[长度];
      int[] arr = new int[5];
  2)初始化
      int[] arr = new int[3]; //默认值为0
      int[] arr = {2,4,7};
      int[] arr = new int[]{2,4,7};
  3)访问:通过下标/索引
      int len = arr.length; //长度
      int num = arr[0]; //取第1个元素
      int num = arr[arr.length-1];//取最后1个元素
      arr[0] = 88; //赋值
      System.out.println(arr[0]); //取值
  4)复制
      //从a的第1个元素开始
      //复制到a1中，从第3个元素开始
      //一共复制4个元素
      System.arraycopy(a,0,a1,2,4);
      //将a数组复制到b数组，b有6个元素
      int[] b = Arrays.copyOf(a,6);
      //给a数组扩容
      a = Arrays.copyOf(a,a.length+1);
  5)排序
      Arrays.sort(arr); //升序
      
      最大值算法:
1.假设数组中第1个元素为最大值
  int max = arr[0]; //max装最大值
2.循环遍历数组中剩余的元素
  for(int i=1;i<arr.length;i++){
     3.将数组元素与max比大小，
       若数组元素大于max，将max设置为数组元素
     if(arr[i]>max){
        max = arr[i];
     }
  }
 
      冒泡排序
for(int i=0;i<arr.length-1;i++){ //控制轮
   for(int j=0;j<arr.length-1-i;j++){//控制比几次
      if(arr[j]>arr[j+1]){
         int t = arr[j];
  arr[j] = arr[j+1];
  arr[j+1] = t;
      }
   }
}



//调用方法----调java定义好的


方法没有返回值
System.out.println("HelloWorld");
System.out.println();
System.arraycopy(a,0,a1,1,4);
Arrays.sort(a);

方法有返回值
int num = scan.nextInt();
int num = rand.nextInt(100);
int[] arr = Arrays.copyOf(a,a.length+1);
double dou = Math.random();
double d = Math.sqrt(25);



方法没有返回值

方法无参数
System.out.println();
int num = scan.nextInt();
double dou = Math.random(); 固定在[0,1)

方法有参数
System.out.println("HelloWorld");
System.arraycopy(a,0,a1,1,4);
Arrays.sort(a);
int num = rand.nextInt(100); 0-99
int num = rand.nextInt(50); 0-49
int num = rand.nextInt(20);
int num = rand.nextInt(15);
int num = rand.nextInt(25); 0-24

int[] arr = Arrays.copyOf(a,a.length+1);

方法是用于封装一段特定的逻辑功能
方法尽可能独立---只干一件事

开关:

int n = 9;
boolean flag = true; //假设是质数
for(int i=2;i<n;i++){
  if(n % i == 0){
     System.out.println(不是质数);
     flag = false; //不是质数
     break;
  }
}
若有一个取余为0，就不是质数
所有取余都不为0，就是质数
只要进到if，就不是质数
if(flag == true){
   System.out.println("是质数");
}


修饰词 返回值类型 方法名(参数列表){
   方法体
}

当方法需要返回结果时，设计特定返回值类型
不需要结果时，返回值类型为void

返回结果通过return关键字

方法嵌套调用

一.设计数据结构-----数据、变量、类型
二.设计程序结构-----方法
三.设计实现---------方法的实现

数值保存方式：
    正数＝ 二进制
    负数＝ 补码
    补码＝ 反码 +1 正数＝负数的补码(反码+1)
    反码＝ 非(二进制数)
八进制数，零开头 011(八进制)＝9(十进制)
十六进制数，零x开头 0x55(十六进制)＝5*16+5(十进制) 

输入：
使用Scanner 获取输入
    在J2SE 5.0中，可以使用java.util.Scanner类别取得使用者的输入
    可以使用这个工具的 next() 功能，来获取用户的输入
       Scanner s = new Scanner(System.in);
     System.out.printf("您输入了字符： %s \n", s.next());
     System.out.printf("您输入了数字： %d \n", s.nextInt());
使用 BufferedReader 取得输入//5.0之前的读取键盘的方法
    BufferedReader建构时接受java.io.Reader物件
    可使用java.io.InputStreamReader
    例: import java.io.InputStreamReader;
        import java.io.BufferedReader;
      class n{
    public static void main(String[] args){
       System.out.println("请输入一列文字，包括空格：");
       BufferedReader s = new BufferedReader(new InputStreamReader(System.in));
       String next;
       try{next = s.readLine();//此语句会抛异常，需处理
          System.out.println("您输入了文字：" + next);
       }catch(Exception e){}
        }}
输出：
输出命令：
   System.out.println() 会自动换行的打印
   System.out.print() 直接打印，不会自动换行
   System.out.printf() 可插入带 % 的输入类型,前两种只可以插入转义符, 不能插入 % 的数据或字符串
   在 printf 里面,输出有5个部分 %[argument_index$][flags][width][.precision]conversion 
         以“％”开头，[第几个数值$][flags][宽度][.精确度][格式]
   printf()的引入是为了照顾c语言程序员的感情需要
         格式化输出 Formatter；格式化输入 Scanner；正则表达式

输出格式控制：
   转义符：
   \ddd 1到3位8进制数指定Unicode字符输出(ddd)
   \uxxxx 1到4位16进制数指定Unicode字符输出(xxxx)
   \\ \
   \' '
   \" "
   \b 退格(光标向左走一格)
   \f 走纸转页,换页
   \n 换行
   \r 光标回到行首，不换行
   \t 跳格

   %% %
   %d 输出10进位整数，只能输出Byte、Short、 Integer、Long、或BigInteger类型。(输出其他类型会抛异常)
   %f 以10进位输出浮点数，提供的数必须是Float、Double或 BigDecimal (输出Integer类型也抛异常)
   %e,%E 以10进位输出浮点数，并使用科学记号，提供的数必须是Float、 Double或BigDecimal
   %a,%A 用科学记号输出浮点数,以16进位输出整数部份,以10进位输出指数部份,数据类型要求同上。
   %o (字母o)以8进位整数方式输出，限数据类型:Byte,Short,Integer,Long或BigInteger
   %x,%X 将浮点数以16进位方式输出，数据类型要求同上
   %s,%S 将字符串格式化输出(可输出任何类型)
   %c,%C 以字符方式输出，提供的数必须是Byte、Short、Character或 Integer
   %b,%B 输出"true"或"false"(%B输出"TRUE"或"FALSE");另外,非空值输出true,空值输出 false
   %t,%T 输出日期/时间的前置，详请看在线API文件 
关键字列表：
   abstract boolean break byte case catch char class
   continue default do double else extends enum false
   final finally float for if implements import instanceof
   int interface long native new null package private
   protected public return short static super switch synchronized
   this throw throws transient true try void volatile while
Java 中 true、false不是关键字,而是boolean类型的字面量。但也不能当作变量用。
所有的关键字都是小写，friendly，sizeof不是java的关键字
保留字：const，goto ：这两个已经削去意义，但同样不能用作变量名。
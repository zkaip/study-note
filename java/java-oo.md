Java 面向对象
===
1.概述
面向过程编程:一堆方法,调来调去
  缺陷一:缺乏对数据的封装
  缺陷二:数据和方法分离状态

面向对象编程:以对象为核心，围绕着对象做操作
面向接口编程:面向对象的基础之上，抽接口
    复用性好、可维护性好、可扩展性好、
    移植性好......

面向过程:实在
面向对象:抽象
  A,B,C
  只放在一个地方更合适---抽象所在

1.现实世界是由很多对象组成的
2.现实世界是先有对象，再抽出类
  代码中先创建类，再创建对象
3.一个类可以创建多个对象
  同一个类的多个对象，结构相同，数据不同
4.类是一种数据类型
  只能包含:
    1)描述对象所共有的特征:------变量
          属性-----静的
    2)对象所共有的行为:----------方法
          行为-----动的
5.new后，成员变量有默认值
6.创建对象语法:
    类名 引用 = new 类名();
  其中:new 类名()是在创建对象
       因对象为数据，所有声明引用来指代数据
7.访问成员变量、访问方法
  ----通过点来操作，语法:
     引用.成员变量
     引用.方法名();
8.基本类型之间画等号----在赋值
    ------身份证复印件
  引用类型之间画等号----指向同一个对象
    ------房子钥匙
9.null:空，表示没有指向对象
  若引用的值为null，则不能再进行点操作，
  否则会出现NullPointerException异常

类中只能包含成员变量和方法
   ----成员变量就有默认值

步骤:
1.找对象
2.抽类
3.设计类:

方法是用于操作数据的
对象是一个数据
创建对象
类型 引用类型变量 对象
           引用---简称

1.类和对象
2.创建类、成员变量、方法
3.创建对象
    new Cell();
    Cell c = new Cell();
    c:引用类型变量，简称"引用"
4.访问成员变量、方法
    对象.成员变量
    对象.方法(?);
5.基本类型之间画等号----赋值
  引用类型之间画等号----指向同一个对象
6.null:空，没有指向对象
       不能点，否则空指针异常

8种基本类型:可以直接赋值
除了8种之外:
    类、接口、数组----引用类型
    new出的

1.基本:
    直接赋值
    变量装的就是确切的值
    画等号----赋值
    int num = 5;
2.引用:
    new
    变量装的是地址
    画等号----指向同一个对象
1.方法的重载(overload)

java建议:
  1个文件只包含1个类

java规定:
  java中一个文件可以包含多个类，
  但是，public的类只能有1个，
  并且，public的类必须与文件名相同

语法:
1.class---成员变量、方法
2.测试类---main(){创建对象}

构造方法:
1.构造方法常常用于给成员变量初始化
2.与类同名，没有返回值类型
3.构造方法是在创建对象时被自动调用
4.若自己不写构造方法，
  则编译器默认给一个无参构造，
  若自己写了，则不再默认提供无参构造
5.构造方法可以重载

this:
1.this指代当前对象，谁调指的就是谁
2.用法:
    this.成员变量---访问成员变量
    this.方法()-----访问方法
    this()--------调构造方法

声明int型数组，名为arr，包含4个元素
arr中的每一个元素都是int类型
int [] arr = new int[4];---基本类型数组

声明Cell型数组，名为arr，包含4个元素
arr中的每一个元素都是Cell类型
Cell [] arr = new Cell[4];---引用类型数组

int是数据类型
Cell是数据类型

数组也是一种数据类型

1.找对象
2.抽类
3.设计类中的成员变量(特征)、方法(行为)



回顾:
1.方法的重载
    签名:方法名+参数列表
    重载:同一个类中，方法名相同，参数列表不同
2.构造方法
    常常初始化成员变量
    与类同名，没有返回值类型
    创建对象(new)时被自动调用
    自己不写，默认给一个无参的，自己写则不给了
    可以重载
3.this:指代当前对象，哪个对象调指的就是哪个对象
    this.成员变量
    this.方法()
    this()-------调用构造方法
  类中的方法，只要用到了成员变量，
  前面默认都有this
4.引用类型数组
    int[] arr = new int[4];
    Cell[] cells = new Cell[4];
    int[][] cells = new int[4][];

继承:避免代码重复
     父类中包含所有子类公有的数据
     子类中包含子类所特有的数据

java继承有传递性:

1.JVM内存管理
2.继承

java中,调一个方法，就给该方法分配一个"栈桢"
栈桢中存的就是局部变量
方法调用结束，栈桢消失，局部变量跟着消失

一切以对象为中心


向上造型:父类引用指向子类对象
         只能点出来父类的成员

1.堆、栈、方法区
2.继承
  构造子类之前先构造父类----super()
  向上造型


1.堆、栈、方法区
2.继承:避免代码重复
       子类 extends 父类
       子类具有本类成员以及父类成员
  new 子类();----调子类构造(之前，先调父类)
  super();
3.向上造型:父类引用指向子类对象
    注意:能点出来什么，看类型

方法的重写:发生两个类中，并且是子父的关系
           子类方法与父类方法签名相同时，
    我们说，子类重写了父类的方法

当方法被重写时，调哪个方法看对象
 
this:------------本类
 this.成员变量
 this.方法()
 this()
super:-----------父类
 super.成员变量
 super.方法()
 super()


重写(override)和重载(overload)的区别------常见面试题
重载:
  在一个类中，方法名相同，参数列表不同
重写:
  在两个类中，并且是子类和父类的关系，签名相同

重载:编译时----.java到.class的过程
               内存没东西---只看语法对不对

重写:运行时----jvm加载.class并运行.class的过程
               内存才有东西

堆、栈、方法区------jvm分配的内存
重构 (extract Method)
    消除代码的重复，提高代码的可维护性。整理凌乱的代码，把可重用的代码块包装起来。
    常用重复的方法封装成工具类(工具类太多则做成工具箱)，一般都是静态方法和常量，没有属性。
    在eclipse里，选中要重构的代码，右键Refactor-Extract Mathod 或 (Shift+Alt+M)

白箱复用和黑箱复用
    1．白箱复用：又叫继承复用，子类会继承父类所有的东西，
        从某种程度上说白箱复用破坏了封装。是一种 is a 的关系。
    例：class Liucy{
          public void teachCpp(){System.out.println("Teach Cpp");}
          public void chimogu(){ }
        }
       class Huxy extends Liucy{}

    2、黑箱复用：又叫组合复用，是一种 has a 的关系。
    例：class Liucy{
          public void teachCpp(){System.out.println("Teach Cpp");}
          public void chimogu(){ }
        }
       class Huxy {
          private Liucy liucy = new Liucy();
          public void teachCpp(){liucy.teachCpp();}
        }
    原则：组合复用取代继承复用原则。使我们可以有机会选择该复用的功能。

重载时看类型，重写时看对象
1.创建Aoo类，包含show()，输出111
2.创建Boo类继承Aoo类，重写show()，输出222
3.创建Coo类，包含:
    t(Aoo o){ 输出333 o.show(); }
    t(Boo o){ 输出444 o.show(); }
4.测试类，main()方法中:
    Coo c = new Coo();
    Aoo o = new Boo();
    c.t(o);------问输出结果????
                   333 222

建议
域名反写 项目名称 模块名称
com.tarena.studentmanager.course.类名


package a.b.c.d.e; //声明包
public class Test{
}


//a.Test----全局限定名
a.b.c.d.e.Test o = new a.b.c.d.e.Test();

import a.b.c.d.e.Test; //声明类、引入类
Test t = new Test(); //创建对象


import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

import java.util.*;---------不建议


同一个包中的类之间，不需要import

全局限定名=包名+类名

1.重写------------------
2.package,import
3.访问修饰符public......

//单例模式
class Aoo{
  private Aoo(){
  }
  void show(){
     Aoo o = new Aoo(); //正确
  }
}
class Boo{
  void show(){
     Aoo o = new Aoo(); //错误
  }
}

实例化:创建对象的过程
实例:实际的例子-----------对象

class Aoo{
   int a;-------------属于对象
   static int b;------属于类
   void show(){
     b++;
   }
}

成员变量:
  1)实例变量-----不用static修饰的
  2)静态变量-----static修饰的

何时用静态变量，何时用实例变量
class Customer{ //帐户类
   String customerName; //帐户名称
   String customerPwd; //帐户密码
   static double poir; //利率
}
实例变量:属于对象，一个对象有一份
静态变量:属于类，所有对象公用这一份

类的方法中，常常需要对对象的实例变量操作
类的非静态方法，默认有个隐式的this
类的静态方法，没有隐式的this的
class Cell{
   int row; //属于对象---实例变量
   int col; //属于对象---实例变量
   static int num;
   static void show(){
      row++; //错误的,静态方法只能调用静态变量
      num++; //正确的

      Cell c = new Cell();
      c.row = 5;
   }
   void drop(){
      this.row++;
   }
   void moveLeft(){
      this.col--;
   }

}
main(){
  Cell c1 = new Cell(2,5);
  c1.drop(); //3,5

  Cell c2 = new Cell(6,7);
  c2.drop(); //7,7
}


非静态方法:---有隐式this
  可以直接访问静态变量和实例变量
  需要访问实例变量时用

静态方法:-----没有隐式this
  只能直接访问静态变量，不能直接访问实例变量
  不需要访问实例变量时，只需对参数操作即可

何时用静态方法，何时用非静态方法:

静态方法，只与参数相关，与实例变量无关
Arrays.sort(arr);
Math.random();
Math.sqrt(25);

何时用静态代码块:
  一般用于加载静态资源(图片、音频、视频)

回顾:
1.重写(override):
    子类与父类方法签名完全相同
  重写与重载的区别
2.package,import
3.public,private,protected,默认
4.static:
    成员变量:----静态变量
    方法:没有隐式的this，所以不能直接访问实例变量
    块:
  final:意为不可变
    变量
    方法
    类

java是不建议空方法的
抽象类能创建对象吗?不能

Shape s = new Shape(); ------错误
abstract class Shape{ //抽象类(不完整)
   int c; //周长
   abstract double area(); //抽象方法(不完整)
}
abstract class Square extends Shape{ //方形类
}
class Circle extends Shape{ //圆形类
   double area(){ //重写--变不完整为完整
      return 0.0796*c*c;
   }
}
Circle cir = new Circle();



abstract class 汽车{
   abstract void 制造发动机();
}

class 汽车{
   void 制造发动机(){
   }
}
new汽车对象

1.抽象方法:由abstract修饰
           只有方法的定义，没有方法体的
2.抽象类:由abstract修饰
         可以包含抽象方法，也可以包含普通方法
3.包含抽象方法的类，必须是抽象类
  类中没有抽象方法，也可以将类声明为抽象类
4.抽象类不能被实例化 Shape s = new Shape();//错误
5.抽象类一般需要被继承:
  1)子类也声明为抽象类
  2)子类重写抽象类中所有抽象方法---首选
6.抽象类的意义:
  1)封装子类公用的成员
    为子类提供一个公共的类型
  2)定义抽象方法，由子类来做不同的实现，
    但入口(方法名)是一样的


重写:
  方法名同，参数列表同
  子类的访问权限大于或等于父类的

1.接口就是一个标准、一个规范
2.接口中只能包含常量和抽象方法
3.接口不能被实例化
    接口 引用 = new 实现类(); //向上造型
4.类实现接口，必须将所有抽象方法都实现
5.类可以实现多个接口，用逗号分隔
  若类又继承父类又实现接口，需先继承后实现
6.接口与接口之间可以继承

1.制定标准---接口
 2.遵守标准----类
 

0.抽象方法:只有方法的定义，没有方法体
1.抽象类:不能被实例化
2.接口:只能常量和抽象方法
    向上造型------多态
    抽象类 引用 = new 子类();
    接口 引用 = new 实现类();

正课:
1.多态
2.内部类
3.面向对象的汇总


int[] arr = {3,345,34,5,23,75};
Arrays.sort(arr);

Student[] stus = new Student[4];
....分别给每个元素赋值
Arrays.sort(stus); //语法可以的,运行后报错

接口的概念-----只要遵守了标准，就能干某件事


方法----多态的
一个类型的引用在指向不同的对象时有不同的功能
同一个对象，造型成不同的类型时，具有不同的功能
编译器认为: 子类小，父类大
                   实现类小，接口大
大到小，需要强转


达内职员 a = new 讲师();
if(a instanceof 技术顾问){ -----true
   技术顾问 aa = (技术顾问)a;
}
if(a instanceof 项目经理){ -----false
   项目经理 aa = (项目经理)a;
}

语法:
  引用 instanceof 数据类型 ------boolean

小结:
  强转成功与否，看对象

1.内部类:一个类只被一个类使用，对外不可见
2.内部类对象通常只在外部类中被创建
  内部类中可以直接访问外部类的所有成员

class Mama{ //外部类
   String name;
   Mama(String name){
      this.name = name;
   }
   Baby create(){ //创建Baby对象
      return new Baby();
   }
   class Baby{ //内部类
      void mamaName(){
  //this指当前对象，下面错
  System.out.println(this.name);
  //Mama.this指当前外部类对象，下面对
  System.out.println(Mama.this.name);
  //默认有Mama.this，下面对
         System.out.println(name);
      }
   }
}

匿名内部类:
1.何时用:
    有一个类(子类或实现类)，
    只需要创建一个对象，
    对象创建完，这个类就没有意义了

小结:
面向对象3大特征:
1.封装:保证安全
    类-------封装数据、行为
        作为一个整体操作
    方法-----封装功能的实现
        隐藏实现的细节
    访问修饰符----控制访问权限
        保证数据的安全
2.继承:实现代码的重用
    extends
3.多态:多种形态，在继承的基础之上
       提高可维护性、可扩展性
    1)一个类型指向不同对象，有不同的实现
    2)同一个对象造型成不同类型时，有不同的功能

作业:
swing的侦听中用
1.内部类，匿名内部类----实际应用中应用率不高
  class Mama{
     class Baby{
     }
  }
  问:编译后生成几个.class（2个）


interface Inter{
}
main(){
   //创建接口对象，错误的
   Inter o = new Inter(); //接口不能被实例化

   //创建接口的实现类的对象---实现类省略了
   Inter o = new Inter(){
      实现类的成员
   };
}

//如下为不使用匿名内部类的方式
interface Inter{
}
class Aoo implements Inter{
   
}
main(){
   Aoo o = new Aoo();
}

Object类
   1、object类是类层次结构的根类，他是所有类默认的父类。
   2、object类中的其中三个方法。
   (1)、finalize()
        当一个对象被垃圾收集的时候，最后会由JVM调用这个对象的finalize方法；
        注意：这个方法一般不用，也不能将释放资源的代码放在这个方法里；只有调用C程序时，才可能要用到

   (2)、toString()
        存放对象地址的哈希码值。
        返回一个对象的字符串表示形式。打印一个对象其实就是打印这个对象toString方法的返回值。
        可以覆盖类的toString()方法，从而打印我们需要的数据。 Public String toString(){……}

    (3)、equals(Object obj)
        用来判断对象的值是否相等。前提是覆盖了equals方法。Object类中的equals方法判断的依然是地址
        注意：String类已经覆盖了equals方法，所以能用equals来判断String对象的值是否相等。 
下面是覆盖equals方法的标准流程：
/*************************************************************************/
  public boolean equals(Object obj){
    //第一步：现判断两个对象地址是否相等
    if(this == obj) return true;
    //第二步：如果参数是null的话直接返回false;
    if(obj == null) return false;
    //第三步：如果两个对象不是同一个类型直接返回false
    if (getClass() != obj.getClass()) return false;
    //?? if(!(this.getClass.getName().equals(o.getClass.getName())) return false;
    //第四步：将待比较对象强转成指定类型，然后自定义比较规则
       Student s = (Student) obj;
    if(s.name.equals(this.name)&&s.age==this.age) return true;
    else return false;
}
/*************************************************************************/
         覆盖equals的原则： 1.自反性(自己＝自己)、 2.对称性(y=x则x=y)、
                          3.一致性(多次调用，结果一致)、 4.传递性(A=B,B=C则A=C)。
         非空原则： t1.equals(Null)返回False；(如果t1不等于空) 
    (4)、clone 克隆，拷贝
        一个对象参与序列化过程，那么对象流会记录该对象的状态，当再次序列化时，
        会重复序列化前面记录的对象初始状态，我们可以用对象克隆技术来解决这个问题
         1 类中覆盖父类的clone方法，提升protected为public
         2 类实现Cloneable接口
        浅拷贝：只简单复制对象的属性
        深拷贝：如果被复制对象的属性也是一个对象,则还会复制这个属性对象
               这种复制是一个递归的过程,通过对象序列化实现
《Java5.0特性》
 四大点(枚举、泛型、注释、..)；5 小点(包装类、静态应用、可变长参数、for-each、..)
一、自动装箱 和 自动解箱技术
    装箱Autoboxing，也翻译作 封箱；解箱Unautoboxing(也译作 解封)
    1、自动装箱技术：编译器会自动将简单类型转换成封装类型。
    2、编译器会自动将封装类型转换成简单类型
    3、注意：自动装箱和自动解箱只会在必要的情况下执行。
       int 能隐式提升成 long；但Integer不能隐式提升成Long，只能提升成Number
       封装之后就成类，只能由子类转成父类；而Integer和Long是Number的不同子类。
       如： int i; short s; Integer II; Short SS;
         可以 i=SS; 但不可以 II=s; //赋值时，右边的数先转成左边数的对应类型，再进行隐式类型提升
二、静态引用概念：
    用 import static 节省以后的书写。
        引入静态属性 import static java.lang.System.out;
        引入静态方法 import static java.lang.Math.random;
        import static 只能引入静态的方法或属性；不能只引入类或非静态的方法。
    如：import static java.lang.System.*;
     out.println(“a”); //等于System.out.println("a"); 由于out是一个字段，所以不能更节省了
     如果 import static java.lang.System.gc; 则可以直接在程序中用 gc(); //等于System.gc(); 
三、可变长参数
    一个方法的参数列表中最多只能有一个可变长参数,而且这个变长参数必须是最后一个参数
    方法调用时只在必要时去匹配变长参数。
/**********变长参数的例子*************************************/
import static java.lang.System.*;//节省书写，System.out直接写out
public class TestVararg {
   public static void main(String... args){
      m();
      m("Liucy");
      m("Liucy","Hiloo");
    }
   static void m(String... s){out.println("m(String...)");}
   //s可以看作是一个字符串数组String[] s
   static void m(){out.println("m()");}
   static void m(String s){out.println("m(String)");}
} //m(String... s) 是最后匹配的
四、枚举 enum
    1、定义：枚举是一个具有特定值的类型，对用户来说只能任取其一。
       对于面向对象来说时一个类的对象已经创建好，用户不能新生枚举对象，只能选择一个已经生成的对象。
    2、枚举本质上也是一个类。枚举值之间用逗号分开，以分号结束(如果后面没有其他语句，分号可不写)。
    3、枚举分为两种：类型安全的枚举模式和类型不安全的枚举模式
    4、枚举的超类(父类)是:Java.lang.Enum。枚举是 final 类所以不能继承或被继承。但可以实现接口。
       枚举中可以写构造方法，但构造方法必需是私有的，而且默认也是 私有的 private
    5、一个枚举值实际上是一个公开静态的常量，也是这个类的一个对象。
    6、枚举中可以定义抽象方法，但实现在各个枚举值中(匿名内部类的方式隐含继承)
       由于枚举默认是 final 型，不能被继承，所以不能直接用抽象方法(抽象方法必须被继承)
       在枚举中定义抽象方法后，需要在自己的每个枚举值中实现抽象方法。
       
    枚举是编译期语法，编译后生成类型安全的普通类
    values()静态方法，返回枚举的元素数组
    name方法

/**********************************************************/
final class Season1{ //用 final 不让人继承
   private Season1(){} //用 private 构造方法，不让人 new 出来
   public static final Season1 SPRING=new Season1("春");
   public static final Season1 SUMMER=new Season1("夏");
   public static final Season1 AUTUMN=new Season1("秋");
   public static final Season1 WINTER=new Season1("冬");
   String name; //将"春夏秋冬"设为本类型，而不是24种基本类型，为防止值被更改
   private Season1(String name){
      this.name=name;
    }
   public String getName(){
      return this.name;
}}
/********上面是以前版本时自定义的枚举，下面是新版的枚举写法********/
enum Season2{
   SPRING("春"), SUMMER("夏"), AUTUMN("秋"), WINTER("冬");
   String name;
   Season2(String name){ this.name=name; }
   public String getName(){return this.name;}
}//注意：枚举类是有序的；如：Season2.SPRING.ordinal()
/**********************************************************/
/*******关于枚举的例子****************************************/
import static java.lang.System.*;
public class TestTeacher {
    public static void main(String[] args) {
        for(TarenaTeacher t:TarenaTeacher.values()){
            t.teach();
}}}
enum TarenaTeacher{
    LIUCY("liuchunyang"){void teach(){out.println(name+" teach UC");}},
    CHENZQ("chenzongquan"){void teach(){out.println(name+" teach C++");}},
    HAIGE("wanghaige"){void teach(){out.println(name+" teach OOAD");}};
    String name;
    TarenaTeacher(String name){this.name=name;}
    abstract void teach();
}
/**********************************************************/
enum Animals {
    DOG ("WangWang") , CAT("meow") , FISH("burble");
    String sound;
    Animals ( String s ) { sound = s; }
}
    class TestEnum {
    static Animals a;
        public static void main ( String[] args ) {
            System.out.println ( a.DOG.sound + " " + a.FISH.sound );
}}
/**********************************************************/
五、新型 for 循环 for—each，用于追求数组与集合的遍历方式统一 
    1、数组举例：
      int[] ss = {1,2,3,4,5,6};
      for(int i=0; i<ss.length; i++){
         System.out.print(ss[i]);
      } //以上是以前的 for 循环遍历，比较下面的for—each
      System.out.println();
      for(int i : ss){
          System.out.print(i);
    2、集合举例：
       List ll = new ArrayList();
       for(Object o : ll ){
          System.out.println(o);
        }
    注：凡是实现了java.lang.Iterable接口的类就能用 for—each遍历
    用 for—each时，不能用list.remove()删除，因为他内部的迭代器无法调用，造成多线程出错。
    这时只能用 for 配合迭代器使用。
六、泛型 Generic  
    1、为了解决类型安全的集合问题引入了泛型。
       泛型是编译检查时的依据，也是编译期语法。
      (编译期语法：编译期有效，编译后擦除，不存在于运行期)
    2、简单的范型应用：集合(ArrayList, Set, Map, Iterator, Comparable)
       List<String> l = new ArrayList<String>();
       <String>:表示该集合中只能存放String类型对象。
    3、使用了泛型技术的集合在编译时会有类型检查，不再需要强制类型转换。
       String str = l.get(2); //因为List<String> l, 所以 Error
       注：一个集合所允许的类型就是这个泛型的类型或这个泛型的子类型。
    4、List<Number> l = new ArrayList<Integer> //Error
       List<Integer> l = new ArrayList<Integer> //Right
        必须类型一致，泛型没有多态
    5、泛型的通配符<?>
       泛型的通配符表示该集合可以存放任意类型的对象。但只有访问，不可以修改。
        static void print( Cllection<?> c ){
         for( Object o : c )
         out.println(o);
        }
    6、带范围的泛型通配符
      泛型的声明约定T表示类型，E表示元素
        (1)、上界通配符，向下匹配：<? extends Number> 表明“extends”或“implements”，认为是 final 的
             表示该集合元素可以为Number类型及其子类型(包括接口)，例如 Number,Integer,Double
             此时集合可以进行访问但不能修改。即不允许调用此对象的add,set等方法；但可以使用 for-each 或 get.
        (2)、下界通配符，向上匹配：<? super Number>
             表示该集合元素可以为Number类型及其父类型，直至 Object。
             可以使用 for-each,add,addAll,set,get等方法
        (3)、接口实现：<? extends Comparable>
             表示该集合元素可以为实现了Comparable接口的类
    7、泛型方法
        在返回类型与修饰符之间可以定义一个泛型方法，令后面的泛型统一
        这里只能用 extends 定义，不能用 super ；后面可以跟类(但只能有一个，且要放在首位)其余是接口
        符号只有 & //“＆”表示“与”；逗号表示后面的另一部分
        静态方法里面，不能使用类定义的泛型，只能用自己定义的；因为静态方法可以直接调用；
        所以普通方法可以使用类定义的及自己定义的泛型
         public static <T> void copy(T[] array,Stack<T> sta){……}
         public static <T,E extends T> void copy (T[] array,Stack<E> sta){…..}
         public static <T extends Number&Comparable> void copy(List<T> list,T[] t);
    8、不能使用泛型的情况：
      (1)、带泛型的类不能成为 Throwable 类和 Exception 类的子类
            因为cathc()中不能出现泛型。
      (2)、不能用泛型来 new 一个对象
            如：T t = new T();
      (3)、静态方法不能使用类的泛型，因为静态方法中没有对象的概念。
    9、在使用接口的时候指明泛型。
     class Student implements Comparable<Student>{…….}
    10、泛型类 
    /********************************************************************/
   class MyClass<T>{
      public void m1(T t){}
      public T m2(){
        return null;
   }}
    /********************************************************************/
Collection FrameWork 集合框架
     ((Iterator接口 ←－ Iterable接口 )) ← Collection接口
                                                 ↑
          ┌--------------------------------┬---------------┐
       Set接口 List接口 Queue接口
          ↑ ↑ ↑
     ┌----------┐ ┌-----------+---------┐ ┌-----------┐
  HashSet SortedSet接口 Vector ArrayList LinkedList PriorityQueue
                 ↑
               TreeSet
         
     Map接口
       ↑
     ┌----------┐
   HashMap SortedMap接口
                 ↑
              TreeMap

各接口的主要方法：
   Iterable: +iterator()
   Iterator: +hasNext() +next() +remove()
   Collection: +add() +remove() +clear() +isEmpty() +size() +contains()
   List: +get() +set() +remove()
   Queue: +element() +offer() +peek() +poll()
   Set:
     SortedSet: +comparator() +first() +last() +headSet() +tailSet()
   Map: +clear() +containsKey() +containsValue() +get() +keySet()
                 +isEmpty() +remove() +put()会替换重复键 +size() +values()
   SortedMap: +comparator() +firstKey() +lastKey() +headMap() +tailMap()

一、集合(容器，持有对象)：是一个用于管理其他多个对象的对象，且只能保存对象的引用，不是放对象。
   1、Collection： 集合中每一个元素为一个对象，这个接口将这些对象组织在一起，形成一维结构。
   2、List： 有序、可重复。
      ArrayList： 数组。查询快，增删慢。(List是链表)
      Vector： 线程安全，但效率很差(现实中基本不用)
   3、Set： 无序，且不可重复(不是意义上的重复)。(正好与List 对应)
      HashSet： 用 hashCode() 加 equals() 比较是否重复
      SortedSet： 会按照数字将元素排列，为“可排序集合”默认升序。
      TreeSet： 按二叉树排序(效率非常高)； 按Comparable接口的 compareTo() 比较是否重复 
   4、Map： 其中每一个元素都是一个键值对( Key-Value)。键不能重复。可有一个空键。
      SortedMap： 根据 key 值排序的 Map。
      HashMap： 用 hashCode() 加 equals() 比较是否重复
   5、Queue： 队列：先进先出。
      PriorityQueue： 优先队列：元素按照其自然顺序进行排序，或者根据构造队列时提供的 Comparator 进行排序

注意：在“集合框架”中，Map 和Collection 没有任何亲缘关系。
    Map的典型应用是访问按关键字存储的值。它支持一系列集合操作，但操作的是键-值对，而不是独立的元素
    因此 Map 需要支持 get() 和 put() 的基本操作，而 Set 不需要。
   
《常用集合列表》
' 存放元素 存放顺序 元素可否重复 遍历方式 排序方式 各自实现类
List Object 有序 可 迭代 (2) ArrayList, TreeSet
Set Object 无序 不可 迭代 SortedSet HashSet
SortedSet Object 无序 不可 迭代 已排序 TreeSet
Map (1) Key无序 Key不可,value可 对Key迭代 SortedMap HashMap
SortedMap (1) 无序,有排序 Key不可,value可 对Key迭代 已对键值排序 TreeMap
     (1)Object(key)—Object(value);
     (2)Collections.sort();

注：以上有序的意思是指输出的顺序与输入元素的顺序一致
    HashSet、HashMap通过hashCode()，equals()来判断重复元素
    在java中指定排序规则的方式只有两种：1、实现java.util包下的Comparator接口
                                  2、实现java.lang包下的Comparable接口
二、迭代器：Iterator
    1、使用Iterator接口方法，您可以从头至尾遍历集合，并安全的从底层Collection中除去元素
    2、remove() 由底层集合有选择的支持。底层集合支持并调用该方法时，最近一次next()返回的元素将被删
    3、Collection 接口的iterator() 方法返回一个Iterator
    4、Iterator中的hasNext()用于判断元素右边是否有数据，返回True则有。然后就可以调用next()动作。
    5、Iterator中的next()方法会将游标移到下一个元素，并返回它所跨过的元素。(通常这样遍历集合)
    6、用于常规Collection 的Iterator 接口代码如下：
    /*迭代遍历*/
      List l = new ArrayList();
     Iterator it = l.iterator();
     while(it.hasNext()){
         Object obj = it.next();
         System.out.println(obj);
        }
注：工具类是指所有的方法都是公开静态方法的类。
    Java.util.collections就是一个工具类；
三、ArrayList和LinkedList集合
    1、ArrayList 底层是object 数组，所以ArrayList 具有数组的查询速度快的优点以及增删速度慢的缺点。
      Vector 底层实现也是数组，但他是一个线程安全的重量级组件。
    2、而在LinkedList 的底层是一种双向循环链表。
      在此链表上每一个数据节点都由三部分组成：
        前指针(指向前面的节点的位置)、 数据、 后指针(指向后面的节点的位置)。
      最后一个节点的后指针指向第一个节点的前指针，形成一个循环。
    3、双向循环链表的查询效率低但是增删效率高。所以LinkedList 具有查询效率低但增删效率高的特点。
    4、ArrayList 和LinkedList 在用法上没有区别，但是在功能上还是有区别的。
      LinkedList 经常用在增删操作较多而查询操作很少的情况下：队列和堆栈。
      队列：先进先出的数据结构。
      堆栈：后进先出的数据结构。
     (堆栈就是一种只有增删没有查询的数据结构)
      注意：使用堆栈的时候一定不能提供方法让不是最后一个元素的元素获得出栈的机会。
   
      LinkedList 提供以下方法：(ArrayList 无此类方法)
      addFirst(); +removeFirst(); +addLast(); +removeLast();
        在堆栈中，push 为入栈操作，pop 为出栈操作。
      Push 用addFirst()；pop 用removeFirst()，实现后进先出。
        用isEmpty()--其父类的方法，来判断栈是否为空。
        在队列中，put 为入队列操作，get 为出队列操作。
      Put 用addFirst()，get 用removeLast()实现队列。
      List 接口的实现类 Vector 与ArrayList 相似，区别是Vector 是重量级组件，消耗的资源较多。
        结论：在考虑并发的情况下用Vector(保证线程的安全)。
        在不考虑并发的情况下用ArrayList(不能保证线程的安全)。
       5、面试经验(知识点)：
      java.util.stack(stack 即为堆栈)的父类为Vector。可是stack 的父类是最不应该为Vector 的。
      因为Vector的底层是数组,且Vector有get方法(意味着它可能访问任意位置的元素，很不安全)。
      对于堆栈和队列只能用push 类和get 类。(这是早期的某个java编写工程师的失误造成)
      Stack 类以后不要轻易使用。实现堆栈一定要用LinkedList。
        (在JAVA1.5 中，collection 有queue 来实现队列。) 
四、HashSet集合
   1、HashSet是无序的，没有下标这个概念。HashSet集合中元素不可重复(元素的内容不可重复)；
   2、HashSet 底层用的也是数组。
   3、HashSet如何保证元素不重复？Hash算法和equals方法。
      当向数组中利用add(Object obj)添加对象的时候，系统先找对象的hashCode：
      int hc=obj.hashCode(); 返回的hashCode 为整数值。
      int I=hc%n;(n 为数组的长度)，取得余数后，利用余数向数组中相应的位置添加数据，以n 为6 为例，
      如果I=0则放在数组a[0]位置，如果I=1则放在数组a[1]位置。
      如果equals()返回true，则说明数据重复。如果equals()返回false，则再找其他的位置进行比较。
      这样的机制就导致两个相同的对象有可能重复地添加到数组中，因为他们的hashCode 不同。 
      如果我们能够使两个相同的对象具有相同hashcode，才能在equals()返回为真。
       
      在实例中，定义student 对象时覆盖它的hashcode。
      因为String类会自动覆盖，所以比较String 类的对象时，不会出现相同的string 对象的情况。
      现在，在大部分的JDK 中，都已经要求覆盖了hashCode。
    结论：如将自定义类用hashSet 来添加对象，一定要覆盖hashcode()和equals()，
      覆盖的原则是保证当两个对象hashcode 返回相同的整数，而且equals()返回值为True。
      如果偷懒，直接将hashCode方法的返回值设为常量；虽然结果相同，但会多次地调用equals()，影响效率。
      我们要保证相同对象的返回的hashCode 一定相同，也要保证不相同的对象的hashCode 尽可能不同
      (因为数组的边界性，hashCode 还是有极微几率相同的)。
五、TreeSet集合
    1、TreeSet是SortedSet的实现类TreeSet通过实现Comparable接口的compareTo来实现元素不重复。
    2、TreeSet由于每次插入元素时都会进行一次排序，因此效率不高。
    3、java.lang.ClassCastException是类型转换异常。
    4、在我们给一个类用CompareTo()实现排序规则时
    5、从集合中以有序的方式抽取元素时，可用TreeSet，添加到TreeSet的元素必须是可排序的。
      “集合框架”添加对Comparable 元素的支持。
      一般说来，先把元素添加到HashSet，再把集合转换为TreeSet 来进行有序遍历会更快。
六、Map 
   1、HashMap集合
     (1)HashMap就是用hash算法来实现的Map
     (2)在实际开发中一般不会用自定义的类型作为Map的Key。做Key的无非是八中封装类。
     (3)HashMap的三组操作：
       【1】改变操作，允许从映射中添加和除去键-值对。键和值都可以为null。
           不能把Map作为一个键或值添加给自身。
         –Object put(Object key, Object value)
         –Object remove(Object key)
         –void clear()
       【2】查询操作允许您检查映射内容：
         –Object get(Object key)
         –intsize()
         –boolean isEmpty()
       【3】最后一组方法允许您把键或值的组作为集合来处理。
         –public Set KeySet();
         –public Collection values()
    (4)HashMap和HashTable的区别等同于ArrayList和Vector的区别。
       只不过HashTable中的Key和Value不能为空，而HashMap可以。
    (5)HashMap底层也是用数组，HashSet底层实际上也是HashMap，HashSet类中有HashMap属性(查API)。
       HashSet 实际上为(key.null)类型的HashMap。有key 值而没有value 值。
   2、HashMap 类和TreeMap 类 
     •集合框架提供两种常规Map 实现：HashMap和TreeMap。
     •在Map 中插入、删除和定位元素，HashMap 是最好选择。
     •如果要按顺序遍历键，那么TreeMap 会更好。
     •根据集合大小，先把元素添加到HashMap，再把这种映射转换成一个用于有序键遍历的TreeMap 可能更快。
     •使用HashMap 要求添加的键类明确定义了hashCode() 实现。
     •有了TreeMap 实现，添加到映射的元素一定是可排序的
     •HashMap和TreeMap 都实现Cloneable 接口。
Reflection 反射
  1、反射主要用于工具的开发。所有的重要Java技术底层都会用到反射。反射是一个底层技术。
     是在运行时动态分析或使用一个类的工具(是一个能够分析类能力的程序)
  2、反射使我们能够在运行时决定对象的生成和对象的调用。
  3、Class
    (1)定义：在程序运行期间，Java运行时系统始终为所有的对象维护一个被称为运行时的类型标识。
            虚拟机利用类型标识选用相应的方法执行。
            可以通过专门的类访问这些信息。保存这些信息的类被称为Class(类类)
    (2)类对象(类类:用于存储和一个类有关的所有信息),用来描述一个类的类。
        类信息通过流读到虚拟机中并以类对象的方式保存。
        一个类的类对象在堆里只有一个。
        注：简单类型也有类对象。
        在反射中凡是有类型的东西，全部用类对象来表示。
  4．获得类对象的3种方式：
    (1)通过类名获得类对象 Class c1 = String.class; //类.Class;
    (2)通过对象获得类对象 Class c2 = s.getClass(); //类对象.getClass();
    (3)通过Class.forName(“类的全名”)来获得类对象 //Class.forName(包名.类名);
        Class c3 = Class.forName(“Java.lang.String”);//这会强行加载类到内存里，前两种不加载
        注：第三种方式是最常用最灵活的方式。第三种方式又叫强制类加载。
  5．java.lang.reflect .Field 对象，描述属性信息。
  6．java.lang.reflect .Constructor 描述构造方法信息。
  7．java.lang.reflect .Method 描述方法信息。
  8．在反射中用什么来表示参数表？
     Class[] cs2 = {StringBuffer.class};//表示一个参数表
     Constructor c = c1.getConstructor(cs2);//返回一个唯一确定的构造方法。
     Class[] cs2 = {String.class,int.class}
     Method m = c1.getMethod(methodName,cs3);
  9．可以通过类对象来生成一个类的对象。
     Object o = c.newInstance();
  10、反射是一个运行时的概念。反射可以大大提高程序的通用性。
一个关于反射的例子：
/*********************************************************/
import java.lang.reflect.*;
public class TestClass2 {
    public static void main(String[] args) throws Exception{
        //0.获得在命令行输入的类的类对象
        Class c=Class.forName(args[0]);//需处理异常(ClassNotFoundException)
        //Object o=c.newInstance();
        //1.得到构造方法对象
        Class[] cs1={String.class};
        Constructor con=c.getConstructor(cs1);
        //2.通过构造方法对象去构造对象
        Object[] os1={args[1]};
        Object o=con.newInstance(os1);
        //3.得到方法对象
        String methodName=args[2];
        Class[] cs2={String.class};
        Method m=c.getMethod(methodName,cs2);
        //4.调用方法
        Object[] os2={args[3]};
        m.invoke(o,os2);

        /* 以上相当于知道类的情况时，这样直接用
         Student s=new Student("Liucy");
         s.study("CoreJava"); */
}}
/**********************************************************/

    下面是用反射调用私有方法的一个例子:
    /**********************************************************/
public class TestClass2 {
    public static void main(String[] args) throws Exception{
        System.out.println("请输入需要读取的类名：");
        Scanner scanner = new Scanner(System.in);
        String str = scanner.next(); //输入“AA”
        Class c = Class.forName(str);
        Method[] m = c.getDeclaredMethods();//读取它的全部方法
        Method m1 = m[0];//拿其中的第一个方法
        m1.setAccessible(true);//把private的属性设成可访问，否则不能访问
        AA b = new AA();
        m1.invoke(b);
}}

class AA{
    private void print(){
        System.out.println("print()");
}}
     /**********************************************************/
要求学会的内容：
    概念：类类，类对象，类的对象，对象类(Object类)
         类对象：Class，指向类的对象。
         类对象包括：属性对象 Feild，方法对象Method，构造方法对象Constructor。
    类对象能做什么：探查类定义的所有信息：父类，实现的接口，所有属性及方法，以及构造方法。
                 类的修饰符，属性以及方法的修饰符，方法的返回类型，方法的
                 ...
                 构造一个类的对象(类对象.newInstance())
                 强制修改和访问一个对象的所有属性(包括私有属性)
                 调用一个对象的方法(普通方法，静态方法)
                   Method.invoke(方法所在的对象(类对象，null),给方法传参数
                 ...
                 构造数组的另一种用法(动态构造数组，不定长度)
注释 Annotation
1、定义：Annotation描述代码的代码(给机器看的)。
     区别：描述代码的文字，给人看的，英语里叫Comments。
     任何地方都可以使用Annotation注释，它相当于一段代码，可用来作自动检测。
     一个注释其实是一种类型(类class，接口interface，枚举enum，注释Annotation)，注释本质上是接口。
     定义注释 public @interface Test{}，注释都是Annotation接口的子接口
2、注释的分类：
  (1)、标记注释：没有任何属性的注释。@注释名
  (2)、单值注释：只有一个属性的注释。@注释名(value="***")
       在单值注释中如果只有一个属性且属性名就是value，则"value＝"可以省略。
  (3)、多值注释：有多个属性的注释。多值注释又叫普通注释。
       @注释名(多个属性附值，中间用逗号隔开)
3、内置注释(java.lang)：
  (1)、@Override(只能用来注释方法)
       表示一个方法声明打算重写超类中的另一个方法声明。
       如果方法利用此注释类型进行注解但没有重写超类方法，则编译器会生成一条错误消息。
  (2)、@Deprecated
       有 @Deprecated 注释的程序元素，不鼓励程序员使用，通常是因为它很危险或存在更好的选择。
       在使用不被赞成的程序元素或在不被赞成的代码中执行重写时，编译器会发出警告。
  (3)、@SuppressWarnings(抑制警告，该注释效果与版本相关)
        指示应该在注释元素(以及包含在该注释元素中的所有程序元素)中取消显示指定的编译器警告。
4、自定义注释
  (1)、定义注释类型
        自定义注释默认就是java.lang.annotation.Annotation接口的子接口。注释本质上就是一个接口。
        public @interface TestAnnotation {}
  (2)、为注释添加注释
        import java.lang.annotation.*;
        @Documented //能在帮助文档里出现
        @Inherited //能否被继承下去
        @Retention(value = {RetentionPolicy.RUNTIME}) //注释该注释运行时仍然保留
         //@Retention默认是CLASS(保留到编译期)，最短期是SOURCE(原代码级，编译时丢弃)
        @Target(value={ElementType.METHOD,ElementType.FIELD})
        /*用来注释该注释能用来注释方法和属性，还可以定义它用来注释其他的，如类、注释、构造方法等等*/
        /*如果不写Target，默认是可以注释任何东西*/
        public @interface TestAnnotation {...}
  (3)、为注释添加属性方法
        import java.lang.annotation.*;
        @Target(value={ElementType.TYPE})
        public @interface TestAnnotation {
        //如果一个注释不是标记注释，则还要定义属性；这属性同时也是方法，但不可能有参数，只可以有默认值
        String parameter() default "liucy";
        //给属性方法parameter添加一个默认值"liucy"
        //parameter()括号里不能写其他东西，类型只能是24种基本类型之一
        //24种类型:8种基本数据类型、String、枚举、注释、Class、以及它们的一维数组
        }
       
        @TestAnnotation("haha")
        public class MyClass{...}
5、注释的注释：(元注释 meta annotation)
   都在 java.lang. annotation 包中
  (1)、Target：指示注释类型所适用的程序元素的种类。
        一个注释只能出现在其该出现的位置，Target是给注释定位的。
        例：@Target(value = {ElementType.METHOD}); //说明该注释用来修饰方法。
  (2)、Retention：指示注释类型的注释要保留多久。
        如果注释类型声明中不存在 Retention 注释，则保留策略默认为 RetentionPolicy.CLASS。
        例：Retention(value = {RetentionPolicy.xxx})
        当x为CLASS表示保留到类文件中，运行时抛弃。
        当x为RUNTIME表示运行时仍保留(最常用)
        当x为SOURCE时表示编译后丢弃。
  (3)、Documented：指示某一类型的注释将通过 javadoc 和类似的默认工具进行文档化。
        应使用此类型来注释这些类型的声明：其注释会影响由其客户端注释的元素的使用。
  (4)、Inherited：指示注释类型被自动继承。
        如果在注释类型声明中存在 Inherited 元注释，并且用户在某一类声明中查询该注释类型，
        同时该类声明中没有此类型的注释，则将在该类的超类中自动查询该注释类型。
   注：在注释中，一个属性既是属性又是方法。

使用注释
/*********************************************/
Class c = Class.forName(args[0]);
Object o = c.newInstance();
Method[] ms = c.getMethods();
    for(Method m:ms){
    //判断m方法上有没有Test注释
        if (m.isAnnotationPresent(Test.class)){
    //得到m之上Test注释parameter属性值
            Test t=m.getAnnotation(Test.class);
            String parameter=t.parameter();
            m.invoke(o,parameter);
}}
/*********************************************/
图型界面(非重要：不常用、难学)
1、Awt：抽象窗口工具箱，它由三部分组成：
   ①组件：界面元素；
   ②容器：装载组件的容器(例如窗体)；
   ③布局管理器：负责决定容器中组件的摆放位置。
2、图形界面的应用分四步：
   ① 选择一个容器：
     ⑴window:带标题的容器(如Frame)；
     ⑵Panel:面板通过add()向容器中添加组件。
       注：Panel不能作为顶层容器。
       Java 的图形界面依然是跨平台的。但是调用了窗体之后只生成窗体；必须有事件的处理，关闭按钮才工作。
   ②设置一个布局管理器：用setLayout()；
   ③向容器中添加组件；
     jdk1.4用getContentPare()方法添加主件。
   ③ 添加组件的事务处理。
     Panel 也是一种容器：但是不可见的，很容易忘记设置它们的可见性。
     Panel pan=new Panel;
     Fp.setLayout(null);//表示不要布局管理器。
3、五种布局管理器：
  (1)、Flow Layout(流式布局)：按照组件添加到容器中的顺序，顺序排放组件位置。
        默认为水平排列，如果越界那么会向下排列。排列的位置随着容器大小的改变而改变。
        FlowLayout layout = new FlowLayout(FlowLayout.LEFT);//流式布局，可设对齐方式
        Panel 默认的布局管理器为Flow Layout。
  (2)、BorderLayout：会将容器分成五个区域：东西南北中。
        语句：Button b1=new Botton(“north”);//botton 上的文字
        f.add(b1,”North”);//表示b1 这个botton 放在north 位置
        f.add(b1, BorderLayout.NORTH);//这句跟上句是一样的效果，不写方位默认放中间，并覆盖
        注：一个区域只能放置一个组件，如果想在一个区域放置多个组件就需要使用Panel 来装载。
        Frame 和Dialog 的默认布局管理器是Border Layout。
  (3)、Grid Layout(网格布局管理器)：将容器生成等长等大的条列格，每个块中放置一个组件。
        f.setLayout GridLayout(5,2,10,10)//表示条列格为5 行2 列，后面为格间距
  (4)、CardLayout(卡片布局管理器):一个容器可以放置多个组件，但每次只有一个组件可见(组件重叠)。
        使用first()，last()，next()可以决定哪个组件可见。可以用于将一系列的面板有顺序地呈现给用户。
  (5)、GridBag Layout(复杂的网格布局管理器):
        在Grid中可指定一个组件占据多行多列，GridBag的设置非常烦琐。
   注：添加滚动条：JScrollPane jsp = new JScrollPane(ll);
4、常用的组件：
        (1)、JTextArea：用作多行文本域
        (2)、JTextField：作单行文本
        (3)、JButton:按钮
        (4)、JComboBox：从下拉框中选择记录
        (5)、JList：在界面上显示多条记录并可多重选择的列表
        (6)、JMenuBar：菜单栏
        (7)、JScrollPane：滚动条
/***********************************************************/
//最简单的图形用户界面，学会其中的四大步骤
import java.awt.*;
import javax.swing.*;
class FirstFrame{
   public static void main(String[] args){
      //1、选择容器
      JFrame f = new JFrame();//在JFrame()的括号里可以填写窗口标题
      //2、选择布局管理器
      LayoutManager lm = new BorderLayout();
      f.setLayout(lm);
      //3、添加组件
      JButton b = new JButton("确定");
      f.add(b);
      //4、添加事件，显示
      JOptionPane.showMessageDialog(null, "哈哈，你好！");//对话窗口
      f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//用窗口的开关控制程序的结束
      f.setSize(400, 300);//窗口的大小
      f.setVisible(true); //让窗口可见，默认不可见的
}}
/***********************************************************/

/*****************例题 画出计算器的界面*****************************
 界面如下：
     1 2 3 +
     4 5 6 -
     7 8 9 *
     0 . = /
 *******************/
import java.awt.*;
import javax.swing.*;
class Calculator {
   public static void main(String[] args){
      JTextField text = new JTextField();
      JFrame f = new JFrame("计算器");
      Font font = new Font("宋体", Font.BOLD, 25);//"宋体"想写成默认，则写“null”
      text.setFont(font); //定义字体
      text.setHorizontalAlignment(JTextField.RIGHT);//令text的文字从右边起
      text.setEditable(false);//设置文本不可修改，默认可修改(true)
      f.add(text, BorderLayout.NORTH);//Frame和Dialog的默认布局管理器是Border Layout
      JPanel buttonPanel = new JPanel();//设法把计算器键盘放到这个Jpanel按钮上
      String op = "123+456-789*0.=/";
      GridLayout gridlayout = new GridLayout(4,4,10,10);
      buttonPanel.setLayout(gridlayout);//把计算器键盘放到buttonPanel按钮上
      for(int i=0; i<op.length(); i++){
          char c = op.charAt(i);
          JButton b = new JButton(c+"");
          buttonPanel.add(b);
      }//这个循环很值得学习，很常用
      f.add(buttonPanel/*, BorderLayout.CENTER*/); //默认添加到CENTER位置
      f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//关窗口时结束程序
      f.setSize(300, 250);
      f.setVisible(true);//这句要放到最后，等事件完成后再显示
}}
/******学过事件之后，可以实现计算器的具体功能*******************************/

观察者模式：
事件源一旦产生事件，监察者立即作出相应处理。
    事件源：产生一个事件的对象
    事件对象：由事件源产生的一个对象
    事件监听者(观察者)：处理这个事件对象的对象
    事件注册：给一个事件源注册一个(或多个)事件监听者

事件模型(重点)
    1．定义： 事件模型指的是对象之间进行通信的设计模式。
        事件模型是在观察者模式基础上发展来的。
    2．对象1 给对象2 发送一个信息相当于对象1 引用对象2 的方法。
    3．事件对象分为三种：
       (1)事件源：发出事件者；
       (2)事件对象：发出的事件本身(事件对象中会包含事件源对象)
           事件对象继承:java.util.EventObjct类.
       (3)事件监听器：提供处理事件指定的方法。
           标记接口：没有任何方法的接口；如EventListene接口
           监听器接口必须继承java.util.EventListener接口。
           监听接口中每一个方法都会以相应的事件对象作为参数。
    4．授权：Java AWT 事件模型也称为授权事件模型，指事件源可以和监听器之间事先建立一种授权关系：
        约定那些事件如何处理，由谁去进行处理。这种约定称为授权。
        当事件条件满足时事件源会给事件监听器发送一个事件对象，由事件监听器去处理。
        事件源和事件监听器是完全弱偶合的。
        一个事件源可以授权多个监听者(授权也称为监听者的注册)；事件源也可以是多个事件的事件源。
        监听器可以注册在多个事件源当中。监听者对于事件源的发出的事件作出响应。
        在java.util 中有EventListener 接口：所有事件监听者都要实现这个接口。
        java.util 中有EventObject 类：所有的事件都为其子类。
        注意：接口因对不同的事件监听器对其处理可能不同，所以只能建立监听的功能，而无法实现处理。
//监听器接口要定义监听器所具备的功能，定义方法
/************下面程序建立监听功能***************************/
import java.awt.*;
import javax.swing.*;
public class TestEvent {
    public static void main(String[] args) {
        JFrame f = new JFrame("测试事件");
        JButton b = new JButton("点击");//事件源：鼠标点击
        JTextArea textArea = new JTextArea();
        textArea.setFont(new Font(null, Font.BOLD+Font.ITALIC, 26));
        JScrollPane scrollPane = new JScrollPane(textArea);
        f.add(scrollPane, "Center");
        ButtonActionListener listener = new ButtonActionListener(textArea);
        b.addActionListener(listener);
        f.add(b, BorderLayout.SOUTH);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setSize(400, 300);
        f.setLocation(250, 250);
        f.setVisible(true);
}}
//事件对象，可以直接调用系统写好的
/*class ActionEvent extends EventObject{
    public ActionEvent(Object source) {
        super(source);
}}*/

//监听接口，同样可以调用系统写好的
/*interface ActionListener extends EventListener{
    public void actionPerformed(ActionEvent event);
}*/

//监听者
class ButtonActionListener implements ActionListener{
    private JTextArea textArea;
    public ButtonActionListener(JTextArea textArea) {
        this.textArea = textArea;
    }
    public void actionPerformed(ActionEvent e) {//必须覆盖它的actionPerformed()
        //JOptionPane.showMessageDialog(null, "按钮被按了一下");
        textArea.append("哈哈，放了几个字\n");
        textArea.append("哈哈，又放了几个字\n");
}}
/*********************************************************/
    注意查看参考书：事件的设置模式，如何实现授权模型。
    事件模式的实现步骤：开发事件对象(事件发送者)——接口——接口实现类——设置监听对象
    重点：学会处理对一个事件源有多个事件的监听器(在发送消息时监听器收到消息的排名不分先后)。
        事件监听的响应顺序是不分先后的，不是谁先注册谁就先响应。
        事件监听由两个部分组成(接口和接口的实现类)。
       
        一定要理解透彻Gril.java 程序。
        事件源 事件对象 事件监听者
        gril EmotinEvent EmotionListener(接口)、Boy(接口的实现类)
        鼠标事件：MouseEvent，接口：MouseListener。
    注意在写程序的时候：import java.awt.*;以及import java.awt.event.*注意两者的不同。
   
    在生成一个窗体的时候，点击窗体的右上角关闭按钮激发窗体事件的方法：
    窗体Frame 为事件源，用WindowsListener 接口调用Windowsclosing()。
    为了配合后面的实现，必须实现WindowsListener所有的方法；除了Windowsclosing方法，其余的方法均为空实现。这样的程序中实现了许多不必要的实现类，虽然是空实现。为了避免那些无用的实现，可以利用WindowEvent 的一个WindowEvent 类，还是利用windowsListener。WindowAdapter类,实现于WindowsListener。它给出的全是空实现，那就可以只覆盖其中想实现的方法，不必再写空实现。
/******练习：写一个带button 窗体，点关闭按钮退出。*************/
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import javax.swing.JFrame;
public class TestAdapter {
    public static void main(String[] args) {
        JFrame f = new JFrame("测试适配器");
        MyWindowListener listener = new MyWindowListener();
        //f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        //现在有上面这一句话，就可以不必再创建一个类了
        f.addWindowListener(listener);
        f.setSize(400, 300);
        f.setVisible(true);
    }
    private static class MyWindowListener extends WindowAdapter{
        public void windowClosing(WindowEvent e) {
            System.exit(0);
}}}
/*********************************************************/
注意：监听过多，会抛tooManyListener 例外。
缺省试配设计模式：如果一个接口有太多的方法，我们可以为这个接口配上一个对应的抽象类。

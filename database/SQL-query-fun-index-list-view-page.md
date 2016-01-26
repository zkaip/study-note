SQL 查询 函数 索引 序列 视图 伪列 分页 逻辑运算
===
注意事项
    大小写不敏感，即不区分大小写。提倡关键字大写，便于阅读和调式。 
    “！”在SQL环境下执行Unix命令。 
    SQL语句是由简单的英语单词构成；这些英语单词称为关键字/保留字，不做它用。SQL由多个关键字构成。 
    SQL语句由子句构成，有些子句是必须的，有些是可选的。 
    在处理SQL语句时，其中所有的空格都被忽略(空格只用来分开单词，连续多个空格当一个用)。 
    SQL语句可以在一行上写出，建议多行写出，便于阅读和调试。 
    多条SQL语句必须以分号分隔。多数DBMS不需要在单条SQL语句后加分号，但特定的DBMS可能必须在单条SQL语句后加分号。 
    SQL语句的最后一句要以 “；”号结束
select sysdate from dual;

子句顺序
    Select column,group_function
    From table
    [Where condition]
    [Group by group_by_expression]
    [Having group_condition]
    ……
    [Order by column]; 
关键字
and的优先级大于or，可以使用()提升优先级别
%：表示0到多个任意字符
_：表示1个任意字符
between...and...:在俩着之间
in:相当与or,或者的意思
select deptno from emp where deptno in(10,20,30,40,50);
not in:表示不在给定的范围之内

在where使用any或者all
  >any(值1，值2，值3....)大于任何一个给定的值的元素就算满足条件
  >all(值1，值2，值3....)大于所有元素才算满足条件
过滤重复字段：
  distinct 值1，值2....

SELECT语句：选择操作、投影操作。
select：从一个或多个表中检索一个或多个数据列。
包含信息：想选择什么表，从什么地方选择。必须要有From子句。(最常用)
        当从多张表里查询的时候，会产生笛卡尔积；可用条件过滤它。
        当两个表有相同字段时必须加前缀，列名前需加表名和“.”，如“s_emp.id”。
    1、用法：SELECT columns,prod2,prod3<列> FROM Table1,table2<表名> 分号结束
           如： select id from s_emp;
           select last_name,name from s_emp,s_dept where s_emp.dept_id=s_dept.id;--列表每人所在部门
           SELECT * FROM Products; --检索所有列。
           数据太多时，最好别使用上句，会使DBMS降低检索和应用程序的性能。(*通配符)
    2、对数据类型的列可进行运算(如加减乘除)。
    3、对列起别名：有直接起别名，加AS起别名，用双引号起别名等三种方法
       (单引号，引起字符串；双引号，引起别名。起别名有符号，或者区分大小写时，必须用双引号)
        多表查询时，可给表起别名。(给列起别名，列<空格>列别名；给表起别名，表<空格>表别名；)。
        如：Select first_name EMPLOYEES, 12*(salary+100) AS MONEY, manager_id "ID1" From s_emp E;
    4、字段的拼接,可用双竖线(双竖线只能用于select语句里)。不同的DBMS可能使用不同的操作符;拼接的字段同样可以起别名。
        如：Select first_name ||' '|| last_name || ', '|| title "Employees" From s_emp;

排他锁：Select id,salary From s_emp where id=1 For Update;
   可以阻止他人并发的修改，直到你解锁。
   如果已有锁则自动退出：Select id,salary From s_emp where id=1 For Update NoWait;
   FOR UPDATE ：可以再加 OF 精确到某格。如： ... For Update OF salary ...
   注意要解锁。 
ORDER BY 子句，排序
Order by：按某排序列表(默认升序 asc，由低到高；可加 desc，改成降序由高到低)
检索返回数据的顺序没有特殊意义，为了明确地排序用 SELECT 语句检索出的数据，可使用 ORDER BY 子句。
    ORDER BY 子句取一个或多个列的名字。
    对空值，按无穷大处理(升序中，空值排最后；降序中排最前)。
    1、用法：Select prod_id,prod_price,prod_name From Products Order By prod_price,prod_name;
                  (从左到右执行排序，先排price)
       ORDER BY子句中使用的列将是为显示所选择的列，但是实际上并不一定要这样，用非检索的列排序数据是完全合法的。
       为了按多个列排序，列名之间用逗号分开。
    2、支持按相对列位置进行排序。
       输入 SELECT prod_id,prod_price,prod_name
       FROM Products
       ORDER BY 2，3 --(2指price，3指name)
    3、升序、降序。默认是升序(asc，从小到大排序)，想降序时用desc。
       如：SELECT prod_id,prod_price,prod_name FROM Products ORDER BY prod_price DESC;
      注意：DESC 关键字只应用到直接位于其前面的列名。如果想在多个列上进行排序，必须对每个列指定DESC关键字。 升序是默认的，可不写，但降序必须写。
WHERE子句，选择、过滤
    其后只能跟逻辑语句，返回值只有ture或false
    如： select last_name,salary from s_emp where salary＝1000;--找出工资1000的人
WHERE子句操作符：
    1、逻辑比较运算符
        ＝ 等于
        ！= 不等于，还有(<> ^= 这两个同样表示不等于)
        > 大于
        >= 大于等于
        < 小于
        <= 小于等于
    2、SQL 比较运算符 
    between…and… ：在两者之间。(BETWEEN 小值 AND 大值)
        如：select last_name,salary from s_emp where salary between 1000 and 1500；
          --工资1000到1500的人，包括1000和1500。
    in(列表)：在列表里面的。
        如：select last_name,dept_id from s_emp where dept_id in(41,42);第41、42部门的人
    like ： 包含某内容的。模糊查询
        可以利用通配符创建比较特定数据的搜索模式，通配符只能用于文本，非文本数据类型不能使用通配符。
        通配符在搜索模式中任意位置使用，并且可以使用多个通配符。
        通配符%表示任何字符出现任意次数；还能代表搜索模式中给定位置的0个或多个字符。下划线匹配单个任意字符。
        如：select table_name from user_tables where table_name like 'S\_%' escape'\';
        ' 找出“S_“开头的,由于下划线有任意字符的含义，故需另外定义转移符。
           但习惯用“\”，为方便其他程序员阅读和检测，一般不改用其他的。
        like 'M%'：M开头的 like '_a%'：第二个字符是a的 like '%a%'所有含a的
            (“_”表示一个任意字符；“%”表示任意多个任意字符。)
        单引号里面的内容，大小写敏感。单引号用来限定字符串，
        如果将值与串类型的列进行比较，则需要限定引号；用来与数值列进行比较时，不用引号。
    is null：是空。(NULL表示不包含值。与空格、0是不同的。)
        如：SELECT prod_name,prod_price FROM Products WHERE prod_price IS NULL;
高级检索(逻辑运算符)
    通常我们需要根据多个条件检索数据。可以使用AND或OR、NOT等连接相关的条件
    计算次序可以通过圆括号()来明确地分组。不要过分依赖默认计算次序，使用圆括号()没有坏处，它能消除二义性。
    and：条件与
       如 SELECT prod_id,prod_price,prod_name FROM Products WHERE prod_price<4 AND vend_id=‘DELL’
    or：条件或 (注： and 的优先级比 or 更高，改变优先级可用括号)
       如 SELECT prod_id,prod_price,prod_name FROM Products WHERE prod_price<4 OR vend_id=‘DELL’
    not：条件非。否定它之后所跟的任何条件
        否定的SQL 比较运算符： NOT BETWEEN； NOT IN； NOT LIKE； IS NOT NULL：
         (注意，按英语习惯用 is not，而不是 not is)
        NOT 与 IN 在一起使用时，NOT 是找出与条件列表不匹配的行。
        IN 列表里有 NULL 时不处理，不影响结果；用 NOT IN 时，有 NULL 则出错，必须排除空值再运算。
    in ：选择列表的条件
        使用IN操作符的优点： 在长的选项清单时,语法直观； 计算的次序容易管理；
        比 OR 操作符清单执行更快；最大优点是可以包含其他 SELECT 语句，使用能够动态地建立 WHERE 子句。
     如 SELECT prod_id,prod_price,prod_name FROM Products WHERE vend_id IN(‘DELL’,’RBER’,’TTSR’);
单行函数
    函数一般在数据上执行，它给数据的转换和处理提供了方便。不同的DBMS提供的函数不同。
    函数可能会带来系统的不可移植性(可移植性:所编写的代码可以在多个系统上运行)。
    加入注释是一个使用函数的好习惯。
    大多数SQL实现支持以下类型的函数： 文本处理， 算术运算， 日期和时间， 数值处理。
Null：空值 
    空值当成无穷大处理，所有空值参与的运算皆为空。
    空值与空值并不相等，因为空值不能直接运算。
    如：prod_price="" 这种写法是错的(不要受到corejava的影响)
    prod_price=NULL 这种写法是错的(不要受到corejava的影响)
    prod_price IS NULL 这种写法才是对的
NVL：处理空值，把空值转化为指定值。可转化为日期、字符、数值等三种(注意：转化时，两参数必须要同类型)
    如：NVL(date, '01-JAN-95') NVL(title,'NO Title Yet') NVL(salary,0)
    错误写法：
     Select last_name,title,salary*commission_pct/100 COMM From s_emp;--没提成的人没法显示工资
    正确写法：
     Select last_name,title,salary*NVL(commission_pct,0)/100 COMM From s_emp;--把提成是空值的转化为0
DISTINCT：过滤重复 
    把重复的行过滤掉；多个字段组合时，只排除组合重复的。
    DISTINCT必须使用列名，不能使用计算或者表达式。
    所有的聚合函数都可以使用。如果指定列名，则DISTINCT只能用于COUNT(列名)，DISTINCT不能用于COUNT(*)。
    如：Select Distinct name From s_dept; Select Distinct dept_id,title From s_emp;
文本处理： 
TRIM()/LTRIM()/RTIRM()：去空格。只能去掉头和尾的空格，中间的不理。 
     trim(' heo Are fdou ') --> heo Are fdou
     输入：select trim(' heo Are fdou ') from dual; -->：heo Are fdou
LOWER：转小写 
    lower('SQL Course') --> sql course
UPPER：转大写 
    upper(' SQL Course') --－>SQL COURSE
INITCAP：首字母转大写，其余转小写 
    initcap(SQL Course') '--> Sql Course
CONCAT：合成。双竖线只能在select语句里面用，这个可用于任何语句。 
    Concat('Good','String') --> GoodString
SUBSTR：截取。
    Substr('String', 1 ,3) --> Str
    第一个数字“1”，表示从第几个开始截取；若要从倒数第几个开始，用负数，如“－2”表示倒数第2个。
     上式中第2个数字“3”表示截取多少个。
LENGTH：统计长度。
     Length('String') --> 6
补足位数
  lpad(s,n,char):如果s不够n位，就左侧补充char字符到n位 
  rpad(s,n,char):如果s不够n位，就右侧补充char字符到n位
instr(s,s1,[begin,n]):在s字符串中查找s1  查找   
  从begin处开始查找，找第n处匹配的
NVL：转换空值
日期和时间处理：
    Oracle日期格式：DD-MMM-YYYY (D代表日期date，M代表月month，Y代表年year)
    如：SELECT prod_name (DAY表示完整的星期几，DY显示星期的前三个字母)
        FROM Products
        WHERE prod_time BETWEEN
            to_date(’01-JAN-2008’)
        AND to_date(’31-DEC-2008’);
    日期可以进行加减，默认单位是1天。日期与日期可以相减，得出天数；日期与日期但不能相加。
sysdate －> 系统的当天
Months_Between('01-Sep-95','11-Jan-94') --> 19.774194 相差多少个月,Between里面也可以填函数。
Add_months('11-Jan-94',6) --> 11-Jul-94 增加多少个月
Next_day('01-Sep-95','Friday') --> '08-Sep-95' 下一个星期五。其中的'Friday'可用6替代，因为星期日＝1
Last_day('01-Sep-95') --> '30-Sep-95' 这个月的最后一天
  sysdate:Oracle服务器当前系统时间 
            systimestamp：返回oracle服务器当前系统时间是一个timestamp类型
  将字符串站换成date 
            to_date(s.format):将s字符串以format格式转换成date类型
    Oracle默认的格式为：DD-MM-RR
  英文环境：'01-JAN-90'
  中文环境：'01-1月-90'
  日期转换成字符串 
  to_char(date,format):将date转换成format格式的字符串显示出来
  to_timestamp和to_date相似，可以将一个字符串转换成timestamp()类型
  其他日期函数 
  last_day(date):返回当前时间月份的最后一天
  next_day(date,星期几)：从当date时间开始计算，下一个星期几的日期(离date最近的日期)
  eg:next_day(date,3):下个离date最近的星期二的日期
  add_months(date,n):对date日期的月份进行加n操作
  明天的日期：sysdate+1
  months_between(date1,date2):计算date1-date2相差多少个月
  extract:获取指定的年，月，日等信息
  eg:select extract(month from sysdate) from dual;
  least(date1,date2):返回俩个值中的最小值
  greatest(date1,date2):返回俩个值中最大的    
  to_char(sysdate,'mm')//获取月份

数值处理：可以运用于代数，三角，几何
ROUND：四舍五入
    Round(45.925,2) －> 45.93 Round(45.925,0) －> 46 Round(45.925,-1) －> 50
    逗号前一个数是要处理的数据源，后一个参数表示保留多少位小数。
    后一参数是负数时，表示舍去小数点前的几位，例3是舍去个位及其后的。不写后一参数时，默认不保留小数。
TRUNC：舍去末位。直接舍去，不会进位。
    Trung(45.925,2) －> 45.92 Trung(45.925,2) －> 45.92 Trung(45.925,2) －> 45.92
floor(n):返回小于等于n的整数   
  floor(1.23)--->1 
  floor(15.64)---->15 
ceil(n):返回大于等于n的整数 
sign(n):判断n是正数负数还是0，相应的返回1，-1，0
日期的舍取：
常用的数值处理函数有：
    ABS() 绝对值 ABS(-5741.5854) --> 5741.5854
    PI() 圆周率 注意：oracle中不支持 PI()函数；MYSql 支持PI()函数。
    SIN() 正统值 Oracle还支持COS()、ASIN()、ACOS()函数
    SQRT() 平方根
转化：
TO_CHAR(number,'fmt')：把数值转换成字符串
    显示数字的命令
    9：正常显示数字；
    0：显示包括0的数值形式，空位强制补0；
    $：以美元符号显示货币；
    L：按当前环境显示相关的货币符号；
    . 和，：在固定位置出现“.”点 和“，”逗号；不够位时，四舍五入。
   例题：SQL> select 'Order'||To_char(id)||
  2 'was filled for a total of'
  3 ||To_char(total,'fm$9,999,999')
  4 from s_ord
  5 where ship_date ='21-SEP-92';
TO_NUMBER(char)：把字符转换成数字
链接
内链接：严格匹配两表的记录。
外链接分左链接和右链接:
    会使用一方表中的所有记录去和另一格表中的记录按条件匹配，空值也会匹配，这个表中的所有记录都会显示，
    数据库会模拟出记录去和那些不匹配的记录匹配。
左链接 加号在右面
    如：有 TABLE1 TABLE2
        1的一条记录在2里面没有匹配上，那么1里面的记录保留
        2的一条记录在1里面没有匹配上 ，那么2丢弃
右链接正好相反
    --例题：哪些人是领导。
    select distinct b.id,b.last_name manager
    from s_emp a,s_emp b
    where a.manager_id=b.id(+);
左右顺序有区别，这是另外新建一个表，要显示的是第二个表格的内容。
+放在没有匹配行的表一侧，令表格能完整显示出来。
标准写法：内连接用INNER，左连接用LEFT，右连接用RIGHT。
    select distinct b.id,b.last_name manager
    from s_emp a LEFT join s_emp b
    ON a.manager_id=b.id;

组函数
    分组允许将数据分为多个逻辑组，以便能对每个组进行聚集计算。
Group：分组
Group by：分组。(默认按升序对所分的组排序；想要降序要用 order by)可以包括任意数目的列。
    如果嵌入了分组，数据将在最后规定的分组上进行汇总。
    GROUP BY 子句中列出的每个列都必须是检索列或有效的表达式，但不能是聚集函数。
    *如果在SELECT 中使用表达式，则必须在GROUP BY子句中指定相同的表达式，不能使用别名。
    除聚合计算语句外，SELECT语句中的每个列都必须在GROUP BY子句中给出。
    如果分组列中具有NULL值，则NULL将作为一个分组返回。如果列中有多行NULL，它们将分为一组。
Having：过滤。分组之后，不能再用where，要用having 选择过滤。Having不能单独存在，必须跟在group by后面。
    WHERE在数据分组前进行过滤，HAVING在数据分组后过滤。
    可以在SQL中同时使用 WHERE和HAVING，先执行WHERE，再执行HAVING。
聚合函数
AVG：平均值 (忽略值为NULL的行，但不能用 AVG(*)) 
COUNT：计数 (Count(列)不计算空值；但 COUNT(*)表示统计表中所有行数，包含空值) 
MAX：最大值 (忽略列值为 NULL 的行。但有些DBMS还允许返回文本列中的最大值， 
               在作用于文本数据时，如果数据按照相应的列排序，则 MAX()返回最后一行。) 
MIN：最小值 (忽略值为 NULL 的行。不能用 MIN(*)。一般是找出数值或者日期值的最小值。 
               但有些DBMS还允许返回文本列中的最小值，这时返回文本最前一行) 
SUM：求和 (忽略值为 NULL 的值。SUM 不能作用于字符串类型，而 MAX()，MIN()函数能。也不能 SUM(*)) 
子查询：查询语句的嵌套
    可以用于任意select 语句里面，但子查询不能出现 order by。
    select子查询可以出现在select，from，where，having部分出现
    子查询总是从内向外处理。作为子查询的SELECT 语句只能查询单个列，企图检索多个列，将会错误。
    如：找出工资最低的人select min(last_name),min(salary) from s_emp;
       或者用子查询select last_name,salary from s_emp where salary=(select min(salary) from s_emp);
where部分 
    在where部分使用分成一下两类：
    --单行子查询
      在where条件部分使用<,>,<=,>=,=等需要指定单个值，返回一个结果
    --多行子查询
      在where条件部分使用in,not in,any,all是指定多个值，子查询可以返回多个结果
from部分使用子查询 
select empno,ename,total
from (
  select empno,ename,  sal+nvl(comm,0) as total  
  from emp
) where total > 2500; 
having使用子查询 
  having部分使用与where相似.
 //查询大于公司整体平均工资的
 //各部门平均工资
  select deptno,avg(sal) avg1   from emp 
  group by deptno
  having avg(sal) > (select avg(sal) from emp) 
  order by avg1 desc;
序列：
Sequence:排列。存储物理地址
create sequence 序列名
  [start with 起始值（默认为1）]
  [increment by 第增值（默认为1）]
  [maxvalue 最大值（最大为10的27次方）]
  [cycle|nocycle]
  [cache|nocache]
**/
--创建一个mysql序列--
create sequence mysql;
--获取mysql序列生成的值--
select mysql.nextval from dual;
--获取当前值--
select mysql.currval from dual;
create sequence seq25 start with 100;
insert into t_022 values(seq25.nextval,'Roke',23);
alter table t_022
    drop constraint t_00;
select * from t_022;
desc t_022;
--删除序列--
drop sequence seq25;
Index:索引。依附于表，为提高检索速度。
作用：在某些字段上面创建索引可以提升查询效率
create index 索引名 on 表名（字段）；
create index tt1 on t_022(name);
drop index tt1 ;
View:视图。看到表的一部分数据。
    限制数据访问。简化查询。数据独立性。本质上是一个sql查询语句。
    Create[or Replace][Force|noForce] View 视图名
         [(alias[,alias]…)] 别名列表
        As subquery
    [With Check Option [Constraint ……]]
    [With Read Only]
    注意：有些DBMS不允许分组或排序视图，不能有 Order by 语句。可以有 Select 语句。
    删除视图： DROP VIEW 视图名
Rownum:伪列。内存里排序的前N个。
取出表中的前n条记录 ，Oracle中使用rownum列实现.，rownum的值会自动维护，始终保持连续状态 
能使用<,<=不能使用>,>=,=(除了=1)
    在where语句中，可以用＝1，和<=N 或 <N；但不能用＝N 或 >N。
    因为这是内存读取，没有1就丢弃再新建1。只能从1开始。需要从中间开始时，需二重子rownum语句需取别名。
经典应用： Top-n Analysis (求前N名或最后N名)
          Select [查询列表], Rownum
          From (Select [查询列表(要对应)]
                   From 表
                   Order by Top-N_字段)
          Where Rownum <= N
分页显示：
    --取工资第5～10名的员工(二重子rownum语句，取别名)
    select rn,id,last_name,salary
    From ( select id,last_name,salary,Rownum rn
           From (Select id,last_name,salary
                     from s_emp
                     order by salary desc)
    where rownum <= 10)
    where rn between 5 and 10;

select ename,deptno from emp where rownum <=4;
select ename,hiredate
  from(
    select hiredate,ename
    from emp
    order by hiredate asc
  )
where rownum <=5;
select ename,sal,rownum rn
from(
  select ename,sal,rownum rn
  from(
    select ename,sal
    from emp
    order by sal
  )
  where rownum <=10
)
where rn > 5;
/**获取最近入职的员工，显示（4，5，6)条记录**/
select ename,hiredate,rownum rn
  from(
    select ename,hiredate,rownum rn
     from(
     select ename,hiredate
     from emp
     order by hiredate desc
    )
    where rownum<=6
  )
where rn >=4;
/**显示工资最高的（4，5，6）条记录**/
select ename,sal,rn
from(
  select ename,sal,rownum rn
  from(
  select ename,sal
  from emp
  order by sal desc
  )
  where rownum <=6
)
where rn >=4;

高级操作
分支函数（相当于 switch...case）
decode适用于等值判定，case when更适合区间 大于，小于或者判定
建议：空值判定使用nvl或者nvl2；等值判定使用decode，非等值判定采用case when 
decode函数 
      oracle特有的，经过优化的分支函数，使用格式如下：
      decode(字段，值1，结果1，值2，结果2，值3....)
      表示：字段的数值等于1，返回结果1，值是2，返回2....
select empno,ename,sal,job,
decode(job,'MANAGER',sal*1.2,'SALESMAN',sal*1.15,'ANALYST',sal*1.1,sal*1.05) sal1
from emp;
case when 
select deptno,
  sum(case when sal>=2000 then 1
    else 0
    end) as 大于2000,
  sum(case when sal<=2000 then 1
    else 0
    end) as 小于2000
from emp
group by deptno;
集合操作: 针对于俩个select查询结果集进行操作
  集合操作使用注意事项：
   --两个select结果集列数,列名,类型保持 一致。 
   --对集合操作的结果排序,order by写在 最后的select中
Union：合并表
    Select … Union Select… 把两个Select语句的表合并。
    要求两表的字段数目和类型按顺序对应。合并后的表，自动过滤重复的行。
    union：合并俩个select结果
    union all：合并俩个select结果（不过滤重复记录）
Intersect：交。 同上例，获取两个select查询结果中的相同记录。
  select ename,sal from emp
  where sal>1000 and sal <2000
  minus
  select ename,sal from emp
  where sal>1500 and sal<2500;
Minus：减。 把相交的内容减去。
not exists 除运算。
分析函数（排名函数）
   row_number()|rank()|dense_rank()
    over(partition by 字段1
         order by 字段2)
  上述函数作用是：返回一列值,该列是根据 数据形成的编号。 
row_number() 
  row_number()可以对表数据先进行分组, 排序操作,然后对组内记录进行编号(可以形成组内行编号) 
  select empno,ename,sal,deptno,  row_number()  
      over(partition by deptno  order by sal desc) as no from emp; 
  上面语句,对emp表记录按deptno分组, 之后组内按sal降序排列,再之后形成组内记录的行编号。 
row_number(),rank(),dense_rank()区别 
  --row_number()：顺序且唯一编号
   例如1,2,3,4,5
  --rank()：可重复跳跃编号
   例如1,2,2,4,4,6
  --dense_rank()：可重复不跳跃编号
   例如1,2,2,3,4,4,5
约束
 约束作用:负责限制表中字段值,使得数据更加 合理合法。 
 在Oracle中可以使用以下5种约束.
 --非空约束：要求字段值不能为null
 --唯一约束：要求字段值不能重复, 但可以为null 
 --主键约束：非空且唯一
 --外键约束：要求字段值必须在另外一列存在。但可以为null
 --检查约束：要求字段值必须符合指定条件
建表后添加主键
alter table 表名 add constraint 字段 primary key;
**/
/** 1)非空约束**/ 
create table t_021(
     name varchar2(20) not null,
     age number(3)
);
desc t_021;
/**建表后添加**/
alter table t_021   modify age number(3) not null; 
/**取消**/
alter table t_021   modify age number(3) null; 
create table t_022(
     id number(4),
     name varchar2(20),
     age number(3),
     constraint t_00 primary key(id)
);
desc t_022;
   -----建表后添加-----
alter table t_022
  add constraint t_00 primary key(id);
   -----取消-----
alter table t_022
     drop constraint t_00;

alter table t_022
     add constraint t_0 unique(age);
     
create table tt(
id number(4) primary key,
name varchar2(10)
);
insert into tt values(1,'Demo');

alter table tt
  drop constraint SYS_C004017;--SYS_C004017是系统默认的约束名--
desc tt;
 <--2)主键约束-- >
    ----建表时添加----
   create table t_022(
     id number(4) primary key,
     name varchar2(20),
     age number(3)
   )

  create table t_05(
     id number(4),
     name varchar2(20),
     age number(3),
     constraint 约束名 primary key(id)
   );
   -----建表后添加-----
   alter table t_05
    add constraint 约束名 primary key(id);
   -----取消-----
   alter table t_05
     drop constraint 约束名;

   <--3)唯一约束-- >
    ----建表时添加----
   create table t_023(
     id number(3) primary key,
     email varchar2(50) unique
   );/**系统分配约束名**/
   
   create table t_023(
     id number(3) primary key,
     email varchar2(50),
     constraint uq23 unique(email)
   );/**自定义约束名uq23**/
   
   ----建表后添加----
   alter table t_023
    add constraint uq23 unique(email);
   ----取消----
   alter table t_023
    drop constraint 约束名;
 
  <--4)检查约束-- >
create table t_024(
  name varchar2(20),
  age number(3)
    check (age>0 and age<200),
  sex char(1)
);
    ----建表后添加----
    alter table t_024
     add constraint check_sex
      check(sex in ('M','F'));
   ----取消-----
   alter table t_024
    drop constraint 约束名;

/**允许为null,不执行check检查**/
insert into t_024 values ('bob',null,null);

 <** 5)外键约束**>
   create table t_025(
     name varchar2(20),
     deptno number(4)
        references t_026(dno)
   );

   create table t_025(
     name varchar2(20),
     deptno number(4),
     constraint fk_25 foreign key(deptno)
       references t_026(dno)
   );
/**
deptno设置外键约束fk_25,
该字段取值必须在t_26表的dno中存在
**/

   create table t_026(
     dno number(4) primary key,
     dname varchar2(20)
   );

  ----取消----
  alter table t_025
   drop constraint fk_25;
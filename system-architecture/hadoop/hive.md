Hive - SQL 解析引擎
===
Hive是建立在Hadoop上的数据仓库基础构架。定义了简单的类SQL语句HQL。
Hive是SQL解析引擎，将SQL语句转译成MapReduce Job然后在Hadoop执行
Hive表是HDFS目录/文件
 
Hive体系结构
用户接口：Cli JDBC/ODBC WebUI
元数据=> mysql,derby（包含表的名字，表的列，分区及属性，表的属性，表的数据所在目录）
数据=>HDFS ->MapReduce
解释器、编译器、优化器完成HQL查询语句从词法分析、语法分析、编译、优化以及查询计划的生成
 
Hive开发
-Hive数据类型
--原生数据类型：
TINYINT
SMALLINT
INT
BIGINT
BOOLEAN
FLOAT
DOUBLE
STRING
BINARY (Hive 0.8.0以上才可用)
TIMESTAMP (Hive 0.8.0以上才可用)
--复合数据：
arrays: ARRAY<data_type>
maps: MAP<primitive_type, data_type>
structs: STRUCT<col_name : data_type [COMMENT col_comment], ...>
union: UNIONTYPE<data_type, data_type, ...>
 
Hive存储结构：数据库、文件、表、视图
Hive支持TextFile、sequenceFile、RCFile
-RCFile存储的表是水平划分的，分为多个行组，每个行组再被垂直划分以便每列单独存储，每个行组利用一个列维度的数据压缩，并提供一种Lazy解压技术
●RCFile创建语法如下：
CREATE TABLE fc_rc_test (  datatime string,  section string,  domain string,  province string,  city string,  idc string,  ext string,  ip string,  file_size string,    down_sudo string)STORED AS  RCFILE ;
●因rcfile 格式的表的数据必须要从textfile 文件格式表通过 insert 操作才能完成，故先要创建textfile 的表。可以采用外部表的形式导入数据:
CREATE TABLE fc_rc_ext (  datatime string,section string,domain string,province string,  city string,idc string,ext string,ip string,file_size string,    down_sudo string)ROW FORMAT DELIMITED FIELDS TERMINATED BY "\t"STORED AS textfileLOCATION '/user/hive/warehouse/log/fc';
●导入rcfile 格式的数据：
insert overwrite table fc_rc_test select * from fc_rc_ext ;
 
Hive数据模型
数据库，类似传统数据库的DataBase，默认数据库"default“
系统默认的数据库。可以显式使用
hive> use default;
创建一个新库
hive > create database test_dw;
SHOW TABLES; # 查看所有的表
SHOW TABLES '*TMP*'; #支持模糊查询
DESCRIBE TMP_TABLE; #查看表结构
 
表分为以下四种类型
1.Table内部表
2.Partition分区表
3.Bucket Table 桶表 数据加载到桶表时，会对字段取hash值，然后与桶的数量取模（hash mod分片）。把数据放到对应的文件中。
4.External Table 外部表 指向已经在HDFS中存在的数据，可以创建Partition，它和内部表在元数据的组织上是相同的，而实际数据的存储则有较大的差异：外部表只有一个过程，加载数据和创建表同时完成，并不会移动到数据仓库目录中，只是与外部数据建立一个链接。当删除一个外部表时，仅删除该链接。
 
Hive也有视图
CREATE VIEW v1 AS select * from t1;
 
Hive查询
SELECT [ALL | DISTINCT] select_expr, select_expr, ...
       FROM table_reference
       [WHERE where_condition]
       [GROUP BY col_list]
       [ CLUSTER BY col_list | [DISTRIBUTE BY col_list] [SORT BY col_list] | [ORDER BY col_list] ]
       [LIMIT number]
 
DISTRIBUTE BY，这个参数实质是指定分发器（Partitioner），终究Hive最终实现还是MapReduce。
对于分区表，可以基于Partition的查询，一般 SELECT 查询是全表扫描。但如果是分区表，查询就可以利用分区剪枝（input pruning）的特性，类似“分区索引“”，只扫描一个表中它关心的那一部分。Hive 当前的实现是，只有分区断言（Partitioned by）出现在离 FROM 子句最近的那个WHERE 子句中，才会启用分区剪枝。例如，如果 page_views 表（按天分区）使用 date 列分区，以下语句只会读取分区为‘2008-03-01’的数据。
 
JDBC Hive可以通过java的jdbc协议调用，但是事实上这个操作意义并不是很大，除非我们要一个数据分析的web应用，终究联机分析和联机事务处理还是有区别的（性能就是最大的区别）。
驱动类：org.apache.hadoop.hive.jdbc.HiveDriver；
连接字符串：jdbc:hive://ip:port/dbname。
 
Hive自定义函数UDF
-UDF：操作单个数据行，产生单个数据行
-UDAF：操作多个数据行，产生一个数据行
-UDOF：操作一个数据行，产生多个数据行一个表作为输出
 
UDF构建：
第一步：继承UDF或者UDAF或者UDTF，实现特定的方法。
第二步：将写好的类打包为jar。如hivefirst.jar.
第三步：进入到Hive外壳环境中，利用add jar /home/hadoop/hivefirst.jar.注册该jar文件
第四步：为该类起一个别名，create temporary function mylength as 'com.whut.StringLength';这里注意UDF只是为这个Hive会话临时定义的。
第五步：在select中使用mylength();
UDAF构建：
用户的UDAF必须继承了org.apache.hadoop.hive.ql.exec.UDAF；
用户的UDAF必须包含至少一个实现了org.apache.hadoop.hive.ql.exec的静态类，诸如常见的实现了 UDAFEvaluator。
一个计算函数必须实现的5个方法的具体含义如下：
-init()：主要是负责初始化计算函数并且重设其内部状态，一般就是重设其内部字段。一般在静态类中定义一个内部字段来存放最终的结果。
-iterate()：每一次对一个新值进行聚集计算时候都会调用该方法，计算函数会根据聚集计算结果更新内部状态。当输入值合法或者正确计算了，则就返回true。
-terminatePartial()：Hive需要部分聚集结果的时候会调用该方法，必须要返回一个封装了聚集计算当前状态的对象。
-merge()：Hive进行合并一个部分聚集和另一个部分聚集的时候会调用该方法。
-terminate()：Hive最终聚集结果的时候就会调用该方法。计算函数需要把状态作为一个值返回给用户。
 
UDTF构建：
编写自己需要的UDTF继承 org.apache.hadoop.hive.ql.udf.generic.GenericUDTF
实现initialize, process, close三个方法
UDTF首先会调用initialize方法，此方法返回UDTF的返回行的信息（返回个数，类型）。初始化完成后，会调用process方法，对传入的参数进行处理，可以通过forword()方法把结果返回。最后close()方法调用，对需要清理的方法进行清理。
UDTF有两种使用方法，一种直接放到select后面，一种和lateral view一起使用。
-直接select中使用：
select explode_map(properties) as (col1,col2) from src;
-不可以添加其他字段使用：
select a, explode_map(properties) as (col1,col2) from src
-不可以嵌套调用：
select explode_map(explode_map(properties)) from src
-不可以和group by/cluster by/distribute by/sort by一起使用：
select explode_map(properties) as (col1,col2) from src group by col1, col2
-和lateral view一起使用：
select src.id, mytable.col1, mytable.col2 from src lateral view explode_map(properties) mytable as col1, col2;
lateral view用于和split, explode等UDTF一起使用，它能够将一行数据拆成多行数据，在此基础上可以对拆分后的数据进行聚合。lateral view首先为原始表的每行调用UDTF，UTDF会把一行拆分成一或者多行，lateral view再把结果组合，产生一个支持别名表的虚拟表。
LATERAL VIEW udtf(expression) tableAlias AS columnAlias
其中 columnAlias是多个用’,’分割的虚拟列名，这些列名从属于表tableAlias
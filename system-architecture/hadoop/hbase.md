HBase：（AP，无事务锁）
===
1.存储（快）
2.KV查询
3.可靠性
4.负载均衡
 
HBase自身是不存在单点故障（Single Point of Failure – SPOF）
 
HBase:高可靠性，高性能，面向列，可伸缩的分布式存储系统。
 
传统数据库遇到的问题：对数据集大小 或读写并发性或两者兼容的伸缩性要求，RDBMS性能损失大
1.模式固定 2.拥有ACID特性 3.适用于信息管理系统类程序
cap原理，RDBMS主要关注的是ca 忽视了p
 
N+A模型
 
Sortedmap(Rowkey,List(SortedMap(Column,List<Value,Timestamp>)))
k     |      v(list(map(qualifier,value)))
rowkey   |      colf1/coflf2...
1     |      info
       |      name=xxx(timestamp),name=bbb(timestamp),name(del),sex=v,age=22
2     |      name=100,tail=ture
 
rowkey是任意字符串(maxLen 64KB，实际10-100bytes,内部是byte数组存储，按照byte order排序，在设计key时，要把经常一起读取的行存储放在一起
 
细数矩阵
id    name      sex  age tail
1     xxx  v     22   null
2     null  null  100 true
 
HLog是一个实现Write Ahead Log(WHL)的类，每次用户操作写入memStore的同事也要写份数据到HLog
 
数据首先同时被写入wal日志和memstore中，当memstore中的数据超过上限后，系统会将memstore中的数据写入到HFile中，当HFile到达一定阈值后将触发一次合并操作，这时多个HFile将合并成一个，当HFile的容量到达一定阈值后，系统将触发一次HRegion的分裂，分裂后的两个HRegion将重新被分配到不同的节点上。
 
-ROOT- .META. UserTable 三层结构
 
HBase 命令行 基于jruby语言实现的
$HBASE_HOME/bin/hbase shell
DDL:
create 'users','user_id','address','info'
list
describe 'users'
删除（两条语句）
disable 'users'
drop 'users'
exists 'users'
is_enabled 'users'
is_disabled 'users'
DML:
-添加记录
put 'users','xiaoming','info:age','24';
put 'users','xiaoming','info:birthday','1987-06-17';
put 'users','xiaoming','info:company','alibaba';
put 'users','xiaoming','address:contry','china';
-获取1个id的所有记录
get 'users','xiaoming'
-获取1个id，1个列族的所有数据
get 'users','xiaoming','info'
-获取一个id，一个列族中一个列的所有数据
get 'users','xiaoming','info：age'
-全表扫描
scan 'users'
-统计表的行数
count 'users'
更新记录
put 'users','xiaoming','info:age' ,'29'
 
//在{}中使用过滤条件，格式为过滤FILTER=>具体过滤器。
-获取单元格数据的版本数据
get 'users','xiaoming',{COLUMN=>'info:age',VERSIONS=>1}
-获取单元格数据的某个版本数据
get 'users','xiaoming',{COLUMN=>'info:age',TIMESTAMP=>1364874937056}
-删除xiaoming值的'info:age'字段
delete 'users','xiaoming','info:age'
-删除整行
deleteall 'users','xiaoming'
-清空表
truncate 'users'
 
HBase开发
-HBase常用类介绍
1.HBaseConfiguration 日本非法此类可以对HBase进行配置（静态代码块中配置）
2.HBaseAdmin 提供接口关系HBase数据库中的表信息
3.HTableDescriptor 包含了表名及表的列族信息
4.HColumnDescriptor 维护列族的信息
5.HTable HTable和HBase的表通信
6. PUT GET DELETE
7.ResultScanner 获取值的接口
 
8.过滤器 FilterList
-Filter.Operator.MUST_PASS_ALL
-FilterList.Operator.MUST_PASS_ONE
1 SingleColumnValueFilter 比较型 （被比较的对象，比较object(=,<),基准值（值，表达式））
2 ColumnPrefixFliter 前缀匹配型 MultipleColumnPrefixFilter
3 列名过滤器 QualifierFilter
4 Rowkey过滤器 RowFilter
 
HBase预切分表（HBase中为了提升并行插入数据的速度，进行表的预先切分）
-直接根据key计算
admin.createTable(desc, "a0".getBytes(), "a10000".getBytes(), 3);
-自定义切分
byte[][] regions = new
 byte[][] { Bytes.toBytes("a3333333"),Bytes.toBytes("a6666666") };
// 表示有三个region分别放入key：
// [1] start key: , end key: A
// [2] start key: A, end key: D
// [3] start key: D, end key:
admin.createTable(desc, regions);
 
配置backup master
1.在hbase的conf下增加文件backup-masters，在该文件里面增加backup master的机器列表，每台机器一条记录。
2.配置backup-masters的代码如下所示：
       slave1
3.整个集群启动后，在slave1的机器上也会启动hmaster的进程：
       4301 Jps
       4175 HMaster
4、查看slave1上该master的log，可以看到如下的信息：
       该信息说明，当前HBase集群有活动的hmaster节点，该hmaster节点为master，所以slave1节点开始等待，直到master上的hmaster挂掉。slave1会变成新的hmaster节点。
       当前的master挂掉后，backup master会接管，进而变成新的active master。
5.修改好配置后启动集群即可：
       #start-hbase.sh
 
Hbase高级
1.协处理器
0.92之后引入了coprocessors提供了一系列钩子，让我们能够轻易实现访问控制和二级索引的特性。下面简单介绍两种coprocessors
       a. Observers 类似触发器（写完后加载到table里面，先把文件打包成jar上传到hdfs路径下，操作后，之后插数据就会自动执行触发器了）
              1）RegionObserver：提供数据操作事件钩子
2）WALObserver：提供WAL相关事件钩子
3）MasterObserver：提供DDL操作事件钩子
       b. Endpoint 类似存储过程
2. bulkload
importtsv：Hbase提供的将HDFS数据转化为HBase数据库数据的工具，其实现过程是，将HDFS文件复制转化为HFile文件，然后将HFile移动并加载成为HBase的数据文件
3. bloom filter
HBase利用Bloomfilter来提供随机读（Get）的性能，对于顺序读（Scan）而言，设置BF没有作用。BF是一个列族级别的配置属性，会在HBase生成StoreFile时包含BF结构的数据（MetaBlock）。
BF如何提供（Get）的性能？使用BF不用遍历memstore及storefile将结果合并返回给客户端，利用BF可以过滤某些storefile
HBase中BF的类型及作用
Row：根据KV中的Row过滤StoreFile
RowCol：根据KV中的Row+Qualifier来过滤StoreFile
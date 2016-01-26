Big Data 大数据
===
SAAS 软件就是服务
PAAS 平台
IAAS 基础设施
XAAS 一切都是服务
 
大数据的特点：
数据量大
要求稳定并尽可能快的处理速度
数据类型繁多
从数据中可以获取有效信息
 
流计算 Storm
批量计算 MapReduce
流计算就是一边接收数据，一边与上一次计算的结果进行迭代运算，而批计算就更为传统了，就是设定定时任务来进行计算。
 
虚拟机与主机构成的闭环局域网的链接叫什么？
Host-only
 
### 三种加密方式：
单向：sha1,MD5，相当于完整性校验（指纹）
双向对称：des,aes 速度快，性能好，但是密钥容易被破解
双向非对称：rsa等，密钥成对出现（公钥加密私钥解密，私钥加密公钥解密），加密破解难度大，加密解密性能极差
故，采用公钥加密私钥签名
 
### Hadoop生态系统
OLTP数据库：Hbase，Cassandra
类SQL的MapReduce工具：Hive、Pig、Shark
DAG任务：Tez
数据挖掘（机器学习）算法工具包：Mahout,Mlib
并行计算框架：Huma
工作流：Oozie
集群管理：Zookeeper
日志收集：Flume，Scribe，Chukwa
ETL工具：Kettle，Sqoop
高速队列：Kafka
流计算：Storm
搜索框架：Lucene，Solr
集群任务管理：Yarn，Mesos
序列化框架：Thrift，ProtocoBuffers，Avro
图数据库：Neo4j，GraphX
内存数据库：Redis
 
DougCutting受Google三篇论文的启发 BigTable GFS MapReduce
Hadoop
HDFS，MapReduce，Hbase，Hive(SQL)，Zookeeper(重点)，Flume（日志搜集）
Sqoop/Kettle，Kafka，Lucene，Storm，Yarn，Thrift，GraphX，Radis2
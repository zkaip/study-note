Hadoop2 YARN 
===
Hadoop1缺陷：
●HDFS的局限性：
-资源隔离
-元数据扩展性
-访问效率
-数据丢失
●MapReduce的局限性：
-扩展性
集群最大节点数–4000，最大并发任务数–40000
-可用性
JobTracker负载较重
存在单点故障, 一旦故障，
所有执行的任务的全部失败
-批处理模式,时效性低
仅仅使用MapReduce一种计算方式
-低效的资源管理
把资源强制划分为 map task slot 和 reduce task slot, 当系统中只有 map task 或者只有 reduce task 的时候，会造成资源的浪费
hadoop1的资源调度核心概念:Slot,只能实现资源的静态管理和分配
 
Hadoop2的改进
由HDFS、MapReduce和YARN三个分支构成
HDFS：支持NN Federation、HA
MapReduce：运行在YARN上的MR，编程模型不变
YARN：资源管理系统等
 
YARN架构及组件
-ResourceManager -> ApplicationMaster|NodeManager <-Client
-NodeManager <- ResourceManager|Application <-Node资源
-ApplicationManager 数据切分，任务监控容错，为应用申请资源并分配任务
作业执行流程
-用户向YARN 中提交应用程序， 其中包括ApplicationMaster 程序、启动ApplicationMaster 的命令、用户程序等。
-ResourceManager 为该应用程序分配第一个Container， 并与对应的NodeManager 通信，要求它在这个Container 中启动应用程序的ApplicationMaster。
-ApplicationMaster 首先向ResourceManager 注册， 这样用户可以直接通过ResourceManage 查看应用程序的运行状态，然后它将为各个任务申请资源，并监控它的运行状态，直到运行结束，即重复步骤4~7。
-ApplicationMaster 采用轮询的方式通过RPC 协议向ResourceManager 申请和领取资源。
-一旦ApplicationMaster 申请到资源后，便与对应的NodeManager 通信，要求它启动任务。
-NodeManager 为任务设置好运行环境（包括环境变量、JAR 包、二进制程序等）后，将任务启动命令写到一个脚本中，并通过运行该脚本启动任务。
-各个任务通过某个RPC 协议向ApplicationMaster 汇报自己的状态和进度，以让ApplicationMaster 随时掌握各个任务的运行状态，从而可以在任务失败时重新启动任务。在应用程序运行过程中，用户可随时通过RPC 向ApplicationMaster 查询应用程序的当前运行状态。
-应用程序运行完成后，ApplicationMaster 向ResourceManager 注销并关闭自己。
Hadoop2核心概念:Container,实现资源动态管理和分配
 
Yarn支持CPU和内存两种资源调度方式，允许配置每个节点、每个任务可用的CPU和内存资源总量，可以根据实际需要和CPU性能将每个物理CPU划分成若干个
 
运行在YARN上带来的好处 如下：
-一个集群部署多个版本
-计算资源按需伸缩
-不同负载应用混搭，集群利用率高
-共享底层存储，避免数据跨集群迁移
 
Hadoop2架构与生具来的支持单点故障的缺陷
NameNode HA
-其利用共享存储在两个NN间同步edits信息,如NFS等中高端存储设备内部的各种RAID以及冗余硬件，DataNode同时向两个NN汇报块信息，让Standby NN保持集群最新状态。
-用FailoverController watchdog进程监视和控制NN进程，防止因 NN FullGC挂起无法发送heart beat
-防止脑裂（brain-split）：主备切换时由于切换不彻底等原因导致Slave误以为出现两个active master，通常采用Fencing机制：
       共享存储fencing，确保只有一个NN可以写入edits
       客户端fencing，确保只有一个NN可以响应客户端的请求
       DN fencing，确保只有一个NN可以向DN下发删除等命令
 
NameNode Federation
Federation由多个NameService组成，每个NameService又由一个或两个(HA)NN组成，每个NameNode会定义一个存储池，单独对外提供服务,多个NameNode共用集群里DataNode上的存储资源。使用客户端挂载表把不同的目录映射到不同的NameNode上，通过目录自动对应NameNode，使Federation的配置改动对应用透明。
 
Hadoop2安装
 
1 查行键 select * from 表; select * from 表 where xxx like xxx
2 查列族和列名
3 值过滤（功能级别，与性能无关）
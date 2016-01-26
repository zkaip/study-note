Hadoop
===
分布式运算：算法相同面对不同的数据//Orcle支持（大数据仅支持盘柜，ShareDisc，高一致性），Hadoop高分布式（ShareNothing，一致性不高）
 
Hadoop版本 Apache *
 
Hadoop核心项目
CORE 封装API，HDFS 分布式文件系统，MapReduce 并行计算框架
 
核心项目：
CORE：正如所有的项目都有一个核心包
HDFS: Hadoop Distributed File System 分布式文件系统
MapReduce：并行计算框架
 
HDFS采用主从结构，主节点，只有一个: namenode，从节点安装 datanodes，从节点可以有很多，也就是常用说的n+1结构。其中namenode负责接收用户操作请求、维护文件系统的目录结构、管理文件与block之间关系，block与datanode之间关系。
 
datanode负责存储文件、文件被分成block存储在磁盘上，为保证数据安全，文件会有多个副本。
 
MapReduce同样使用主从结构，主节点，只有一个: JobTracker
从节点安装 TaskTracker，TaskTracker可以有很多个，其中JobTracker负责接收客户提交的计算任务、把计算任务分给TaskTrackers执行、监控TaskTracker的执行情况，TaskTrackers负责执行JobTracker分配的计算任务。
 
Hadoop常用启停命令
start-all.sh
stop-all.sh
HDFS启停
start-dfs.sh
stop-dfs.sh
MapReduce启停
start-mapred.sh
stop-mapred.sh
NN启停命令
hadoop-daemon.sh start namenode
hadoop-daemon.sh stop namenode
SNN启停命令
hadoop-daemon.sh start secondarynamenode
hadoop-daemon.sh stop secondarynamenode
DN启停命令
hadoop-daemon.sh start datanode
hadoop-daemon.sh stop datanode
JobTracker启停命令
hadoop-daemon.sh start jobtracker
hadoop-daemon.sh stop jobtracker
TaskTracker启停命令
hadoop-daemon.sh start tasktracker
hadoop-daemon.sh stop tasktracker
 
JDK安装
bash rc
vi /etc/profile 系统级资源变量
vi ~/.bash
 
export 环境变量
more /etc/profile
less /etc/profile
vi /etc/sysconfig/network
vim /etc/hosts
 
vim /etc/resolv.conf 设置DNS
 
 
hadoop安装
1. setup 防火墙控制--关闭防火墙
2. service sshd start 开启SSH //SSCP远程拷贝协议
3. xShell 远程终端（SSH）
4. yum install lrzsz -> rz 上传文件 sz 下载文件
5. WinSCP 通过SFTP把jdk.bin传到CentOS上，然后./opt/jdk.bin
（#rpm -qa | grep java //#rpm -e --nodeps tzdata-java-2013i-1.el6.noarch
#rpm -e --nodeps java-1.7.0-openjdk-1.7.0.45-2.4.3.4.el6_5.x86_64 ）
6. /etc/profile 配置环境变量 source /etc/profile（刷新文件）
7. 设置一个叫做文件打开最大数的配置
#vi /etc/security/limits.conf
*        -       nproc          65535
*        -       nofile          65535
 
hadoop命令
hadoop [--config confdir][COMMAND][GENERIC_OPTIONS][COMMAND_OPTIONS]
 
Hadoop用户命令：
archive：用于创建Hadoop归档文件
distcp：从hadoop的文件系统并行复制大量数据。一般用于在两个HDFS集群中传输数据
fs：运行一个常规的文件系统客户端（该部分在HDFS命令行中详细描述）
fsck：运行HDFS文件系统检查工具
jar ：运行jar文件，向Hadoop提交作业（在mapreduce课程中操作使用）
job ：运行jar文件以及作业相关操作（在mapreduce课程中操作使用）
pipes：c接口作业，对我们Java人员没什么实质作用
version：打印Hadoop版本，升级的时候用，所以基本没什么用
classname： 可用于调调用任何类，一般都打成jar包作为作业运行，这个基本没用
 
管理命令：
balancer：运行集群平衡工具
daemonlog ：获取或设置每个守护进程的日志级别
dfsadmin ：运行一个HDFS的dfsadmin客户端 -report -safemode
namenode ：运行namenode [-format] | [-upgrade] | [-rollback] | [-finalize] | [-importCheckpoint]
secondarynamenode ：运行HDFS的secondary namenode
datanode：运行一个HDFS的datanode
jobtracker ：运行MapReduce job Tracker节点
tasktracker：运行MapReduce的task Tracker节点
 
Hadoop添加删除节点（拓扑结构升级，节点软件升级）
1.拷贝含运行环境的DN节点到新的主机上并设置好ip等基本配置
2.修改集群中/etc/hosts以及slaves的配置文件
3.在新节点上启动
       hadoop-daemon.sh start datanode
       hadoop-daemon.sh start tasktracker
4.均衡block start-balancer.sh
5.优化balance参数
       <name>dfs.balance.bandwidthPerSec</name>
       <value>10485760</value>//优化到10M
Hadoop删除节点
1.<name>dfs.hosts.exclude</name>
<value>slave3</value>
或
<property>
<name>dfs.hosts.exclude</name>
<value>/data/soft/hadoop/conf/exclude</value>
</property> exclude文件竖着列出所有要下架的主机名
2.hadoop dfsadmin -refreshNodes
3.关闭下架节点上的hadoop服务
4.物理机器下架
5.hadoop dfsadmin -report
 
Hadoop升级流程
1.确保前一次升级完成 hadoop dfsadmin -upgradeProgress status
2.数据备份
#hadoop fs –lsr / > ~/namenode.log
#hadoop fsck / >> ~/namenode.log
#cp –r ${dfs.name.dir} ~/namenode_bak
3.停止hadoop集群 stop-all.sh
4.把${dfs.name.dir}目录下的所有内容复制到新配置的路径下
5.将新版本的Hadoop程序和配置文件分发到整个集群
6.重新执行第2不命令，如果没问题则升级成功 hadoop dfsadmin -finalizeUpgrade
7.如果失败关闭集群 #stop-all.sh
8.回滚 syary-dfs.sh-rollback
HDFS
===
默认三份数据
主从结构 N+1
 
HDFS命令行
-help [cmd]    //显示命令的帮助信息
-ls(r) <path>    //显示当前目录下所有文件
-du(s) <path>    //显示目录中所有文件大小
-count[-q] <path>    //显示目录中文件数量
-mv <src> <dst>    //移动多个文件到目标目录
-cp <src> <dst>    //复制多个文件到目标目录
-rm(r)        //删除文件(夹)
-mkdir <path>    //创建文件夹
-touchz <path>    //创建一个空文件
 
-cat <src>    //在终端显示文件内容
-text <src>    //在终端显示文件内容
-tail [-f] <src>      //在终端显示文本内容
-getmerge <src> <localdst>//将源目录中的所有文件排序合并到一个本地文件中
 
-put <localsrc> <dst>    //本地文件复制到hdfs
-get [-ignoreCrc] <src> <localdst>    //复制文件到本地，可以忽略crc校验
-copyFromLocal    //本地文件复制到hdfs
-copyToLocal [-ignoreCrc] <src> <localdst>    //复制到本地
-moveFromLocal    //从本地文件移动到hdfs
-moveToLocal <src> <localdst> //移动到本地
 
NN结构
fsimage：元数据镜像文件。存储某一时段NameNode内存元数据信息。
edits：操作日志文件。
fstime：保存最近一次checkpoint的时间
version：HDFS的版本信息
 
SNN结构//默认安装在NN节点上，负担过重，尽量独立节点安装
合并日志使用，执行过程：
从NameNode上下载元数据信息（fsimage,edits），
把二者合并，生成新的fsimage，在本地保存，并将其推送到NameNode，同时重置NameNode的edits.
 
DN结构
真实文件数据存储服务 block是最基本的存储单位 默认64MB，和普通文件系统不同＜64MB不会补齐，目录中数据块到达一定数量将创建子文件夹
支持高可用性Replication机制（默认三个副本）
 
集群心跳机制☆ RPC
master启动，开一个ipc server
slave启动每隔3秒向master发送 “心跳”状态信息告诉master
master通过心跳的返回值，向slave节点传达指令周期性接收 “心跳”和Blockreport（Datanode上所有block组成列表）
 
机架感知机制
Hadoop对机架的感知不是默认判断实现的，需要开发扩展脚本来使得Hadoop有机架的感知能力，其实就是从脚本中指定哪些节点通过HashCode后MOD到哪个机架。
 
HDFS开发：API
1.得到Configuration对象
2.得到FileSystem对象
3.进行文件操作
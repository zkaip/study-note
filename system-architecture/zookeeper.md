Zookeeper
===
提供通用的分布式锁服务，用以协调分布式应用：
Hbase中使用Zookeeper的事件处理确保整个集群只有一个Hmaster，Hbase中察觉HRegionServer联机和宕机,存储访问控制列表等。
 
Zookeeper数据结构为层次化的目录结构，命名符合常规文件系统规范，每个节点在zookeeper中叫做znode,并且其有一个唯一的路径标识。节点Znode可以包含数据和子节点，Znode中的数据可以有多个版本，比如某一个路径下存有多个数据版本，那么查询这个路径下的数据就需要带上版本，客户端应用可以在节点上设置监视器。
 
Zookeeper命令行工具:运行 zkCli.sh –server <ip>进入命令行工具：
create /zk myData 创建了一个新的 znode 节点“ zk ”以及与它关联的字符串
 
四字命令 yum install nc(ZooKeeper管理命令)
dump 该命令针对Leader执行，用于输出所有等待队列中的会话和临时节点的信息
ruok 用于测试server是否处于无措状态，正常返回 imok
stat 输出server简要状态和连接客户端信息
kill 关闭server
 
Zookeeper特性
1.Zookeeper是一个由多个server组成的集群，一个leader，多个follower。每个server保存一份数据副本，全局数据一致。
2.全局唯一数据视图，client无论连接到哪个server，数据视图都是一致的。
3.分布式读写，更新请求转发，由leader实施，更新请求顺序进行，来自同一个client的更新请求按其发送顺序依次执行，数据更新原子性，一次数据更新要么成功，要么失败。在一定时间范围内，client能读到最新数据。
 
Zookeeper开发
-String create(String path, byte[] data, List<ACL> acl, CreateMode createMode)
-Stat exists(String path, boolean watch)
-void delete(String path, int version)
-List<String> getChildren(String path, boolean watch)
-List<String> getChildren(String path, boolean watch)
-Stat setData(String path, byte[] data, int version)
-byte[] getData(String path, boolean watch, Stat stat)
-void addAuthInfo(String scheme, byte[] auth)
 
Zookeeper应用案例：
-统一命名服务 Name Service
-配置管理
-集群管理
-共享锁
-同步队列
 
zookeeper在HBase中的作用?
利用选举算法解决了HBase的hmaster的HA问题，主要实现是多个master同时争抢建立一个临时文件，建立成功的作为active，其余的作为standby。处于standby的继续监听文件的变化，如果active的掉线则临时文件被删除，然后重复争抢过程。
利用集群管理算法解决了hregionserver的管理问题，所有的hregionserver都注册到zookeeper上建立临时文件，然后监听文件夹变化，如果有变化则集群拓扑变化。
 
如何获取链接zookeeper的客户端的信息?
echo stat | nc zookeeperip zookeeperport
 
如何用zookeeper实现一个普通的1对多fifo队列?
首先生产者通过建立永久的根znode建立一个消息通道，可以理解为一个主题队列，然后生产者在这个文件夹下建立永久节点，节点中保存的即是需要传输的数据，并且节点使用seq的方式建立。客户端订阅队列缓存这个seq当前值，并且不停地轮循读取修改本地缓存的seq值。
为了节省空间，可以轮用seq值或者删除先前建立的数据节点。
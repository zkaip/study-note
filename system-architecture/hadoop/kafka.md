Kafka（消息队列）
===
提供了类似于JMS的特性,包含如下组件：
Producer (生产者)
Broker (中间人)
Consumer（消费者）
 
Kafka的实现类似于JMS的Topic模式，一个Topic可以认为是一类信息，每个topic将被分为多个partition，每个partition在存储层面是append log文件。任何发布到此partition的消息都会被直接追加到log文件的尾部，每条消息在文件中的位置称为offset,offset为一个long型数字，唯一标记一条消息。kafaka没有提供额外的索引存储offset，因为kafka中几乎不允许对消息进行随机读写
Topic（主题）-Partition（分区）-Commit log（消息）
 
kafka即使消息被消费也不会被立刻删除，根据配置时间来释放磁盘空间
consumer一般来说顺序消费消息，但是事实上consumer可以使用任意顺序消费消息（设置offset），offset保存在zookeeper中
kafka集群不需要维护任何consumer和producer状态信息（极其轻量级），这些信息由zookeeper保存
可以将一个topic切分任意多个partions（将内容分散到多个server上）来提高消费消息的效率，有效提高并发消费的能力，还可以配置partitions需要备份的个数(replicas)，以提高可用性，leader会均衡的分散到每个实例上来确保整体的性能稳定
 
发送到partitions中的消息将会按照它接收的顺序追加到日志中，对于消费者而言，它们消费消息的顺序和日志中消息顺序一致，如果Topic的"replication factor"为N，那么允许N-1个kafka实例失效。
 
Producer->Topic(同时Producer也能决定将此消息归属于哪个partition;比如基于"round-robin"方式或者通过其他的一些算法等)
Consumers<-consumer group<-partition
 
Producer发布消息时，kafka client先构造一条消息，将消息加入到消息集set中（kafka支持批量发布，可以往消息集合中添加多条消息，一次行发布），send消息时，client需指定消息所属的topic
Consumer订阅消息时，kafka client需指定topic以及partition num（每个partition对应一个逻辑日志流，如topic代表某个产品线，partition代表产品线的日志按天切分的结果），client订阅后，就可迭代读取消息，如果没有消息，client会阻塞直到有新的消息发布。consumer可以累积确认接收到的消息，当其确认了某个offset的消息，意味着之前的消息也都已成功接收到，此时broker会更新zookeeper上地offset registry（后面会讲到）。
 
Kafka的保证(Guarantees)
-生产者发送到一个特定的Topic的分区上的消息将会按照它们发送的顺序依次加入,消费者收到的消息也是此顺序
-如果一个Topic配置了复制因子( replication facto)为N，那么可以允许N-1服务器当掉而不丢失任何已经增加的消息
 
用例 (Use CASE)
-消息系统，例如ActiveMQ 和 RabbitMQ.
-站点的用户活动追踪。用来记录用户的页面浏览，搜索，点击等。
-操作审计。用户/管理员的网站操作的监控。
-日志聚合。收集数据，集中处理。
-流处理。
-[Event sourcing] (http://martinfowler.com/eaaDev/EventSourcing.html)
-Commit Log

Linkin 设置Kafka作为数据流的通用管道，每个系统能够反馈到中央管道(类似SOA中央总线ESB)，应用系统或流处理器能够创建和传递新的数据流，然后再反馈到各种系统服务中，良好数据格式的持续送入在多个系统之间扮演了一种 lingua franca(通用语言)。
举例来说，如果一个用户更新了他的配置，那么这种更新也许会流入到这个流处理层，在那里会被处理成标准的公司信息 地理位置和其他该用户的配置属性，然后，流可能进入搜索索引和用于查询的社会图谱，也可能进入为推荐工作机会的匹配推荐系统，所有这些都是发生毫秒级别，这一流程将会加载到Hadoop中提供数据给数据仓库环境。
　　Kafka每天处理大概500 billion的事件，它已经成为各种系统之间的数据流骨干，成为Hadoop数据核心管道和流处理中心。

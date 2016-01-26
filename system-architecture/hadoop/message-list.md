消息队列
===
消息系统的作用：异步处理、削减峰值、减少组件之间的耦合。

选择消息系统根据业务需要需要考虑以下几个方面：
是否持久化
吞吐能力
高可用
分布式扩展能力
兼容现有协议
易于维护
其他，如消息丢失和重复的处理
避免单点故障
负载均衡

常见消息系统协议:
STOMP
AMQP
类似 MEMCACHE 的协议
HTTP
自定格式

1、2 是不错的可选开源组件：

Kafka/MetaQ: 广泛用于 Linkedin 内部 (类似有 Java 版本的国产 MetaQ)

由于优先考虑吞吐，更加适合大数据量的消息收集和处理，比如日志分析、用户行为信息实时报表、集群状态信息收集和分析。

优先考虑持久化的设计,依靠 page cache 管理内存
高吞吐 112MB/s 11K msgs/s (比 beanstalkd >70x 吞吐能力)
支持异步复制
高可用、基于 Zookeeper 的集群设计、支持消费者失效后重新负载均衡
Kafka 提供 PHP 类库
支持 ganglia JMX 监控
需要策略避免重复消息, 消费者更新 Zookeeper 的 offset 的方式 (MetaQ 已经提供了几种方式避免消息重复)
MetaQ 提供 HTTP 接口

http://www.mail-archive.com/kafka-users@incubator.apache.org/msg02082.html
https://github.com/neophenix/StateOfTheMQ/blob/master/state_of_the_mq.pdf?raw=true
http://s.urge.omniti.net/i/content/slides/Surge2012-ErikOnen_Kafka_Messaging-Paradigms.pdf
http://dirlt.com/kafka.html
http://dirlt.com/index.html
http://wiki.secondlife.com/wiki/Message_Queue_Evaluation_Notes

2. NSQ – Golang

无中心设计、节点自动注册和发现。可以考虑作为内部通讯框架的基础。

https://github.com/bitly/nsq
* 追求简单部署
* 追求高可用、避免单点故障、无中心设计
* 确保消息送达
* 生产者消费者自动发现、消费者连接所有生产者、向消费者推的模式
* 提供 HTTP 接口

https://speakerdeck.com/snakes/nsq-nyc-golang-meetup
https://github.com/davegardnerisme/nsqphp
http://www.davegardner.me.uk/blog/tag/nsq/

3. Beanstalkd

支持持久化 binlog 设计，重启消息不丢失
一般
无高可用设计
和 memcached 一样的分布式扩展方式
各种类库
有 Web 管理工具
支持同步调用，等待返回
只有类似 Memcache TCP ASCII 协议, 单文件部署
支持消息优先级
9K jobs/s 入队列 5K jobs/s 出队列
单点故障
无主从同步复制机制
最好单机多实例部署
https://github.com/kr/beanstalkd/wiki/Tools
https://github.com/pda/pheanstalk

4. Redis

需要自己封装 Pub/Sub

基于 Redis 的复制高可用

其他常见开源消息系统：

ZeroMQ: 轻量级基础消息库

只适合不需要持久化的场景、需要自己封装

不支持持久化，只提供消息分发, 性能最好
无 Broker 设计, 无中心故障

RabbitMQ
2500 job/s 入队列 1300 job/s 出队列
适合小消息
分布式无单点设计
底层为 Erlang 实现
有评论: RabbitMQ could not enqueue/dequeue fast enough.

https://blogs.vmware.com/vfabric/2013/04/how-fast-is-a-rabbit-basic-rabbitmq-performance-benchmarks.html

RESTMQ
http://restmq.com/

MemcacheQ
http://memcachedb.org/memcacheq/

HTTPSQS
https://code.google.com/p/httpsqs/

Gearman
http://gearman.org/presentations
https://code.google.com/p/shard-query/

Kestrel
http://robey.github.io/kestrel/
http://robey.github.io/kestrel/docs/guide.html

HornetQ
性能差不考虑[3]

Resque
3800 jobs/s 入队列 300 jobs/s 出队列
https://github.com/blog/542-introducing-resque
基于 Redis 的消息队列

Starling
https://github.com/starling/starling

SquirrelMQ
https://code.google.com/p/squirrel-message-queue/

Sparrow – Ruby
https://code.google.com/p/sparrow/

Apache ActiveMQ
ActiveMQ crashed constantly under load.

STOMP HTTP 协议
http://stomp.github.io/stomp-specification-1.2.html

参考:
http://hiramchirino.com/stomp-benchmark/ec2-c1.xlarge/index.html
https://blog.serverdensity.com/queueing-mongodb-using-mongodb/
http://x-aeon.com/wp/2013/04/10/a-quick-message-queue-benchmark-activemq-rabbitmq-hornetq-qpid-apollo/
https://news.ycombinator.com/item?id=5531192
http://www.javaplex.com/blog/high-performance-message-queues-get-reviewed/
http://adam.heroku.com/past/2010/4/24/beanstalkasimpleandfastqueueingbackend/
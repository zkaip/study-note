Redis (K,V) 数据库
===
### Redis 概述
Redis是一款开源的、高性能的键-值存储（key-value store）。Redis的键值可以包括字符串（strings）类型，同时它还包括哈希（hashes）、列表（lists）、集合（sets）和有序集合（sorted sets）等数据类型。对于这些数据类型，可以执行原子操作。
Redis采用了内存数据集的方式，并且支持数据持久化，可以每隔一段时间将数据集转存到磁盘上（snapshot），或者在日志尾部追加每一条操作命令（append only file,AOF）。
Redis支持主从复制（master-slave replication），并且具有非常快速的非阻塞首次同步（ non-blocking first synchronization）、网络断开自动重连等功能。同时Redis还具有其它一些特性，其中包括简单的事物支持、发布订阅（ pub/sub）、管道（pipeline）和虚拟内存（vm）等，Redis具有丰富的客户端，支持现阶段流行的大多数编程语言。Java常用的是Jedis。
Redis默认支持snapshot和AOF两种持久化机制，前者会定期的进行数据的内存映射磁盘持久化，后者则是通过日志的方式对数据进行持久化，前者恢复数据速度快，但是当集中进行持久化的时间到来时将是高并发访问的噩梦，而AOF的问题正好相反，AOF重启恢复的速度不够好，但是数据持久化几乎不影响redis对外的基本服务。
 
### Reids的优势
•1. 可用性：Master-Slave（主从）集群，实现高可用性(HA)
•2. 易用性：丰富的数据结构支持：List、Set、Hash
•3. 可靠性：持久化数据(可以备份到硬盘,断电不丢失数据，代价是内存消耗偏大)
 
**Radis**
类似很大的HashMap(默认16个链表）
存储格式：dict(两个table)
高性能的、基于内存的、Key-Value格式的存储系统（内存数据库）
官方测试结果，单机redis的效率：读的速度是110000次/s 写的速度是81000次/s
 
**REDIS与传统数据库的区别：**
-Redis的数据都存储在内存中:快
-Redis采用Key-Value形式保存数据(Map)
-Redis是一款高性能的NoSQL（不仅仅是SQL）数据库
       没有where，group by，order by没有传统数据库的表、列、行概念
 
rehash:激活 ratio=used/size
1.ratio>=1且dict_can_rize为真
2.ratio>变量dict_force_size
 
### 持久化方式
- AOF日志：持久化块，恢复慢（写多读少）
- RDB快照：持久化慢，恢复快（写少读多，适合灾难恢复）
- 妥协方式：定时生成RDB快照，随后的用日志备份
 
AOF过程：Radis将Log->MemBuffer->通过fsync功能写入硬盘(硬盘缓冲区->硬盘)
RDB快照可以配置多个
 
**Redis数据类型 (Key,Value)**
- Key:非二进制安全的字符类型（ not binary-safe strings ）“my key”和“mykey\n”这样包含空格和换行的key是不允许的。在使用的时候可以自己定义一个Key的格式(例如 object-type:id:field)
- value:String/List/Set/SortedSet/Hash
 
### Key相关命令
- exits key 测试指定key是否存在，返回1表示存在，0不存在
- del key1 key2 ....keyN  删除给定key,返回删除key的数目，0表示给定key都不存在
- type key返回给定key的value类型。返回 none 表示不存在，key有string字符类型，list 链表类型 set 无序集合类型等...
- keys pattern 返回匹配指定模式的所有key（支持*，？，[abc ]的方式）
- random key 返回从当前数据库中随机选择的一个key,如果当前数据库是空的，返回空串
- rename oldkey newkey 原子的重命名一个key,如果newkey存在，将会被覆盖，返回1表示成功，0失败。失败可能是oldkey不存在或者和newkey相同
- renamenx oldkey newkey 同上，但是如果newkey存在返回失败
- dbsize 返回当前数据库的key数量
- expire key seconds 为key指定过期时间，单位是秒。返回1成功，0表示key已经设置过过期时间或者不存在
- EXPIREAT key timestamp 为 key 设置生存时间。不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
- persist key 使用 PERSIST 命令可以在不删除 key 的情况下，移除 key 的生存时间，让 key 重新成为一个『持久的』(persistent) key
- ttl key 返回设置了过期时间的key的剩余过期秒数， -1表示key不存在或者没有设置过过期时间
- select db-index 通过索引选择数据库，默认连接的数据库所有是0,默认数据库数是16个。返回1表示成功，0失败
- move key db-index  将key从当前数据库移动到指定数据库。返回1成功。0 如果key不存在，或者已经在指定数据库中
- dump key 序列化给定的key，并返回被序列化的值，如果 key 不存在，那么返回 nil 。使用restore命令可以将这个值反序列化为Redis键。序列化生成的值有以下几个特点：
它带有 64 位的校验和，用于检测错误， RESTORE 在进行反序列化之前会先检查校验和。 
值的编码格式和 RDB 文件保持一致。 
RDB 版本会被编码在序列化值当中，如果因为 Redis 的版本不同造成 RDB 格式不兼容，那么Redis 会拒绝对这个值进行反序列化操作。
序列化的值不包括任何生存时间信息
- flushdb 删除当前数据库中所有key,此方法不会失败。慎用
- flushall 删除所有数据库中的所有key，此方法不会失败。更加慎用
- BLPOP key [key ...] timeout BLPOP 是列表的阻塞式(blocking)弹出原语。它是 LPOP 命令的阻塞版本，当给定列表内没有任何元素可供弹出的时候，连接将被 BLPOP 命令阻塞，直到等待超时或发现可弹出元素为止。不同的客户端被放进一个队列中，按『先阻塞先服务』(firstBLPOP， firstserved) 的顺序为 key 执行 BLPOP 命令。
 
### String相关命令（最大上限是1G字节。如果只用string类型，redis就可以被看作加上持久化特性的memcached）
- set key value设置key对应的值为string类型的value,返回1表示成功，0失败
- setnx key value同上，如果key已经存在，返回0 。nx 是not exist的意思
- get key获取key对应的string值,如果key不存在返回nil
- getset key value设置key的值，并返回key的旧值。如果key不存在返回nil
- mget key1 key2 ... keyN 一次获取多个key的值，如果对应key不存在，则对应返回nil。
- mset key1 value1 ... keyN valueN一次设置多个key的值，成功返回1表示所有的值都设置了，失败返回0表示没有任何值被设置
- msetnx key1 value1 ... keyN valueN同上，但是不会覆盖已经存在的key
- incr key对key的值做加加操作,并返回新的值。注意incr一个不是int的value会返回错误，incr一个不存在的key，则设置key为1
- decr key同上，但是做的是减减操作，decr一个不存在key，则设置key为-1
- incrby key integer同incr，加指定值，key不存在时候会设置key，并认为原来的value是 0
- decrby key integer 同decr，减指定值。decrby完全是为了可读性，我们完全可以通过incrby一个负值来实现同样效果，反之一样。
- append key value给指定key的字符串值追加value,返回新字符串值的长度。
- substr key start end返回截取过的key的字符串值,注意并不修改key的值。下标是从0开始的。
 
### List相关命令

redis的list类型其实就是一个每个子元素都是string类型的双向链表。我们可以通过push,pop操作从链表的头部或者尾部添加删除元素。这使得list既可以用作栈，也可以用作队列

list的pop操作还有阻塞版本的。当我们[lr]pop一个list对象是，如果list是空，或者不存在，会立即返回nil。但是阻塞版本的b[lr]pop可以则可以阻塞，当然可以加超时时间，超时后也会返回nil。

为什么要阻塞版本的pop呢，主要是为了避免轮询。举个简单的例子如果用list来实现一个工作队列。执行任务的thread可以调用阻塞版本的pop去获取任务这样就可以避免轮询去检查是否有任务存在。当任务来时候工作线程可以立即返回，也可以避免轮询带来的延迟。

- lpush key string在key对应list的头部添加字符串元素，返回1表示成功，0表示key存在且不是list类型
- rpush key string同上，在尾部添加
- llen key返回key对应list的长度，key不存在返回0,如果key对应类型不是list返回错误
- lrange key start end返回指定区间内的元素，下标从0开始，负值表示从后面计算，- 1表示倒数第一个元素，key不存在返回空列表
- ltrim key start end截取list，保留指定区间内元素，成功返回1，key不存在返回错误
- lset key index value设置list中指定下标的元素值，成功返回1，key或者下标不存在返回错误
- lrem key count value从key对应list中删除count个和value相同的元素。count为0时候删除全部
- lpop key从list的头部删除元素，并返回删除元素。如果key对应list不存在或者是空返回nil，如果key对应值不是list返回错误
- rpop同上，但是从尾部删除
- blpop key1...keyN timeout从左到右扫描返回对第一个非空list进行lpop操作并返回，比如blpop list1 list2 list3 0 ,如果list不存在，list2,list3都是非空则对list2做lpop并返回从list2中删除的元素。如果所有的list都是空或不存在，则会阻塞timeout秒，timeout为0表示一直阻塞。
当阻塞时，如果有client对key1...keyN中的任意key进行push操作，则第一在这个key上被阻塞的client会立即返回。如果超时发生，则返回nil。
- brpop 同blpop，一个是从头部删除一个是从尾部删除
- rpoplpush srckey destkey从srckey对应list的尾部移除元素并添加到destkey对应list的头部,最后返回被移除的元素值，整个操作是原子的.如果srckey是空，或者不存在返回nil
- KEYS pattern  查找所有符合给定模式 pattern 的 key (KEYS 的速度非常快，但在一个大的数据库中使用它仍然可能造成性能问题，如果你需要从一个数据集中查找特定的 key ，你最好还是用 Redis 的集合结构(set)来代替。)
    - KEYS * 匹配数据库中所有 key 。
    - KEYS h?llo 匹配 hello ， hallo 和 hxllo 等。
    - KEYS h*llo 匹配 hllo 和 heeeeello 等。
    - KEYS h[ae]llo 匹配 hello 和 hallo ，但不匹配 hillo 。
- 特殊符号用 \ 隔开
 
### Set相关命令
redis的set是string类型的无序集合。set元素最大可以包含(2的32次方-1)个元素。set的是通过hash table实现的，hash table会随着添加或者删除自动的调整大小，关于set集合类型除了基本的添加删除操作，其他有用的操作还包含集合的取并集(union)，交集(intersection)，差集(difference)。通过这些操作可以很容易的实现sns中的好友推荐和blog的tag功能。
- sadd key member 添加一个string元素到,key对应的set集合中，成功返回1,如果元素以及在集合中返回0,key对应的set不存在返回错误
- srem key member 从key对应set中移除给定元素，成功返回1，如果member在集合中不存在或者key不存在返回0，如果key对应的不是set类型的值返回错误
- spop key 删除并返回key对应set中随机的一个元素,如果set是空或者key不存在返回nil
- srandmember key 同spop，随机取set中的一个元素，但是不删除元素
- smove srckey dstkey member 从srckey对应set中移除member并添加到dstkey对应set中，整个操作是原子的。成功返回1,如果member在srckey中不存在返回0，如果key不是set类型返回错误
- scard key 返回set的元素个数，如果set是空或者key不存在返回0
- sismember key member 判断member是否在set中，存在返回1，0表示不存在或者key不存在
- sinter key1 key2...keyN 返回所有给定key的交集
- sinterstore dstkey key1...keyN 同sinter，但是会同时将交集存到dstkey下
- sunion key1 key2...keyN 返回所有给定key的并集
- sunionstore dstkey key1...keyN 同sunion，并同时保存并集到dstkey下
- sdiff key1 key2...keyN 返回所有给定key的差集
- sdiffstore dstkey key1...keyN 同sdiff，并同时保存差集到dstkey下
- smembers key 返回key对应set的所有元素，结果是无序的
 
### SortSet相关命令
和set一样sorted set也是string类型元素的集合，不同的是每个元素都会关联一个double类型的score。sorted set的实现是skip list和hash table的混合体。当元素被添加到集合中时，一个元素到score的映射被添加到hash table中，另一个score到元素的映射被添加到skip list，并按照score排序，所以就可以有序的获取集合中的元素。

- zadd key score member 添加元素到集合，元素在集合中存在则更新对应score
- zrem key member 删除指定元素，1表示成功，如果元素不存在返回0
- zincrby key incr member 增加对应member的score值，然后移动元素并保持skiplist有序。返回更新后的score值
- zrank key member 返回指定元素在集合中的排名（下标，非score）集合中元素是按score从小到大排序的
- zrevrank key member 同上,但是集合中元素是按score从大到小排序
- zrange key start end 类似lrange操作从集合中取指定区间的元素。返回的是有序结果
- zrevrange key start end 同上，返回结果是按score逆序的
- zrangebyscore key min max 返回集合中score在给定区间的元素
- zcount key min max 返回集合中score在给定区间的数量
- zcard key 返回集合中元素个数
- zscore key element  返回给定元素对应的score
- zremrangebyrank key min max 删除集合中排名在给定区间的元素
- zremrangebyscore key min max 删除集合中score在给定区间的元素 

### Hash相关命令
redis hash是一个string类型的field和value的映射表。
- hash特别适合用于存储对象。相较于将对象的每个字段存成单个string类型。将一个对象存储在hash类型中会占用更少的内存，并且可以更方便的存取整个对象。
- hset key field value设置hash field为指定值，如果key不存在，则先创建
- hget key field 获取指定的hash field
- hmget key filed1....fieldN 获取全部指定的hash filed
- hmset key filed1 value1 ... filedN valueN 同时设置hash的多个field
- hincrby key field integer 将指定的hash filed 加上给定值
- hexists key field 测试指定field是否存在
- hdel key field 删除指定的hash field
- hlen key 返回指定hash的field数量
- hkeys key 返回hash的所有field
- hvals key 返回hash的所有value
- hgetall 返回hash的所有filed和value
 
### Redis事务
Redis对事务支持比较简单，redis只能保证一个client发起的事务中的命令可以连续执行，中间不会插入其他client的命令
1.Multi 事务开始
2.Exec 执行事务
3.Discard 放弃事务
4.Watch 监听key
5.Unwatch 放弃所有key的监听
key如果调用watch后发生变化，则事务失效
 
### Redis发布/订阅(pub/sub<-chanel)
- subscribe          用于订阅普通的队列
- unsubscribe      用于取消队列
- psubscribe 用于订阅组队列的信息
- punsubscribe    用于取消队列组的订阅
- publish              用于发布消息到主题
- pubsub             用于监控队列的状态

消息队列编组：除了发布数据到简单的队列，还可以将队列进行编组，通过‘.’来进行队列组划分，下图是将数据发布到某个组的队列中：
- pubsub channels列出所有的队列
- pubsub channels a.* 列出所有a组队列的订阅
- pubsub numsub a.* a组队列订阅个数
- pubsub numpat 订阅模式个数（多个用户订阅相同的模式比如 psubscribe a.b，这个命令统计出来的是多个而不是就一种模式，此处应用要注意） 

### 脚本
- EVAL script numkeys key [key ...] arg [arg ...]  Redis 2.6.0 版本开始，通过内置的 Lua 解释器，可以使用         EVAL 命令对 Lua 脚本进行求值。脚本是原子性的。
- 带宽和 EVALSHA
- 脚本缓存
- SCRIPT FLUSH ：清除所有脚本缓存
- SCRIPT EXISTS ：根据给定的脚本校验和，检查指定的脚本是否存在于脚本缓存
- SCRIPT LOAD ：将一个脚本装入脚本缓存，但并不立即运行它
- SCRIPT KILL ：杀死当前正在运行的脚本
- 脚本应该被写成纯函数(pure function)
- 全局变量保护
- 使用脚本散发 Redis 日志
- 沙箱(sandbox)和最大执行时间
- 流水线(pipeline)上下文(context)中的 EVALSHA

### Redis 应用
**导航会话**
假设你有一项 web 服务，打算根据用户最近访问的 N 个页面来进行物品推荐，并且假设用户停止阅览
超过 60 秒，那么就清空阅览记录(为了减少物品推荐的计算量，并且保持推荐物品的新鲜度)。
这些最近访问的页面记录，我们称之为『导航会话』(Navigation session)，可以用 INCR 和 RPUSH 命
令在 Redis 中实现它：每当用户阅览一个网页的时候，执行以下代码：
MULTI
RPUSH pagewviews.user:<userid> http://.....
EXPIRE pagewviews.user:<userid> 60
EXEC
如果用户停止阅览超过 60 秒，那么它的导航会话就会被清空，当用户重新开始阅览的时候，系统又会
重新记录导航会话，继续进行物品推荐。使用 bitmap 实现用户上线次数统计

**使用 bitmap 实现用户上线次数统计**
假设现在我们希望记录自己网站上的用户的上线频率，比如说，计算用户 A 上线了多少天，用户 B 上
线了多少天，诸如此类，以此作为数据，从而决定让哪些用户参加 beta 测试等活动 —— 这个模式可以
使用 SETBIT 和 BITCOUNT 来实现。
比如说，每当用户在某一天上线的时候，我们就使用 SETBIT ，以用户名作为 key ，将那天所代表的网
站的上线日作为 offset 参数，并将这个 offset 上的为设置为 1 。
举个例子，如果今天是网站上线的第 100 天，而用户 peter 在今天阅览过网站，那么执行命令
SETBIT peter 100 1 ；如果明天 peter 也继续阅览网站，那么执行命令 SETBIT peter 101 1 ，以此类
推。
当要计算 peter 总共以来的上线次数时，就使用 BITCOUNT 命令：执行 BITCOUNT peter ，得出的结果
就是 peter 上线的总天数。

**计数器**
计数器是 Redis 的原子性自增操作可实现的最直观的模式了，它的想法相当简单：每当某个操作发生
时，向 Redis 发送一个 INCR 命令。
比如在一个 web 应用程序中，如果想知道用户在一年中每天的点击量，那么只要将用户 ID 以及相关的
日期信息作为键，并在每次用户点击页面时，执行一次自增操作即可。
比如用户名是 peter ，点击时间是 2012 年 3 月 22 日，那么执行命令 INCR peter::2012.3.22 。
可以用以下几种方式扩展这个简单的模式：
可以通过组合使用 INCR 和 EXPIRE ，来达到只在规定的生存时间内进行计数(counting)的目的。 
客户端可以通过使用 GETSET 命令原子性地获取计数器的当前值并将计数器清零。 
使用其他自增/自减操作，比如 DECR 和 INCRBY ，用户可以通过执行不同的操作增加或减少计数器的值，比如在游戏中的记分器就可能用到这些命令。 

**限速器**
限速器是特殊化的计算器，它用于限制一个操作可以被执行的速率(rate)。
限速器的典型用法是限制公开 API 的请求次数，以下是一个限速器实现示例，它将 API 的最大请求数
限制在每个 IP 地址每秒钟十个之内：
这个实现每秒钟为每个 IP 地址使用一个不同的计数器，并用 EXPIRE 命令设置生存时间(这样 Redis 就
会负责自动删除过期的计数器)。
注意，我们使用事务打包执行 INCR 命令和 EXPIRE 命令，避免引入竞争条件，保证每次调用 API 时
都可以。另一种消灭竞争条件的方法，就是使用 Redis 的列表结构来代替 INCR 命令，这个方法无须脚本支 持正确地对计数器进行自增操作并设置生存时间。

**具有随机访问时间的线性数组**
因为有了 SETRANGE 和 GETRANGE 命令，你可以将 Redis 字符串用作具有O(1)随机访问时间的线性数组，这在很多真实用例中都是非常快速且高效的储存方式，具体请参考 APPEND 命令的『模式：时间序列』部分。

**事件提醒**
有时候，为了等待一个新元素到达数据中，需要使用轮询的方式对数据进行探查。
另一种更好的方式是，使用系统提供的阻塞原语，在新元素到达时立即进行处理，而新元素还没到达 时，就一直阻塞住，避免轮询占用资源。 
对于 Redis ，我们似乎需要一个阻塞版的 SPOP 命令，但实际上，使用 BLPOP 或者 BRPOP 就能很好地解决这个问题。

**安全队列**
Redis的列表经常被用作队列(queue)，用于在不同程序之间有序地交换消息(message)。一个客户端通 过 LPUSH 命令将消息放入队列中，而另一个客户端通过 RPOP 或者 BRPOP 命令取出队列中等待时间最长的消息。 
不幸的是，上面的队列方法是『不安全』的，因为在这个过程中，一个客户端可能在取出一个消息之后 崩溃，而未处理完的消息也就因此丢失。 
使用 RPOPLPUSH 命令(或者它的阻塞版本 BRPOPLPUSH )可以解决这个问题：因为它不仅返回一个 消息，同时还将这个消息添加到另一个备份列表当中，如果一切正常的话，当一个客户端完成某个消息的处理之后，可以用 LREM 命令将这个消息从备份表删除。 
最后，还可以添加一个客户端专门用于监视备份表，它自动地将超过一定处理时限的消息重新放入队列中去(负责处理该消息的客户端可能已经崩溃)，这样就不会丢失任何消息了。

**循环列表**
通过使用相同的 key 作为 RPOPLPUSH 命令的两个参数，客户端可以用一个接一个地获取列表元素的方式，取得列表的所有元素，而不必像 LRANGE 命令那样一下子将所有列表元素都从服务器传送到客户端中(两种方式的总复杂度都是 O(N))。
以上的模式甚至在以下的两个情况下也能正常工作：
有多个客户端同时对同一个列表进行旋转(rotating)，它们获取不同的元素，直到所有元素都被读取完，之后又从头开始。
有客户端在向列表尾部(右边)添加新元素。
这个模式使得我们可以很容易实现这样一类系统：有 N 个客户端，需要连续不断地对一些元素进行处理，而且处理的过程必须尽可能地快。一个典型的例子就是服务器的监控程序：它们需要在尽可能短的时间内，并行地检查一组网站，确保它们的可访问性。
注意，使用这个模式的客户端是易于扩展(scala)且安全(reliable)的，因为就算接收到元素的客户端失败，元素还是保存在列表里面，不会丢失，等到下个迭代来临的时候，别的客户端又可以继续处理这些元素了。

### Jedis：Java操作Redis
- 创建连接池
- 初始化连接池
- 销毁连接池
- 一致性Hash分片（虚节点）

**基本操作**
Jedis对各种数据类型操作与命令名称完全一致
jedis.函数名（）；//函数名就是命令名

**事务处理**
Jedis的事务处理也是相当的简单，Redis对事物的操作封装了Transaction对象，该对象的操作方法与Jedis的各种数据类型的操作方法一致，通过jedis的multi方法返回一个事务对象
```java
Jedis jedis = new Jedis(SERVER_ADDRESS, SERVER_PORT);
jedis.watch("f2");
jedis.set("f2", "aaa");
jedis.unwatch();
Transaction t = jedis.multi();
t.set("f2", "bar");
Response<String> result1 = t.get("f2");
String foolbar=“”;
// foolbar = result1.get();
// System.out.println(foolbar);
t.exec();
foolbar = result1.get();
jedis.disconnect();
```

**订阅/发布**
对于订阅发布Jedis提供的所有订阅发布的实现方法，发布数据相对简单，如下代码示例：
jedis.publish("news.test2", "jhhjhh1");
订阅则更为简单，Jedis直接通过继承JedisPubSub类来实现所有的订阅操作方法，如下代码示例：
public class TestSub extends JedisPubSub {

**管道 pipeline**
redis是一个cs模式的tcp server，使用和http类似的请求响应协议。一个client可以通过一个socket连接发起多个请求命令。每个请求命令发出后client通常会阻塞并等待redis服务处理，redis处理完后请求命令后会将结果通过响应报文返回给client。
利用pipeline的方式从client打包多条命令一起发出，不需要等待单条命令的响应返回，而redis服务端会处理完多条命令后会将多条命令的处理结果打包到一起返回给客户端。
```java
Jedis jedis = new Jedis(SERVER_ADDRESS, SERVER_PORT);
Pipeline p = jedis.pipelined();
p.set("r1", "bar");
p.zadd("r2", 1, "barowitch");
p.zadd("r2", 0, "barinsky");
p.zadd("r2", 0, "barikoviev");
Response<String> pipeString = p.get("r1");
Response<Set<String>> sose = p.zrange("r2", 0, -1);
p.sync();
jedis.disconnect();
```
**ArrayBlockingQueue Java自带的队列服务**
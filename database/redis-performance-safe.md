Redis 性能优化及数据安全
===
## Redis 性能优化
### 停止使用 `KEYS *`
### 找出拖慢 Redis 的罪魁祸首
由于 Redis 没有非常详细的日志，要想知道在 Redis 实例内部都做了些什么是非常困难的。幸运的是 Redis 提供了一个下面这样的命令统计工具：
```bash
127.0.0.1:6379> INFO commandstats
# Commandstats
cmdstat_get:calls=78,usec=608,usec_per_call=7.79
cmdstat_setex:calls=5,usec=71,usec_per_call=14.20
cmdstat_keys:calls=2,usec=42,usec_per_call=21.00
cmdstat_info:calls=10,usec=1931,usec_per_call=193.10
```
通过这个工具可以查看所有命令统计的快照，比如命令执行了多少次，执行命令所耗费的毫秒数(每个命令的总时间和平均时间)

只需要简单地执行 `CONFIG RESETSTAT` 命令就可以重置，这样你就可以得到一个全新的统计结果。

### 将 Redis-Benchmark 结果作为参考，而不要一概而论
可能受到哪些客户端运行环境的限制？
是同一个版本号吗？
测试环境中的表现与应用将要运行的环境是否一致？

**Redis-Benchmark的测试结果提供了一个保证你的 Redis-Server 不会运行在非正常状态下的基准点，但是你永远不要把它作为一个真实的“压力测试”。**压力测试需要反应出应用的运行方式，并且需要一个尽可能的和生产相似的环境。

### Hashes 是你的最佳选择
```bash
foo:first_name
foo:last_name
foo:address
```
上面的例子中，foo 可能是一个用户的用户名，其中的每一项都是一个单独的 key。这就增加了 犯错的空间，和一些不必要的 key。使用 hash 代替吧，你会惊奇地发现竟然只需要一个 key ：
```bash
127.0.0.1:6379> HSET foo first_name "Joe"(integer) 1
127.0.0.1:6379> HSET foo last_name "Engel"(integer) 1
127.0.0.1:6379> HSET foo address "1 Fanatical Pl"(integer) 1
127.0.0.1:6379> HGETALL foo
1)"first_name"
2)"Joe"
3)"last_name"
4)"Engel"
5)"address"
6)"1 Fanatical Pl"
127.0.0.1:6379> HGET foo first_name
"Joe"
```

### 设置 key 值的存活时间
###  选择合适的回收策略
既然谈到了清除key这个话题，那我们就来聊聊回收策略。当 Redis 的实例空间被填满了之后，将会尝试回收一部分key。根据你的使用方式，
强烈建议 **使用 volatile-lru 策略——前提是你对key已经设置了超时。**但如果你运行的是一些类似于 cache 的东西，并且没有对 key 设置超时机制，可以考虑使用 allkeys-lru 回收机制。

### 如果你的数据很重要，请使用 Try/Except
### 不要耗尽一个实例
### 内核不是越多越好
Redis 是一个单线程进程，即使启用了持久化最多也只会消耗两个内核。除非你计划在一台主机上运行多个实例——希望只会是在开发测试的环境下！——否则的话对于一个 Redis 实例是不需要2个以上内核的。

---

## Redis 数据安全
- `bind 127.0.0.1`
- 启用Auth验证, 密码需要有足够的复杂度
- 采用SSL传输数据
- 禁用特定的命令`rename-command`
- 避免使用LUA脚本获取来自非信任源的字符串
- Redis不需要root权限运行，也不建议以root权限运行
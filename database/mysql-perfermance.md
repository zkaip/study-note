MySQL性能调优
===
连接：max_connections, max_packet_allowed, aborted_connects, thread_cache_size
查询缓存（MySQL缓存查询中包括两个解析查询计划，以及返回的数据集，如果基础表数据或结构有变化，将会使查询缓存中的项目无效）
临时表：调整查询让结果集更小(better)以实现内存排序，或将变量设置的更大（tmp_table_size, max_heap_table_size）,有BLOB或TEXT字段类型的表将直接卸入磁盘
会话内存：会话内存按需分配，需要关注顶级会话的VIRT列
慢速查询日志：查询记录什么样的SQL语句造成查询时间过慢（微秒级），需要排出阻塞影响
读写优先：MySQL提供语句调节符，允许你修改它的调度策略
引擎和锁：memory, mysiam,innodb,inforbright,monetdb
禁止死锁检测来提高高并发MySQL性能：事务会递归检测死锁，禁止死锁检测后，及时死锁发生，也不会回滚事务，而是全部等待到超时
主从复制，amoeba读写分离，实现业务分库分表（应用一致性强的，不能用主从复制，需要分库分表，一般写后不允许马上读数据，主从复制需要时间）
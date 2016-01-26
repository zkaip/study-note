Storm
===
一个分布式，可靠的，容错的数据流处理系统，会把工作任务委托给不同类型的组件，每个组件负责处理一项简单特定的任务。
输入流spout =>> bolt， bolt要么把数据保存在某种存储器要么把数据传递给其它的bolt。
 
storm集群就是一连串bolt之间转换spout传过来的数据。
实时处理系统（类似s4, storm）对比直接用MQ来做好处在哪里？
答：好处是它帮你做了： 1) 集群控制。2) 任务分配。3) 任务分发 4) 监控 等等。
 
实例说明：
-word count
       spout读取文本 ==tuple==>>bolt(分词)==>>bolt利用redis调用incr +1
 
-数据处理流
不像其他的流处理系统，storm不需要中间队列
-连续计算
连续发送数据到客户端，使客户端可以实时更新并显示结果，如网站指标
-分布式远程过程调用
频繁的CPU密集型操作并行化
 
storm组件(masterNode workerNode)
Nimbus：masterNode运行着Nimbus的守护进程，此守护进程负责在集群中分发代码监控故障分配任务
Supervisor：Supervisor守护进程作为拓扑的一部分运行在工作节点上，在不同机器上运行众多的工作节点。
tuple：表示流中一个基本的处理单元，可以包括多个fileld,每个field表示一个属性
topology：一个拓扑是一个个计算节点组成的图，每个节点包括处理的逻辑，节点之间的连线表示数据流动的方向。
spout：表示一个流的源头，产生tuple
bolt：处理输入流并产生多个输出流，可以做简单的数据转换计算，复杂的流处理一般需要经过多个bolt进行处理
worker：执行topology的工作进程，用于生成task
task：每个spout和bolt都可以作为task在storm中运行，一个task对应着一个线程
 
整体架构
 
Storm开发案例
-wordCount
 
-构建拓扑以及StreamGrouping
在Topology中，数据流Tuple的处理就是不断的通过调用不同的Spout和Blot来完成的，不同的Bolt和Spout的上下游关系是通过在入口类定义的。
-DRPC（分布式RPC）
1.启动Storm中的DRPCServer
2.创建一个DRPC的Topology，提交到Storm中运行
3.通过DRPCClient对Cluster进行访问
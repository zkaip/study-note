Flume 分布式日志收集
===
一个分布式的收集，汇总和移动大量的日志数据的可靠的服务
可靠性，可扩展性、可管理性、高性能
1.Event：数据传输的基本单元，Event由可选的header和载有数据的一个byte array构成，载有的数据对flume是不透明的，Header是容纳了key-value字符串对的无序集合， key在集合内是唯一的，Header可以在上下文路由中使用扩展。
2.Client：一个将原始log包装成events并且发送它们到一个或多 个agent的实体，目的是从数据源系统中解耦Flume。在flume的拓扑结构中不是必须的。
3.Agent：一个Agent包含Source, Channel, Sink和其他组件，它利用这些组件将events从一个节点传输到另一个节 点或最终目的；agent是flume流的基础部分，flume为这些组件提供了配置、生命周期管理、监控 支持。
 
Agent主要包含以下内容：
-Source
-Channel
-Sink
其他组件：Interceptor、Channel Selector、Sink Processor
a. Source负责接收event或通过特殊机制产生event，并将events批量的放到一个或多个Channel。包含event驱动和轮询2种类型：
与系统集成的Source: Syslog, Netcat
自动生成事件的Source: Exec
用于Agent和Agent之间通信的IPC Source: Avro、Thrift
Source必须至少和一个channel关联
b. Channel位于Source和Sink之间，用于缓存进来的event；
c. Sink负责将event传输到下一跳或最终目的，成功完 成后将event从channel移除。
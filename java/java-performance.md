Java性能优化
===
JIT/Inlining 内联（拆大循环变小循环，拆大方法变小方法（通过打印内联日志查询））
GC垃圾回收：不要使用finalize()方法，一些数据结构对GC不友好（Array友好 LinkedList不友好（可以自己实现）），对象不是免费的午餐。
GC算法：引用计数，标记清除，标记压缩，复制算法
-SerialGC串行收集器（古老稳定效率高，新生代老年代都可以使用，可能产生较长停顿）
       -ParNewGC 并行收集器（新生代使用，复制算法，多线程）
       -Parallel收集器（类似ParNew，更加关注吞吐量）
       -CMS收集器（并发标记清除，老年代使用）：尽可能降低停顿，会影响系统整体吞吐量和性能，清理不彻底，和用户线程一起运行不能在空间快满的时候清理
False-sharing伪共享：数据会在cpu的一个cache-line中发生竞争（64字节），最好方法是填满cache-line
Unsafe：未公开的API，允许我们对内存地址操作，进行数组操作和原子性操作，消除了范围检查，并允许直接通过内存访问。容易造成JVM段错误
队列与LazySet：队列要正确使用（避免拥塞）否则会产生性能问题。根据单写原理Atomic*.lazySet(…)
printGC –XX:+printGC
分配内存参数：-Xmx –Xms 最大堆最小堆 –Xmn设置新生代大小 –XX:NewRatio设置新生代老年代比率，-XX:SurvivorRatio设置两个幸存代和初生代比率（根据实际事情调整新生代和幸存代的大小，官方推荐新生代占堆的3/8，幸存代占新生代的1/10），-XX:PermSize –XX:MaxPermSize设置永久代的初始空间和最大空间，-Xss栈，通常只有几百K，每个线程有独立的栈空间（递归会溢出）
OOM（OutOfMemory） -XX:HeapDumpOnOutOfMemoeryError（OOM时导出堆到文件），-XX:+HeapDumpPath（导出OOM的路径），-XX:OnOutOfMemoryError=/home/keke/xxx.sh（写个脚本重启）
varnish、squid、apache、nginx缓存的对比
===
varnish > nginx > apache > squid

1、从这些功能上。varnish和squid是专业的cache服务，而apache，nginx这些都是第三方模块完成。

2、要做cache服务的话，优先选择squid和varnish。

3、 谈谈nginx，nginx是用第三方模块ncache做的缓冲，其性能基本达到varnish，但在架构中nginx一般作为反向（静态文件现在用 nginx的很多，并发能支持到2万+）。在静态架构中，如果前端直接面对的是cdn或者前端了4层负载的话，完全用nginx的cache就够了。

4、apache 提升性能，做一些本地cache是完全可以的，但是apache本身不是专业的缓存，不能用于架构上的缓存。

varnish 本身的技术上优势要高于squid，它采用了“Visual Page Cache”技术，在内存的利用上，Varnish比Squid具有优势，它避免了Squid频繁在内存、磁盘中交换文件，性能要比Squid高。 varnish是不能cache到本地硬盘上的。
还有强大的通过Varnish管理端口，可以使用正则表达式快速、批量地清除部分缓存

我们图片的平均大小为50K，varnish的3500的并发，最大处理为175MB，超过网卡125MB的峰值。所以还是用varnish比较靠谱。如果图片的大小为10K，直接用nginx做反向代理或许更好。 

单文件并发：
在同样的配置的机器上，发现nginx的在1W并发情况下，依然可以运行；varnish在3600并发测试的时候，直接开始报错。
多文件并发：
启动10个经常多文件访问nginx服务器，发现网卡平均流量为60M左右。而varnish可以用满网卡流量

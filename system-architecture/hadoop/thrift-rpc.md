Thrift RPC框架
===
所谓RPC就是远程的过程方法调用，也就是说在本地执行一个远程的方法实现，Thrift就是这种类型的开源项目。Thrift基于IDL中间语法定义无语言相关的接口文件，然后通过thrift解释为各种语言可以识别的语法格式接口并关联实现，换句话说发布一个java开发的服务RPC接口，可以用各种不同的语言进行调用使用
 
RPC用帧传输
 
Protocol Buffers //常常用其中的序列化方法
corba
idl->接口文件（各种语言的接口文件）
服务端实现接口/客户端调用接口
 
Thrift IDL（接口描述语言）
Thrift数据类型如下所示：
-bool true, false
-byte 8位的有符号整数
-i16 16位的有符号整数
-i32 32位的有符号整数
-i64 64位的有符号整数
-double 64位的浮点数
-string UTF-8编码的字符串
-binary 字符数组
-struct 结构体
-list<type> 有序的元素列表，类似于STL的vector
-set<type> 无序的不重复元素集，类似于STL的set
-map<type1,type2> key-value型的映射，类似于STL的map
-exception 是一个继承于本地语言的exception基类
-service服务包含多个函数接口(纯虚函数)
Thrift定义接口文件分为复杂数据类型定义和服务接口定义，定义数据类型其实就可以理解为定义类，thrift使用struct来对应类,Thrift没法进行继承操作。
struct User {
  1: i32 uid,
  2: string name
}
通过thrift命令可以将thrift的idl接口导出各语言源代码，具体导出命令如下：
thrift –r –gen py service.thrift
thrift –r –gen java servcie.thrift
可导出语言配置
cocoa(Cocoa)、cpp(C++)、csharp(C#)、erl(Erlang)、hs(Haskell)、html(HTML)、java(Java)、ocaml(OCaml)、perl(Perl)、php(PHP)、py(Python)、rb(Ruby)、st(Smalltalk)、xsd(XSD)
 
Thrift开发
首先需要实现上一章Thrift生成的接口，具体实例代码如下：
public class XXXService implements IXXXService.Iface
Thrift有很多种服务提供类，最常用的莫过于TThreadPoolServer和TNonblockingServer，这两个类一个定义的是同步多线程处理服务，一个是异步单线程处理服务，其他的thrift服务类几乎使用不到。
为了提升效率，我们采用NIO的方式进行数据传输，对于Thrift封装的类是TFramedTransport，使用该类进行数据传输可以大大提升效率，并且同时使用上压缩效果更佳，压缩对应的类TCompactProtocol。
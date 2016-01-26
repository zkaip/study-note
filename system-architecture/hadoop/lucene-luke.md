Lucene
===
lucene是一款高性能的、可扩展，纯java语言编写的信息检索（IR）工具库，甚至可以在某种情况下替代数据库的搜索查询。
 
lucene是基于关键词索引和查询：
全文分析：把文本解析为一个个关键字存储到索引文件中。
倒排索引： （英语：Inverted index），也常被称为反向索引、置入档案或反向档案，是一种索引方法，被用来存储在全文搜索下某个单词在一个文档或者一组文档中的存储位置的映射。它是文档检索系统中最常用的数据结构。
 
Luncene两种索引结构：
1.多文件索引结构：由多个文件来表示索引，索引段:lucene索引由一个或多个段（segments）组成，而每个段由多个索引文件组成。
2.复合文件索引结构：将多个索引文件压缩成一个文件（后缀名为cfs）。indexwriter.setUseCompoundFile(true);
 
Lucene开发
-Directory类：描述了Lucene索引的存储位置，它是一个抽象类，最常用的子类FSDirectory和RAMDirectory。
-Analyzer类：文本文件在被索引之前，需要经过Analyzer(分析器)处理。Analyzer是由IndexWriter的构造方法来指定的，它负责从被索引文本文件中提取语汇单元，并提出剩下的无用信息。如果被索引内容不是文本文件，需要将其转换为文本文件。
-Indexwriter类：IndexWriter(写索引)是索引过程中的核心组件。负责创建新索引或打开已有索引、以及向索引中添加、更新、删除被索引的信息。IndexWriter需要开辟一定空间来存储索引，该功能可以由Directory完成，IndexWriter是线程安全的
-Document(文档)对象：代表一些域(Field)的集合。
-Field类：索引中每个文档都包含一个或多个不同的域。这些域包含在Field类中。每个域都要一个域名可对应的域值，以及一组选项来精确控制lucene索引操作各个域值，文档可以包含多个相同域名。
-IndexReader类：读取索引文件,它是线程安全的。
-IndexSearcher类：搜索索引的核心类，它是线程安全的。
-Term类：搜索功能的基本单元，Term对象包含一对字符串元素：域名和文本值。
 
建立索引流程
-创建Directory对象
-创建Analyzer对象
-创建IndexWriter对象
-创建Document对象
-向文档中添加Field对象
-调用indexwriter.add(document)方法
-Indexwirter优化及事务提交
-资源释放indexwirter.close(),directory.close()
 
建立索引流程
-创建Directory对象
-创建IndexReader对象
-创建IndexSearcher对象
-组装Query对象
-调用search对象的search方法
-循环遍历ScoreDocs[]文档编号
-更加文档编号查找该编号对应文档document。
-调用document文档Field域名。
-关闭searcher,reader,directory对象，释放资源。
 
Luke工具：Luke是一个用于Lucene搜索引擎的，方便开发和诊断的第三方工具，它可以访问现有Lucene的索引，并允许您显示和修改。
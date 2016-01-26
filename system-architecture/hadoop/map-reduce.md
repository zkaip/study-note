MapReduce
===
JobClient--JobSubmissionProtocol-->JobTracker--InterTrackerProtocol-->TaskTracker
JobClient是用户作业与JobTracker交互主要接口，负责提交作业的，负责启动，跟踪任务执行，访问任务状态和日志
JobTracker，负责接收用户提交的作业，负责启动，跟踪任务执行
 
函数       |      输入键值对    |      输出键值对
map()     |<k1,v1>        |<k2,v2>
reduce()|<k2,迭代器{v2}>|<k3,v3>
 
Input(splits)->Mappers(map())->MiddleResult->Reducers(reducers())->Output
 
a. map<k,v>(k是字符偏移量，v是一行数据)=><k1,v1>
b. shuffle
c. <k1,itertor<v1,v2,……>> =><k3,v3>
 
MapReduce应用案例
-单词计数 WordCount
-数据去重 DataDalicateRemove
-排序 DataSort
-Top K
-数据选择 DataChoice
-数据分组 DataGrouping
-单表连接 SingleTableJoin
-多表连接 MultiTableJoin
-倒排索引 Inverted Index
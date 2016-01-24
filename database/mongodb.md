MongoDB
===
### 基础
#### 数据
**存储数据方式:BSON**
> Collection 集合 > Key 键 > Value 值 > Document/Object (文档/对象)

**数据类型**
> string integer boolean double null array object timestamp ObjectIDs InternationalizedStrings(UTF-8字符串)

#### 数据库
**连接**
> mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

**切换**
> use myinfo

**备份(mongodump)**
>mongodump -h dbhost -d dbname -o dbdirectory

**恢复(mongorerstore)**
>mongorestore -h dbhost -d dbname --directoryperdb dbdirectory

**监控**
> MongoDB中提供了mongostat 和 mongotop 两个命令来监控MongoDB的运行情况。

**查询分析**
> 常用函数有：
> 
> explain() //提供了查询信息，使用索引及查询统计等 
> hint()//强迫MongoDB使用一个指定的索引。

**管理工具** `Rockmongo`

### 增删改查
**集合操作**
- db.createCollection()
- db.collection.drop()

**数据库操作**
- db.dropDatabase()

**数据操作**
- db.collection.insert()
- db.collection.update(criteria, objNew, upsert, multi)
 - criteria : update的查询条件，类似sql update查询内where后面的。
 - objNew : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的 
 - upsert : 这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入
 - multi : mongodb默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多 条记录全部更新。
- db.userdetails.remove( { "user_id" : "testuser" } )
- db.userdetails.find(db.users.find({name: {$type: 2}});

**条件操作符**
$lt $gt $lte $gte $ne $type $inc $not

**函数**
- limit(NUMBER) 限制数量
- skip(NUMBER) 跳过数量
- sort({key: 1/-1}) 排序
- db.collection.aggregate(AGGREGATE_OPERATION) 聚合 相当于count(*)
 - $sum $avg $min $max $first $last $push $addToSet

**索引**
> db.collection.ensureIndex({KEY:1/-1})

**全文检索**
> db.adminCommand({setParameter:true,textSearchEnabled:true})
> mongod --setParameter textSearchEnabled=true

- 创建全文索引
`db.posts.ensureIndex({post_text:"text"})`
- 使用全文索引
`db.posts.find({$text:{$search:"w3cschool.cc"}})`
- 删除全文索引
- 删除已存在的全文索引，可以使用 find 命令查找索引名：
`db.posts.getIndexes()`
`db.posts.dropIndex("post_text_text") //本例的索引名为post_text_text`

### 管道命令
- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及 嵌套文档。 
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。 
- $limit：用来限制MongoDB聚合管道返回的文档数。 
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。 
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。 
- $group：将集合中的文档分组，可用于统计结果。 
- $sort：将输入文档排序后输出。 
- $geoNear：输出接近某一地理位置的有序文档。

### 原子操作
- $set 用来指定一个键并更新键值，若键不存在并创建。`{ $set : { field : value } }`
- $unset 用来删除一个键。`{ $unset : { field : 1} }`
- $inc $inc可以对文档的某个值为数字型（只能为满足要求的数字）的键进行增减的操作。`{ $inc : { field : value } } `
- $push 把value追加到field里面去，field一定要是数组类型才行，如果field不存在，会新增一个数组类型加进去。 `{ $push : { field : value } } `
- $pushAll 同$push,只是一次可以追加多个值到一个数组字段内。`{ $pushAll : { field : value_array } }`
- $pull 从数组field内删除一个等于value值。`{ $pull : { field : _value } }`
- $addToSet 增加一个值到数组内，而且只有当这个值不在数组内才增加。
- $pop 删除数组的第一个或最后一个元素`{ $pop : { field : 1 } }`
- $rename 修改字段名称`{ $rename : { old_field_name : new_field_name } }`
- $bit 位操作，integer类型 `{$bit : { field : {and : 5}}}`

### 数据库引用
- 1:1 (1对1) 
- 1: N (1对多) 
- N: 1 (多对1) 
- N: N (多对多)

**DBRefs**
{ $ref : , $id : , $db : }
- $ref：集合名称 
- $id：引用的id
- $db:数据库名称，可选参数
```javascript
{ 
"_id":ObjectId("53402597d852426020000002"),
"address": {
"$ref": "address_home",
"$id": ObjectId("534009e4d852427820000002"),
"$db": "w3cschoolcc"},
"contact": "987654321",
"dob": "01-01-1991",
"name": "Tom Benzamin"
}
> var user = db.users.findOne({"name":"Tom Benzamin"})
> var dbRef = user.address
> db[dbRef.$ref].findOne({"_id":(dbRef.$id)})
{
"_id" : ObjectId("534009e4d852427820000002"),
"building" : "22 A, Indiana Apt",
"pincode" : 123456,
"city" : "Los Angeles",
"state" : "California"
}
```

### 参考
- [MongoDB](http://note.youdao.com/share/?id=e68010fc4fe8f231c90de4b38e91ea5c&type=note)
- [MongoDB Tutorial](http://www.tutorialspoint.com/mongodb/)
Mongodb 性能优化
===

### 范式化与反范式化 权衡设计

完全范式化更新效率是最高的，但查询效率是最低的，而完全反范式化的查询效率最高，但更新效率最低。所以在实际的工作中我们需要根据自己实际的需要来设计表中的字段，以获得最高的效率。

### 填充因子设计
填充因子（padding factor）是MongoDB为文档的扩展而预留的增长空间，因为MongoDB的文档是以顺序表的方式存储的，每个文档之间会非常紧凑
```javascript
db.book.insert({
"name": "MongoDB",
"publishing": "清华大学出版社",
"author": "john"
"tags": []
"stuff": "ggggggggggggggggggggggggggggggggggggg
ggggggggggggggggggggggggggggggggggggg
ggggggggggggggggggggggggggggggggggggg"
})
```
当我们对这个文档进行增长式修改时，只要将stuff字段删掉即可。

### 准确利用索引
- 索引越少越好
- 利用好隐式索引
- 利用好翻转索引
- 索引列颗粒越小越好
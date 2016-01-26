SQL 增删改
===
创建表： Create Table 表名
        (字段名1 类型(数据长度)(default ...) 约束条件,
        字段名2 类型(数据长度) 约束条件 );
建表的名称：
    必须字母开头；最多30字符；只能使用“A～Z、a～z、0～9、_、$、#”；
    同一目录下不能有同名的表；表名不能跟关键字、特殊含意字符同样。
    如：create table number_1 (n1 number(2,4), n2 number(3,-1), n3 number);

添加字段(列)：
    Alter Table 表名
    Add (column dataype [Default expr][Not Null]
         [,column datatype]…);
    添加有非空限制的字段时，要加Default语句
    字段名字不可以直接改名，需要添加新字段，再复制旧字段后删除旧字段。
      添加约束： Alter Table 表名
                  Add [CONSTRAINT constraint] type (column);
    添加非空约束时，要用Modify语句。
    查看约束名时，可以违反约束再看出错提示；或者查看约束字典desc user_constraints
    注意：修改的时候，只允许修改字段类型，大小，是否为空，如果修改和字段值冲突则alter命令失败
        alter table t_hsq6 modify name varchar2(30) not null;//修改一列
            在修改列的数据类型的时候,所修改的列必须为空,否则提示下面的错误:
　　        ORA-01439: 要更改数据类型, 则要修改的列必须为空

减少字段(列)：
    Alter Table 表名
    Drop (column [,column]…);
      删除约束： Alter Table 表名
                  Drop CONSTRAINT column;
      或： Alter Table 表名
            Drop Primary Key Cascade;

暂时关闭约束，并非删除：
    Alter Table 表名
    Disable CONSTRAINT column Cascade;
打开刚才关闭的约束：
    Alter Table 表名
    Enable CONSTRAINTcolumn;

修改字段(列）：
    Alter Table 表名
    Modify (column dataype [Default expr][Not Null]
             [,column datatype]…);
修改字段的类型、大小、约束、非空限制、空值转换。

删除表：
会删除表的所有数据，所有索引也会删除，约束条件也删除，不可以roll back恢复。
    Drop Table 表名 [Cascade Constraints];
    加 [Cascade Constraints] 把子表的约束条件也删除；但只加 [Cascade]会把子表也删除。

改表名：
Rename 原表名 To 新表名;

清空表格：
    TRUNCATE TABLE 表名;
    相比Delete,Truncate Table清空很快，但不可恢复。清空后释放内存。
    Delete 删除后可以roll back。清空后不释放内存。

插入数据（行）：INSERT：插入(或添加)行到数据库表中的关键字。 
    插入方式有以下几种：插入完整的行；插入行的一部分；插入某些查询的结果。
    对于INSERT操作，可能需要客户机/服务器的DBMS中的特定的安全权限。
     插入行
     INSERT INTO products(id,name,price,vend_name) VALUES(2008,’TV’,222.22,’US’); 
    依赖于逻辑顺序，会自动补上空值，提倡使用。

    插入检索出的数据：可以插入多条行到数据库表中
        INSERT INTO products(*,*,*,*)
        SELECT *,*,*,*
        FROM products_copy;
    如果这个表为空，则没有行被插入，不会产生错误，因为操作是合法的。
    可以使用WHERE加以行过滤。

复制表： 将一个表的内容复制到一个全新的表(在运行中创建，开始可以不存在)
    CREATE TABLE 新表名 AS
    SELECT *
    FROM 表名;

    INSERT INTO 与 CREATE TABLE AS SELECT 不同，前者是导入数据，而后者是导入表。
    任何SELECT选项和子句都可以使用，包括WHERE和GROUP BY。
    可利用联接从多个表插入数据。不管从多少个表中检索数据，数据都只能插入到单个表中。

更新数据： UPDATE 语句
            需要提供以下信息：要更新的表；列名和新值；确定要更新的哪些行的过滤条件。
    UPDATE 表名
    SET vend_name = ‘HP’,
           prod_name = ‘NEWCOMPUTER’
    WHERE vend_name = ‘IBM’;
    --UPDATE 语句中可以使用子查询，使得能用SELECT语句检索出的数据更新列数据。也可以将一个列值更新为 NULL。

删除数据 DELETE 语句
    DELETE
    FROM products
    WHERE prod_name = ‘COMPUTER’;
    全行删除，不要省略WHERE，注意安全。
    DELETE不需要列名或通配符。删除整行而不是删除列。DELETE是删除表的内容而不是删除表。
    如果想从表中删除所有内容，可以使用TRUNCATE TABLE语句(清空表格)，它更快。

备份数据库：
mysqldump –user=root –password=root密码 –lock-all-tables 数据库名 > 备份文件.sql
恢复数据库：
mysql -u root –password=root密码 数据库名 < 备份文件.sql
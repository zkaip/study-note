MySQL 常用语句
===
终端登录： mysql -u username -p password --进入本机的mysql；没设密码就留空
执行脚本： mysql -u 用户名 -密码 </.../xxx.sql
执行脚本2：先登录，再 source /.../xxx.sql
show variables like '%char%'; --查看数据库的字符集；utf8或gbk的则可支持中文
show databases; --显示所有数据库目录
use 数据库名; --进入某个数据库 (可以有很多个，我把这些数据库看作目录，这点不同于oracle)
show tables; --显示此目录下各表格的名字
desc 表名; --我们可以查看某个表中的数据类型结构
create database 数据库名; --建数据库目录
drop database 数据库名; --删除数据库整个目录
create table 表名; --建表(同oracle)
drop table 表名; --连删表(删多个表用逗号隔开)
explain 查看SQL计划
SHOW variables把所有config显示出来

Toad
Toad 针对Oracle数据库操作集成了很多优化的指令（原语）


Note that all text commands must be first on line and end with ';'
? (\?) Synonym for 'help'.
clear (\c) Clear command. 
connect (\r) Reconnect to the server. Optional arguments are db and host. 
delimiter (\d) Set statement delimiter. NOTE: Takes the rest of the line as new delimiter. 
edit (\e) Edit command with $EDITOR. 
ego (\G) Send command to mysql server, display result vertically. 
exit (\q) Exit mysql. Same as quit. 
go (\g) Send command to mysql server. 
help (\h) Display this help. 
nopager (\n) Disable pager, print to stdout. 
notee (\t) Donot write into outfile. 
pager (\P) Set PAGER [to_pager]. Print the query results via PAGER. 
print (\p) Print current command. 
prompt (\R) Change your mysql prompt. 
quit (\q) Quit mysql. 
rehash (\#) Rebuild completion hash. 
source (\.) Execute an SQL script file. Takes a file name as an argument. 
status (\s) Get status information from the server. 
system (\!) Execute a system shell command. 
tee (\T) Set outfile [to_outfile]. Append everything into given outfile. 
use (\u) Use another database. Takes database name as argument. 
charset (\C) Switch to another charset. Might be needed for processing binlog with multi-byte charsets. 
warnings (\W) Show warnings after every statement. 
nowarning (\w) Donot show warnings after every statement.
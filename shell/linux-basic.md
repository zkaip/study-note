Linux 基础
===
注意事项
    命令和参数之间必需用空格隔开，参数和参数之间也必需用空格隔开。
    一行不能超过256个字符；大小写有区分。
特殊字符含义 
    文件名以“.”开头的都是隐藏文件/目录，只需在文件/目录名前加“.”就可隐藏它。
    ~/ 表示主目录。
    ./ 当前目录(一个点)。
    ../ 上一级目录(两个点)。
    ; 多个命令一起用。
    >   >> 输出重定向 。将一个命令的输出内容写入到一个文件里面。如果该文件存在， 就将该文件的内容覆盖；
             如果不存在就先创建该文件， 然后再写入内容。
             输出重定向，意思就是说，将原来屏幕输出变为文件输出，即将内容输到文件中。
    <   << 输入重定向。 本来命令是通过键盘得到输入的，但是用小于号，就能够使命令从文件中得到输入。
    \ 表示未写完，回车换行再继续。
    * 匹配零个或者多个字符。
    ? 匹配一个字符。
    [] 匹配中括号里的内容[a-z][A-Z][0-9]。
    ！ 事件。
    $ 取环境变量的值。
    | 管道。把前一命令的输出作为后一命令的输入，把几个命令连接起来。
             ｜经常跟tee连用，tee 把内容保存到文档并显示出来。
通用后接命令符 
    -a 所有(all)。
    -e 所有(every)，比a更详细。
    -f 取消保护。
    -i 添加提示。
    -p 强制执行。
    -r 目录管理。
 分屏显示的中途操作 
    空格<space> 继续打开下一屏； 
    回车<return> 继续打开下一行； 
    b 另外开上一屏； 
    f 另外开下一屏； 
    h 帮助； 
    q或Ctrl+C 退出； 
    /字符串 从上往下查找匹配的字符串； 
    ？字符串 从下往上查找匹配的字符串； 
    n 继续查找。 

1. 文件系统：
主分区只能有4个，扩展分区只能有1个不能写入数据只能包含逻辑分区，逻辑分区
文件块：I(inode)，数据，修改时间，位置，权限
设备名：
IDE硬盘 /dev/hd[a-d] 
SCSI/SATA/USB硬盘 /dev/sd[a-d] 
光驱 /dev/cdrom 或 /dev/hdc 
软盘 /dev/fd[0-1] 
针式打印机 /dev/lp[0-2] 
USB打印机 /dev/usb/lp[0-15] 
鼠标 /dev/mouse 
分区号 从5开始
分区：挂载
/ 根分区*
swap分区 交换分区，4G以内内存2倍，4G以上和内存一样大*
/boot 推荐单独分出来，启动系统
            服务器选择最小化安装Minimal

2.操作命令 
root操作提示符# 普通用户操作提示符$  -a 简化选项 -all完整选项 
-rw-r--r--.   1  root  root 1207 1月 14 18:18 install.log
-文件类型(-文件 d目录 l软连接)u所有者g所属组o其他人ACL权限 引用计数 所属用户 所属组 最后修改时间 文件名
r读w写x执行
软连接：ln -s [源文件] [目标文件]链接命令
  类似快捷方式，拥有自己的i节点和Block块没有数据，权限都为[ld]rwxrwxrwx
  删除原文件，软连接不能使用
硬连接：ln [源文件] [目标文件]
  有相同的i节点和存储block块，可以看做是同一个文件
  可以通过i节点识别，不能跨分区，不能针对目录使用

查看列表：ls -l -lh ll
cd
pwd
创建目录：mkdir -p(递归创建)   mkdirs  rmdir
删除：rm -r -f
复制文件：cp -a(所有属性一样)
移动文件：mv
date
创建文件：touch 
查看文件所在位置：df
创建管道交换文件：mkfifo 
查看文件：cat、more、tail //cat 可以同时读取多个文件 
    结合grep进行模糊匹配：more xxx|grep xxx
more 分屏显示文件的内容。 
          用法 more [-cdflrsuw] [-行] [+行号] [+/模式] [文件名 ...]。
      显示7个信息:用户名 密码 用户id(uid) 组id(gid) 描述信息(一般为空) 用户主目录 login shell(登录shell)
cat 显示文件内容，不分屏(一般用在小文件，大文件显示不下)；合并文件，仅在屏幕上合并，并不改变原文件。 
          用法 cat [ -usvtebn ] [-|文件] ...
tail 实时监控文件，一般用在日志文件，可以只看其中的几行。 
          用法 tail [+/-[n][lbc][f]] [文件]
                  tail [+/-[n][l][r|f]] [文件]
设置权限：chmod +x 777
    用法 chmod [-fR] <绝对模式> 文件 ...
           chmod [-fR] <符号模式列表> 文件 ...
      其中 <符号模式列表> 是一个用逗号分隔的表 [ugoa]{+|-|=}[rwxXlstugo]
    chmod u+rw 给用户加权限。同理，u-rw也可以减权限。
    chmod u=rw 给用户赋权限。与加权限不一样，赋权限有覆盖的效果。
    主要形式有如下几种
    chmod u+rw chmod u=rw
    chmod u+r, u+w chmod u+rw,g+w, o+r
    chmod 777( 用数字的方式设置权限是最常用的)
    数字表示权限时，各数位分别表示属主、属组及其他人；
      其中，1是执行权(Execute)，2是写权限(Write)，4是读权限(Read)，
      具体权限相当于三种权限的数相加，如7＝1+2+4，即拥有读写和执行权。
    另外,临时文件/目录的权限为rwt，可写却不可删,关机后自动删除；建临时目录:chmod 777 目录名，再chmod +t 目录名。
设置用户归属：chown

文件搜索命令：
locate 文件名(搜索速度很快,在后台数据库搜索/var/lib/mlocate，不能实时搜索，数据库每天更新一次，配置文件/etc/updatedb.conf) 
updatedb 强制更新后台数据库 
whereis 命令名 用来搜索命令所在路径及帮助文档所在位置 
 -b 只查找可执行文件 -m 只查找帮助文件
which 命令名 查找命令位置及命令的别名 
find 文件搜索命令,搜索文件名（完全匹配，使用通配符匹配） 
 -iname 不区分大小写
 -user 按照所有者搜索
 -nouser 查找没有所有者的文件
 -mtime -atime -ctime
 -size
 -inum
 -a逻辑与 -o逻辑或
 -exec 命令 {} \;对搜索结果执行命令操作
grep [选项] 字符串 文件名 -i忽略大小写 -v排除指定字符串 
                grep abc /etc/passwd 在passwd文件下找abc字符
 搜索字符串命令（包含匹配，使用正则表达式）
whoami 用户是谁 
who
who am i
whatis 命令名 该命令有什么作用
du 查看目录情况
    如 du -sk * 不加-s会显示子目录，-k按千字节排序 
    用法 du [-a] [-d] [-h|-k] [-r] [-o|-s] [-H|-L] [文件...]

帮助命令 
man [级别] 命令名 
-f查看帮助的级别(whatis),默认打开最小等级的帮助文件 
-k查看和命令相关的所有帮助(apropos) 
help shell内核命令 
命令 --help 
info 命令 把该命令所有帮助信息展现出来 
-<Enter>进入子帮助页面* -u上层 -n下一个 -p上一个 -q退出 
awk 按一定格式输出(pattern scanning and processing language) 
    用法 awk [-Fc] [-f 源代码 | 'cmds'] [文件]
压缩命令 
.zip #压缩文件 zip 文件名 源文件 #压缩目录 zip -r 压缩文件名 源目录 
unzip 
.gz #压缩文件，源文件消失 gzip 源文件 
#压缩文件，源文件保留 gzip -c 源文件 > 压缩文件 
#压缩目录下所有子文件，不压缩目录 gzip -r 目录 
-d解压缩(gunzip) 
.bz2 #压缩文件不保留源文件 bzip2 文件名 #压缩文件保存源文件 bzip2 -k 文件名 
.tar tar -cvf 打包文件名 源文件 -c打包 -v显示过程 -f指定打包后的文件名 
            tar -xvf 打包文件名 -x解打包 
.tar.gz tar -zcvf 压缩包名 源文件 -zxvf 解压缩 
.tar.bz2 tar -jcvf/-jxvf 

关机重启命令： 
shutdown [选项] 时间 -c取消前一个关机命令 -h关机 -r重启 //正确保存关机或重启的数据 
关机命令 halt / poweroff /init 0 
重启命令 reboot/init 6 
退出登陆 logout 
passwd 用户名 修改密码命令 
runlevel 
系统运行级别 0关机1单用户2不完全多用户不含NFS服务3完全多用户4未分配5图形界面6重启 /etc/inittab 

挂载命令： 
mount 查看系统已经挂载好的设备 
-a 依赖/etc/fstab内容自动挂载 
[-t 文件系统] [-o 特殊选项] 设备文件名 挂载点 
unmount 设备文件名或者挂载点(不能省略) 
fdisk -l查看系统中已经识别的硬盘 
            挂载u盘：   mount -t vfat /dev/sdb1 /mnt/usb/ 
            Linux默认不支持NTFS文件系统(ntfs-3g可以支持到NTFS，但是是只读的) 

cat查看文件内容 
touch新建空白文件 
w查看用户登录信息 
who系统用户信息 last所有用户登录信息 lastlog 

系统监控
top CPU使用情况 
iostat 显示自系统启动后的平均CPU时间（与uptime类似） 
vmstat可以显示检测结果的平均值或者取样值 
free 显示系统的所有内存的使用情况 
df -ah 显示磁盘占用情况 查看文件系统，查看数据区
    用法   df [-F FSType] [-abeghklntVvZ] [-o FSType 特定选项] [目录 | 块设备 | 资源] 
    df -k 以kbytes显示文件大小的查看文件系统方式
pmap 显示一个或者多个进程使用内存的数量，该命令需要首先通过ps -ef|grep 查看到需要监控进程的id，然后通过pmap id来查看具体内容 
ps -ef|grep
ps -aux
kill -9 id
jps //查看JVM进程id
kill
pkill
sleep

网络命令 
ifconfig -a
iwconfig 无线网卡信息 
ifdown/ifup 网卡设备名 禁用/启用该网卡 
ping [-c 次数] ip/域名 
telnet [域名/ip] [端口] 远程管理与端口探测命令(明文) 
traceroute [-n 使用IP速度更快] IP或域名 路由跟踪命令 
wget 资源网址 下载命令 
tcpdump -i eth0 -nnX port 21 可以用来抓包 
-i 制定网卡接口
-nn将数据包中的域名与服务转为IP
-X以十六进制和ASCII码显示数据包内容
port 指定监听端口
netstat 查询网络状态 
-t 列出TCP协议端口
-u 列出UDP协议端口
-n 不使用域名与服务名，使用IP地址和端口
-l 仅列出监听状态网络服务
-a 列出所有网络协议
常用命令：
netstat –anlp |grep 8080
netstat -n | awk ‘/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}’
-ESTABLISHED（正常可用）
-CLOSE_WAIT（代码有问题）
-TIME_WAIT(可以调优)
netstat -tuln 查看网络基本端口
netstat -an 查看程序端口和网络端口,看连接到服务器上有谁
netstat -rn 列出路由列表，功能和route命令一致
route -n 查看路由列表
setup 设定网关 
nslookup 用来翻译域名对应IP 
ssh 用户名@主机名IP 
scp 源文件用户名@源文件主机名IP:源文件 目标用户名@目标主机名IP:目标文件 
-r 目录
-p选择端口
-v显示进度
-c使用压缩
-4强制使用IPV4
-6强制使用IPV6

echo $Shell 
    Shell脚本(可以直接执行Linux命令) 
    Shell 依赖ASCII码表翻译成机器语言(01) 用户<->命令<->Shell<->系统内核<->硬件 
echo $Shell 
echo -e 支持转义字符，\x按照16进制ASCII码表输出 

#!/bin/bash 
echo -e "\e[1;31m 开启颜色显示\e[0m" 

vim hello.sh 
chmod 755 hello.sh 
bash hello.sh(无需赋予权限) | ./hello.sh 

命令的别名和快捷键 
alias 查看系统中所有的命令别名 
alias 别名='原命令' 设定命令别名 
vim ~/.bashrc 写入环境变量配置文件永久生效 
unalias 删除别名 
alias ls='ls --color=auto'
alias ll='ls -l --color=auto'
别名生效顺序： 
绝对路径或相对路径执行的命令>别名>Bash的内部命令>$PATH环境变量定义的目录查找顺序找到的第一个命令 

history [选项] [历史命令保存文件] /etc/profile HISTSIZE=1000 
    -c 清空历史命令 
    -w 把缓存中的历史命令写入历史命令保存文件 ~/.bash_history 
使用上下箭头调用历史命令 
使用!n重复执行第n条历史命令 
使用!!重复执行上条命令 
使用!字串 重复执行最近一个以字串开头的命令 

标准输入输出 
设备  设备文件名 文件描述符 类型 
键盘  /dev/stdin  0 标准输入 
显示器 /dev/sdtout 1 标准输出 
显示器 /dev.sdterr 2 标准错误输出 

输出重定向
标准输出重定向 命令 > 文件 覆盖方式输出
命令 >> 文件 追加方式输出
错误命令 2>文件 覆盖方式输出错误到指定文件
错误命令 2>>文件 追加方式输出错误到指定文件
命令 > 文件 2>&1 以覆盖方式把正确和错误输出保存到同一个文件中 相当于 命令 &>文件
命令 >> 文件 2>&1 以追加方式把正确和错误输出保存到同一个文件中 相当于 命令 &>>文件
命令>>文件1 2>>文件2 把正确的输出到文件1中，把错误的输出追加大文件2中
命令 &>/dev/null 命令执行结果不会显示到屏幕中也不会保存到文件中

输入重定向 <以文件作为内容输入 <<以标识符之间的内容作为输入
wc [选项] [文件名] 单词统计
-c统计字节数
-w统计单词数
-l统计行数

多命令顺序执行 ; 多个命令顺序执行，之间无关系 
&& 逻辑与 
|| 逻辑或 
ls && echo yes || echo no
管道符： 命令1 | 命令2  命令1的正确输出作为命令2的操作对象 
通配符 用来匹配文件名或目录名 
? 匹配任意一个字符 
* 匹配任何内容 
[] 匹配括号内任意一个字符 
[-]匹配括号中某一范围任意一个字符 
[^]逻辑非，匹配不是该括号的一个字符 
特殊符号 
'' 单引号。单引号中的所有特殊符号都没有特殊含义 
"" 双引号。双引号中除 $调用变量的值 `引用命令 \转义符 外的特殊符号都没有特殊含义 
`` 反引号。反引号括起来的内容是系统命令，在Bash中会先执行它。和$()作用一样。 
$() 和反引号作用一样，用来引用系统命令。 
# Shell脚本中，#开头的行表示注释 
$ 用于调用变量的值，如需要调用变量name，需要$name的方式得到变量的值。 
\ 转义符。把特殊符号转义成普通字符 

用户和用户组 
/etc/group 存储当前系统中所有用户组的信息 
Group : x : 123 ;abd,des,xyz 
组名称:组密码占位符:组编号:组中用户名列表 
root:x:0: 
/etc/gshadow 存储当前系统中用户组的密码信息 
Group : * : ;abd,des,xyz 
组名称:组密码:组管理者:组中用户名列表 
/etc/passwd 存储系统用户的所有信息 
/etc/shadow 存储当前系统所有用户的密码信息 
groupadd 用户组名 
groupmod -n 新组名 源组名 更改用户组名 
-g 组编号 组名称 更改组编号 
groupdel 组名 
useradd -g 组名 用户名 
useradd -d /home/xxx imooc 创建用户的时候同事创建个人文件夹 
id 显示用户有效的uid(用户字)和gid(组名)
    用法 id [-ap] [user]
    id 显示自己的。
    id root 显示root的。
    id -a root 显示用户所在组的所有组名(如root用户，是所有组的组员)
时间显示
date 显示时间，精确到秒 
    用法 date [-u] mmddHHMM[[cc]yy][.SS]
    date [-u] [+format]
    date -a [-]sss[.fff]
cal 显示日历 
    cal 9 2008 显示2008年9月的日历； cal 显示当月的
    用法 cal [ [月] 年 ]
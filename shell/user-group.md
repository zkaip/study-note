Linux 用户 和 用户组
===
1、用户账号的管理
useradd 选项 用户名
userdel 选项 用户名
usermod 选项 用户名
Linux提供了集成的系统管理工具userconf，它可以用来对用户账号进行统一管理。
2、用户口令管理
passwd 选项 用户名
3、用户组管理
groupadd 选项 用户组
groupdel 选项 用户组
groupmod 选项 用户组
newgrp 用户组 //切换用户组
4、与用户账号有关的系统文件
    1、/etc/passwd文件是用户管理工作涉及的最重要的一个文件。
Linux系统中的每个用户都在/etc/passwd文件中有一个对应的记录行，它记录了这个用户的一些基本属
性。
这个文件对所有用户都是可读的。
    用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell
许多Linux 系统（如SVR4）都使用了shadow技术，把真正 的加密后的用户口令字存放到/etc/shadow文件中，而在/etc/passwd文件的口令字段中只存放一个特殊的字符，例如“x”或者“*”。
伪用户                     含 义
bin                     拥有可执行的用户命令文件
sys                     拥有系统文件
adm                  拥有帐户文件
uucp                 UUCP使用
lp                       lp或lpd子系统使用
nobody             NFS使用
    2、/etc/shadow中的记录行与/etc/passwd中的一一对应，它由pwconv命令根据/etc/passwd中的 数据自动产生
    登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志
    3、用户组的所有信息都存放在/etc/group文件中。
    组名:口令:组标识号:组内用户列表
5、添加批量用户
（1）先编辑一个文本用户文件。
user001::600:100:user:/home/user001:/bin/bash
user002::601:100:user:/home/user002:/bin/bash
user003::602:100:user:/home/user003:/bin/bash
user004::603:100:user:/home/user004:/bin/bash
user005::604:100:user:/home/user005:/bin/bash
user006::605:100:user:/home/user006:/bin/bash
（2）以root身份执行命令 /usr/sbin/newusers，从刚创建的用户文件user.txt中导入数据，创建用户:
# newusers < user.txt
（3）执行命令/usr/sbin/pwunconv。
            # pwunconv
（4）编辑每个用户的密码对照文件。
user001:密码
user002:密码
user003:密码
user004:密码
user005:密码
user006:密码
（5）以root身份执行命令 /usr/sbin/chpasswd。
# chpasswd < passwd.txt
（6）确定密码经编码写入/etc/passwd的密码栏后。执行命令 /usr/sbin/pwconv 将密码编码为 shadow password，并将结果写入 /etc/shadow。
# pwconv

Cron 定时任务
===
cron是一个linux下的定时执行工具，可以在无需人工干预的情况下运行作业。

由于Cron 是Linux的内置服务，但它不自动起来，可以用以下的方法启动、关闭服务：
          /sbin/service crond start //启动服务 
/sbin/service crond stop //关闭服务
/sbin/service crond restart //重启服务
/sbin/service crond reload //重新载入配置
  你也可以将这个服务在系统启动的时候自动启动： 
  在/etc/rc.d/rc.local这个脚本的末尾加上：/sbin/service crond start 或者 chkconfig --level 35 crond on

如何往 cron 中添加一个作业?
# crontab –e 
0 5 * * * /root/bin/backup.sh
这将会在每天早上5点运行 /root/bin/backup.sh 

/etc/crontab文件
$ cat /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/

# run-parts
01 * * * * root run-parts /etc/cron.hourly
02 4 * * * root run-parts /etc/cron.daily
22 4 * * 0 root run-parts /etc/cron.weekly
42 4 1 * * root run-parts /etc/cron.monthly

前四行是有关设置cron任务运行的环境变量。SHELL变量的值指定系统使用的SHELL环境(该样例为bash shell)，PATH变量定义了执行命令的路径。Cron的输出以电子邮件的形式发给MAILTO变量定义的用户名。如果MAILTO变量定义为空字符串(MAILTO="")，电子邮件不会被发送。执行命令或脚本时HOME变量可用来设置基目录。
    文件/etc/crontab中每行任务的描述格式如下:
 
    minute hour day month dayofweek command
     minute - 从0到59的整数  
    hour - 从0到23的整数
    day - 从1到31的整数 (必须是指定月份的有效日期)
    month - 从1到12的整数 (或如Jan或Feb简写的月份)
    dayofweek - 从0到7的整数，0或7用来描述周日 (或用Sun或Mon简写来表示)
    command - 需要执行的命令(可用as ls /proc >> /tmp/proc或 执行自定义脚本的命令)
 
    root表示以root用户身份来运行
    run-parts表示后面跟着的是一个文件夹，要执行的是该文件夹下的所有脚本
    对于以上各语句，星号(*)表示所有可用的值。例如*在指代month时表示每月执行(需要符合其他限制条件)该命令。
    整数间的连字号(-)表示整数列，例如1-4意思是整数1,2,3,4
    指定数值由逗号分开。如：3,4,6,8表示这四个指定整数。
    符号“/”指定步进设置。“/<interger>”表示步进值。如0-59/2定义每两分钟执行一次。步进值也可用星号表示。如*/3用来运行每三个月份运行指定任务。
    以“#”开头的为注释行,不会被执行。
    如果一个cron任务需要定期而不是按小时,天,周,月来执行,则需要添加/etc/cron.d目录。这个目录下的所有文件和文件/etc/crontab语法相同，查看样例： 
# record the memory usage of the system every monday
# at 3:30AM in the file /tmp/meminfo
30 3 * * mon cat /proc/meminfo >> /tmp/meminfo
# run custom scrīpt the first day of every month at 4:10AM
10 4 1 * * /root/scrīpts/backup.sh
    除了root用户之外的用户可以执行crontab配置计划任务。所有用户定义的crontab存储在目录/var/spool/cron下，任务会以创建者的身份被执行。要以特定用户创建一个crontab，先以该用户登录，执行命令crontab -e，系统会启动在VISUAL或者EDITOR中指定的的编辑软件编辑crontab。文件内容与/etc/crontab格式相同。示例如下：
每天3点执行/home/dbbackup/db1backup.sh backup，4点执行/home/dbbackup/db2backup.sh backup
    0 3 * * * /home/dbbackup/db1backup.sh backup    
    0 4 * * * /home/dbbackup/db2backup.sh backup 
如果是每五分钟执行一次可改为： 
   */5 * * * * /home/dbbackup/db2backup.sh backup 
    当更改的crontab需要保存时，文件会保存在成如下文件/var/spool/cron/username。文件名会根据用户名而不同。 
    cron服务会每分钟检查一次/etc/crontab、/etc/cron.d/、/var/spool/cron文件下的变更。如果发现变化，就会下载到存储器中。因此，即使crontab文件改变了，程序也不需要重新启动。推荐自定义的任务使用crontab -e命令添加，退出后用/etc/init.d/crond restart命令重启crond进程，官方文件说不用重启进程，但我遇到不重启无法运行任务的情况。开始不知道/etc/crontab文件中的run-parts是什么意思，直接把命令按照/etc/crontab的格式加上总是无法运行，后来才知道run-parts是指后面跟着的是文件夹。

Cron 各项的描述
以下是 crontab 文件的格式： 
{minute} {hour} {day-of-month} {month} {day-of-week} {full-path-to-shell-script}  
 minute: 区间为 0 – 59  
 hour: 区间为0 – 23  
 day-of-month: 区间为0 – 31  
 month: 区间为1 – 12. 1 是1月. 12是12月.  
 Day-of-week: 区间为0 – 7. 周日可以是0或7

Crontab 示例
1. 在 12:01 a.m 运行，即每天凌晨过一分钟。这是一个恰当的进行备份的时间，因为此时系统负载不大。 
    1 0 * * * /root/bin/backup.sh 
2. 每个工作日(Mon – Fri) 11:59 p.m 都进行备份作业。 
    59 11 * * 1,2,3,4,5 /root/bin/backup.sh 
    下面例子与上面的例子效果一样： 
    59 11 * * 1-5 /root/bin/backup.sh 
3. 每5分钟运行一次命令 
    */5 * * * * /root/bin/check-status.sh 
4. 每个月的第一天 1:10 p.m 运行 
    10 13 1 * * /root/bin/full-backup.sh
5. 每个工作日 11 p.m 运行。
    0 23 * * 1-5 /root/bin/incremental-backup.sh

Crontab 选项
以下是 crontab 的有效选项:
crontab –e : 修改 crontab 文件. 如果文件不存在会自动创建。
crontab –l : 显示 crontab 文件。
crontab -r : 删除 crontab 文件。
crontab -ir : 删除 crontab 文件前提醒用户。
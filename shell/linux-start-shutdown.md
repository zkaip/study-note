Linux 启动与关机
===
启动：
1、内核的引导   
    BIOS开机自检->按照BIOS设置的启动设备来启动 ->操作系统接管硬件读入/boot目录下的内核文件
2、运行init
    init进程->读取配置文件 /etc/inittab ->运行级别 
3、系统初始化    
    系统初始化 si::sysinit:/etc/rc.d/rc.sysinit　它调用执行了/etc/rc.d/rc.sysinit(它主要完成的工作有：激活交换分区，检查磁盘，加载硬件模块以及其它一些需要优先执行任务。)
    l5:5:wait:/etc/rc.d/rc 5
这一行表示以5为参数运行/etc/rc.d/rc，/etc/rc.d/rc是一个Shell脚本，它接受5作为参数，去执
行/etc/rc.d/rc5.d/目录下的所有的rc启动脚本，/etc/rc.d/rc5.d/目录中的这些启动脚本实际上都是一些连
接文件，而不是真正的rc启动脚本，真正的rc启动脚本实际上都是放在/etc/rc.d/init.d/目录下。
    ->/etc/rc.d/init.d
在每个运行级中将运行哪些守护进程，用户可以通过chkconfig或setup中的"System Services"来自行设定。
4、建立终端
    init接下来会打开6个终端，以便用户登录系统。在inittab中的以下6行就是定义了6个终端：
1:2345:respawn:/sbin/mingetty tty1
2:2345:respawn:/sbin/mingetty tty2
3:2345:respawn:/sbin/mingetty tty3
4:2345:respawn:/sbin/mingetty tty4
5:2345:respawn:/sbin/mingetty tty5
6:2345:respawn:/sbin/mingetty tty6
在2、3、4、5的运行级别中都将以respawn方式运行mingetty程序，mingetty程序能打 开终端、设置模式。 
同时它会显示一个文本登录界面，这个界面就是我们经常看到的登录界面，在这个登录界面中会提示用 户输入用户名，而用户输入的用户将作为参数传给login程序来验证用户的身份。
5、用户登录系统
（1）命令行登录
（2）ssh登录
（3）图形界面登录
Linux的账号验证程序是login，login会接收mingetty传来的用户名作为用户名参数。然后login会对用户名进行分析：如果用户名不是root，且存在/etc/nologin文件，login将输出nologin文件的内容，然后退出。 
这通常用来系统维护时防止非root用户登录。只有/etc/securetty中登记了的终端才允许root用户登录，如果不存在这个文件，则root可以在任何终端上登录。 
/etc/usertty文件用于对用户作出附加访问限制，如果不存在这个文件，则没有其他限制。

关机：
正确的关机流程为：sysnc > shutdown > reboot > halt
关机指令为：shutdown
sync 将数据由内存同步到硬盘中。
shutdown 关机指令，你可以man shutdown 来看一下帮助文档。例如你可以运行如下命令关机：
shutdown –h 10 ‘This server will shutdown after 10 mins’ 这个命令告诉大家，计算机将在10分钟后关机，Shutdown –h now 立马关机
Shutdown –h 20:25 系统会在今天20:25关机
Shutdown –h +10 十分钟后关机
Shutdown –r now 系统立马重启
Shutdown –r +10 系统十分钟后重启
reboot 就是重启，等同于 shutdown –r now
halt 关闭系统，等同于shutdown –h now 和 poweroff
关机的命令有 shutdown –h now halt poweroff 和 init 0 , 重启系统的命令有 shutdown –r now reboot init  6.
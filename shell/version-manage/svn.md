SVN
===
###安装svn客户端
ubuntu下使用`$sudo apt-get install subversion`

### svn 使用
![image description](http://bitmingw.com/assets/2015-02-03-svn-for-git-users/local-remote-svn2.png)
####checkeout命令(检出)：
第一次使用时使用checkout命令，把服务器的目录拷贝到本地的当前目录下，同时会建立一个隐藏文件夹记录版本信息：

    [工作目录]$svn checkout "http://domain/svn/trunk/myproject" --username test
然后输入密码

#### svn update命令
获取服务器上的最新版本

    [工作目录]$svn update
（除了第一次要加url和用户名和密码，之后系统会记住）

#### svn add命令
要把非版本控制的本地文件添加到版本控制：

    [工作目录]$svn add hello.c

#### svn commit命令
把本地文件上传到服务器

    [工作目录]$svn commit（如果有新的文件，要首先svn add）
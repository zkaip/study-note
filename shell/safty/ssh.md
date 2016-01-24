#### scp 复制
`scp 本地用户名 @IP 地址 : 文件名 1 远程用户名 @IP 地址 : 文件名 2 `
[ 本地用户名 @IP 地址 :] 可以不输入 ,可能需要输入远程用户名所对应的密码 . 

- -v 和大多数 linux 命令中的 -v 意思一样 , 用来显示进度 . 可以用来查看连接 , 认证 , 或是配置错误 . 
- -C 使能压缩选项 . 
- -P 选择端口 . 注意 -p 已经被 rcp 使用 . 
- -4 强行使用 IPV4 地址 . 
- -6 强行使用 IPV6 地址 . 
- -r Recursively copy entire directories. 

#### SSH 登录
ssh [-l login_name] [-p port] [user@]hostname

### 生成SSH-key

    $ ssh-keygen -t rsa -C "youremail@example.com"

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有`id_rsa`和`id_rsa.pub`两个文件

__这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。__

#### SSH免密码登录
本机的公钥放置在所要登录机器`~/.ssh`(权限700)目录下的`authorized_keys`(权限600)即可
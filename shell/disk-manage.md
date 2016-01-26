Linux 磁盘管理
===
Linux磁盘管理常用三个命令为df、du和fdisk。
df：列出文件系统的整体磁盘使用量           df [-ahikHTm] [目录或文件名]
du：检查磁盘空间使用量                            du [-ahskm] 文件或目录名称
fdisk：用于磁盘分区                                   fdisk [-l] 装置名称
mkfs: 磁盘格式化                                         mkfs [-t 文件系统格式] 装置文件名
fsck: 用来检查和维护不一致的文件系统。    fsck [-t 文件系统] [-ACay] 装置名称
磁盘挂载与卸除：
Linux 的磁盘挂载使用 mount 命令，卸载使用 umount 命令。
mount [-t 文件系统] [-L Label名] [-o 额外选项] [-n] 装置文件名 挂载点
umount [-fn] 装置文件名或挂载点
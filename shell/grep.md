grep
===
### grep退出状态
- **0** 表示成功；
- **1** 表示在所提供的文件无法找到匹配的pattern；
- **2** 表示参数中提供的文件不存在。

### grep应用正则表达式
- `grep NW testfile`     #打印出testfile中所有包含NW的行。
- `grep '^n' testfile`   #打印出以n开头的行。
- `grep '4$' testfile`   #打印出以4结尾的行。
- `grep '5\..' testfile` #打印出第一个字符是5，后面跟着一个.字符，再后面是任意字符的行。
- `grep '\.5' testfile`  #打印出所有包含.5的行。
- `grep '^[we]' testfile` #打印出所有以w或e开头的行。
- `grep '[^0-9]' testfile` #打印出所有不是以0-9开头的行。
- `grep '[a-z]\{9\}' testfile` #打印所有包含每个字符串至少有9个连续小写字符的字符串的行。
- `grep '\(3\)\.[0-9].*\1    *\1' testfile` #第一个字符是3，紧跟着一个句点，然后是任意一个数字，然后是任意个任意字符，然后又是一个3，然后是制表符，然后又是一个3，需要说明的是，下面正则中的\1表示\(3\)。
- `grep '\<north' testfile`    #打印所有以north开头的单词的行。
- `grep '\<north\>' testfile`  #打印所有包含单词north的行。
- `grep '^n\w*' testfile`      #第一个字符是n，后面是任意字母或者数字。

### 扩展grep(`grep -E` 或者 `egrep`)
**使用扩展grep的主要好处是增加了额外的正则表达式元字符集**
`egrep 'NW|EA' testfile`     #打印所有包含NW或EA的行。如果不是使用egrep，而是grep，将不会有结果查出。
`grep 'NW\|EA' testfile`     #对于标准grep，如果在扩展元字符前面加\，grep会自动启用扩展选项-E。

`egrep '3+' testfile`
`grep -E '3+' testfile`
`grep '3\+' testfile`   #这3条命令将会打印出相同的结果，即所有包含一个或多个3的行。

`egrep '2\.?[0-9]' testfile` 
`grep -E '2\.?[0-9]' testfile`
`grep '2\.\?[0-9]' testfile` #首先含有2字符，其后紧跟着0个或1个点，后面再是0和9之间的数字。

`egrep '(no)+' testfile`
`grep -E '(no)+' testfile`
`grep '\(no\)\+' testfile`   #3个命令返回相同结果，即打印一个或者多个连续的no的行。

`grep -E '\w+\W+[ABC]' testfile` #首先是一个或者多个字母，紧跟着一个或者多个非字母数字，最后一个是ABC中的一个。

`egrep '[Ss](h|u)' testfile`
`grep -E '[Ss](h|u)' testfile`
`grep '[Ss]\(h\|u\)' testfile`   #3个命令返回相同结果，即以S或s开头，紧跟着h或者u的行。

`egrep 'w(es)t.*\1' testfile`    #west开头，其中es为\1的值，后面紧跟着任意数量的任意字符，最后还有一个es出现在该行。

### grep选项：
**常用的命令行选项**
选项 | 说明
:---:|:---
`-c` | 只显示有多少行匹配，而不具体显示匹配的行。
`-h` | 不显示文件名。
`-i` | 在字符串比较的时候忽略大小写。
`-l` | 只显示包含匹配模板的行的文件名清单。
`-L` | 只显示不包含匹配模板的行的文件名清单。
`-n` | 在每一行前面打印该行在文件中的行数。
`-v` | 反向检索，只显示不匹配的行。
`-w` | 只显示完整单词的匹配。
`-x` | 只显示完整行的匹配。
`-r/-R` | 如果文件参数是目录，该选项将递归搜索该目录下的所有子目录和文件。
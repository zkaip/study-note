### 命令追踪
`set -x` **从该命令后打开命令追踪**
`set +x` **从该命令后关闭命令追踪**
`sh -x *.sh` **执行脚本开启命令追踪**

### 关闭/打开自动打印输入字符
`stty -echo` / `stty echo`

### set设置bash选项
- allexport -a  打开此开关，所有变量都自动输出给子Shell。
- noclobber -C  防止重定向时文件被覆盖。
- noglob  -d  在路径和文件名中，关闭通配符。

/> set -o allexport   #打开该选项 等同于set -a
/> set +o allexport  #关闭该选项 等同于set +a
/> set -o #列出当前所有选项的当前值。
allexport         off
braceexpand   on
emacs             on
errexit            off
errtrace          off
functrace        off
hashall            on
histexpand      on
... ...
/> set -o noclobber     #打开noclobber选项，防止在重定向时原有文件被覆盖。
/> set +o noclobber    #关闭noclobber选项。

### shell变量
**设置局部变量**
- name="stephen liu"  #注意等号两边不要有空格，如果变量值之间存在空格，则需要用双引号括起
- name=                    #将变量设置为空时，等号后面也不要有空格，直接回车即可。
- declare name="stephen liu"
- readonly name         #将name变量设置为只读。
- unset name             #如果unset只读变量，将同样报错，提示不能unset只读变量。

**设置全局/环境变量**
- export allname=john         #利用export命令，将其后声明的变量置为环境变量
- declare -x allname2=peter #这里的功能和结果都是和上面的命令相同，只是利用declare -x命令设置环境变量

**元字符**
元字符 | 描述
:---:|:---
`;` | 命令分隔符
`&` | 后台处理Shell命令
`()` | 命令组，创建一个子Shell
`{}` | 命令组，但是不创建子Shell
`|` | 管道
`< >` | 输入输出重定向
`$` | 变量前缀
`*[]?` | 用于文件名扩展的Shell通配符

**引用字符**
可以使Shell中所有元字符失去其特殊功能，而还原其本意。
引用字符 | 描述
:---:|:---
`\` | 转义
`'` | 字符串
`"` | 双引号内可以包含变量和命令替换

**命令替换**
同样我们需要把命令的输出结果赋值给一个变量或者需要用字符串替换变量的输出结果时，我们可以使用变量替换。在Shell中，通常使用 **反引号** 的方法进行命令替换。我们也可以使用`$(command)`形式用于命令替换。

**内置的环境变量**
变量名 | 含义
:---:|:---
BASH | 表示bash命令的完整路径名。
ENV | 在启动新bash shell时执行的环境文件名。
HOME | 主目录。
LANG | 本地化语言。
PATH | 命令搜索路径，彼此之间冒号分隔。
PPID | 父进程PID。
PWD | 当前工作目录，用cd命令设置。

**内置变量**
变量名 | 描述
:---:|:---
`$?` | 表示Shell命令的返回值
`$$` | 表示当前Shell的pid
`$-` | 表示当前Shell的命令行选项
`$!` | 最后一个放入后台作业的PID值
`$0` | 表示脚本的名字
`$1--$9` | 表示脚本的第一到九个参数
`${10}` | 表示脚本的第十个参数
`$#` | 表示参数的个数
`$*,$@` | 表示所有的参数，有双引号时除外，"$*"表示赋值到一个变量，"$@"表示赋值到多个。

**声明数值型的变量**
在`declare`命令的后面添加`-i`选项
在Shell中还提供了一个内置命令`let`，专门用于计算数学运算的

**数组**
`${arrayname[index]}`
`${#array[*]}`表示数组中元素的数量，而`${#friend[0]}`则表示第一个元素的长度。

**变量替换运算符**
修改符 | 描述 | 用途
${variable:-word} | 如variable被设置且非空，则返回该值，否则返回word，变量值不变。 | 如变量未定义，返回默认值。
${variable-word}  | 如variable未被设置，则返回word，变量值不变，如果设置变量，则返回变量值，即使变量的值为空值。  | 如变量未设置，返回默认值。
${variable:=word} | 如variable被设置且非空，则返回该值，否则设置变量为word，同时返回word。 | 如果变量未定义，则设置其为默认值。
${variable=word}  | 如variable未设置，则设置变量为word，同时返回word，如果variable被设置且为空，将返回空值，同时variable不变。否则返回variable值，同时variable不变。  | 如果变量未设置，则设置其为默认值。
${variable:+word} | 如variable被设置且非空，则返回word，否则返回null，变量值不变。 用于测试变量是否存在。
${variable+word}  | 如variable被设置(即使是空值)，则返回word，否则返回空。  | 用于测试变量是否设置。
${variable:?word} | 如variable被设置且非空，则返回该值，否则显示word，然后退出Shell。如果word为空，打印"parameter null or not set" | 为了捕捉由于变量未定义所导致的错误。
${variable:offset}  | 从variable的offset位置开始取，直到末尾。 |  
${variable:offset:length} | 从variable的offset位置开始取length个字符。 | 

**变量模式匹配运算符**
运算符 | 替换
:---:|:---
`${variable#pattern}` | 如果模式匹配变量值的开头，则删除匹配的最短部分，并返回剩下的部分，变量原值不变。
`${variable##pattern}` | 如果模式匹配变量值的开头，则删除匹配的最长部分，并返回剩下的部分，变量原值不变。
`${variable%pattern}` | 如果模式匹配变量值的结尾，则删除匹配的最短部分，并返回剩下的部分，变量原值不变。
`${variable%%pattern}` | 如果模式匹配变量值的结尾，则删除匹配的最长部分，并返回剩下的部分，变量原值不变。
`${#variable}` | 返回变量中字母的数量。

### 函数
`function_name () { commands; commands; }`
`function function_name { commands; commands; }`
`function function_name () { commands; commands; }`
函数的参数在函数内是以`$[0-9]`、`${10}`...，这种局部变量的方式来访问的。见下面的示例：
函数的左花括号和命令之间必须有至少一个空格。每个命令的后面都要有一个分号，即便是最后一个命令

### 重定向
操作符 | 功能
:---:|:---
`<` | 重新定向输入
`>` | 重新定向输出
`>>` | 追加输出
`2>` | 重新定向错误
`&>` | 重新定向错误和输出
`>&` | 重新定向错误和输出
`2>&1` | 重新定向错误到标准输出
`1>&2` | 重新定向标准输出到错误
`>|` | 重新定向输出的时候覆盖noclobber选项

- `find . -name "*.c" -print > foundit 2> /dev/null` #find命令将搜索结果输出到foundit文件，把错误信息输出到/dev/null
- `find . -name "*.c" -print >& foundit` #将find命令的搜索结果和错误信息均输出到foundit文件中。
- `find . -name "*.c" -print > foundit 2>&1` #同上。
- `echo "File needs an argument" 2> errfile 1>&2` #echo命令先将错误输出到errfile，再把信息发送到标准错误，该信息标准错误与标准输出合并在一起(errfile中)。
### shell命令
#### echo命令
转义序列 | 功能
:---:|:---
`\c` | 不换行打印
`\n` | 换行
`\t` | 制表符
`\\` | 反斜杠

#### printf命令
转义序列 | 功能
:---:|:---
`\c` | 不换行打印
`\n` | 换行
`\t` | 制表符
`\\` | 反斜杠
`\"` | 双引号

说明符 | 描述
:---:|:---
%c | ASCII字符
%d,%i | 十进制整数
%f | 浮点格式
%o | 不带正负号的八进制值
%s | 字符串
%u | 不带正负号的十进制值
%x | 不带正负号的十六进制值，其中使用a-f表示10-15
%X | 不带正负号的十六进制值，其中使用A-F表示10-15
%% | 表示%本身

- printf "The number is %.2f.\n" 100   这里.2f表示保留小数点后两位
- printf "%-20s%-15s%10.2f\n" "Stephen" "Liu" 35
- printf "|%10s|\n" hello
- printf "%x %#x\n" 15 15 #如果#标志和%x/%X搭配使用，在输出十六进制数字时，前面会加0x/0X前缀。

### 数学扩展
Shell中提供了两种计算数学表达式的格式：`$[ expression ]`和`$(( expression ))`。

### xargs 从输入中构建和执行shell命令。
在使用find命令的-exec选项处理匹配到的文件时， find命令将所有匹配到的文件一起传递给exec执行。但有些系统对能够传递给exec的命令长度有限制，这样在find命令运行几分钟之后，就会出现溢出错误。错误信息通常是“参数列太长”或“参数列溢出”。这就是xargs命令的用处所在，特别是与find命令一起使用。  
find命令把匹配到的文件传递给xargs命令，而xargs命令每次只获取一部分文件而不是全部，不像-exec选项那样。这样它可以先处理最先获取的一部分文件，然后是下一批，并如此继续下去。  
在有些系统中，使用-exec选项会为处理每一个匹配到的文件而发起一个相应的进程，并非将匹配到的文件全部作为参数一次执行；这样在有些情况下就会出现进程过多，系统性能下降的问题，因而效率不高；  
而使用xargs命令则只有一个进程。另外，在使用xargs命令时，究竟是一次获取所有的参数，还是分批取得参数，以及每一次获取参数的数目都会根据该命令的选项及系统内核中相应的可调参数来确定。

- `find . -type f -print | xargs file` #查找当前目录下的每一个普通文件，然后使用xargs命令来测试它们分别属于哪类文件。
- `find . -type f -print | xargs chmod a-x` #回收当前目录下所有普通文件的执行权限。
- `find . -type f -print | xargs grep "hostname` #在当面目录下查找所有普通文件，并用grep命令在搜索到的文件中查找hostname这个词
- `find / -name "core" -print | xargs echo "" >/tmp/core.log` 　 #在整个系统中查找内存信息转储文件(core dump) ，然后把结果保存到/tmp/core.log 文件中。
- `pgrep mysql | xargs kill -9` #直接杀掉mysql的进程

### 常用的命令行命令
#### 获取系统运行数据
##### 输出当前系统中占用内存最多的5条命令
1) 通过ps命令列出当前主机正在运行的所有进程。
2) 按照第五个字段基于数值的形式进行正常排序(由小到大)。
3) 仅显示最后5条输出。
`ps aux | sort -k 5n | tail -5`
    
##### 找出cpu利用率高的20个进程
1) 通过ps命令输出所有进程的数据，-o选项后面的字段列表列出了结果中需要包含的数据列。
2) 将ps输出的Title行去掉，grep -v PID表示不包含PID的行。
3) 基于第一个域字段排序，即pcpu。n表示以数值的形式排序。
4) 输出按cpu使用率排序后的最后20行，即占用率最高的20行。
`ps -e -o pcpu,pid,user,sgi_p,cmd | grep -v PID | sort -k 1n | tail -20`

##### 获取当前系统物理内存的总大小
1) 以兆(MB)为单位输出系统当前的内存使用状况。
2) 通过grep定位到Mem行，该行是以操作系统为视角统计数据的。
3) 通过awk打印出该行的第二列，即total列。
`free -m | grep "Mem" | awk '{print $2, "MB"}'`

#### 系统管理
##### 获取当前或指定目录下子目录所占用的磁盘空间，并将结果按照从大到小的顺序输出
1) 输出/usr的子目录所占用的磁盘空间。
2) 以数值的方式倒排后输出。
`du -s /usr/* | sort -nr`
    
##### 批量修改文件名
1) find命令找到文件名扩展名为.output的文件。
2) sed命令中的-e选项表示流编辑动作有多次，第一次是将找到的文件名中相对路径前缀部分去掉，如./aa改为aa。
  流编辑的第二部分，是将`20110311`替换为`mv & 20110310`，其中&表示s命令的被替换部分，这里即源文件名。
  \1表示被替换部分中#的`\(.*\)`。
3) 此时的输出应为
    #    mv 20110311.output 20110310.output
    #    mv 20110311abc.output 20110310abc.output
    #    最后将上面的输出作为命令交给bash命令去执行，从而将所有20110311*.output改为20110311*.output
`find ./ -name "*.output" -print  | sed -e 's/.\///g' -e 's/20110311\(.*\)/mv & 20110310\1/g' | bash`
    
##### 统计当前目录下文件和目录的数量
1) ls -l命令列出文件和目录的详细信息。
2) ls -l输出的详细列表中的第一个域字段是文件或目录的权限属性部分，如果权限属性部分的第一个字符为d，
    #    该文件为目录，如果是-，该文件为普通文件。
3) 通过wc计算grep过滤后的行数。
- `ls -l * | grep "^-" | wc -l`
- `ls -l * | grep "^d" | wc -l`
    
##### 杀掉指定终端的所有进程
1) 通过ps命令输出终端为pts/1的所有进程。
2) 将ps的输出传给grep，grep将过滤掉ps输出的Title部分，-v PID表示不包含PID的行。
3) awk打印输出grep查找结果的第一个字段，即pid字段。
4) 上面的三个组合命令是在反引号内被执行的，并将执行的结果赋值给数组变量${K}。
5) kill方法将杀掉数组${K}包含的pid。
`kill -9 ${K}=`ps -t pts/1 | grep -v PID | awk '{print $1}'`    `

##### 将查找到的文件打包并copy到指定目录
1) 通过find找到当前目录下(包含所有子目录)的所有*.txt文件。
2) tar命令将find找到的结果压缩成test.tar压缩包文件。
3) 如果&&左侧括号内的命令正常完成，则可以执行&&右侧的shell命令了。
4) 将生成后的test.tar文件copy到/home/.目录下。
`(find . -name "*.txt" | xargs tar -cvf test.tar) && cp -f test.tar /home/.`
    
1) cpio从find的结果中读取文件名，将其打包压缩后发送到./dest/dir(目标目录)。
2) cpio的选项介绍：
    #    -d：创建需要的目录。
    #    -a：重置源文件的访问时间。
    #    -m：保护新文件的修改时间。
    #    -p：将cpio设置为copy pass-through模式。 
`find . -name "*" | cpio -dampv ./dest/dir`

### shell编程
#### 读取用户变量
read命令是用于从终端或者文件中读取输入的内建命令，read命令读取整行输入，每行末尾的换行符不被读入。在read命令后面，如果没有指定变量名，读取的数据将被自动赋值给特定的变量REPLY。下面的列表给出了read命令的常用方式：

命令格式 | 描述
:---:|:---
read answer | 从标准输入读取输入并赋值给变量answer。
read first last | 从标准输入读取输入到第一个空格或者回车，将输入的第一个单词放到变量first中，并将该行其他的输入放在变量last中。
read | 从标准输入读取一行并赋值给特定变量REPLY。
read -a arrayname | 把单词清单读入arrayname的数组里。
read -p prompt | 打印提示，等待输入，并将输入存储在REPLY中。
read -r line | 允许输入包含反斜杠。

#### 状态判断
**test**
test是Shell中提供的内置命令，主要用于状态的检验，如果结果为0，表示成功，否则表示失败。
需要注意的是test命令不支持Shell中提供的各种通配符，如：
test命令还可以中括号予以替换，其语义保持不变

**[[ expr ]]**
在Shell中还提供了另外一种用于状态判断的方式：[[ expr ]]，和test不同的是，该方式中的表达式支持通配符，如：

**(( expr ))**
在Shell中还提供了let命令的判断方式： (( expr ))，该方式的expr部分，和C语言提供的表达式规则一致

**test命令支持的操作符**
在逻辑判断(复合判读中)，`pattern`可以包含元字符，在字符串的判断中，`pattern2`必须被包含在引号中。

判断操作符 | 判断为真的条件
:---:|:---
字符串判断 |  
[ stringA=stringB ] | stringA等于stringB
[ stringA==stringB ] |  stringA等于stringB
[ stringA!=stringB ] |  stringA不等于stringB
[ string ] |  string不为空
[ -z string ] | string长度为0
[ -n string ] | string长度不为0
逻辑判断 |   
[ stringA -a stringB ] |  stringA和stringB都是真
[ stringA -o stringB ] |  stringA或stringB是真
[ !string ] | string不为真
逻辑判断(复合判断) |   
[[ pattern1 && pattern2 ]] |  pattern1和pattern2都是真
[[ pattern1 || pattern2 ] | pattern1或pattern2是真
[[ !pattern ]] |  pattern不为真
整数判断 |   
[ intA -eq intB ] | intA等于intB
[ intA -ne intB ] | intA不等于intB
[ intA -gt intB ] | intA大于intB
[ intA -ge intB ] | intA大于等于intB
[ intA -lt intB ] | intA小于intB
[ intA -le intB ] | intA小于等于intB
文件判断中的二进制操作 | 
[ fileA -nt fileB ] | fileA比fileB新
[ fileA -ot fileB ] | fileA比fileB旧
[ fileA -ef fileB ] | fileA和fileB有相同的设备或者inode值
文件检验  | 
[ -d $file ] or [[ -d $file ]] | file为目录且存在时为真
[ -e $file ] or [[ -e $file ]] | file为文件且存在时为真
[ -f $file ] or [[ -f $file ]] | file为非目录普通文件存在时为真
[ -s $file ] or [[ -s $file ]] | file文件存在, 且长度不为0时为真
[ -L $file ] or [[ -L $file ]] | file为链接符且存在时为真
[ -r $file ] or [[ -r $file ]] | file文件存在且可读时为真
[ -w $file ] or [[ -w $file ]] | file文件存在且可写时为真
[ -x $file ] or [[ -x $file ]] | file文件存在且可执行时为真


**let命令支持的操作符和C语言中支持的操作符完全相同**
`+,-,*,/,%` 加，减，乘，除，去模
`>>,<<` 右移和左移
`>=,<=,==,!=` 大于等于，小于等于，等于，不等于
`&,|,^` 按位与，或，非
`&&,||,!` 逻辑与，逻辑或和取反
还有其含义和C语言等同的快捷操作符，如`=,*=,/=,%=,+=,-=,<<=,>>=,&=,|=,^=。`

#### 流程控制语句
**if语句**
```bash
#if语句的后面是Shell命令，如果该命令执行成功返回0，则执行then后面的命令。
if command        
then
  command
  command
fi
#下面的格式和test expression等同
if [ string/numeric expression ]
then
  command
fi
#下面的两种格式也可以用于判断语句的条件表达式，而且它们也是目前比较常用的两种。
if [[ string expression ]]
then
  command
fi

if (( numeric expression ))   #let表达式
then
  command
fi
```

**if/elif/else语句**
```bash
if command
then 
  command
elif command
then
  command
else
  command
fi
```

**case语句**
```bash
case variable in
value1)
  command
  ;;            #相同于C语言中case语句内的break。
value2)
  command
  ;;
*)                #相同于C语言中switch语句内的default
 command
  ;;
esac
```

#### 循环语句
Shell中主要提供了三种循环方式：`for`、`while`和`until`。

**for循环声明格式**
```bash
for variable in word_list
do
  command
done
```
**while循环声明格式**
```bash
while command  #如果command命令的执行结果为0，或条件判断为真时，执行循环体内的命令。
do
  command
done
```

**until循环声明格式**
```bash
until command                         #其判断条件和while正好相反，即command返回非0，或条件为假时执行循环体内的命令。
do
  command
done
```

**shift命令声明格式:shift [n]**
shift命令用来把脚本的位置参数列表向左移动指定的位数(n)，如果shift没有参数，则将参数列表向左移动一位。一旦移位发生，被移出列表的参数就被永远删除了。通常在while循环中，shift用来读取列表中的参数变量。

**break命令声明格式：break [n]**
和C语言不同的是，Shell中break命令携带一个参数，即可以指定退出循环的层数。如果没有指定，其行为和C语言一样，即退出最内层循环。如果指定循环的层数，则退出指定层数的循环体。如果有3层嵌套循环，其中最外层的为1，中间的为2，最里面的是3。

**continue命令声明格式：continue [n]**
和C语言不同的是，Shell中continue命令携带一个参数，即可以跳转到指定层级的循环顶部。如果没有指定，其行为和C语言一样，即跳转到最内层循环的顶部。如果指定循环的层数，则跳转到指定层级循环的顶部。如果有3层嵌套循环，其中最外层的为3，中间的为2，最里面的是1。

#### I/O重新定向和子Shell
文件中的输入可以通过管道重新定向给一个循环，输出也可以通过管道重新定向给一个文件。Shell启动一个子Shell来处理`I/O`重新定向和管道。在循环终止时，循环内部定义的任何变量对于脚本的其他部分来说都是不可见的。

#### IFS和循环
Shell的 **内部域分隔符IFS** 可以是空格、制表符和换行符。它可以作为命令的分隔符用在例如read、set和for等命令中。如果在列表中使用不同的分隔符，用户可以自己定义这个符号。在修改之前将 **IFS原始符号** 的值保存在另外一个变量中，这样在需要的时候还可以还原。

#### 函数
Shell中使用函数的一些基本规则：
- 函数在使用前必须定义。
- 函数在当前环境下运行，它和调用它的脚本共享变量，并通过位置参量传递参数。而该位置参量将仅限于该函数，不会影响到脚本的其它地方。
- 通过local函数可以在函数内建立本地变量，该变量在出了函数的作用域之后将不在有效。
- 函数中调用exit，也将退出整个脚本。
- 函数中的return命令返回函数中最后一个命令的退出状态或给定的参数值，该参数值的范围是0-256之间。如果没有return命令，函数将返回最后一个Shell的退出值。
- 如果函数保存在其它文件中，就必须通过source或dot命令把它们装入当前脚本。
- 函数可以递归。
- 将函数从Shell中清空需要执行：unset -f function_name。
- 将函数输出到子Shell需要执行：export -f function_name。
- 可以像捕捉Shell命令的返回值一样获取函数的返回值，如$(function_name)。
Shell中函数的声明格式如下：
`function function_name { command; command; }`

#### 陷阱信号(trap)
在Shell程序运行的时候，可能收到各种信号，有的来自于操作系统，有的来自于键盘，而该Shell在收到信号后就立刻终止运行。但是在有些时候，你可能并不希望在信号到达时，程序就立刻停止运行并退出。而是他能希望忽略这个信号而一直在运行，或者在退出前作一些清除操作。trap命令就允许你控制你的程序在收到信号以后的行为。
其格式如下：
`trap 'command; command' signal-number`
`trap 'command; command' signal-name`
`trap signal-number  `
`trap signal-name`
后面的两种形式主要用于信号复位，即恢复处理该信号的缺省行为。还需要说明的是，如果trap后面的命令是使用单引号括起来的，那么该命令只有在捕获到指定信号时才被执行。如果是双引号，则是在trap设置时就可以执行变量和命令替换了。
下面是系统给出的信号数字和信号名称的对照表：
1)`SIGHUP` 2)`SIGINT` 3)`SIGQUIT` 4)`SIGILL` 5)`SIGTRAP` 6)`SIGABRT` 7)`SIGBUS` 8)`SIGFPE` 9)`SIGKILL` 10)` SIGUSR1` 11)`SIGEGV` 12)`SIGUSR2` 13)`SIGPIPE` 14)`SIGALRM` 15)`SIGTERM` 17)`SIGCHLD` 18)`SIGCONT` 19)`SIGSTOP` ... ...

#### 用getopts处理命令行选项
这里的getopts命令和C语言中的getopt几乎是一致的，因为脚本的位置参量在有些时候是失效的，如ls -lrt等。这时候-ltr都会被保存在$1中，而我们实际需要的则是三个展开的选项，即-l、-r和-t。

#### eval命令与命令行解析
eval命令可以对命令行求值，做Shell替换，并执行命令行，通常在普通命令行解析不能满足要求时使用。
- `echo The last argument is \$$#`
- `eval echo The last argument is \$$#`    #eval命令先进行了变量替换，之后再执行echo命令。



文本操作
===
### cut 剪切文本
`cut -d : -f 1,5 /etc/passwd`  **#-d后面的冒号表示字段之间的分隔符，-f表示取分割后的哪些字段**
`cut -d: -f 3- /etc/passwd` **#从第三个字段开始显示，直到最后一个字段。**
`cut -c 1-4 /etc/passwd` **#取每行的前1-4个字符。**
`cut -c-4 /etc/passwd` **#取每行的前4个字符。**
`cut -c4- /etc/passwd` **#取每行的第4个到最后字符。**
`cut -c1,4 /etc/passwd`  **#取每行的第一个和第四个字符。**
`cut -c1-4,5 /etc/passwd` **#取每行的1-4和第5个字符。**

### wc 文本计算(计算行数 字数 字符数)
`echo This is a test of the emergency broadcast system | wc`
1    9    49                           #1行，9个单词，49个字符
`echo Testing one two three | wc -c`
22                                     #22个字符
`echo Testing one two three | wc -l`
1                                      #1行
`echo Testing one two three | wc -w`
4                                      #4个单词
`wc /etc/passwd /etc/group` #计算两个文件里的数据。

### 文本查看
- `nl` 显示行号
- `more` 
- `cat`
- `head` `-n` 显示几行 
- `tail` `-n` 显示几行 `-f` 自动刷新(可以看不断增长的日志文件)

### sort 行排序
选项 | 描述
:---:|:---
-t | 字段之间的分隔符
-f | 基于字符排序时忽略大小写
-k | 定义排序的域字段，或者是基于域字段的部分数据进行排序
-m | 将已排序的输入文件，合并为一个排序后的输出数据流
-n | 以整数类型比较字段
-o outfile | 将输出写到指定的文件
-r | 倒置排序的顺序为由大到小，正常排序为由小到大
-u | 只有唯一的记录，丢弃所有具有相同键值的记录
-b | 忽略前面的空格

#### sort使用实例
- `sort -t':' -k 1 users` #-t定义了冒号为域字段之间的分隔符，-k 1指定基于第一个字段正向排序(字段顺序从1开始)。
- `sort -t':' -k 3r users` #以冒号为分隔符，基于第三个域字段进行倒置排序。
- `sort -t':' -k 6.2,6.4 -k 1r users` #先以第六个域的第2个字符到第4个字符进行正向排序，再基于第一个域进行反向排序。
- `sort -t':' -k 6.2,6.4 -k 1 users` #先以第六个域的第2个字符到第4个字符进行正向排序，再基于第一个域进行正向排序。和上一个例子比，第4和第5行交换了位置。
- `sort -t':' -k 1.2,1.2 users    ` #基于第一个域的第2个字符排序
- `sort -t':' -k 6.2,6.4 -u users` #基于第六个域的第2个字符到第4个字符进行正向排序，-u命令要求在排序时删除键值重复的行。
- `sort -t':' -k 3 users2` #基于第3个域字段以文本的形式排序
- `sort -t':' -k 3n users2` #基于第3个域字段以数字的形式排序
- `ps -ef | sort -k 1 -o result` #基于当前系统执行进程的owner名排序，并将排序的结果写入到result文件中

### uniq 删除重复行
选项 | 命令描述
:---:|:---
-c | 可在每个输出行之前加上该行重复的次数
-d | 仅显示重复的行
-u | 显示没有重复的行

- `uniq testfile  ` #直接删除未经排序的文件，将会发现没有任何行被删除
- `sort testfile | uniq -c  ` #排序之后删除了重复行，同时在行首位置输出该行重复的次数
- `sort testfile | uniq -dc` #仅显示存在重复的行，并在行首显示该行重复的次数
- `sort testfile | uniq -u` #仅显示没有重复的行

### sed 流编辑器
`sed`是`stream editor`的缩写，一种流编辑器，它一次处理一行内容。

处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”（`pattern space`），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有改变，除非你使用重定向存储输出。

sed主要用来自动编辑一个或多个文件，简化对文件的反复操作，编写转换程序等。

`sed [nefri] 'command' file(s)`

#### 常用选项
名称 | 功能
:---:|:---
`-n` | 使用安静（silent）模式。在一般sed的用法中，所有来自stdin的资料一般都会被列出到屏幕，但如果加上-n参数后，则只有经过sed特殊处理的那一行（或者command）才会被列出来。
`-e` | 允许多点编辑。
`-f` | 直接将sed的动作写在一个档案内，-f filename 则可以执行filename内的sed动作。
`-r` | sed 的动作支援的是延伸型正规表示法的语法。(预设是基础正规表示法语法)
`-i` | 直接修改读取的档案内容，而不是由屏幕输出。

#### 常用command
名称 | 功能
:---:|:---
a\　　新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)～
c\　　取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
d　　删除，因为是删除啊，所以 d 后面通常不接任何咚咚；
i\　　插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；
p　　列印，亦即将某个选择的资料印出。通常 p 会与参数 sed -n 一起运作～
s　　取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 1,20s/old/new/g 就是啦！

#### 高级command
命令 | 功能描述
:---:|:---
h | 拷贝pattern space的内容到holding buffer(特殊缓冲区)。
H | 追加pattern space的内容到holding buffer。
g | 获得holding buffer中的内容，并替代当前pattern space中的文本。
G | 获得holding buffer中的内容，并追加到当前pattern space的后面。
n | 读取下一个输入行，用下一个命令处理新的行而不是用第一个命令。
P | 打印pattern space中的第一行。  //大写
q | 退出sed。
w file | 写并追加pattern space到file的末尾。
! | 表示后面的命令对所有没有被选定的行发生作用。
s/re/string | 用string替换正则表达式re。
= | 打印当前行号码。
替换标记 | 
g | 行内全面替换，如果没有g，只替换第一个匹配。
x | 互换pattern space和holding buffer中的文本。
y | 把一个字符翻译为另一个字符(但是不能用于正则表达式)。

#### sed实例
- `sed '/north/p' testfile` #如果模板north被找到，sed除了打印所有行之外，还有打印匹配行。
- `sed -n '/north/p' testfile` #-n选项取消了sed的默认行为。在没有-n的时候，包含模板的行被打印两次，但是在使用-n的时候将只打印包含模板的行。
- `nl testfile |sed -n '5,7p'`

- `nl testfile |sed '3d'` #删除第三行，其他行默认输出到屏幕。
- `nl testfile |sed '2,5d'` #删除2~5行
- `nl testfile |sed '3,$d'` #从第三行删除到最后一行，其他行被打印。$表示最后一行。
- `nl testfile |sed '$d'` #删除最后一行，其他行打印。
- `nl testfile |sed '/north/d' ` #删除所有包含north的行，其他行打印。

- `nl testfile |sed '2a United States'` #在第二行后（即加在第三行）加上"United States"。
- `nl testfile |sed '2i United States'` #如果要在第二行前加，则命令为
- nl testfile |sed '2a\
  United States \
  America' # 若要新增两行，则每一行之间都必须要以反斜线“\”来进行新行的增加。

- `nl testfile |sed '2,5c No 2-5 number'` #将第2~5行的内容取代为“No 2-5 number”。

**s表示替换，g表示命令作用于整个当前行。**
`sed 's/要替换的字符串/新的字符串/g'`

- `nl testfile |sed 's/west/north/g'` #如果该行存在多个west，都将被替换为north，如果没有g，则只是替换第一个匹配。
- `sed -n 's/^west/north/p' testfile ` #-n表示只打印匹配行，如果某一行的开头是west，则替换为north。
- `nl testfile |sed 's/[0-9][0-9]$/&.5/'` #&符号表示替换字符串中被找到的部分。所有以两个数字结束的行，最后的数字都将被它们自己替换，同时追加.5。
- `nl testfile |sed -n 's/Hemenway/Jones/gp'` #所有的Hemenway被替换为Jones。-n选项加p命令则表示只打印匹配行。
- `nl testfile |sed -n 's/\(Mar\)got/\1lianne/p'` #模板Mar被包含在一对括号中，并在特殊的寄存器中保存为tag 1，它将在后面作为\1替换字符串，Margot被替换为Marlianne。 
- `sed 's#3#88#g' testfile` #s后面的字符一定是分隔搜索字符串和替换字符串的分隔符，默认为斜杠，但是在s命令使用的情况下可以改变。不论什么字符紧跟着s命令都认为是新的分隔符。这个技术在搜索含斜杠的模板时非常有用，例如搜索时间和路径的时候。
  - `sed 's@3@88@g' testfile`
- `nl testfile |sed -n '/south/,/east/p'` #所有在模板west和east所确定的范围内的行都被打印，如果west出现在east后面的行中，从west开始到下一个east，无论这个 east出现在哪里，二者之间的行都被打印，即使从west开始到文件的末尾还没有出现east，那么从west到末尾的所有行都将打印。
- `sed -n '5,/^northeast/p' testfile` #打印从第五行开始到第一个以northeast开头的行之间的所有行。
- `nl testfile |sed -e '1,3d' -e 's/Hemenway/Jones/'` #`-e`选项表示多点编辑。第一个编辑命令是删除第一到第三行。第二个编辑命令是用Jones替换Hemenway。
- `sed -n '/north/w newfile' testfile` #将所有匹配含有north的行写入newfile中。
- `sed '/eastern/i\NEW ENGLAND REGION' testfile ` #i是插入命令，在匹配模式行前插入文本。

- `sed -n '/eastern/{n;s/AM/Archie/;p}' testfile` 找到匹配模式eastern的行后，执行后面花括号中的一组命令，每个命令之间用逗号分隔，n表示定位到匹配行的下一行，s/AM/Archie/完成Archie到AM的替换，p和-n选项的合用，则只是打印作用到的行。
`sed -n -e '1,3y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/' -e - '1,3p' testfile` -e表示多点编辑，第一个编辑命令y将前三行中的所有小写字母替换为大写字母，-n表示不显示替换后的输出，第二个编辑命令将只是打印输出转换后的前三行。注意y不能用于正则。
- `sed '2q' testfile` 打印完第二行后退出。
- `sed '/Lewis/{s/Lewis/Joseph/;q;}' testfile` 当模板Lewis在某一行被匹配，替换命令首先将Lewis替换为Joseph，然后再用q退出sed。
- `sed -e '/northeast/h' -e '$G' testfile` 在sed处理文件的时候，每一行都被保存在pattern space的临时缓冲区中。除非行被删除或者输出被取消，否则所有被处理过的行都将打印在屏幕上。接着pattern space被清空，并存入新的一行等待处理。在下面的例子中，包含模板的northeast行被找到，并被放入pattern space中，h命令将其复制并存入一个称为holding buffer的特殊缓冲区内。在第二个sed编辑命令中，当达到最后一行后，G命令告诉sed从holding buffer中取得该行，然后把它放回到pattern space中，且追加到现在已经存在于模式空间的行的末尾。
- `sed -e '/WE/{h;d;}' -e '/CT/{G;}' testfile` 如果模板WE在某一行被匹配，h命令将使得该行从pattern space中复制到holding buffer中，d命令在将该行删除，因此WE匹配行没有在原来的位置被输出。第二个命令搜索CT，一旦被找到，G命令将从holding buffer中取回行，并追加到当前pattern space的行末尾。简单的说，WE所在的行被移动并追加到包含CT行的后面。
- `sed -e '/northeast/h' -e '$g' testfile` 第一个命令将匹配northeast的行从pattern space复制到holding buffer，第二个命令在读取的文件的末尾时，g命令告诉sed从holding buffer中取得行，并把它放回到pattern space中，以替换已经存在于pattern space中的。简单说就是包含模板northeast的行被复制并覆盖了文件的末尾行。
- `sed -e '/WE/{h;d;}' -e '/CT/{g;}' testfile` 模板WE匹配的行被h命令复制到holding buffer，再被d命令删除。结果可以看出WE的原有位置没有输出。第二个编辑命令将找到匹配CT的行，g命令将取得holding buffer中的行，并覆盖当前pattern space中的行，即匹配CT的行。简单的说，任何包含模板northeast的行都将被复制，并覆盖包含CT的行。
- `sed -e '/Patricia/h' -e '/Margot/x' -e '$G' testfile` 第一个编辑中的h命令将匹配Patricia的行复制到holding buffer中，第二个编辑中的x命令，会将holding buffer中的文本考虑到pattern space中，而pattern space中的文本被复制到holding buffer中。因此在打印匹配Margot行的地方打印了holding buffer中的文本，即第一个命令中匹配Patricia的行文本，第三个编辑命令会将交互后的holding buffer中的文本在最后一行的后面打印出来。

### awk 逐行扫描文件
awk也是逐行扫描文件的，从第一行到最后一行，寻找匹配特定模板的行，并在这些行上运行“选择”动作。如果一个模板没有指定动作，这些匹配的行就被显示在屏幕上。如果一个动作没有模板，所有被动作指定的行都被处理。 

#### awk的基本格式
- `awk 'pattern' filename`
- `awk '{action}' filename`
- `awk 'pattern {action}' filename`

**示例**
- `awk '/Mary/' employees`   #打印所有包含模板Mary的行。
- `awk '{print $1}' employees` #打印文件中的第一个字段，这个域在每一行的开始，缺省由空格或其它分隔符。
- `awk '/Sally/{print $1, $2}' employees` #打印包含模板Sally的行的第一、第二个域字段。

#### awk的格式输出
`awk`中同时提供了`print`和`printf`两种打印输出的函数，其中print函数的参数可以是变量、数值或者字符串。字符串必须用双引号引用，参数 用逗号分隔。如果没有逗号，参数就串联在一起而无法区分。这里，逗号的作用与输出文件的分隔符的作用是一样的，只是后者是空格而已。

转义字符:
- `\n`  换行
- `\r`  回车
- `\t`  制表符

格式化说明符 | 功能 | 示例 | 结果
%c | 打印单个ASCII字符。 | printf("The character is %c.\n",x) | The character is A.
%d | 打印十进制数。| printf("The boy is %d years old.\n",y) |  The boy is 15 years old.
%e | 打印用科学记数法表示的数。| printf("z is %e.\n",z) |  z is 2.3e+01.
%f | 打印浮点数。 | printf("z is %f.\n",z) |  z is 2.300000
%o | 打印八进制数。| printf("y is %o.\n",y) |  y is 17.
%s | 打印字符串。 | printf("The name of the culprit is %s.\n",$1) |;  The name of the culprit is Bob Smith.
%x | 打印十六进制数。 | printf("y is %x.\n",y) |

- `echo "Linux" | awk '{printf "|%-15s|\n", $1}'`  # %-15s表示保留15个字符的空间，同时左对齐。
- `echo "Linux" | awk '{printf "|%15s|\n", $1}'`   # %-15s表示保留15个字符的空间，同时右对齐。
- `awk '{printf "The name is %-15s ID is %8d\n", $1,$3}' employees` #%8d表示数字右对齐，保留8个字符的空间。

#### awk中的记录和域
**awk中默认的记录分隔符是回车，保存在其内建变量ORS和RS中。$0变量是指整条记录。**
- awk '{print $0}' employees #这等同于print的默认行为。
**变量NR(Number of Record)，记录每条记录的编号。**
- `awk '{print NR, $0}' employees`
**变量NF(Number of Field)，记录当前记录有多少域。**
- `awk '{print $0,NF}' employees`
- `awk -F: '/Tom Jones/{print $1,$2}' employees2`  #这里-F选项后面的字符表示分隔符。
**变量OFS(Output Field Seperator)表示输出字段间的分隔符，缺省是空格。**
- `awk -F: '{OFS = "?"};  /Tom/{print $1,$2 }' employees2 `#在输出时，域字段间的分隔符已经是?(问号)了

对于awk而言，其模式部分将控制这动作部分的输入，只有符合模式条件的记录才可以交由动作部分基础处理，awk还支持条件表达式，如：
- `awk '$3 < 4000 {print}' employees`

在花括号内，用分号分隔的语句称为动作。如果模式在动作前面，模式将决定什么时候发出动作。动作可以是一个语句或是一组语句。语句之间用分号分隔，也可以用换行符，如：
```
pattern { action statement; action statement; etc. } or
pattern {
    action statement
    action statement
}
```
模式和动作一般是捆绑在一起的。需要注意的是，动作是花括号内的语句。模式控制的动作是从第一个左花括号开始到第一个右花括号结束，如下：
`awk '$3 < 4000 && /Sally/ {print}' employees`

#### 匹配操作符
`\~`用来在记录或者域内匹配正则表达式。

- `awk '$1 ~ /[Bb]ill/' employees`  #显示所有第一个域匹配Bill或bill的行。
- `awk '$1 !~ /[Bb]ill/' employees` #显示所有第一个域不匹配Bill或bill的行，其中`!~`表示不匹配的意思。

#### awk的基本应用实例
- `awk '/^north/' testfile`            #打印所有以north开头的行。
- `awk '/^(no|so)/' testfile`          #打印所有以so和no开头的行。
- `awk '$5 ~ /\.[7-9]+/' testfile`     #第五个域字段匹配包含.(点)，后面是7-9的数字。
- `awk '$8 ~ /[0-9][0-9]$/{print $8}' testfile`  #第八个域以两个数字结束的打印。

#### awk变量
##### 内置变量
变量名 | 变量内容
:---:|:---
ARGC | 命令行参数的数量。
ARGIND | 命令行正在处理的当前文件的AGV的索引。
ARGV | 命令行参数数组。
CONVFMT | 转换数字格式。
ENVIRON | 从shell中传递来的包含当前环境变量的数组。
ERRNO | 当使用close函数或者通过getline函数读取的时候，发生的重新定向错误的描述信息就保存在这个变量中。
FIELDWIDTHS | 在对记录进行固定域宽的分割时，可以替代FS的分隔符的列表。
FILENAME | 当前的输入文件名。
FNR | 当前文件的记录号。
FS | 输入分隔符，默认是空格。
IGNORECASE | 在正则表达式和字符串操作中关闭大小写敏感。
NF | 当前文件域的数量。
NR | 当前文件记录数。
OFMT | 数字输出格式。
OFS | 输出域分隔符。
ORS | 输出记录分隔符。
RLENGTH | 通过match函数匹配的字符串的长度。
RS | 输入记录分隔符。
RSTART | 通过match函数匹配的字符串的偏移量。
SUBSEP | 下标分隔符。

－ awk -F: '{IGNORECASE = 1}; $1 == "mary adams" { print NR, $1, $2, $NF}' employees2
－ awk 'BEGIN {FS = ":"; OFS = "\t"; ORS = "\n\n"} { print $1,$2,$3} filename
－ awk 'END {print "The number of the records is " NR }' filename
－ awk '/Mary/{count++} END{print "Mary was found " count " times." }' employees2
－ awk '/Mary/{count++} END{print "Mary was found " count " times." }' employees2
－ awk '/^north/{count += 1; print count}' testfile     #如记录以正则north开头，则创建变量count同时增一，再输出其值。
－ awk 'NR <= 3 {x = $7--; print "x = " x ", $7 = " $7}' testfile
－ awk 'NR == 2,NR == 5 {print "The record number is " NR}' testfile
－ awk 'BEGIN { print ENVIRON["USER"],ENVIRON["HOME"]}' 
root /root
－ awk 'BEGIN { OFS = "\t"}; /^Sharon/{ print $1,$2,$7}' testfile
western WE      5
－ awk '/^north/{count++}; END{print count}' testfile

##### 变量赋值
符号 | 含义 | 等价形式
:---:|:---:|:---:
= | a = 5 | a = 5
+= | a = a + 5 | a += 5
-= | a = a - 5 | a -= 5
*= | a = a * 5 | a *= 5
/= | a = a / 5 | a /= 5
%= | a = a % 5 | a %= 5
^= | a = a ^ 5 | a ^= 5

- `awk '$1 ~ /Tom/ {Wage = $2 * $3; print Wage}' filename` # 该命令将从文件中读取，并查找第一个域字段匹配Tom的记录，再将其第二和第三个字段的乘积赋值给自定义的Wage变量，最后通过print命令将该变量打印输出。
- `awk ' {$5 = 1000 * $3 / $2; print}' filename` # 在上面的命令中，如果$5不存在，awk将计算表达式1000 * $3 / $2的值，并将其赋值给$5。如果第五个域存在，则用表达式覆盖$5原来的值。
- `awk -F: -f awkscript month=4 year=2011 filename` # 这里的month和year都是自定义变量，且分别被赋值为4和2000，在awk的脚本中这些变量将可以被直接使用，他们和脚本中定义的变量在使用上没有任何区别。

#### awk表达式功能
- 比较表达式 `<` `<=` `==` `!=` `>=` `>` `~` `!~`
  - awk '$3 == 5346' employees       #打印第三个域等于5346的行。
  - awk '$3 > 5000 {print $1}' employees  #打印第三个域大于5000的行的第一个域字段。
  - awk '$2 ~ /Adam/' employess   
- 条件表达式 `conditional expression1 ? expression2 : expressional3`
  - awk 'NR <= 3 {print ($7 > 4 ? "high "$7 : "low "$7) }' testfile
- 数学表达式 `+` `-` `*` `/` `%` `^`
  - awk '/southern/{print $5 + 10}' testfile  #如果记录包含正则表达式southern，第五个域就加10并打印。
  - awk '/southern/{print $8 /2 }' testfile   #如果记录包含正则表达式southern，第八个域除以2并打印。
- 逻辑表达式 `&&` `||` `!`
  - awk '$8 > 10 && $8 < 17' testfile   #打印出第八个域的值大于10小于17的记录。
  - awk '$2 == "NW" || $1 ~ /south/ {print $1,$2}' testfile #打印第二个域等于NW，或者第一个域匹配south的行的第一、第二个域。
  - awk '!($8 > 13) {print $8}' testfile  #打印第八个域字段不大于13的行的第八个域。
- 范围模板 范围模板匹配从第一个模板的第一次出现到第二个模板的第一次出现，第一个模板的下一次出现到第一个模板的下一次出现等等。如果第一个模板匹配而第二个模板没有出现，awk就显示到文件末尾的所有行。
  - awk '/^western/,/^eastern/ {print $1}' testfile #打印以western开头到eastern开头的记录的第一个域。
- 赋值符号
  - awk '$3 == "Ann" { $3 = "Christian"; print}' testfile #找到第三个域等于Ann的记录，然后给该域重新赋值为Christian，之后再打印输出该记录。
  - awk '/Ann/{$8 += 12; print $8}' testfile #找到包含Ann的记录，并将该条记录的第八个域的值+=12，最后再打印输出。

#### awk重定向(> >>)
awk中对于输入重定向是通过`getline`函数来完成的。`getline`函数的作用是从标准输入、管道或者当前正在处理的文件之外的其他输入文件获得 输入。他负责从输入获得下一行的内容，并给NF、NR和FNR等内建变量赋值。如果得到一个记录，`getline`就返回1，如果达到文件末尾就返回0。如果出现错误，如打开文件失败，就返回-1。

由于awk中同时打开的管道只有一个，那么在打开下一个管道之前必须关闭它，管道符号右边可以通过可以通过双引号关闭管道。如果不关闭，它将始终保持打开状态，直到awk退出。

- awk '$4 >= 70 {print $1,$2 > "passing_file"}' filename  
- awk '/north/{print $1,$3,$4 > "districts" }' testfile
- awk '/south/{print $1,$3,$4 >> "districts" }' testfile
- awk 'BEGIN { "date" | getline d; print d}'
- awk 'BEGIN { "date" | getline d; split(d,mon); print mon[2]}'
- awk 'BEGIN { while("ls" | getline) print}'
- awk 'BEGIN { printf "What is your name? ";  getline name < "/dev/tty"} $1 ~ name {print "Found" name " on line ", NR "."} END {print "See ya, " name "."}' employees2
- awk 'BEGIN { while(getline < "/etc/passwd" > 0) lc++; print lc}'
- awk {print $1,$2,$3 | "sort -4 +1 -2 +0 -1"} END {close("sort -4 +1 -2 +0 -1") } filename

#### awk条件语句
/> awk '{if ($6 > 50) print $1 "Too hign"}' filename
/> awk '{if ($6 > 20 && $6 <= 50) { safe++; print "OK}}' filename
/> awk '{if ($6 > 50) print $1 " Too high"; else print "Range is OK" }' filename
/> awk '{if ($6 > 50) { count++; print $3 } else { x = 5; print $5 }' filename
/> awk '{if ($6 > 50) print "$6 > 50" else if ($6 > 30) print "$6 > 30" else print "other"}' filename

#### awk循环语句
awk中的循环语句同样借鉴于C语言，支持while、do/while、for、break、continue，这些关键字的语义和C语言中的语义完全相同。
    /> awk '{name[x++] = $2}; END{for (i = 0; i < NR; i++) print i, name[i]}' employees    
    /> awk '{id[NR] = $3}; END {for (x = 1; x <= NR; x++) print id[x]}' employees
    /> awk '/^Tom/{name[NR]=$1}; END {for(i = 1;i <= NR; i++) print name[i]}' db
    /> awk '/^Tom/{name[NR]=$1};END{for(i in name) print name[i]}' db


#### awk流程控制语句
next语句是从文件中读取下一行，然后从头开始执行awk脚本。
exit语句用于结束awk程序。它终止对记录的处理。但是不会略过END模块，如果exit()语句被赋值0--255之间的参数，如exit(1)，这个参数就被打印到命令行，以判断退出成功还是失败。

#### awk数组
因为awk中数组的下标可以是数字和字母，数组的下标通常被称为关键字(key)。值和关键字都存储在内部的一张针对key/value应用hash的表格 里。由于hash不是顺序存储，因此在显示数组内容时会发现，它们并不是按照你预料的顺序显示出来的。数组和变量一样，都是在使用时自动创建的，awk也 同样会自动判断其存储的是数字还是字符串。一般而言，awk中的数组用来从记录中收集信息，可以用于计算总和、统计单词以及跟踪模板被匹配的次数等等。
awk '/tom/{count["tom"]++}; /mary/{count["mary"]++}; END{print "There are " count["tom"] " Toms and " count["mary"] " Marys in the file."} testfile2
awk '{count[$1]++}; END{for(name in count) printf "%-5s%d\n",name, count[name]}' testfile2
awk '{count[$1]++; if (count[$1] > 1) name[$1]++}; END{print "The duplicates were "; for(i in name) print i}' testfile2
awk '{count[$1]++}; END{for(name in count) {if (count[name] == 1)delete count[name];} for (name in count) print name}' testfile2
awk 'BEGIN {for(i = 0; i < ARGC; i++) printf("argv[%d] is %s.\n",i,ARGV[i]); printf("The number of arguments, ARGC=%d\n",ARGC)}' testfile "Peter Pan" 12
awk 'BEGIN{name=ARGV[2]; print "ARGV[2] is " ARGV[2]}; $1 ~ name{print $0}' testfile2 "bob"    
awk 'BEGIN{name=ARGV[2]; print "ARGV[2] is " ARGV[2]; delete ARGV[2]}; $1 ~ name{print $0}' testfile2 "bob"    

#### awk内建函数
- **字符串函数**
  - sub(regular expression,substitution string);
  - sub(regular expression,substitution string,target string);
    - awk '{sub("Tom","Tommy"); print}' employees   #这里使用Tommy替换了Tom。
    - awk '{sub("Tom","Tommy",$1); print}' employees
  - gsub(regular expression,substitution string); #如果第一个参数中正则表达式在记录中出现多次，那么gsub将完成多次替换，而sub只是替换第一次出现的。
  - gsub(regular expression,substitution string,target string);
  - index(string,substring) #该函数将返回第二个参数在第一个参数中出现的位置，偏移量从1开始。
    - awk 'BEGIN{print index("hello","el")}'
  - length(string) #该函数返回字符串的长度。
    - awk 'BEGIN{print length("hello")}'
  - substr(string,starting position)
  - substr(string,starting position,length of string) #该函数返回第一个参数的子字符串，其截取起始位置为第二个参数(偏移量为1)，截取长度为第三个参数，如果没有该参数，则从第二个参数指定的位置起，直到string的末尾。
    -  awk 'BEGIN{name = substr("Hello World",2,3); print name}'
  - match(string,regular expression) #该函数返回在字符串中正则表达式位置的索引，如果找不到指定的正则表达式就返回0.match函数设置内置变量RSTART为字符串中子字符串的开始位置，RLENGTH为到字字符串末尾的字符个数。
    - awk 'BEGIN{start=match("Good ole CHINA", /[A-Z]+$/); print start}'
    - awk 'BEGIN{start=match("Good ole CHINA", /[A-Z]+$/); print RSTART, RLENGTH}'
    - awk 'BEGIN{string="Good ole CHINA";start=match(string, /[A-Z]+$/); print substr(string,RSTART, RLENGTH)}'
  - toupper(string)
  - tolower(string)
    - awk 'BEGIN {print toupper("hello"); print tolower("WORLD")}'
  - split(string,array,field seperator)
  - split(string,array) #该函数使用作为第三个参数的域分隔符把字符串分隔为一个数组。如果第三个参数没有提供，则使用当前默认的FS值。
    - awk 'BEGIN{split("11/20/2011",date,"/"); print date[2]}'
  - variable = sprintf("string with format specifiers ",expr1,expr2,...) #该函数和printf的差别等同于C语言中printf和sprintf的差别。前者将格式化后的结果输出到输出流，而后者输出到函数的返回值中。
    - awk 'BEGIN{line = sprintf("%-15s %6.2f ", "hello",4.2); print line}'
- **时间函数**
  - %a  Abbreviated weekday name
  - %A  Full weekday name
  - %b  Abbreviated month name
  - %B  Full month name
  - %c  Date and time representation appropriate for locale
  - %d  Day of month as decimal number (01 – 31)
  - %H  Hour in 24-hour format (00 – 23)
  - %I  Hour in 12-hour format (01 – 12)
  - %j  Day of year as decimal number (001 – 366)
  - %m  Month as decimal number (01 – 12)
  - %M  Minute as decimal number (00 – 59)
  - %p  Current locale's A.M./P.M. indicator for 12-hour clock
  - %S  Second as decimal number (00 – 59)
  - %U  Week of year as decimal number, with Sunday as first day of week (00 – 53)
  - %w  Weekday as decimal number (0 – 6; Sunday is 0)
  - %W  Week of year as decimal number, with Monday as first day of week (00 – 53)
  - %x  Date representation for current locale
  - %X  Time representation for current locale
  - %y  Year without century, as decimal number (00 – 99)
  - %Y  Year with century, as decimal number
  - systime() #该函数返回当前时间距离1970年1月1日之间相差的秒数。
    - awk 'BEGIN{print systime()}'
  - strftime() # 时间格式化函数，其格式化规则等同于C语言中的strftime函数提供的规则
    - awk 'BEGIN{ print strftime("%D",systime())}'
    - awk 'BEGIN{ now = strftime("%T"); print now}'
- **数学函数**
  - atan2(x,y)  y,x范围内的余切
  - cos(x)  余弦函数
  - exp(x)  求幂
  - int(x)  取整
  - log(x)  自然对数
  - sin(x)  正弦函数
  - sqrt(x) 平方根
- **自定义函数**

```
function name(parameter1,parameter2,...) {
    statements
    return expression
}

/> cat grades
20 10
30 20
40 30

/> cat add.sc
function add(first,second) {
        return first + second
}
{ print add($1,$2) }

/> awk -f add.sc grades
30
50
70
```
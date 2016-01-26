Shell 基础
===
运行Shell脚本：
1、作为可执行程序
    第一行："#!" 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种Shell。
2、作为解释器参数
    /bin/sh test.sh
    不需要在第一行指定解释器信息，写了也没用。

Shell变量：
首个字符必须为字母（a-z，A-Z）。 
中间不能有空格，可以使用下划线（_）。 
不能使用标点符号。 
不能使用bash里的关键字（可用help命令查看保留关键字）。
变量名不加美元符号
变量赋值，变量名和等号之间不能有空格：your_name="w3cschool.cc"
除了显式地直接赋值，还可以用语句给变量赋值 for file in `ls /etc`
使用变量（只要在变量名前面加美元符号即可，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界）
your_name="qinjx"
echo $your_name
echo ${your_name}
变量重新定义（不加$）

Shell字符串
单引号字符串的限制：
单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的； 
单引号字串中不能出现单引号（对单引号使用转义符后也不行）。
双引号的优点：
双引号里可以有变量 
双引号里可以出现转义字符
拼接字符串
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1
获取字符串长度
string="abcd"
echo ${#string} #输出 4
提取字符串
string="alibaba is a great company"
echo ${string:1:4} #输出liba
查找子字符串
string="alibaba is a great company"
echo `expr index "$string" is`

Shell数组
bash支持一维数组（不支持多维数组），并且没有限定数组的大小。
类似与C语言，数组元素的下标由0开始编号。获取数组中的元素要利用下标，下标可以是整数或算术
表达式，其值应大于或等于0。
在Shell中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：
    数组名=(值1 值2 ... 值n)
读取数组
    ${数组名[下标]}
    使用@符号可以获取数组中的所有元素，例如： echo ${array_name[@]}
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}

Shell注释
以"#"开头的行就是注释，会被解释器忽略。（没有多行注释，可以用花括号括起来要注释的代码，没有地方调用这个函数即可）
Shell命令

echo
1.显示普通字符串:
echo "It is a test"
2.显示转义字符
echo "\"It is a test\""
3.显示变量
read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量
#!/bin/sh
read name
echo "$name It is a test"
4.显示换行
echo -e "OK!\n" # -e 开启转义
echo "It it a test"
5.显示不换行
    #!/bin/sh
    echo -e "OK! \c" # -e 开启转义 \c 不换行
    echo "It is a test"
6.显示结果定向至文件
    echo "It is a test" > myfile
7.原样输出字符串，不进行转义或取变量(用单引号)
    echo '$name\"'
8.显示命令执行结果
    echo `date`

test
数值测试
-eq 等于则为真 
-ne 不等于则为真 
-gt 大于则为真 
-ge 大于等于则为真 
-lt 小于则为真 
-le 小于等于则为真
字符串测试
= 等于则为真 
!= 不相等则为真 
-z 字符串字符串长度伪则为真 
-n 字符串字符串长度不伪则为真
文件测试
-e 文件名如果文件存在则为真 
-r 文件名如果文件存在且可读则为真 
-w 文件名如果文件存在且可写则为真 
-x 文件名如果文件存在且可执行则为真 
-s 文件名如果文件存在且至少有一个字符则为真 
-d 文件名如果文件存在且为目录则为真 
-f 文件名如果文件存在且为普通文件则为真 
-c 文件名如果文件存在且为字符型特殊文件则为真 
-b 文件名如果文件存在且为块特殊文件则为真
Shell还提供了与( ! )、或( -o )、非( -a )三个逻辑操作符用于将测试条件连接起来，其优先级
为："!"最高，"-a"次之，"-o"最低。
Shell流程控制（sh的流程控制不可为空）
if
if condition
then
command1
command2
...
commandN
fi
if `ps -ef | grep ssh`; then echo hello; fi
if else 
if condition
then
command1
command2
...
commandN
else
command
fi
if else-if else
if condition1
then
command1
elif condition2
command2
else
commandN
fi
for 循环(in列表是可选的，如果不用它，for循环使用命令行的位置参数。)
for var in item1 item2 ... itemN
do
command1
command2
...
commandN
done
for var in item1 item2 ... itemN; do command1; command2… done;
while 循环
while condition
do
command
done
until 循环（until循环执行一系列命令直至条件为真时停止,until循环与while循环在处理方式上刚好相反。）
until condition
do
command
done
case
case 值 in 
模式1)
command1
command2
...
commandN
;;
模式2）
command1
command2
...
commandN
;;
esac
case工作方式如上所示。取值后面必须为单词in，每一模式必须以右括号结束。取值可以为变量或常 数。匹配发现取值符合某一模式后，其间所有命令开始执行直至 ;;。 
取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。如果 无一匹配模式，使用星号 * 捕获该值，再执行后面的命令。
跳出循环
break命令 ，break命令允许跳出所有循环（终止执行后面的所有循环）。
continue ，continue命令与break命令类似，只有一点差别，它不会跳出所有循环，仅仅跳出当前循环。
无限循环
while :
do
command
done
或者
while true
do
command
done
或者
for (( ; ; ))
Shell 函数
[ function ] funname [()]
{
action;
[return int;]
}
说明：
1、可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。
2、参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。return后跟数值n(0-255)
3、函数返回值在调用该函数后通过 $? 来获得。
注意：所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至shell解释器首次发现
它时，才可以使用。调用函数仅使用其函数名即可。
函数参数：
#!/bin/bash
funWithParam(){
echo "The value of the first parameter is $1 !"
echo "The value of the second parameter is $2 !"
echo "The value of the tenth parameter is $10 !"
echo "The value of the tenth parameter is ${10} !"
echo "The value of the eleventh parameter is ${11} !"
echo "The amount of the parameters is $# !"
echo "The string of the parameters is $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
>>输出结果：
The value of the first parameter is 1 !
The value of the second parameter is 2 !
The value of the tenth parameter is 10 !
The value of the tenth parameter is 34 !
The value of the eleventh parameter is 73 !
The amount of the parameters is 12 !
The string of the parameters is 1 2 3 4 5 6 7 8 9 34 73 !"
$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。
参数处理
$# 传递到脚本的参数个数 
$* 以一个单字符串显示所有向脚本传递的参数 
$$ 脚本运行的当前进程ID号 
$! 后台运行的最后一个进程的ID号 
$@ 与$#相同，但是使用时加引号，并在引号中返回每个参数。 
$- 显示Shell使用的当前选项，与set命令功能相同。 
$? 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。
Shell基本运算
shell程序中的操作默认都是字符串操作，在要运行数学运算符的时候可能得到意想不到的答案：
var=1
var=$var+1
echo $var

output：
1+1
从这个例子中可以看出shell字符串连接的操作，需要注意的是空格。
在shell中可以使用let来指示下面是算术表达式，let表达式内变量不用加$
var=1
let "var+=1" 或 let var+=1 这种写法运算符间不能有空格 
echo $var

output：
2
这其中的let可以用(())代替，let ″j=i*6+2″等价于((j=i*6+2)), 就像很多的循环中用法一样
注意：let必须是完整的算术表达式，即有等号两边
　　　(())、expr 可以只有等号右边的计算，由$((...))、$(expr ...)、`expr ...` 查看返回结果
var=1
((var++))     查看结果： echo $(())
echo $var

output:
2
还有一种写法：
var=1
var=$[$var+1]
echo $var

output：
2
使用expr，需要注意的是其中的那个符号并不是单引号，而是“1”左边的那个键
注意：将需要运算的表达式写入在expr 后面，保证参数与运算符号中间有空格隔开。
var=1
var=`expr $var + 1`
echo $var

output：
2

1:在shell 中$() 与 ``等效。执行中间包含的命令语句，返回执行结果。
2:从效率来说let==(()) > expr > bc。let和(())运行是内建命令，使用相同的算法。
3:let 和 expr 的运算是整数运算，不包括浮点预算。
4:expr和bc是外部程序，expr的体积几乎等于bc的1/3，执行一次装入内存所消耗的时间就不一样。
5:从运算能力来说，bc排第一位。
上面的这几种做法都是只能处理整数运算，下面的这种做法是可以处理浮点数的：
var=1
var=`echo "scale=1;$var*2.0"|bc`  bc预设输出整数，用scale 指定小数点下位数
echo $var

output：
2.0
上面的`符号跟上面的一样，是1左边的那个键，而bc是linux上面的一个计算器，支持除位运算以外的所有运行。
另外一个支持浮点运算的方法是awk：
var=1
var=`echo "$var 1"|awk '{printf("%g",$1+$2)}'`
echo $var

output：
2
$ c=$(awk 'BEGIN{print 7.01*5-4.01 }')
$ echo $c
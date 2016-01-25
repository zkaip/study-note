sublime
===
### 常用快捷键
Ctrl+Shift+A 选择光标位置父标签对儿
Ctrl+Shift+[ 折叠代码
Ctrl+Shift+] 展开代码
Ctrl+KT折叠属性
Ctrl+K0展开所有
Ctrl+U 软撤销
Ctrl+T 词互换
Tab 缩进
Shift+Tab去除缩进
Ctrl+Shift+UP与上行互换
Ctrl+Shift+DOWN与下行互换
Ctrl+K Backspace 从光标处删除至行首
Ctrl+E
Ctrl+H 查找替换
Ctrl+D 多行游标
Ctrl+K Ctrl+D 跳过一个文件
Ctrl+Shift+D 复制整行
Ctrl+Shift+P【命令模式（支持模糊匹配）】
CTRL+P：Goto Anything
ctrl + n 打开一个新页面
ctrl + tab 在两个页面之间切换
ctrl + j 合并一行
ctrl + ] 缩进
ctrl + [ 缩退
ctrl + l 选择当前行
ctrl + c 拷贝
ctrl + v 粘贴
ctrl + enter 在当前行下方添加一行
ctrl + shift + enter 在当前行上方添加一行
ctrl + z 撤消操作
键盘右键 向右移动(粒度为一个字母)
alt + 键盘右键 向右移动(粒度为一个单词)
ctrl + 键盘右键 向右移动(粒度为一段)
alt + shift + 键盘右键/左键 选择内容
ctrl + a 全选

ctrl + shift + p 打开命令面板
Reindent Lines 调整缩进
Key Bindings - Uer 设置快捷键

### 如何查找精确的命令名
ctrl + ` 打开工作台
sublime.log_commands(True) 执行命令
ctrl + shift + p 打开命令面板
Reindent Lines 执行命令
esc 退出


### 产生多行游标的四个方法
1. Ctrl+D
2. Alt+F3 
Find/Quick Find All
3. Ctrl+A Ctrl+Shift+L 
Selection/Split into Lines
4. ctrl+鼠标拖拽右键

### ctrl+p(支持模糊匹配):Goto Anything
@：在CSS选择器或JavaScript函数之间快速导航
: 行号
`#` 代码

**快捷键 (windows)** 
Ctrl+L 选择整行（按住-继续选择下行） 
Ctrl+KK从光标处删除至行尾 
Ctrl+Shift+K 删除整行 
Ctrl+Shift+D 复制光标所在整行，插入在该行之前 
Ctrl+J 合并行（已选择需要合并的多行时） 
Ctrl+KU改为大写 
Ctrl+KL改为小写 
Ctrl+D 选词 （按住-继续选择下个相同的字符串） 
Ctrl+M 光标移动至括号内开始或结束的位置 
Ctrl+Shift+M 选择括号内的内容（按住-继续选择父括号） 
Ctrl+/ 注释整行（如已选择内容，同“Ctrl+Shift+/”效果） 
Ctrl+Shift+/ 注释已选择内容 
Ctrl+Space 自动完成（win与系统快捷键冲突，需修改） 
Ctrl+Z 撤销 
Ctrl+Y 恢复撤销 

### Mac下菜单栏常用按键（ mac以及windows下快捷键：http://sublime.emptystack.net/）：
1）File->New File （command+N）: 创建新文件；
2）File->Open File （command+O）: 打开文件；
3）Edit->Copy （command+C）: 复制；
4）Edit->Cut （command+X）: 剪切；
5）Edit->Paste （command+V）:粘贴；
6）Edit->Line->Indent （command+]）:增加缩进；
7）Edit->Line->Unindent （command+[）:减少缩进；
8）Edit->Line->Duplicate Line （shift+command+D）:复制一行；
9）Edit->Line->Unindent （shift+control+K）:删除一行；
10）Edit->Comment->Toggle Comment （command+/）:注释代码；
11）Edit->Text->Insert Line Before （shift+command+enter）:在当前光标所在行前回车；
12）Edit->Text->Insert Line After （command+enter）:在当前光标所在行后回车；
13）Selection->Expand Selection to Line （command+L）:选中当前光标行；
14）Selection->Expand Selection to Word （command+D）:选中当前光标所在的单词；
15）Find->Find （command+F）:查找；
16）View->Side Bar ->Show Side Bar / Hide Side Bar （command+K 再按command+B）:显示/隐藏左侧的导航视窗Side Bar；
17）Goto->Goto Anything… （command+P）:在文件内，当前文件中进行导航，如 “:“+数字： 跳转去指定数字的行；
18）Tools->Command Palette… (shift+command+P): 命令模式。
19）Project菜单栏一般用不到；
20）Sublime Text->Preferences->Settings-Default: Sublime Text默认配置Jason格式文件，可以直接修改参数，保存后立即生效。
21）Sublime Text->Preferences->Color Scheme: Sublime Text颜色修改。
gotoanything 快速 查找文件/字符串 

### 当前打开文件内的定位操作 

专门的字符串操作 Ctrl+F ctrl+shift+F esc 编辑找到的当前字符串节点 
Ctrl+Alt+F 查找并替换
Ctrl+D 在查找到的字符串中进行选中操作,多次按下,从当前节点依次从上到下选中同名字符串 

文件夹层级的操作 匹配项会在专门的页面罗列出 F4进行节点选中后进入对应文件内容操作 
Shift+F4 上一个文件内容的匹配 

光标跳回操作 Ctrl +"-" 

### 代码自动补全
1、设置快捷键以免跟输入法切换冲突：
{ "keys": ["alt+space"], "command": "auto_complete" },
2、自定义自动补全文件：http://docs.sublimetext.info/en/latest/reference/completions.html 
文件存放在Sublime Text 3/Packages/User下，后缀名为.sublime-completions
3、解决Enter键在自动补全中无法回车的问题，在Settings - User中添加
"auto_complete_commit_on_tab": true,
4、代码自动补全插件SublimeCodeIntel：https://packagecontrol.io/packages/SublimeCodeIntel

### 批处理任务build
保存在User目录 .sublime-build
插件：
PackaControl（安装管理插件）
snippets 以模版方式编程
Snippet Function
1.[ctrl+shift+P]+輸入'pci'+輸入'Snippet: Function'
2.輸入'fun'+[Enter]，自動產生 function
3.輸入'ife'，自動產生 if else

**JavaScript snippets**
[ctrl+shift+P]+輸入'pci'+輸入'JavaScript Completions'
輸入'gi'，自動產生 getElementById

**JQuery snippets**
[ctrl+shift+P]+輸入'pci'+輸入'JQuery'
輸入'get'，自動產生 get請求
輸入'post'，自動產生 post請求

**Insert Callback**
[ctrl+shift+P]+輸入'pci'+輸入'Insert Callback'
[alt+C]，自動產生 callBack function

**AdvancedNewFile**
Ctrl+Alt+N输入文件名即可在当前文件夹下创建文件； 
Ctrl+Alt+N输入带路径的文件名即可在该路径下创建文件，如果路径不存在，便创建出该路径 

**Http Requester**
使用注解方式标记路由地址，测试http request请求
Ctrl + Alt + R //在新标签页显示选中路由地址的响应
选中请求链接URL或者请求块，快捷键：alt+command+R,就能在新的界面看到调用请求的返回数据。
// POST http:// 
// Content-type: application/x-www-form-urlencoded 
// POST_BODY: 
// ac=weeklyregister_register&code=weeklyregister&wapid=ma_62

//GET
// http://baidu.com  


Emmet http://docs.emmet.io/cheat-sheet

HTMLBeautify

JsFormat 

Sass

SyncedSideBar

JSLint，对JS进行语法校验
- 调出PackageControl（ctrl+shift+p）,安装sublimelinter插件
- 再安装sublimelinter-jsint插件
- 下载Node.js，http://notejs.org，并安装
- 调出命令行(开始，输入cmd)，输入npm install -g jshint
- 重新打开sublime text，新建或打开js文件，可以校验了
·Lint自定义规则 -> .jshintrc文件，具体的规则定义方式可详见jshint网站

All Autocomplete 它会搜索所有已打开的文件来匹配代码提示词 

AutoFileName 自动填充文件名

BracketHighlighter 它能为 Sublime Text 提供括号、引号这类的高亮功能

Color Highlighter 当 CSS 代码中出现类似 #FFFFFF 表示颜色的单词时，该插件会自动为这个单词上色

ConvertToUTF8 将文件编码转换成通用的 UTF-8

DocBlockr 自动识别函数，生成注释（使用方法：在函数定义的上一行输入 /** 再按 Tab 键）

FileDiffs 它允许你查看两个不同文件的差异，对比的对象还可以是剪贴板文本或当前文件最近一次保存的状态 

SidebarEnhancements 增强了左侧边栏文件的右键菜单

SublimeCodeIntel 代码提示插件，支持各种语言

Zen Tabs 智能优化标签栏的显示，避免出现 20 个标签并存导致每个标签的宽度过小的情况
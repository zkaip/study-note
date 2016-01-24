Oh My zsh!
===
### 安装
```
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

### 配置
`~/.zshrc`
```
alias cls='clear'
alias ll='ls -l'
alias la='ls -a'
alias vi='vim'
alias javac="javac -J-Dfile.encoding=utf8"
alias grep="grep --color=auto"
alias -s html=mate # 在命令行直接输入后缀为 html 的文件名，会在 TextMate 中打开
alias -s rb=mate # 在命令行直接输入 ruby 文件，会在 TextMate 中打开
alias -s py=vi # 在命令行直接输入 python 文件，会用 vim 中打开
以下类似 
alias -s js=vi
alias -s c=vi
alias -s java=vi
alias -s txt=vi
alias -s gz='tar -xzvf'
alias -s tgz='tar -xzvf'
alias -s zip='unzip'
alias -s bz2='tar -xjvf'
```
### 主题
`~/.oh-my-zsh/themes`

### 插件
- autojump zsh 和 autojump 的组合形成了 zsh 下最强悍的插件，今天我们主要说说这货。
- git：当你处于一个 git 受控的目录下时，Shell 会明确显示 「git」和 branch，对 git 很多命令进行了简化，例如 `gco=’git checkout’`、`gd=’git diff’`、`gst=’git status’`、`g=’git’`等等，熟练使用可以大大减少 git 的命令长度，命令内容可以参考`~/.oh-my-zsh/plugins/git/git.plugin.zsh`

### 目录浏览和跳转
输入 `d`，即可列出你在这个会话里访问的目录列表，输入列表前的序号，即可直接跳转。

在当前目录下输入 `..` 或 `… `，或直接输入当前目录名都可以跳转，你甚至不再需要输入 cd 命令了。

### 通配符搜索
`ls -l **/*.sh`，可以递归显示当前目录下的 shell 文件，文件少时可以代替 find，文件太多就歇菜了。
###参考
[终极shell](http://macshuo.com/?p=676)


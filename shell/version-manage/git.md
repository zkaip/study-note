[Git](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
===
### Install
Mac: brew install git
Linux: apt-get install git

    $ git config --global user.name "Your Name"
    $ git config --global user.email "email@example.com"

### Git 操作
```bash

# Git 操作
$ git init #create repository
$ git add <filename> # add file
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."# commit
$ git rm <filename> # delete
$ git remote add origin git@github.com:michaelliao/learngit.git # 关联远程库
$ git push -u origin<远程> master<本地> #加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
$ git clone <gitaddress>
$ git checkout -b dev #创建并切换dev分支
$ git branch dev #创建dev分支
$ git checkout dev #切换dev分支
$ git branch #查看当前分支
$ git branch -d dev #删除分支
$ git branch -D <filename> #强行删除没有被合并过的分支
$ git merge dev #Fast-forward合并
$ git merge --no-ff -m <filename> <commit> #普通合并
$ git stash #把工作区暂存起来
$ git stash apply #恢复工作区，但是恢复后，stash内容并不删除
$ git stash drop #删除工作区
$ git stash pop #恢复的同时把stash内容也删了
$ git remote -v #查看远程仓库详细信息
$ git checkout -b dev origin/dev #创建远程origin的dev分支到本地
$ git branch --set-upstream dev origin/dev #关联本地和远程分支
$ git pull #从远程抓取分支

# Git 查看
$ git status
$ git diff <filename>
$ git log # 查看提交历史
$ git log --graph
$ git refog # 查看命令历史

# Git版本控制
$ git reset --hard HEAD^
$ git reset --hard <commit_id>
#场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令
$ git checkout -- <filename>。#其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。
#场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，
第一步用命令 git reset HEAD <filename>，就回到了场景1，第二步按场景1操作。
#场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，前提是没有推送到远程库。
$ git reset --hard <commit_id>

# Git tags
$ git tag <name> #打标签(默认为HEAD)
$ git tag <name> <commit_id> #给指定节点打标签
$ git show <tagname> #展示标签详细信息
$ git tag -a v0.1 -m "version 0.1 released" 3628164 # 用-a指定标签名，-m指定说明文字
$ git tag -s v0.2 -m "signed version 0.2 released" fec145a # -s签名(gpg(GnuPG))
$ git tag #查看所有标签
$ git push origin <tagname> #推送本地标签
$ git push origin --tags #推送全部未推送过的本地标签
$ git tag -d v0.1 #删除本地标签
$ git push origin :refs/tags/v0.9 #删除远程标签

```
###忽略特殊文件
[.gitignore](https://github.com/github/gitignore)
- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
- 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。
- `.gitignore`文件本身要放到版本库里，并且可以对.gitignore做版本管理！

例子:
```bash
# Windows:
Thumbs.db
ehthumbs.db
Desktop.ini

# Python:
*.py[cod]
*.so
*.egg
*.egg-info
dist
build

# My configurations:
db.ini
deploy_key_rsa
```
###配置别名
```bash
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.st status
$ git config --global alias.unstage 'reset HEAD'
$ git config --global alias.last 'log -1'
# 每个仓库的Git配置文件都放在.git/config文件中
```
###多人协作工作模式

1. 首先，可以试图用`git push origin branch-name`推送自己的修改；
1. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
1. 如果合并有冲突，则解决冲突，并在本地提交；
1. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！
1. 如果`git pull`提示`“no tracking information”`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。
2. 
###[搭建git服务器](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)
### 在根目录建立根文件 `.travis.yml`

文件内容

```
language: node_js
node_js:
 - '0.8'
 - '0.10'
 - '0.11'

services:
	mongodb

script: make test
```

### 这个文件传递的信息是

- 这是一个 node.js 应用
- 这个测试需要用 0.8、0.10 以及 0.11 三个版本来跑
- 这个测试需要用 mongodb 服务
- 跑测试的命令是 make test

将这个文件添加到项目的根目录下，再 push 上 github，这时候 travis 就会被触发了。

travis 接着会做的事情是：

安装一个 node.js 运行时。由于我们指定了三个不同版本，于是 travis 会使用三个机器，分别安装三个版本的 node.js
这些机器在完成运行时安装后，会进入项目目录执行 npm install 来安装依赖。
当依赖安装完成后，执行我们指定的 script，在这里也就是 make test
如果测试通过的话，make 命令的返回码会是 0（如果不懂什么是返回码，则需要补补 shell 的知识），则测试通过；如果测试有不通过的 case，则返回码不会为 0，travis 则判断测试失败。

每一个 travis 上面的项目，都可以得到一个图片地址，这个地址上的图片会显示你项目当前的测试通过状态
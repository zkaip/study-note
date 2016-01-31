Docker
===
### Docker 基础
Docker基于Linux虚拟化技术
- 镜像 image
- 容器 container
- 仓库 repository

### 镜像
从仓库获取镜像 `docker pull image:tag`

**管理本地主机镜像**
- docker images 列出镜像
- docker rmi 删除镜像
- 创建镜像
  - 方法一 `docker commit`
    - 根据镜像启动容器
    - 然后 `docker commit` 即创建成功
    - 例如 `sudo docker commit -m "Added json gem" -a "Docker Newbee" 0b2616b0e5a8 ouruser/sinatra:v2`
  - 方法二 `Dockerfile` `-t`设置镜像的标签
    - `sudo docker build -t="image:tag"`
  - 方法三 本地文件导入
    - `sudo cat ubuntu-14.04-x86_64-minimal.tar.gz  |docker import - ubuntu:14.04`
    - `sudo docker load --input ubuntu_14.04.tar`
    - `sudo docker load < ubuntu_14.04.tar`
- 上传镜像 `docker push`
- 镜像导入导出
  - `sudo docker save -o ubuntu_14.04.tar ubuntu:14.04`

### 容器
- 根据镜像运行容器 `sudo docker run [option] image:tag [Command]`
  - `-t` 让Docker分配一个伪终端
  - `-i` 让容器的标准输入保持打开
  - `-d` 后台运行
  - `--name` 命名容器名
  - `-v` 数据卷
  - `--volumes-from` 挂载数据卷
  - `-P` 本地随机映射一个 `49000~49900`端口到内部容器开放的网络端口
  - `-p` 可以绑定多个端口, 可以指定要映射的端口，并且，在一个指定端口上只可以绑定一个容器。支持的格式有 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`
  - `--link name:alias` 容器连接 其中 name 是要链接的容器的名称，alias 是这个连接的别名。
- 启动已经终止的容器 `docker start`
- 重启容器 `docker restart`
- 终止容器 `docker stop` `exit` `Ctrl+d`
- 列出容器 `docker ps`
  - `-a` 列出所有容器
- 根据容器ID进入容器
  - 方法一 `attach`
    - `sudo docker run -idt ubuntu` 或者 `PID=$(docker inspect --format "{{ .State.Pid }}" <container>)`获取容器ID
    - `sudo docker attach [容器名]|[容器ID]`
  - 方法二 [nsenter](https://yeasy.gitbooks.io/docker_practice/content/container/enter.html)
    - `nsenter --target $PID --mount --uts --ipc --net --pid`
  - 方法三 [脚本](https://raw.githubusercontent.com/yeasy/docker_practice/master/_local/.bashrc_docker)
    - `docker-enter`
    - `docker-id`
    - `docker-ip`
- 导入导出
  - `sudo docker export 7691a814370e > ubuntu.tar`
  - `cat ubuntu.tar | sudo docker import - test/ubuntu:v1.0` 仅导入快照
  - `docker load` 导入整个镜像
- 删除容器 `docker rm`
  - `docker rm $(docker ps -a -q)` 删除终止状态的容器
  - `-f` 强制删除
  - `-v` 删除关联容器/数据卷
- 查看应用信息 `docker logs`
- 获取所有变量 `docker inspect`
    - `sudo docker inspect -f "{{ .Name }}" aed84ee21bde` 获取容器的名字
- 查看端口映射配置 `docker port container_name container_port`

### 仓库
`docker login`
`docker pull`
`docker push`
`docker search`
自动构建(国内daocloud)
[私有镜像](https://yeasy.gitbooks.io/docker_practice/content/repository/local_repo.html)

[仓库配置文件](https://yeasy.gitbooks.io/docker_practice/content/repository/config.html)

---

### 数据管理
#### 数据卷 Data volumes
可供多个容器使用的特殊目录
- 数据卷可以在容器之间共享和重用
- 对数据卷的修改会立马生效
- 对数据卷的更新，不会影响镜像
- 数据卷默认会一直存在，即使容器被删除

**Docker 挂载数据卷的默认权限是读写，用户也可以通过 :ro 指定为只读。**

- 创建数据卷
  - `docker run -v`
    - ` sudo docker run -d -P --name web -v /webapp training/webapp python app.py` 加载一个数据卷到容器的`/webapp`目录
    - `sudo docker run -d -P --name web -v /src/webapp:/opt/webapp training/webapp python app.py` 加载主机的 `/src/webapp` 目录到容器的 `/opt/webapp` 目录
  - `Dockerfile`中使用`VOLUME`
- 删除数据卷 删除容器时使用`docker rm -v`
- 查看数据卷信息 `docker inspect [container]`找到数据卷信息

#### 数据卷容器 Data volume containers
如果数据需要在容器间共享, 最好创建数据卷容器
该数据卷容器实际上是正常的容器, 只是专门用来提供数据卷供其他容器挂载的

可以使用超过一个的 --volumes-from 参数来指定从多个容器挂载不同的数据卷。 也可以从其他已经挂载了数据卷的容器来级联挂载数据卷。

注意：使用 --volumes-from 参数所挂载数据卷的容器自己并不需要保持在运行状态。

如果删除了挂载的容器（包括 dbdata、db1 和 db2），数据卷并不会被自动删除。如果要删除一个数据卷，必须在删除最后一个还挂载着它的容器时使用 `docker rm -v` 命令来指定同时删除关联的容器
- 创建数据卷 `dbdata`
`$ sudo docker run -d -v /dbdata --name dbdata training/postgres echo Data-only container for postgres`
- 其他容器使用`--volumes-from`挂载 `dbdata`
  - `sudo docker run -d --volumes-from dbdata --name db1 training/postgres`
  - `sudo docker run -d --volumes-from dbdata --name db2 training/postgres`

#### [备份 恢复](https://yeasy.gitbooks.io/docker_practice/content/data_management/management.html)
- 备份 `sudo docker run --volumes-from dbdata -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata`
- 恢复 `sudo docker run --volumes-from dbdata2 -v $(pwd):/backup busybox tar xvf /backup/backup.tar`

### 网络服务
`docker run`
- `-P` 随机端口 
- `-p` 指定端口

容器连接 `--link name:alias`
- 创建db数据库容器 `sudo docker run -d --name db training/postgres`
- 创建web容器并连接到数据库容器 `sudo docker run -d -P --name web --link db:db training/webapp python app.py`

Docker 通过 2 种方式为容器公开连接信息：
- 环境变量
- 更新 /etc/hosts 文件

#### 高级网络配置
其中有些命令选项只有在 Docker 服务启动的时候才能配置，而且不能马上生效。
- -b BRIDGE or --bridge=BRIDGE --指定容器挂载的网桥
- --bip=CIDR --定制 docker0 的掩码
- -H SOCKET... or --host=SOCKET... --Docker 服务端接收命令的通道
- --icc=true|false --是否支持容器之间进行通信
- --ip-forward=true|false --请看下文容器之间的通信
- --iptables=true|false --禁止 Docker 添加 iptables 规则
- --mtu=BYTES --容器网络中的 MTU

既可以在启动服务时指定，也可以 Docker 容器启动（docker run）时候指定。在 Docker 服务启动的时候指定则会成为默认值，后面执行 docker run 时可以覆盖设置的默认值。
- --dns=IP_ADDRESS... --使用指定的DNS服务器
- --dns-search=DOMAIN... --指定DNS搜索域

只有在 docker run 执行时使用，因为它是针对容器的特性内容。
- -h HOSTNAME or --hostname=HOSTNAME --配置容器主机名
- --link=CONTAINER_NAME:ALIAS --添加到另一个容器的连接
- --net=bridge|none|container:NAME_or_ID|host --配置容器的桥接模式
- -p SPEC or --publish=SPEC --映射容器端口到宿主主机
- -P or --publish-all=true|false --映射容器所有端口到宿主主机

#### [容器访问控制](https://yeasy.gitbooks.io/docker_practice/content/advanced_network/access_control.html)
- 访问外部网络 `sysctl net.ipv4.ip_forward`
- 容器互联 iptables 网络拓扑

#### 容器端口映射实现
默认容器可以主动访问到外部网络的, `-p` `-P`实际上都是操作`iptables`

[自定义网桥](https://yeasy.gitbooks.io/docker_practice/content/advanced_network/bridge.html)

[点到点连接](https://yeasy.gitbooks.io/docker_practice/content/advanced_network/ptp.html)

### [Dockerfile](https://yeasy.gitbooks.io/docker_practice/content/dockerfile/instructions.html)
Dockerfile 分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。

指令
- FROM
- MAINTAINER
- RUN
- CMD
- EXPOSE
- ENV
- ADD
- COPY
- ENTRYPOINT
- VOLUME
- USER
- WORKDIR
- ONBUILD

创建镜像 `docker build [选项] 路径`

### Docker Compose
通过模板定义一组关联容器(project)
`docker-compose [options] [COMMAND] [ARGS...]`

**选项**
- --verbose 输出更多调试信息。
- --version 打印版本并退出。
- -f, --file FILE 使用特定的 compose 模板文件，默认为 docker-compose.yml。
- -p, --project-name NAME 指定项目名称，默认使用目录名称。

**命令**
- build 构建或重新构建服务。
- help 获得一个命令的帮助。
- kill 通过发送 SIGKILL 信号来强制停止服务容器。支持通过参数来指定发送的信号，例如
- logs 查看服务的输出。
- port 打印绑定的公共端口。
- ps 列出所有容器。
- pull 拉取服务镜像。
- rm 删除停止的服务容器。
- run 在一个服务上执行一个命令。
- scale 设置同一个服务运行的容器个数。
- start 启动一个已经存在的服务容器。
- stop 停止一个已经运行的容器，但不删除它。通过 docker-compose start 可以再次启动这些容器。
- up 构建，（重新）创建，启动，链接一个服务相关的容器。

**环境变量**
环境变量可以用来配置 Compose 的行为。
以DOCKER_开头的变量和用来配置 Docker 命令行客户端的使用一样。如果使用 boot2docker , $(boot2docker shellinit) 将会设置它们为正确的值。

- COMPOSE_PROJECT_NAME 设置通过 Compose 启动的每一个容器前添加的项目名称，默认是当前工作目录的名字。
- COMPOSE_FILE 设置要使用的 docker-compose.yml 的路径。默认路径是当前工作目录。
- DOCKER_HOST 设置 Docker daemon 的地址。默认使用 unix:///var/run/docker.sock，与 - Docker 客户端采用的默认值一致。
- DOCKER_TLS_VERIFY 如果设置不为空，则与 Docker daemon 交互通过 TLS 进行。
- DOCKER_CERT_PATH 配置 TLS 通信所需要的验证（ca.pem、cert.pem 和 key.- pem）文件的路径，默认是 ~/.docker 。

**[YAML 模板文件](https://yeasy.gitbooks.io/docker_practice/content/compose/yaml_file.html)**

### Docker Machine
管理 Docker 主机
- active 查看活跃的 Docker 主机
- config 输出连接的配置信息
- create 创建一个 Docker 主机
- env 显示连接到某个主机需要的环境变量
- inspect 输出主机更多信息
- ip 获取主机地址
- kill 停止某个主机
- ls 列出所有管理的主机
- regenerate-certs 为某个主机重新生成 TLS 认证信息
- restart 重启主机
- rm 删除某台主机
- ssh SSH 到主机上执行命令
- scp 在主机之间复制文件
- start 启动一个主机
- stop 停止一个主机
- upgrade 更新主机 Docker 版本为最新
- url 获取主机的 URL
- help, h 输出帮助信息

### 参考
[Docker —— 从入门到实践](https://www.gitbook.com/book/yeasy/docker_practice/details)
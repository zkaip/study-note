Unix WebSocket 服务
===
http://websocketd.com/

websocketd可作为后台服务运行，它帮你处理WebSocket 连接,加载你的程序处理WebSocket, 在程序和浏览器直接传送消息。不需要任何依赖包，进程独立。

以从1到10计数为例：使用Linux的sh命令:


#!/bin/bash

# Count from 1 to 10 with a sleep
for COUNT in $(seq 1 10); do
  echo $COUNT
  sleep 0.5
done


使用websocketd启动这个程序：
$ websocketd --port=8080 my-program

现在就可以在浏览器页面中使用Javascript连接8080端口，接受消息：


var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log('Count is: ' + event.data);
};
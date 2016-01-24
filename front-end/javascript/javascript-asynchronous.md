JavaScript 异步
===
### 浏览器环境异步队列
```javascript
setImmediate(function(){
    console.log(1);
},0);
setTimeout(function(){
    console.log(2);
},0);
new Promise(function(resolve){
    console.log(3);
    resolve();
    console.log(4);
}).then(function(){
    console.log(5);
});
console.log(6);
process.nextTick(function(){
    console.log(7);
});
console.log(8);
```
结果: **3 4 6 8 7 5 2 1**

事件的注册顺序如下：**setImmediate - setTimeout - promise.then - process.nextTick**

优先级关系如下：**process.nextTick > promise.then > setTimeout > setImmediate**

消息是有分类别的，按照性质，划分为两大类：**macrotask**和 **microtask**

- macrotasks: script(你的全部JS代码，“同步代码”）, setTimeout, setInterval, setImmediate, I/O, UI rendering
- microtasks: process.nextTick,Promises, Object.observe, MutationObserver

- js引擎首先从macrotask queue中取出第一个任务，执行完毕后，将microtask 
queue中的所有任务取出，按顺序全部执行；
- 然后再从macrotask queue中取下一个，执行完毕后，再次将microtask 
queue中的全部取出；
- 循环往复，直到两个queue中的任务都取完。

**注意：先从macrotask取，再从microtask取；macrotask queue是一次取一个，microtask queue是一次取所有（下次如无，则不取）；**
```javascript
// 以下这一整段代码（来自题目，有做修改）作为macrotasks被添加进相应队列

setTimeout(function A(){console.log(4)},0);  // 函数A作为macrotasks被添加进相应队列
new Promise(function(resolve){
    console.log(1)
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    console.log(2)
}).then(function B(){ // 已经fullfill，因此函数B立刻作为microtask被添加进相应队列
    console.log(5)
}).then(function C(){ // 函数C作为microtask被添加进相应队列
    consoele.log(6)
});
console.log(3);
```
结果就是：
- 先从macrotask取你的同步代码，打印1，2，3
- 再从microtask取函数B、C，打印5，6
- 再从macrotask取函数A，打印4

### nodejs异步IO
![nodejs的IO执行过程](http://static.data.taobaocdn.com/up/nodeclub/2011/01/nodejs_eio.jpg)
- nodejs通过libev事件得到IO执行状态，而不是轮询，提高了CPU利用率。 
- 虽然nodejs是单线程的，但它的IO操作是多线程的，多个IO请求会创建多个libeio线程（最多4个），使通常情况的IO操作性能得到提高。 
- 但是当IO操作情况比较复杂的时候，有可能造成线程竞争状态，导致IO性能降低；而且libeio最多创建4个线程，当同时有大量IO请求时，实际性能有待测量。另外，由于每个IO请求对应一个libeio的数据结构，当同时有大量IO操作驻留在系统中时候，会增加内存开销。 
- Libeio为了实现异步IO功能，带来了额外的管理，当IO数据量比较小的时候，整体性能不一定比同步IO好。

### 参考
- [Promise的队列与setTimeout的队列的有何关联？](https://www.zhihu.com/question/36972010)
- [nodejs异步IO的实现](https://cnodejs.org/topic/4f16442ccae1f4aa2700113b)
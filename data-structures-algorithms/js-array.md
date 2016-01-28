Javascript 常用数组算法
===
### 1、数组去重
方法1:
```javascript
//利用数组的indexOf方法
function unique (arr) {
 var result = []; 
 for (var i = 0; i < arr.length; i++)
 {
   if (result.indexOf(arr[i]) == -1) result.push(arr[i]);
 }
 return result;
}
```
方法2：
```javascript
//利用hash表,可能会出现字符串和数字一样的话出错，如var a = [1, 2, 3, 4, '3', 5],会返回[1, 2, 3, 4, 5]
function unique (arr)
{
  var hash = {},result = []; 
  for(var i = 0; i < arr.length; i++)
  {
     if (!hash[arr[i]]) 
     {
         hash[arr[i]] = true; 
         result.push(arr[i]); 
       }
   }
   return result;
}
```
方法3：
```javascript
//排序后比较相邻，如果一样则放弃，否则加入到result。会出现与方法2一样的问题，如果数组中存在1,1,'```javascript1'这样的情况，则会排错
function unique (arr) {
  arr.sort();
  var result=[arr[0]];
  for(var i = 1; i < arr.length; i++){
      if( arr[i] !== arr[i-1]) {
          result.push(arr[i]);
      }
  }
  return result;
}
```
方法4：
```javascript
//最简单但是效率最低的算法,也不会出现方法2和方法3出现的bug
function unique (arr) {
  if(arr.length == 0) return;
  var result = [arr[0]], isRepeate;
  for( var i = 0, j = arr.length; i < j; i++ ){
    isRepeate = false;
    for( var k = 0, h = result.length; k < h; k++){
        if(result[k] === arr[i]){
            isRepeate = true;
            break;
        }
        if(k == h) break;
    }
    if( !isRepeate ) result.push(arr[i]);
  }
  return result;
}
```
### 2、数组顺序扰乱

方法1：
```javascript
//每次随机抽一个数并移动到新数组中
function shuffle(array) {
  var copy = [],
       n = array.length,
       i;
  // 如果还剩有元素则继续。。。
  while (n) {
     // 随机抽取一个元素
     i = Math.floor(Math.random() * array.length);
     // 如果这个元素之前没有被选中过。。
     if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
     }
   }
}
```
方法2：
```javascript
//跟方法1类似，只不过通过splice来去掉原数组已选项
function shuffle(array) {
  var copy = [],
       n = array.length,
       i;
  // 如果还剩有元素。。
  while (n) {
     // 随机选取一个元素
     i = Math.floor(Math.random() * n--);
     // 移动到新数组中
     copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}
```
方法3：
```javascript
//前面随机抽数依次跟末尾的数交换，后面依次前移，即：第一次前n个数随机抽一个跟第n个交换，第二次前n-1个数跟第n-1个交换，依次类推。
function shuffle(array) {
  var m = array.length,
     t, i;
  // 如果还剩有元素…
  while (m) {
    // 随机选取一个元素…
    i = Math.floor(Math.random() * m--);
    // 与当前元素进行交换
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
```
### 3、数组判断
方法1：
```javascript
//自带的isArray方法
var array6 = [];
Array.isArray(array6 );//true
```
方法2：
```javascript
//利用instanceof运算符
var array5 = [];
array5 instanceof Array;//true
```
方法3：
```javascript
//利用toString的返回值
function isArray(o) {
  return Object.prototype.toString.call(o) === ‘[object Array]‘;
}
```
### 4、数组求交集
```
方法1：
```javascriptjavascript
//利用filter和数组自带的indexOf方法
array1.filter(function(n) {
  return array2.indexOf(n) != -1
});
```
### 5、数组求并集

方法1：
```javascript
//方法原理：连接两个数组并去重
function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
       if(a[i] === a[j])
          a.splice(j--, 1);
    }
  }
  return a;
};
```
### 6、数组求差集
方法1：
```javascript
//利用filter和indexOf方法
Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};
```
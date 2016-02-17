LeetCode 学习
===
## Array
###  No.1 数组移除元素
在一个数组里移除指定value,并返回新的数组长度,不能新建数组
```java
public int removeElement(int A[], int elem){
    int i = 0, j = 0;
    for(i = 0;i < A.length ;i++){
      if(A[i]==elem){
        continue;
      }
      A[j] = A[i];
      j++;
    }
    return j;
  }
```
### No.2 在排序好的数组里删除重复元素
在一个排序好的数组里移除重复元素,并返回新的数组长度,不能新建数组
```java
public int removeDuplicates(int[] A){
  int n = A.length;
  if(n==0){
    return 0;
  }
  int j=0;
  for(int i=1; i<n; i++){
    if(A[j]!=A[i]){
      A[++j]=A[i];
    }
  }
  return j+1;
}
```
### No.3 在排序好的数组里删除重复元素(该元素允许重复2次)
在一个排序好的数组里移除重复元素,该元素可以重复2次,并返回新的数组长度,不能新建数组
我们需要计数器记录重复的次数,如果重复次数大于等于2按照上一题方式处理,如果不是重复元素了,计数器清零
```java
public int removeDuplicates(int[] A, int num){
  int n = A.length;
  if(n==0){
    return 0;
  }
  int j=0;
  int num=0;//计数器
  for(int i=1; i<n; i++){
    if(A[j]==A[i]){
      num++;
      if(num<2){
        A[++j]=A[i];
      }
    } else {
      A[++j]=A[i];
      num = 0;
    }
  }
  return j+1;
}
```
### No.4 加法 数字加1
```c++
public:
  vector<int> plusOne(vector<int> digits){
  vector<int> res(digits.size(),0);
  int sum = 0;
  int one = 1;
  for(int i = digits.length() -1; i>=0; i--){
    sum = one + digits[i];
    one = sum / 10;
    res[i] = sum % 10;
  }
  if(one>0){
    res.insert(res.begin(),one);
  }
  return res;
}
```
### No.5 帕斯卡三角
```c++
vector<vector<int>> generate(int numRows){
  vector<vector<int> > vals;
  vals.resize(numRows);
  for(int i = 0; i < numRows; i++) {
    vals[i].resize(i + 1);
    vals[i][0] = 1;
    vals[i][vals[i].size()-1]=1;
    for(int j=1; j<vals[i].size()-1; j++) {
      vals[i][j]=vals[i-1][j-1]+vals[i-1][j];
    }
  }
  return vals;
}
```
### No.6 帕斯卡三角 具体k层的集合, 只能使用O(k)的空间
一维数组滚动计算
```c++
public:
  vector<int> getRow(int rowIndex) {
    vector<int> vals;
    vals.resize(rowIndex+1, 1);
    for(int i = 0; i< rowIndex+1; ++i){
      for(int j = i-1; j>=1; --j){
        vals[j] = vals[j]+vals[j-1];
      }
    }
    return vals;
  }
```
### 合并排序好的数组 A 和 B
A B都是排序好的数组, 只需要使用游标 i 指向 m+n-1 即可
```java
public void merge(int[] A, int[] B){
  int m = A.length;
  int n = B.length;
  int i = m + n -1;
  int j = m - 1;
  int k = n - 1;

  while(i>=0){
    if(j>0 && k>=0){
      if(A[j]>B[K]){
        A[i]=A[j];
        j--;
      }else{
        A[i]=B[k];
        k--;
      }
    } else if(j>=0){
      A[i]=A[j];
      j--;
    } else if(k>=0){
      A[i] = B[k];
      k--;
    }
    i--;
  }
}
```



































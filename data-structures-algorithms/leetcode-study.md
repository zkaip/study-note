LeetCode 学习
===
## Array
###  No.1
在一个数组里移除指定value,并返回新的数组长度,不能新建数组
```java
class Solution {
public:
  int removeElement(int A[], int n, int elem){
    int i = 0, j = 0;
    for(i = 0;i < n;i++){
      if(A[i]==elem){
        continue;
      }
      A[j] = A[i];
      j++;
    }
    return j;
  }
};
```                                   
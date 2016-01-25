C++ 基础
===
### 数据类型
- 基本类型
  - 整型 int
  - 字符型 char
  - 实型
      - 单精度实型 float
      - 双精度实型 double
  - 逻辑类型 bool true/false
- 构造类型
  - 数组类型
  - 结构类型 struct
  - 联合类型 union
  - 枚举类型 enum
- 指针类型
- 空类型 void

### 初始化两种方式
- 赋值初始化 int x=1024;
- 直接初始化 int x(1024);
    
随用随定义
命名空间

输入输出方式(不关注占位符，不关注数据类型)
> #include<iostream>
> using namespace std;
输入 `cin >>x>>y;`
输出 `cout << "x+y=" <<x+y<<endl;`

```c++
#include<stdlib.h>
int main(void){
    system(pause);
    return 0;
}
```
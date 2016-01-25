Char Set 字符编码
===
### Ajax & Servlet
**get**
- 找到配置文件server.xml 找到Connector节点，添加 URIEncoding="utf-8" (针对 Chrome、FireFox)有效
- 创建请求时，通过 encodeURI(uri)  方法对地址进行编码(IE)
  - 方法一（代码解决）：
    - 将数据按照ISO-8859-1的方式打散成byte[]
      - byte[] bytes=request.getParameter("name").getBytes("ISO-8859-1");
    - 按照指定的编码对数据进行重组                     
      - String newName=new String(bytes,"utf-8"); //把解码后的字符重新按照utf-8编码
  - 方法二（tomcat配置文件）：
    - 修改 tomcat server.xml文件 
    - <Connector port="8080" URIEncoding="utf-8" /> 

**post**
需要在servlet中添加 request.setCharacterEncoding("utf-8"); 或者添加过滤器

### SpringMVC
**get** server.xml

**post** 通过spring提供的过滤器进行中文乱码的处理, 在web.xml中添加过滤器(注意:前台页面 与 过滤器 编码要一致)
```xml
<filter>
 <filter-name>encodingFilter</filter-name>
 <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
 <init-param>
    <param-name>encoding</param-name>
    <param-value>utf-8</param-value>
 </init-param>
</filter>
<filter-mapping>
 <filter-name>encodingFilter</filter-name>
 <url-pattern>/*</url-pattern>
</filter-mapping>
```
    
### Html
`<meta charset="utf-8">`

**Cookie存储中文** 
cookie 只支持ascii码 
- 将中文转换成 ASCII码: `URLEncoder.encode("中文","utf-8")` 
- 将ASCII码转换成中文: `URLDecoder.decode(value,"utf-8")` 

```java
//Cookie 存储中文 
String name="中文"; 
Cookie c = new Cookie("name",URLEncoder.encode(name,"utf-8")); 
//Cookie 获取中文 
Cookie c = cookies[0]; 
String name= URLDecoder.decode(c.getValue(),"utf-8"); 
```
### MySQL中文乱码完美解决
在[client]字段里加入default-character-set=utf8
```
[client]
port = 3306
socket = /var/lib/mysql/mysql.sock
default-character-set=utf8
在[mysqld]字段里加入character-set-server=utf8
[mysqld]
port = 3306
socket = /var/lib/mysql/mysql.sock
character-set-server=utf8
在[mysql]字段里加入default-character-set=utf8
[mysql]
no-auto-rehash
default-character-set=utf8
```
修改完成后，service mysql restart重启mysql服务就生效。注意：[mysqld]字段与[mysql]字段是有区别的。这点在网上没人反馈过。
使用`SHOW VARIABLES LIKE ‘character%’;`查看，发现数据库编码全已改成utf8
```
+--------------------------+----------------------------+
| Variable_name | Value |
+--------------------------+----------------------------+
| character_set_client | utf8 |
| character_set_connection | utf8 |
| character_set_database | utf8 |
| character_set_filesystem | binary |
| character_set_results | utf8 |
| character_set_server | utf8 |
| character_set_system | utf8 |
| character_sets_dir | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
```
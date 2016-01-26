Servlet
===
什么是servlet？ 
    Sun公司制定的一种用来扩展web服务器功能的组件规范 
a、扩展web服务器功能 
    由静态变为动态 
b、组件规范 
    组件:不能单独运行，必须放在指定的容器中才可以运行 
    规范:根据定义好的功能框架，自己给出实现 
    广义上讲:Sun公司提供的一组借口以及抽象类 
    狭义上讲:处理不同的服务器端的请求与响应的应用程序 
什么是容器？ （tomcat容器）
符合一定规范，为组件提供运行环境的一个程序。

如何开发Servlet应用程序 ？
准备： 
    创建项目(web) : web01 
    创建包 : web 
1、创建类 
继承自 HttpServlet 或者 实现 Servlet接口
HttpServlet : 类，给出了一部分实现
Servlet : 接口 ， 必须将所有方法都给出实现
2、重写（覆盖） service 方法 
 public void service(HttpServletRequest request , HttpServletResponse response)
  throws ServletException , IOException{
  //指定响应数据的格式以及编码
  response.setContentType("text/html;charset=utf-8");
  response.setCharacterEncoding("utf-8");
  PrintWriter out=response.getWriter();
  out.print("Hello World");
  out.println("Hello World");
  out.close();
    }
3、web项目中 web.xml 文件 
增加 servlet 的注册
<servlet>
  <servlet-name></servlet-name>
  <servlet-class></servlet-class>
</servlet>
增加 servlet 的地址映射
<servlet-mapping>
  <servlet-name></servlet-name>
  <url-pattern>/hello</url-pattern>
 </servlet-mapping>
4、将web程序 部署到服务器(tomcat)上 
5、启动服务 ，输入地址访问 

http://localhost:8080/web01/hello 
http://localhost:8080/ 

服务状态码：
    1、404 
请求资源未找到
前提：能找到web服务器，但是找不到具体的
请求资源
如果web服务器都找不到的话 返回 ： 无法连接

引发404的原因:
1、web程序没部署
2、地址错误
3、web.xml文件中 ，两个servlet-name不一致
4、部署的目录结构不正确
    2、405 
           查找service方法 
1、service写错(大小写)
2、service方法参数 与标准的不一致
3、service方法的异常、返回值类型与标准不一致
    3、500 程序在运行过程中出错 
    4、200 服务器正常响应数据，没出任何问题 


==================================== 
Servlet : 接口 
处理所有的请求与响应 
所在包 ：javax.servlet 

ServletRequest : 
处理所有的请求（不分协议） 
ServletResponse: 

HttpServletRequest: 
专门处理Http请求 
由 Web Container 封装了用户的 Http 请求数据包而生成，可通过它获得所有跟用户请求数据报相关的信息。
    getProtocol():String ——返回对应的协议 (如：HTTP/1.1)
    getMethod():String ——返回 http 对应的方法 (Get|Post)
    getRemoteHost():String ——返回远程主机名 (如：127.0.0.1)
    getRemotePort():int ——返回远程端口号 (如：55013)
    getHeader(String config):String ——返回http对应的首部信息(参数如Accept-Language)
    getParameter(String name):String ——返回指定参数(name)的值(value) (如：zhangsan)
    getParameterValues(String name):String[] ——返回指定输入参数(名为 name)的所有值(输入的参数列表)
    getParameterNames():Enumeration ——返回请求对象中全部输入参数的名称
                                               (如：java.util.Hashtable$Enumerator@1ff395a) 
    getContextPath();
    getServletPath();
    getPathInfo();
    值得注意的是，请求 URI 和路径的各部分之间的 URL 编码的不同之外，下面的等式恒成立：
    requestURI = contextPath + servletPath + pathInfo
HttpServletResponse: 

======================================== 
Servlet如何处理http协议 
请求到达容器后，web容器会将数据包拆包，并且把数据封装成两个对象 
1、HttpServletRequest 
该对象代表客户端的请求，封装所有请求信息
作用：
a、读取和写入http请求数据
b、获取 cookie
c、取得路径信息
获取 url   request.getRequestURL();
      http://localhost:8080/web01/hello
获取 uri   request.getRequestURI();
               /web01/hello
d、标识 http 会话 (session)
e、转发
2、HttpServletResponse 
          封装了所有的响应信息给浏览器     
作用:
a、设置对客户端的输出内容 out.print()
b、设置响应的状态码 
c、设置浏览器的响应类型以及编码 
d、设置cookie
e、重定向
============================================================ 
客户端向服务器请求数据：
1、请求方式： 
请求方式是客户端（浏览器）对话服务器的一个意向说明,是区分请求种类的关键
不同的请求方式
1、浏览器向服务器提交的方式不同
2、服务器处理请求数据的方式也不同
3、会采用不同的缓存策略（以浏览器为主）
2、请求方式种类 
    a、get 
向服务器请求指定资源 
根据指定的条件，让服务器帮你查询数据的时候 
在什么样的情况下浏览器会发送get请求？ 
a、地址栏输入地址 
b、点击超链接 
c、表单提交（默认提交方式或者设置method为get） 
特点： 
1、get提交方式是将参数通过地址栏进行提交给服务器 
格式:http://localhost:8080/web01/hello?name=value&age=18 
2、有长度的限制： 2KB
IE : 2KB 2083字节 
FireFox : 4KB 
3、地址栏传递参数，安全性较低 
    b、post 
向服务器提交资源 
提交数据会封装到 实体内容中 
什么样的情况下浏览器会使用post请求？ 
设置表单的method属性为 post的时候 
特点： 
1、长度 ：根据不同的服务器而不同, 基本可以理解不限制长度 
2、安全性较高 
    c、head 
与get一样，没用响应体 
    d、put 
上传指定资源 
    e、delete 
    删除服务器的资源 
    <form method="" > 

服务器获取客户端请求的数据：
1、获取 1:1的数据 
一个名称对应一个值
name=zs age=18
String value=request.getParameter("name");

先去实体内容中查找指定name的数据，
如果实体内容中没有的话，去地址栏找
如果地址栏也没有，则返回null
2、获取 1:M的数据 
String[] values=request.getParameterValues("name");
使用场合 :
1、<input type="checkbox" />
2、<select multiple></select>

中文乱码 
a、post 
    request.setCharacterEncoding("utf-8"); 
b、get 
      方法一（代码解决）：
          1)、将数据按照ISO-8859-1的方式打散成byte[]
                byte[] bytes=request.getParameter("name").getBytes("ISO-8859-1");
2)、按照指定的编码对数据进行重组
       String newName=new String(bytes,"utf-8");
     方法二（tomcat配置文件）： 
修改 tomcat server.xml文件
<Connector port="8080" URIEncoding="utf-8" />
Servlet编写三步曲 
a、修改 request编码 
    request.setCharacterEncoding("utf-8"); 
b、修改 response响应类型及编码 
    response.setContentType("text/html;charset=utf-8"); 
c、获取响应数据流 
    PrintWriter out = response.getWriter(); 

重定向
服务器通知浏览器 向一个新的资源地址 发送请求
服务器 向浏览器发送一个 302状态码 以及一个Location的消息头(临时性重定向）
如何实现重定向:
response.sendRedirect("url/uri");
一次完整的重定向，至少会产生2次请求
特点：
1、重定向地址可以是任意地址 (本应用内的，也可以是其它的外部应用)
2、重定向后，地址栏地址会发生改变
3、重定向过程中所涉及到的所有的web组件 不会共享同一个request以及response
转发 
    1、what 
一个web组件将未完成的内容通过容器转交给 另外一个web组件去完成 
常见情况：servlet查询到数据（dao），然后交给jsp去显示 
    2、步骤 
a、绑定数据到request中 
request.setAttribute(String name,Object value); 
b、获取转发器 
RequestDispatcher rd= request.getRequestDispatcher("转发路径"); 
c、转发 
rd.forward(request,response); 
合并步骤: 
request.setAttribtue(); request.getRequestDispatcher("uri").forward(request,response); 
3、转发特点 
a、转发后，地址栏地址不发生改变 
b、转发只能是本应用内的其他组件 
c、转发所涉及到的web组件之间是共享request以及response的 
d、转发后面其他的代码会不会执行 答案：会 
转发是一次请求，而重定向是两次请求 
请求资源路径：
Servlet容器如何处理请求资源路径?
1、什么是请求资源路径
    http://localhost:8080/appName/abc.html 
    http://ip:port/appName/uri
    请求资源路径: /appName/abc.html 
2、容器如何处理请求资源路径 
    a、会根据ip:port定位到web服务器，并且将 
        请求交给web容器(tomcat) 
    b、web容器会根据 appName 定位到 容器内的某一具体web应用，会将uri内容 默认当成
一个servlet进行匹配，如果servlet没有匹配到的话再去静态资源中去查找（网页文件），
如果连静态资源文件也没找到的话，则返回404
去和web.xml中的所有<url-pattern>匹配 ==>匹配不上，去静态资源中去查找 
==>匹配不上，返回404
Serlvet路径匹配规则 
        优先级:精确匹配 > 通配符匹配 > 后缀匹配
1、精确匹配
当浏览器发送请求，请求资源必须与
url-pattern 定义的一模一样才能匹配上
2、通配符匹配
<url-pattern>/*</url-pattern>
精确匹配与通配符匹配同时出现的话,以精确匹配为准
3、后缀匹配
特点：不能以 / 开头
<url-pattern>*.do</url-pattern>

合并Servlet请求 
1、http://localhost:8080/web/add 
2、http://localhost:8080/web/find 
步骤： 
1、添加一个 servlet
匹配模式 采用 后缀匹配
ActionServlet
<url-pattern>*.do</url-pattern>
2、修改所有的请求路径 为 xxx.do
http://localhost:8080/web/add
http://localhost:8080/web/add.do

http://localhost:8080/web/find
http://localhost:8080/web/find.do
3、在ActionServlet中 ， 截取 请求资源路径
判断请求到底要做什么
add.do : 注册请求
find.do : 查询所有请求
modify.do : 修改请求

if(请求资源路径.equals("add.do")){
//处理 add 请求操作
} else if(请求资源路径.equals("modify.do")){
//处理 modify 请求
}
路径问题
什么是路径:查找资源的地址
1、链接地址<a href="url"></a>
2、表单提交<form action="url" ></form>
3、重定向 response.sendRedirect(url);
4、转发 request.getRequestDispatcher(url) .forward(request,response); 
    相对路径: 在不涉及到转发的时候，可以使用相对路径
  a、what
     从当前文件位置处开始查找指定资源的路径
  b、特点
     不以 / 开始的
  c、返回上一级
     ../
  eg : 
    a、index.html 想找到 img.jpg
       在index.html中 写入以下代码:
       <img src="img/img.jpg" />
    b、index.html 想链接到 default.jsp
       <a href="../default.jsp"></a>
    绝对路径: 
   a、从一个固定的开始位置查找指定的资源
               固定的位置：
           1、应用名称之前（非转发 （重定向、表单提交、超链接）） 
response.sendRedirect("/web应用/资源路径");
 2、应用名称之后（转发）
 request.getRequestDispatcher("/资源路径")
   b、如何表示绝对路径   以 / 开始的 
   eg:
      1、通过转发的方式
         default.jsp 转发给 index.html
  request.getRequestDispatcher("/pages/index.html");
      2、通过重定向的方式
         default.jsp 重定向到 index.html
  response.sendRedirect("/web06/pages/index.html");
      获取 web 应用部署名称
          request.getContextPath();
          结果：/web05
          request.getContextPath()+"/资源路径"
Servlet生命周期 
servlet容器对servlet 创建、分配资源、调用服务以及销毁的整个过程 
a、实例化 
servlet容器 通过 servlet构造器进行实例化
实例化时机（什么时候进行实例化）：
1、首次访问进行实例化 （默认）
特点：
web容器启动速度快
首次访问servlet的时候，速度比较慢
2、容器启动时（通过配置文件设置）
tomcat启动服务时，顺便将servlet
实例化
<servlet>
<servlet-name>
<servlet-class>
<load-on-startup>1</load-on-startup>
</servlet>
特点：
web容器启动慢
每次访问servlet速度比较快
实例化只能进行1次
b、初始化 
public void init(ServletConfig config)
容器自动调用
HttpServlet父类GenericServlet 已经给出init方法的实现
ServletConfig : 获取servlet初始化参数
初始化参数:
<servlet>
<init-param>
<param-name>name</param-name>
<param-value>BJTarena</param-value>
</init-param>
</servlet>
GenericServlet实现init:
保存 ServletConfig对象，并且以后可以通过
getServletConfig方法获取该对象
c、就绪(服务) 
自定义实现
在产生对该servlet对象请求的时候，
由web容器负责调用,调用同时自动传入
HttpServletRequest , HttpServletResponse
d、销毁 
当web容器关闭时（关闭tomcat服务）
由容器自动调用，该方法已经由GenericServlet给出实现
public void destroy(){
......
}
Servlet 核心接口和类 
a、servlet接口
init ---> ServletConfig接口
destroy
service --> ServletRequest , ServletResponse
方法定义
b、GenericServlet 抽象类
实现自 servlet接口
给出 init destroy 方法的实现
c、HttpServlet 抽象类
继承自 GenericServlet
给出 service --> HttpServletRequest,HttpServletResponse 方法的实现
d、自定义servlet
继承自 HttpServlet
重写service方法
  get方式提交 交给 doGet方法
  post方式提交 交给 doPost方法
ServletContext : Servlet上下文对象 
a、what 
当web容器启动的时候，web容器会为每个 web应用创建一个 ServletContext对象，该对象表示web应用本身 
生命周期:
1、web容器启动时由web容器创建
2、web容器关闭时web容器进行销毁

特点：
1、唯一性 （每个web应用只有一个）
2、一直存在（随着web容器的生命周期而存在）
作用：
1、在整个web应用内共享数据 跨用户、跨请求 
a、绑定数据到ServletContext
setAttribute(String name,Object value)
b、获取已绑定的数据
Object value= getAttribute(String name);
c、移除已绑定的数据
removeAttribute(String name);
2、在web应用内获取静态资源
getRealPath(String path) : 获取指定目录的绝对路径
getRealPath("/img") :
E:\apache-tomcat-7.0.54\webapps\web03\img

一般会将多个页面用到的数据或者多个用户要用的数据保存在 ServletContext 中，其余的一律不放 
b、如何获取 
1、有GenericServlet提供的方法
getServletContext
2、通过ServletConfig对象提供的方法
getServletContext
public void init(ServletConfig config){
//1、
ServletContext sc=
config.getServletContext();
//2、
ServletContext sc=getServletContext();
}

public void service(){
ServletContext sc=getServletContext();
}
3、HttpSession （状态管理）
getServletContext
4、FilterConfig
getServletContext
c、初始化参数: 
1、web.xml中 
<context-param>
<param-name>
<param-value>
</context-param>
2、获取 
    ServletContext 提供方法 getInitParameter(); 
Servlet 线程安全问题
   sychronized(this){
     //处理代码
   }
   加锁

文件上传 
jspsmartupload.jar 
核心: 
SmartUpload 类 
1、表单 
<form method="post" enctype="multipart/form-data"> 
<input type="file" /> 
</form> 
注意： 
a、表单提交方式只能是 post 
b、enctype 
规范表单数据如何进行编码 
值: 
1、application/x-www-form-urlencoded
2、multipart/form-data
针对上传文件有效,但是文本无法提交
3、text/plain
2、SmartUpload 使用步骤 
a、实例化 SmartUpload 对象
SmartUpload su = new SmartUpload();
b、手动调用初始化方法
su.initialize(,,);
c、设置上传文件的限制
1、上传的文件扩展名（允许、不允许）
2、上传文件的大小(以B为单位)
d、从服务器内存中获取上传的文件到 缓冲区（从内存 放到 磁盘上）
su.upload()
e、将缓冲区的文件 保存到 服务器的指定路径上
JSP(servlet) 中异常处理
1、编程式异常处理
   手动通过try catch 模块进行异常管理
   在catch中捕获到异常将页面转发到另外一个页面上去
try{
      }catch(NullPointerException ex){
 ex.printStactTrace();
 request.setAttribute("空啦！");
 request.getRequestDispatcher("url").forward(req,resp);
      } catch(Exception ex){
 ex.printStactTrace();
 request.setAttribute("产生异常了！");
 request.getRequestDispatcher("url").forward(req,resp);
      }
   什么时候用：一般有异常处理主体的时候，采用编程式异常处理
2、声明式异常处理
   在web.xml中对异常进行声明，servet抛异常直接抛给web容器
   a、将异常抛给容器，错误的信息不再返回给用户
 try{
 
 }catch(Exception ex){
  throw new ServletException(ex);
  }
   b、在web.xml中添加配置
      <error-page>
 <exception-type>
    javax.servlet.ServletException
 </exception-type>
 <location>
  /500/500.htm
 </location>
      </error-page>
    什么时候用:产生的底层的servlet一些异常，不需要显示处理的时候（不包括异常主体）
状态管理 
1、为什么会出现状态管理 
http协议是无状态协议。 
特点：一次请求一次连接 
当浏览器多次访问服务器的时候，服务器都会重新建立连接，认为每一次的访问都是全新的。 
在必要的情况下，需要让服务器记录浏览器的访问状态。 
2、什么是状态管理 
将客户端与服务器之间的多次交互当做是一次完整的整体来看待，并且将多次交互过程中 
所涉及到的数据（状态）保存起来 
状态：交互数据 
管理：交互过程中对数据的增、删、改的操作 
3、状态管理的模式 
a、客户端管理技术：将状态保存在客户端上 
代表性技术：cookie 
b、服务器端管理技术：将状态保存在服务器上 
代表性技术：session 
状态管理 - Cookie 
Cookie ：能够保存在客户端上的一小段数据 
1、Cookie原理 
浏览器向服务器发送请求时，服务器会将少量的数据以set-cookie消息头（K:V）的方式响应 
给浏览器，浏览器将这些数据进行保存(内存、硬盘)，当浏览器再次访问服务器时，浏览器会将 
数据以Cookie消息头的方式发送给服务器 
2、如何创建Cookie 
Cookie类型:javax.servlet.http.Cookie 
创建Cookie: 
语法: 
Cookie cookie = new Cookie(String name,String value); 
将cookie添加客户端 
response.addCookie(cookie); 
默认情况下，保存进客户端内存 
3、如何查询获取Cookie 
Cookie[] cookies = request.getCookies(); 
//能够获取到与本路径以及域相关的所有cookie 
注意： 
如果当前路径和域名下没有cookie的话，那么 
cookies 为 null 
if(cookies != null){ 
for(Cookie c : cookie){ 
String name=c.getName(); //获取cookie名称 
String value=c.getValue();//获取Cookie值 
} 
} 
4、cookie存取中文 
cookie 只支持ascii码
通过 java.net包中的
    URLEncoder.encode(String str,String enc) 编码
    URLDecoder.decode(String value,String enc) 解码
将中文转换成 ASCII码: 
URLEncoder.encode("中文","utf-8") 
将ASCII码转换成中文: 
URLDecoder.decode(value,"utf-8"); 

//Cookie 存储中文 
String name="中文"; 
Cookie c = new Cookie("name",URLEncoder.encode(name,"utf-8")); 
//Cookie 获取中文 
Cookie c = cookies[0]; 
String name= URLDecoder.decode(c.getValue(),"utf-8"); 
5、修改cookie值 
步骤: 
a、获取客户端中所有的cookie 
b、找到要修改的cookie 
c、通过cookie.setValue(String value)进行cookie值的重置 
d、通过 response.addCookie 将新的cookie保存回客户端 
Cookie[] cookies=request.getCookies();
 if(cookies != null){
 for(Cookie c : cookies){
  String name= c.getName();//获取cookie名称 
  if(name.equals("username")){
   c.setValue("DaLianMao");
   response.addCookie(c);
  }
 }
 }
6、Cookie的生存时间 
默认情况下，cookie是保存在客户端的内存中的。 
如果想长时间保存，设置cookie的过期时间即可 
setMaxAge(int second) 
second > 0 :按照指定的时间对cookie进行保存，超出指定时间后，浏览器就会删除 
cookie，此时，cookie保存在硬盘上 
second = 0 :删除cookie,当设置setMaxAge(0)时，通过response.addCookie(cookie)
添加回客户端的时候，客户端就会删除当前cookie 
second < 0 :默认值，cookie保存在客户端的内存中 
7、Cookie路径 
浏览器在访问服务器的时候，会比较cookie 的保存路径与访问路径是否匹配，浏览器 
只能发送能匹配上的cookie 

Cookie保存路径默认与保存cookie的web组件 
路径是一致 
/web06/addCookie 
Cookie默认保存的路径为 /web06 

/web06/admin/login.do 
Cookie默认保存的路径为 /web06/admin 

发送cookie的条件 
cookie路径的匹配原则 
要访问的地址必须是Cookie的路径或者是其子路径的时候，浏览器才会发送cookie 

http://localhost:8080/web06/addCookie 
http://localhost:8080/web06/findCookie 

http://localhost:8080/web06/login/login.do 
http://localhost:8080/web06/login/findLoginCookie 
设置Cookie路径: 
cookie.setPath("/web06"); 

8、Cookie的限制 
a、cookie可以被用户禁止 
b、Cookie会将状态（数据）保存在客户端，不安全，对于敏感的数据（密码）保存， 
通过加密后再保存进cookie 
c、Cookie只能保存少量数据 大概 4K左右
d、Cookie的个数有限制 Google 200个 
e、Cookie只能保存字符串
状态管理-Session会话 
Session 
what：将客户状态保存在服务器端的一种技术 
原理：浏览器访问服务器，服务器会针对每一个浏览器分配一段空间（内存中），病且创建一个session对象，该对象有一个id属性（唯一）sessionId。服务器会将sessionId发给客户端（Cookie）。再次访问，客户端会将sessionId发送给服务器，服务器查找对应的session对象 

创建session 
a、HttpSession session = request.getSession(boolean flag); 
flag 为 true：无论如何都能的到session对象 
flag 为 false ：有sessionId，并且能匹配上session对象返回session，否则返回null 
b、HttpSession session = request.getSession(); 
HttpSession session = request.getSession(true); 
绑定以及获取数据 
setAttribute(String name,Object value) 
Object obj=getAttribute(String name) 
removeAttribute(String name); 
删除session对象 
session.invalidate(); 
超时 
默认超时：30分钟 （tomcat/conf/web.xml） 
设置超时方法： 
1、更改tomcat/conf/web.xml <session-config> 
2、更改本应用的web.xml 添加<session-config> 
3、编程式 sesssion.setMaxInactiveInterval(int second); //以秒为单位 
通过session机制所完成的应用： 
1、session验证 
保护web资源。 
应用场景：session保存登陆信息，访问受保护资源的时候，
       判断session中是否存在登陆信息，如果存在可以访问，否则不能返回登陆页面
步骤：
     1、使用session.setAttribute()方法绑定数据
     2、使用session.getAttribtue()方法获取已绑定的值，如果值不存在，进行登陆操作
2、验证码 
生成后将验证码保存进session 
客户端提交数据的时候判断输入的验证码与session中的验证码是否一致 
推荐：将验证码保存在cookie中，客户端不用提交就能判断
   a、创建servlet 生成验证码
   b、将验证码添加到 session 或者 cookie中
   c、客户端 可以刷新验证码(向验证码servlet再次发送请求)
   d、客户端提交数据给服务器，通过session验证 验证码是否正确，给出相应提示
3、URL重写
   如果 禁用了cookie ，那么session是否能用?
   答：不能
   解决:URL重写
   更改要提交的的URL，在后面加上sessionId  的值 
   a、重定向:
      response.encodeRedirectURL("url");
   b、表单提交、超链接
      response.encodeURL("url")
session优缺点 
优点： 
1、安全 
2、可以存放任意数据类型 
3、无大小限制 
缺点： 
1、占用服务器内存 
Cookie优缺点 
优点： 
1、存放在客户端，对服务器没有压力 
缺点： 
1、不安全 
2、只能存放字符串 
3、大小限制为4kb 
过滤器 
servlet2.3规范以后出现的一种小型的、可插拔的web组件。 
作用：用来拦截客户端请求以及服务器端响应的过程，目的是获取请求过程中所涉及到的数据。 

常用应用： 
1、通过过滤器修改编码 
2、通过过滤器做一些有关会话的数据保存（访问受保护资源的时候从cookie中读取数据保存进session） 

如何编写过滤器？
a、编写一个Java类，实现Filter接口 
Filter : javax.servlet包中
FilterChain : 过滤链
           作用：通过过滤链将请求转交给下一个过滤器或者servlet组件
 获取方式：由web容器自动传入
          FilterConfig:
           作用：获取初始化参数信息（初始化信息需要在web.xml中配置）
 获取方式：web容器自动传入
b、在doFilter方法中完成过滤操作 
init:
destroy:
doFilter(ServletRequest request,ServletResponse response,FilterChain chain) :
        实现过滤逻辑的
 chain.doFilter(request,response);
c、在web.xml中对过滤器进行注册
（多个过滤器 的过滤顺序：完全按照<filter-mapping>的顺序来决定）
<filter>
          <filter-name>
<filter-class> 
</filter>
<filter-mapping>
          <filter-name>
<url-pattern> <!-- 定义拦截请求路径 -->
</filter-mapping>
d、部署、运行 
监听器
Servlet定义的一个组件。用来监听web容器产生的事件，以及对该事件进行处理。 
web容器的事件： 

    1、生命周期相关的事件 
    容器创建 request、session、ServletContext时所产生的事件 
a、监听request的创建与销毁 
ServletRequestListener 
requestInitialized(ServletRequestEvent) : 监听request初始化的操作 
requestDestroyed(ServletRequestEvent) : 监听销毁request的操作 
b、监听session的创建与销毁 
HttpSessionListener 
sessionCreated : 监听创建session 
sessionDestroyed : 监听销毁session 
c、监听ServletContext 
ServletContextListener 
相当于监听web容器的启动与关闭 
contextInitialized 
contextDestroyed 
    2、属性绑定相关的事件 
          request,session,ServletContext 
setAttribute 
removeAttribute 

ServletRequest : 
ServletRequestAttributeListener: 
//监听 setAttribute 
attributeAdded(ServletRequestAttributeEvent) 
//监听 removeAttribute 
attributeRemoved(ServletRequestAttributeEvent) 
//监听已存在的绑定变量的 setAttribute 
attributeReplaced(ServletRequestAttributeEvent) 

Session: 
HttpSessionAttributeListener: 
使用监听器的步骤 
a、创建一个类，根据监听的事件实现不同的接口 
b、找到对应的方法给出对应的处理实现 
c、在web.xml中注册监听器 
应用 
统计当前网站的在线人数 
涉及:
ServletContext 用于保存人数 
Session 区分用户 
监听： 
a、ServletContext ：web容器启动，向servletContext中初始化访问人数 为0 
b、Session ：当创建session的时候，将servletContext中的人数+1， 
   当销毁session时，将servletContext人数-1 
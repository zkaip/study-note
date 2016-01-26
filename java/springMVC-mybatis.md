SpringMVC MyBatis
===
Spring： 
1、基础核心功能 
    IOC ：控制反转(Inversion of Control) 
               通过spring容器创建以及管理对象 
    AOP ：面向切面编程 
2、与其他的框架进行整合 

1、如何使用Spring容器 
    a、创建spring容器 
        1、引入spring的和新包以及依赖包 
        2、将applicationContext.xml拷贝到src目录下 

        xmlns ：xml name space xml命名空间 
        告诉我们当前的xml文件中允许使用哪些节点，并且引用前缀是什么 
    b、获取spring容器 
        BeanFactory 
        ApplicationContext 
            以上两个类型都是Spring 容器 
            对于企业级的web开发，推荐使用ApplicationContext 
语法:
1、ApplicationContext ctx=new ClassPathXmlApplicationContext("");
2、ApplicationContext ctx=new FileSystemXmlApplicationContext("");
2、通过容器创建Bean对象 
JavaBean : 所有的Java类的对象都称为JavaBean 
    1、通过构造器创建一个对象 
Java : Date date = new Date();
语法：
<bean id="" class=""></bean>
id:表示当前Javabean对象在容器中的唯一标识
class:当前JavaBean的类型
    2、通过静态工厂创建对象 
Java:Calendar c = Calendar.getInstance();
语法：
<bean id="" class="" factory-method="getInstance" />
    3、通过工厂对象提供的工厂方法创建对象 
Java:
Calendar c = Calendar.getInstance();
Date date = c.getTime();
语法:
<bean id="" class="" factory-bean="工厂对象" factory-method="工厂方法" />
factory-bean:用于指定工厂bean对象
factory-method:指定工厂中创建bean对象的方法
3、在Java程序中如何获取容器中的Bean对象 
ctx : ApplicationContext 
a、(数据类型)ctx.getBean("id");
          b、ctx.getBean("id",类型.class) 
4、bean 别名 
          <alias name="已存在bean名称" alias="别名"> 
5、Bean的作用域 
创建bean的模式 
    1、singleton (默认) 
单例
特点:只用容器启动，就会创建
    2、prototype 
原型
特点：用时创建
    3、request 
在web中有效
    4、session 
在web中有效，针对会话
    5、global session 
在web中有效，全局会话有效
如何设置:
<bean scope="" />
6、Bean的生命周期以及相关方法 
1、创建对象（构造器）
2、实例化（自定义一个init方法）
3、执行()
4、销毁（自定义一个destroy方法）
如何指定实例化以及销毁: 
<bean init-method="初始化方法名" destroy-method="销毁方法名" /> 
设置所有Bean的生命周期回调方法 
<beans default-init-method="" default-destroy-method=""> 
注意：是beans标签 不是 bean标 
7、延迟实例化(延迟加载) 
设置scope为singleton的bean对象在启动容器的时候不被创建，初次使用的时候，才创建 
语法 ： 
<bean lazy-init="true" /> 
设置当前容器中所有的Bean都为延迟实例化: 
<beans default-lazy-init="true" /> 
8、指定Bean对象的依赖关系 
<bean depends-on="bean对象,bean对象" /> 

9、依赖注入
依赖注入:Dependency Inject（DI） 
是IOC的一个具体表现 
通过spring容器管理bean与bean之间的关系 
DI实现方式: 
a、setter注入 
通过调用bean对象的setter方法完成的注入 
    1、bean对象中创建 属性
    2、为属性封装getter/setter方法
    3、applicationContext配置文件
     为bean添加
     <property name="属性名" value="注入的值" />
            a、基本值的注入 
<bean id="" class=""> 
<property name="name" value="value" /> 
</bean> 
==> 
public class Person{ 
private String name; 
public void setName(String name){ 
this.name=name; 
} 
<bean id="person" class="Person"> 
    <property name="name" value="张三丰" /> 
</bean> 
            b、注入bean对象
            1、注入外部bean 
<bean> 
<property name="属性名" ref="引用已存在的bean" /> 
</bean> 
            2、注入内部bean 
在property 里面添加bean标签的声明，声明好的bean只有在当前的property中有效，出来后失效（不够通用） 
<bean id="newEmpService" class="com.tarena.service.EmpService"> 
<!-- 注入内部bean --> 
<property name="empDao"> 
<bean class="com.tarena.dao.mysql.EmpDaoImpl"></bean> 
</property> 
</bean> 
  c、注入集合
 a、为bean的属性声明集合值
          <bean id="" class="">
   1、List
      <property name="someList">
  <list>
   <value></value>
   <value></value>
   <value></value>
  </list>
      </property>
   2、Set
      <property name="someSet">
   <set>
   <value></value>
   <value></value>
   <value></value>
   </set>
      </property>
   3、Map
      <property name="someMap">
  <map>
   <entry key="" value="" />
   <entry key="" value="" />
   <entry key="" value="" />
  </map>
      </property>
   4、Properties
      <property name="someProps">
  <props>
   <prop key="">value</prop>
  </props>
      </property>
       b、为bean的属性指定已存在的集合
          1、在spring容器中声明集合
      <util:list id="someList">
         <value></value>
      </util:list>
      <util:set id="someSet">
  <value></value>
      </util:set>
      <util:map id="someMap">
  <entry key="" value="" />
      </util:map>
      <util:properties id="someProps">
  <prop key="">value</prop>
      </util:properties>
      <bean id="" class="">
  <property id="myProps" ref="someProps" />
      </bean>
  d、注入表达式（引入propertis文件的值）
  1、将properties文件注入到spring容器中
          <util:properties id="db" location="classpath:com/tarena/dao/mysql/db.properties" />
  2、通过表达式获取 文件值
          #{db.driver}
          #{db.url}
  e、注入null和空字符串
   1、注入空字符串
          <bean>
      <property name="" value="" />
   </bean>
   2、注入null值
          <bean>
      <property name="">
         <null />
      </property>
   </bean>
b、构造器注入 
spring容器创建对象时自动调用bean的构造器完成注入 
<bean> 
子节点: 
<constructor-arg index="0" /> 
<constructor-arg index="1" ref="" /> 

<constructor-arg name="" value="" /> 
c、自动装配 
让容器根据指定的方式找到已存在的对象，进行注入(自动注入) 
<bean> 属性 :autowire 
值 ： 
    a、byType : 按照类型自动注入 
    b、byName : 按照属性名自动注入 
    c、no : 默认值，不进行自动装配 
    d、constructor : 按照构造器进行自动装配 
    e、autodetect : spring2.5以后取消 

============================================= 
基于注解的组件扫描 
目的：简化 xml文件的配置 
什么是基于注解的组件扫描:指定一个包路径，spring会自动扫描该包及其子包所有的组件类，当发现组件类上有特点的注解时，spring会自动将其纳入到容器中，相当于原来配置中<bean> 

a、指定扫描路径 
在 applicationContext.xml 中 
添加: 
<context:component-scan base-package="com.tarena" /> 
b、为bean添加指定注解 
          @Component  声明组件（通用）

@Repository
加载在 持久化层的注解
@Service
加载在 业务层的注解
@Controller
加载在 控制器层的注解

@Component :
扫描当前类到 spring容器中，
默认命名规则 ：类名称首字符小写
EmpDaoImpl : <bean id="empDaoImpl" class="" />
c、与作用域相关的注解 
@Scope ：表示组件的作用域
@Scope("prototype")
d、与生命周期回调相关的注解 
1、初始化
@PostConstruct 用于声明方法，标识该方法为初始化方法，创建完对象后自动调用
==> <bean init-method="" />
2、销毁
@PreDestory 用于声明方法，标识该方法为销毁方法，在销毁之前调用 ==> <bean destroy-method="" />
e、指定依赖关系的注解 
1、@Resource
通常放在 属性上以及setter方法上
默认按名称进行注入，然后按照类型进行注入
@Resource(name="myDs")
public void setDs(BasicDataSource ds){

}
2、@Autowired , @Qualifier
自动装配，默认按照类型进行注入
通过@Qualifier指定注入bean的名称
3、@Inject , @Named
f、注入表达式值 
<bean>
<property name="driver" value="#{db.driver}" />
1、将properties文件添加到spring中
<util:properties id="db" location="" />
2、通过注解 引用 properties文件的数据
@Value

//@Value("com.mysql.jdbc.Driver")
@Value("#{db.driver}");
public void setDriver(String driver){
this.driver=driver;
}

声明bean组件的注解:@Component 
依赖注入的注解:@Resource 
注入常量值:@Value 

============================================= 
1、MVC: 
M : Model 模型层 一般表示对业务处理
    a、业务数据
    b、业务逻辑处理
    组成元素: Entity、Service、Dao
V : View 视图层 封装显示界面，用于与用户进行交互
    组成元素: jsp, html
C : Controller 作为 M与V之间的桥梁，用于控制流程
    组成元素: Servlet

2、Spring MVC 
简化MVC开发流程，方便后期的维护与升级 

Spring MVC提供的核心组件 
a、DispatcherServlet(控制器，请求入口)
配置在web.xml中
    用于拦截用户的请求，将请求交给MVC的另外一组控制器去进行操作
b、HandlerMapping(控制器,资源分发)
         类:SimpleUrlHandlerMapping 
         属性:mappings
    用户请求与处理的Controller之间的映射
c、Controller(控制器，请求处理流程)
实现 Controller接口 ，并且完成约定方法的实现 (handlerRequest)
d、ModelAndView (模型层,封装业务数据以及视图名称)
封装 业务数据、视图名称
     ModelAndView mv = new ModelAndView("视图名称");
e、ViewResolver(视图层，视图解析器)
    默认以转发的方式定位到视图进行渲染，并且将制定的业务数据带给视图
     类:InternalResourceViewResolver

3、如何搭建Spring MVC 
a、导入相关jar包 spring-web spring-web-mvc ，以及spring jar包 ，applicationContext.xml 
b、配置 DispatcherServlet 
    包:org.springframework.web.servlet.DispatcherServlet 
    在web.xml中配置DispatcherServlet 
    配置时需要设置初始化的参数 
    contextConfigLocation : 指定spring配置文件在什么地方 
        设置 load-on-startup 
c、配置HandlerMapping 
通过HandlerMapping，DispatcherServlet可以将用户的请求映射到某一Controller上
类:SimpleUrlHandlerMapping
包:org.springframework.web.servlet.handler.SimpleUrlHandlerMapping
在该类中需要定义请求路径以及处理的Controller
属性:mappings 类型:Properties
d、配置若干 Controller 
    自定义类 ：实现自Controller接口 
e、在Controller中配置 ModelAndView 
f、配置 ViewResolver 
类:InternalResourceViewResolver
包:org.springframework.web.servlet.view.InternalResourceViewResolver
功能：
1、根据ModelAndView传递的视图名直接定位到某一视图
2、可以通过自身设置的前后缀组合定位到某一视图
属性:  prefix="/WEB-INF/"
suffix=".jsp"
        new ModelAndView("index")
        /WEB-INF/index.jsp

SpringMVC 通过注解简化xml文件的配置 

通过注解的方式： 
1、不用实现 Controller接口 
2、请求方法随意定义，只需要添加@RequestMapping注解即可 
3、方法返回值 可以是ModelAndView 也可以是 String 
4、方法参数根据需求灵活传递 

@Controller ：标识当前类是一个控制器(C),当前类中的方法都有可能称为处理用户请求的方法
@RequestMapping ：可以定义在类以及方法上 
a、类上 定义请求层次路径
http://localhost:8080/spring04/web/login.do
b、方法
定义请求资源名称
spring3.1以及之前 必须添加两个组件的声明 
    RequestMappingHandlerMapping 
    RequestMappingHandlerAdapter 
spring3.2可以省略以上两个组件的声明 
    <mvc:annotation-driven /> 

http://localhost:8080/spring04 

@Controller 接收参数值 
a、HttpServletRequest接收 
b、使用@RequestParam注解接收(对参数进行注入) 
关联页面中表单元素与处理方法中的参数 
<form> 
<input type="text" name="txtUser" /> 
</form> 
关联: 
public String execute(@RequestParam("txtUser")String name){ 

} 
c、使用自动机制封装成bean对象 
a、保证表单元素名称与controller处理方法的参数名称一致
b、通过 实体类 传递请求提交数据，元素名称对应bean属性名称 
            表单元素名称要与实体类的属性名相对应，controller参数以实体类的方式进行接收 

@Controller 向页面传值(转发绑定数据) 
1、request、session、ServletContext 
2、ModelAndView 
    通过Map集合完成传递数据 
    最终，也是将Map集合中的数据封装到了request.setAttribute 中 
    return new ModelAndView("name",map); 
3、ModelMap 
    自动将数据封装到request中 
    如何获得: 
            处理方法参数，传递进来的 
@RequestMapping("login.do")
public ModelAndView checkLogin(HttpServletRequest request , String name , String pwd , ModelMap model){

}
4、通过ModelAttribute注解完成数据传递 
public ModelAndView checkLogin(@ModelAttribute("n")String name){
return new ModelAndView("index.jsp");
}

============================================= 
session存储 
servletContext存储 
    在处理方法中接收一个HttpServletRequest参数 
    通过当前的参数获取 session以及ServletContext 
============================================= 
重定向视图:
1、字符串重定向 
    return "redirect:uri";
2、ModelAndView实现重定向 
    a、通过 RedirectView 封装重定向路径 
    b、通过ModelAndView 封装 RedirectView 
        RedirectView rv=new RedirectView("uri");
        ModelAndView mv=new ModelAndView(rv);
        return mv;

        ModelAndView mv=new ModelAndView("redirect:uri");

Spring 提供的过滤器: 处理中文乱码 
    前台页面 与 过滤器 编码要一致 
   a、get
      server.xml
   b、post
      通过spring提供的过滤器进行中文乱码的处理
      在web.xml中添加过滤器
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

Spring拦截器(Interceptor) : 处理登陆验证
Spring MVC中的 HandlerMapping 支持拦截器 
功能：拦截指定的请求和响应，并且能够获取里面的数据 
拦截器:
1、处理器之前做操作
2、处理器之后做操作
3、整个请求响应结束后做操作
如何实现: 
1、实现HandlerInterceptor接口 或者继承HandlerInterceporAdapter类
                HandlerIntercetpor 
1、preHandler()
    调用处理器之前执行的操作
2、postHandler()
    处理器执行后，视图执行前调用
3、afterCompletion
    整个请求响应处理完成后，调用的方法
2、在spring容器中配置 拦截器 
<mvc:interceptors>
<mvc:interceptor>
<mvc:mapping path="/login/**" />
<mvc:exclude-mapping="/login/index.do" />
<bean class="" />
</mvc:interceptor>
</mvc:interceptors>
    http://localhost:8080/spring04/login/page/index.do 
    登录成功与否：判断session 
Spring mvc 异常处理 
    a、SimpleMappingExceptionResolver 
映射 异常类型 以及响应处理页面
使用方法：在spring配置文件中进行配置
exceptionMappings : Properties 
      <bean id="" class="">
         <property name="exceptionMappings">
  <props>
   <prop key="异常类型">处理页面</prop>
  </props>
  </property>
      </bean>
      适用于没有处理过程的异常(如404页面)
    b、通过接口 HandlerExceptionResolver 
方法 resolverException
步骤
1、自定义类 实现 HandlerExceptionResolver接口
2、在spring配置中添加注册
      抛出异常后自动接收
 public ModelAndView resolverException(HttpServletRequest req,
HttpServletResponse resp , Object handler , Exception ex){
 //通过 ex 表示 异常对象
 if(ex instanceof 异常类型){
  //处理方式
 }
 return new ModelAndView("");
 }
      在spring容器中增加配置:
      <bean id="" class="" />
适用于有处理过程的异常
    c、在Controller中使用 @ExceptionHandler 
推荐步骤:
1、创建一个Controller，增加异常处理方法
该方法用@ExceptionHandler进行注解
@ExceptionHandler
public String execute(HttpServletRequest request, Exception ex) {}
2、其它的Controller 继承自 处理异常的Controller
适用于有处理过程的异常
Spring 文件上传 
组件:CommonsMultipartResolver 
支持:Commons File-upload组件 
    COS FileUpload 组件 

1、导入与commons-fileupload相关的jar包 
2、设置html(jsp)页面 
    form中的 
    method=post 
    enctype="multipart/form-data" 
3、添加spring配置 
    CommonsMultipartResolver 
    id 必须为 multipartResolver 
    org.springframework.web.multipart.commons.CommonsMultipartResolver 
4、自定义Controller方法，将获取的文件保存 
    public ModelAndView execute(@RequestParam("file")MultipartFile file){
         //设置保存路径
         //保存文件
   File saveFile = new File(path,name);
          file.transferTo(saveFile);
      }
SpringMVC访问静态资源的三种方式
方案一：激活Tomcat的defaultServlet来处理静态文件
<servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpg</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.js</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.css</url-pattern>
</servlet-mapping>
要配置多个，每种文件配置一个
要写在DispatcherServlet的前面， 让defaultServlet先拦截，这个就不会进入Spring了，我想性能是最好的吧。
Tomcat, Jetty, JBoss, and GlassFish 默认 Servlet的名字 -- "default"
Google App Engine 默认 Servlet的名字 -- "_ah_default"
Resin 默认 Servlet的名字 -- "resin-file"
WebLogic 默认 Servlet的名字 -- "FileServlet"
WebSphere 默认 Servlet的名字 -- "SimpleFileServlet"
方案二： 在spring3.0.4以后版本提供了mvc:resources (推荐)
<mvc:resources 的使用方法： 
<!--对静态资源文件的访问--> 
<mvc:resources mapping="/images/**" location="/images/" />
  /images /**映射到 ResourceHttpRequestHandler 进行处理，location指定静态资源的位置.可以是web application根目录下、jar包里面，这样可以把静态资源压缩到jar包中。cache-period可以使得静态资源进行web cache
如果出现下面的错误，可能是没有配置 <mvc:annotation-driven /> 的原因。
报错WARNING: No mapping found for HTTP request with URI [/mvc/user/findUser/lisi/770] in DispatcherServlet with name 'springMVC'
使用 <mvc:resources/> 元素,把 mapping 的 URI 注册到 SimpleUrlHandlerMapping的urlMap 中,
key 为 mapping 的 URI pattern值,而 value为 ResourceHttpRequestHandler,
这样就巧妙的把对静态资源的访问由 HandlerMapping 转到 ResourceHttpRequestHandler 处理并返回,所以就支持 classpath 目录, jar 包内静态资源的访问.
另外需要注意的一点是,不要对 SimpleUrlHandlerMapping 设置 defaultHandler. 因为对 static uri 的 defaultHandler 就是ResourceHttpRequestHandler,
否则无法处理static resources request.
方案三 ，使用<mvc:default-servlet-handler/>
<mvc:default-servlet-handler/> 
会把 "/**" url,注册到 SimpleUrlHandlerMapping 的 urlMap 中,把对静态资源的访问由 HandlerMapping 转到 org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler 处理并返回.
DefaultServletHttpRequestHandler 使用就是各个 Servlet 容器自己的默认 Servlet.
补充说明：多个HandlerMapping的执行顺序问题： 
DefaultAnnotationHandlerMapping 的 order 属性值是：0 
<mvc:resources/ >自动注册的 SimpleUrlHandlerMapping 的 order 属性值是： 2147483646 
<mvc:default-servlet-handler/>自动注册的 SimpleUrlHandlerMapping 的 order 属性值是：2147483647 
spring 会先执行 order 值比较小的。当访问一个 a.jpg 图片文件时，先通过 DefaultAnnotationHandlerMapping 来找处理器，一定是找不到的，我们没有叫 a.jpg 的 Action。再按 order 值升序找，由于最后一个 SimpleUrlHandlerMapping 是匹配 "/**" 的，所以一定会匹配上，再响应图片。 
Spring 对JDBC的支持 
    1、Spring对dao异常进行了统一的封装 
以DataAccessException为父类的异常类
该类以RuntimeException 为父类的
    2、Spring对DAO封装了一组抽象类 
以统一的一种方式来实现各种不同的数据库访问技术 jdbc、Hibernate
JdbcTemplate : 封装了对jdbc的基础操作
update() : 增删改
queryForInt()
queryForObject()
query()
HibernateTemplate : 封装了对Hibernate的基础操作
JdbcDaoSupport : 封装JDBC数据访问的基类
HibernateDaoSupport : 封装Hibernate数据访问的基类
    3、简化了jdbc操作 
            以上方法执行时提供 ：
                 1、sql语句
                 2、参数 ， 封装成Object数组
                 3、查询时，还需提供 ResultSet 到实体记录的映射处理类 实现 RowMapper<T>接口
 public T mapRow(ResultSet rs,int index){
  T t = new T();
  t.setXXX(rs.getXXX())
  return t;
 }
如何编写Dao组件: 
 1、继承JdbcDaoSupport方式实现jdbc操作 
a、在spring中添加一个数据源 BasicDataSource
b、编写一个类继承自JdbcDaoSupport
将已添加的数据源注入给 dataSource
c、通过getJdbcTemplate 方法获取JdbcTemplate对象,进行增删改查的操作

查询 ：通过 配置 将ResultSet映射到实体类上
接口：RowMapper
2、编写一个类不继承JdbcDaoSupport，添加JdbcTemplate属性

MyBatis 
优秀的持久层框架
步骤: 
1 、加载 mybatis包和sql驱动
2、添加 主配置文件 到 src下
3、修改主配置文件参数
4、通过api获取 SqlSession

执行CRUD操作步骤: 
1、创建POJO
2、编写SqlMap.xml
   a、根据标签id 定义方法名称
   b、根据parameterType 定义参数
   c、根据resultType或者resultMap 定义返回值
3、到主配置文件中添加SqlMap.xml映射
   a、spring容器中 注册 SqlSessionTemplate
   b、dao中 通过注入 为 sqlSessionTemplate赋值
4、执行

MyBatis API
      SqlSessionFactoryBuilder
      SqlSessionFactory
      SqlSession : CRUD
主配置文件:  数据源信息等 
映射文件:  封装了增、删、改、查所有的操作 
   <insert id="" parameterType="">   执行的sql语句 </insert> 
   <delete>
   <update>
   <select id="" parameterType="" resultType=""> 
           <resultMap id="" type=""> 
              <result property="实体属性" column="列名" jdbcType="jdbc数据类型" javaType="" />
           </resultMap>
    </select>
 执行操作:
    SqlSession :
        insert(String id);
        insert(String id,Object param)
        update(String id);
        update(String id,Object param);
        delete(String id);
        delete(String id,Object param);
        selectOne(String id,Object param) : 查询单条
        selectList(String id,Object param) :查询多条

通过<resultMap> 解决 实体与表中名称不匹配的问题 
<resultMap id="" type=""> 
    <result property="实体属性" column="列名" jdbcType="" javaType="" /> 
</resultMap> 
<resultMap id="empMap" type="com.entity.Emp"> 
    <result property="emp_name" column="name" jdbcType="VARCHAR" javaType="String" /> 
</resultMap> 
<select id="" parameterType="" resultMap="empMap" > 
</select>
================================================== 
回顾: 
MyBatis: 
优秀的持久层框架 

MyBatis API 
SqlSessionFactoryBuilder 
SqlSessionFactory 
SqlSession : CRUD 

主配置文件: 
数据源信息等 
映射文件: 
封装了增、删、改、查所有的操作 
<insert id="" parameterType=""> 
执行的sql语句 
</insert> 
<delete> 
<update> 
<select id="" parameterType="" resultType=""> 
<resultMap id="" type="">
<result property="实体属性" column="列名" jdbcType="jdbc数据类型" javaType="" />
</resultMap> 
</select>

执行操作: 
SqlSession : 
insert(String id);
insert(String id,Object param)
update(String id);
update(String id,Object param);
delete(String id);
delete(String id,Object param);
selectOne(String id,Object param) : 查询单条
selectList(String id,Object param) :查询多条
================================================= 
SpringMVC + MyBatis 配置
1、引入jar包 
spring ioc 
spring aop 
spring web mvc 
spring jdbc 
commons dbcp 
mybatis 
spring-mybatis 
2、配置文件 
servlet ：web.xml 
spring ：applicationContext.xml 
mybaits ：map.xml 
    a、配置前端控制器(DispatcherServlet)、Spring过滤器
i、<serlvet>
<servlet-class>
org.springframework.web.servlet.DispatcherServlet
</servlet>
ii、<filter>
<filte-class>
org.springframework.web.filter.CharacterEncodingFilter
</filter>
    b、spring配置文件
1、添加自动扫描、mvc
<context:component-scan />
<mvc:annotation-driven />
2、视图解析器 viewResolver
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternarlResourceViewResolver">
<property name="prefix" />
<property name="suffix" />
</bean>
3、数据源(Properties)
<util:properties location="" id="" />
<bean id="dataSource" class="org.apche.commons.dbcp.BasicDataSource">
#{}
</bean>
4、与mybatis整合的bean
a、SqlSessionFactoryBean
<bean id="sqlSessioFactory" class="org.mybatis.spring.SqlSessionFactoryBean" >
<property name="dataSource" />
<property name="mapperLocations" value="classpath:com/tarena/entity/*.xml" />
</bean>
b、MapperScannerConfigurer
<bean id="" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
<property name="sqlSessionFactory" ref=""/>
<property name="basePackage" value="" />
</bean>
c、map.xml
注意：namespace 与 Mapper 路径对应
3、编写类和接口 
    a、com.tarena.entity 
        实体类 
        xml文件 
    b、com.tarena.mapper(原来的dao) 
        Mapper接口 
    c、com.tarena.service
        各个服务  
    d、com.tarena.controller 
        各控制器 

MVC对于Web Form的特点： 
（1）易于单元测试 
（2）容易实施测试驱动开发 
（3）易于扩展和替换 
（4）支持Web Form中的有关特性 
（5）URL被映射到控制器 

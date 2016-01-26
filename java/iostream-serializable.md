io流 及 对象序列化
===
I/O流
一． I/O 流(java 如何实现与外界数据的交流)
    1． Input/Output：指跨越出了JVM 的边界，与外界数据的源头或者目标数据源进行数据交换。
        注意：输入/输出是针对JVM 而言。
    2． 流的分类：
        按流向分为输入流和输出流；
        按传输单位分为字节流和字符流；
        按功能还可以分为节点流和过滤流。(以Stream结尾的类都是字节流。)
            节点流：负责数据源和程序之间建立连接；(相当于电线中的铜线，过滤流相当于电线的塑料皮)
            过滤流：用于给节点增加功能。(相当于功能零部件)
        过滤流的构造方式是以其他流位参数构造，没有空参构造方法(这样的设计模式称为装饰模式)。
        注：I/O流使用完后建议调用close()方法关闭流并释放资源。
           在关闭流时只需关闭最外层的流，会自动关闭内层的流。
    3． File 类(java.io.*)可表示一个文件，也有可能是一个目录
        在JAVA 中文件和目录都属于这个类中，而且区分不是非常的明显。
    4． Java.io 下的方法是对磁盘上的文件进行磁盘操作，但是无法读取文件的内容。
    注意：创建一个文件对象和创建一个文件在JAVA 中是两个不同的概念。前者是在虚拟机中创建了一个文件，但却并没有将它真 正地创建到OS 的文件系统中，随着虚拟机的关闭，这个创建的对象也就消失了。而创建一个文件是指在系统中真正地建立一个文件。
        例如：File f=new File(“11.txt”);//创建一个名为11.txt 的文件对象
             f.CreateNewFile(); //这才真正地创建文件
             f.CreateMkdir();//创建目录
             f.delete();//删除文件
             getAbsolutePath();//打印文件绝对路径
             getPath();//打印文件相对路径
             f.deleteOnExit();//在进程退出的时候删除文件，这样的操作通常用在临时文件的删除。 
    5． 对于跨平台：File f2=new file("d:\\abc\\789\\1.txt")
        //这文件路径是windows的，"\"有转义功能，所以要两个
        这个命令不具备跨平台性，因为不同的OS的文件系统很不相同。
        如果想要跨平台，在file 类下有separtor()，返回锁出平台的文件分隔符。
        File.fdir=new File(File.separator);
        String str=”abc”+File.separator+”789”;
    6． List()：显示文件的名(相对路径)
        ListFiles()：返回Files 类型数组，可以用getName()来访问到文件名。
        使用isDirectory()和isFile()来判断究竟是文件还是目录。
        使用I/O流访问file中的内容。
        JVM与外界通过数据通道进行数据交换。

二． 字节流
    1． 字节输入流：io包中的InputStream为所有字节输入流的父类。
        Int read();//读入一个字节(每次一个)；
        可先使用new byte[]=数组，调用read(byte[] b)
        read (byte[])返回值可以表示有效数；read (byte[])返回值为-1 表示结束。
    2． 字节输出流：io包中的OutputStream为所有字节输入流的父类。
        Write和输入流中的read相对应。
    3． 在流中close()方法由程序员控制。因为输入输出流已经超越了JVM的边界，所以有时可能无法回收资源。
        原则：凡是跨出虚拟机边界的资源都要求程序员自己关闭，不要指望垃圾回收。
    4． 以Stream结尾的类都是字节流。
        FileOutputStream f = new FileOutputStream("1.txt");//如果之前有这文件，将会覆盖 
        FileOutputStream f = new FileOutputStream("1.txt",true);//如果有这文件，只会追加
        DataOutputStream,DataInputStream:可以对八种基本类型加上String类型进行写入。
        因为每种数据类型的不同，所以可能会输出错误。
        所有对于：DataOutputStream DataInputStream两者的输入顺序必须一致。
    /**输入、输出流；字节流**************************/
    public static void main(String[]args) throws IOException{
      FileOutputStream fos=null;//输出流，字节流
        fos = new FileOutputStream("a.txt");//会抛异常；如果不用绝对路径，将生成所在类的路径中
        for(int i = 32; i<=126 ;i++) fos.write(i);//直接写进
        // String s = "ABCDE";byte[] ss = s.getBytes();fos.write(ss,0,4);//直观地写进
        fos.close();
      FileInputStream fis = new FileInputStream("a.txt");//输入流
      //for(int i=0;(i=fis.read())!=-1;) System.out.print((char) i);
      //上句是直接读取；fis.read()类似next().
      byte[] b= new byte[1024];//在内存划分空间以便装载从文件读来的数据
      fis.read(b);fis.close();
      for(int i=0;i<b.length;i++) System.out.print((char)b[i]);
    }//打印出键盘上的所有数字、大小写字母和标准符号
    /********************************************/

过滤流：(装饰模式，油漆工模式，修饰字节流)
        bufferedOutputStream
        bufferedInputStream
        在JVM的内部建立一个缓冲区，数据先写入缓冲区，直到缓冲区写满再一次性写出，效率提高很多。
        使用带缓冲区的输入输出流(节点流)会大幅提高速度，缓冲区越大，效率越高。(典型的牺牲空间换时间)
    切记：使用带缓冲区的流，如果数据数据输入完毕，使用flush方法将缓冲区中的内容一次性写入到外部数据源。
        用close()也可以达到相同的效果，因为每次close前都会使用flush。一定要注意关闭外部的过滤流。

管道流(非重点)：也是一种节点流，用于给两个线程交换数据。
        PipedOutputStream
        PipedInputStream
输出流： connect(输入流)
        RondomAccessFile 类允许随机访问文件同时拥有读和写的功能。
        GetFilepoint()可以知道文件中的指针位置，使用seek()定位。
        Mode(“r”:随机读；”w”：随机写；”rw”：随机读写)
字符流： reader\write 只能输纯文本文件。
        FileReader 类：字符文件的输出

三、字节流的字符编码：
        字符编码把字符转换成数字存储到计算机中，按ASCii 将字母映射为整数。
        把数字从计算机转换成相应的字符的过程称为解码。
        乱码的根源是编码方式不统一。任何一种编码方式中都会向上兼容ASCII码。所以英文没有乱码。
编码方式的分类：
        ASCII(数字、英文):1个字符占一个字节(所有的编码集都兼容ASCII)
        ISO8859-1(欧洲，拉丁语派)：1个字符占一个字节
        GB-2312/GBK：1 个字符占两个字节。GB代表国家标准。
        GBK是在GB－2312上增加的一类新的编码方式，也是现在最常用的汉字编码方式。
        Unicode: 1 个字符占两个字节(网络传输速度慢)
        UTF-8：变长字节，对于英文一个字节，对于汉字两个或三个字节。
    原则：保证编解码方式的统一，才能不至于出现错误。
    I/O学习种常犯的两个错误：1．忘了flush 2．没有加换行。

四、字符流
        以reader或write结尾的流为字符流。 Reader和Write是所有字符流的父类。
        Io 包的InputStreamReader 称为从字节流到字符流的桥转换类。这个类可以设定字符解码方式。
        OutputStreamred:字符到字节
        Bufferread 有readline()使得字符输入更加方便。
        在I/O 流中，所有输入方法都是阻塞方法。
        最常用的读入流是BufferedReader.没有PrintReader。
        Bufferwrite 给输出字符加缓冲，因为它的方法很少，所以使用父类PrintWriter，它可以使用字节流对象构造，省了桥转换这一步，而且方法很多。注：他是带缓冲的。最常用的输出流。

对象的持久化：把对象保存文件，数据库
对象的序列化：把对象放到流中进行传输
    对象的持久化经常需要通过序列化来实现。

四大主流：InputStream,OutputStream,Read,Write

 一．对象序列化
    1．定义：把一个对象通过I/O流写到文件(持久性介质)上的过程叫做对象的序列化。
    2．序列化接口：Serializable
        此接口没有任何的方法，这样的接口称为标记接口。
    3．不是所有对象都能序列化的，只有实现了Serializable的类，他的实例对象才是可序列化的。
    4．Java种定义了一套序列化规范，对象的编码和解码方式都是已经定义好的。
    5．class ObjectOutputStream和ObjectInputStream也是带缓冲的过滤流，使节点流直接获得输出对象
        可以用来向文件中写入八种基本数据类型和对象类型。
    最有用的方法：
    (1)writeObject(Object b)
    (2)readObject()返回读到的一个对象，但是需要我们注意的是,该方法不会以返回null表示读到文件末尾。
        而是当读到文件末尾时会抛出一个IOException；
    6．序列化一个对象并不一定会序列化该对象的父类对象
    7．瞬间属性(临时属性)不参与序列化过程。
    8．所有属性必须都是可序列化的，特别是当有些属性本身也是对象的时候，要尤其注意这一点。
       序列化的集合就要求集合中的每一个元素都是可序列化的。
    9．用两次序列化把两个对象写到文件中(以追加的方式)，与用一次序列化把两个对象写进文件的大小是不同的。
       因为每次追加时都会在文件中加入开始标记和结束标记。所以对象的序列化不能以追加的方式写到文件中。

二、transient关键字
    1．用transient修饰的属性为临时属性。

三．分析字符串工具java.util. StringTokenizer;
    1.string tokenizer 类允许应用程序将字符串分解为标记
    2.可以在创建时指定，也可以根据每个标记来指定分隔符(分隔标记的字符)集合。
    3.StringTokenizer(s,”:”) 用“：”隔开字符，s 为String对象。
/*********************************************************/
import java.util.StringTokenizer;
public class TestStringTokenizer {
    public static void main(String[] args) {
        String s = "Hello:Tarena:Chenzq";
        StringTokenizer st = new StringTokenizer(s,":");
        while(st.hasMoreTokens()){
            String str = st.nextToken();
            System.out.println(str);
}}}
/********************************************************/
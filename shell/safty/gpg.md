[GPG](http://www.ruanyifeng.com/blog/2013/07/gpg.html)

###什么是GPG

GPG有许多用途，本文主要介绍文件加密。
至于邮件的加密，不同的邮件客户端有不同的设置，请参考Ubuntu网站的介绍。

###安装
GPG有两种安装方式。可以下载源码，自己编译安装。

    ./configure
    make
    make install

也可以安装编译好的二进制包。

    # Debian / Ubuntu 环境
    sudo apt-get install gnupg
    # Fedora 环境
    yum install gnupg
    # MacOS
    brew install gnupg

安装完成后，键入下面的命令：
`gpg --help`

###生成密钥
安装成功后，使用gen-ken参数生成自己的密钥。

    gpg --gen-key
    
生成密钥

    gpg: 密钥 EDDD6D76

被标记为绝对信任

请注意上面的字符串"EDDD6D76"，这是"用户ID"的Hash字符串，可以用来替代"用户ID"。

这时，最好再生成一张"撤销证书"，以备以后密钥作废时，可以请求外部的公钥服务器撤销你的公钥。

    gpg --gen-revoke [用户ID]
上面的"用户ID"部分，可以填入你的邮件地址或者Hash字符串（以下同）。

###密钥管理
####列出密钥
    gpg --list-keys
显示结果如下：
```
/home/ruanyf/.gnupg/pubring.gpg
-------------------------------
pub 4096R/EDDD6D76 2013-07-11
uid Ruan YiFeng <yifeng.ruan@gmail.com>
sub 4096R/3FA69BE4 2013-07-11
　　```
- 第一行显示公钥文件名（pubring.gpg）
- 第二行显示公钥特征（4096位，Hash字符串和生成时间）
- 第三行显示"用户ID"，第四行显示私钥特征。

####删除某个密钥
    gpg --delete-key [用户ID]
####输出密钥
公钥文件（.gnupg/pubring.gpg）以二进制形式储存，armor参数可以将其转换为ASCII码显示。

    gpg --armor --output public-key.txt --export [用户ID]
"用户ID"指定哪个用户的公钥，output参数指定输出文件名（public-key.txt）。
类似地，export-secret-keys参数可以转换私钥。

    gpg --armor --output private-key.txt --export-secret-keys

####上传公钥
公钥服务器是网络上专门储存用户公钥的服务器。send-keys参数可以将公钥上传到服务器。
    gpg --send-keys [用户ID] --keyserver hkp://subkeys.pgp.net
使用上面的命令，你的公钥就被传到了服务器subkeys.pgp.net，然后通过交换机制，所有的公钥服务器最终都会包含你的公钥。

由于公钥服务器没有检查机制，任何人都可以用你的名义上传公钥，所以没有办法保证服务器上的公钥的可靠性。通常，你可以在网站上公布一个公钥指纹，让其他人核对下载到的公钥是否为真。fingerprint参数生成公钥指纹。

    gpg --fingerprint [用户ID]

####输入密钥
除了生成自己的密钥，还需要将他人的公钥或者你的其他密钥输入系统。这时可以使用import参数。

    gpg --import [密钥文件]

为了获得他人的公钥，可以让对方直接发给你，或者到公钥服务器上寻找。

    gpg --keyserver hkp://subkeys.pgp.net --search-keys [用户ID]

正如前面提到的，我们无法保证服务器上的公钥是否可靠，下载后还需要用其他机制验证．

###加密和解密
####加密
encrypt参数用于加密。

    gpg --recipient [用户ID] --output demo.en.txt --encrypt demo.txt

recipient参数指定接收者的公钥，output参数指定加密后的文件名，encrypt参数指定源文件。运行上面的命令后，demo.en.txt就是已加密的文件，可以把它发给对方。

####解密
对方收到加密文件以后，就用自己的私钥解密。

    gpg --decrypt demo.en.txt --output demo.de.txt
decrypt参数指定需要解密的文件，output参数指定解密后生成的文件。运行上面的命令，demo.de.txt就是解密后的文件。

GPG允许省略decrypt参数。

    gpg demo.en.txt
运行上面的命令以后，解密后的文件内容直接显示在标准输出。
###签名
####对文件签名
有时，我们不需要加密文件，只需要对文件签名，表示这个文件确实是我本人发出的。sign参数用来签名。

    gpg --sign demo.txt
运行上面的命令后，当前目录下生成demo.txt.gpg文件，这就是签名后的文件。这个文件默认采用二进制储存，如果想生成ASCII码的签名文件，可以使用clearsign参数。

    gpg --clearsign demo.txt
运行上面的命令后 ，当前目录下生成demo.txt.asc文件，后缀名asc表示该文件是ASCII码形式的。

如果想生成单独的签名文件，与文件内容分开存放，可以使用detach-sign参数。

    gpg --detach-sign demo.txt
运行上面的命令后，当前目录下生成一个单独的签名文件demo.txt.sig。该文件是二进制形式的，如果想采用ASCII码形式，要加上armor参数。

    gpg --armor --detach-sign demo.txt
####签名+加密
上一节的参数，都是只签名不加密。如果想同时签名和加密，可以使用下面的命令。

    gpg --local-user [发信者ID] --recipient [接收者ID] --armor --sign --encrypt demo.txt
local-user参数指定用发信者的私钥签名，recipient参数指定用接收者的公钥加密，armor参数表示采用ASCII码形式显示，sign参数表示需要签名，encrypt参数表示指定源文件。

####验证签名
我们收到别人签名后的文件，需要用对方的公钥验证签名是否为真。verify参数用来验证。

    gpg --verify demo.txt.asc demo.txt
举例来说，openvpn网站就提供每一个下载包的gpg签名文件。你可以根据它的说明，验证这些下载包是否为真。
### 检测是否安装openssl程序
> openssl version -a
```bash
OpenSSL 0.9.8e 23 Feb 2007
built on: Sat Sep 15 20:34:58 EDT 2007
platform: MSys
options:  bn(64,32) md2(int) rc4(idx,int) des(ptr,risc1,16,long) blowfish(idx)
compiler: gcc -D_WINDLL -DOPENSSL_PIC -DOPENSSL_THREADS  -DDSO_DLFCN -DHAVE_DLFCN_H -DTERMIOS -DL_ENDIAN -D__CYGWIN__ -f
omit-frame-pointer -fnative-struct -O3 -mcpu=pentium -march=i486 -Wall -DOPENSSL_BN_ASM_PART_WORDS -DOPENSSL_IA32_SSE2 -
DSHA1_ASM -DMD5_ASM -DRMD160_ASM -DAES_ASM
OPENSSLDIR: "/usr/ssl"
```

###生成证书文件
####生成私钥key文件
> openssl genrsa -out privatekey.pem 1024
```bash
Generating RSA private key, 1024 bit long modulus
...........................++++++
........++++++
e is 65537 (0x10001)
```

####通过私钥生成CSR证书签名
> openssl req -new -key privatekey.pem -out certrequest.csr
```bash
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CN
State or Province Name (full name) [Some-State]:Beijing
Locality Name (eg, city) []:Beijing
Organization Name (eg, company) [Internet Widgits Pty Ltd]:keke.com
Organizational Unit Name (eg, section) []:keke.com
Common Name (eg, YOUR name) []:Jack Zhu
Email Address []:zkaip1@gmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

#### 通过私钥和证书签名生成证书文件
> openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

#### 新生成了3个文件：`certificate.pem`, `certrequest.csr`, `privatekey.pem`

### ssl使用该证书
```js
var https = require('https')
    ,fs = require("fs");

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});
```
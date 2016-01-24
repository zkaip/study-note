Nodemailer 高级功能
===
### CC BCC
- TO: 是收件人
- CC: 是抄送，用于通知相关的人，收件人可以看到都邮件都抄送给谁了。一般回报工作或跨部门沟通时，都会CC给收件人的领导一份
- BCC:是密送，也是用于通知相关的人，但是收件人是看不到邮件被密送给谁了。
 
```js
var mailOptions = {
    from: 'from@163.com>', // sender address
    to: 'to@163.com', // list of receivers
    cc: 'cc@163.com',
    bcc: 'bcc@126.com',
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};
```

### Attachment
```js
var mailOptions = {
    from: 'bsspirit ',
    to: 'xxxxx@163.com',
    subject: 'Hello ✔',
    text: 'Hello world ✔',
    html: '<b>Hello world ✔</b>' // html body
    attachments: [
        {
            filename: 'text0.txt',
            content: 'hello world!'
        },
        {
            filename: 'text1.txt',
            path: './attach/text1.txt'
        }
    ]
};
```

### HTML content with image
```js
var mailOptions = {
    from: 'bsspirit ',
    to: 'xxxxx@163.com',
    subject: 'Embedded Image',
    html: '<b>Hello world ✔</b><br/>Embedded image: <img src="cid:00000001"/>',
    attachments: [{
        filename: '01.png',
        path: './img/r-book1.png',
        cid: '00000001'
    }]
}
```

### use SSL
```js
// Gmail
var stransporter = nodemailer.createTransport({
    service: 'Gmail',
    secureConnection: true, // use SSL
    port: 465, // port
    auth: {
        user: 'bsspirit@gmail.com',
        pass: 'xxxxxxxxx'
    }
});

function ssl(){
    var mailOptions = {
        from: 'bsspirit ',
        to: 'xxxx@163.com',
        subject: 'SSL Email',
        html: 'Hello world'
    }
    return mailOptions;
}

stransporter.sendMail(ssl(), function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
```
### 安装RVM
```bash
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable
// 修改 RVM 的 Ruby 安装源到国内的 [淘宝镜像服务器](http://ruby.taobao.org/)，这样能提高安装速度
sed -i -e 's/ftp\.ruby-lang\.org\/pub\/ruby/ruby\.taobao\.org\/mirrors\/ruby/g' ~/.rvm/config/db
```

### 安装Ruby
```bash
rvm list known
rvm install 2.2.0
rvm use 2.2.0
rvm use 2.2.0 --default 
rvm list
```

### 安装bundle
>gem install bundler

### 安装 Rails
>gem install rails

---

### 参考
- [如何快速正确的安装 Ruby, Rails 运行环境](https://ruby-china.org/wiki/install_ruby_guide)
- [RVM实用指南](https://ruby-china.org/wiki/rvm-guide)
- [Ruby Version Manager (RVM)](https://rvm.io/)

---
title: Upgrading PHP to PHP7.0 in a CentOS server with Vesta CP
tags: [php,devops,vesta]
date: December 6 2015
featuredImage: https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?q=80&w=3798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

Latest VestaCP comes with PHP5.6 by default. In this article, we will see how to upgrade PHP to it’s latest version, i.e PHP7.0

First, we need to add the correct REMI repository and enable remi update, remi release and remi-php70 repository. Here’s how

```shell
wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
wget http://rpms.remirepo.net/enterprise/remi-release-7.rpm
rpm -Uvh remi-release-7.rpm epel-release-latest-7.noarch.rpm
yum --enablerepo=remi update remi-release
yum --enablerepo=remi-php70
```

Now stop apache2 and remove the existing php package that comes with VestaCP

```shell
service httpd stop
yum -y remove php
```

Now install PHP 7.0

```shell
yum install php70-php
yum install php70-php-pear php70-php-bcmath php70-php-pecl-jsond-devel php70-php-mysqlnd php70-php-gd php70-php-common php70-php-fpm php70-php-intl php70-php-cli php70-php php70-php-xml php70-php-opcache php70-php-pecl-apcu php70-php-pecl-jsond php70-php-pdo php70-php-gmp php70-php-process php70-php-pecl-imagick php70-php-devel php70-php-mbstring
```

After this step, all you need to do is stop the old php-fpm service and start the new one

```shell
service php-fpm stop
service php70-php-fpm start
```

At some point, you may also want to create a global alias ‘php’ to run php70 cli, like this

```shell
ln -s /usr/bin/php70 /usr/bin/php
```

And you’re done 🙂
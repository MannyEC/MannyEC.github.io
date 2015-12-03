---
layout:     post
title:      "Django Step1: 项目创建+连接MySQL+建表"
subtitle:   
date:       2015-12-03 
author:     "eckid"
header-img: "img/post-bg-2015.jpg"
tags:
    - Django
---

# Django Step1: 项目创建+连接MySQL+建表

### 1. 生成Django项目
Django提供了一个叫django-admin-script.py的命令来创建项目（project）的目录结构。

##### **该文件默认位于** 

**Win**：  python目录\script\django-admin-script.py 

**Unix**:  /usr/bin/django-admin-script.py

我们需要将此文件放入项目所在目录下，从命令行执行：

`python django-script-admin.py startproject xxx`（xxx为项目名称，假设它为mysite.）


##### 此时mysite目录下会生成四个文件

- __init__.py	
	
	将项目目录变成一个Python的包

- manage.py

	同项目一起工作的工具

- setting.py

	项目的默认设置

- urls.py

	将URL模式映射到你应用程序生的配置文件

##### 启动服务
此时虽然没有正式构建应用，但是可以启动Django内置服务器，进行测试。

`python manage.pyrunserver` 或者指定端口 `python manage.pyrunserver 8000`

成功启动之后，可在[http://localhost:8000](http://localhost:8000)看到默认的欢迎页面。


### 2.连接MySQL数据库
目前项目默认连接的是内置的sqlite数据库，如果要更改为MySQL，需要修改settings.py中的配置。
根据实际的数据库设置修改DATABASES的内容      

	DATABASES = {
    	'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'eckid',
        'USER':'root',
        'PASSWORD':'123456',
        'HOST':'localhost',
        'PORT':'3306',
    	}
	}


设置完成后 `python manage.pyrunserver` 重启服务器

### 3.创建APP应用
有了项目之后，可以在他下面创建应用。再次使用manage.py，生成一个名为user的APP。

`python manage.py startapp user`

 此时生成了APP的文件结构，但是还需要进一步将新创建的APP添加到项目中。

##### 编辑settings.py 将APP添加到Django中

	INSTALLED_APPS =(
    	'django.contrib.admin',
    	'django.contrib.auth',
    	'django.contrib.contenttypes',
    	'django.contrib.sessions',
    	'django.contrib.messages',
    	'django.contrib.staticfiles',
    	'user',          #添加的APP
	)

### 4.为APP创建Model

models.py是定义APP数据结构模型的核心位置。以创建一个User对象为例：

	
	from django.db import models 
	# Create yourmodels here.

	class User(models.Model):
		name= models.CharField(max_length=20)
		password=models.CharField(max_length=20)
		def __unicode__(self):           
		#admin中将使用此返回值为各User在列表中的键
		return self.name


##### 在admin中显示出User的数据表
为了在自动化的后台应用（admin）中显示出User的数据表，需要将其注册到admin中。在APP的目录下admin.py 文件中注册：
	
	from django.contrib import admin
	from user.models import User
 
	# Register your models here.
	admin.site.register(User)


##### 将model的表生成到数据库中
使用
`manage.py syncdb`

第一次生成时会提示输入后台的管理帐户名和密码，记住自己的设置。

如果存在migrations

	manage.py makemigrations user
	manage.py syncdb



##### 重启服务，进入admin之后就可以管理User对象了。
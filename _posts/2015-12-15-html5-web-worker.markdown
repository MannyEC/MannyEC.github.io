---
layout:     post
title:      "web worker基础"
subtitle:   
class:		"note"
date:       2015-12-10 
author:     "eckid"
header-img: "img/practice-bg.jpg"
tags:
    - HTML5
---

# web worker基础

Web Workers 是 HTML5 提供的一个javascript多线程解决方案，它允许在后台执行javascript脚本，能够执行事务或者逻辑，并与页面及时的交互和响应。

### 主要方法
	postMessage()       用于交互数据
	terminate()         终止web worker，释放资源

### 事件
	
	onmessage        事件处理器，也可以用addEventListener

## 示例

在学习web worker时，做了一个示例练习。即在后台脚本执行累加运算，然后在页面中接受数据并实时呈现。

接着加上三个按钮，来控制数据运算的start，stop，continue。 

![示例](/img/webworkerexp.png)

其中start和stop是基本的创建和撤销。核心的用法有这四个

    var work = new Worker("count.js");   //创建worker对象

	work.terminate();                 	 //实现stop

	work.onmessage = function(e) {       //监听work事件
		numDiv.innerHTML = e.data;
	}    							
	
    postMessage(num);                   //count.js向页面传送num的值







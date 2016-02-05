---
layout:     post
title:      "UI-addTo"
subtitle:   
class:		"practice"
date:       2016-02-05 
author:     "eckid"
header-img: "img/practice-bg.jpg"
tags:
    - 练习
---

# UI练习

##### 页面演示[demo](https://mannyec.github.io/practice/UI-addTo/index.html)

 ![参考](/practice/UI-addTo/example.png)

## 中间滑动部分


将 `.content-slider` 宽度设为三倍图片宽度，`.slider-item `全部左浮动。

	.content-slider {
	    float: left;
	    height: 430px;
	    margin: auto;
	    background: #fff;
	    width: calc( (478px*3 - 60px) );
	    -webkit-transition: -webkit-transform .35s ease;
	    transition: transform .35s ease;
	}

	.content-slider .slider-item {
	    width: 420px;
	    height: 100%;
	    position: relative;
	    float: left;
	    text-align: center;
	}



然后根据底部选择，动态的给 `.content-slider` 添加类，将其 ` transform `。

	.content-slider.slide-1-active {
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	}
	.content-slider.slide-2-active {
	    -webkit-transform: translate3d(-418px, 0, 0);
	    transform: translate3d(-418px, 0, 0);
	}
	.content-slider.slide-3-active {
	    -webkit-transform: translate3d(-836px, 0, 0);
	    transform: translate3d(-836px, 0, 0);
	}
	





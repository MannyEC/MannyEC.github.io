---
layout:     post
title:      PHP基本语法
subtitle:   
class:		"note"
date:       2016-04-25
author:     "eckid"
header-img: "img/note-bg.jpg"
tags:
- PHP

---

# PHP语法

**《PHP语言精粹》Peter B.MacIntyre** 

最近学PHP时阅读了这本书，于是对书中前几章PHP基本语法部分做个笔记。

# 第一章 精粹
PHP基本设置

运行PHP代码的基本环境是使用最常用的Web服务软件，比如Apache和IIS。有一种包含功能齐全的开发环境的软件包：LAMP 和WAMP。

WAMP: Linux/Apache/MySQL/PHP
WAMP：Windows/Apache/MySQL/PHP

显示php.ini的配置信息：
` <?php phpinfo(); ?> `

# 第二章 实地勘察

### 注释

` # `行内注释 
` // `行内注释
` /*...*/ `多行注释块

### 变量定义
` $ ` 变量名一律以美元符号开头，大小写敏感，且美元符号之后的第一个字符必须为字母和下划线` (_) `

### 数据类型

PHP具有8种基本的变量类型。分别为布尔类型、整形、浮点型、字符型、数组、对象、NULL，资源。

有两种方式给变量赋值：传值和引用。

变量的作用域仅为函数内，函数外部的变量将不能被访问到。
### 定义常量

常量可以在代码中任意位置被定义，全局有效。定义常量用` define("常量名称",常量值,[是否大小写不敏感]) `

只有标量类型（布尔，整型，浮点，字符）才能被定义为常量。

### 流程控制

<pre>
if(){}elseif(){}
if(){}else(){}

switch(){
    case a:
        //一些代码
        [break;]
    default:
        //一些代码
    }
    
while(){}
do{}while();

for(;;){}
</pre>

### Cookie

设置cookie
` setcookie("CookieName",$data,time()+60*60*24*30)`

PHP获取cookie
cookie需要通过PHP中的超全局变量，这些变量在PHP的所有作用域中都是可用的。它们总以` $_ `开头，其余部分完全大写。
`$cookieData = $_COOKIE["cookieID"] `

### Session

每个session都是存储在服务器设定目录中的唯一文件，目录的位置由php.ini中的session.save_path控制。要开始一个session，必须要使用session_start()函数。
<pre>
session_start();
$today = date("Y-m-d");
$_SESSION['today'] = $today;// 添加这个日期到session
</pre>

### GET 和 POST
`$_GET['key'] `和 ` $_POST['key']`

# 第三章 函数（代码复用）
<pre>
//基本示例
function MyFunction($first = 5,$second = 10){
    $answer = $first+$second ;
    return $answer ; 
}
$math = MyFunction(1,2);
</pre>
### 传值和传引用
默认情况下，所有的函数都仅仅是把参数变量的值传递给函数的内部代码。在有些情况下，需要变量及其值受到函数内部行为的影响，这时，你可以想函数传递变量的引用。
<pre>
function displayit(&$text){
    $text.=",you know you want to";
}
$message = "Say hello to the web world";
displayit($message);
echo $message;
//输出为 Say hello to the web world,you know you want to
</pre>

### include 和 require
` include `和` require ` 都可以实现包含指定文件名的内容。所不同的是，用include 时如果指定的文件无法定位，代码会继续运行，但require在这种情况下会停止运行并抛出一个致命错误。
查找文件的方式为：首先，逐个查找php.ini中include_path指定的路径文件，如果文件未找到，PHP会在当前运行文件所在目录进行查找。

#字符串
###字符串创建
字符串可以包含在单引号、双引号或者这两者组合标记中，还可以包含在HEREDOC/NOWDOC中。

###字符串函数
**字符串截取**
`ltrim()` 和 `rtrim()`可以截取调字符串左/右边的空格，`trim()`可以截取字符串左右两侧的空格。
trim也可以指定截取的字符列表,比如
<pre>
$string = "The quick brown fox jumps over the lazy dog";
var_dump(trim($string,"Thedog"));
//输出结果为 string(37)"quick brown fox jumps over the lazy"
</pre>
**字符串大小写**
`ucwords()`可以将字符串首字母大写。
`stetoupper()`或`strtolower()`改变整个字符串的大小写。
`ucfirst()`或`lcfirst()`可使字符串首个字母大写或小写。
**字符串查找**
`str_word_count()`计算字符串中的单词数量
`strlen()`计算字符串的长度
`strstr($string,$needle)`查询字符串中是否有特定子串，区分大小写。返回true或false。
`stristr($string,$needle)`查询字符串中是否有特定子串，不区分大小写。返回true或false。
`strpos()`精确的在字符串定位子串。
`str_replace()`替换字符串内容。
`substr()`提取字符串中一部分子串。

#第五章 数组
### 索引数组
<pre>
$myArray = array(0=>1,1=>2,2=>3);
$a = array();
$a[0] = 12;
</pre>
### 关联数组
<pre>
$myArray = array('first'=>1,'second'=>2,'third'=>3);
$a = array();
$a['id'] = 12;
</pre>
### 多维数组
<pre>
$myArray['fruit'] = array("Apples","Oranges","Tomato");
echo $myArray['fruit'][2];
</pre>
### 数组可以动态创建
向一个已知数组的末尾添加元素，直接用一对空的方括号引用即可。
<pre>
$myArray[] = "555-5678";
</pre>
`array_splice()`函数是删除数组中元素的方法之一。

### 遍历数组
` foreach($myArray as $key=> $value){}`获取键和值
` foreach($myArray as $value){}`只考虑值
` foreach(array_keys($a) as $value){}`只考虑键

### 数组函数 
`sort()`和`rsort()`基于值，键会重排
`asort()`和`arsort()`基于值的排序，会保留原来的键值对应关系
`ksort()`和`krsort()`基于键的排序
`array_sum()`数组中所有值求和
`array_qnique()`确保数组中的所有元素为宜
`in_array()`检测一个值是否在数组中
`array_rand()`返回数组中的一个随机键

#第六章 对象
<pre>
class className{
    //定义类的属性
    private $tag; 
    
    //定义类的方法
    function __construct($titile =""){
        //类的构造函数，每次实例化时都会被调用
        $this->tag = '<HTML>';
        return ;
    }
    
}
</pre>
# 第九章 PHP的安全性
常见方法：数据验证，转义输出，密码加密

* 在php.ini中关闭error_display(使用error_log)
* 确定关闭了php.ini中的register_globals
* 在网站需要的地方采用SSL验证
* 把包含的库和配置文件都放在非文件根目录下(这样就不能通过Web服务器访问它们了)

安全相关推荐阅读：
《Essential PHP Security》by Chris Shiflett
《php|architect's Guide to PHP Security》by Ilia Alshanetsky

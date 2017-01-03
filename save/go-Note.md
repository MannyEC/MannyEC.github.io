# Golang

## 安装与配置

### Ubuntu 下安装 Go 

官网下载 go1.7.4.linux-amd64.tar.gz

解压至 /usr/local

	tar -C /usr/local -xzf go1.7.4.linux-amd64.tar.gz

添加 `/usr/local/go/bin` 至环境变量

	export PATH=$PATH:/usr/local/go/bin

也可以定制路径
<pre>
export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin
</pre>

### $GOPATH 环境变量

$GOPATH 环境变量标记了你的 workspace 的位置，不可以和Go的安装路径相同。

示例中使用 `$HOME/work` 作为安装路径

<pre>
$ mkdir $HOME/work
$ export GOPATH=$HOME/work
</pre>

work下目录结构应该为 `src` `bin` `pkg`

### Q&A

在workspace下执行install 之后，编译到$GOROOT而不是$GOPATH

http://stackoverflow.com/questions/17667803/go-install-always-uses-goroot-bin-instead-of-gopath

与$GOBIN的设置有关:

If the GOBIN environment variable is set, commands are installed to the directory it names instead of DIR/bin

### 卸载Go

删除安装目录 /usr/local/go

## 开发工具搭建 vim-go

1. 安装 vim 插件管理工具 Vundle

<pre>
mkdir ~/.vim/bundle

git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
</pre>

修改.vimrc (~./vimrc)，将Vundle的相关配置置在最开始处(详细参考Vundle的介绍文档)

<pre>
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
</pre>

2.安装Vim-go

修改~/.vimrc，在vundle#begin和vundle#end间增加一行：

Plugin 'fatih/vim-go'

在Vim内执行`: PluginInstall`


## Go 语言基础

### go 源文件中第一个语句必须是 package name

包名为导入路径的最后一个元素，二进制文件的包应该以package main为包名。

### for循环的一个特性
<pre>
若你只需要该遍历中的第一个项（键或下标），去掉第二个就行了：

for key := range m {
	if key.expired() {
		delete(m, key)
	}
}
若你只需要该遍历中的第二个项（值），请使用空白标识符，即下划线来丢弃第一个值：

sum := 0
for _, value := range array {
	sum += value
}
</pre>


### goto

goto语句跳转到必须在当前函数内定义的标签。标签名大小写敏感

<pre>
func myFunc() {
    i := 0
Here:   //这行的第一个词，以冒号结束作为标签
    println(i)
    i++
    goto Here   //跳转到Here去
}
</pre>

### switch 中可以用fallthrough来强制执行后面的case代码 


### 函数

    func funcName(input1 type1, input2 type2) (output1 type1, output2 type2) {
        //这里是处理逻辑代码
        //返回多个值
        return value1, value2
    }

### 变参

Go函数支持变参。接受变参的函数是有着不定数量的参数的。为了做到这点，首先需要定义函数使其接受变参：

    func myfunc(arg ...int) {}


### 函数作为值、类型

在Go中函数也是一种变量，我们可以通过type来定义它，它的类型就是所有拥有相同的参数，相同的返回值的一种类型

type typeName func(input1 inputType1 , input2 inputType2 [, ...]) (result1 resultType1 [, ...])
函数作为类型到底有什么好处呢？那就是可以把这个类型的函数当做值来传递，请看下面的例子

    package main

    import "fmt"

    type testInt func(int) bool // 声明了一个函数类型

    func isOdd(integer int) bool {
        if integer%2 == 0 {
            return false
        }
        return true
    }

    func isEven(integer int) bool {
        if integer%2 == 0 {
            return true
        }
        return false
    }

    // 声明的函数类型在这个地方当做了一个参数

    func filter(slice []int, f testInt) []int {
        var result []int
        for _, value := range slice {
            if f(value) {
                result = append(result, value)
            }
        }
        return result
    }

    func main(){
        slice := []int {1, 2, 3, 4, 5, 7}
        fmt.Println("slice = ", slice)
        odd := filter(slice, isOdd)    // 函数当做值来传递了
        fmt.Println("Odd elements of slice are: ", odd)
        even := filter(slice, isEven)  // 函数当做值来传递了
        fmt.Println("Even elements of slice are: ", even)
    }
函数当做值和类型在我们写一些通用接口的时候非常有用，通过上面例子我们看到testInt这个类型是一个函数类型，然后两个filter函数的参数和返回值与testInt类型是一样的，但是我们可以实现很多种的逻辑，这样使得我们的程序变得非常的灵活。

### 一些特殊的import

**点操作**

我们有时候会看到如下的方式导入包

import(
    . "fmt"
)
这个点操作的含义就是这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，也就是前面你调用的fmt.Println("hello world")可以省略的写成Println("hello world")

**别名操作**

别名操作顾名思义我们可以把包命名成另一个我们用起来容易记忆的名字

import(
    f "fmt"
)
别名操作的话调用包函数时前缀变成了我们的前缀，即f.Println("hello world")

**_操作**

这个操作经常是让很多人费解的一个操作符，请看下面这个import

        import (
            "database/sql"
            _ "github.com/ziutek/mymysql/godrv"
        )
_操作其实是引入该包，而不直接使用包里面的函数，而是调用了该包里面的init函数。

### struct

Go语言中，也和C或者其他语言一样，我们可以声明新的类型，作为其它类型的属性或字段的容器。例如，我们可以创建一个自定义类型person代表一个人的实体。这个实体拥有属性：姓名和年龄。这样的类型我们称之struct。如下代码所示:

    type person struct {
        name string
        age int
    }

### method：带有接收者的函数

func (r ReceiverType) funcName(parameters) (results)

### interface

简单的说，interface是一组method签名的组合，我们通过interface来定义对象的一组行为。

### 并发 

goroutine是Go并行设计的核心。goroutine说到底其实就是线程，但是它比线程更小，十几个goroutine可能体现在底层就是五六个线程，Go语言内部帮你实现了这些goroutine之间的内存共享。执行goroutine只需极少的栈内存(大概是4~5KB)，当然会根据相应的数据伸缩。也正因为如此，可同时运行成千上万个并发任务。goroutine比thread更易用、更高效、更轻便。

goroutine是通过Go的runtime管理的一个线程管理器。goroutine通过go关键字实现了，其实就是一个普通的函数。

    go hello(a, b, c)

多个goroutine运行在同一个进程里面，共享内存数据，不过设计上我们要遵循：不要通过共享来通信，而要通过通信来共享。

**channels**

goroutine运行在相同的地址空间，因此访问共享内存必须做好同步。那么goroutine之间如何进行数据的通信呢，Go提供了一个很好的通信机制channel。channel可以与Unix shell 中的双向管道做类比：可以通过它发送或者接收值。这些值只能是特定的类型：channel类型。定义一个channel时，也需要定义发送到channel的值的类型。注意，必须使用make 创建channel：

    ci := make(chan int)
    cs := make(chan string)
    cf := make(chan interface{})
channel通过操作符<-来接收和发送数据

    ch <- v    // 发送v到channel ch.
    v := <-ch  // 从ch中接收数据，并赋值给v

**Buffered Channels**

上面我们介绍了默认的非缓存类型的channel，不过Go也允许指定channel的缓冲大小，很简单，就是channel可以存储多少元素。ch:= make(chan bool, 4)，创建了可以存储4个元素的bool 型channel。在这个channel 中，前4个元素可以无阻塞的写入。当写入第5个元素时，代码将会阻塞，直到其他goroutine从channel 中读取一些元素，腾出空间。

    ch := make(chan type, value)

**Range和Close**

可以通过range，像操作slice或者map一样操作缓存类型的channel

记住应该在生产者的地方关闭channel，而不是消费的地方去关闭它，这样容易引起panic

另外记住一点的就是channel不像文件之类的，不需要经常去关闭，只有当你确实没有任何发送数据了，或者你想显式的结束range循环之类的

**Select**

我们上面介绍的都是只有一个channel的情况，那么如果存在多个channel的时候，我们该如何操作呢，Go里面提供了一个关键字select，通过select可以监听channel上的数据流动。

select默认是阻塞的，只有当监听的channel中有发送或接收可以进行时才会运行，当多个channel都准备好的时候，select是随机的选择一个执行的。


**超时**

有时候会出现goroutine阻塞的情况，那么我们如何避免整个程序进入阻塞的情况呢？我们可以利用select来设置超时

    func main() {
        c := make(chan int)
        o := make(chan bool)
        go func() {
            for {
                select {
                    case v := <- c:
                        println(v)
                    case <- time.After(5 * time.Second):
                        println("timeout")
                        o <- true
                        break
                }
            }
        }()
        <- o
    }

**runtime goroutine**

runtime包中有几个处理goroutine的函数：

- Goexit

退出当前执行的goroutine，但是defer函数还会继续调用

- Gosched

让出当前goroutine的执行权限，调度器安排其他等待的任务运行，并在下次某个时候从该位置恢复执行。

- NumCPU

返回 CPU 核数量

- NumGoroutine

返回正在执行和排队的任务总数

- GOMAXPROCS

用来设置可以并行计算的CPU核数的最大值，并返回之前的值。




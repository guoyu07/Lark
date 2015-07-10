﻿#Lark 命令行工具手册

##命令行参数规则

`lark [命令] [项目目录(可选)] [-参数名 参数值]`<br/>
`lark run test -a -port 8080`

##创建项目
进入您的工作目录，执行 `lark create HelloWorld`， Lark 会创建一个 HelloWorld 目录作为项目的根目录, 
如果您想要在当前目录创建项目，请直接执行 `lark create`。命令行工具会自动打开一个浏览器窗口，请按照提示
选择项目模板、屏幕尺寸和要使用的扩展模块。

##编译项目
进入您的项目目录，执行 `lark build`， Lark 会编译您的 TypeScript 代码到 `bin-debug` 目录，
拷贝 `src` 和 `template` 中的其他文件到 `bin-debug` 中。<br/>
Lark 命令行工具采用增量编译机制，默认只编译上次编译之后改变的部分。

##运行项目
进入您的项目目录，执行 `lark run`， Lark 会启动内置的 HTTP Server 并打开浏览器。
可选参数:
* `-a` 启动自动编译
* `-port [port number]` 指定启动 Server 的端口

##发布项目
进入您的项目目录，执行 `lark publish`， Lark 会合并编译您的 TypeScript 代码，
压缩之后拷贝到 `bin-release` 目录，拷贝 `src` 和 `template` 中的其他文件到 `bin-release` 中。
替换模板中的第三方库 Script 为 release 版本。

##清理项目、升级项目
进入您的项目目录，执行 `lark clean`， Lark 会更新 `src/libs/` 中的 lark 脚本文件，
清空 `bin-debug` 中的内容，重新编译项目。

当 Lark 发布新版本或您自己修改了 Lark 源代码时，也需要在您项目根目录中执行 `lark clean`， 命令行工具会更新项目中的 Lark 框架为最新版本。

需要注意的是，`clean` 命令只会用 Lark 根目录中 build 文件夹下的文件，覆盖 libs 目录中的同名文件，
其他第三方库不会被删除，当然也有可能 Lark 本身的扩展库在新版本中被删除，这种情况请手动删除旧版本的扩展库。

##输出 Lark 信息
执行 `lark info`， Lark 会输出 Lark 安装目录和版本信息。

##帮助信息
执行 `lark help`， Lark 会打开命令行工具使用手册。
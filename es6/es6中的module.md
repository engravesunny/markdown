# 7. 你是怎么理解javascript中Module的？使用场景？

## CommonJs

`CommonJS` 是一套 `Javascript` 模块规范，用于服务端

```js
// a.js
module.exports={ foo , bar}

// b.js
const { foo,bar } = require('./a.js')
```

其有如下特点：

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
- `require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是：

- 内置模块（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
- 自定义模块（用户创建的每个 .js 文件，都是自定义模块）
- 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

### 加载模块

> CommonJS的加载方法

使用强大的 require() 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。例如：

![请添加图片描述](https://img-blog.csdnimg.cn/a67358f77de24a19ba0a6f0658a44b2d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

> 注意：使用 require() 方法加载其它模块时，会执行被加载模块中的代码。

### 模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块 作用域。

![请添加图片描述](https://img-blog.csdnimg.cn/4503f023adf140d694ba9b2666324cc9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

**好处：**

防止了全局变量污染的问题

### module和module.exports

module模块存储了和当前模块有关的信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/6dd5f0223dea435c9f75d411a010520e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

**module.exports**.

在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。

外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

> 使用 require() 方法导入模块时，导入的结果，永远以 module.exports 指向的对象为准。

![在这里插入图片描述](https://img-blog.csdnimg.cn/c08106f05aa044a38397bee668e44710.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况 下，exports 和 module.exports 指向同一个对象。最终共享的结果，还是以 module.exports 指向的对象为准。

![在这里插入图片描述](https://img-blog.csdnimg.cn/645064e0aae24e9d9f6c62df44bdcc58.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

exports 和 module.exports 的使用误区

![在这里插入图片描述](https://img-blog.csdnimg.cn/ceac321aba184829b820bbb25be0a38d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

> 注意：为了防止混乱，建议大家不要在同一个模块中同时使用 exports 和 module.exports

### node.js中的模块化规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

CommonJS 规定：

① 每个模块内部，module 变量代表当前模块。

② module 变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。

③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。

### npm与包

Node.js 中的第三方模块又叫做包。

由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。

包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。 包和内置模块之间的关系，类似于 jQuery 和 浏览器内置 API 之间的关系。

基本示例代码：

```js
// 导入 moment包
// 在导包前需要先下载包
const moment = require('moment')

// 调用moment()方法，得到当前时间
// 针对当前的时间，调用format() 方法，按照指定的格式进行时间的格式化
const dt = moment().format('YYYY-MM-DD HH:mm:ss')

console.log(dt);
```

如果想在项目中安装指定名称的包，需要运行如下的命令：

```js
npm i 完整的包名称
```

初次装包完成后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件。

**其中：**

node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。

package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。

> 注意：程序员不要手动修改 node_modules 或 package-lock.json 文件中的任何代码，npm 包管理工具会自动维护它们。

**安装指定版本的包**.

默认情况下，使用 npm install 命令安装包的时候，会自动安装最新版本的包。如果需要安装指定版本的包，可以在包 名之后，通过 @ 符号指定具体的版本，例如:

```js
npm i moment@2.22.2
```

**包的语义化版本规范**.

包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如 2.24.0 其中每一位数字所代表的的含义如下：

第1位数字：大版本

第2位数字：功能版本

第3位数字：Bug修复版本

> 版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零。

**包管理配置文件**.

npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置 信息。例如：

- 项目的名称、版本号、描述等
- 项目中都用到了哪些包
- 哪些包只在开发期间会用到
- 那些包在开发和部署时都需要用到

在项目根目录中，创建一个叫做 package.json 的配置文件，即可用来记录项目中安装了哪些包。从而方便剔除 node_modules 目录之后，在团队成员之间共享项目的源代码。

> 注意：今后在项目开发中，一定要把 node_modules 文件夹，添加到 .gitignore 忽略文件中。

**快速创建 package.json**.

npm 包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建 package.json 这个包管理 配置文件：

```js
// 作用：在执行命令所处的目录中，快速新建package.json文件
npm init -y
```

**注意：**

> ① 上述命令只能在英文的目录下成功运行！所以，项目文件夹的名称一定要使用英文命名，不要使用中文，不能出现空格。
>
> ② 运行 npm install 命令安装包的时候，npm 包管理工具会自动把包的名称和版本号，记录到 package.json 中。

**dependencies 节点**.

package.json 文件中，有一个 dependencies 节点，专门用来记录您使用 npm install  命令安装了哪些包。

![在这里插入图片描述](https://img-blog.csdnimg.cn/e5eec838f67a46d9828065a749db8d7c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

**一次性安装所有的包**.

当我们拿到一个剔除了 node_modules 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来。 否则会报类似于下面的错误：

```js
// 由于项目运行依赖moment这个包，如果没有提前安装好这个包，就会报如下的错误
Error: Cannot find module 'moment'
```

可以运行 npm install 命令（或 npm i）一次性安装所有的依赖包：

```js
// 执行npm install 命令时， npm 包管理工具会先读取 package.json中 dependencies节点，读取到记录的所有依赖包名称和版本号之后，npm包管理工具会把这些包一次性下载到项目中
npm install 
```

**卸载包**.

可以运行 npm uninstall 命令，来卸载指定的包：

```js
// 使用npm uninstall 具体的包名 来卸载包
npm uninstall moment
```

> 注意：npm uninstall 命令执行成功后，会把卸载的包，自动从 package.json 的 dependencies 中移除掉

**devDependencies 节点**.

如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中。

与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中。

您可以使用如下的命令，将包记录到 devDependencies 节点中：

```js
// 安装指定的包，并记录到devDenoendencies节点中
npm i 包名 -D
// 注意：上述命令时简写形式，等价于下面完整的写法
npm install 包名 --save-dev
```

**切换 npm 的下包镜像源**.

**nrm**.

为了更方便的切换下包的镜像源，我们可以安装 nrm 这个小工具，利用 nrm 提供的终端命令，可以快速查看和切换下 包的镜像源。

```js
// 通过 npm 包管理器，将nrm安装为全局可用的工具
npm i nrm -g
// 查看所有镜像源
nrm ls
// 将下包的镜像切换为tapbao镜像
nrm use taobao
```

**包的分类**.

使用 npm 包管理工具下载的包，共分为两大类，分别是：

- 项目包
- 全局包

**项目包** 那些被安装到项目的 node_modules 目录中的包，都是项目包。

项目包又分为两类，分别是：

- 开发依赖包（被记录到 devDependencies 节点中的包，只在开发期间会用到）
- 核心依赖包（被记录到 dependencies 节点中的包，在开发期间和项目上线之后都会用到）

```js
npm i 包名 -D # 开发依赖包
npm i 包名   # 核心依赖包
```

**全局包**.

在执行 npm install 命令时，如果提供了 -g 参数，则会把包安装为全局包。 全局包会被安装到

C:\Users\用户目录\AppData\Roaming\npm\node_modules 目录下。

```js
// 全局安装指定的包
npm i 包名 -g
// 卸载全局安装的包
npm uninstall 包名 -g
```

注意：

> ① 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令。
>
> ② 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

**规范的包结构**.

在清楚了包的概念、以及如何下载和使用包之后，接下来，我们深入了解一下包的内部结构。

一个规范的包，它的组成结构，必须符合以下 3 点要求：

① 包必须以单独的目录而存在

② 包的顶级目录下要必须包含 package.json 这个包管理配置文件

③ package.json 中必须包含 name，version，main 这三个属性，分别代表包的名字、版本号、包的入口。

### 开发属于自己的包

**初始化包的基本结构**.

① 新建 gaohan-tools 文件夹，作为包的根目录

② 在 gaohan-tools 文件夹中，新建如下三个文件：

- package.json （包管理配置文件）
- index.js （包的入口文件）
- README.md （包的说明文档）

**初始化 package.json**.

```json
{
  "name": "gaohan-tools",
  "version": "1.1.0",
  "main": "index.js",
  "description": "提供了格式化时间、HTMLEscape相关的功能",
  "keywords": [
    "itheima",
    "dateFormat",
    "escape"
  ],
  "license": "ISC"
}
```

**模块化拆分**.

① 将格式化时间的功能，拆分到 src -> dateFormat.js 中

② 将处理 HTML 字符串的功能，拆分到 src -> htmlEscape.js 中

③ 在 index.js 中，导入两个模块，得到需要向外共享的方法

④ 在 index.js 中，使用 module.exports 把对应的方法共享出去

**日期格式化** dateFormat.js

```js
// 定义格式化时间的函数
function dateFormat(dateStr) {
  const dt = new Date(dateStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定义一个补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

module.exports = {
  dateFormat
}
```

**html格式化**  htmlEscape.js

```js
// 定义转义 HTML 字符的函数
function htmlEscape(htmlstr) {
  return htmlstr.replace(/<|>|"|&/g, match => {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case '&':
        return '&amp;'
    }
  })
}

// 定义还原 HTML 字符串的函数
function htmlUnEscape(str) {
  return str.replace(/&lt;|&gt;|&quot;|&amp;/g, match => {
    switch (match) {
      case '&lt;':
        return '<'
      case '&gt;':
        return '>'
      case '&quot;':
        return '"'
      case '&amp;':
        return '&'
    }
  })
}

module.exports = {
  htmlEscape,
  htmlUnEscape
}

```

**index.js 是包入口文件**.

```js
// 这是包的入口文件

const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

// 向外暴露需要的成员
module.exports = {
  ...date,
  ...escape
}
```

**编写包的说明文档**.

包根目录中的 README.md 文件，是包的使用说明文档。通过它，我们可以事先把包的使用说明，以 markdown 的 格式写出来，方便用户参考。

README 文件中具体写什么内容，没有强制性的要求；只要能够清晰地把包的作用、用法、注意事项等描述清楚即可。

我们所创建的这个包的 README.md 文档中，会包含以下 6 项内容：

安装方式、导入方式、格式化时间、转义 HTML 中的特殊字符、还原 HTML 中的特殊字符、开源协议

### 发布包

**注册 npm 账号**.

① 访问 <https://www.npmjs.com/> 网站，点击 sign up 按钮，进入注册用户界面

② 填写账号相关的信息：Full Name、Public Email、Username、Password

③ 点击 Create an Account 按钮，注册账号

④ 登录邮箱，点击验证链接，进行账号的验证

**登录 npm 账号**.

npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。

![在这里插入图片描述](https://img-blog.csdnimg.cn/39f183cc03454c189ff52271c13c93dc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAaGFuZ2FvMjMz,size_20,color_FFFFFF,t_70,g_se,x_16)

> 注意：在运行 npm login 命令之前，必须 先把下包的服务器地址切换为 npm 的官方 服务器。否则会导致发布包失败！

**把包发布到 npm 上**.

将终端切换到包的根目录之后，运行 npm publish 命令，即可将包发布到 npm 上（注意：包名不能雷同）。

**删除已发布的包**.

运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包。

**注意：**

① npm unpublish 命令只能删除 72 小时以内发布的包

② npm unpublish 删除的包，在 24 小时内不允许重复发布

③ 发布包的时候要慎重，尽量不要往 npm 上发布没有意义的包！

### 模块的加载机制

**优先从缓存中加载**.

模块在第一次加载后会被缓存。 这也意味着多次调用 require() 不会导致模块的代码被执行多次。

> 注意：不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

**内置模块的加载机制**.

内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。

例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs。

**自定义模块的加载机制**.

使用 require() 加载自定义模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在加载自定义模块时，如果没有指定 ./ 或 ../  这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载。

同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件：

① 按照确切的文件名进行加载

② 补全 .js 扩展名进行加载

③ 补全 .json 扩展名进行加载

④ 补全 .node 扩展名进行加载

⑤ 加载失败，终端报错

**第三方模块的加载机制**.

如果传递给 require() 的模块标识符不是一个内置模块，也没有以 ‘./’ 或 ‘../’ 开头，则 Node.js 会从当前模块的父 目录开始，尝试从 /node_modules 文件夹中加载第三方模块。

如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

例如，假设在 'C:\Users\itheima\project\foo.js' 文件里调用了 require('tools')，则 Node.js 会按以下顺序查找：

① C:\Users\itheima\project\node_modules\tools

② C:\Users\itheima\node_modules\tools

③ C:\Users\node_modules\tools

④ C:\node_modules\tools

既然存在了`AMD`以及`CommonJs`机制，`ES6`的`Module`又有什么不一样？

ES6 在语言标准的层面上，实现了`Module`，即模块功能，完全可以取代 `CommonJS`和 `AMD`规范，成为浏览器和服务器通用的模块解决方案

`CommonJS` 和`AMD` 模块，都只能在运行时确定这些东西。比如，`CommonJS`模块就是对象，输入时必须查找对象属性

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

`ES6`设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上述代码，只加载3个方法，其他方法不加载，即 `ES6` 可以在编译时就完成模块加载

由于编译加载，使得静态分析成为可能。包括现在流行的`typeScript`也是依靠静态分析实现功能

## ES6 Moudle

`ES6`模块内部自动采用了严格模式，这里就不展开严格模式的限制，毕竟这是`ES5`之前就已经规定好

模块功能主要由两个命令构成：

- `export`：用于规定模块的对外接口
- `import`：用于输入其他模块提供的功能

### export

#### 分别暴露

```js
// 分别暴露模块
export function foo() {
    console.log('foo()');
}

export function bar() {
    console.log('bar()');
}

export let arr = [1, 2, 3, 4, 5]
```

#### 统一暴露

```js
// 统一暴露
function fun() {
    console.log('fun()');
}

function fun2() {
    console.log('fun2()');
}

export { fun, fun2 }
```

#### **默认暴露**

```js
// 默认暴露
export default {
    msg: 'hello......',
    fun: () => {
        console.log('aaaaaaaaaaaaa');
    }
}
```

### import

#### **引入模块**

```js
// 引入其他的模块
// 如果是单个的js文件 引入时要加上后缀
// 引入的是一个npm下载的包，就不需要加后缀
import {foo, bar} from './module1.js'
import {fun, fun2} from './module2.js'
import module3 from './module3.js'
import $ from 'jquery'
import express from 'express'

foo();
bar();
fun();
fun2();
console.log(module3.msg);;
console.log(module3.fun());
```

#### 模块作用域w

每个模块都有自己的顶级作用域（top-level scope）。换句话说，一个模块中的顶级作用域变量和函数在其他脚本中是不可见的。

#### 模块代码仅在第一次导入时被解析

如果同一个模块被导入到多个其他位置，那么它的代码只会执行一次，即在第一次被导入时。

#### 在一个模块中，“this” 是 undefined

这是一个小功能，但为了完整性，我们应该提到它。

在一个模块中，顶级 this 是 undefined。

将其与非模块脚本进行比较会发现，非模块脚本的顶级 this 是全局对象：

```js
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

#### Import *

通常，我们把要导入的东西列在花括号 import {...} 中，就像这样：

```js
// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

但是如果有很多要导入的内容，我们可以使用 import * as <obj> 将所有内容导入为一个对象，例如：

```js
// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
```

乍一看，“通通导入”看起来很酷，写起来也很短，但是我们通常为什么要明确列出我们需要导入的内容？

比如说，我们向我们的项目里添加一个第三方库 say.js，它具有许多函数：
这里有几个原因。

- 现代的构建工具（webpack 和其他工具）将模块打包到一起并对其进行优化，以加快加载速度并删除未使用的代码。
  比如说，我们向我们的项目里添加一个第三方库 say.js，它具有许多函数：

  ```js
  // 📁 say.js
  export function sayHi() { ... }
  export function sayBye() { ... }
  export function becomeSilent() { ... }
  ```

  现在，如果我们只在我们的项目里使用了 say.js 中的一个函数：

  ```js
  // 📁 main.js
  import {sayHi} from './say.js';
  ```

  那么，优化器（optimizer）就会检测到它，并从打包好的代码中删除那些未被使用的函数，从而使构建更小。这就是所谓的“摇树（tree-shaking）”。

- 明确列出要导入的内容会使得名称较短：sayHi() 而不是 say.sayHi()。

- 导入的显式列表可以更好地概述代码结构：使用的内容和位置。它使得代码支持重构，并且重构起来更容易。

> 不用花括号的导入看起来很酷。刚开始使用模块时，一个常见的错误就是忘记写花括号。所以，请记住，import 命名的导出时需要花括号，而 import 默认的导出时不需要花括号。

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5375fa15b484912ae514b64eb232618.png)

## 使用场景

如今，`ES6`模块化已经深入我们日常项目开发中，像`vue`、`react`项目搭建项目，组件化开发处处可见，其也是依赖模块化实现

`vue`组件

```js
<template>
  <div class="App">
      组件化开发 ---- 模块化
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

`react`组件

```js
function App() {
  return (
    <div className="App">
  组件化开发 ---- 模块化
    </div>
  );
}

export default App;
```

包括完成一些复杂应用的时候，我们也可以拆分成各个模块

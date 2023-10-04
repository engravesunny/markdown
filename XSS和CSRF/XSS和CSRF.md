## XSS攻击

### 什么是 XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种**代码注入攻击**。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

所以,网页上哪些部分会引起XSS攻击?简单来说,任何可以输入的地方都有可能引起,包括URL!

XSS 常见的注入方法：

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 `javascript:` (伪协议)等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 `background-image:url("javascript:...");` 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 `expression(...)` 的 CSS 表达式代码（新版本浏览器已经可以防范）。

### XSS 攻击的分类

根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。

#### 存储型 XSS

存储型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中。
1. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
1. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

存储型 XSS(又被称为持久性XSS)攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

它是最危险的一种跨站脚本，相比反射型XSS和DOM型XSS具有更高的隐蔽性，所以危害更大，因为**它不需要用户手动触发**。**任何允许用户存储数据的web程序都可能存在存储型XSS漏洞**，当攻击者提交一段XSS代码后，被服务器端接收并存储，当**所有浏览者访问某个页面时都会被XSS**。

#### 反射型 XSS

反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
1. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
1. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS (也被称为非持久性XSS)漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

#### DOM 型 XSS

DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
1. 用户打开带有恶意代码的 URL。
1. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
1. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

**注意:**  
DOM通常代表在html、xhtml和xml中的对象，使用DOM可以允许程序和脚本动态的访问和更新文档的内容、结构和样式。它不需要服务器解析响应的直接参与，触发XSS**靠的是浏览器端的DOM解析**，所以防范**DOM型XSS完全就是前端的责任,必须注意!!!** 。

**对比:**

| 类型        | 存储区            | 插入点           |
| --------- | -------------- | ------------- |
| 存储型 XSS   | 后端数据库          | HTML          |
| 反射型 XSS   | URL            | HTML          |
| DOM 型 XSS | 后端数据库/前端存储/URL | 前端 JavaScript |

### 防御XSS

只要有输入数据的地方，就可能存在 XSS 危险。

#### 常用防范方法

- **httpOnly:** 在 cookie 中设置 HttpOnly 属性后，js脚本将无法读取到 cookie 信息。

- **输入过滤:** 一般是用于对于输入格式的检查，例如：邮箱，电话号码，用户名，密码……等，按照规定的格式输入。不仅仅是前端负责，后端也要做相同的过滤检查。因为攻击者完全可以绕过正常的输入流程，直接利用相关接口向服务器发送设置。

- **转义 HTML:** 如果拼接 HTML 是必要的，就需要对于引号，尖括号，斜杠进行转义,但这还不是很完善.想对 HTML 模板各处插入点进行充分的转义,就需要采用合适的转义库.(可以看下这个[库](https://link.juejin.cn?target=https%3A%2F%2Fjsxss.com%2Fzh%2Findex.html "https://jsxss.com/zh/index.html"),还是中文的)

    ```js

    function escape(str) {
      str = str.replace(/&/g, '&amp;')
      str = str.replace(/</g, '&lt;')
      str = str.replace(/>/g, '&gt;')
      str = str.replace(/"/g, '&quto;')
      str = str.replace(/'/g, '&#39;')
      str = str.replace(/`/g, '&#96;')
      str = str.replace(///g, '&#x2F;')
      return str
    }
    ```

- **白名单:** 对于显示富文本来说，不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。这种情况通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。

#### 预防存储型和反射型 XSS 攻击

存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：

- 改成纯前端渲染，把代码和数据分隔开。
- 对 HTML 做充分转义。

HTML转义前面已经说过,这里仅仅谈谈纯前端渲染

**纯前端渲染的过程：**

1. 浏览器先加载一个静态 HTML，此 HTML 中不包含任何跟业务相关的数据。
1. 然后浏览器执行 HTML 中的 JavaScript。
1. JavaScript 通过 Ajax 加载业务数据，调用 DOM API 更新到页面上。

在纯前端渲染中，我们会明确的告诉浏览器：下面要设置的内容是文本（`.innerText`），还是属性（`.setAttribute`），还是样式（`.style`）等等。浏览器不会被轻易的被欺骗，执行预期外的代码了。

但纯前端渲染还需注意避免 DOM 型 XSS 漏洞（例如 `onload` 事件和 `href` 中的 `javascript:xxx` 等，请参考下文”预防 DOM 型 XSS 攻击“部分）。

在很多内部、管理系统中，采用纯前端渲染是非常合适的。但对于性能要求高，或有 SEO 需求的页面，我们仍然要面对拼接 HTML 的问题,这时就需要对HTML进行充分的转义。

#### 预防 DOM 型 XSS 攻击

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。

如果用 Vue/React 技术栈，并且不使用 `v-html`/`dangerouslySetInnerHTML` 功能，就在前端 render 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患。

DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

```js

<!-- 内联事件监听器中包含恶意代码 -->
<img onclick="UNTRUSTED" onerror="UNTRUSTED" src="data:image/png,">

<!-- 链接内包含恶意代码 -->
<a href="UNTRUSTED">1</a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
</script>
```

## CSRF 跨站点请求伪造

### 什么是 CSRF

跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。如:攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

### CSRF攻击流程

下图引自这位大佬的[浅谈CSRF攻击方式](https://link.juejin.cn?target=https%3A%2F%2Fwww.cnblogs.com%2Fhyddd%2Farchive%2F2009%2F04%2F09%2F1432744.html "https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html"),感谢!

![简而言之：网站过分相信用户](https://www.kecat.top/articleImage/20231002195823.png)

从上图可以看出，要完成一次CSRF攻击，受害者必须依次完成两个步骤：

- 1.登录受信任网站A，并在本地生成Cookie。
- 2.在不登出A的情况下，访问危险网站B。

看到这里，你也许会说：“如果我不满足以上两个条件中的一个，我就不会受到CSRF的攻击”。是的，确实如此，但你不能保证以下情况不会发生：

- 1.你不能保证你登录了一个网站后，不再打开一个tab页面并访问另外的网站。
- 2.**你不能保证你关闭浏览器了后，你本地的Cookie立刻过期**，你上次的会话已经结束。（事实上，关闭浏览器不能结束一个会话，但大多数人都会错误的认为关闭浏览器就等于退出登录/结束会话了......）
- 3.上图中所谓的攻击网站，可能是一个存在其他漏洞的可信任的经常被人访问的网站。

### 常见的CSRF攻击类型

- #### GET类型的CSRF

GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：

```js

 <img src="http://bank.example/withdraw?amount=10000&for=hacker" > 
```

在受害者访问含有这个img的页面后，浏览器会自动向`http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker`发出一次HTTP请求。bank.example就会收到包含受害者登录信息的一次跨域请求。

- #### POST类型的CSRF

这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：

```js

 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

POST类型的攻击通常比GET要求更加严格一点，但仍并不复杂。任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，**后端接口不能将安全寄托在仅允许POST上面**。

- #### 链接类型的CSRF

链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：

```js
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a/>
```

### CSRF的特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
- 攻击**利用受害者在被攻击网站的登录凭证，冒充受害者提交操作**；而不是直接窃取数据。
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如**可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。**

### CSRF与 XSS 区别

- **通常来说 CSRF 是由 XSS 实现的，CSRF 时常也被称为 XSRF（CSRF 实现的方式还可以是直接通过命令行发起请求等）。**
- 本质上讲，XSS 是代码注入问题，**CSRF 是 HTTP 问题。** XSS 是内容没有过滤导致浏览器将攻击者的输入当代码执行。**CSRF 则是因为浏览器在发送 HTTP 请求时候自动带上 cookie，而一般网站的 session 都存在 cookie里面(Token验证可以避免)。**

### 防御

- 验证码；强制用户必须与应用进行交互，才能完成最终请求。此种方式能很好的遏制 csrf，但是用户体验比较差。
- Referer check；请求来源限制，此种方法成本最低，但是并不能保证 100% 有效，因为服务器并不是什么时候都能取到 Referer，而且低版本的浏览器存在伪造 Referer 的风险。
- token；**token 验证的 CSRF 防御机制是公认最合适的方案。** (具体可以查看本系列前端鉴权中对token有详细描述)**若网站同时存在 XSS 漏洞的时候，这个方法也是空谈。**

其他更详细的防御方法可以查看: [前端安全系列之二：如何防止CSRF攻击？](https://juejin.im/post/6844903689702866952#heading-20 "https://juejin.im/post/6844903689702866952#heading-20")

## 感谢及参考

- [前端安全系列（一）：如何防止XSS攻击？](https://juejin.im/post/6844903685122703367#heading-15 "https://juejin.im/post/6844903685122703367#heading-15") (真的非常详细!)
- [前端安全系列之二：如何防止CSRF攻击？](https://juejin.im/post/6844903689702866952#heading-20 "https://juejin.im/post/6844903689702866952#heading-20")(真的非常详细!+1)

# 7. HTTP 缓存技术

## 一、缓存介绍

### 1、什么是缓存？

缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。

### 2、为什么需要缓存？

如果没有缓存的话，每次网络请求都要加载大量的图片和资源，这会使页面的加载变慢许多。
缓存的目的就是为了尽量减少网络请求的体积和数量，让页面加载的更快，节省带宽，提高访问速度，降低服务器压力。

### 3、哪些资源可以被缓存？——静态资源（css、js、img）

网站的 html 是不能被缓存的。因为网站在使用过程中 html 随时有可能被更新，随时有可能被替换模板。
网页的业务数据也是不能被缓存的。比如留言板和评论区，用户随时都可以在底下评论，那数据库的内容就会被频繁被更新。

## 二、强制缓存

### 1、定义

**强缓存：浏览器不会向服务器发送任何请求，直接从本地缓存中读取文件并返回。**

**Status Code:200**

![在这里插入图片描述](https://img-blog.csdnimg.cn/7292aa753db14f709a03229f19c66ba6.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/215930822ea545c3b2d97239afb4f195.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

**200 (from memory cache):** 不访问服务器，一般已经加载过该资源且缓存存在了内存当中，直接从内存中中读取缓存。浏览器关闭后，数据将不存在（资源被释放掉了），再次打开相同的页面时，不会出现from memory cache。

**200 (from disk cache):** 不访问服务器，已经在之间某个时间加载过该资源，直接从磁盘中读取缓存，关闭浏览器后，数组依然存在，因为是存在硬盘当中的，下次打开仍会from disk cache。

**优先访问memory cache,其次是disk cache，最后是请求网络资源**

### 2、设置强缓存的方式 Expires & Cache-Control

**Expires:** 该值是一个GMT时间格式字符串，浏览器进行第一次请求时，服务器会在返回头部加上Expires。下次请求，如果设置了时间，并在设置的时间之前就可以直接读取缓存。

**Cache-Control:** 该值是利用max-age判断缓存的生命周期，以秒为单位，如果在该生命周期内，则命中强缓存。比如max-age=300 ，则代表在这个请求正确返回时间的5分钟内再次加载资源，就会命中强缓存。
cache-control：除了该字段外，还有下面几个比较常用的设置值：

> （1） max-age：用来设置资源（representations）可以被缓存多长时间，单位为秒；
> （2） s-maxage：和max-age是一样的，不过它只针对代理服务器缓存而言；
> （3）public：指示响应可被任何缓存区缓存；
> （4）private：只能针对个人用户，而不能被代理服务器缓存；
> （5）no-cache：强制客户端直接向服务器发送请求,也就是说每次请求都必须向服务器发送。服务器接收到 请求，然后判断资源是否变更，是则返回新内容，否则返回304，未变更。这个很容易让人产生误解，使人误 以为是响应不被缓存。实际上Cache-Control: no-cache是会被缓存的，只不过每次在向客户端（浏览器）提供响应数据时，缓存都要向服务器评估缓存响应的有效性。
> （6）no-store：禁止一切缓存（这个才是响应不被缓存的意思）。

>cache-control是http1.1的头字段，expires是http1.0的头字段,如果expires和cache-control同时存在，cache-control会覆盖expires，建议两个都写。
>如果 cache-control 与 expires 同时存在的话， cache-control 的优先级高于 expires

![在这里插入图片描述](https://img-blog.csdnimg.cn/9b417f596b454fc88e6d2a42bf3f2983.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

## 三、协商缓存

### 1、定义

**协商缓存是一种服务端缓存策略，即通过服务端来判断某件事情是不是可以被缓存。
服务端判断客户端的资源，是否和服务端资源一样，如果一致则返回304，反之返回200和最新的资源。**
![在这里插入图片描述](https://img-blog.csdnimg.cn/4e4bad20118a4f0bbac6c73ada4a68c7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

在上图中，表明了协商缓存的全过程。首先，如果客户端是第一次向服务器发出请求，则服务器返回资源和相对应的资源标识给浏览器。该资源标识就是对当前所返回资源的一种唯一标识，可以是Etag或者是Last-Modified，这两个字段将在图例结束后展开讲解。

之后如果浏览器再次发送请求时，浏览器就会带上这个资源标识。此时，服务端就会通过这个资源标识，可以判断出浏览器的资源跟服务端此时的资源是否一致，如果一致，则返回304，即表示Not Found 资源未修改。如果判断结果为不一致，则返回200，并返回资源以及新的资源标识。至此就结束了协商缓存的过程。

### 2、设置协商缓存的方式 (Last-Modified , If-Modified-Since) & (ETag , If-None-Match)

#### 1) Last-Modified , If-Modified-Since

**`Last-Modified`** 资源最后修改的时间，对应请求头为 **`If-Modified-Since`**,**Last-Modified** 只能精确到秒级

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c85faba4a1047a5a7176e800f2e0d71.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

当浏览器第一次发请求时，服务器返回资源并在返回头中返回一个Last-Modified 的值给浏览器。这个Last-Modified 的值给到浏览器之后，浏览器会通过 If-Modified-Since 的字段来保存 Last-Modified 的值，且 If-Modified-Since 保存在请求头当中。

之后浏览器再次发送请求时，请求头会带着 If-Modified-Since 的值去找服务器，服务器此时就会匹配浏览器发过来的 If-Modified-Since 是否和自己最后一次修改的 Last-Modified的值相等。如果相等，则返回304，表示资源未被修改；如果不相等，则返回200，并返回资源和新的 Last-Modified的值。

#### 2）Etag，If-None-Match

**`Etag`** 资源唯一标识，所谓唯一，可以想象是每个人的身份证，具有唯一性；Etag本质是一个字符串；对应请求头为 **`If-None-Match`**

![在这里插入图片描述](https://img-blog.csdnimg.cn/b4d47a5684f14d908b7789e3af776d00.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

当浏览器第一次发送请求时，服务器返回资源并返回一个 Etag 的值给浏览器。这个 Etag 的值给到浏览器之后，浏览器会通过 If-None-Match 的字段来保存 Etag 的值，且 If-None-Match 保存在请求头当中。

之后当浏览器再次发送请求时，请求头会带着 If-None-Match 的值去找服务器，服务器此刻就会匹配浏览器发过来的 If-None-Match 是否和自己最后一次修改的 Etag 的值相等。如果相等，则返回 304 ，表示资源未被修改；如果不相等，则返回 200 ，并返回资源和新的 Etag 的值。

### 3、对比

* 当响应头部 **Response Headers** 同时存在 **Last-Modified** 和 **Etag** 的值时，会优先使用Etag;
  Etag优先级是高于Last-Modifed的，所以服务器会优先验证Etag
* **Last-Modified** 只能精确到秒级，而**Etag**可以更精确。
* 如果资源被重复生成，而内容不变，则**Etag**更精确

![在这里插入图片描述](https://img-blog.csdnimg.cn/96338ce5385d4b5ca8c818ef9298d66d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

![在这里插入图片描述](https://img-blog.csdnimg.cn/82d8e49b3c8947bb8d66ffff46f812e0.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

## 四、刷新操作对缓存的影响

### （1）正常操作

**定义**： 地址栏输入 url ，跳转链接，前进后退等。
**对缓存的影响：** 强制缓存有效，协商缓存有效。

### （2）手动刷新

**定义：** F5 ，点击刷新按钮，右击菜单刷新。
**对缓存的影响：** 强制缓存失效，协商缓存有效。

### （3）强制刷新

**定义：** ctrl + F5 。
**对缓存的影响：** 强制缓存失效，协商缓存失效。

## 五、总结

> 注意，**协商缓存这两个字段都需要配合强制缓存中 Cache-control 字段来使用，只有在未能命中强制缓存的时候，才能发起带有协商缓存字段的请求**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/161f44b55ee44001af39925df5838c22.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5LiO5a6H5a6Z5a-56KeG,size_20,color_FFFFFF,t_70,g_se,x_16)

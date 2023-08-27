# 滚动条样式修改

## 前言

浏览器中的滚动条样式大家一定都不陌生，其样式并不好康。可能很多小伙伴还不知道，这个东东的样式也可以修改（仅支持部分现代浏览器），本次就来带大家用 `CSS` 修改一下它的样式。

## 一、认识滚动条

首先我们先来简单看一下滚动条是由哪几部分组成的：

![滚动条的组成.png](https://img-blog.csdnimg.cn/img_convert/4fe82c5fcace7db02ab9cbb7e4fcc55f.png)

当横向和纵向都有滚动条时，还会有一个交汇的部分（见下图），但是因为一般网页开发中都不会让横向出现滚动条（因为影响美观），所以这个小方块出现的频率不算太高。下图为同时有垂直滚动条和水平滚动条时交汇的部分：

![当同时有垂直滚动条和水平滚动条时交汇的部分.png](https://img-blog.csdnimg.cn/img_convert/5590fe410561285d2a0c5a1f8f875b80.png)

## 二、解决方案

### CSS伪类

目前我们可以通过 CSS伪类 来实现滚动条的样式修改，以下为修改滚动条样式用到的CSS伪类：

* ::-webkit-scrollbar — 整个滚动条
* ::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头)
* ::-webkit-scrollbar-thumb — 滚动条上的滚动滑块
* ::-webkit-scrollbar-track — 滚动条轨道
* ::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分
* ::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分
* ::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮)

此处附上MDN文档传送门：<https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar>

### 兼容性问题

当然这种解决方案还存在一定的兼容性问题，仅仅在支持WebKit的浏览器 (例如, 谷歌Chrome, 苹果Safari)可以使用。其实一看到 -webkit- 前缀就能明白它是 CSS3 中的 私有属性前缀 ，特定前缀是为了适配特定浏览器内核的。我们前往Can I use对其兼容性一探究竟：
![“::-webkit-scrollbar”属性兼容性.png](https://img-blog.csdnimg.cn/img_convert/7705cd7a7a7c6bf872824ef032fd41ac.png)

由上图我们可以看到，兼容性并不算太好，不过我们也不用过于在意，毕竟我们只是规则的使用者而非制定者。

## 三、进行测试

### 1. 整个滚动条

我们一条属性一条属性来进行测试，首先使用 `::-webkit-scrollbar` 。先改变一下它的宽度，测试一下效果：

```css
/* 整个滚动条 */
/* 宽高分别对应纵向滚动条和横向滚动条的宽度 */
::-webkit-scrollbar {
    width: 50px;
}
```

![滚动条样式修改测试-1.gif](https://img-blog.csdnimg.cn/img_convert/5ba2b4f132fad2ab515b22271dbe6132.gif)

我们可以看到，滚动条似乎“消失”了，但是仍然能靠鼠标拖动来滚动页面。我们再给它加一个背景色康康效果：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 50px;
    background-color: skyblue;
}
```

![滚动条样式修改测试-2.png](https://img-blog.csdnimg.cn/img_convert/dc35be0999f28c8ae9ab29c5b3fb7322.png)

增加背景颜色后，滚动条又“出现”了。结合刚才的代码我们不难看出：设置 `::-webkit-scrollbar` 属性会使滚动条默认样式失效。既然如此，我们就必须结合其他属性一起使用。

### 2. 滚动条上的箭头按钮

我们来使用一下 `::-webkit-scrollbar-button` 属性，发现当此属性单独使用时无任何效果：

```css
/* 滚动条上的箭头按钮 */
::-webkit-scrollbar-button {
    background-color: slateblue;
}
```

![滚动条样式修改测试-3.png](https://img-blog.csdnimg.cn/img_convert/1299e42b72f875fdd79a6535348f0e13.png)

于是乎我们加上之前的代码再试试：

![滚动条样式修改测试-4.png](https://img-blog.csdnimg.cn/img_convert/539eeedeec4b2e2c0380224287f50429.png)

我们可以看出，两个箭头的按钮位置的背景颜色发生了变化。看来，滚动条的其他伪类属性需要配合第一步中的 `::-webkit-scrollbar` 才能生效。

### 3. 滚动条上的滚动滑块

我们用 `::-webkit-scrollbar-thumb` 来改变滚动条中滑块的样式：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 50px;
    background-color: skyblue;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: orange;
}
```

![滚动条样式修改测试-5.gif](https://img-blog.csdnimg.cn/img_convert/c14c7ccf3d2167ded3546b219ec965c4.gif)

### 4. 滚动条轨道

用 `::-webkit-scrollbar-track` 属性修改滚动条轨道样式：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 50px;
    background-color: skyblue;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: orange;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: hotpink;
}
```

![滚动条样式修改测试-6.png](https://img-blog.csdnimg.cn/img_convert/7b3ba2f0db55510579d6b8117b94913b.png)

通过效果图我们可以发现，设置的滚动条轨道背景色遮住了设置的整个滚动条的背景色（天蓝）。那是否可以实现两种背景色里外嵌套的效果呢，目前做出了几种尝试都没有效果，只能暂时放弃，以下为经测试未实现嵌套背景色效果代码：

```css
/* 未实现背景色嵌套效果代码 */
::-webkit-scrollbar {
    /* 无法通过 padding 实现 */
    padding: 4px;
    width: 50px;
    background-color: skyblue;
    box-sizing: border-box;
}

::-webkit-scrollbar-track {
    /* 无法通过调整宽度实现 */
    width: 80%;
    background-color: hotpink;
}
```

既然如此，我们如果需要调整滚动条的背景颜色，只需要在 `::-webkit-scrollbar` 和 `::-webkit-scrollbar-track` 中任选其一即可。

### 5. 滚动条没有滑块的轨道部分

这次我们同时设置 `::-webkit-scrollbar-track` 和 `::-webkit-scrollbar-track-piece` 来看效果：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 50px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: orange;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: hotpink;
}

/* 滚动条没有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
    background-color: purple;
}
```

![滚动条样式修改测试-7.png](https://img-blog.csdnimg.cn/img_convert/7ea23c087c1872e9cf305dfab84c7f96.png)

上述代码符合预期效果，但是我给滑块设置透明的背景色（transparent）则会全是 `purple` 颜色，也不会出现滑块底部呈现 `pink` 颜色。所以，如果要改背景色还是选择轨道来修改吧。

### 6. 测试总结

1. 设置 ::-webkit-scrollbar 属性会使滚动条默认样式失效
2. 其他修改滚动条样式的私有属性需要配合 ::-webkit-scrollbar 属性使用
3. 如果要设置滚动条背景色， ::-webkit-scrollbar 、 ::-webkit-scrollbar-track 、 ::-webkit-scrollbar-track-piece 三个属性设置一个即可。

## 四、开始换装

### 1. 纯色系滚动条

在研究过滚动条修改的 `CSS` 属性后我们终于可以开始动工了，先来仿照[Element](https://element.eleme.cn/#/zh-CN)中的滚动条样式，修改一个纯色系滚动条：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 10px;
    /* 对应横向滚动条的宽度 */
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}
```

![滚动条样式修改测试-8.gif](https://img-blog.csdnimg.cn/img_convert/4164ee75a6ec04eb176c59e1aac1cfb5.gif)

效果还不错，比默认的样式要好上不少。此处使用蓝色，实际开发中可以使用项目的主题色作为滚动条的配色参考。

### 2. 花纹系滚动条

我们可以利用 `background-image` 这一属性来实现滚动条的花纹效果（此处效果非本人原创），直接上代码：

```css
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    /* 关键代码 */
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.4) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 75%,
            transparent);
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}
```

![滚动条样式修改测试-9.gif](https://img-blog.csdnimg.cn/img_convert/c46e7028a147dbfda8a4d585ce6ad1f3.gif)

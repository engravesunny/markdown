# 关于CSS

## px和em区别

- px:绝对单位，但同时具有一定的相对性，因为在同一设备上，每个像素代表的物理长度是固定不变的，在不同设备上每个像素代表的物理长度是变化的，是相对于屏幕的分辨率而言的
- em:相对单位，相对于父元素的字体大小，比如父元素font-size为80px，那子元素1em=80px，0.5em=40px

## vw，vh

vw,vh是CSS3的新单位，具体大小是相对于视口大小而言的，1vw式可视窗口宽度的百分之一，1vh是可视窗口高度的百分之一

## BFC的介绍及其应用

块级格式化上下文，是指一个独立的布局环境，BFC内部的元素布局与外部互不影响

**触发BFC的方式有很多，常见的有**：

- 正常流中的块级盒子
- 根元素，body
- 元素上设置浮动：float不是none
- 元素设置绝对定位： position: absolute 或 fixed
- display设为inline-block，table-cell，flex等等或者flow-root（非块盒子的的快容器）
- overflow: scroll , auto , hidden等

- MDN中其他补充（对非块盒子的快容器的补充）
  
  - contain属性为layout，content，或paint的元素
  - 弹性项，display属性为flex或者inline-flex的元素的直接子元素，如果他们本身并非flex或grid或table容器
  - 网格项，display属性为grid或inline-grid的元素的直接子元素，如果他们本身并非flex或grid或table容器
  - 多列容器：column-count或column-width属性不为auto的元素，包括设置column-count:1的元素，column-span:all元素应始终创建新的格式化上下文，即使其不包含在多列容器中

**BFC特点**：

- 垂直方向自上而下排列
- BFC中两个容器的margin会重叠（取较大的一边）
- 计算BFC高度时，计算浮动元素高度（解决高度塌陷）
- BFC不会与浮动元素发生重叠
- 每个盒子的左外缘与包含块的左缘相接（对于自右向左的格式，则是右缘相接）。即使在浮动情况下也是如此（尽管盒子的行盒子可能因浮动而缩小），除非该盒子建立了新的块格式化上下文（在这种情况下，盒子自身可能会因浮动而变窄）

**应用场景**：

至此，就大致了解了BFC是什么，其触发形成机制，以及其内部的布局规则。

但通常情况下我们不会仅仅为了更改布局去创建新的BFC，而是为了解决特定的问题来创建BFC，比如定位和清除浮动，因为建立了新BFC的容器将可以：

- 包含内部浮动元素（也就是浮动元素不会溢出容器之外）解决高度塌陷
- 排除外部浮动元素（利用BFC不会与同级浮动区域重叠的规则）
- 抑制margin折叠（通过在BFC的内部创建新的BFC使得其中相邻盒子的margin不发生折叠）

**其他格式化上下文**：

- IFC：行内格式化上下文，将一块区域以行内元素的形式来格式化。
- GFC：网格布局格式化上下文，将一块区域以 grid 网格的形式来格式化
- FFC：弹性格式化上下文，将一块区域以弹性盒的形式来格式化

## flex布局如何使用

flex是flexible box的缩写，意为“弹性布局”。指定容器display：flex即可。

容器有以下属性：flex-direction，flex-wrap，flex-flow，justify-content，align-items，align-content。

- flex-direction属性决定主轴的方向；
- flex-wrap属性一条轴上放不下时如何换行
- flex-flow是flex-direction和flex-wrap的简写形式默认值为row nowrap；
- justify-content主轴上的对齐方式
- align-items交叉轴上的对齐方式
- align-content多根轴线的对齐方式

子元素（弹性项）也有一些属性：order，flex-grow，flex-shrink，flex-basis，flex，align-self

- order定义项目的排列顺序，数值越小排列越靠前，默认为0
- flex-grow定义项目的放大比例系数，默认为0，即如果存在有剩余空间也不放大
- > 剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。
- flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
- flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

## CSS优先级？？

- 1. 权重计算公式
  - 关于css权重我们需要一套权重计算公式
  - 选择器|---------------------------------|权重
  - 继承或者通配符*，后代选择器|--------------|0,0,0,0
  - 标签选择器，伪元素选择器|-----------------|0,0,0,1
  - 类，伪类，属性（a[ref="eee"]）选择器|-----|0,0,1,0
  - id选择器|-------------------------------|0,1,0,0
  - 行内样式style=""|------------------------|1,0,0,0
  - !important|-----------------------------| ∞无穷大
- 2. 权重叠加
  - 我们经常用交集选择器，后代选择器等，是有多个基础选择器组合而成，那么此时，就会出现权重叠加。就是一个简单的加法计算  
  - > div ul li ----------> 0,0,0,3
  - > .nav ul li ---------> 0,0,1,2
  - > a:hover ------------> 0,0,0,1
  - > .nav a -------------> 0,0,1,1

**注意**：

数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以**不会存在10个div能赶上一个类选择器的情况**

## 分析比较opacity,visibility,display:none

- 结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

- 继承： display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

- 性能： display:none : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少

## 文本溢出省略，考虑兼容

- 单行

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

- 多行

```css
display: -webkit-box;
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; // 行数
```

- 考虑兼容

```css
p {
    position: relative;
    line-height:20px;
    max-height: 40px;
    overflow: hidden;
    p::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 40px;
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%);
    }
}
```

- js实现方式

使用split + 正则表达式将单词与单个文字切割出来存入words
加上"..."
判断scrollHeight与clientHeight，超出的话就从words中pop出来

## 为什么使用transform而不是用marginLeft/Top

transform属于合成属性，对合成属性进行transition/animation动画蒋川见一个合成层，这使得这个动画在独立的一层中进行动画。通常情况下，浏览器会将一个层的内容先绘制进一个绘图中，然后再作为纹理（texture）上传到 GPU，只要该层的内容不发生改变，就没必要进行重绘（repaint），浏览器会通过重新复合（recomposite）来形成一个新的帧。

top/left属于布局属性，该属性的变化会导致重排（reflow/relayout），所谓重排即指对这些节点以及受这些节点影响的其它节点，进行CSS计算->布局->重绘过程，浏览器需要为整个层进行重绘并重新上传到 GPU，造成了极大的性能开销。

## 粘滞布局(sticky)

position 中的 sticky 值是 CSS3 新增的，设置了 sticky 值后，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是top、left等属性无效），当该元素的位置将要移出偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果。
sticky 属性值有以下几个特点：

- 该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
- 当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动。
- 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量

## CSS画三角

可以利用 border 属性
利用盒模型的 border 属性上下左右边框交界处会呈现出平滑的斜线这个特点，通过设置不同的上下左右边框宽度或者颜色即可得到三角形或者梯形。
如果想实现其中的任一个三角形，把其他方向上的 border-color 都设置成透明即可。

## 清除浮动

因为父级盒子很多情况下，不方便给高度，但是子盒子浮动就不占有位置，最后父级盒子高度为0，就影响了下面的标准流盒子。
准确地说，并不是清除浮动，而是清除浮动后造成的影响

- clear清除浮动 在浮动元素下方添加空元素给该元素写css样式：`{clear:both;height:0;overflow:hidden;}`
- 给浮动元素父级添加高度
- 给父级添加浮动（父级同级元素添加浮动）
- 父级添加overflow:hidden;或者display:flow-root;
- ::after伪元素清除浮动::after{content:"";display:block;height:0;clear:both;visibility:hidden;}
- 双伪元素清除浮动::before{content:"";display:table;}::after{clear:both;}

## 盒模型

盒模型也称为框模型，就是从盒子顶部俯视所得的一张平面图，用于描述元素所占用的空间。它有两种盒模型，W3C盒模型和IE盒模型（IE6以下，不包括IE6以及怪异模式下的IE5.5+）
理论上两者的主要区别是二者的盒子宽高是否包括元素的边框和内边距。当用CSS给给某个元素定义高或宽时，IE盒模型中内容的宽或高将会包含内边距和边框，而W3C盒模型并不会。

## 如何触发重排和重绘

- 添加删除更新DOM结点
- display:none隐藏一个DOM结点
- visibility:hidden;只触发重绘
- 移动或者给页面中的DOM添加动画
- 添加一个样式表，调整样式属性
- 用户行为：调整窗口大小，改变字号，滚动

## 重排重绘区别

- **重排:**  部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算，表现为重新生成布局，重新排列元素

- **重绘:**  由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新，表现为某些元素的外观被改变
  
单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分

重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。

『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。

## 优化图片

- 对于很多装饰类图片，尽量不用图片，因为这类修饰图片完全可以用 CSS 去代替。

- 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。

- 小图使用 base64 格式

- 将多个图标文件整合到一张图片中（雪碧图）

- 选择正确的图片格式：

- 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
- 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
照片使用 JPEG

## 元素水平垂直居中

1. position + margin:auto
2. position + margin:负值
3. position + transform
4. flex布局
5. grid布局

1. position + margin:auto

```css
.father{
    width:500px;
    height:300px;
    border:1px solid #0a3b98;
    position: relative;
}
.son{
    width:100px;
    height:40px;
    background: #f0a238;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    }
```

父级设置为相对定位，子级绝对定位 ，并且四个定位属性的值都设置了0，那么这时候如果子级没有设置宽高，则会被拉开到和父级一样宽高

这里子元素设置了宽高，所以宽高会按照我们的设置来显示，但是实际上子级的虚拟占位已经撑满了整个父级，这时候再给它一个margin：auto它就可以上下左右都居中了

2. position + margin:负值

```css
  .father {
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-50px;
    margin-top:-50px;
    width: 100px;
    height: 100px;
    background: red;
}
```

这种方案不要求父元素的高度，也就是即使父元素的高度变化了，仍然可以保持在父元素的垂直居中位置，水平方向上是一样的操作

但是该方案需要知道子元素自身的宽高，但是我们可以通过下面transform属性进行移动

3. position + transform

```css
 .father {
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100px;
    height: 100px;
    background: red;
}
```

translate(-50%, -50%)将会将元素位移自己宽度和高度的-50%

这种方法其实和最上面被否定掉的margin负值用法一样，可以说是margin负值的替代方案，并不需要知道自身元素的宽高

4. flex,grid:justify-content:center,align-items:center简单粗暴

## 两栏布局，三栏布局

1. 两栏布局
   - float+margin-left:负值，父级添加BFC防止下方元素飞到上方来

    ```css
    .box{
        overflow: hidden; 添加BFC
    }
    .left {
        float: left;
        width: 200px;
        background-color: gray;
        height: 400px;
    }
    .right {
        margin-left: 210px;
        background-color: lightgray;
        height: 200px;
    }
    ```

    - flex弹性布局(简单粗暴)

    ```css
    .box{
        display: flex;
    }
    .left {
        width: 100px;
    }
    .right {
        flex: 1;
    }
    ```

2. 三栏布局

    - 两边使用float中间使用margin

     ```css
    .wrap {
        background:#eee;
        overflow: hidden; <!-- 生成BFC，计算高度时考虑浮动的元素 -->
        padding: 20px;
        height: 200px;
    }
    .left {
        width: 200px;
        height: 200px;
        float: left;
        background:coral;
    }
    .right {
        width: 120px;
        height: 200px;
        float: right;
        background: lightblue;
    }
    .middle {
        margin-left: 220px;
        height: 200px;
        background: lightpink;
        margin-right: 140px;
    }
    ```

    ```html
    <div class="wrap">
        <div class="left">左侧</div>
        <div class="right">右侧</div>
        <div class="middle">中间</div>
    </div>
    ```

    主体内容是最后加载的。
    右边在主体内容之前，如果是响应式设计，不能简单的换行展示
    - 两边absolute,中间margin

     ```css
       .container {
            position: relative;
        }

        .left,
        .right,
        .main {
            height: 200px;
            line-height: 200px;
            text-align: center;
        }

        .left {
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            background: green;
        }

        .right {
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            background: green;
        }

        .main {
            margin: 0 110px;
            background: black;
            color: white;
        }
    ```

    ```html
    <div class="left">左边固定宽度</div>
    <div class="right">右边固定宽度</div>
    <div class="main">中间自适应</div>
    ```

    - 两边float和负margin

     ```css
        .left,
        .right,
        .main {
            height: 200px;
            line-height: 200px;
            text-align: center;
        }

        .main-wrapper {
            float: left;
            width: 100%;
        }

        .main {
            margin: 0 110px;
            background: 
        black;
            color: 
        white;
        }

        .left,
        .right {
            float: left;
            width: 100px;
            margin-left: -100%;
            background: 
        green;
        }

        .right {
            margin-left: -100px; /* 同自身宽度 */
        }
    ```

    增加了 .main-wrapper 一层，结构变复杂
    使用负 margin，调试也相对麻烦

    - flex，grid
   flex:两边固定中间flex:1,justify-content:space-between
   grid:设置grid-template-columns: `xxx`px auto `xxx`px

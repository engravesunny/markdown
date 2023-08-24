# ES6新特性

## 一、ES6中数组新增了哪些扩展？

![es6之数组](https://static.vue-js.com/a156b8d0-53c5-11eb-85f6-6fac77c0c9b3.png)

### 1.Rest参数与Spread语法

在JavaScript中，很多内建函数都支持传入任意数量的参数

例如：

- Math.max(arg1, arg2, arg3, ..., argN)——返回参数中的最大值。
- Object.assign(dest, src12, ..., srcN)——依次将属性从src1..N复制到dest。
- ......等。

#### Rest参数`...`

在JavaScript中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。

例如：

```javascript
function sum(a, b) {
    return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

虽然这里这个函数不会因为传入过多的参数而报错。但是，当然，只有前两个参数被求和了。

我们可以在函数定义中声明一个数组来收集参数。语法是这样的：...变量名，这将会声明一个数组并指定其名称，其中有剩余的参数。这三个点的语义就是“收集剩余的参数并存进指定数组中”。

例如，我们需要把所有的参数都放到数组args中：

```js
function sumAll(...args) {
    let sum = 0;
    for (let arg of args) {
        sum += arg;
    }
    return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6

```

我们也可以选择奖第一个参数获取为变量，并将剩余的参数收集起来

下面的例子把前两个参数获取为变量，并把剩余的参数收集到`titles`数组中。

```javascript
function showName(firstName, secondName, ...titles) {
    alert('First name: ' + firstName, 'second name: ' + secondName); // Julius Caesar

    alert( titles[0] ); // Consul
    alert( titles[1] ); // Imperator
    alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

**Rest参数必须放到参数列表的末尾**。

Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误：

```javascript
function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
  // error
}
```

`...rest` 必须写在参数列表最后。

#### arguments变量

有一个名为 `arguments` 的特殊类数组对象可以在函数中被访问，该对象以参数在参数列表中的索引作为键，存储所有参数。

例如：

```javascript
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

// 依次显示：2，Julius，Caesar
showName("Julius", "Caesar");

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName("Ilya");
```

在过去，JavaScript 中不支持 rest 参数语法，而使用 `arguments` 是获取函数所有参数的唯一方法。现在它仍然有效，我们可以在一些老代码里找到它。

但缺点是，尽管 `arguments` 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 `arguments.map(...)` 等方法。

此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取参数的一部分。

因此，当我们需要这些功能时，最好使用 rest 参数。

**箭头函数没有 `arguments`**.

如果我们在箭头函数中访问 `arguments`, 访问到的`arguments` 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

举个例子：

```javascript
function f() {
    let showArg = () => {
        alert( arguments[0] );
    }
    showArg();
}

f(1); // 1
```

箭头函数没有自身的 **`this`**，也没有特殊的 **`arguments` 对象**。

### Spead语法

我们刚刚看到如何从参数列表中获取数组。

有时候我们也需要做与之相反的事。

例如，内建函数 [Math.max](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 会返回参数中最大的值：

```js
alert( Math.max(3, 5, 1) ); // 5
```

如果我们有一个数组 `[3, 5, 1]` 我们该如何调用`Math.max`呢？

直接“原样”传入这个数组是不会奏效的，因为 `Math.max` 期望的是列表形式的数值型参数，而不是一个数组：

```javascript
let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN
```

毫无疑问，我们不能手动地去一一设置参数 `Math.max(arg[0], arg[1], arg[2])`，因为我们不确定这儿有多少个。在代码执行时，参数数组中可能有很多个元素，也可能一个都没有。而且，这样的代码也很不优雅。

**Spread 语法** 可以解决这个问题！它看起来和 rest 参数很像，也使用 `...`，但是二者的用途完全相反。

当在函数中调用到使用`...arr` 时，他会把可迭代对象`arr`“展开”到参数列表中。

以`Math,max`为例：

```js
let arr = [3, 5, 1];

alert( Math.max( ...arr) ); // 5
```

我们还可以通过这种方式传入多个可迭代对象：

```javascript
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

我们甚至还可以将 `spread` 语法与常规值结合使用：

```javascript
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

并且，我们还可以使用 `spread` 语法来合并数组：

```javascript
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）
```

在上面的示例中，我们使用数组展示了 `spread` 语法，其实我们可以用 `spread` 语法这样操作任何**可迭代对象**。

例如，在这儿我们使用 `spread` 语法将字符串转换为字符数组：

```javascript
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Spread 语法内部使用迭代器来收集元素，与"for .. of" 方式相同。

因此对于一个字符串，`for .. of`会逐个返回该字符串中的字符，`...str`也同理会得到`"H","e","l","l","o"`这样的结果。随后，字符串列表传递给数组初始化容器`[...str]`。

对于这个特定任务我们还可以使用`Array.from`来实现，该方法会讲一个可迭代对象（如字符串）转换为数组：

```javascript
let str = "Hello";

alert(Array.from(str)); // H,e,l,l,o
```

运行结果与 `[...str]` 相同。

不过 `Array.from(obj)` 和 `[...obj]` 存在一个细微的差别：

- **`Array.from`** 适用于**类数组对象**也适用于**可迭代对象**。
- **Spread 语法只适用于可迭代对象**。

因此，对于将一些“东西”转换为数组的任务，`Array.from` 往往更通用。

### 复制 array/object

还记得 [Object.assign()](https://zh.javascript.info/object-copy#ke-long-yu-he-bing-objectassign) 吗？

使用spread语法也可以做到同样的事情（也就是进行浅拷贝）。

```javascript
let arr = [1, 2, 3];

let arrCopy = [...arr];

// 两个数组中的内容相同吗？
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// 两个数组相等吗？
alert(arr === arrCopy); // false（它们的引用是不同的）

// 修改我们初始的数组不会修改副本：
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

并且，也可以通过相同的方式来复制一个对象：

```js
let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj };

// 两个对象中的内容相同吗？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 两个对象相等吗？
alert(obj === objCopy); // false (not same reference)

// 修改我们初始的对象不会修改副本：
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

这种方式比使用 `let arrCopy = Object.assign([], arr)` 复制数组，或使用 `let objCopy = Object.assign({}, obj)` 复制对象来说更为简便。因此，只要情况允许，我们倾向于使用它。

### 总结

当我们在代码中看到 `"..."` 时，它要么是 rest 参数，要么是 spread 语法。

有一个简单的方法可以区分它们：

- 若 `...` 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
- 若 `...` 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。

使用场景：

- Rest 参数用于创建可接受任意数量参数的函数。
- Spread 语法用于将数组传递给通常需要含有许多参数的函数。

我们可以使用这两种语法轻松地互相转换列表与参数数组。

旧式的 `arguments`（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。

### 构造函数新增的方法

关于构造函数，数组新增的方法有如下：

- Array.from()
- Array.of()

#### Array.from

将两类对象转换为真真的数组：类似数组的对象和可比遍历（iterable）的对象（包括es6新增的Set 和 Map）

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
Array.from([1, 2, 3], (x) => x*x); // [1, 4, 9]
```

#### Array.of()

用于将一组值，转换为数组

```js
Array.of(3, 11, 8) // [3, 11, 8]
```

`Array()`构造函数在参数为一个数值参数时，这个参数实际上指定的是数组的长度，而在使用一个以上数值参数时，这些参数则会成为新数组的元素。这意味着`Array()`构造函数无法创建一个数值元素的数组

在ES6中，`Array.of()`函数可以解决这个该问题。这是一个工厂方法，可以使用其参数值作为数组元素上来创建并返回新数组。

```js
Array.of() // => []; 返回没有参数的空数组
Array.of(10) // => [10]; 可以创建只用一个数值元素的数组
Array.of(1,2,3) // => [1,2,3];
```

### 实例对象新增的方法

关于数组实例对象新增的方法有下：

- copyWith()
- find() findIndex()
- fill()
- entries() keys() values()
- includes()
- flat() flatMap()

#### copyWith()

将指定位置的成员复制到其他位置(会覆盖原有的成员)，然后返回当前数组。

参数如下：

- target（必需）: 从该位置开始替换数据。如果为负，表示倒数。
- start（可选）：从该位置开始读取数据，默认为0.如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
// [4, 5, 3, 4, 5] 
```

#### find()、findIndex()

`find()`用于找出第一个符合条件的数组成员

参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

`findIndex`返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

```js
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

#### fill()

使用给定值，填充一个数组

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

还可以接受**第二个和第三个参数**，用于指定填充的**起始位置和结束位置**

```js
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

注意，如果填充的类型为**对象**，则是**浅拷贝**

#### entries()，keys()，values()

`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

```js
or (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
```

#### includes()

用于判断数组是否包含给定的值

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

方法的第二个参数表示搜索的起始位置，默认为`0`

参数为负数则表示倒数的位置

```js
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

#### flat()，flatMap()

将数组扁平化处理，返回一个新数组，**对原数据没有影响**

```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1

```js
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
```

`flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

`flatMap()`方法还可以有第二个参数，用来绑定遍历函数里面的this

### 四、数组的空位

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为`undefined`，包括`Array.from`、扩展运算符、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

建议大家在日常书写中，避免出现空位

### 五、排序稳定性

将`sort()`默认设置为稳定的排序算法

```js
const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
```

排序结果中，`straw`在`spork`的前面，跟原始顺序一致

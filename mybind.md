
## **Function.prototype.bind**

> **`bind()`** 方法创建一个新的函数, 当被调用时，将其 `this` 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
> 语法：
> fun.bind(thisArg[, arg1[, arg2[, ...]]])
> 参数：
> `thisArg`：当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 调用绑定函数时，该参数无效。
> `arg1, arg2, ...`：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
> 返回值：
> 返回由指定的 `this` 值和初始化参数改造的原函数拷贝

从上面的定义来看，`bind` 函数有哪些功能：

* 改变原函数的 `this` 指向，即绑定 `this`
* 返回原函数的拷贝
* 注意，还有一点，当 `new` 调用绑定函数的时候，`thisArg` 参数无效。也就是 `new` 操作符修改 `this` 指向的优先级更高


test my code:

```js
let fn = function () {
  console.log(this) ;
}
let obj2 = {
  a: 2 ,
} ;
let newfn = fn.mybind(obj2) ; 
console.log(newfn)
// () => {
//     // this 是目标函数
//     this.apply(thisToBind, Array.from(args).concat(Array.from(arguments))) ; //利用apply将this指向thisToBind，参数进行拼接
//   }
newfn(obj2) ; //{a: 2}
```

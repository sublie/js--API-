### 1.resolve 与 reject

```javascript
let p1 = new Promise((resolve, reject) => {
    resolve('成功')
    reject('失败')
})
console.log('p1', p1)

let p2 = new Promise((resolve, reject) => {
    reject('失败')
    resolve('成功')
})
console.log('p2', p2)

let p3 = new Promise((resolve, reject) => {
    throw('报错')
})
console.log('p3', p3)

```

这里暴露出了四个知识点：

* 1、执行了 `resolve`，Promise状态会变成 `fulfilled`
* 2、执行了 `reject`，Promise状态会变成 `rejected`
* 3、Promise只以 `第一次为准`，第一次成功就 `永久`为 `fulfilled`，第一次失败就永远状态为 `rejected`
* 4、Promise中有 `throw`的话，就相当于执行了 `reject`
  那么咱们就把这四个知识点一步步实现吧！！！

test my code：

```javascript
const test1 = new Mypromise((resolve, reject) => {
    resolve('成功')
})
console.log(test1) // Mypromise {result: '成功', state: 'fulfilled'}

const test2 = new Mypromise((resolve, reject) => {
    reject('失败')
})
console.log(test2) // Mypromise {result: '', state: 'pending'}
```

### 2. 状态不可变

easy：你要改变 state的时候加个条件判断就可

test my code：

```javascript
const test1 = new Mypromise((resolve, reject) => {
    // 只以第一次为准
    resolve('成功')
    reject('失败')
})
console.log(test1) // Mypromise {result: '失败', state: 'fulfilled'}

```

### 3. throw

`throw` 等效于 构造函数的回调函数 ` constructor(excutor)` 。做个error拦截处理器就ok了

```javascript
try {
      excutor(this.resolve,this.reject);
    } catch (error) {
      reject(error);
    }
```

test my code：

```javascript
const test3 = new Mypromise((resolve, reject) => {
    throw('失败')
})
console.log(test3) // Mypromise {result: '失败', state: 'rejected'}
```

### 4. then

```javascript
咱们平时使用then方法是这么用的：
// 马上输出 ”成功“
const p1 = new Promise((resolve, reject) => {
    resolve('成功')
}).then(res => console.log(res), err => console.log(err))

// 1秒后输出 ”失败“
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('失败')
    }, 1000)
}).then(res => console.log(res), err => console.log(err))

// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
    resolve(100)
}).then(res => 2 * res, err => console.log(err))
  .then(res => console.log(res), err => console.log(err))

```

可以总结出这几个知识点：

* then接收两个回调，一个是 `成功回调`，一个是 `失败回调`
* 当Promise状态为 `fulfilled`执行 `成功回调`，为 `rejected`执行 `失败回调`
* 如resolve或reject在定时器里，`则定时器结束后再执行then`
* then支持 `链式调用`，下一次then执行 `受上一次then返回值的影响` note

#### 1. 实现then

base case：默认 `new Mypromise` 后就执行 `then` 函数，根据 `state` 来执行 成功回调还是失败回调（Function）。

```javascript
hen(onFulfilled,onRejected) {
    if (onFulfilled) {
      if (this.state === 'fulfilled') {
        onFulfilled(this.result);
      }
    }
    if (onRejected) {
      this.state === 'rejected' && onRejected(this.result);
    }
    if (this.state === 'pending') { 
      onFulfilled && this.onFulfilledList.push(onFulfilled);
      onRejected && this.onRejectedList.push(onRejected);
    }
  }
```

test my code：

```javascript
const test = new Mypromise((resolve, reject) => {
    resolve('成功')
}).then(res => console.log(res), err => console.log(err)) // 输出 ”成功“
```

#### 2. 定时器效果

base case：回调函数（我说的回调函数指的是构造函数中的回调，以后没特殊说明既是）中有定时器情况。

定时器函数不是有JS主线程控制的，他有特定的定时器进程（正式名称咋叫我没了解😓），所以主进程会同步执行 `then` 函数，可以暂时保存 then里面的回调函数，再交给定时器的回调函数同步执行。

```js
initValue() {
    this.result = '';
    this.state = 'pending';
    this.__proto__.onFulfilledList = [];
    this.__proto__.onRejectedList = [];
  }

  resolve(value) {
    this.result = value;
    this.state == 'pending' && (this.state = 'fulfilled');
    this.onFulfilledList.forEach(item=>item(this.result));
  }

  reject(value) {
    this.result = value;
    this.state == 'pending' && (this.state = 'rejected');
    this.onRejectedList.forEach(item=>item(this.result));
  }

  then(onFulfilled,onRejected) {
    if (onFulfilled) {
      if (this.state === 'fulfilled') {
        onFulfilled(this.result);
      }
    }
    if (onRejected) {
      this.state === 'rejected' && onRejected(this.result);
    }
    if (this.state === 'pending') { 
      onFulfilled && this.onFulfilledList.push(onFulfilled);
      onRejected && this.onRejectedList.push(onRejected);
    }
  }
```

test my code:

```js
const test2 = new Mypromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功') // 1秒后输出 成功
    }, 1000)
}).then(res => console.log(res), err => console.log(err))
```

#### 3. 链式调用

base case： 默认then方法的回调参数都是函数。

* 1、then方法本身会返回一个新的Promise对象
* 2、如果返回值是promise对象，返回值为成功，新promise就是成功
* 3、如果返回值是promise对象，返回值为失败，新promise就是失败
* 4、如果返回值非promise对象，新promise对象就是成功，值为此返回值

class Mypromise {
  constructor(excutor) {
    // console.log(this.__proto__); // {constructor: ƒ, showKeys: ƒ, initValue: ƒ, initBind: ƒ, resolve: ƒ, …}
    // this.showKeys(); // null
    this.initValue();
    // this.showKeys(); // mypromise:12 result
                        // mypromise:12 state
                        // mypromise:12 onFulfilledList
                        // mypromise:12 onRejectedList
    this.initBind();
  
    // 创建时需要一个函数，否则会报错
    if (!excutor instanceof Function) {
      throw new Error("请传入一个函数");
    }
    try {
      excutor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  all (list) {
    if (list === null || !list[Symbol.iterator])
        throw new Error("the param expected a iterator object!!!")
    // 获取 result 的状态
    let res, rej ;
    let result = new Mypromise((resolve, reject) => {
        res = resolve ;
        rej = reject ;
    }) ;
    // 设置 result 的状态
    let count = 0 ; //数量 也是list中参数的索引
    let fulfilledCount = 0 ; // 完成的数量
    let p = [] ; // 储存每个promise的返回值
    for (const promise of list) {
        const i = count ;
        count++ ;
        new Mypromise((resolve, reject) => {
            console.log(promise instanceof Mypromise, promise.state === 'rejected');
            if (promise instanceof Mypromise && promise.state === 'rejected')
                reject(promise) ;
            resolve(promise) ;
        }).then((data) => {
            // 将成功的数据汇总到 result
            p[i] = data ;
            // 判断是不是全部成功
            fulfilledCount++ ;
            console.log(fulfilledCount);
            if (fulfilledCount === count) 
                res(p) ;
        }, (data) => {
            // 将失败的数据汇总到 result
            p[i] = data ;
            rej(p) ;
        }) ;
    }
    if (count === 0)
        res(p) ;
    return result ;
  }
  // 展示调用对象的键名
  showKeys() {
    for (let key in this) {
      console.log(key);
    }
  }
  // 绑定resolve和reject的this
  initBind() {
    // 如果这里不强制指定resolve和reject的this的话，[[直接调用]]这两个函数会导致this指向window
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  // 初始化Mypromise对象属性值
  initValue() {
    this.result = "";
    this.state = "pending";
    this.__proto__.onFulfilledList = [];
    this.__proto__.onRejectedList = [];
  }

  resolve(value, ...params) {
    // state是不可变的
    if (this.state != "pending") return;
    this.result = value;
    this.state = "fulfilled";
    // 执行保存的失败回调
    this.onFulfilledList.forEach((item) => item(this.result));
  }

  reject(value) {
    // state是不可变的
    if (this.state != "pending") return;
    this.result = value;
    this.state = "rejected";
    // 执行保存的失败回调
    this.onRejectedList.forEach((item) => item(this.result));
  }
  // 判断成功回调和失败回调是否是一个函数
  _isFunction(fn) {
    return typeof fn === "function";
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    var thenPromise = new Mypromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const x = cb(this.result);
          if (x === thenPromise) {
            // 不能返回自身哦
            throw new Error("不能返回自身。。。");
          }
          if (x instanceof Mypromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            x.then(resolve, reject);
          } else {
            // 非Promise就直接成功
            resolve(x);
          }
        } catch (err) {
          // 处理报错
          reject(err);
          throw new Error(err);
        }
      };

      if (this.state === "fulfilled") {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onFulfilled);
      } else if (this.state === "rejected") {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected);
      } else if (this.state === "pending") {
        // 如果状态为待定状态，暂时保存两个回调
        // 如果状态为待定状态，暂时保存两个回调
        this.onFulfilledList.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedList.push(resolvePromise.bind(this, onRejected));
      }
    });

    // 返回这个包装的Promise
    return thenPromise;
  }
  // 根据返回的Mypromise的状态执行相应回调
  // then(onResolved,onRejected) {
  //   debugger;
  //   let state = this.state;
  //   let returnPromise = null;
  //   let nextPromise = new Mypromise ((nextResolve, nextReject) => {
  //     if (state === 'fulfilled' || state === 'pending')
  //       returnPromise = onFulfilled(this.result);
  //     else if (state === 'rejected')
  //       returnPromise = onRejected(this.result);

  //     if (returnPromise instanceof Mypromise) {
  //       // returnPromise.state === 'fulfilled' && nextResolve(this.result);
  //       // returnPromise.state === 'rejected' && nextReject(this.result);

  //       // if (onFulfilled instanceof Function)
  //         returnPromise.then(nextResolve, nextReject);//nextPromise同步成功回调返回的Mypromise的状态
  //       // if (onRejected instanceof Function)
  //         // state === 'rejected' && returnPromise.then(nextResolve,nextReject);
  //     }
  //     else {
  //       nextResolve(returnPromise);
  //     }

  //     if (onFulfilled instanceof Function) {
  //       if (this.state === 'fulfilled') {
  //         onFulfilled(this.result);
  //       }
  //     }
  //     else if (onRejected instanceof Function) {
  //       this.state === 'rejected' && onRejected(this.result);
  //     }
  //     else if (this.state === 'pending') {
  //       onFulfilled instanceof Function && this.onFulfilledList.push(onFulfilled);
  //       onRejected instanceof Function && this.onRejectedList.push(onRejected);
  //     }
  //   })
  //   console.log(i++ + ':　');
  //   console.log(nextPromise);
  //   return nextPromise;
  //   debugger;
  // }
}
var i = 1;
// const test1 = new Mypromise((resolve, reject) => {
//     resolve('成功')
// })
// console.log(test1) // Mypromise {result: '成功', state: 'fulfilled'}

// const test2 = new Mypromise((resolve, reject) => {
//     reject('失败')
// })
// console.log(test2) // Mypromise {result: '', state: 'pending'}

// const test1 = new Mypromise((resolve, reject) => {
//     // 只以第一次为准
//     resolve('成功')
//     reject('失败')
// })
// console.log(test1) // Mypromise {result: '失败', state: 'fulfilled'}

// const test3 = new Mypromise((resolve, reject) => {
//     throw('失败')
// })
// console.log(test3) // Mypromise {result: '失败', state: 'rejected'}

// const test = new Mypromise((resolve, reject) => {
//     resolve('成功')
// }).then(res => console.log(res), err => console.log(err)) // 输出 ”成功“

// const test2 = new Mypromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('成功') // 1秒后输出 成功
//     }, 1000)
// }).then(res => console.log(res), err => console.log(err))

// const test3 = new Mypromise((resolve, reject) => {
//   resolve(100); // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：成功 值：300
// })
//   .then(
//     (res) => 2 * res,
//     (err) => 3 * err
//   )
//   .then(
//     (res) => console.log("成功", res),
//     (err) => console.log("失败", err)
//   );

// const test4 = new Mypromise((resolve, reject) => {
//   resolve(100); // 输出 状态：失败 值：200
//   // reject(100) // 输出 状态：成功 值：300
//   // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
// })
//   .then(
//     (res) => new Mypromise((resolve, reject) => reject(2 * res)),
//     (err) => new Mypromise((resolve, reject) => resolve(3 * err))
//   )
//   .then(
//     (res) => console.log("成功", res),
//     (err) => console.log("失败", err)
//   );


console.log(
    new Mypromise().all([
        new Mypromise((resolve, reject) => {
            reject(99) ;
        }),
        2,
        new Mypromise((resolve, reject) => {
            reject(88) ;
        }),
    ])
) ;
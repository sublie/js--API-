class mypromise {
  constructor(excutor) {
    this.initValue();
    this.initBind();
    excutor(this.resolver,this.rejector);
  }

  initValue() {
    this.value = '';
    this.state = 'pending';
    this.onFulfilledList = [];
    this.onRejectedList = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }    
    
  resolve(value) {
    this.result = value;
    this.state = 'fulfilled';
    this.onFulfilledList.forEach(item=>item(this.result));
  }

  reject(value) {
    this.result = value;
    this.state = 'rejected';
    this.onRejectedList.forEach(item=>item(this.result));
  }

  then(onFulfilled,onRejected) {
    let nextPromise = new mypromise((rs, rj) => {
      if (typeof(this.result) == '')
        rs(this.result);
    }); 

    if (onFulfilled) {
      if (this.state === 'fulfilled') {
        onFulfilled();
      }
    }
    if (onRejected) {
      this.state === 'rejected' && onRejected();
    }
    if (this.state === 'pending') { 
      onFulfilled && this.onFulfilledList.push(onFulfilled);
      onRejected && this.onRejectedList.push(onRejected);
    }
  }
}

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('失败')
    }, 1000)
}).then(res => console.log(res), err => console.log(err))

console.log(p2);
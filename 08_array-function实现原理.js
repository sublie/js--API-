/*
 * @Description: 
 * @Author: huazj
 * @Date: 2022-02-07 14:00:46
 * @LastEditTime: 2022-02-07 15:31:07
 * @LastEditors: huazj
 */

// forEach实现
Array.prototype.myForEach = function(fn, thisArgs) {
    console.log('Array.prototype.myForEach() called with: fn =', fn, 'thisArgs =', thisArgs, 'this =', this);
    if (typeof fn !== 'function') {
        throw 'Error in params';
    }
    const len = this.len;//在遍历的开始就确定遍历次数 对元素增删改查不会影响遍历次数
    // 遍历使用回调 传递参数
    for (let i = 0; i < len; i++) {
        const element = this[i];
        fn.call(thisArgs, element, i, this);
    }
    console.log('Array.prototype.myForEach() return: this =', this);
}

// 使用
const oldArr = [1, 2, 3, 4, 5];

oldArr.myForEach((item, index, arr) => {
    console.log('myForEach', item, index, arr);
})

// filter实现
Array.prototype.myFilter = function(callBack) {
    console.log('Array.prototype.myFilter() called with: acllBack =', callBack);
    const newArr = [];
    // 1.循环
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        // 2.执行回调 满足条件 贴加它
        if (callBack(element)) {
            newArr.push(element);
        }
    }
    console.log('Array.prototype.myFilter() return: newArr =', newArr);
    return newArr;//3.返回新数组
}

// 使用
const oldFilterArr = [1, 2, 3, 4, 5];

const filterNewArr = oldFilterArr.myFilter((ele) => {
    return ele <= 3;
})

console.log('filter 重写', filterNewArr);

// map实现
Array.prototype.myMap = function(callBack) {
    console.log('Array.prototype.myMap() called with: callBack =', callBack, 'this =', this);
    const newArr = [];
    // 1.循环
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        const newEle = callBack(this[i]);
        newArr.push(newEle);
    }
    console.log('Array.prototype.myMap() return: newArr', newArr);
    return newArr;//3.返回新数组
}

const oldMapArr = [1, 2, 3, 4, 5];

const newMapArr = oldMapArr.myMap((ele) => `${ele}元素处理`);

console.log('map 重写', newMapArr);

// reduce 实现原理
Array.prototype.myReduce = function(callBack, pre) {
    console.log('Array.prototype.myReduce() called with: callBack =', callBack, 'pre =', pre, 'this =', this);
    // 1.循环
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        if (pre !== undefined) {
            // 2.传入已有的pre 与 当前循环值 赋值到pre上
            pre = callBack(pre, this[i], i, this);
        } else {
            // 3.如果没传入pre 将数组当前项当作pre传入 并增加指针
            pre = callBack(this[i], i, this);
            i++;//note：将会跳过数组的第二个元素
        }
    }
    console.log('Array.prototype.myReduce() return: pre =', pre);
    return pre;//4.返回pre
}

const oldReduce = [1, 2, 3, 4, 5];

const reduceRes = oldReduce.myReduce((prev, curr, index) => {
    return prev + curr;
},0);

console.log('reduce 重写', reduceRes);

// some 实现原理
Array.prototype.mySome = function(callBack) {
    console.log('Array.prototype.mySome() called with: callBack =', callBack, 'this =', this);
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        if (callBack(element)) {
            console.log('Array.prototype.mySome() return: true');
            return true;//有一个元素符合要求 即成
        }
    }
    console.log('Array.prototype.mySome() return: false');
    return false;
}

const oldSome = [1, 2, 3, 4, 5];
// 如果有一个值大于4 则返回true
const someIsTrue = oldSome.mySome((ele) => {
    return ele > 4;
})

console.log('some 重写', someIsTrue);

// every 实现原理
Array.prototype.myEvery = function(callBack) {
    console.log('Array.prototype.myEvery() called with: callBack =', callBack, 'this =', this);
    for (let i = 0; i < this.length; i++) {
        const element = this[i];
        if (!callBack(this[i])) {
            console.log('Array.prototype.myEvery() return: false');
            return false;//有一个元素错误即失败
        }
    }
    console.log('Array.prototype.myEvery() return: true');
    return true;
}

const everyArr = [1, 2, 3, 4, 5];

const everyIsTrue = everyArr.myEvery((ele) => {
    return ele > 0;
})

console.log('every 重写', everyIsTrue);
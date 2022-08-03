/**
 * 对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
 * @param {function} callbackFnp 一个 “reducer” 函数，包含四个参数：
                      previousValue 上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 
                                      0 的元素 array[0]。
                      currentValue 数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
                      currentIndex 数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
                      array 用于遍历的数组。
 * @param {*?} initValue 作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。
 */
Array.prototype.myreduce = function (callbackFn, initValue) {
  // defined four paramters of callbackFn
  let previousValue,
  currentValue,
  currentIndex,
  array = this ;
  if (typeof callbackFn !== 'function') {
    throw new TypeError('callbackFn must be a function');
  }
  if (!initValue) {
    previousValue = array[0] ;
    currentIndex = 1 ;
    currentValue = array[currentIndex] ;
  } else {
    previousValue = initValue ;
    currentIndex = 0 ;
    currentValue = array[currentIndex] ;
  }

  for (let i = currentIndex; i < array.length; i++) {
    previousValue = callbackFn(previousValue,currentValue,currentIndex,array) 
    currentIndex++ ;
    currentValue = array[currentIndex] ;
  }

  return previousValue ;
} ;

// pv=1， pv+1 加 [1,2,3].length-1 次 =》 pv=3
[1,2,3].myreduce((pv,cv,ci,arr)=>pv+1) ; // 3
[1,2,3].myreduce((pv,cv,ci,arr)=>pv+cv) ; // 6
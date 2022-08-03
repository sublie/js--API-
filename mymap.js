/**
 * 
 * @param {function} callback 生成新数组元素的函数，使用三个参数：
                      currentValue callback 数组中正在处理的当前元素 
                      index callback 数组中正在处理的当前元素的索引
                      array map 方法调用的数组
 * @param {*?} thisArg 执行 callback 函数时值被用作this
 */
Array.prototype.mymap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function') ;
  }
  if (thisArg) {
    this.call(thisArg) ;
  }
  // 暂存this
  let _this = this ,
  result = [];
  for (let i = 0; i < _this.length; i++) {
    const element = _this[i];
    result.push(callback(element,i,_this)) ;
  }  

  return result ;
} ;

[1,2,3,].mymap((e,i,arr) => e*2)
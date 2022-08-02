/**
 * 
 * @param {*} thisToBind 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 调用绑定函数时，该参数无效。
 * @param  {...any} args 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
 * @returns 返回由指定的 this 值和初始化参数改造的原函数拷贝
 */
Function.prototype.mybind = function (thisToBind, ...args) {
  // let _this = this ; // 目标函数
  // let context = arguments[0] ;
  // let args = [].slice.call(arguments, 1) ;

  // 返回一个函数
  // function N1：绑定传进来的 this 
  // function N2：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法
  return () => {
    // this 是目标函数
    this.apply(thisToBind, Array.from(args).concat(Array.from(arguments))) ; //利用apply将this指向thisToBind，参数进行拼接
  } ;
}

let fn = function () {
  console.log(this) ;
}
let obj2 = {
  a: 2 ,
} ;
let newfn = fn.mybind(obj2) ;
// () => {
//     // this 是目标函数
//     this.apply(thisToBind, Array.from(args).concat(Array.from(arguments))) ; //利用apply将this指向thisToBind，参数进行拼接
//   }
newfn(obj2) ; //{a: 2}
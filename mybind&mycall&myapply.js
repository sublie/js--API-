/**
 * 
 * @param {*} thisToBind 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 调用绑定函数时，该参数无效。
 * @param  {...any} args 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
 * @returns 返回由指定的 this 值和初始化参数改造的原函数拷贝
 */
Function.prototype.mybind = function (thisToBind, ...args) {
  let _this = this ; // 目标函数
  // 返回一个函数
  // function N1：绑定传进来的 this 
  // function N2：当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法
  let fNOP = function() {},
  fBound = function () { // 箭头函数没有 arguments 对象
    // 如果被 new 调用，this应该是innerFn的实例
    _this.apply(this instanceof fBound ? this : (thisToBind || window), Array.from(args).concat(Array.from(arguments))) ; //利用apply将this指向thisToBind，参数进行拼接
  } ;
  // 维护原型关系
 if (_this.prototype) {
  // 当执行Function.prototype.bind()时, this为Function.prototype 
  // this.prototype(即Function.prototype.prototype)为undefined
  fNOP.prototype = _this.prototype; 
 }
 // 下行的代码使fBound.prototype是fNOP的实例,因此
 // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
 fBound.prototype = new fNOP();
 return fBound;
}

let fn = function () {
  console.log('函数内部this指向：', this) ;
  console.log('参数链表：', ...arguments);
}
let obj2 = {
  a: 2 ,
} ;
let newfn = fn.bind(obj2, 'bind') ; //调用原生的的bind
let newfn2 = fn.mybind(obj2, 'mybind') ; //调用分装的的bind
// newfn(1,2) ; 
// newfn2(1,2) ;

console.log(new newfn());
console.log(new newfn2());

/*
 * @Description: new实现原理
 * @Author: huazj
 * @Date: 2022-02-07 12:58:14
 * @LastEditTime: 2022-02-07 13:59:39
 * @LastEditors: huazj
 */

// 思路：执行函数，挂载原型、判断返回值
function myNew(...arr) {
    const [fn, ...params] = arr;//第一个参数为要new的构造函数 其他的为该构造函数的参数
    // 挂载原型
    const target = {};
    target._proto_ = fn.prototype;//原型连接，target是fn的实例
    const res = fn.apply(target, params);//执行函数 将this指向构造函数的实例
    // 判断返回值
    const type = typeof res;//结果的类型
    if (res && (type === 'object' || type === 'function')) {
        return res;//构造函数返回其他对象、或者函数 就返回res
    }
    return target;//否则就返回函数的实例
}     
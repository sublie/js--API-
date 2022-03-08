/*
 * @Description: instanceOf实现原理
 * @Author: huazj
 * @Date: 2022-02-07 10:51:25
 * @LastEditTime: 2022-02-07 10:59:07
 * @LastEditors: huazj
 */

//一个对象是否在另一个对象的原型链上

// 思路：右边变量的原型存在于左边变量的原型链上
function instanceOf2(left, right) {
    let leftValue = left.__proto__;
    const rightValue = right.prototype;
    while (true) {
        if (leftValue === null) {
            return false;//左边变量的原型链上没有找到
        }
        if (leftValue === rightValue) {
            return true;//右边变量的原型在左边变量的原型链上
        }
        leftValue = leftValue.__proto__;//找下层原型
    }
}
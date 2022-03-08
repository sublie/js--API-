/*
 * @Description: Object.assign的模拟实现
 * @Author: xieql
 * @Date: 2022-03-08 21:36:13
 * @LastEditors: xieql
 * @LastEditTime: 2022-03-08 22:28:44
 * 
 */
/**
 * @description: Object.assign的模拟实现
 * @param {*} target 合并的源对象
 * @param {array} mergeObjArr 要合并的对象的数组
 * @return {*} 合并后的对象
 */
Object.myAssign = function(target, ...mergeObjArr) {
    target = Object(target);//普通类型包装成对象 比如字符串 数字等
    for (let i = 0; i < mergeObjArr.length; i++) {
        const element = array[i];
        // 过滤掉要合并的对象为null和undefined的情况
        if (element !== null || element !== undefined) {
            // 遍历要合并对象的属性
            for (let key in element) {
                // in运算符会查找原型对象上的可枚举属性，所以需要通过Object.prototype.hasOwnProperty方法过滤掉对象原型对象上的属性
                if (element.hasOwnProperty(key)) {
                    target[key] = element[key];
                }
            }
        }
    }
    return target;
};

//示例代码
const proto = { p: 'proto' };
const obj1 = { a: 'aa' };
const obj2 = { b: 'bb' };
// 以proto对象为新对象的__proto__
const obj3 = Object.create(proto, {
    c: {
        value: 'cc',
        enumerable: true,
    },
})
console.log(obj3);//{c: 'cc'}
// 输出obj3的构造函数的原型对象
console.log(obj3.__proto__); // {p: 'proto'}

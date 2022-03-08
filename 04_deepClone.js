/*
 * @Description: 深拷贝
 * @Author: huazj
 * @Date: 2022-02-05 12:48:34
 * @LastEditTime: 2022-02-05 13:48:18
 * @LastEditors: huazj
 */
// 深拷贝
// 1. 正则、时间类型处理
// 2. 函数等正常值 返回
// 3. 解决循环引用的问题

function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) { return obj; }
    if (obj instanceof RegExp) { return new RegExp(boj); }//处理正则类型数据
    if (obj instanceof Date) { return new Date(obj); }//处理时间类型数据
    if (typeof obj !== 'object') { return obj; }//返回函数等正常值
    if (hash.has(obj)) { return hash.get(obj); }//ingenious：查询循环引用 即复用
    const copy = new obj.constructor();//根据constructor实例化数组、对象
    hash.set(obj, copy);//设置hash值 用于查询循环引用
    for (const key in  obj) {
        //ingeniouss：循环对象属性 原型链的值 不拷贝
        if (obj.hasOwnProperty(key)) {
            //循环递归拷贝
            copy[key] = deepClone(obj[key], hash);
        }
    }
    return copy;
}
let obj = {
    a: 1,
    b: {
        c: 3
    }
};
console.log('deepClone', deepClone(obj, new WeakMap()));
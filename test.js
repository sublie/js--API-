/**
 * 编写函数convert(money)，传入金额，将金额转换为千分位表示法，如输入 1293213 ，输出 1,293,213
 * @param {Number} money 
 * @returns 
 */
let myconvert = function (money) {
  money = '' + money ;
  let len = money.length ;
  let str = '' ;
  for (let i = len ; i >= 0 ; i-=3) {
    if (i-3 > 0)
      str = ',' + money.slice(i-3,i) + str ;
    else str = money.slice(0,i) + str ;
  }
  return str ;
}

/**
 * 编写函数convert(money)，传入金额，将金额转换为千分位表示法，如输入 1293213 ，输出 1,293,213
 * @param {Number} money 
 * @returns 
 */
let convert = function (money) {
  // 小数点
  let [integer, decimal] = String.prototype.split.call(money,'.') ,
  arr = [] ,
  j = 0 ; // 匹配当前循环的数字 是不是3的倍数
  money = String(integer) ; // 数字一般都转字符操作
  for (let i = money.length -1; i >= 0; i--) {
    j++ ;
    arr.push(money[i]) ;
    if (j % 3 == 0 && i != 0)
      arr.push(',') ;
  }
  // 颠倒数组 转字符串
  integer = arr.reverse().join('') ;
  // 小数点
  if (decimal)
    integer = `${integer}.${decimal}` ;

  return integer ;
}

console.log('myconvert', myconvert(1293213))
console.log('convert', convert(1293213))

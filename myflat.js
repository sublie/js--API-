// 数组的扁平化
// 1.递归处理
  let recursiveFlat = (() => function (arr, newarr = []) {
        // ==================解决子问题的思想=================
    // let newarr = [], 
    //   flag = false ;
    // for (let i = 0; i < arr.length; i++) {
    //   if (Array.isArray(arr[i])) {
    //     const subarr = recursiveFlat(arr[i]) ;
    //     if (subarr.length==2&&subarr[0]==4) debugger;
    //     newarr.push(...subarr) ;
    //     flag = true ;
    //   } else newarr.push(arr[i]) ;
    // }
    // if(!flag) 
    //   return arr ;
    // return newarr ;

        // ====================遍历思想=================
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        recursiveFlat(arr[i]) ;
      } else newarr.push(arr[i]) ;
    }
    return newarr ;
  })(newarr = [])

// 2.用 reduce 实现数组的 flat 方法
let flatten = function(arr) {
  return arr.reduce((pre,cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur) ;
  }, []);
}

// 3.扩展运算符
let threePointsFn = function (arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr) ;
  }
  return arr ;
}
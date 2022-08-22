/**
 * 完成 myconvert2(list) 函数，实现将 list 转为 tree
 * @param {*} list
 * @param {*} parentKey
 * @param {*} currentKey
 * @param {*} rootValue
 */
function myconvert2(list, parentKey, currentKey, rootValue) {
  // 初始化数据结构
    let result = {
        children: [],
        [currentKey]: rootValue,
      },
      treeSize = 0;
  
  while (treeSize !== list.length) {
    for (let item of list.values()) {
      if (item[parentKey] == rootValue) {
        //得到最外层（即第一次）递归所需要的children
        result.children.push({
          ...item,
          children: [] ,
        });
        treeSize++;
      } else {
        // 递归找到各层的children
        getChildren(result.children, list);
        // 为上层的children中的每个元素找到他们的children（即本层） 并且向下层children递归 
        function getChildren(children, listToConvert) {
          if (treeSize == listToConvert.length) {
            return;
          }
          for (let child of children.values()) {
            for (let item of listToConvert.values()) {
              if (item[parentKey] == child[currentKey]) {
                child.children = [];
                child.children.push({
                  ...item ,
                  children: [] ,
                });
                treeSize++;
              }
            }
          }
          for (let child of children.values()) {
            getChildren(child.children, listToConvert);
          }
        }
      }
    }
  }

  return result;
}

function convert2(list, parentKey, currentKey, rootValue) {
  // 数据结构初始化
  let obj = {
    [currentKey]: rootValue,
    children: []
  }
  let num = 0

  // 为所有节点 添加到父结构中
  while (num !== list.length) {
    list.forEach((item, index) => {
      if (!item) return
      // 收集最外层
      if (item[parentKey] === obj[currentKey]) {
        obj.children.push({
          ...item,
          children: []
        })
        list[index] = null
        num++
      } else {
        // 递归找层级
        helpFn(item, index, obj.children)
      }
      // 递归找层级
    })
  }
  // 为item 添加层级
  function helpFn(item, initIndex, arr) {
    // 寻找当前层级
    let index = arr.findIndex(ele => ele[currentKey] === item[parentKey])
    if (index !== -1) {
      arr[index].children.push({
        ...item,
        children: []
      })
      list[initIndex] = null
      num++
      return true
    }
    // 找他们的子级的元素
    for (let ele of arr.values()) {
      if (helpFn(item, index, ele.children)) {
        // 找到该item的层级 取消递归
        return true
      }
    }
  }
  return obj
}

const list = [
  {
    id: 19,
    parentId: 0,
  },
  {
    id: 18,
    parentId: 16,
  },
  {
    id: 17,
    parentId: 16,
  },
  {
    id: 16,
    parentId: 0,
  },
];

const myresult2 = myconvert2(list, "parentId", "id", 0);
console.log("convert", JSON.stringify(myresult2));
const result = convert2(list, "parentId", "id", 0);
console.log("convert", JSON.stringify(result));

const tree = {
  id: 0,
  children: [
    {
      id: 19,
      parentId: 0,
    },
    {
      id: 16,
      parentId: 0,
      children: [
        {
          id: 18,
          parentId: 16,
        },
        {
          id: 17,
          parentId: 16,
        },
      ],
    },
  ],
};

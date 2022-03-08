/*
 * @Description: 数组的对象key值相同的去重
 * @Author: huazj
 * @Date: 2022-02-04 17:11:27
 * @LastEditTime: 2022-02-04 21:00:49
 * @LastEditors: huazj
 */

import { json } from "stream/consumers";

// 对数组对象元素的键值进行去重
const oldArr = [
	{ id: 'Koro1', artist: '第一个相同key值元素' },
	{ id: 'Koro1', artist: '第2个相同key值元素' },
	{ id: '威廉古堡', artist: '两个对象一模一样' },
	{ id: '威廉古堡', artist: '两个对象一模一样' },
	{ artist: '两个对象一模一样', id: '威廉古堡' }, // 顺序不一样
	{ id: '以父之名', artist: '周杰伦1' },
	{ artist: '周杰伦2', id: '以父之名' },
	{ id: '七里香', artist: '周杰伦' },
]

function unique(arr, key) {
	console.log('unique() called with: arr = ', arr, 'key = ', key);
	const result = {};//数组元素对象的key值相同 则覆盖对象
	const finalRestlt = [];//去重后的数组
	// note：遍历数组 去重对象相同键值
	arr.forEach(element => {
		result[element[key]] = element;//id（或者其他已知键名为键名 相同键名覆盖 后出现的覆盖前面的
	});
	// 获取对象key值的数组对象元素
	for (const keyName in result) {
		finalRestlt.push(result[keyName]);
	}
	console.log('unique() return: finalResult = ', finalRestlt);
	return finalRestlt;//返回去重数组
}
// 对id值相同的对象进行去重
console.log('后面key值相同的覆盖前面的', unique(oldArr, 'id'));

// 数组对象元素 前面的覆盖后面的
function unique2(arr, key) {
	console.log('unique2() called with: arr = ', arr, 'key = ', key);
	const result = {};
	const finalResult = [];
	arr.forEach((item) => {
		//note：只保存第一次出现的数组元素
		if (result[item[key]] === undefined) {
			result[item[key]] = item;
		}
	})
	for (const keyName in result) {
		finalResult.push(result[keyName]);
	}
	console.log('unique2() return: finalResult = ', finalResult);
	return finalResult;
}
console.log('前面的元素覆盖后面的', unique2(oldArr, 'id'));

// JSON.stringify将对象字符串化 来去重
function unique3(arr) {
	const hash = {};
	arr.forEach((item) => {
		hash[JSON.stringify(item)] = item;
	})
	//遍历对象 取出元素
	arr = Object.keys(hash).map((key) => JSON.parse(key));
	console.log('unique3() return: arr = %d', arr);
	return arr;
}

console.log('简单对象元素 转字符来比对', unique3(oldArr));
//note：
// 问题: 对象顺序不一样 JSON.stringify字符串化值不同 也不能比对出来
// { id: "威廉古堡", artist: "两个对象一模一样" },
// { id: "威廉古堡", artist: "两个对象一模一样" },
// { artist: "两个对象一模一样", id: "威廉古堡" }, // 顺序不一样
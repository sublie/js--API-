/*
 * @Description: 数组基本类型去重
 * @Author: huazj
 * @Date: 2022-02-04 17:11:27
 * @LastEditTime: 2022-02-05 10:45:04
 * @LastEditors: huazj
 */

const a = { test: 1 };
const oldArr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 'NaN', 0, 0, 'a', 'a', a, a, {}, {}];

//ES6基本类型去重
function unique(arr){
	return Array.from(new Set(oldArr));
}
//基本类型去重推荐方式（六大基本数据类型：String Number Boolean Undefined Null NaN），Null其实就是一个null对象(Object)
console.log('es6-set', unique(oldArr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", { test: 1 }, {}, {}]

// note:there are problems to deep-thought
// find
// function unique4(arr) {
// 	console.log('unique4 called with: arr = ', arr);
// 	if(!Array.isArray()) { return; }
// 	let array = [];
// 	for (let i = 0; i < arr.length; i++) {
// 		console.log(array.find(item => {
// 			console.log('item = %d',item, 'arr[i] = %d',arr[i]);
// 			item === arr[i];
// 		}));
// 		if(array.find(item => item === arr[i]) === undefined) {
// 			array.push(arr[i]);
// 		}
// 	}
// 	console.log('unique4() return: array = ', array);
// 	return array;
// }

// console.log('find', unique4(oldArr));

// includes
function unique3(arr){
	console.log('uniques3() called with: arr = ', arr);
	if(!Array.isArray(arr)) return;
	const array = [];
	for(let i =0; i < arr.length; i++){
		if(!array.includes(arr[i])) {
			array.push(arr[i]);
		}
	}
	console.log('unique3() returned: array = ', array);
	return array;
}

// NaN识别出来了，对象也没去重，正解
console.log('includes', unique3(oldArr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", { test: 1 }, {}, {}]        

// indexOf
function unique2(arr){
	console.log('uniques2() called with: arr = ', arr);
	if(!Array.isArray(arr)) {
		return;
	}
	const array =[];
	for (let i = 0; i < arr.length; i++) {
		if(array.indexOf(arr[i]) === -1) {
			array.push(arr[i]);
		}
	}
	console.log('uniques2() returned: array = ', array);
	return array;
}

// 缺点：无法识别NaN
console.log('indexOf', unique2(oldArr));
// Object.assign()静态方法是将一个或多个源对象中可枚举的所有的自有属性复制到目标对象，并返回修改后的目标对象

const target = { name: "厄斐琉斯", role: "亡眼射手" }
const source = { name: "嘉文四世", role: "主宰" }
const source2 = { name: "卡萨丁", role: "虚空" }

const returnedTarget = Object.assign(target, source, source2)

console.log(returnedTarget)
console.log(target)

console.log(returnedTarget === target) // true

// const o1 = { a: 1 }
// const o2 = { b: 2 }
// const o3 = { c: 3 }

// const obj = Object.assign(o1, o2, o3)
// console.log(obj)
// console.log(o1)

// startWith()是数组的一个原型方法，用于判断当前数组是否以指定数字开头

interface Array<T> {
    startWith(search: T): boolean
}

const arr: number[] = [1, 2, 3, 4]

console.log(arr.startWith(1))

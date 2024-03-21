export type AnyFunction = (...args:never[]) => unknown;
// 对于never[] :只能传递一个空数组或直接不传递参数（如果参数是可选的），never类型指不可能有实例的类型，意味着never[]不能有任何元素
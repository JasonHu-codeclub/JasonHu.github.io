export type AnyFunction = (...args:never[]) => unknown;
// 对于never[] :只能传递一个空数组或直接不传递参数（如果参数是可选的），never类型指不可能有实例的类型，意味着never[]不能有任何元素

export function createQueryURL(
    raw: Record<string, string | number | undefined>
) {
    const params: Record<string, string> = {};

    Object.entries(raw).forEach(([key, value]) => {
        if (value === undefined) return;
        params[key] = typeof value === 'number' ? value.toString() : value;
    });

    return `?${new URLSearchParams(params)}`;
}
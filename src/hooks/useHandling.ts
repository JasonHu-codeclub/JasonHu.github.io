import { AnyFunction } from "../utils";
import {useState} from 'react';
export default function useHandling<T extends AnyFunction>(
    handler:T,
    initialValue = false,
){
    const [handling,setHandling] = useState<boolean>(initialValue);

    const execute = async(...args: Parameters<T>) => {
        // Parameters<T>写法，T必须为函数类型
        // Parameters<T> 用于获取函数类型 T 的参数类型并将其转换为一个类型元组
        // 所以...args: Parameters<T>本质是把传递给execute函数的所有参数的类型 与 T函数参数类型相匹配
        setHandling(true);
        try{
            return (await handler(...args) as Promise<ReturnType<T>>);
        } finally{
            setHandling(false);
        }
    }
    return [handling, execute as T] as const;
}
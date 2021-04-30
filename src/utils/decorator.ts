import { Module } from "../core/Module";

type NormalFunction = (...args: any[]) => any;

// 数装饰器生成器
export const decoratorCreator = (intercept: (f: NormalFunction, ...args: any) => void) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<NormalFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function(...args: any) {
            return intercept.call(this, fn!.bind(this, ...args), ...args);
        };
    };
};

// ******************************************************************************
/** 装饰器 */
export function Loading<T>(field: keyof T) {
    return decoratorCreator(async function(this: Module, fn) {
        try {
            (this as any).setState({ [field]: true }, `loading field update: ${field}`);
            return await fn();
        } finally {
            (this as any).setState({ [field]: false }, `loading field update: ${field}`);
        }
    });
}

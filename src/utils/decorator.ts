import { set } from "mobx";
import { Module } from "../core/Module";

type AsyncFunction = (...args: any[]) => Promise<any>;

type NormalFunction<T = void> = (...args: any[]) => T;

// typescript decorator for async function
export const asyncDecoratorCreator = (intercept: (f: AsyncFunction) => Promise<any>) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<AsyncFunction>) => {
        const fn = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            return await intercept.call(this, fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// typescript decorator for normal function
export const decoratorCreator = (intercept: (f: NormalFunction) => void) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<NormalFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function(...args: any[]) {
            return intercept.call(this, fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// TODO: TC39 new decorator

// ******************************************************************************
export function loading<T>(field: keyof T) {
    return asyncDecoratorCreator(async function(this: Module<any>, fn) {
        try {
            set(this.store, { [field]: true });
            return await fn();
        } finally {
            set(this.store, { [field]: false });
        }
    });
}

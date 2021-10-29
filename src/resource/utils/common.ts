import { runInAction } from "mobx";
import { store } from "../core/Store";
import type { Module } from "../core/Module";
import { decoratorCreator } from "./decorator";

/**
 * 等待时间，单位：ms
 * @param duration
 * @default 300
 */
export const delay = (duration = 300) => new Promise(resolve => setTimeout(resolve, duration));

/** 自动 loading 方法 */
export const loading = async <R>(field: string, fn: () => Promise<R>) => {
    const loadingStore = store.getStore()["@@loading"];
    try {
        runInAction(() => {
            loadingStore[field] = true;
        });
        return await fn();
    } finally {
        runInAction(() => {
            loadingStore[field] = false;
        });
    }
};

/** 自动 loading 装饰器 */
export function Loading(field: string) {
    return decoratorCreator(async fn => {
        const loadingStore = store.getStore()["@@loading"];
        try {
            runInAction(() => {
                loadingStore[field] = true;
            });
            return await fn();
        } finally {
            runInAction(() => {
                loadingStore[field] = false;
            });
        }
    });
}

/** 为类方法提供安全 this 绑定 */
export const bindThis = <T extends Module>(module: T): T => {
    return new Proxy(module, {
        get(target: T, p: string | symbol, receiver: any) {
            if (target[p] instanceof Function) {
                return target[p].bind(target);
            }
            return Reflect.get(target, p, receiver);
        },
    });
};

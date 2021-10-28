import { runInAction } from "mobx";
import { storeManager } from "../core/StoreManager";
import type { Module } from "../core/Module";
import { decoratorCreator } from "./decorator";

export const delay = (d: number = 300) => new Promise(resolve => setTimeout(resolve, d));

export const loading = async <R>(field: string, fn: () => Promise<R>) => {
    const loadingStore = storeManager.getStore()["@@loading"];
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

/** 装饰器 */
export function Loading(field: string) {
    return decoratorCreator(async fn => {
        const loadingStore = storeManager.getStore()["@@loading"];
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

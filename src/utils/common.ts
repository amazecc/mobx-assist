import { runInAction } from "mobx";
import { storeManager } from "../core/StoreManager";

export const delay = (d: number = 300) => new Promise(resolve => setTimeout(resolve, d));

export const loading = async <R>(field: string, fn: () => Promise<R>) => {
    const loadingStore = storeManager.getStore()["@@loading"];
    try {
        runInAction(() => {
            loadingStore[field] = true;
        });
        return await fn();
    } finally {
        loadingStore[field] = false;
    }
};

import { observable } from "mobx";
import { AnyObject } from "src/type";

export interface Store {
    "@@loading": AnyObject;
}

export class StoreManager {
    private store = { "@@loading": observable({}) } as Store;

    addStore(name: string, store: object) {
        this.store[name] = store;
    }

    getStore() {
        return this.store;
    }
}

export const storeManager = new StoreManager();

import { observable } from "mobx";
import { AnyPlainObject } from "../type";

export interface GlobalState {
    "@@loading": AnyPlainObject;
}

export class Store {
    private readonly store = { "@@loading": observable({}) } as GlobalState;

    public addStore(name: string, store: object) {
        this.store[name] = store;
    }

    public getStore() {
        return this.store;
    }
}

export const store = new Store();

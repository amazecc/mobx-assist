export interface Store {}

export class StoreManager {
    private store: Store = Object.create(null);

    add(name: string, store: object) {
        this.store[name] = store;
    }

    get() {
        return this.store;
    }
}

export const storeManager = new StoreManager();

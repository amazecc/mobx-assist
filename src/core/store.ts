export class Store {
    private store: object = Object.create(null);

    add(name: string, store: object) {
        this.store[name] = store;
    }

    get<S>() {
        return (this.store as unknown) as Readonly<S>;
    }
}

export const store = new Store();

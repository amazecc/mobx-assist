export class Stores {
    private stores: object = {};

    add(name: string, store: object) {
        this.stores[name] = store;
    }

    get<S>() {
        return (this.stores as unknown) as Readonly<S>;
    }
}

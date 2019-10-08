export class Stores {
    private stores: object = {};

    add(store: object) {
        Object.assign(this.stores, store);
    }

    get<S>() {
        return (this.stores as unknown) as Readonly<S>;
    }
}

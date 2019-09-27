import { set, observable } from "mobx";
import { config } from "../utils/config";

export class Module<S extends object, R extends object = {}, G extends object = {}> {
    public readonly store: Readonly<S>;

    constructor(private readonly initialState: S) {
        this.store = observable(initialState);
    }

    protected setState(value: Partial<S>) {
        set(this.store, value);
    }

    public resetState(skipFields?: Array<keyof S>) {
        let finalState: S;
        if (skipFields && skipFields.length > 0) {
            const skipFieldsState = skipFields.reduce(
                (prev, next) => {
                    prev[next] = this.store[next];
                    return prev;
                },
                {} as Partial<S>
            );
            finalState = { ...this.initialState, ...skipFieldsState };
        } else {
            finalState = this.initialState;
        }
        set(this.store, finalState);
    }

    protected get state() {
        return this.store as S;
    }

    protected get rootState() {
        return config.rootStore as Readonly<R>;
    }

    protected get globalState() {
        // TODO: 获取全局共享 store
        return (null as unknown) as G;
    }
}

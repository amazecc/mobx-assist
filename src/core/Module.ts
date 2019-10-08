import { set, observable, toJS } from "mobx";
import { Stores } from "./Stores";

const stores = new Stores();

interface AnyObject {
    [k: string]: any;
}

export class Module<S extends AnyObject, G extends AnyObject = {}> {
    private readonly initialState: S;

    public readonly store: Readonly<S>;

    constructor(moduleName: string, initialState: S) {
        this.initialState = { ...initialState };
        this.store = observable(initialState);
        stores.add({ [moduleName]: this.store });
    }

    protected setState(value: Partial<S>) {
        set(this.store, value);
    }

    public resetState(skipFields?: Array<keyof S>) {
        let finalState: Partial<S>;
        // toJS 生成除去 getter（计算属性）的对象
        const omitComputedFieldsState = toJS(this.store);
        const keys = Object.keys(omitComputedFieldsState);
        if (skipFields && skipFields.length > 0) {
            finalState = keys
                .filter(_ => !skipFields.includes(_))
                .reduce(
                    (prev, next) => {
                        prev[next] = this.initialState[next];
                        return prev;
                    },
                    {} as any
                );
        } else {
            finalState = keys.reduce(
                (prev, next) => {
                    prev[next] = this.initialState[next];
                    return prev;
                },
                {} as any
            );
        }
        set(this.store, finalState);
    }

    protected get state() {
        return this.store as S;
    }

    protected get globalState() {
        return stores.get<{ [K in keyof G]: Readonly<G[K]> }>();
    }
}

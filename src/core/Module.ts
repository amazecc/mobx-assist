import { set, observable, toJS } from "mobx";
import { config } from "../utils/config";

interface AnyObject {
    [k: string]: any;
}

export class Module<S extends AnyObject, R extends AnyObject = {}, G extends AnyObject = {}> {
    private initialState: S;

    public readonly store: Readonly<S>;

    constructor(initialState: S) {
        this.initialState = { ...initialState };
        this.store = observable(initialState);
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

    protected get rootState() {
        return config.rootStore as Readonly<R>;
    }

    protected get globalState() {
        // TODO: 获取全局共享 store
        return (null as unknown) as G;
    }
}

import { observable, toJS, action } from "mobx";
import { store } from "./Store";
import type { AnyPlainObject } from "../type";

export interface Module<S extends AnyPlainObject = AnyPlainObject> {
    onDidMount?(): void;
    /**
     * 组件卸载默认清除当前模块的数据，若要忽略一些数据，可返回一个数组，数组每项为当前模块 state key
     */
    onWillUnmount?(): void | (keyof S)[];
}

export class Module<S extends AnyPlainObject = AnyPlainObject> {
    private readonly moduleName: string;

    private readonly initialState: S;

    public readonly state: S;

    constructor(moduleName: string, InitialState: S | (new () => S)) {
        this.moduleName = moduleName;
        if (typeof InitialState === "object") {
            this.initialState = { ...InitialState };
            this.state = observable(InitialState, undefined, { name: this.moduleName });
        } else {
            const state = new InitialState();
            this.initialState = toJS(state);
            this.state = state;
        }
        store.addStore(this.moduleName, this.state);
    }

    protected setState<K extends keyof S>(value: Pick<S, K> | ((state: S) => void), actionName?: string) {
        const fn = typeof value === "function" ? () => value(this.state) : () => Object.keys(value).forEach(_ => (this.state[_ as keyof S] = value[_]));
        return actionName ? action(actionName, fn)() : action(fn)();
    }

    public resetState(skipFields: (keyof S)[] = [], actionName?: string) {
        const omitComputedFieldsStateKeys = Object.keys(toJS(this.state));
        const keys = skipFields.length > 0 ? omitComputedFieldsStateKeys.filter(_ => !(skipFields as unknown as string[]).includes(_)) : omitComputedFieldsStateKeys;
        const finalState = keys.reduce((prev, next) => {
            prev[next] = this.initialState[next];
            return prev;
        }, {});
        this.setState(finalState, actionName || `reset ${this.moduleName} state, skip fields: ${JSON.stringify(skipFields)}`);
    }

    protected get globalState() {
        return store.getStore();
    }
}

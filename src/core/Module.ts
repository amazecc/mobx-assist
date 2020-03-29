import { observable, toJS, action } from "mobx";
import { RouteComponentProps } from "react-router-dom";
import { storeManager } from "./StoreManager";

export interface RouteInfo<Query = {}, Params = {}, State = {}> extends RouteComponentProps<Params, any, State> {
    query: Query;
}

export interface Module<S extends AnyState = AnyState> {
    componentDidMount?(routeInfo: RouteInfo): void;
    /**
     * 组件卸载默认清除当前模块的数据，若要忽略一些数据，可返回一个数组，数组每项为当前模块 state key
     */
    componentWillUnmount?(): void | (keyof S)[];
}

interface AnyState {
    [k: string]: any;
}

export class Module<S extends AnyState = AnyState> {
    private readonly moduleName: string;

    private readonly initialState: S;

    public readonly state: S;

    constructor(initialState: S | (new () => S)) {
        this.moduleName = this.constructor.name;
        if (typeof initialState === "object") {
            this.initialState = { ...initialState };
            this.state = observable(initialState, undefined, { name: this.moduleName });
        } else {
            const store = new initialState();
            this.initialState = toJS(store);
            this.state = store;
        }
        storeManager.add(this.moduleName, this.state);
    }

    protected setState<K extends keyof S>(value: Pick<S, K> | ((state: S) => void), actionName?: string) {
        const fn = typeof value === "function" ? () => value(this.state) : () => Object.keys(value).forEach(_ => (this.state[_ as keyof S] = value[_]));
        if (actionName) {
            action(actionName, fn)();
        } else {
            action(fn)();
        }
    }

    public resetState(skipFields: (keyof S)[] = [], actionName?: string) {
        const omitComputedFieldsStateKeys = Object.keys(toJS(this.state));
        const keys = skipFields.length > 0 ? omitComputedFieldsStateKeys.filter(_ => !((skipFields as unknown) as string[]).includes(_)) : omitComputedFieldsStateKeys;
        const finalState = keys.reduce((prev, next) => {
            prev[next] = this.initialState[next];
            return prev;
        }, {});
        this.setState(finalState, actionName || `reset ${this.moduleName} state, skip fields: ${JSON.stringify(skipFields)}`);
    }

    protected get globalState() {
        return storeManager.get();
    }
}

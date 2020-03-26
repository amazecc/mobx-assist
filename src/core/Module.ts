import { observable, toJS, action } from "mobx";
import { storeManager } from "./StoreManager";

export interface Module<S extends AnyState = AnyState> {
    componentWillMount?(): void;
    componentDidMount?(): void;
    componentWillUnmount?(): void;
    componentDidShow?(): void;
    componentDidHide?(): void;
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
        const keys = skipFields && skipFields.length > 0 ? omitComputedFieldsStateKeys.filter(_ => !((skipFields as unknown) as string[]).includes(_)) : omitComputedFieldsStateKeys;
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

import { observable, toJS, action } from "mobx";
import { Stores } from "./Stores";

const stores = new Stores();

export class Module<S extends object, G extends object = {}> {
    private readonly initialState: S;

    public readonly state: S;

    constructor(private readonly moduleName: string, initialState: S | (new () => S)) {
        if (typeof initialState === "object") {
            this.initialState = { ...initialState };
            this.state = observable(initialState, undefined, { name: moduleName });
        } else {
            const store = new initialState();
            this.initialState = toJS(store);
            this.state = store;
        }
        stores.add(moduleName, this.state);
    }

    protected setState(value: Partial<S> | ((state: S) => void), actionName?: string) {
        const fn =
            typeof value === "function"
                ? () => value(this.state)
                : () => {
                      Object.keys(value).forEach(_ => (this.state[_] = value[_]));
                  };
        if (actionName) {
            action(actionName, fn)();
        } else {
            action(fn)();
        }
    }

    public resetState(skipFields: Array<keyof S> = [], actionName?: string) {
        const omitComputedFieldsStateKeys = Object.keys(toJS(this.state));
        const keys = skipFields && skipFields.length > 0 ? omitComputedFieldsStateKeys.filter(_ => !((skipFields as unknown) as string[]).includes(_)) : omitComputedFieldsStateKeys;
        const finalState: Partial<S> = keys.reduce((prev, next) => {
            prev[next] = this.initialState[next];
            return prev;
        }, {});
        this.setState(finalState, actionName || `reset ${this.moduleName} state, skip fields: ${JSON.stringify(skipFields)}`);
    }

    protected get globalState() {
        return stores.get<{ [K in keyof G]: Readonly<G[K]> }>();
    }
}

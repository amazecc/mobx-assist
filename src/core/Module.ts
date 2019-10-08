import { observable, toJS, action } from "mobx";
import { Stores } from "./Stores";

const stores = new Stores();

interface AnyObject {
    [k: string]: any;
}

type DeepReadonly<T> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
};

export class Module<S extends AnyObject, G extends AnyObject = {}> {
    private readonly initialState: S;

    public readonly state: DeepReadonly<S>;

    constructor(moduleName: string, initialState: S) {
        this.initialState = { ...initialState };
        this.state = observable(initialState as any);
        stores.add(moduleName, this.state);
    }

    protected setState(value: Partial<S> | ((state: S) => void), actionName?: string) {
        const fn =
            typeof value === "function"
                ? () => value((this.state as unknown) as S)
                : () => {
                      Object.keys(value).forEach(_ => ((this.state as AnyObject)[_] = value[_]));
                  };
        if (actionName) {
            action(actionName, fn)();
        } else {
            action(fn)();
        }
    }

    public resetState(skipFields?: Array<keyof S>) {
        let finalState: Partial<S>;
        // toJS create object that remove computed fields
        const omitComputedFieldsState = toJS(this.state);
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
        this.setState(finalState, "reset state");
    }

    protected get globalState() {
        return stores.get<DeepReadonly<G>>();
    }
}

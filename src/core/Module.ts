import { observable, toJS, action } from "mobx";
import { Stores } from "./Stores";

const stores = new Stores();

export class Module<S extends object, G extends object = {}> {
    private readonly initialState: S;

    public readonly state: S;

    constructor(moduleName: string, initialState: S) {
        this.initialState = { ...initialState };
        this.state = observable(initialState);
        stores.add(moduleName, this.state);
    }

    protected setState(value: Partial<S> | ((state: S) => void), actionName?: string) {
        const fn =
            typeof value === "function"
                ? () => value((this.state as unknown) as S)
                : () => {
                      Object.keys(value).forEach(_ => (this.state[_] = value[_]));
                  };
        if (actionName) {
            action(actionName, fn)();
        } else {
            action(fn)();
        }
    }

    public resetState(skipFields?: Array<keyof S>, actionName?: string) {
        let finalState: Partial<S>;
        // toJS create object that remove computed fields
        const omitComputedFieldsState = toJS(this.state);
        const keys = Object.keys(omitComputedFieldsState);
        if (skipFields && skipFields.length > 0) {
            finalState = keys
                .filter(_ => !((skipFields as unknown) as string[]).includes(_))
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
        this.setState(finalState, actionName || "reset state");
    }

    protected get globalState() {
        return stores.get<{ [K in keyof G]: Readonly<G[K]> }>();
    }
}

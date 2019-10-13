import { config } from "../utils/config";
import { proxy } from "./proxy";
import { Module } from "./Module";
import { PickType } from "src/type";

type PureActions<T> = PickType<T, () => void>;

export function exceptionIntercept<T extends Module<any>>(obj: T): T & { _pure_: PureActions<T> } {
    // Set proxy capture exception
    const { before: pureActions, after: actions } = proxy(obj, function(this: T, value) {
        if (value instanceof Function) {
            return async (...args: any[]) => {
                try {
                    return await value.apply(this, args);
                } catch (error) {
                    config.errorHandler(error);
                }
            };
        } else {
            return value;
        }
    });
    return Object.assign(actions, { _pure_: pureActions });
}

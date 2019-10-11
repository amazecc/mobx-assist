import { config } from "../utils/config";
import { proxy } from "./proxy";
import { Module } from "./Module";

export function exceptionIntercept<T extends Module<any>>(obj: T): T & { _pure_: T } {
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

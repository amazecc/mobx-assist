import { exceptionUtil } from "../utils/exceptionUtil";
import { proxy } from "./proxy";
import { Module } from "./Module";
import { PickType } from "src/type";

interface PureActions<T> {
    /**
     * Used in other modules, does not contain exception catchers
     */
    _pure_: PickType<T, (...args: any[]) => void>;
}

export function exceptionIntercept<T extends Module<any>>(obj: T): T & PureActions<T> {
    // Set proxy capture exception
    const { before: pureActions, after: actions } = proxy(obj, function(this: T, value) {
        if (value instanceof Function) {
            return async (...args: any[]) => {
                try {
                    return await value.apply(this, args);
                } catch (error) {
                    exceptionUtil.catch(error);
                }
            };
        } else {
            return value;
        }
    });
    return Object.assign(actions, { _pure_: pureActions });
}

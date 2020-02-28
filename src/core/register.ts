import { exceptionUtil } from "../utils/exceptionUtil";
import { proxy } from "./proxy";
import { Module } from "./Module";
import { PickType } from "src/type";
import { ModuleProxy } from "./ModuleProxy";

export interface PureActions<T> {
    /**
     * Used in other modules, does not contain exception catchers
     */
    readonly _pure_: PickType<T, (...args: any[]) => void>;
}

export function register<T extends Module<any>>(obj: T) {
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
    return new ModuleProxy<T>(Object.assign(actions, { _pure_: pureActions }));
}

import { exceptionUtil } from "../utils/exceptionUtil";
import { Module } from "./Module";
import { PickType } from "src/type";
import { ModuleProxy } from "./ModuleProxy";

export interface PureModule<T> {
    /**
     * Used in other modules, does not contain exception catchers
     */
    readonly _pure_: PickType<T, (...args: any[]) => void>;
}

export function register<T extends Module<any>>(obj: T) {
    // Set proxy capture exception
    const proxyModule = new Proxy(obj, {
        get(target: T, p: string, receiver: any) {
            if (target[p] instanceof Function) {
                return async (...args: any[]) => {
                    try {
                        return await target[p].apply(obj, args);
                    } catch (error) {
                        exceptionUtil.catch(error);
                    }
                };
            } else {
                return Reflect.get(target, p, receiver);
            }
        }
    });
    return new ModuleProxy<T>(Object.assign(proxyModule, { _pure_: obj }));
}

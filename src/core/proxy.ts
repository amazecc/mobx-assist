import { config } from "../utils/config";

type ProxyHandler = <T extends any>(obj: T, callback: (value: any) => T[keyof T]) => { before: T; after: T };

const createError = (errorInfo: { target: any; key: string; value: any }) => {
    return {
        errorMessage: "Prohibit update Module variables outside",
        ...errorInfo
    };
};

export const proxy: ProxyHandler = (obj, callback) => {
    const after = { ...obj } as typeof obj;
    const prototype = Object.getPrototypeOf(obj);
    Object.setPrototypeOf(after, prototype);
    // property settings on the prototype
    Object.getOwnPropertyNames(prototype).forEach(key => {
        if (key !== "constructor") {
            Object.defineProperty(after, key, {
                get() {
                    return callback.call(obj, obj[key]);
                },
                set(value) {
                    config.errorHandler(createError({ target: obj, key: key as string, value }));
                }
            });
        }
    });
    // Its own property settings, make the behavior is the same as the Proxy
    Object.keys(after).forEach(key => {
        Object.defineProperty(after, key, {
            get() {
                return obj[key];
            },
            set(value) {
                config.errorHandler(createError({ target: obj, key: key as string, value }));
            }
        });
    });
    return {
        before: obj,
        after
    };
};

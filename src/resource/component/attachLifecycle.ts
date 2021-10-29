import React from "react";
import type { Module } from "../core/Module";

export function attachLifecycle<M extends Module, P extends {}>(module: M, Component: React.ComponentType<P>): React.MemoExoticComponent<React.FunctionComponent<P>> {
    return React.memo((props: P) => {
        React.useEffect(() => {
            module.onDidMount?.();
            return () => {
                const ignoreKeys = module.onWillUnmount?.();
                return ignoreKeys ? module.resetState(ignoreKeys) : module.resetState();
            };
        });
        return React.createElement(Component, props);
    });
}

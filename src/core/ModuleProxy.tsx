import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { PureModule } from "./register";
import { Module } from "./Module";

export class ModuleProxy<T extends Module> {
    constructor(private readonly module: T & PureModule<T>) {}

    getModule() {
        return this.module;
    }

    attachLifecycle<P extends {}>(Component: React.ComponentType<P>): React.ComponentType<P> {
        const module = (this.module._pure_ as unknown) as Module;
        return class extends React.PureComponent<P> {
            componentDidMount() {
                const props = (this.props as unknown) as RouteComponentProps;
                // TODO: 计算query
                module.componentDidMount?.({ ...props, query: {} });
            }

            componentWillUnmount() {
                const ignoreKeys = module.componentWillUnmount?.();
                if (ignoreKeys) {
                    module.resetState(ignoreKeys);
                }
            }

            render() {
                return <Component {...this.props} />;
            }
        };
    }
}

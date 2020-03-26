import React from "react";
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
            componentWillMount() {
                module.componentWillMount?.();
            }

            componentDidMount() {
                module.componentDidMount?.();
            }

            componentWillUnmount() {
                const ignoreKeys = module.componentWillUnmount?.();
                if (ignoreKeys) {
                    module.resetState(ignoreKeys);
                }
            }

            componentDidShow() {
                module.componentDidShow?.();
            }

            componentDidHide() {
                module.componentDidHide?.();
            }

            render() {
                return <Component {...this.props} />;
            }
        };
    }
}

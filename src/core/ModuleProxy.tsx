import React from "react";
import { PureActions } from "./register";
import { Module } from "./Module";

export class ModuleProxy<T extends Module<any, any>> {
    constructor(private readonly module: T & PureActions<T>) {}

    getModule() {
        return this.module;
    }

    attachLifecycle<P extends {}>(Component: React.ComponentType<P>): React.ComponentType<P> {
        const module = (this.module._pure_ as unknown) as Module<any>;
        return class extends React.PureComponent<P> {
            componentWillMount() {
                module.componentWillMount?.();
            }

            componentDidMount() {
                module.componentDidMount?.();
            }

            componentWillUnmount() {
                module.componentWillUnmount?.();
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

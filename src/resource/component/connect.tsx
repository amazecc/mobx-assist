import React from "react";
import { observer } from "mobx-react";
import { useSelector } from "../core/hook";
import type { Subtract } from "../type";
import type { GlobalState } from "../core/Store";

export const connect =
    <R extends {}>(mapStateToProps: (state: GlobalState) => R) =>
    <P extends R>(Component: React.ComponentType<P>): React.ComponentType<Subtract<P, R>> =>
        observer(props => {
            const store = useSelector(mapStateToProps);
            return React.createElement(Component, { ...props, ...store } as P);
        });

import * as React from "react";
import { observer } from "mobx-react";
import { Store } from "../core/StoreManager";
import { useStore } from "../core/hook";
import { Subtract } from "../type";

export const connect = <R extends {}>(mapStateToProps: (state: Store) => R) => <P extends {}>(Component: React.ComponentType<P>): React.ComponentType<Subtract<P, R>> =>
    observer(props => {
        const store = useStore(mapStateToProps);
        return React.createElement(Component, ({ ...props, ...store } as unknown) as P);
    });

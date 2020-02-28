import React from "react";
import { store } from "./store";

const StoreContext = React.createContext<any>({});

export const Provider: React.FC = React.memo(props => <StoreContext.Provider value={store.get()}>{props.children}</StoreContext.Provider>);

export function useStore<T extends object, R>(fn: (state: T) => R) {
    return fn(React.useContext(StoreContext));
}

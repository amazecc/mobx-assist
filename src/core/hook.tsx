import React from "react";
import { storeManager, Store } from "./StoreManager";

const StoreContext = React.createContext<any>({});

export const Provider: React.FC = React.memo(props => <StoreContext.Provider value={storeManager.get()}>{props.children}</StoreContext.Provider>);

export function useStore<R>(fn: (state: Store) => R) {
    return fn(React.useContext(StoreContext));
}

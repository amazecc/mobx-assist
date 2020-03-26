import React from "react";
import { storeManager } from "./StoreManager";

const StoreContext = React.createContext<any>({});

export const Provider: React.FC = React.memo(props => <StoreContext.Provider value={storeManager.get()}>{props.children}</StoreContext.Provider>);

export function useStore<T extends object, R>(fn: (state: T) => R) {
    return fn(React.useContext(StoreContext));
}

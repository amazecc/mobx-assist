import React from "react";
import { Store } from "./StoreManager";
import { StoreContext } from "./context";

export function useStore<R>(fn: (state: Store) => R) {
    return fn(React.useContext(StoreContext));
}

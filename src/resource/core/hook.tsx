import React from "react";
import { GlobalState } from "./Store";
import { StoreContext } from "./context";

export function useSelector<R>(fn: (state: GlobalState) => R) {
    return fn(React.useContext(StoreContext));
}

import React from "react";
import { storeManager } from "../core/StoreManager";
import { StoreContext } from "../core/context";

export const Provider: React.FC = React.memo(props => <StoreContext.Provider value={storeManager.get()}>{props.children}</StoreContext.Provider>);

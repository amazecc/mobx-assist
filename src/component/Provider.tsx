import React from "react";
import { storeManager } from "../core/StoreManager";
import { StoreContext } from "../core/context";

export const Provider: React.FC = React.memo(props => <StoreContext.Provider value={storeManager.getStore()}>{props.children}</StoreContext.Provider>);

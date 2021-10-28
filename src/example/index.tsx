import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "../resource";
import Demo from "./Demo";

ReactDOM.render(
    <Provider>
        <Demo />
    </Provider>,
    document.getElementById("root")
);

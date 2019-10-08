import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { TodoList } from "./component/Test/component";
import { initialConfig } from "../src";

configure({ enforceActions: "observed" });

initialConfig({
    errorHandler(error: any) {
        console.error("[[ mobx-assst 捕获错误 ]]", error);
    }
});

ReactDOM.render(<TodoList />, document.getElementById("root"));

import * as React from "react";
import * as ReactDOM from "react-dom";
import { TodoList } from "./component/Test/component";
import { initialConfig } from "../src";

initialConfig({
    errorHandler(error: any) {
        console.error("[[ mobx-assst 捕获错误 ]]", error);
    }
});

ReactDOM.render(<TodoList />, document.getElementById("root"));

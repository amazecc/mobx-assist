import * as React from "react";
import * as ReactDOM from "react-dom";
import { TodoList } from "./component/Test/component";
import { initialConfig } from "../src";
import { RootModule } from "./rootState";

initialConfig({
    errorHandler(error: any) {
        console.error("[[ mobx-assst 捕获错误 ]]", error);
    },
    rootStore: RootModule.store
});

ReactDOM.render(<TodoList />, document.getElementById("root"));

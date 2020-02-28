import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { TodoList } from "./component/Test/component";
import { exceptionUtil, Provider } from "../src";

configure({ enforceActions: "observed" });

function errorHandler(error: any) {
    console.error("[[ mobx-assst 捕获错误 ]]", error);
}

exceptionUtil.setErrorHandlerMethod(errorHandler);

ReactDOM.render(
    <Provider>
        <TodoList />
    </Provider>,
    document.getElementById("root")
);

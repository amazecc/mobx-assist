import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { TodoListDemoComponent } from "./component/Test";
import { exceptionUtil, Provider } from "../src";

configure({ enforceActions: "observed" });

function errorHandler(error: any) {
    console.error("[[ mobx-assst 捕获错误 ]]", error);
}

exceptionUtil.setErrorHandlerMethod(errorHandler);

ReactDOM.render(
    <Provider>
        <TodoListDemoComponent a={1} />
    </Provider>,
    document.getElementById("root")
);

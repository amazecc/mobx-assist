import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { Route } from "react-router-dom";
import { TodoListDemoComponent } from "./component/Test";
import { exceptionUtil, Provider, Router } from "../src";

configure({ enforceActions: "observed" });

function errorHandler(error: any) {
    console.error("[[ mobx-assst 捕获错误 ]]", error);
}

exceptionUtil.setErrorHandlerMethod(errorHandler);

ReactDOM.render(
    <Provider>
        <Router>
            <Route path="/a/:name" component={TodoListDemoComponent} />
        </Router>
    </Provider>,
    document.getElementById("root")
);

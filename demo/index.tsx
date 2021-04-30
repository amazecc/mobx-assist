import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { Route, Router } from "react-router-dom";
import { TodoListDemoComponent } from "./component/Test";
import { exceptionUtil, Provider } from "../src";
import { history } from "./history";

configure({ enforceActions: "observed" });

function errorHandler(error: any) {
    console.error("[[ mobx-assst 捕获错误 ]]", error);
}

exceptionUtil.setErrorHandlerMethod(errorHandler);

ReactDOM.render(
    <Provider>
        <Router history={history}>
            <Route path="/a/:name" component={TodoListDemoComponent} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
